/**
 * Created by HungNV.FPT
 * Date: 17/10/2015
 */

function loadInitXML() {
  logInfo('common list user approve init');
}

// Show loai giao dich
function showSearchInput(args) {
  gTrans.authPDI.searchInputType = args;
  var arrInputTypes = [];
  var arrInputIds = [];
  var dialogTitle;

  if (gTrans.authPDI.searchInputType == 1) {
    arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_TRANS_PERIODIC_TYPE_EN : CONST_TRANS_PERIODIC_TYPE_VN;
    arrInputIds = CONST_TRANS_PERIODIC_TYPE_ID;
    dialogTitle = CONST_STR.get('COM_TYPE_TRANSACTION');

  } else if (gTrans.authPDI.searchInputType == 2) {
    arrInputTypes.push(CONST_STR.get('COM_ALL'));
    arrInputIds.push('ALL');
    for (var i = 0; i < gTrans.authPDI.listMakers.length; i++) {
      arrInputTypes.push(gTrans.authPDI.listMakers[i].IDUSER);
      arrInputIds.push(gTrans.authPDI.listMakers[i].IDUSER);
    }

    dialogTitle = CONST_STR.get('TRANS_BATCH_MAKER');

  } else if (gTrans.authPDI.searchInputType == 3) {
    arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_AUTH_STATUS_TRANSPDI_EN : CONST_AUTH_STATUS_TRANSPDI_VN;
    arrInputIds = CONST_AUTH_STATUS_TRANSPDI_ID;
    dialogTitle = CONST_STR.get('TRANS_STATUS');
  }

  document.addEventListener("evtSelectionDialog", handleSearchInput, false);
  document.addEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
  showDialogList(dialogTitle, arrInputTypes, arrInputIds, false);
}

function handleSearchInput(e) {
  if (currentPage == "corp/authorize/transfer/periodic/periodic-transfer") {
    document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
    var inputObj;
    var inputId;

    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {

      if (gTrans.authPDI.searchInputType == 1) {
        inputObj = document.getElementById('trans.type');
      } else if (gTrans.authPDI.searchInputType == 2) {
        inputObj = document.getElementById('trans.maker');
      } else if (gTrans.authPDI.searchInputType == 3) {
        inputObj = document.getElementById('trans.status');
      }

      inputObj.value = e.selectedValue1;
    }

    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
      if (gTrans.authPDI.searchInputType == 1) {
        inputId = document.getElementById('id.value.trans.type');
      } else if (gTrans.authPDI.searchInputType == 2) {
        inputId = document.getElementById('id.value.trans.maker');
      } else if (gTrans.authPDI.searchInputType == 3) {
        inputId = document.getElementById('id.value.trans.status');
      }

      inputId.value = e.selectedValue2;
    }
  }
}

function handleSearchInputClose() {
  if (currentPage == "corp/authorize/transfer/periodic/periodic-transfer") {
    document.removeEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
    document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
  }
}

function viewBackFromOther() {
  gTrans.backAuthPriodic = true;
}

