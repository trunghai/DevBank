var docXml;
var periodicResult;
var itemsPerPage = 10;
var pageIndex;
var currentPageIndex;
var pageCurrent = "corp/authorize/account/authorize_acc";
var typeTransaction;
var typeStatus;
var listObj;
var sequenceId;
var transaction;
var stt;

var gAccount;
gAccount.transactionId;
gAccount.idTxnAuthAccSaving;
gAccount.listObjSelected;

var searchInfo;

function viewBackFromOther() {
  //Flag check
  gTrans.isBack = true;
}


function viewDidLoadSuccess() {
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.enddate', 'span.enddate');

  if (!gTrans.isBack) {
    pageIndex = 1;
    sequenceId = "1";
    transaction = "ALL";
    stt = 0;
    gAccount = {};
    listObj = [];
    gAccount.transactionId = "";
    gAccount.idTxnAuthAccSaving = "A63";
    gAccount.listObjSelected = [];

    searchInfo = {
      transType: "A13",
      maker: "",
      status: "",
      fromDate: "",
      endDate: ""
    };

    gAccount.typeTransaction = searchInfo.transType;
  }

  gTrans.isBack = false;
  
  setTimeout(function () {
       document.getElementById("btn_search").click();
    }, 1100);
}

//Get init data when load screen
function loadInitData() {
  var jsonData = new Object();
  jsonData.sequenceId = "6";
  jsonData.idtxn = gAccount.idTxnAuthAccSaving;
  var args = new Array();
  args.push(null);
  args.push(jsonData);

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, false, 0,
    function(data) {
      var resp = JSON.parse(data);
      if (resp.respCode == 0 && resp.respJsonObj) {
        gCorp.limit = resp.respJsonObj.limit;
        gCorp.listAccount = resp.respJsonObj.listAccount;
      }
    },
    function() {
      showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
      gotoHomePage();
    }
  );
}


function handleSelectUser(e) {
  handleCloseUserClose();
  if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
    var maker = document.getElementById('id.accountno');
    maker.value = e.selectedValue1;
    gAccount.accountId = e.selectedValue2;
  }

}

function handleCloseUserClose() {
  document.removeEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
  document.removeEventListener("evtSelectionDialog", handleSelectUser, false);
}

function showStatus() {
  var tempArrStatusValue = (gUserInfo.lang == 'EN') ? CONST_ACCOUNT_APPROVED_TYPE_STATUS_EN : CONST_ACCOUNT_APPROVED_TYPE_STATUS_VN;
  var tempArrStatusCode = CONST_ACCOUNT_APPROVED_TYPE_STATUS_VALUE;

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
      gAccount.status = e.selectedValue2;
      gAccount.typeStatus = e.selectedValue2;
    }
  }

  var handleshowSTTClose = function() {
    document.removeEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
    document.removeEventListener("evtSelectionDialog", handleshowSTT, false);
  }

  document.addEventListener("evtSelectionDialog", handleshowSTT, false);
  document.addEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), tempArrStatusValue, tempArrStatusCode, false);
}

