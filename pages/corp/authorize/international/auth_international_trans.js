/**
 * Created by HaiDT1 on 8/31/2016.
 */

gInternational.idtxn = 'B65';
gCorp.isBack = false;
gInternational.pageSize = 10;
gInternational.pageIdx = 1;
gInternational.searchInfo;
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth_international_trans', function ($scope, requestMBServiceCorp) {
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');
        $scope.listSelectedTrans = [];
        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ","RSA":"TPBank từ chối"};

        init();
        function init() {
            if (!gCorp.isBack){
                gInternational.pageIdx = 1;
                gInternational.searchInfo = {
                    transType : CONST_INTERNATIONAL_MONEY_TRANS_TYPE_KEY[0],
                    maker : "",
                    status : "",
                    fromDate : "",
                    endDate : ""
                };
                var  keyTypes = CONST_INTERNATIONAL_MONEY_TRANS_TYPE_VN;
                if (gUserInfo.lang === 'EN') {
                    transType = CONST_INTERNATIONAL_MONEY_TRANS_TYPE_EN;
                }
                document.getElementById("id.trans-type").value = keyTypes[0];
            }
            else
            {
                setValueAfterBack();
            }

        }

        function  setValueAfterBack (){
            var tmpSearchInfo =  gInternational.searchInfo;
            document.getElementById("id.trans-type").value = transferType(tmpSearchInfo.transType);
            document.getElementById("id.status").value = status(tmpSearchInfo.status);
            document.getElementById("id.begindate").value = tmpSearchInfo.fromDate;
            document.getElementById("id.enddate").value = tmpSearchInfo.endDate;
            if(tmpSearchInfo.maker !="")
                document.getElementById("id.maker").value = tmpSearchInfo.maker;
        }

        function transferType(type) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes = CONST_INTERNATIONAL_MONEY_TRANS_TYPE_KEY;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_INTERNATIONAL_MONEY_TRANS_TYPE_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_INTERNATIONAL_MONEY_TRANS_TYPE_EN;
            }
            var index = getIndexArr(type,keyTypes);
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
        function status(statusType) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes =TRANS_MONEY_INTERNATIONAL_STATUSES_KEY;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = TRANS_MONEY_INTERNATIONAL_STATUSES_VN;
            } else {
                guaranteeTypeOfLanguage = TRANS_MONEY_INTERNATIONAL_STATUSES_EN;
            }
            var index =getIndexArr(statusType,keyTypes);
            return guaranteeTypeOfLanguage[index];
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

           if(gInternational.searchInfo.transType =="01"){
               var cbxValues = (gUserInfo.lang == 'VN')? CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_VN: CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_EN;
               addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
               showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_KEY, false);
           }
            else
            {
                var cbxValues = (gUserInfo.lang == 'VN')? CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_VN: CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_EN;
                addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
                showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_KEY, false);
            }
        }

        function handleSelectdTransStatus(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
            gInternational.searchInfo.status = e.selectedValue2;
            document.getElementById("id.status").value = e.selectedValue1;
        }

        function handleCloseTransStatusCbx(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
        }
        //--END 2

        //--3. chonj loai giao dich
        $scope.showTransType = function (){
            var cbxValues = (gUserInfo.lang == 'VN')? CONST_INTERNATIONAL_MONEY_TRANS_TYPE_VN: CONST_INTERNATIONAL_MONEY_TRANS_TYPE_EN;
            showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, CONST_INTERNATIONAL_MONEY_TRANS_TYPE_KEY, false);
            addEventListenerToCombobox(handleSelectdTransTypes, handleCloseTransTypes);
        }

        function handleSelectdTransTypes(e) {

            removeEventListenerToCombobox(handleSelectdTransTypes, handleCloseTransTypes);
            gInternational.searchInfo.transType = e.selectedValue2;
            document.getElementById("id.trans-type").value = e.selectedValue1;
        }

        function handleCloseTransTypes(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
        }
        $scope.TransTypeChange = function () {
           alert("ok");
        }


        //--3. Xử lý chọn người lập
        $scope.showMakers = function (){
            var cbxText = [];
            var cbxValues = [];
            cbxText.push(CONST_STR.get("COM_ALL"));
            cbxValues.push("");
            for (var i in gInternational.makers) {
                var userId = gInternational.makers[i].IDUSER;
                cbxText.push(userId);
                cbxValues.push(userId);
            }
            addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
        }

        function handleSelectMaker(e){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            gInternational.searchInfo.maker = e.selectedValue2;
            document.getElementById('id.maker').value = e.selectedValue1;
        }
        function handleCloseMakerCbx(){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
        }
