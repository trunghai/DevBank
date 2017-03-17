/**
 * Created by HaiDT1 on 9/21/2016.
 */
gCorp.isBack = false;
gTrans.idtxn = 'B02';
gTrans.searchInfo;
gTrans.pageSize = 10;
gTrans.pageIdx = 1;
gTrans.detail = {};
gTrans.totalPage;

function viewDidLoadSuccess() {
    if (!gCorp.isBack) {
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

        // xoa vi lien quan toi cache va angular
        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            var paging = document.getElementById("paging");
            var tbodyDetail = document.getElementById("tbodyDetail");

            removeChild(paging,pagingItem());
            removeChild(tbodyDetail,detailItem());

        }
    }
    else
    {
        setValueAfterBack();
    }
    initData();

}
function  setValueAfterBack (){
    var tmpSearchInfo = gTrans.tmpSearchInfo;
    document.getElementById("id.trans-type").value = guaranteeType(tmpSearchInfo.transType);
    document.getElementById("id.status").value = status(tmpSearchInfo.status);
    document.getElementById("id.trans.code").value = tmpSearchInfo.transCode;
    document.getElementById("id.begindate").value = tmpSearchInfo.fromDate;
    document.getElementById("id.enddate").value = tmpSearchInfo.endDate;
    if(tmpSearchInfo.maker !="")
        document.getElementById("id.maker").value = tmpSearchInfo.maker;
}

function guaranteeType(guaranteeType) {
    var guaranteeTypeOfLanguage=[];
    var keyTypes =CONST_MNG_GUARANTEE_TYPE_VALUE_KEY;
    if (gUserInfo.lang === 'VN') {
        guaranteeTypeOfLanguage = CONST_MNG_GUARANTEE_TYPE_VALUE_VN;
    } else {
        guaranteeTypeOfLanguage = CONST_MNG_GUARANTEE_TYPE_VALUE_EN;
    }
    var index =this.getIndexArr(guaranteeType,keyTypes);
    return guaranteeTypeOfLanguage[index];
}

