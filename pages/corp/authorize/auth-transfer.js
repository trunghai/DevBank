function loadInitXML() {
    return '';
}

function viewBackFromOther() {

}

function viewWillUnload() {
}

function viewDidLoadSuccess() {
    getCountPendingTransfer();
}


//Get list pending transfer
function getCountPendingTransfer() {
    var jsonData = new Object();
    jsonData.sequence_id = "1";
    jsonData.idtxn = "Z06";
    var args = new Array();
    args.push(null);
    args.push(jsonData);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AUTHORIZE_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
    var data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, false, 0, getCountPendingTransferSuccess, 
        function(){
            showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
        }
    );
}

function getCountPendingTransferSuccess(data) {
    var resp = JSON.parse(data);
    if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
        var docXsl = getCachePageXsl("corp/authorize/auth-transfer-result");
        var xmlDoc = genResultXML(resp.respJsonObj);

        genHTMLStringWithXML(xmlDoc, docXsl, function(oStr){
            document.getElementById('div.result').innerHTML = oStr;
        }, function() {
            document.getElementById('div.result').innerHTML = "<h5>" + CONST_STR.get("CORP_MSG_COM_NO_DATA_FOUND") + "</h5>";
        });

    } else {
        document.getElementById('div.result').innerHTML = "<h5>" + CONST_STR.get("CORP_MSG_COM_NO_DATA_FOUND") + "</h5>";
    }
}

function genResultXML(data) {
    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode('review', '', xmlDoc);

    var rowsNode = createXMLNode("rows", "", xmlDoc, rootNode);
    for (var i in data) {
        var rowData = data[i];
        var rowNode = createXMLNode("row", "", xmlDoc, rowsNode);
        createXMLNode("idtxn", rowData.IDTXN, xmlDoc, rowNode);
        createXMLNode("title", CONST_STR.get('AUTHORIZE_TRANS_TIT_' + rowData.IDTXN), xmlDoc, rowNode);
        createXMLNode("count", rowData.COUNT_TRANS, xmlDoc, rowNode);
    }
    return xmlDoc;
}

function goToAuthorizeScreen(idtxn) {
    //Tiền gửi trực tuyến
    if (idtxn == "A13") {
        navController.initWithRootView('corp/authorize/account/authorize_acc', true, 'xsl');
    }
    //Chuyển khoản trong TPBank
    if (idtxn == "T11") {
        navController.initWithRootView('corp/authorize/transfer/internal/internal-trans-auth-src', true, 'xsl');
    }
    //Chuyển khoản liên ngân hàng
    if (idtxn == "T13") {
        navController.initWithRootView('corp/authorize/transfer/domestic/transfer-domestic', true, 'xsl');
    }
    //Chuyển khoản định kỳ
    if (idtxn == "T14") {
        navController.initWithRootView('corp/authorize/transfer/periodic/periodic-transfer', true, 'xsl');
    }
    //Chuyển khoản theo lô
    if (idtxn == "T16") {
        navController.initWithRootView('corp/authorize/transfer/batch/batch-transfer-salary', true, 'xsl');
    }
    //Thanh toán dịch vụ
    if (idtxn == "B11") {
        navController.initWithRootView('corp/authorize/tax/authorize_tax', true, 'xsl');
    }
    //Thanh toán thiết lập
    if (idtxn == "S11") {
        navController.initWithRootView('corp/authorize/setup/setup-search', true, 'xsl');
    }
    //Mua bán ngoại tệ
    if (idtxn == "B13") {
        navController.initWithRootView('corp/authorize/exchange/auth-foreign-exchange', true, 'xsl');
    }
	//Chuyển khoản nhanh qua thẻ
	if (idtxn == "T19") {
        navController.initWithRootView('corp/authorize/transfer/card/card-trans-auth-src', true, 'xsl');
    }
	//Chuyển khoản qua số CMTND/HC
	if (idtxn == "T20") {
        navController.initWithRootView('corp/authorize/transfer/identification/identification-trans-auth-src', true, 'xsl');
    }
	//Chuyển khoản qua số tài khoản
	// if (idtxn == "T21") {
     //    navController.initWithRootView('corp/authorize/transfer/account/account-trans-auth-src', true, 'xsl');
    // }
    //Thanh toán hóa đơn
    if (idtxn == "B12") {
        navController.initWithRootView('corp/authorize/payment_service/bill/auth-payment-bill', true, 'html');
    }
    //Bảo lãnh
    if (idtxn == "B14") {
        navController.initWithRootView('corp/authorize/credit/guarantee/auth-guarantee', true, 'html');
    }
    //Thanh toán quốc tế
    if (idtxn == 'B15'){
        navController.initWithRootView('corp/authorize/international/auth_international_trans', true, 'html');
    }
}