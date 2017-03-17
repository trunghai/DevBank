var strXml = "";
/*** HEADER ***/
var gprsResp = new GprsRespObj("", "", "", "");
var XmlLocal;
var storedObj;
var data;
var storeXML;

/*** INIT VIEW ***/
function loadInitXML() {
  var tmpXml = getReviewXmlStore();
  XmlLocal = tmpXml;
  if (strXml == '' || strXml == undefined) {
    strXml = XMLToString(tmpXml);
  }

  // logInfo(docXml);

  return tmpXml;
}

function viewDidLoadSuccess() {
  logInfo('review load success');
  storedObj = getRespObjStore();
  storeXML = getReviewXmlStore();

  var btnCancel = document.getElementById("btnCancel");
  var btnPrint = document.getElementById("btnPrint");
  // if (storedObj.detail[0].TRANG_THAI == "INT") {
  //   document.getElementById("btnCancel").style.display = "inline";
  // } 

  if (gUserInfo.userRole.indexOf('CorpAuth') != -1) {
    btnCancel.style.display = "none";
  }

  if (!CONST_BROWSER_MODE) {
    btnPrint.style.display = "none";
  }

  // if (storedObj.detail[0].TRANG_THAI == "ABH") {
  //   document.getElementById("btnPrint").style.display = "inline";
  // };

  // //get sequence form xsl
  // var tmpXslDoc = getCachePageXsl("sequenceform");
  // //create xml
  // var tmpRespReview = getRespObjStore();

  // var tmpStepNo = getSequenceFormIdx(tmpStepNo);
  // tmpStepNo = (!tmpStepNo || (tmpStepNo != 301)) ? 402 : 302;

  // var docXml = createXMLDoc();

  // var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
  // var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);

  // genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr) {
  //   var tmpNodeSeq = document.getElementById('seqFormReview');
  //   tmpNodeSeq.innerHTML = oStr;
  //   changeLanguageInView();
  // }, function() {
  //   logInfo('gen review screen fail');
  //   goBack();
  // });
}

function goBack() {
  navController.popView(true);
}

function btnCancelClick() {
  var xmlDoc = genXMLReviewSrc();
  var req = {
    sequence_id: "4",
    currentSTT: data.CODSTATUS,
    idFcatref: data.IDFCATREF
  };
  gCorp.cmdType = CONSTANTS.get('CMD_CO_USER_CREATED_TRANSACTION'); //su lai
  gCorp.requests = [null, req];

  setReviewXmlStore(xmlDoc);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
  console.log("req ", req);
}

function genXMLReviewSrc() {
  var xmlDoc = createXMLDoc();

  var rootNode = createXMLNode("review", "", xmlDoc);
  var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

  var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  //Ma GD
  createXMLNode("label", CONST_STR.get('AMF_REPORT_CODE_TRANS'), xmlDoc, rowNode);
  createXMLNode("value", data.IDFCATREF, xmlDoc, rowNode);

  //Ngay thuc hien
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('BATCH_SALARY_PROCESSED_DATE'), xmlDoc, rowNode);
  createXMLNode("value", data.DATMAKE, xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('TRANS_ACCOUNT_INFO_BLOCK_TITLE'), xmlDoc, sectionNode);

  //Loai Giao dich
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
  createXMLNode("value", data.IDTXN, xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_LIST_TRANS_NO'), xmlDoc, rowNode);
  createXMLNode("value", data.IDSRCACCT, xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('CRP_SAL_BALANCE'), xmlDoc, rowNode);
  createXMLNode("value", data.BALANCE_BEFOR, xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), xmlDoc, sectionNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('AMF_PERI_AMOUNT'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(data.NUMAMOUNT) + " VND", xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_ACC_NO'), xmlDoc, rowNode);
  createXMLNode("value", data.IDSRCACCT, xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", data.TXTDESTACCT, xmlDoc, rowNode);

  //Ngan Hang
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_BANK_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", data.IDSRCACCT, xmlDoc, rowNode);

  //Phi dich vu
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_FEE_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", "0 VND", xmlDoc, rowNode);

  //Noi dung
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_CONTENT'), xmlDoc, rowNode);
  createXMLNode("value", data.TXTPAYMTDETAILS1, xmlDoc, rowNode);

  //Ngay bat dau
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_BEGIN_DATE'), xmlDoc, rowNode);
  createXMLNode("value", data.DATSTART, xmlDoc, rowNode);

  //Ngay Ket Thuc
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_END_DATE'), xmlDoc, rowNode);
  createXMLNode("value", data.DATEND, xmlDoc, rowNode);

  //Tan suat
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_FREQUENCY'), xmlDoc, rowNode);
  createXMLNode("value", data.TYPEFREQUENCY, xmlDoc, rowNode);

  //Nguoi huong thu
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE'), xmlDoc, rowNode);
  createXMLNode("value", data.DATEND, xmlDoc, rowNode);

  //Send method
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
  createXMLNode("value", data.DATEND, xmlDoc, rowNode);

  var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "cancel", xmlDoc, buttonNode);
  createXMLNode("label", "Hủy", xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "back", xmlDoc, buttonNode);
  createXMLNode("label", "Back", xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "reject", xmlDoc, buttonNode);
  createXMLNode("label", "Tiếp tục", xmlDoc, buttonNode);

  return xmlDoc;
}


function cancelPayTax() {
  showAlertConfirmText(CONST_STR.get('CORP_MSG_ARLERT_CAC_TRANSACTION'));
  document.addEventListener("alertConfirmOK", function(e) {

    var jsonData = new Object();
    jsonData.sequence_id = "3";
    jsonData.idFcatref = gTax.idFcatref;
    jsonData.cancelStatus = "CAC";
    jsonData.idtxn = "B00";

    var args = new Array();
    args.push("3");
    args.push(jsonData);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_PAY_TAX_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
    var data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, cancelPayTaxSuccess, cancelPayTaxFail);
  }, true);
}

function cancelPayTaxSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp);
  if (gprsResp.respCode == 0) {
    showAlertText(CONST_STR.get('CORP_MSG_CANCEL_SUCCESS'));
    goBack();
  } else {
    showAlertText(CONST_STR.get(CONST_STR.get('CORP_ERROR_MSG_CANCEL_SUCCESS')));
  };
};

function cancelPayTaxFail() {

};

function createReport() {
  var jsonData = new Object();
  jsonData.sequence_id = "1";
  jsonData.refNum = gTax.refTax;
  jsonData.idfcatref = gTax.idFcatref;
  jsonData.userId = gCustomerNo;
  jsonData.taxType = gTax.taxType;
  jsonData.idtxn = "B00";

  console.log("jsonData" + jsonData);

  var args = new Array();
  args.push("1");
  args.push(jsonData);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_CREATE_TAX_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, createTaxReportSuccess, createTaxReportFail);
}

function createTaxReportSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp);
  if (gprsResp.respJsonObj != '') {
    openLinkInWindows(gprsResp.respJsonObj);
  } else {
    showAlertText(CONST_STR.get(CONST_STR.get('CORP_ERROR_MSG_CANCEL_SUCCESS')));
  }
}

function createTaxReportFail() {}
