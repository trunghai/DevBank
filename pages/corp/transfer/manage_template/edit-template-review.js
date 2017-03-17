function loadInitXML() {
    return getReviewXmlStore();
}

var tType = "";
var temp_type = "";
var tempBankArr  = new Array();
var tempBankCodeArr  = new Array();
var lstbankArr = new Array();


gTrans.redirect = 'corp/transfer/manage_template/edit-template-review';

function viewBackFromOther() {
	gTrans.viewBack = true;
}

function viewDidLoadSuccess() {
    gTrans.editTemp.srcAccount = document.getElementById('id.value.srcAccount');
    gTrans.editTemp.desAccount = document.getElementById('trans.destaccountnointer');
    gTrans.editTemp.beneName = document.getElementById('id.value.beneName');
    gTrans.editTemp.numamount = document.getElementById('id.value.numamount');
    gTrans.editTemp.content = document.getElementById('trans.content');
	if(gTrans.template.idtxn == "T20"){
		gTrans.editTemp.issuedDate = document.getElementById('id.value.issuedTime');
		gTrans.editTemp.issuedPlace = document.getElementById('id.value.issuedPlace');
		gTrans.editTemp.phone = document.getElementById('id.value.phone');
	}
    if (gTrans.viewBack == undefined || !gTrans.viewBack) {
        gTrans.editTemp.bankCode = gTrans.template.bankCode;
        gTrans.editTemp.bankName = gTrans.template.bankName;
        gTrans.editTemp.sortCode = gTrans.template.sortCode;
        gTrans.editTemp.branchName = gTrans.template.branchName;
		if(gTrans.template.idtxn == "T20"){
			/*gTrans.editTemp.issuedDate = gTrans.template.issuedDate;
			gTrans.editTemp.issuedPlace = gTrans.template.issuedPlace;
			gTrans.editTemp.phone = gTrans.template.phone;*/
			if(gTrans.template.issuedDate != null && gTrans.template.issuedDate != "" && gTrans.template.issuedDate !== undefined){
				document.getElementById('id.value.issuedTime').value = gTrans.template.issuedDate;
				document.getElementById('id.value.issuedPlace').value = gTrans.template.issuedPlace;
				document.getElementById('id.value.phone').value = gTrans.template.phone;
			}
		}
		if(gTrans.template.sourceAccount != null) {
			gTrans.editTemp.srcAccount.value = gTrans.template.sourceAccount;
		} else {
        	gTrans.editTemp.srcAccount.value = gUserInfo.accountList[0].accountNumber;
		}
    }	
	
	//Tooltip when hover book
    document.getElementById("ds_id").innerHTML = CONST_STR.get('TRANSFER_DS_THUHUONG');
    document.getElementById("mau_id").innerHTML = CONST_STR.get('TRANSFER_MAU_THUHUONG');
	
	tType =	gTrans.editTemp.transType ;	
	
    /*var readAmount = convertNum2WordWithLang(keepOnlyNumber(gTrans.editTemp.numamount.value), gUserInfo.lang);
    document.getElementById("trans.amounttotext").innerHTML = readAmount;*/
    gTrans.editTemp.valid = false;
    gTrans.viewBack = false;
	 // tao calendar
    createDatePicker('id.value.issuedTime', 'span.issuedate');
}

// Show list tai khoan chuyen 
function showSourceAccount() {
    var arrAccount = [];
    var arrAmount = [];
    for (var i = 0; i < gUserInfo.accountList.length; i++) {
        var tmpAcc = gUserInfo.accountList[i];
        arrAccount.push(tmpAcc.accountNumber);
        arrAmount.push(formatNumberToCurrency(tmpAcc.balanceAvailable));
    }

    document.addEventListener("evtSelectionDialog", handleShowTransType, false);
    document.addEventListener("evtSelectionDialogClose", handleShowTransTypeClose, false);
    showDialogList(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), arrAccount, arrAmount, true);
}

