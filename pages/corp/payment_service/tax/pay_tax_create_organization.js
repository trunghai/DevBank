var flagLoadOrganization = true;


/*** VIEW BACK FROM OTHER ***/
function viewBackFromOther() {
    flagLoadOrganization = false;
}

/*** INIT VIEW ***/
function loadInitXML() {
    return getReviewXmlStore();
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
}

/*** VIEW LOAD SUCCESS ***/
// Thực hiện sau khi load trang thành công
function viewDidLoadSuccess() {
    // gen sequence form
    genSequenceForm();

    if (flagLoadOrganization) {
        //document.getElementById("id.valueTKNSNN").value = gTax.arrTKNSNN[0];
        document.getElementById("id.notifyTo").value = CONST_STR.get('COM_NOTIFY_' + gTax.methodSend);
        showTableByTKT();
    }
}

//gen sequence form
function genSequenceForm() {
    //get sequence form xsl
    var tmpXslDoc = getCachePageXsl("sequenceform");
    //create xml
    var tmpStepNo = 301;
    setSequenceFormIdx(tmpStepNo);
    var xmlDoc = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('seqFrom', '', xmlDoc);
    var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, xmlDoc, tmpXmlRootNode);
    //gen html string
    genHTMLStringWithXML(xmlDoc, tmpXslDoc, function (oStr) {
        var tmpNode = document.getElementById('seqFormLocal');
        if (tmpNode != null) {
            tmpNode.innerHTML = oStr;
        }
    });
}

function getValueTKNSNN() {
    var handleSelectTKNSNN = function (e) {
        if (currentPage == "corp/payment_service/tax/pay_tax_create_domestic") {
            document.removeEventListener("evtSelectionDialog", handleSelectTKNSNN, false);
            if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
                document.getElementById('id.valueTKNSNN').value = e.selectedValue1;
                showTableByTKT();
            }
            if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
                sttID = e.selectedValue2;
            }
        }
    }

    var handleSelectTKNSNNClose = function () {
        if (currentPage == "corp/payment_service/tax/pay_tax_create_domestic") {
            document.removeEventListener("evtSelectionDialogClose", handleSelectTKNSNNClose, false);
            document.removeEventListener("evtSelectionDialog", handleSelectTKNSNN, false);
        }
    }

    document.addEventListener("evtSelectionDialog", handleSelectTKNSNN, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectTKNSNNClose, false);

    showDialogList(CONST_STR.get('TRANS_PERIODIC_DIALOG_TITLE_ACCTYPE'), gTax.arrTKNSNN, '', false);
}

function saveQueryInfo() {
    var saveTaxOptionsValue;
    var saveTaxOptionKey;
    saveTaxOptionsValue = (gUserInfo.lang == 'EN') ? CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_EN : CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_VN;
    saveTaxOptionKey = CONST_TAX_INFO_QUERY_DOMESTIC_KEY;

    document.addEventListener("evtSelectionDialog", handleSaveQueryInfo, false);
    document.addEventListener("evtSelectionDialogClose", handleSaveQueryInfoClose, false);
    showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), saveTaxOptionsValue, saveTaxOptionKey, false);
}

function handleSaveQueryInfo(e) {
    if (currentPage == "corp/payment_service/tax/pay_tax_create_organization") {
        document.removeEventListener("evtSelectionDialog", handleSaveQueryInfo, false);
        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
            document.getElementById('id.saveTaxQuery').value = e.selectedValue1;
        }
        if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
            document.getElementById('id.saveTaxQueryValue').value = e.selectedValue2;
        }
    }
}

function handleSaveQueryInfoClose() {
    if (currentPage == "corp/payment_service/tax/pay_tax_create_organization") {
        document.removeEventListener("evtSelectionDialogClose", handleSaveQueryInfoClose, false);
        document.removeEventListener("evtSelectionDialog", handleSaveQueryInfo, false);
    }
}


