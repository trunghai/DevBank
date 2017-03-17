// JavaScript Document
gTax.isBack = false;
gTax.accountNumbers = [];
gTax.accountBalances = [];
var taxType;
var arrTax = [];
var gTaxBene = {
};

function viewBackFromOther() {
    gTax.isBack = true;
}

// Thuc hien khi ma load trang web thanh cong
function viewDidLoadSuccess() {
    if (!gTax.isBack){
        var args = ["6", {
            idtxn: "B11"
        }];
        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_PROCESSOR"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
        var data = getDataFromGprsCmd(gprsCmd);
        requestMBServiceCorp(data, false, 0, function(responseText) {
            var response = JSON.parse(responseText);
            if (response.respCode == RESP.get("COM_SUCCESS")) {
                for (var i = 0; i < response.respJsonObj.listAccount.length; i++) {
                    var tmpObj = response.respJsonObj.listAccount[i];
                    gTax.accountNumbers.push(tmpObj.account);
                    gTax.accountBalances.push(tmpObj.balance);
                }
            }
        });

        ShowDefaultTaxType();
    }
}

// Thuc hien su kien khi click vao ma so thue
function getTemplateTax() {
	var chooseTax = document.getElementById('id.taxTypeValue').value;
	var argsArray = [];
	argsArray.push("1");
	argsArray.push(JSON.stringify({
		idtxn : "B11",
		taxType : chooseTax
	}));

	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_PROCESSOR"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
	data = getDataFromGprsCmd(gprsCmd);

	// gọi service và xử lí logic
	requestMBServiceCorp(data, true, 0, function(data) {
		var response = JSON.parse(data);
		if (response.respCode == RESP.get('COM_SUCCESS')
				&& response.responseType == CONSTANTS.get('CMD_CO_PAY_TAX_PROCESSOR')) {
			setRespObjStore(response);
			var obj = response.respJsonObj;
			
			if(response.respJsonObj.length == 0){
				showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
			}else{
				document.addEventListener("evtSelectionDialog", handleSelectTempTax, false);
				document.addEventListener("evtSelectionDialogClose", handleTempTaxClose, false);
				
				var taxNum = [];
				var taxType = [];
				var declar = [];
				var yearDeclar = [];
				var record = [];
				var agency = [];
				arrTax = [];
				for ( var i in obj) {
					taxNum.push(obj[i].TAX_CODE);
					taxType.push(obj[i].TAX_TYPE);
					declar.push(obj[i].DECLARATION);
					yearDeclar.push(obj[i].DECLARATION_YEAR);
					record.push(obj[i].RECORD);
					agency.push(obj[i].AGENCY_CODE);

					gTaxBene = new Object();
					gTaxBene.TAX_CODE = obj[i].TAX_CODE;
					gTaxBene.TAX_TYPE = obj[i].TAX_TYPE;
					gTaxBene.DECLARATION = obj[i].DECLARATION;
					gTaxBene.DECLARATION_YEAR = obj[i].DECLARATION_YEAR;
					gTaxBene.RECORD = obj[i].RECORD;
					gTaxBene.NUMBER_CT = obj[i].NUMBER_CT;
					gTaxBene.SYMBOL_VOUCHERS = obj[i].SYMBOL_VOUCHERS;
					gTaxBene.YEAR_CT = obj[i].YEAR_CT;
					gTaxBene.AGENCY_CODE = obj[i].AGENCY_CODE;

					arrTax.push(gTaxBene);

				}

				if (chooseTax == "02") {
					showTemplateEITax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), taxNum, taxType, declar, yearDeclar, true);
				} else if(chooseTax == "01") {
					showTemplateDomesticTax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), taxNum, taxType, false);
				}else if (chooseTax == "05")
				{
					showTemplateEITax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), taxNum, taxType, declar, yearDeclar, true);
					//showTemplateDomesticTax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), declar, declar, false);
				}else if(chooseTax == "06")
					{
						showTemplateEITax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), record, record, agency, agency, true);
						//showTemplateDomesticTax(CONST_STR.get('CHOOSE_TEMPLATE_QUERY'), record, record, false);
					}
			}
		} else {
			showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
		}
	});
}