//show loai giao dich
function showTypeTransaction() {
  var tempArrTransaction = (gUserInfo.lang == 'EN') ? CONST_ACC_QUERY_TYPE_TRANSACTION_EN : CONST_ACC_QUERY_TYPE_TRANSACTION_VN;
  var tempArrTransValue = CONST_ACC_QUERY_TYPE_TRANSACTION_VAL;

  var handleInputTypeTransaction = function(e) {
    document.removeEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
    var acctype = document.getElementById('idTypeTransaction');
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
      if (acctype.nodeName == "INPUT") {
        acctype.value = e.selectedValue1;
      }

    } else {
      acctype.innerHTML = e.selectedValue1;
    }

    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
      gAccount.typeTransaction = e.selectedValue2;
    }
  }



  var handleInputTypeTransactionClose = function() {
    document.removeEventListener("evtSelectionDialogClose", handleInputTypeTransactionClose, false);
    document.removeEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
  }

  document.addEventListener("evtSelectionDialog", handleInputTypeTransaction, false);
  document.addEventListener("evtSelectionDialogClose", handleInputTypeTransactionClose, false);
  showDialogList(CONST_STR.get("COM_CHOOSEN_TYPE_TRANS"), tempArrTransaction, tempArrTransValue, false);
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
  var status = document.getElementById("idStatus").value;
  searchInfo.fromDate = document.getElementById("id.begindate").value;
  searchInfo.toDate = document.getElementById("id.enddate").value;

  if (searchInfo.fromDate == "dd/mm/yyyy") {
    searchInfo.fromDate = "";
  }
  if (searchInfo.toDate == "dd/mm/yyyy") {
    searchInfo.toDate = "";
  }

  var diff = getDiffDaysBetween(searchInfo.fromDate, searchInfo.toDate, "dd/MM/yyyy");
  if (diff != NaN && diff < 0) {
    showAlertText(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
    return;
  }

  var objectValueClient = new Object();
  sequenceId = "2";
  objectValueClient.idtxn = "A63";
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.typeTransaction = gAccount.typeTransaction;
  objectValueClient.status = gAccount.typeStatus;
  objectValueClient.accountId = gAccount.accountId;
  objectValueClient.fromDate = searchInfo.fromDate;
  objectValueClient.toDate = searchInfo.toDate;
  objectValueClient.creator = gAccount.accountId;


  var arrayClientInfo = new Array();
  arrayClientInfo.push("2");
  arrayClientInfo.push(objectValueClient);
  //706
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);
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

    if (gprsResp.respCode == "0") {
      //show bang search giao dich 
      listObj = obj.listTran;
      gCorp.limit = obj.limit;
      gCorp.listAccount = obj.listAccount;
      gAccount.listObj = listObj;
      totalPage = calTotalPage(listObj);
      pageIndex = 1;
      var arrMedial = new Array();
      arrMedial = getItemsPerPage(listObj, pageIndex);
      var xmlDoc = genXMLListTrans(arrMedial, pageIndex);

      var xslDoc = getCachePageXsl("corp/authorize/account/authorize_acc_transaction_result_tbl");
      genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
        document.getElementById("tblContent").innerHTML = oStr;
        genPagging(totalPage, pageIndex);
      });
      document.getElementById("idTblAuthorize").style.display = "";
    } else {
      document.getElementById("id.search").innerHTML = "";
      document.getElementById("pageIndicatorNums").innerHTML = "";
      document.getElementById("tblContent").innerHTML = "<h5>" + CONST_STR.get("CORP_MSG_NO_DATA_FOUNDED") + "</h5>";
      document.getElementById("idTblAuthorize").style.display = "none";
    }

  } else if (sequenceId == "3") {} else if (sequenceId == "4") {
    showReviewScreen(obj);
  }
}

