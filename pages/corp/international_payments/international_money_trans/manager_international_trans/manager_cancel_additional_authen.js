/**
 * Created by HaiDT1 on 9/29/2016.
 */
gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";

var data;
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('manager_cancel_additional_authen', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gInternational.detail;
        $scope.detailCheckList = gInternational.detail.checklistProfile;
        $scope.checklist = [];

        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "CAN": "Hủy giao dịch", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};

        $scope.onBackClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.popView(true);
        }

        $scope.onContinuteClick = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }
            var args = [];
            var request = {
                cmdType: CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"),
                request: {
                    transIds: gInternational.detail.IDFCATREF,
                    sequence_id: "11",
                    idtxn: "B03"
                }
            }

            args.push(request);
            args.push({
                sequence_id: 2,
                tokenType: gCorp.authenType,
                tokenKey: tmpTokenStr
            });
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            clearOTPTimeout();
            nodeTokenKey.value = "";

            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){

                    gInternational.result = {};
                    gInternational.result.message = response.respContent;
                    // gInternational.detail.CREATE_TIME = response.respJsonObj.time;

                    if (response.respCode === '0'){
                        gInternational.result.messageIconClass = "icon-correct";

                    }else {

                        if (response.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gInternational.result.messageIconClass = "icon-cross";

                    }

                    navCachedPages["corp/international_payments/international_money_trans/manager_international_trans/manager_cancel_additional_result"] = null;
                    navController.pushToView("corp/international_payments/international_money_trans/manager_international_trans/manager_cancel_additional_result", true, 'html');
                }else {
                    showAlertText(response.respContent);
                }

            });
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

        initRequestToken();
        function initRequestToken() {
            gCorp.authenType = gUserInfo.valicationType;
            var nodeTokenType = document.getElementById('authen.tokentype');
            var label = "";
            if (gCorp.authenType == "OTP") {
                label = CONST_STR.get("AUTHEN_LABEL_OTP");
                var nodeProgressWrapper = document.getElementById('authen.progressbar');
                nodeProgressWrapper.style.display = 'block';
            } else if (gCorp.authenType == "MTX") {
                label = CONST_STR.get("AUTHEN_LABEL_MATRIX");
                var nodeProgressWrapper = document.getElementById('authen.progressbar');
                nodeProgressWrapper.style.display = 'block';
            } else {
                label = CONST_STR.get("AUTHEN_LABEL_TOKEN");
            }
            nodeTokenType.innerHTML = label;

            gCorp.countOTP++;
            if (gCorp.countOTP > 5) {
                document.addEventListener("closeAlertView", handleOTPGetOver, false);
                clearOTPTimeout();
                showAlertText(CONST_STR.get("MSG_OTP_LIMIT_GET_TIME"));
                return;
            }

            var args = [""]; // Bo trong element dau
            args.push({
                sequence_id: 1
            });

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (responseText) {
                var nodeInputToken = document.getElementById("authen.tokenkey");
                mainContentScroll.scrollToElement(nodeInputToken, 50);
                nodeInputToken.select();
                nodeInputToken.focus();

                startProgressBar("authen.progressbarotp", gCorp.timerOTP);
                gCorp.OTPTimeout = setTimeout(function doAfterProgress() {
                    handleOTPTimeout();
                }, gCorp.timerOTP * 1000);
                var response = JSON.parse(JSON.stringify(responseText));
                gCorp.authenType = response.respJsonObj.tokenType;
                if (gCorp.authenType == "MTX") {
                    var mtxPos = response.respJsonObj.MTXPOS;
                    var nodeTokenType = document.getElementById("authen.tokentype");
                    nodeTokenType.innerHTML = formatString(CONST_STR.get("COM_TOKEN_MTX_INPUT_LABEL"), [mtxPos]);
                }

                var nodeAuthenTitle = document.getElementById("auth.title");
                nodeAuthenTitle.innerHTML = CONST_STR.get("AUTHEN_TXT_INPUT_KEY_TITLE");


                setInputOnlyNumber('authen.tokenkey', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));
                // nodeInputToken.addEventListener('evtSpecialKeyPressed', handleEnterPressed, false);

            });
        }

        // Khi OTP timeout
        function handleOTPTimeout() {
            document.addEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.addEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
            clearOTPTimeout();
            showAlertConfirmText(CONST_STR.get("MSG_OTP_TIME_PERIOD"));
        }

        // Gui lai OTP
        function handleOTPResendAlert(e) {
            document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
            clearOTPTimeout();
            initRequestToken();
        }

        // Huy OTP
        function handleOTPResendAlertCancel(e) {
            document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
            clearOTPTimeout();
            goToMainScreen();
        }

        // Qua 5 lan nhap token
        function handleOTPGetOver() {
            document.removeEventListener("closeAlertView", handleOTPGetOver, false);
            goToMainScreen();
        }

        function goToMainScreen() {
            clearOTPTimeout();
            navCachedPages["corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents"] = null;
            navController.initWithRootView("corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents",true, 'html');
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}