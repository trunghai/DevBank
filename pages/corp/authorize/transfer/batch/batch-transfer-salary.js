/**
 * Created by TrungVQ.FPT
 * User: TrungVQ.FPT
 * Date: 12/10/15
 * Time: 9:54 AM
 */

gCorp.isBack = false;
var listTrans;

// Khoi tao bien
function initVariables() {
    gTrans.authorize = {
        idtxn: "T66", // Khoi tao
        selectionType: 0,
        transType: "",
        listMakers: [],
        makerId: "",
        transStatus: "",
        listTrans: [],
        pageId: 1,
        pageSize: 10,
        totalPage: 0,
        request: {}
    };
}

// Khi view load xong
function viewDidLoadSuccess() {
    if (!gCorp.isBack)
        initVariables();

    init();

    // Init datepicker
    createDatePicker("id.begindate", "span.begindate");
    createDatePicker("id.enddate", "span.enddate");
	
    // setTimeout(function () {
    //    document.getElementById("btn_search").click();
    // }, 1100);
}

function init() {
    angular.module("EbankApp").controller("batch-transfer-salary", function ($scope, requestMBServiceCorp) {
        initData();
        function initData() {
            // Get danh sach nguoi tao
            if (gTrans.authorize.listMakers.length === 0) {
                var request = {
                    sequenceId: 1,
                    idtxn: gTrans.authorize.idtxn
                }
                var args = ["", request];
                var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY"), "",
                    "", gUserInfo.lang, gUserInfo.sessionID, args);
                var requestData = getDataFromGprsCmd(gprsCmd);
                var onSuccess = function(data) {
                    var response = data;
                    if (response.respCode == "0") {
                        gTrans.authorize.listMakers = response.respJsonObj.makers;

                        if (response.respJsonObj.list_pending.length > 0){
                            listTrans = response.respJsonObj.list_pending;

                            // Tinh so trang
                            if (listTrans.length == 0) {
                                gTrans.authorize.totalPage = 0;
                            } else {
                                var totalRow = listTrans[0].TOTAL;
                                gTrans.authorize.totalPage = Math.ceil(totalRow / gTrans.authorize.pageSize);
                            }

                            viewSearchResult();
                        }

                    }
                }
                requestMBServiceCorp.post(requestData, onSuccess);
            }
        }

        // Khi click search
        $scope.searchTransaction = function () {
            var fromDate = document.getElementById("id.begindate").value;
            var toDate = document.getElementById("id.enddate").value;
            var today = getStringFromDate();

            if (fromDate == "dd/mm/yyyy")
                fromDate = "";
            if (toDate == "dd/mm/yyyy")
                toDate = "";
            var diffDays;

            if (fromDate != "" && toDate != "") {
                diffDays = getDiffDaysBetween(fromDate, toDate, "dd/MM/yyyy");
                if (diffDays < 0) {
                    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
                    return null;
                }
            }

            if (fromDate != "") {
                diffDays = getDiffDaysBetween(today, fromDate, "dd/MM/yyyy");
                if (diffDays > 0) {
                    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
                    return null;
                }
            }

            if (toDate != "") {
                diffDays = getDiffDaysBetween(today, toDate, "dd/MM/yyyy");
                if (diffDays > 0) {
                    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
                    return null;
                }
            }

            gTrans.authorize.pageId = 1;
            var request = {
                sequenceId: 2,
                idtxn: gTrans.authorize.idtxn,
                transType: gTrans.authorize.transType,
                makerId: gTrans.authorize.makerId,
                transStatus: gTrans.authorize.transStatus,
                fromDate: fromDate,
                endDate: toDate,
                pageId: gTrans.authorize.pageId,
                pageSize: gTrans.authorize.pageSize
            }

            // Back up (chuyen trang giu nguyen request cu)
            gTrans.authorize.request = request;
            sendJSONRequest();
        }

        // Gui du lieu len service
        function sendJSONRequest() {
            var args = ["", gTrans.authorize.request];
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY"), "", "",
                gUserInfo.lang, gUserInfo.sessionID, args);
            var requestData = getDataFromGprsCmd(gprsCmd);

            var onSuccess = function(data) {
                var response = JSON.parse(data);
                if (response.respCode == "0") {
                    listTrans = response.respJsonObj.list_pending;
                    var xml = generateXMLTable(listTrans);
                    var xsl = getCachePageXsl(
                        "corp/authorize/transfer/batch/batch-transfer-salary-table");
                    genHTMLStringWithXML(xml, xsl, function(oStr) {
                        document.getElementById("id.searchResult").innerHTML = oStr;
                    });

                    // Tinh so trang
                    if (listTrans.length == 0) {
                        gTrans.authorize.totalPage = 0;
                    } else {
                        var totalRow = listTrans[0].TOTAL;
                        gTrans.authorize.totalPage = Math.ceil(totalRow / gTrans.authorize.pageSize);
                    }

                    // Gen phan trang
                    var pagination = document.getElementById("pagination");
                    var paginationHTML = genPageIndicatorHtml(gTrans.authorize.totalPage, gTrans.authorize
                        .pageId);
                    paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
                    pagination.innerHTML = paginationHTML;

                } else {
                    showAlertText(response.respContent);
                }
            }
            requestMBServiceCorp.post(requestData, onSuccess);
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}

// Khi back tu man hinh khac
function viewBackFromOther() {
    gCorp.isBack = true;
}

// Khi chon loai giao dich
function chooseTransType() {
    gTrans.authorize.selectionType = 1;
    var typeValues = (gUserInfo.lang == 'EN') ? CONST_TRANS_BATCH_TRANS_TYPE_EN :
        CONST_TRANS_BATCH_TRANS_TYPE_VN;
    var typeKeys = CONST_TRANS_BATCH_TRANS_TYPE;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), typeValues, typeKeys, false);
}

