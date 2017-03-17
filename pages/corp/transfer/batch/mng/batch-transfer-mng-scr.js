gTrans.idtxn = "T01";

gTrans.pageSize = 10;
gTrans.pageIdx;

gTrans.results;
gTrans.curTrans;

gTrans.tmpSearchInfo;
gTrans.searchInfo;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function returnInputPage() {
	navController.initWithRootView('corp/transfer/batch/make/batch-transfer-create', true);
}

function viewDidLoadSuccess() {
	createDatePicker('id.begindate', 'span.begindate');					
	createDatePicker('id.enddate', 'span.enddate');

	if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
		var element = document.getElementById("tr.tab");
		element.parentNode.removeChild(element);
	}

	if (!gTrans.isBack) {
		gTrans.pageIdx = 1;
		gTrans.tmpSearchInfo = {};
		gTrans.searchInfo = {
			transType : "",
			maker : "",
			status : "",
			transId : "",
			fromDate : "",
			endDate : ""
		};

		// Lay du lieu khoi tao man hinh
		loadInitData();		
	}

	gTrans.isBack = false;									
}

// Lay du lieu khoi tao man hinh
function loadInitData() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gTrans.idtxn;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_BATCH_SALARY_MANAGER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0, function(data) {
		var resp = JSON.parse(data);
		if (resp.respCode == 0 && resp.respJsonObj.listMakers.length > 0) {
			//Danh sach nguoi duyet
			gTrans.listMakers = resp.respJsonObj.listMakers;
		} else 
			gotoHomePage();
	}, function(){
		gotoHomePage();
	});
}

//--0. common
function addEventListenerToCombobox(selectHandle, closeHandle) {
	document.addEventListener("evtSelectionDialog", selectHandle, false);
	document.addEventListener("evtSelectionDialogClose", closeHandle, false);
}

function removeEventListenerToCombobox(selectHandle, closeHandle) {
	document.removeEventListener("evtSelectionDialog", selectHandle, false);
	document.removeEventListener("evtSelectionDialogClose", closeHandle, false);
}
//--END 0

//--1. Xử lý chọn loại giao dịch
function showTransTypeSelection()
{
	var cbxValues = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_TRANS_TYPE_EN: BATCH_SALARY_MNG_TRANS_TYPE_VN;
	var cbxKeys = BATCH_SALARY_MNG_TRANS_TYPE_KEY;

	// Check xem user co quyen tra luong khong
    if (gUserInfo.userRole.indexOf("CorpSal") == -1 && gUserInfo.userRole.indexOf("CorpAuth") == -1) {
        cbxValues.splice(1, 1);
        cbxKeys.splice(1, 1);
    }

	addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, cbxKeys, false);
}

function handleSelectTransType(e) {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	gTrans.searchInfo.transType = e.selectedValue2;
	document.getElementById('id.trans-type').value = e.selectedValue1;
}

function handleCloseTransTypeCbx() {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
}
//--END 1

//--2. Xử lý chọn trạng thái
function showTransStatusSelection() {
	var cbxValues = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN: BATCH_SALARY_MNG_LIST_STATUS_VN;
	addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, BATCH_SALARY_MNG_LIST_STATUS_KEY, false);
}

function handleSelectdTransStatus(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	gTrans.searchInfo.status = e.selectedValue2;
	document.getElementById("id.status").value = e.selectedValue1;
}

function handleCloseTransStatusCbx(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
}
//--END 2

//--3. Xử lý chọn người lập
function showMakers(){
	var cbxText = [];
	var cbxValues = [];
	cbxText.push(CONST_STR.get("COM_ALL"));
	cbxValues.push("");
	for (var i in gTrans.listMakers) {
		var userId = gTrans.listMakers[i].IDUSER;
		cbxText.push(userId);
		cbxValues.push(userId);
	}
	addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
}

function handleSelectMaker(e){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	gTrans.searchInfo.maker = e.selectedValue2;
	document.getElementById('id.maker').value = e.selectedValue1;
}
function handleCloseMakerCbx(){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
}
//--END 3

// Thuc hien khi an nut tim kiem
function searchTransaction() {
	gTrans.searchInfo.fromDate = document.getElementById("id.begindate").value;
	gTrans.searchInfo.endDate = document.getElementById("id.enddate").value;
	gTrans.pageIdx = 1;

	gTrans.tmpSearchInfo = JSON.parse(JSON.stringify(gTrans.searchInfo)); //Clone object
	sendJSONRequest(gTrans.searchInfo);
}

//--4. Gửi thông tin tìm kiếm
function sendJSONRequest(searchInfo){
	document.getElementById('id.searchResult').innerHTML = "";
	document.getElementById('pageIndicatorNums').innerHTML = "";

	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.idtxn = gTrans.idtxn;
	
	jsonData.transType = searchInfo.transType;
	jsonData.status = searchInfo.status;
	jsonData.maker = searchInfo.maker;
	jsonData.fromDate = searchInfo.fromDate;
	jsonData.endDate = searchInfo.endDate;

	jsonData.pageSize = gTrans.pageSize;
	jsonData.pageIdx = gTrans.pageIdx;

	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_BATCH_SALARY_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, function() {
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
	});
}

