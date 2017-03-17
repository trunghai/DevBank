/**
 * Created by HungNV.FPT
 * Date: 12/10/2015
 */

function loadInitXML() {
    logInfo('common list user approve init');
}

// Show loai giao dich
function showSearchInput(args) {
    gTrans.approveDTI.searchInputType = args;
    var arrInputTypes = [];
    var arrInputIds = [];
    var dialogTitle;    

    if (gTrans.approveDTI.searchInputType == 1) { // loai giao dich
        arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_TRANS_TYPE_APPROVE_EN : CONST_TRANS_TYPE_APPROVE_VN;
        arrInputIds = CONST_TRANS_TYPE_APPROVE_ID;
        dialogTitle = CONST_STR.get('COM_CHOOSEN_TYPE_TRANS');

    } else if (gTrans.approveDTI.searchInputType == 2) { // nguoi lap
        arrInputTypes.push(CONST_STR.get('COM_ALL'));
        arrInputIds.push('ALL');
        for (var i = 0; i < gTrans.approveDTI.listMakers.length; i++) {
            arrInputTypes.push(gTrans.approveDTI.listMakers[i].IDUSER);
            arrInputIds.push(gTrans.approveDTI.listMakers[i].IDUSER);
        }

        dialogTitle = CONST_STR.get('COM_CHOOSE_MAKER');

    } else if (gTrans.approveDTI.searchInputType == 3) { // trang thai
        arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_APPROVE_TRANS_STATUS_EN : CONST_APPROVE_TRANS_STATUS_VN;
        arrInputIds = CONST_APPROVE_TRANS_STATUS;
        dialogTitle = CONST_STR.get('COM_CHOOSE_STATUS');
    }

    document.addEventListener("evtSelectionDialog", handleSearchInput, false);
    document.addEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
    showDialogList(dialogTitle, arrInputTypes, arrInputIds, false);
}

function handleSearchInput(e) {
    if (currentPage == "corp/authorize/transfer/domestic/transfer-domestic") {
        document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
        var inputObj;
        var inputId;

        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {

            if (gTrans.approveDTI.searchInputType == 1) {
                inputObj = document.getElementById('trans.type');
            } else if (gTrans.approveDTI.searchInputType == 2) {
                inputObj = document.getElementById('trans.maker');
            } else if (gTrans.approveDTI.searchInputType == 3) {
                inputObj = document.getElementById('trans.status');
            }

            inputObj.value = e.selectedValue1;
        }

        if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
            if (gTrans.approveDTI.searchInputType == 1) {
                inputId = document.getElementById('id.value.trans.type');
            } else if (gTrans.approveDTI.searchInputType == 2) {
                inputId = document.getElementById('id.value.trans.maker');
            } else if (gTrans.approveDTI.searchInputType == 3) {
                inputId = document.getElementById('id.value.trans.status');
            }

            inputId.value = e.selectedValue2;
        }
    }
}

function handleSearchInputClose() {
    if (currentPage == "corp/authorize/transfer/domestic/transfer-domestic") {
        document.removeEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
        document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
    }
}

function viewBackFromOther() {
    gTrans.backFromOther = true;
}

function viewDidLoadSuccess() {
    if (gTrans.backFromOther) {
        reloadSearchCondition();
    } else {
        gTrans.approveDTI = {
            searchInputType: 0,
            request: {
                idtxn: "T63",
                sequenceId: 0,
                transId: "",
                transDetailCode: ""
            },
            pageId: 1,
            pageSize: 10,
            totalPage: 0,
            displayInput: false,
            idfcatref: "",
            objJSON: {},
            reqMulRej: {},
            reqMulApr: {},
            exportExcel: false
        };
        
    }
    getListMakers();
    createDatePicker('trans.begindate', 'span.begindate');
    createDatePicker('trans.enddate', 'span.enddate');
    gTrans.backFromOther = null;
	
	//document.getElementById("btn_search").click();
	
    // setTimeout(function () {
    //    document.getElementById("btn_search").click();
    // }, 1100);
}

