var tempBankArr  = new Array();
var tempBankCodeArr  = new Array();
var lstbankArr = new Array();
var desName;
var temp_type = "0";

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
			
			 var tmp = {};
			if (gTrans.dti) {
				tmp = JSON.parse(JSON.stringify(gTrans.dti));
			}
	
			gTrans.dti = {
				idtxn: "T21"
			};
	
			gTrans.dti.citadCode = tmp.citadCode;
			//Init variable
			gTrans.transType = "T21"; //Default transfer to another
			gTrans.saveSampleStatus = "N"; //Default not save sample name
			gTrans.transInfo = {};
			gTrans.accName = "";

			//updateView();

			
			gTrans.dti.feeId = "N";
			loadInitData();
		}
		//Get init data when load screen

		gTrans.isBack = false;
	} catch (er) {
		gotoHomePage();
	}
	gTrans.templateId = null;
	
	var list = gTrans.listSourceAccounts;				
	for (var i in list) {
		var account = list[i];
		if (account.ghiNo == 'N') {
			document.getElementById('id-trans-local').innerHTML= account.account;
			break;
		}
	}
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
	var cbxText = (gUserInfo.lang == 'EN')? ['Transfer to card number','Transfer to account number']: ['Chuyển tiền nhanh qua số thẻ','Chuyển tiền nhanh qua số tài khoản'];
	addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	showDialogList(CONST_STR.get('TRANS_CARD_DIALOG_TITLE_TRANSTYPE'), cbxText, ['T19','T21'], false);
}

//Action when select a transfer type
function handleSelectTransType(e) {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	if(e.selectedValue2 == "T21"){
		gTrans.transType = e.selectedValue2;
		document.getElementById("id-trans-local").value = e.selectedValue1;
	}
	if(e.selectedValue2 == "T19"){
		navController.initWithRootView('corp/transfer/card/transfer-card-create-scr', true, 'xsl');
	}	
}

