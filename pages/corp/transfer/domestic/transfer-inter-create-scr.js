/**
 * Created by HungNV.FPT
 * Date: 2/11/2015
 */
var dataOb;

gTrans.redirect = 'corp/transfer/domestic/transfer-inter-create-scr';
var arrBank = new Array();
function loadInitXML() {

}

function viewBackFromOther() {
    gTrans.viewBackDTI = true;
}

function viewDidLoadSuccess() {
    readAmount(function (response) {
        dataOb = {"responseType":"1604","respCode":"0","respContent":"Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!","respRaw":"","arguments":[],"respJson":"","respJsonObj":{"banklist":[{"CODE":"201","SHORT_NAME":"Vietinbank","NAME_VN":"Ngân hàng công thương Việt Nam","NAME_EN":"Vietnam Joint Stock Commercial Bank for Industry and Trade"},{"CODE":"203","SHORT_NAME":"Vietcombank","NAME_VN":"Ngân hàng TMCP Ngoại Thương","NAME_EN":"Joint Stock Commercial Bank for Foreign Trade of Vietnam"},{"CODE":"311","SHORT_NAME":"MB","NAME_VN":"Ngân hàng Quân Đội","NAME_EN":"Military Commercial Joint stock Bank"},{"CODE":"353","SHORT_NAME":"Kienlongbank","NAME_VN":"Ngân hàng Kiên Long","NAME_EN":"Kien Long Commercial Joint Stock Bank"},{"CODE":"902","SHORT_NAME":"QTDCS","NAME_VN":"Quỹ tín dụng cơ sở","NAME_EN":"Quy tin dung co so"},{"CODE":"609","SHORT_NAME":"Maybank","NAME_VN":"Malayan Banking Berhad","NAME_EN":"Maybank"},{"CODE":"617","SHORT_NAME":"HSBC","NAME_VN":"NH TNHH Một Thành Viên HSBC Việt Nam","NAME_EN":"The HongKong and Shanghai Banking Corporation"},{"CODE":"625","SHORT_NAME":"OCBC","NAME_VN":"Oversea - Chinese Bank","NAME_EN":"Oversea - Chinese Banking Corporation"},{"CODE":"630","SHORT_NAME":"FCNB","NAME_VN":"First Commercial Bank","NAME_EN":"First Commercial Bank"},{"CODE":"635","SHORT_NAME":"MBB","NAME_VN":"Malayan Banking Berhad","NAME_EN":"Malayan Banking Berhad"},{"CODE":"650","SHORT_NAME":"DBS","NAME_VN":"DBS Bank Ltd","NAME_EN":"DBS Bank Ltd"},{"CODE":"304","SHORT_NAME":"DongA Bank","NAME_VN":"Ngân hàng Đông Á","NAME_EN":"Dong A Commercial Joint stock Bank"},{"CODE":"333","SHORT_NAME":"OCB","NAME_VN":"Ngân hàng Phương Đông","NAME_EN":"Orient Commercial Joint Stock Bank"},{"CODE":"501","SHORT_NAME":"VID public","NAME_VN":"Ngân hàng VID Public","NAME_EN":"VID public"},{"CODE":"611","SHORT_NAME":"CCBC","NAME_VN":"China Construction Bank Corporation","NAME_EN":"China Construction Bank Corporation"},{"CODE":"626","SHORT_NAME":"KEB","NAME_VN":"Korea Exchange Bank","NAME_EN":"Korea Exchange Bank"},{"CODE":"636","SHORT_NAME":"SMBC","NAME_VN":"Sumitomo Mitsui Banking Corporation HCM","NAME_EN":"Sumitomo Mitsui Banking Corporation HCMC"},{"CODE":"637","SHORT_NAME":"WHHCM","NAME_VN":"NH Woori HCM","NAME_EN":"Woori BANK HCMC"},{"CODE":"645","SHORT_NAME":"HSBC HN","NAME_VN":"Ngân hàng The Hongkong và Thượng Hải","NAME_EN":"NH The Hongkong and Shanghai"},{"CODE":"649","SHORT_NAME":"ICB","NAME_VN":"ICB of China CN Ha Noi","NAME_EN":"ICB of China CN Ha Noi"},{"CODE":"204","SHORT_NAME":"VBARD","NAME_VN":"Ngân hàng NN \u0026 PTNT VN","NAME_EN":"Vienam Bank for Agriculture and Rural Development "},{"CODE":"303","SHORT_NAME":"Sacombank","NAME_VN":"Ngân hàng Sài Gòn Thương Tín","NAME_EN":"Saigon Thuong Tin Commercial Joint Stock Bank"},{"CODE":"315","SHORT_NAME":"Vung Tau","NAME_VN":"Ngân hàng Vũng Tàu","NAME_EN":"Ngan hang Vung Tau"},{"CODE":"359","SHORT_NAME":"Baoviet Bank","NAME_VN":"Ngân hàng TMCP Bảo Việt","NAME_EN":"Baoviet Joint Stock Commercial Bank"},{"CODE":"651","SHORT_NAME":"TFCBTPHCM","NAME_VN":"Taipei Fubon Commercial Bank TP Ho Chi Minh","NAME_EN":"Taipei Fubon Commercial Bank TP Ho Chi Minh"},{"CODE":"602","SHORT_NAME":"ANZ","NAME_VN":"Ngân hàng ANZ Việt Nam","NAME_EN":"ANZ Bank"},{"CODE":"603","SHORT_NAME":"HLO","NAME_VN":"Ngân hàng Hong Leong Viet Nam","NAME_EN":"Hong Leong Bank Viet Nam"},{"CODE":"615","SHORT_NAME":"BOC","NAME_VN":"Bank of Communications","NAME_EN":"Bank of Communications"},{"CODE":"616","SHORT_NAME":"Shinhan Bank","NAME_VN":"Ngân hàng TNHH MTV Shinhan Việt Nam","NAME_EN":"Shinhan Bank"},{"CODE":"618","SHORT_NAME":"UOB","NAME_VN":"United Oversea Bank","NAME_EN":"United Oversea Bank"},{"CODE":"620","SHORT_NAME":"BC","NAME_VN":"BANK OF CHINA","NAME_EN":"BANK OF CHINA"},{"CODE":"634","SHORT_NAME":"CTU","NAME_VN":"Ngân hàng Cathay","NAME_EN":"Cathay United Bank"},{"CODE":"639","SHORT_NAME":"MCB_HCM","NAME_VN":"Mizuho Corporate Bank - TP HCM","NAME_EN":"Mizuho Corporate Bank - TP HCM"},{"CODE":"642","SHORT_NAME":"TFCBHN","NAME_VN":"Taipei Fubon Commercial Bank Ha Noi","NAME_EN":"Taipei Fubon Commercial Bank Ha Noi"},{"CODE":"646","SHORT_NAME":"SCBank HN","NAME_VN":"Ngân hàng Standard Chartered Bank HN","NAME_EN":"Standard Chartered Bank HN"},{"CODE":"202","SHORT_NAME":"BIDV","NAME_VN":"Ngân hàng Đầu tư và Phát triển Việt Nam","NAME_EN":"Bank for Investment and Development of Vietnam"},{"CODE":"302","SHORT_NAME":"MSB","NAME_VN":"Ngân hàng Hàng Hải Việt Nam","NAME_EN":"Maritime Bank"},{"CODE":"308","SHORT_NAME":"Saigonbank","NAME_VN":"Ngân hàng Sài Gòn Công Thương","NAME_EN":"Saigon Bank for Industry and Trade"},{"CODE":"310","SHORT_NAME":"Techcombank","NAME_VN":"Ngân hàng Kỹ thương Việt Nam","NAME_EN":"Việt Nam Technological and Commercial Joint stock Bank"},{"CODE":"341","SHORT_NAME":"PG Bank","NAME_VN":"Ngân hàng Xăng dầu Petrolimex","NAME_EN":"Petrolimex group commercial Joint stock Bank"},{"CODE":"657","SHORT_NAME":"BNP Paribas HN","NAME_VN":"Ngan hang BNP Paribas CN Ha Noi","NAME_EN":"BNP Paribas Ha Noi"},{"CODE":"701","SHORT_NAME":"KBNN","NAME_VN":"Kho Bạc Nhà Nước","NAME_EN":"Kho Bac Nha Nuoc"},{"CODE":"604","SHORT_NAME":"SCBank","NAME_VN":"Ngân hàng Standard Chartered Bank Việt Nam","NAME_EN":"Standard Chartered Bank"},{"CODE":"606","SHORT_NAME":"SCSB","NAME_VN":"The Shanghai Commercial \u0026 Savings Bank CN Đồng Nai","NAME_EN":"The Shanghai Commercial \u0026 Savings Bank CN Dong Nai"},{"CODE":"623","SHORT_NAME":"MICB","NAME_VN":"Mega ICBC Bank","NAME_EN":"Mega ICBC Bank"},{"CODE":"627","SHORT_NAME":"CHASE","NAME_VN":"The Chase Manhattan Bank","NAME_EN":"The Chase Manhattan Bank"},{"CODE":"641","SHORT_NAME":"IBK","NAME_VN":"Industrial Bank of Korea ","NAME_EN":"Industrial Bank of Korea "},{"CODE":"643","SHORT_NAME":"CBA","NAME_VN":"Commonwealth Bank of Australia","NAME_EN":"Commonwealth Bank of Australia"},{"CODE":"644","SHORT_NAME":"ANZ HN","NAME_VN":"Australia and New Zealand Banking(ANZ)","NAME_EN":"Australia and New Zealand Banking(ANZ)"},{"CODE":"648","SHORT_NAME":"BIDC HCM","NAME_VN":"NH ĐT\u0026PT Campuchia CN HCM","NAME_EN":"Bank for investment and development of Cambodia HCMC"},{"CODE":"208","SHORT_NAME":"VDB","NAME_VN":"Ngân hàng Phát triển Việt Nam","NAME_EN":"Vietnam Development Bank"},{"CODE":"306","SHORT_NAME":"Nam A Bank","NAME_VN":"Ngân hàng Nam Á","NAME_EN":"Nam A Commercial Joint stock Bank"},{"CODE":"309","SHORT_NAME":"VPBank","NAME_VN":"Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng","NAME_EN":"VietNam prosperity Joint stock commercial Bank"},{"CODE":"313","SHORT_NAME":"NASB","NAME_VN":"Ngân hàng Bắc Á","NAME_EN":"North Asia Commercial Joint Stock Bank"},{"CODE":"317","SHORT_NAME":"SeABank","NAME_VN":"Ngân hàng TMCP Đông Nam Á","NAME_EN":"South East Asia Commercial Joint stock  Bank"},{"CODE":"339","SHORT_NAME":"VNCB","NAME_VN":"NH TMCP Xây dựng Việt Nam","NAME_EN":"Vietnam Construction Bank"},{"CODE":"352","SHORT_NAME":"NCB","NAME_VN":"Ngân hàng Quoc Dan","NAME_EN":"National Citizen Bank"},{"CODE":"605","SHORT_NAME":"CitibankHN","NAME_VN":"Citi Bank Ha Noi","NAME_EN":"Citibank Ha Noi"},{"CODE":"207","SHORT_NAME":"VBSP","NAME_VN":"Ngân hàng Chính sách xã hội Việt Nam","NAME_EN":"Vietnam Bank for Social Policies"},{"CODE":"319","SHORT_NAME":"Ocean Bank","NAME_VN":"Ngân hàng Đại Dương","NAME_EN":"Ocean Bank"},{"CODE":"334","SHORT_NAME":"SCB","NAME_VN":"Ngân hàng TMCP Sài Gòn","NAME_EN":"Saigon Commercial Joint Stock Bank"},{"CODE":"327","SHORT_NAME":"VietCapital Bank","NAME_VN":"NHTMCP Bản Việt","NAME_EN":"BanViet Commercial Jont stock Bank"},{"CODE":"401","SHORT_NAME":"Banknetvn","NAME_VN":"Công ty cổ phần chuyển mạch tài chính quốc gia Việt Nam","NAME_EN":"VietNam national Financial switching Joint Stock Company"},{"CODE":"502","SHORT_NAME":"IVB","NAME_VN":"Indovina Bank","NAME_EN":"Indovina Bank"},{"CODE":"601","SHORT_NAME":"BPCEICOM","NAME_VN":"Ngân hàng BPCEIOM CN  TP Hồ Chí Minh","NAME_EN":"NH BPCEIOM HCMC"},{"CODE":"614","SHORT_NAME":"BNP Paribas HCM","NAME_VN":"BNP Paribas Bank HCM","NAME_EN":"Bank of Paris and the Netherlands HCMC"},{"CODE":"619","SHORT_NAME":"DB","NAME_VN":"DEUTSCHE BANK","NAME_EN":"DEUTSCHE BANK"},{"CODE":"622","SHORT_NAME":"BTMU HCM","NAME_VN":"BANK OF TOKYO - MITSUBISHI UFJ","NAME_EN":"BANK OF TOKYO - MITSUBISHI UFJ"},{"CODE":"631","SHORT_NAME":"KMB","NAME_VN":"Ngân hàng Kookmin","NAME_EN":"Kookmin Bank"},{"CODE":"101","SHORT_NAME":"SBV","NAME_VN":"Ngân Hàng Nhà Nước","NAME_EN":"State Bank of Vietnam"},{"CODE":"305","SHORT_NAME":"Eximbank","NAME_VN":"Ngân hàng Xuất nhập khẩu Việt Nam","NAME_EN":"Vietnam Export Import Commercial Joint Stock Bank"},{"CODE":"307","SHORT_NAME":"ACB","NAME_VN":"Ngân hàng Á Châu","NAME_EN":"Asia Commercial Bank"},{"CODE":"314","SHORT_NAME":"VIB","NAME_VN":"Ngân hàng Quốc tế","NAME_EN":"Vietnam International Commercial Joint Stock Bank"},{"CODE":"320","SHORT_NAME":"GP Bank","NAME_VN":"Ngân hàng Dầu khí Toàn cầu","NAME_EN":"Global Petro Commercial Joint Stock Bank"},{"CODE":"348","SHORT_NAME":"SHB","NAME_VN":"Ngân hàng Sài Gòn - Hà Nội","NAME_EN":"Saigon - Hanoi Commercial Joint Stock Bank"},{"CODE":"355","SHORT_NAME":"VietA Bank","NAME_VN":"Ngân hàng Việt Á","NAME_EN":"Viet A Commercial Joint Stock Bank"},{"CODE":"356","SHORT_NAME":"Vietbank","NAME_VN":"Ngân hàng Việt Nam Thương Tín","NAME_EN":"Vietnam Thương tin Commercial Joint Stock Bank"},{"CODE":"357","SHORT_NAME":"LPB","NAME_VN":"Ngan hàng TMCP Bưu điện Liên Việt","NAME_EN":"Lien Viet Post Bank"},{"CODE":"321","SHORT_NAME":"HDBank","NAME_VN":"Ngân hàng Phát triển TP HCM","NAME_EN":"Housing Development Bank"},{"CODE":"323","SHORT_NAME":"ABBank","NAME_VN":"Ngân hàng An Bình","NAME_EN":"An Binh Commercial Joint stock  Bank"},{"CODE":"360","SHORT_NAME":"PVcombank","NAME_VN":"NH TMCP Đại Chúng Viet Nam","NAME_EN":"PVcombank"},{"CODE":"654","SHORT_NAME":"CitibankHCM","NAME_VN":"Citi Bank TP HCM","NAME_EN":"CitiBank HCM"},{"CODE":"504","SHORT_NAME":"Vinasiam Bank","NAME_VN":"Ngân hàng Liên doanh Việt Thái","NAME_EN":"Vinasiam Bank"},{"CODE":"613","SHORT_NAME":"Mizuho Bank","NAME_VN":"Mizuho Corporate Bank","NAME_EN":"Mizuho Bank"},{"CODE":"624","SHORT_NAME":"WHHN","NAME_VN":"WOORI BANK Hà Nội","NAME_EN":"WOORI BANK Hanoi"},{"CODE":"629","SHORT_NAME":"CTBC","NAME_VN":"Ngân hàng CTBC CN TP Hồ Chí Minh","NAME_EN":"The ChinaTrust Commercial Bank HCMC"},{"CODE":"638","SHORT_NAME":"BIDC HN","NAME_VN":"NH ĐT\u0026PT Campuchia CN Hà Nội","NAME_EN":"Bank for investment and development of Cambodia HN"},{"CODE":"640","SHORT_NAME":"HNCB","NAME_VN":"Hua Nan Commercial Bank","NAME_EN":"Hua Nan Commercial Bank"},{"CODE":"936","SHORT_NAME":"SMBC HN","NAME_VN":"Sumitomo Mitsui Banking Corporation HN","NAME_EN":"Sumitomo Mitsui Banking Corporation HN"},{"CODE":"324","SHORT_NAME":"Viet Hoa Bank","NAME_VN":"Ngân hàng Việt Hoa","NAME_EN":"Ngan hang Viet Hoa"},{"CODE":"901","SHORT_NAME":"COOPBANK","NAME_VN":"Ngân hàng Hợp tác Việt Nam","NAME_EN":"Co-Operation Bank of Viet Nam"},{"CODE":"505","SHORT_NAME":"VRB","NAME_VN":"Ngân hàng Liên doanh Việt Nga","NAME_EN":"Vietnam - Russia Bank"},{"CODE":"608","SHORT_NAME":"FCNB HN","NAME_VN":"First Commercial Bank Ha Noi","NAME_EN":"First Commercial Bank Ha Noi"},{"CODE":"612","SHORT_NAME":"BANGKOK  BANK","NAME_VN":"BANGKOK  BANK","NAME_EN":"BANGKOK  BANK"},{"CODE":"621","SHORT_NAME":"CACIB","NAME_VN":"Credit Agricole Corporate and Investment Bank","NAME_EN":"Credit Agricole Corporate and Investment Bank"},{"CODE":"632","SHORT_NAME":"SPB","NAME_VN":"Ngân hàng SinoPac","NAME_EN":"SinoPac Bank"},{"CODE":"653","SHORT_NAME":"BTMU HN","NAME_VN":"BANK OF TOKYO - MITSUBISHI UFJ - HN","NAME_EN":"BANK OF TOKYO - MITSUBISHI UFJ - HN"}],"initData":[{"CUST_AC_NO":"98888888001","SENDMETHOD":"1","BALANCE":response.result.amount,"AC_STAT_NO_DR":"N","AC_STAT_NO_CR":"N"}]}};
        genSequenceFormInterBank();
        if ((gTrans.viewBackDTI == undefined || !gTrans.viewBackDTI) && (gTrans.showBankSelection == undefined || !gTrans.showBankSelection)) {
            // khoi tao ac gia tri mac dinh cho cac control
            var tmp = {};
            if (gTrans.dti) {
                tmp = JSON.parse(JSON.stringify(gTrans.dti));
            }

            gTrans.dti = {
                idtxn: "T13"
            };

            gTrans.dti.citadCode = tmp.citadCode;
            loadInitData();

        }
    });
     /*else {

        document.getElementById('id.accountno').value = gTrans.sourceAccDTI;
        document.getElementById("trans.sourceaccoutbalance").innerHTML = gTrans.sourceAccBal;
        document.getElementById("trans.fee").value = gTrans.dti.feeType;
        document.getElementById("manage.bene").value = gTrans.dti.beneValue;
        document.getElementById("id.approver").value = gTrans.dti.sendMethod;
        displayTempNameInput();
    }*/

    //Tooltip when hover book
    document.getElementById("ds_id").innerHTML = CONST_STR.get('TRANSFER_DS_THUHUONG');
    document.getElementById("mau_id").innerHTML = CONST_STR.get('TRANSFER_MAU_THUHUONG');
    gTrans.viewBackDTI = false;
    gTrans.showBankSelection = false;

}

