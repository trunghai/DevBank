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

  logInfo(docXml);

  return tmpXml;
}

function viewDidLoadSuccess() {
  logInfo('review load success');

  storedObj = getRespObjStore();
  data = storedObj[0];
  storeXML = getReviewXmlStore();
  var btnCancel = document.getElementById("btnCancel");

  console.log("data.IDROLE", data.IDROLE);
  console.log("data.IDROLE", data.CODSTATUS);
  
  if (gUserInfo.userRole.indexOf('CorpInput') != -1) {
    if (data.CODSTATUS == "INT" || data.CODSTATUS == "ABH" || data.CODSTATUS == "PFC") {
      btnCancel.style.display = "inline";
    };
  };
}

function goBack() {
  navController.popView(true);
}

function btnCancelClick() {
  var xmlDoc = genXMLReviewSrc();
  var req = {
    sequence_id: "4",
    idtxn: "T00",
    payee: gTrans.payee,
    currentSTT: data.CODSTATUS,
    idUserReference: gTrans.idUserReference,
    idFcatref: data.IDFCATREF,
    xmlRequest: gTrans.xmlRequest,
    newIdfcatref: gTrans.newIdfcatRef,
    newUserIdRef: gTrans.newIdUserRef
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
  createXMLNode("label", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, rowNode);
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
  createXMLNode("value", CONST_STR.get('MENU_TRANS_PERIODIC'), xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_BATCH_ACC_LABEL'), xmlDoc, rowNode);
  createXMLNode("value", data.IDSRCACCT, xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('CRE_DEBT_SURPLUS_AVAILABEL'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(data.BALANCE_BEFOR) + ' VND', xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), xmlDoc, sectionNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);

  createXMLNode("label", CONST_STR.get('COM_AMOUNT'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(data.NUMAMOUNT) + " VND", xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_ACC_NO'), xmlDoc, rowNode);
  createXMLNode("value", data.TXTDESTACCT, xmlDoc, rowNode);

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", data.CUSTOMER_NAME1, xmlDoc, rowNode);

  //Ngan Hang
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_BANK_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", "TPBank", xmlDoc, rowNode);

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
  createXMLNode("value", CONST_STR.get('CONST_TRANS_FREQUENCY_' + data.TYPEFREQUENCY), xmlDoc, rowNode);

  // //Nguoi huong thu
  // rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  // createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE'), xmlDoc, rowNode);
  // createXMLNode("value", '????', xmlDoc, rowNode);

  // //Send method
  // rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  // createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
  // createXMLNode("value", '????', xmlDoc, rowNode);

  var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "cancel", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "back", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "reject", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_CONFIRM"), xmlDoc, buttonNode);

  return xmlDoc;
}
