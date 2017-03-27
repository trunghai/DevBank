var arrAllAccObj = gUserInfo.accountList.concat(gUserInfo.accountListOther);
var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;
var xslAccHisTable;
var accDetailFlag = false;

var statusEditingName = false;
var editingAccNo = "";
var listInfo = new Object();

function loadInitXML() {
    return '';
}


function viewDidLoadSuccess() {
    /* TrungVQ Fix loi TK khong cap nhat */
    var args = ["", {
        idtxn: "A11",
        sequenceId: 4
    }];
    var gprsCmd = new GprsCmdObj(CONSTANTS.get(
            "CMD_ACCOUNT_TYPE_QUERY_DETAIL"), "", "",
        gUserInfo.lang, gUserInfo.sessionID, args);
    var requestData = getDataFromGprsCmd(gprsCmd);
    var onSuccess = function(data) {
        var response = JSON.parse(data);
        if (response.respCode == "0") {
            arrAllAccObj = response.respJsonObj;
        }
        genPageAccount();
    }
    requestMBServiceCorp(requestData, false, 0, onSuccess);
    /* TrungVQ Fix End */

    
}



function viewWillUnload() {
}


function viewBackFromOther() {
    accDetailFlag = true;
}

function genPageAccount() {

    //total page
    totalPage = calTotalPage(arrAllAccObj);

    //gen page indicator
    pageIndex = 1;


    //get object per page
    var arrMedial = new Array();
    arrMedial = getItemsPerPage(arrAllAccObj, pageIndex);

    //gen xml
    var tmpXmlDoc = genXmlDoc(arrMedial);
    //gen xsl
    xslAccHisTable = getCachePageXsl("corp/account/search_no_tenor/account_tenor_deposit");
    var tmpXslDoc = xslAccHisTable;
    //gen html from xml and xsl
    genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
        var tmpNode = document.getElementById('tabHost');
        tmpNode.innerHTML = oStr;
        genPagging(totalPage, pageIndex);
    });
}



//EVENT SELECTED PAGE
function pageIndicatorSelected(selectedIdx, selectedPage) {
    pageIndex = selectedIdx;

    var arrMedial = new Array();
    arrMedial = getItemsPerPage(arrAllAccObj, selectedIdx);
    //gen xml
    var tmpXmlDoc = genXmlDoc(arrMedial);
    //gen xsl
    xslAccHisTable = getCachePageXsl('corp/account/search_no_tenor/account_tenor_deposit');
    var tmpXslDoc = xslAccHisTable;

    genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
        var tmpNode = document.getElementById('tabHost');
        tmpNode.innerHTML = oStr;
        genPagging(totalPage, pageIndex);
    });
}

// //GEN PAGGING

function genPagging(arr, pageIdx) {

    //var nodePager = document.getElementById('pageIndicatorNums');
    var nodepage = document.getElementById('accdetail-pagination');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIdx));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(arrObj) {
    if (arrObj != null && arrObj.length > 0) {
        return Math.ceil(arrObj.length / itemsPerPage);
    }
    return 0;
}
//get items per page
function getItemsPerPage(arrObj, pageIdx) {
    var arrTmp = new Array();
    var from = 0;
    var to = 0;
    for (var i = 0; i < arrObj.length; i++) {
        from = (pageIdx - 1) * itemsPerPage;
        to = from + itemsPerPage;
        if (i >= from && i < to) {
            arrTmp.push(arrObj[i]);
        }

    }

    return arrTmp;
}

