function loadInitXML() {
	return '';
}

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewWillUnload() {
}

function viewDidLoadSuccess() {
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

		//Tooltip when hover book
		document.getElementById("ds_id").innerHTML = CONST_STR.get('TRANSFER_DS_THUHUONG');
	    document.getElementById("mau_id").innerHTML = CONST_STR.get('TRANSFER_MAU_THUHUONG');

	    //if is not back from other - set value default
		if (!gTrans.isBack) {
			//Init variable
			gTrans.transType = "T12"; //Default transfer to another
			gTrans.saveSampleStatus = "N"; //Default not save sample name
			gTrans.transInfo = {};
			gTrans.accName = "";

			updateView();

			//Get init data when load screen
			// loadInitData();
			gTrans.sendMethod = 1;
			fillSendMethod();
		}

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
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	gTrans.transType = e.selectedValue2;
	document.getElementById("id-trans-local").value = e.selectedValue1;
	updateView();
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

//Display 'Transfer to other TPB account' screen (Default)
function displayT12Screen() {	
	document.getElementById('id-trans-local').value = CONST_STR.get("TRANS_INTERNAL_TYPE_T12");
	var desAccElementT12 = document.getElementById('tr.trans-other-acc');
	var desAccElementT11 = document.getElementById('tr.trans-local-acc');
	var saveSampleElement = document.getElementById('tr.mng-selection');
	var sampleNameElement = document.getElementById('id.sample');
	document.getElementById("trans.targetaccountname").innerHTML = "";
	document.getElementById("trans.desaccountno").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER");
	document.getElementById("trans.targetaccount").value = null;

	desAccElementT12.style.display = "";
	desAccElementT11.style.display = "none";
	saveSampleElement.style.display = "";

	//if selected save sample template
	if (gTrans.saveSampleStatus == "TP")
		sampleNameElement.style.display = "";
	else
		sampleNameElement.style.display = "none";
}

//Display 'Transfer between the accounts in business'
function displayT11Screen() {
	document.getElementById('id-trans-local').value = CONST_STR.get("TRANS_INTERNAL_TYPE_T11");
	var desAccElementT12 = document.getElementById('tr.trans-other-acc');
	var desAccElementT11 = document.getElementById('tr.trans-local-acc');
	var saveSampleElement = document.getElementById('tr.mng-selection');
	var sampleNameElement = document.getElementById('id.sample');
	document.getElementById("trans.targetaccountname").innerHTML = "";
	document.getElementById("trans.desaccountno").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER");
	document.getElementById("trans.targetaccount").value = null;

	desAccElementT12.style.display = "none";
	desAccElementT11.style.display = "";
	saveSampleElement.style.display = "none";
	sampleNameElement.style.display = "none";
}

//Get init data when load screen
function loadInitData() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gTrans.transType;
	jsonData.templateId = gTrans.templateId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0,
		function(data) {
			var resp = JSON.parse(data);
			if (resp.respCode == 0) {
				gTrans.sendMethod = resp.respJsonObj.sendMethod;
				gTrans.listSourceAccounts = resp.respJsonObj.listSourceAccounts;
				gTrans.limit = resp.respJsonObj.limit;

				fillSendMethod();

				if (resp.respJsonObj.templateInfo) {
					gTrans.templateInfo = resp.respJsonObj.templateInfo[0];
					fillTemplateData();
				}
			}
		}, 
		function(){
			// showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
			// gotoHomePage();
		}
	);
}

