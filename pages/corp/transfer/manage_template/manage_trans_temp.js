function loadInitXML() {}
gTrans.template = {
    idtxn: "M01",
    pageId: 1,
    pageSize: 5,
    totalPage: 0,
    detailType: 0,
    request: {
        idtxn: "M01",
        tempName: "",
        transType: "",
        transTypeId: "",
        pageId: 1,
        pageSize: 5
    },
    beneId: 0,
};
gTrans.isTransferDomestic = null;
gInternational.detail = {};


function showManageBeneficiary() {
    navController.initWithRootView('corp/transfer/manage_template/manage_beneficiary', true, 'xsl');
}

// Show loai giao dich
function showTransType() {
    var listTransType = (gUserInfo.lang == 'EN') ? CONST_TRANS_TYPE_CONDITION_EN : CONST_TRANS_TYPE_CONDITION_VN;
    var listTransTypeId = CONST_TRANS_TYPE_CONDITION_ID;

    document.addEventListener("evtSelectionDialog", handleShowTransType, false);
    document.addEventListener("evtSelectionDialogClose", handleShowTransTypeClose, false);
    showDialogList(CONST_STR.get('COM_TYPE_TRANSACTION'), listTransType, listTransTypeId, false);
}

function handleShowTransType(e) {
    if (currentPage == "corp/transfer/manage_template/manage_trans_temp") {
        document.removeEventListener("evtSelectionDialog", handleShowTransType, false);

        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
            var transType = document.getElementById('trans.type');
            transType.value = e.selectedValue1;
        }

        if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
            var transTypeId = document.getElementById('id.value.trans.type');
            transTypeId.value = e.selectedValue2;
        }
    }
}

function handleShowTransTypeClose() {
    if (currentPage == "corp/transfer/query/query-transfer") {
        document.removeEventListener("evtSelectionDialogClose", handleShowTransTypeClose, false);
        document.removeEventListener("evtSelectionDialog", handleShowTransType, false);
    }
}

function resetInput() {
    var tempName = document.getElementById("id.template.name");
    var transType = document.getElementById("trans.type");
    var transTypeId = document.getElementById("id.value.trans.type");
    document.getElementById("tblContent").innerHTML = "";
    document.getElementById("pagination").innerHTML = "";
    tempName.value = "";
    transTypeId.value = CONST_TRANS_TYPE_CONDITION_ID[0];
    var listTransType = (gUserInfo.lang == 'EN') ? CONST_TRANS_TYPE_CONDITION_EN : CONST_TRANS_TYPE_CONDITION_VN;
    transType.value = listTransType[0];
}

function searchTransTemps() {
    navCachedXsl["corp/transfer/manage_template/table-temp-result"] = null;
    var request = {
        idtxn: "M01",
        sequenceId: 1,
        tempName: document.getElementById("id.template.name").value,
        transTypeId: document.getElementById("id.value.trans.type").value,
        pageId: gTrans.template.pageId,
        pageSize: gTrans.template.pageSize
    }
    gTrans.template.request = request;
    searchTransTempRequest(request);
}

function searchTransTempRequest(request) {
    var strJSON = JSON.stringify(request);
    var arrayArgs = new Array();
    arrayArgs.push("1");
    arrayArgs.push(strJSON);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    gprsCmd.raw = '';
    data = getDataFromGprsCmd(gprsCmd);

    requestMBServiceCorp(data, true, 0, requestTransTempSuccess, requestTransTempFail);
}

function requestTransTempSuccess(e) {
    var response = JSON.parse(e);

    if ((response.respCode == RESP.get('COM_SUCCESS')) && (parseInt(response.responseType) == parseInt(CONSTANTS.get('CMD_CO_MANAGE_TEMPLATE')))) {
        mainContentScroll.refresh();
        var jsonObj = response.respJsonObj;
		if (jsonObj.length > 0) {
			var xml_doc = genXMLListTransTemp(jsonObj);
			var xsl_doc = getCachePageXsl("corp/transfer/manage_template/table-temp-result");

			genHTMLStringWithXML(xml_doc, xsl_doc, function(oStr) {
                console.log(oStr);
				document.getElementById("tblContent").innerHTML = oStr;
			});

			// Tinh so trang
			if (jsonObj.length == 0) {
				gTrans.template.totalPage = 0;
			} else {
				var totalRow = jsonObj[0].TOTAL;
				gTrans.template.totalPage = Math.ceil(totalRow / gTrans.template.pageSize);
			}

			// Gen phan trang
			var pagination = document.getElementById("pagination");
			var paginationHTML = genPageIndicatorHtml(gTrans.template.totalPage, gTrans.template.request.pageId);
			paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "changePage");
			pagination.innerHTML = paginationHTML;
        } else {
            // 20/11/2015 DuyNH fix bug NO. 174 START
            document.getElementById("pagination").innerHTML = '';
			document.getElementById("tblContent").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
            // 20/11/2015 DuyNH fix bug NO. 174 END
        }
    } else {
        if (response.respCode == '1019') {
            showAlertText(response.respContent);
        } else {
            showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
        }
    }
}

