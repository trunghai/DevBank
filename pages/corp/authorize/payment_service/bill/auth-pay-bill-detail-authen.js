/**
 * Created by HaiDT1 on 6/30/2016.
 */

gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";

function viewDidLoadSuccess() {
    initData();
}

function removeSpecialCharForNumberNew(sText) {
			sText = sText.replace(/[^0-9.,]/g, '');
			document.getElementById('authen.tokenkey').value = sText;
		}

function initData() {
    angular.module('EbankApp').controller('auth-pay-bill-detail-authen', function ($scope, requestMBServiceCorp) {
        $scope.detail = gTrans.detail;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);
        // Get Token type
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
        
        $scope.onContinuteClick = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }

            var args = [];
            var request = {}
            gTrans.transInfo = [];
            gTrans.transInfo.push({'transId': gTrans.detail.transInfo[0].transId, 'userIdRef': gTrans.detail.transInfo[0].idUserRef});
			if (gTrans.detail.isflag === 'Y')
			{
				request.sequence_id = '4';
				request.transInfo = gTrans.transInfo;
			}
			else if (gTrans.detail.isflag === 'N')
			{
				request.sequence_id = '3';
				request.transId = gTrans.detail.transInfo[0].transId;
				request.rejectReason = gTrans.detail.rejectReason;
			}
            
            request.idtxn = 'B63';
            request.transInfo = gTrans.transInfo;


            args.push({
                cmdType: '1761',
                request: request,

            });
            args.push({
                sequence_id: 2,
                tokenType: gCorp.authenType,
                tokenKey: tmpTokenStr
            });

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            clearOTPTimeout();
            nodeTokenKey.value = "";
            requestMBServiceCorp.post(data, function (response){
                var objResponse = JSON.parse(JSON.stringify(response));
                gPayment.result = {};
                gPayment.result.message = objResponse.respContent;
                gPayment.result.respJsonObj = objResponse.respJsonObj;


                if (objResponse.respCode === '0'){
                    gPayment.result.messageIconClass = "icon-correct";


                }else {

                    if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                        showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                        return;
                    }
                    gPayment.result.messageIconClass = "icon-cross";

                }

                navCachedPages["corp/authorize/payment_service/bill/auth-pay-bill-detail-result"] = null;
                navController.pushToView("corp/authorize/payment_service/bill/auth-pay-bill-detail-result", true);

            },function (response) {
                var objResponse = JSON.parse(JSON.stringify(response));
                showAlertText(objResponse.respContent);
            });
        }
		
		

        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-detail"] = null;
            navController.popView(true);
            return;
        }
		
		$scope.onCancelClick = function () {
            
			navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill"] = null;
            navController.initWithRootView("corp/authorize/payment_service/bill/auth-payment-bill",true, 'html');
			return;
        }
        // Khi click nut enter
        // function handleEnterPressed(e) {
        //     var ew = e.keyPress;
        //     if (ew == 13) {
        //         sendJSONRequest();
        //     } else {
        //         return;
        //     }
        // }

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
            navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill"] = null;
            navController.popToRootView(true);
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }

    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}