function showInputSelection(type) {
    gTrans.dti.inputType = type;
    var listSelection = [];
    var listValue = [];
    var dialogTitle;
    var fshowAccout = false;

    if (type == 1) { // tai khoan chuyen
        var account;
        fshowAccout = true;
        for (var i = 0; i < gTrans.listSrcAccount.accountno.length; i++) {
            if (gTrans.listSrcAccount.ghiNo[i] == "N") {
                listSelection.push(gTrans.listSrcAccount.accountno[i]);
                listValue.push(formatNumberToCurrency(gTrans.listSrcAccount.balance[i]));
            }
        }
        dialogTitle = CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC');

    } else if (type == 2) { // nguoi chiu phi
        listSelection = (gUserInfo.lang == 'EN') ? CONST_KEY_TRANS_FEE_TYPE_EN : CONST_KEY_TRANS_FEE_TYPE_VN;
        listValue = CONST_KEY_TRANS_FEE_TYPE_ID;
        dialogTitle = CONST_STR.get('TRANS_FEE_TYPE_DIALOG_TITLE');

    } else if (type == 3) { // luu nguoi thu huong
        listSelection = (gUserInfo.lang == 'EN') ? CONST_TRANS_DTI_PAYEE_EN : CONST_TRANS_DTI_PAYEE_VN;
        listValue = CONST_VAL_PAYEE;
        dialogTitle = CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT');
    }

    document.addEventListener("evtSelectionDialog", handleShowInput, false);
    document.addEventListener("evtSelectionDialogClose", handleShowInputClose, false);
    showDialogList(dialogTitle, listSelection, listValue, fshowAccout);
}