// Khi chon nguoi tao
function chooseMaker() {
    gTrans.authorize.selectionType = 2;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), gTrans.authorize.listMakers, '',
        false);
}

// Khi chon trang thai
function chooseStatus() {
    gTrans.authorize.selectionType = 3;
    var statusValues = (gUserInfo.lang == 'EN') ? CONST_APPROVE_TRANS_STATUS_EN :
        CONST_APPROVE_TRANS_STATUS_VN;
    var statusKeys = CONST_APPROVE_TRANS_STATUS;
    dialogInit();
    showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), statusValues, statusKeys, false);
}



// Chuyen trang
function changePage(idx) {
    gTrans.authorize.pageId = idx;
    viewSearchResult();

};

function viewSearchResult() {
    var startIdx = (gTrans.authorize.pageId - 1) * gTrans.authorize.pageSize;
    var endIdx = gTrans.authorize.pageId * gTrans.authorize.pageSize;
    var listTransCurrentPage = listTrans.slice(startIdx, endIdx);

    var xml = generateXMLTable(listTransCurrentPage);
    var xsl = getCachePageXsl(
        "corp/authorize/transfer/batch/batch-transfer-salary-table");
    genHTMLStringWithXML(xml, xsl, function(oStr) {
        document.getElementById("id.searchResult").innerHTML = oStr;

        // Gen phan trang
        var pagination = document.getElementById("pagination");
        var paginationHTML = genPageIndicatorHtml(gTrans.authorize.totalPage, gTrans.authorize
            .pageId);
        paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
        pagination.innerHTML = paginationHTML;
    });



}


