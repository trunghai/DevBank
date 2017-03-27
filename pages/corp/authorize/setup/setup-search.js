/**
 * Created by TrungVQ.FPT
 * User: TrungVQ.FPT
 * Date: 12/10/20
 * Time: 9:54 AM
 */
gCorp.isBack = false;

// Khoi tao bien
function initVariables() {
    gSetUp.authorize = {
        listMakers: [],
        pageId: 1,
        pageSize: 10,
        totalPage: 0,
        allTrans: [],
        selectedTrans: [],
        transType: CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_KEY[0],
        makerId: "",
        transStatus: ""
    };
    var inputTransType = document.getElementById("id.trans-type");
    if (inputTransType !== null)
        inputTransType.value = (gUserInfo.lang == 'EN') ?
        CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_EN[0] :
        CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_VN[0];
}

function viewBackFromOther() {
    gCorp.isBack = true;
}

// Khi view load xong
function viewDidLoadSuccess() {
    if (!gCorp.isBack)
        initVariables();

    // Get danh sach nguoi tao
    if (gSetUp.authorize.listMakers.length === 0) {
        var request = {
            sequenceId: 1,
            idtxn: "T66"
        }
        var args = ["", request];
        var gprsCmd = new GprsCmdObj(CONSTANTS.get(
                "CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY"), "", "",
            gUserInfo.lang, gUserInfo.sessionID, args);
        var requestData = getDataFromGprsCmd(gprsCmd);
        var onSuccess = function(data) {
            var response = JSON.parse(data);
            if (response.respCode == "0") {
                gSetUp.authorize.listMakers = response.respJsonObj;
            }
        }
        requestMBServiceCorp(requestData, false, 0, onSuccess);
    }

    // Init datepicker
    createDatePicker("id.begindate", "span.begindate");
    createDatePicker("id.enddate", "span.enddate");
	
	setTimeout(function () {
       document.getElementById("btn_search").click();
    }, 1100);
}

// Khi click search
function searchTransaction() {
    gSetUp.authorize.pageId = 1;
    var request = {
        sequenceId: 1,
        idtxn: "S64",
        transType: gSetUp.authorize.transType,
        makerId: gSetUp.authorize.makerId,
        transStatus: gSetUp.authorize.transStatus,
        fromDate: document.getElementById("id.begindate").value,
        endDate: document.getElementById("id.enddate").value,
        pageId: gSetUp.authorize.pageId,
        pageSize: gSetUp.authorize.pageSize
    }

    // Back up (chuyen trang giu nguyen request cu)
    gSetUp.authorize.request = request;
    sendJSONRequest();
}

// Chuyen trang
function changePage(idx) {
    gSetUp.authorize.pageId = idx;
    gSetUp.authorize.request.pageId = idx;
    sendJSONRequest();
};

// Gui du lieu len service
function sendJSONRequest() {
    // Validate
    var fromDate = gSetUp.authorize.request.fromDate;
    var endDate = gSetUp.authorize.request.endDate;
    var diffDays = getDiffDaysBetween(fromDate, endDate, "dd/MM/yyyy");
    if (diffDays < 0) {
        showAlertText(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
        return;
    }

    var args = ["", gSetUp.authorize.request];
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_SETUP"), "", "",
        gUserInfo.lang, gUserInfo.sessionID, args);
    var requestData = getDataFromGprsCmd(gprsCmd);

    var onSuccess = function(data) {
        var response = JSON.parse(data);
        if (response.respCode == "0") {
            var listTrans = response.respJsonObj;
            gSetUp.authorize.allTrans = listTrans;
            var xml = generateXMLTable(listTrans);
            var xsl = getCachePageXsl(
                "corp/authorize/setup/setup-search-table");
            genHTMLStringWithXML(xml, xsl, function(oStr) {
                document.getElementById("id.searchResult").innerHTML = oStr;
            });

            var controlSection = document.getElementById("tblApproveInput");
            if (listTrans.length == 0) {
                gSetUp.authorize.totalPage = 0;
                controlSection.style.display = "none";
            } else {
                var totalRow = listTrans[0].TOTAL;
                gSetUp.authorize.totalPage = Math.ceil(totalRow / gSetUp.authorize.pageSize);
                controlSection.style.display = "table";
            }

            // Gen phan trang
            var pagination = document.getElementById("pagination");
            pagination.innerHTML = "";
            var paginationHTML = genPageIndicatorHtml(gSetUp.authorize.totalPage, gSetUp.authorize
                .pageId);
            paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
            pagination.innerHTML = paginationHTML;

        } else {
            showAlertText(response.respContent);
        }
    }
    requestMBServiceCorp(requestData, true, 0, onSuccess);
}

