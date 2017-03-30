if (gCorp == null)
    gCorp = {};

gCorp.countOTP = 0;
gCorp.timerOTP = 90;
gCorp.authenType = "";


function loadInitXML() {
    return getReviewXmlStore();
}

function viewDidLoadSuccess() {
    clearOTPTimeout();
    genPaging();
    
    // Update ly do tu choi neu co
    var rejectReason = document.getElementById("reject-reason");
    if (rejectReason != null && gCorp.request.request.rejectReason) {
        rejectReason.innerHTML = gCorp.request.request.rejectReason;
    }

    if (gCorp.byPassReview == true) {
        gCorp.backToHome = true;
        gCorp.byPassReview = false;
    }

    // An nut quay lai
    if (gCorp.hideBackButton === true) {
        gCorp.hideBackButton = false;
        document.getElementById("backBtn").style.display = "none";
    }

    // Gen step sequence
    var sequenceXSL = getCachePageXsl("sequenceform");
    var sequenceNo = 302;
    if (gCorp.isAuthScreen == true)
        sequenceNo = 312;
    var docXml = createXMLDoc();
    var rootNode = createXMLNode("seqFrom", "", docXml);
    createXMLNode("stepNo", sequenceNo, docXml, rootNode);
    genHTMLStringWithXML(docXml, sequenceXSL, function(htmlOutput) {
        var element = document.getElementById("step-sequence");
        element.innerHTML = htmlOutput;
    });

    initAuthentication();
}

// Khi click huy
function onCancelClick() {
    clearOTPTimeout();
    if (gCorp.rootView) {
        navController.initWithRootView(gCorp.rootView, true, "xsl");
        gCorp.rootView = null;
    } else
        navController.resetBranchView();
}

// Khi click quay lai
function onBackClick() {
    clearOTPTimeout();
    gCorp.backFrom = "authen";
    navController.popView(true);
}

// Khi click tiep tuc
function onContinueClick() {
    clearOTPTimeout();
    sendJSONRequest();
}

// Khoi tao token
function initAuthentication() {
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

}

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

    // requestMBServiceCorp(data, true, 0, reqestOTP);
    var otp = {"responseType":"0","respCode":"1012","respContent":"FAIL","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"tokenType":"OTP"}};
    reqestOTP(otp);

}

function reqestOTP(responseText) {
    var nodeInputToken = document.getElementById("authen.tokenkey");

    mainContentScroll.scrollToElement(nodeInputToken, 50);
    nodeInputToken.select();
    nodeInputToken.focus();

    startProgressBar("authen.progressbarotp", gCorp.timerOTP);
    gCorp.OTPTimeout = setTimeout(function doAfterProgress() {
        handleOTPTimeout();
    }, gCorp.timerOTP * 1000);
    var response = responseText;
    gCorp.authenType = response.respJsonObj.tokenType;
    if (gCorp.authenType == "MTX") {
        var mtxPos = response.respJsonObj.MTXPOS;
        var nodeTokenType = document.getElementById("authen.tokentype");
        nodeTokenType.innerHTML = formatString(CONST_STR.get("COM_TOKEN_MTX_INPUT_LABEL"), [mtxPos]);
    }
}

// Gui JSON len service
function sendJSONRequest() {
    var nodeTokenKey = document.getElementById("authen.tokenkey");
    var tmpTokenStr = nodeTokenKey.value;
    if (tmpTokenStr.length != 6) {
        showAlertText(CONST_STR.get('ERR_INPUT_TOKEN_EMPTY'));
        return;
    }

    var args = [gCorp.request]; // Lay request tu man hinh review
    args.push({
        sequence_id: 2,
        tokenType: gCorp.authenType,
        tokenKey: tmpTokenStr
    });

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_AUTHENTICATE_TOKEN"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
    var data = getDataFromGprsCmd(gprsCmd);
    // requestMBServiceCorp(data, true, 0, requestMBServiceSuccess);
    requestMBServiceSuccess();
    clearOTPTimeout();
    nodeTokenKey.value = "";
}

