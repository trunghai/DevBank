(function() {
    gCorp.countOTP = 0;
    gCorp.timerOTP = 90;
    gCorp.OTPTimeout = null;
    gCorp.authenType = "";
    
    var app = angular.module("batch-transfer-authen", []);

    app.controller("Main", ["$scope", function($scope) {
        var _this = this;

        _this.transType = gTrans.batch.transType;
        _this.account = gTrans.batch.account;
        _this.data = gTrans.batch.respObj.respJson;
        _this.currentListTrans = [];
        _this.pageSize = 10;

        // Phan trang ket qua
        _this.setPagination = function(pageId) {
            var totalPage = Math.ceil(_this.data.listTrans.length / _this.pageSize);
            _this.currentListTrans = _this.data.listTrans.slice((pageId - 1) * _this.pageSize, pageId * _this.pageSize);
            var pagination = document.getElementById("acc-pagination");
            var paginationHTML = genPageIndicatorHtml(totalPage, pageId);
            paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "gTrans.changePage");
            pagination.innerHTML = paginationHTML;
        };

        // Khi user chuyen trang
        gTrans.changePage = function(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
            _this.setPagination(idx);
            $scope.$apply();
            mainContentScroll.refresh();
        };

        _this.setPagination(1);

        // Kiem tra so du va han muc
        if (_this.data.balanceError == 1)
            showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
        else if (_this.data.limitTimeError != 0) {
        	var errorMessage = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), 
    							[formatNumberToCurrency(_this.data.limitTime)]);
            showAlertText(errorMessage);
        } else if (_this.data.limitDayError != 0) {
            var errorMessage = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), 
					[formatNumberToCurrency(_this.data.limitDay)]);
            showAlertText(errorMessage);
        }

        // Get message loi
        _this.getErrorMsg = function(errorCode) {
            return CONST_STR.get("TRANS_BATCH_ERR_" + errorCode);
        };

        // Convert sang kieu tien te
        _this.toCurrency = function(amount) {
            return formatNumberToCurrency(amount);
        };

        // Khi NSD click tiep tuc
        _this.continue = function() {
            sendJSONRequest();
        };

        // Khi NSD click huy
        _this.cancel = function() {
            gTrans.batch = null;
            navController.resetBranchView();
            return;
        };

        // Quay lai man hinh truoc, giu nguyen cac gia tri nhap
        _this.goBack = function() {
            navCachedPages["corp/transfer/batch/make/batch-transfer-review"] = null;
            navController.popView(true);
            return;
        };

        // Khi NSD click chuyen tab
        _this.changeTab = function() {
            navController.initWithRootView('corp/transfer/batch/mng/batch-transfer-mng-scr', true, 'xsl');
        }

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

        // Gui request lan dau len service
        sendInitRequest();

        var nodeAuthenTitle = document.getElementById("auth.title");
        nodeAuthenTitle.innerHTML = CONST_STR.get("AUTHEN_TXT_INPUT_KEY_TITLE");

        var nodeInputToken = document.getElementById("authen.tokenkey");
        setInputOnlyNumber('authen.tokenkey', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));
        nodeInputToken.addEventListener('evtSpecialKeyPressed', handleEnterPressed, false);
    }]);

    // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["batch-transfer-authen"]);

    // Gui request lan dau len service
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

        requestMBServiceCorp(data, true, 0, function(responseText) {
            var nodeInputToken = document.getElementById("authen.tokenkey");
            mainContentScroll.scrollToElement(nodeInputToken, 50);
            nodeInputToken.select();
            nodeInputToken.focus();
        
            startProgressBar("authen.progressbarotp", gCorp.timerOTP);
            gCorp.OTPTimeout = setTimeout(function doAfterProgress() {
                handleOTPTimeout();
            }, gCorp.timerOTP * 1000);
            var response = JSON.parse(responseText);
            gCorp.authenType = response.respJsonObj.tokenType;
            if (gCorp.authenType == "MTX") {
                var mtxPos = response.respJsonObj.MTXPOS;
                var nodeTokenType = document.getElementById("authen.tokentype");
                nodeTokenType.innerHTML = formatString(CONST_STR.get("COM_TOKEN_MTX_INPUT_LABEL"), [mtxPos]);
            }
        });
    }

    //send confirm message
    function sendJSONRequest() {
        var nodeTokenKey = document.getElementById("authen.tokenkey");
        var tmpTokenStr = nodeTokenKey.value;
        if (tmpTokenStr.length != 6) {
            showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
            return;
        }

        var args = [];
        var request = {
            cmdType: gTrans.batch.respObj.responseType,
            request: {
                transactionId: gTrans.batch.respObj.respJson.transactionId,
                sequenceId: 3,
                idtxn: gTrans.batch.transType.key
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

        var respSuccess = function(data) {
            var response = JSON.parse(data);
            if (response.respCode == 0) {
                gTrans.batch.message = response.respContent;
                gTrans.batch.messageIconClass = "icon-correct";
            } else {
                if (response.respCode == RESP.get("COM_INVALID_TOKEN")) {
                    showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
                    return;
                }
                gTrans.batch.message = response.respContent;
                gTrans.batch.messageIconClass = "icon-cross";
            }
            if (typeof(response.respJsonObj.date) !== "undefined")
                gTrans.batch.respObj.respJson.date = response.respJsonObj.date;
            navCachedPages["corp/transfer/batch/make/batch-transfer-result"] = null;
            navController.pushToView("corp/transfer/batch/make/batch-transfer-result", true);
        };

        var respFailed = function(data) {
            showAlertText(response.respContent);
        };

        requestMBServiceCorp(data, true, 0, respSuccess, respFailed);
    }

    // Khi click nut enter
    function handleEnterPressed(e) {
        var ew = e.keyPress;
        if (ew == 13) {
            sendJSONRequest();
        } else {
            return;
        }
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
        navController.popToRootView(true);
    }

    function clearOTPTimeout() {
        clearTimeout(gCorp.OTPTimeout);
        gCorp.OTPTimeout = null;
        stopProgressBar('authen.progressbarotp'); //stop progress bar
    }

    function resendOTP() {
        clearOTPTimeout();
        sendJSONRequestOTP();
    }

    function handleRequestConfirmAlertOK() {
        document.removeEventListener("alertConfirmOK", handleRequestConfirmAlertOK, false);
        document.removeEventListener("alertConfirmCancel", handleRequestConfirmAlertCancel, false);
        navController.resetBranchView();
    }

    function handleRequestConfirmAlertCancel() {
        document.removeEventListener("alertConfirmOK", handleRequestConfirmAlertOK, false);
        document.removeEventListener("alertConfirmCancel", handleRequestConfirmAlertCancel, false);
        var tmpPageName = navController.getDefaultPage();
        var tmpPageType = navController.getDefaultPageType();
        navController.initWithRootView(tmpPageName, true, tmpPageType);
        navController.resetCacheBranch();
    }

})();
