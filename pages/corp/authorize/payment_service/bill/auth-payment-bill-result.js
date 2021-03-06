/**
 * Created by HaiDT1 on 7/5/2016.
 */
/**
 * Created by HaiDT1 on 6/28/2016.
 */
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth_payment_bill_result', function ($scope, requestMBServiceCorp) {
        $scope.currentListTrans = gTrans.listSelectedTrans;
        $scope.reason = gTrans.reason;
        $scope.authen = gTrans.authen;
        $scope.result = gPayment.result;
        
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.makeOtherTrans = function () {
            navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill"] = null;
            navController.initWithRootView("corp/authorize/payment_service/bill/auth-payment-bill", true, 'html');
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}