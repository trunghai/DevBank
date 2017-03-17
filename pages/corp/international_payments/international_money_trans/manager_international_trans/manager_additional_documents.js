/**
 * Created by HaiDT1 on 9/12/2016.
 */

var data;
gInternational.isBack = false;
var totalSizeFile = 0;
var checkUploadFlie = true;
function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gInternational.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('manager_additional_documents', function ($scope, FileUploader, requestMBServiceCorp) {
        $scope.infoTrans = gInternational.detail;
        $scope.detailCheckList = gInternational.detail.checklistProfile;
        $scope.checklist = [];

        $scope.statusVN = {"ABH" : "Hoàn thành giao dịch", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ","RSA":"TPBank từ chối"};

        for (var i in gInternational.detail.documentInfo){
            if (gInternational.detail.documentInfo[i].TYPE == "2"){
                $scope.checklist.push(gInternational.detail.documentInfo[i]);
            }
        }

        var uploader = $scope.uploader = new FileUploader({
            url: CONST_WEB_SERVICE_LINK + '/upload',

        });
        // FILTERS
        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        uploader.filters.push({ name: 'pdfFilter', fn: function(item) {
            return item.type == 'application/pdf';
        }});

        totalSizeFile = parseFloat(gInternational.detail.sum_total_capacity);
        if (!gInternational.isBack){
            gInternational.info.listFile = [];
        }
        else {
            // deleteFileTrans();
            for (var i in gInternational.info.listFile){
                uploader.addToQueue(gInternational.info.listFile[i].file);
                uploader.queue[i].isUploaded = true;
                uploader.queue[i].progress = 100;
            }
            for (var i in uploader.queue){
                totalSizeFile = totalSizeFile + uploader.queue[i].file.size;
            }
        }

        function deleteFileTrans() {
            var jsonData = new Object();
            jsonData.sequence_id = "5";
            jsonData.idtxn = "B15";
            jsonData.transId = gInternational.detail.idcafcatref;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_PAYMENT_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode === '0'){

                }else {
                    showAlertText(response.respContent);
                    navController.popView(true);
                }
            });
        }

        function iniData(item) {
            var jsonData = new Object();
            jsonData.sequence_id = '3';
            jsonData.idtxn = "B15";
            jsonData.idfcatref = gInternational.detail.idcafcatref;
            jsonData.preidfcatref = gInternational.detail.preidcafcatref;
            jsonData.file_size = item.file.size;
            jsonData.file_name = item.file.name;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_PAYMENT_INTERNATIONAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            data = getDataFromGprsCmd(gprsCmd);
        }

        $scope.onBackClick = function () {
            navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_international_trans'] = null;
            navController.popView(true);
        }

        $scope.removeFile = function (item, index) {
            totalSizeFile = totalSizeFile - item.file.size;
            item.remove();
        }

        $scope.uploadFile = function () {
            if(uploader.queue.length ==0 )
            {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("GUA_SEND_TRANSFER_FILE")]));
                return;
            }else {
                for (var i in uploader.queue){
                    if(!uploader.queue[i].isUploaded){
                        break;
                    }else  if (uploader.queue[i].isUploaded  && i == uploader.queue.length - 1){
                        checkUploadFlie = true;
                        navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_view'] = null;
                        navController.pushToView('corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_view', true, 'html');
                    }
                }
            }



            if (totalSizeFile/1024/1024 > 15){
                showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_SIZE'));
                return;
            }
            else
            {
               
                uploader.uploadAll();
            }

        }
        

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_PDF'));
        };
        uploader.onAfterAddingFile = function(fileItem) {
            refeshContentScroll();

            totalSizeFile = totalSizeFile + fileItem.file.size;
            if (totalSizeFile/1024/1024 > 15){
                showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_SIZE'));
            }
        };
        // uploader.onAfterAddingAll = function(addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };
        uploader.onBeforeUploadItem = function(item) {
            iniData(item);
            item.formData.push({transInfo: JSON.stringify(data)});
            showLoadingMask();

            // console.info('onBeforeUploadItem', item);
        };
        // uploader.onProgressItem = function(fileItem, progress) {
        //     console.info('onProgressItem', fileItem, progress);
        // };
        // uploader.onProgressAll = function(progress) {
        //     console.info('onProgressAll', progress);
        // };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            // if (response.respCode === '0'){
            //     fileItem.file.url_key = response.respJsonObj.url_key;
            //     gInternational.info.listFile.push(fileItem);
            // }else {
            //     // navCachedPages["corp/international_payments/international_money_trans/international_trans_create_1"] = null;
            //     // navController.popView(true);
            //     showAlertText(response.respContent);
            // }

            if (response.respCode === '0'){
                fileItem.file.authentic = CONST_STR.get('INTERNATIONAL_FILE_VALID_AUTHENTIC');
                fileItem.file.url_key = response.respJsonObj.url_key;
                gInternational.info.listFile.push(fileItem);
            }else {
                fileItem.file.authentic = CONST_STR.get('INTERNATIONAL_FILE_INVALID_AUTHENTIC');
                fileItem.file.reson =response.respContent;
                checkUploadFlie = false;
                /*    navCachedPages["corp/international_payments/international_money_trans/international_trans_create_1"] = null;
                 navController.popView(true);
                 showAlertText(response.respContent);*/
            }
        };
        // uploader.onErrorItem = function(fileItem, response, status, headers) {
        //     console.info('onErrorItem', fileItem, response, status, headers);
        // };
        // uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };
        uploader.onCompleteAll = function() {

            hideLoadingMask();
            if (checkUploadFlie){
                navCachedPages['corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_view'] = null;
                navController.pushToView('corp/international_payments/international_money_trans/manager_international_trans/manager_additional_documents_view', true, 'html');
            }else {
                checkUploadFlie = false;
            }

        };
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}