


var rslt = window.innerWidth;
var type;
var temp_type = "";
function loadInitXML() {
	return '';
}

var isMB;
var isStay;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewWillUnload() {
}

function viewDidLoadSuccess() {
	if (!gTrans.isBack) {
		if(rslt > 800){
			isMB = 0;			
		}else{
			isMB = 1;
		}
		isStay = isMB;
	}
	window.addEventListener("resize", myFunction);
	
	resolution();
	
	function myFunction() {
		//document.getElementById("id.accountno").value = window.innerWidth ;
		rslt = window.innerWidth;
		if(rslt > 800){
			isMB = 0;			
		}else{
			isMB = 1;
		}
		saveIssuedInfo();
		resolution();
	}
	//Tooltip when hover book
	document.getElementById("ds_id").innerHTML = CONST_STR.get('TRANSFER_DS_THUHUONG');
	document.getElementById("mau_id").innerHTML = CONST_STR.get('TRANSFER_MAU_THUHUONG');
		
	// tao calendar
    createDatePicker('trans.issuedate', 'span.issuedate');
	createDatePicker('trans.issuedatemb', 'span.issuedatemb');
	try {
		
			//Gen sequence view
			var xslDoc = getCachePageXsl("sequenceform");
			var docXml = createXMLDoc();	
			var rootNode = createXMLNode('seqFrom', '', docXml);
			createXMLNode('stepNo', 301, docXml, rootNode);
			
			genHTMLStringWithXML(docXml, xslDoc, function(oStr){
				try {
					document.getElementById('seqFormLocal').innerHTML = oStr;
				} catch (err) {
					gotoHomePage();
				}
			}, function() {
				gotoHomePage();
			});
				
		//if is not back from other - set value default
		if (!gTrans.isBack) {
			if ((gTrans.viewBackDTI == undefined || !gTrans.viewBackDTI) && (gTrans.showBankSelection == undefined || !gTrans.showBankSelection)) { 
			var tmp = {};
			if (gTrans.dti) {
				tmp = JSON.parse(JSON.stringify(gTrans.dti));
			}
		
			gTrans.dti = {
				idtxn: "T20"
			};
			}
			//Init variable
			gTrans.transType = "T20"; //Default transfer to another
			gTrans.saveSampleStatus = "N"; //Default not save sample name
			gTrans.transInfo = {};
			gTrans.accName = "";

			//Get init data when load screen

			gTrans.dti.feeId = "N";
			loadInitData();
		} /*else {		
			if(rslt > 800){
				if(gTrans.dti.issuedplace != null && gTrans.dti.issuedplace != ""){
					document.getElementById("trans.issueplace").value = gTrans.dti.issuedplace;
				}
				if(gTrans.dti.issueddate != null && gTrans.dti.issueddate != ""){
					document.getElementById("trans.issuedate").value = gTrans.dti.issueddate;					
				}    				
			} else {
				if(gTrans.dti.issuedplace != null && gTrans.dti.issuedplace != ""){
					document.getElementById("trans.issueplacemb").value = gTrans.dti.issuedplace;
				}
				if(gTrans.dti.issueddate != null && gTrans.dti.issueddate != ""){
					document.getElementById("trans.issuedatemb").value = gTrans.dti.issueddate;	
				}				
			}		
		}*/
		
		gTrans.isBack = false;

		
	} catch (er) {
		gotoHomePage();
	}
	gTrans.templateId = null;   
}

//Add event when click selection combobox
function addEventListenerToCombobox(selectHandle, closeHandle) {
	document.addEventListener("evtSelectionDialog", selectHandle, true);
	document.addEventListener("evtSelectionDialogClose", closeHandle, true);
}

//Remove event then close selection combobox
function removeEventListenerToCombobox(selectHandle, closeHandle) {
	document.removeEventListener("evtSelectionDialog", selectHandle, true);
	document.removeEventListener("evtSelectionDialogClose", closeHandle, true);
}

//Action click to change transaction type
function showTransTypeSelection() {
	var cbxText = (gUserInfo.lang == 'EN')? CONST_INTERNAL_TRANS_TYPE_EN: CONST_INTERNAL_TRANS_TYPE_VN;
	addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	showDialogList(CONST_STR.get('TRANS_PERIODIC_DIALOG_TITLE_ACCTYPE'), cbxText, CONST_INTERNAL_TRANS_TYPE_KEY, false);
}

//Action when select a transfer type
function handleSelectTransType(e) {
	
}

//Action when close transfer type combobox
function handleCloseTransTypeCbx() {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
}

//Update view when transfer type is changed
function updateView() {
	if (gTrans.transType == "T12")
		displayT12Screen();
	else if (gTrans.transType == "T11")
		displayT11Screen();
	else
		gotoHomePage();
}