function handleShowTransType(e) {
    if (currentPage == "corp/transfer/manage_template/edit-template-review") {
        document.removeEventListener("evtSelectionDialog", handleShowTransType, false);

        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
            gTrans.editTemp.srcAccount.value = e.selectedValue1;
        }
    }
}

// show tai khoan nhan
function showPayeePage() {
    gTrans.showDialogCorp = true;
    document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
    document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
    document.addEventListener("tabChange", tabChanged, false);
    document.addEventListener("onInputSelected", okSelected, false);
    var branchName = document.getElementById("id.value.branchName");
    //Tao dialog
    dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TH', CONST_PAYEE_INTER_TRANSFER);
    dialog.USERID = gCustomerNo;
	if(tType == "T20"){
		dialog.PAYNENAME = "3";	
	} else if(tType == "T21"){
		dialog.PAYNENAME = "4";	
	} else if(tType == "T19"){
		dialog.PAYNENAME = "2";	
	} else {
		if (branchName == undefined || branchName == null) {
			dialog.PAYNENAME = "0"; // chuyen tien trong TPBank
		} else {
			dialog.PAYNENAME = "1"; // chuyen tien lien ngan hang
		}
	}
    dialog.TYPETEMPLATE = "0"; // typetemplate  = 0 la nguoi thu huong || 1 la mau thu huong
    dialog.showDialog(callbackShowDialogSuccessed, '');
}

// selection a destination account
function handleInputPayeeAccOpen(e) {
    if (currentPage == "corp/transfer/manage_template/edit-template-review") {
        handleInputPayeeAccClose();
        if (e.tabSelected == 'tab1') {
            var obj = e.dataObject;

            gTrans.editTemp.desAccount.value = obj.customerNo;
            if (gTrans.editTemp.beneName != undefined && gTrans.editTemp.beneName != null){
				gTrans.editTemp.beneName.value = obj.peopleName;
			}
            var branchName = document.getElementById("id.value.branchName");
            if (branchName != undefined || branchName != null) {
                branchName.value = obj.partnerName;
                gTrans.editTemp.bankCode = obj.partnerCode;
                gTrans.editTemp.sortCode = obj.citadCode;
                gTrans.editTemp.branchCode = obj.branchCode;
            }

			if(tType == "T20" || tType == "T21" || tType == "T19"){
				gTrans.template.beneId = obj.beneId;
				loadSampleBenSelected(obj.beneId);
			}

        } else {
            var obj = e.dataObject;
			/*if(tType != "T20"){
				if (obj != null && obj != undefined) {
					//Everything initialized    
					gTrans.editTemp.srcAccount.value = obj.tai_khoan_nguon;
					gTrans.editTemp.desAccount.value = obj.tai_khoan_dich;
					gTrans.editTemp.beneName.value = obj.ten_tai_khoan_dich;
					gTrans.editTemp.numamount.value = formatNumberToCurrency(obj.so_tien);
					gTrans.editTemp.content.value = obj.noi_dung;
					gTrans.editTemp.bankCode = obj.ma_ngan_hang_nhan;
					gTrans.editTemp.branchName = obj.cn_ngan_hang_nhan;
					gTrans.editTemp.bankName = obj.ngan_hang_nhan;
					gTrans.editTemp.sortCode = obj.ma_citad;
					gTrans.editTemp.branchCode = obj.branchCode;
					var readAmount = convertNum2WordWithLang(keepOnlyNumber(obj.so_tien), gUserInfo.lang);
					//document.getElementById("trans.amounttotext").innerHTML = readAmount;
				}
			}else{
				gTrans.template.beneId = obj.beneId;
				loadSampleSelected(obj.beneId);
			}*/
			if(tType == "T20" || tType == "T21" || tType == "T19"){
				gTrans.template.beneId = obj.beneId;
				loadSampleSelected(obj.beneId);				
			}else{				
				if (obj != null && obj != undefined) {
				//Everything initialized    
				gTrans.editTemp.srcAccount.value = obj.tai_khoan_nguon;
				gTrans.editTemp.desAccount.value = obj.tai_khoan_dich;
				gTrans.editTemp.beneName.value = obj.ten_tai_khoan_dich;
				gTrans.editTemp.numamount.value = formatNumberToCurrency(obj.so_tien);
				gTrans.editTemp.content.value = obj.noi_dung;
				gTrans.editTemp.bankCode = obj.ma_ngan_hang_nhan;
				gTrans.editTemp.branchName = obj.cn_ngan_hang_nhan;
				gTrans.editTemp.bankName = obj.ngan_hang_nhan;
				gTrans.editTemp.sortCode = obj.ma_citad;
				gTrans.editTemp.branchCode = obj.branchCode;
				var readAmount = convertNum2WordWithLang(keepOnlyNumber(obj.so_tien), gUserInfo.lang);
				//document.getElementById("trans.amounttotext").innerHTML = readAmount;
				}
			}
        }
		if(tType != "T20" && tType != "T21"){
        	loadInfoFromAccount();
		}
    }
}

