/**
 * Created by NguyenTDK
 * User: 
 * Date: 12/10/15
 * Time: 8:00 PM
 */

gCredit.rowsPerPage = 10;

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('Search debt init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back search debt')
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('Search debt load success');
	// Load for datetime picker
	createDatePicker('trans.debtStartdate', 'span.debtStartdate');
	createDatePicker('trans.debtEnddate', 'span.debtEnddate');
	createDatePicker('trans.expireStartdate', 'span.expireStartdate');
	createDatePicker('trans.expireEnddate', 'span.expireEnddate');
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('Search debt will unload');
}

//get data from database
function creDebtSearchInfo(){
	var msgValidate = new Array();
	
	// Ngay nhan no[tu ngay]
	if(!debtCheckFormatDate(document.getElementById("trans.debtStartdate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	// Ngay nhan no[den ngay]
	if(!debtCheckFormatDate(document.getElementById("trans.debtEnddate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	var fromDate = document.getElementById("trans.debtStartdate").value;
	var endDate = document.getElementById("trans.debtEnddate").value;
	var diffDays = getDiffDaysBetween(fromDate, endDate, "dd/MM/yyyy");
	if (diffDays < 0) {
		msgValidate.push(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
	}
	
	// Ngay dao han[tu ngay]
	if(!debtCheckFormatDate(document.getElementById("trans.expireStartdate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	// Ngay dao han[den ngay]
	if(!debtCheckFormatDate(document.getElementById("trans.expireEnddate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	fromDate = document.getElementById("trans.expireStartdate").value;
	endDate = document.getElementById("trans.expireEnddate").value;
	diffDays = getDiffDaysBetween(fromDate, endDate, "dd/MM/yyyy");
	if (diffDays < 0) {
		msgValidate.push(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
	}
	
	if(msgValidate.length > 0){
		showAlertText(msgValidate[0]);
	}else{
		// Set dữ liệu trước khi gọi service
		var argsArray = [];
		argsArray.push("2");
		argsArray.push(JSON.stringify({
			idtxn : "C00",
			typeDebt : document.getElementById("cre_debt_type_value").value,
			debtStartdate : (document.getElementById("trans.debtStartdate").value == 'dd/mm/yyyy')? '' : document.getElementById("trans.debtStartdate").value,
			debtEnddate : (document.getElementById("trans.debtEnddate").value == 'dd/mm/yyyy') ? '' : document.getElementById("trans.debtEnddate").value,
			expireStartdate : (document.getElementById("trans.expireStartdate").value == 'dd/mm/yyyy') ? '' : document.getElementById("trans.expireStartdate").value,
			expireEnddate : (document.getElementById("trans.expireEnddate").value == 'dd/mm/yyyy') ? '' : document.getElementById("trans.expireEnddate").value,
			typeMoney : document.getElementById("cre_type_money_value").value,
			typeDeadline : document.getElementById("cre_type_deadline_value").value
	    }));
		
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_CREDIT_DEBT_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
	    data = getDataFromGprsCmd(gprsCmd);
	    
	    // gọi service và xử lí logic
	    requestMBServiceCorp(data, true, 0, function(data) {
	        var response = JSON.parse(data);
	        creCallServiceSuccess(response);
	    });
	}
}

// Xử lí dữ liệu khi gọi service thành công
function creCallServiceSuccess(response){
	if (response.respCode == RESP.get('COM_SUCCESS') 
    		&& response.responseType == CONSTANTS.get('CMD_CO_CREDIT_DEBT_INFO')) {
		
    	mainContentScroll.refresh();

    	gCredit.results = response.respJsonObj.rows;
    	if(gCredit.results.length == 0){
    		document.getElementById("tblContent").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
    	}else{
    		gCredit.totalPages = getTotalPages(gCredit.results.length);
    		
    		var l_xml_doc = genXMLListTrans(gCredit.results, 1);
    		var l_xsl_doc = getCachePageXsl("corp/credit/debt/cre_search_info_tbl");
    		
    		genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr){
    			document.getElementById("tblContent").innerHTML = oStr;
    			genPagging(gCredit.totalPages, 1);
    		});
    	}
	}else{
		if(gprsResp.respCode == '1019'){
			showAlertText(gprsResp.respContent);
		}else{
			showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
		}
		var tmpPageName = navController.getDefaultPage();
		var tmpPageType = navController.getDefaultPageType();
		navController.initWithRootView(tmpPageName, true, tmpPageType);
	}
}

function genXMLListTrans(pJson, idx) {
	var l_doc_xml = createXMLDoc(); 
	var l_node_root = createXMLNode('resptable','', l_doc_xml);
	var l_node_child;
	var l_node_infor;
	var l_arr = pJson;

	var startIdx = (idx - 1) * gCredit.rowsPerPage;
	var endIdx = startIdx + gCredit.rowsPerPage;

	for(var i = startIdx; i < endIdx; i++) {
		if (typeof l_arr[i] != 'undefined') {
			l_node_infor = createXMLNode('tabletdetail','',l_doc_xml, l_node_root);
			l_node_child = createXMLNode('no', i + 1, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('indenture_no',l_arr[i].INDENTURE_NO , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('debt_name',l_arr[i].DEBT_NAME , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('disbursement_money',l_arr[i].DISBURSEMENT_MONEY, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('interest',l_arr[i].INTEREST , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('debt_date',l_arr[i].DEBT_DATE , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('expire_date',l_arr[i].EXPIRE_DATE, l_doc_xml, l_node_infor);
			
			l_node_child = createXMLNode('expire_near_date',l_arr[i].EXPIRE_NEAR_DATE, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('root_money',l_arr[i].ROOT_MONEY, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('interest_money',l_arr[i].INTEREST_MONEY, l_doc_xml, l_node_infor);
		}
	}
	
	return l_doc_xml;
}
/*** End liên quan việc send request lên server***/

/*** Start Liên quan item chọn loại vay***/
function showTypeDebt() {
	var tmpArray1 = (gUserInfo.lang == 'EN')? CONST_TYPE_DEBT_EN: CONST_TYPE_DEBT_VN;
	var tmpArray2 = CONST_TYPE_DEBT_VALUE;
	document.addEventListener("evtSelectionDialog", handleInputTypeDebt, false);
	document.addEventListener("evtSelectionDialogClose", handleInputTypeDebtClose, false);
	showDialogList(CONST_STR.get('CRE_TYPE_DEBT_POPUP_TITLE'), tmpArray1, tmpArray2, false);
}

function handleInputTypeDebt(e) {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialog", handleInputTypeDebt, false);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			if(e.selectedValue2 != 1){
				document.getElementById('cre_debt_type').value = e.selectedValue1;
				document.getElementById('cre_debt_type_value').value = e.selectedValue2;
			}else{
				// chuyển đến màn hình thấu chi
				updateAccountListInfo(); 
				navController.pushToView('corp/credit/debt/cre_overdraft', true, 'xsl');
			}
		}
	}
}

function handleInputTypeDebtClose() {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialogClose", handleInputTypeDebtClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputTypeDebt, false);
	}
}
/*** End Liên quan item chọn loại vay***/

/*** Start Liên quan item chọn loại tiền***/
function showTypeMoney() {
	var tmpArray1 = (gUserInfo.lang == 'EN')? CONST_TYPE_MONEY_EN: CONST_TYPE_MONEY_VN;
	var tmpArray2 = CONST_TYPE_MONEY_VALUE;
	document.addEventListener("evtSelectionDialog", handleInputTypeMoney, false);
	document.addEventListener("evtSelectionDialogClose", handleInputTypeMoneyClose, false);
	showDialogList(CONST_STR.get('CRE_TYPE_MONEY_POPUP_TITLE'), tmpArray1, tmpArray2, false);
}

function handleInputTypeMoney(e) {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialog", handleInputTypeMoney, false);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById('cre_type_money').value = e.selectedValue1;
			document.getElementById('cre_type_money_value').value = e.selectedValue2;
		}
	}
}

function handleInputTypeMoneyClose() {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialogClose", handleInputTypeMoneyClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputTypeMoney, false);
	}
}
/*** End Liên quan item chọn loại tiền***/

/*** Start Liên quan item chọn thời hạn***/
function showTypeDeadline() {
	var tmpArray1 = (gUserInfo.lang == 'EN')? CONST_TYPE_DEADLINE_EN: CONST_TYPE_DEADLINE_VN;
	var tmpArray2 = CONST_TYPE_DEADLINE_VALUE;
	document.addEventListener("evtSelectionDialog", handleInputTypeDeadline, false);
	document.addEventListener("evtSelectionDialogClose", handleInputTypeDeadlineClose, false);
	showDialogList(CONST_STR.get('CRE_TYPE_DEADLINE_POPUP_TITLE'), tmpArray1, tmpArray2, false);
}

function handleInputTypeDeadline(e) {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialog", handleInputTypeDeadline, false);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById('cre_type_deadline').value = e.selectedValue1;
			document.getElementById('cre_type_deadline_value').value = e.selectedValue2;
		}
	}
}

function handleInputTypeDeadlineClose() {
	if (currentPage == "corp/credit/debt/cre_search_info") {
		document.removeEventListener("evtSelectionDialogClose", handleInputTypeDeadlineClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputTypeDeadline, false);
	}
}
/*** End Liên quan item chọn thời hạn***/

// Thực hiện chuyển sang màn hình detail
function detailDebt(indenture_no, debt_name, disbursement_money, interest,
		            debt_date, expire_date, expire_near_date, root_money, interest_money){
	// Chuyen du lieu vao bien toan cuc
	gCredit.indentureNo = indenture_no;
	gCredit.debtName = debt_name;
	gCredit.disbursementMoney = disbursement_money;
	gCredit.interest = interest;
	gCredit.debtDate = debt_date;
	gCredit.expireDate = expire_date;
	gCredit.expireNearDate = expire_near_date;
	gCredit.rootMoney = root_money;
	gCredit.interestMoney = interest_money;
	
	// goto screen
	updateAccountListInfo(); 
	navController.pushToView('corp/credit/debt/cre_search_info_dtl', true, 'xsl');
}

function getTotalPages(totalRows) {
	return totalRows % gCredit.rowsPerPage == 0 ? Math.floor(totalRows / gCredit.rowsPerPage) : Math.floor(totalRows / gCredit.rowsPerPage) + 1;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	nodepage.innerHTML = tmpStr;
}

function pageIndicatorSelected(selectedIdx, selectedPage) { 
	document.getElementById('tblContent').innerHTML = "";
	document.getElementById('pageIndicatorNums').innerHTML = "";

	var xmlData = genXMLListTrans(gCredit.results, selectedIdx);
	var docXsl = getCachePageXsl("corp/credit/debt/cre_search_info_tbl");

	genHTMLStringWithXML(xmlData, docXsl, function(html){
		var tmpNode = document.getElementById('tblContent');
		tmpNode.innerHTML = html;
		genPagging(gCredit.totalPages, selectedIdx);
	});
}

// check format tai cac truong nhap thoi gian
function debtCheckFormatDate(dataCheck){
	var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
	if(dataCheck == '' || dataCheck == 'dd/mm/yyyy'){
		return true;
	}else{
		if(!dataCheck.match(re)){
			return false;
		}else{
			return true;
		}
	}
}