//Get init data when load screen
function loadInitData() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gTrans.transType;
	var templateId = "";
	if(gTrans.templateId != null && gTrans.templateId != ""){
		templateId = gTrans.templateId
	}	 
	jsonData.templateId = templateId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_IDENTIFICATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0, function(response) {
		var resp = JSON.parse(response);
		if (resp.respCode == 0) {
			gTrans.sendMethod = resp.respJsonObj.sendMethod;
			gTrans.listSourceAccounts = resp.respJsonObj.listSourceAccounts;
			gTrans.limit = resp.respJsonObj.limit;

			fillSendMethod();

			setdefAcc();

			if (resp.respJsonObj.templateInfo) {
				gTrans.templateInfo = resp.respJsonObj.templateInfo[0];
				fillTemplateData();
			}
		}
	}, function(){
		showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
		gotoHomePage();
	});
	// requestMBServiceCorp(data, false, 0,
	// 	function(data) {
	// 		var resp = JSON.parse(data);
	// 		if (resp.respCode == 0) {
	// 			gTrans.sendMethod = resp.respJsonObj.sendMethod;
	// 			gTrans.listSourceAccounts = resp.respJsonObj.listSourceAccounts;
	// 			gTrans.limit = resp.respJsonObj.limit;
    //
	// 			fillSendMethod();
    //
	// 			setdefAcc();
    //
	// 			if (resp.respJsonObj.templateInfo) {
	// 				gTrans.templateInfo = resp.respJsonObj.templateInfo[0];
	// 				fillTemplateData();
	// 			}
	// 		}
	// 	},
	// 	function(){
	// 		showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
	// 		gotoHomePage();
	// 	}
	// );

	
}

function sendJSONRequest() {
	saveIssuedInfo();
	//Set data to object
	gTrans.transInfo.sourceAcc = document.getElementById("id.accountno").value;
	gTrans.transInfo.idtxn = gTrans.transType;
	gTrans.transInfo.passport = document.getElementById("trans.identification").value;
	if(window.innerWidth < 801){
		gTrans.transInfo.issuedate = document.getElementById("trans.issuedatemb").value;
		gTrans.transInfo.issueplace = document.getElementById("trans.issueplacemb").value;
	}
	else {
		gTrans.transInfo.issuedate = document.getElementById("trans.issuedate").value;
		gTrans.transInfo.issueplace = document.getElementById("trans.issueplace").value;
	}
	gTrans.transInfo.receiver = document.getElementById("trans.name").value.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
	gTrans.transInfo.phonenumber = document.getElementById("trans.phonenumber").value;
	//gTrans.transInfo.beneName = document.getElementById("trans.targetaccountname").innerHTML;
	gTrans.transInfo.amountTrans = removeSpecialChar(document.getElementById("trans.amount").value);
	gTrans.transInfo.contentTrans = document.getElementById("trans.content").value.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
	gTrans.transInfo.issavepayee = gTrans.saveSampleStatus;
	gTrans.transInfo.sampleName = document.getElementById("id.sample.name").value;
	gTrans.transInfo.desBranchCode = gTrans.dti.citadCode;
	gTrans.transInfo.idDesBank = gTrans.dti.bankCode;
	gTrans.transInfo.chargeincl = gTrans.dti.feeId;

	//Validate
	if (!validate()) return;

	var jsonData = new Object();
	jsonData.sequence_id = "3";
	jsonData.idtxn = gTrans.transType;
	jsonData.transInfo = gTrans.transInfo;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_IDENTIFICATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, function (response) {
			var resp = JSON.parse(response);
			if (resp.respCode === '0' && resp.respJsonObj.length > 0) {
				gTrans.transInfo.fee =  resp.respJsonObj[0].FEE;
				var xmlDoc = genReviewScreen();

				//Set request for result step
				var req = {
					sequence_id : "4",
					idtxn : gTrans.transType,
					transId : resp.respJsonObj[0].MA_GD,
					issavepayee : resp.respJsonObj[0].issavepayee,
					sampleName : resp.respJsonObj[0].sampleName
				};
				gCorp.cmdType = CONSTANTS.get('CMD_CO_TRANS_IDENTIFICATION');
				gCorp.requests = [req, null];

				setReviewXmlStore(xmlDoc);
				navCachedPages["corp/common/review/com-review"] = null;
				navController.pushToView("corp/common/review/com-review", true, 'xsl');
			} else if (resp.respCode == 38) {
				showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
			} else if (resp.respCode == 37) {
				showAlertText(CONST_STR.get("CORP_MSG_FEE_GREATER_AMOUNT"));
			} else {
				showAlertText(resp.respContent);
			}
		},
		function(){
			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
		}
	);
};

