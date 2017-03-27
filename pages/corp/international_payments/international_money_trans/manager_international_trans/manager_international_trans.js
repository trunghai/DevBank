/**
 * Created by HaiDT1 on 9/7/2016.
 */

gCorp.isBack = false;
gInternational.idtxn = 'B03';
gInternational.searchInfo;
gInternational.pageSize = 10;
gInternational.pageIdx = 1;
gInternational.detail = {};
gInternational.totalPage;

function viewDidLoadSuccess() {
    if (!gCorp.isBack) {

        var result = document.getElementById('id.searchResult');
        result.style.display = 'none';
        gInternational.pageIdx = 1;
        gInternational.tmpSearchInfo = {};
        gInternational.searchInfo = {
            transType: "",
            transTypeName : "Tất cả",
            maker: "",
            status: "",
            transId: "",
            fromDate: "",
            endDate: ""
        };
        // xoa vi lien quan toi cache va angular
        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            var paging = document.getElementById("paging");
            var tbodyDetail = document.getElementById("tbodyDetail");

            removeChild(paging,pagingItem());
            removeChild(tbodyDetail,detailItem());

        }

    }
    initData();

}

function initData() {
    angular.module('EbankApp').controller('manager_international_trans',  function ($scope, requestMBServiceCorp) {
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');

        $scope.showElement = true;

        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            $scope.showElement =false;
        }

        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "CAN": "Hủy giao dịch", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ","RSA":"TPBank từ chối"};

        if (!gCorp.isBack){
            init();
        }else {
            $scope.currentListTrans = gInternational.currentListTrans;
            gInternational.totalPage = gInternational.currentListTrans[0].TOTAL_PAGE;
            refeshContentScroll();
            setValueAfterBack ();
        }

        function init() {
            var jsonData = {};
            jsonData.sequence_id = "1";
            jsonData.idtxn = gInternational.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                gInternational.listMakers = response.respJsonObj.listMakers;

            });
        }
        function  setValueAfterBack (){
            var tmpSearchInfo =  gInternational.searchInfo;
           // document.getElementById("id.trans-type").value = transferType(tmpSearchInfo.transType);
            document.getElementById("id.trans-type").value = tmpSearchInfo.transTypeName;
            document.getElementById("id.status").value = status(tmpSearchInfo.status);
            document.getElementById("id.trans.code").value = tmpSearchInfo.transCode;
            document.getElementById("id.begindate").value = tmpSearchInfo.fromDate;
            document.getElementById("id.enddate").value = tmpSearchInfo.endDate;
            if(tmpSearchInfo.maker !="")
                document.getElementById("id.maker").value = tmpSearchInfo.maker;
        }
        function transferType(type) {
            var guaranteeTypeOfLanguage=[];
            var keyTypes = CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_KEY;
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_EN;
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

        $scope.showDetailTransaction = function (transId, status) {
            gInternational.detail.transId = transId;
            gInternational.detail.status = status;
           this.cacheValueSearch();
            var jsonData = {};
            jsonData.transIds = gInternational.detail.transId;
            jsonData.sequence_id = '7';
            jsonData.idtxn = 'B03';

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    gInternational.detail = response.respJsonObj.info_trans[0];
                    gInternational.detail.status = status;
                    gInternational.detail.checklistProfile = response.respJsonObj.lst_valquery;

                    navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans_detail'] = null;
                    navController.pushToView("corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans_detail", true,'html');
                }else {
                    showAlertText(response.respContent)
                }
            }, function (response) {

            });
        }
        $scope.cacheValueSearch = function()
        {
            gInternational.searchInfo.transType = document.getElementById("id.trans-type").value;
            gInternational.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gInternational.searchInfo.endDate = document.getElementById("id.enddate").value;
            gInternational.searchInfo.transCode = document.getElementById("id.trans.code").value;
        }
        
        $scope.additionalDocuments = function (trans) {
            gInternational.detail.transId = trans.MA_GD;
            gInternational.detail.status = status;

            var jsonData = {};
            jsonData.transIds = gInternational.detail.transId;
            jsonData.sequence_id = '3';
            jsonData.idtxn = 'B03';
            jsonData.transType = trans.TRANSACTIONTYPE;
            jsonData.purpose = trans.PURPOSE;
            jsonData.initTransId = trans.INITIAIDFCATREF;

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    // gInternational.detail = response.respJsonObj.info_trans[0];
                    gInternational.detail = trans;
                    gInternational.detail.checklistProfile = response.respJsonObj.lst_valquery;
                    gInternational.detail.documentInfo = response.respJsonObj.doc_info;
                    gInternational.detail.idcafcatref = response.respJsonObj.idcafcatref;
                    gInternational.detail.preidcafcatref = gInternational.detail.transId;
                    gInternational.detail.info_common = response.respJsonObj.info_common;
                    gInternational.detail.info_trans = response.respJsonObj.info_trans[0];
                    gInternational.detail.sum_total_capacity = response.respJsonObj.sum_total_capacity;

                    navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents'] = null;
                    navController.pushToView("corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents", true,'html');
                }else {
                    showAlertText(response.respContent)
                }
            }, function (response) {

            });
        }
        
        $scope.cancelAdditionalProfile = function (trans) {
            var jsonData = {};
            jsonData.transIds = trans.MA_GD;
            jsonData.sequence_id = '10';
            jsonData.idtxn = 'B03';
            

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    // gInternational.detail = response.respJsonObj.info_trans[0];
                    gInternational.detail = response.respJsonObj.info_trans[0];
                    gInternational.detail.checklistProfile = response.respJsonObj.lst_valquery;
                    

                    navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_cancel_additional'] = null;
                    navController.pushToView("corp/international_payments/international_money_trans/manager_international_trans/manager_cancel_additional", true,'html');
                }else {
                    showAlertText(response.respContent)
                }
            }, function (response) {

            });
        }

        //chuyển sang tab giao dịch
        $scope.changeTab = function () {
            navCachedPages['corp/international_payments/international_money_trans/international_trans_create'] = null;
            navController.initWithRootView('corp/international_payments/international_money_trans/international_trans_create', true, 'html');
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
            var cbxValues = (gUserInfo.lang == 'EN')? CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_EN : CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_VN;
            var cbxKeys = CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_KEY;


            addEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, cbxKeys, false);
        }

        function handleSelectTransTypeInter(e) {
            removeEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
            gInternational.searchInfo.transType = e.selectedValue2;
            gInternational.searchInfo.transTypeName = e.selectedValue1;
            document.getElementById('id.trans-type').value = e.selectedValue1;
        }

        function handleCloseTransTypeCbxInter() {
            removeEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
        }
        //--END 1

        //--2. Xử lý chọn trạng thái
        $scope.showTransStatusSelection = function () {
            var cbxValues = (gUserInfo.lang == 'EN')? TRANS_MONEY_INTERNATIONAL_STATUSES_EN: TRANS_MONEY_INTERNATIONAL_STATUSES_VN;
            addEventListenerToCombobox(handleSelectdTransStatusInter, handleCloseTransStatusCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, TRANS_MONEY_INTERNATIONAL_STATUSES_KEY, false);
        }

        function handleSelectdTransStatusInter(e) {
            removeEventListenerToCombobox(handleSelectdTransStatusInter, handleCloseTransStatusCbxInter);
            gInternational.searchInfo.status = e.selectedValue2;
            document.getElementById("id.status").value = e.selectedValue1;
        }

        function handleCloseTransStatusCbxInter(e) {
            removeEventListenerToCombobox(handleSelectdTransStatusInter, handleCloseTransStatusCbxInter);
        }
        //--END 2

        //--3. Xử lý chọn người lập
        $scope.showMakers = function (){
            var cbxText = [];
            var cbxValues = [];
            cbxText.push(CONST_STR.get("COM_ALL"));
            cbxValues.push("");
            for (var i in gInternational.listMakers) {
                var userId = gInternational.listMakers[i].IDUSER;
                cbxText.push(userId);
                cbxValues.push(userId);
            }
            addEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
        }

        function handleSelectMakerInter(e){
            removeEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
            gInternational.searchInfo.maker = e.selectedValue2;
            document.getElementById('id.maker').value = e.selectedValue1;
        }
        function handleCloseMakerCbxInter(){
            removeEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
        }
        //--END 3

        // Thuc hien khi an nut tim kiem
        $scope.searchTransaction = function () {
            gInternational.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gInternational.searchInfo.endDate = document.getElementById("id.enddate").value;
            gInternational.searchInfo.transCode = document.getElementById("id.trans.code").value;

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
            sendJSONRequest(gInternational.searchInfo);
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
        function sendJSONRequest(searchInfo){
            // document.getElementById('id.searchResult').innerHTML = "";
            // document.getElementById('pageIndicatorNums').innerHTML = "";

            var jsonData = new Object();
            jsonData.sequence_id = "2";
            jsonData.idtxn = gInternational.idtxn;

            jsonData.transType = searchInfo.transType;
            jsonData.status = searchInfo.status;
            jsonData.transCode = searchInfo.transCode;
            jsonData.maker = searchInfo.maker;
            jsonData.fromDate = searchInfo.fromDate;
            jsonData.endDate = searchInfo.endDate;

            jsonData.pageSize = gInternational.pageSize;
            jsonData.pageId = gInternational.pageIdx;

            var	args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_MANAGER_PAYMNET_INTERNATIONAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, requestMBServiceSuccess, function() {
                showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
            });


        }

        function requestMBServiceSuccess(response) {
            document.getElementById('id.message').style.display = 'none';
            document.getElementById('acc-pagination').style.display = 'block';
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            if (response.respCode == '0'){
                gInternational.currentListTrans = response.respJsonObj.list_trans.O_RETURN;
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
                              /*  document.getElementById(gInternational.pageIdx).className = 'active';*/
                                displayPageCurent(1);
                               // $scope.$apply();
                            }

                            mainContentScroll.refresh();
                        }
                    }, 200);

                    refeshContentScroll();

                }  else {
                    document.getElementById('id.searchResult').style.display = 'none';
                    document.getElementById('acc-pagination').style.display = 'none';
                    document.getElementById('id.message').style.display = 'block';
                    document.getElementById('id.message.value').innerHTML = CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST");
                }
            }else {
                showAlertText(response.respContent);
            }

        }

        $scope.changePage = function (idx) {
            document.getElementById(gInternational.pageIdx).className = '';
            gInternational.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gInternational.searchInfo.endDate = document.getElementById("id.enddate").value;
            gInternational.pageIdx = idx;
            gInternational.tmpSearchInfo = JSON.parse(JSON.stringify(gInternational.searchInfo)); //Clone object
            sendJSONRequest(gInternational.searchInfo);
            displayPageCurent(idx);
        }

    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}