// Chuyen trang
function changePage(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
    gTrans.template.request.pageId = idx;
    var request = gTrans.template.request;
	request.sequenceId = 1;
	request.transTypeId = document.getElementById("id.value.trans.type").value;
    searchTransTempRequest(request);
};

function requestTransTempFail() {

}

function genXMLListTransTemp(response) {
    var docXml = createXMLDoc();
    var rootNode = createXMLNode('table', '', docXml);
    var colNode;
    var rowNode;
    for (var i = 0; i < response.length; i++) {
        rowNode = createXMLNode('row', '', docXml, rootNode);
        colNode = createXMLNode('tempName', response[i].BENE_DESC, docXml, rowNode);
        colNode = createXMLNode('beneId', response[i].BENEID, docXml, rowNode);
        colNode = createXMLNode('transType', response[i].TXN_TYPE, docXml, rowNode);
        colNode = createXMLNode('modify', CONST_STR.get("TRANSFER_REMITTANCE_MODIFY"), docXml, rowNode);
        colNode = createXMLNode('remove', CONST_STR.get("TRANSFER_REMITTANCE_DELETE"), docXml, rowNode);
        colNode = createXMLNode('use', CONST_STR.get("TRANSFER_REMITTANCE_USE"), docXml, rowNode);
    }

    return docXml;
}

function detailTemplate(templateId, transType) {
    if (transType == 6){
        sendRequestDetailInterReview(templateId);
    }else {
        sendRequestDetail(templateId);
        gTrans.template.detailType = 1;
    }
    
}

function modifyTemplate(templateId, transtype) {
    if (transtype == 6){
        sendRequestDetailInter(templateId);
    }else {
        sendRequestDetail(templateId);
        gTrans.template.detailType = 2;
        gTrans.template.beneId = templateId;
    }
}

function removeTemplate(templateId) {
    showAlertConfirmText(CONST_STR.get("CONST_CONFIRM_DELETE_TEMPLATE"));
    document.addEventListener("alertConfirmOK", function sendRemoveRequest(e) {
        document.removeEventListener("alertConfirmOK", sendRemoveRequest);
        var request = {
            idtxn: gTrans.template.idtxn,
            sequenceId: 4,
            beneId: templateId
        };
        var data = {};
        var arrayArgs = [];
        var jsonRequest = JSON.stringify(request);
        arrayArgs.push("4");
        arrayArgs.push(jsonRequest);
        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
        gprsCmd.raw = '';
        data = getDataFromGprsCmd(gprsCmd);

        requestMBServiceCorp(data, true, 0, requestRemoveSuccess);
    });
}

function requestRemoveSuccess(e) {
    var response = JSON.parse(e);
    showAlertText(response.respContent);
    setTimeout(function() {
        searchTransTemps();
    }, 1000);
}

function useTemplate(templateId, transType) {
    gTrans.templateId = templateId;
    if (transType == 1) {
        navController.pushToView("corp/transfer/domestic/transfer-inter-create-scr", true, 'xsl');
    } else if (transType == 0) {
        navController.pushToView("corp/transfer/internal/transfer-local-create-scr", true, 'xsl');
    }else if (transType == 2) {
        navController.pushToView("corp/transfer/card/transfer-card-create-scr", true, 'xsl');
    }else if (transType == 3) {
        navController.pushToView("corp/transfer/identification/identification-trans-src", true, 'xsl');
    }else if (transType == 4) {
        navController.pushToView("corp/transfer/account/transfer-account-create-scr", true, 'xsl');
    }else if (transType == 6) {
        navCachedPages['corp/international_payments/international_money_trans/international_trans_create'] = null;
        navController.pushToView("corp/international_payments/international_money_trans/international_trans_create", true, 'html');
    }
}