//Action click to change source account
function showAccountSelection() {
	type = "3";
	var list = gTrans.listSourceAccounts;
	var cbxAccount = [];
	var cbxBalance = [];
	for (var i in list) {
		var account = list[i];
		if (account.ghiNo == 'N') {
			cbxAccount.push(account.account);
			cbxBalance.push(account.balance + ' VND');
		}
	}
	if (cbxAccount.length != 0) {
		addEventListenerToCombobox(handleSelectionAccountList, handleSelectionAccountListClose);
		showDialogList(CONST_STR.get('TRANS_BATCH_ACC_LABEL'), cbxAccount, cbxBalance, true);
	} else {
		showAlertText(CONST_STR.get("TRANS_INTERNAL_LIST_SRCACC_EMPTY"));
	}
}

//Action when select a source account
function handleSelectionAccountList(e) {
	removeEventListenerToCombobox(handleSelectionAccountList, handleSelectionAccountListClose);
	if(type=="3"){
		document.getElementById("id.accountno").value = e.selectedValue1;
		document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + e.selectedValue2;
	}
}

//Action when close list source account combobox
function handleSelectionAccountListClose(e) {
	removeEventListenerToCombobox(handleSelectionAccountList, handleSelectionAccountListClose);
}

//Action when click destination account (T12)
function showPayeePage() {
	gTrans.showDialogCorp = true;
	document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
	document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
	document.addEventListener("tabChange", tabChanged, false);
	document.addEventListener("onInputSelected", okSelected, false);	
	
	gTrans.dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TH', CONST_PAYEE_LOCAL_TRANSFER);
	gTrans.dialog.USERID = gCustomerNo;
    gTrans.dialog.PAYNENAME = "3";
    gTrans.dialog.TYPETEMPLATE = "0";
	gTrans.dialog.showDialog(callbackShowDialogSuccessed, '');
}

//Call when show dialog complete
function callbackShowDialogSuccessed(node){	
}

//Action when selected a value in tabbox dialog
function handleInputPayeeAccOpen(e) {
	handleInputPayeeAccClose();

	if (e.tabSelected == 'tab1') {
		var passport = document.getElementById("trans.identification");
		var obj = e.dataObject;
		passport.value = obj.passport;
		document.getElementById("trans.name").value = obj.customerNo;
		temp_type = "0";
		loadSampleSelected(obj.beneId);
		//loadInfoFromIdAccount();
	}
	if (e.tabSelected == 'tab2') {
		var obj = e.dataObject;
		temp_type = "1";
		loadSampleSelected(obj.beneId);
		
	}
}

//Load sample template
function loadSampleSelected(beneId) {
	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.templateId = beneId;
	jsonData.idtxn = gTrans.transType;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_IDENTIFICATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, 
		function(data) {
			var resp = JSON.parse(data);
			var sendMethod = resp.respJsonObj.sendMethod;
			if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
				gTrans.templateInfo = resp.respJsonObj[0];
				
				fillTemplateData();
			}
		}
	);
}

//Điền dữ liệu mẫu chuyển tiền lên giao diện
function fillTemplateData() {
	var obj = gTrans.templateInfo;
	if (typeof obj != "undefined" && obj != null) {
		/*if (obj.SOURCE_ACC) {
			document.getElementById("id.accountno").value = obj.SOURCE_ACC;
		}	*/	
		
		//HIEN THI SO DU CUA TAI KHOAN NGUON    
		var newBalance = getBalanceByAccNo(document.getElementById("id.accountno").value);
		if (newBalance != null && newBalance != undefined) {
			var balanceAcct = document.getElementById("trans.sourceaccoutbalance");
			balanceAcct.innerHTML = CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(newBalance) + " VND" ;
		}
		
		//document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + formatNumberToCurrency(obj.SO_DU) + " " + obj.DV_TIEN;
		document.getElementById("trans.identification").value = obj.PASSPORT; 	// so cmtnd
		document.getElementById("trans.name").value = obj.BENE_NAME.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');	// ten thu huong
		
		// ngay cap va noi cap
		document.getElementById("trans.issuedate").value = obj.DATISSUE;
		document.getElementById("trans.issueplace").value = obj.PLACEISSUE.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');		
		document.getElementById("trans.issuedatemb").value = obj.DATISSUE;
		document.getElementById("trans.issueplacemb").value = obj.PLACEISSUE.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
		
		document.getElementById("trans.phonenumber").value = obj.PHONENUMBER; // so dien thoai		
		document.getElementById("trans.branchName").value = obj.BANK_NAME + '-' + obj.BRANCH_NAME; // ngan hang nhan
		gTrans.dti.citadCode = obj.SORTCODE;
        gTrans.dti.bankCode = obj.BANK_CODE;
		gTrans.dti.bankName = obj.BANK_NAME;
		gTrans.dti.branchName = obj.BRANCH_NAME;
		
		if(temp_type == "1"){				
			document.getElementById("trans.amount").value = formatNumberToCurrency(obj.NUMAMOUNT);
			document.getElementById("trans.amounttotext").value = convertNum2WordWithLang(keepOnlyNumber(obj.NUMAMOUNT), gUserInfo.lang);
			document.getElementById("trans.content").value = obj.MSG;
		}
	}
}

