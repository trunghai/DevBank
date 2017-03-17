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
    /*if (data.TRANG_THAI == "INT" || data.TRANG_THAI == "ABH" || data.TRANG_THAI == "PFC") {*/
	if (data.TRANG_THAI == "INT") {
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
    sequenceId: "3",
	idtxn: "B13",
    transIds: data.MA_GIAO_DICH
  };
  gCorp.cmdType = CONSTANTS.get('CMD_CO_INT_PAYMENT_EXCHANGE_MANAGER'); //su lai
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
  createXMLNode("value", data.MA_GIAO_DICH, xmlDoc, rowNode);

  //Ngay thuc hien
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('BATCH_SALARY_PROCESSED_DATE'), xmlDoc, rowNode);
  createXMLNode("value", data.NGAY_LAP, xmlDoc, rowNode);
  
  //Ngay duyet
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_CHECK_DATE'), xmlDoc, rowNode);
  createXMLNode("value", data.NGAY_DUYET, xmlDoc, rowNode);
  
  //Trang thai
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_STATUS'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get('TRANS_STATUS_' + data.TRANG_THAI), xmlDoc, rowNode);
  
  if(data.TRANG_THAI == "REJ"){
	  //lý do từ chối
	   rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  	   createXMLNode("label", CONST_STR.get('AUTHORIZE_TXT_REASON'), xmlDoc, rowNode);
 	   createXMLNode("value", data.LY_DO_TU_CHOI, xmlDoc, rowNode);
  }

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), xmlDoc, sectionNode);

  //Loai Giao dich
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get('MENU_CHILD_EXCHANGE_MONEY'), xmlDoc, rowNode);
  
  // tai khoan chuyen
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_ACCOUNT'), xmlDoc, rowNode);
  createXMLNode("value", data.TK_CHUYEN, xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), xmlDoc, sectionNode);
  
  // tai khoan nhan
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_ACCOUNT_PAYMENT'), xmlDoc, rowNode);
  createXMLNode("value", data.TK_NHAN, xmlDoc, rowNode);
  
  // so luong doi
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_SELL_NUMBER'), xmlDoc, rowNode);
  createXMLNode("value", formatCurrentWithSysbol(data.SO_LUONG_DOI,"") + ' ' + data.DON_VI_TIEN, xmlDoc, rowNode);
  
  //ty gia
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_RATE'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(data.RATE), xmlDoc, rowNode);3
  
  //so tien nhan duoc
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_TOTAL_RECEIVER_AMOUNT'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(data.SO_TIEN_NHAN_DUOC) + ' VND', xmlDoc, rowNode);
  
  // Ngân hàng
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_BANK_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", 'TPBank', xmlDoc, rowNode);
  
  // Phi dich vu
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_FEE_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", '0 VND', xmlDoc, rowNode);
  
   // noi dung chuyen
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_CONTENT'), xmlDoc, rowNode);
  createXMLNode("value", data.NOI_DUNG, xmlDoc, rowNode);
  
  
  
   // gui thong bao cho nguoi duyet
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get("COM_NOTIFY_" + data.SEND_METHOD), xmlDoc, rowNode);
  
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

function formatCurrentWithSysbol(n, currency) {
	
	var k;
    k = currency + "" + Math.abs(n).toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
	if(k.substr(k.length - 2, k.length)==='00')
	{
		k = k.substr(0,k.length - 3);
	}
	return k;
}