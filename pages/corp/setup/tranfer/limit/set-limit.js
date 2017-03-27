gSetUp.idtxn = "S15";

gSetUp.limitInfo;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewDidLoadSuccess() {
	//Gen sequence
	genSequenceSection();

	if (!gTrans.isBack) {
		//Lay thong tin han muc toi da
		getUserLimitInfo();
	}
	
	if(gUserInfo.userRole.indexOf('CorpInput') == -1){
		document.getElementById("btnNext").style.display = "none";
	}

	gTrans.isBack = false;
}

//Lay thong tin han muc toi da
function getUserLimitInfo() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gSetUp.idtxn;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_CHANGE_TRANS_LIMIT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0, getUserLimitSuccess, function(){
		// Co loi Hien thong bao va quay ve trang chu
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
		gotoHomePage();
	});
}

function getUserLimitSuccess(data) {
	var resp = JSON.parse(data);
	if (resp.respCode == '0' && resp.respJsonObj.length == 4) {
		gSetUp.currentUserLimit = resp.respJsonObj;
		genTableOfResults(resp.respJsonObj);
	} else {
		// Co loi Hien thong bao va quay ve trang chu
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
		gotoHomePage();
	}
}

function genTableOfResults(data) {
	var docXsl = getCachePageXsl("corp/setup/tranfer/limit/set-limit-table");
	var docXml = createXMLDoc();
	var rootNode = createXMLNode("review", "", docXml);

	var isInput = "false";

	if(gUserInfo.userRole.indexOf('CorpInput') != -1){
		isInput = "true";
	}

	gSetUp.limitInfo = {};

	createXMLNode("isInput", isInput, docXml, rootNode);
	var rowsNode = createXMLNode("services", "", docXml, rootNode);
	for (var i in data) {
		var service = data[i];

		gSetUp.limitInfo[service.MA_DV] = {
			HAN_MUC_LAN_MAX : service.HAN_MUC_LAN_MAX,
			HAN_MUC_NGAY_MAX : service.HAN_MUC_NGAY_MAX,
			HAN_MUC_LAN : service.HAN_MUC_LAN,
			HAN_MUC_NGAY : service.HAN_MUC_NGAY
		};

		var rowNode = createXMLNode("service", "", docXml, rowsNode);
		createXMLNode("isInput", isInput, docXml, rowNode);
		createXMLNode("id", service.MA_DV, docXml, rowNode);
		createXMLNode("name", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_" + service.MA_DV), docXml, rowNode);
		createXMLNode("max-limit-time", formatCurrency2(parseInt(service.HAN_MUC_LAN_MAX)), docXml, rowNode);
		createXMLNode("max-limit-day", formatCurrency2(parseInt(service.HAN_MUC_NGAY_MAX)), docXml, rowNode);
		createXMLNode("valueTime", formatCurrency2(parseInt(service.HAN_MUC_LAN)), docXml, rowNode);
		createXMLNode("valueDay", formatCurrency2(parseInt(service.HAN_MUC_NGAY)), docXml, rowNode);
	};

	genHTMLStringWithXML(docXml, docXsl, function(htmlOutput) {
		var element = document.getElementById("resultsTable");
		element.innerHTML = htmlOutput;
	}, function() {
		// Co loi Hien thong bao va quay ve trang chu
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
		gotoHomePage();
	});
}

function genSequenceSection() {
	// Gen step sequence
	var sequenceXSL = getCachePageXsl("sequenceform");
	var docXml = createXMLDoc();
	var rootNode = createXMLNode("seqFrom", "", docXml);
	createXMLNode("stepNo", 301, docXml, rootNode);
	genHTMLStringWithXML(docXml, sequenceXSL, 
		function(htmlOutput) {
			var element = document.getElementById("seqFormAuthen");
			element.innerHTML = htmlOutput;
		}, 
		function() {
			// Co loi Hien thong bao va quay ve trang chu
			showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
			gotoHomePage();
		});
}

function handleInputAmount (e, des) {
	var tmpVale = des.value;
	formatCurrency(e, des);
	var numStr = convertNum2WordWithLang(keepOnlyNumber(tmpVale), gUserInfo.lang); 
}

function validateLimit(GACCOtime, GACCOday, GTRANtime, GTRANday,
		 GPAYStime, GPAYSday, GPAYItime, GPAYIday) {

	if (GACCOtime.trim() == "" || GACCOtime == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("COM_ACCOUNT") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME")]));
		return false;
	};
	if (GACCOday.trim() == "" || GACCOday == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("COM_ACCOUNT") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY")]));
		return false;
	};
	if (GTRANtime.trim() == "" || GTRANtime == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME")]));
		return false;
	};
	if (GTRANday.trim() == "" || GTRANday == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY")]));
		return false;
	};
	if (GPAYStime.trim() == "" || GPAYStime == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("MENU_PAYMENT") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME")]));
		return false;
	};
	if (GPAYSday.trim() == "" || GPAYSday == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("MENU_PAYMENT") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY")]));
		return false;
	};
	if (GPAYItime.trim() == "" || GPAYItime == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME")]));
		return false;
	};
	if (GPAYIday.trim() == "" || GPAYIday == 0) {
		showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), ['"' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI") + '" - ' + CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY")]));
		return false;
	};

	var GACCOService;
	var GTRANService;
	var GPAYSService;
	var GPAYIService;
	for (var i in gSetUp.currentUserLimit) {
		var service = gSetUp.currentUserLimit[i];
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

	if (parseInt(GACCOtime) > parseInt(GACCOday)) {
		showAlertText(CONST_STR.get("SET_LIMIT_TIME_GREATER_DAY"));
		return false;
	}
	if (parseInt(GTRANtime) > parseInt(GTRANday)) {
		showAlertText(CONST_STR.get("SET_LIMIT_TIME_GREATER_DAY"));
		return false;
	}
	if (parseInt(GPAYStime) > parseInt(GPAYSday)) {
		showAlertText(CONST_STR.get("SET_LIMIT_TIME_GREATER_DAY"));
		return false;
	}
	if (parseInt(GPAYItime) > parseInt(GPAYIday)) {
		showAlertText(CONST_STR.get("SET_LIMIT_TIME_GREATER_DAY"));
		return false;
	}


	if (parseInt(GACCOtime) > parseInt(GACCOService.HAN_MUC_LAN_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_TIME_LIMIT"));
		return false;
	}
	if (parseInt(GACCOday) > parseInt(GACCOService.HAN_MUC_NGAY_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_DAY_LIMIT"));
		return false;
	}
	if (parseInt(GTRANtime) > parseInt(GTRANService.HAN_MUC_LAN_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_TIME_LIMIT"));
		return false;
	}
	if (parseInt(GTRANday) > parseInt(GTRANService.HAN_MUC_NGAY_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_DAY_LIMIT"));
		return false;
	}
	if (parseInt(GPAYStime) > parseInt(GPAYSService.HAN_MUC_LAN_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_TIME_LIMIT"));
		return false;
	}
	if (parseInt(GPAYSday) > parseInt(GPAYSService.HAN_MUC_NGAY_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_DAY_LIMIT"));
		return false;
	}
	if (parseInt(GPAYItime) > parseInt(GPAYIService.HAN_MUC_LAN_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_TIME_LIMIT"));
		return false;
	}
	if (parseInt(GPAYIday) > parseInt(GPAYIService.HAN_MUC_NGAY_MAX)) {
		showAlertText(CONST_STR.get("SET_OVER_DAY_LIMIT"));
		return false;
	}

	return true;
}

function btnNextClick() {
	var currentUserLimit = gSetUp.currentUserLimit;

	var request = {};
	request.new_limit = {
		GACCO_time : removeSpecialChar(document.getElementById('GACCO-time-new').value),
		GACCO_day : removeSpecialChar(document.getElementById('GACCO-day-new').value),
		GTRAN_time : removeSpecialChar(document.getElementById('GTRAN-time-new').value),
		GTRAN_day : removeSpecialChar(document.getElementById('GTRAN-day-new').value),
		GPAYS_time : removeSpecialChar(document.getElementById('GPAYS-time-new').value),
		GPAYS_day : removeSpecialChar(document.getElementById('GPAYS-day-new').value),
		GPAYI_time : removeSpecialChar(document.getElementById('GPAYI-time-new').value),
		GPAYI_day : removeSpecialChar(document.getElementById('GPAYI-day-new').value)
	};

	var isValid = validateLimit(request.new_limit.GACCO_time, request.new_limit.GACCO_day,
		 request.new_limit.GTRAN_time, request.new_limit.GTRAN_day, request.new_limit.GPAYS_time,
		 request.new_limit.GPAYS_day, request.new_limit.GPAYI_time, request.new_limit.GPAYI_day);
	if (!isValid)
		return;

	request.old_limit = {
		GACCO_time : currentUserLimit[0].HAN_MUC_LAN,
		GACCO_day : currentUserLimit[0].HAN_MUC_NGAY,
		GTRAN_time : currentUserLimit[1].HAN_MUC_LAN,
		GTRAN_day : currentUserLimit[1].HAN_MUC_NGAY,
		GPAYS_time : currentUserLimit[2].HAN_MUC_LAN,
		GPAYS_day : currentUserLimit[2].HAN_MUC_NGAY,
		GPAYI_time : currentUserLimit[3].HAN_MUC_LAN,
		GPAYI_day : currentUserLimit[3].HAN_MUC_NGAY
	};

	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.userId = gCustomerNo;
	jsonData.request = request;

	gSetUp.reviewData = request;
	
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_CHANGE_TRANS_LIMIT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, function(){
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
	});
}

function requestMBServiceSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == 55) {
		showAlertText(CONST_STR.get("CORP_MSG_SAME_TYPE_TRANS_EXIST"));
		return;
	}
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {

		var xmlDoc = genReviewScreen();
		var req = {
			sequence_id : "3",
			idtxn : gSetUp.idtxn,
			transId : resp.respJsonObj[0].MA_GD
		};
		gCorp.cmdType = CONSTANTS.get('CMD_CO_SETUP_CHANGE_TRANS_LIMIT');
	    gCorp.requests = [req, null];
	    setReviewXmlStore(xmlDoc);
	    navCachedPages["corp/common/review/com-review"] = null;

	    gTrans.isBack = false;
	    gCorp.rootView = currentPage;
	    navController.pushToView("corp/common/review/com-review", true, 'xsl');

	} else {
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
	}
} 

function formatCurrency2(num) {
	num = num.toString().replace(/\$|\,/g,'');
	if(isNaN(num))
	num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num*100+0.50000000001);
	num = Math.floor(num/100).toString();
	for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
	num = num.substring(0,num.length-(4*i+3))+','+
	num.substring(num.length-(4*i+3));
	return (((sign)?'':'-') + num);
}

function genReviewScreen() {
	var reviewData = gSetUp.reviewData;

	var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

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
	var tdNode = createXMLNode("td", CONST_STR.get("COM_ACCOUNT"), xmlDoc, trNode);
	createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GACCO.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GACCO.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GACCO_time), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GACCO_day), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
	tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI"), xmlDoc, trNode);
	createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GPAYI.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GPAYI.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GPAYI_time), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GPAYI_day), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
	tdNode = createXMLNode("td", CONST_STR.get("COM_PAY_SERVICE"), xmlDoc, trNode);
	createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GPAYS.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GPAYS.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GPAYS_time), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GPAYS_day), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY"), xmlDoc, tdNode);

    trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    tdNode = createXMLNode("td", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN"), xmlDoc, trNode);
	createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_SERVICE"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GTRAN.HAN_MUC_LAN_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(gSetUp.limitInfo.GTRAN.HAN_MUC_NGAY_MAX), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_DAY_MAX"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GTRAN_time), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("CONST_TRANS_LIMIT_TIT_LIMIT_CURRENT_TIME"), xmlDoc, tdNode);
    tdNode = createXMLNode("td", formatCurrency2(reviewData.new_limit.GTRAN_day), xmlDoc, trNode);
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

function btnBackClick() {
	gTrans.isBack = false;
	navCachedPages["corp/setup/tranfer/set_tranfer"] = null;
    navController.initWithRootView('corp/setup/tranfer/set_tranfer', true, 'xsl');
}