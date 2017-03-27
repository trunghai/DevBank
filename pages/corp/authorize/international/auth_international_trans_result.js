/**
 * Created by HaiDT1 on 9/15/2016.
 */
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('auth_international_trans_result', function ($scope) {
        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ", "CAN" : "Hủy giao dịch"};
        
        if(gInternational.isDetail){
            $scope.currentListTrans = [gInternational.detail];
        }else {
            $scope.currentListTrans = gInternational.currentListTrans;
        }

        $scope.dateCheck = gInternational.detail.DATCHECK;
        $scope.reason = gInternational.reason;
        $scope.authen = gInternational.authen;
        $scope.result = gInternational.result;

        $scope.makeOtherTrans = function () {
            navCachedPages["corp/authorize/international/auth_international_trans"] = null;
            navController.initWithRootView("corp/authorize/international/auth_international_trans", true, 'html');
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}