function dataFilter(){
	var dataFilter = document.getElementById("id.inputAcc").value;
	var dataDisplay = document.getElementsByName("dataDisplay");
	var checkDataFound = false;
	
	for(var i = 0; i < dataDisplay.length; i++){
		if(dataDisplay[i].childNodes[0].nodeValue.indexOf(dataFilter) == -1){
			dataDisplay[i].style.display = "none";
		}else{
			dataDisplay[i].style.display = "block";
			checkDataFound = true;
		}
	}
	
	if(checkDataFound == true){
		document.getElementById("noDataFound").style.display = "none";
	}else{
		document.getElementById("noDataFound").style.display = "block";
	}
}

function btnFinClick(){
	document.getElementById('trans.taxNum').value = document.getElementById("id.inputAcc").value;
	document.getElementById("selection-dialog").style.display = "none";
}



function handleSelectTempTax(e) {
	handleTempTaxClose();
	//document.getElementById('trans.taxNum').value = e.selectedValue1;
	var taxchoice = document.getElementById("id.taxTypeValue").value;
	/*if (taxchoice == "02") {
		var dataChoose = e.selectedValue1.split("/");
		document.getElementById('id.taxNumDeclar').value = dataChoose[0];
		document.getElementById('id.taxYearDeclar').value = dataChoose[1];
	}else */
	if(taxchoice == "02" || taxchoice == "05")
	{
		var dataChoose = e.selectedValue1.split("/");
		var dataChoose2 = e.selectedValue2.split("/");		
		var declar = dataChoose2[0];
		var taxNum = dataChoose[0];

		for(var i =0 ; i< arrTax.length; i++)
		{
			var obj = arrTax[i];
			if(taxNum == obj.TAX_CODE && declar == obj.DECLARATION)
			{				
				document.getElementById('trans.taxNum').value = obj.TAX_CODE;
				document.getElementById('id.taxNumDeclar').value = obj.DECLARATION;				
				document.getElementById('id.taxYearDeclar').value = obj.DECLARATION_YEAR;		
			}
		}
	}
	else if(taxchoice == "01")
	{
		var dataChoose = e.selectedValue1.split("/");
		var dataChoose2 = e.selectedValue2.split("/");		
		var declar = dataChoose2[0];
		var taxNum = dataChoose[0];

		for(var i =0 ; i< arrTax.length; i++)
		{
			var obj = arrTax[i];
			if(taxNum == obj.TAX_CODE && declar == obj.TAX_TYPE)
			{				
				document.getElementById('trans.taxNum').value = obj.TAX_CODE;		
			}
		}
	}
	else if(taxchoice == "06")
	{
		var dataChoose = e.selectedValue1.split("/");
		var dataChoose2 = e.selectedValue1.split("/");
		var record = dataChoose[0];
		var agency = dataChoose2[0];

		for(var i =0 ; i< arrTax.length; i++)
		{
			var obj = arrTax[i];
			if(record == obj.RECORD)
			{				
				document.getElementById('id.taxNumberBrief').value = obj.RECORD;
				document.getElementById('id.taxSingnal').value = obj.SYMBOL_VOUCHERS;				
				document.getElementById('id.taxNumFiles').value = obj.NUMBER_CT;
				document.getElementById('id.taxOrgCode').value = obj.AGENCY_CODE;
				document.getElementById('id.taxOrgYear').value = 	obj.YEAR_CT;			
			}
		}
		
	}
}

function handleTempTaxClose() {
  document.removeEventListener("evtSelectionDialogClose", handleTempTaxClose, false);
  document.removeEventListener("evtSelectionDialog", handleSelectTempTax, false);
}