function  displayPageCurent(page) {
    var paging = document.getElementById("paging");
    if(paging.childElementCount >0)
    {
        for(var i = 0;i<paging.childElementCount;i++)
        {
            var child = paging.children[i];
            child.className ="";
        }
        document.getElementById(page).className = 'active';
    }

}
function  removeChild(object, appendObj) {
    while (object.firstChild) {
        object.removeChild(object.firstChild);
    }
    object.innerHTML =  object.innerHTML+appendObj;
}

function  pagingItem()
{
    return '<li ng-repeat="i in arrPage" ng-click="changePage(i)" id="{{$index + 1}}"><span ng-bind="i"></span></li>';
}

function  detailItem() {
 var str  =' <tr ng-repeat="trans in currentListTrans track by $index"> '+
                ' <td class="tdselct td-head-color" width="8%">'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_NO") +'</span></div>'+
                    '<div class="content-detail" style="word-break: break-all;" ng-bind="$index + 1"></div>'+
                 '</td>'+
                 ' <td width="10%">'+
                    '<div class="mobile-mode"><span>'+ CONST_STR.get("COM_CREATED_DATE") +'</span></div>'+
                    '<div class="content-detail" style="white-space: pre-wrap;" ng-bind="trans.NGAY_LAP"></div>'+
                 '</td>'+
                 ' <td width="15%">'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_TAX_AMOUNT") +'</span></div>'+
                   ' <div class="content-detail" style="word-break: break-all;" ng-bind="(trans.SO_LUONG | currency : '+"'" + " '"+' : 2) + '+"'" + " '"+'+ trans.LOAI_TIEN"></div>'+
                 ' </td>'+
                 ' <td width="15%">'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_RECEIVER") +'</span></div>'+
                   ' <div class="content-detail" style="word-break: break-all;" ng-bind="trans.NGUOI_NHAN"></div>'+
                 ' </td>'+
                 ' <td width="15%">'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_APPROVE_STATUS") +'</span></div>'+
                   ' <div class="content-detail" style="word-break: break-all" ng-bind="statusVN[trans.TRANG_THAI]"></div>'+
                 ' </td>'+
                 ' <td width="15%">'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_CHEKER") +'</span></div>'+
                   ' <div class="content-detail" style="word-break: break-all" ng-bind="trans.NGUOI_DUYET"></div>'+
                 ' </td>'+
                 ' <td width="15%" >'+
                   ' <div class="mobile-mode"><span>'+ CONST_STR.get("COM_TRANS_CODE") +'</span></div>'+
                   ' <div class="content-detail">'+
                   ' <a ng-click="showDetailTransaction(trans.INITIAIDFCATREF, trans.TRANG_THAI);" style="cursor:pointer;">'+
                   ' <span class="no-check" ng-bind="trans.INITIAIDFCATREF"></span>'+
                   ' </a>'+
                   ' </div>'+
                 ' </td>'+
                /* ' <td ng-show={{showElement}}>'+
                   ' <a width="15%">'+
                   ' <div class="mobile-mode"><span>INTERNATIONAL_FULL_DOCUMENTATION</span></div>'+
                   ' <div class="content-detail" style="word-break: break-all">'+
                   ' <a ng-show="(trans.TRANSACTIONTYPE === "IMT01" && trans.PURPOSE === "IPHH01") ? true : false" style="cursor:pointer;">'+
                   ' <span ng-show="(trans.TRANG_THAI == "REH" || trans.TRANG_THAI == "RBS" || trans.TRANG_THAI == "RJS" || trans.TRANG_THAI == "RES") ? true : false" ng-click="additionalDocuments(trans);">INTERNATIONAL_ADDITIONAL</span>'+
                   ' </a>'+

                   ' <a ng-show="(trans.TRANSACTIONTYPE === "IMT01" && trans.PURPOSE === "IPHH01") ? true : false"  style="cursor:pointer;">'+
                   ' <span ng-show="(trans.TRANG_THAI == "IBS" || trans.TRANG_THAI == "ABH" || trans.TRANG_THAI == "APS" || trans.TRANG_THAI == "SBS") ? true : false " ng-click="cancelAdditionalProfile(trans);">INTERNATIONAL_ADDITIONAL</span>'+
                    '</a>'+
                   ' </div>'+
                   ' </a>'+
                 ' </td>'+*/
         ' </tr>';
    return str;
}