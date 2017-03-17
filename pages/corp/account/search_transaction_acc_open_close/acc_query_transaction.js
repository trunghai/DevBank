// JavaScript Document

var docXml;
var itemsPerPage = 10;
var pageIndex = 1;
var currentPageIndex;
var currentID;
var listPayeeTran = new Array();
var objJSON;
var typeTransaction;
var typeStatus;
var listObj;
var sequenceId = "1";
var transaction = "ALL";
var stt = 0;

var gAccount = {};
gAccount.transactionId = "";

gCorp.isBack = false;

var searchInfo = {
  transType: "",
  maker: "",
  status: "",
  fromDate: "",
  endDate: ""
};


function viewDidLoadSuccess() {
  if (!gCorp.isBack)
    resetView();
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.enddate', 'span.enddate');
}

function viewBackFromOther() {
  gCorp.isBack = true;
}


function handleSelectUser(e) {
  handleCloseUserClose();
  document.getElementById('id.accountno').value = e.selectedValue1;
  gAccount.creator = e.selectedValue2;
}

function handleCloseUserClose() {
  document.removeEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
  document.removeEventListener("evtSelectionDialog", handleSelectUser, false);
}

function showStatus() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_ACCOUNT_QUERY_TYPE_STATUS_EN : CONST_ACCOUNT_QUERY_TYPE_STATUS_VN;
  var tmpArray2 = CONST_ACCOUNT_QUERY_TYPE_STATUS_VALUE;

  var handleshowSTT = function(e) {
    document.removeEventListener("evtSelectionDialog", handleshowSTT, false);
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
      var sttcont = document.getElementById("idStatus");
      if (sttcont.nodeName == "INPUT") {
        sttcont.value = e.selectedValue1;
      } else {
        sttcont.innerHTML = e.selectedValue1;
      }
    }
    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
      typeStatus = e.selectedValue2;
    }
  }

  var handleshowSTTClose = function() {
    document.removeEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
    document.removeEventListener("evtSelectionDialog", handleshowSTT, false);
  }

  document.addEventListener("evtSelectionDialog", handleshowSTT, false);
  document.addEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), tmpArray1, tmpArray2, false);
}

//show loai giao dich
function showTypeTransaction() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_EN :
    CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VN;
  var tmpArray2 = CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VAL;

  var handleInputTypeTransaction = function(e) {
    document.removeEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
    var acctype = document.getElementById('idTypeTransaction');
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
      if (acctype.nodeName == "INPUT") {
        acctype.value = e.selectedValue1;
        transaction = getValueTransaction(e);
      }

    } else {
      acctype.innerHTML = e.selectedValue1;
      transaction = getValueTransaction(e);
    }

    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
      typeTransaction = e.selectedValue2;
    }
  }

  var handleInputTypeTransactionClose = function() {
    document.removeEventListener("evtSelectionDialogClose", handleInputTypeTransactionClose, false);
    document.removeEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
  }

  document.addEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
  document.addEventListener("evtSelectionDialogClose", handleInputTypeTransactionClose, false);
  showDialogList(CONST_STR.get("COM_CHOOSEN_TYPE_TRANS"), tmpArray1, tmpArray2, false);
}

function getValueTransaction(e) {
  var result;
  for (var i = 0; i < CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VN.length; i++) {
    if (e.selectedValue1 == CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VN[i]) {
      result = CONST_ACCOUNT_QUERY_TYPE_VALUE[i];
      break;
    }
  }
  return result;
}
// Get nguoi tao giao dich
function getUserWhoCreatedTransaction() {
  //Collect và gửi data lên 
  var dataObj = new Object();
  sequenceId = "1";
  dataObj.sequenceId = "1";
  dataObj.idtxn = "A15";

  var arrArgs = new Array();
  arrArgs.push("1");
  arrArgs.push(dataObj);
  var gprsCmd = new GprsCmdObj(1305, "", "", gUserInfo.lang, gUserInfo.sessionID, arrArgs);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);

}

