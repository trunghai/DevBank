gTrans.idtxn = "B62";

gTrans.rowsPerPage = 10;
gTrans.totalPages;
gTrans.curPage;
gTrans.results;

gTrans.makers;
gTrans.limit;

var searchInfo;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewDidLoadSuccess() {
	createDatePicker('id.begindate', 'span.begindate');					
	createDatePicker('id.enddate', 'span.enddate');

	gCorp.limit = undefined;

	if (!gTrans.isBack) {
		searchInfo = {
			maker : "",
			status : "",
			fromDate : "",
			endDate : ""
		};

		gTrans.totalPages = 0;
		gTrans.curPage = 1;

		loadInitData();
	}

	gTrans.isBack = false;
	
	setTimeout(function () {
       document.getElementById("btn_search").click();
    }, 1100);
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

function loadInitData() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gTrans.idtxn;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTH_FOREIGN_EXCHANGE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0, function(data) {
		var resp = JSON.parse(data);
		gTrans.objJSON = resp;
		if (resp.respCode === '0' && resp.respJsonObj.makers.length > 0 && resp.respJsonObj.limit) {
			gTrans.makers = resp.respJsonObj.makers;
			gTrans.limit = resp.respJsonObj.limit;
		} else {
			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
			gotoHomePage();
		}
	}, function() {
		showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
		gotoHomePage();
	});
}

//--2. Xử lý chọn trạng thái
function showTransStatusSelection() {
	var cbxValues = (gUserInfo.lang == 'EN')? INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_EN: INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_VN;
	addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_KEY, false);
}

function handleSelectdTransStatus(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	searchInfo.status = e.selectedValue2;
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
	for (var i in gTrans.makers) {
		var userId = gTrans.makers[i].IDUSER;
		cbxText.push(userId);
		cbxValues.push(userId);
	}
	addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
}

function handleSelectMaker(e){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	searchInfo.maker = e.selectedValue2;
	document.getElementById('id.maker').value = e.selectedValue1;
}
function handleCloseMakerCbx(){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
}
//--END 3

//--4. Gửi thông tin tìm kiếm
function sendJSONRequest(){
	document.getElementById('id.searchResult').innerHTML = "";

	searchInfo.fromDate = document.getElementById("id.begindate").value;
	searchInfo.endDate = document.getElementById("id.enddate").value;

	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.idtxn = gTrans.idtxn;

	jsonData.status = searchInfo.status;
	jsonData.maker = searchInfo.maker;
	jsonData.fromDate = searchInfo.fromDate;
	jsonData.endDate = searchInfo.endDate;

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_AUTH_FOREIGN_EXCHANGE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, requestMBServiceFail);
}

function requestMBServiceSuccess(e){
	var resp = JSON.parse(e);
	
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		gTrans.results = resp.respJsonObj;
		gTrans.totalPages = getTotalPages(gTrans.results.length);

		var xmlData = genXmlData(1);
		var docXsl = getCachePageXsl("corp/authorize/exchange/auth-foreign-exchange-tbl");

		genHTMLStringWithXML(xmlData, docXsl, function(html){
			var tmpNode = document.getElementById('id.searchResult');
			tmpNode.innerHTML = html;
			genPagging(gTrans.totalPages, 1);
		});

	} else {
		document.getElementById("id.searchResult").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
	} 
};

function requestMBServiceFail(e){
	showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
};
//--END 4

//--5. Gen giao diện kết quả va phân trang
function getTotalPages(totalRows) {
	return totalRows % gTrans.rowsPerPage == 0 ? Math.floor(totalRows / gTrans.rowsPerPage) : Math.floor(totalRows / gTrans.rowsPerPage) + 1;
}


