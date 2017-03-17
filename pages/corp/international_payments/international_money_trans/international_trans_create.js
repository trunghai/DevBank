/**
 * Created by HaiDT1 on 8/11/2016.
 */
gInternational.isBack = false;
gInternational.idtxn = 'B15';

flag = 0;

function viewDidLoadSuccess() {
    init();
    
}

function viewBackFromOther() {
    gInternational.isBack = true;
}

function init() {
    angular.module('EbankApp').controller('international-trans-create', function ($scope, requestMBServiceCorp) {

        $scope.dsThuHuong = CONST_STR.get('TRANSFER_DS_THUHUONG');
        $scope.mauThuHuong = CONST_STR.get('TRANSFER_MAU_THUHUONG');
        $scope.listbene = [];

        if (!gInternational.isBack){
            gInternational.info = {};
            gInternational.info.settingTemp = {};

            $scope.transSwiftCode = true;
            $scope.transAdderss = false;

            $scope.transNHTG = false;
            $scope.transAdderssNHTG = false;
            $scope.transSwiftCodeNHTG = false;
            $scope.managerben = true;

            gInternational.info.settingTemp.transSwiftCode = $scope.transSwiftCode;
            gInternational.info.settingTemp.transAdderss = $scope.transAdderss;

            gInternational.info.settingTemp.transNHTG = $scope.transNHTG;
            gInternational.info.settingTemp.transAdderssNHTG = $scope.transAdderssNHTG;
            gInternational.info.settingTemp.transSwiftCodeNHTG = $scope.transSwiftCodeNHTG;
            gInternational.info.settingTemp.managerben = $scope.managerben;
            defaultInfo();
            initData();

        }else {
            $scope.transSwiftCode = gInternational.info.settingTemp.transSwiftCode;
            $scope.transAdderss = gInternational.info.settingTemp.transAdderss;

            $scope.transNHTG = gInternational.info.settingTemp.transNHTG;
            $scope.transAdderssNHTG = gInternational.info.settingTemp.transAdderssNHTG;
            $scope.transSwiftCodeNHTG = gInternational.info.settingTemp.transSwiftCodeNHTG;
            $scope.managerben = gInternational.info.settingTemp.managerben;

            for (var  i in gInternational.list_bene){
                var objData = gInternational.list_bene[i];
                var obj = {};
                obj.value1 = objData.BENEFICIARYACCOUNT;
                obj.value2 = objData.BENE_NAME;
                obj.index = i;
                $scope.listbene.push(obj);

            }
        }


        function defaultInfo() {
            if(gUserInfo.lang === 'VN'){
                document.getElementById('id.international.trans.method').value = CONST_INTERNATIONAL_TRANS_METHOD_VN[0];
                document.getElementById('id.international.trans.method.value').value = CONST_INTERNATIONAL_TRANS_METHOD_KEY[0];

                document.getElementById('id.international.manager.ben').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN[1];
                document.getElementById('id.international.manager.ben.value').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY[1];
            }else {
                //set mặc định phương thương chuyển swiftcode
                document.getElementById('id.international.trans.method').value = CONST_INTERNATIONAL_TRANS_METHOD_EN[0];
                document.getElementById('id.international.trans.method.value').value = CONST_INTERNATIONAL_TRANS_METHOD_KEY[0];

                document.getElementById('id.international.manager.ben').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN[1];
                document.getElementById('id.international.manager.ben.value').value = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY[1];
            }

        }



        function initData() {
            var jsonData = new Object();
            jsonData.sequence_id = '1';
            jsonData.idtxn = gInternational.idtxn;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_PAYMENT_INTERNATIONAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode === '0'){
                    gInternational.sendMethod = response.respJsonObj.sendMethod;
                    gInternational.list_Nation = response.respJsonObj.lst_nation;
                    gInternational.list_Currency = JSON.parse(response.respJsonObj.lst_ccy);
                    gInternational.list_Account_Currency = response.respJsonObj.lst_account_currency;
                    gInternational.list_src_Account = response.respJsonObj.lst_src_account;
                    gInternational.list_bene = response.respJsonObj.lst_bene;
                    var rate = JSON.parse(response.respJsonObj.lst_rate);
                    gInternational.list_Rate = rate;
                    gInternational.list_Promocode = response.respJsonObj.lst_promocode;
                    var limits = JSON.parse(response.respJsonObj.lst_limit_ccy);
                    gInternational.list_Limit = limits;
                    gInternational.limit_TotalDay = response.respJsonObj.limit_day;

                    document.getElementById('id.international.name.offeror').value = response.respJsonObj.infor_user[0].CUSTOMER_NAME1;
                    document.getElementById('id.international.address.offeror').innerHTML = response.respJsonObj.infor_user[0].ADDRESS;

                    useTemplate();

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
                    gotoHomePage();
                }

            });
        }

        function useTemplate() {
            if (gTrans.templateId != undefined && gTrans.templateId != 0){
                for (var i in gInternational.list_bene){
                    if (gTrans.templateId == gInternational.list_bene[i].BENEID){
                        if(gInternational.list_bene[i].BENEFICIARYBANKMETHOD == 'CS01'){
                            $scope.transSwiftCode = true;
                            $scope.transAdderss = false;
                            gInternational.info.settingTemp.transSwiftCode = $scope.transSwiftCode;
                            gInternational.info.settingTemp.transAdderss = $scope.transAdderss;

                        }else if (gInternational.list_bene[i].BENEFICIARYBANKMETHOD == 'CS02'){
                            $scope.transSwiftCode = false;
                            $scope.transAdderss = true;

                            gInternational.info.settingTemp.transSwiftCode = $scope.transSwiftCode;
                            gInternational.info.settingTemp.transAdderss = $scope.transAdderss;
                        }

                        if(gInternational.list_bene[i].METHOD === 'IBY'){
                            $scope.transNHTG = true;
                            gInternational.info.settingTemp.transNHTG = $scope.transNHTG;

                            if(gInternational.list_bene[i].BANKMETHOD === 'CSTG01'){
                                $scope.transSwiftCodeNHTG = true;
                                $scope.transAdderssNHTG = false;

                                gInternational.info.settingTemp.transSwiftCodeNHTG = $scope.transSwiftCodeNHTG;
                                gInternational.info.settingTemp.transAdderssNHTG = $scope.transAdderssNHTG;
                            }else {
                                $scope.transAdderssNHTG = true;
                                $scope.transSwiftCodeNHTG = false;

                                gInternational.info.settingTemp.transAdderssNHTG = $scope.transAdderssNHTG;
                                gInternational.info.settingTemp.transSwiftCodeNHTG = $scope.transSwiftCodeNHTG;
                            }

                        }else {
                            $scope.transNHTG = false;

                            gInternational.info.settingTemp.transNHTG = $scope.transNHTG;
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
                        document.getElementById('id.international.ben.bank.address').value = gInternational.list_bene[i].BENEFICIARYBANKADDRESS;
                        document.getElementById('id.international.nation.bank.ben').value = gInternational.list_bene[i].BENEFICIARYBANKCOUNTRIESNAME;
                        document.getElementById('id.international.nation.bank.ben.value').value = gInternational.list_bene[i].BENEFICIARYBANKCOUNTRIES;

                        document.getElementById('id.international.intermediary.bank').value = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.list_bene[i].METHOD);
                        document.getElementById('id.international.intermediary.bank.value').value = gInternational.list_bene[i].METHOD;

                        document.getElementById('id.international.trans.method.NHTG').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG_' + gInternational.list_bene[i].BANKMETHOD);
                        document.getElementById('id.international.trans.method.value.NHTG').value = gInternational.list_bene[i].BANKMETHOD;

                        document.getElementById('id.international.swift.code.NHTG').value = gInternational.list_bene[i].BANKSWIFTCODE;
                        document.getElementById('id.international.name.NHTG').value = gInternational.list_bene[i].BANKNAME;
                        document.getElementById('id.international.address.NHTG').value = gInternational.list_bene[i].BANKADDRESS;
                        document.getElementById('id.international.nation.NHTG').value = gInternational.list_bene[i].BANKCOUNTRIESNAME;
                        document.getElementById('id.international.nation.value.NHTG').value = gInternational.list_bene[i].BANKCOUNTRIES;


                        refeshContentScroll();
                        break;
                    }
                }
            }
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

                        document.getElementById('id.international.ben.bank.address').value = "";
                        
                    }else if (e.selectedValue2 === 'CS02'){
                        $scope.transSwiftCode = false;
                        $scope.transAdderss = true;
                        
                        document.getElementById('id.international.swift.code').value = "";

                    }
                    gInternational.info.settingTemp.transSwiftCode = $scope.transSwiftCode;
                    gInternational.info.settingTemp.transAdderss = $scope.transAdderss;
                    $scope.$apply();
                    mainContentScroll.refresh();
                    break;
                case 4:
                    if(e.selectedValue2 === 'IBY'){
                        $scope.transNHTG = true;

                    }else {
                        $scope.transNHTG = false;
                    }
                    gInternational.info.settingTemp.transNHTG =  $scope.transNHTG;
                    $scope.$apply();
                    document.getElementById('id.international.intermediary.bank').value = e.selectedValue1;
                    document.getElementById('id.international.intermediary.bank.value').value = e.selectedValue2;

                    mainContentScroll.refresh();
                    break;
                case 5:
                    if(e.selectedValue2 === 'CSTG01'){
                        $scope.transSwiftCodeNHTG = true;
                        $scope.transAdderssNHTG = false;

                        document.getElementById('id.international.name.NHTG').value = "";
                        document.getElementById('id.international.address.NHTG').value = "";
                    }else {
                        $scope.transAdderssNHTG = true;
                        $scope.transSwiftCodeNHTG = false;

                        document.getElementById('id.international.swift.code.NHTG').value = "";
                    }

                    gInternational.info.settingTemp.transSwiftCodeNHTG = $scope.transSwiftCodeNHTG;
                    gInternational.info.settingTemp.transAdderssNHTG = $scope.transAdderssNHTG;
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
                    gInternational.info.settingTemp.managerben = $scope.managerben;
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
            showDialogList(CONST_STR.get('INTERNATIONAL_PURPOSE_TRANS'), cbxInternational, cbxInternationalKey, false);
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
            showDialogList(CONST_STR.get('INTERNATIONAL_TRANS_TYPE'), cbxInternational, cbxInternationalKey, false);
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

        $scope.onContinuteClick = function () {
            gInternational.info.transtype = {};
            gInternational.info.transtype.name = document.getElementById('id.international.transtype').value;
            gInternational.info.transtype.value = document.getElementById('id.international.transtype.value').value;
            gInternational.info.purpose = {};
            gInternational.info.purpose.name = document.getElementById('id.international.purpose').innerHTML;
            gInternational.info.purpose.value = document.getElementById('id.international.purpose.value').value;
            gInternational.info.nameOfferor = document.getElementById('id.international.name.offeror').value;
            gInternational.info.addressOferor = document.getElementById('id.international.address.offeror').innerHTML;
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
                            gInternational.info.beneIds = gInternational.list_bene[i].BENEID;
                            handleOTPTimeout();
                            break;
                        }else if (i == gInternational.list_bene.length - 1 && gInternational.info.managerBenInputName != gInternational.list_bene[i].BENE_NAME){
                            navCachedPages['corp/international_payments/international_money_trans/international_trans_create_1'] = null;
                            navController.pushToView('corp/international_payments/international_money_trans/international_trans_create_1', true, 'html');
                        }
                    }
                }else {
                    navCachedPages['corp/international_payments/international_money_trans/international_trans_create_1'] = null;
                    navController.pushToView('corp/international_payments/international_money_trans/international_trans_create_1', true, 'html');
                }

            }else {
                navCachedPages['corp/international_payments/international_money_trans/international_trans_create_1'] = null;
                navController.pushToView('corp/international_payments/international_money_trans/international_trans_create_1', true, 'html');
            }



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

            navCachedPages['corp/international_payments/international_money_trans/international_trans_create_1'] = null;
            navController.pushToView('corp/international_payments/international_money_trans/international_trans_create_1', true, 'html');

        }

        // Huy OTP
        function handleOTPResendAlertCancel(e) {
            gInternational.info.beneIds = '';
            document.removeEventListener("alertConfirmOK", handleOTPResendAlert, false);
            document.removeEventListener("alertConfirmCancel", handleOTPResendAlertCancel, false);

            // gInternational.info.managerBen = {};
            // if(gUserInfo.lang == 'VN'){
            //     gInternational.info.managerBen.name = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN[0];
            // }else {
            //     gInternational.info.managerBen.name = CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN[0];
            // }
            //
            // gInternational.info.managerBen.value = "N";
            //
            // navCachedPages['corp/international_payments/international_money_trans/international_trans_create_1'] = null;
            // navController.pushToView('corp/international_payments/international_money_trans/international_trans_create_1', true, 'html');
        }
        
        function validate() {
            if (gInternational.info.transtype.value.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_TYPE')]));
                return false;
            }

            if (gInternational.info.purpose.value.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_PURPOSE_TRANS')]));
                return false;
            }

            //Check do dai ky tu ten+dia chi
            var lengthOffer = document.getElementById('id.international.name.offeror').value.length + document.getElementById('id.international.address.offeror').innerHTML.length;
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

            if (gInternational.info.transMethodNHTG.value == 'CSTG02'){
                var lengthBankBank = document.getElementById('id.international.name.NHTG').value.length + document.getElementById('id.international.address.NHTG').value.length;
                if(parseFloat(lengthBankBank) > 139){
                    showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME'), CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_ADDRESS')]));
                    return false;
                }
            }

            if (gInternational.info.nameBen.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_NAME_BEN')]));
                return false;
            }

            if (gInternational.info.addressBen.length == 0 ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_ADDRESS_BEN')]));
                return;
            }

            if (gInternational.info.nationBen.value.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_NATION_BEN')]));
                return false;
            }

            if (gInternational.info.accountBen.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_ACCOUNT_BEN1')]));
                return false;
            }

            if (gInternational.info.content.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_CONTENT')]));
                return false;
            }

            if (gInternational.info.transMethod.value.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_METHOD')]));
                return false;
            }

            if (gInternational.info.transMethod.value == 'CS01'){
                if (gInternational.info.swifCode.length == 0 ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_SWIFT_CODE_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.transMethod.value == 'CS02'){
                if (gInternational.info.benBankAddress.length == 0 ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_ADRESS_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.interMediaryBank.value == 'IBY'){
                if (gInternational.info.NHTG.name == ""){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME')]));
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

            if (gInternational.info.benBankName.length == 0 ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_THE_BEN_BANK_NAME')]));
                return false;
            }

            if (gInternational.info.nationBankBen.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    CONST_STR.get('INTERNATIONAL_NAIION_BANK_BEN')));
                return false;
            }

            if (gInternational.info.interMediaryBank.value.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK')]));
                return false;
            }

            if(gInternational.info.managerBen.value == 'TP'){
                if (gInternational.info.managerBenInputName.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INPUT_NO_SAMPLE')]));
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

                            gInternational.info.settingTemp.transSwiftCode = $scope.transSwiftCode;
                            gInternational.info.settingTemp.transAdderss = $scope.transAdderss;

                            gInternational.info.settingTemp.transNHTG = $scope.transNHTG;
                            gInternational.info.settingTemp.transAdderssNHTG = $scope.transAdderssNHTG;
                            gInternational.info.settingTemp.transSwiftCodeNHTG = $scope.transSwiftCodeNHTG;
                            // gInternational.info.settingTemp.managerben = $scope.managerben;

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
        if (field.value.substr(0,1) == "-"){
            field.value = field.value.replace("-",'');
        }
        field.value = field.value.replace(/[\[\]\,\/!"#$%&*'\+\_:;<=>?\\`^~{|}]/g, '');
        field.value = field.value.toUpperCase();
    }
}

function controlInputAccount(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        field.value = field.value.replace(/ /g, '');
        field.value = field.value.replace("（", '');
        field.value = field.value.replace(/[\[\]\,\/!"#$%&*'\+\-\_\(\)\.:;<=>?\\`^~{|}]/g, '');
        field.value = field.value.toUpperCase();
    }
}

function controlInputTextContent(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        if (field.value.substr(0,1) == "-"){
            field.value = field.value.replace("-",'');
        }

        field.value = field.value.replace(/[\[\]!"#$%&*'\+\_:;<=>?\\`^~{|}]/g, '');
        field.value = field.value.toUpperCase();
    }
}

function controlInputTextAddress(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        if (field.value.substr(0,1) == "-"){
            field.value = field.value.replace("-",'');
        }
        field.value = field.value.replace(/[\[\]\/!"#$%&*'’\+\_:;<=>?\\`^~{|}]/g, '');
        field.value = field.value.toUpperCase();
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
    // if(swiftcode.length == 8){
    //     swiftcode = des.value + "XXX";
    //     des.value = swiftcode;
    // }
    if (swiftcode.length == 8 || swiftcode.length == 11){
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
                if(bank == 1){
                    document.getElementById('id.international.nation.bank.ben').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
                    document.getElementById('id.international.nation.bank.ben.value').value = "";
                }else if (bank == 2){
                    document.getElementById('id.international.nation.NHTG').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
                    document.getElementById('id.international.nation.value.NHTG').value = ""
                }
                break;
            }
        }
    }else {
        des.value = "";
        showAlertText(CONST_STR.get('INTERNATIONA_SWIFTCODE_ERROR'));
        if(bank == 1){
            document.getElementById("id.international.ben.bank.name").value = "";
            document.getElementById('id.international.nation.bank.ben').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.nation.bank.ben.value').value = "";
        }else if (bank == 2){
            document.getElementById("id.international.name.NHTG").value = "";
            document.getElementById('id.international.nation.NHTG').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
            document.getElementById('id.international.nation.value.NHTG').value = ""
        }
        return;
    }
}

function searchBankNameWithSwifCode(des, bank) {
    var swiftcode = des.value;
    if (swiftcode.length == 8 || swiftcode.length == 11){
        var jsonData = new Object();
        jsonData.sequence_id = "6";
        jsonData.idtxn = "B15";
        jsonData.swiftcode = swiftcode;
        var args = new Array();
        args.push(null);
        args.push(jsonData);
        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_PAYMENT_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
        var data = getDataFromGprsCmd(gprsCmd);
        requestMBServiceCorp(data, true, null, function (response) {
            response = JSON.parse(response);
            if (response.respCode == '0'){
                if(response.respJsonObj.list_name_bank.O_LIST_BANK.length > 0){
                    if(bank == 1){
                        document.getElementById("id.international.ben.bank.name").value = response.respJsonObj.list_name_bank.O_LIST_BANK[0].BANK_NAME;
                    }else {
                        document.getElementById("id.international.name.NHTG").value = response.respJsonObj.list_name_bank.O_LIST_BANK[0].BANK_NAME;
                    }
                }else{
                    if(bank == 1){
                        document.getElementById("id.international.ben.bank.name").value = "";
                    }else {
                        document.getElementById("id.international.name.NHTG").value = "";
                    }
                }


            }else {
                showAlertText(response.respContent);
                if(bank == 1){
                    document.getElementById("id.international.ben.bank.name").value = "";
                }else {
                    document.getElementById("id.international.name.NHTG").value = "";
                }
            }
        });
    }
}