function handleInputPayeeAccClose(e) {
    if (currentPage == "corp/transfer/manage_template/edit-template-review") {
        document.removeEventListener("evtSelectionDialogClose", handleInputPayeeAccClose, false);
        document.removeEventListener("evtSelectionDialog", handleInputPayeeAccOpen, false);
        document.removeEventListener("tabChange", tabChanged, false);
        document.removeEventListener("onInputSelected", okSelected, false);
    }
}

// event: change tab
function tabChanged(e) {
    if (currentPage == "corp/transfer/manage_template/edit-template-review") {
        var branchName = document.getElementById("id.value.branchName");
        gTrans.showDialogCorp = true;
        var node = e.selectedValueTab;
        if (node.id == 'tab1') {
            if (dialog != null && dialog != undefined) {
                dialog.activeDataOnTab('tab1');
                dialog.USERID = gCustomerNo;
				if(tType == "T20"){
					dialog.PAYNENAME = "3";
				}  else if(tType == "T21"){
					dialog.PAYNENAME = "4";	
				} else if(tType == "T19"){
					dialog.PAYNENAME = "2";	
				} else{
					if (branchName == undefined || branchName == null) {
						dialog.PAYNENAME = "0";
					} else {
						dialog.PAYNENAME = "1";
					}
				}
                dialog.TYPETEMPLATE = "0";
                dialog.requestData(node.id);
            }
        } else {
            if (dialog != null && dialog != undefined) {
                dialog.activeDataOnTab('tab2');
                dialog.USERID = gCustomerNo;
				if(tType == "T20"){
					dialog.PAYNENAME = "3";
				} else if(tType == "T21"){
					dialog.PAYNENAME = "4";	
				} else if(tType == "T19"){
					dialog.PAYNENAME = "2";	
				} else {
					if (branchName == undefined || branchName == null) {
						dialog.PAYNENAME = "0";
					} else {
						dialog.PAYNENAME = "1";
					}
				}
                dialog.TYPETEMPLATE = "1";
                dialog.requestData(node.id);
            }
        }

    }
}

// event: click ok button
function okSelected(e) {
    if (currentPage == "corp/transfer/manage_template/edit-template-review") {
        handleInputPayeeAccClose();
        var destinationAcc = document.getElementById("trans.destaccountnointer");
        if ((e.selectedValue != undefined) && (e.selectedValue != null) && (e.selectedValue.length > 0)) {
            destinationAcc.value = e.selectedValue;
        }
    }
}

function callbackShowDialogSuccessed(node) {}

// show chon ngan hang
function showListBankDomestic() {
	gTrans.viewBack = true;
    navController.pushToView("corp/transfer/domestic/trans-dti-list-bank", true);
    document.addEventListener("evtSelectedBranch", handleInputBankBranch, false);
}