//Action when close tabbox dialog
function handleInputPayeeAccClose(e){
	document.removeEventListener("evtSelectionDialogClose", handleInputPayeeAccClose, false);
	document.removeEventListener("evtSelectionDialog", handleInputPayeeAccOpen, false);
	document.removeEventListener("tabChange", tabChanged, false);
	document.removeEventListener("onInputSelected", okSelected, false);
}

//Action when change tab in tabbox dialog
function tabChanged(e){	
	var node = e.selectedValueTab;
	gTrans.showDialogCorp = true;		
	if (node.id == 'tab1') {
		gTrans.dialog.activeDataOnTab('tab1');
		gTrans.dialog.USERID = gCustomerNo;
		gTrans.dialog.PAYNENAME = "3";
		gTrans.dialog.TYPETEMPLATE = "0";
		gTrans.dialog.requestData(node.id);
	}
	if (node.id == 'tab2'){			
		gTrans.dialog.activeDataOnTab('tab2');
		gTrans.dialog.USERID = gCustomerNo;
		gTrans.dialog.PAYNENAME = "3";
		gTrans.dialog.TYPETEMPLATE = "1";
		gTrans.dialog.requestData(node.id);
	}	
}

//Action when finish input value in tabbox dialog
function okSelected(e){
	handleInputPayeeAccClose();
	if ((e.selectedValue != undefined) &&(e.selectedValue != null) && (e.selectedValue.length>0)){
		document.getElementById("trans.identification").value = e.selectedValue;
		//loadInfoFromIdAccount();
	}
}

//Get Account Name from User ID
function loadInfoFromIdAccount() {
	var userId = "";
	if (gTrans.transType == "T11") {
		if (gTrans.accName != "") {
			document.getElementById("trans.targetaccountname").innerHTML = gTrans.accName;
			return;
		}
		userId = document.getElementById("trans.desaccountno").value;
	}
	if (gTrans.transType == "T12") {
		userId = document.getElementById("trans.targetaccount").value;
	}

	var jsonData = new Object();
	jsonData.sequence_id = "3";
	jsonData.idtxn = gTrans.transType;
	jsonData.accountId = userId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, 
		function(data) {
			var resp = JSON.parse(data);
			if (resp.respCode == 0 && resp.respJsonObj.length > 0 && resp.respJsonObj[0].GHI_CO == "N") {
				document.getElementById("trans.targetaccountname").innerHTML = resp.respJsonObj[0].TEN_TK;
				if (gTrans.transType == "T11") {
					gTrans.accName = resp.respJsonObj[0].TEN_TK;
				}
			} else
				document.getElementById("trans.targetaccountname").innerHTML = "";
		}, 
		function() {
			document.getElementById("trans.targetaccountname").innerHTML = "";
		}
	);
}

//Get list destination account in business
function showDesAccountSelection() {
	var srcAcc = document.getElementById("id.accountno").value;
	var list = gTrans.listSourceAccounts;
	var cbxAccount = [];
	var cbxBalance = [];
	for (var i in list) {
		var account = list[i];
		if (account.account != srcAcc && account.ghiCo == 'N') {
			cbxAccount.push(account.account);
			cbxBalance.push(account.balance + ' VND');
		}
	}
	if (cbxAccount.length != 0) {
		addEventListenerToCombobox(handleSelectionDesAccount, handleCloseSelectionDesAccountCbx);
		showDialogList(CONST_STR.get('COM_ACCOUNT_DEST'), cbxAccount, cbxBalance, true);
	} else {
		showAlertText(CONST_STR.get("TRANS_INTERNAL_LIST_DESACC_EMPTY"));
	}
}

//Action when select a destination account
function handleSelectionDesAccount(e) {
	handleCloseSelectionDesAccountCbx();
	document.getElementById("trans.desaccountno").value = e.selectedValue1;
	//loadInfoFromIdAccount();
}

function handleCloseSelectionDesAccountCbx() {
	removeEventListenerToCombobox(handleSelectionDesAccount, handleCloseSelectionDesAccountCbx);
}

//Format currency and pronounce to Vietnamese
function handleInputAmount (e, des) {
	var tmpVale = des.value;
	formatCurrency(e, des);
	var numStr = convertNum2WordWithLang(keepOnlyNumber(tmpVale), gUserInfo.lang); 
	document.getElementById("trans.amounttotext").innerHTML = numStr;
}