function reloadSearchCondition() {
    var transType = document.getElementById('trans.type');
    var maker = document.getElementById('trans.maker');
    var status = document.getElementById('trans.status');
    var idTransType = document.getElementById('id.value.trans.type');
    var idMaker = document.getElementById('id.value.trans.maker');
    var idStatus = document.getElementById('id.value.trans.status');

    transType.value = gTrans.approveDTI.transType;
    maker.value = gTrans.approveDTI.maker;
    status.value = gTrans.approveDTI.status;
    idTransType.value = gTrans.approveDTI.idTransType;
    idMaker.value = gTrans.approveDTI.idMaker;
    idStatus.value = gTrans.approveDTI.idStatus;
}

function storeSearchCondition() {
    var transType = document.getElementById('trans.type');
    var maker = document.getElementById('trans.maker');
    var status = document.getElementById('trans.status');
    var idTransType = document.getElementById('id.value.trans.type');
    var idMaker = document.getElementById('id.value.trans.maker');
    var idStatus = document.getElementById('id.value.trans.status');

    gTrans.approveDTI.transType = transType.value;
    gTrans.approveDTI.maker = maker.value;
    gTrans.approveDTI.status = status.value;
    gTrans.approveDTI.idTransType = idTransType.value;
    gTrans.approveDTI.idMaker = idMaker.value;
    gTrans.approveDTI.idStatus = idStatus.value;
}