function handleShowInput(e) {
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        document.removeEventListener("evtSelectionDialog", handleShowInput, false);
        if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
            var inputObj;
            if (gTrans.dti.inputType == 1) {
                inputObj = document.getElementById("id.accountno");
                gTrans.sourceAccDTI = e.selectedValue1;
            } else if (gTrans.dti.inputType == 2) {
                inputObj = document.getElementById("trans.fee");
                gTrans.dti.feeType = e.selectedValue1;
            } else if (gTrans.dti.inputType == 3) {
                inputObj = document.getElementById("manage.bene");
                gTrans.dti.beneValue = e.selectedValue1;
            }
            inputObj.value = e.selectedValue1;
        }
        if (e.selectedValue2 != undefined && (e.selectedValue2 != null)) {
            if (gTrans.dti.inputType == 1) {
                var nodeAccBal = document.getElementById("trans.sourceaccoutbalance");
                nodeAccBal.innerHTML = "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + e.selectedValue2 + " VND</div>";
                gTrans.sourceAccBal = nodeAccBal.innerHTML;
            } else {
                if (gTrans.dti.inputType == 2) {
                    gTrans.dti.feeId = e.selectedValue2;
                } else if (gTrans.dti.inputType == 3) {
                    gTrans.dti.manage = e.selectedValue2;
                    displayTempNameInput();
                }
            }
        }
    }
}

