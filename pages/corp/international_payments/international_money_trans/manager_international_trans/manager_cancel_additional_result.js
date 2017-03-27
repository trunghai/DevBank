/**
 * Created by HaiDT1 on 9/30/2016.
 */
var data;
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('manager_cancel_additional_result', function ($scope, FileUploader, requestMBServiceCorp) {
        $scope.infoTrans = gInternational.detail;
        $scope.result = gInternational.result;
        $scope.detailCheckList = gInternational.detail.checklistProfile;

        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "CAN": "Hủy giao dịch", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};


        $scope.onMakeOtherTransClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.initWithRootView("corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans", true,'html');
        }

        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "12";
            jsonData.idtxn = gInternational.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                // var html = '<embed width="100%" height="640"'
                //     + ' type="application/pdf"'
                //     + ' src="'
                //     + response.respJsonObj.url
                //     + '"></embed>';
                //
                // document.getElementById('contentView').innerHTML = html;
                // var modal = document.getElementById('myModal');
                // modal.style.display = "block";
                // window.onclick = function(event) {
                //     if (event.target == modal) {
                //         modal.style.display = "none";
                //     }
                // }
                if (Environment.isMobile()){
                    openLinkInWindows(response.respJsonObj.url);
                }else {
                    var widthScreen = (window.innerWidth-800)/2;
                    var heightScreen = (window.innerHeight-800)/2;

                    var string = "width=800,height=800,top=" + heightScreen + ",left=" + widthScreen;
                    window.open(response.respJsonObj.url, "", string);
                }
            });
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}