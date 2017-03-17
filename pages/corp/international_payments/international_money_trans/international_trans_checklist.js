/**
 * Created by HaiDT1 on 8/26/2016.
 */

gInternational.isBack = false;
gInternational.idtxn = 'B15';
var data;
var totalSizeFile = 0;
gInternational.isBack = false;
var checkUploadFlie;
gInternational.info.listFileUploaded = [];
function viewDidLoadSuccess() {
    init();
}

function viewBackFromOther() {
    gInternational.isBack = true;
}

function init() {
    angular.module("EbankApp").controller('international_trans_checklist', function ($scope, FileUploader, requestMBServiceCorp) {
        $scope.title = CONST_STR.get('INTERNATIONAL_CHECKLIST') + " " + gInternational.info.transtype.name.toLowerCase();
        
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

        checkUploadFlie = true;
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

            document.getElementById('checkbox').checked = false;
            for (var i in uploader.queue){
                totalSizeFile = totalSizeFile + uploader.queue[i].file.size;
            }
            
        }

        $scope.documentInfo = gInternational.info.documentInfo;
        $scope.info = gInternational.info;
        if (gInternational.info.currencyType.value != 'USD' && gInternational.info.feeMethod.value == 'OUR'){
            $scope.showContentDocument = true;
        }else {
            $scope.showContentDocument = false;
        }
        $scope.docReq = [];
        $scope.docAdi = [];
        for (var i in gInternational.info.documentInfo){
            if (gInternational.info.documentInfo[i].TYPE == '1'){
                $scope.docReq.push(gInternational.info.documentInfo[i]);
            }else {
                $scope.docAdi.push(gInternational.info.documentInfo[i]);
            }
        }

        if ($scope.docAdi.length > 0){
            $scope.docAdiLeg = true
        }else {
            
            $scope.docAdiLeg = false
        }

        refeshContentScroll();
        document.getElementById('sendData').disabled = true;

        datecommitment();
        function datecommitment() {
            var now = new Date();
            now.setDate(now.getDate() + 90);
            var day = now.getDate();
            var month = now.getMonth() + 1;
            var year = now.getFullYear();
            document.getElementById("datecommitment").value = day + '/' + month + '/' + year;
            gInternational.info.daycommitment = day + '/' + month + '/' + year;
        }

        function deleteFileTrans() {
            var jsonData = new Object();
            jsonData.sequence_id = "5";
            jsonData.idtxn = gInternational.idtxn;
            jsonData.transId = gInternational.info.idfcatref;
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

        $scope.checkbox = function () {
            $scope.listSelectedTrans = [];
            var checkboxes = document.getElementsByClassName("trans.checkbox");
            var i;
            for (i = 0; i < checkboxes.length; i++){
                if (checkboxes[i].checked == true){
                    $scope.listSelectedTrans.push("1");
                }else {
                    $scope.listSelectedTrans.pop();
                }
            }

            if($scope.listSelectedTrans.length == 0){
                document.getElementById('sendData').disabled = true;
            }else {
                if (totalSizeFile/1024/1024 > 15){
                    document.getElementById('sendData').disabled = true;
                    showAlertText(CONST_STR.get('INTERNATIONAL_ERROR_SIZE'));
                    document.getElementById('checkbox').checked = false;
                }else {
                    document.getElementById('sendData').disabled = false;
                }
            }

        }

        $scope.removeFile = function (item, index) {
            totalSizeFile = totalSizeFile - item.file.size;
            item.remove();
        }

        function requestData(item, note) {
            var jsonData = new Object();
            jsonData.sequence_id = '3';
            jsonData.idtxn = gInternational.idtxn;
            jsonData.idfcatref = gInternational.info.idfcatref;
            jsonData.preidfcatref = "";
            jsonData.file_size = item.file.size;
            jsonData.file_name = item.file.name;
            jsonData.noteProfile = note;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_PAYMENT_INTERNATIONAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            data = getDataFromGprsCmd(gprsCmd);
        }
        

        // if(gInternational.isBack){
        //
        // }


// File must not be larger then some size
//         uploader.filters.push({ name: 'sizeFilter', fn: function(item) {
//             for (var i in this.queue){
//                 console.log("file" +this.queue[i]);
//             }
//
//             return item.size < 100000;
//         }});

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

            // $scope.listSelectedTrans = [];
            var note = document.getElementById('id.international.note.profile').value;
            requestData(item, note);
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
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        // uploader.onCancelItem = function(fileItem, response, status, headers) {
        //     console.info('onCancelItem', fileItem, response, status, headers);
        // };
        // uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //     console.info('onCompleteItem', fileItem, response, status, headers);
        // };

        uploader.onCompleteAll = function() {
            hideLoadingMask();
            if(checkUploadFlie)
            {
                // for (var i in gInternational.info.listFile){
                //     gInternational.info.listFileUploaded.push(gInternational.info.listFile);
                // }
                navCachedPages['corp/international_payments/international_money_trans/international_trans_review'] = null;
                navController.pushToView('corp/international_payments/international_money_trans/international_trans_review', true, 'html');
            }
            else
            {
                checkUploadFlie = true;

            }
        };

        // function resetQueue () {
        //   for(var i =0;i<uploader.queue.length;i++)
        //   {
        //       delete uploader.queue[i]._xhr;
        //       uploader.queue[i].isCancel = false;
        //       uploader.queue[i].isError = false;
        //       uploader.queue[i].isReady = false;
        //       uploader.queue[i].isSuccess = false;
        //       uploader.queue[i].isUploaded = false;
        //       uploader.queue[i].isUploading = false;
        //       uploader.queue[i].progress = 0;
        //   }
        // }

        $scope.onBackClick = function () {
            navController.popView(true);
        }

        $scope.uploadFile = function () {
            if(uploader.queue.length == 0 )
            {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("GUA_SEND_TRANSFER_FILE")]));
                return;
            }else {
                for (var i in uploader.queue){
                    if(!uploader.queue[i].isUploaded){
                        break;
                    }else  if (uploader.queue[i].isUploaded  && i == uploader.queue.length - 1){
                        checkUploadFlie = true;
                        navCachedPages['corp/international_payments/international_money_trans/international_trans_review'] = null;
                        navController.pushToView('corp/international_payments/international_money_trans/international_trans_review', true, 'html');
                    }
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
    });


    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}


function controlInputText(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        field.value = field.value.replace(/[!"#$%&*'\+:;<=>?\\`^~{|}]/g, '');
    }
}

