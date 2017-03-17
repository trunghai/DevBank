/**
 * Created by HaiDT1 on 8/30/2016.
 */

gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.OTPTimeout = null;
gCorp.authenType = "";
function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('international_trans_auth', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gInternational.info;
        ($scope.infoTrans.feeMethod.value == 'BEN') ? $scope.dos = 2 : $scope.dos = 0;
        ($scope.infoTrans.swifCode.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
        ($scope.infoTrans.addressBen.length == 0) ? $scope.addressBen = false : $scope.addressBen = true;

        if(gInternational.info.transMethod.value == 'CS01'){
            ($scope.infoTrans.swifCode.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
            $scope.addressBen = false;

        }else if(gInternational.info.transMethod.value == 'CS02'){
            $scope.swifCode = false;

            ($scope.infoTrans.addressBen.length == 0) ? $scope.addressBen = false : $scope.addressBen = true;
        }

        if(gInternational.info.interMediaryBank.value == 'IBN'){
            $scope.swiftCodeNHTG = false;
            $scope.NHTG = false;
            $scope.addressNHTG = false;
            $scope.nationBankNHTG = false;

        }else if(gInternational.info.interMediaryBank.value == 'IBY'){
            $scope.nationBankNHTG = true;
            $scope.NHTG = true;
            if(gInternational.info.transMethodNHTG.value == 'CSTG01'){
                ($scope.infoTrans.swiftCodeNHTG.length == 0) ? $scope.swiftCodeNHTG = false : $scope.swiftCodeNHTG = true;
                $scope.addressNHTG = false;
            }else if(gInternational.info.transMethodNHTG.value == 'CSTG02'){
                $scope.swiftCodeNHTG = false;
                ($scope.infoTrans.addressNHTG.length == 0) ? $scope.addressNHTG = false : $scope.addressNHTG = true;
            }
        }

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);



        initRequestToken();

        //Chuyển sang tab quản lý giao dịch
        $scope.changeTab = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.initWithRootView('corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans', true, 'html');
        }
        
        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "4";
            jsonData.idtxn = gInternational.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_PAYMENT_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                // var html = '<embed width="100%" height="640"'
                //     + ' type="application/pdf"'
                //     + ' src="'
                //     + response.respJsonObj.url
                //     + '"></embed>';
                //
                // document.getElementById('contentView').innerHTML = html;
                // var modal = document.getElementById('myModal');
                // modal.style.display = "block";
                // window.onclick = function(event) {
                //     if (event.target == modal) {
                //         modal.style.display = "none";
                //     }
                // }
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

        $scope.onBackClick = function () {
            navCachedPages["corp/international_payments/international_money_trans/international_trans_review"] = null;
            navController.popView(true);
            return;
        }

        $scope.onCancelClick = function () {
            navCachedPages["corp/international_payments/international_money_trans/international_trans_create"] = null;
            navController.initWithRootView("corp/international_payments/international_money_trans/international_trans_create",true, 'html');
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
                cmdType: CONSTANTS.get("CMD_PAYMENT_INTERNATIONAL"),
                request: {
                    transId: gInternational.info.idfcatref,
                    sequence_id: 3,
                    idtxn: gInternational.idtxn,
                    sampleName : gInternational.info.managerBenInputName,
                    issavepayee : gInternational.info.managerBen.value,
                    beneId: gInternational.info.beneIds,
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
                gInternational.result = {};
                gInternational.result.message = objResponse.respContent;
                gInternational.result.respJsonObj = objResponse.respJsonObj;
                gInternational.info.transId = objResponse.respJsonObj.transId;
                gInternational.info.time = objResponse.respJsonObj.time;


                if (objResponse.respCode === '0'){
                    gInternational.result.messageIconClass = "icon-correct";


                }else {

                    if (objResponse.respCode == RESP.get("COM_INVALID_TOKEN")) {
                        showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                        return;
                    }
                    gInternational.result.messageIconClass = "icon-cross";

                }

                navCachedPages["corp/international_payments/international_money_trans/international_trans_result"] = null;
                navController.pushToView("corp/international_payments/international_money_trans/international_trans_result", true);


            }, function (response) {
                var objResponse = JSON.parse(JSON.stringify(response));
                showAlertText(objResponse.respContent);
            });
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
            navCachedPages["corp/international_payments/international_money_trans/international_trans_create"] = null;
            navController.initWithRootView("corp/international_payments/international_money_trans/international_trans_create",true, 'html');
        }

        function clearOTPTimeout() {
            clearTimeout(gCorp.OTPTimeout);
            gCorp.OTPTimeout = null;
            stopProgressBar('authen.progressbarotp'); //stop progress bar
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}