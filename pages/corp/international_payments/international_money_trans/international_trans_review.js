/**
 * Created by HaiDT1 on 8/27/2016.
 */
function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('international_trans_review', function ($scope, requestMBServiceCorp) {
        gInternational.info.depositDate = datenow();
        $scope.infoTrans = gInternational.info;
        ($scope.infoTrans.feeMethod.value == 'BEN') ? $scope.dos = 2 : $scope.dos = 0;
        ($scope.infoTrans.swifCode.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
        ($scope.infoTrans.addressBen.length == 0) ? $scope.addressBen = false : $scope.addressBen = true;
        
        if(gInternational.info.transMethod.value == 'CS01'){
            ($scope.infoTrans.swifCode.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
            $scope.addressBen = false;
            
        }else if(gInternational.info.transMethod.value == 'CS02'){
            $scope.swifCode = false;
            
            ($scope.infoTrans.addressBen.length == 0) ? $scope.addressBen = false : $scope.addressBen = true;
        }
        
        if(gInternational.info.interMediaryBank.value == 'IBN'){
            $scope.swiftCodeNHTG = false;
            $scope.NHTG = false;
            $scope.addressNHTG = false;
            $scope.nationBankNHTG = false;

        }else if(gInternational.info.interMediaryBank.value == 'IBY'){
            $scope.nationBankNHTG = true;
            $scope.NHTG = true;
            if(gInternational.info.transMethodNHTG.value == 'CSTG01'){
                ($scope.infoTrans.swiftCodeNHTG.length == 0) ? $scope.swiftCodeNHTG = false : $scope.swiftCodeNHTG = true;
                $scope.addressNHTG = false;
            }else if(gInternational.info.transMethodNHTG.value == 'CSTG02'){
                $scope.swiftCodeNHTG = false;
                ($scope.infoTrans.addressNHTG.length == 0) ? $scope.addressNHTG = false : $scope.addressNHTG = true;
            }
        }



        refeshContentScroll();

        $scope.onCancelClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/international_trans_create'] = null;
            navController.initWithRootView('corp/international_payments/international_money_trans/international_trans_create', true, 'html');
        }

        //Chuyển sang tab quản lý giao dịch
        $scope.changeTab = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.initWithRootView('corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans', true, 'html');
        }

        $scope.onViewPDF = function (e) {
            var arrayString = e.split("/");
            var stringUrl = "";
            for (var i in arrayString){
                if(i >= 5){
                    stringUrl = stringUrl + "/" + arrayString[i];
                }
            }

            if (Environment.isMobile()){
                openLinkInWindows(response.respJsonObj.url);
            }else {
                var widthScreen = (window.innerWidth-800)/2;
                var heightScreen = (window.innerHeight-800)/2;

                var string = "width=800,height=800,top=" + heightScreen + ",left=" + widthScreen;
                window.open(stringUrl, "", string);
            }
        }

        $scope.onBackClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/international_trans_checklist'] = null;
            navController.popView(true);
        }

        $scope.onContinuteClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/international_trans_auth'] = null;
            navController.pushToView('corp/international_payments/international_money_trans/international_trans_auth', true, 'html');
        }
    });
    
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}