function handleShowInputClose(e) {
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        document.removeEventListener("evtSelectionDialogClose", handleShowInputClose, false);
        document.removeEventListener("evtSelectionDialog", handleShowInput, false);
    }
}

// show tai khoan nhan
function showPayeePage() {
    gTrans.showDialogCorp = true;
    document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
    document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
    document.addEventListener("tabChange", tabChanged, false);
    document.addEventListener("onInputSelected", okSelected, false);
    //Tao dialog
    dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TH', CONST_PAYEE_INTER_TRANSFER);
    dialog.USERID = gCustomerNo;
    dialog.PAYNENAME = "1";
    dialog.TYPETEMPLATE = "0";
    dialog.showDialog(callbackShowDialogSuccessed, '');
}

function callbackShowDialogSuccessed(node) {}

function handleInputPayeeAccOpen(e) {
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        handleInputPayeeAccClose();
        var obj = e.dataObject;
        var srcAccount = document.getElementById('id.accountno');
        var desAccount = document.getElementById("trans.destaccountnointer");
        var receiverName = document.getElementById("trans.destaccountname");
        var brachName = document.getElementById('trans.branchName');
        var numamout = document.getElementById('trans.amount');
        var amountText = document.getElementById("trans.amounttotext");
        if (e.tabSelected == 'tab1') {
            if (obj != null && obj != undefined) {
                desAccount.value = obj.customerNo;
                receiverName.value = obj.peopleName;
                brachName.value = obj.partnerName + '-' + obj.branchName;
                gTrans.dti.citadCode = obj.citadCode;
                gTrans.dti.bankCode = obj.partnerCode;
                gTrans.dti.branchName = obj.branchName;
            }

        } else {
            if (obj != null && obj != undefined) {
                srcAccount.value = obj.tai_khoan_nguon;
                desAccount.value = obj.tai_khoan_dich;
                receiverName.value = obj.ten_tai_khoan_dich.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
                brachName.value = obj.ngan_hang_nhan + '-' + obj.cn_ngan_hang_nhan;
                var content = document.getElementById('trans.content');
                content.value = obj.noi_dung;
                gTrans.dti.citadCode = obj.ma_citad;
                gTrans.dti.bankCode = obj.ma_ngan_hang_nhan;
                gTrans.dti.branchName = brachName.value;

                var numamoutVal = obj.so_tien;

                numamout.value = formatNumberToCurrency(numamoutVal)
                var strAmount = convertNum2WordWithLang(keepOnlyNumber(numamoutVal), gUserInfo.lang);
                amountText.innerHTML = "<div class='txtmoneystyle'>" + CONST_STR.get('TRANS_LOCAL_NUM_TO_WORD') + ": " + strAmount + "</div>";

                //HIEN THI SO DU CUA TAI KHOAN NGUON    
                var newBalance = getBalanceByAccNo(obj.tai_khoan_nguon);
                if (newBalance != null && newBalance != undefined) {
                    var balanceAcct = document.getElementById("trans.sourceaccoutbalance");
                    balanceAcct.innerHTML = "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(newBalance) + " VND" + "</div>";
                }
                gTrans.sourceAccDTI = srcAccount.value;
                gTrans.balanceVal = balanceAcct.innerHTML;
            }
        }
    }
}