// Gen XML cho bang danh sach giao dich
function generateXMLTable(listTrans) {
    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode("listTrans", "", xmlDoc);
    for (var i = 0; i < listTrans.length; i++) {
        var trans = listTrans[i];
        var rowNode = createXMLNode("row", "", xmlDoc, rootNode);
        createXMLNode("stt", trans.STT, xmlDoc, rowNode);
        createXMLNode("datemake", trans.DATMAKE, xmlDoc, rowNode);
        createXMLNode("amount", formatNumberToCurrency(trans.NUMAMOUNT) + " " + trans.CODTRNCURR,
            xmlDoc, rowNode);
        createXMLNode("status", CONST_STR.get("TRANS_STATUS_" + trans.CODSTATUS), xmlDoc, rowNode);
        createXMLNode("approver", trans.SIGNEDBY, xmlDoc, rowNode);
        createXMLNode("transId", trans.IDFCATREF, xmlDoc, rowNode);
        createXMLNode("idtxn", trans.IDTXN, xmlDoc, rowNode);
    }
    return xmlDoc;
}

// Chuyen sang man hinh chi tiet giao dich
function showTransferDetail(transId, transType) {
    var request = {
        sequenceId: 3,
        transId: transId,
        transType: transType,
        idtxn: gTrans.authorize.idtxn,
    }
    var args = ["", request];
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY"), "", "",
        gUserInfo.lang, gUserInfo.sessionID, args);
    var requestData = getDataFromGprsCmd(gprsCmd);

    var onSuccess = function(data) {
        var response = JSON.parse(data);
        // Gen XML cho man hinh common
        var xmlDoc = generateXMLTransDetail(response.respJsonObj);
        setReviewXmlStore(xmlDoc);
        // Request khi click vao nut Duyet
        var authorizeRequest = {
            sequenceId: 4,
            transId: transId,
            transType: transType,
            idtxn: gTrans.authorize.idtxn,
        };
        // Request khi click vao nut Tu choi
        var rejectRequest = {
            sequenceId: 5,
            transId: transId,
            transType: transType,
            idtxn: gTrans.authorize.idtxn,
        };

        gCorp.limit = response.respJsonObj.limit;
        gCorp.totalAmount = response.respJsonObj.info[0].TONG_SO_TIEN;
        gCorp.numBalance = response.respJsonObj.info[0].SO_DU;
        gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY");
        gCorp.requests = [authorizeRequest, rejectRequest];
        gCorp.isAuthScreen = true;

        navCachedPages["corp/common/review/com-review"] = null;
        navController.pushToView("corp/common/review/com-review", true, 'xsl');
    }
    requestMBServiceCorp(requestData, true, 0, onSuccess);
}

