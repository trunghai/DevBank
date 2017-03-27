/**
 * Created by HaiDT1 on 9/16/2016.
 */
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('manager_international_trans_result',function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gInternational.detail;
        $scope.detailCheckList = gInternational.detail.checklistProfile;
        $scope.result = gInternational.result;
        $scope.getDatetime = new Date();

        (gInternational.detail.CHARGEMETHOD == 'BEN') ? $scope.dos = 2 : $scope.dos = 0;
        if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
            ($scope.infoTrans.BENEFICIARYSWIFTCODE.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
            $scope.addressBen = false;
        }else if(gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
            $scope.swifCode = false;
            ($scope.infoTrans.BENEFICIARYBANKADDRESS == null || $scope.infoTrans.BENEFICIARYBANKADDRESS == undefined) ? $scope.addressBen = false : $scope.addressBen = true;
        }

        if(gInternational.detail.METHOD == 'IBN'){
            $scope.swiftCodeNHTG = false;
            $scope.NHTG = false;
            $scope.addressNHTG = false;
            $scope.nationBankNHTG = false;

        }else if(gInternational.detail.METHOD == 'IBY'){
            $scope.nationBankNHTG = true;
            $scope.NHTG = true;
            if(gInternational.detail.BANKMETHOD == 'CSTG01'){
                ($scope.infoTrans.BANKSWIFTCODE.length == 0) ? $scope.swiftCodeNHTG = false : $scope.swiftCodeNHTG = true;
                
                $scope.addressNHTG = false;

            }else if(gInternational.detail.BANKMETHOD == 'CSTG02'){
                $scope.swiftCodeNHTG = false;
                ($scope.infoTrans.BANKNAME.length == 0) ? $scope.NHTG = false : $scope.NHTG = true;
                ($scope.infoTrans.BANKADDRESS.length == 0) ? $scope.addressNHTG = false : $scope.addressNHTG = true;
            }
        }

        refeshContentScroll();
        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "CAN": "Hủy giao dịch", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ","RSA":"TPBank từ chối"};

        $scope.onBackClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.popView(true);
        }

        $scope.onMakeOtherTransClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.initWithRootView("corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans", true,'html');
        }
        $scope.onViewPDF = function (e, namefile) {
            var jsonData = new Object();
            jsonData.sequence_id = "12";
            jsonData.idtxn = 'B03';
            jsonData.idFile = e;
            jsonData.nameFile = namefile;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, true, function (response) {
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