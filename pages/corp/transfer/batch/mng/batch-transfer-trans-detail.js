gTrans.idtxn = "T01";

var storedObj;
var gprsCmd;
var storedXML;
var transInfo;

gTrans.results2;
gTrans.rowsPerPage = 10;
gTrans.totalPages;
gTrans.currentPage;

function returnInputPage() {
	navController.initWithRootView('corp/transfer/batch/make/batch-transfer-create', true);
}

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function loadInitXML() {
	storedXML = getReviewXmlStore();
	return storedXML;
}

function viewDidLoadSuccess() {

	if(gUserInfo.userRole.indexOf('CorpInput') == -1){
		document.getElementById("tr.tab").innerHTML = "";
	}

	if (!gTrans.isBack) {
		storedObj = getRespObjStore();
		transInfo = storedObj.transInfo;

		gTrans.results2 = storedObj.respJsonObj;
		gTrans.totalPages = getTotalPages(gTrans.results2.length);
		genTableReview(1);

		if (transInfo.TRANG_THAI == 'INT' && gUserInfo.userRole.indexOf('CorpInput') != -1) {
			document.getElementById('btnNext').style.display = "";
		}
	}

	gTrans.isBack = false;
}

function btnBackClick() {
	navController.popView(true);
}

function btnNextClick() {
	var xmlDoc = genXMLReviewSrc();
	var req = {
		sequence_id : "4",
		idtxn : gTrans.idtxn,
		transId : transInfo.MA_GD
	};
	gCorp.cmdType = CONSTANTS.get('CMD_BATCH_SALARY_MANAGER');
    gCorp.requests = [null, req];
    setReviewXmlStore(xmlDoc);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function genXMLReviewSrc() {
	var xmlDoc = createXMLDoc();

    var rootNode = createXMLNode("review", "", xmlDoc);
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, rowNode);
    createXMLNode("value", transInfo.MA_GD, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('BATCH_SALARY_PROCESSED_DATE'), xmlDoc, rowNode);
    createXMLNode("value", transInfo.NGAY_LAP, xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('TRANS_ACCOUNT_INFO_BLOCK_TITLE'), xmlDoc, sectionNode);

    var tmpArr = (gUserInfo.lang == 'EN') ? BATCH_SALARY_MNG_TRANS_TYPE_EN : BATCH_SALARY_MNG_TRANS_TYPE_VN;
    var transType = tmpArr[BATCH_SALARY_MNG_TRANS_TYPE_KEY.indexOf(transInfo.IDTXN)];
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TOPUP_TRANS_TYPE_TITLE'), xmlDoc, rowNode);
    createXMLNode("value", transType, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('VIEW_TRANS_DETAIL_ACC'), xmlDoc, rowNode);
    createXMLNode("value", transInfo.TK_CHUYEN, xmlDoc, rowNode);

	var totalMoney = 0;
	var totalFee = 0;
	for (var i in storedObj.respJsonObj) {
		totalMoney += parseInt(storedObj.respJsonObj[i].SO_TIEN);
		totalFee += parseInt(storedObj.respJsonObj[i].PHI);
	}

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TRANSFER_LIST_TOTAL_AMOUNT'), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(totalMoney) + " VND", xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TRANSFER_LIST_TOTAL_FEE'), xmlDoc, rowNode);
    createXMLNode("value", formatNumberToCurrency(totalFee) + " VND", xmlDoc, rowNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("paging", "", xmlDoc, sectionNode);
    createXMLNode("title", CONST_STR.get('CRP_SUM_DETAIL_TRANS'), xmlDoc, sectionNode);

    if (transInfo.IDTXN == 'T16') {
    	 var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
	    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
	    createXMLNode("th", CONST_STR.get('COM_NO'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_DESCRIPTION'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_AMOUNT'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, theadNode);

	    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
	    
	    var listTran = storedObj.respJsonObj;
		for(var i in listTran) {
			var tran = listTran[i];
			var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
			var tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
			createXMLNode("title", CONST_STR.get('COM_NO'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.NGUOI_NHAN, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.MO_TA, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_DESCRIPTION'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", formatNumberToCurrency(tran.SO_TIEN) + " VND", xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_AMOUNT'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.TK_NHAN, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, tdNode);
		}
    }

    if (transInfo.IDTXN == 'T17') {
    	 var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
	    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
	    createXMLNode("th", CONST_STR.get('COM_NO'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_DESCRIPTION'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_AMOUNT'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_RECEIVER_BANK_NAME'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), xmlDoc, theadNode);
	    createXMLNode("th", CONST_STR.get('COM_BANK_CODE'), xmlDoc, theadNode);

	    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
	    
	    var listTran = storedObj.respJsonObj;
		for(var i in listTran) {
			var tran = listTran[i];
			var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
			var tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
			createXMLNode("title", CONST_STR.get('COM_NO'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.NGUOI_NHAN, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.MO_TA, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_DESCRIPTION'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", formatNumberToCurrency(tran.SO_TIEN) + " VND", xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_AMOUNT'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.TK_NHAN, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.TEN_NGAN_HANG, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_RECEIVER_BANK_NAME'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.TEN_CHI_NHANH, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), xmlDoc, tdNode);
		    tdNode = createXMLNode("td", tran.MA_NGAN_HANG, xmlDoc, trNode);
		    createXMLNode("title", CONST_STR.get('COM_BANK_CODE'), xmlDoc, tdNode);
		}

    }
   
    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "cancel", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_CANCEL"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_BACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "reject", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("COM_TERMINATE_TRANS"), xmlDoc, buttonNode);

    return xmlDoc;
}

function getTotalPages(totalRows) {
	return totalRows % gTrans.rowsPerPage == 0 ? Math.floor(totalRows / gTrans.rowsPerPage) : Math.floor(totalRows / gTrans.rowsPerPage) + 1;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	nodepage.innerHTML = tmpStr;
}

function genTableReview(curPage) {
	document.getElementById("table-detail").innerHTML = "";
	document.getElementById("pageIndicatorNums").innerHTML = "";
	gTrans.currentPage = curPage;

	var docXml;
	if (transInfo.IDTXN == "T16") {
		docXml = genT16Table(gTrans.currentPage);
	}
	if (transInfo.IDTXN == "T17") {
		docXml = genT17Table(gTrans.currentPage);
	}

	var docXsl = getCachePageXsl("corp/transfer/batch/mng/batch-transfer-trans-detail-tbl");

	genHTMLStringWithXML(docXml, docXsl, function(html){
		document.getElementById("table-detail").innerHTML = html;
		genPagging(gTrans.totalPages, gTrans.currentPage);
	});
}

function genT16Table(curPage) {
	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);

	var titles = createXMLNode('titles', '', docXml, tmpXmlRootNode);
	createXMLNode('table-title', CONST_STR.get('COM_NO'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_RECEIVE_NAME'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_DESCRIPTION'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_AMOUNT'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_STATUS'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_TRANS_CODE'), docXml, titles);

	var rows = createXMLNode('rows', '', docXml, tmpXmlRootNode);

	var idx = (curPage - 1) * gTrans.rowsPerPage;
	for(var i = idx; i < idx + gTrans.rowsPerPage; i++) {
		var tran = gTrans.results2[i];
		if (tran) {
			var row = createXMLNode('row', '', docXml, rows);
			var tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_NO'), docXml, tableContent);
			createXMLNode('content', parseInt(i) + 1, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_RECEIVE_NAME'), docXml, tableContent);
			createXMLNode('content', tran.NGUOI_NHAN, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_DESCRIPTION'), docXml, tableContent);
			createXMLNode('content', tran.MO_TA, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_AMOUNT'), docXml, tableContent);
			createXMLNode('content', formatNumberToCurrency(tran.SO_TIEN) + " VND", docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, tableContent);
			createXMLNode('content', tran.TK_NHAN, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_STATUS'), docXml, tableContent);
			createXMLNode('content', CONST_STR.get('TRANS_STATUS_' + tran.TRANG_THAI), docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_TRANS_CODE'), docXml, tableContent);
			createXMLNode('content', tran.MA_GD, docXml, tableContent);
		}
	}

	return docXml;
}

function genT17Table(curPage) {
	var docXml = createXMLDoc();
	var tmpXmlRootNode = createXMLNode('review', '', docXml);

	var titles = createXMLNode('titles', '', docXml, tmpXmlRootNode);
	createXMLNode('table-title', CONST_STR.get('COM_NO'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_RECEIVE_NAME'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_DESCRIPTION'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_AMOUNT'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_RECEIVER_BANK_NAME'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_BANK_CODE'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_STATUS'), docXml, titles);
	createXMLNode('table-title', CONST_STR.get('COM_TRANS_CODE'), docXml, titles);

	var rows = createXMLNode('rows', '', docXml, tmpXmlRootNode);

	var idx = (curPage - 1) * gTrans.rowsPerPage;
	for(var i = idx; i < idx + gTrans.rowsPerPage; i++) {
		var tran = gTrans.results2[i];
		if (tran) {
			var row = createXMLNode('row', '', docXml, rows);
			var tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_NO'), docXml, tableContent);
			createXMLNode('content', parseInt(i) + 1, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_RECEIVE_NAME'), docXml, tableContent);
			createXMLNode('content', tran.NGUOI_NHAN, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_DESCRIPTION'), docXml, tableContent);
			createXMLNode('content', tran.MO_TA, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_AMOUNT'), docXml, tableContent);
			createXMLNode('content', formatNumberToCurrency(tran.SO_TIEN) + " VND", docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, tableContent);
			createXMLNode('content', tran.TK_NHAN, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_RECEIVER_BANK_NAME'), docXml, tableContent);
			createXMLNode('content', tran.TEN_NGAN_HANG, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('BATCH_SALARY_MNG_TIT_BRANCH_NAME'), docXml, tableContent);
			createXMLNode('content', tran.TEN_CHI_NHANH, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_BANK_CODE'), docXml, tableContent);
			createXMLNode('content', tran.MA_NGAN_HANG, docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_STATUS'), docXml, tableContent);
			createXMLNode('content', CONST_STR.get('TRANS_STATUS_' + tran.TRANG_THAI), docXml, tableContent);

			tableContent = createXMLNode('table-content', '', docXml, row);
			createXMLNode('title', CONST_STR.get('COM_TRANS_CODE'), docXml, tableContent);
			createXMLNode('content', tran.MA_GD, docXml, tableContent);
		}
	}

	return docXml;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
	 genTableReview(selectedIdx);
}