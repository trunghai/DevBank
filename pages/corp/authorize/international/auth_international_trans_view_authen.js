/**
 * Created by HaiDT1 on 9/15/2016.
 */

gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth_international_trans_view_authen', function ($scope, requestMBServiceCorp) {
        $scope.currentListTrans = gInternational.listSelectedTrans;
        $scope.reason = gTrans.reason;
        $scope.authen = gTrans.authen;

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.reason = gInternational.reason;
        $scope.authen = gInternational.authen;
        //noinspection JSAnnotator

        $scope.authorizationTrans = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }

            if (gInternational.authen){
                var args = [];
                var request = {}
                gTrans.transInfo = [];
                for (var i in $scope.currentListTrans){
                    gTrans.transInfo.push({'transId': $scope.currentListTrans[i].MA_GD, 'userIdRef': $scope.currentListTrans[i].IDUSERREFERENCE});
                }
                request.sequence_id = '4';
                request.idtxn = 'B65';
                request.transInfo = gTrans.transInfo;


                args.push({
                    cmdType: CONSTANTS.get("CMD_AUTHORIZE_PAYMNET_INTERNATIONAL"),
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
                    gInternational.result = {};
                    gInternational.result.message = objResponse.respContent;
                    gInternational.result.respJsonObj = objResponse.respJsonObj;


                    if (objResponse.respCode === '0'){
                        gInternational.result.messageIconClass = "icon-correct";
                        var args = objResponse.respJsonObj.table;
                        for (var i in args){
                            for (var j in $scope.currentListTrans){
                                if ($scope.currentListTrans[j].MA_GD === args[i].IDFCATREF){
                                    $scope.currentListTrans[j].SIGNEDBY = args[i].SIGNEDBY;
                                    $scope.currentListTrans[j].DATCHECK = args[i].DATCHECK;
                                    $scope.currentListTrans[j].IDFCATREF = args[i].IDFCATREF;
                                    $scope.currentListTrans[j].TRANSFERAMOUNT = $scope.currentListTrans[j].SO_LUONG;
                                }
                            }
                        }


                    }else {

                        if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gInternational.result.messageIconClass = "icon-cross";

                    }
                    gInternational.currentListTrans = $scope.currentListTrans;
                    gInternational.isDetail = false;
                    navCachedPages["corp/authorize/international/auth_international_trans_result"] = null;
                    navController.pushToView("corp/authorize/international/auth_international_trans_result", true, 'html');

                });
            }else {
                //Từ chối
                var args = [];
                var request = {}
                request.sequence_id = '3';
                request.idtxn = 'B65';
                request.rejectReason = gTrans.reason;
                gInternational.transInfo = [];
                for (var i in $scope.currentListTrans){
                    if (request.transIds === undefined || request.transIds === null){
                        request.transIds = $scope.currentListTrans[i].MA_GD;
                    }else {
                        request.transIds = request.transIds + ',' + $scope.currentListTrans[i].MA_GD;
                    }
                    // gTrans.transInfo.push({'transId': $scope.currentListTrans[i].MA_GD, 'userIdRef': $scope.currentListTrans[i].MA_THAM_CHIEU, 'ngayLap': $scope.currentListTrans[i].NGAY_LAP, 'nguoiDuyet': $scope.currentListTrans[i].NGUOI_DUYET});
                }

                args.push({
                    cmdType: CONSTANTS.get("CMD_AUTHORIZE_PAYMNET_INTERNATIONAL"),
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
                    gInternational.result = {};
                    gInternational.result.message = objResponse.respContent;
                    gInternational.result.respJsonObj = objResponse.respJsonObj;


                    if (objResponse.respCode === '0') {
                        gInternational.result.messageIconClass = "icon-correct";
                        var args = objResponse.respJsonObj.table;
                        for (var i in args) {
                            for (var j in $scope.currentListTrans) {
                                if ($scope.currentListTrans[j].MA_GD === args[i].IDFCATREF) {
                                    $scope.currentListTrans[j].SIGNEDBY = args[i].SIGNEDBY;
                                    $scope.currentListTrans[j].DATCHECK = args[i].DATCHECK;
                                    $scope.currentListTrans[j].IDFCATREF = args[i].IDFCATREF;
                                    $scope.currentListTrans[j].TRANSFERAMOUNT = $scope.currentListTrans[j].SO_LUONG;
                                }
                            }
                        }


                    } else {

                        if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                            return;
                        }
                        gInternational.result.messageIconClass = "icon-cross";

                    }
                    gInternational.currentListTrans = $scope.currentListTrans;
                    gInternational.isDetail = false;
                    navCachedPages["corp/authorize/international/auth_international_trans_result"] = null;
                    navController.pushToView("corp/authorize/international/auth_international_trans_result", true);
                });

            }


        }

        $scope.onContinuteClick = function () {


            navCachedPages["corp/authorize/international/auth_international_trans_result"] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_result", true, 'html');
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
                // mainContentScroll.scrollToElement(nodeInputToken, 50);
                // nodeInputToken.select();
                // nodeInputToken.focus();

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
            navCachedPages["corp/authorize/international/auth_international_trans"] = null;
            navController.initWithRootView("corp/authorize/international/auth_international_trans",true, 'html');
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}