function showTableByTKT() {
    var tkt = document.getElementById("id.valueTKNSNN");
    var tmpArr = [];
    var respCustObj = gTax.organizationData.ThongDiep.Body;

    if (respCustObj.CTNTDtl.constructor === Array) {
        for (var i = 0; i < respCustObj.CTNTDtl.length; i++) {
            tmpArr.push(respCustObj.CTNTDtl[i]);
        }
    } else {
        tmpArr.push(respCustObj.CTNTDtl);
    }

    gTax.thongTinGiaoDich = tmpArr;
    document.getElementById('divTable').innerHTML = '';
    genTableResults(tmpArr, gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.Ma_NT);
}

function genTableResults(displayRows,maNT) {
    var xmlDoc = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('review', '', xmlDoc);

    var tableNodes = createXMLNode('transtables', '', xmlDoc, tmpXmlRootNode);
    var table = createXMLNode('table', '', xmlDoc, tableNodes);
    var titles = createXMLNode('titles', '', xmlDoc, table);
    createXMLNode('table-title', CONST_STR.get('COM_NO'), xmlDoc, titles);
    createXMLNode('table-title', CONST_STR.get('TAX_CONTENT'), xmlDoc, titles); // ND kinhtế
    createXMLNode('table-title', CONST_STR.get('TAX_CONTENT_TITLE'), xmlDoc, titles); //Tên ND kinhtế
    createXMLNode('table-title', CONST_STR.get('TAX_CURRENCY_MONEY'), xmlDoc, titles); // Số tiền nguyên tệ
    createXMLNode('table-title', CONST_STR.get('TAX_CURRENCY_MONEY_LOCAL'), xmlDoc, titles); // Số tiền VND
    createXMLNode('table-title', CONST_STR.get('TAX_CURRENCY_NOTE'), xmlDoc, titles); // ghi chu

    var rows = createXMLNode('rows', '', xmlDoc, table);
    for (var i = 0; i < displayRows.length; i++) {
        var row = createXMLNode('row', '', xmlDoc, rows);
        createXMLNode('idx', parseInt(i) + 1, xmlDoc, row);
        var cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('class', "td-head-color", xmlDoc, cotent);

        //so thu thu
        createXMLNode('table-content-title', CONST_STR.get('COM_NO'), xmlDoc, cotent);
        createXMLNode('table-content', parseInt(i) + 1, xmlDoc, cotent);

        //noi dung kinh te
        cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('table-content-title', CONST_STR.get('TAX_CONTENT'), xmlDoc, cotent);
        createXMLNode('table-content', displayRows[i].NDKT, xmlDoc, cotent);

        //ten noi dung kinh te
        cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('table-content-title', CONST_STR.get('TAX_CONTENT_TITLE'), xmlDoc, cotent);
        createXMLNode('table-content', displayRows[i].Ten_NDKT, xmlDoc, cotent);

        //so tien nguyen te
        cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('table-content-title', CONST_STR.get('TAX_CURRENCY_MONEY'), xmlDoc, cotent);
        createXMLNode('table-content', formatNumberToCurrency(displayRows[i].SoTien_NT) + '  ' + maNT, xmlDoc, cotent);
        createXMLNode('class', 'td-right', xmlDoc, cotent);

        //so tien vnd
        cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('table-content-title', CONST_STR.get('TAX_CURRENCY_MONEY_LOCAL'), xmlDoc, cotent);
        createXMLNode('table-content', formatNumberToCurrency(displayRows[i].SoTien_VND) + ' VND', xmlDoc, cotent);
        createXMLNode('class', 'td-right', xmlDoc, cotent);

        //ghi chu
        cotent = createXMLNode('cotent', '', xmlDoc, row);
        createXMLNode('table-content-title', CONST_STR.get('TAX_CURRENCY_NOTE'), xmlDoc, cotent);
        createXMLNode('table-content', displayRows[i].GhiChu, xmlDoc, cotent);
    }

    var docXsl = getCachePageXsl("corp/payment_service/tax/pay_tax_create_organization_tbl");

    genHTMLStringWithXML(xmlDoc, docXsl, function (html) {
        var tmpNode = document.getElementById('divTable');
        tmpNode.innerHTML = html;
    });
}