// Check/uncheck toan bo checkbox
function checkAllTrans() {
    var chkAll = document.getElementById("checkAllTrans");
    var checkedArray = document.getElementsByClassName("checkTransItem");
    if (chkAll.checked) {
        for (var i = 0; i < checkedArray.length; i++) {
            checkedArray[i].checked = true;
        }
    } else {
        for (var i = 0; i < checkedArray.length; i++) {
            checkedArray[i].checked = false;
        }
    }
}

// Duyet nhieu giao dich
function authorizeTrans() {
    var checkedArray = getChecked();
    if (checkedArray.length == 0) {
        showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
        return;
    }
    var request = generateRequest(2, checkedArray); // sequenceId = 2: Duyet
    if (!request) {
        showAlertText(CONST_STR.get("AUTHORIZE_SETUP_NOT_SAME_TYPE"));
        return;
    }
    goToReviewScreen(request);
}

// Tu choi nhieu giao dich
function rejectTrans() {
    var checkedArray = getChecked();
    if (checkedArray.length == 0) {
        showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
        return;
    }
    var rejectReason = document.getElementById("reject-reason").value;
    if (!rejectReason) {
        showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
        return;
    }
    var request = generateRequest(3, checkedArray, rejectReason); // sequenceId = 3: Tu choi
    if (!request) {
        showAlertText(CONST_STR.get("AUTHORIZE_SETUP_NOT_SAME_TYPE"));
        return;
    }

    goToReviewScreen(request);
}

// Den man hinh hien thi chi tiet giao dich
function showTransferDetail(transId, idtxn) {
    var getDetailRequest = {
        sequence_id: idtxn == "S14" ? 6 : 8,
        idtxn: "S03",
        transId: transId
    };
    var args = ["", getDetailRequest];
    var gprsCmd = new GprsCmdObj(CONSTANTS.get(
            "CMD_CO_SETUP_QUERY_TRANSFER"), "", "",
        gUserInfo.lang, gUserInfo.sessionID, args);
    var requestData = getDataFromGprsCmd(gprsCmd);
    var onSuccess = function(data) {
        var response = JSON.parse(data);
        if (response.respCode == "0") {
            var docXML;
            if (idtxn == "S14")
                docXML = genDetailChangeAuthMethodScreen(response.respJsonObj.results[0]);
            else
                docXML = genDetailChangeTransLimitScreen(response.respJsonObj.results[0]);
            
            if (currentPage == "corp/common/review/com-review") {
                gCorp.detailXML = docXML;
                navCachedPages["corp/common/detail/com-detail"] = null;
                navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
            } else {
                setReviewXmlStore(docXML);

                var authorizeRequest = {
                    sequenceId: 2,
                    idtxn: idtxn == "S14" ? "S64" : "S65",
                    transIds: transId,
                    transType: idtxn
                };
                var rejectRequest = {
                    sequenceId: 3,
                    idtxn: idtxn == "S14" ? "S64" : "S65",
                    transIds: transId,
                    transType: idtxn
                }
                gCorp.isAuthScreen = true;
                gCorp.requests = [authorizeRequest, rejectRequest];
                gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_SETUP");
                navCachedPages["corp/common/review/com-review"] = null;
                navController.pushToView("corp/common/review/com-review", true, 'xsl');
            }
        } else
            showAlertText(response.respContent);
    }
    requestMBServiceCorp(requestData, true, 0, onSuccess);
}

// Chuyen sang man hinh review
function goToReviewScreen(request) {
    // Gen XML
    var xmlDoc = generateXMLReview(request.rejectReason);
    setReviewXmlStore(xmlDoc);

    // Chuyen port va request sang
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_SETUP");
    gCorp.requests = [request];
    gCorp.isAuthScreen = true;
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

// Tao request de gui sang man hinh common
// Tra ve false neu khong cung idtxn
function generateRequest(sequenceId, checkedArray, rejectReason) {
    var idtxn = "";
    var tmpArr = [];
    for (var i = 0; i < checkedArray.length; i++) {
        var checked = checkedArray[i];
        if (i == 0) {
            idtxn = checked.IDTXN;
            tmpArr.push(checked.MA_GD);
        } else if (checked.IDTXN == idtxn)
            tmpArr.push(checked.MA_GD);
        else
            return false;
    }
    var request = {
        sequenceId: sequenceId,
        idtxn: idtxn == "S14" ? "S64" : "S65",
        transIds: tmpArr.join(),
        transType: idtxn
    };
    if (rejectReason)
        request.rejectReason = rejectReason;

    return request;
}

// Get danh sach nhung giao dich duoc select
function getChecked() {
    var elements = document.getElementsByClassName("checkTransItem");
    var checkedArray = [];
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i];
        if (e.checked) {
            checkedArray.push(gSetUp.authorize.allTrans[e.name - 1]);
        }
    }
    gSetUp.authorize.selectedTrans = checkedArray;
    return checkedArray;
}