function sendRequestDetailInter(templateId) {
    var data = {};
    var arrayArgs = new Array();
    var request = {
        idtxn: 'M01',
        sequenceId: 7,
        beneId: templateId
    };
    var jsonRequest = JSON.stringify(request);
    arrayArgs.push("1");
    arrayArgs.push(jsonRequest);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    gprsCmd.raw = '';
    data = getDataFromGprsCmd(gprsCmd);

    requestMBServiceCorp(data, true, 0, function (e) {
        response = JSON.parse(e);
        if (response.respCode == '0'){
            gInternational.detail = response.respJsonObj.info_trans[0];
            gInternational.list_Nation = response.respJsonObj.lst_nation;
            navCachedPages["corp/transfer/manage_template/manager_edit_template_inter"] = null;
            navController.pushToView("corp/transfer/manage_template/manager_edit_template_inter", true, 'html');
        }

    }, requestDetailFail);
}

function sendRequestDetailInterReview(templateId) {
    var data = {};
    var arrayArgs = new Array();
    var request = {
        idtxn: 'M01',
        sequenceId: 7,
        beneId: templateId
    };
    var jsonRequest = JSON.stringify(request);
    arrayArgs.push("1");
    arrayArgs.push(jsonRequest);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    gprsCmd.raw = '';
    data = getDataFromGprsCmd(gprsCmd);

    requestMBServiceCorp(data, true, 0, function (e) {
        response = JSON.parse(e);
        if (response.respCode == '0'){
            gInternational.detail = response.respJsonObj.info_trans[0];
            gInternational.list_Nation = response.respJsonObj.lst_nation;
            navCachedPages["corp/transfer/manage_template/manager_review_temp_inter"] = null;
            navController.pushToView("corp/transfer/manage_template/manager_review_temp_inter", true, 'html');
        }

    }, requestDetailFail);
}

function sendRequestDetail(templateId) {
    var data = {};
    var arrayArgs = new Array();
    var request = {
        idtxn: gTrans.template.idtxn,
        sequenceId: 2,
        beneId: templateId
    };
    var jsonRequest = JSON.stringify(request);
    arrayArgs.push("1");
    arrayArgs.push(jsonRequest);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    gprsCmd.raw = '';
    data = getDataFromGprsCmd(gprsCmd);

    requestMBServiceCorp(data, true, 0, requestDetailSuccess, requestDetailFail);
}

function requestDetailSuccess(e) {

    response = JSON.parse(e);
    setRespObjStore(response);
    var objJSON = response.respJsonObj;

    if (checkResponseCodeSuccess(response.respCode) && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE")))) {
        if (gTrans.template.detailType == 1) {
            genDetailReview(objJSON[0]);
        } else if (gTrans.template.detailType == 2) {
            genDetailEdit(objJSON[0]);
        }

    } else if (response.respCode != 0) {
        showAlertText(response.respContent);
    }
}

function requestDetailFail() {

}