function sendJSONRequest() {
  var data = {};
  var arrayArgs = new Array();
  var userId = document.getElementById("id.accountno").value;
  searchInfo.fromDate = document.getElementById("id.begindate").value;
  searchInfo.toDate = document.getElementById("id.enddate").value;

  if (searchInfo.fromDate == "dd/mm/yyyy") {
    searchInfo.fromDate = "";
  }
  if (searchInfo.toDate == "dd/mm/yyyy") {
    searchInfo.toDate = "";
  }

  if (calculateDifferentMonth(searchInfo.fromDate, searchInfo.toDate)) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return;
  }

  var objectValueClient = new Object();
  var idtxn = "A15";
  sequenceId = "2";
  objectValueClient.idtxn = idtxn;
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.typeTransaction = typeTransaction;
  objectValueClient.status = typeStatus;
  objectValueClient.fromDate = searchInfo.fromDate;
  objectValueClient.toDate = searchInfo.toDate;
  objectValueClient.creator = gAccount.creator;


  var arrayClientInfo = new Array();
  arrayClientInfo.push("2");
  arrayClientInfo.push(objectValueClient);

  //1305
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_ACCOUNT_QUERY_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID,
    arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);

}


// Click ma IDFCATREF
function showQueryTransactionHistory(id) {
  gAccount.transactionId = id;
  var objectValueClient = new Object();
  sequenceId = "3";

  var idtxn = "";
  for (var i = 0; i < listObj.length; i++) {
    if (listObj[i].IDFCATREF == id) {
      idtxn = listObj[i].IDTXN;
    }
  }

  objectValueClient.idtxn = "A15";
  objectValueClient.tranIdTxn = idtxn;
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.accountId = "";
  objectValueClient.transactionId = id;
  objectValueClient.creator = gAccount.creator;

  var arrayClientInfo = new Array();
  arrayClientInfo.push("3");
  arrayClientInfo.push(objectValueClient);

  //1305
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_ACCOUNT_QUERY_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID,
    arrayClientInfo);

  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
}


function requestResultServiceSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp); //store response
  var obj = gprsResp.respJsonObj;

  //show account nguoi duyet
  if (sequenceId == "1") {
    var listUser = [CONST_STR.get("COM_ALL")];
    var listValues = [""];

    for (var i = 0; i < obj.length; i++) {
      listUser.push(obj[i].IDUSER);
      listValues.push(obj[i].IDUSER);
    }
    document.addEventListener("evtSelectionDialog", handleSelectUser, false);
    document.addEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
    showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), listUser, listValues, false);
  } else if (sequenceId == "2") {
    if (obj.length == 0) {
      document.getElementById("tblContent").innerHTML = CONST_STR.get("CORP_MSG_COM_NO_DATA_FOUND");
      var paginationElement = document.getElementById("id.search");
      if (paginationElement != null)
        paginationElement.style.display = "none";
    } else {
      //show bang search giao dich 
      listObj = obj;
      totalPage = calTotalPage(obj);
      pageIndex = 1;
      var arrMedial = new Array();
      arrMedial = getItemsPerPage(obj, pageIndex);
      var xmlDoc = genXMLListTrans(arrMedial, pageIndex);
      var xslDoc = getCachePageXsl("corp/account/search_transaction_acc_open_close/acc_transaction_result_tbl");
      genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
        document.getElementById("tblContent").innerHTML = oStr;
        genPagging(totalPage, pageIndex);
      });
    }
    setTimeout(function() {
      mainContentScroll.scrollToElement(document.getElementById("tblContent"));
    }, 100);
  } else if (sequenceId == "3") {
    genReviewScreen(obj);
  }
}

function requestResultServiceFail(e) {
  var tmpPageName = navController.getDefaultPage();
  var tmpPageType = navController.getDefaultPageType();
  navController.initWithRootView(tmpPageName, true, tmpPageType);
};


