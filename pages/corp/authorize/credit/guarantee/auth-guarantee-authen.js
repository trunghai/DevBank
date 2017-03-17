/**
 * Created by HaiDT1 on 8/4/2016.
 */

gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";

function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth-guarantee-authen', function ($scope, requestMBServiceCorp) {
        $scope.currentListTrans = gTrans.listSelectedTrans;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.reason = gTrans.reason;
        $scope.authen = gTrans.authen;
        initRequestToken();
        
        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-view"] = null;
            navController.popView(true);
            return;
        }

        $scope.onCancelClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee"] = null;
            navController.popToRootView(true);
            return;
        }

        $scope.onAuthorizationTrans = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }

            if (gTrans.authen){
                var args = [];
                var request = {}
                gTrans.transInfo = [];
                for (var i in $scope.currentListTrans){
                    gTrans.transInfo.push({'transId': $scope.currentListTrans[i].MA_GD, 'userIdRef': $scope.currentListTrans[i].MA_THAM_CHIEU});
                }
                request.sequence_id = '4';
                request.idtxn = 'B62';
                request.transInfo = gTrans.transInfo;


                args.push({
                    cmdType: CONSTANTS.get('COM_AUTHENTICATE_TOKEN'),
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
                        var args = objResponse.respJsonObj.table;
                        for (var i in args){
                            for (var j in $scope.currentListTrans){
                                if ($scope.currentListTrans[j].MA_GD === args[i].IDFCATREF){
                                    $scope.currentListTrans[j].NGUOI_DUYET = args[i].SIGNEDBY;
                                }
                            }
                        }


                    }else {

                        if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gPayment.result.messageIconClass = "icon-cross";

                    }

                    navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-result"] = null;
                    navController.pushToView("corp/authorize/payment_service/bill/auth-payment-bill-result", true);

                });
            }else {
                //Từ chối
                var args = [];
                var request = {}
                request.sequence_id = '3';
                request.idtxn = 'B62';
                request.rejectReason = gTrans.reason;
                gTrans.transInfo = [];
                for (var i in $scope.currentListTrans){
                    if (request.transIds === undefined || request.transIds === null){
                        request.transIds = $scope.currentListTrans[i].MA_GD;
                    }else {
                        request.transIds = request.transIds + ',' + $scope.currentListTrans[i].MA_GD;
                    }
                    // gTrans.transInfo.push({'transId': $scope.currentListTrans[i].MA_GD, 'userIdRef': $scope.currentListTrans[i].MA_THAM_CHIEU, 'ngayLap': $scope.currentListTrans[i].NGAY_LAP, 'nguoiDuyet': $scope.currentListTrans[i].NGUOI_DUYET});
                }

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
                requestMBServiceCorp.post(data, function (response) {
                    var objResponse = JSON.parse(JSON.stringify(response));
                    gPayment.result = {};
                    gPayment.result.message = objResponse.respContent;
                    gPayment.result.respJsonObj = objResponse.respJsonObj;


                    if (objResponse.respCode === '0') {
                        gPayment.result.messageIconClass = "icon-correct";
                        var args = objResponse.respJsonObj.table;
                        for (var i in args) {
                            for (var j in $scope.currentListTrans) {
                                if ($scope.currentListTrans[j].MA_GD === args[i].IDFCATREF) {
                                    $scope.currentListTrans[j].NGUOI_DUYET = args[i].SIGNEDBY;
                                }
                            }
                        }


                    } else {

                        if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gPayment.result.messageIconClass = "icon-cross";

                    }

                    navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-result"] = null;
                    navController.pushToView("corp/authorize/payment_service/bill/auth-payment-bill-result", true);
                });

            }


        }

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

