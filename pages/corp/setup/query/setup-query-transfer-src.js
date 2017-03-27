gSetUp.idtxn = "S03";

var rowsPerPage = 10;

var searchInfo;

var allResults;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewDidLoadSuccess() {
	createDatePicker('id.begindate', 'span.begindate');				
	createDatePicker('id.enddate', 'span.enddate');

	if (!gTrans.isBack) {
		searchInfo = {
			transType : "",
			transTypeDtl : "",
			status : "",
			maker : "",
			transId : "",
			fromDate : "",
			endDate : "",
			pageSize : 10,
			pageIdx : 1
		}	
	}

	gTrans.isBack = false;						
}

function addEventListenerToCombobox(selectHandle, closeHandle) {
	document.addEventListener("evtSelectionDialog", selectHandle, false);
	document.addEventListener("evtSelectionDialogClose", closeHandle, false);
}

function removeEventListenerToCombobox(selectHandle, closeHandle) {
	document.removeEventListener("evtSelectionDialog", selectHandle, false);
	document.removeEventListener("evtSelectionDialogClose", closeHandle, false);
}

function showTransTypeSelection() {
	var cbxValues = (gUserInfo.lang == 'EN')? CONST_SETUP_QUERY_TRANS_TYPE_EN: CONST_SETUP_QUERY_TRANS_TYPE_VN;
	addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	showDialogList(CONST_STR.get('TRANS_PERIODIC_DIALOG_TITLE_ACCTYPE'), cbxValues, CONST_SETUP_QUERY_TRANS_TYPE_KEY, false);
}

function handleSelectTransType(e) {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	searchInfo.transType = e.selectedValue2;
	document.getElementById('id.trans-type').value = e.selectedValue1;
	searchInfo.transTypeDtl = "";
	document.getElementById('id.trans-type-dtl').value = CONST_STR.get("COM_ALL");
}

function handleCloseTransTypeCbx() {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
}

function showTransTypeDetailSelection() {
	if (searchInfo.transType == "S01") {
		var cbxText = (gUserInfo.lang == 'EN')? CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_EN: CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_VN;
		var cbxValues = CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_KEY;
	} else if (searchInfo.transType == "S02") {
		var cbxText = (gUserInfo.lang == 'EN')? CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_EN: CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_VN;
		var cbxValues = CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_KEY;
	} else {
		var cbxText = (gUserInfo.lang == 'EN')? CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_EN: CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_VN;
		var cbxValues = CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_KEY;
	}
	addEventListenerToCombobox(handleSelectTransTypeDetail, handleCloseTransTypeDetailCbx);
	showDialogList(CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), cbxText, cbxValues, false);
}

function handleSelectTransTypeDetail(e) {
	removeEventListenerToCombobox(handleSelectTransTypeDetail, handleCloseTransTypeDetailCbx);
	searchInfo.transTypeDtl = e.selectedValue2;
	document.getElementById('id.trans-type-dtl').value = e.selectedValue1;
}

function handleCloseTransTypeDetailCbx() {
	removeEventListenerToCombobox(handleSelectTransTypeDetail, handleCloseTransTypeDetailCbx);
}

function showTransStatusSelection() {
	var cbxValues = (gUserInfo.lang == 'EN')? CONST_SETUP_QUERY_LIST_STATUS_EN: CONST_SETUP_QUERY_LIST_STATUS_VN;
	addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, CONST_SETUP_QUERY_LIST_STATUS_KEY, false);
}

function handleSelectdTransStatus(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	searchInfo.status = e.selectedValue2;
	document.getElementById("id.status").value = e.selectedValue1;
}

function handleCloseTransStatusCbx(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
}

function showMakers() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gSetUp.idtxn;
	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_QUERY_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, getMakersSuccess, function(){});
}

function getMakersSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == 0 || resp.respJsonObj.length > 0) {
		var cbxText = [];
		var cbxValues = [];
		cbxText.push(CONST_STR.get("COM_ALL"));
		cbxValues.push("");
		for (var i in resp.respJsonObj) {
			var userId = resp.respJsonObj[i].IDUSER;
			cbxText.push(userId);
			cbxValues.push(userId);
		}
		addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
		showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), cbxText, cbxValues, false);
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_LIST_MAKER'));
}

function handleSelectMaker(e){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	searchInfo.maker = e.selectedValue2;
	document.getElementById('id.maker').value = e.selectedValue1;
}
function handleCloseMakerCbx(){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
}

