/**
 * Created by HaiDT1 on 7/5/2016.
 */

//gCorp.isBack = false;


function viewBackFromOther() {
    gCorp.isBack = true;
}

function viewDidLoadSuccess() {
	if (!gCorp.isBack) {
		gTrans = {};
		gTrans.searchInfo;
		
		gTrans.idtxn = 'B01';
		gTrans.pageSize = 10;
		gTrans.pageIdx = 1;
		gTrans.detail = {};
		gTrans.totalPage;

        var result = document.getElementById('id.searchResult');
        result.style.display = 'none';
        gTrans.pageIdx = 1;
        gTrans.tmpSearchInfo = {};
        gTrans.searchInfo = {
            transType: "",
            maker: "",
            status: "",
            transId: "",
            fromDate: "",
            endDate: ""
        };

        
        

     }
	 else
	 {
		//var obj = gTrans.searchInfo;	
		//init();
	 }
	 init();

    //Tooltip when hover book

}

function init() {
    angular.module('EbankApp').controller('payment_bill_mng', function ($scope, requestMBServiceCorp) {
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');
        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Đã hủy"};
		if (!gCorp.isBack)
		{
		
        	sendInitData();
		}
		else
		{
			 $scope.currentListTrans = gTrans.currentListTrans;	
			 document.getElementById("id.begindate").value = gTrans.searchInfo.fromDate;
             document.getElementById("id.enddate").value = gTrans.searchInfo.endDate;
			 var trans_type = gTrans.searchInfo.transType;
			 var trans_maker = gTrans.searchInfo.maker;
			 var trans_status = gTrans.searchInfo.status;
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
			
		}
        //chuyển sang tab giao dịch
        $scope.changeTab = function () {
            navController.initWithRootView('corp/payment_service/bill/pay_bill_create', true, 'html');
        }

        function sendInitData() {
            var jsonData = {};
            jsonData.sequence_id = "1";
            jsonData.idtxn = gTrans.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMENT_BILL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                gTrans.listMakers = response.respJsonObj.listMakers;

            });
        }

        

        //Xem chi tiết giao dịch
        $scope.showDetailTransaction = function (transId, status, reson) {
            gTrans.detail.transId = transId;
            gTrans.detail.status = status;
			gTrans.detail.reson = reson;
            
            var jsonData = {};
            jsonData.transIds = gTrans.detail.transId;
            jsonData.sequence_id = '3';
            jsonData.idtxn = 'B01';

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMENT_BILL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    var transInfo = [];
                    var infoCommon = {};
                    var common = response.respJsonObj.info_trans[0];
                    infoCommon.transId = common.IDFCATREF;
                    infoCommon.createTime = common.CREATE_TIME;
                    infoCommon.sourceAcc = common.IDSRCACCT;
                    infoCommon.balance = formatNumberToCurrency(common.SO_DU_KHA_DUNG) + ' VND';
                    infoCommon.idUserRef = common.IDUSERREFERENCE;
                    infoCommon.datecheck = common.DATCHECK;
                    infoCommon.datemaker = common.DATMAKE;

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
							if(info.MSG_FIELD_TYPE === 'TEXT')
							{
                            	infoTrans.push({'key' : info.MSG_FIELD_DESC, 'value' : info.FIELD_VALUE});
							}
							else
							{
								infoTrans.push({'key' : info.MSG_FIELD_DESC, 'value' : formatNumberToCurrency(Number(info.FIELD_VALUE)) + ' VND'});
							}
                        }else {
							if(info.MSG_FIELD_TYPE === 'TEXT')
							{
                            	infoTrans.push({'key' : info.MSG_FIELD_DESC_EN, 'value' : info.FIELD_VALUE});
							}
							else
							{
								infoTrans.push({'key' : info.MSG_FIELD_DESC_EN, 'value' : formatNumberToCurrency(Number(info.FIELD_VALUE)) + ' VND'});
								
							}
                            
                        }
                    }

                    transInfo.push(infoCommon);
                    transInfo.push(infoTrans);
                    gTrans.detail.transInfo = transInfo;
                    navCachedPages["corp/payment_service/manager_bill/payment_bill_mng_detail"] = null;
                    navController.pushToView("corp/payment_service/manager_bill/payment_bill_mng_detail", true);
                }else {
                    showAlertText(response.respContent)
                }
            }, function (response) {

            });
            
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
        //--END 0

        //--1. Xử lý chọn loại giao dịch
        $scope.showTransTypeSelection = function ()
        {
            var cbxValues = (gUserInfo.lang == 'EN')? CONST_MNG_BILL_TYPE_VALUE_EN: CONST_MNG_BILL_TYPE_VALUE_VN;
            var cbxKeys = CONST_MNG_BILL_TYPE_KEY;

            
            addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
            showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, cbxKeys, false);
        }

        function handleSelectTransType(e) {
            removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
            gTrans.searchInfo.transType = e.selectedValue2;
            document.getElementById('id.trans-type').value = e.selectedValue1;
        }

        function handleCloseTransTypeCbx() {
            removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
        }
        //--END 1

        //--2. Xử lý chọn trạng thái
        $scope.showTransStatusSelection = function () {
            var cbxValues = (gUserInfo.lang == 'EN')? BATCH_SALARY_MNG_LIST_STATUS_EN: BATCH_SALARY_MNG_LIST_STATUS_VN;
            addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
            showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, BATCH_SALARY_MNG_LIST_STATUS_KEY, false);
        }

        function handleSelectdTransStatus(e) {
            removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
            gTrans.searchInfo.status = e.selectedValue2;
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
            for (var i in gTrans.listMakers) {
                var userId = gTrans.listMakers[i].IDUSER;
                cbxText.push(userId);
                cbxValues.push(userId);
            }
            addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
        }

        function handleSelectMaker(e){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
            gTrans.searchInfo.maker = e.selectedValue2;
            document.getElementById('id.maker').value = e.selectedValue1;
        }
        function handleCloseMakerCbx(){
            removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
        }
        //--END 3

        // Thuc hien khi an nut tim kiem
        $scope.searchTransaction = function () {
            gTrans.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gTrans.searchInfo.endDate = document.getElementById("id.enddate").value;

            if (gTrans.searchInfo.fromDate === 'dd/mm/yyyy'){
                gTrans.searchInfo.fromDate = '';
            }

            if (gTrans.searchInfo.endDate === 'dd/mm/yyyy'){
                gTrans.searchInfo.endDate = '';
            }
			

			if (calculateDifferentMonth(gTrans.searchInfo.fromDate, gTrans.searchInfo.endDate)) {
				// showAlertText(CONST_STR.get("TRANS_PERIODIC_END_DATE_LESS_TO_DATE"));
			
				return;
			}


            gTrans.pageIdx = 1;

            gTrans.tmpSearchInfo = JSON.parse(JSON.stringify(gTrans.searchInfo)); //Clone object
            sendJSONRequest(gTrans.searchInfo);
        }
		
		function calculateDifferentMonth(valFromDate, valToDate) {
			  var from = valFromDate.split("/");
			  var to = valToDate.split("/");
			  var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
			  var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));
			  var currentDate = Date.now();
			
			  if(fromDate.valueOf() > currentDate)
			  {
				showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
				return true;
			  }
			
			  if(toDate.valueOf() > currentDate)
			  {
				showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
				return true;
			  }
			
			  if (fromDate > toDate) {
				showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
				return true;
			  }
			
			  var months = 0;
			  months = (toDate.getFullYear() - fromDate.getFullYear()) * 12;
			  months -= fromDate.getMonth();
			  months += toDate.getMonth();
			  if (toDate.getDate() < fromDate.getDate()) {
				months--;
			  }
			  if(months >3)
			  {
				showAlertText(CONST_STR.get("CORP_MSG_ACC_INPUT_TWO_DATE_TRANS"));
				return true;
			  }
			  if(months==3)
			  {
				var dayOfFromDate = fromDate.getDate();
				var dayOfToDate = toDate.getDate();
				if(dayOfFromDate < dayOfToDate)
				{
				  showAlertText(CONST_STR.get("CORP_MSG_ACC_INPUT_TWO_DATE_TRANS"));
				  return true;
				}
			
			  }
			  return false;
			
			}

        //--4. Gửi thông tin tìm kiếm
        function sendJSONRequest(searchInfo){
            // document.getElementById('id.searchResult').innerHTML = "";
            // document.getElementById('pageIndicatorNums').innerHTML = "";

            var jsonData = new Object();
            jsonData.sequence_id = "2";
            jsonData.idtxn = gTrans.idtxn;

            jsonData.transType = searchInfo.transType;
            jsonData.status = searchInfo.status;
            jsonData.maker = searchInfo.maker;
            jsonData.fromDate = searchInfo.fromDate;
            jsonData.endDate = searchInfo.endDate;

            jsonData.pageSize = gTrans.pageSize;
            jsonData.pageId = gTrans.pageIdx;

            var	args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_MANAGER_PAYMENT_BILL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, requestMBServiceSuccess, function() {
                showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
            });
            

        }

        function requestMBServiceSuccess(response) {
            if (response.respCode == '0'){
                gTrans.currentListTrans = response.respJsonObj.list_trans.O_RETURN;
                if (gTrans.currentListTrans.length > 0) {
                    $scope.currentListTrans = gTrans.currentListTrans;
                    gTrans.totalPage = gTrans.currentListTrans[0].TOTAL_PAGE;

                    $scope.arrPage = [];
                    for (var i = 1; i <= gTrans.totalPage; i++) {
                        $scope.arrPage.push(i);
                    }

                    if (gTrans.currentListTrans.length > 0) {
                        var result = document.getElementById('id.searchResult');
                        result.style.display = 'block';
                    } 

                    if (gTrans.totalPage <= 1) {
                        document.getElementById('acc-pagination').style.display = 'none';
                    }

                    setTimeout(function () {
                        if (mainContentScroll) {
                            if (gTrans.pageIdx === 1) {
                                document.getElementById(gTrans.pageIdx).className = 'active';
                                $scope.$apply();
                            }

                            mainContentScroll.refresh();
                        }
                    }, 100);
					document.getElementById('tblContent').innerHTML = "";
                } else {
                    document.getElementById('id.searchResult').style.display = 'none';
                    document.getElementById('acc-pagination').style.display = 'none';
					document.getElementById('tblContent').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
                }
            }else {
                showAlertText(response.respContent);
            }

        }

       

        $scope.changePage = function (idx) {

            document.getElementById(gTrans.pageIdx).className = '';

            gTrans.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gTrans.searchInfo.endDate = document.getElementById("id.enddate").value;
            gTrans.pageIdx = idx;
            document.getElementById(gTrans.pageIdx).className = 'active';

            gTrans.tmpSearchInfo = JSON.parse(JSON.stringify(gTrans.searchInfo)); //Clone object
            sendJSONRequest(gTrans.searchInfo);

            
        }

        
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}