function handleInputPayeeAccClose(e) {
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        document.removeEventListener("evtSelectionDialogClose", handleInputPayeeAccClose, false);
        document.removeEventListener("evtSelectionDialog", handleInputPayeeAccOpen, false);
        document.removeEventListener("tabChange", tabChanged, false);
        document.removeEventListener("onInputSelected", okSelected, false);
    }
}

// event: change tab
function tabChanged(e) {
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        var node = e.selectedValueTab;
        if (node.id == 'tab1') {
            if (dialog != null && dialog != undefined) {
                gTrans.showDialogCorp = true;
                dialog.activeDataOnTab('tab1');
                dialog.USERID = gCustomerNo;
                dialog.PAYNENAME = "1";
                dialog.TYPETEMPLATE = "0";
                dialog.requestData(node.id);
            }
        } else {
            if (dialog != null && dialog != undefined) {
                gTrans.showDialogCorp = true;
                dialog.activeDataOnTab('tab2');
                dialog.USERID = gCustomerNo;
                dialog.PAYNENAME = "1";
                dialog.TYPETEMPLATE = "1";
                dialog.requestData(node.id);
            }
        }

    }
    gTrans.showDialogCorp = null;
}

// event: click ok button
function okSelected(e) {
    tmpDestinationAcc = "";
    tmpDestinationAccName = "";
    if (currentPage == "corp/transfer/domestic/transfer-inter-create-scr") {
        handleInputPayeeAccClose();
        var destinationAcc = document.getElementById("trans.destaccountnointer");
        if ((e.selectedValue != undefined) && (e.selectedValue != null) && (e.selectedValue.length > 0)) {
            destinationAcc.value = e.selectedValue;
        }
    }
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

// show chon ngan hang
function showBankSelection() {
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
    gTrans.dti.bankCityCode = e.bankCityCode;
}

function handleInputAmount(e, des) {
    formatCurrency(e, des);
    var numStr = convertNum2WordWithLang(keepOnlyNumber(des.value), gUserInfo.lang);
    var nodeNumTxt = document.getElementById("trans.amounttotext");
    nodeNumTxt.innerHTML = "<div class='txtmoneystyle'>" + CONST_STR.get('TRANS_LOCAL_NUM_TO_WORD') + ": " + numStr + "</div>";
}

//Gen sequence form
function genSequenceFormInterBank() {
    //get sequence form xsl
    var tmpXslDoc = getCachePageXsl("sequenceform");
    //create xml
    var tmpStepNo = 301;
    var docXml = createXMLDoc();
    var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
    var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
    //gen html string
    genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr) {
        var tmpNode = document.getElementById('seqFormInterBank');
        tmpNode.innerHTML = oStr;
    });
}

 function onSuccessInitData(data) {
    var response = data;
    var respJSON = response.respJsonObj.initData;
    // lay danh sach account kha dung
    gTrans.listSrcAccount = {
        accountno: [],
        balance: [],
        ghiNo: [],
        ghiCo: []
    };
    for (var i = 0; i < respJSON.length; i++) {
        gTrans.listSrcAccount.accountno.push(respJSON[i].CUST_AC_NO);
        gTrans.listSrcAccount.balance.push(respJSON[i].BALANCE);
        gTrans.listSrcAccount.ghiNo.push(respJSON[i].AC_STAT_NO_DR);
        gTrans.listSrcAccount.ghiCo.push(respJSON[i].AC_STAT_NO_CR);
    };
    for(var i=0;i<response.respJsonObj.banklist.length;i++){
        arrBank.push(response.respJsonObj.banklist[i].CODE);
    }

    // lay phuong thuc gui thong bao cho nguoi duyet
    var sendMethod = document.getElementById("id.approver");
    var viewListAuth = document.getElementById("link.view.listAuth");
     sendMethod.value = CONST_STR.get("COM_NOTIFY_1");

     gTrans.dti.sendMethod = sendMethod.value;
    // if(respJSON.length > 0)
    // {
    //     viewListAuth.style.visibility = "visible";
    //     if (respJSON[0].SENDMETHOD == 0) {
    //         sendMethod.value = CONST_STR.get("COM_NOTIFY_0");
    //         viewListAuth.style.visibility = "hidden";
    //     } else if (respJSON[0].SENDMETHOD == 1) {
    //         sendMethod.value = CONST_STR.get("COM_NOTIFY_1");
    //     } else if (respJSON[0].SENDMETHOD == 2) {
    //         sendMethod.value = CONST_STR.get("COM_NOTIFY_2");
    //     } else if (respJSON[0].SENDMETHOD == 3) {
    //         sendMethod.value = CONST_STR.get("COM_NOTIFY_3");
    //     }
    //     gTrans.dti.sendMethod = sendMethod.value;
    // }


    var feeType = document.getElementById('trans.fee');
    var beneType = document.getElementById('manage.bene');

    // nguoi chiu phi
    var listFeeType = (gUserInfo.lang == 'EN') ? CONST_KEY_TRANS_FEE_TYPE_EN : CONST_KEY_TRANS_FEE_TYPE_VN;
    feeType.value = listFeeType[0];
    gTrans.dti.feeId = CONST_KEY_TRANS_FEE_TYPE_ID[0];

    // mau chuyen khoan
    var listBeneType = (gUserInfo.lang == 'EN') ? CONST_TRANS_DTI_PAYEE_EN : CONST_TRANS_DTI_PAYEE_VN;
    beneType.value = listBeneType[0];
    gTrans.dti.manage = CONST_VAL_PAYEE[0];
    gTrans.dti.feeType = feeType.value;
    gTrans.dti.beneValue = beneType.value;

    if (response.respJsonObj.templateData) {
        requestTemplateSuccess(response.respJsonObj.templateData[0]);
    }
}