function handleInputBankBranch(e) {
    document.removeEventListener("evtSelectedBranch", handleInputBankBranch, false);
    gTrans.editTemp.bankCode = e.bankCode;
    gTrans.editTemp.bankName = e.bankName;
    gTrans.editTemp.sortCode = e.branchCode;
    gTrans.editTemp.branchName = e.branchName;
    var inputBranch = document.getElementById("id.value.branchName");
    inputBranch.value = gTrans.editTemp.branchName;
    gTrans.editTemp.viewBack = true;
}

function onAddClick() {	
	setTimeout(function() {
        console.log(request);
        if (!validateInputData()) return;	  	
    	var beneName_ = "";
		var bankCode  = "";
		if(tType == "T20"){
			gTrans.editTemp.phone = document.getElementById("id.value.phone").value;
			gTrans.editTemp.issuedTime = document.getElementById("id.value.issuedTime").value;
			gTrans.editTemp.issuedPlace = document.getElementById("id.value.issuedPlace").value;
			gTrans.editTemp.passport = document.getElementById("trans.destaccountnointer").value;
		}else {
			gTrans.editTemp.phone = "";
			gTrans.editTemp.issuedTime = "";
			gTrans.editTemp.issuedPlace = "";
			gTrans.editTemp.passport = "";
		}
		if(tType != "T21" && tType != "T19"){
			beneName_ = gTrans.editTemp.beneName.value;
		}
		if(tType != "T19"){
			bankCode = gTrans.editTemp.bankCode.replace(",","")
		}
		
        var request = {
            idtxn: "M01",
            sequenceId: 3, // 3 la them sua
            srcAccount: gTrans.editTemp.srcAccount.value,
            desAccount: gTrans.editTemp.desAccount.value,
            beneName: beneName_,
            numamount: removeSpecialChar(gTrans.editTemp.numamount.value),
            content: gTrans.editTemp.content.value,
            bankCode: bankCode,
            sortCode: gTrans.editTemp.sortCode,
            beneId: gTrans.template.beneId,
			phone: gTrans.editTemp.phone,
			issuedTime: gTrans.editTemp.issuedTime,
			issuedPlace: gTrans.editTemp.issuedPlace,
			passport: gTrans.editTemp.passport,
			transType: tType
        };

        if (request.beneId == null || request.beneId == 0) {
            request.tempName = document.getElementById('id.value.tempName').value;
            request.beneId = 0; // 0 la them moi
        }

        var arrayArgs = new Array();
        arrayArgs.push("3");
        arrayArgs.push(request);

        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);

        data = getDataFromGprsCmd(gprsCmd);
		
        requestMBServiceCorp(data, true, 0, requestSaveTempSuccess, requestSaveTempFail);
	},1000);    
}

function requestSaveTempSuccess(e) {
    var response = JSON.parse(e);
	if(response.respCode == 0) {
		gTrans.editTemp.valid = true;
	} else {
		gTrans.editTemp.valid = false;	
	}
    showAlertText(response.respContent);
    searchTransTemps();
	
}

function requestSaveTempFail() {}

function onCancelClick() {
    navController.initWithRootView('corp/transfer/manage_template/manage_trans_temp', true, 'xsl');
}