//Action when click select template control
function showInputMNG() {
	type= "2";
	var cbxText = (gUserInfo.lang == 'EN')? CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_EN : CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_VN;
	var cbxValue = CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_KEY;
	addEventListenerToCombobox(handleInputMNG, handleInputMNGClose);
	showDialogList(CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT'), cbxText, cbxValue, false);
}

//Action when click selected template control type
function handleInputMNG(e) {
	handleInputMNGClose();
	if(type=="2"){
		document.getElementById('id.payee').value = e.selectedValue1;
		gTrans.saveSampleStatus = e.selectedValue2;
		
		if (gTrans.saveSampleStatus == "TP") {
			document.getElementById('id.sample').style.display = "";
		} else {
			document.getElementById('id.sample').style.display = "none";
		}
		if (mainContentScroll !== null)
			mainContentScroll.refresh();
	}
}

//Action when close template control combobox
function handleInputMNGClose() {
	removeEventListenerToCombobox(handleInputMNG, handleInputMNGClose);
}

//Get send method of current user
function fillSendMethod() {
	if (typeof gTrans.sendMethod != "undefined" && gTrans.sendMethod != null) {
		document.getElementById("id.notifyTo").value = CONST_STR.get("COM_NOTIFY_" + gTrans.sendMethod);
		if (gTrans.sendMethod == 0) {
			document.getElementById("tr.list-receiver").style.display = "none";
		}
	}
}

//Action when click show ReceiverList
function showReceiverList() {
    updateAccountListInfo();
    navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}

//Validate
function validate() {
	var conditions = gConditions;

	//tai khoan chuyen rong
	if (!validateFunc(gTrans.transInfo.sourceAcc, conditions["account"])) {
		showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_DES_ACC'));
		return false;
	}

	//passport rong
	if (gTrans.transInfo.passport.trim() == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('IDENTIFICATION_NUMBER')]));
		return false;
	}
	
	//ngay cap rong
	if (gTrans.transInfo.issuedate.trim() == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('IDENTIFICATION_TIME')]));
		return false;
	}
	
	if(!checkIssuedDat(gTrans.transInfo.issuedate.trim())){		
		showAlertText(CONST_STR.get('IDENTIFICATION_ERR_ISSUEDDATE'));
		return false;
	}
	
	//noi cap rong
	if (gTrans.transInfo.issueplace.trim() == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('IDENTIFICATION_PLACE')]));
		return false;
	}
	
	//ten nguoi nhan rong
	if (gTrans.transInfo.receiver.trim() == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('IDENTIFICATION_RECEIVER_NAME')]));
		return false;
	}
	
	//ngan hang nhan rong
	if (document.getElementById('trans.branchName').value != CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER'))
	{
		if (gTrans.transInfo.desBranchCode.trim() == "" || gTrans.transInfo.idDesBank.trim() == "") {
			showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
					[CONST_STR.get('IDENTIFICATION_REVIEW_DEST_BANK')]));
			return false;
		}
	}
	else
	{
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
					[CONST_STR.get('IDENTIFICATION_REVIEW_DEST_BANK')]));
			return false;	
	}
	
	
	/*if(document.getElementById("trans.targetaccountname").value.indexOf('&') >= 0)
    {
        showAlertText(CONST_STR.get('TRANS_ERR_SYMBOL_SPECIAL'));
        return;
    }*/
	
	//so tien rong
	if (!validateFunc(gTrans.transInfo.amountTrans, conditions["amount"])) {
		showAlertText(CONST_STR.get('ERR_INPUT_NO_AMOUNT'));
		return false;
	}
	
	

	//so tien khong vuot qua so du
	var balance = parseInt(removeSpecialChar(document.getElementById('trans.sourceaccoutbalance').innerHTML));
	if (balance - parseInt(gTrans.transInfo.amountTrans) < 0) {
		showAlertText(CONST_STR.get('TOPUP_EXCEED_AVAIL_BALANCE'));
		return false;
	}

	//noi dung rong
	if (!validateFunc(gTrans.transInfo.contentTrans, conditions["content"])) {
		showAlertText(CONST_STR.get('ERR_INPUT_NO_CONTENT'));
		return false;
	}

	//ten mau chuyen tien rong
	if (!gTrans.transInfo.issavepayee || gTrans.transInfo.issavepayee == null || gTrans.transInfo.issavepayee == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('TRANSFER_REMITTANCE_NAMED')]));
		return false;
	}
	if (gTrans.saveSampleStatus == "TP") {
		if (!validateFunc(gTrans.transInfo.sampleName, conditions["sample"])) {
			showAlertText(CONST_STR.get('ERR_INPUT_NO_SAMPLE'));
			return false;
		}
	}

	if (gTrans.transType == "T20") {
		//validate han muc
		if (parseInt(gTrans.transInfo.amountTrans) > parseInt(gTrans.limit.limitTime)) {
			showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(gTrans.limit.limitTime)]));
			return false;
		}
		if ((parseInt(gTrans.limit.totalDay) + parseInt(gTrans.transInfo.amountTrans)) > parseInt(gTrans.limit.limitDay)) {
			showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(gTrans.limit.limitDay)]));
			return false;
		}
	}

	return true;
}

