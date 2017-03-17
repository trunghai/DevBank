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
    angular.module("EbankApp").controller('auth-guarantee-detail-authen', function ($scope, requestMBServiceCorp) {
        $scope.detailCommon = gTrans.common;
        $scope.detailCheckList = gTrans.checklistProfile;
        $scope.authen = gTrans.common.authen;
        $scope.detailCommon.sendMethod ='';
        if (typeof gTrans.common.SENDMETHOD != "undefined" && gTrans.common.SENDMETHOD != null) {
            $scope.detailCommon.sendMethod = CONST_STR.get("COM_NOTIFY_" + gTrans.common.SENDMETHOD);
        }
        refeshContentScroll();
        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-detail"] = null;
            navController.popView(true);
        }
        $scope.onCancelClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee"] = null;
            navController.initWithRootView("corp/authorize/credit/guarantee/auth-guarantee",true, 'html');
        }
        

        $scope.onContinuteClick = function () {
            var nodeTokenKey = document.getElementById("authen.tokenkey");
            var tmpTokenStr = nodeTokenKey.value;
            if (tmpTokenStr.length != 6) {
                showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
                return;
            }


            if (gTrans.common.authen){
                var args = [];
                var request = {}
                gTrans.transInfo = [];
                gTrans.transInfo.push({'transId': gTrans.common.transId, 'userIdRef': gTrans.common.idUserRef});
                request.sequence_id = '4';
                request.idtxn = 'B64';
                request.transInfo = gTrans.transInfo;


                args.push({
                    cmdType: CONSTANTS.get('CMD_AUTHORIZE_GUARANTEE'),
                    request: request,

                });
                args.push({
                    sequence_id: 2,
                    tokenType: gCorp.authenType,
                    tokenKey: tmpTokenStr
                });

                var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
                var data = getDataFromGprsCmd(gprsCmd);
            }else {
                //Từ chối
                var args = [];
                var request = {}
                request.sequence_id = '3';
                request.idtxn = 'B64';
                request.rejectReason = gTrans.common.reason;
                request.transIds = gTrans.common.transId;

                args.push({
                    cmdType: CONSTANTS.get('CMD_AUTHORIZE_GUARANTEE'),
                    request: request,

                });
                args.push({
                    sequence_id: 2,
                    tokenType: gCorp.authenType,
                    tokenKey: tmpTokenStr
                });

                var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
                var data = getDataFromGprsCmd(gprsCmd);
            }
            clearOTPTimeout();
            nodeTokenKey.value = "";
            requestMBServiceCorp.post(data, function (response) {
                gTrans.result = {};
                console.log(response);
                gTrans.result.message = response.respContent;
                var  tableRespone =  response.respJsonObj.table[0];
                gTrans.result.DATCHECK = tableRespone.DATCHECK;
                gTrans.result.DATMAKE = tableRespone.DATMAKE;
                gTrans.result.IDFCATREF = tableRespone.IDFCATREF;
                gTrans.result.MAKER = tableRespone.MAKER;
                gTrans.result.SIGNEDBY = tableRespone.SIGNEDBY;
                gTrans.result.STATUS = tableRespone.STATUS;


                if (response.respCode == RESP.get('COM_SUCCESS')){
                    gTrans.result.messageIconClass = "icon-correct";
                }else {
                    if (response.respCode == RESP.get("COM_INVALID_TOKEN")) {
                        showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                        return;
                    }
                    gTrans.result.messageIconClass = "icon-cross";
                }
                navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-detail-result"] = null;
                navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-detail-result", true);
            });

        }

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

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

        initRequestToken();

        function initRequestToken() {
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
            navCachedPages["corp/payment_service/bill/pay_bill_create"] = null;
            navController.initWithRootView("corp/payment_service/bill/pay_bill_create",true, 'html');
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }

        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "6";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                var html = '<embed width="100%" height="640"'
                    + ' type="application/pdf"'
                    + ' src="'
                    + response.respJsonObj.url
                    + '"></embed>';

                document.getElementById('contentView').innerHTML = html;
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            });
        }

    });
    angular.bootstrap(document.getElementById('mainViewContent'), ["EbankApp"]);
}