//Show loai thue
function ShowTaxType() {
	var taxValue = (gUserInfo.lang == 'EN') ? CONST_TRANS_PAY_TAX_TYPE_VALUE_EN
			: CONST_TRANS_PAY_TAX_TYPE_VALUE_VN;
    taxType = CONST_TRANS_PAY_TAX_TYPE_KEY;

	var handleShowTaxType = function(e) {
		if (currentPage == "corp/payment_service/tax/pay_tax_create") {
			document.removeEventListener("evtSelectionDialog", handleShowTaxType, false);
			if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
				document.getElementById('id.taxType').value = e.selectedValue1;
			}
			if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
				document.getElementById('id.taxTypeValue').value = e.selectedValue2;
				taxType = e.selectedValue2;
				gTax.taxType = taxType;
				
				if (e.selectedValue2 == '02' || e.selectedValue2 == '03' || e.selectedValue2 == '05') {
					document.getElementById('tr.externalTax').style.display = "";
					document.getElementById('tr.taxNumDeclar').style.display = "";
					document.getElementById('tr.taxYearDeclar').style.display = "";
					document.getElementById('tr.trans-other-acc').style.display = "";

					document.getElementById('trans.taxNum').value = "";
					document.getElementById('id.taxNumDeclar').value = "";
					document.getElementById('id.taxYearDeclar').value = "";
					document.getElementById('trans.taxNum').value = "";

					document.getElementById('tr.taxInfoOrg').style.display = "none";
					document.getElementById('tr.taxNumberBrief').style.display = "none";
					document.getElementById('tr.taxSingnal').style.display = "none";
					document.getElementById('tr.taxNumFiles').style.display = "none";
					document.getElementById('tr.taxOrgCode').style.display = "none";
					document.getElementById('tr.taxOrgYear').style.display = "none";

					document.getElementById('id.taxNumberBrief').value = "";
					document.getElementById('id.taxSingnal').value = "";
					document.getElementById('id.taxNumFiles').value = "";
					document.getElementById('id.taxOrgCode').value = "";
					document.getElementById('id.taxOrgYear').value = "";
				} else if (e.selectedValue2 == '06') {
				    document.getElementById('tr.taxInfoOrg').style.display = "";
				    document.getElementById('tr.taxNumberBrief').style.display = "";
				    document.getElementById('tr.taxSingnal').style.display = "";
				    document.getElementById('tr.taxNumFiles').style.display = "";
				    document.getElementById('tr.taxOrgCode').style.display = "";
				    document.getElementById('tr.taxOrgYear').style.display = "";

				    document.getElementById('id.taxNumberBrief').value = "";
				    document.getElementById('id.taxSingnal').value = "";
				    document.getElementById('id.taxNumFiles').value = "";
				    document.getElementById('id.taxOrgCode').value = "";
				    document.getElementById('id.taxOrgYear').value = "";

				    document.getElementById('tr.trans-other-acc').style.display = "none";
				    document.getElementById('trans.taxNum').value = "";
				    document.getElementById('tr.externalTax').style.display = "none";
				    document.getElementById('id.taxNumDeclar').value = "";
				    document.getElementById('tr.taxNumDeclar').style.display = "none";
				    document.getElementById('id.taxYearDeclar').value = "";
				    document.getElementById('tr.taxYearDeclar').style.display = "none";
				}
				else{
					document.getElementById('tr.externalTax').style.display = "none";
					document.getElementById('tr.taxNumDeclar').style.display = "none";
					document.getElementById('tr.taxYearDeclar').style.display = "none";
					document.getElementById('tr.trans-other-acc').style.display = "";

					document.getElementById('trans.taxNum').value = "";
					document.getElementById('id.taxNumDeclar').value = "";
					document.getElementById('id.taxYearDeclar').value = "";
					document.getElementById('trans.taxNum').value = "";

					document.getElementById('tr.taxInfoOrg').style.display = "none";
					document.getElementById('tr.taxNumberBrief').style.display = "none";
					document.getElementById('tr.taxSingnal').style.display = "none";
					document.getElementById('tr.taxNumFiles').style.display = "none";
					document.getElementById('tr.taxOrgCode').style.display = "none";
					document.getElementById('tr.taxOrgYear').style.display = "none";

					document.getElementById('id.taxNumberBrief').value = "";
					document.getElementById('id.taxSingnal').value = "";
					document.getElementById('id.taxNumFiles').value = "";
					document.getElementById('id.taxOrgCode').value = "";
					document.getElementById('id.taxOrgYear').value = "";
				}
			}
		}
	}

	var handleShowTaxTypeClose = function() {
		if (currentPage == "corp/payment_service/tax/pay_tax_create") {
			document.removeEventListener("evtSelectionDialogClose", handleShowTaxTypeClose, false);
			document.removeEventListener("evtSelectionDialog", handleShowTaxType, false);
		}
	}

	document.addEventListener("evtSelectionDialog", handleShowTaxType, false);
	document.addEventListener("evtSelectionDialogClose", handleShowTaxTypeClose, false);
	showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), taxValue, taxType, false);
}
// Show loai thue end