// //Action when click continue
// function sendJSONRequest() {
// 	saveIssuedInfo();
// 	//Set data to object
// 	gTrans.transInfo.sourceAcc = document.getElementById("id.accountno").value;
// 	gTrans.transInfo.idtxn = gTrans.transType;
// 	gTrans.transInfo.passport = document.getElementById("trans.identification").value;
// 	if(window.innerWidth < 801){
// 		gTrans.transInfo.issuedate = document.getElementById("trans.issuedatemb").value;
// 		gTrans.transInfo.issueplace = document.getElementById("trans.issueplacemb").value;
// 	}
// 	else {
// 		gTrans.transInfo.issuedate = document.getElementById("trans.issuedate").value;
// 		gTrans.transInfo.issueplace = document.getElementById("trans.issueplace").value;
// 	}
// 	gTrans.transInfo.receiver = document.getElementById("trans.name").value.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
// 	gTrans.transInfo.phonenumber = document.getElementById("trans.phonenumber").value;
// 	//gTrans.transInfo.beneName = document.getElementById("trans.targetaccountname").innerHTML;
// 	gTrans.transInfo.amountTrans = removeSpecialChar(document.getElementById("trans.amount").value);
// 	gTrans.transInfo.contentTrans = document.getElementById("trans.content").value.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
// 	gTrans.transInfo.issavepayee = gTrans.saveSampleStatus;
// 	gTrans.transInfo.sampleName = document.getElementById("id.sample.name").value;
// 	gTrans.transInfo.desBranchCode = gTrans.dti.citadCode;
//     gTrans.transInfo.idDesBank = gTrans.dti.bankCode;
//     gTrans.transInfo.chargeincl = gTrans.dti.feeId;
//
// 	//Validate
// 	if (!validate()) return;
//
// 	var jsonData = new Object();
// 	jsonData.sequence_id = "3";
// 	jsonData.idtxn = gTrans.transType;
// 	jsonData.transInfo = gTrans.transInfo;
// 	var	args = new Array();
// 	args.push(null);
// 	args.push(jsonData);
// 	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_IDENTIFICATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
// 	var data = getDataFromGprsCmd(gprsCmd);
// 	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess,
// 		function(){
// 			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
// 		}
// 	);
// }
//
// //Action when request init trans success
// function requestMBServiceSuccess(data) {
// 	var resp = JSON.parse(data);
// 	if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
// 		gTrans.transInfo.fee =  resp.respJsonObj[0].FEE;
// 		var xmlDoc = genReviewScreen();
//
// 		//Set request for result step
// 		var req = {
// 			sequence_id : "4",
// 			idtxn : gTrans.transType,
// 			transId : resp.respJsonObj[0].MA_GD,
// 			issavepayee : resp.respJsonObj[0].issavepayee,
// 			sampleName : resp.respJsonObj[0].sampleName
// 		};
// 		gCorp.cmdType = CONSTANTS.get('CMD_CO_TRANS_IDENTIFICATION');
// 	    gCorp.requests = [req, null];
//
// 		setReviewXmlStore(xmlDoc);
// 		navCachedPages["corp/common/review/com-review"] = null;
// 		navController.pushToView("corp/common/review/com-review", true, 'xsl');
// 	} else if (resp.respCode == 38) {
//         showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
//     } else if (resp.respCode == 37) {
//         showAlertText(CONST_STR.get("CORP_MSG_FEE_GREATER_AMOUNT"));
//     } else {
//         showAlertText(resp.respContent);
//     }
// }