function loadInitData() {
    var request = {
        idtxn: gTrans.dti.idtxn,
        sequence_id: 1
    };

    if (gTrans.templateId != undefined && gTrans.templateId != null) {
        request.beneId = gTrans.templateId;
    }

    var data = {};
    var arrayArgs = [];
    arrayArgs.push("1");
    arrayArgs.push(request);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_DTI_INTERNAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    data = getDataFromGprsCmd(gprsCmd);
    onSuccessInitData(dataOb);
    // requestMBServiceCorp(data, true, 0, onSuccessInitData);

    // angular.module("EbankApp").controller('transfer-domestic',  function ($scope, requestMBServiceCorp) {
    //    
    //    
    // }); 
    //
    // // Start app
    // angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
    //requestMBServiceCorp(data, false, 0, requestLoadInitSuccess);

    gTrans.templateId = null;
}

function sendJSONRequest() {
    var data = {};
    var sourceAccVal = document.getElementById("id.accountno").value;
    var desAccVal = document.getElementById("trans.destaccountnointer").value;
    var desAccName = document.getElementById("trans.destaccountname").value;
    var amountTrans = document.getElementById("trans.amount").value;
    var contentTrans = document.getElementById("trans.content").value;
    var sampleName = document.getElementById("id.sample.name").value;
    var branchName = document.getElementById('trans.branchName').value;
    // luu vet gia tri gui di
    gTrans.sourceAccDTI = sourceAccVal;
    gTrans.sourceAccBal = document.getElementById("trans.sourceaccoutbalance").innerHTML;
    // validate data
    if (sourceAccVal.length != 11) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_ACC'));
        return;
    }

    if ((desAccVal.length < 1) || (desAccVal == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER'))) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_ACC_NUMBER'));
        return;
    }
    if (!checkAvailableChar(desAccVal)) {
        showAlertText(CONST_STR.get('ERR_INCORRECT_DESTINATION_ACC'));
        return;
    }

    if (desAccName.length < 1) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_DESTACC_NAME'));
        return;
    }

    if ((gTrans.dti.citadCode == undefined) || (gTrans.dti.citadCode == null)) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_BANKCODE'));
        return;
    }

    var amount = removeSpecialChar(amountTrans);
    if ((parseInt(amount) <= 0) || (amountTrans.length < 1)) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_AMOUNT'));
        return;
    }

    if (contentTrans.length < 1) {
        showAlertText(CONST_STR.get('ERR_INPUT_NO_CONTENT'));
        return;
    }

    if (desAccName.length > 71) {
        showAlertText(CONST_STR.get('TRANS_ERR_ACC_NAME_BENE'));
        return;
    }

    if(desAccName.indexOf('&') >= 0)
    {
        showAlertText(CONST_STR.get('TRANS_ERR_SYMBOL_SPECIAL'));
        return;
    }

    if (contentTrans.length > 160) {
        showAlertText(CONST_STR.get('TRANS_ERR_INPUT_CONTENT_TRANS'));
        return;
    }

    if(gTrans.dti.manage == 'TP' && sampleName == '')
    {
        showAlertText(CONST_STR.get('TRANS_ERR_NAME_TEMP_TRANS'));
        return;
    }


    var request = {};
    request.srcAccount = sourceAccVal;
    request.desAccount = desAccVal;
    request.desAccName = desAccName.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
    request.desBranchCode = gTrans.dti.citadCode;
    request.idDesBank = gTrans.dti.bankCode;
    request.chargeincl = gTrans.dti.feeId;
    request.amount = amount;
    request.contentTrans = contentTrans.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
    request.isSavePayee = gTrans.dti.manage;

    request.templateName = sampleName;
    request.sequence_id = "2";
    request.idtxn = "T13";
    request.codTrncurr = "VND";

    gTrans.dti.templateName = sampleName;
    gTrans.idtxn = "T13";

    var arrayArgs = [];
    var jsonRequest = JSON.stringify(request);
    arrayArgs.push("1");
    arrayArgs.push(jsonRequest);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_DTI_INTERNAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    data = getDataFromGprsCmd(gprsCmd);

    // requestMBServiceCorp.post(data, this.requestNextSuccess, this.requstNextFail);
    // requestMBServiceCorp(data, true, 0, requestNextSuccess, requstNextFail);

    var jsonReuest2 = {"responseType":"1604","respCode":"0","respContent":"Success","respRaw":"","arguments":[],"respJson":"","respJsonObj":[{"IDUSER":"9888888801","SOURCE_ACC":"9888888801","DES_ACC":"11111111111","NUMAMOUNT":"1000","DESCREPTION":"dsaas","BENNAME":"Duong Trung Hai","IDDESTBANK":"201","CHARGEINCL":"N","IDTXN":"T13","VERSION":"5.0.1","CODTRNCURR":"VND","CHARGEFORDOM":"27500","CODSRCBRANCH":"001","DESTSORTCODE":"89201002","IDFCATREF":"1708910000031199","IDUSERREFERENCE":"CO17089100086591","BALANCE_BEFOR":gTrans.listSrcAccount.balance[0],"BALANCE_END":gTrans.listSrcAccount.balance[0] - amount,"NAME_BANK":"Vietinbank","DESTBRANCH":"Ngân hàng công thương Việt Nam CN Châu Đốc","APPLY_DATE":"30/03/2017"}]};
    gTrans.amountBalanceEND = gTrans.listSrcAccount.balance[0] - amount;
    requestNextSuccess(jsonReuest2);
}

