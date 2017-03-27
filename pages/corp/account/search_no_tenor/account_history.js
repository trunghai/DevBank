var gprsResp = new GprsRespObj("", "", "", "");
var selectedFlowType = 'ALL';
var selectedTransType = 'ALL';
var totalPage = 0;
var itemsPerPage = 10;
var pageIndex = 1;
var advSearchStatus = true;
var idAccount;
var sequenceId;
var listTransactionInfo = new Array();
var ccy = '';
var searchInfo = {
    transType: "",
    maker: "",
    status: "",
    fromDate: "",
    endDate: ""
};


function loadInitXML() {
    return '';
}


function viewBackFromOther() {}

function viewDidLoadSuccess() {
    loadData();
    sequenceId = "2";
    initData();
}

function initData() {
    angular.module("EbankApp").controller("account-history", function ($scope, requestMBServiceCorp) {
        init();
        function init() {
            var objectValueClient = new Object();
            objectValueClient.idtxn = "A11";
            objectValueClient.sequenceId = "2";
            objectValueClient.idAccount = gAccount.accountId;

            var gprsCmd = new GprsCmdObj(1302, "", "",
                gUserInfo.lang, gUserInfo.sessionID, getArrayClient(objectValueClient));
            data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, requestMBServiceSuccesss, requestMBServiceFail);
        }

        $scope.sendJSONRequest =  function () {
            if (!advSearchStatus) {
                //tim kiem nang cao
                var strFromMoney = document.getElementById("idFromMoney").value;
                var strToMoney = document.getElementById("idToMoney").value;


                if (parseInt(removeSpecialChar(strFromMoney)) > parseInt(removeSpecialChar(strToMoney))) {
                    showAlertText(CONST_STR.get("AMOUT_QUERY_CHECK_MONEY"));
                    return;
                }
                //advSearchStatus = false;
            }
            var arrayClientInfo = new Array();
            arrayClientInfo.push("3");
            if (getValueClientInfo("4") != null) {
                arrayClientInfo.push(getValueClientInfo("3"));
                var gprsCmd = new GprsCmdObj(1302, "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
                data = getDataFromGprsCmd(gprsCmd);
                requestMBServiceCorp.post(data, requestMBServiceSuccesss, requestMBServiceFail);

            }
        }

        function requestMBServiceSuccesss(e) {
            gprsResp = e;
            if (gprsResp.respCode == '0') {
                if (sequenceId == "2") {
                    var listObj = gprsResp.respJsonObj;
                    showDetailAcc(listObj);
                    document.getElementById("searchBtn").disabled = "";
                } else if (sequenceId == "3") {
                    //search ket qua giao dich
                    gAccount.listObject = gprsResp.respJsonObj;
                    if (gAccount.listObject.length == 0) {
                        document.getElementById("idHistoryInfo").style.display = "";
                        document.getElementById("tblSummary").style.display = "none";
                        document.getElementById("tblContent").style.display = "none";
                        document.getElementById("idSearchFun").style.display = "none";
                        setTimeout(function() {
                            mainContentScroll.scrollToElement(document.getElementById("idHistoryInfo"));
                        }, 100);

                    } else {
                        document.getElementById("idHistoryInfo").style.display = "none";
                        document.getElementById("tblSummary").style.display = "";
                        document.getElementById("tblContent").style.display = "";
                        document.getElementById("idSearchFun").style.display = "";
                        var credit = 0,
                            debit = 0,
                            balance = 0;
                        var sumCredit = 0;
                        var sumDebit = 0;
                        var openBalance = 0;
                        var endBalance = 0;


                        for (var i = 0; i < gAccount.listObject.length; i++) {
                            var tmp = gAccount.listObject[i];
                            if (tmp == null || tmp == undefined) {
                                break;
                            }
                            if (tmp.CREDIT != null) {
                                credit = parseFloat(removeSpecialChar(tmp.CREDIT));
                                sumCredit += credit;
                                debit = 0;
                            }
                            if (tmp.DEBIT != null) {
                                debit = parseFloat(removeSpecialChar(tmp.DEBIT));
                                sumDebit += debit;
                                credit = 0;
                            }

                            //tinh so du dau ki
                            if (i == 0 || i == gAccount.listObject.length - 1) {
                                if (tmp.RUNNING_BAL != null) {
                                    balance = parseFloat(removeSpecialChar(tmp.RUNNING_BAL));
                                }
                                if (i == 0) {
                                    endBalance = balance;
                                }
                                if (i == gAccount.listObject.length - 1) {
                                    openBalance = balance + debit - credit;;
                                }
                            }
                        }
                        totalPage = calTotalPage(gAccount.listObject);
                        pageIndex = 1;
                        var listItemPage = new Array();
                        listItemPage = getItemsPerPage(gAccount.listObject, pageIndex);
                        var tmpXmlDoc = genXMLListTransaction(listItemPage);
                        var tmpXslDoc = getCachePageXsl("corp/account/search_no_tenor/account_history_list_result");
                        genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
                            var tmpNode = document.getElementById('tblContent');
                            tmpNode.innerHTML = oStr;
                            genPagging(totalPage, pageIndex);
                        }, null, true, document.getElementById('tblContent'));

                        showTableSummary(sumCredit, sumDebit, openBalance, endBalance);
                    }

                }
            } else {
                //search liet ke giao dich khong thanh cong
                showAlertText(gprsResp.respContent);
            }
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}


function viewWillUnload() {}


function goBack() {
    navController.popView();
}

function showAccountSelection() {
    var tmpArray1 = [];
    var tmpArray2 = [];
    for (var i = 0; i < arrAllAccObj.length; i++) {
        var tmpAcc = arrAllAccObj[i];
        tmpArray1.push(tmpAcc.SO_TK);
        tmpArray2.push(formatNumberToCurrency(tmpAcc.SO_DU_KHA_DUNG));
    }
    document.addEventListener("evtSelectionDialog", handleSelectionAccountList, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);

    showDialogList(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), tmpArray1, tmpArray2, true);
}