function genXmlData(idx) {
	var docXml = createXMLDoc();

	var rootNode = createXMLNode('result','',docXml);
	var childNodeTitle = createXMLNode('title','',docXml, rootNode);
	var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('FOREGIN_SELL_ACCOUNT'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_AMOUNT'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('FOREGIN_TOTAL_EXCHANGE'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle7', CONST_STR.get('COM_STATUS'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle8', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);
	
	var startIdx = (idx - 1) * gTrans.rowsPerPage;
	var endIdx = startIdx + gTrans.rowsPerPage;
	var stt = startIdx + 1;
	var idx = 0;
	for (var i = startIdx; i < endIdx; i++) {
		var obj = gTrans.results[i];
		if (typeof obj !== "undefined") {
			var childNodeCont = createXMLNode('content','',docXml,rootNode)
			createXMLNode('title1', CONST_STR.get('COM_NO'), docXml,childNodeCont);
			createXMLNode('acccontent1', stt++, docXml,childNodeCont);
			createXMLNode('title2', CONST_STR.get('COM_CREATED_DATE'), docXml,childNodeCont);
			createXMLNode('acccontent2', obj.NGAY_LAP, docXml,childNodeCont);
			createXMLNode('title3', CONST_STR.get('FOREGIN_SELL_ACCOUNT'), docXml,childNodeCont);
			createXMLNode('acccontent3', obj.TK_CHUYEN, docXml,childNodeCont);
			createXMLNode('title4', CONST_STR.get('COM_AMOUNT'), docXml,childNodeCont);
			createXMLNode('acccontent4', CurrencyFormattedNew(obj.SO_LUONG) + " " + obj.DV_TIEN, docXml,childNodeCont);
			createXMLNode('title5', CONST_STR.get('FOREGIN_TOTAL_EXCHANGE'), docXml,childNodeCont);
			createXMLNode('acccontent5', CurrencyFormattedNew(obj.TONG_TIEN_QUY_DOI) + "  VND", docXml,childNodeCont);
			createXMLNode('title6', CONST_STR.get('COM_CHEKER'), docXml,childNodeCont);
			createXMLNode('acccontent6', obj.NGUOI_DUYET, docXml,childNodeCont);
			createXMLNode('title7', CONST_STR.get('COM_STATUS'), docXml,childNodeCont);
			createXMLNode('acccontent7', CONST_STR.get('COM_TRANS_STATUS_' + obj.TRANG_THAI), docXml,childNodeCont);
			createXMLNode('title8', CONST_STR.get('COM_TRANS_CODE'), docXml,childNodeCont);
			createXMLNode('idx', idx++, docXml,childNodeCont);
			createXMLNode('transId', obj.MA_GD, docXml,childNodeCont);
		}
	};

	return docXml;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	gTrans.curPage = pageIdx;
	nodepage.innerHTML = tmpStr;
}

function pageIndicatorSelected(selectedIdx, selectedPage) { 
	document.getElementById('id.searchResult').innerHTML = "";

	var xmlData = genXmlData(selectedIdx);
	var docXsl = getCachePageXsl("corp/authorize/exchange/auth-foreign-exchange-tbl");

	genHTMLStringWithXML(xmlData, docXsl, function(html){
		var tmpNode = document.getElementById('id.searchResult');
		tmpNode.innerHTML = html;
		genPagging(gTrans.totalPages, selectedIdx);
	});
}
//--END 5

//--6. Xử lý khi ấn vào mã giao dịch
function showDetailTransaction(idx) {
	gTrans.curTrans = gTrans.results[idx];

	var docXml = genReviewXML(gTrans.curTrans);

	var transIds = [];
	transIds.push(gTrans.curTrans.MA_GD);

	var rejRequest = {
        sequence_id: "3",
        idtxn : gTrans.idtxn,
        transIds : transIds.toString(),
    };

    var authRequest = {
        sequence_id: "4",
        idtxn : gTrans.idtxn,
        transIds : transIds.toString(),
    };

    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTH_FOREIGN_EXCHANGE");
    gCorp.requests = [authRequest, rejRequest];
    gCorp.limit = gTrans.limit;

	gCorp.totalAmount = gTrans.curTrans.SO_LUONG*gTrans.curTrans.TY_GIA;
	gCorp.numBalance = gTrans.curTrans.SO_DU_KHA_DUNG;

	gCorp.isAuthScreen = true;
    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');

}


function genReviewXML(transInfo) {
	var docXml = createXMLDoc();
    var rootNode;

    rootNode = createXMLNode('review', '', docXml);

    /* Thông tin chung */
    var sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('AUTHORIZE_LIST_TRANS_WAITING_FOR_AUTH'), docXml, sectionNode);

    // Ma giao dich
    var rowNode = createXMLNode('row', '', docXml, sectionNode);
    var labelNode = createXMLNode('label', CONST_STR.get('COM_TRANS_CODE'), docXml, rowNode);
    var valueNode = createXMLNode('value', transInfo.MA_GD, docXml, rowNode);

    // Ngay thuc hien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_STATUS'), docXml, rowNode);
    valueNode = createXMLNode('value', CONST_STR.get('COM_TRANS_STATUS_' + transInfo.TRANG_THAI), docXml, rowNode);

    /* Thong tin chi tiet */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

    // tai khoan chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('FOREGIN_ACCOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TK_CHUYEN, docXml, rowNode);

    // so du kha dung
    var soDuTkChuyen = parseFloat(transInfo.SO_DU_TK_CHUYEN);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', CurrencyFormattedNew(soDuTkChuyen) + " " + transInfo.DV_TIEN , docXml, rowNode);

    // chi nhanh
    if (transInfo.CHI_NHANH_TK_CHUYEN) {
    	rowNode = createXMLNode('row', '', docXml, sectionNode);
    	labelNode = createXMLNode('label', CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), docXml, rowNode);
    	valueNode = createXMLNode('value', transInfo.CHI_NHANH_TK_CHUYEN, docXml, rowNode);
    }
    
    // tai khoan nhan
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TK_DICH, docXml, rowNode);

    // so du kha dung
    var soDuTkDich = parseFloat(transInfo.SO_DU_TK_DICH);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', CurrencyFormattedNew(soDuTkDich) + " VND", docXml, rowNode);

    // chi nhanh
    if (transInfo.CHI_NHANH_TK_DICH) {
    	rowNode = createXMLNode('row', '', docXml, sectionNode);
    	labelNode = createXMLNode('label', CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), docXml, rowNode);
    	valueNode = createXMLNode('value', transInfo.CHI_NHANH_TK_DICH, docXml, rowNode);
    }
    
    // so tien
    var soTien = parseFloat(transInfo.SO_LUONG);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('FOREGIN_SELL_NUMBER'), docXml, rowNode);
    valueNode = createXMLNode('value', formatCurrentWithSysbol(soTien,"") + " " + transInfo.DV_TIEN, docXml, rowNode);
    
    var tiGia = parseFloat(transInfo.TY_GIA);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('FOREGIN_RATE'), docXml, rowNode);
    valueNode = createXMLNode('value', CurrencyFormattedNew(tiGia) + " VND", docXml, rowNode);
 
    var tongTienQuyDoi = parseFloat(transInfo.TONG_TIEN_QUY_DOI);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('FOREGIN_TOTAL_RECEIVER_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', CurrencyFormattedNew(tongTienQuyDoi) + " VND", docXml, rowNode);


    // Gen button cho màn hình review
    // Nut huy
    var buttonNode = createXMLNode('button', '', docXml, rootNode);
    var typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('COM_BACK'), docXml, buttonNode);

	var inputNode = createXMLNode("input", CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_TIT_REASON'), docXml, rootNode);

    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('COM_REJ'), docXml, buttonNode);

    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('AUTHORIZE_BTN_AUTHEN'), docXml, buttonNode);

    return docXml;
    
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
//--END 6