function requestMBServiceSuccess(e){
	var resp = JSON.parse(e);
	var tmpNode = document.getElementById('id.searchResult');
	
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		gTrans.results = resp.respJsonObj;

		var xmlData = genXmlResultTable();
		var docXsl = getCachePageXsl("corp/transfer/batch/mng/batch-transfer-mng-result-tbl");

		genHTMLStringWithXML(xmlData, docXsl, function(html){
			tmpNode.innerHTML = html;
			genPagging(getTotalPages(parseInt(resp.respJsonObj[0].TOTAL_ROW)), gTrans.pageIdx);
		});

	} else 
		tmpNode.innerHTML = "<h5>" + CONST_STR.get("CORP_MSG_COM_NO_DATA_FOUND") + "</h5>";
};
//--END 4

function genXmlResultTable() {
	var docXml = createXMLDoc();

	var rootNode = createXMLNode('result','',docXml);
	var childNodeTitle = createXMLNode('title','',docXml, rootNode);
	var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('COM_TOTAL_NUM_AMOUNT'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_APPROVE_STATUS'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_TRANSACTION_STATUS'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle7', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);
	
	for (var i = 0; i < gTrans.results.length; i++) {
		var obj = gTrans.results[i];
		var childNodeCont = createXMLNode('content','',docXml,rootNode);
		var stt = (gTrans.pageIdx - 1) * gTrans.pageSize + i + 1;
		var childNodeDeta = createXMLNode('acccontent1', stt, docXml,childNodeCont);
		createXMLNode('acctitle1', CONST_STR.get("COM_NO"), docXml, childNodeCont);
		childNodeDeta = createXMLNode('acccontent2', obj.NGAY_LAP, docXml,childNodeCont);
		createXMLNode('acctitle2', CONST_STR.get("COM_CREATED_DATE"), docXml, childNodeCont);
		childNodeDeta = createXMLNode('acccontent3', formatNumberToCurrency(obj.SO_TIEN) + " VND", docXml,childNodeCont);
		createXMLNode('acctitle3', CONST_STR.get("COM_TOTAL_NUM_AMOUNT"), docXml, childNodeCont);
		childNodeDeta = createXMLNode('acccontent4', CONST_STR.get('TRANS_STATUS_' + obj.TRANG_THAI), docXml,childNodeCont);
		createXMLNode('acctitle4', CONST_STR.get("COM_APPROVE_STATUS"), docXml, childNodeCont);
		childNodeDeta = createXMLNode('acccontent5', obj.NGUOI_DUYET, docXml,childNodeCont);
		createXMLNode('acctitle5', CONST_STR.get("COM_CHEKER"), docXml, childNodeCont);

		/*if (obj.TRANG_THAI_GD) {
			var transStt = obj.TRANG_THAI_GD.split(",");
			var numTrans = transStt.length;
			var numSuccess = 0;
			var numFail = 0;
			var numPending = 0;
			var numReject = 0;
			var numInit = 0;
			
			for (var j in transStt) {
				var stt = transStt[j];
				if (stt == "INT")
					numInit++;
				if (stt == "ABH")
					numSuccess++;
				if (stt == "RBH")
					numFail++;
				if (stt == "STH")
					numPending++;
				if (stt == "REJ")
					numReject++;
			}

			if (numPending > 0)
				transStt = "STH";
			else if (numTrans == numSuccess)
				transStt = "ABH";
			else if (numTrans == numInit)
				transStt = "INT";
			else if (numTrans == numFail)
				transStt = "RBH";
			else if (numTrans == numReject)
				transStt = "REJ";
			else
				transStt = "APT";

			childNodeDeta = createXMLNode('acccontent6', CONST_STR.get('TRANS_STATUS_' + transStt), docXml,childNodeCont);
			createXMLNode('acctitle6', CONST_STR.get("COM_TRANSACTION_STATUS"), docXml, childNodeCont);
		}
		*/
		createXMLNode('acctitle6', CONST_STR.get("COM_TRANSACTION_STATUS"), docXml, childNodeCont);
		if (obj.TRANG_THAI_GD) {
			createXMLNode('acccontent6', CONST_STR.get("COM_TRANS_STATUS_" + obj.TRANG_THAI_GD), docXml, childNodeCont);
		} else {
			createXMLNode('acccontent6', '', docXml, childNodeCont);
		}

		createXMLNode('acctitle7', CONST_STR.get("COM_TRANS_CODE"), docXml, childNodeCont);
		childNodeDeta = createXMLNode('clickHandle', 'showDetailTransaction(' + i + ');', docXml,childNodeCont);
		childNodeDeta = createXMLNode('transId', obj.MA_GD, docXml,childNodeCont);
	};

	return docXml;
}

function getTotalPages(totalRows) {
	return totalRows % gTrans.pageSize == 0 ? Math.floor(totalRows / gTrans.pageSize) : Math.floor(totalRows / gTrans.pageSize) + 1;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	nodepage.innerHTML = tmpStr;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
	gTrans.pageIdx = selectedIdx;
	sendJSONRequest(gTrans.tmpSearchInfo);
}
//--END 5

//Quay lại trang nhập
function showinputpage(){
	navController.initWithRootView('corp/transfer/batch/batch-transfer-create');
}

//--6. Xử lý khi ấn vào mã giao dịch
function showDetailTransaction(idx) {
	gTrans.curTrans = gTrans.results[idx];

	var jsonData = new Object();
	jsonData.sequence_id = "3";
	jsonData.idtxn = gTrans.idtxn;
	
	jsonData.transId = gTrans.curTrans.MA_GD;
	jsonData.transType = gTrans.curTrans.IDTXN;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_BATCH_SALARY_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, getDetailTransSuccess, function(){
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
	});
}