function loadData() {
    listTransactionInfo = new Array();
    var listAccountUser = getSelectedAccInfoObj();
    var sourceAccount = document.getElementById("acchis_accountno");
    sourceAccount.value = listAccountUser.SO_TK;

    createDatePicker('id.begindate', 'span.begindate');
    createDatePicker('id.enddate', 'span.enddate');
}

//event: selection dialog list
function handleSelectionAccountList(e) {
    handleSelectionAccountListClose();
    for (var i = 0; i < arrAllAccObj.length; i++) {
        if (arrAllAccObj[i].SO_TK == e.selectedValue1) {
            setSelectedAccIdx(i);
            setSelectedAccInfoObj(arrAllAccObj[i]);
            idAccount = e.selectedValue1;
            sendRequestData(idAccount);
        }
    }
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var tagAccNo = document.getElementById("acchis_accountno");
        if (tagAccNo.nodeName == "INPUT") {
            tagAccNo.value = e.selectedValue1;
        } else {
            tagAccNo.innerHTML = e.selectedValue1;
        }
    }

}

function handleSelectionAccountListClose(e) {
    document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
    document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);
}


function showDetailAcc(listTransInfo) {
    resetViewWhenChangeAcc();

    var listInfo = listTransInfo[0];
    var tmpXslDoc = getCachePageXsl("corp/account/search_no_tenor/account_info_table");
    var docXml = createXMLDoc();
    var tmpXmlRootNode;
    var tmpXmlRootNode = createXMLNode('account', '', docXml);
    var inAccObj = getSelectedAccInfoObj(); //gUserInfo.accountListDetail[tmpIndex];

    var tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);

    ccy = listInfo.CODACCTCURR;
    //loai tai khoan
    var tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_TYPE_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent1', CONST_STR.get('ACCOUNT_TYPE_DETAIL_TITLE'), docXml, tmpXmlNodeInfo);

    //loai tien
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACC_CURRENCY_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', listInfo.CODACCTCURR, docXml, tmpXmlNodeInfo);

    //ngay mo tai khoan
    tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
    tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_OPENDATE_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent1', listInfo.ACCTOPENDT, docXml, tmpXmlNodeInfo);

    //chi nhanh mo tai khoan
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACC_BRANCH_OPEN_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', listInfo.BRANCH_NAME, docXml, tmpXmlNodeInfo);

    //so du
    tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
    tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_BALANCE_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent1', CurrencyFormattedNew(listInfo.NUMBALANCE) + ' ' +  listInfo.CODACCTCURR, docXml, tmpXmlNodeInfo);


    //so du kha dung
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', CurrencyFormattedNew(listInfo.NUMAVAILBAL) + ' ' +  listInfo.CODACCTCURR, docXml, tmpXmlNodeInfo);

    //lai suat
    tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
    if (parseInt(inAccObj.profitCost) < parseInt(inAccObj.profitReven)) {
        tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_OVERDRAFT_RATE_TITLE'), docXml, tmpXmlNodeInfo);
    } else {
        tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_RATE_TITLE'), docXml, tmpXmlNodeInfo);
    }
    tmpChildNode = createXMLNode('acccontent1', listInfo.RATE + ' %' + ((gUserInfo.lang == 'EN') ? "/year" : "/năm"), docXml, tmpXmlNodeInfo);

    //han muc thau chi
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACC_OVERDRAFT_LIMIT_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', listInfo.NUMAVAILCREDIT, docXml, tmpXmlNodeInfo);


    //ngay cap HMTC
    tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
    tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACC_OVERDRAFT_START_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent1', listInfo.TRN_TODAY, docXml, tmpXmlNodeInfo);

    //ngay het HMTC
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACC_OVERDRAFT_END_TITLE'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', listInfo.EXPIRE_CREDIT, docXml, tmpXmlNodeInfo);

    //so tien phong toa
    tmpXmlNodeInfo = createXMLNode('accinfo', '', docXml, tmpXmlRootNode);
    tmpChildNode = createXMLNode('acctitle1', CONST_STR.get('ACCOUNT_AMOUNT_BLOCK'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent1', CurrencyFormattedNew(listInfo.BLOCK_AMOUNT) + listInfo.CODACCTCURR, docXml, tmpXmlNodeInfo);

    //so tien cho duyet
    tmpChildNode = createXMLNode('acctitle2', CONST_STR.get('ACCOUNT_SEARCH_4'), docXml, tmpXmlNodeInfo);
    tmpChildNode = createXMLNode('acccontent2', CurrencyFormattedNew(listInfo.MONEY_UN_AUTHORIZE) + listInfo.CODACCTCURR, docXml, tmpXmlNodeInfo);

    genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr) {
        var tmpNode = document.getElementById('id.accInfo');
        tmpNode.innerHTML = oStr;
    });
    if (searchInfo.status == "") {
        document.getElementById("id.begindate").value = listInfo.DATE_PREVIOUS;
        document.getElementById("id.enddate").value = listInfo.DATE_NOW;
        searchInfo.status = "true";
    }
    document.getElementById("tblContent").innerHTML = "";
    document.getElementById("idHistoryInfo").style.display = "none";
    document.getElementById("tblSummary").style.display = "none";
    document.getElementById("idSearchFun").style.display = "none";
}