function getListMakers() {
    angular.module("EbankApp").controller("transfer-domestic", function ($scope, requestMBServiceCorp) {
        if (!gTrans.backFromOther){
            var data = {};
            var arrayArgs = new Array();
            var requestListMaker = gTrans.approveDTI.request;
            requestListMaker.sequenceId = 1;

            var strJSON = JSON.stringify(requestListMaker);

            arrayArgs.push("1");
            arrayArgs.push(strJSON);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
            gprsCmd.raw = '';
            data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, requestGetSuccess);
        }

        $scope.searchDTITransfer = function () {
            var searchRequest = getSearchRequest(10000000);
            sendJSONRequest(searchRequest);
        }

        function sendJSONRequest(request) {

            var data = {};
            var arrayArgs = new Array();

            var strJSON = JSON.stringify(request);

            arrayArgs.push("1");
            arrayArgs.push(strJSON);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
            gprsCmd.raw = '';
            data = getDataFromGprsCmd(gprsCmd);

            logInfo(data);

            requestMBServiceCorp.post(data, requestSearchSuccess);
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"),["EbankApp"]);
}

function requestGetSuccess(e) {
    var response = e;
    gTrans.approveDTI.listMakers = response.respJsonObj.makers;
    gTrans.approveDTI.limit = {
        limitTime: response.respJsonObj.limit.limitTime,
        limitDay: response.respJsonObj.limit.limitDay,
        totalDay: response.respJsonObj.limit.totalDay
    };

    if ((response.respCode == RESP.get('COM_SUCCESS'))) {
        mainContentScroll.refresh();
        var listTrans = response.respJsonObj.list_pending;
        gTrans.approveDTI.objJSON = listTrans;
        if (listTrans.length > 0) { // neu co ket qua tra ve
            // Tinh so trang
            if (listTrans.length == 0) {
                gTrans.approveDTI.totalPage = 0;
            } else {
                var totalRow = listTrans[0].TOTAL_ROW;
                gTrans.approveDTI.totalPage = Math.ceil(totalRow / gTrans.approveDTI.pageSize);
            }
            viewSearchResults();
        } else { // neu ko co ket qua tra ve
            showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
        }

    } else {
        if (response.respCode == '1012') {
            showAlertText(response.respContent);
        } else {
            showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
        }
    }
}


function getSearchRequest(pageSize) {
    var searchRequest = {
        idtxn: gTrans.approveDTI.request.idtxn,
        sequenceId: 2,
        transTypeId: document.getElementById("id.value.trans.type").value,
        transStatus: document.getElementById("id.value.trans.status").value,
        transMaker: document.getElementById("id.value.trans.maker").value,
        transId: "",
        dateBegin: document.getElementById("trans.begindate").value,
        dateEnd: document.getElementById("trans.enddate").value,
        pageId: 1,
        pageSize: pageSize
    };
    return searchRequest;
}



function requestSearchSuccess(e) {
    var response = e;
//&& (parseInt(response.responseType) == parseInt(CONSTANTS.get('CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER')))
    if ((response.respCode == RESP.get('COM_SUCCESS'))) {
        mainContentScroll.refresh();
        var listTrans = response.respJsonObj.list_pending;
        gTrans.approveDTI.objJSON = listTrans;
        if (listTrans.length > 0) { // neu co ket qua tra ve
            // Tinh so trang
            if (listTrans.length == 0) {
                gTrans.approveDTI.totalPage = 0;
            } else {
                var totalRow = listTrans[0].TOTAL_ROW;
                gTrans.approveDTI.totalPage = Math.ceil(totalRow / gTrans.approveDTI.pageSize);
            }
            viewSearchResults();
        } else { // neu ko co ket qua tra ve
            showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
        }

    } else {
        if (response.respCode == '1012') {
            showAlertText(response.respContent);
        } else {
            showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
        }
    }
}

// Chuyen trang
function changePage(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
    gTrans.approveDTI.pageId = idx;
    viewSearchResults();
}

function viewSearchResults() {
    var startIdx = (gTrans.approveDTI.pageId - 1) * gTrans.approveDTI.pageSize;
    var endIdx = gTrans.approveDTI.pageId * gTrans.approveDTI.pageSize;
    var listTransCurrentPage = gTrans.approveDTI.objJSON.slice(startIdx, endIdx);
    
    var xmlDoc = genXMLListTrans(listTransCurrentPage);
    var xslDoc = getCachePageXsl("corp/authorize/transfer/domestic/transfer-search-result");

    genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
        document.getElementById("tblContent").innerHTML = oStr;
        // Gen phan trang
        var pagination = document.getElementById("pagination");
        var paginationHTML = genPageIndicatorHtml(gTrans.approveDTI.totalPage, gTrans.approveDTI.pageId);
        paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
        if (pagination != undefined && pagination != null) {
            pagination.innerHTML = paginationHTML;
        }
    });
}

function genXMLListTrans(pJson) {
    var docXml = createXMLDoc();
    var nodeRoot = createXMLNode('resptable', '', docXml);
    var nodeChild;
    var nodeInfo;
    for (var i = 0; i < pJson.length; i++) {
        nodeInfo = createXMLNode('tabletdetail', '', docXml, nodeRoot);
        nodeChild = createXMLNode('stt', pJson[i].RNUM, docXml, nodeInfo);
        nodeChild = createXMLNode('datemake', pJson[i].DATMAKE, docXml, nodeInfo);
        nodeChild = createXMLNode('destAccount', pJson[i].TXTDESTACCT, docXml, nodeInfo);
        nodeChild = createXMLNode('amount', formatNumberToCurrency(pJson[i].NUMAMOUNT), docXml, nodeInfo);
        nodeChild = createXMLNode('beneName', pJson[i].TXTBENNAME, docXml, nodeInfo);
        nodeChild = createXMLNode('approver', pJson[i].IDCHECKER, docXml, nodeInfo);
        nodeChild = createXMLNode('transId', pJson[i].IDFCATREF, docXml, nodeInfo);
        nodeChild = createXMLNode('userRefId', pJson[i].IDUSERREFERENCE, docXml, nodeInfo);
    }
    return docXml;
}


