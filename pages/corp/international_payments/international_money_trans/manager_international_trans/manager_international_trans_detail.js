/**
 * Created by HaiDT1 on 9/8/2016.
 */
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('manager_international_trans_detail', function ($scope, requestMBServiceCorp) {
        gInternational.detail.TransType = CONST_STR.get('INTERNATIONAL_TRANS_TYPE_' + gInternational.detail.TRANSACTIONTYPE);
        gInternational.detail.TRANSFERMETHOD = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.detail.BENEFICIARYBANKMETHOD);
        gInternational.detail.INTERMEDIARYBANK = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.detail.METHOD);
        gInternational.detail.MethodCharge = CONST_STR.get('INTERNATIONAL_METHOD_CHARGE_' + gInternational.detail.CHARGEMETHOD);

        (gInternational.detail.MONEYTYPE != 'JPY') ? $scope.dosCurrency = 2 : $scope.dosCurrency = 0;
        (gInternational.detail.CHARGEMETHOD == 'BEN') ? $scope.dos = 2 : $scope.dos = 0;
        var status = gInternational.detail.status;


        $scope.infoTrans = gInternational.detail;
        $scope.detailCheckList = gInternational.detail.checklistProfile;

        $scope.showElement = true;
        $scope.showTransCancel = true;
        $scope.printSwift = false;
        $scope.showExportExcel = false;
        if(status != 'INT')
        {
            $scope.showTransCancel = false;
        }
        if(status== 'ABH')
        {
            $scope.showExportExcel = true;
        }
        if(status== 'ABH' || status == 'SBS' ||status == 'REH' ||
            status == 'APS' || status == 'RES' ||status == 'RBS' ||
            status == 'RJS' || status == 'IBS' || status == 'CAS')  {
            $scope.printSwift = true;
        }

        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            $scope.showElement =false;
            $scope.showTransCancel = false;
            $scope.printSwift = false;
        }

        if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
            (typeof $scope.infoTrans.BENEFICIARYSWIFTCODE == 'undefined' || $scope.infoTrans.BENEFICIARYSWIFTCODE.length == 0 || $scope.infoTrans.BENEFICIARYSWIFTCODE == null) ? $scope.swifCode = false : $scope.swifCode = true;
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
                (typeof $scope.infoTrans.BANKSWIFTCODE == 'undefined' || $scope.infoTrans.BANKSWIFTCODE == null|| $scope.infoTrans.BANKSWIFTCODE.length == 0) ? $scope.swiftCodeNHTG = false : $scope.swiftCodeNHTG = true;
                $scope.addressNHTG = false;
            }else if(gInternational.detail.BANKMETHOD == 'CSTG02'){
                $scope.swiftCodeNHTG = false;
                (typeof $scope.infoTrans.BANKNAME == 'undefined'  || $scope.infoTrans.BANKNAME == null || $scope.infoTrans.BANKNAME.length == 0) ? $scope.NHTG = false : $scope.NHTG = true;
                (typeof $scope.infoTrans.BANKADDRESS == 'undefined' || $scope.infoTrans.BANKADDRESS == null || $scope.infoTrans.BANKADDRESS.length == 0) ? $scope.addressNHTG = false : $scope.addressNHTG = true;
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

        $scope.onCancelClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans_authen'] = null;
            navController.pushToView("corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans_authen", true,'html');
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

        $scope.dienswift = function () {
            var jsonData = new Object();
            jsonData.sequence_id = "9";
            jsonData.idtxn = 'B03';
            jsonData.folderId = gInternational.detail.FOLDERID;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    openLinkInWindows(response.respJsonObj.url);
                }
            });
        }
        $scope.sendRequestExportExcel =function() {
            var arrayClientInfo = new Array();
            arrayClientInfo.push(null);
            arrayClientInfo.push({
                sequenceId: "22",
                idfcatref: gInternational.detail.IDFCATREF
            });

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

            data = getDataFromGprsCmd(gprsCmd);

            corpExportExcel(data);
        }

    });
angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}