function showMoneyFlowSelection() {
    var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_HIS_MONEYFLOW_TYPE_EN : CONST_HIS_MONEYFLOW_TYPE_VN;
    var tmpArray2 = CONST_HIS_MONEYFLOW_TYPE_ID;

    document.addEventListener("evtSelectionDialog", handleSelectionMoneyFlowList, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectionMoneyFlowListClose, false);
    showDialogList(CONST_STR.get('ACC_HIS_MONEY_FLOW_TITLE'), tmpArray1, tmpArray2, false);
}

function handleSelectionMoneyFlowList(e) {
    handleSelectionMoneyFlowListClose();
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var tagAccNo = document.getElementById("idMonneyFlow");
        if (tagAccNo.nodeName == "INPUT") {
            tagAccNo.value = e.selectedValue1;
        } else {
            tagAccNo.innerHTML = e.selectedValue1;
        }
    }
    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        selectedFlowType = e.selectedValue2;
        gAccount.flowMoney = e.selectedValue2;
    }
}

function handleSelectionMoneyFlowListClose(e) {
    document.removeEventListener("evtSelectionDialogClose", handleSelectionMoneyFlowListClose, false);
    document.removeEventListener("evtSelectionDialog", handleSelectionMoneyFlowList, false);
}

function showTransTypeSelection() {
    var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_HIS_TRANS_TYPE_EN : CONST_HIS_TRANS_TYPE_VN;
    var tmpArray2 = CONST_HIS_TRANS_TYPE_ID;

    document.addEventListener("evtSelectionDialog", handleSelectionTransTypeList, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectionTransTypeListClose, false);
    showDialogList(CONST_STR.get('ACC_HIS_TRANS_TYPE_TITLE'), tmpArray1, tmpArray2, false);
}