//Gen review screen
function genReviewScreen() {
	var xmlDoc = createXMLDoc();
	var rootNode = createXMLNode('review', '', xmlDoc);

	var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
	createXMLNode("title", CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), xmlDoc, sectionNode);

	var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get("IDENTIFICATION_TRANS_TYPE"), xmlDoc, rowNode);
	
	// current datetime 
	var dt = getDateTime();
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_REVIEW_CREATED_DATE'), xmlDoc, rowNode);
	createXMLNode("value", dt, xmlDoc, rowNode);
	
	//trang thai
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_REVIEW_STATUS'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get('IDENTIFICATION_REVIEW_STATUS_PND'), xmlDoc, rowNode);
	
	// thong tin giao dich
	sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
	createXMLNode("title", CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), xmlDoc, sectionNode);
	
	//tai khoan chuyen
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.sourceAcc, xmlDoc, rowNode);
	
	// so du kha dung
	var balance = removeSpecialChar(document.getElementById('trans.sourceaccoutbalance').innerHTML);
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(balance,' VND'), xmlDoc, rowNode);
		
	// so cmtnd/ho chieu
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_NUMBER'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.passport, xmlDoc, rowNode);
	
	// ngay cap
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_PLACE'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.issuedate, xmlDoc, rowNode);
	
	// noi cap
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_TIME'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.issueplace, xmlDoc, rowNode);
	
	// ten nguoi nhan
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_RECEIVER_NAME'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.receiver, xmlDoc, rowNode);
	
	// so dien thoai nguoi nhan
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_PHONE_NUMBER_2'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.phonenumber, xmlDoc, rowNode);
	
	//ngan hang nhan
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('IDENTIFICATION_REVIEW_DEST_BANK'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.dti.bankName + "-" + gTrans.dti.branchName , xmlDoc, rowNode);
	
	// so tien
	var amount = gTrans.transInfo.amountTrans;
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_AMOUNT_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(amount,' VND'), xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_FEE'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(gTrans.transInfo.fee,' VND'), xmlDoc, rowNode);

	var balanceCont = balance - amount;
	var chargeObjected =document.getElementById("trans.fee").value;
	//hoadh
	var transFeesOfLangguage = (gUserInfo.lang == 'EN')? CONST_KEY_TRANS_FEE_TYPE_EN : CONST_KEY_TRANS_FEE_TYPE_VN;

	if(chargeObjected == transFeesOfLangguage[0])
	{
		balanceCont = balanceCont - gTrans.transInfo.fee;
	}
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(balanceCont,' VND'), xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_CONTENT'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.contentTrans, xmlDoc, rowNode);
	
	// nguoi chiu phi
   if(gTrans.transInfo.chargeincl=='N')
   {
	   rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('COM_SENDER_CHARGE'), xmlDoc, rowNode);
		createXMLNode("value", CONST_STR.get('IDENTIFICATION_FEE_SENDER'), xmlDoc, rowNode);
   
   }
   else
   {
	   rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('COM_SENDER_CHARGE'), xmlDoc, rowNode);
		createXMLNode("value", CONST_STR.get('IDENTIFICATION_FEE_RECEIVER_PAY'), xmlDoc, rowNode);

   }
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_SAVE_BENE'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get('TRANS_INTERNAL_SAVE_TEMPLATE_' + gTrans.transInfo.issavepayee), xmlDoc, rowNode);

	if (gTrans.transInfo.issavepayee == "TP") {
		rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('TRANSFER_REMITTANCE_NAME_REVIEW'), xmlDoc, rowNode);
		createXMLNode("value", gTrans.transInfo.sampleName, xmlDoc, rowNode);
	}
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
	createXMLNode("value", document.getElementById('id.notifyTo').value, xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('BATCH_SALARY_PROCESSED_DATE'), xmlDoc, rowNode);
	createXMLNode("value", currenDate(), xmlDoc, rowNode);

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

function currenDate() {
	var d = new Date().getDate();
	var m = new  Date().getMonth() + 1;
	var y = new Date().getFullYear();

	return d + '/' + m + '/' + y;
}

function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    	field.value = removeAccentinfo(field.value);
		field.value = field.value.replace(/[!"@#$%&*'\+:;<=>?\\`^~{|}]/g, '');
  }
}