function ShowDefaultTaxType() {
    document.getElementById('tr.taxInfoOrg').style.display = "none";
    document.getElementById('tr.taxNumberBrief').style.display = "none";
    document.getElementById('tr.taxSingnal').style.display = "none";
    document.getElementById('tr.taxNumFiles').style.display = "none";
    document.getElementById('tr.taxOrgCode').style.display = "none";
    document.getElementById('tr.taxOrgYear').style.display = "none";

    document.getElementById('id.taxNumberBrief').value = "";
    document.getElementById('id.taxSingnal').value = "";
    document.getElementById('id.taxNumFiles').value = "";
    document.getElementById('id.taxOrgCode').value = "";
    document.getElementById('id.taxOrgYear').value = "";
}

//Gui thong tin truy van toi Hai Quan
function sendRequestToCustomer() {
    //gui thong tin truy van den phi, le phi cua cac bo nganh
    var taxType = document.getElementById('id.taxTypeValue').value;
    if (taxType == '06') {
        sendRequestCheckTaxOri();
    } else if (taxType == '05') {
        var msgValidate = new Array();

        // Check so du kha dung
        if (gTax.soDuKhaDung <= 0) {
            msgValidate.push(CONST_STR.get('CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH'));
        }

        // Check tai khoan chuyen
        if (document.getElementById('id.accountno').value == ''
            || document.getElementById('id.accountno').value == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('TRANS_PERIODIC_SOURCE_ACC_NO')]));
        }

        // Check loai thue
        if (document.getElementById('id.taxType').value == ''
            || document.getElementById('id.taxType').value == CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('COM_TAX_TYPE')]));
        }

        // Check ma so thue
        if (document.getElementById('trans.taxNum').value == ''
            || document.getElementById('trans.taxNum').value == CONST_STR.get('COM_TXT_INPUT_PLACEHOLDER')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('COM_TAX_NUMBER')]));
        }

        if (msgValidate.length > 0) {
            showAlertText(msgValidate[0]);
        } else {
            var argsArray = [];
            argsArray.push("2");
            argsArray.push(JSON.stringify({
                idtxn: "B11",
                taxCode: document.getElementById('trans.taxNum').value,
                taxType: document.getElementById('id.taxTypeValue').value,
                declar: document.getElementById('id.taxNumDeclar').value,
                yearDeclar: document.getElementById('id.taxYearDeclar').value
            }));

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_ORGANIZATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
            data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
        }
    }
    else {

        var msgValidate = new Array();

        // Check so du kha dung
        if (gTax.soDuKhaDung <= 0) {
            msgValidate.push(CONST_STR.get('CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH'));
        }

        // Check tai khoan chuyen
        if (document.getElementById('id.accountno').value == ''
            || document.getElementById('id.accountno').value == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('TRANS_PERIODIC_SOURCE_ACC_NO')]));
        }

        // Check loai thue
        if (document.getElementById('id.taxType').value == ''
            || document.getElementById('id.taxType').value == CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('COM_TAX_TYPE')]));
        }

        // Check ma so thue
        if (document.getElementById('trans.taxNum').value == ''
            || document.getElementById('trans.taxNum').value == CONST_STR.get('COM_TXT_INPUT_PLACEHOLDER')) {
            msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('COM_TAX_NUMBER')]));
        }

        if (msgValidate.length > 0) {
            showAlertText(msgValidate[0]);
        } else {
            var argsArray = [];
            argsArray.push("2");
            argsArray.push(JSON.stringify({
                idtxn: "B11",
                taxCode: document.getElementById('trans.taxNum').value,
                taxType: document.getElementById('id.taxTypeValue').value,
                declar: document.getElementById('id.taxNumDeclar').value,
                yearDeclar: document.getElementById('id.taxYearDeclar').value
            }));

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_PROCESSOR"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
            data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
        }
    }
}