function handleSelectionTransTypeList(e) {
    handleSelectionTransTypeListClose();
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var tagAccNo = document.getElementById("idTransaction");
        if (tagAccNo.nodeName == "INPUT") {
            tagAccNo.value = e.selectedValue1;
        } else {
            tagAccNo.innerHTML = e.selectedValue1;
        }
    }
    if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        selectedTransType = e.selectedValue2;
        gAccount.transaction = e.selectedValue2;
    }
}

function handleSelectionTransTypeListClose(e) {
    document.removeEventListener("evtSelectionDialogClose", handleSelectionTransTypeListClose, false);
    document.removeEventListener("evtSelectionDialog", handleSelectionTransTypeList, false);
}

/*** SHOW ADVAND SEARCH ***/
function showAdvandSearch() {
    var advControls = document.getElementById("adv-search-controls");
    var tmpBtnAdvSearch = document.getElementById('acchis.btnAdvSearch');


    if (advSearchStatus) {
        //tim kiem nang cao
        advControls.style.display = "table";

        tmpBtnAdvSearch.innerHTML = CONST_STR.get('ACC_HIS_ADV_NOR_SEARCH_BTN');
        document.getElementById("idHistoryInfo").style.display = "none";

        document.getElementById("idMonneyFlow").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER");
        document.getElementById("idTransaction").value = CONST_STR.get("COM_TXT_SELECTION_PLACEHOLDER");
        document.getElementById("idAccountSendReceive").value = "";
        document.getElementById("idNameAccountSendReceive").value = "";
        document.getElementById("idFromMoney").value = "";
        document.getElementById("idToMoney").value = "";
        document.getElementById("idNumTransaction").value = "";
        document.getElementById("idDescription").value = "";

        advSearchStatus = false;
    } else {

        //tim kiem thuong
        advSearchStatus = true;
        tmpBtnAdvSearch.innerHTML = CONST_STR.get('ACC_HIS_ADV_SEARCH_BTN');
        advControls.style.display = "none";
        selectedFlowType = 'ALL';
        selectedTransType = 'ALL';
    }
    mainContentScroll.refresh();
}


