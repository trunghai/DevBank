gCorp.showRejectReason = true;
gCorp.isBack = false;

function loadInitXML() {
    return getReviewXmlStore();
}

function viewDidLoadSuccess() {
    gCorp.backToHome = false; // Reset lai gia tri

    if (gCorp.byPassReview == true) { // Chuyen thang den man authentication
        onAuthorizeClick();
        return;
    }

    if (!gCorp.isBack)
        genPaging();

    // Gen step sequence
    var sequenceXSL = getCachePageXsl("sequenceform");
    var sequenceNo = 302;
    if (gCorp.isAuthScreen == true)
        sequenceNo = 311;

    var docXml = createXMLDoc();
    var rootNode = createXMLNode("seqFrom", "", docXml);
    createXMLNode("stepNo", sequenceNo, docXml, rootNode);
    genHTMLStringWithXML(docXml, sequenceXSL, function(htmlOutput) {
        var element = document.getElementById("step-sequence");
        element.innerHTML = htmlOutput;
    });
}

function viewBackFromOther() {
    gCorp.isBack = true;
    if (gCorp.backFrom == "authen")
        gCorp.showRejectReason = false;

    // Check xem co bypass man hinh review khong
    if (gCorp.backToHome == true) {
        gCorp.backToHome = false;
        onBackClick();
        return;
    }
}

// Khi click huy
function onCancelClick() {
    resetLimitAndBalance();
    if (gCorp.rootView) {
        navController.initWithRootView(gCorp.rootView, true, "xsl");
        gCorp.rootView = null;
    } else
        navController.resetBranchView();
}

// Khi click quay lai
function onBackClick() {
    navController.popView(true);
}

// Khi nhan nut duyet / xac nhan
function onAuthorizeClick() {
    // Kiem tra so du kha dung
    if (typeof(gCorp.totalAmount) !== "undefined" && typeof(gCorp.numBalance) !== "undefined") {
        if (parseInt(gCorp.numBalance) < parseInt(gCorp.totalAmount)) {
            showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
            return;
        }
    }

    // Kiem tra so du kha dung trong truong hop duyet nhieu GD
    if (typeof(gCorp.transSummaryArr) !== "undefined" && gCorp.transSummaryArr.constructor === Array) {
        for (var i = 0; i < gCorp.transSummaryArr.length; i++) {
            var transSummary = gCorp.transSummaryArr[i];
            if (parseInt(transSummary.numBalance) < parseInt(transSummary.totalAmount)) {
                showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
                return;
            }
        }
    }

    // Kiem tra han muc neu co
    if (typeof(gCorp.limit) !== "undefined" && typeof(gCorp.totalAmount) !== "undefined") {
        var errorMsgTime = "CORP_MSG_COM_LIMIT_EXCEEDED_TIME";
        var errorMsgDay = "CORP_MSG_COM_LIMIT_EXCEEDED_DAY";
        if (gCorp.isAuthScreen) {
            errorMsgTime = "CORP_MSG_COM_LIMIT_EXCEEDED_TIME_AUTH";
            errorMsgDay = "CORP_MSG_COM_LIMIT_EXCEEDED_DAY_AUTH";
        }
            
        if (parseInt(gCorp.limit.limitTime) < parseInt(gCorp.totalAmount)) {
            var errMsg = formatString(CONST_STR.get(errorMsgTime),
                [formatNumberToCurrency(gCorp.limit.limitTime)]);
            showAlertText(errMsg);
            return;
        }
        if (parseInt(gCorp.limit.limitDay) < parseInt(gCorp.totalAmount) + parseInt(gCorp.limit.totalDay)) {
            var errMsg = formatString(CONST_STR.get(errorMsgDay),
                [formatNumberToCurrency(gCorp.limit.limitDay)]);
            showAlertText(errMsg);
            return;
        }
    }

    resetLimitAndBalance();

    gCorp.request = {
        cmdType: gCorp.cmdType,
        request: gCorp.requests[0]
    }

    navCachedPages["corp/common/authentication/com-authentication"] = null;
    navController.pushToView("corp/common/authentication/com-authentication", true, "xsl");
}

// Khi nhan nut tu choi
function onRejectClick() {
    resetLimitAndBalance();
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
            if (gCorp.showRejectReason == true) {
                var xmlDoc = getReviewXmlStore();
                var sectionNodes = xmlDoc.getElementsByTagName("section");
                if (sectionNodes.length == 0)
                    return;
                var firstSectionNode = sectionNodes[0];
                var rowNode = createXMLNode("row", "", xmlDoc, firstSectionNode);
                createXMLNode("label", CONST_STR.get("AUTHORIZE_TXT_REASON"), xmlDoc, rowNode);
                createXMLNode("value", rejectInput.value, xmlDoc, rowNode);
                createXMLNode("id", "reject-reason", xmlDoc, rowNode);
                setReviewXmlStore(xmlDoc);
            }
            
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

// Phan trang cho table
function genPaging() {
    var trs = document.querySelectorAll(".table-paging tbody tr");
    if (trs == null || trs.length == 0)
        return;

    gCorp.tablePageSize = 10;
    gCorp.tableTotalPage = Math.ceil(trs.length / gCorp.tablePageSize);

    setPageTable(1, null, gCorp.tableTotalPage);
}

// Khi click chuyen trang
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

// Reset cac thong tin ve so du, han muc
function resetLimitAndBalance() {
    delete gCorp.totalAmount;
    delete gCorp.numBalance;
    delete gCorp.transSummaryArr;
    delete gCorp.limit;
}