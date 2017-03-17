/**
 * Created by HaiDT1 on 8/1/2016.
 */

gCorp.isBack = false;

var searchInfo;

function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('auth-guarantee', function ($rootScope, $scope, requestMBServiceCorp) {
        var _this = this;
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');

        $scope.listSelectedTrans = [];
        gTrans.idtxn = 'B64';
        if (!gCorp.isBack){
            searchInfo = {
                transType : gTrans.idtxn,
                maker : "",
                status : "",
                fromDate : "",
                endDate : ""
            };
        /*    var jsonData = {};
            jsonData.sequence_id = "1";
            jsonData.idtxn = gTrans.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data,handleSuccessCallBackGet);*/
        }
        else {
                document.getElementById("id.status").value = status(searchInfo.status);
                if( searchInfo.maker =="")
                {
                    document.getElementById("id.maker").value = "Tất cả";
                }
                else
                {
                    document.getElementById("id.maker").value = searchInfo.maker;
                }
                document.getElementById("id.begindate").value = searchInfo.fromDate;
                document.getElementById("id.enddate").value = searchInfo.endDate;
        }

        function status(statusType) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes =CONST_GUARANTEE_QUERY_TYPE_STATUS_VALUE;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_QUERY_TYPE_STATUS_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_QUERY_TYPE_STATUS_EN;
            }
            var index =getIndexArr(statusType,keyTypes);
            return guaranteeTypeOfLanguage[index];
        }

        function getIndexArr(guaranteeType,arr){

            for(var i =0;i<arr.length;i++)
            {
                if(arr[i]==guaranteeType)
                {
                    return i;
                }
            }
            return 0;
        }

        function handleSuccessCallBackGet (response) {
            if (response.respCode === '0'){
                var result = document.getElementById('id.searchResult');

                gTrans.makers = response.respJsonObj.makers;
                if (response.respJsonObj.list_pending == null){
                    $scope.currentListTrans = [];
                    result.style.display = 'none';
                }else {
                    $scope.currentListTrans = response.respJsonObj.list_pending;
                    result.style.display = 'block';
                }
                setTimeout(function () {
                    if (mainContentScroll) {
                        mainContentScroll.refresh();
                    }
                }, 100);

            }else {
                showAlertText(response.respContent);
            }

        }


        $scope.showDetailTransaction = function (e) {
            gTrans.detail = {};
            gTrans.detail.transId = e;

            var jsonData = {};
            jsonData.transIds = gTrans.detail.transId;
            jsonData.sequence_id = '5';
            jsonData.idtxn = gTrans.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, handleSuccessCallBack, handleErrorCallBack);
        }

        function handleSuccessCallBack(response) {

            if (response.respCode === '0'){

                var checklistProfile = [];
                var infoCommon = {};
                var common = response.respJsonObj.info_trans[0];
                infoCommon.transId = common.IDFCATREF;
                infoCommon.createTime = common.CREATE_TIME;
                infoCommon.sourceAcc = common.FREE_ACCOUNT;
                infoCommon.idUserRef = common.IDUSERREFERENCE;
                switch (common.GUARANTEE_TYPE){
                    case 'BL01':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[0];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[0];
                        }
                        break;
                    case 'BL02':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[1];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[1];
                        }
                        break;
                    case 'BL03':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[2];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[2];
                        }
                        break;
                    case 'BL04':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[3];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[3];
                        }
                        break;
                    case 'BL05':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[4];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[4];
                        }
                        break;
                    case 'BL06':
                        if (gUserInfo.lang === 'VN'){
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_VN[5];
                        }else {
                            infoCommon.trans_type_name = CONST_GUARANTEE_TRANS_TYPE_EN[5];
                        }
                        break;
                }

                infoCommon.balance = formatNumberToCurrency(common.BALANCE) + ' VND';
                infoCommon.afterTransBalance = formatNumberToCurrency(common.BALANCE - common.AMOUNT) + ' VND';
                infoCommon.SUGGEST_NAME = common.SUGGEST_NAME;
                infoCommon.SUGGEST_ADDRESS = common.SUGGEST_ADDRESS;
                // if (Environment.isMobile()){
                //     if (infoCommon.SUGGEST_ADDRESS.length > 20){
                //         infoCommon.SUGGEST_ADDRESS = infoCommon.SUGGEST_ADDRESS.substring(0, 17) + '...';
                //     }
                // }else {
                //     if (infoCommon.SUGGEST_ADDRESS.length > 35){
                //         infoCommon.SUGGEST_ADDRESS = infoCommon.SUGGEST_ADDRESS.substring(0, 32) + '...';
                //     }
                // }
                infoCommon.SUGGEST_ADDRESS = infoCommon.SUGGEST_ADDRESS;
                infoCommon.GUARANTEE_ADDRESS = common.GUARANTEE_ADDRESS;
                infoCommon.AMOUNT = formatNumberToCurrency(common.AMOUNT) + ' VND';
                infoCommon.DATE_BEGIN = common.DATE_BEGIN;
                infoCommon.DATE_END = common.DATE_END;
                infoCommon.CONTENT = common.CONTENT;
                infoCommon.DEPOSIT_RATE = common.DEPOSIT_RATE;
                infoCommon.GUARANTEE_NAME = common.GUARANTEE_NAME;
                infoCommon.DEPOSIT_ACCOUNT = common.DEPOSIT_ACCOUNT;
                infoCommon.COLLATERAL =common.COLLATERAL;
                infoCommon.SENDMETHOD =common.SENDMETHOD;
                checklistProfile = response.respJsonObj.lst_valquery;


                gTrans.common = infoCommon;
                gTrans.checklistProfile = checklistProfile;

                navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-detail"] = null;
                navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-detail", true);
            }else {
                showAlertText(response.respContent);
            }
        }

        function handleErrorCallBack() {

        }

        $scope.authorizeTransaction = function () {
            var checkboxes = document.getElementsByClassName("trans.checkbox");
            var i;
            for (i = 0; i < checkboxes.length; i++){
                if (checkboxes[i].checked == true){
                    $scope.listSelectedTrans.push($scope.currentListTrans[i]);
                }
            }

            if ($scope.listSelectedTrans.length == 0) {
                showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
                return;
            }

            gTrans = {};
            gTrans.authen = true;
            gTrans.listSelectedTrans = $scope.listSelectedTrans;
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-view"] = null;
            navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-view", true);


        }

        $scope.rejectTransaction = function () {
            var reason = document.getElementById("id.reason-rej").value;
            if (!reason) {
                showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
                return;
            }

            var checkboxes = document.getElementsByClassName("trans.checkbox");
            var i;
            for (i = 0; i < checkboxes.length; i++){
                if (checkboxes[i].checked == true){
                    $scope.listSelectedTrans.push($scope.currentListTrans[i]);
                }
            }

            if ($scope.listSelectedTrans.length == 0) {
                showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
                return;
            }

            gTrans = {};
            gTrans.authen = false;
            gTrans.reason = reason;
            gTrans.listSelectedTrans = $scope.listSelectedTrans;
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-view"] = null;
            navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-view", true);

        }

        //--0. common
        function addEventListenerToCombobox(selectHandle, closeHandle) {
            document.addEventListener("evtSelectionDialog", selectHandle, false);
            document.addEventListener("evtSelectionDialogClose", closeHandle, false);
        }

        function removeEventListenerToCombobox(selectHandle, closeHandle) {
            document.removeEventListener("evtSelectionDialog", selectHandle, false);
            document.removeEventListener("evtSelectionDialogClose", closeHandle, false);
        }


        //--2. Xử lý chọn trạng thái
        $scope.showTransStatusSelection = function () {
            var cbxValues = (gUserInfo.lang == 'EN')? INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_EN: INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_VN;
            addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
            showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_KEY, false);
        }

        function handleSelectdTransStatus(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
            searchInfo.status = e.selectedValue2;
            document.getElementById("id.status").value = e.selectedValue1;
        }

        function handleCloseTransStatusCbx(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
        }
        //--END 2

        //--3. Xử lý chọn người lập
        $scope.showMakers = function (){
            var cbxText = [];
            var cbxValues = [];
            cbxText.push(CONST_STR.get("COM_ALL"));
            cbxValues.push("");
            for (var i in gTrans.makers) {
                var userId = gTrans.makers[i].IDUSER;
                cbxText.push(userId);
                cbxValues.push(userId);
            }
            addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
        }

        function handleSelectMaker(e){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            searchInfo.maker = e.selectedValue2;
            document.getElementById('id.maker').value = e.selectedValue1;
        }
        function handleCloseMakerCbx(){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
        }