function requestMBServiceSuccess() {
    // var response = JSON.parse(responseText);
    var response;
    if(gTrans.idtxn == 'T11' || gTrans.idtxn == 'T12'){
        response = {"responseType":"0","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"transId":"1708710000031191","type":"3","time":"28/03/2017 04:18:26"}};
    }else if(gTrans.idtxn == 'T13'){
        response = {"responseType":"1604","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"transId":"1708910000031199","type":3,"time":"30/03/2017 10:06:43"}};
    }else if(gTrans.idtxn == 'B13'){
        response = {"responseType":"1901","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"transId":"1708910000031201","type":3,"time":"30/03/2017 10:17:18"}};
    }if(gTrans.idtxn == 'S11'){
        response = {"responseType":"1","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"transId":"1708910000031202","type":"1","time":"30/03/2017 10:19:13"}};
    }

    if (response.respCode == "0") {
        stopProgressBar("authen.progressbarotp");
    } else {
        var tmpNodeToken = document.getElementById("authen.tokenkey");
        if ((tmpNodeToken != undefined) && (tmpNodeToken != null)) {
            tmpNodeToken.value = "";
        }
        if (response.respCode == RESP.get("COM_INVALID_TOKEN")) {
            showAlertText(CONST_STR.get("ERR_INPUT_TOKEN_EMPTY"));
            return;
        }
    }
    goToResultScreen(response);
};

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
    if (currentPage == "corp/common/authentication/com-authentication") {
        document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
        document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
        clearOTPTimeout();
        sendInitRequest();
    }
}

// Huy OTP
function handleOTPResendAlertCancel(e) {
    if (currentPage == "corp/common/authentication/com-authentication") {
        document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
        document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
        clearOTPTimeout();
        goToMainScreen();
    }
}

// Qua 5 lan nhap token
function handleOTPGetOver() {
    if (currentPage == "corp/common/authentication/com-authentication") {
        document.removeEventListener("closeAlertView", handleOTPGetOver, false);
        goToMainScreen();
    }
}

function goToMainScreen() {
    clearOTPTimeout();
    navController.popToRootView(true);
}

function clearOTPTimeout() {
    clearTimeout(gCorp.OTPTimeout);
    gCorp.OTPTimeout = null;
    if (document.getElementById("authen.progressbarotp") != null)
        stopProgressBar("authen.progressbarotp"); //stop progress bar
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

// Chuyen sang man hinh hoan tat
function goToResultScreen(response) {
    var respObject = response.respJsonObj;

    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode("result", "", xmlDoc);
    var statusNode = createXMLNode("status", "", xmlDoc, rootNode);
    createXMLNode("respCode", response.respCode, xmlDoc, statusNode);
    createXMLNode("message", response.respContent, xmlDoc, statusNode);
    
    var sectionNode;
    if (respObject.type == 1) { // Result dang text
        sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
        var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
        createXMLNode("label", CONST_STR.get("RESULT_TRANSACTION_ID"), xmlDoc, rowNode);
        createXMLNode("value", respObject.transId, xmlDoc, rowNode);

        rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
        createXMLNode("label", CONST_STR.get("COM_EXECUTION_TIME"), xmlDoc, rowNode);
        createXMLNode("value", respObject.time, xmlDoc, rowNode);
    } else if (respObject.type == 2 && typeof(respObject.table) != "undefined") { // Result dang table
        sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
        var authTable = createXMLNode("authorize-table", "", xmlDoc, sectionNode);
        var colspan = 4;
        var isColspanSet = false;
        for (var i = 0; i < respObject.table.length; i++) {
            var rowData = respObject.table[i];
            var rowNode = rowNode = createXMLNode("tr", "", xmlDoc, authTable);
            createXMLNode("maker", rowData.MAKER, xmlDoc, rowNode);
            createXMLNode("dateMake", rowData.DATMAKE, xmlDoc, rowNode);
            if (typeof(rowData.TRANS_TYPE) != "undefined" && rowData.TRANS_TYPE != null) {
                createXMLNode("transType", rowData.TRANS_TYPE, xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
            if (typeof(rowData.NUMAMOUNT) != "undefined" && rowData.NUMAMOUNT != null) {
                createXMLNode("amount", formatNumberToCurrency(rowData.NUMAMOUNT) + " VND", xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
            if (typeof(rowData.STATUS) != "undefined" && rowData.STATUS != null) {
                createXMLNode("status", CONST_STR.get("TRANS_STATUS_" + rowData.STATUS), xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
            createXMLNode("checker", rowData.SIGNEDBY, xmlDoc, rowNode);
            createXMLNode("transId", rowData.IDFCATREF, xmlDoc, rowNode);
            if (typeof(rowData.DATCHECK) != "undefined" && rowData.DATCHECK != null) {
                createXMLNode("dateCheck", rowData.DATCHECK, xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
            if (typeof(rowData.ERROR_CODE) != "undefined" && rowData.ERROR_CODE != null) {
                createXMLNode("errorCode", rowData.ERROR_CODE, xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
            if (typeof(rowData.ERROR_DESC) != "undefined" && rowData.ERROR_DESC != null) {
                createXMLNode("errorDesc", rowData.ERROR_DESC, xmlDoc, rowNode);
                if (!isColspanSet)
                    colspan++;
            }
        }

        createXMLNode("colspan", colspan, xmlDoc, authTable);
    } else if (respObject.type == 3) { // Giu nguyen xml cu, them 1 section vao dau tien
        sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
        var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
        createXMLNode("label", CONST_STR.get("RESULT_TRANSACTION_ID"), xmlDoc, rowNode);
        createXMLNode("value", respObject.transId, xmlDoc, rowNode);

        rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
        createXMLNode("label", CONST_STR.get("COM_EXECUTION_TIME"), xmlDoc, rowNode);
        createXMLNode("value", respObject.time, xmlDoc, rowNode);

        var reviewXML = getReviewXmlStore();
        var sectionList = reviewXML.getElementsByTagName("section");
        for (var i = 0; i < sectionList.length; i++) {
            var tmpNode = sectionList[i].cloneNode(true);
            rootNode.appendChild(tmpNode);
        }
    }

    // Ly do tu choi
    if (typeof(respObject.rejectReason) != "undefined") {
        sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
        createXMLNode("class", "reject-section", xmlDoc, sectionNode);
        var rejectReason = CONST_STR.get("AUTHORIZE_TXT_REASON") + ": " + respObject.rejectReason;
        var rowNode = createXMLNode("row-one-col", rejectReason, xmlDoc, sectionNode);
    }

    var buttonLabel = CONST_STR.get("COM_MAKE_OTHER_TRANS");
    if (gCorp.isAuthScreen)
        buttonLabel = CONST_STR.get("COM_AUTHORIZE_OTHER_TRANS");

    createXMLNode("buttonLabel", buttonLabel, xmlDoc, rootNode);

    console.log(xmlDoc);

    setReviewXmlStore(xmlDoc);
    navCachedPages["corp/common/result/com-result"] = null;
    navController.pushToView("corp/common/result/com-result", true, "xsl");
}

function genPaging() {
    var trs = document.querySelectorAll(".table-paging tbody tr");
    if (trs == null || trs.length == 0)
        return;
    gCorp.tablePageSize = 10;
    gCorp.tableTotalPage = Math.ceil(trs.length / gCorp.tablePageSize);

    setPageTable(1, null, gCorp.tableTotalPage);
}

function setPageTable(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
    var trs = document.querySelectorAll(".table-paging tbody tr");
    if (trs == null)
        return;

    var pagination = document.getElementById("acc-pagination");
    var paginationHTML = genPageIndicatorHtml(inTotalPage, idx);
    paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "setPageTable");
    pagination.innerHTML = paginationHTML;

    var startIdx = (idx - 1) * gCorp.tablePageSize;
    var endIdx = idx * gCorp.tablePageSize - 1;

    for (var i = 0; i < trs.length; i++) {
        var tr = trs[i];
        if (i < startIdx || i > endIdx) {
            tr.style.display = "none";
        } else {
            tr.style.display = "";
        }
    }
}