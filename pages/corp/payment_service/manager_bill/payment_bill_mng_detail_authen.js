/**
 * Created by HaiDT1 on 7/7/2016.
 */
/**
 * Created by HaiDT1 on 7/7/2016.
 */
gCorp.isBack = false;
gTrans.idtxn = 'B01';
gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";

function viewBackFromOther() {
    gCorp.isBack = true;
}

function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('payment_bill_mng_detail_authen',function ($scope, requestMBServiceCorp) {
        $scope.detail = gTrans.detail;
        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch"};

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100)

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

        sendInitRequest();



        $scope.onBackClick = function () {
            navCachedPages['corp/payment_service/manager_bill/payment_bill_mng_detail'] = null;
            navController.popToView('corp/payment_service/manager_bill/payment_bill_mng_detail', true);
        }
        
        $scope.onCancelClick = function () {
            navCachedPages["corp/payment_service/manager_bill/payment_bill_mng"] = null;
            navController.initWithRootView("corp/payment_service/manager_bill/payment_bill_mng",true, 'html');
            return
        }

        $scope.onContinuteClick = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }

            var jsonData = {};
            jsonData.sequence_id = "4";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.transIds = gTrans.detail.transInfo[0].transId;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMENT_BILL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            clearOTPTimeout();
            nodeTokenKey.value = "";

            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){

                    gTrans.result = {};
                    gTrans.result.message = response.respContent;
                    gTrans.result.respJsonObj = response.respJsonObj.table[0];

                    


                    if (response.respCode === '0'){
                        gTrans.result.messageIconClass = "icon-correct";


                    }else {

                        if (response.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gTrans.result.messageIconClass = "icon-cross";

                    }

                    navCachedPages["corp/payment_service/manager_bill/payment_bill_mng_detail_result"] = null;
                    navController.pushToView("corp/payment_service/manager_bill/payment_bill_mng_detail_result", true);
                }else {
                    showAlertText(response.respContent);
                }

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
            sendInitRequest();
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
            navCachedPages["corp/payment_service/manager_bill/payment_bill_mng"] = null;
            navController.initWithRootView("corp/payment_service/manager_bill/payment_bill_mng",true, 'html');
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }

        function sendInitRequest() {
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

                // var nodeAuthenTitle = document.getElementById("auth.title");
                // nodeAuthenTitle.innerHTML = CONST_STR.get("AUTHEN_TXT_INPUT_KEY_TITLE");


                setInputOnlyNumber('authen.tokenkey', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));
                // nodeInputToken.addEventListener('evtSpecialKeyPressed', handleEnterPressed, false);

            });
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}