gCorp.isBack = false; // Khoi tao

function viewDidLoadSuccess() {
    initAngularApp();
}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initAngularApp() {
    var app = angular.module("batch-transfer-edit", []);

    app.controller("Main", ["$scope", "$timeout", function($scope, $timeout) {
        var _this = this;
        _this.transType = gTrans.batch.transType;

        if (!gCorp.isBack) {
            gCorp.listErrorsBackup = [];
            _this.listErrors = [];
            _this.currentTrans = {};
            for (var i = 0; i < gTrans.batch.listErrors.length; i++) {
                var error = angular.extend({}, gTrans.batch.listErrors[i]);
                _this.listErrors.push(error);
            }
        } else {
            _this.listErrors = gCorp.listErrorsBackup;
        }

        $timeout(function() {
            mainContentScroll.refresh();
        });

        if (gTrans.batch.transType.key == "T16")
            _this.colspan = 5;
        else
            _this.colspan = 8;

        // Chon ngan hang
        _this.chooseBank = function(trans) {
            _this.currentTrans = trans;
            gCorp.listErrorsBackup = _this.listErrors;
            gTrans.redirect = "corp/transfer/batch/make/batch-transfer-edit";
            navController.pushToView("corp/transfer/domestic/trans-dti-list-bank", true);
            document.addEventListener("evtSelectedBranch", _this.bankSelected, false);
        };

        // Sau khi chon ngan hang
        _this.bankSelected = function(e) {
            document.removeEventListener("evtSelectedBranch", _this.bankSelected, false);
            _this.currentTrans.bankName = e.bankName;
            _this.currentTrans.branchName = e.branchName;
            _this.currentTrans.branchCode = e.branchCode;
        }

        // Luu thong tin da sua
        _this.save = function() {
            for (var i = 0; i < _this.listErrors.length; i++) {
                angular.extend(gTrans.batch.listErrors[i], _this.listErrors[i]);
            }
            var resquest = {
                sequenceId: 4,
                idtxn: gTrans.batch.transType.key,
                transType: gTrans.batch.transType.key,
                listTrans: gTrans.batch.respObj.respJson.listTrans,
                account: gTrans.batch.account.number
            };

            var responseSuccess = function(data) {
                var response = JSON.parse(data);
                if (response.respCode == "0") {
                    _this.listErrors = [];
                    for (var i = 0; i < response.respJsonObj.listTrans.length; i++) {
                        var trans = response.respJsonObj.listTrans[i];
                        if (trans.error)
                            _this.listErrors.push(trans);
                    }
                    $scope.$apply();

                    if (_this.listErrors.length == 0) {
                        gTrans.batch.respObj.respJson = response.respJsonObj;
                        navCachedPages["corp/transfer/batch/make/batch-transfer-review"] = null;
                        navController.popToView("corp/transfer/batch/make/batch-transfer-review", true);
                    }
                } else
                    showAlertText(response.respContent);
            };

            var argsArray = ["", resquest];
            var gprsCmd = new GprsCmdObj(CONSTANTS.get(
                    "CMD_CO_BATCH_TRANSFER_SALARY"), "", "", gUserInfo.lang, gUserInfo.sessionID,
                argsArray);
            data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp(data, true, 0, responseSuccess);
        };

        // Go back
        _this.goBack = function() {
            navCachedPages["corp/transfer/batch/make/batch-transfer-review"] = null;
            navController.popView(true);
        };

        // Khi NSD click chuyen tab
        _this.changeTab = function() {
            navController.initWithRootView("corp/transfer/batch/mng/batch-transfer-mng-scr", true, "xsl");
        };

        // Get message loi
        _this.getErrorMsg = function(errorCode) {
            return CONST_STR.get("TRANS_BATCH_ERR_" + errorCode);
        };
    }]);

    // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["batch-transfer-edit"]);
}