//Action click to change source account
function showAccountSelection() {
	var list = [{account: "88889998001", balance: "1000000000", ghiNo: "N"}];
	var cbxAccount = [];
	var cbxBalance = [];
	for (var i in list) {
		var account = list[i];
		if (account.ghiNo == 'N') {
			cbxAccount.push(account.account);
			cbxBalance.push(formatNumberToCurrency(account.balance) + ' VND');
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
	var desAcc = document.getElementById("trans.desaccountno").value;
	if (desAcc == e.selectedValue1) {
		document.getElementById("trans.desaccountno").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER");
		document.getElementById("trans.targetaccountname").innerHTML = "";
	}
	document.getElementById("id.accountno").value = e.selectedValue1;
	document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + e.selectedValue2;
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
    gTrans.dialog.PAYNENAME = "0";
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
		var destinationAcc = document.getElementById("trans.targetaccount");
		var obj = e.dataObject;
		destinationAcc.value = obj.customerNo;
		loadInfoFromIdAccount();
	}
	if (e.tabSelected == 'tab2') {
		var obj = e.dataObject;
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
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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
		if (obj.TAI_KHOAN_NGUON) {
			document.getElementById("id.accountno").value = obj.TAI_KHOAN_NGUON;
		}
		document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + formatNumberToCurrency(obj.SO_DU) + " " + obj.DV_TIEN;
		document.getElementById("trans.targetaccount").value = obj.TAI_KHOAN_DICH;
		document.getElementById("trans.targetaccountname").innerHTML = obj.NGUOI_THU_HUONG;
		document.getElementById("trans.amount").value = formatNumberToCurrency(obj.SO_TIEN);
		document.getElementById("trans.amounttotext").innerHTML = convertNum2WordWithLang(keepOnlyNumber(obj.SO_TIEN), gUserInfo.lang);
		document.getElementById("trans.content").value = obj.NOI_DUNG;
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
		gTrans.dialog.PAYNENAME = "0";
		gTrans.dialog.TYPETEMPLATE = "0";
		gTrans.dialog.requestData(node.id);
	}
	if (node.id == 'tab2'){			
		gTrans.dialog.activeDataOnTab('tab2');
		gTrans.dialog.USERID = gCustomerNo;
		gTrans.dialog.PAYNENAME = "0";
		gTrans.dialog.TYPETEMPLATE = "1";
		gTrans.dialog.requestData(node.id);
	}	
}

//Action when finish input value in tabbox dialog
function okSelected(e){
	handleInputPayeeAccClose();
	if ((e.selectedValue != undefined) &&(e.selectedValue != null) && (e.selectedValue.length>0)){
		document.getElementById("trans.targetaccount").value = e.selectedValue;
		loadInfoFromIdAccount();
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

	gTrans.accName = "FULLNAME_88889998";
	document.getElementById("trans.targetaccountname").innerHTML = gTrans.accName;

	// var jsonData = new Object();
	// jsonData.sequence_id = "3";
	// jsonData.idtxn = gTrans.transType;
	// jsonData.accountId = userId;
	// var	args = new Array();
	// args.push(null);
	// args.push(jsonData);
	// var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	// var data = getDataFromGprsCmd(gprsCmd);
	// requestMBServiceCorp(data, true, 0, 
	// 	function(data) {
	// 		var resp = JSON.parse(data);
	// 		if (resp.respCode == 0 && resp.respJsonObj.length > 0 && resp.respJsonObj[0].GHI_CO == "N") {
	// 			document.getElementById("trans.targetaccountname").innerHTML = resp.respJsonObj[0].TEN_TK;
	// 			if (gTrans.transType == "T11") {
	// 				gTrans.accName = resp.respJsonObj[0].TEN_TK;
	// 			}
	// 		} else
	// 			document.getElementById("trans.targetaccountname").innerHTML = "";
	// 	}, 
	// 	function() {
	// 		document.getElementById("trans.targetaccountname").innerHTML = "";
	// 	}
	// );
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
	loadInfoFromIdAccount();
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
	var cbxText = (gUserInfo.lang == 'EN')? CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_EN : CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_VN;
	var cbxValue = CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_KEY;
	addEventListenerToCombobox(handleInputMNG, handleInputMNGClose);
	showDialogList(CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT'), cbxText, cbxValue, false);
}

//Action when click selected template control type
function handleInputMNG(e) {
	handleInputMNGClose();
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

	//tai khoan nhan rong
	if (gTrans.transInfo.destinationAcc.trim() == "") {
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), 
				[CONST_STR.get('COM_ACCOUNT_DEST')]));
		return false;
	}

	//tai khoan nhan hop le hay khong
	if (gTrans.transType == "T12") {
		if(gTrans.transInfo.beneName == '') {
			showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_DES_ACC'));
			return false;
		}
	}

	//tai khoan nhan va chuyen trung nhau
	if (gTrans.transType == "T12") {
		if (gTrans.transInfo.sourceAcc.substring(0, 8).indexOf(gTrans.transInfo.destinationAcc.substring(0, 8)) != -1) {
			showAlertText(CONST_STR.get('TRANSFER_ERROR_EQUAL_MSG'));
			return;
		}
	}
	if (gTrans.transType == "T11") {
		if (gTrans.transInfo.sourceAcc == gTrans.transInfo.destinationAcc) {
			showAlertText(CONST_STR.get('TRANSFER_ERROR_EQUAL_MSG2'));
			return;
		}
	}
		
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

	// if (gTrans.transType == "T12") {
	// 	//validate han muc
	// 	if (parseInt(gTrans.transInfo.amountTrans) > parseInt(gTrans.limit.limitTime)) {
	// 		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(gTrans.limit.limitTime)]));
	// 		return false;
	// 	}
	// 	if ((parseInt(gTrans.limit.totalDay) + parseInt(gTrans.transInfo.amountTrans)) > parseInt(gTrans.limit.limitDay)) {
	// 		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(gTrans.limit.limitDay)]));
	// 		return false;
	// 	}
	// }

	return true;
}