function checkAllTrans() {
    var chkAll = document.getElementById("checkAllTrans");
    var arrCheckItems = document.getElementsByClassName("checkTransItem");
    if (chkAll.checked) {
        for (var i = 0; i < arrCheckItems.length; i++) {
            arrCheckItems[i].checked = true;
        }
    } else {
        for (var i = 0; i < arrCheckItems.length; i++) {
            arrCheckItems[i].checked = false;
        }
    }
}


function showTransferDetail(args) {
    if (currentPage == "corp/authorize/transfer/domestic/transfer-domestic") {
        storeSearchCondition();
    }
    var data = {};
    var arrayArgs = new Array();
    var request = gTrans.approveDTI.request;
    request.sequenceId = 3;
    request.idtxn = gTrans.approveDTI.request.idtxn;
    request.transDetailCode = args;

    var strJSON = JSON.stringify(request);

    arrayArgs.push("2");
    arrayArgs.push(strJSON);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    gprsCmd.raw = '';
    data = getDataFromGprsCmd(gprsCmd);

    logInfo(data);

    requestMBServiceCorp(data, true, 0, requestDetailSuccess);
}

function requestDetailSuccess(e) {
    var objJSON = {};

    var response = JSON.parse(e);
    setRespObjStore(response);
    objJSON = response.respJsonObj;

    if (checkResponseCodeSuccess(response.respCode) && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER")))) {
        genDetailScreen(objJSON[0]);

    } else if (response.respCode != 0) {
        showAlertText(response.respContent);
    }
}

function genDetailScreen(transInfo) {
    var viewBackDetail = false;
    var docXml = createXMLDoc();
    var rootNode;
    rootNode = createXMLNode('review', '', docXml);

    if (currentPage == "corp/common/review/com-review") {
        viewBackDetail = true;
    } 

    /* Thông tin chung */
    var sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('AUTHORIZE_LIST_TRANS_WAITING_FOR_AUTH'), docXml, sectionNode);

    // Ma giao dich
    var rowNode = createXMLNode('row', '', docXml, sectionNode);
    var labelNode = createXMLNode('label', CONST_STR.get('COM_TRANS_CODE'), docXml, rowNode);
    var valueNode = createXMLNode('value', transInfo.IDFCATREF, docXml, rowNode);

    // Ngay thuc hien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_TRANSACTION_DATE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.DATTXN, docXml, rowNode);

    // Lý do từ chối
    if (transInfo.TXTREASON != null) {
        rowNode = createXMLNode('row', '', docXml, sectionNode);
        labelNode = createXMLNode('label', CONST_STR.get('CRP_SUM_REJECT'), docXml, rowNode);
        valueNode = createXMLNode('value', transInfo.TXTREASON, docXml, rowNode);
    }

    /* Thong tin tai khoan */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

    //trans type
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', CONST_STR.get('TRANS_BATCH_TYPE_OTHER'), docXml, rowNode);

    // tai khoan chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.IDSRCACCT, docXml, rowNode);

    // so du kha dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_BEFOR) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    /* Thong tin giao dich */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, sectionNode);

    // tai khoan nhan
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TXTDESTACCT, docXml, rowNode);

    // chu tai khoan nhan 
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TXTBENNAME, docXml, rowNode);

    // ngan hang nhan
    if (transInfo.IDTXN == 'T13') {
        rowNode = createXMLNode('row', '', docXml, sectionNode);
        labelNode = createXMLNode('label', CONST_STR.get('TRANS_BANK_TITLE'), docXml, rowNode);
        valueNode = createXMLNode('value', transInfo.DESTBRANCH, docXml, rowNode);
    }

    // so tien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.NUMAMOUNT) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // phi dich vu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_PAYMENT_FEE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.CHARGEFORDOM) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // so du sau khi chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_FINAL) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // noi dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TXTPAYMTDETAILS1, docXml, rowNode);

    // gui thong bao
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, rowNode);
    valueNode = createXMLNode('value', getSendMethodText(transInfo.SEND_METHOD), docXml, rowNode);

    // Quan ly mau thu huong
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SAVE_BENE'), docXml, rowNode);
    valueNode = createXMLNode('value', getTransTempInfo(transInfo.TYPE_TEMPLATE), docXml, rowNode);

    // ngay hieu luc
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_VALUE_DATE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.DATVALUE, docXml, rowNode);

    // Gen text input
    if (!viewBackDetail) {
        var inputNode = createXMLNode('input', CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_TIT_REASON'), docXml, rootNode);
    } 

    // Gen button

    // Nut quay lai
    var buttonNode = createXMLNode('button', '', docXml, rootNode);
    var typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

    if (!viewBackDetail) {
        // Nut tu choi
        buttonNode = createXMLNode('button', '', docXml, rootNode);
        typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
        btnLabelNode = createXMLNode('label', CONST_STR.get('COM_REJ'), docXml, buttonNode);

        // Nut duyet
        buttonNode = createXMLNode('button', '', docXml, rootNode);
        typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
        btnLabelNode = createXMLNode('label', CONST_STR.get('AUTHORIZE_BTN_AUTHEN'), docXml, buttonNode);

        logInfo(docXml);
        setReviewXmlStore(docXml);
        
        var approveReqest = getSigAprvRequest(5, transInfo.IDUSERREFERENCE);
        approveReqest.transId = transInfo.IDFCATREF;
        var rejectReqest = getSigAprvRequest(4, transInfo.IDUSERREFERENCE);
        rejectReqest.transId = transInfo.IDFCATREF;

        gCorp.requests = [approveReqest, rejectReqest];
        gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER");
        gCorp.isAuthScreen = true;

        gCorp.limit = gTrans.approveDTI.limit;
        /*
        if (transInfo.CHARGEINCL == "N") {
            gCorp.totalAmount = parseInt(transInfo.NUMAMOUNT);
        } else {
             gCorp.totalAmount = parseInt(transInfo.NUMAMOUNT) + parseInt(transInfo.CHARGEFORDOM);
        }
        */
        gCorp.totalAmount = parseInt(transInfo.NUMAMOUNT);
        gCorp.numBalance = parseInt(transInfo.BALANCE_BEFOR);
    } else {
        gCorp.detailXML = docXml;
    }

    navCachedPages["corp/common/review/com-review"] = null;
    navCachedPages["corp/common/detail/com-detail"] = null;
    navCachedPages["corp/common/authentication/com-authentication"] = null;
    navCachedPages["corp/common/result/com-result"] = null;
    if (viewBackDetail) {
        navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
    } else {
        navController.pushToView("corp/common/review/com-review", true, 'xsl');
    }
}