function viewDidLoadSuccess() {
  gCorp.limit = undefined;
  if (gTrans.backAuthPriodic) {
    reloadSearchCondition();
    gTrans.backAuthPriodic = false;
  } else {
    gTrans.authPDI = {
      searchInputType: 0,
      request: {
        idtxn: "T64",
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
      reqMulApr: {}
    };
    
  }
  getListMakers();
  createDatePicker('trans.begindate', 'span.begindate');
  createDatePicker('trans.enddate', 'span.enddate');
  
  // setTimeout(function () {
  //      document.getElementById("btn_search").click();
  //   }, 1100);
}

function reloadSearchCondition() {
  var transType = document.getElementById('trans.type');
  var maker = document.getElementById('trans.maker');
  var status = document.getElementById('trans.status');
  var idTransType = document.getElementById('id.value.trans.type');
  var idMaker = document.getElementById('id.value.trans.maker');
  var idStatus = document.getElementById('id.value.trans.status');

  transType.value = gTrans.authPDI.transType;
  maker.value = gTrans.authPDI.maker;
  status.value = gTrans.authPDI.status;
  idTransType.value = gTrans.authPDI.idTransType;
  idMaker.value = gTrans.authPDI.idMaker;
  idStatus.value = gTrans.authPDI.idStatus;
}

function storeSearchCondition() {
  var transType = document.getElementById('trans.type');
  var maker = document.getElementById('trans.maker');
  var status = document.getElementById('trans.status');
  var idTransType = document.getElementById('id.value.trans.type');
  var idMaker = document.getElementById('id.value.trans.maker');
  var idStatus = document.getElementById('id.value.trans.status');

  gTrans.authPDI.transType = transType.value;
  gTrans.authPDI.maker = maker.value;
  gTrans.authPDI.status = status.value;
  gTrans.authPDI.idTransType = idTransType.value;
  gTrans.authPDI.idMaker = idMaker.value;
  gTrans.authPDI.idStatus = idStatus.value;
}

function getListMakers() {
  angular.module("EbankApp").controller('periodic-transfer', function ($scope, requestMBServiceCorp) {
    initData();
    function initData() {
      if (!gTrans.backAuthPriodic){
        var data = {};
        var arrayArgs = new Array();
        var requestListMaker = gTrans.authPDI.request;

        requestListMaker.sequenceId = 1;

        var strJSON = JSON.stringify(requestListMaker);

        arrayArgs.push("1");
        arrayArgs.push(strJSON);

        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_PERIODIC_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
        gprsCmd.raw = '';
        data = getDataFromGprsCmd(gprsCmd);

        requestMBServiceCorp.post(data, requestGetSuccess, requestGetFail);
      }
    }
    
    $scope.searchListTransfer = function () {
      var searchRequest = getSearchRequest(10000000);
      sendJSONRequest(searchRequest);
    }

    function sendJSONRequest(request) {

      var data = {};
      var arrayArgs = new Array();

      var strJSON = JSON.stringify(request);

      arrayArgs.push("1");
      arrayArgs.push(strJSON);

      var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_PERIODIC_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
      gprsCmd.raw = '';
      data = getDataFromGprsCmd(gprsCmd);

      logInfo(data);

      requestMBServiceCorp.post(data, requestSearchSuccess);
    }
  });
  angular.bootstrap(document.getElementById('mainViewContent'), ["EbankApp"]);
  
}

function requestGetSuccess(e) {
  var response = e;
  gTrans.authPDI.listMakers = response.respJsonObj.makers;
  gTrans.authPDI.limit = {
    limitTime: response.respJsonObj.limit.limitTime,
    limitDay: response.respJsonObj.limit.limitDay,
    totalDay: response.respJsonObj.limit.totalDay
  };

  if (response.respCode == RESP.get('COM_SUCCESS')) {
    mainContentScroll.refresh();
    var listTrans = response.respJsonObj.list_pending;
    gTrans.authPDI.objJSON = listTrans;
    if (listTrans.length > 0) {
      // Tinh so trang
      if (listTrans.length == 0) {
        gTrans.authPDI.totalPage = 0;
      } else {
        var totalRow = listTrans.length;
        gTrans.authPDI.totalPage = Math.ceil(totalRow / gTrans.authPDI.pageSize);
      }
      viewSearchResults();
    } else {
      // showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
      document.getElementById('tblContent').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";;
    }

  } else {
    if (response.respCode == '1019') {
      showAlertText(response.respContent);
    } else {
      showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
    }
  }
}

function requestGetFail(e) {}

function getSearchRequest(pageSize) {
  var searchRequest = {
    idtxn: gTrans.authPDI.request.idtxn,
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
  if (response.respCode == RESP.get('COM_SUCCESS')) {
    mainContentScroll.refresh();
    var listTrans = response.respJsonObj.list_pending;
    gTrans.authPDI.objJSON = listTrans;
    if (listTrans.length > 0) {
      // Tinh so trang
      if (listTrans.length == 0) {
        gTrans.authPDI.totalPage = 0;
      } else {
        var totalRow = listTrans.length;
        gTrans.authPDI.totalPage = Math.ceil(totalRow / gTrans.authPDI.pageSize);
      }
      viewSearchResults();
    } else {
      // showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
      document.getElementById('tblContent').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";;
    }

  } else {
    if (response.respCode == '1019') {
      showAlertText(response.respContent);
    } else {
      showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
    }
  }
}

// Chuyen trang
function changePage(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
  gTrans.authPDI.pageId = idx;
  viewSearchResults();
}

function viewSearchResults() {
  var startIdx = (gTrans.authPDI.pageId - 1) * gTrans.authPDI.pageSize;
  var endIdx = gTrans.authPDI.pageId * gTrans.authPDI.pageSize;
  var listTransCurrentPage = gTrans.authPDI.objJSON.slice(startIdx, endIdx);
  var xmlDoc = genXMLListTrans(listTransCurrentPage);
  var xslDoc = getCachePageXsl("corp/authorize/transfer/periodic/periodic-transfer-table");

  genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
    document.getElementById("tblContent").innerHTML = oStr;

    // Gen phan trang
    var pagination = document.getElementById("pagination");
    var paginationHTML = genPageIndicatorHtml(gTrans.authPDI.totalPage, gTrans.authPDI.pageId);
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
    nodeChild = createXMLNode('transId', pJson[i].IDFCATREF_VIEW, docXml, nodeInfo);
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
  if (currentPage == "corp/authorize/transfer/periodic/periodic-transfer") {
    storeSearchCondition();
  }
  var data = {};
  var arrayArgs = new Array();
  var request = gTrans.authPDI.request;
  request.idtxn = "T63";
  request.sequenceId = 3;
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
  gTrans.authPDI.request.idtxn = "T64";
  var objJSON = {};

  var response = JSON.parse(e);
  setRespObjStore(response);
  objJSON = response.respJsonObj;

  if (checkResponseCodeSuccess(response.respCode)) {
    genDetailScreen(objJSON[0]);

  } else {
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
  var valueNode = createXMLNode('value', transInfo.IDFCATREF_VIEW, docXml, rowNode);

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
  valueNode = createXMLNode('value', CONST_STR.get('MENU_CHILD_EXCHANGE_MONEY'), docXml, rowNode);

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

  // so tien
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_AMOUNT'), docXml, rowNode);
  valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.NUMAMOUNT) + " " + transInfo.CODTRNCURR, docXml, rowNode);

  // tai khoan nhan
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.TXTDESTACCT, docXml, rowNode);

  // chu tai khoan nhan 
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.TXTBENNAME, docXml, rowNode);

  // phi dich vu
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_PAYMENT_FEE'), docXml, rowNode);
  valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.CHARGEFORDOM) + " " + transInfo.CODTRNCURR, docXml, rowNode);

  // noi dung
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.TXTPAYMTDETAILS1, docXml, rowNode);

  // ngay bat dau
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('GOLD_HIS_RATE_BEGINDATE'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.DATSTART, docXml, rowNode);

  // ngay ket thuc
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('GOLD_HIS_RATE_ENDDATE'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.DATEND, docXml, rowNode);

  // tan suat
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_FREQUENCY'), docXml, rowNode);
  valueNode = createXMLNode('value', decodeFrequency(transInfo.TYPEFREQUENCY), docXml, rowNode);

  // gui thong bao
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, rowNode);
  valueNode = createXMLNode('value', getSendMethodText(transInfo.SEND_METHOD), docXml, rowNode);

  // Quan ly mau thu huong
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_SAVE_BENE'), docXml, rowNode);
  valueNode = createXMLNode('value', getTransTempInfo(transInfo.TYPE_TEMPLATE), docXml, rowNode);

  // Gen text input
  var inputNode = createXMLNode('input', CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_TIT_REASON'), docXml, rootNode);

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


    var approveReqest = getSigAprvRequest(4, transInfo.IDUSERREFERENCE);
    approveReqest.transId = transInfo.IDFCATREF;
    var rejectReqest = getSigAprvRequest(3, transInfo.IDUSERREFERENCE);
    rejectReqest.transId = transInfo.IDFCATREF;
    gCorp.isAuthScreen = true;
    gCorp.requests = [approveReqest, rejectReqest];
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_PERIODIC_TRANSFER");
    
    if (transInfo.IDTXN == "T14") {
      gCorp.totalAmount = transInfo.NUMAMOUNT;
      gCorp.limit = gTrans.authPDI.limit;
    } else {
      gCorp.totalAmount = "";
      gCorp.limit = "";
    };

    console.log("transInfo.IDTXN", transInfo.IDTXN);
    console.log("gCorp.totalAmount", gCorp.totalAmount);
    console.log("gCorp.limit", gCorp.limit);

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
    idtxn: gTrans.authPDI.request.idtxn,
    sequenceId: sequenceId,
    transId: gTrans.authPDI.request.transId,
    transDetailCode: idUserref
  };
  return request;
}


