/**
 * Created by NguyenTDK
 * User: 
 * Date: 05/10/15
 * Time: 8:00 PM
 */

var sequenceId;

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('send info user approve init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back send info user approve');
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('Send info user approve load success');
	// get data from database
	sequenceId = '1';
	var l_obj = new Object();	
	l_obj.idtxn = "A14";
	l_obj.sequenceId = '1';
	
	sendRequest(l_obj);
	
	// gen sequence form
	genSequenceForm();	
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('Send info user approve will unload');
}

function exeTrans(){
	var idDestAccount = document.getElementById("id.accountno").value;
	var amoutPhongToa = gAccount.accSoPhongToa.replace(/\,/g,'');
	var strEmptyReason = gAccount.accLyDoPhongToa.substring((gAccount.accLyDoPhongToa.length-3), gAccount.accLyDoPhongToa.length);
	if (strEmptyReason == ' , ') {
		strEmptyReason = gAccount.accLyDoPhongToa.substring(0, (gAccount.accLyDoPhongToa.length-3));
	}else 
	{
		strEmptyReason = gAccount.accLyDoPhongToa;
	}
	if(idDestAccount == ''
		|| idDestAccount == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')){
		showAlertText(CONST_STR.get('CORP_MSG_COM_INVALID_ACCOUNT_NUMBER'));
	}else if(amoutPhongToa > 0){
		showAlertText(CONST_STR.get('CORP_MSG_FINALIZE_BLOG_ACC'));
	}else{
		gCorp.rootView = "corp/account/list_info/acc_list_account_info";
		
		sequenceId = '2';
		
		var l_obj = new Object();
		l_obj.idtxn = "A14";
		l_obj.sequenceId = '2';
		l_obj.idSourceAccount = gAccount.accNumber;
		l_obj.idDestAccount = idDestAccount;
		l_obj.amount = gAccount.accAmount;
		l_obj.typeMoney = gAccount.accTypeMoney;
		
		sendRequest(l_obj);
	}
}

//Set data to page
function setDataToScreen(){
	// Set data to page
	if(gAccount.accType == 'Y'){
		document.getElementById("dtlType").innerHTML = CONST_STR.get('ACCOUNT_PERIOD_ONLINE');
	}else{
		document.getElementById("dtlType").innerHTML = CONST_STR.get('ACCOUNT_PERIOD_COUNTER');
	}
	
	document.getElementById("dtlTypeMoney").innerHTML = gAccount.accNumber;
	document.getElementById("dtlAmount").innerHTML = gAccount.accAmount + ' VND';
	if(gAccount.accTenorDays != '0'){
		document.getElementById("dtlPeriod").innerHTML = gAccount.accTenorDays + " ";
		document.getElementById("dtlPeriodDay").style.display = "inline";
	}else if(gAccount.accTenorMonths != '0'){
		document.getElementById("dtlPeriod").innerHTML = gAccount.accTenorMonths + " ";
		document.getElementById("dtlPeriodMonth").style.display = "inline";
	}else if(gAccount.accTenorYears != '0'){
		document.getElementById("dtlPeriod").innerHTML = gAccount.accTenorYears + " ";
		document.getElementById("dtlPeriodYear").style.display = "inline";
	}
	document.getElementById("dtlInterestRate").innerHTML = gAccount.accInterestRate;

	if (gAccount.accProfitsInterim.trim() == '-') {
		document.getElementById("dtlProfitsInterim").innerHTML = gAccount.accProfitsInterim;
	} else {
		document.getElementById("dtlProfitsInterim").innerHTML = gAccount.accProfitsInterim + ' ' + gAccount.accTypeMoney;
	}	
	document.getElementById("dtlDateStart").innerHTML = gAccount.accDateStart;
	document.getElementById("dtlAmountBlock").innerHTML = gAccount.accSoPhongToa + ' VND';
	document.getElementById("dtlDateEnd").innerHTML = gAccount.accDateEnd;
	var strEmptyReason = gAccount.accLyDoPhongToa.substring((gAccount.accLyDoPhongToa.length-3), gAccount.accLyDoPhongToa.length);
	if (strEmptyReason == ' , ') {
		strEmptyReason = gAccount.accLyDoPhongToa.substring(0, (gAccount.accLyDoPhongToa.length-3));
	}else 
	{
		strEmptyReason = gAccount.accLyDoPhongToa;
	}
	document.getElementById("dtlReasonBlock").innerHTML = strEmptyReason;
}

//gen sequence form
function genSequenceForm() {
	//get sequence form xsl
	var tmpXslDoc = getCachePageXsl("sequenceform");
	//create xml
	var tmpStepNo = 301;
	setSequenceFormIdx(tmpStepNo);
	var docXml = createXMLDoc();	
	var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
	var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
	//gen html string
	genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr){
		var tmpNode = document.getElementById('seqFormLocal');
		if(tmpNode != null){
			tmpNode.innerHTML = oStr;
		}
	});
}

// Gọi đến màn hình "Danh sach người nhận thông báo"
function showBankName(){
	updateAccountListInfo(); 
	navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}

// Hiển thị ra drop down list của phần [Tài khoản nhận tiền]
function showAccountSelection() {
	var tmpArray1 = [];
	var tmpArray2 = [];
	for (var i = 0; i < gUserInfo.accountList.length; i++) {
		var tmpAcc = gUserInfo.accountList[i];
		if(tmpAcc.noReceive == 'N'){
			tmpArray1.push(tmpAcc.accountNumber);
			tmpArray2.push(formatNumberToCurrency(tmpAcc.balanceAvailable) + ' VND');
		}
	}

	document.addEventListener("evtSelectionDialog", handleSelectionAccountList, false);
	document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);

	showDialogList(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), tmpArray1, tmpArray2, true);
}