//Action when close transfer type combobox
function handleCloseTransTypeCbx() {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
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
	removeEventListenerToCombobox(handleInputMNG, handleInputMNGClose);
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

/*
function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccentinfo(field.value);
  }
}
*/
//Action click to change source account
function showAccountSelection() {
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

function handleSelectionAccountList(e) {
	removeEventListenerToCombobox(handleSelectionAccountList, handleSelectionAccountListClose);	
	document.getElementById("id.accountno").value = e.selectedValue1;
	document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + e.selectedValue2;
}

//Action when close list source account combobox
function handleSelectionAccountListClose(e) {
	removeEventListenerToCombobox(handleSelectionAccountList, handleSelectionAccountListClose);
}


//Get init data when load screen
function loadInitData() {
	var jsonData = new Object();
	jsonData.sequence_id = "1";
	jsonData.idtxn = gTrans.transType;
	var templateId = "";
	if (gTrans.templateId != null && gTrans.templateId != "") {
		templateId = gTrans.templateId
	}
	jsonData.templateId = templateId;
	var args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_ACCOUNT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0,
		function (data) {
			var resp = JSON.parse(data);
			if (resp.respCode == 0) {
				gTrans.sendMethod = resp.respJsonObj.sendMethod;
				gTrans.listSourceAccounts = resp.respJsonObj.listSourceAccounts;
				gTrans.limit = resp.respJsonObj.limit;
				lstbankArr = resp.respJsonObj.lst_bank;
				fillSendMethod();
				genXmlBank();

				setdefAcc();

				if (resp.respJsonObj.templateInfo) {
					gTrans.templateInfo = resp.respJsonObj.templateInfo[0];
					temp_type = "1";
					fillTemplateData();
				}
			}
		},
		function () {
			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
			gotoHomePage();
		}
	);


}

//Action when click continue
function sendJSONRequest () {

	//Set data to object
	gTrans.transInfo.sourceAcc = document.getElementById("id.accountno").value;
	gTrans.transInfo.idtxn = gTrans.transType;
	gTrans.transInfo.destinationAcc = document.getElementById("trans.targetaccount").value;
	gTrans.transInfo.beneName = "";
	gTrans.transInfo.amountTrans = removeSpecialChar(document.getElementById("trans.amount").value);
	gTrans.transInfo.contentTrans = document.getElementById("trans.content").value.replace(/[!"#@$%&'\+:;*\(\)<=>?\\`^~{|}]/g, '');
	gTrans.transInfo.issavepayee = gTrans.saveSampleStatus;
	gTrans.transInfo.sampleName = document.getElementById("id.sample.name").value;
	gTrans.transInfo.desBranchCode = "";
	//gTrans.transInfo.idDesBank = gTrans.dti.bankCode.replace(",","");
	gTrans.transInfo.chargeincl = gTrans.dti.feeId;
	//Validate
	if (!validate()) return;

	var jsonData = new Object();
	jsonData.sequence_id = "2";
	jsonData.idtxn = gTrans.transType;
	jsonData.transInfo = gTrans.transInfo;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_ACCOUNT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0, requestMBServiceSuccess,
		function(){
			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
		}
	);
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

	//tai khoan nhan va chuyen trung nhau
	if (gTrans.transType == "T21") {
		if (gTrans.transInfo.sourceAcc.substring(0, 8).indexOf(gTrans.transInfo.destinationAcc.substring(0, 8)) != -1) {
			showAlertText(CONST_STR.get('TRANSFER_ERROR_MENU_ACCOUNT_MESSGASE'));
			return;
		}
	}

	//tai khoan nhan hop le hay khong
	/*if (gTrans.transType == "T21") {
		if(gTrans.transInfo.beneName == '') {
			showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_DES_ACC'));
			return false;
		}
	}*/


	/*
	if (gTrans.transType == "T11") {
		if (gTrans.transInfo.sourceAcc == gTrans.transInfo.destinationAcc) {
			showAlertText(CONST_STR.get('TRANSFER_ERROR_EQUAL_MSG2'));
			return;
		}
	}*/
	
/*	if(desAccName.indexOf('&') >= 0)
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
	
	// so tien > 50 trieu
	if (parseInt(gTrans.transInfo.amountTrans -  CONST_LIMIT_TRANS_TPBANK_MAX) > 0 ){
		showAlertText(CONST_STR.get('TRANS_CARD_ACC_ERR_EXCEED_50mil'));
		return false;
	}

	//kiểm tra hạn mức lần
	if (parseInt( gTrans.transInfo.amountTrans) > parseInt(gTrans.limit.limitTime)){
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(gTrans.limit.limitTime)]));
		return false;
	}

	//kiểm tra hạn mức ngày
	if (parseInt(gTrans.limit.totalDay) + parseInt(gTrans.transInfo.amountTrans) > parseInt(gTrans.limit.limitDay)){
		showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(gTrans.limit.limitDay)]));
		return false;
	}
	
	//noi dung rong
	if (gTrans.transInfo.contentTrans=="") {
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

/*	if (gTrans.transType == "T21") {
		//validate han muc
		if (parseInt(gTrans.transInfo.amountTrans) > parseInt(gTrans.limit.limitTime)) {
			showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(gTrans.limit.limitTime)]));
			return false;
		}
		if ((parseInt(gTrans.limit.totalDay) + parseInt(gTrans.transInfo.amountTrans)) > parseInt(gTrans.limit.limitDay)) {
			showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(gTrans.limit.limitDay)]));
			return false;
		}
	}*/

	return true;
}

//Action when request init trans success
function requestMBServiceSuccess(data) {
	var resp = JSON.parse(data);
	if (resp.respCode == 0 ) {
		gTrans.transInfo.benName =  resp.respJsonObj.benName;
		gTrans.transInfo.fee =  resp.respJsonObj.fee;
		var xmlDoc = genReviewScreen();
		
		//desName = resp.respJsonObj.benName;
		desName = "";
		//Set request for result step
		var req = {
			sequence_id : "3",
			idtxn : gTrans.transType,
			transId : resp.respJsonObj.returnJson[0].MA_GD,
			issavepayee : resp.respJsonObj.issavepayee,
			sampleName : resp.respJsonObj.sampleName
		};
		gCorp.cmdType = CONSTANTS.get('CMD_CO_TRANS_ACCOUNT');
	    gCorp.requests = [req, null];

		setReviewXmlStore(xmlDoc);
		navCachedPages["corp/common/review/com-review"] = null;
		navController.pushToView("corp/common/review/com-review", true, 'xsl'); 
	} else if (resp.respCode == 39) {
        showAlertText(CONST_STR.get("TRANS_CARD_ERR_INVALID_NUMBER"));
    } else if (resp.respCode == 38) {
        showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
    } else if (resp.respCode == 37) {
        showAlertText(CONST_STR.get("CORP_MSG_FEE_GREATER_AMOUNT"));
	} else if (resp.respCode == 1) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_01"));
	} else if (resp.respCode == 3) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_03"));
	} else if (resp.respCode == 5) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_05"));
	} else if (resp.respCode == 12) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_12"));
	} else if (resp.respCode == 13) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_13"));
	} else if (resp.respCode == 14) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_14"));
	} else if (resp.respCode == 15) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_15"));
	} else if (resp.respCode == 30) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_30"));
	} else if (resp.respCode == 32) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_32"));
	} else if (resp.respCode == 36) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_36"));
	} else if (resp.respCode == 41) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_41"));
	} else if (resp.respCode == 51) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_51"));
	} else if (resp.respCode == 54) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_54"));
	} else if (resp.respCode == 55) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_55"));
	
	} else if (resp.respCode == 63) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_63"));
	} else if (resp.respCode == 67) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_67"));
	} else if (resp.respCode == 68) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_68"));
	} else if (resp.respCode == 69) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_69"));
	} else if (resp.respCode == 90) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_90"));
	} else if (resp.respCode == 96) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_96"));
	} else if (resp.respCode == 48) {
        showAlertText(CONST_STR.get("TRANFER_ACC_FAST_48"));
    } else {
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
	createXMLNode("value", CONST_STR.get('TRANS_ACC_TRANSTYPE'), xmlDoc, rowNode);

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
	createXMLNode("label", CONST_STR.get('TRANS_ACC_REVIEW_DESTACC'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.destinationAcc, xmlDoc, rowNode);
/*
	if (gTrans.transType == "T12") {
		rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
		createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION_TITLE'), xmlDoc, rowNode);
		createXMLNode("value", gTrans.transInfo.beneName, xmlDoc, rowNode);
	}
*/
	
	// ten nguoi nhan
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_CARD_RECEIVER'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.benName, xmlDoc, rowNode);
	
	// ngan hang nhan
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_ACC_REVIEW_BANK'), xmlDoc, rowNode);
	createXMLNode("value",  gTrans.dti.bankName , xmlDoc, rowNode);
	
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
	//endhoadh
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), xmlDoc, rowNode);
	createXMLNode("value", formatNumberToCurrencyWithSymbol(balanceCont,' VND'), xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANSFER_FEE_PAYER'), xmlDoc, rowNode);
	createXMLNode("value", document.getElementById("trans.fee").value, xmlDoc, rowNode);
	
	rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
	createXMLNode("label", CONST_STR.get('TRANS_LOCAL_ACC_CONTENT'), xmlDoc, rowNode);
	createXMLNode("value", gTrans.transInfo.contentTrans, xmlDoc, rowNode);
	
	if (gTrans.transType == "T21") {
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
    field.value = removeAccentinfo(field.value);
	field.value = field.value.replace(/[!"#@$%&'\+:;<=>?\\`^~{|}]/g, '');
  }
}

function genXmlBank(){
	var tmpArr;
	for(var i=0;i<lstbankArr.length;i++){
		//tmpArr = lstbankArr[i].split('#');
		//tempBankArr.push(lstbankArr[i].bank_name +" - "+lstbankArr[i].bank_code);
		tempBankArr.push(lstbankArr[i].bank_name);
		tempBankCodeArr.push(lstbankArr[i].bank_code)
	}
}

function showBankName(){
	document.addEventListener("evtSelectionDialog", handleBankName, false);
	showDialogList(CONST_STR.get('TRANS_BANKS_LIST'), tempBankArr, true);
}

function handleBankName(){
	if(currentPage == "corp/transfer/transfer-local-create-scr"){
		document.removeEventListener("evtSelectionDialog", handleBankName, false);
		
	}
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


// show chon ngan hang
/*function showBankSelection() {
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
*/

function showBankSelection(){
	document.addEventListener("evtSelectionDialog", handleBankSelection, false);
	document.addEventListener("evtSelectionDialogClose", handleBankSelectionClose, false);
	showDialogList(CONST_STR.get('TRANS_BANKS_LIST'), tempBankArr,tempBankCodeArr, false);
}

function handleBankSelection(e){
	removeEventListenerToCombobox(handleBankSelection, handleBankSelectionClose);
	if(currentPage == "corp/transfer/account/transfer-account-create-scr"){
		document.removeEventListener("evtSelectionDialog", handleBankSelection, false);
		document.getElementById("trans.branchName").value = e.selectedValue1;
		gTrans.dti.bankName = e.selectedValue1;
		gTrans.dti.bankCode = e.selectedValue2;
		gTrans.transInfo.idDesBank = gTrans.dti.bankCode.replace(",","");
	}
}

//Action when close list source account combobox
function handleBankSelectionClose(e) {
	removeEventListenerToCombobox(handleBankSelection, handleBankSelectionClose);
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
	handleSelectionFeeClose();
	removeEventListenerToCombobox(handleSelectionFee, handleSelectionFeeClose);
	if(type == "1"){
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById("trans.fee").value = e.selectedValue1;
			gTrans.dti.feeType = e.selectedValue1;
		}
		if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
			 gTrans.dti.feeId = e.selectedValue2;
		}
		type="0";
	}
}

//Action when close list source account combobox
function handleSelectionFeeClose(e) {
	removeEventListenerToCombobox(handleSelectionFee, handleSelectionFeeClose);
}



//--------------------------------------------------- event chon nguoi thu huong, mau thu huong --------------------------------------------------------------

//Action when click destination account ()
function showPayeePage() {
	gTrans.showDialogCorp = true;
	document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
	document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
	document.addEventListener("tabChange", tabChanged, false);
	document.addEventListener("onInputSelected", okSelected, false);	
	
	gTrans.dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TH', CONST_PAYEE_LOCAL_TRANSFER);
	gTrans.dialog.USERID = gCustomerNo;
    gTrans.dialog.PAYNENAME = "4";
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
	jsonData.sequence_id = "4";
	jsonData.templateId = beneId;
	jsonData.idtxn = gTrans.transType;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_TRANS_ACCOUNT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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
			document.getElementById("id.accountno").value = obj.SOURCE_ACC;
		}
		
		//HIEN THI SO DU CUA TAI KHOAN NGUON    
		var newBalance = getBalanceByAccNo(obj.SOURCE_ACC);
		if (newBalance != null && newBalance != undefined) {
			var balanceAcct = document.getElementById("trans.sourceaccoutbalance");
			balanceAcct.innerHTML =  CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(newBalance) + " VND";
		}
		
		//document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + formatNumberToCurrency(obj.SO_DU) + " " + obj.DV_TIEN;
		document.getElementById("trans.targetaccount").value = obj.BENE_ACCTNO;
		//document.getElementById("trans.targetaccountname").innerHTML = obj.NGUOI_THU_HUONG;
		
		document.getElementById("trans.branchName").value = getBankNameByBankCode(obj.BANK_CODE.replace(",","")); 
		gTrans.dti.bankName = getBankNameByBankCode(obj.BANK_CODE.replace(",","")); 
		gTrans.transInfo.idDesBank = obj.BANK_CODE.replace(",","");	
		if(temp_type == "1"){
			document.getElementById("trans.amount").value = formatNumberToCurrency(obj.NUMAMOUNT);
			document.getElementById("trans.amounttotext").innerHTML = convertNum2WordWithLang(keepOnlyNumber(obj.NUMAMOUNT), gUserInfo.lang);
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
		gTrans.dialog.PAYNENAME = "4";
		gTrans.dialog.TYPETEMPLATE = "0";
		gTrans.dialog.requestData(node.id);
	}
	if (node.id == 'tab2'){			
		gTrans.dialog.activeDataOnTab('tab2');
		gTrans.dialog.USERID = gCustomerNo;
		gTrans.dialog.PAYNENAME = "4";
		gTrans.dialog.TYPETEMPLATE = "1";
		gTrans.dialog.requestData(node.id);
	}	
}

//Action when finish input value in tabbox dialog
function okSelected(e){
	handleInputPayeeAccClose();
	if ((e.selectedValue != undefined) &&(e.selectedValue != null) && (e.selectedValue.length>0)){
		document.getElementById("trans.targetaccount").value = e.selectedValue;
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
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_CARD_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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

function getBalanceByAccNo(accNo) {
    for (var i = 0; i < gUserInfo.accountList.length; i++) {
        var account = gUserInfo.accountList[i];
        if (accNo == account.accountNumber) {
            return gUserInfo.accountList[i].balanceAvailable;
        }
    }
    return '0';
}

function getBankNameByBankCode(bankCode) {
    for (var i = 0; i < lstbankArr.length; i++) {
        var bank = lstbankArr[i];
        if (bankCode == bank.bank_code.replace(',','')) {
            return bank.bank_name;
        }
    }
    return '0';
}