function genXMLListTrans(pJson, pageIndex) {
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('transTable', '', docXml);
  var childNode;
  var rowNode;
  var transList = pJson;

  console.log(transList);
  for (var i = 0; i < transList.length; i++) {
    var idtxn = transList[i].IDTXN;
    var valueidtxn = "";
    if (idtxn == 'A13') {
      valueidtxn = CONST_STR.get("ACC_SEND_MONEY");
    } else if (idtxn == 'A14') {
      valueidtxn = CONST_STR.get("ACCOUNT_PERIOD_BTN_FINAL");
    }
    var status = CONST_STR.get("TRANS_STATUS_" + transList[i].CODSTATUS);

    rowNode = createXMLNode('rows', '', docXml, rootNode);
    childNode = createXMLNode('stt', 10 * (pageIndex - 1) + i + 1, docXml, rowNode);

    //user co quyen duyet, hien thi cot nguoi lap

    if (transList[i].IS_CHECKED > 0) {
      childNode = createXMLNode('maker', transList[i].SHORTNAME, docXml, rowNode);
    }
    console.log("trans: " + idtxn + ", " + status);

    childNode = createXMLNode('dateMaker', transList[i].DATMAKE, docXml, rowNode);
    childNode = createXMLNode('typeTransaction', valueidtxn, docXml, rowNode); //loai giao dich: gui tien, tat toan
    childNode = createXMLNode('status', status, docXml, rowNode); //trang thai giao dich
    childNode = createXMLNode('amount', formatNumberToCurrency(transList[i].NUMAMOUNT) + " " + transList[i].CODTRNCURR,
      docXml, rowNode);
    childNode = createXMLNode('approveBy', transList[i].APPROVE_BY, docXml, rowNode);
    childNode = createXMLNode('transId', transList[i].IDFCATREF, docXml, rowNode);
  }
  return docXml;
}


function createDataNode(title, value, docXml, tmpXmlNodeInfo, display) {
  var tmpChildNodeAcc = createXMLNode('transinfo', "", docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', title, docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', value, docXml, tmpChildNodeAcc);
  if (display == true) {
    tmpChildNode = createXMLNode('transinfodisplay', 'review', docXml, tmpChildNodeAcc); //display or not in result
  }
}

function failPaggingCallback() {

}

function pageIndicatorSelected(selectedIdx, selectedPage) {

  pageIndex = selectedIdx;
  currentPageIndex = selectedIdx;
  var arrMedial = new Array();
  arrMedial = getItemsPerPage(listObj, selectedIdx);

  var tmpXmlDoc = genXMLListTrans(arrMedial, pageIndex);
  var tmpXslDoc = getCachePageXsl("corp/account/search_transaction_acc_open_close/acc_transaction_result_tbl");

  genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
    var tmpNode = document.getElementById('tblContent');
    tmpNode.innerHTML = oStr;
    genPagging(totalPage, pageIndex);
  });

}

function genXmlDataPagging(arr) {

}

function genPagging(arr, pageIndex) {
  var totalPage = calTotalPage(listObj);
  var nodepage = document.getElementById('id.search');
  var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
  nodepage.innerHTML = tmpStr;
}

function calTotalPage(arrObj) {
  if (arrObj != null && arrObj.length > 0) {
    return Math.ceil(arrObj.length / itemsPerPage);
  }
  return 0;
}

function getItemsPerPage(arrObj, pageIndex) {
  var arrTmp = new Array();
  var from = 0;
  var to = 0;
  for (var i = 0; i < arrObj.length; i++) {
    from = (pageIndex - 1) * itemsPerPage;
    to = from + itemsPerPage;
    if (i >= from && i < to) {
      arrTmp.push(arrObj[i]);
    }

  }
  return arrTmp;
}


