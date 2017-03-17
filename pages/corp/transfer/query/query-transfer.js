/**
 * Created by HungNV.FPT
 * Date: 08/10/2015
 */

gTrans.query = {
  searchInputType: 0,
  request: {
    sequenceId: 1,
    idtxn: "T02",
    userId: gCustomerNo,
    transTypeId: "ALL",
    transStatus: "ALL",
    transId: "",
    dateBegin: "",
    dateEnd: "",
    pageId: 1,
    pageSize: 5
  },
  pageId: 1,
  pageSize: 10,
  totalPage: 0,
  idfcatref: ""
};

function loadInitXML() {
  logInfo('common list user approve init');
}

// Show loai giao dich
function showSearchInput(args) {
  gTrans.query.searchInputType = args;
  var arrInputTypes = [];
  var arrInputIds = [];
  var dialogTitle;



  if (gTrans.query.searchInputType == 1) { // loai giao dic
    arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_TRANS_TYPE_CONDITION_EN : CONST_TRANS_TYPE_CONDITION_VN;
    arrInputIds = CONST_TRANS_TYPE_CONDITION_ID;
    dialogTitle = CONST_STR.get('COM_TYPE_TRANSACTION');
  } else if (gTrans.query.searchInputType == 2) { // trang thai
    arrInputTypes = (gUserInfo.lang == 'EN') ? CONST_TRANS_LIST_STATUS_EN : CONST_TRANS_LIST_STATUS_VN;
    arrInputIds = CONST_TRANS_LIST_STATUS;
    dialogTitle = CONST_STR.get('TRANS_STATUS');
  } else if (gTrans.query.searchInputType == 3) { // nguoi lap
    arrInputTypes = gTrans.listMakers;
    dialogTitle = CONST_STR.get('COM_MAKE_TRANS');
  }

  document.addEventListener("evtSelectionDialog", handleSearchInput, false);
  document.addEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
  showDialogList(dialogTitle, arrInputTypes, arrInputIds, false);
}

function handleSearchInput(e) {
  if (currentPage == "corp/transfer/query/query-transfer") {
    document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
    var inputObj;
    var inputId;

    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {

      if (gTrans.query.searchInputType == 1) {
        inputObj = document.getElementById('trans.type');
      } else if (gTrans.query.searchInputType == 2) {
        inputObj = document.getElementById('trans.status');
      } else if (gTrans.query.searchInputType == 3) {
        inputObj = document.getElementById('trans.maker');
      }

      inputObj.value = e.selectedValue1;
    }

    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
      if (gTrans.query.searchInputType == 1) {
        inputId = document.getElementById('id.value.trans.type');
      } else if (gTrans.query.searchInputType == 2) {
        inputId = document.getElementById('id.value.trans.status');
      }

      inputId.value = e.selectedValue2;
    }
  }
}

function handleSearchInputClose() {
  if (currentPage == "corp/transfer/query/query-transfer") {
    document.removeEventListener("evtSelectionDialogClose", handleSearchInputClose, false);
    document.removeEventListener("evtSelectionDialog", handleSearchInput, false);
  }
}

function viewDidLoadSuccess() {
  createDatePicker('trans.begindate', 'span.begindate');
  createDatePicker('trans.enddate', 'span.enddate');
  getListMaker();
  setDateDefault();
}

//thiết lập ngày tìm kiếm bắt đầu và kết thúc mặc định
function setDateDefault() {
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;

    var dateBegin = "01/" + mm + "/" + date.getFullYear();
    var dateEnd = today;

    document.getElementById("trans.begindate").value = dateBegin;
    document.getElementById("trans.enddate").value = dateEnd;
}

function getListMaker() {
  var arrayArgs = [];
  var request = {
    sequenceId: 4,
    idtxn: "T02"
  }

  arrayArgs.push("1");
  arrayArgs.push(request);

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_QUERY_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
  gprsCmd.raw = '';
  data = getDataFromGprsCmd(gprsCmd);

  requestMBServiceCorp(data, false, 0, function(response) {
    var respJSON = JSON.parse(response).respJsonObj;
    gTrans.listMakers = [];
    gTrans.listMakers.push(CONST_STR.get("COM_ALL"));
    for (var i = 0; i < respJSON.length; i++) {
      gTrans.listMakers.push(respJSON[i].IDUSER);
    };
  });
}