// dong alert
function closealert() {
    var alertdg = document.getElementById("alert-info-dialog");
    alertdg.style.opacity = 0;
    setTimeout(function() {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    if (gTrans.editTemp.valid) {
        document.dispatchEvent(evt);
        navController.initWithRootView('corp/transfer/manage_template/manage_trans_temp', true, 'xsl');
    }
}

function onResetClick() {
	//gTrans.editTemp.srcAccount.value = "";
	gTrans.editTemp.desAccount.value = "";
	gTrans.editTemp.beneName.value = "";
	gTrans.editTemp.numamount.value = "";
	gTrans.editTemp.content.value = "";
	gTrans.editTemp.bankCode = "";
	gTrans.editTemp.bankName = "";
	gTrans.editTemp.sortCode = "";
	gTrans.editTemp.branchName = "";
	document.getElementById('id.value.tempName').value = "";
	if(document.getElementById("id.value.branchName") !== undefined && document.getElementById("id.value.branchName") != null){
		document.getElementById("id.value.branchName").value = "Chọn";
	}
	navController.resetAll();
	navController.initWithRootView('corp/transfer/manage_template/edit-template-review', true, 'xsl');
}

function loadInfoFromAccount() {	
	if(tType != "T20" && tType != "T21" && tType != "T19"){
		gTrans.editTemp.desAccountTemp = document.getElementById("trans.destaccountnointer").value;
		var jsonData = new Object();
		jsonData.sequence_id = "3";
		jsonData.idtxn = "T12";
		jsonData.accountId = gTrans.editTemp.desAccount.value;
		var args = new Array();
		args.push(null);
		args.push(jsonData);
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
		var data = getDataFromGprsCmd(gprsCmd);
		requestMBServiceCorp(data, true, 0,
			function(data) {
				var resp = JSON.parse(data);
				if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
					gTrans.editTemp.beneName.value = resp.respJsonObj[0].TEN_TK;				
				} else {
					gTrans.editTemp.beneName.value = "";
				}
				/*if (gTrans.editTemp.clicked) {
						setTimeout(function() {
							onAddClick();
							}, 1000);
					}*/
			},
			function() {
				gTrans.editTemp.beneName.value = "";
			}
		);
	}
}

//Format currency and pronounce to Vietnamese
function handleInputAmount(e, des) {
    var tmpVale = des.value;
    formatCurrency(e, des);
    var numStr = convertNum2WordWithLang(keepOnlyNumber(tmpVale), gUserInfo.lang);
//    document.getElementById("trans.amounttotext").innerHTML = numStr;
}

function validateInputData() {
	gTrans.editTemp.desAccountTemp = document.getElementById("trans.destaccountnointer").value;
	if(tType == "T20"){		
		gTrans.editTemp.phone = document.getElementById("id.value.phone").value;
		gTrans.editTemp.issuedTime = document.getElementById("id.value.issuedTime").value;
		gTrans.editTemp.issuedPlace = document.getElementById("id.value.issuedPlace").value;
		
		if(gTrans.editTemp.desAccountTemp == null || gTrans.editTemp.desAccountTemp == ""){
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("IDENTIFICATION_NUMBER")]));
			document.getElementById("trans.destaccountnointer").focus();
			gTrans.editTemp.valid = false;
			return false;
		}		
		if(gTrans.editTemp.beneName.value == null || gTrans.editTemp.beneName.value == ""){
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("IDENTIFICATION_RECEIVER_NAME")]));
			document.getElementById("id.value.beneName").focus();
			gTrans.editTemp.valid = false;
			return false;
		}
		if(gTrans.editTemp.issuedTime == null || gTrans.editTemp.issuedTime == ""){
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("IDENTIFICATION_TIME")]));
			document.getElementById("id.value.issuedTime").focus();
			gTrans.editTemp.valid = false;
			return false;
		}
		if(gTrans.editTemp.issuedPlace == null || gTrans.editTemp.issuedPlace == ""){
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("IDENTIFICATION_PLACE")]));
			document.getElementById("id.value.issuedPlace").focus();
			gTrans.editTemp.valid = false;
			return false;
		}
	}
	
   /* console.log("gTrans.editTemp.srcAccount.value", gTrans.editTemp.srcAccount.value);
    console.log("gTrans.editTemp.desAccount.value", gTrans.editTemp.desAccount.value);
    console.log("gTrans.editTemp.beneName.value", gTrans.editTemp.beneName.value);
    console.log("gTrans.editTemp.srcAccount.value", gTrans.editTemp.srcAccount.value);*/
	
    if (gTrans.template.beneId == null || gTrans.template.beneId == 0) {
		// truong hop them moi
		// check name 
        var tempName = document.getElementById('id.value.tempName');
        if (tempName == null || tempName.value.length == 0) {
            showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("MANAGE_TEMPLATE_TRANS_NAME")]));
            tempName.focus();
			gTrans.editTemp.valid = false;
            return false;
        }
    } 
    if (gTrans.editTemp.srcAccount.value == null || gTrans.editTemp.srcAccount.value.length == 0) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_BATCH_ACC_LABEL")]));
        gTrans.editTemp.srcAccount.focus();
		gTrans.editTemp.valid = false;
        return false;
    }else 
    if (gTrans.editTemp.desAccount.value == null || gTrans.editTemp.desAccount.value.length == 0) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ACCOUNT_DEST")]));
        gTrans.editTemp.desAccount.focus();
		gTrans.editTemp.valid = false;
        return false;
    }else 
	if (gTrans.editTemp.desAccountTemp != gTrans.editTemp.desAccount.value) {
		showAlertText(CONST_STR.get("COM_INVALID_DES_ACCOUNT"));
        gTrans.editTemp.desAccount.focus();
		gTrans.editTemp.valid = false;
        return false;
	}
	if(tType != "T21" && tType != "T19") {
		if (gTrans.editTemp.beneName.value == null || gTrans.editTemp.beneName.value.length == 0) {
			if (gTrans.isTransferDomestic == 0) {
				showAlertText(CONST_STR.get("CORP_MSG_COM_INVALID_ACCOUNT_NUMBER"));
				gTrans.editTemp.valid = false;
				return false;
			} else {
				showAlertText(CONST_STR.get("CORP_MSG_COM_INVALID_ACCOUNT_NUMBER"));
				gTrans.editTemp.beneName.focus();
				gTrans.editTemp.valid = false;
				return false;
			}
		} 	
		if ((gTrans.isTransferDomestic == 1 || tType == "T20") && (gTrans.editTemp.sortCode == undefined || gTrans.editTemp.sortCode == null)) {
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_RECEIVER_BANK_NAME")]));
			gTrans.editTemp.valid = false;
			return false;
		}
	}
	if(tType == "T21") {
		if (gTrans.editTemp.bankCode == undefined || gTrans.editTemp.bankCode == null) {
			showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_RECEIVER_BANK_NAME")]));
			gTrans.editTemp.valid = false;
			return false;
		}
	}
    if (gTrans.editTemp.numamount.value == null || gTrans.editTemp.numamount.value.length == 0) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_AMOUNT")]));
        gTrans.editTemp.numamount.focus();
		gTrans.editTemp.valid = false;
        return false;
    }else
    if (gTrans.editTemp.content.value == null || gTrans.editTemp.content.value.length == 0) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ERROR_DESC")]));
        gTrans.editTemp.content.focus();
		gTrans.editTemp.valid = false;
        return false;
    }else{
    	gTrans.editTemp.valid = true;
	}
    return true;
}