function genReviewScreen(obj) {
  obj = obj[0];
  gAccount.objTransaction = obj;

  if (obj == null || obj == undefined) {
    showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
    return;
  }
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('review', '', docXml);

  //mo so tiet kiemn
  if (obj.IDTXN == "A13") {
    var rate, valueRate = "";
    var tmpArrRate = (gUserInfo.lang == 'EN') ? CONST_ACCOUNT_QUERY_RATE_MONTH_EN :
      CONST_ACCOUNT_QUERY_RATE_MONTH_VN;
    for (var i = 0; i < tmpArrRate.length; i++) {
      if (obj.DURNAME == tmpArrRate[i]) {
        rate = tmpArrRate[i];
        break;
      }
    }
    if (rate == undefined) {} else {
      valueRate = rate + "/năm";
    }

    var dueType = obj.DUETYPE; //lua chon 1, 2 ha 3
    var destAccount = obj.TXTDESTACCT;
    var announce;
    if (dueType == 1) {

      //chuyen goc va lai sang ki han moi
      announce = CONST_STR.get("COM_INTEREST_MOVING_INTO_NEW_TERM");
    } else if (dueType == 2) {

      //chuyen goc sang ki han moi, lai chuyen v
      announce = CONST_STR.get("ACC_MOVING_TERM_ROOT") + " " + destAccount;
    } else if (dueType == 3) {
      announce = CONST_STR.get("ACC_FINALIZE_OF_PRINCIPAL") + " " + destAccount;
    }
    //thong tin chung
    var listValueScreenCommon = [
      [CONST_STR.get("COM_TRANS_CODE"), obj.IDFCATREF], //ma giao dich
      [CONST_STR.get("COM_CREATED_DATE"), obj.DATMAKE], //ngay lap
      [CONST_STR.get("COM_CHECK_DATE"), obj.DATCHECK], //ngay duyet
      [CONST_STR.get("COM_STATUS"), CONST_STR.get("TRANS_STATUS_" + obj.CODSTATUS)], //trang thai

    ];
    var txtReason = obj.TXTREASON;
    if (typeof txtReason != "undefined" && txtReason != null && txtReason.trim().length > 0) {
      listValueScreenCommon.push([CONST_STR.get("ACC_QUERY_REASON_CANCEL"), txtReason]); //li do tu choi
    }
    var listValueAccount = [
      [CONST_STR.get("COM_TYPE_TRANSACTION"), CONST_STR.get("ACC_SEND_MONEY_ONLINE")],
      [CONST_STR.get("COM_ACCOUNT_DEDUCT_MONEY"), obj.IDSRCACCT], //tai khoan trich tien
    ];
    var listValueTransaction = [
      [CONST_STR.get("COM_NUM_MONEY_SAVING"), formatNumberToCurrencyWithSymbol(obj.NUMAMOUNT, " " + obj.CODTRNCURR)],
      [CONST_STR.get("COM_PERIOD"), obj.DURNAME], //ki han gui
      [CONST_STR.get("ACCOUNT_PERIOD_DATESTART"), obj.DATE_SEND], //ngay gui
      [CONST_STR.get("COM_EXPIRE_DATE"), obj.DATE_END], //ngay dao han
      [CONST_STR.get("COM_INTEREST"), obj.RATE + "%/năm"], //
      [CONST_STR.get("ACC_PROFITS_INTERIM"), formatNumberToCurrencyWithSymbol(obj.PROVISIONAL_RATES, " " +
        obj.CODTRNCURR)], //lai tam tinh
      [CONST_STR.get("COM_ANNOUNCE_DEADLINE"), announce],
      [CONST_STR.get("COM_SEND_MSG_APPROVER"), CONST_STR.get("COM_NOTIFY_" + obj.SENDMETHOD)]
    ];

    createDateNodeReview("", listValueScreenCommon, docXml, rootNode);
    createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listValueAccount, docXml, rootNode);
    createDateNodeReview(CONST_STR.get("COM_TRASACTION_INFO"), listValueTransaction, docXml, rootNode);
  } else if (obj.IDTXN == "A14") {
    //dong so tiet kiem
    var listValueTransaction = [
      [CONST_STR.get("COM_TRANS_CODE"), obj.IDFCATREF], //ma giao dich
      [CONST_STR.get("COM_CREATED_DATE"), obj.DATMAKE], //ngay lap
      [CONST_STR.get("COM_CHECK_DATE"), obj.DATCHECK], //ngay duyet
      [CONST_STR.get("COM_STATUS"), CONST_STR.get("TRANS_STATUS_" + obj.CODSTATUS)] //trang thai
    ];
    var txtReason = obj.TXTREASON;
    if (typeof txtReason != "undefined" && txtReason != null && txtReason.trim().length > 0) {
      listValueTransaction.push([CONST_STR.get("ACC_QUERY_REASON_CANCEL"), txtReason]); //li do tu choi
    }
    var totalAmount = parseInt(keepOnlyNumber(obj.DEPOSIT_AMT)) + parseInt(keepOnlyNumber(obj.AMOUNTACC));
    var duration = parseInt(obj.TENOR_MONTHS) + parseInt(obj.TENOR_YEARS) * 12;
    var listTransactionInfo = [
      [CONST_STR.get("TRANS_TYPE"), CONST_STR.get("ACC_CLOSE_SAVING_ACCOUNT")], //loai giao dich
      [CONST_STR.get("ESAVING_CHANGEINFO_TBLDT_STYPE"), CONST_STR.get("ACC_DIGITAL_SAVING")], //loai tiet kiem
      [CONST_STR.get("COM_TYPE_MONEY"), obj.CODTRNCURR], //loai tien gui
      [CONST_STR.get("COM_ACCOUNT_NUMBER"), obj.IDSRCACCT], //so tai khoan
      [CONST_STR.get("ESAVING_WITHDRAWAL_AMOUNT_TITLE"), formatNumberToCurrencyWithSymbol(obj.DEPOSIT_AMT,
        " " + obj.CODTRNCURR)], //so tien goc rut
      [CONST_STR.get("COM_PERIOD"), duration + " " + CONST_STR.get("ACCOUNT_PERIOD_MONTH")], //ky han
      [CONST_STR.get("ACCOUNT_FINALIZE_DTL_GOAL_ACC"), obj.TXTDESTACCT], //so tai khoan nhan tien
    ];
    createDateNodeReview("", listValueTransaction, docXml, rootNode);
    createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listTransactionInfo, docXml, rootNode);
  }

  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', 'back', docXml, buttonNode);
  btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

  if (obj.CODSTATUS == 'INT' && gUserInfo.userRole.indexOf("CorpInput") > -1) {
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CANC_TRANS'), docXml, buttonNode);
  }


  setReviewXmlStore(docXml);
  navCachedPages["corp/account/search_transaction_acc_open_close/acc_query_transfer_detail"] = null;
  navController.pushToView("corp/account/search_transaction_acc_open_close/acc_query_transfer_detail", true, 'xsl');
}