function showReviewScreen(obj) {
  var docXml = genReviewScreen(obj[0]);
  if (obj[0] == null || obj[0] == undefined) {
    showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
    return;
  }
  var tmp = obj[0];

  for (var i = 0; i < listObj.length; i++) {
    if (listObj[i].IDFCATREF == tmp.IDFCATREF) {
      tmp.IDTXN = listObj[i].IDTXN;
      tmp.SHORTNAME = listObj[i].SHORTNAME;
      tmp.DATMAKE = listObj[i].DATMAKE;
      tmp.NUMAMOUNT = listObj[i].NUMAMOUNT;
      tmp.APPROVE_BY = listObj[i].APPROVE_BY;
      tmp.IDSRCACCT = listObj[i].IDSRCACCT;
      tmp.NUMAMOUNT = listObj[i].NUMAMOUNT;
    }
  }

  var transIds = [];
  var transInfo = [];
  transIds.push(tmp.IDFCATREF);
  transInfo.push({
    transactionId: tmp.IDFCATREF,
    userId: gCustomerNo,
    idUserReference: tmp.IDUSERREFERENCE,
    idTxn: tmp.IDTXN,
    person: tmp.SHORTNAME,
    date: tmp.DATMAKE,
    amount: tmp.NUMAMOUNT,
    approveBy: tmp.APPROVE_BY,
    idAccount: tmp.IDSRCACCT,
    status: tmp.CODSTATUS,
    approver: (obj.APPROVE_BY == null) ? "" : obj.APPROVE_BY
  });



  //setSequenceFormIdx(401);

  var viewBackDetail = false;
  if (currentPage == "corp/common/review/com-review") {
    viewBackDetail = true;
  }
  navCachedPages["corp/common/review/com-review"] = null;
  navCachedPages["corp/common/detail/com-detail"] = null;
  //navController.pushToView("corp/common/review/com-review", true, 'xsl');
  if (viewBackDetail) {
    gCorp.detailXML = docXml;
    navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
  } else {
    var rejRequest = {
      idtxn: "A63",
      sequenceId: "3",
      transIds: transIds.toString(),
      transInfo: transInfo
    };

    var authRequest = {
      idtxn: "A63",
      sequenceId: "5",
      transIds: transIds.toString(),
      transInfo: transInfo
    };

    gCorp.cmdType = CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION");
    gCorp.requests = [authRequest, rejRequest];

    gCorp.isAuthScreen = true;
    if (tmp.IDTXN != "A14") {
      gCorp.totalAmount = tmp.NUMAMOUNT;
      gCorp.numBalance = 0;
      for (var i = 0; i < gCorp.listAccount.length; i++) {
        if (gCorp.listAccount[i].account == tmp.IDSRCACCT) {
          gCorp.numBalance = keepOnlyNumber(gCorp.listAccount[i].balance);
          break;
        }
      }
    } else if (tmp.IDTXN == "A14") {
      gCorp.totalAmount = 0;
      delete gCorp.limit;
    }

    setReviewXmlStore(docXml);
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
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
  if (transList == null || transList == undefined) {
    return;
  }
  for (var i = 0; i < transList.length; i++) {
    var isCanAuthorize = "Y";
    if (!checkCanAuthorize(transList)) {
      isCanAuthorize = "N";
    }
    var status = CONST_STR.get("TRANS_STATUS_" + transList[i].CODSTATUS);
    rowNode = createXMLNode('rows', '', docXml, rootNode);
    childNode = createXMLNode('stt', 10 * (pageIndex - 1) + i + 1, docXml, rowNode);
    childNode = createXMLNode('establishment', transList[i].SHORTNAME, docXml, rowNode);
    childNode = createXMLNode('dateMake', transList[i].DATMAKE, docXml, rowNode); //loai giao dich: gui tien, tat toan
    childNode = createXMLNode('amount', formatNumberToCurrency(transList[i].NUMAMOUNT) + " " + transList[i].CODTRNCURR, docXml, rowNode); //loai giao dich: gui tien, tat toan
    childNode = createXMLNode('approveBy', transList[i].APPROVE_BY, docXml, rowNode); //trang thai giao dich
    childNode = createXMLNode('transId', transList[i].IDFCATREF, docXml, rowNode);
    childNode = createXMLNode('idx', 10 * (pageIndex - 1) + i, docXml, rowNode);

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

function successPaggingCallback(strHtml) {
  var div = document.getElementById("id.search");
  div.innerHTML = strHtml;

  var tmpArr = new Array();
  genPagging(periodicResult, pageIndex);
}

function failPaggingCallback() {

}

function pageIndicatorSelected(selectedIdx, selectedPage) {

  pageIndex = selectedIdx;
  currentPageIndex = selectedIdx;
  var arrMedial = new Array();
  arrMedial = getItemsPerPage(listObj, selectedIdx);

  var tmpXmlDoc = genXMLListTrans(arrMedial, pageIndex);
  var tmpXslDoc = getCachePageXsl("corp/authorize/account/authorize_acc_transaction_result_tbl");

  genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
    var tmpNode = document.getElementById('tblContent');
    tmpNode.innerHTML = oStr;
    genPagging(totalPage, pageIndex);
  });

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

function cancelTransaction() {
  var objectValueClient = new Object();
  sequenceId = "4";
  objectValueClient.idtxn = "A63";
  objectValueClient.sequenceId = "4";
  objectValueClient.transactionId = gAccount.transactionId;

  gCorp.requests = [objectValueClient];
  gCorp.cmdType = CONSTANTS.get("CMD_ACCOUNT_QUERY_TRANSACTION");
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function showQueryTransactionHistory(transId) {
  var idTxn = "";
  try {
    for (var i = 0; i < gAccount.listObj.length; i++) {
      var obj = gAccount.listObj[i];
      if (obj.IDFCATREF == transId) {
        idTxn = obj.IDTXN;
        break;
      }
    }
  } catch (err) {

  }
  gAccount.transactionId = transId;
  gAccount.idTxn = idTxn;
  var objectValueClient = new Object();
  sequenceId = "4";
  objectValueClient.idtxn = "A63";
  objectValueClient.tranIdTxn = idTxn;
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.accountId = "";
  objectValueClient.transactionId = gAccount.transactionId;

  var arrayClientInfo = new Array();
  arrayClientInfo.push("4");
  arrayClientInfo.push(objectValueClient);

  //1305
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
}


function genReviewScreen(obj) {
  if (obj == null || obj == undefined) {
    showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
    return;
  }
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('review', '', docXml);

  //mo so tiet kiemn
  if (gAccount.idTxn == "A13") {
    var rate;
    var tmpArrRate = (gUserInfo.lang == 'EN') ? CONST_ACCOUNT_QUERY_RATE_MONTH_EN : CONST_ACCOUNT_QUERY_RATE_MONTH_VN;
    for (var i = 0; i < tmpArrRate.length; i++) {
      if (obj.DURNAME == tmpArrRate[i]) {
        rate = tmpArrRate[i];
        break;
      }
    }
    if (rate == undefined) rate = "0";
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
      [CONST_STR.get("COM_EXECUTION_TIME"), obj.DATMAKE], //ngay lap
      [CONST_STR.get("E_ACCOUNT_SEND_MONEY"), obj.IDSRCACCT] //so tai khoan tien gui
      // [CONST_STR.get("COM_CHECK_DATE"), obj.DATCHECK], //ngay duyet
      // [CONST_STR.get("COM_STATUS"), CONST_STR.get("TRANS_STATUS_" + obj.CODSTATUS)], //trang thai
      // [CONST_STR.get("ACC_QUERY_REASON_CANCEL"), obj.TXTREASON] //li do tu choi
    ];
    var listValueAccount = [
      [CONST_STR.get("COM_TYPE_TRANSACTION"), CONST_STR.get("ACC_SEND_MONEY_ONLINE")],

    ];
    var listValueTransaction = [
      [CONST_STR.get("COM_NUM_MONEY_SAVING"), formatNumberToCurrencyWithSymbol(obj.NUMAMOUNT, " " + obj.CODTRNCURR)],
      [CONST_STR.get("COM_PERIOD"), obj.DURNAME], //ki han gui
      [CONST_STR.get("ACCOUNT_PERIOD_DATESTART"), obj.DATE_SEND], //ngay gui
      [CONST_STR.get("COM_EXPIRE_DATE"), obj.DATE_END], //ngay dao han
      [CONST_STR.get("COM_INTEREST"), obj.RATE + "%/năm"], //
      [CONST_STR.get("ACC_PROFITS_INTERIM"), formatNumberToCurrencyWithSymbol(obj.PROVISIONAL_RATES, " " + obj.CODTRNCURR)], //lai tam tinh
      [CONST_STR.get("COM_ANNOUNCE_DEADLINE"), announce],
      [CONST_STR.get("COM_SEND_MSG_APPROVER"), CONST_STR.get("COM_NOTIFY_" + obj.SENDMETHOD)]
    ];

    createDateNodeReview(CONST_STR.get("ACC_QUERY_TRANSACTION_DETAIL"), listValueScreenCommon, docXml, rootNode);
    //  createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listValueAccount, docXml, rootNode);
    createDateNodeReview(CONST_STR.get("COM_TRASACTION_INFO"), listValueTransaction, docXml, rootNode);
  } else if (gAccount.idTxn == "A14") {
    //dong so tiet kiem
    var listValueTransaction = [
      [CONST_STR.get("COM_TRANS_CODE"), obj.IDFCATREF], //ma giao dich
      [CONST_STR.get("COM_EXECUTION_TIME"), obj.DATVALUE], //thoi gian thuc hien
      [CONST_STR.get("E_ACCOUNT_SEND_MONEY"), obj.IDSRCACCT] //so tai khoan tien gui
    ];
    var totalAmount = parseInt(keepOnlyNumber(obj.DEPOSIT_AMT)) + parseInt(keepOnlyNumber(obj.AMOUNTACC));
    //Them row: Ky han gui
    var strTenor = '';
    if (obj.TENOR_DAYS != '0') {
      strTenor = obj.TENOR_DAYS + ' ' + CONST_STR.get('ACCOUNT_PERIOD_DAY');
    } else if (obj.TENOR_MONTHS != '0') {
      strTenor = obj.TENOR_MONTHS + ' ' + CONST_STR.get('ACCOUNT_PERIOD_MONTH');
    } else if (obj.TENOR_YEARS != '0') {
      strTenor = obj.TENOR_YEARS + ' ' + CONST_STR.get('ACCOUNT_PERIOD_YEAR');
    }
    var listTransactionInfo = [
      [CONST_STR.get("TRANS_TYPE"), CONST_STR.get("ACC_CLOSE_SAVING_ACCOUNT")], //loai giao dich
      [CONST_STR.get("ESAVING_CHANGEINFO_TBLDT_STYPE"), CONST_STR.get("ACC_DIGITAL_SAVING")], //loai tiet kiem
      //[CONST_STR.get("COM_TAX_TYPE"), CONST_STR.get("ACCOUNT_PERIOD_ONLINE")], //loai tien gui
      [CONST_STR.get("COM_ACCOUNT_NUMBER"), obj.IDSRCACCT], //so tai khoan
      [CONST_STR.get("ESAVING_WITHDRAWAL_AMOUNT_TITLE"), formatNumberToCurrencyWithSymbol(obj.DEPOSIT_AMT, " " + obj.CODTRNCURR)], //so tien goc rut
      [CONST_STR.get("COM_PERIOD"), strTenor], //ki han gui
      [CONST_STR.get("ACCOUNT_FINALIZE_DTL_GOAL_ACC"), obj.TXTDESTACCT], //so tai khoan nhan tien
      [CONST_STR.get("COM_SEND_MSG_APPROVER"), CONST_STR.get("COM_NOTIFY_" + obj.SENDMETHOD)], //gui thong bao cho nguoi duyet
    ];
    createDateNodeReview(CONST_STR.get("ACC_QUERY_TRANSACTION_DETAIL"), listValueTransaction, docXml, rootNode);
    createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listTransactionInfo, docXml, rootNode);
  }

  //kiem tra xem co bi disable nut duyet hay ko

  createButtonNode("back", CONST_STR.get("COM_BACK"), true, docXml, rootNode);
  createButtonNode("reject", CONST_STR.get("COM_REJ"), true, docXml, rootNode);
  createButtonNode("authorize", CONST_STR.get('AUTHORIZE_BTN_AUTHEN'), checkCanAuthorize(obj), docXml, rootNode);
  var inputNode = createXMLNode("input", CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_TIT_REASON'), docXml, rootNode);

  return docXml;
}

///check xem user duoc phep duyet hay ko tra ve false neu ko duoc duyet, true neu duoc duyet
function checkCanAuthorize(obj) {
  var numnAmount = parseInt(obj.NUMAMOUNT);
  var limitTime = parseInt(obj.LIMIT_TIME);
  var limitDay = parseInt(obj.LIMIT_DAY);
  var totalDay = parseInt(obj.TOTAL_DAY);

  if (obj.CAN_CHECK = "N" || (numnAmount > limitTime) || (totalDay + numnAmount > limitDay)) {
    //return false;
    return true;
  }
  return true;
}

function createDateNodeReview(title, listValue, docXml, rootNode) {
  var sectionNode = createXMLNode('section', '', docXml, rootNode);
  var titleNode = createXMLNode('title', title, docXml, sectionNode);
  for (var i = 0; i < listValue.length; i++) {
    var obj = listValue[i];
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', obj[0], docXml, rowNode);
    valueNode = createXMLNode('value', obj[1], docXml, rowNode);
  }

}

function createButtonNode(type, name, canCheck, docXml, rootNode) {
  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', type, docXml, buttonNode);
  btnLabelNode = createXMLNode('label', name, docXml, buttonNode);
  if (canCheck == false) {
    createXMLNode("disabled", "", docXml, buttonNode);
  }
}



function getValueById(name) {
  return document.getElementById(name).value;
}

function genReviewTableXml(action) {
  var xmlDoc = createXMLDoc();
  var rootNode;
  rootNode = createXMLNode('review', '', xmlDoc);

  var sectionNode = createXMLNode('section', '', xmlDoc, rootNode);

  var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
  var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
  var clickNode;
  var styleNode;
  var tdNode;
  var trNode;
  var obj;
  var valueNode;

  //stt, nguoi lap, ngay lap, so tien, nguoi duyet, ma giao dich
  var tmpArr = [CONST_STR.get("COM_NO"), CONST_STR.get("COM_MAKER"), CONST_STR.get("COM_EXECUTION_TIME"),
    CONST_STR.get("COM_AMOUNT"),
    CONST_STR.get("COM_CHEKER"), CONST_STR.get("COM_TRANS_CODE")
  ];

  //gen th table
  for (var i = 0; i < tmpArr.length; i++) {
    createXMLNode("th", tmpArr[i], xmlDoc, theadNode);
  }

  var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
  for (var i = 0; i < gAccount.listObjSelected.length; i++) {
    obj = gAccount.listObjSelected[i];
    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);

    tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_NO"), xmlDoc, tdNode);


    tdNode = createXMLNode("td", obj.SHORTNAME, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_MAKER"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", obj.DATMAKE, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_EXECUTION_TIME"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", formatNumberToCurrency(obj.NUMAMOUNT) + " " + obj.CODTRNCURR, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_AMOUNT"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", obj.APPROVE_BY, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_CHEKER"), xmlDoc, tdNode);

    tdNode = createXMLNode('td', '', xmlDoc, trNode);
    createXMLNode('title', CONST_STR.get("TRANS_ACCNO_ID"), xmlDoc, tdNode);
    clickNode = createXMLNode('onclick', "showQueryTransactionHistory('" + obj.IDFCATREF + "')", xmlDoc, tdNode);
    valueNode = createXMLNode('value', obj.IDFCATREF, xmlDoc, tdNode);
  }

  var buttonNode = createXMLNode('button', '', xmlDoc, rootNode);
  var typeNode = createXMLNode('type', 'cancel', xmlDoc, buttonNode);
  var btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_CANC'), xmlDoc, buttonNode);

  buttonNode = createXMLNode('button', '', xmlDoc, rootNode);

  if (action == "reject") {
    var reasonElement = document.getElementById("idTxtReason");
    sectionNode = createXMLNode('section', '', xmlDoc, rootNode);
    createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, xmlDoc, sectionNode);

    btnLabelNode = createXMLNode('label', CONST_STR.get('UTILITIES_CHNG_PER_INFO_CONFIRM_BTN'), xmlDoc, buttonNode);
    typeNode = createXMLNode('type', 'reject', xmlDoc, buttonNode);
  }

  if (action == "authorize") {
    btnLabelNode = createXMLNode('label', CONST_STR.get('AUTHORIZE_BTN_AUTHEN'), xmlDoc, buttonNode);
    typeNode = createXMLNode('type', 'authorize', xmlDoc, buttonNode);
  }

  return xmlDoc;
}

function onBackClick() {}

function transSelectedChange(e) {
  if (e.value == "true") {
    var checkboxes = document.getElementsByClassName("trans.checkbox");
    var i;
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
    e.value = "false";
  } else {
    var checkboxes = document.getElementsByClassName("trans.checkbox");
    var i;
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    e.value = "true";
  }
}

//nguoi dung an nut duyet
function authorizeTransaction() {
  var checkboxes = document.getElementsByClassName("trans.checkbox");
  var i;
  gAccount.listObjSelected = [];
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      gAccount.listObjSelected.push(gAccount.listObj[(pageIndex - 1) * itemsPerPage + i]);
    }
  }

  if (gAccount.listObjSelected.length == 0) {
    showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
    return;
  }

  if (gAccount.listObjSelected.length > 1) {
    showAlertText(CONST_STR.get("CORP_MSG_OVER_NUMB_TRANS_DEPOSIT"));
    return;
  }

  var transIds = [];
  var transInfo = [];

  var isAuthorize = true;
  var listCanAuthorize = new Array();

  var totalAmount = 0;
  gCorp.transSummaryArr = [];
  for (var i = 0; i < gAccount.listObjSelected.length; i++) {
    var obj = gAccount.listObjSelected[i];
    addTransToSummary(obj, gCorp.transSummaryArr);

    transIds.push(obj.IDFCATREF);
    transInfo.push({
      person: obj.SHORTNAME,
      date: obj.DATMAKE,
      amount: obj.NUMAMOUNT,
      approveBy: obj.APPROVE_BY,
      transactionId: obj.IDFCATREF,
      idUserReference: obj.IDUSERREFERENCE,
      reason: "",
      userId: gCustomerNo,
      idTxn: obj.IDTXN,
      idAccount: obj.IDSRCACCT,
      status: obj.CODSTATUS,
      approver: (obj.APPROVE_BY == null) ? "" : obj.APPROVE_BY
    });
    if (obj.IDTXN == 'A13') {
      totalAmount += parseInt(obj.NUMAMOUNT);
    }
    if (obj.IDTXN == 'A14') {
        delete gCorp.limit;
    } 
  }

  var request = {
    idtxn: "A63",
    sequenceId: "5", //5
    transIds: transIds.toString(),
    transInfo: transInfo
  };
  gCorp.cmdType = CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION");
  gCorp.requests = [request];

  gCorp.totalAmount = totalAmount;
  gCorp.isAuthScreen = true;

  console.log("totalAmount:  ", gCorp.totalAmount);
  console.log("transSummaryArr:  ", gCorp.transSummaryArr);
  console.log("limit:  ", gCorp.limit);

  var docXml = genReviewTableXml("authorize");
  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, "xsl");
}