//Action when click continue
function sendJSONRequest() {

	//Set data to object
	gTrans.transInfo.sourceAcc = document.getElementById("id.accountno").value;
	gTrans.transInfo.idtxn = gTrans.transType;
	if (gTrans.transType == "T11") {
		gTrans.transInfo.destinationAcc = document.getElementById("trans.desaccountno").value;
	} else if (gTrans.transType == "T12") {
		gTrans.transInfo.destinationAcc = document.getElementById("trans.targetaccount").value;
	}
	gTrans.transInfo.beneName = document.getElementById("trans.targetaccountname").innerHTML;
	gTrans.transInfo.amountTrans = removeSpecialChar(document.getElementById("trans.amount").value);
	gTrans.transInfo.contentTrans = document.getElementById("trans.content").value.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
	gTrans.transInfo.issavepayee = gTrans.saveSampleStatus;
	gTrans.transInfo.sampleName = document.getElementById("id.sample.name").value;

	//Validate
	if (!validate()) return;

	var jsonData = new Object();
	jsonData.sequence_id = "4";
	jsonData.idtxn = gTrans.transType;
	jsonData.transInfo = gTrans.transInfo;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	var dataJson = {"responseType":"0","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":[{"MA_GD":"1708710000031191","FEE":"0","issavepayee":"N","sampleName":""}]};
	requestMBServiceSuccess(dataJson);

	// requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, 
	// 	function(){
	// 		showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
	// 	}
	// );
}

//Action when request init trans success
function requestMBServiceSuccess(data) {
	// var resp = JSON.parse(data);
	var resp = data;
	if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
		var xmlDoc = genReviewScreen();

		//Set request for result step
		var req = {
			sequence_id : "5",
			idtxn : gTrans.transType,
			transId : resp.respJsonObj[0].MA_GD,
			issavepayee : resp.respJsonObj[0].issavepayee,
			sampleName : resp.respJsonObj[0].sampleName
		};
		gCorp.cmdType = CONSTANTS.get('CMD_CO_IIT_FUNDS_LOCAL_TRANSFER');
	    gCorp.requests = [req, null];

		setReviewXmlStore(xmlDoc);
		navCachedPages["corp/common/review/com-review"] = null;
		navController.pushToView("corp/common/review/com-review", true, 'xsl');
	}  else {
        showAlertText(resp.respContent);
    }
}

//Gen review screen
function genReviewScreen() {
	var xmlDoc = createXMLDoc();
	var rootNode = createXMLNode('review', '', xmlDoc);

	var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
	createXMLNode("title", CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), xmlDoc, sectionNode);

	var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
	createXMLNode("value", CONST_STR.get("TRANS_INTERNAL_TYPE_" + gTrans.transInfo.idtxn), xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.sourceAcc, xmlDoc, rowNode);
	
	var balance = removeSpecialChar(document.getElementById('trans.sourceaccoutbalance').innerHTML);
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(balance,' VND'), xmlDoc, rowNode);
	
	sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
	createXMLNode("title", CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), xmlDoc, sectionNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.destinationAcc, xmlDoc, rowNode);

	if (gTrans.transType == "T12") {
		rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION_TITLE'), xmlDoc, rowNode);
		createXMLNode("value", gTrans.transInfo.beneName.replace('&amp;','&'), xmlDoc, rowNode);
	}

	var amount = gTrans.transInfo.amountTrans;
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_AMOUNT_TITLE'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(amount,' VND'), xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_FEE'), xmlDoc, rowNode);
	createXMLNode("value", '0 VND', xmlDoc, rowNode);

	var balanceCont = balance - amount;
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(balanceCont,' VND'), xmlDoc, rowNode);

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_CONTENT'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.contentTrans, xmlDoc, rowNode);
	
	if (gTrans.transType == "T12") {
		rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('COM_SAVE_BENE'), xmlDoc, rowNode);
		createXMLNode("value", CONST_STR.get('TRANS_INTERNAL_SAVE_TEMPLATE_' + gTrans.transInfo.issavepayee), xmlDoc, rowNode);

		if (gTrans.transInfo.issavepayee == "TP") {
			rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
			createXMLNode("label", CONST_STR.get('TRANSFER_REMITTANCE_NAME_REVIEW'), xmlDoc, rowNode);
			createXMLNode("value", gTrans.transInfo.sampleName, xmlDoc, rowNode);
		}
	}

	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
	createXMLNode("value", document.getElementById('id.notifyTo').value, xmlDoc, rowNode);

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

function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccent(field.value);
	field.value = field.value.replace(/[!"#$%&*'\+:;<=>?\\`^~{|}]/g, '');
  }
}