//ham day gia tri cua client len server, truyen vao gia tri sequence Id
function getValueClientInfo(seqId) {
    //thuc hien ket qua search
    var idAccountSendReceive = document.getElementById("idAccountSendReceive").value;
    var idNameAccountSendReceive = document.getElementById("idNameAccountSendReceive").value;
    var fromDate = document.getElementById('id.begindate').value;
    var toDate = document.getElementById("id.enddate").value;
    var idFromMoney = document.getElementById("idFromMoney").value;
    var idToMoney = document.getElementById("idToMoney").value;
    var idNumTransaction = document.getElementById("idNumTransaction").value;
    var idDescription = document.getElementById("idDescription").value;
    var idMoneyFlow = document.getElementById("idMonneyFlow").value;
    var idTransaction = document.getElementById("idTransaction").value;
    var idAccount = document.getElementById("acchis_accountno").value;


    var months = calculateDifferentMonth(fromDate, toDate);
    if(months == null) {
        showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
        return null;
    }
    if (months > 3) {
        showAlertText(CONST_STR.get("CORP_MSG_ACC_INPUT_TWO_DATE_TRANS"));
        return null;
    }

    var today = getStringFromDate();
    if (getDiffDaysBetween(fromDate, today, "dd/MM/yyyy") > 365) {
        showAlertText(CONST_STR.get("ACC_HIS_DATE_OVER_1YEAR"));
        return null;
    }

    if (getDiffDaysBetween(today, toDate, "dd/MM/yyyy") > 0) {
        showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
        return null;
    }

    if (gAccount.flowMoney == null) {
        gAccount.flowMoney = "ALL";
    }
    if (gAccount.transaction == null) {
        gAccount.transaction = "ALL";
    }

    var arrTransType = (gUserInfo.lang == 'EN') ? CONST_HIS_TRANS_TYPE_EN : CONST_HIS_TRANS_TYPE_VN;
    var arrMoneyFlow = (gUserInfo.lang == 'EN') ? CONST_HIS_MONEYFLOW_TYPE_EN : CONST_HIS_MONEYFLOW_TYPE_VN;

    if (idMoneyFlow == CONST_STR.get("TAX_TABLE_TITLE_SELECT")) {
        idMoneyFlow = "";
    }
    if (idTransaction == CONST_STR.get("TAX_TABLE_TITLE_SELECT")) {
        idTransaction = "";
    }

    for (var i = 0; i < arrMoneyFlow.length; i++) {
        if (idMoneyFlow == arrMoneyFlow[i]) {
            idMonenyFlow = CONST_HIS_MONEYFLOW_TYPE_ID[i];
            break;
        }
    }

    for (var i = 0; i < arrTransType.length; i++) {
        if (idTransaction == arrTransType[i]) {
            idTransaction = CONST_HIS_TRANS_TYPE_ID[i];
            break;
        }
    }

    if (advSearchStatus) {
        gAccount.flowMoney = "ALL";
        gAccount.transaction = "ALL";
        idAccountSendReceive = "";
        idNameAccountSendReceive = "";
        idFromMoney = "";
        idToMoney = "";
        idDescription = "";
        idNumTransaction = "";

    }

    var objectValueClient = new Object();
    sequenceId = seqId;
    objectValueClient.idtxn = "A11";
    objectValueClient.sequenceId = sequenceId;
    objectValueClient.idAccount = idAccount;
    objectValueClient.pageNo = "1";
    objectValueClient.fromDate = fromDate;
    objectValueClient.toDate = toDate;
    objectValueClient.idMoneyFlow = gAccount.flowMoney;
    objectValueClient.idTransaction = gAccount.transaction;
    objectValueClient.idAccountSendReceive = idAccountSendReceive;
    objectValueClient.idNameAccountSendReceive = idNameAccountSendReceive;
    objectValueClient.idFromMoney = keepOnlyNumber(idFromMoney);
    objectValueClient.idToMoney = keepOnlyNumber(idToMoney);
    objectValueClient.idDescription = idDescription;
    objectValueClient.numTransaction = idNumTransaction;

    return objectValueClient;
}
// xuat bao cao ghi no ghi co
function sendRequestReportDebit(pRefNo, pDrCr, pTime, pEntry_no){
    var arr = new Array();
    var drcr = 'D';
    var idAccount = document.getElementById("acchis_accountno").value;
    arr.push(15);
    
    /* tao doi tuong client*/    
    if(pDrCr == '')
        drcr = 'C';

    var objectValueClient = new Object();
    sequenceId = 15;
    objectValueClient.idtxn = "A11";
    objectValueClient.sequenceId = 15;
    objectValueClient.idAccount = idAccount;
    objectValueClient.trnRefNo = pRefNo;
    objectValueClient.drcr = drcr;  
	objectValueClient.time = pTime;
	objectValueClient.entry_sr_no = pEntry_no;

    arr.push(objectValueClient);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arr);
    data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}