//Action when request init trans success
function requestNextSuccess(data) {
    response = data;
    setRespObjStore(response);
    var objJSON = response.respJsonObj;
    if (checkResponseCodeSuccess(response.respCode) && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_CO_DTI_INTERNAL_TRANSFER")))) {
        genReviewScreen(objJSON);
    } else if (response.respCode == 38) {
        showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
    } else if (response.respCode == 37) {
        showAlertText(CONST_STR.get("CORP_MSG_FEE_GREATER_AMOUNT"));
    } else {
        showAlertText(response.respContent);
    }
}

function requstNextFail(){
    showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
}

function requestLoadInitSuccess(e) {
    var response = JSON.parse(e);
    var respJSON = response.respJsonObj.initData;
    // lay danh sach account kha dung
    gTrans.listSrcAccount = {
        accountno: [],
        balance: [],
        ghiNo: [],
        ghiCo: []
    };
    for (var i = 0; i < respJSON.length; i++) {
        gTrans.listSrcAccount.accountno.push(respJSON[i].CUST_AC_NO);
        gTrans.listSrcAccount.balance.push(respJSON[i].BALANCE);
        gTrans.listSrcAccount.ghiNo.push(respJSON[i].AC_STAT_NO_DR);
        gTrans.listSrcAccount.ghiCo.push(respJSON[i].AC_STAT_NO_CR);
    };
	for(var i=0;i<response.respJsonObj.banklist.length;i++){
		arrBank.push(response.respJsonObj.banklist[i].CODE);
	}
    /*
    // set tai khoan chuyen mac dinh
    var srcAccount = document.getElementById('id.accountno');
    var balance = document.getElementById("trans.sourceaccoutbalance");
    srcAccount.value = gTrans.listSrcAccount.accountno[0] != undefined ? gTrans.listSrcAccount.accountno[0] : '';
    var balanceVal = gTrans.listSrcAccount.balance[0];
    balance.innerHTML = "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(balanceVal) + " VND</div>";
    gTrans.sourceAccDTI = gTrans.listSrcAccount.accountno[0];
    gTrans.sourceAccBal = balance.innerHTML;
    */

    // lay phuong thuc gui thong bao cho nguoi duyet
    var sendMethod = document.getElementById("id.approver");
    var viewListAuth = document.getElementById("link.view.listAuth");
	if(respJSON.length > 0)
	{
        viewListAuth.style.visibility = "visible";
		if (respJSON[0].SENDMETHOD == 0) {
        sendMethod.value = CONST_STR.get("COM_NOTIFY_0");
        viewListAuth.style.visibility = "hidden";
		} else if (respJSON[0].SENDMETHOD == 1) {
			sendMethod.value = CONST_STR.get("COM_NOTIFY_1");
		} else if (respJSON[0].SENDMETHOD == 2) {
			sendMethod.value = CONST_STR.get("COM_NOTIFY_2");
		} else if (respJSON[0].SENDMETHOD == 3) {
			sendMethod.value = CONST_STR.get("COM_NOTIFY_3");
		}
		gTrans.dti.sendMethod = sendMethod.value;
	}
    

    var feeType = document.getElementById('trans.fee');
    var beneType = document.getElementById('manage.bene');

    // nguoi chiu phi
    var listFeeType = (gUserInfo.lang == 'EN') ? CONST_KEY_TRANS_FEE_TYPE_EN : CONST_KEY_TRANS_FEE_TYPE_VN;
    feeType.value = listFeeType[0];
    gTrans.dti.feeId = CONST_KEY_TRANS_FEE_TYPE_ID[0];

    // mau chuyen khoan
    var listBeneType = (gUserInfo.lang == 'EN') ? CONST_TRANS_DTI_PAYEE_EN : CONST_TRANS_DTI_PAYEE_VN;
    beneType.value = listBeneType[0];
    gTrans.dti.manage = CONST_VAL_PAYEE[0];
    gTrans.dti.feeType = feeType.value;
    gTrans.dti.beneValue = beneType.value;

    if (response.respJsonObj.templateData) {
        requestTemplateSuccess(response.respJsonObj.templateData[0]);
    }
    
}