function searchTransaction(idx) {
	document.getElementById('id.searchResult').innerHTML = "";
	document.getElementById('pageIndicatorNums').innerHTML = "";

	searchInfo.fromDate = document.getElementById("id.begindate").value;
	searchInfo.endDate = document.getElementById("id.enddate").value;
	searchInfo.transId = document.getElementById("id.trans-id").value;
	searchInfo.pageIdx = idx;
	sendJSONRequest();
}

function getTotalPages(totalRows) {
	return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}

function validate(fromDateStr, endDateStr) {
	var diff = getDiffDaysBetween(fromDateStr, endDateStr, "dd/MM/yyyy");
	if (diff != NaN && diff < 0) {
		showAlertText(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
		return false;
	}
	return true;
}

function sendJSONRequest(){
	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.idtxn = gSetUp.idtxn;

	jsonData.transType = (searchInfo.transTypeDtl == "") ? searchInfo.transType : searchInfo.transTypeDtl;
	jsonData.status = searchInfo.status;
	jsonData.maker = searchInfo.maker;
	jsonData.transId = searchInfo.transId;
	jsonData.fromDate = searchInfo.fromDate;
	jsonData.endDate = searchInfo.endDate;
	jsonData.pageSize = searchInfo.pageSize;
	jsonData.pageIdx = searchInfo.pageIdx;

	var isValid = validate(jsonData.fromDate, jsonData.endDate);
	if (!isValid) {
		return;
	}
		
	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, function() {
		showAlertText(CONST_STR.get('CORP_MSG_PERIODIC_ERROR_INSERT_DATA'));
	});
}

function requestMBServiceSuccess(e){
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		allResults = resp.respJsonObj;
		var xmlData = genResultTable(resp.respJsonObj);
		var docXsl = getCachePageXsl("corp/setup/query/setup-query-transfer-result-tbl");

		genHTMLStringWithXML(xmlData, docXsl, function(html){
			var tmpNode = document.getElementById('id.searchResult');
			tmpNode.innerHTML = html;
			genPagging(getTotalPages(resp.respJsonObj[0].TOTAL_ROW), searchInfo.pageIdx);
		});

	} else {
		document.getElementById("pageIndicatorNums").innerHTML = "";
		document.getElementById("id.searchResult").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
	}
};

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx);
	nodepage.innerHTML = tmpStr;
}

function genResultTable(inputData) {
	var docXml = createXMLDoc();

	var rootNode = createXMLNode('result','',docXml);
	var childNodeTitle = createXMLNode('title','',docXml, rootNode);
	var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_STATUS'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);
	
	var stt = (searchInfo.pageIdx - 1) * rowsPerPage + 1;
	for (var i = 0; i < inputData.length; i++) {
		var obj = inputData[i];
		if (typeof obj !== "undefined") {
			var childNodeCont = createXMLNode('content','',docXml,rootNode)
			var childNodeDeta = createXMLNode('acccontent1', stt++ , docXml,childNodeCont);
			createXMLNode('acctitle1', CONST_STR.get('COM_NO') , docXml,childNodeCont);
			childNodeDeta = createXMLNode('acccontent2', obj.NGAY_LAP, docXml,childNodeCont);
			createXMLNode('acctitle2', CONST_STR.get('COM_CREATED_DATE') , docXml,childNodeCont);
			childNodeDeta = createXMLNode('acccontent3', CONST_STR.get('COM_IDTXN_' + obj.LOAI_GD), docXml,childNodeCont);
			createXMLNode('acctitle3', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL') , docXml,childNodeCont);
			childNodeDeta = createXMLNode('acccontent4', CONST_STR.get('TRANS_STATUS_' + obj.TRANG_THAI), docXml,childNodeCont);
			createXMLNode('acctitle4', CONST_STR.get('COM_STATUS') , docXml,childNodeCont);
			childNodeDeta = createXMLNode('acccontent5', obj.NGUOI_DUYET, docXml,childNodeCont);
			createXMLNode('acctitle5', CONST_STR.get('COM_CHEKER') , docXml,childNodeCont);
			childNodeDeta = createXMLNode('transId', obj.MA_GD, docXml,childNodeCont);
			childNodeDeta = createXMLNode('idx', i, docXml,childNodeCont);
			createXMLNode('acctitle6', CONST_STR.get('COM_TRANS_CODE') , docXml,childNodeCont);
		}
	};
	return docXml;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
	searchInfo.pageIdx = selectedIdx;
	sendJSONRequest();
}

function showDetailTransaction(idx, transId) {
	var selectedTrans = allResults[idx];
	if (selectedTrans.LOAI_GD == "S11") {
		getDetailChangeInfo(transId);
	}
	if (selectedTrans.LOAI_GD == "S12") {
		getDetailChangePassword(transId);
	}
	if (selectedTrans.LOAI_GD == "S13") {
		getDetailChangeSendMethod(transId);
	}
	if (selectedTrans.LOAI_GD == "S14") {
		getDetailChangeAuthMethod(transId);
	}
	if (selectedTrans.LOAI_GD == "S15") {
		getDetailChangeTransLimit(transId);
	}
}

function getDetailChangeInfo(transId) {
	var jsonData = new Object();
	jsonData.sequence_id = "3";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.transId = transId;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailChangeInfoSuccess, function() {showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));});
}

function getDetailChangeInfoSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		var docXml = genDetailChangeInfo(resp.respJsonObj[0]);
		setReviewXmlStore(docXml);
		setRespObjStore(resp);
		navCachedPages["corp/setup/query/setup-query-transfer-detail"] = null;
    	navController.pushToView("corp/setup/query/setup-query-transfer-detail", true, 'xsl');
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
}

function getDetailChangePassword(transId) {
	var jsonData = new Object();
	jsonData.sequence_id = "4";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.transId = transId;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailChangePasswordSuccess, function() {showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));});
}

function getDetailChangePasswordSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		var docXml = genDetailChangePassword(resp.respJsonObj[0]);
		setReviewXmlStore(docXml);
		setRespObjStore(resp);
		navCachedPages["corp/setup/query/setup-query-transfer-detail"] = null;
    	navController.pushToView("corp/setup/query/setup-query-transfer-detail", true, 'xsl');
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
}

function getDetailChangeSendMethod(transId) {
	var jsonData = new Object();
	jsonData.sequence_id = "5";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.transId = transId;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailChangeSendMethodSuccess, function() {showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));});
}

function getDetailChangeSendMethodSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		var docXml = genDetailChangeSendMethod(resp.respJsonObj[0]);
		setReviewXmlStore(docXml);
		setRespObjStore(resp);
		navCachedPages["corp/setup/query/setup-query-transfer-detail"] = null;
    	navController.pushToView("corp/setup/query/setup-query-transfer-detail", true, 'xsl');
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
}

function getDetailChangeAuthMethod(transId) {
	var jsonData = new Object();
	jsonData.sequence_id = "6";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.transId = transId;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailChangeAuthMethodSuccess, function() {showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));});
}

function getDetailChangeAuthMethodSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		var docXml = genDetailChangeAuthMethod(resp.respJsonObj[0]);
		setReviewXmlStore(docXml);
		setRespObjStore(resp);
		navCachedPages["corp/setup/query/setup-query-transfer-detail"] = null;
    	navController.pushToView("corp/setup/query/setup-query-transfer-detail", true, 'xsl');
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
}

function getDetailChangeTransLimit(transId) {
	var jsonData = new Object();
	jsonData.sequence_id = "8";
	jsonData.idtxn = gSetUp.idtxn;
	jsonData.transId = transId;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_SETUP_QUERY_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailChangeTransLimitSuccess, function() {showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));});
}

function getDetailChangeTransLimitSuccess(e) {
	var resp = JSON.parse(e);
	if (resp.respCode == '0' && resp.respJsonObj.limit.length == 4 && resp.respJsonObj.results.length > 0) {
		var docXml = genDetailChangeTransLimit(resp.respJsonObj);
		setReviewXmlStore(docXml);
		setRespObjStore(resp);
		navCachedPages["corp/setup/query/setup-query-transfer-detail"] = null;
    	navController.pushToView("corp/setup/query/setup-query-transfer-detail", true, 'xsl');
	} else 
		showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
}

