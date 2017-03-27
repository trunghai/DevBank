/**
 * Created by HaiDT1 on 9/20/2016.
 */

gCorp.isBack = false;
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module("EbankApp").controller("manager_additional_documents_view", function ($scope, requestMBServiceCorp) {
       
            $scope.infoTrans = gInternational.detail;
            $scope.detailCheckList = gInternational.detail.checklistProfile;
            $scope.listupload = gInternational.info.listFile;
            $scope.checklist = [];
            $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ","RSA":"TPBank từ chối"};

            for (var i in gInternational.detail.documentInfo){
                if (gInternational.detail.documentInfo[i].TYPE == "2"){
                    $scope.checklist.push(gInternational.detail.documentInfo[i]);
                }
            }
        

        refeshContentScroll();
        
        $scope.onBackClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents'] = null;
            navController.popView(true);
        }
        
        $scope.onContinuteClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_authen'] = null;
            navController.pushToView('corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_authen', true, 'html');
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
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}