gCorp.isBack = false; // Khoi tao

function viewDidLoadSuccess() {
    if (!gCorp.isBack)
        gTrans.batch = {};
    initAngularApp();
}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initAngularApp() {
    var app = angular.module("batch-transfer-create", []);

    var idtxn = "T17";

    app.controller("Main", ["$scope", function($scope) {

        var _this = this;

        /* Khoi tao */
        // Get phuong thuc thong bao neu load lan dau
        if (!gCorp.isBack) {
            var argsArray = [];
            argsArray.push(""); // Bo trong element dau
            argsArray.push({
                sequenceId: 1,
                idtxn: idtxn
            });
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_BATCH_TRANSFER_SALARY"),
                "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
            data = getDataFromGprsCmd(gprsCmd);

            _this.transType = {
                value: CONST_STR.get("COM_CHOOSEN_TYPE_TRANS"),
                key: ""
            };
            _this.selectedAcc = {
                number: CONST_STR.get("COM_CHOOSE"),
                balance: ""
            };
            _this.selectedFile = CONST_STR.get("TRANS_BATCH_ACC_LIST_SEND_TO_TPB");
            _this.fileExtension = "";
            
            gTrans.batch.transType = _this.transType;

            requestMBServiceCorp(data, false, 0, function(data) {
                var response = JSON.parse(data);
                if (response.respCode == "0") {
                    _this.sendNotiMethod = {
                        key: response.respJsonObj.method,
                        value: CONST_STR.get("COM_NOTIFY_" + response.respJsonObj
                            .method)
                    };

                    _this.accountNumbers = [];
                    _this.accountBalances = [];
                    for (var i = 0; i < response.respJsonObj.listAccount.length; i++) {
                        var account = response.respJsonObj.listAccount[i];
                        _this.accountNumbers.push(account.account);
                        _this.accountBalances.push(account.balance + " VND");
                    }

                    // Luu vao bien toan cuc
                    gTrans.sendNotiMethod = _this.sendNotiMethod;
                    gTrans.batch.account = _this.selectedAcc;
                    gTrans.batch.accountNumbers = _this.accountNumbers;
                    gTrans.batch.accountBalances = _this.accountBalances;
                    $scope.$apply();
                }
            });
        } else {
            _this.sendNotiMethod = gTrans.sendNotiMethod;
            _this.selectedAcc = gTrans.batch.account;
            _this.accountNumbers = gTrans.batch.accountNumbers;
            _this.accountBalances = gTrans.batch.accountBalances;
            _this.transType = gTrans.batch.transType;
            _this.selectedFile = gTrans.batch.selectedFilename;
            _this.fileExtension = gTrans.batch.fileExtension;
        }

        _this.dialogType = 1; // 1: Loai giao dich, 2: Tai khoan
        _this.transDate = getStringFromDate();

        /* Khi NSD click chon loai giao dich */
        _this.chooseTransactionType = function() {
            _this.dialogType = 1;
            var typeValue = gUserInfo.lang === "EN" ? CONST_TRANS_BATCH_TYPE_EN.slice() :
                CONST_TRANS_BATCH_TYPE_VN.slice();
            var typeKey = CONST_TRANS_BATCH_TYPE.slice();

            // Check xem user co quyen tra luong khong
            if (gUserInfo.userRole.indexOf("CorpSal") == -1) {
                typeValue.shift();
                typeKey.shift();
            }

            document.addEventListener("evtSelectionDialog", _this.dialogSelect,
                false);
            document.addEventListener("evtSelectionDialogClose", _this.dialogClose,
                false);
            showDialogList(CONST_STR.get("COM_CHOOSEN_TYPE_TRANS"), typeValue,
                typeKey, false);
        }

        /* Khi NSD click chon account */
        _this.chooseAccount = function() {
            _this.dialogType = 2;
            document.addEventListener("evtSelectionDialog", _this.dialogSelect,
                false);
            document.addEventListener("evtSelectionDialogClose", _this.dialogClose,
                false);
            showDialogList(CONST_STR.get("TRANS_LOCAL_DIALOG_TITLE_ACC"), _this
                .accountNumbers, _this.accountBalances, true);
        }

        /* Khi NSD click chon file */
        _this.chooseFile = function() {
            document.getElementById("list-file-input").click();
        };

        /* Khi NSD chon 1 file */
        $scope.fileChange = function() {
            showLoadingMask();
            var inputElement = document.getElementById("list-file-input");
            _this.selectedFile = inputElement.value
                .replace(/.*[\/\\]/, '');
            gTrans.batch.selectedFilename = _this.selectedFile;
            if (bowser.name !== "IE")
                $scope.$apply();

            var fileUpload = inputElement.files[0];
            var fileReader = new FileReader();
            fileReader.onload = function(e) {
                gTrans.batch.base64 = e.target.result;
                hideLoadingMask();
            }
            fileReader.readAsDataURL(fileUpload);
        };

        /* Xem va tai template chuyen khoan */
        _this.viewTemplate = function() {
            if (_this.transType.key == "") {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get(
                    "COM_TYPE_TRANSACTION")]));
                return;
            }
            if (_this.transType.key == "T16") {
                _this.templateUrl = "./download/transfer-batch/Payroll_Luong.xls";
            } else {
                _this.templateUrl = "./download/transfer-batch/Interbank_LNH.xls";
            }
        }

        /* Xem danh sach nguoi nhan thong bao */
        _this.viewChecker = function() {
            navController.pushToView('corp/common/com_list_user_approve', true,
                'xsl');
        };

        /* Khi NSD click Tiep tuc */
        _this.submit = function() {
            if (_this.transType.key === "") {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get(
                    "COM_TYPE_TRANSACTION")]));
                return;
            }
            if (_this.selectedAcc.balance === "") {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get(
                    "TRANS_BATCH_ACC_LABEL")]));
                return;
            }
            if (_this.selectedFile === CONST_STR.get("TRANS_BATCH_ACC_LIST_SEND_TO_TPB")) {
                showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get(
                    "TRANS_BATCH_ACC_LIST")]));
                return;
            }

            // Kiem tra kieu file
            var extStartIdx = _this.selectedFile.indexOf(".", _this.selectedFile
                .length - 5);
            if (_this.selectedFile.length < 5 || extStartIdx === -1) {
                showAlertText(CONST_STR.get("CORP_MSG_BATCH_FILE_INVALID_FORMAT"));
                return;
            }
            _this.fileExtension = _this.selectedFile.substring(extStartIdx + 1);
            gTrans.batch.fileExtension = _this.fileExtension;
            if (_this.fileExtension !== "xls" && _this.fileExtension !== "xlsx") {
                showAlertText(CONST_STR.get("CORP_MSG_BATCH_FILE_INVALID_FORMAT"));
                return;
            }

            _this.sendRequest();
        }

        /* Gui du lieu len service */
        _this.sendRequest = function() {
            var idtxn = "T17"; // Lien ngan hang
            if (_this.transType.key === "T16") // Trong TPB
                idtxn = "T16";
            var resquest = {
                sequenceId: 2,
                idtxn: idtxn,
                transType: _this.transType,
                account: _this.selectedAcc.number,
                fileExtension: _this.fileExtension,
                codTrncurr: "VND"
            }

            var responseSuccess = function(data) {
                var response = JSON.parse(data);
                _this.resetFile();
                if (response.respCode == "0") {
                    gTrans.batch.respObj = response;
                    gTrans.batch.respObj.respJson = response.respJsonObj;
                    navCachedPages["corp/transfer/batch/make/batch-transfer-review"] = null;
                    navController.pushToView(
                        "corp/transfer/batch/make/batch-transfer-review",
                        true);
                } else
                    showAlertText(response.respContent);
            };
            var responseFailure = function(data) {
                showAlertText(CONST_STR.get("CORP_MSG_BATCH_FILE_INVALID_FORMAT"));
                _this.resetFile();
            }

            var argsArray = [];
                argsArray.push("2"); // Bo trong element dau
                argsArray.push(resquest);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_BATCH_TRANSFER_SALARY"), "", "",
                gUserInfo.lang, gUserInfo.sessionID, argsArray,
                gTrans.batch.base64);
            data = getDataFromGprsCmd(gprsCmd);
                requestMBServiceCorp(data, true, 0, responseSuccess,
                    responseFailure);
        }

        /* Khi user click chon 1 item trong dialog */
        _this.dialogSelect = function(e) {
            if (currentPage == "corp/transfer/batch/make/batch-transfer-create") {
                if (_this.dialogType === 1) { // Chon loai giao dich
                    _this.transType.value = e.selectedValue1;
                    _this.transType.key = e.selectedValue2;
                    gTrans.batch.transType = _this.transType;
                } else if (_this.dialogType === 2) { // Chon account
                    _this.selectedAcc.number = e.selectedValue1;
                    _this.selectedAcc.balance = e.selectedValue2;
                    gTrans.batch.account = _this.selectedAcc;
                }

                $scope.$apply(); // Can apply do thay doi ngoai scope
                _this.dialogClose();
            }
        }

        /* Khi dialog close */
        _this.dialogClose = function() {
            if (currentPage ===
                "corp/transfer/batch/make/batch-transfer-create") {
                document.removeEventListener("evtSelectionDialog", _this.dialogSelect, false);
                document.removeEventListener("evtSelectionDialogClose", _this.dialogClose, false);
            }
        };

        // Khi NSD click chuyen tab
        _this.changeTab = function() {
            navController.initWithRootView('corp/transfer/batch/mng/batch-transfer-mng-scr', true,
                'xsl');
        };

        // Reset thong tin ve file
        _this.resetFile = function() {
            _this.selectedFile = CONST_STR.get("TRANS_BATCH_ACC_LIST_SEND_TO_TPB");
            gTrans.batch.base64 = "";
            var fileForm = document.getElementById("file-form");
            if (fileForm != null)
                fileForm.reset();
            _this.fileExtension = "";
            $scope.$apply();
        };

    }]);

    // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["batch-transfer-create"]);

}
