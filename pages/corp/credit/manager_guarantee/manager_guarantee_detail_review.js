/**
 * Created by HaiDT1 on 9/22/2016.
 */
function viewDidLoadSuccess() {

    initData();

}

function initData() {
    angular.module("EbankApp").controller('manager_guarante_detail_review', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gTrans.detail;
        $scope.detailCheckList = gTrans.detail.checklistProfile;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);
        

        $scope.statusVN = {"ABH" : "Giao dịch hoàn thành", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};


        $scope.onContinuteClick = function () {
            navCachedPages['corp/credit/manager_guarantee/manager_guarantee_detail_authen'] = null;
            navController.pushToView("corp/credit/manager_guarantee/manager_guarantee_detail_authen", true,'html');
        }


    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}