function controlInputTextCMT(field, maxlen, enableUnicode) {
	if (maxlen != undefined && maxlen != null) {
		textLimit(field, maxlen);
	}
	if (enableUnicode == undefined || !enableUnicode) {
		field.value = removeAccentinfo(field.value);
		field.value = field.value.replace(" ","");
		field.value = field.value.replace(/[!"@#$%&*'\+:;<=>?\\`^~{|}]/g, '');
	}
}

function resolution(){
	if (currentPage == "corp/transfer/identification/identification-trans-src") {		
		if (rslt < 801){
				document.getElementById("mobile-mode-tr").style.display = "";
				document.getElementById("mobile-mode-tr2").style.display = "";
				document.getElementById("desktop-mode-tr").style.display = "none";
				if(gTrans.dti != undefined){
					if(gTrans.dti.issueddate != null && gTrans.dti.issueddate != ""){
						document.getElementById("trans.issuedatemb").value = document.getElementById("trans.issuedate").value ;
					}
					if(gTrans.dti.issuedplace != null && gTrans.dti.issuedplace != ""){
						document.getElementById("trans.issueplacemb").value = document.getElementById("trans.issueplace").value ;
					}
				}
		}
		if (rslt >= 801){
				document.getElementById("mobile-mode-tr").style.display = "none";
				document.getElementById("mobile-mode-tr2").style.display = "none";
				document.getElementById("desktop-mode-tr").style.display = "";
				if(gTrans.dti != undefined){
					if(gTrans.dti.issueddate != null && gTrans.dti.issueddate != ""){
						document.getElementById("trans.issuedate").value = document.getElementById("trans.issuedatemb").value ;
					}
					if(gTrans.dti.issuedplace != null && gTrans.dti.issuedplace != ""){
						document.getElementById("trans.issueplace").value = document.getElementById("trans.issueplacemb").value ;
					}
				}
		}		
	}
}

// show chon ngan hang
function showBankSelection() {	
	saveIssuedInfo();
	
    gTrans.showBankSelection = true;
    navController.pushToView("corp/transfer/domestic/trans-dti-list-bank", true);
    document.addEventListener("evtSelectedBranch", handleInputBankBranch, false);
}


function handleInputBankBranch(e) {
    document.removeEventListener("evtSelectedBranch", handleInputBankBranch, false);
    gTrans.dti.bankCode = e.bankCode;
    gTrans.dti.citadCode = e.branchCode;
    var branch = document.getElementById('trans.branchName');
    branch.value = e.bankName + "-" + e.branchName;
    gTrans.dti.branchName = e.branchName;
	gTrans.dti.bankName = e.bankName;
    gTrans.dti.bankCityCode = e.bankCityCode;
}


//Action click to change person who pay fee
function showFee() {
	type = "1";
	listSelection = (gUserInfo.lang == 'EN') ? CONST_KEY_TRANS_FEE_TYPE_EN : CONST_KEY_TRANS_FEE_TYPE_VN;
	listValue = CONST_KEY_TRANS_FEE_TYPE_ID;
	dialogTitle = CONST_STR.get('TRANS_FEE_TYPE_DIALOG_TITLE');
	
	document.addEventListener("evtSelectionDialog", handleSelectionFee, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectionFeeClose, false);
    showDialogList(dialogTitle, listSelection, listValue, false);
}

//Action when select person to charge fee
function handleSelectionFee(e) {
	removeEventListenerToCombobox(handleSelectionFee, handleSelectionFeeClose);	
	if(type == "1"){
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById("trans.fee").value = e.selectedValue1;
			gTrans.dti.feeType = e.selectedValue1;
		}
		if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
			 gTrans.dti.feeId = e.selectedValue2;
		}
	}
}

//Action when close list source account combobox
function handleSelectionFeeClose(e) {
	removeEventListenerToCombobox(handleSelectionFee, handleSelectionFeeClose);
}


function setdefAcc(){
	var list = gTrans.listSourceAccounts;
	var cbxAccount = [];
	var cbxBalance = [];
	for (var i in list) {
		var account = list[i];
		if (account.ghiNo == 'N') {
			if(gTrans.listSourceAccounts != null){
				document.getElementById("id.accountno").value = account.account;
				document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + account.balance + " VND";
				break;
			}		
			//cbxAccount.push(account.account);
			//cbxBalance.push(account.balance + ' VND');
		}
		
	}	
	
}

function getDateTime () {
  	now = new Date();
  	year = "" + now.getFullYear();
  	month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  	day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  	hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  	minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  	second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
 	 return day + "/" + month + "/" + year + " " + hour + ":" + minute + ":" + second;
}


function getBalanceByAccNo(accNo) {
    for (var i = 0; i < gUserInfo.accountList.length; i++) {
        var account = gUserInfo.accountList[i];
        if (accNo == account.accountNumber) {
            return gUserInfo.accountList[i].balanceAvailable;
        }
    }
    return '0';
}

function saveIssuedInfo(){	
	if(gTrans.dti != undefined){
		if(rslt > 800){
			if(isMB != isStay){
				document.getElementById("trans.issueplace").value = document.getElementById("trans.issueplacemb").value;
				document.getElementById("trans.issuedate").value = document.getElementById("trans.issuedatemb").value;
				gTrans.dti.issuedplace = document.getElementById("trans.issueplace").value;
				gTrans.dti.issueddate = document.getElementById("trans.issuedate").value;
				isStay = isMB;
			}
		} else {
			if(isMB != isStay){
				document.getElementById("trans.issueplacemb").value = document.getElementById("trans.issueplace").value;
				document.getElementById("trans.issuedatemb").value = document.getElementById("trans.issuedate").value;
				gTrans.dti.issuedplace = document.getElementById("trans.issueplacemb").value;
				gTrans.dti.issueddate = document.getElementById("trans.issuedatemb").value;
				isStay = isMB;
			}
		}
	}
}

function checkIssuedDat(date){
	var cur_date = getDateTime().substring(0,10);
	if(cur_date.substring(6,10) > date.substring(6,10)){
		return true;
	} else if(cur_date.substring(6,10) < date.substring(6,10)){
		return false;
	}else if(cur_date.substring(3,5) > date.substring(3,5)){
		return true;
	}else if(cur_date.substring(3,5) < date.substring(3,5)){
		return false;
	}else if(cur_date.substring(0,2) > date.substring(0,2)){
		return true;
	}else {
		return false;
	}	
}

function removeChar (e, des) {
	var tmpVale = des.value;	
	var numStr = keepOnlyNumber(tmpVale); 
	des.value = numStr;
}

function issueDateFocus (event) {
	$(event).click();
}