function sendRequestCheckTaxOri() {
    var msgValidate = new Array();

    // Check so du kha dung
    if (gTax.soDuKhaDung <= 0) {
        msgValidate.push(CONST_STR.get('CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH'));
    }

    // Check tai khoan chuyen
    if (document.getElementById('id.accountno').value == ''
        || document.getElementById('id.accountno').value == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
        msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                [CONST_STR.get('TRANS_PERIODIC_SOURCE_ACC_NO')]));
    }

    // check so ho so
    if (document.getElementById('id.taxNumberBrief').value == ''
        || document.getElementById('id.taxNumberBrief').value == CONST_STR.get('COM_TXT_INPUT_PLACEHOLDER')) {
        msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                [CONST_STR.get('K_TAX_TAX_NUMBER')]));
    }

    // check ky hieu chung tu
    if (document.getElementById('id.taxSingnal').value == ''
        || document.getElementById('id.taxSingnal').value == CONST_STR.get('COM_TXT_INPUT_PLACEHOLDER')) {
        msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                [CONST_STR.get('K_TAX_SIGNAL_FILE')]));
    }

    // check so chung tu
    if (document.getElementById('id.taxNumFiles').value == ''
        || document.getElementById('id.taxNumFiles').value == CONST_STR.get('COM_TXT_INPUT_PLACEHOLDER')) {
        msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                [CONST_STR.get('K_TAX_NUMBER_FILE')]));
    }

    // check ma don vi quan ly
    //if (document.getElementById('id.taxOrgCode').value == ''
    //    || document.getElementById('id.taxOrgCode').value == CONST_STR.get('TRANS_TAX_INPUT_OR_EMPTY')) {
    //    msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
    //            [CONST_STR.get('K_TAX_ORGANIZATION_CODE')]));
    //}

    ////check nam chung tu
    //if (document.getElementById('id.taxOrgYear').value == ''
    //    || document.getElementById('id.taxOrgYear').value == CONST_STR.get('TRANS_TAX_INPUT_OR_EMPTY')) {
    //    msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
    //            [CONST_STR.get('K_TAX_ORGANIZATION_YEAR')]));
    //}

    if (msgValidate.length > 0) {
        showAlertText(msgValidate[0]);
    } else {
        var argsArray = [];
        argsArray.push("2");
        argsArray.push(JSON.stringify({
            idtxn: "B11",
            taxCode: document.getElementById('trans.taxNum').value,
            taxType: document.getElementById('id.taxTypeValue').value,
            declar: document.getElementById('id.taxNumDeclar').value,
            yearDeclar: document.getElementById('id.taxYearDeclar').value,
            taxNumberBrief: document.getElementById('id.taxNumberBrief').value,
            taxSingnal: document.getElementById('id.taxSingnal').value,
            taxNumFiles: document.getElementById('id.taxNumFiles').value,
            taxOrgCode: document.getElementById('id.taxOrgCode').value,
            taxOrgYear: document.getElementById('id.taxOrgYear').value
        }));

        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_ORGANIZATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
        data = getDataFromGprsCmd(gprsCmd);
        requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
    }
}