function controlInputText(field, maxlen, enableUnicode) {
     field.value = field.value.replace(/[\[\]&]+/g, '');
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccentinfo(field.value);
		field.value = field.value.replace(/[!"#@$%&'\+:;<=>?\\`^~{|}]/g, '');
    }
}


//Load sample template
function loadSampleSelected(beneId) {
	var jsonData = new Object();
	jsonData.sequenceId = "2";
	jsonData.templateId = beneId;
	jsonData.idtxn = "M01";
	jsonData.beneId = beneId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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
		if (obj.SOURCE_ACC) {
			document.getElementById("id.value.srcAccount").value = obj.SOURCE_ACC;
		}		
		
		//HIEN THI SO DU CUA TAI KHOAN NGUON    
		//var newBalance = getBalanceByAccNo(obj.SOURCE_ACC);
//		if (newBalance != null && newBalance != undefined) {
//			var balanceAcct = document.getElementById("trans.sourceaccoutbalance");
//			balanceAcct.innerHTML = CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(newBalance) + " VND" ;
//		}
		
		//document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + formatNumberToCurrency(obj.SO_DU) + " " + obj.DV_TIEN;
		if(tType =="T20"){
			document.getElementById("trans.destaccountnointer").value = obj.PASSPORT; 	// so cmtnd		
			document.getElementById("id.value.beneName").value = obj.BENE_NAME;	// ten thu huong
			// ngay cap va noi cap
			document.getElementById("id.value.issuedTime").value = obj.DATISSUE;
			document.getElementById("id.value.issuedPlace").value = obj.PLACEISSUE;			
			
			document.getElementById("id.value.phone").value = obj.PHONENUMBER; // so dien thoai		
			document.getElementById("id.value.branchName").value = obj.BANK_NAME + '-' + obj.BRANCH_NAME; // ngan hang nhan
		}
		if(tType =="T21"){
			document.getElementById("trans.destaccountnointer").value = obj.BENE_ACCTNO;
			document.getElementById("trans.branchName").value = obj.BANK_NAME; // ngan hang nhan
		}
		if(tType =="T19"){
			document.getElementById("trans.destaccountnointer").value = obj.BENE_ACCTNO;
		}		
		
		if(obj.SORTCODE != null && obj.SORTCODE != ""){
			gTrans.editTemp.citadCode = obj.SORTCODE;
		}
		if(tType !="T19"){
			gTrans.editTemp.bankCode = obj.BANK_CODE;
			gTrans.editTemp.bankName = obj.BANK_NAME;
			gTrans.editTemp.branchName = obj.BRANCH_NAME;
		}
						
		document.getElementById("id.value.numamount").value = formatNumberToCurrency(obj.NUMAMOUNT);
		//document.getElementById("trans.amounttotext").value = convertNum2WordWithLang(keepOnlyNumber(obj.NUMAMOUNT), gUserInfo.lang);
		document.getElementById("trans.content").value = obj.MSG.replace(/[!"#$@%&'\+:;<=>?\\`^~{|}]/g, '');;
	}
}

//Load sample template
function loadSampleBenSelected(beneId) {
	var jsonData = new Object();
	jsonData.sequenceId = "2";
	jsonData.templateId = beneId;
	jsonData.idtxn = "M01";
	jsonData.beneId = beneId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, true, 0,
		function(data) {
			var resp = JSON.parse(data);
			var sendMethod = resp.respJsonObj.sendMethod;
			if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
				gTrans.templateInfo = resp.respJsonObj[0];
				fillTemplateBenData();
			}
		}
	);
}