//event: selection dialog list
function handleSelectionAccountList(e) {
	if (currentPage == "corp/account/finalize/acc_finalize") {
		handleSelectionAccountListClose();
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById("id.accountno").value = e.selectedValue1;
		}
	}
}

function handleSelectionAccountListClose(e) {
	if (currentPage == "corp/account/finalize/acc_finalize") {
		document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
		document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);
	}
}

//Thực hiện việc gọi lên server
function sendRequest(l_obj){
	var l_data = {};
	var l_arrayArgs = new Array();
	
	var l_json = JSON.stringify(l_obj);
	
	l_arrayArgs.push(sequenceId);
	l_arrayArgs.push(l_json);
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push(""); 
	
	var l_gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_ACC_FINALIZE"), "", "", gUserInfo.lang, gUserInfo.sessionID, l_arrayArgs);
	l_gprsCmd.raw = '';
	l_data = getDataFromGprsCmd(l_gprsCmd);
	
	requestMBServiceCorp(l_data, true, 0, requestAccListAccountSuccess, requestAccListAccountFail);	
}

//Lấy dữ liệu được trả về từ service đẩy lên trang
function requestAccListAccountSuccess(e){
	gprsResp = JSON.parse(e);
	
	if (gprsResp.respCode == RESP.get('COM_SUCCESS') 
			&& gprsResp.responseType == CONSTANTS.get('CMD_CO_ACC_FINALIZE')) {
		
		if(sequenceId == '1'){
			mainContentScroll.refresh();
			document.getElementById("id-trans-local").value = CONST_STR.get('COM_NOTIFY_' + gprsResp.respJsonObj.method);
			if(gprsResp.respJsonObj.method == 0){
				document.getElementById('listUserApprove').style.display = "none";
			}
			setDataToScreen();
		}else if(sequenceId == '2'){
			setRespObjStore(gprsResp);
			genReviewScreen(gprsResp.respJsonObj);
		}
	}else if(gprsResp.respCode == RESP.get('COM_VALIDATE_FAIL') 
			&& gprsResp.responseType == CONSTANTS.get('CMD_CO_ACC_FINALIZE')){
		showAlertText(gprsResp.respContent);
	}else {
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

function requestAccListAccountFail(e){
	
}

/*** GENARATE REVIEW SCREEN ***/
function genReviewScreen(data) {
	var xmlDoc = createXMLDoc();
	var rootNode = createXMLNode('review', '', xmlDoc);
	
	// title
	var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
	createXMLNode("title", CONST_STR.get('COM_TRASACTION_INFO'), xmlDoc, sectionNode);
	
	var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_TYPE_TRANSACTION'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get('ACC_CLOSE_SAVING_ACCOUNT'), xmlDoc, rowNode);
	
	/*
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('ACCOUNT_FINALIZE_DTL_TYPE_SAVING'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get('ACC_DIGITAL_SAVING'), xmlDoc, rowNode);
	*/
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('ACCOUNT_PERIOD_TYPE'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get('ACCOUNT_PERIOD_ONLINE'), xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_ACCOUNT_NUMBER'), xmlDoc, rowNode);
	createXMLNode("value", gAccount.accNumber, xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('ACCOUNT_FINALIZE_DTL_ROOT_MONEY'), xmlDoc, rowNode);
	createXMLNode("value", gAccount.accAmount.replace(".00", "") + ' VND', xmlDoc, rowNode);
	
	//Them row: Ky han gui
	var strTenor = '';
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_PERIOD'), xmlDoc, rowNode);
	if(gAccount.accTenorDays != '0'){
			createXMLNode("value", gAccount.accTenorDays + ' ' + CONST_STR.get('ACCOUNT_PERIOD_DAY'), xmlDoc, rowNode);
		}else if(gAccount.accTenorMonths != '0'){
			createXMLNode("value", gAccount.accTenorMonths + ' ' + CONST_STR.get('ACCOUNT_PERIOD_MONTH'), xmlDoc, rowNode);
		}else if(gAccount.accTenorYears != '0'){
			createXMLNode("value", gAccount.accTenorYears + ' ' + CONST_STR.get('ACCOUNT_PERIOD_YEAR'), xmlDoc, rowNode);
		}	


	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('ACCOUNT_FINALIZE_DTL_GOAL_ACC'), xmlDoc, rowNode);
	createXMLNode("value", document.getElementById("id.accountno").value, xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
	createXMLNode("value", document.getElementById("id-trans-local").value, xmlDoc, rowNode);
	
	// button
	var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "cancel", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "authorize", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get("REVIEW_BTN_NEXT"), xmlDoc, buttonNode);
	
	
	//req gui len
    var req = {
		sequence_id : data.sequence_id,
		transaction_id : data.transaction_id,
		idtxn: data.idtxn
	};
	gCorp.cmdType = CONSTANTS.get("CMD_CO_ACC_FINALIZE"); //port
    gCorp.requests = [req, null];
	
    setReviewXmlStore(xmlDoc);
	navCachedPages["corp/common/review/com-review"] = null;
	navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

// Quay lai man hinh [Tien gui co ki han]
function backToScreenDtl(){
	updateAccountListInfo(); 
	navController.initWithRootView('corp/account/list_info/acc_list_account_info_dtl', true, 'xsl');
}