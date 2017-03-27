/**
 * Created by NguyenTDK
 * User: 
 * Date: 13/10/15
 * Time: 1:30 PM
 */

var sequenceId;

gCredit.rowsPerPage = 10;

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('Search guarantee init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back search debt');
}

/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {	
	logInfo('Search guarantee load success');
	// Load for datetime picker
	createDatePicker('trans.releaseStartdate', 'span.releaseStartdate');
	createDatePicker('trans.releaseEnddate', 'span.releaseEnddate');
	createDatePicker('trans.deadlineStartdate', 'span.deadlineStartdate');
	createDatePicker('trans.deadlineEnddate', 'span.deadlineEnddate');
	
	COST_TYPE_GUARANTEE = [CONST_STR.get('COM_ALL'),
	                       CONST_STR.get('GUA_GROUP_LOAD'),
	                       CONST_STR.get('GUA_GROUP_CONTRACT'),
	                       CONST_STR.get('GUA_GROUP_PAYMENT'),
	                       CONST_STR.get('GUA_GROUP_CONSIGNEE'),
	                       CONST_STR.get('GUA_GROUP_BID'),
	                       CONST_STR.get('GUA_GROUP_AD_PAYMENT'),
	                       CONST_STR.get('GUA_GROUP_OTHER')];
	COST_TYPE_GUARANTEE_VALUE = ['BLVV,BLVD,BLTH,BLHD,BLTT,BLTD,SG00,SGUT,BLDT,BLDD,BLTU,BLKH,BLKD',
	                             'BLVV,BLVD', 
	                             'BLTH,BLHD', 
	                             'BLTT,BLTD', 
	                             'SG00,SGUT', 
	                             'BLDT,BLDD', 
	                             'BLTU', 
	                             'BLKH,BLKD'];
	
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('Search guarantee will unload');
}

/*** Start Liên quan item chọn loại bảo lãnh***/
function showTypeGuarantee() {
	var tmpArray1 = COST_TYPE_GUARANTEE;
	var tmpArray2 = COST_TYPE_GUARANTEE_VALUE;
	document.addEventListener("evtSelectionDialog", handleInputTypeGuarantee, false);
	document.addEventListener("evtSelectionDialogClose", handleInputTypeGuaranteeClose, false);
	showDialogList(CONST_STR.get('CRE_TYPE_GUA_POPUP_TITLE'), tmpArray1, tmpArray2, false);
}

function handleInputTypeGuarantee(e) {
	if (currentPage == "corp/credit/guarantee/cre_guarantee_info") {
		document.removeEventListener("evtSelectionDialog", handleInputTypeGuarantee, false);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById('cre_type_guarantee').value = e.selectedValue1;
			document.getElementById('cre_type_guarantee_value').value = e.selectedValue2;
		}
	}
}

function handleInputTypeGuaranteeClose() {
	if (currentPage == "corp/credit/guarantee/cre_guarantee_info") {
		document.removeEventListener("evtSelectionDialogClose", handleInputTypeGuaranteeClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputTypeGuarantee, false);
	}
}
/*** End Liên quan item chọn loại bảo lãnh***/

/*** Start Liên quan item chọn loại tiền***/
function showTypeMoney() {
	var tmpArray1 = (gUserInfo.lang == 'EN')? CONST_TYPE_MONEY_EN: CONST_TYPE_MONEY_VN;
	var tmpArray2 = CONST_TYPE_MONEY_VALUE;
	document.addEventListener("evtSelectionDialog", handleInputTypeMoney, false);
	document.addEventListener("evtSelectionDialogClose", handleInputTypeMoneyClose, false);
	showDialogList(CONST_STR.get('CRE_TYPE_MONEY_POPUP_TITLE'), tmpArray1, tmpArray2, false);
}

function handleInputTypeMoney(e) {
	if (currentPage == "corp/credit/guarantee/cre_guarantee_info") {
		document.removeEventListener("evtSelectionDialog", handleInputTypeMoney, false);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById('cre_type_money').value = e.selectedValue1;
			document.getElementById('cre_type_money_value').value = e.selectedValue2;
		}
	}
}

function handleInputTypeMoneyClose() {
	if (currentPage == "corp/credit/cre_search_info") {
		document.removeEventListener("evtSelectionDialogClose", handleInputTypeMoneyClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputTypeMoney, false);
	}
}
/*** End Liên quan item chọn loại tiền***/

