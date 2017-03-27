/**
 * Created by HaiDT1 on 10/15/2016.
 */

/**
 * Created by HaiDT1 on 8/11/2016.
 */
gInternational.isBack = false;
gInternational.idtxn = 'B15';
gInternational.info = {};
flag = 0;

function viewDidLoadSuccess() {
    init();

}

function viewBackFromOther() {
    gInternational.isBack = true;
}

function init() {
    angular.module('EbankApp').controller('manager_add_temp_inter', function ($scope, requestMBServiceCorp) {
        $scope.transNHTG = false;
        $scope.transAdderssNHTG = false;
        $scope.transSwiftCodeNHTG = false;
        $scope.managerben = true;
        $scope.dsThuHuong = CONST_STR.get('TRANSFER_DS_THUHUONG');
        $scope.mauThuHuong = CONST_STR.get('TRANSFER_MAU_THUHUONG');
        $scope.listbene = [];
        defaultInfo();
        if (!gInternational.isBack){
            initData();
        }


        function defaultInfo() {
            if(gUserInfo.lang === 'VN'){
                document.getElementById('id.international.manager.ben').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN[1];
                document.getElementById('id.international.manager.ben.value').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY[1];
            }else {
                document.getElementById('id.international.manager.ben').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN[1];
                document.getElementById('id.international.manager.ben.value').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY[1];
            }
            document.getElementById('id.international.manager.ben').disabled = true;

        }



        function initData() {

            var data = {};
            var arrayArgs = new Array();
            var request = {
                idtxn: 'M01',
                sequenceId: 9,
            };
            var jsonRequest = JSON.stringify(request);
            arrayArgs.push("1");
            arrayArgs.push(jsonRequest);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
            gprsCmd.raw = '';
            data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode === '0'){
                    gInternational.sendMethod = response.respJsonObj.sendMethod;
                    gInternational.list_Nation = response.respJsonObj.lst_nation;
                    gInternational.list_Currency = response.respJsonObj.lst_ccy;
                    gInternational.list_Account_Currency = response.respJsonObj.lst_account_currency;
                    gInternational.list_src_Account = response.respJsonObj.lst_src_account;
                    gInternational.list_bene = response.respJsonObj.lst_bene;
                    var rate = JSON.parse(response.respJsonObj.lst_rate);
                    gInternational.list_Rate = rate.BANKGW.ROWS;
                    gInternational.list_Promocode = response.respJsonObj.lst_promocode;
                    var limits = JSON.parse(response.respJsonObj.lst_limit_ccy);
                    gInternational.list_Limit = limits.BANKGW.ROWS;
                    gInternational.limit_TotalDay = response.respJsonObj.limit_day;

                    document.getElementById('id.international.name.offeror').value = response.respJsonObj.infor_user[0].CUSTOMER_NAME1;
                    document.getElementById('id.international.address.offeror').value = response.respJsonObj.infor_user[0].ADDRESS;



                    for (var  i in gInternational.list_bene){
                        var objData = gInternational.list_bene[i];
                        var obj = {};
                        obj.value1 = objData.BENEFICIARYACCOUNT;
                        obj.value2 = objData.BENE_NAME;
                        obj.index = i;
                        $scope.listbene.push(obj);

                    }
                }else {
                    showAlertText(response.respContent);
                }

            });
        }



        //Add event when click selection combobox
        var addEventListenerToCombobox = function (selectHandle, closeHandle) {
            document.addEventListener("evtSelectionDialog", selectHandle, true);
            document.addEventListener("evtSelectionDialogClose", closeHandle, true);
        };

        //Remove event then close selection combobox
        var removeEventListenerToCombobox = function (selectHandle, closeHandle) {
            document.removeEventListener("evtSelectionDialog", selectHandle, true);
            document.removeEventListener("evtSelectionDialogClose", closeHandle, true);
        };

        //Action when close list source account combobox
        var handleSelectionDialogListClose = function (e) {
            removeEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
        };

        var handleSelectionDialogtList = function (e) {
            switch (flag){
                case 0:
                    document.getElementById('id.international.transtype').value = e.selectedValue1;
                    document.getElementById('id.international.transtype.value').value = e.selectedValue2;

                    /*document.getElementById('id.international.purpose').style.height = "30px";*/
                    document.getElementById('id.international.purpose').innerHTML = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
                    document.getElementById('id.international.purpose.value').value = "";
                    break;
                case 1:

                    // if (e.selectedValue1.length > 60){
                    //     document.getElementById('id.international.purpose').style.height = "45px";
                    //     refeshContentScroll();
                    // }
                    //
                    // if (e.selectedValue1.length > 120){
                    //     document.getElementById('id.international.purpose').style.height = "60px";
                    //     refeshContentScroll();
                    // }
                    refeshContentScroll();
                    document.getElementById('id.international.purpose').innerHTML = e.selectedValue1;
                    document.getElementById('id.international.purpose.value').value = e.selectedValue2;

                    break;
                case 2:
                    document.getElementById('id.international.nation.ben').value = e.selectedValue1;
                    document.getElementById('id.international.nation.ben.value').value = e.selectedValue2;
                    break;
                case 3:
                    document.getElementById('id.international.trans.method').value = e.selectedValue1;
                    document.getElementById('id.international.trans.method.value').value = e.selectedValue2;

                    if(e.selectedValue2 === 'CS01'){
                        $scope.transSwiftCode = true;
                        $scope.transAdderss = false;
                    }else if (e.selectedValue2 === 'CS02'){
                        $scope.transSwiftCode = false;
                        $scope.transAdderss = true;
                    }
                    $scope.$apply();
                    mainContentScroll.refresh();
                    break;
                case 4:
                    if(e.selectedValue2 === 'IBY'){
                        $scope.transNHTG = true;
                    }else {
                        $scope.transNHTG = false;
                    }
                    $scope.$apply();
                    document.getElementById('id.international.intermediary.bank').value = e.selectedValue1;
                    document.getElementById('id.international.intermediary.bank.value').value = e.selectedValue2;

                    mainContentScroll.refresh();
                    break;
                case 5:
                    if(e.selectedValue2 === 'CSTG01'){
                        $scope.transSwiftCodeNHTG = true;
                        $scope.transAdderssNHTG = false;
                    }else {
                        $scope.transAdderssNHTG = true;
                        $scope.transSwiftCodeNHTG = false;
                    }
                    $scope.$apply();
                    document.getElementById('id.international.trans.method.NHTG').value = e.selectedValue1;
                    document.getElementById('id.international.trans.method.value.NHTG').value = e.selectedValue2;
                    mainContentScroll.refresh();
                    break;
                case 6:
                    document.getElementById('id.international.manager.ben').value = e.selectedValue1;
                    document.getElementById('id.international.manager.ben.value').value = e.selectedValue2;
                    if (e.selectedValue2 === 'TP'){
                        $scope.managerben = true;
                    }else {
                        $scope.managerben = false;
                    }
                    $scope.$apply();
                    mainContentScroll.refresh();
                    break;
                case 7:
                    document.getElementById('id.international.nation.bank.ben').value = e.selectedValue1;
                    document.getElementById('id.international.nation.bank.ben.value').value = e.selectedValue2;
                    break;
                case 8:
                    document.getElementById('id.international.nation.NHTG').value = e.selectedValue1;
                    document.getElementById('id.international.nation.value.NHTG').value = e.selectedValue2;
                    break;
            }
        }

        $scope.showInternationlTransType = function () {
            flag = 0;
            var cbxInternational = [];
            var cbxInternationalKey = [];
            if (gUserInfo.lang === 'VN') {
                cbxInternational = CONST_INTERNATIONAL_MONEY_TRANS_VN;
                cbxInternationalKey = CONST_INTERNATIONAL_MONEY_TRANS_KEY;
            } else {
                cbxInternational = CONST_INTERNATIONAL_MONEY_TRANS_EN;
                cbxInternationalKey = CONST_INTERNATIONAL_MONEY_TRANS_KEY;
            }
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('INTERNATIONAL_TRANS_TYPE'), cbxInternational, cbxInternationalKey, false);
        }

        $scope.showInternationalPurpose = function () {
            flag = 1;
            var cbxInternational = [];
            var cbxInternationalKey = [];
            if (document.getElementById('id.international.transtype.value').value === 'IMT01'){
                if (gUserInfo.lang === 'VN') {
                    cbxInternational = CONST_INTERNATIONAL_PURPOSE_IMT01_VN;
                    cbxInternationalKey = CONST_INTERNATIONAL_PURPOSE_IMT01_KEY;
                } else {
                    cbxInternational = CONST_INTERNATIONAL_PURPOSE_IMT01_EN;
                    cbxInternationalKey = CONST_INTERNATIONAL_PURPOSE_IMT01_KEY;
                }
            }else if (document.getElementById('id.international.transtype.value').value === 'IMT02'){
                if (gUserInfo.lang === 'VN') {
                    cbxInternational = CONST_INTERNATIONAL_PURPOSE_IMT02_VN;
                    cbxInternationalKey = CONST_INTERNATIONAL_PURPOSE_IMT02_KEY;
                } else {
                    cbxInternational = CONST_INTERNATIONAL_PURPOSE_IMT02_EN;
                    cbxInternationalKey = CONST_INTERNATIONAL_PURPOSE_IMT02_KEY;
                }
            }
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('INTERNATIONAL_PURPOSE_TRANS'), cbxInternational, cbxInternationalKey, false);
        }

        $scope.showInternationalNation = function () {
            flag = 2;
            $scope.listCountry = []
            for (var i in gInternational.list_Nation){

                var objData = gInternational.list_Nation[i];
                var obj = {};
                obj.value1 = objData.COUNTRY_NAME;
                obj.value2 = objData.COUNTRY_CODE;
                obj.index = i;
                $scope.listCountry.push(obj);
            }

            gTrans.showDialogCorp = true;
            document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
            document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
            document.addEventListener("tabChange", tabChanged, false);
            document.addEventListener("onInputSelected", okSelected, false);

            gTrans.dialog = new DialogListInput(CONST_STR.get('INTERNATIONAL_CHOSE_COUNTRY'), 'TP', CONST_PAYEE_LOCAL_TRANSFER);
            // gTrans.dialog.USERID = gCustomerNo;
            // gTrans.dialog.PAYNENAME = "3";
            // gTrans.dialog.TYPETEMPLATE = "0";

            gTrans.dialog.showDialog(callbackShowDialogSuccessed, $scope.listCountry);
        }

        $scope.showInternationalTransMethod = function () {
            flag = 3;
            var cbxInternational = [];
            var cbxInternationalKey = [];
            if (gUserInfo.lang === 'VN') {
                cbxInternational = CONST_INTERNATIONAL_TRANS_METHOD_VN;
                cbxInternationalKey = CONST_INTERNATIONAL_TRANS_METHOD_KEY;
            } else {
                cbxInternational = CONST_INTERNATIONAL_TRANS_METHOD_EN;
                cbxInternationalKey = CONST_INTERNATIONAL_TRANS_METHOD_KEY;
            }
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('INTERNATIONAL_TRANS_METHOD'), cbxInternational, cbxInternationalKey, false);
        }

        $scope.showInternationalMediaryBank = function(){
            flag = 4;
            var cbxInternational = [];
            var cbxInternationalKey = [];
            if (gUserInfo.lang === 'VN') {
                cbxInternational = CONST_INTERNATIONAL_INTERMEDIARY_BANK_VN;
                cbxInternationalKey = CONST_INTERNATIONAL_INTERMEDIARY_BANK_KEY;
            } else {
                cbxInternational = CONST_INTERNATIONAL_INTERMEDIARY_BANK_EN;
                cbxInternationalKey = CONST_INTERNATIONAL_INTERMEDIARY_BANK_KEY;
            }
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('INTERNATIONAL_TRANS_METHOD'), cbxInternational, cbxInternationalKey, false);
        }

        $scope.showInternationalMediaryBankNHTG = function(){
            flag = 5;
            var cbxInternational = [];
            var cbxInternationalKey = [];
            if (gUserInfo.lang === 'VN') {
                cbxInternational = CONST_INTERNATIONAL_TRANS_METHOD_NHTG_VN;
                cbxInternationalKey = CONST_INTERNATIONAL_TRANS_METHOD_NHTG_KEY;
            } else {
                cbxInternational = CONST_INTERNATIONAL_TRANS_METHOD_NHTG_EN;
                cbxInternationalKey = CONST_INTERNATIONAL_TRANS_METHOD_NHTG_KEY;
            }
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('INTERNATIONAL_TRANS_METHOD'), cbxInternational, cbxInternationalKey, false);
        }


        //Action when click select template control
        $scope.showInternationalInputMNG = function () {
            flag = 6;
            var cbxInternational = (gUserInfo.lang == 'EN')? CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN : CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN;
            var cbxInternationalKey = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY;
            addEventListenerToCombobox(handleSelectionDialogtList, handleSelectionDialogListClose);
            showDialogList(CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT'), cbxInternational, cbxInternationalKey, false);
        }

        $scope.showInternationalNationBankBen = function () {
            flag = 7;
            $scope.listCountry = []
            for (var i in gInternational.list_Nation){

                var objData = gInternational.list_Nation[i];
                var obj = {};
                obj.value1 = objData.COUNTRY_NAME;
                obj.value2 = objData.COUNTRY_CODE;
                obj.index = i;
                $scope.listCountry.push(obj);
            }

            gTrans.showDialogCorp = true;
            document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
            document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
            document.addEventListener("tabChange", tabChanged, false);
            document.addEventListener("onInputSelected", okSelected, false);

            gTrans.dialog = new DialogListInput(CONST_STR.get('INTERNATIONAL_CHOSE_COUNTRY'), 'TP', CONST_PAYEE_LOCAL_TRANSFER);
            // gTrans.dialog.USERID = gCustomerNo;
            // gTrans.dialog.PAYNENAME = "3";
            // gTrans.dialog.TYPETEMPLATE = "0";

            gTrans.dialog.showDialog(callbackShowDialogSuccessed, $scope.listCountry);
        }

        $scope.showInternationalNationBankNHTG = function () {
            flag = 8;
            $scope.listCountry = []
            for (var i in gInternational.list_Nation){

                var objData = gInternational.list_Nation[i];
                var obj = {};
                obj.value1 = objData.COUNTRY_NAME;
                obj.value2 = objData.COUNTRY_CODE;
                obj.index = i;
                $scope.listCountry.push(obj);
            }

            gTrans.showDialogCorp = true;
            document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
            document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
            document.addEventListener("tabChange", tabChanged, false);
            document.addEventListener("onInputSelected", okSelected, false);

            gTrans.dialog = new DialogListInput(CONST_STR.get('INTERNATIONAL_CHOSE_COUNTRY'), 'TP', CONST_PAYEE_LOCAL_TRANSFER);
            // gTrans.dialog.USERID = gCustomerNo;
            // gTrans.dialog.PAYNENAME = "3";
            // gTrans.dialog.TYPETEMPLATE = "0";

            gTrans.dialog.showDialog(callbackShowDialogSuccessed, $scope.listCountry);
        }

        //Chuyển sang tab quản lý giao dịch
        $scope.changeTab = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.initWithRootView('corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans', true, 'html');
        }

        $scope.onReInputClick = function () {
            document.getElementById('id.international.transtype').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.transtype.value').value = '';
            document.getElementById('id.international.purpose').innerHTML = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER') ;
            document.getElementById('id.international.purpose.value').value = "";
            // document.getElementById('id.international.name.offeror').value = "";
            // document.getElementById('id.international.address.offeror').value = "";
            document.getElementById('id.international.name.ben').value = "";
            document.getElementById('id.international.address.ben').value = "";
            document.getElementById('id.international.nation.ben').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.nation.ben.value').value = "";
            document.getElementById('id.international.account.ben').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.content').value = "";

            document.getElementById('id.international.trans.method').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.trans.method.value').value = "";
            document.getElementById('id.international.swift.code').value = "";

            document.getElementById('id.international.intermediary.bank').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.intermediary.bank.value').value = "";

            document.getElementById('id.international.trans.method.NHTG').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.trans.method.value.NHTG').value = "";
            document.getElementById('id.international.swift.code.NHTG').value = "";

            document.getElementById('id.international.name.NHTG').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.name.value.NHTG').value = "";
            document.getElementById('id.international.address.NHTG').value = "";


            document.getElementById('id.international.ben.bank.name').value = "";

            document.getElementById('id.international.nation.bank.ben').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.nation.bank.ben.value').value = "";
            document.getElementById('id.international.manager.ben.inputname').value = "";

            document.getElementById('id.international.nation.NHTG').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.nation.value.NHTG').value = "";
            document.getElementById('id.international.ben.bank.address').value = "";

        }

        $scope.onCancelClick = function () {
            navController.initWithRootView('corp/transfer/manage_template/manage_trans_temp', true, 'xsl');
        }

        $scope.onAddClick = function () {
            gInternational.info.transtype = {};
            gInternational.info.transtype.name = document.getElementById('id.international.transtype').value;
            gInternational.info.transtype.value = document.getElementById('id.international.transtype.value').value;
            gInternational.info.purpose = {};
            gInternational.info.purpose.name = document.getElementById('id.international.purpose').innerHTML;
            gInternational.info.purpose.value = document.getElementById('id.international.purpose.value').value;
            gInternational.info.nameOfferor = document.getElementById('id.international.name.offeror').value;
            gInternational.info.addressOferor = document.getElementById('id.international.address.offeror').value;
            gInternational.info.nameBen = document.getElementById('id.international.name.ben').value;
            gInternational.info.addressBen = document.getElementById('id.international.address.ben').value;
            gInternational.info.nationBen = {};
            gInternational.info.nationBen.name = document.getElementById('id.international.nation.ben').value;
            gInternational.info.nationBen.value = document.getElementById('id.international.nation.ben.value').value;
            gInternational.info.accountBen = document.getElementById('id.international.account.ben').value;
            gInternational.info.content = document.getElementById('id.international.content').value;
            gInternational.info.transMethod = {};
            gInternational.info.transMethod.name =  document.getElementById('id.international.trans.method').value;
            gInternational.info.transMethod.value =  document.getElementById('id.international.trans.method.value').value;
            gInternational.info.swifCode = document.getElementById('id.international.swift.code').value;
            gInternational.info.interMediaryBank = {};
            gInternational.info.interMediaryBank.name = document.getElementById('id.international.intermediary.bank').value;
            gInternational.info.interMediaryBank.value = document.getElementById('id.international.intermediary.bank.value').value;
            gInternational.info.transMethodNHTG = {};
            gInternational.info.transMethodNHTG.name = document.getElementById('id.international.trans.method.NHTG').value;
            gInternational.info.transMethodNHTG.value = document.getElementById('id.international.trans.method.value.NHTG').value;
            gInternational.info.swiftCodeNHTG = document.getElementById('id.international.swift.code.NHTG').value;
            gInternational.info.NHTG = {};
            gInternational.info.NHTG.name = document.getElementById('id.international.name.NHTG').value;
            gInternational.info.NHTG.value = document.getElementById('id.international.name.value.NHTG').value;
            gInternational.info.addressNHTG = document.getElementById('id.international.address.NHTG').value;
            gInternational.info.managerBen = {};
            gInternational.info.managerBen.name = document.getElementById('id.international.manager.ben').value;
            gInternational.info.managerBen.value = document.getElementById('id.international.manager.ben.value').value;
            gInternational.info.benBankName = document.getElementById('id.international.ben.bank.name').value;
            gInternational.info.nationBankBen = {};
            gInternational.info.nationBankBen.name = document.getElementById('id.international.nation.bank.ben').value;
            gInternational.info.nationBankBen.value = document.getElementById('id.international.nation.bank.ben.value').value;
            gInternational.info.managerBenInputName = document.getElementById('id.international.manager.ben.inputname').value;
            gInternational.info.nationBankNHTG = {};
            gInternational.info.nationBankNHTG.name = document.getElementById('id.international.nation.NHTG').value;
            gInternational.info.nationBankNHTG.value = document.getElementById('id.international.nation.value.NHTG').value;
            gInternational.info.benBankAddress = document.getElementById('id.international.ben.bank.address').value;

            //Validate
            if (!validate()) return;

            //check trùng tên mẫu thụ hưởng
            if (gInternational.info.managerBen.value == 'TP'){
                if(gInternational.list_bene.length > 0){
                    for (var i in gInternational.list_bene){
                        if (gInternational.info.managerBenInputName == gInternational.list_bene[i].BENE_NAME){
                            handleOTPTimeout();
                            break;
                        }else if (i == gInternational.list_bene.length - 1 && gInternational.info.managerBenInputName != gInternational.list_bene[i].BENE_NAME){
                            sendJsonRequest();
                        }
                    }
                }else {
                    sendJsonRequest();
                }

            }else {
                sendJsonRequest();
            }



        }

         function sendJsonRequest () {

            gInternational.JSONRequest = {};
            gInternational.JSONRequest.transType = gInternational.info.transtype.value;
            gInternational.JSONRequest.transtypeName = gInternational.info.transtype.name;
            gInternational.JSONRequest.purpose = gInternational.info.purpose.value;
            gInternational.JSONRequest.purposeName = gInternational.info.purpose.name;
            gInternational.JSONRequest.nameOfferor = gInternational.info.nameOfferor;
            gInternational.JSONRequest.addressOferor = gInternational.info.addressOferor;
            gInternational.JSONRequest.nameBen = gInternational.info.nameBen;
            gInternational.JSONRequest.addressBen = gInternational.info.addressBen;
            gInternational.JSONRequest.nationBen = gInternational.info.nationBen.value;
            gInternational.JSONRequest.nationBenName = gInternational.info.nationBen.name;
            gInternational.JSONRequest.accountBen = gInternational.info.accountBen;
            gInternational.JSONRequest.content = gInternational.info.content;
            gInternational.JSONRequest.transMethod = gInternational.info.transMethod.value;
            gInternational.JSONRequest.transMethodName = gInternational.info.transMethod.name;
            gInternational.JSONRequest.swifCode = gInternational.info.swifCode;
            gInternational.JSONRequest.interMediaryBank = gInternational.info.interMediaryBank.value;
            (gInternational.JSONRequest.interMediaryBank.length > 0) ? gInternational.JSONRequest.interMediaryBankName = gInternational.info.interMediaryBank.name : gInternational.JSONRequest.interMediaryBankName = null;
            gInternational.JSONRequest.transMethodNHTG = gInternational.info.transMethodNHTG.value;
            gInternational.JSONRequest.transMethodNHTGName = gInternational.info.transMethodNHTG.name;
            gInternational.JSONRequest.swiftCodeNHTG = gInternational.info.swiftCodeNHTG;
            gInternational.JSONRequest.NHTG =  gInternational.info.NHTG.name;
            gInternational.JSONRequest.addressNHTG = gInternational.info.addressNHTG;
            gInternational.JSONRequest.issavepayee = gInternational.info.managerBen.value;
            gInternational.JSONRequest.managerBenName = gInternational.info.managerBen.name;

            gInternational.JSONRequest.sourceAccount = gInternational.info.sourceAccount;

            gInternational.JSONRequest.benBankName = gInternational.info.benBankName
            gInternational.JSONRequest.nationBankBen = gInternational.info.nationBankBen.value;
            gInternational.JSONRequest.nationBankBenName = gInternational.info.nationBankBen.name;
            gInternational.JSONRequest.sampleName = gInternational.info.managerBenInputName;
            gInternational.JSONRequest.nationBankNHTG = gInternational.info.nationBankNHTG.value;
            gInternational.JSONRequest.nationBankNHTGName = (gInternational.info.interMediaryBank.value == 'IBN') ? "" : gInternational.info.nationBankNHTG.name;
            gInternational.JSONRequest.benBankAddress = gInternational.info.benBankAddress;

            var data = {};
            var arrayArgs = new Array();
            var request = {
                idtxn: 'M01',
                sequenceId: 10,
                transInfo : gInternational.JSONRequest,
            };
            var jsonRequest = JSON.stringify(request);
            arrayArgs.push("1");
            arrayArgs.push(jsonRequest);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
            gprsCmd.raw = '';
            data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                showAlertText(response.respContent);

                // if (response.respCode === '0'){
                //     gInternational.info.idfcatref = response.respJsonObj.idfcatref;
                //     gInternational.info.documentInfo = response.respJsonObj.doc_info;
                //     navCachedPages['corp/international_payments/international_money_trans/international_trans_checklist'] = null;
                //     navController.pushToView('corp/international_payments/international_money_trans/international_trans_checklist', true, 'html');
                //
                // }else {
                //     showAlertText(response.respContent);
                //     gotoHomePage();
                // }
            });
        }

        // Khi OTP timeout
        function handleOTPTimeout() {
            document.addEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.addEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);
            showAlertConfirmText(CONST_STR.get("INTERNATIONAL_MSG_OTP_TIME_PERIOD"));
        }

        // Gui lai OTP
        function handleOTPResendAlert(e) {
            document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);

            gInternational.info.managerBen = {};
            gInternational.info.managerBen.name = document.getElementById('id.international.manager.ben').value;
            gInternational.info.managerBen.value = document.getElementById('id.international.manager.ben.value').value;

            sendJsonRequest();

        }

        // Huy OTP
        function handleOTPResendAlertCancel(e) {
            document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);

            gInternational.info.managerBen = {};
            if(gUserInfo.lang == 'VN'){
                gInternational.info.managerBen.name = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN[0];
            }else {
                gInternational.info.managerBen.name = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN[0];
            }

            gInternational.info.managerBen.value = "N";
            sendJsonRequest();
        }

        function validate() {
            if (gInternational.info.transtype.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_TYPE')]));
                return false;
            }

            if (gInternational.info.purpose.value.length == '0' ) {
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_PURPOSE_TRANS')]));
                return false;
            }

            if (gInternational.info.nameBen.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_NAME_BEN')]));
                return false;
            }

            if (gInternational.info.addressBen.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_ADDRESS_BEN')]));
                return;
            }

            if (gInternational.info.nationBen.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_NATION_BEN')]));
                return false;
            }

            if (gInternational.info.accountBen.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_ACCOUNT_BEN1')]));
                return false;
            }

            if (gInternational.info.content.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_CONTENT')]));
                return false;
            }

            if (gInternational.info.transMethod.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_METHOD')]));
                return false;
            }

            if (gInternational.info.transMethod.value == 'CS01'){
                if (gInternational.info.swifCode.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_SWIFT_CODE_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.transMethod.value == 'CS02'){
                if (gInternational.info.benBankAddress.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_ADRESS_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.benBankName.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_THE_BEN_BANK_NAME')]));
                return false;
            }

            if (gInternational.info.nationBankBen.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_NAIION_BANK_BEN')]));
                return false;
            }

            if (gInternational.info.interMediaryBank.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK')]));
                return false;
            }

            if (gInternational.info.interMediaryBank.value == 'IBY'){

                if (gInternational.info.transMethodNHTG.value == ""){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG')]));
                    return false;
                }

                if (gInternational.info.NHTG.name == ""){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME')]));
                    return false;
                }
            }

            if (gInternational.info.transMethodNHTG.value == 'CSTG01'){
                if (gInternational.info.swiftCodeNHTG == ''){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_SWIFT_CODE_NHTG1')]));
                    return false;
                }
            }

            if (gInternational.info.interMediaryBank.value == 'IBY' &&  gInternational.info.transMethodNHTG.value == 'CSTG02'){
                if (gInternational.info.addressNHTG.length == 0){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_ADDRESS')]));
                    return false;
                }
            }

            if (gInternational.info.interMediaryBank.value == 'IBY'){
                if (gInternational.info.nationBankNHTG.value == ''){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_NAIION_BANK_NHTG')]));
                    return false;
                }
            }

            if(gInternational.info.managerBen.value == 'TP'){
                if (gInternational.info.managerBenInputName.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INPUT_NO_SAMPLE')]));
                    return false;
                }
            }



            //Check do dai ky tu ten+dia chi
            var lengthOffer = document.getElementById('id.international.name.offeror').value.length + document.getElementById('id.international.address.offeror').value.length;
            if(parseFloat(lengthOffer) > 139){
                showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                    [CONST_STR.get('INTERNATIONAL_NAME_OFFEROR'), CONST_STR.get('INTERNATIONAL_ADDRESS_OFFEROR')]));
                return false;
            }


            var lengthBen = document.getElementById('id.international.name.ben').value.length + document.getElementById('id.international.address.ben').value.length;
            if(parseFloat(lengthBen) > 139){
                showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                    [CONST_STR.get('INTERNATIONAL_NAME_BEN'), CONST_STR.get('INTERNATIONAL_ADDRESS_BEN')]));
                return false;
            }

            if (gInternational.info.transMethod.value == 'CS02'){
                var lengthBankBen = document.getElementById('id.international.ben.bank.name').value.length + document.getElementById('id.international.ben.bank.address').value.length;
                if(parseFloat(lengthBankBen) > 139){
                    showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                        [CONST_STR.get('INTERNATIONAL_THE_BEN_BANK_NAME'), CONST_STR.get('INTERNATIONAL_ADRESS_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.transMethod.value == 'CSTG02'){
                var lengthBankBank = document.getElementById('id.international.name.NHTG').value.length + document.getElementById('id.international.address.NHTG').value.length;
                if(parseFloat(lengthBankBank) > 139){
                    showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME'), CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_ADDRESS')]));
                    return false;
                }
            }

            return true;
        }


        //show mẫu thụ hưởng
        //Action when click destination account (T12)
        $scope.showPayeePage = function () {
            flag = 9;
            gTrans.showDialogCorp = true;
            document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
            document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
            document.addEventListener("tabChange", tabChanged, false);
            document.addEventListener("onInputSelected", okSelected, false);

            gTrans.dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TP', CONST_PAYEE_LOCAL_TRANSFER);
            // gTrans.dialog.USERID = gCustomerNo;
            // gTrans.dialog.PAYNENAME = "3";
            // gTrans.dialog.TYPETEMPLATE = "0";

            gTrans.dialog.showDialog(callbackShowDialogSuccessed, $scope.listbene);


        }

        //Call when show dialog complete
        function callbackShowDialogSuccessed(node){
            gTrans.dialog.hiddenTab2();
            if (flag == 2 || flag == 7 || flag == 8){
                document.getElementById("titleTab1").innerHTML = CONST_STR.get('INTERNATIONAL_LIST_NATION');
            }
            // gTrans.dialog.addListData(function () {
            //
            // }, $scope.listbene, 'tab1');
        }

        //Action when selected a value in tabbox dialog
        function handleInputPayeeAccOpen(e) {
            handleInputPayeeAccClose();

            if (e.tabSelected == 'tab1') {
                var obj = e.dataObject;
                if (flag == 9){
                    for (var i in gInternational.list_bene){
                        if (obj.peopleName == gInternational.list_bene[i].BENE_NAME){
                            if(gInternational.list_bene[i].BENEFICIARYBANKMETHOD == 'CS01'){
                                $scope.transSwiftCode = true;
                                $scope.transAdderss = false;
                            }else if (gInternational.list_bene[i].BENEFICIARYBANKMETHOD == 'CS02'){
                                $scope.transSwiftCode = false;
                                $scope.transAdderss = true;
                            }

                            if(gInternational.list_bene[i].METHOD === 'IBY'){
                                $scope.transNHTG = true;
                                if(gInternational.list_bene[i].BANKMETHOD === 'CSTG01'){
                                    $scope.transSwiftCodeNHTG = true;
                                    $scope.transAdderssNHTG = false;
                                }else {
                                    $scope.transAdderssNHTG = true;
                                    $scope.transSwiftCodeNHTG = false;
                                }

                            }else {
                                $scope.transNHTG = false;
                            }

                            document.getElementById('id.international.transtype').value = CONST_STR.get('INTERNATIONAL_TRANS_TYPE_' + gInternational.list_bene[i].TRANSACTIONTYPE);
                            document.getElementById('id.international.transtype.value').value = gInternational.list_bene[i].TRANSACTIONTYPE;

                            document.getElementById('id.international.purpose').innerHTML = CONST_STR.get('INTERNATIONAL_PURPOSE_TYPE_' + gInternational.list_bene[i].PURPOSE);
                            document.getElementById('id.international.purpose.value').value = gInternational.list_bene[i].PURPOSE;

                            document.getElementById('id.international.content').value = gInternational.list_bene[i].CONTENT;

                            document.getElementById('id.international.name.ben').value = gInternational.list_bene[i].BENEFICIARYNAME;
                            document.getElementById('id.international.address.ben').value = gInternational.list_bene[i].BENEFICIARYADDRESS;
                            document.getElementById('id.international.nation.ben').value = gInternational.list_bene[i].BENEFICIARYCOUNTRIESNAME;
                            document.getElementById('id.international.nation.ben.value').value = gInternational.list_bene[i].BENEFICIARYCOUNTRIES;
                            document.getElementById('id.international.account.ben').value = gInternational.list_bene[i].BENEFICIARYACCOUNT;

                            document.getElementById('id.international.trans.method').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.list_bene[i].BENEFICIARYBANKMETHOD);
                            document.getElementById('id.international.trans.method.value').value = gInternational.list_bene[i].BENEFICIARYBANKMETHOD;
                            document.getElementById('id.international.swift.code').value = gInternational.list_bene[i].BENEFICIARYSWIFTCODE;
                            document.getElementById('id.international.ben.bank.name').value = gInternational.list_bene[i].BENEFICIARYBANK;
                            document.getElementById('id.international.ben.bank.address').value = (gInternational.list_bene[i].BENEFICIARYBANKADDRESS == null) ? "" : gInternational.list_bene[i].BENEFICIARYBANKADDRESS;
                            document.getElementById('id.international.nation.bank.ben').value = gInternational.list_bene[i].BENEFICIARYBANKCOUNTRIESNAME;
                            document.getElementById('id.international.nation.bank.ben.value').value = gInternational.list_bene[i].BENEFICIARYBANKCOUNTRIES;

                            document.getElementById('id.international.intermediary.bank').value = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.list_bene[i].METHOD);
                            document.getElementById('id.international.intermediary.bank.value').value = gInternational.list_bene[i].METHOD;

                            document.getElementById('id.international.trans.method.NHTG').value = (gInternational.list_bene[i].BANKMETHOD == null) ? CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER') : CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG_' + gInternational.list_bene[i].BANKMETHOD);
                            document.getElementById('id.international.trans.method.value.NHTG').value = gInternational.list_bene[i].BANKMETHOD;

                            document.getElementById('id.international.swift.code.NHTG').value = (gInternational.list_bene[i].BANKSWIFTCODE == null) ? "" : gInternational.list_bene[i].BANKSWIFTCODE;
                            document.getElementById('id.international.name.NHTG').value = gInternational.list_bene[i].BANKNAME;
                            document.getElementById('id.international.address.NHTG').value = gInternational.list_bene[i].BANKADDRESS;

                            document.getElementById('id.international.nation.NHTG').value = (gInternational.list_bene[i].BANKCOUNTRIESNAME == null) ? CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER') : gInternational.list_bene[i].BANKCOUNTRIESNAME;
                            document.getElementById('id.international.nation.value.NHTG').value = (gInternational.list_bene[i].BANKCOUNTRIES == null) ? "" : gInternational.list_bene[i].BANKCOUNTRIES;


                            $scope.$apply();
                            refeshContentScroll();
                            break;
                        }
                    }
                }else if(flag == 2){
                    document.getElementById('id.international.nation.ben').value = obj.transValue;
                    document.getElementById('id.international.nation.ben.value').value = obj.peopleName;
                }else if(flag == 7){
                    document.getElementById('id.international.nation.bank.ben').value = obj.transValue;
                    document.getElementById('id.international.nation.bank.ben.value').value = obj.peopleName;
                }else if(flag == 8){
                    document.getElementById('id.international.nation.NHTG').value = obj.transValue;
                    document.getElementById('id.international.nation.value.NHTG').value = obj.peopleName;
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
            // var node = e.selectedValueTab;
            // gTrans.showDialogCorp = true;
            // if (node.id == 'tab1') {
            //
            // }
            // if (node.id == 'tab2'){
            //     gTrans.dialog.activeDataOnTab('tab2');
            //     gTrans.dialog.USERID = gCustomerNo;
            //     gTrans.dialog.PAYNENAME = "3";
            //     gTrans.dialog.TYPETEMPLATE = "1";
            //     gTrans.dialog.requestData(node.id);
            // }
        }

        //Action when finish input value in tabbox dialog
        function okSelected(e){
            handleInputPayeeAccClose();
            if ((e.selectedValue != undefined) &&(e.selectedValue != null) && (e.selectedValue.length>0)){
                document.getElementById("billing.input.text").value = e.selectedValue;
                //loadInfoFromIdAccount();
            }
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'),['EbankApp']);
}

