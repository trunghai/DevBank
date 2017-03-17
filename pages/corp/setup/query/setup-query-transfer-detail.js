gSetUp.idtxn = "S03";

var xmlStored;
var respStored;
var gprsCmdStored = {};

function loadInitXML() {
	xmlStored = getReviewXmlStore();
	return xmlStored;
}

function viewDidLoadSuccess() {
	respStored = getRespObjStore();

	var btnNext = document.getElementById('btnNext');
	btnNext.style.display = "none";

	var currentTrans = respStored.respJsonObj;

	if (gSetUp.transType == "S14") {
        if (currentTrans[0].TRANG_THAI == 'INT' && gUserInfo.userRole.indexOf('CorpInput') != -1)
		  btnNext.style.display = "";
	}

	if (gSetUp.transType == 'S15') {
		if (currentTrans.results[0].TRANG_THAI == 'INT' && gUserInfo.userRole.indexOf('CorpInput') != -1)
		  btnNext.style.display = "";
	}

}

function btnBackClick() {
	navController.popView(true);
}

function btnNextClick() {
	if (gSetUp.transType == 'S14') {
        var currentTrans = respStored.respJsonObj[0];
		var xmlDoc = genDetailChangeAuthMethodScreen(currentTrans);
		var req = {
			sequence_id : "7",
            idtxn : gSetUp.idtxn,
			transId : currentTrans.MA_GD
		};
		gCorp.cmdType = CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER');
	    gCorp.requests = [req, null];

		setReviewXmlStore(xmlDoc);
		navCachedPages["corp/common/review/com-review"] = null;
		navController.pushToView("corp/common/review/com-review", true, 'xsl');
	}

	if (gSetUp.transType == 'S15') {
        var currentTrans = respStored.respJsonObj;
		var xmlDoc = genDetailChangeTransLimitScreen(currentTrans);
		var req = {
			sequence_id : "9",
            idtxn : gSetUp.idtxn,
			transId : currentTrans.results[0].MA_GD
		};
		gCorp.cmdType = CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER');
	    gCorp.requests = [req, null];

		setReviewXmlStore(xmlDoc);
		navCachedPages["corp/common/review/com-review"] = null;
		navController.pushToView("corp/common/review/com-review", true, 'xsl');
	}

}

function genDetailChangeAuthMethodScreen(reviewData) {
	var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);

    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), xmlDoc, rowNode);
    createXMLNode("value", CONST_STR.get('COM_IDTXN_' + reviewData.LOAI_GD), xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, rowNode);
	createXMLNode("value", reviewData.MA_GD, xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, rowNode);
	createXMLNode("value", reviewData.NGAY_THUC_HIEN, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('COM_METHOD_ARE_USED'), xmlDoc, sectionNode);
    createXMLNode("row-one-col", CONST_STR.get('COM_TOKEN_' + reviewData.KIEU_XAC_THUC_CU), xmlDoc, sectionNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('CONST_SETUP_QUERY_TIT_AUTH_METHOD_NEW'), xmlDoc, sectionNode);
    createXMLNode("row-one-col", CONST_STR.get('COM_TOKEN_' + reviewData.KIEU_XAC_THUC_MOI), xmlDoc, sectionNode);

    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "cancel", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_NEXT"), xmlDoc, buttonNode);

    return xmlDoc;
}

function genDetailChangeTransLimitScreen(data) {
    var GACCOService;
    var GTRANService;
    var GPAYSService;
    var GPAYIService;
    for (var i in data.limit) {
        var service = data.limit[i];
        if (service.MA_DV == "GACCO") {
            GACCOService = service;
        }
        if (service.MA_DV == "GTRAN") {
            GTRANService = service;
        }
        if (service.MA_DV == "GPAYS") {
            GPAYSService = service;
        }
        if (service.MA_DV == "GPAYI") {
            GPAYIService = service;
        }
    }

    var reviewData = data.results[0];
	var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);

    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), xmlDoc, rowNode);
    createXMLNode("value", CONST_STR.get('COM_IDTXN_' + reviewData.LOAI_GD), xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, rowNode);
	createXMLNode("value", reviewData.MA_GD, xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('BATCH_SALARY_PROCESSED_DATE'), xmlDoc, rowNode);
	createXMLNode("value", reviewData.NGAY_THUC_HIEN, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
    var trNode = createXMLNode("tr", '', xmlDoc, theadNode);
    createXMLNode("class", 'trow-title', xmlDoc, trNode);

    var thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, trNode);
    createXMLNode("rowspan", '2', xmlDoc, thNode);
    thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_MAX_LIMIT"), xmlDoc, trNode);
    createXMLNode("colspan", '2', xmlDoc, thNode);
    thNode = createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SELECTED_LIMIT"), xmlDoc, trNode);
    createXMLNode("colspan", '2', xmlDoc, thNode);
    
    trNode = createXMLNode("tr", '', xmlDoc, theadNode);
    createXMLNode("class", 'trow-title', xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, trNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
    
	var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    createXMLNode("class", 'tdselct td-head-color', xmlDoc, trNode);
	var tdNode = createXMLNode("td", CONST_STR.get("COM_ACCOUNT"), xmlDoc, trNode);
	createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GACCOService.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GACCOService.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GACCO_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GACCO_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    createXMLNode("class", 'tdselct td-head-color', xmlDoc, trNode);
	tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GTRANService.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GTRANService.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GTRAN_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GTRAN_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    createXMLNode("class", 'tdselct td-head-color', xmlDoc, trNode);
	tdNode = createXMLNode("td", CONST_STR.get("COM_PAY_SERVICE"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GPAYSService.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GPAYSService.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GPAYS_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GPAYS_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    createXMLNode("class", 'tdselct td-head-color', xmlDoc, trNode);
	tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI"), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GPAYIService.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(GPAYIService.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GPAYI_ONE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.NEW_GPAYI_DAY), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "cancel", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_NEXT"), xmlDoc, buttonNode);

    return xmlDoc;
}