/**
 * Created by HaiDT1 on 7/1/2016.
 */
var EbankApp = angular.module("EbankApp",[
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "angularFileUpload",
]);

// EbankApp.config(['$httpProvider', function ($httpProvider) {
//     $httpProvider.interceptors.push(function ($rootScope, $q) {
//         return {
//             request: function (config) {
//                 config.timeout = 0;
//                 return config;
//             },
//             responseError: function (rejection) {
//                 switch (rejection.status){
//                     case 408 :
//                         console.log('connection timed out');
//                         break;
//                 }
//                 return $q.reject(rejection);
//             }
//         }
//     })
// }]);

EbankApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

EbankApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

EbankApp.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if(event.which === 13) {
                scope.$apply(function(){
                    scope.$eval(attrs.ngEnter, {'event': event});
                });

                event.preventDefault();
            }
        });
    };
});
// Handle global LINK click
// EbankApp.directive('a', function() {
//     return {
//         restrict: 'E',
//         link: function(scope, elem, attrs) {
//             if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
//                 elem.on('click', function(e) {
//                     e.preventDefault(); // prevent link click for above criteria
//                 });
//             }
//         }
//     };
// });

// EbankApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
//     // Redirect any unmatched url
//     $urlRouterProvider.otherwise("/");
//     $stateProvider
//
//         .state('payment', {
//             url: "/auth-payment-bill.html",
//             templateUrl: "pages/corp/authorize/payment_service/bill/auth-payment-bill.html",
//             data: {pageTitle: 'Admin Dashboard Template'},
//             controller: "auth-payment-bill",
//             resolve: {
//                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
//                     return $ocLazyLoad.load({
//                         name: 'MetronicApp',
//                         insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
//                         files: [
//                             './pages/corp/authorize/payment_service/bill/auth-payment-bill.js'
//                         ]
//                     });
//                 }]
//             }
//         })
//
//     // Dashboard
//         .state('dashboard', {
//             url: "/auth-payment-bill-view.html",
//             templateUrl: "pages/corp/authorize/payment_service/bill/auth-payment-bill-view.html",
//             data: {pageTitle: 'Admin Dashboard Template'},
//             controller: "auth-payment-bill-view",
//             resolve: {
//                 deps: ['$ocLazyLoad', function($ocLazyLoad) {
//                     return $ocLazyLoad.load({
//                         name: 'MetronicApp',
//                         insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
//                         files: [
//                             './pages/corp/authorize/payment_service/bill/auth-payment-bill-view.js'
//                         ]
//                     });
//                 }]
//             }
//         })
//
// }]);

EbankApp.service('requestMBServiceCorp', function ($http) {
    this.get = function (url, data, successCallBack, errorCallBack) {
        hiddenKeyBoardWhenRequest();
        showLoadingMask();
        var tmpReqReal = JSON.stringify(data);
        var request = {
            method: 'GET',
            url: url,
            header: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: tmpReqReal
        }
        $http(request).then(function (response) {
            hideLoadingMask();
            var res = JSON.parse(JSON.stringify(response.data));
            if (res.respCode == RESP.get("COM_INVALID_SESSION")) {
                document.addEventListener('closeAlertView', logoutNoRequest, false);
                showAlertText(CONST_STR.get("CORP_MSG_SESSION_EXPIRED"));
                return;
            }

            if(successCallBack && (typeof successCallBack == "function")) {
                
                successCallBack(res);
                if (typeof(mainContentScroll) != "undefined" && mainContentScroll != null)
                    mainContentScroll.refresh();
            }
        }, function (response) {
            hideLoadingMask();
            if(errorCallBack && (typeof errorCallBack == "function")) {
                errorCallBack(response.data);
            }
        });
    }

    this.post = function (data, successCallBack, errorCallBack) {
        hiddenKeyBoardWhenRequest();
        showLoadingMask();
        var tmpReqReal = JSON.stringify(data);
        console.log("JSON DATA: " + tmpReqReal);
        var request = {
            method: 'POST',
            url: CONST_WEB_SERVICE_LINK,
            header: {
                'Content-Type': 'application/json; charset=UTF-8'
            },
            data: tmpReqReal,
            responseType: 'text'
        }
        $http(request).then(function (response) {
            hideLoadingMask();
            var res = JSON.parse(JSON.stringify(response.data));
            if (res.respCode == RESP.get("COM_INVALID_SESSION")) {
                document.addEventListener('closeAlertView', logoutNoRequest, false);
                showAlertText(CONST_STR.get("CORP_MSG_SESSION_EXPIRED"));
                return;
            }

            if(successCallBack && (typeof successCallBack == "function")) {
                
                successCallBack(res);
                if (typeof(mainContentScroll) != "undefined" && mainContentScroll != null)
                    mainContentScroll.refresh();
            }
        }, function (response) {
            hideLoadingMask();
            if(errorCallBack && (typeof errorCallBack == "function")) {
                errorCallBack(response.data);
            }
        });

    }
});



EbankApp.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    // $rootScope.$settings = settings; // state to be accessed from view
}]);