//send du lieu len de xuat file excel
function sendRequestExportExcel() {
    var arrayClientInfo = new Array();
    arrayClientInfo.push("6");
    arrayClientInfo.push(getValueClientInfo("6"));
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
    data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}

function requestMBServiceSuccess(e) {
    gprsResp = JSON.parse(e);
    if (gprsResp.respCode == '0') {
        if (sequenceId == "2") {
            var listObj = gprsResp.respJsonObj;
            showDetailAcc(listObj);
            document.getElementById("searchBtn").disabled = "";
        } else if (sequenceId == "3") {
            //search ket qua giao dich
            gAccount.listObject = gprsResp.respJsonObj;
            if (gAccount.listObject.length == 0) {
                document.getElementById("idHistoryInfo").style.display = "";
                document.getElementById("tblSummary").style.display = "none";
                document.getElementById("tblContent").style.display = "none";
                document.getElementById("idSearchFun").style.display = "none";
                setTimeout(function() {
                    mainContentScroll.scrollToElement(document.getElementById("idHistoryInfo"));
                }, 100);
                
            } else {
                document.getElementById("idHistoryInfo").style.display = "none";
                document.getElementById("tblSummary").style.display = "";
                document.getElementById("tblContent").style.display = "";
                document.getElementById("idSearchFun").style.display = "";
                var credit = 0,
                    debit = 0,
                    balance = 0;
                var sumCredit = 0;
                var sumDebit = 0;
                var openBalance = 0;
                var endBalance = 0;


                for (var i = 0; i < gAccount.listObject.length; i++) {
                    var tmp = gAccount.listObject[i];
                    if (tmp == null || tmp == undefined) {
                        break;
                    }
                    if (tmp.CREDIT != null) {
                        credit = parseFloat(removeSpecialChar(tmp.CREDIT));
                        sumCredit += credit;
                        debit = 0;
                    }
                    if (tmp.DEBIT != null) {
                        debit = parseFloat(removeSpecialChar(tmp.DEBIT));
                        sumDebit += debit;
                        credit = 0;
                    }

                    //tinh so du dau ki
                    if (i == 0 || i == gAccount.listObject.length - 1) {
                        if (tmp.RUNNING_BAL != null) {
                            balance = parseFloat(removeSpecialChar(tmp.RUNNING_BAL));
                        }
                        if (i == 0) {
                            endBalance = balance;
                        }
                        if (i == gAccount.listObject.length - 1) {
                            openBalance = balance + debit - credit;;
                        }
                    }
                }
                totalPage = calTotalPage(gAccount.listObject);
                pageIndex = 1;
                var listItemPage = new Array();
                listItemPage = getItemsPerPage(gAccount.listObject, pageIndex);
                var tmpXmlDoc = genXMLListTransaction(listItemPage);
                var tmpXslDoc = getCachePageXsl("corp/account/search_no_tenor/account_history_list_result");
                genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
                    var tmpNode = document.getElementById('tblContent');
                    tmpNode.innerHTML = oStr;
                    genPagging(totalPage, pageIndex);
                }, null, true, document.getElementById('tblContent'));

                showTableSummary(sumCredit, sumDebit, openBalance, endBalance);
            }

        }
    } else {
        //search liet ke giao dich khong thanh cong
        showAlertText(gprsResp.respContent);
    }
}