// lay request duyet 1 giao dich
function getSigAprvRequest(sequenceId, idUserref) {
    var request = {
        idtxn: gTrans.approveDTI.request.idtxn,
        sequenceId: sequenceId,
        transId: gTrans.approveDTI.request.transId,
        transDetailCode: idUserref
    };
    return request;
}

// lay request duyet nhieu giao dich
function getMulAprvRequest(sequenceId) {
    var request = {
        idtxn: gTrans.approveDTI.request.idtxn,
        sequenceId: sequenceId,
        transIds: "",
        listIdUserRef: ""
    };
    return request;
}

function approveTransaction(isApprove) {
    storeSearchCondition();
    var data = {};
    var listTrans = getListTransaction();
    if (listTrans.length <= 0) {
        showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
    } else {
        var request = {};
        // tạo request đấy sang common
        if (isApprove) { // duyet
            request = getMulAprvRequest(8);
        } else { // tu choi
            request = getMulAprvRequest(7);
            request.rejectReason = document.getElementById("trans.approve.reason").value;
            if (request.rejectReason == undefined || request.rejectReason.length == 0) {
                showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
                return;
            }
        }
        var listTransId = "";
        var listIdUserRef = "";
        for (var i = 0; i < listTrans.length; i++) {
            listTransId += listTrans[i].IDFCATREF + ",";
            listIdUserRef += listTrans[i].IDUSERREFERENCE + ",";
        }
        request.transIds = listTransId;
        request.listIdUserRef = listIdUserRef;

        genMulTransScreen(listTrans, isApprove, request);
    }
}