//xac thuc
function rejectTransaction() {
  var txtReason = getValueById("idTxtReason");
  var textFlag = checkSpecialChar(txtReason);

  var checkboxes = document.getElementsByClassName("trans.checkbox");
  var i;
  gAccount.listObjSelected = [];
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      gAccount.listObjSelected.push(gAccount.listObj[(pageIndex - 1) * itemsPerPage + i]);
    }
  }

  if (gAccount.listObjSelected.length == 0) {
    showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
    return;
  }

  if (txtReason == '') {
    showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
    return;
  } else if (textFlag) {
    showAlertText(CONST_STR.get("COM_PLS_INPUT_VALID_FORMAT"));
    return;
  }

  var docXml = genReviewTableXml("reject"); //tao man hinh liet ke tu choi nhieu giao dich
  var transIds = [];
  var transInfo = [];

  for (var i = 0; i < (gAccount.listObjSelected).length; i++) {
    var obj = gAccount.listObjSelected[i];
    transIds.push(obj.IDFCATREF);
    transInfo.push({
      person: obj.SHORTNAME,
      date: obj.DATMAKE,
      amount: obj.NUMAMOUNT,
      approveBy: obj.APPROVE_BY,
      transactionId: obj.IDFCATREF,
      status: tmp.CODSTATUS,
      approver: (obj.APPROVE_BY == null) ? "" : obj.APPROVE_BY
    });
  }
  var request = {
    idtxn: "A63",
    sequenceId: "3",
    reason: txtReason,
    transIds: transIds.toString(),
    transInfo: transInfo
  };
  gCorp.cmdType = CONSTANTS.get("CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION");
  gCorp.requests = [null, request];
  gCorp.isAuthScreen = true;

  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