function showTableSummary(sumCredit, sumDebit, openBalance, endBalance) {
    document.getElementById("tblSummary").style.display = "";
    document.getElementById("idCredit").innerHTML = ": " + CurrencyFormattedNew(sumCredit) + ' ' +  ccy;
    document.getElementById("idDebit").innerHTML = ": " + CurrencyFormattedNew(sumDebit) + ' ' +  ccy;

    //neu tim kiem thuong moi hien
    if (advSearchStatus) {
        document.getElementById("idBeginBalance").innerHTML = ": " + CurrencyFormattedNew(openBalance) + ' ' +  ccy;
        document.getElementById("idEndBalance").innerHTML = ": " + CurrencyFormattedNew(endBalance) + ' ' +  ccy;
        document.getElementById("trBeginBalance").style.display = "";
        document.getElementById("trEndBalance").style.display = "";
    } else {
        document.getElementById("trBeginBalance").style.display = "none";
        document.getElementById("trEndBalance").style.display = "none";
    }
    document.getElementById("idHistoryInfo").style.display = 'none';
}

function genXMLListTransaction(listTransactionInfo) {
    var docXml = createXMLDoc();
    var rootNode = createXMLNode('transTable', '', docXml);
    var chidNode;
    var rowNode;
    for (var i = 0; i < listTransactionInfo.length; i++) {
        var obj = listTransactionInfo[i];
        var credit = obj.CREDIT;
        var debit = obj.DEBIT;
        if (credit == null) {
            credit = "";
        }
        if (debit == null) {
            debit = "";
        }

        rowNode = createXMLNode("rows", "", docXml, rootNode);
        childNode = createXMLNode('time', obj.DATBOOKDATE, docXml, rowNode); //thoi gian
        childNode = createXMLNode('explain', obj.TXTTXNDESC, docXml, rowNode); //dien giai
        childNode = createXMLNode('debit', CurrencyFormattedNew(debit), docXml, rowNode); //ghi no ghi co
        childNode = createXMLNode('credit', CurrencyFormattedNew(credit), docXml, rowNode); //ghi no ghi co
        childNode = createXMLNode('surplus', CurrencyFormattedNew(obj.RUNNING_BAL), docXml, rowNode); //so du
        childNode = createXMLNode('transaction', obj.TXTREFERENCENO, docXml, rowNode); //ma gia dich
		childNode = createXMLNode('entry_sr_no', obj.AC_ENTRY_SR_NO, docXml, rowNode); //ma gia dich duy nhat, sua theo comment cua nhannt1
    }
    return docXml;
}

function requestMBServiceFail(e) {

}

function genPagging(arr, pageIndex) {

    var nodepage = document.getElementById('id.search');
    var tmpStr = genPageIndicatorHtml(totalPage, Number(pageIndex));
    nodepage.innerHTML = tmpStr;
}

function calTotalPage(arrObj) {
    if (arrObj != null && arrObj.length > 0) {
        return Math.ceil(arrObj.length / itemsPerPage);
    }
    return 0;
}

function getItemsPerPage(arrObj, pageIndex) {
    var arrTmp = new Array();
    var from = 0;
    var to = 0;
    for (var i = 0; i < arrObj.length; i++) {
        from = (pageIndex - 1) * itemsPerPage;
        to = from + itemsPerPage;
        if (i >= from && i < to) {
            arrTmp.push(arrObj[i]);
        }

    }

    return arrTmp;
}



function resetViewWhenChangeAcc() {
    advSearchStatus = false;
    showAdvandSearch();
    advSearchStatus = true; //advande search ready
}

function sendRequestData(idAccount) {
    var objectValueClient = new Object();
    sequenceId = "2";
    objectValueClient.idtxn = "A11";
    objectValueClient.sequenceId = sequenceId;
    objectValueClient.idAccount = idAccount;

    var gprsCmd = new GprsCmdObj(1302, "", "",
        gUserInfo.lang, gUserInfo.sessionID, getArrayClient(objectValueClient));
    data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, requestMBServiceFail);
    document.getElementById("searchBtn").disabled = true;
}

function checkServiceSuccess(gprsResp, codeService) {
    return (gprsResp.respCode == '0' && parseInt(gprsResp.responseType) == codeService);
}

