/**
 * Created by HaiDT1 on 7/7/2016.
 */
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('payment_bill_mng_detail_result', function ($scope) {
        $scope.result = gTrans.result;
        $scope.detail = gTrans.detail;

        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch"};
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100)

        $scope.makeOtherTrans = function () {

            navController.initWithRootView("corp/payment_service/manager_bill/payment_bill_mng", true, 'html');
            return;
        }

    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}