function requestResultServiceSuccess(e) {
	var gprsResp = JSON.parse(e);
	if (gprsResp.respCode == RESP.get('COM_SUCCESS') 
    		&& (gprsResp.responseType == CONSTANTS.get('CMD_CO_PAY_TAX_PROCESSOR') || gprsResp.responseType == CONSTANTS.get('CMD_CO_PAY_TAX_ORGANIZATION'))) {
		if(document.getElementById('id.taxTypeValue').value == "02"){
			gTax.imExportData = JSON.parse(gprsResp.respJsonObj.respCus);
			gTax.treasuryData = gprsResp.respJsonObj.respTreasuryInfo;
			gTax.methodSend = gprsResp.respJsonObj.methodSend;
			//var economyName = gprsResp.respJsonObj.economyName;
			var declarations =gTax.imExportData.ThongDiep.Body.ThongtinToKhai;
			/*for(var i =0; i< declarations.length;i++)
			{
				for (var j in economyName.O_LIST){
					if (declarations[i].CT_NO.TieuMuc == economyName.O_LIST[j].MA_NDKT){
						declarations[i].CT_NO[i].TenTieuMuc = economyName.O_LIST[j].TEN_NDKT;
					}

				}

			}*/
			// Gọi đên màn hình hiển cho phần thuế xuất nhập khẩu
			navController.pushToView("corp/payment_service/tax/pay_tax_create_imexport", true, 'xsl');
		} else if (document.getElementById('id.taxTypeValue').value == "06") {
		    gTax.organizationData = JSON.parse(gprsResp.respJsonObj.respCus);
		    gTax.treasuryData = gprsResp.respJsonObj.respTreasuryInfo;
		    gTax.methodSend = gprsResp.respJsonObj.methodSend;

		    genReviewScreenOrganization(gTax.organizationData, gTax.treasuryData);
		} else if (document.getElementById('id.taxTypeValue').value == "05") {
		    gTax.imExportData = JSON.parse(gprsResp.respJsonObj.respCus);
		    gTax.treasuryData = gprsResp.respJsonObj.respTreasuryInfo;
		    gTax.methodSend = gprsResp.respJsonObj.methodSend;
			//gTax.economyName =gprsResp.respJsonObj.economyName
			 var declarations =gTax.imExportData.ThongDiep.Body.ThongtinToKhai;
			 /*for(var i =0; i< declarations.length;i++)
			 {
				 declarations[i].TenTieuMuc = gTax.economyName;
			 } */
		    // Gọi đên màn hình hiển cho phần thuế xuất nhập khẩu
		    navController.pushToView("corp/payment_service/tax/pay_tax_charge_imexport", true, 'xsl');
		}
		else {
		    gTax.domesticData = JSON.parse(gprsResp.respJsonObj.respCus);
		    gTax.treasuryData = gprsResp.respJsonObj.respTreasuryInfo;
		    gTax.taxType = document.getElementById('id.taxTypeValue').value;
		    gTax.methodSend = gprsResp.respJsonObj.methodSend;

		    genReviewScreen(gTax.domesticData, gTax.treasuryData);
		}
	}else if(gprsResp.respCode == RESP.get('COM_VALIDATE_FAIL') 
    		&& gprsResp.responseType == CONSTANTS.get('CMD_CO_SETUP_CHANGE_PASSWORD')){
		showAlertText(gprsResp.respContent);
	}else {
		showAlertText(gprsResp.respContent);
		// var tmpPageName = navController.getDefaultPage();
		// var tmpPageType = navController.getDefaultPageType();
		// navController.initWithRootView(tmpPageName, true, tmpPageType);
	}
}

function requestResultServiceFail(e) {
  // var tmpPageName = navController.getDefaultPage();
  // var tmpPageType = navController.getDefaultPageType();
  // navController.initWithRootView(tmpPageName, true, tmpPageType);
};

