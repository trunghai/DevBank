/**
 * Created by HaiDT1 on 7/20/2016.
 */
gTrans.isBack = false;
gTrans.idtxn = 'B14';
var data;
var totalSizeFile = 0;

function viewDidLoadSuccess() {
    init();
}

function viewBackFromOther() {
    gTrans.isBack = true;
}

function init() {
    angular.module("EbankApp").controller('cre_guarantee_checklist', function ($scope, FileUploader, requestMBServiceCorp) {
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

        $scope.documentInfo = gTrans.infoGuarantee.documentInfo;
        if (!gTrans.isBack){
            gTrans.infoGuarantee.listFile = [];
        }else {
            // deleteFileTrans();
            for (var i in gTrans.infoGuarantee.listFile){
                uploader.addToQueue(gTrans.infoGuarantee.listFile[i].file);
                uploader.queue[i].isUploaded = true;
                uploader.queue[i].progress = 100;
            }

            for (var i in uploader.queue){
                totalSizeFile = totalSizeFile + uploader.queue[i].file.size;
            }
            document.getElementById('id.instruction.file').value = gTrans.infoGuarantee.instructionFile;
        }

        refeshContentScroll();
        function iniData(item, note) {
            var jsonData = new Object();
            jsonData.sequence_id = '3';
            jsonData.idtxn = gTrans.idtxn;
            jsonData.idfcatref = gTrans.infoGuarantee.idfcatref;
            jsonData.file_size = item.file.size;
            jsonData.file_name = item.file.name;
            jsonData.noteProfile = note;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_GUARANTEE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            data = getDataFromGprsCmd(gprsCmd);
        }



        // CALLBACKS

        $scope.removeFile = function (item) {
            totalSizeFile = totalSizeFile - item.file.size;
            // if (totalSizeFile/1024/1024 <= 15){
            //  document.getElementById('sendData').disabled = false;
            // }

            item.remove();
        }

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            // console.info('onWhenAddingFileFailed', item, filter, options);
            showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_PDF'));
        };
        uploader.onAfterAddingFile = function(fileItem) {
            refeshContentScroll();

            totalSizeFile = totalSizeFile + fileItem.file.size;
            if (totalSizeFile/1024/1024 > 15){
                showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_SIZE'));
                // document.getElementById('sendData').disabled = true;
            }
        };
        // uploader.onAfterAddingAll = function(addedFileItems) {
        //     console.info('onAfterAddingAll', addedFileItems);
        // };
        uploader.onBeforeUploadItem = function(item) {
            var note = document.getElementById('id.instruction.file').value;
            iniData(item, note);
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
            if (response.respCode === '0'){
                fileItem.file.url_key = response.respJsonObj.url_key;
                var currentDate = new Date();
                fileItem.file.dateSended = [ currentDate.getDate().padLeft(),
                        (currentDate.getMonth()+1).padLeft(),
                        currentDate.getFullYear()].join('/')+
                    ' ' +
                    [   currentDate.getHours().padLeft(),
                        currentDate.getMinutes().padLeft(),
                        currentDate.getSeconds().padLeft()].join(':');
                gTrans.infoGuarantee.listFile.push(fileItem);

            }else {
                navCachedPages["corp/credit/guarantee/create/cre_guarantee_create"] = null;
                navController.popView(true);
                showAlertText(response.respContent);
            }

        };

        Number.prototype.padLeft = function(base,chr){
            var  len = (String(base || 10).length - String(this).length)+1;
            return len > 0? new Array(len).join(chr || '0')+this : this;
        }
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
            gTrans.infoGuarantee.instructionFile =  document.getElementById('id.instruction.file').value;
            navCachedPages['corp/credit/guarantee/create/cre_guarantee_review'] = null;
            navController.pushToView('corp/credit/guarantee/create/cre_guarantee_review', true, 'html');
        };

        $scope.onBackClick = function () {
            navController.popView(true);
        }
        $scope.uploadFile = function () {
            if(uploader.queue.length ==0 )
            {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("GUA_SEND_TRANSFER_FILE")]));
            }else {
                for (var i in uploader.queue){
                    if(!uploader.queue[i].isUploaded){
                        break;
                    }else  if (uploader.queue[i].isUploaded  && i == uploader.queue.length - 1){
                        checkUploadFlie = true;
                        navCachedPages['corp/international_payments/international_money_trans/international_trans_review'] = null;
                        navController.pushToView('corp/international_payments/international_money_trans/international_trans_review', true, 'html');
                        return;
                    }
                }


                if (totalSizeFile/1024/1024 > 15){
                    showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_SIZE'));
                    return;
                }
                else
                {
                    // gInternational.info.listFile = [];
                    uploader.uploadAll();
                }
            }



        }

        function deleteFileTrans() {
            var jsonData = new Object();
            jsonData.sequence_id = "5";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.transId = gTrans.infoGuarantee.idfcatref;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode === '0'){

                }else {
                    showAlertText(response.respContent);
                    navController.popView(true);
                }
            });
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}