function genDetailReview(objJSON) {
    var docXml = createXMLDoc();
    var rootNode;

    rootNode = createXMLNode('review', '', docXml);

    /* Thong tin chi tiet */
    var sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('TRANSFER_REMITTANCE_DETAIL'), docXml, sectionNode);

    // ten mau
    var rowNode = createXMLNode('row', '', docXml, sectionNode);
    var labelNode = createXMLNode('label', CONST_STR.get('TRANSFER_REMITTANCE_NAME'), docXml, rowNode);
    var valueNode = createXMLNode('value', objJSON.BENE_DESC, docXml, rowNode);

    /* Thong tin tai khoan */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

    // tai khoan chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);	
	labelNode = createXMLNode('label', CONST_STR.get('VIEW_TRANS_DETAIL_ACC'), docXml, rowNode);
    valueNode = createXMLNode('value', objJSON.SOURCE_ACC, docXml, rowNode);
	
	
    // nguoi thu huong
    rowNode = createXMLNode('row', '', docXml, sectionNode);
	if (objJSON.IDTXN == "T13" || objJSON.IDTXN == "T11" || objJSON.IDTXN == "T12" || objJSON.IDTXN == "T19" || objJSON.IDTXN == "T21") {    	
	    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_PAYEE'), docXml, rowNode);
	} else if (objJSON.IDTXN == "T20") {
		labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_RECEIVER_NAME'), docXml, rowNode);
	}	 
    valueNode = createXMLNode('value', objJSON.BENE_NAME, docXml, rowNode);
	
	if(objJSON.IDTXN == "T20"){
		// cmtnd nhận tiền
		rowNode = createXMLNode('row', '', docXml, sectionNode);
		labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_NUMBER'), docXml, rowNode);
		valueNode = createXMLNode('value', objJSON.BENE_ACCTNO, docXml, rowNode);
	}
	
	
	//chuyen tien CMTND
	if(objJSON.IDTXN == "T20"){
		// ngay cap
		rowNode = createXMLNode('row', '', docXml, sectionNode);
		labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_TIME'), docXml, rowNode);
		valueNode = createXMLNode('value', objJSON.PLACEISSUE, docXml, rowNode);
		
		// noi cap	
		rowNode = createXMLNode('row', '', docXml, sectionNode);
		labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_PLACE'), docXml, rowNode);
		valueNode = createXMLNode('value', objJSON.DATISSUE, docXml, rowNode);
		
		// so dien thoai
		rowNode = createXMLNode('row', '', docXml, sectionNode);
		labelNode = createXMLNode('label', CONST_STR.get('IDENTIFICATION_PHONE_NUMBER'), docXml, rowNode);
		valueNode = createXMLNode('value', objJSON.PHONENUMBER, docXml, rowNode);
	}
	
	if(objJSON.IDTXN != "T20"){
		// tai khoan nhan tien
		rowNode = createXMLNode('row', '', docXml, sectionNode);
		if(objJSON.IDTXN == "T19"){
			labelNode = createXMLNode('label', CONST_STR.get('TRANS_CARD_CARD_NUMBER'), docXml, rowNode);
		} else {
			labelNode = createXMLNode('label', CONST_STR.get('ESAVING_WITHDRAW_ACC_TITLE'), docXml, rowNode);
		}
		valueNode = createXMLNode('value', objJSON.BENE_ACCTNO, docXml, rowNode);
	}

    // ngan hang nhan
    if (objJSON.IDTXN == "T13" || objJSON.IDTXN == "T20") {
        rowNode = createXMLNode('row', '', docXml, sectionNode);
        labelNode = createXMLNode('label', CONST_STR.get('TRANS_BANK_TITLE'), docXml, rowNode);
        valueNode = createXMLNode('value', objJSON.BANK_NAME, docXml, rowNode);
    }

    /* Thong tin chuyen khoan */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('TRANS_FPTS_INFOR_TITLE'), docXml, sectionNode);

    // so tien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(objJSON.NUMAMOUNT) + " " + objJSON.NAM_CCY_SHORT, docXml, rowNode);


    // noi dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
    valueNode = createXMLNode('value', objJSON.MSG, docXml, rowNode);

    // Gen button cho màn hình review
    // Nut quay lai
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

    //setReviewXmlStore(docXml);
	gCorp.detailXML = docXml;
    navCachedPages["corp/common/detail/com-detail"] = null;
    navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
}