function sendJsonRequest() {
    var msgCheck = new Array();
    // Lay ra thong tin chung
    var allInfo = {};
    allInfo.nguoinopthue
    allInfo = gTax.organizationData.ThongDiep.Body.ThongTin_NopTien;
    allInfo.Ten_DVQL = gTax.organizationData.ThongDiep.Body.Ten_DVQL;
    //tai khoan nop tien
    allInfo.Ma_NH_TH = gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ma_NH_TH;
    allInfo.TaiKhoan_TH = gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.TaiKhoan_TH;
    allInfo.Ten_NH_TH = gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ten_NH_TH;
    allInfo.Ten_TaiKhoan_TH = gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ten_TaiKhoan_TH;
    //nguoi nop tien
    allInfo.DiaChi = gTax.organizationData.ThongDiep.Body.NguoiNopTien.DiaChi;
    allInfo.Ma_ST = String(gTax.organizationData.ThongDiep.Body.NguoiNopTien.Ma_ST);
    allInfo.TT_Khac = gTax.organizationData.ThongDiep.Body.NguoiNopTien.TT_Khac;
    allInfo.Ten_NNT = gTax.organizationData.ThongDiep.Body.NguoiNopTien.Ten_NNT;

    allInfo.So_CT = String(gTax.organizationData.ThongDiep.Body.So_CT);
    allInfo.Nam_CT = String(gTax.organizationData.ThongDiep.Body.Nam_CT);
    allInfo.Ma_DVQL = String(gTax.organizationData.ThongDiep.Body.Ma_DVQL);
    allInfo.KyHieu_CT = String(gTax.organizationData.ThongDiep.Body.KyHieu_CT);
    allInfo.So_HS = String(gTax.organizationData.ThongDiep.Body.So_HS);

    var argsArray = [];
    argsArray.push("4");
    argsArray.push(JSON.stringify({
        idtxn: "B11",
        taxType: gTax.taxType,
        accountNo: gTax.accountNo,
        allInfo: allInfo,
        tranfDtl: gTax.thongTinGiaoDich,
        isSave: document.getElementById('id.saveTaxQueryValue').value
    }));

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_ORGANIZATION"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
    data = getDataFromGprsCmd(gprsCmd);

    // gọi service và xử lí logic
    requestMBServiceCorp(data, true, 0, function (data) {
        var response = JSON.parse(data);
        if (response.respCode == RESP.get('COM_SUCCESS')
                && response.responseType == CONSTANTS.get('CMD_CO_PAY_TAX_ORGANIZATION')) {
            genReviewScreen(response.respJsonObj);
        } else if (response.respCode == RESP.get('COM_VALIDATE_FAIL')
                && response.responseType == CONSTANTS.get('CMD_CO_PAY_TAX_ORGANIZATION')) {
            showAlertText(response.respContent);
        } else if (response.respCode == 38) {
            showAlertText(CONST_STR.get('COM_TAX_AMOUNT_HIGH_THAN_BALANCE'));
        } else {
            if (response.respCode == '1019') {
                showAlertText(response.respContent);
            } else {
                showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
            }
            var tmpPageName = navController.getDefaultPage();
            var tmpPageType = navController.getDefaultPageType();
            navController.initWithRootView(tmpPageName, true, tmpPageType);
        }
    });

}