/*
function loadDataFromTemplate() {
    // tao request de lay thong tin chi tiet ve template
    var request = {
        idtxn: "M01",
        sequenceId: 2,
        beneId: gTrans.templateId
    };
    var data = {};
    var arrayArgs = [];
    arrayArgs.push("2");
    arrayArgs.push(request);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
    data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, requestTemplateSuccess, requestTemplateFail);
}
*/

function requestTemplateSuccess(data) {
    //var response = JSON.parse(e);
    //var respJSON = response.respJsonObj[0];
    var respJSON = data; //fixed

    var srcAccount = document.getElementById('id.accountno');
    var desAccount = document.getElementById("trans.destaccountnointer");
    var receiverName = document.getElementById("trans.destaccountname");
    var branchName = document.getElementById('trans.branchName');
    var content = document.getElementById('trans.content');
    var numamout = document.getElementById('trans.amount');
    var balance = document.getElementById("trans.sourceaccoutbalance");

    var numBalance = 0;
    for (var i = 0; i < gTrans.listSrcAccount.accountno.length; i++) {
        var accNum = gTrans.listSrcAccount.accountno[i];
        if (accNum == respJSON.SOURCE_ACC) {
            numBalance = parseInt(gTrans.listSrcAccount.balance[i]);
            break;
        }
    }

    srcAccount.value = respJSON.SOURCE_ACC;
    balance.innerHTML = "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + formatNumberToCurrency(numBalance) + " VND</div>";
    desAccount.value = respJSON.BENE_ACCTNO;
    receiverName.value = respJSON.BENE_NAME;
    branchName.value = respJSON.BRANCH_NAME;
    content.value = respJSON.MSG;
    numamout.value = formatNumberToCurrency(respJSON.NUMAMOUNT);
    gTrans.dti.citadCode = respJSON.SORTCODE;
    gTrans.dti.bankCode = respJSON.BANK_CODE;
    gTrans.dti.branchName = branchName.value;
    var numamoutVal = respJSON.NUMAMOUNT;
    var numStr = convertNum2WordWithLang(numamoutVal, gUserInfo.lang);
    var nodeNumTxt = document.getElementById("trans.amounttotext");
    nodeNumTxt.innerHTML = "<div class='txtmoneystyle'>" + CONST_STR.get('TRANS_LOCAL_NUM_TO_WORD') + ": " + numStr + "</div>";
}

function requestTemplateFail() {}


function genReviewScreen(objJSON) {
    var transInfo = objJSON[0];
    var docXml = createXMLDoc();
    var rootNode = createXMLNode('review', '', docXml);

    /* Thong tin tai khoan */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

    //trans type
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', CONST_STR.get('TRANS_BATCH_TYPE_OTHER'), docXml, rowNode);

    // tai khoan chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.SOURCE_ACC, docXml, rowNode);

    // so du kha dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_BEFOR) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    /* Thong tin giao dich */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, sectionNode);

    // tai khoan nhan
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.DES_ACC, docXml, rowNode);

    // chu tai khoan nhan 
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.BENNAME, docXml, rowNode);

    // ngan hang nhan                

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_BANK_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.NAME_BANK + ' - ' + transInfo.DESTBRANCH, docXml, rowNode);

    // so tien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.NUMAMOUNT) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // phi dich vu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_PAYMENT_FEE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.CHARGEFORDOM) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // so du sau khi chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(transInfo.BALANCE_END) + " " + transInfo.CODTRNCURR, docXml, rowNode);

    // noi dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.DESCREPTION, docXml, rowNode);


    // Quan ly mau thu huong
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SAVE_BENE'), docXml, rowNode);
    valueNode = createXMLNode('value', getTransTempInfo(gTrans.dti.manage), docXml, rowNode);

    // gui thong bao
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, rowNode);
    valueNode = createXMLNode('value', gTrans.dti.sendMethod, docXml, rowNode);

    // ngay hieu luc
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_VALUE_DATE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.APPLY_DATE, docXml, rowNode);

    // Gen button

    // Nut hủy
    var buttonNode = createXMLNode('button', '', docXml, rootNode);
    var typeNode = createXMLNode('type', 'cancel', docXml, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('REVIEW_BTN_CANCEL'), docXml, buttonNode);

    // Nut quay lại
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

    // Nut tiếp tục
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('REVIEW_BTN_NEXT'), docXml, buttonNode);

    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;

    var request = {
        idtxn: "T13",
        sequence_id: "3",
        idfcatref: transInfo.IDFCATREF,
        isSaveTemp: gTrans.dti.manage,
        templateName: gTrans.dti.templateName,
    };

    gCorp.requests = [request];
    gCorp.cmdType = CONSTANTS.get("CMD_CO_DTI_INTERNAL_TRANSFER");
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function showReceiverList() {
    updateAccountListInfo();
    navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}

function formatAccountText(value) {
    document.getElementById("trans.destaccountnointer").value = keepOnlyNumber(value);
}

function getTransTempInfo(templateType) {
    if (templateType == 'N') {
        return CONST_STR.get("TAX_NO_SAVE_CODE");
    } else if (templateType == 'TH') {
        return CONST_STR.get("COM_SAVE_BENEFICIARY");
    } else if (templateType == 'TP') {
        return CONST_STR.get("COM_SAVE_TEMPLATE_TRANS");
    }
}

function controlInputText(field, maxlen, enableUnicode) {
    field.value = field.value.replace(/[\[\]&*]+/g, '');
    //field.value = field.value.replace("&", "");
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
    }
}

function displayTempNameInput() {
    var divSample = document.getElementById("id.sample");
    if (gTrans.dti.manage == CONST_VAL_PAYEE[2]) {
        divSample.style.display = "";
    } else {
        divSample.style.display = "none";
    }
    if (mainContentScroll !== null)
        mainContentScroll.refresh();
}
function clickLinkTax()
{   
    navController.pushToView("corp/payment_service/tax/pay_tax_create", true, 'xsl');
}

function validateBank(){	
	for(var i=0;i<arrBank.length;i++){
		if(arrBank[i] == gTrans.dti.bankCode){
			return true;
		}
	}
    return false;
}