function successPaggingCallback(strHtml) {
    var div = document.getElementById("id.search");
    div.innerHTML = strHtml;

    var tmpArr = new Array();
    genPagging(periodicResult, pageIndex);
}

function failPaggingCallback() {

}

function pageIndicatorSelected(selectedIdx, selectedPage) {

    pageIndex = selectedIdx;
    currentPageIndex = selectedIdx;
    var arrMedial = new Array();
    arrMedial = getItemsPerPage(gAccount.listObject, selectedIdx);

    var tmpXmlDoc = genXMLListTransaction(arrMedial);
    var tmpXslDoc = getCachePageXsl("corp/account/search_no_tenor/account_history_list_result");

    genHTMLStringWithXML(tmpXmlDoc, tmpXslDoc, function(oStr) {
        var tmpNode = document.getElementById('tblContent');
        tmpNode.innerHTML = oStr;
        genPagging(totalPage, pageIndex);
    });
}

function printAccHistory() {
    // Backup ngay trong dk search
    var fromDate = document.getElementById("id.begindate").value;
    var toDate = document.getElementById("id.enddate").value;

    var tmpNodeMain = document.getElementById("mainViewContent");
    var printNode = tmpNodeMain.getElementsByTagName("div")[0];
    var beforePrint = function() {
        document.getElementById("id.begindate").value = fromDate;
        document.getElementById("id.enddate").value = toDate;
    };
    var afterPrint = function() {
        document.getElementById("id.begindate").value = fromDate;
        document.getElementById("id.enddate").value = toDate;
        createDatePicker("id.begindate", "span.begindate");
        createDatePicker("id.enddate", "span.enddate");
    }
    printNodeWithAll(printNode, beforePrint, afterPrint);

}

function displayIdHtml(name, value) {
    document.getElementById(name).style.display = name;
}

function handleInputAcc(event) {
    if ((event.charCode >= 48 && event.charCode <= 57) || // 0-9
        (event.charCode >= 65 && event.charCode <= 90) || // A-Z
        (event.charCode >= 97 && event.charCode <= 122)) {
        return true;
    }
    return false;
}
function onChangeAccountNumber(event, element){
	if (event == undefined) {
        event = window.event || event;
    }
    var keyUnicode = event.charCode || event.keyCode;
    if (event !== undefined) {
        switch (keyUnicode) {

            case 16:
                break; // Shift
            case 17:
                break; // Ctrl
            case 18:
                break; // Alt
            case 27:
                this.value = '';
                break; // Esc: clear entry
            case 35:
                break; // End
            case 36:
                break; // Home
            case 37:
                break; // cursor left
            case 38:
                break; // cursor up
            case 39:
                break; // cursor right
            case 40:
                break; // cursor down
            case 78:
                break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
            case 110:
                break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
            case 190:
                break; // .
            default:
            {
				var ctrlDown = event.ctrlKey||event.metaKey // Mac support
				if (ctrlDown && keyUnicode==65) return false; // a
				else if (ctrlDown && keyUnicode==67) return false; // c
				else if (ctrlDown && keyUnicode==86) return false; // v
				else if (ctrlDown && keyUnicode==88) return false; // x
				element.value = element.value.replace(/[^a-zA-Z0-9]/g, '');
            }
        }
    }
}

function handleInputAmount(e, des) {
    var tmpVale = des.value;
    formatCurrency(e, des);
}

function calculateDifferentMonth(valFromDate, valToDate) {
    var from = valFromDate.split("/");
    var to = valToDate.split("/");
    var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) -1, parseInt(from[0], 10));
    var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) -1, parseInt(to[0], 10));
    
    if(fromDate > toDate){
       
        return null;
    }

    var months = 0;
    months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
    months -= fromDate.getMonth();
    months += toDate.getMonth();
    if (toDate.getDate() < fromDate.getDate()) {
        months--;
    }
    return months;
}