function transSelectedChange(e) {
	if (e.name == "true") {
		var checkboxes = document.getElementsByClassName("trans.checkbox");
		var i;
		for (i = 0; i < checkboxes.length; i++) {
		    checkboxes[i].checked = true;
		}
		e.name = "false";
	} else {
		var checkboxes = document.getElementsByClassName("trans.checkbox");
		var i;
		for (i = 0; i < checkboxes.length; i++) {
		    checkboxes[i].checked = false;
		}
		e.name = "true";
	}
}

function authorizeTransaction() {
	var checkboxes = document.getElementsByClassName("trans.checkbox");
	var i;
	listSelectedTrans = [];
	for (i = 0; i < checkboxes.length; i++) {
	    if (checkboxes[i].checked == true) {
	    	listSelectedTrans.push(gTrans.results[(gTrans.curPage - 1) * gTrans.rowsPerPage + parseInt(checkboxes[i].name)]);
	    }
	}

	if (listSelectedTrans.length == 0) {
		showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
		return;
	}

	var docXml = genReviewTableXML("authorize");

	var transIds = [];
	var transSummaryArr = [];
	var totalAmount = 0;
	var totalAmountCurrency = 0;
	var totalBalance = 0;
	var accDich = "";
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		transIds.push(tran.MA_GD);
		
		//Tinh gia tri de check so tien chuyen hop le
		var isExist = false;
		for (var j in transSummaryArr) {
			var tmpTran = transSummaryArr[j];
			if (tmpTran.account == tran.TK_CHUYEN) {
				tmpTran.totalAmount += parseInt(tran.SO_LUONG);
				isExist = true;
			}
		}
		if (!isExist) {
			var tmpTran = {
				account : tran.TK_CHUYEN,
				totalAmount : parseInt(tran.SO_LUONG),
				numBalance : parseInt(tran.SO_DU_TK_CHUYEN)
			}
			transSummaryArr.push(tmpTran);
		}
		//-------

		totalAmount += parseInt(tran.SO_LUONG);
		totalBalance += parseInt(tran.SO_DU_TK_CHUYEN);
		totalAmountCurrency += parseInt(tran.SO_LUONG) * parseInt(tran.TY_GIA);
		accDich = tran.TK_DICH;
	}

	var request = {
        sequence_id: "4",
        idtxn : gTrans.idtxn,
        transIds : transIds.toString()
    };
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTH_FOREIGN_EXCHANGE");
    gCorp.requests = [request, null];
    gCorp.limit = gTrans.limit;

    // gCorp.totalAmount = totalAmount;
    //gCorp.numBalance = totalBalance;
    //gCorp.transSummaryArr = transSummaryArr;
	gCorp.totalAmount = totalAmountCurrency;

    gCorp.isAuthScreen = true;
    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function rejectTransaction() {
	var reason = document.getElementById("id.reason-rej").value;
	if (!reason) {
		showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
		return;
	}

	var checkboxes = document.getElementsByClassName("trans.checkbox");
	var i;
	listSelectedTrans = [];
	for (i = 0; i < checkboxes.length; i++) {
	    if (checkboxes[i].checked == true) {
	    	listSelectedTrans.push(gTrans.results[(gTrans.curPage - 1) * gTrans.rowsPerPage + parseInt(checkboxes[i].name)]);
	    }
	}

	if (listSelectedTrans.length == 0) {
		showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
		return;
	}

	var docXml = genReviewTableXML("reject");

	var transIds = [];
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		transIds.push(tran.MA_GD);
	}

	var request = {
        sequence_id: "3",
        idtxn : gTrans.idtxn,
        rejectReason: reason,
        transIds : transIds.toString(),
    };
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AUTH_FOREIGN_EXCHANGE");
    gCorp.requests = [null, request];
    gCorp.isAuthScreen = true;

    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function genReviewTableXML(action) {
	var xmlDoc = createXMLDoc();
    var rootNode;
    rootNode = createXMLNode('review', '', xmlDoc);

    var sectionNode = createXMLNode('section', '', xmlDoc, rootNode);

    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
    createXMLNode("th", CONST_STR.get('COM_NO'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('FOREGIN_ACCOUNT'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_AMOUNT'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_CHEKER'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, theadNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
    
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
		var tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
		createXMLNode("title", CONST_STR.get('COM_NO'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.NGAY_LAP, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.TK_CHUYEN, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('FOREGIN_ACCOUNT'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.TK_DICH, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", CurrencyFormattedNew(tran.SO_LUONG) + " " + tran.DV_TIEN, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_AMOUNT'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.NGUOI_DUYET, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_CHEKER'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", '', xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, tdNode);
	    createXMLNode("onclick", "showReviewDetailTransaction(" + i + ")",
            xmlDoc, tdNode);
	    createXMLNode("value", tran.MA_GD, xmlDoc, tdNode);
	}

	var buttonNode = createXMLNode('button', '', xmlDoc, rootNode);
    var typeNode = createXMLNode('type', 'back', xmlDoc, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('COM_BACK'), xmlDoc, buttonNode);

    buttonNode = createXMLNode('button', '', xmlDoc, rootNode);

    if (action == "reject") {
    	var reasonElement = document.getElementById("id.reason-rej");
    	sectionNode = createXMLNode('section', '', xmlDoc, rootNode);
    	createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, xmlDoc, sectionNode);

    	typeNode = createXMLNode('type', 'reject', xmlDoc, buttonNode);
	    btnLabelNode = createXMLNode('label', CONST_STR.get('SEQ_CONFIRM_TITLE'), xmlDoc, buttonNode);
    }

    if (action == "authorize") {
    	typeNode = createXMLNode('type', 'authorize', xmlDoc, buttonNode);
	    btnLabelNode = createXMLNode('label', CONST_STR.get('SEQ_CONFIRM_TITLE'), xmlDoc, buttonNode);
    }

    return xmlDoc;
}

//send du lieu len de xuat file excel
function sendRequestExportExcel() {	
	searchInfo.fromDate = document.getElementById("id.begindate").value;
	searchInfo.endDate = document.getElementById("id.enddate").value;
	
    var arrayClientInfo = new Array();
    arrayClientInfo.push(null);
    arrayClientInfo.push({
    	sequenceId : "16",
    	transType : "T11",
    	codeStatus: searchInfo.status,
    	maker:searchInfo.maker,
    	fromDate:searchInfo.fromDate,
    	endDate:searchInfo.endDate
    });

    var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

    data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}

// Khi click vao ma gd o man hinh review
function showReviewDetailTransaction(idx) {
	var curTrans = gTrans.results[idx];

	var docXml = genReviewXML(curTrans);

    gCorp.detailXML = docXml;

    navCachedPages["corp/common/detail/com-detail"] = null;
    navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
}

// xuat file excel
/*

function sendRequestExportExcel() {
  var transIds = "";
  var jsonObj = gTrans.objJSON;
  for (var i in jsonObj) {
    transIds += jsonObj[i].IDFCATREF + ",";
  }
  var arrayClientInfo = new Array();
  arrayClientInfo.push(null);
  arrayClientInfo.push({
    sequenceId: "5",
    transType: "B13",
    transIds: transIds
  });

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);

  corpExportExcel(data);
}*/