// Gen XML cho bang danh sach giao dich
function generateXMLTable(listTrans) {
    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode("listTrans", "", xmlDoc);
    for (var i = 0; i < listTrans.length; i++) {
        var trans = listTrans[i];
        var rowNode = createXMLNode("row", "", xmlDoc, rootNode);
        createXMLNode("stt", trans.STT, xmlDoc, rowNode);
        createXMLNode("datemake", trans.NGAY_LAP, xmlDoc, rowNode);
        createXMLNode("maker", trans.NGUOI_LAP, xmlDoc, rowNode);
        if (trans.IDTXN == "S14")
            createXMLNode("type", CONST_STR.get("COM_METHOD"), xmlDoc,
                rowNode);
        else
            createXMLNode("type", CONST_STR.get("COM_TRAN_LIMIT"), xmlDoc,
                rowNode);
        createXMLNode("status", CONST_STR.get("TRANS_STATUS_" + trans.TRANG_THAI), xmlDoc, rowNode);
        createXMLNode("approver", trans.NGUOI_DUYET, xmlDoc, rowNode);
        createXMLNode("transId", trans.MA_GD, xmlDoc, rowNode);
        createXMLNode("idtxn", trans.IDTXN, xmlDoc, rowNode);
    }
    return xmlDoc;
}