//--END 3

        //--4. Gửi thông tin tìm kiếm
        $scope.sendJSONRequestSearch = function (){

            if(!this.checkDateValue())
                return;

            searchInfo.fromDate = document.getElementById("id.begindate").value;
            searchInfo.endDate = document.getElementById("id.enddate").value;

            var jsonData = new Object();
            jsonData.sequence_id = "2";
            jsonData.idtxn = gTrans.idtxn;

            jsonData.transType = searchInfo.transType;
            jsonData.status = searchInfo.status;
            jsonData.maker = searchInfo.maker;
            jsonData.fromDate = searchInfo.fromDate;
            jsonData.endDate = searchInfo.endDate;
            var	args = new Array();
            args.push("2");
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_AUTHORIZE_GUARANTEE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {

                if (response.respCode === '0'){
                    // gTrans.limit = {
                    //     limitTime: response.respJsonObj.limit.limitTime,
                    //     currency: response.respJsonObj.limit.currency,
                    //     limitDay: response.respJsonObj.limit.limitDay,
                    //     totalDay: response.respJsonObj.limit.totalDay,
                    // }
                    var result = document.getElementById('id.searchResult');
                    if (response.respJsonObj == null){
                        result.style.display = 'none';
                        $scope.currentListTrans = [];
                    }else {
                        $scope.currentListTrans = response.respJsonObj;
                        if (response.respJsonObj.length > 0) {
                            result.style.display = 'block';
                            document.getElementById('id.message').style.display = 'none';
                            for(var i = 0 ;i< $scope.currentListTrans.length;i++ )
                                $scope.currentListTrans[i].SO_LUONG =  formatNumberToCurrency( $scope.currentListTrans[i].SO_LUONG) + ' VND';
                        }
                        else
                        {
                            result.style.display = 'none';
                            document.getElementById('id.message').style.display = 'block';
                            document.getElementById('id.message.value').innerHTML = CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST");
                        }

                    }

                }else {
                    _this.message = response.respContent;
                }
            }, function (response) {

            });
        }

        $scope.checkDateValue = function(){
            var startDate = document.getElementById("id.begindate").value;
            var endDate = document.getElementById("id.enddate").value;
            var startDateValueInt = parseInt(startDate);
            var currentDate = new Date();

            var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

            if (!this.calculateDifferentMonth(startDate, strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_START_DATE")]));
                return false;
            }

            if (!this.calculateDifferentMonth(endDate, strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_TO_DATE")]));
                return false;
            }

            if (!this.calculateDifferentMonth(startDate,endDate)) {
                showAlertText(CONST_STR.get("GUA_PERIODIC_END_DATE_LESS_TO_DATE"));
                return false;
            }

            return true;
        }

        $scope.calculateDifferentMonth =function (valFromDate, valToDate) {
            if (valFromDate == '' || valFromDate == undefined) {
                return true;
            };
            var from = valFromDate.split("/");
            var to = valToDate.split("/");
            var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
            var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));
            if (fromDate > toDate) {
                return false;
            }
            return true;
        }

        $scope.guaranteeType = function(guaranteeType) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes =CONST_GUARANTEE_TRANS_TYPE_KEY;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_TRANS_TYPE_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_TRANS_TYPE_EN;
            }
            var index =this.getIndexArr(guaranteeType,keyTypes);
            return guaranteeTypeOfLanguage[index];
        }

        $scope.status=function(statusType) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes =CONST_GUARANTEE_QUERY_TYPE_STATUS_VALUE;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_QUERY_TYPE_STATUS_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_QUERY_TYPE_STATUS_EN;
            }
            var index =this.getIndexArr(statusType,keyTypes);
            return guaranteeTypeOfLanguage[index];
        }

        $scope.getIndexArr=function(guaranteeType,arr){

            for(var i =0;i<arr.length;i++)
            {
                if(arr[i]==guaranteeType)
                {
                    return i;
                }
            }
            return 0;
        }


    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}