function genReviewScreen(obj, obj2) {
    var objHeader = obj.ThongDiep.Header;
    var objError = obj.ThongDiep.ErrorCode;
    var objBody = obj.ThongDiep.Body;
    gTax.respCustObj = objBody;

    var docXml = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('review', '', docXml);
    
    //thong tin nguoi nop thue
    var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    var tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('TAX_PAY_TAX_CUST_INFO'), docXml, tmpXmlNodeInfo);
    // MST 
    var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('COM_TAX_NUMBER'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.ThongTinThuNop.ThongTinDKT.MaSoThue, docXml, tmpTransContentNode);
    // Nguoi nop thue
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_CUST_PAY_TAX'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.ThongTinThuNop.ThongTinDKT.TenNNT, docXml, tmpTransContentNode);
    //Dia chi nguoi nop thue
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_CUST_PAY_TAX_ADDRESS'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.ThongTinThuNop.ThongTinDKT.Diachi, docXml, tmpTransContentNode);

    tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('TAX_INFO'), docXml, tmpXmlNodeInfo);

    //Loai thue
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('COM_TAX_TYPE'), docXml, tmpTransContentNode);
    createXMLNode('value', gTax.taxType + ' - ' +document.getElementById('id.taxType').value, docXml, tmpTransContentNode);

    //Tai khoan thu NSNN
    //Lay gia tri TKNS trong obj


    var tkNSNN = [];
    var tmpObj = {};
    var finalTKNSNN = [];
    if (objBody.ThongTinThuePhaiNop.ThuePhaiNop.constructor === Array) {
      for (var i = 0; i < objBody.ThongTinThuePhaiNop.ThuePhaiNop.length; i++) {
        tkNSNN.push(objBody.ThongTinThuePhaiNop.ThuePhaiNop[i].TKNS);
      }

      //For de loai bot gia tri lap di
      for (var i = 0; i < tkNSNN.length; i++) {
        tmpObj[tkNSNN[i]] = "";
      }

      //for lan cuoi cung de dua ra mang;
      for (var k in tmpObj) {
        finalTKNSNN.push(k);
      }

      gTax.arrTKNSNN = finalTKNSNN;
  	} else {
  	  finalTKNSNN.push(objBody.ThongTinThuePhaiNop.ThuePhaiNop.TKNS);
  	  gTax.arrTKNSNN = finalTKNSNN;	
  	}

    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_TREASURY_ACC'), docXml, tmpTransContentNode);
    createXMLNode('combobox', 'true', docXml, tmpTransContentNode);

    //CQ quan ly thu
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_TREASURY_MNG'), docXml, tmpTransContentNode);

    var maCQT = obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop;
    if (maCQT.constructor === Array) {
    	createXMLNode('value', obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop[0].MaCQT + " - " + obj2[0].TEN_CQ_THU, docXml, tmpTransContentNode);	
    } else {
    	createXMLNode('value', obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop.MaCQT + " - " + obj2[0].TEN_CQ_THU, docXml, tmpTransContentNode);	
    }

    tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, tmpXmlNodeInfo);

    setReviewXmlStore(docXml);
    navCachedPages["corp/payment_service/tax/pay_tax_create_domestic"] = null; 
    navController.pushToView("corp/payment_service/tax/pay_tax_create_domestic", true, 'xsl');
}