function approveTransaction(isApprove) {
  storeSearchCondition();
  var data = {};

  //Lay list khi minh tich vao o checkbox
  var listTrans = getListTransaction();

  //loc ra cac giao dich co IDTXN = T14 de check han muc giao dich
  var trueArr = [];
  for (var i = 0; i < listTrans.length; i++) {
    if (listTrans[i].IDTXN == "T14") {trueArr.push(listTrans[i])};
  };
  console.log("trueArr", trueArr);

  //Sau khi co dc mang cac IDTXN = "T14" thi se tinh tong so tien cac giao dich de check han muc.
  gTrans.authPDI.totalAmount = 0;
  for (var i = 0; i < trueArr.length; i++) {
    gTrans.authPDI.totalAmount += parseInt(trueArr[i].NUMAMOUNT);
  };
  console.log("gTrans.authPDI.totalAmount", gTrans.authPDI.totalAmount);

  if (listTrans.length <= 0) {
    showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
  } else {
    var request = {};
    // tạo request đấy sang common
    if (isApprove) { // duyet
      console.log("gTrans.authPDI.totalAmount", gTrans.authPDI.totalAmount);
      console.log("gCorp.limit", gTrans.authPDI.limit);
      if (gTrans.authPDI.limit.limitTime < gTrans.authPDI.totalAmount) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), [formatNumberToCurrency(gTrans.authPDI.limit.limitTime)]));
        return;
      } else if ((parseInt(gTrans.authPDI.limit.totalDay) + parseInt(gTrans.authPDI.totalAmount)) > gTrans.authPDI.limit.limitDay) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), [formatNumberToCurrency(gTrans.authPDI.limit.limitDay)]));
        return;
      } else {
        request = getMulAprvRequest(6);
      }
    } else { // tu choi
      request = getMulAprvRequest(5);
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

// lay request duyet nhieu giao dich
function getMulAprvRequest(sequenceId) {
  var request = {
    idtxn: gTrans.authPDI.request.idtxn,
    sequenceId: sequenceId,
    transIds: "",
    listIdUserRef: ""
  };

  return request;
}


function getListTransaction() {
  var arrCheckItems = document.getElementsByClassName("checkTransItem");
  var listTrans = [];
  for (var i = 0; i < arrCheckItems.length; i++) {
    if (arrCheckItems[i].checked) {
      for (var j = 0; j < gTrans.authPDI.objJSON.length && j < gTrans.authPDI.pageSize; j++) {
        if (j == i) {
          var id = (gTrans.authPDI.pageId - 1) * gTrans.authPDI.pageSize + i;
          listTrans.push(gTrans.authPDI.objJSON[id]);
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
  gTrans.authPDI.totalAmount = 0;
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
    clickNode = createXMLNode('onclick', 'showTransferDetail("' + respJsonObj[i].IDUSERREFERENCE + '")', docXml, tdNode);
    valueNode = createXMLNode('value', respJsonObj[i].IDFCATREF_VIEW, docXml, tdNode);
    createXMLNode('title', CONST_STR.get("TRANS_ACCNO_ID"), docXml, tdNode);
  }

  if (isApprove == false) {
    var reasonElement = document.getElementById("trans.approve.reason");
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, docXml, sectionNode);
  };

  // gen button
  // Nut quay lai
  var buttonNode = createXMLNode('button', '', docXml, rootNode);
  var typeNode = createXMLNode('type', 'back', docXml, buttonNode);
  var btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

  if(isApprove) {
    // Nut xac nhan
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_CON'), docXml, buttonNode);
    gCorp.requests = [request, null];

  } else {
    // Nut xac nhan
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('COM_REJ'), docXml, buttonNode);
    gCorp.requests = [null, request];
  }

  gCorp.isAuthScreen = true;
  gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTHORIZE_PERIODIC_TRANSFER");
  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navCachedPages["corp/common/detail/com-detail"] = null;
  navCachedPages["corp/common/authentication/com-authentication"] = null;
  navCachedPages["corp/common/result/com-result"] = null;
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
  var jsonObj = gTrans.authPDI.objJSON;
  for (var i in jsonObj) {
    transIds += jsonObj[i].IDFCATREF + ",";
  }
  var arrayClientInfo = new Array();
  arrayClientInfo.push(null);
  arrayClientInfo.push({
    sequenceId: "5",
    transType: "T15",
    transIds: transIds
  });

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);

  corpExportExcel(data);
}

function decodeFrequency(code) {
  if (code == 'D') {
    return CONST_STR.get("CONST_TRANS_FREQUENCY_D");
  } else if (code == 'W') {
    return CONST_STR.get("CONST_TRANS_FREQUENCY_W");
  } else if (code == 'M') {
    return CONST_STR.get("CONST_TRANS_FREQUENCY_M");
  } else if (code == 'Y') {
    return CONST_STR.get("CONST_TRANS_FREQUENCY_Y");
  }
}