//Điền dữ liệu mẫu chuyển tiền lên giao diện
function fillTemplateBenData() {
	var obj = gTrans.templateInfo;
	if (typeof obj != "undefined" && obj != null) {
		if (obj.SOURCE_ACC) {
			document.getElementById("id.value.srcAccount").value = obj.SOURCE_ACC;
		}

		//HIEN THI SO DU CUA TAI KHOAN NGUON
		//var newBalance = getBalanceByAccNo(obj.SOURCE_ACC);
//		if (newBalance != null && newBalance != undefined) {
//			var balanceAcct = document.getElementById("trans.sourceaccoutbalance");
//			balanceAcct.innerHTML = CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(newBalance) + " VND" ;
//		}

		//document.getElementById("trans.sourceaccoutbalance").innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + formatNumberToCurrency(obj.SO_DU) + " " + obj.DV_TIEN;
		if(tType =="T20"){
			document.getElementById("trans.destaccountnointer").value = obj.PASSPORT; 	// so cmtnd
			document.getElementById("id.value.beneName").value = obj.BENE_NAME;	// ten thu huong
			// ngay cap va noi cap
			document.getElementById("id.value.issuedTime").value = obj.DATISSUE;
			document.getElementById("id.value.issuedPlace").value = obj.PLACEISSUE;

			document.getElementById("id.value.phone").value = obj.PHONENUMBER; // so dien thoai
			document.getElementById("id.value.branchName").value = obj.BANK_NAME + '-' + obj.BRANCH_NAME; // ngan hang nhan
		}
		if(tType =="T21"){
			document.getElementById("trans.destaccountnointer").value = obj.BENE_ACCTNO;
			document.getElementById("trans.branchName").value = obj.BANK_NAME; // ngan hang nhan
		}
		if(tType =="T19"){
			document.getElementById("trans.destaccountnointer").value = obj.BENE_ACCTNO;
		}

		if(obj.SORTCODE != null && obj.SORTCODE != ""){
			gTrans.editTemp.citadCode = obj.SORTCODE;
		}
		if(tType !="T19"){
			gTrans.editTemp.bankCode = obj.BANK_CODE;
			gTrans.editTemp.bankName = obj.BANK_NAME;
			gTrans.editTemp.branchName = obj.BRANCH_NAME;
		}

		// document.getElementById("id.value.numamount").value = formatNumberToCurrency(obj.NUMAMOUNT);
		// //document.getElementById("trans.amounttotext").value = convertNum2WordWithLang(keepOnlyNumber(obj.NUMAMOUNT), gUserInfo.lang);
		// document.getElementById("trans.content").value = obj.MSG.replace(/[!"#$@%&'\+:;<=>?\\`^~{|}]/g, '');;
	}
}

