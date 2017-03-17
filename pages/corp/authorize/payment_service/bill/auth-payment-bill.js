/**
 * Created by HaiDT1 on 6/28/2016.
 */
//gCorp.isBack = false;

function viewBackFromOther() {
    gCorp.isBack = true;
}
function viewDidLoadSuccess() {
     
	var aMountPay;
	var searchInfo;
	initData();
    
}



function initData() {
    angular.module('EbankApp').controller('auth-payment-bill', function ($rootScope, $scope, requestMBServiceCorp) {
        var _this = this;
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');

        $scope.listSelectedTrans = [];
        gTrans.idtxn = 'B63';
		
        if (!gCorp.isBack){
            searchInfo = {
                transType : "B12",
                maker : "",
                status : "",
                fromDate : "",
                endDate : ""
            };
            
            var jsonData = {};
            jsonData.sequence_id = "1";
            jsonData.idtxn = gTrans.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_PAYMENT_BILL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data,handleSuccessCallBackGet);
        }
		else
		{
			$scope.currentListTrans = gTrans.currentListTrans;
			$scope.limit = gTrans.limit;
			var result = document.getElementById('id.searchResult');
			 if (gTrans.currentListTrans.length > 0){
                    
                    result.style.display = 'block';
                }else {
                    
                    result.style.display = 'none';
                }
			
			 document.getElementById("id.begindate").value = searchInfo.fromDate;
             document.getElementById("id.enddate").value = searchInfo.endDate;
			 var trans_type = searchInfo.transType;
			 var trans_maker = searchInfo.maker;
			 var trans_status = searchInfo.status;
			 if (trans_type==='B12')
			 {
				 document.getElementById("id.trans-type").value = (gUserInfo.lang == 'EN')? CONST_MNG_BILL_TYPE_VALUE_EN[1]: CONST_MNG_BILL_TYPE_VALUE_VN[1];
		     }
			 else if (trans_type==='')
			 {
				 document.getElementById("id.trans-type").value = (gUserInfo.lang == 'EN')? CONST_MNG_BILL_TYPE_VALUE_EN[0]: CONST_MNG_BILL_TYPE_VALUE_VN[0];
			 }
			 if (trans_maker==='')
			 {
				 document.getElementById("id.maker").value = (gUserInfo.lang == 'EN')? CONST_MNG_BILL_TYPE_VALUE_EN[0]: CONST_MNG_BILL_TYPE_VALUE_VN[0];	 
			 }
			 else
			 {
				 document.getElementById("id.maker").value = trans_maker;
			 }
			 if (trans_status==='')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[0]: BATCH_SALARY_MNG_LIST_STATUS_VN[0];	
			 }
			 else if (trans_status === 'ABH')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[1]: BATCH_SALARY_MNG_LIST_STATUS_VN[1];
			 }
			 else if (trans_status === 'INT')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[2]: BATCH_SALARY_MNG_LIST_STATUS_VN[2];
			 }
			 else if (trans_status === 'REJ')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[3]: BATCH_SALARY_MNG_LIST_STATUS_VN[3];
			 }
			 else if (trans_status === 'APT')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[4]: BATCH_SALARY_MNG_LIST_STATUS_VN[4];
			 }
			 else if (trans_status === 'RBH')
			 {
			 	 document.getElementById("id.status").value = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN[5]: BATCH_SALARY_MNG_LIST_STATUS_VN[5];
			 }
			document.getElementById("id.reason-rej").value = gTrans.reason;
            /*for (i = 0; i < checkboxes.length; i++){
                if (checkboxes[i].checked == true){
                    $scope.listSelectedTrans.push($scope.currentListTrans[i]);
                }
            }*/
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
				if (response.respJsonObj.limit == null){
                    $scope.limit = [];
                }else {
                    $scope.limit = response.respJsonObj.limit;
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


        $scope.showDetailTransaction = function (e, amount) {
            gTrans.detail = {};
            gTrans.detail.transId = e;
			aMountPay = amount;
            var jsonData = {};
            jsonData.transIds = gTrans.detail.transId;
            jsonData.sequence_id = '5';
            jsonData.idtxn = 'B63';

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_PAYMENT_BILL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, handleSuccessCallBack, handleErrorCallBack);
        }

        function handleSuccessCallBack(response) {

            if (response.respCode === '0'){

                var transInfo = [];
                var infoCommon = {};
                var common = response.respJsonObj.info_trans[0];
                infoCommon.transId = common.IDFCATREF;
                infoCommon.createTime = common.CREATE_TIME;
                infoCommon.sourceAcc = common.IDSRCACCT;
                infoCommon.balance = formatNumberToCurrency(common.SO_DU_KHA_DUNG) + ' VND';
                infoCommon.idUserRef = common.IDUSERREFERENCE;
                if (gUserInfo.lang === 'VN'){
                    infoCommon.transType = common.SRV_DESC;
                    infoCommon.transProvider = common.PR_DESC;
                }else {
                    infoCommon.transType = common.SRV_DESC_EN;
                    infoCommon.transProvider = common.PR_DESC_EN;
                }

                var infoTrans = [];
                for (var i in response.respJsonObj.lst_valquery){
                    info = response.respJsonObj.lst_valquery[i];

                    if (gUserInfo.lang === 'VN'){
						if (info.MSG_FIELD_TYPE === 'NUMBER')
						{
                            infoTrans.push({'key' : info.MSG_FIELD_DESC, 'value' : formatNumberToCurrency(Number(info.FIELD_VALUE)) + ' VND'});
						}
						else
						{
							infoTrans.push({'key' : info.MSG_FIELD_DESC, 'value' : info.FIELD_VALUE});
					    }
                    }else {
						if (info.MSG_FIELD_TYPE === 'NUMBER')
						{
                            infoTrans.push({'key' : info.MSG_FIELD_DESC_EN, 'value' : formatNumberToCurrency(Number(info.FIELD_VALUE)) + ' VND'});
						}
						else
						{
							infoTrans.push({'key' : info.MSG_FIELD_DESC_EN, 'value' : info.FIELD_VALUE});
					    }
                        
                    }
                }

                transInfo.push(infoCommon);
                transInfo.push(infoTrans);
                gTrans.detail.transInfo = transInfo;
				gTrans.detail.amount = aMountPay;
				gTrans.limit = $scope.limit;
                navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-detail"] = null;
                navController.pushToView("corp/authorize/payment_service/bill/auth-payment-bill-detail", true);
            }else {
                showAlertText(response.respContent);
            }
        }

        function handleErrorCallBack() {

        }
        
        $scope.authorizeTransaction = function () {
            var checkboxes = document.getElementsByClassName("trans.checkbox");
			var reason = document.getElementById("id.reason-rej").value;
            
            
			
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
			gTrans.currentListTrans = $scope.currentListTrans;
			gTrans.reason = reason;
			gTrans.limit = $scope.limit;
            navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-view"] = null;
            navController.pushToView("corp/authorize/payment_service/bill/auth-payment-bill-view", true);
            

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
			gTrans.limit = $scope.limit;
			gTrans.currentListTrans = $scope.currentListTrans;
            gTrans.listSelectedTrans = $scope.listSelectedTrans;
            navCachedPages["corp/authorize/payment_service/bill/auth-payment-bill-view"] = null;
            navController.pushToView("corp/authorize/payment_service/bill/auth-payment-bill-view", true);
            
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
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_AUTHORIZE_PAYMENT_BILL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode === '0'){
                    /*gTrans.limit = {
                        limitTime: response.respJsonObj.limit.limitTime,
                        currency: response.respJsonObj.limit.currency,
                        limitDay: response.respJsonObj.limit.limitDay,
                        totalDay: response.respJsonObj.limit.totalDay,
                    }*/
                    var result = document.getElementById('id.searchResult');
                    if (response.respJsonObj == null){
                        result.style.display = 'none';
                        $scope.currentListTrans = [];
                    }else {
                        $scope.currentListTrans = response.respJsonObj;
                        result.style.display = 'block';
                    }

                }else {
                    _this.message = response.respContent;
                }
            }, function (response) {
                
            });
        }
        
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}