function genReviewScreenOrganization(obj, obj2) {
    var objHeader = obj.ThongDiep.Header;
    var objError = obj.ThongDiep.ErrorCode;
    var objBody = obj.ThongDiep.Body;
    gTax.respCustObj = objBody;

    var docXml = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('review', '', docXml);

    //thong tin nguoi nop thue
    var tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    var tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('TAX_PAY_TAX_CUST_INFO'), docXml, tmpXmlNodeInfo);
    // Ma so thue
    var tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('COM_TAX_NUMBER'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.NguoiNopTien.Ma_ST, docXml, tmpTransContentNode);
    // Nguoi nop thue
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_CUST_PAY_TAX'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.NguoiNopTien.Ten_NNT, docXml, tmpTransContentNode);
    //Dia chi nguoi nop thue
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_CUST_PAY_TAX_ADDRESS'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.NguoiNopTien.DiaChi , docXml, tmpTransContentNode);
    //Ten co quan thu
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_ORI_REVENUE_NAME'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.Ten_DVQL, docXml, tmpTransContentNode);

    //thong tin thu nop
    tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('TAX_INFO_REVENUE'), docXml, tmpXmlNodeInfo);

    //Ma ngan hang thu huong
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_BANK_BENEFICIARY_CODE'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.TaiKhoan_NopTien.Ma_NH_TH , docXml, tmpTransContentNode);

    //Ten ngan hang thu huong
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_BANK_BENEFICIARY_NAME'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.TaiKhoan_NopTien.Ten_NH_TH, docXml, tmpTransContentNode);

    //Tai khoan thu huong
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.TaiKhoan_NopTien.TaiKhoan_TH, docXml, tmpTransContentNode);


    //Ten tai khoan thu huong
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY_NAME'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.TaiKhoan_NopTien.Ten_TaiKhoan_TH, docXml, tmpTransContentNode);

    //Ma nguyen te
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_EXCHANGERATES_CODE'), docXml, tmpTransContentNode);
    createXMLNode('value', objBody.ThongTin_NopTien.Ma_NT, docXml, tmpTransContentNode);


    //ty gia quy doi
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_EXCHANGERATES_VALUE'), docXml, tmpTransContentNode);
    createXMLNode('value', formatNumberToCurrency(objBody.ThongTin_NopTien.TyGia) + ' VND', docXml, tmpTransContentNode);

    //tong tien nguyen te
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_EXCHANGERATES_SUM'), docXml, tmpTransContentNode);
    createXMLNode('value', formatNumberToCurrency(objBody.ThongTin_NopTien.TongTien_NT) + '  ' + objBody.ThongTin_NopTien.Ma_NT, docXml, tmpTransContentNode);

    //tong tien VND
    tmpTransContentNode = createXMLNode('transcontent', '', docXml, tmpXmlNodeInfo);
    createXMLNode('key', CONST_STR.get('TAX_TREASURY_VALUE'), docXml, tmpTransContentNode);
    createXMLNode('value', formatNumberToCurrency(objBody.ThongTin_NopTien.TongTien_VND) + ' VND', docXml, tmpTransContentNode);

    ////Tai khoan thu NSNN
    ////Lay gia tri TKNS trong obj

    var tkNSNN = [];
    var tmpObj = {};
    var finalTKNSNN = [];
    if (objBody.CTNTDtl.constructor === Array) {
        for (var i = 0; i < objBody.CTNTDtl.length; i++) {
            tkNSNN.push(objBody.CTNTDtl[i].NDKT);
        }

        //For de loai bot gia tri lap di
        for (var i = 0; i < tkNSNN.length; i++) {
            tmpObj[tkNSNN[i]] = "";
        }

        //for lan cuoi cung de dua ra mang;
        for (var k in tmpObj) {
            finalTKNSNN.push(k);
        }

        gTax.arrTKNSNN = finalTKNSNN;
    } else {
        finalTKNSNN.push(objBody.CTNTDtl.NDKT);
        gTax.arrTKNSNN = finalTKNSNN;
    }

    //var maCQT = obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop;
    //if (maCQT.constructor === Array) {
    //    createXMLNode('value', obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop[0].MaCQT + " - " + obj2[0].TEN_CQ_THU, docXml, tmpTransContentNode);
    //} else {
    //    createXMLNode('value', obj.ThongDiep.Body.ThongTinThuePhaiNop.ThuePhaiNop.MaCQT + " - " + obj2[0].TEN_CQ_THU, docXml, tmpTransContentNode);
    //}

    tmpXmlNodeInfo = createXMLNode('transinfo', '', docXml, tmpXmlRootNode);
    tmpXmlNodeTransTitle = createXMLNode('transtitle', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, tmpXmlNodeInfo);

    setReviewXmlStore(docXml);
    navCachedPages["corp/payment_service/tax/pay_tax_create_organization"] = null;
    navController.pushToView("corp/payment_service/tax/pay_tax_create_organization", true, 'xsl');
}

// Cho su kien chon [tai khoan chuyen]
function showAccountSelection() {
	if (gTax.accountNumbers.length == 0) {
		showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
	} else {
		var handleSelectionAccountList = function(e) {
			if (currentPage == "corp/payment_service/tax/pay_tax_create") {
				document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);

				if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
					var tagAccNo = document.getElementById("id.accountno");
					if (tagAccNo.nodeName == "INPUT") {
						tagAccNo.value = e.selectedValue1;
						gTax.accountNo = e.selectedValue1;
					}
				}

				if (e.selectedValue1 != undefined) {
					document.getElementById("trans.sourceaccoutbalance").innerHTML = 
							"<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + e.selectedValue2 + " VND" + "</div>";
					gTax.soDuKhaDung = e.selectedValue2;
				}
			}
		}

		var handleSelectionAccountListClose = function(e) {
			if (currentPage == "corp/payment_service/tax/pay_tax_create") {
				document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
				document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);
			}
		};

		document.addEventListener("evtSelectionDialog", handleSelectionAccountList, false);
		document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
		showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), gTax.accountNumbers, gTax.accountBalances, true);
	}
}

function taxYearDeclarNumberKey(evt){
	var charCode = (evt.which) ? evt.which : event.keyCode
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
}