function getDetailTransSuccess(data) {
	var resp = JSON.parse(data);

	if (resp.respCode == 0) {
		var docXml = createXMLDoc();
		var tmpXmlRootNode = createXMLNode('review', '', docXml);
		
		var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
		var tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('COM_TRANS_DETAILS'), docXml, tmpXmlNodeInfo);
			
		var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpTransContentNode);
		createXMLNode('value', gTrans.curTrans.MA_GD, docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpTransContentNode);
		createXMLNode('value', gTrans.curTrans.NGAY_LAP, docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpTransContentNode);
		createXMLNode('value', gTrans.curTrans.NGAY_DUYET, docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('COM_APPROVE_STATUS'), docXml, tmpTransContentNode);
		createXMLNode('value', CONST_STR.get('TRANS_STATUS_' + gTrans.curTrans.TRANG_THAI), docXml, tmpTransContentNode);

		if (gTrans.curTrans.LY_DO_TU_CHOI && gTrans.curTrans.LY_DO_TU_CHOI != null) {
			tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
			createXMLNode('key', CONST_STR.get('AUTHORIZE_UNABLE_TO_CHECK'), docXml, tmpTransContentNode);
			createXMLNode('value', gTrans.curTrans.LY_DO_TU_CHOI, docXml, tmpTransContentNode);
		}

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('BATCH_SALARY_NUMB_OF_RECEIVER'), docXml, tmpTransContentNode);
		createXMLNode('value', resp.respJsonObj.length, docXml, tmpTransContentNode);

		var numbOfSuccess = 0;
		var totalTransSuccess = 0;
		var fee = 0;
		for (var i in resp.respJsonObj) {
			var trans = resp.respJsonObj[i];
			if(trans.SO_TIEN != null)
					totalTransSuccess += parseInt(trans.SO_TIEN);
			if(trans.PHI != null)	
				fee += parseInt(trans.PHI);
			if (trans.TRANG_THAI == 'ABH') {
				numbOfSuccess++;				
			}
		}

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('BATCH_SALARY_NUMB_OF_RECEIVER_SUCCESS'), docXml, tmpTransContentNode);
		createXMLNode('value', numbOfSuccess, docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, tmpTransContentNode);
		createXMLNode('value', gTrans.curTrans.TK_CHUYEN, docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('TOTAL_AMOUNT_TRANS_SUCCESS'), docXml, tmpTransContentNode);
		createXMLNode('value', formatNumberToCurrency(totalTransSuccess) + " VND", docXml, tmpTransContentNode);

		tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
		createXMLNode('key', CONST_STR.get('TRANSFER_LIST_TOTAL_FEE'), docXml, tmpTransContentNode);
		createXMLNode('value', formatNumberToCurrency(fee) + " VND", docXml, tmpTransContentNode);	
		
		resp.transInfo = gTrans.curTrans;
		setRespObjStore(resp);
		setReviewXmlStore(docXml);
		
		navCachedPages["corp/transfer/batch/mng/batch-transfer-trans-detail"] = null;
		navController.pushToView("corp/transfer/batch/mng/batch-transfer-trans-detail", true, 'xsl');
	} else
		showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));

}
//--END 6

/**
 * Gui request xuat excel
 * @author TrungVQ.FPT
 * @date   2015-12-29
 * @return void
 */
function sendRequestExportExcel() {
	var request = {
		sequenceId: 10,
		idtxn: gTrans.idtxn,
		transType: gTrans.searchInfo.transType,
		status: gTrans.searchInfo.status,
		maker: gTrans.searchInfo.maker,
		fromDate: gTrans.searchInfo.fromDate,
		endDate: gTrans.searchInfo.endDate
	};

	var args = ["", request];

	var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);

	corpExportExcel(data);
}