//--END 3
        $scope.changePage = function (idx) {
            document.getElementById(gInternational.pageIdx).className = '';
            gInternational.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gInternational.searchInfo.endDate = document.getElementById("id.enddate").value;
            gInternational.pageIdx = idx;
            document.getElementById(gInternational.pageIdx).className = 'active';

            gInternational.tmpSearchInfo = JSON.parse(JSON.stringify(gInternational.searchInfo)); //Clone object
            sendJSONRequestSearch(gInternational.searchInfo);
        }
        // Thuc hien khi an nut tim kiem
        $scope.searchTransaction = function () {

            gInternational.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gInternational.searchInfo.endDate = document.getElementById("id.enddate").value;
            var currentDate = new Date();
            var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

            if (gInternational.searchInfo.fromDate === 'dd/mm/yyyy'){
                gInternational.searchInfo.fromDate = '';
            }

            if (gInternational.searchInfo.endDate === 'dd/mm/yyyy'){
                gInternational.searchInfo.endDate = '';
            }


            if (!this.calculateDifferentMonth( gInternational.searchInfo.fromDate,strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_FROM")]));
                return false;
            }

            if (!this.calculateDifferentMonth(gInternational.searchInfo.endDate, strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_TO_DATE")]));
                return false;
            }

            if (!this.calculateDifferentMonth( gInternational.searchInfo.fromDate ,gInternational.searchInfo.endDate )) {
                showAlertText(CONST_STR.get("GUA_PERIODIC_END_DATE_LESS_TO_DATE"));
                return;
            }
            gInternational.pageIdx = 1;
            gInternational.tmpSearchInfo = JSON.parse(JSON.stringify(gInternational.searchInfo)); //Clone object
            sendJSONRequestSearch(gInternational.searchInfo);
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
        //--4. Gửi thông tin tìm kiếm
        function sendJSONRequestSearch (searchInfo){
            var jsonData = new Object();
            jsonData.sequence_id = "2";
            jsonData.idtxn = gInternational.idtxn;
            jsonData.transType = searchInfo.transType;
            jsonData.status = searchInfo.status;
            jsonData.maker = searchInfo.maker;
            jsonData.fromDate = searchInfo.fromDate;
            jsonData.endDate = searchInfo.endDate;
            jsonData.pageSize = gInternational.pageSize;
            jsonData.pageId = gInternational.pageIdx;

            var	args = new Array();
            args.push("2");
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_AUTHORIZE_PAYMNET_INTERNATIONAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, requestMBServiceSuccess, function() {
                showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
            });
        }

        function requestMBServiceSuccess(response) {
            if (response.respCode == '0'){
                gInternational.currentListTrans = response.respJsonObj;
                if (gInternational.currentListTrans.length > 0) {
                    $scope.currentListTrans = gInternational.currentListTrans;
                    gInternational.totalPage = gInternational.currentListTrans[0].TOTAL_PAGE;

                    $scope.arrPage = [];
                    for (var i = 1; i <= gInternational.totalPage; i++) {
                        $scope.arrPage.push(i);
                    }

                    if (gInternational.currentListTrans.length > 0) {
                        var result = document.getElementById('id.searchResult');
                        result.style.display = 'block';
                    }

                    if (gInternational.totalPage <= 1) {
                        document.getElementById('acc-pagination').style.display = 'none';
                    }

                    setTimeout(function () {
                        if (mainContentScroll) {
                            if (gInternational.pageIdx === 1) {
                                document.getElementById(gInternational.pageIdx).className = 'active';
                                $scope.$apply();
                            }

                            mainContentScroll.refresh();
                        }
                    }, 100);
                } else {
                    document.getElementById('id.searchResult').style.display = 'none';
                    document.getElementById('acc-pagination').style.display = 'none';
                    document.getElementById('id.message').style.display = 'block';
                    document.getElementById('id.message.value').innerHTML = CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST");
                }
            }else {
                showAlertText(response.respContent);
            }

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
            
            gInternational.authen = true;
            gInternational.listSelectedTrans = $scope.listSelectedTrans;
            navCachedPages["corp/authorize/international/auth_international_trans_view"] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_view", true, 'html');


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

            gInternational.authen = false;
            gInternational.reason = reason;
            gInternational.listSelectedTrans = $scope.listSelectedTrans;
            navCachedPages["corp/authorize/international/auth_international_trans_view"] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_view", true, 'html');

        }

        $scope.showDetailTransaction = function (e, status) {
            gInternational.detail = {};
            gInternational.detail.transId = e;

            var jsonData = {};
            jsonData.transIds = gInternational.detail.transId;
            jsonData.sequence_id = '5';
            jsonData.idtxn = gInternational.idtxn;
            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    if (status == 'IBS' || status == 'APS'){
                        gInternational.detail = response.respJsonObj.info_trans[0];
                        gInternational.detail.checklistProfile = response.respJsonObj.lst_valquery;

                        navCachedPages['corp/authorize/international/auth_international_additional_review'] = null;
                        navController.pushToView("corp/authorize/international/auth_international_additional_review", true,'html');
                    }else {
                        gInternational.detail = response.respJsonObj.info_trans[0];
                        gInternational.detail.checklistProfile = response.respJsonObj.lst_valquery;
                        var limits = JSON.parse(response.respJsonObj.lst_limit_ccy);
                        gInternational.list_Limit = limits;
                        gInternational.limit_TotalDay = response.respJsonObj.info_limit;

                        navCachedPages['corp/authorize/international/auth_international_trans_detail'] = null;
                        navController.pushToView("corp/authorize/international/auth_international_trans_detail", true,'html');
                    }

                }
            });
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}