function genDetailChangeInfo(transaction) {
	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);
	
	var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
		
	var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('COM_IDTXN_' + transaction.LOAI_GD), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.MA_GD, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_THUC_HIEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_DUYET, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_STATUS'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + transaction.TRANG_THAI), docXml, tmpTransContentNode);

	tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
	tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('SET_USER_ITLE_GET_USER_INFO'), docXml, tmpXmlNodeInfo);
		
	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('INTRODUCE_INFO_NAME'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.HO_TEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_SHORT_NAME'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.TEN_NGAN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('INTRODUCE_INFO_ID'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.CMND_HO_CHIEU, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('DATEOFISSUE_TITLE_BGN'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_CAP, docXml, tmpTransContentNode);

	//Phần thông tin cũ
	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
	createXMLNode('key', CONST_STR.get('POSITION_TITLE_BGN'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.VI_TRI_CU, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
	createXMLNode('key', CONST_STR.get('EMAIL_TITLE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.EMAIL_CU, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
	createXMLNode('key', CONST_STR.get('SET_USER_PHONE_NUMBER'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.SDT_CU, docXml, tmpTransContentNode);
	//--------------------

	tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
	tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('CONST_SETUP_QUERY_CHANGED_INFO'), docXml, tmpXmlNodeInfo);

	//Phần thông tin mới
	if (transaction.VI_TRI_CU != transaction.VI_TRI_MOI) {
		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
		createXMLNode('key', CONST_STR.get('POSITION_TITLE_BGN'), docXml, tmpTransContentNode);
		createXMLNode('value', transaction.VI_TRI_MOI, docXml, tmpTransContentNode);
	}

	if (transaction.EMAIL_CU != transaction.EMAIL_MOI) {
		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
		createXMLNode('key', CONST_STR.get('EMAIL_TITLE'), docXml, tmpTransContentNode);
		createXMLNode('value', transaction.EMAIL_MOI, docXml, tmpTransContentNode);
	}

	if (transaction.SDT_CU != transaction.SDT_MOI) {
		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('isCombobox', 'true', docXml, tmpTransContentNode);
		createXMLNode('key', CONST_STR.get('SET_USER_PHONE_NUMBER'), docXml, tmpTransContentNode);
		createXMLNode('value', transaction.SDT_MOI, docXml, tmpTransContentNode);
	}
	//--------------------

	return docXml;
}

function genDetailChangePassword(transaction) {
	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);
	
	var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
		
	var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('COM_IDTXN_' + transaction.LOAI_GD), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.MA_GD, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_THUC_HIEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_DUYET, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_STATUS'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + transaction.TRANG_THAI), docXml, tmpTransContentNode);

	return docXml;
}

function genDetailChangeSendMethod(transaction) {
	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);
	
	var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);

	var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('COM_IDTXN_' + transaction.LOAI_GD), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.MA_GD, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_THUC_HIEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_DUYET, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_STATUS'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + transaction.TRANG_THAI), docXml, tmpTransContentNode);

	tmpXmlNodeInfo = createXMLNode('sendMethod', '', docXml, tmpXmlRootNode);
	tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('COM_METHOD_CHOOSE_AUTHORIZE'), docXml, tmpXmlNodeInfo);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isSelected', (transaction.KIEU_SEND_MOI == "0") ? "true" : "false", docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('SET_SEND_CHOOSE_NO_SEND'), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isSelected', (transaction.KIEU_SEND_MOI == "1") ? "true" : "false", docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('SET_SEND_CHOOSE_SEND_EMAIL'), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isSelected', (transaction.KIEU_SEND_MOI == "2") ? "true" : "false", docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('SET_SEND_CHOOSE_SEND_SMS'), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('isSelected', (transaction.KIEU_SEND_MOI == "3") ? "true" : "false", docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('SET_SEND_CHOOSE_SEND_ALL'), docXml, tmpTransContentNode);

	return docXml;
}

function genDetailChangeAuthMethod(transaction) {
	gSetUp.transType = "S14";

	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);
	
	var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
		
	var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('COM_IDTXN_' + transaction.LOAI_GD), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.MA_GD, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_THUC_HIEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_DUYET, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_STATUS'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + transaction.TRANG_THAI), docXml, tmpTransContentNode);

	if (transaction.TRANG_THAI == "REJ" && transaction.LY_DO_TU_CHOI && transaction.LY_DO_TU_CHOI != null && transaction.LY_DO_TU_CHOI.trim() != "") {
		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('AUTHORIZE_TXT_REASON'), docXml, tmpTransContentNode);
		createXMLNode('value', transaction.LY_DO_TU_CHOI, docXml, tmpTransContentNode);
	}

	tmpXmlNodeInfo = createXMLNode('transinfo2', '', docXml, tmpXmlRootNode);
	tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('COM_METHOD_ARE_USED'), docXml, tmpXmlNodeInfo);	
	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('value', CONST_STR.get('COM_TOKEN_' + transaction.KIEU_XAC_THUC_CU), docXml, tmpTransContentNode);

	tmpXmlNodeInfo = createXMLNode('transinfo2', '', docXml, tmpXmlRootNode);
	tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('CONST_SETUP_QUERY_TIT_AUTH_METHOD_NEW'), docXml, tmpXmlNodeInfo);	
	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('value', CONST_STR.get('COM_TOKEN_' + transaction.KIEU_XAC_THUC_MOI), docXml, tmpTransContentNode);

	return docXml;
}