function genDetailEdit(objJSON) {
    var docXml = createXMLDoc();
    var rootNode;
    rootNode = createXMLNode('edit', '', docXml);

    var tempNameNode = createXMLNode('tempName', objJSON.BENE_DESC, docXml, rootNode);

    var srcAccountNode = createXMLNode('srcAccount', objJSON.SOURCE_ACC, docXml, rootNode);
    var descAccountNode = createXMLNode('descAccount', objJSON.BENE_ACCTNO, docXml, rootNode);
    var numamountNode;
    if (objJSON.NUMAMOUNT == null || objJSON.NUMAMOUNT == undefined) {
        numamountNode = createXMLNode('numamount', '', docXml, rootNode);
    } else {
        numamountNode = createXMLNode('numamount', formatNumberToCurrency(objJSON.NUMAMOUNT), docXml, rootNode);
    }
    var contentNode = createXMLNode('beneContent', objJSON.MSG, docXml, rootNode);
    if (objJSON.IDTXN == "T13" || objJSON.IDTXN == "T20") {
        var bankNode = createXMLNode('bank', 'domestic', docXml, rootNode);
		if(objJSON.BANK_NAME != null && objJSON.BANK_NAME.length > 0) {
        	var branchNode = createXMLNode('branchName', objJSON.BANK_NAME + '\n' + objJSON.BRANCH_NAME, docXml, rootNode);
		} else {
			var branchNode = createXMLNode('branchName', 'Chọn', docXml, rootNode);
		}
        var beneNameNode = createXMLNode('beneName', objJSON.BENE_NAME, docXml, rootNode);
    } else if(objJSON.IDTXN == "T21"){		
		if(objJSON.BANK_NAME != null && objJSON.BANK_NAME.length > 0) {
        	var branchNode = createXMLNode('branchName', objJSON.BANK_NAME, docXml, rootNode);
		} else {
			var branchNode = createXMLNode('branchName', 'Chọn', docXml, rootNode);
		}
	} else {
        var bankNode = createXMLNode('bank', 'internal', docXml, rootNode);
        var loadAccontInfo = createXMLNode('loadAccontInfo', 'loadInfoFromAccount()', docXml, rootNode);
        var beneNameNode = createXMLNode('beneName', objJSON.ACCOUNT_NAME, docXml, rootNode);
        var disabledNode = createXMLNode('disabled', 'disabled', docXml, rootNode);
    }
	var transTypeNode;
	if(objJSON.IDTXN == "T20"){
		transTypeNode = createXMLNode('transType', 'identification', docXml, rootNode);
		gTrans.editTemp.transType = "T20";
	}else if(objJSON.IDTXN == "T21"){
		transTypeNode = createXMLNode('transType', 'account', docXml, rootNode);
		gTrans.editTemp.transType = "T21";
	}else if(objJSON.IDTXN == "T19"){
		transTypeNode = createXMLNode('transType', 'card', docXml, rootNode);
		gTrans.editTemp.transType = "T19";
	} else {
		transTypeNode = createXMLNode('transType', '', docXml, rootNode);
		gTrans.editTemp.transType = objJSON.IDTXN;
	}
	
    // gen button
    var btnSaveTitle = CONST_STR.get("TRANSFER_REMITTANCE_MODIFY");
    if (objJSON.BENE_DESC == null) {
        btnSaveTitle = CONST_STR.get("TRANSFER_REMITTANCE_ADD_TEMPLATE");
    }
    var buttonNode = createXMLNode('button', '', docXml, rootNode);
    var typeNode = createXMLNode('type', 'save', docXml, buttonNode);
    var typeNode = createXMLNode('btnLabel', btnSaveTitle, docXml, buttonNode);

    if (objJSON.BENE_DESC == null) {
        buttonNode = createXMLNode('button', '', docXml, rootNode);
        typeNode = createXMLNode('type', 'reset', docXml, buttonNode);
        typeNode = createXMLNode('btnLabel', CONST_STR.get("ESAVING_CHANGEINFO_VER_BTN_CLR"), docXml, buttonNode);
    }

    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'cancel', docXml, buttonNode);
    typeNode = createXMLNode('btnLabel', CONST_STR.get("REVIEW_BTN_CANCEL"), docXml, buttonNode);	
	
    setReviewXmlStore(docXml);

    console.log(docXml);
 	gTrans.template.idtxn = objJSON.IDTXN;
    gTrans.template.bankCode = objJSON.BANK_CODE;
    gTrans.template.sortCode = objJSON.SORTCODE;
    gTrans.template.bankName = objJSON.BANK_NAME;
    gTrans.template.branchName = objJSON.BRANCH_NAME;
	gTrans.template.issuedDate = objJSON.DATISSUE;
	gTrans.template.issuedPlace = objJSON.PLACEISSUE;
	gTrans.template.phone = objJSON.PHONENUMBER;
    gTrans.template.isUpdate = 0;
	gTrans.template.sourceAccount = objJSON.SOURCE_ACC;
    if (objJSON == null) {
        gTrans.template.isUpdate = 1;
    }

    navCachedPages["corp/common/review/com-review"] = null;
    navCachedPages["corp/transfer/manage_template/edit-template-review"] = null;
    navController.pushToView("corp/transfer/manage_template/edit-template-review", true, 'xsl');
}

function addTemplate() {
    var transType = document.getElementById("id.value.trans.type").value;
    if(transType == "B15"){
        navCachedPages["corp/transfer/manage_template/manager_add_temp_inter"] = null;
        navController.pushToView("corp/transfer/manage_template/manager_add_temp_inter", true, 'html');
    }else {
        navCachedPages["corp/transfer/manage_template/edit-template-review"] = null;
        navCachedPages["corp/common/review/com-review"] = null;
        var addObject = {};
        if (transType == 'ALL') {

            showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                [CONST_STR.get('TRANSFER_REMITTANCE_SELECT_TYPE')]));
            return;
        } else {
            if (transType == "T13") {
                addObject.IDTXN = "T13";
                gTrans.isTransferDomestic = 1;
            } if (transType == "T20") {
                addObject.IDTXN = "T20";
            }if (transType == "T21") {
                addObject.IDTXN = "T21";
                gTrans.isTransferDomestic = 0;
            }
            if (transType == "T19") {
                addObject.IDTXN = "T19";
                gTrans.isTransferDomestic = 0;
            }
            else {
                gTrans.isTransferDomestic = 0;
            }
            genDetailEdit(addObject);
        }
    }
}
