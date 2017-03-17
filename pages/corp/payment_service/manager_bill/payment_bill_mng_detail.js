/**
 * Created by HaiDT1 on 7/7/2016.
 */
gCorp.isBack = true;
gTrans.idtxn = 'B01';

function viewBackFromOther() {
    gCorp.isBack = true;
}

function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('payment_bill_mng_detail',function ($scope, requestMBServiceCorp) {
        $scope.detail = gTrans.detail;
        $scope.statusVN = { "ABH": "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công" };

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.onBackClick = function () {
			gCorp.isBack = true;
            navCachedPages['corp/payment_service/manager_bill/payment_bill_mng'] = null;
            navController.popToRootView(true);
			//navController.popView(true);
            //return;
        }
        
        $scope.onContinuteClick = function () {
            navCachedPages['corp/payment_service/manager_bill/payment_bill_mng_detail_authen'] = null;
            navController.pushToView('corp/payment_service/manager_bill/payment_bill_mng_detail_authen', true, 'html');
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}