function searchTransfer() {

  var sdateTrans = document.getElementById("trans.begindate");
  var edateTrans = document.getElementById("trans.enddate");

  if (calculateDifferentMonth(sdateTrans.value, edateTrans.value)) {
    // showAlertText(CONST_STR.get("TRANS_PERIODIC_END_DATE_LESS_TO_DATE"));

    return;
  }



  var request = {
    sequenceId: 1,
    idtxn: "T02",
    userId: gCustomerNo,
    transTypeId: document.getElementById("id.value.trans.type").value,
    transStatus: document.getElementById("id.value.trans.status").value,
    maker: document.getElementById("trans.maker").value,
    dateBegin: document.getElementById("trans.begindate").value,
    dateEnd: document.getElementById("trans.enddate").value,
    pageId: 1,
    pageSize: gTrans.query.pageSize
  };
  if (request.maker == CONST_STR.get("COM_ALL")) {
    request.maker = "ALL";
  }
  gTrans.query.request = request;
  gTrans.query.pageId = request.pageId;
  sendJSONRequest();
}

function sendJSONRequest() {

  var data = {};
  var arrayArgs = new Array();

  var strJson = JSON.stringify(gTrans.query.request);
  arrayArgs.push("1");
  arrayArgs.push(strJson);

  var l_gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_QUERY_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
  l_gprsCmd.raw = '';
  data = getDataFromGprsCmd(l_gprsCmd);

  requestMBServiceCorp(data, true, 0, requestSearchSuccess);
}

// Chuyen trang
function changePage(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
  gTrans.query.pageId = idx;
  gTrans.query.request.pageId = idx;
  sendJSONRequest();
};

function requestSearchSuccess(e) {
  var response = JSON.parse(e);

  if ((response.respCode == RESP.get('COM_SUCCESS')) && (parseInt(response.responseType) == parseInt(CONSTANTS.get('CMD_QUERY_TRANSFER')))) {
    mainContentScroll.refresh();
    var jsonObj = response.respJsonObj;
    if (jsonObj.length > 0) {
      var xml_doc = genXMLListTrans(jsonObj);
      var xsl_doc = getCachePageXsl("corp/transfer/query/query-list-result");

      genHTMLStringWithXML(xml_doc, xsl_doc, function(oStr) {
        document.getElementById("tblContent").innerHTML = oStr;
      });

      // Tinh so trang
      if (jsonObj.length == 0) {
        gTrans.query.totalPage = 0;
      } else {
        var totalRow = jsonObj[0].TOTAL_ROW;
        gTrans.query.totalPage = Math.ceil(totalRow / gTrans.query.pageSize);
      }

      // Gen phan trang
      var pagination = document.getElementById("pagination");
      var paginationHTML = genPageIndicatorHtml(gTrans.query.totalPage, gTrans.query.request.pageId);
      paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
      pagination.innerHTML = paginationHTML;
    } else {
      document.getElementById("tblContent").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
      document.getElementById("pagination").innerHTML = '';
    }

  } else {
    if (response.respCode == '1019') {
      showAlertText(response.respContent);
    } else {
      showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
    }
  }
}