function getListTransaction() {
    var arrCheckItems = document.getElementsByClassName("checkTransItem");
    var listTrans = [];
    for (var i = 0; i < arrCheckItems.length; i++) {
        if (arrCheckItems[i].checked) {
            for (var j = 0; j < gTrans.approveDTI.objJSON.length && j < gTrans.approveDTI.pageSize; j++) {
                if (j == i) {
                    var id = (gTrans.approveDTI.pageId - 1) * gTrans.approveDTI.pageSize + i;
                    listTrans.push(gTrans.approveDTI.objJSON[id]);
                }
            }
        }
    }
    logInfo(listTrans);
    return listTrans;
}


function genMulTransScreen(respJsonObj, isApprove, request) {
    var docXml = createXMLDoc();
    rootNode = createXMLNode('review', '', docXml);

    var sectionNode = createXMLNode('section', '', docXml, rootNode);

    /* Bang thong tin */
    var tableNode = createXMLNode('table', '', docXml, sectionNode);

    // tao header
    var theadNode = createXMLNode('thead', '', docXml, tableNode);
    thNode = createXMLNode('th', CONST_STR.get("COM_NO"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("COM_CREATED_DATE"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("TRANS_LOCAL_ACC_DESTINATION"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("COM_RECEIVER"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("COM_AMOUNT"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("COM_CHEKER"), docXml, theadNode);
    thNode = createXMLNode('th', CONST_STR.get("TRANS_ACCNO_ID"), docXml, theadNode);

    // tao body
    var tbodyNode = createXMLNode('tbody', '', docXml, tableNode);
    var trNode;
    var tdNode;
    var clickNode;
    var valueNode;

    var transSummaryArr = [];
    var totalAmount = 0;
    var totalBalance = 0;

    for (var i = 0; i < respJsonObj.length; i++) {
        trNode = createXMLNode('tr', '', docXml, tbodyNode);
        tdNode = createXMLNode('td', i + 1, docXml, trNode);
        createXMLNode('title', CONST_STR.get("COM_NO"), docXml, tdNode);
        tdNode = createXMLNode('td', respJsonObj[i].DATMAKE, docXml, trNode);
        createXMLNode('title', CONST_STR.get("COM_CREATED_DATE"), docXml, tdNode);
        tdNode = createXMLNode('td', respJsonObj[i].TXTDESTACCT, docXml, trNode);
        createXMLNode('title', CONST_STR.get("TRANS_LOCAL_ACC_DESTINATION"), docXml, tdNode);
        tdNode = createXMLNode('td', respJsonObj[i].TXTBENNAME, docXml, trNode);
        createXMLNode('title', CONST_STR.get("COM_RECEIVER"), docXml, tdNode);
        tdNode = createXMLNode('td', formatNumberToCurrency(respJsonObj[i].NUMAMOUNT), docXml, trNode);
        createXMLNode('title', CONST_STR.get("COM_AMOUNT"), docXml, tdNode);
        tdNode = createXMLNode('td', respJsonObj[i].IDCHECKER, docXml, trNode);
        createXMLNode('title', CONST_STR.get("COM_CHEKER"), docXml, tdNode);
        tdNode = createXMLNode('td', '', docXml, trNode);
        createXMLNode('title', CONST_STR.get("TRANS_ACCNO_ID"), docXml, tdNode);
        clickNode = createXMLNode('onclick', 'showTransferDetail("' + respJsonObj[i].IDUSERREFERENCE + '")', docXml, tdNode);
        valueNode = createXMLNode('value', respJsonObj[i].IDFCATREF, docXml, tdNode);

        var tran = respJsonObj[i];
        //Tinh gia tri de check so tien chuyen hop le
        var isExist = false;
        for (var j in transSummaryArr) {
            var tmpTran = transSummaryArr[j];
            if (tmpTran.account == tran.TXTDESTACCT) {
                /*
                if (tran.CHARGEINCL == "N") {
                    tmpTran.totalAmount += parseInt(tran.NUMAMOUNT);
                } else {
                    tmpTran.totalAmount += (parseInt(tran.NUMAMOUNT) + parseInt(tran.CHARGEFORDOM));
                }
                */
                tmpTran.totalAmount += parseInt(tran.NUMAMOUNT);
                isExist = true;
            }
        }
        if (!isExist) {
            var tmpTran = {
                account : tran.TXTDESTACCT,
                numBalance : parseInt(tran.BALANCE_BEFOR)
            }
            /*
            if (tran.CHARGEINCL == "N") {
                tmpTran.totalAmount += parseInt(tran.NUMAMOUNT);
            } else {
                tmpTran.totalAmount += (parseInt(tran.NUMAMOUNT) + parseInt(tran.CHARGEFORDOM));
            }
            */
            tmpTran.totalAmount += parseInt(tran.NUMAMOUNT);
            transSummaryArr.push(tmpTran);
        }
        //-------

        /*
        if (tran.CHARGEINCL == "N") {
            totalAmount += parseInt(tran.NUMAMOUNT);
        } else {
            totalAmount += (parseInt(tran.NUMAMOUNT) + parseInt(tran.CHARGEFORDOM));
        }
        */
        totalAmount += parseInt(tran.NUMAMOUNT);
        totalBalance += parseInt(tran.BALANCE_BEFOR);
    }

    if (!isApprove) {
        var reasonElement = document.getElementById("trans.approve.reason");
        sectionNode = createXMLNode('section', '', docXml, rootNode);
        createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, docXml, sectionNode);
    }

    // gen button
    // Nut quay lai
    var buttonNode = createXMLNode('button', '', docXml, rootNode);
    var typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

    // Nut xac nhan
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_CON'), docXml, buttonNode);
    if (isApprove) {
        gCorp.requests = [request];
    } else {
        gCorp.requests = [request];
    }
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER");
    gCorp.isAuthScreen = true;

    gCorp.limit = gTrans.approveDTI.limit;
    gCorp.totalAmount = totalAmount;
    gCorp.numBalance = totalBalance;
    gCorp.transSummaryArr = transSummaryArr;

    navCachedPages["corp/common/review/com-review"] = null;
    navCachedPages["corp/common/detail/com-detail"] = null;
    navCachedPages["corp/common/authentication/com-authentication"] = null;
    navCachedPages["corp/common/result/com-result"] = null;
    setReviewXmlStore(docXml);
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function getSendMethodText(sendMethod) {
    if (sendMethod == 0) {
        return CONST_STR.get("COM_NOTIFY_0");
    } else if (sendMethod == 1) {
        return CONST_STR.get("COM_NOTIFY_1");
    } else if (sendMethod == 2) {
        return CONST_STR.get("COM_NOTIFY_2");
    } else if (sendMethod == 3) {
        return CONST_STR.get("COM_NOTIFY_3");
    }
}

function getTransTempInfo(templateType) {
    if (templateType == 404) {
        return CONST_STR.get("TAX_NO_SAVE_CODE");
    } else if (templateType == 0) {
        return CONST_STR.get("COM_SAVE_BENEFICIARY");
    } else if (templateType == 1) {
        return CONST_STR.get("COM_SAVE_TEMPLATE_TRANS");
    }
}

function sendRequestExportExcel() {
    var transIds = "";
    var jsonObj = gTrans.approveDTI.objJSON;
    for (var i in jsonObj) {
        transIds += jsonObj[i].IDFCATREF + ",";
    }
    var arrayClientInfo = new Array();
    arrayClientInfo.push(null);
    arrayClientInfo.push({
        sequenceId: "3",
        transType: "T13",
        transIds: transIds
    });

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

    data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}