function genReviewScreen(data) {
    var xmlDoc = createXMLDoc();
    var rootNode = createXMLNode('review', '', xmlDoc);

    // Thông tin tài khoản
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), xmlDoc, sectionNode);

    var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TRANS_BATCH_ACC_LABEL'), xmlDoc, rowNode);
    createXMLNode("value", gTax.accountNo, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('CRE_DEBT_SURPLUS_AVAILABEL'), xmlDoc, rowNode);
    createXMLNode("value", gTax.soDuKhaDung + ' VND', xmlDoc, rowNode);

    //// Thông tin người nộp thuế
    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('TAX_PAY_TAX_CUST_INFO'), xmlDoc, sectionNode);
    // Ma so thue
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('COM_TAX_NUMBER'), xmlDoc, rowNode);
    createXMLNode("value", gTax.organizationData.ThongDiep.Body.NguoiNopTien.Ma_ST, xmlDoc, rowNode);
    // Nguoi nop thue
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_CUST_PAY_TAX'), xmlDoc, rowNode);
    createXMLNode("value", gTax.organizationData.ThongDiep.Body.NguoiNopTien.Ten_NNT, xmlDoc, rowNode);
    //Dia chi nguoi nop thue
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_CUST_PAY_TAX_ADDRESS'), xmlDoc, rowNode);
    createXMLNode("value", gTax.organizationData.ThongDiep.Body.NguoiNopTien.DiaChi, xmlDoc, rowNode);
    //Ten co quan thu
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_ORI_REVENUE_NAME'), xmlDoc, rowNode);
    createXMLNode("value", gTax.organizationData.ThongDiep.Body.Ten_DVQL, xmlDoc, rowNode);

    //thong tin thu nop
    //thong tin thu nop
    tmpXmlNodeInfo = createXMLNode('section', '', xmlDoc, rootNode);
    tmpXmlNodeTransTitle = createXMLNode('title', CONST_STR.get('TAX_INFO_REVENUE'), xmlDoc, tmpXmlNodeInfo);
    //Ma ngan hang thu huong
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_BANK_BENEFICIARY_CODE'), xmlDoc, rowNode);
    createXMLNode('value', gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ma_NH_TH, xmlDoc, rowNode);
    //Ten ngan hang thu huong
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_BANK_BENEFICIARY_NAME'), xmlDoc, rowNode);
    createXMLNode('value', gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ten_NH_TH, xmlDoc, rowNode);
    //Tai khoan thu huong
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY'), xmlDoc, rowNode);
    createXMLNode('value', gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.TaiKhoan_TH, xmlDoc, rowNode);
    //Ten tai khoan thu huong
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY_NAME'), xmlDoc, rowNode);
    createXMLNode('value', gTax.organizationData.ThongDiep.Body.TaiKhoan_NopTien.Ten_TaiKhoan_TH, xmlDoc, rowNode);
    //Ma nguyen te
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_EXCHANGERATES_CODE'), xmlDoc, rowNode);
    createXMLNode('value', gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.Ma_NT, xmlDoc, rowNode);
    //ty gia quy doi
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_EXCHANGERATES_VALUE'), xmlDoc, rowNode);
    createXMLNode('value', formatNumberToCurrency(gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.TyGia) + ' VND', xmlDoc, rowNode);    
    //tong tien nguyen te
    rowNode = createXMLNode('row', '', xmlDoc, tmpXmlNodeInfo);
    createXMLNode('label', CONST_STR.get('TAX_EXCHANGE_SUM'), xmlDoc, rowNode);
    createXMLNode('value', formatNumberToCurrency(gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.TongTien_NT) + '  ' + gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.Ma_NT, xmlDoc, rowNode);
    
    // Thông tin giao dịch
    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    createXMLNode("title", CONST_STR.get('TAX_INFO_DETAIL'), xmlDoc, sectionNode);

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
    var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);

    var trNode = createXMLNode("tr", '', xmlDoc, theadNode);
    createXMLNode("class", 'trow-title', xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("COM_NO"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("TAX_CONTENT"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("TAX_CONTENT_TITLE"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("TAX_CURRENCY_MONEY"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("TAX_CURRENCY_MONEY_LOCAL"), xmlDoc, trNode);
    createXMLNode("th", CONST_STR.get("TAX_CURRENCY_NOTE"), xmlDoc, trNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
    var sttNo = 0;
    for (var i = 0; i < gTax.thongTinGiaoDich.length; i++) {
         trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
         sttNo = sttNo + 1;
         var tdNode = createXMLNode("td", sttNo, xmlDoc, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("COM_NO"), xmlDoc, tdNode);

         tdNode = createXMLNode("td", gTax.thongTinGiaoDich[i].NDKT, xmlDoc, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CONTENT"), xmlDoc, tdNode);

         tdNode = createXMLNode("td", gTax.thongTinGiaoDich[i].Ten_NDKT, xmlDoc, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CONTENT_TITLE"), xmlDoc, tdNode);

         tdNode = createXMLNode("td", formatNumberToCurrency(gTax.thongTinGiaoDich[i].SoTien_NT) + ' ' + gTax.organizationData.ThongDiep.Body.ThongTin_NopTien.Ma_NT , xmlDoc, trNode);
         createXMLNode("class", 'td-right', xmlDoc, tdNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY"), xmlDoc, tdNode);

         tdNode = createXMLNode("td", formatNumberToCurrency(gTax.thongTinGiaoDich[i].SoTien_VND) + ' VND', xmlDoc, trNode);
         createXMLNode("class", 'td-right', xmlDoc, tdNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY_LOCAL"), xmlDoc, tdNode);

         tdNode = createXMLNode("td", gTax.thongTinGiaoDich[i].GhiChu, xmlDoc, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_NOTE"), xmlDoc, tdNode);
    }

    sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    var dataTotalAmount = String(data.totalAmount).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TOTAL_MONEY_REVENUE'), xmlDoc, rowNode);
    createXMLNode("value", dataTotalAmount + ' VND', xmlDoc, rowNode);

    var dataFee = String(data.fee).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_FEE'), xmlDoc, rowNode);
    createXMLNode("value", dataFee + ' VND', xmlDoc, rowNode);

    var dataSoDu = parseFloat(gTax.soDuKhaDung.replace(new RegExp(',', 'g'), ''))
					- parseFloat(data.totalAmount)
					- parseFloat(data.fee);
    dataSoDu = String(dataSoDu).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_LOCAL_BALANCE_CONT'), xmlDoc, rowNode);
    createXMLNode("value", dataSoDu + ' VND', xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_DESCRIPTION'), xmlDoc, rowNode);
    createXMLNode("value", data.decreption, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_LOCAL_DATE_TRANS'), xmlDoc, rowNode);
    createXMLNode("value", data.dateValue, xmlDoc, rowNode);

    rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
    createXMLNode("label", CONST_STR.get('TAX_SAVE_TAX_QUERY'), xmlDoc, rowNode);
    if (document.getElementById('id.saveTaxQuery').value == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
        createXMLNode("value", (gUserInfo.lang == 'EN') ? CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_EN[0] : CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_VN[0], xmlDoc, rowNode);
    } else {
        createXMLNode("value", document.getElementById('id.saveTaxQuery').value, xmlDoc, rowNode);
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

    ////req gui len
    var req = {
        sequence_id: data.sequence_id,
        transId: data.transaction_id,
        userID: data.userID,
        idtxn: data.idtxn
    };
    gCorp.cmdType = CONSTANTS.get("CMD_CO_PAY_TAX_PROCESSOR"); //port
    gCorp.requests = [req, null];

    setReviewXmlStore(xmlDoc);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

//Gọi đến màn hình "Danh sach người nhận thông báo"
function showReceiverList() {
    updateAccountListInfo();
    navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}

function domesticCallBack() {
    navController.popView(true);
}

function domesticCancel() {
    navController.initWithRootView('corp/payment_service/tax/pay_tax_create', true, 'xsl');
}