// Thực hiện tìm kiếm
function creGuaranteeSearchInfo(){
	var msgValidate = new Array();
	
	// Ngay nhan no[tu ngay]
	if(!guaCheckFormatDate(document.getElementById("trans.releaseStartdate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	// Ngay nhan no[den ngay]
	if(!guaCheckFormatDate(document.getElementById("trans.releaseEnddate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	var fromDate = document.getElementById("trans.releaseStartdate").value;
	var endDate = document.getElementById("trans.releaseEnddate").value;
	var diffDays = getDiffDaysBetween(fromDate, endDate, "dd/MM/yyyy");
	if (diffDays < 0) {
		msgValidate.push(CONST_STR.get("ACC_HIS_INVALID_QUERY_DATE"));
	}
	
	// Ngay dao han[tu ngay]
	if(!guaCheckFormatDate(document.getElementById("trans.deadlineStartdate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	// Ngay dao han[den ngay]
	if(!guaCheckFormatDate(document.getElementById("trans.deadlineEnddate").value)){
		msgValidate.push(CONST_STR.get('CORP_MSG_ACC_TIME_SEARCH_NOT_VALID'));
	}
	
	fromDate = document.getElementById("trans.deadlineStartdate").value;
	endDate = document.getElementById("trans.deadlineEnddate").value;
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
			idtxn: "C01",
			releaseStartDate : (document.getElementById('trans.releaseStartdate').value == 'dd/mm/yyyy') ? '' : document.getElementById('trans.releaseStartdate').value,
			releaseEndDate : (document.getElementById('trans.releaseEnddate').value == 'dd/mm/yyyy') ? '' : document.getElementById('trans.releaseEnddate').value,
			deadlineStartDate : (document.getElementById('trans.deadlineStartdate').value == 'dd/mm/yyyy') ? '' : document.getElementById('trans.deadlineStartdate').value,
			deadlineEndDate : (document.getElementById('trans.deadlineEnddate').value == 'dd/mm/yyyy') ? '' : document.getElementById('trans.deadlineEnddate').value,
			typeMoney : document.getElementById('cre_type_money_value').value,
			typeGuarantee : document.getElementById('cre_type_guarantee_value').value
	    }));
		
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_CREDIT_GUARANTEE_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
	    data = getDataFromGprsCmd(gprsCmd);
	    
	    // gọi service và xử lí logic
	    requestMBServiceCorp(data, true, 0, function(data) {
	        var response = JSON.parse(data);
	        if (response.respCode == RESP.get('COM_SUCCESS') 
	        		&& response.responseType == CONSTANTS.get('CMD_CO_CREDIT_GUARANTEE_INFO')) {
	        	mainContentScroll.refresh();
	    		
	        	gCredit.results = response.respJsonObj.resultSearch;
	        	if(gCredit.results.length == 0){
	        		document.getElementById("tblContent").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
	        		document.getElementById("pageIndicatorNums").innerHTML = '';
	        	}else{
	        		gCredit.totalPages = getTotalPages(response.respJsonObj.resultSearch.length);
	            	var dataPerPage = [];
	            	for (var i = 0; i < gCredit.rowsPerPage; i++) {
	            		var dataRow = gCredit.results[i];
	            		if (typeof dataRow != "undefined") {
	            			for(var j = 1; j < COST_TYPE_GUARANTEE_VALUE.length; j++){
	            				if(COST_TYPE_GUARANTEE_VALUE[j].indexOf(dataRow.GUARANTEE_TYPE) != -1){
	            					dataRow.GUARANTEE_TYPE = COST_TYPE_GUARANTEE[j];
	            				}
		            		}
	            			
	            			dataPerPage.push(dataRow);
	            		}
	            	}
	        		
	            	navCachedPages["corp/credit/guarantee/cre_guarantee_info_tbl"] = null;
	        		getDataTblToDiv(dataPerPage, "corp/credit/guarantee/cre_guarantee_info_tbl", "tblContent");
	        		
	        		genPagging(gCredit.totalPages, 1);
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
	    });
	}
}

// Thực hiện chuyển sang màn hình detail
function detailGuarantee(guarantee_no, guarantee_type, guarantee_amount, guarantee_receiver, 
		release_date, deadline_date, seri_no, status, guarantee_content){
	// Chuyen du lieu vao bien toan cuc
	gCredit.guaranteeNo = guarantee_no;
	gCredit.guaranteeType = guarantee_type;
	gCredit.guaranteeAmount = guarantee_amount;
	gCredit.guaranteeReceiver = guarantee_receiver;
	gCredit.releaseDate = release_date;
	gCredit.deadlineDate = deadline_date;
	gCredit.seriNo = seri_no;
	gCredit.status = status;
	gCredit.guaranteeContent = guarantee_content;
	
	// goto screen
	updateAccountListInfo(); 
	navController.pushToView('corp/credit/guarantee/cre_guarantee_info_dtl', true, 'xsl');
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

	var dataPerPage = [];
	var tmp = (selectedIdx - 1) * gCredit.rowsPerPage;
	for (var i = tmp; i < tmp + gCredit.rowsPerPage; i++) {
		var dataRow = gCredit.results[i];
		if (typeof dataRow != "undefined") {
			for(var j = 1; j < COST_TYPE_GUARANTEE_VALUE.length; j++){
				if(COST_TYPE_GUARANTEE_VALUE[j].indexOf(dataRow.GUARANTEE_TYPE) != -1){
					dataRow.GUARANTEE_TYPE = COST_TYPE_GUARANTEE[j];
				}
    		}
			
			dataPerPage.push(dataRow);
		}
	}
	
	navCachedPages["corp/credit/guarantee/cre_guarantee_info_tbl"] = null;
	getDataTblToDiv(dataPerPage, "corp/credit/guarantee/cre_guarantee_info_tbl", "tblContent", tmp);	
	genPagging(gCredit.totalPages, selectedIdx);
}

//check format tai cac truong nhap thoi gian
function guaCheckFormatDate(dataCheck){
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