function createDateNodeReview(title, listValue, docXml, rootNode) {
  var sectionNode = createXMLNode('section', '', docXml, rootNode);
  if (title != "") {
    var titleNode = createXMLNode('title', title, docXml, sectionNode);
  }
  for (var i = 0; i < listValue.length; i++) {
    var obj = listValue[i];
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', obj[0], docXml, rowNode);
    valueNode = createXMLNode('value', obj[1], docXml, rowNode);
  }

}

function onClickPageAccClose() {
  updateAccountListInfo();
  navController.initWithRootView('corp/account/list_info/acc_list_account_info', true, 'xsl');
}

function calculateDifferentMonth(valFromDate, valToDate) {
  var from = valFromDate.split("/");
  var to = valToDate.split("/");
  var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
  var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));

  if (fromDate > toDate) {

    return true;
  }
  return false;
}

function resetView() {
  document.getElementById("idTypeTransaction").value = CONST_STR.get("COM_ALL");
  document.getElementById("id.accountno").value = CONST_STR.get("COM_ALL");
  document.getElementById("idStatus").value = CONST_STR.get("COM_ALL");
  document.getElementById("id.begindate").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER_DATE");
  document.getElementById("id.enddate").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER_DATE");

  document.getElementById("id.search").innerHTML = "";
  document.getElementById("tblContent").innerHTML = "";

  searchInfo = {
    transType: "",
    maker: "",
    status: "",
    fromDate: "",
    endDate: ""
  };
  typeTransaction = "";
  typeStatus = "";
  gAccount.creator = "";
}

function sendRequestExportExcel() {
  var data = {};
  var arrayArgs = new Array();
  var userId = document.getElementById("id.accountno").value;
  searchInfo.fromDate = document.getElementById("id.begindate").value;
  searchInfo.toDate = document.getElementById("id.enddate").value;

  if (searchInfo.fromDate == "dd/mm/yyyy") {
    searchInfo.fromDate = "";
  }
  if (searchInfo.toDate == "dd/mm/yyyy") {
    searchInfo.toDate = "";
  }

  if (calculateDifferentMonth(searchInfo.fromDate, searchInfo.toDate)) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return;
  }

  var objectValueClient = new Object();
  var idtxn = "A15";
  sequenceId = 14;
  objectValueClient.idtxn = idtxn;
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.typeTransaction = typeTransaction;
  objectValueClient.status = typeStatus;
  objectValueClient.fromDate = searchInfo.fromDate;
  objectValueClient.toDate = searchInfo.toDate;
  objectValueClient.creator = gAccount.creator;

  var args = ["", objectValueClient];

  //1305
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID,
    args);

  data = getDataFromGprsCmd(gprsCmd);
  corpExportExcel(data);
}
