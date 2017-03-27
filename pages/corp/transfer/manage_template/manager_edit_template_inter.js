/**
 * Created by HaiDT1 on 10/13/2016.
 */

gInternational.isBack = false;
gInternational.idtxn = 'B15';
gInternational.info = {};
flag = 0;
function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('manager_edit_template_inter', function ($scope, requestMBServiceCorp) {
        $scope.transNHTG = false;
        $scope.transAdderssNHTG = false;
        $scope.transSwiftCodeNHTG = false;
        $scope.managerben = true;
        $scope.dsThuHuong = CONST_STR.get('TRANSFER_DS_THUHUONG');
        $scope.mauThuHuong = CONST_STR.get('TRANSFER_MAU_THUHUONG');
        $scope.listbene = [];
        init();
        function init() {
            
            
            if(gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
                $scope.transSwiftCode = true;
                $scope.transAdderss = false;
            }else if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
                $scope.transSwiftCode = false;
                $scope.transAdderss = true;
            }

            if(gInternational.detail.METHOD === 'IBY'){
                $scope.transNHTG = true;
                if(gInternational.detail.BANKMETHOD === 'CSTG01'){
                    $scope.transSwiftCodeNHTG = true;
                    $scope.transAdderssNHTG = false;
                }else {
                    $scope.transAdderssNHTG = true;
                    $scope.transSwiftCodeNHTG = false;
                }

            }else {
                $scope.transNHTG = false;
            }
            document.getElementById('id.value.tempName').innerHTML = gInternational.detail.BENE_DESC;

            document.getElementById('id.international.transtype').value = CONST_STR.get('INTERNATIONAL_TRANS_TYPE_' + gInternational.detail.TRANSACTIONTYPE);
            document.getElementById('id.international.transtype.value').value = gInternational.detail.TRANSACTIONTYPE;

            document.getElementById('id.international.purpose').value = CONST_STR.get('INTERNATIONAL_PURPOSE_TYPE_' + gInternational.detail.PURPOSE);
            document.getElementById('id.international.purpose.value').value = gInternational.detail.PURPOSE;

            document.getElementById('id.international.content').value = gInternational.detail.CONTENT;

            document.getElementById('id.international.name.offeror').value = gInternational.detail.CUSTOMER_NAME1;
            document.getElementById('id.international.address.offeror').value = gInternational.detail.ADDRESS;

            document.getElementById('id.international.name.ben').value = gInternational.detail.BENEFICIARYNAME;
            document.getElementById('id.international.address.ben').value = gInternational.detail.BENEFICIARYADDRESS;
            document.getElementById('id.international.nation.ben').value = gInternational.detail.BENEFICIARYCOUNTRIESNAME;
            document.getElementById('id.international.nation.ben.value').value = gInternational.detail.BENEFICIARYCOUNTRIES;
            document.getElementById('id.international.account.ben').value = gInternational.detail.BENEFICIARYACCOUNT;

            document.getElementById('id.international.trans.method').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.detail.BENEFICIARYBANKMETHOD);
            document.getElementById('id.international.trans.method.value').value = gInternational.detail.BENEFICIARYBANKMETHOD;
            document.getElementById('id.international.swift.code').value = gInternational.detail.BENEFICIARYSWIFTCODE;
            document.getElementById('id.international.ben.bank.name').value = gInternational.detail.BENEFICIARYBANK;
            document.getElementById('id.international.ben.bank.address').value = gInternational.detail.BENEFICIARYBANKADDRESS;
            document.getElementById('id.international.nation.bank.ben').value = gInternational.detail.BENEFICIARYBANKCOUNTRIESNAME;
            document.getElementById('id.international.nation.bank.ben.value').value = gInternational.detail.BENEFICIARYBANKCOUNTRIES;

            document.getElementById('id.international.intermediary.bank').value = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.detail.METHOD);
            document.getElementById('id.international.intermediary.bank.value').value = gInternational.detail.METHOD;

            document.getElementById('id.international.trans.method.NHTG').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG_' + gInternational.detail.BANKMETHOD);
            document.getElementById('id.international.trans.method.value.NHTG').value = gInternational.detail.BANKMETHOD;

            document.getElementById('id.international.swift.code.NHTG').value = gInternational.detail.BANKSWIFTCODE;
            document.getElementById('id.international.name.NHTG').value = gInternational.detail.BANKNAME;
            document.getElementById('id.international.address.NHTG').value = gInternational.detail.BANKADDRESS;
            document.getElementById('id.international.nation.NHTG').value = gInternational.detail.BANKCOUNTRIESNAME;
            document.getElementById('id.international.nation.value.NHTG').value = gInternational.detail.BANKCOUNTRIES;
            
            refeshContentScroll();
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
                    document.getElementById('id.international.purpose').value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');
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
                    document.getElementById('id.international.purpose').value = e.selectedValue1;
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
                        if (obj.peopleName == gInternational.detail.BENE_NAME){
                            if(gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
                                $scope.transSwiftCode = true;
                                $scope.transAdderss = false;
                            }else if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
                                $scope.transSwiftCode = false;
                                $scope.transAdderss = true;
                            }

                            if(gInternational.detail.METHOD === 'IBY'){
                                $scope.transNHTG = true;
                                if(gInternational.detail.BANKMETHOD === 'CSTG01'){
                                    $scope.transSwiftCodeNHTG = true;
                                    $scope.transAdderssNHTG = false;
                                }else {
                                    $scope.transAdderssNHTG = true;
                                    $scope.transSwiftCodeNHTG = false;
                                }

                            }else {
                                $scope.transNHTG = false;
                            }

                            document.getElementById('id.international.name.ben').value = gInternational.detail.BENEFICIARYNAME;
                            document.getElementById('id.international.address.ben').value = gInternational.detail.BENEFICIARYADDRESS;
                            document.getElementById('id.international.nation.ben').value = gInternational.detail.BENEFICIARYCOUNTRIESNAME;
                            document.getElementById('id.international.nation.ben.value').value = gInternational.detail.BENEFICIARYCOUNTRIES;
                            document.getElementById('id.international.account.ben').value = gInternational.detail.BENEFICIARYACCOUNT;

                            document.getElementById('id.international.trans.method').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.detail.BENEFICIARYBANKMETHOD);
                            document.getElementById('id.international.trans.method.value').value = gInternational.detail.BENEFICIARYBANKMETHOD;
                            document.getElementById('id.international.swift.code').value = gInternational.detail.BENEFICIARYSWIFTCODE;
                            document.getElementById('id.international.ben.bank.name').value = gInternational.detail.BENEFICIARYBANK;
                            document.getElementById('id.international.ben.bank.address').value = gInternational.detail.BENEFICIARYBANKADDRESS;
                            document.getElementById('id.international.nation.bank.ben').value = gInternational.detail.BENEFICIARYBANKCOUNTRIESNAME;
                            document.getElementById('id.international.nation.bank.ben.value').value = gInternational.detail.BENEFICIARYBANKCOUNTRIES;

                            document.getElementById('id.international.intermediary.bank').value = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.detail.METHOD);
                            document.getElementById('id.international.intermediary.bank.value').value = gInternational.detail.METHOD;

                            document.getElementById('id.international.trans.method.NHTG').value = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG_' + gInternational.detail.BANKMETHOD);
                            document.getElementById('id.international.trans.method.value.NHTG').value = gInternational.detail.BANKMETHOD;

                            document.getElementById('id.international.swift.code.NHTG').value = gInternational.detail.BANKSWIFTCODE;
                            document.getElementById('id.international.name.NHTG').value = gInternational.detail.BANKNAME;
                            document.getElementById('id.international.address.NHTG').value = gInternational.detail.BANKADDRESS;
                            document.getElementById('id.international.nation.NHTG').value = gInternational.detail.BANKCOUNTRIESNAME;
                            document.getElementById('id.international.nation.value.NHTG').value = gInternational.detail.BANKCOUNTRIES;




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

        function validate() {
            if (gInternational.detail.TRANSACTIONTYPE.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_TYPE')]));
                return false;
            }

            if (gInternational.detail.PURPOSE.length == '0' ){
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

            if (gInternational.detail.BENEFICIARYBANKMETHOD.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_TRANS_METHOD')]));
                return false;
            }

            if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
                if (gInternational.info.beneficiaryBankSwitch.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_SWIFT_CODE_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
                if (gInternational.info.beneficiaryBankAddress.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_ADRESS_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.info.beneficiaryBank.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    [CONST_STR.get('INTERNATIONAL_THE_BEN_BANK_NAME')]));
                return false;
            }

            if (gInternational.info.beneficiaryBankCountries.length == '0' ){
                showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                    CONST_STR.get('INTERNATIONAL_NAIION_BANK_BEN')));
                return false;
            }

            if (gInternational.detail.METHOD == 'IBY'){
                if (gInternational.info.bankName.length == '0' ){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME1')]));
                    return false;
                }

                if (gInternational.info.bankCountries == ''){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_NAIION_BANK_NHTG')]));
                    return false;
                }
            }

            if (gInternational.detail.BANKMETHOD == 'CSTG01'){
                if (gInternational.info.bankSwiftCode.length == '0'){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_SWIFT_CODE_NHTG1')]));
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

            if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
                var lengthBankBen = document.getElementById('id.international.ben.bank.name').value.length + document.getElementById('id.international.ben.bank.address').value.length;
                if(parseFloat(lengthBankBen) > 139){
                    showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                        [CONST_STR.get('INTERNATIONAL_THE_BEN_BANK_NAME'), CONST_STR.get('INTERNATIONAL_ADRESS_BANK_BEN')]));
                    return false;
                }
            }

            if (gInternational.detail.BANKMETHOD == 'CSTG02'){

                if (gInternational.info.bankAddress.length == '0'){
                    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_ADDRESS')]));
                    return false;
                }

                var lengthBankBank = document.getElementById('id.international.name.NHTG').value.length + document.getElementById('id.international.address.NHTG').value.length;
                if(parseFloat(lengthBankBank) > 139){
                    showAlertText(formatString(CONST_STR.get('INTERNATIONAL_LENGTH_ERROR'),
                        [CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_NAME'), CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_ADDRESS')]));
                    return false;
                }
            }



            // if(gInternational.info.managerBen.value == 'TP'){
            //     if (gInternational.info.managerBenInputName.length == '0' ){
            //         showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'),
            //             [CONST_STR.get('INTERNATIONAL_INPUT_NO_SAMPLE')]));
            //         return false;
            //     }
            // }

            return true;
        }

        $scope.onCancelClick = function () {
            // navController.popView(true);
            navCachedPages['corp/transfer/manage_template/manage_trans_temp'] = null;
            navController.initWithRootView('corp/transfer/manage_template/manage_trans_temp', true, 'xsl');
        
        }

        $scope.onContinuteClick = function(){
            
            gInternational.info.beneId = gInternational.detail.BENEID;
            gInternational.info.transType = document.getElementById('id.international.transtype.value').value;
            gInternational.info.purpose = document.getElementById('id.international.purpose.value').value;
            gInternational.info.beneficiaryName = document.getElementById('id.international.name.ben').value;
            gInternational.info.beneficiaryAddress = document.getElementById('id.international.address.ben').value;
            gInternational.info.beneficiaryAccount = document.getElementById('id.international.account.ben').value;
            
            gInternational.info.nameBen = document.getElementById("id.international.name.ben").value;
            gInternational.info.addressBen = document.getElementById("id.international.address.ben").value;
            gInternational.info.nationBen = {};
            gInternational.info.nationBen.name = document.getElementById('id.international.nation.ben').value;
            gInternational.info.nationBen.value = document.getElementById('id.international.nation.ben.value').value;
            gInternational.info.accountBen = document.getElementById('id.international.account.ben').value;
            gInternational.info.content = document.getElementById('id.international.content').value;
            
            gInternational.info.beneficiaryCountries = document.getElementById('id.international.nation.ben.value').value;
            gInternational.info.beneficiarCountriesName = document.getElementById('id.international.nation.ben').value;
            gInternational.info.beneficiaryBank = document.getElementById('id.international.ben.bank.name').value;
            gInternational.info.beneficiaryBankAddress = document.getElementById('id.international.ben.bank.address').value;
            gInternational.info.beneficiaryBankCountries = document.getElementById('id.international.nation.bank.ben.value').value;
            gInternational.info.beneficiaryBankCountriesName = document.getElementById('id.international.nation.bank.ben').value;
            gInternational.info.beneficiaryBankSwitch = document.getElementById('id.international.swift.code').value;


            gInternational.info.bankSwiftCode = document.getElementById('id.international.swift.code.NHTG').value;

            gInternational.info.bankName = document.getElementById('id.international.name.NHTG').value;
            gInternational.info.bankAddress = document.getElementById('id.international.address.NHTG').value;
            gInternational.info.bankCountries = document.getElementById('id.international.nation.value.NHTG').value;

            if (!$scope.transNHTG) {
                gInternational.info.bankCountriesName = "";
            }else{
                gInternational.info.bankCountriesName = document.getElementById('id.international.nation.NHTG').value;
            }

            if (!validate()) return;

            var data = {};
            var arrayArgs = new Array();
            var request = {
                idtxn: 'M01',
                sequenceId: 8,
                info_trans: gInternational.info,
            };
            var jsonRequest = JSON.stringify(request);
            arrayArgs.push("1");
            arrayArgs.push(jsonRequest);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
            gprsCmd.raw = '';
            data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response){
                showAlertText(response.respContent);

            }, function (response) {
                var objResponse = response;
                showAlertText(objResponse.respContent);
            });

        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
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