function genXmlDoc(inArrAcc) {
    var docXml = createXMLDoc();
    var tmpXmlRootNode;

    var tmpXmlRootNode = createXMLNode('account', '', docXml);
    var tmpXmlNodeTitle = createXMLNode('acctitle', '', docXml, tmpXmlRootNode);
    var tmpChildNode = createXMLNode('accnametitle', CONST_STR.get('ACCOUNT_ACC_NAME'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('accnotitle', CONST_STR.get('ACCOUNT_ACC_NO_TITLE'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('acccurrencytitle', CONST_STR.get('COM_TYPE_MONEY'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('accbaltitle', CONST_STR.get('ACCOUNT_BALANCE_TITLE'), docXml, tmpXmlNodeTitle);
    tmpChildNode = createXMLNode('accavbaltitle', CONST_STR.get('ACCOUNT_AVAILABLE_BALANCE'), docXml, tmpXmlNodeTitle);
   
    console.log(inArrAcc);
    for (var i = 0; i < inArrAcc.length; i++) { //descByUser
        var inAccObj = inArrAcc[i];
        console.log(inAccObj);
        var tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
        tmpChildNode = createXMLNode('acconclick', inAccObj.SO_TK, docXml, tmpXmlNodeInfo);
        
        tmpChildNode = createXMLNode('accnametitle', CONST_STR.get('ACCOUNT_ACC_NAME'), docXml, tmpXmlNodeInfo);
        
        tmpChildNode = createXMLNode('accnamecontent', inAccObj.TEN_TK, docXml, tmpXmlNodeInfo);

        tmpChildNode = createXMLNode('accnotitle', CONST_STR.get('ACCOUNT_ACC_NO_TITLE'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('accnocontent', inAccObj.SO_TK, docXml, tmpXmlNodeInfo);

        tmpChildNode = createXMLNode('acccurrencytitle', CONST_STR.get('COM_TYPE_MONEY'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('acccurrencycontent', inAccObj.DON_VI, docXml, tmpXmlNodeInfo);

        var soDu = (inAccObj.DON_VI == "VND") ? formatNumberToCurrency(inAccObj.SO_DU) : formatToUSD(inAccObj.SO_DU);
        tmpChildNode = createXMLNode('accbaltitle', CONST_STR.get('ACCOUNT_BALANCE_TITLE'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('accbalcontent', soDu, docXml, tmpXmlNodeInfo);

        var soDuKhaDung = (inAccObj.DON_VI == "VND") ? formatNumberToCurrency(inAccObj.SO_DU_KHA_DUNG) : formatToUSD(inAccObj.SO_DU_KHA_DUNG);
        tmpChildNode = createXMLNode('accavbaltitle', CONST_STR.get('ACCOUNT_AVAILABLE_BALANCE'), docXml, tmpXmlNodeInfo);
        tmpChildNode = createXMLNode('accavbalcontent', soDuKhaDung, docXml, tmpXmlNodeInfo);
    }


    return docXml;
}


var gprsResp = new GprsRespObj("", "", "", "");
var tmpAcc = new AccountObj();

//hien thi thong tin chi tiet account
function viewAccDetail(idx) {

    if (hasMainContentScrollEvent) {
        hasMainContentScrollEvent = false;
        return;
    }

    if (statusEditingName) return;

    var data = {};
    var arrayArgs = new Array();

    for (var i = 0; i < arrAllAccObj.length; i++) {
        var tmpAccIdx = arrAllAccObj[i];
        if (tmpAccIdx.SO_TK == idx) {
            tmpAcc = tmpAccIdx;
            setSelectedAccInfoObj(tmpAccIdx);
            break;
        }
    }
    gAccount.accountId = idx;
    navCachedPages["corp/account/search_no_tenor/account_history"] = null;
    navController.pushToView('corp/account/search_no_tenor/account_history', true, 'xsl'); //using cache
}

function requestRenameAccNoSuccess(e) {
    statusEditingName = false;
    gprsResp = parserJSON(e, false);
    if (parseInt(gprsResp.respCode) == 0) {
        var tmpNodeAccName = document.getElementById('displayAccName' + editingAccNo).innerHTML = document.getElementById('txtNewDes' + inID).value;
    } else {
        logInfo('rename account fail');
    }

}

function requestRenameAccNoFail() {
    statusEditingName = false;
}

function getArrayClient(objectValueClient) {
    var arrayClientInfo = new Array();
    arrayClientInfo.push("2");
    arrayClientInfo.push(objectValueClient);

    return arrayClientInfo;
}

//hien thi chi tiet thong tin account nguoi dung
function showAccountDetail() {

}

function showEditButton(inID) {
    if (gModeScreenView == CONST_MODE_SCR_SMALL) return;
    var tmpEditBtn = document.getElementById('divEdit' + inID);
    if (tmpEditBtn) {
        tmpEditBtn.style.display = '';
    }
}

function hideEditButton(inID) {
    var tmpEditBtn = document.getElementById('divEdit' + inID);
    if (tmpEditBtn) {
        tmpEditBtn.style.display = 'none';
    }
}

function showEditPanel(inID) {
    statusEditingName = true;

    hideEditButton(inID);

    var tmpEditPanel = document.getElementById('divEditSave' + inID);
    if (tmpEditPanel) {
        tmpEditPanel.style.display = '';
        document.getElementById('txtNewDes' + inID).value = document.getElementById('displayAccName' + inID).innerHTML;
    }
}

function saveContent(inID) {
    statusEditingName = true;
    showEditButton(inID);
    
    var tmpEditPanel = document.getElementById('divEditSave' + inID);
    if (tmpEditPanel) {
        tmpEditPanel.style.display = 'none';
    }
    var tmpInputNode = document.getElementById('txtNewDes' + inID);
    if (tmpInputNode && tmpInputNode.value && tmpInputNode.value.length > 0 && (tmpInputNode.value != document.getElementById('displayAccName' + inID).innerHTML)) {
        editingAccNo = inID;
        document.getElementById('displayAccName' + inID).innerHTML = document.getElementById('txtNewDes' + inID).value;
        for (var i = 0; i < gUserInfo.accountList.length; i++) {
            var tmpObj = gUserInfo.accountList[i];
            if (tmpObj.accountNumber == inID && tmpObj.descByUser) {
                tmpObj.descByUser = document.getElementById('txtNewDes' + inID).value;
                break;
            }
        }
        for (var i = 0; i < gUserInfo.accountListOther.length; i++) {
            var tmpObj = gUserInfo.accountListOther[i];
            if (tmpObj.accountNumber == inID && tmpObj.descByUser) {
                tmpObj.descByUser = document.getElementById('txtNewDes' + inID).value;
                break;
            }
        }
        for (var i = 0; i < gUserInfo.accountListDetail.length; i++) {
            var tmpObj = gUserInfo.accountListDetail[i];
            if (tmpObj.accountNumber == inID && tmpObj.descByUser) {
                tmpObj.descByUser = document.getElementById('txtNewDes' + inID).value;
                break;
            }
        }

        console.log(inID + ", " + tmpInputNode.value);

        var objectValueClient = new Object();
        objectValueClient.idtxn = "A11";
        objectValueClient.sequenceId = "1";
        objectValueClient.idAccount = inID;
        objectValueClient.newNameAcc = tmpInputNode.value;


        var arrayClientInfo = new Array();
        arrayClientInfo.push("1");
        arrayClientInfo.push(objectValueClient);

        var gprsCmd = new GprsCmdObj(1302, "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

        data = getDataFromGprsCmd(gprsCmd);
        requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);

    } else {
        statusEditingName = false;
    }
}

function requestResultServiceSuccess(e){
    statusEditingName = false;
    gprsResp = JSON.parse(e);
    if(parseInt(gprsResp.respCode) == 0){
        var tmpNodeAccName = document.getElementById('displayAccName' + editingAccNo).innerHTML = document.getElementById('txtNewDes' + editingAccNo).value;
    }
}

function requestResultServiceFail(){
    statusEditingName = false;
}