function genDetailChangeTransLimit(data) {
	gSetUp.transType = "S15";

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

    var transaction = data.results[0];

	var docXml = createXMLDoc();
	var rootNode = createXMLNode("review", "", docXml);

	var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, rootNode);
		
	var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get('COM_IDTXN_' + transaction.LOAI_GD), docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.MA_GD, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_THUC_HIEN, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
	createXMLNode('value', transaction.NGAY_DUYET, docXml, tmpTransContentNode);

	tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
	createXMLNode('key', CONST_STR.get('COM_STATUS'), docXml, tmpTransContentNode);
	createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + transaction.TRANG_THAI), docXml, tmpTransContentNode);

	if (transaction.TRANG_THAI == "REJ" && transaction.LY_DO_TU_CHOI && transaction.LY_DO_TU_CHOI != null && transaction.LY_DO_TU_CHOI.trim() != "") {
		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('AUTHORIZE_TXT_REASON'), docXml, tmpTransContentNode);
		createXMLNode('value', transaction.LY_DO_TU_CHOI, docXml, tmpTransContentNode);
	}

	var rowsNode = createXMLNode("services", "", docXml, rootNode);

	var rowNode = createXMLNode("service", "", docXml, rowsNode);
	createXMLNode("name", CONST_STR.get('COM_ACCOUNT'), docXml, rowNode);
	createXMLNode("old-limit-time", formatCurrency2(parseInt(GACCOService.HAN_MUC_LAN_MAX)), docXml, rowNode);
	createXMLNode("old-limit-day", formatCurrency2(parseInt(GACCOService.HAN_MUC_NGAY_MAX)), docXml, rowNode);
	createXMLNode("new-limit-time", formatCurrency2(parseInt(transaction.NEW_GACCO_ONE)), docXml, rowNode);
	createXMLNode("new-limit-day", formatCurrency2(parseInt(transaction.NEW_GACCO_DAY)), docXml, rowNode);

	rowNode = createXMLNode("service", "", docXml, rowsNode);
	createXMLNode("name", CONST_STR.get('CONST_TRANS_LIMIT_TIT_SERVICE_GTRAN'), docXml, rowNode);
	createXMLNode("old-limit-time", formatCurrency2(parseInt(GTRANService.HAN_MUC_LAN_MAX)), docXml, rowNode);
	createXMLNode("old-limit-day", formatCurrency2(parseInt(GTRANService.HAN_MUC_NGAY_MAX)), docXml, rowNode);
	createXMLNode("new-limit-time", formatCurrency2(parseInt(transaction.NEW_GTRAN_ONE)), docXml, rowNode);
	createXMLNode("new-limit-day", formatCurrency2(parseInt(transaction.NEW_GTRAN_DAY)), docXml, rowNode);

	rowNode = createXMLNode("service", "", docXml, rowsNode);
	createXMLNode("name", CONST_STR.get('COM_PAY_SERVICE'), docXml, rowNode);
	createXMLNode("old-limit-time", formatCurrency2(parseInt(GPAYSService.HAN_MUC_LAN_MAX)), docXml, rowNode);
	createXMLNode("old-limit-day", formatCurrency2(parseInt(GPAYSService.HAN_MUC_NGAY_MAX)), docXml, rowNode);
	createXMLNode("new-limit-time", formatCurrency2(parseInt(transaction.NEW_GPAYS_ONE)), docXml, rowNode);
	createXMLNode("new-limit-day", formatCurrency2(parseInt(transaction.NEW_GPAYS_DAY)), docXml, rowNode);

	rowNode = createXMLNode("service", "", docXml, rowsNode);
	createXMLNode("name", CONST_STR.get('CONST_TRANS_LIMIT_TIT_SERVICE_GPAYI'), docXml, rowNode);
	createXMLNode("old-limit-time", formatCurrency2(parseInt(GPAYIService.HAN_MUC_LAN_MAX)), docXml, rowNode);
	createXMLNode("old-limit-day", formatCurrency2(parseInt(GPAYIService.HAN_MUC_NGAY_MAX)), docXml, rowNode);
	createXMLNode("new-limit-time", formatCurrency2(parseInt(transaction.NEW_GPAYI_ONE)), docXml, rowNode);
	createXMLNode("new-limit-day", formatCurrency2(parseInt(transaction.NEW_GPAYI_DAY)), docXml, rowNode);

	return docXml;
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