function genXMLListTrans(pJson) {
  var l_doc_xml = createXMLDoc();
  var l_node_root = createXMLNode('resptable', '', l_doc_xml);
  var l_node_child;
  var l_node_infor;
  for (var i = 0; i < pJson.length; i++) {
    l_node_infor = createXMLNode('tabletdetail', '', l_doc_xml, l_node_root);
    l_node_child = createXMLNode('stt', pJson[i].RNUM, l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('datemake', pJson[i].DATMAKE, l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('amount', formatNumberToCurrency(pJson[i].NUMAMOUNT), l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('beneName', pJson[i].TXTBENNAME, l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('status', CONST_STR.get("TRANS_STATUS_" + pJson[i].CODSTATUS), l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('approver', pJson[i].IDCHECKER, l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('transId', pJson[i].IDFCATREF, l_doc_xml, l_node_infor);
    l_node_child = createXMLNode('userRefId', pJson[i].IDUSERREFERENCE, l_doc_xml, l_node_infor);
  }

  return l_doc_xml;
}

function showTransferDetail(args) {

  var data = {};
  var arrayArgs = new Array();
  var request = new Object();

  request.idtxn = "T02";
  request.sequenceId = "2";
  request.userId = gCustomerNo;
  request.transDetailCode = args;
  gTrans.query.idfcatref = args;


  var jsonReq = JSON.stringify(request);

  arrayArgs.push("2");
  arrayArgs.push(jsonReq);

  var l_gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_QUERY_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
  l_gprsCmd.raw = '';
  data = getDataFromGprsCmd(l_gprsCmd);

  requestMBServiceCorp(data, true, 0, requestTransferDetailSuccess, requestTransferDetailFail);
}

function requestTransferDetailSuccess(e) {
  gTrans.query.objJSON = {};
  var errArr = new Array();
  errArr = ["33", "35", "36", "37", "38", "39"];

  response = JSON.parse(e);
  setRespObjStore(response);
  gTrans.query.objJSON = response.respJsonObj;
  console.log("gTrans.query.objJSON", gTrans.query.objJSON[0].IDTXN);

  if (checkResponseCodeSuccess(response.respCode) && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_QUERY_TRANSFER")))) {
    genDetailScreen(gTrans.query.objJSON[0].IDTXN);

  } else if (errArr.indexOf(response.respCode) != -1) {
    showAlertText(response.respContent);
  }
}

function requestTransferDetailFail(e) {

}

function genDetailScreen(IDTXN) {
  var docXml = createXMLDoc();
  var rootNode;

  var transInfo = gTrans.query.objJSON[0];
  gTrans.query.idfcatref = transInfo.IDFCATREF;

  rootNode = createXMLNode('review', '', docXml);

  /* Thông tin chung */
  var sectionNode = createXMLNode('section', '', docXml, rootNode);

  // Ma giao dich
  var rowNode = createXMLNode('row', '', docXml, sectionNode);
  var labelNode = createXMLNode('label', CONST_STR.get('COM_TRANS_CODE'), docXml, rowNode);
  var valueNode = createXMLNode('value', transInfo.IDFCATREF, docXml, rowNode);

  // Ngay lap
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_CREATED_DATE'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.DATMAKE, docXml, rowNode);

  // Ngay duyet
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_CHECK_DATE'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.DATCHECK, docXml, rowNode);

  // Trang thai
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_STATUS'), docXml, rowNode);
  valueNode = createXMLNode("value", CONST_STR.get("TRANS_STATUS_" + transInfo.CODSTATUS), docXml, rowNode);

  // Lý do từ chối
  if (transInfo.TXTREASON != null) {
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_AUTH_DENIAL_REASON'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TXTREASON, docXml, rowNode);
  }

  /* Thong tin tai khoan */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  var titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

  //trans type
  var transferType = CONST_STR.get('TRANS_BATCH_TYPE_TPB');
  var destAcc = CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'); // tai khoan nhan
  var benName = CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE');
  if (transInfo.IDTXN == "T13") {
    transferType = CONST_STR.get('TRANS_BATCH_TYPE_OTHER');
  }
  if (transInfo.IDTXN == "T19") {
    transferType = CONST_STR.get('AUTHORIZE_TRANS_TIT_T19');
	destAcc = CONST_STR.get('TRANS_CARD_CARD_NUMBER');
  }
  if (transInfo.IDTXN == "T20") {
    transferType = CONST_STR.get('AUTHORIZE_TRANS_TIT_T20');
  }
  if (transInfo.IDTXN == "T21") {
    transferType = CONST_STR.get('AUTHORIZE_TRANS_TIT_T21');
	benName = CONST_STR.get('IDENTIFICATION_RECEIVER_NAME') ;
  }
  
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_TYPE'), docXml, rowNode);
  valueNode = createXMLNode('value', transferType, docXml, rowNode);

  // tai khoan chuyen
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.IDSRCACCT, docXml, rowNode);

  // so du kha dung
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
  valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_BEFOR) + " " + transInfo.CODTRNCURR, docXml, rowNode);

	// khong hien thi do yeu cau 

  /* Thong tin giao dich */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, sectionNode);
  if (transInfo.IDTXN == 'T20')
  {
  // so cmtnd ho chieu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_NUMBER'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.PASSPORT, docXml, rowNode);
	
	// ngay cap 
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_TIME'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.DATISSUE, docXml, rowNode);
	
	// noi cap
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_PLACE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.PLACEISSUE, docXml, rowNode);
	
	// so dien thoai
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_PHONE_NUMBER_2'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TXTPAYMTDETAILS4, docXml, rowNode);
  }
  else
  {
	   // tai khoan nhan  
	  rowNode = createXMLNode('row', '', docXml, sectionNode);
	  labelNode = createXMLNode('label', destAcc, docXml, rowNode);
	  valueNode = createXMLNode('value', transInfo.TXTDESTACCT, docXml, rowNode);
  }
 

  // chu tai khoan nhan 
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', benName, docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.TXTBENNAME, docXml, rowNode);

  // ngan hang nhan
  if (transInfo.IDTXN == 'T13' || transInfo.IDTXN == 'T19' || transInfo.IDTXN == 'T20' || transInfo.IDTXN == 'T21') {
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
  
   // nguoi chiu phi
   if(transInfo.CHARGEINCL=='N')
   {
	  
	  rowNode = createXMLNode('row', '', docXml, sectionNode);
	  labelNode = createXMLNode('label', CONST_STR.get('COM_SENDER_CHARGE'), docXml, rowNode);
	  valueNode = createXMLNode('value', CONST_STR.get('IDENTIFICATION_FEE_SENDER'), docXml, rowNode);
   }
   else
   {
	  rowNode = createXMLNode('row', '', docXml, sectionNode);
	  labelNode = createXMLNode('label', CONST_STR.get('COM_SENDER_CHARGE'), docXml, rowNode);
	  valueNode = createXMLNode('value', CONST_STR.get('IDENTIFICATION_FEE_RECEIVER_PAY'), docXml, rowNode);
   }

  // so du sau khi chuyen
  /*rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), docXml, rowNode);
  valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_FINAL) + " " + transInfo.CODTRNCURR, docXml, rowNode);
*/
	// khong hien thi theo yeu cau

  // noi dung
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
  valueNode = createXMLNode('value', transInfo.TXTPAYMTDETAILS1, docXml, rowNode);

  // quan ly nguoi thu huong
  if (IDTXN != "T11") {
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SAVE_BENE'), docXml, rowNode);
    valueNode = createXMLNode('value', getTransTempInfo(transInfo.TYPE_TEMPLATE), docXml, rowNode);
  }
  
  // gui thong bao
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, rowNode);
  valueNode = createXMLNode('value', getSendMethodText(transInfo.SEND_METHOD), docXml, rowNode);

  // Gen button cho màn hình review
  // Nut huy
  var buttonNode;
  var typeNode;
  var btnLabelNode;
  if (transInfo.CODSTATUS == 'INT') {
    buttonNode = createXMLNode('transType', transInfo.CODSTATUS, docXml, rootNode);
  }

  if (gUserInfo.userRole.indexOf('CorpInput') != -1 && transInfo.CODSTATUS == 'INT') {
    buttonNode = createXMLNode('cancelButton', "true", docXml, rootNode);
  }
  	

  // Nut quay lai
  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', 'back', docXml, buttonNode);
  btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

  // Nut tiep tuc
  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
  btnLabelNode = createXMLNode('label', CONST_STR.get('REVIEW_BTN_CONFIRM'), docXml, buttonNode);


  logInfo(docXml);
  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navCachedPages["corp/transfer/query/transfer-detail"] = null;
  navController.pushToView("corp/transfer/query/transfer-detail", true, 'xsl');
}

function cancelTransaction(args) {
  logInfo(gReviewXml);
  gTrans.query.request.sequenceId = 3;
  gTrans.query.request.transId = gTrans.query.idfcatref;
  gCorp.requests = [gTrans.query.request];
  gCorp.cmdType = CONSTANTS.get("CMD_QUERY_TRANSFER");
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
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

function calculateDifferentMonth(valFromDate, valToDate) {
  var from = valFromDate.split("/");
  var to = valToDate.split("/");
  var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
  var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));
  var currentDate = Date.now();

  if(fromDate.valueOf() > currentDate)
  {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return true;
  }

  if(toDate.valueOf() > currentDate)
  {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return true;
  }

  if (fromDate > toDate) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return true;
  }

  var months = 0;
  months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
  months -= fromDate.getMonth();
  months += toDate.getMonth();
  if (toDate.getDate() < fromDate.getDate()) {
    months--;
  }
  if(months >3)
  {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_INPUT_TWO_DATE_TRANS"));
    return true;
  }
  if(months==3)
  {
    var dayOfFromDate = fromDate.getDate();
    var dayOfToDate = toDate.getDate();
    if(dayOfFromDate < dayOfToDate)
    {
      showAlertText(CONST_STR.get("CORP_MSG_ACC_INPUT_TWO_DATE_TRANS"));
      return true;
    }

  }
  return false;

}

function sendRequestExportExcel() {
  var request = {
    sequenceId: 11,
    idtxn: "T02",
    transTypeId: document.getElementById("id.value.trans.type").value,
    transStatus: document.getElementById("id.value.trans.status").value,
    maker: document.getElementById("trans.maker").value,
    dateBegin: document.getElementById("trans.begindate").value,
    dateEnd: document.getElementById("trans.enddate").value
  };
  if (request.maker == CONST_STR.get("COM_ALL")) {
    request.maker = "ALL";
  }

  var args = ["", request];

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);

  corpExportExcel(data);
}