// Get XML man hinh detail
function generateXMLTransDetail(transDetail) {
    var transLimit = transDetail.limit;
    var transInfo = transDetail.info[0];
    var transList = transDetail.list;

    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode("review", "", xmlDoc);
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("TRANS_ACCNO_ID"), xmlDoc, rowNode);
    createXMLNode("value", transInfo.MA_GD, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("BATCH_SALARY_PROCESSED_DATE"), xmlDoc, rowNode);
    createXMLNode("value", transInfo.NGAY_THUC_HIEN, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get("TRANS_ACCOUNT_INFO_BLOCK_TITLE"), xmlDoc, sectionNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("COM_TYPE_TRANSACTION"), xmlDoc, rowNode);
    var tmpArray = (gUserInfo.lang == 'EN') ? CONST_TRANS_BATCH_TYPE_EN : CONST_TRANS_BATCH_TYPE_VN;
    if (transInfo.LOAI_GD == "T16")
        createXMLNode("value", tmpArray[0], xmlDoc, rowNode);
    else
        createXMLNode("value", tmpArray[1], xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("TRANS_BATCH_ACC_LABEL"), xmlDoc, rowNode);
    createXMLNode("value", transInfo.TK_CHUYEN, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("CRE_DEBT_SURPLUS_AVAILABEL"), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(transInfo.SO_DU) + " " + transInfo.DON_VI, xmlDoc,
        rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("TRANSFER_LIST_TOTAL_AMOUNT"), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(transInfo.TONG_SO_TIEN) + " " + transInfo.DON_VI,
        xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("TRANSFER_LIST_TOTAL_FEE"), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(transInfo.TONG_PHI) + " " + transInfo.DON_VI,
        xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get("TRANS_BATCH_BALANCE_AFTER"), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(transInfo.SO_DU - transInfo.TONG_SO_TIEN -
        transInfo.TONG_PHI) + " " + transInfo.DON_VI, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("paging", "", xmlDoc, sectionNode);
    createXMLNode("title", CONST_STR.get("CRP_SUM_DETAIL_TRANS"), xmlDoc, sectionNode);

    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
    createXMLNode("th", CONST_STR.get("COM_NO"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_RECEIVE_NAME"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_DESCRIPTION"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_AMOUNT"), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get("COM_ACCOUNT_DEST"), xmlDoc, theadNode);
    if (transInfo.LOAI_GD == "T17") {
        createXMLNode("th", CONST_STR.get("COM_RECEIVER_BANK_NAME"), xmlDoc, theadNode);
        createXMLNode("th", CONST_STR.get("BATCH_SALARY_MNG_TIT_BRANCH_NAME"), xmlDoc, theadNode);
        createXMLNode("th", CONST_STR.get("COM_BANK_CODE"), xmlDoc, theadNode);
    }

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);

    for (var i = 0; i < transList.length; i++) {
        var trans = transList[i];
        var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
        var tdNode;
        tdNode = createXMLNode("td", i + 1, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_NO"), xmlDoc, tdNode);
        tdNode = createXMLNode("td", trans.NGUOI_NHAN, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_RECEIVE_NAME"), xmlDoc, tdNode);
        tdNode = createXMLNode("td", trans.MO_TA, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_DESCRIPTION"), xmlDoc, tdNode);
        tdNode = createXMLNode("td", formatNumberToCurrency(trans.SO_TIEN), xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_AMOUNT"), xmlDoc, tdNode);
        tdNode = createXMLNode("td", trans.TK_NHAN, xmlDoc, trNode);
        createXMLNode("title", CONST_STR.get("COM_ACCOUNT_DEST"), xmlDoc, tdNode);
        if (transInfo.LOAI_GD == "T17") {
            tdNode = createXMLNode("td", trans.TEN_NGAN_HANG, xmlDoc, trNode);
            createXMLNode("title", CONST_STR.get("COM_RECEIVER_BANK_NAME"), xmlDoc, tdNode);
            tdNode = createXMLNode("td", trans.TEN_CHI_NHANH, xmlDoc, trNode);
            createXMLNode("title", CONST_STR.get("BATCH_SALARY_MNG_TIT_BRANCH_NAME"), xmlDoc, tdNode);
            tdNode = createXMLNode("td", trans.MA_NGAN_HANG, xmlDoc, trNode);
            createXMLNode("title", CONST_STR.get("COM_BANK_CODE"), xmlDoc, tdNode);
        }
    }

    var inputNode = createXMLNode("input", CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_TIT_REASON"),
        xmlDoc, rootNode);

    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("CM_BTN_GOBACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "reject", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_REJ"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("AUTHORIZE_BTN_AUTHEN"), xmlDoc, buttonNode);
    if (transInfo.QUYEN_DUYET == "N")
        createXMLNode("disabled", "", xmlDoc, buttonNode);
    
    
    return xmlDoc;
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
    switch (gTrans.authorize.selectionType) {
        case 1: // Loai giao dich
            var element = document.getElementById("id.trans-type");
            element.value = value1;
            gTrans.authorize.transType = value2;
            break;
        case 2: // Nguoi lap
            var element = document.getElementById("id.maker");
            element.value = value1;
            gTrans.authorize.makerId = value1;
            break;
        case 3: // Trang thai
            var element = document.getElementById("id.status");
            element.value = value1;
            gTrans.authorize.transStatus = value2;
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
