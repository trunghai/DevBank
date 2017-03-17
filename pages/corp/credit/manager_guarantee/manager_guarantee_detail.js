/**
 * Created by HaiDT1 on 9/21/2016.
 */
function viewDidLoadSuccess() {
    
    initData();

}

function initData() {
    angular.module("EbankApp").controller('manager_guarante_detail', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gTrans.detail;
        $scope.detailCheckList = gTrans.detail.checklistProfile;
        $scope.statusVN = {"ABH" : "Giao dịch hoàn thành", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};

        refeshContentScroll();
        $scope.onCancelClick = function () {
            navCachedPages['corp/credit/manager_guarantee/manager_guarantee_detail_authen'] = null;
            navController.pushToView("corp/credit/manager_guarantee/manager_guarantee_detail_authen", true,'html');
            
         /*   navCachedPages['corp/credit/manager_guarantee/manager_guarantee_detail_review'] = null;
            navController.pushToView("corp/credit/manager_guarantee/manager_guarantee_detail_review", true,'html');*/
        }

        $scope.showElement = true;
        $scope.showTransCancel = true;
        if(gTrans.detail.CODSTATUS != 'INT')
        {
            $scope.showTransCancel = false;
        }
        if(gUserInfo.userRole.indexOf('CorpInput') == -1 || CONST_BROWSER_MODE == false) {
            $scope.showElement =false;
            $scope.showTransCancel = false;
        }

        $scope.guaranteeType = function (guaranteeType) {
            var guaranteeTypeOfLanguage=[];
            if (gUserInfo.lang === 'VN') {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_TRANS_TYPE_VN;
            } else {
                guaranteeTypeOfLanguage = CONST_GUARANTEE_TRANS_TYPE_EN;
            }
            var index =this.getIndexGuaranteeType(guaranteeType);
            return guaranteeTypeOfLanguage[index];
        }
        $scope.getIndexGuaranteeType =function(guaranteeType){
            var keyTypes =CONST_GUARANTEE_TRANS_TYPE_KEY;
            for(var i =0;i<keyTypes.length;i++)
            {
                if(keyTypes[i]==guaranteeType)
                {
                    return i;
                }
            }
            return 0;
        }
        $scope.onBackClick = function(){
            navCachedPages['corp/credit/manager_guarantee/manager_guarantee'] = null;
            navController.popView(true);
        }


        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "5";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MANAGER_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                var html = '<embed width="100%" height="640"'
                    + ' type="application/pdf"'
                    + ' src="'
                    + response.respJsonObj.url
                    + '"></embed>';

                document.getElementById('contentView').innerHTML = html;
                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                }
            });
        }

        //send du lieu len de xuat file excel
        $scope.sendRequestExportExcel= function() {
            var data = {};
            var objectValueClient = new Object();
            var idtxn = "A15";
            sequenceId = 21;
            objectValueClient.idtxn = idtxn;
            objectValueClient.sequenceId = sequenceId;
            objectValueClient.idfcatref = $scope.infoTrans.IDFCATREF;
            objectValueClient.customerNo = gCustomerNo.substr(0,8);
            objectValueClient.guaranteeType = $scope.infoTrans. GUARANTEE_TYPE;
            var args = ["", objectValueClient];

            //1305
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID,
                args);

            data = getDataFromGprsCmd(gprsCmd);
            corpExportExcel(data);
        }

    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}