function status(statusType) {
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

function viewBackFromOther() {
    gCorp.isBack = true;
}


function initData() {
    angular.module("EbankApp").controller('manager_guarantee', function ($scope, requestMBServiceCorp) {
        createDatePicker('id.begindate', 'span.begindate');
        createDatePicker('id.enddate', 'span.enddate');
        document.getElementById('id.message').style.display = 'none';

        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};

        if (!gCorp.isBack){
            init();
        }else {
            $scope.currentListTrans = gTrans.currentListTrans;
            gTrans.totalPage = gTrans.currentListTrans[0].TOTAL_PAGE;
        }
        $scope.showElement = true;
        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            $scope.showElement =false;
        }

        function init() {
            var jsonData = {};
            jsonData.sequence_id = "1";
            jsonData.idtxn = gTrans.idtxn;

            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, function (response) {
                gTrans.listMakers = response.respJsonObj.listMakers;

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
            var cbxValues = (gUserInfo.lang == 'EN')? CONST_MNG_GUARANTEE_TYPE_VALUE_EN : CONST_MNG_GUARANTEE_TYPE_VALUE_VN;
            var cbxKeys = CONST_MNG_GUARANTEE_TYPE_VALUE_KEY;


            addEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, cbxKeys, false);
        }

        function handleSelectTransTypeInter(e) {
            removeEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
            gTrans.searchInfo.transType = e.selectedValue2;
            document.getElementById('id.trans-type').value = e.selectedValue1;
        }

        function handleCloseTransTypeCbxInter() {
            removeEventListenerToCombobox(handleSelectTransTypeInter, handleCloseTransTypeCbxInter);
        }
        //--END 1

        //--2. Xử lý chọn trạng thái
        $scope.showTransStatusSelection = function () {
            var cbxValues = (gUserInfo.lang == 'EN')? CONST_GUARANTEE_QUERY_TYPE_STATUS_EN: CONST_GUARANTEE_QUERY_TYPE_STATUS_VN;
            addEventListenerToCombobox(handleSelectdTransStatusInter, handleCloseTransStatusCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, CONST_GUARANTEE_QUERY_TYPE_STATUS_VALUE, false);
        }

        function handleSelectdTransStatusInter(e) {
            removeEventListenerToCombobox(handleSelectdTransStatusInter, handleCloseTransStatusCbxInter);
            gTrans.searchInfo.status = e.selectedValue2;
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
            for (var i in gTrans.listMakers) {
                var userId = gTrans.listMakers[i].IDUSER;
                cbxText.push(userId);
                cbxValues.push(userId);
            }
            addEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
            showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
        }

        function handleSelectMakerInter(e){
            removeEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
            gTrans.searchInfo.maker = e.selectedValue2;
            document.getElementById('id.maker').value = e.selectedValue1;
        }
        function handleCloseMakerCbxInter(){
            removeEventListenerToCombobox(handleSelectMakerInter, handleCloseMakerCbxInter);
        }
        //--END 3

        // Thuc hien khi an nut tim kiem
        $scope.searchTransaction = function () {
            gTrans.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gTrans.searchInfo.endDate = document.getElementById("id.enddate").value;
            gTrans.searchInfo.transCode = document.getElementById("id.trans.code").value;
            var currentDate = new Date();
            var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

            if (gTrans.searchInfo.fromDate === 'dd/mm/yyyy'){
                gTrans.searchInfo.fromDate = '';
            }

            if (gTrans.searchInfo.endDate === 'dd/mm/yyyy'){
                gTrans.searchInfo.endDate = '';
            }
            if (!this.calculateDifferentMonth(gTrans.searchInfo.fromDate,strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_FROM")]));
                return false;
            }

            if (!this.calculateDifferentMonth(gTrans.searchInfo.endDate, strCurrentDate)) {
                showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_TO_DATE")]));
                return false;
            }

            if (!this.calculateDifferentMonth( gTrans.searchInfo.fromDate ,gTrans.searchInfo.endDate )) {
                showAlertText(CONST_STR.get("GUA_PERIODIC_END_DATE_LESS_TO_DATE"));
                return;
            }


            gTrans.pageIdx = 1;
            gTrans.tmpSearchInfo = JSON.parse(JSON.stringify(gTrans.searchInfo)); //Clone object
            sendJSONRequest(gTrans.searchInfo);
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
            jsonData.idtxn = gTrans.idtxn;

            jsonData.transType = searchInfo.transType;
            jsonData.status = searchInfo.status;
            jsonData.maker = searchInfo.maker;
            jsonData.transCode = searchInfo.transCode;
            jsonData.fromDate = searchInfo.fromDate;
            jsonData.endDate = searchInfo.endDate;

            jsonData.pageSize = gTrans.pageSize;
            jsonData.pageId = gTrans.pageIdx;

            var	args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_MANAGER_GUARANTEE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);

            requestMBServiceCorp.post(data, requestMBServiceSuccess, function() {
                showAlertText(CONST_STR.get("CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA"));
            });


        }

        function requestMBServiceSuccess(response) {
            if (response.respCode == '0'){
                gTrans.currentListTrans = [];
                if (response.respJsonObj.length > 0) {
                    gTrans.currentListTrans = response.respJsonObj;
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

                    document.getElementById('id.searchResult').style.display = 'block';
                    document.getElementById('acc-pagination').style.display = 'block';
                    document.getElementById('id.message').style.display = 'none';
                    setTimeout(function () {
                        if (mainContentScroll) {
                            if (gTrans.pageIdx === 1) {
                                displayPageCurent(1);
                               /* document.getElementById(gTrans.pageIdx).className = 'active';*/
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
        
        $scope.showDetailTransaction = function (transId, status) {
            gTrans.detail.transId = transId;
            gTrans.detail.status = status;

            var jsonData = {};
            jsonData.transIds = gTrans.detail.transId;
            jsonData.sequence_id = '3';
            jsonData.idtxn = 'B02';

            var args = new Array();
            args.push(null);
            args.push(jsonData);

            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    gTrans.detail = response.respJsonObj.info_trans[0];
                    gTrans.detail.sendNoteToUser =CONST_STR.get("COM_NOTIFY_"+gTrans.detail.SENDMETHOD);
                    gTrans.detail.AMOUNT =  formatNumberToCurrency(gTrans.detail.AMOUNT) + ' VND';
                    gTrans.detail.checklistProfile = response.respJsonObj.lst_valquery;

                    navCachedPages['corp/credit/manager_guarantee/manager_guarantee_detail'] = null;
                    navController.pushToView("corp/credit/manager_guarantee/manager_guarantee_detail", true,'html');
                }else {
                    showAlertText(response.respContent)
                }
            }, function (response) {

            });
        }

        $scope.changeTab = function () {
            navCachedPages['corp/credit/guarantee/create/cre_guarantee_create'] = null;
            navController.initWithRootView('corp/credit/guarantee/create/cre_guarantee_create', true, 'html');
        }

        $scope.changePage = function (idx) {

            document.getElementById(gTrans.pageIdx).className = '';

            gTrans.searchInfo.fromDate = document.getElementById("id.begindate").value;
            gTrans.searchInfo.endDate = document.getElementById("id.enddate").value;
            gTrans.pageIdx = idx;
            /*document.getElementById(gTrans.pageIdx).className = 'active';*/

            gTrans.tmpSearchInfo = JSON.parse(JSON.stringify(gTrans.searchInfo)); //Clone object
            sendJSONRequest(gTrans.searchInfo);

            displayPageCurent(idx);
        }
        
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
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
    var str  =' <tr ng-repeat="trans in currentListTrans track by $index">'+
                    '<td class="tdselct td-head-color" width="8%">'+
                        '<div class="mobile-mode"><span>COM_NO</span></div>'+
                        '<div class="content-detail" style="word-break: break-all;">{{$index + 1}}</div>'+
                    '</td>'+
                    '<td width="10%">'+
                        '<div class="mobile-mode"><span>COM_CREATED_DATE</span></div>'+
                        '<div class="content-detail" style="white-space: pre-wrap;" ng-bind="trans.NGAY_LAP"></div>'+
                        '</td>'+
                        '<td width="15%">'+
                        '<div class="mobile-mode"><span>COM_TAX_AMOUNT</span></div>'+
                        '<div class="content-detail" >{{trans.SO_LUONG | currency : "" : 0}}{{'+"'" + " '"+'+ trans.LOAI_TIEN}} VND</div>'+
                    '</td>'+
                    '<td width="15%">'+
                        '<div class="mobile-mode"><span>GUA_THE_GUARANTEE</span></div>'+
                        '<div class="content-detail" style="white-space: pre-wrap;" ng-bind="trans.GUARANTEE_NAME"></div>'+
                        '</td>'+
                        '<td width="15%">'+
                        '<div class="mobile-mode"><span>COM_APPROVE_STATUS</span></div>'+
                        '<div class="content-detail">{{statusVN[trans.TRANG_THAI]}}</div>'+
                    '</td>'+
                    '<td width="15%">'+
                        '<div class="mobile-mode"><span>COM_CHEKER</span></div>'+
                        '<div class="content-detail" ng-bind="trans.NGUOI_DUYET"></div>'+
                        '</td>'+
                        '<td width="15%" >'+
                        '<div class="mobile-mode"><span>COM_TRANS_CODE</span></div>'+
                        '<div class="content-detail">'+
                        '<a ng-click="showDetailTransaction(trans.MA_GD, trans.TRANG_THAI);" style="cursor:pointer;">'+
                        '<span class="no-check" ng-bind="trans.MA_GD"></span>'+
                        '</a>'+
                        '</div>'+
                    '</td>'+
                '</tr>';
    return str;
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