function showBankSelection(){
	if(tType == "T21" && lstbankArr.length == 0){
		getBankListForAT();		// lay danh sach ngan hang cho chuyen tien qua so tai khoan
	}
	if(tempBankArr.length == 0 && tempBankCodeArr.length == 0){
		genXmlBank();
	}
	
	document.addEventListener("evtSelectionDialog", handleBankSelection, false);
	document.addEventListener("evtSelectionDialogClose", handleBankSelectionClose, false);
	showDialogList(CONST_STR.get('TRANS_BANKS_LIST'), tempBankArr,tempBankCodeArr, false);
}

function handleBankSelection(e){
	removeEventListenerToCombobox(handleBankSelection, handleBankSelectionClose);
	
	document.removeEventListener("evtSelectionDialog", handleBankSelection, false);
	document.getElementById("trans.branchName").value = e.selectedValue1;
	gTrans.editTemp.bankName = e.selectedValue1;
	gTrans.editTemp.bankCode = e.selectedValue2;
	gTrans.editTemp.sortCode = "";
	//gTrans.transInfo.idDesBank = gTrans.dti.bankCode.replace(",","");
	
}

//Action when close list source account combobox
function handleBankSelectionClose(e) {
	removeEventListenerToCombobox(handleBankSelection, handleBankSelectionClose);
}

//Get init data when load screen
function getBankListForAT() { // at = account transfer
	var jsonData = new Object();
	jsonData.sequenceId = "6";
	jsonData.idtxn = "M01";
	//jsonData.templateId = gTrans.templateId;
	var	args = new Array();
	args.push(null);
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);
	requestMBServiceCorp(data, false, 0, 
		function(data) {
			var resp = JSON.parse(data);
			if (resp.respCode == 0) {
				//gTrans.sendMethod = resp.respJsonObj.sendMethod;
				//gTrans.listSourceAccounts = resp.respJsonObj.listSourceAccounts;
				//gTrans.limit = resp.respJsonObj.limit;
				lstbankArr = resp.respJsonObj.lst_bank;				
				
				genXmlBank();
				showBankSelection();
			}
		}, 
		function(){
			showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
			gotoHomePage();
		}
	);
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


function removeChar (e, des) {
	var tmpVale = des.value;	
	var numStr = keepOnlyNumber(tmpVale); 
	des.value = numStr;
}