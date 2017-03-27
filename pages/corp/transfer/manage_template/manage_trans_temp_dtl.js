function loadInitXML() {
    return getReviewXmlStore();
}

function viewDidLoadSuccess() {
    gCorp.backToHome = false; // Reset lai gia tri

    // Gen step sequence
   /* var sequenceXSL = getCachePageXsl("sequenceform");
    var sequenceNo = 302;
    if (gCorp.isAuthScreen == true)
        sequenceNo = 311;
    setSequenceFormIdx(sequenceNo);
    var docXml = createXMLDoc();
    var rootNode = createXMLNode("seqFrom", "", docXml);
    createXMLNode("stepNo", sequenceNo, docXml, rootNode);
    genHTMLStringWithXML(docXml, sequenceXSL, function(htmlOutput) {
        var element = document.getElementById("step-sequence");
        element.innerHTML = htmlOutput;
    });*/

    if (gCorp.byPassReview == true) { // Chuyen thang den man authentication
        onAuthorizeClick();
        return;
    }
}

function viewBackFromOther() {
    if (gCorp.backToHome == true) {
        gCorp.backToHome = false;
        onBackClick();
        return;
    }
}

// Khi click huy
function onCancelClick() {
    if (gCorp.rootView) {
        navController.initWithRootView(gCorp.rootView, true, "xsl");
        gCorp.rootView = null;
    } else
        navController.resetBranchView();
}

// Khi click quay lai
function onBackClick() {
    navController.popView(true);
	navCachedPages["corp/transfer/manage_template/manage_trans_temp_dtl"] = null;
}

// Khi nhan nut duyet / xac nhan
function onAuthorizeClick() {
    // Kiem tra han muc neu co
    if (typeof(gCorp.limit) !== "undefined" && typeof(gCorp.totalAmount) !== "undefined") {
        if (parseInt(gCorp.limit.limitTime) < parseInt(gCorp.totalAmount)) {
            var errMsg = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"),
                [formatNumberToCurrency(gCorp.limit.limitTime)]);
            showAlertText(errMsg);
            return;
        }
        if (parseInt(gCorp.limit.limitDay) < parseInt(gCorp.totalAmount) + parseInt(gCorp.limit.totalDay)) {
            var errMsg = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"),
                [formatNumberToCurrency(gCorp.limit.limitDay)]);
            showAlertText(errMsg);
            return;
        }
    }

    gCorp.request = {
        cmdType: gCorp.cmdType,
        request: gCorp.requests[0]
    }

    navCachedPages["corp/common/authentication/com-authentication"] = null;
    navController.pushToView("corp/common/authentication/com-authentication", true, "xsl");
}

// Khi nhan nut tu choi
function onRejectClick() {
    var cmdType = gCorp.cmdType;
    var request = gCorp.requests[1];
    if (request == null)
        request = {};
    // Check xem input nhap ly do tu choi co ton tai ko
    var rejectInput = document.getElementById("reject-reason");
    if (typeof(rejectInput) != "undefined" && rejectInput != null) {
        if (rejectInput.value == "") {
            showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
            return;
        } else {
            var xmlDoc = getReviewXmlStore();
            var sectionNodes = xmlDoc.getElementsByTagName("section");
            if (sectionNodes.length == 0)
                return;
            var firstSectionNode = sectionNodes[0];
            var rowNode = createXMLNode("row", "", xmlDoc, firstSectionNode);
            createXMLNode("label", CONST_STR.get("AUTHORIZE_TXT_REASON"), xmlDoc, rowNode);
            createXMLNode("value", rejectInput.value, xmlDoc, rowNode);
            setReviewXmlStore(xmlDoc);

            // Them vao request
            request.rejectReason = rejectInput.value;
        }
    }

    gCorp.request = {
        cmdType: cmdType,
        request: request
    };

    navCachedPages["corp/common/authentication/com-authentication"] = null;
    navController.pushToView("corp/common/authentication/com-authentication", true, "xsl");
}