function controlInputText(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        field.value = field.value.replace(/[\[\]\,!"#$%&*'\+\-:;<=>?\\`^~{|}]/g, '');
    }
}

function removeChar(e, des, maxlen) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(des, maxlen);
    }

    var tmpVale = des.value;
    var numStr = keepOnlyNumber(tmpVale);
    des.value = numStr;
}

function removeCharAnd(field) {
    field.value = field.value.replace(/\band\b/gi,"");
    field.value = field.value.replace(/\bAND\b/gi,"");
    field.value = field.value.replace(/\bAnd\b/gi,"");
    field.value = field.value.replace(/\bANd\b/gi,"");
    field.value = field.value.replace(/\baND\b/gi,"");
    field.value = field.value.replace(/\bAnD\b/gi,"");
    field.value = field.value.replace(/\baNd\b/gi,"");
    field.value = field.value.replace(/\banD\b/gi,"");

}

function validateSwiftCode(des, bank) {
    // bank = 1 ngan hang thu huong
    // bank = 2 ngan hang trung gian
    var swiftcode = des.value;
    if (swiftcode.length == 8 || swiftcode.length == 11){

    }else {
        des.value = "";
        showAlertText(CONST_STR.get('INTERNATIONA_SWIFTCODE_ERROR'));
        return;
    }

    swiftcode = swiftcode.substring(4, 6);
    for (var i in gInternational.list_Nation){
        if (swiftcode == gInternational.list_Nation[i].COUNTRY_CODE){
            if(bank == 1){
                document.getElementById('id.international.nation.bank.ben').value = gInternational.list_Nation[i].COUNTRY_NAME;
                document.getElementById('id.international.nation.bank.ben.value').value = gInternational.list_Nation[i].COUNTRY_CODE;
            }else if (bank == 2){
                document.getElementById('id.international.nation.NHTG').value = gInternational.list_Nation[i].COUNTRY_NAME;
                document.getElementById('id.international.nation.value.NHTG').value = gInternational.list_Nation[i].COUNTRY_CODE;
            }
            break;
        }else if (swiftcode != gInternational.list_Nation[i].COUNTRY_CODE && i == gInternational.list_Nation.length - 1){
            des.value = "";
            showAlertText(CONST_STR.get('INTERNATIONA_SWIFTCODE_ERROR'));
            break;
        }
    }
}