//send du lieu len de xuat file excel
function sendRequestExportExcel() {
  var transIds = "";
  for (var i in listObj) {
    transIds += listObj[i].IDFCATREF + ",";
  }
  var arrayClientInfo = new Array();
  arrayClientInfo.push(null);
  arrayClientInfo.push({
    sequenceId: "1",
    transType: "A13",
    transIds: transIds
  });

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);

  corpExportExcel(data);
}

// Tao bang tong hop so tien khi duyet nhieu giao dich
function addTransToSummary(trans, transSummaryArr) {

  // Khong check so du kha dung trong truong hop tat toan
  if (trans.IDTXN == "A14")
    return;

  var amount = parseInt(trans.NUMAMOUNT);
  for (var i = 0; i < transSummaryArr.length; i++) {
    var summary = transSummaryArr[i];
    if (summary.account == trans.IDSRCACCT) {
      summary.totalAmount += amount;
      return;
    }
  }

  // Lay so du kha dung cua tk
  var balance = 0;
  for (var i = 0; i < gCorp.listAccount.length; i++) {
    var tmpObj = gCorp.listAccount[i];
    if (tmpObj.account == trans.IDSRCACCT) {
      balance = keepOnlyNumber(tmpObj.balance);
    }
  }

  transSummaryArr.push({
    account: trans.IDSRCACCT,
    totalAmount: amount,
    numBalance: balance
  });

  return;

}

function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccentinfo(field.value);
  }
}
