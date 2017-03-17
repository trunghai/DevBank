/**
 * Created by HaiDT1 on 6/27/2016.
 */
/**
 * Created by HaiDT1 on 6/27/2016.
 */


gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";

function viewDidLoadSuccess() {

    initData();

    //Tooltip when hover book

}

function initData() {
    angular.module('EbankApp').controller('pay_bill_authen', function ($scope, requestMBServiceCorp) {
        $scope.review = gPayment.review;
        if(gUserInfo.lang === 'VN'){
            if ($scope.review.issavepayee === 'TH'){
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_VN[1];
            }else {
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_VN[0];
            }
        }else {
            if ($scope.review.issavepayee === 'TH'){
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_EN[1];
            }else {
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_EN[0];
            }
        }

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

        $scope.sendJSONRequest = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }

            var args = [];
            var request = {
                cmdType: '1711',
                request: {
                    transId: gPayment.transactionId,
                    sequence_id: 3,
                    idtxn: gPayment.payType,
                    issavepayee: gPayment.review.issavepayee,
                    sampleName: gPayment.review.beneName
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

                navCachedPages["corp/payment_service/bill/pay_bill_result"] = null;
                navController.pushToView("corp/payment_service/bill/pay_bill_result", true);

            
            }, function (response) {
                var objResponse = JSON.parse(JSON.stringify(response));
                showAlertText(objResponse.respContent);
            });
        }

        $scope.onBackClick = function () {
            navCachedPages["corp/payment_service/bill/pay_bill_review"] = null;
            navController.popView(true);
            return;
        }

        $scope.onCancelClick = function () {
            navCachedPages["corp/payment_service/bill/pay_bill_create"] = null;
            navController.initWithRootView("corp/payment_service/bill/pay_bill_create",true, 'html');
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
            navCachedPages["corp/payment_service/bill/pay_bill_create"] = null;
            navController.initWithRootView("corp/payment_service/bill/pay_bill_create",true, 'html');
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

                var nodeAuthenTitle = document.getElementById("auth.title");
                nodeAuthenTitle.innerHTML = CONST_STR.get("AUTHEN_TXT_INPUT_KEY_TITLE");


                setInputOnlyNumber('authen.tokenkey', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));
                // nodeInputToken.addEventListener('evtSpecialKeyPressed', handleEnterPressed, false);

            });
        }
    });
        angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}