// Gen XML chuyen sang man hinh review common
function generateXMLReview(rejectReason) {
    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode("review", "", xmlDoc);
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);

    // th
    createXMLNode("th", CONST_STR.get("TRANSFER_LIST_STT"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_CREATED_DATE"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_MAKER"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_CHEKER"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("TRANS_INFO_TRANSACTION_ID"), xmlDoc, theadNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
    for (var i = 0; i < gSetUp.authorize.selectedTrans.length; i++) {
        var trans = gSetUp.authorize.selectedTrans[i];
        var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
        var tdNode;
        // td
        tdNode = createXMLNode("td", i + 1, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("TRANSFER_LIST_STT"), xmlDoc, tdNode);

        tdNode = createXMLNode("td", trans.NGAY_LAP, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_CREATED_DATE"), xmlDoc, tdNode);

        tdNode = createXMLNode("td", trans.NGUOI_LAP, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_MAKER"), xmlDoc, tdNode);

        tdNode = createXMLNode("td", trans.NGUOI_DUYET, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_CHEKER"), xmlDoc, tdNode);

        tdNode = createXMLNode("td", "", xmlDoc, trNode);
        createXMLNode("onclick", "showTransferDetail('" + trans.MA_GD + "', '" + trans.IDTXN + "')",
            xmlDoc, tdNode);
        createXMLNode("title", CONST_STR.get("TRANS_INFO_TRANSACTION_ID"), xmlDoc, tdNode);
        createXMLNode("value", trans.MA_GD, xmlDoc, tdNode);
    }

    if (rejectReason) {
        sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
        createXMLNode("class", "reject-section", xmlDoc, sectionNode);
        var rejectReason = CONST_STR.get("AUTHORIZE_TXT_REASON") + ": " + rejectReason;
        var rowNode = createXMLNode("row-one-col", rejectReason, xmlDoc, sectionNode);
    }

    // Button
    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("CM_BTN_GOBACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("AUTH_TYPE_BTN_SEND"), xmlDoc, buttonNode);

    return xmlDoc;
}

// Gen XML cho man review phuong thuc xac thuc
function genDetailChangeAuthMethodScreen(reviewData) {
    var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);

    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("COM_TRANS_CODE"), xmlDoc, rowNode);
    createXMLNode("value", reviewData.MA_GD, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("BATCH_SALARY_PROCESSED_DATE"), xmlDoc, rowNode);
    createXMLNode("value", reviewData.NGAY_THUC_HIEN, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get("COM_METHOD_ARE_USED"), xmlDoc,
        sectionNode);
    if (reviewData.KIEU_XAC_THUC_CU == "OTP")
        reviewData.KIEU_XAC_THUC_CU = "OTP_SMS";
    else if (reviewData.KIEU_XAC_THUC_CU == "VAS")
        reviewData.KIEU_XAC_THUC_CU = "OTP_VAS";
    createXMLNode("row-one-col", CONST_STR.get("COM_TOKEN_" + reviewData.KIEU_XAC_THUC_CU),
        xmlDoc, sectionNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get("CONST_SETUP_QUERY_TIT_AUTH_METHOD_NEW"), xmlDoc,
        sectionNode);
    if (reviewData.KIEU_XAC_THUC_MOI == "OTP")
        reviewData.KIEU_XAC_THUC_MOI = "OTP_SMS";
    else if (reviewData.KIEU_XAC_THUC_MOI == "VAS")
        reviewData.KIEU_XAC_THUC_MOI = "OTP_VAS";
    createXMLNode("row-one-col", CONST_STR.get("COM_TOKEN_" + reviewData.KIEU_XAC_THUC_MOI),
        xmlDoc, sectionNode);

    createXMLNode("input", CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_TIT_REASON"), xmlDoc, rootNode);

    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("CM_BTN_GOBACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "reject", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_REJ"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("AUTHORIZE_BTN_AUTHEN"), xmlDoc, buttonNode);

    return xmlDoc;
}

// Gen XML cho man review han muc giao dich
function genDetailChangeTransLimitScreen(reviewData) {
    var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);

    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("COM_TRANS_CODE"), xmlDoc, rowNode);
    createXMLNode("value", reviewData.MA_GD, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("BATCH_SALARY_PROCESSED_DATE"), xmlDoc, rowNode);
    createXMLNode("value", reviewData.NGAY_THUC_HIEN, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
    var trNode = createXMLNode("tr", "", xmlDoc, theadNode);
    createXMLNode("class", "trow-title", xmlDoc, trNode);

    var thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, trNode);
    createXMLNode("rowspan", "2", xmlDoc, thNode);
    thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_MAX_LIMIT"), xmlDoc, trNode);
    createXMLNode("colspan", "2", xmlDoc, thNode);
    thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SELECTED_LIMIT"), xmlDoc,
        trNode);
    createXMLNode("colspan", "2", xmlDoc, thNode);

    trNode = createXMLNode("tr", "", xmlDoc, theadNode);
    createXMLNode("class", "trow-title", xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, trNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);

    var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    // Tai khoan
    var tdNode = createXMLNode("td", CONST_STR.get("COM_ACCOUNT"), xmlDoc,
        trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GACCO_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GACCO_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GACCO_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GACCO_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    // Chuyen khoan
    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GTRAN_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GTRAN_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GTRAN_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GTRAN_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    //Thanh toan dich vu
    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    tdNode = createXMLNode("td", CONST_STR.get("COM_PAY_SERVICE"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GPAYS_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GPAYS_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GPAYS_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GPAYS_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    // Thanh toan quoc te
    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GPAYI_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.OLD_GPAYI_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GPAYI_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatNumberToCurrency(reviewData.NEW_GPAYI_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    createXMLNode("input", CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_TIT_REASON"), xmlDoc, rootNode);

    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("CM_BTN_GOBACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "reject", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_REJ"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("AUTHORIZE_BTN_AUTHEN"), xmlDoc, buttonNode);

    return xmlDoc;
}

// Khi chon loai giao dich
function chooseTransType() {
    gSetUp.authorize.selectionType = 1;
    var typeValues = (gUserInfo.lang == 'EN') ?
        CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_EN :
        CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_VN;
    var typeKeys = CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_KEY;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), typeValues,
        typeKeys, false);
}

// Khi chon nguoi tao
function chooseMaker() {
    gSetUp.authorize.selectionType = 2;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), gSetUp.authorize
        .listMakers, '', false);
}

// Khi chon trang thai
function chooseStatus() {
    gSetUp.authorize.selectionType = 3;
    var statusValues = (gUserInfo.lang == 'EN') ? CONST_APPROVE_TRANS_STATUS_EN :
        CONST_APPROVE_TRANS_STATUS_VN;
    var statusKeys = CONST_APPROVE_TRANS_STATUS;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), statusValues, statusKeys,
        false);
}

// Them event listener de tuong tac voi dialog
function dialogInit() {
    document.addEventListener("evtSelectionDialog", dialogSelect, false);
    document.addEventListener("evtSelectionDialogogClose", dialogClose, false);
}

// Khi user select 1 item trong dialog
function dialogSelect(e) {
    var value1 = e.selectedValue1;
    var value2 = e.selectedValue2;
    switch (gSetUp.authorize.selectionType) {
        case 1: // Loai giao dich
            var element = document.getElementById("id.trans-type");
            element.value = value1;
            gSetUp.authorize.transType = value2;
            break;
        case 2: // Nguoi lap
            var element = document.getElementById("id.maker");
            element.value = value1;
            gSetUp.authorize.makerId = value1;
            break;
        case 3: // Trang thai
            var element = document.getElementById("id.status");
            element.value = value1;
            gSetUp.authorize.transStatus = value2;
            break;
        default:
            break;
    }
}

// Khi close dialog
function dialogClose(e) {
    document.removeEventListener("evtSelectionDialog", dialogSelect, false);
    document.removeEventListener("evtSelectionDialogClose", dialogClose, false);
}
