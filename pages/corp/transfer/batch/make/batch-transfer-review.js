(function() {
    var app = angular.module("batch-transfer-reivew", []);

    app.controller("Main", ["$scope", function($scope) {
        var _this = this;

        _this.transType = gTrans.batch.transType;
        _this.account = gTrans.batch.account;
        _this.data = gTrans.batch.respObj.respJson;
        _this.currentListTrans = [];
        _this.pageSize = 10;

        // Phan trang ket qua
        _this.setPagination = function(pageId) {
            var totalPage = Math.ceil(_this.data.listTrans.length / _this.pageSize);
            _this.currentListTrans = _this.data.listTrans.slice((pageId - 1) * _this.pageSize, pageId * _this.pageSize);
            var pagination = document.getElementById("acc-pagination");
            var paginationHTML = genPageIndicatorHtml(totalPage, pageId);
            paginationHTML = paginationHTML.replace(/selectedPageAtIndex/g, "gTrans.changePage");
            pagination.innerHTML = paginationHTML;
        };

        // Khi user chuyen trang
        gTrans.changePage = function(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
            _this.setPagination(idx);
            $scope.$apply();
            mainContentScroll.refresh();
        };

        _this.setPagination(1);

        // Kiem tra so du va han muc
        if (_this.data.balanceError == 1)
            showAlertText(CONST_STR.get("CORP_MSG_TRANS_BATCH_BALANCE_NOT_ENOUGH"));
        else if (_this.data.limitTimeError != 0) {
            var errorMessage = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), 
    							[formatNumberToCurrency(_this.data.limitTime)]);
            showAlertText(errorMessage);
        } else if (_this.data.limitDayError != 0) {        	
            var errorMessage = formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), 
					[formatNumberToCurrency(_this.data.limitDay)]);
            showAlertText(errorMessage);
        }

        // Get message loi
        _this.getErrorMsg = function(errorCode) {
            return CONST_STR.get("TRANS_BATCH_ERR_" + errorCode);
        };

        // Convert sang kieu tien te
        _this.toCurrency = function(amount) {
            return formatNumberToCurrency(amount) + " VND";
        };

        // Check xem co giao dich nao loi khong
        gTrans.batch.listErrors = [];
        for (var i = 0; i < _this.data.listTrans.length; i++) {
            var trans = _this.data.listTrans[i];
            if (trans.error)
                gTrans.batch.listErrors.push(trans);
        }
        if (gTrans.batch.listErrors.length > 0) {
            _this.showEditBtn = true;
            _this.buttonGroupClass = "button-group button-group-3";
        } else {
            _this.showEditBtn = false;
            _this.buttonGroupClass = "button-group button-group-2";
        }

        // Quay lai man hinh truoc, giu nguyen cac gia tri nhap
        _this.goBack = function() {
            navController.resetBranchView();
            return;
        }

        // Khi NSD click tiep tuc
        _this.continue = function() {
            navCachedPages["corp/transfer/batch/make/batch-transfer-authen"] = null;
            navController.pushToView("corp/transfer/batch/make/batch-transfer-authen", true);
        };

        // Khi NSD click chuyen tab
        _this.changeTab = function() {
            navController.pushToView('corp/transfer/batch/mng/batch-transfer-mng-scr', true, 'xsl');
        };

        // Chuyen sang man hinh edit
        _this.goToEditScreen = function() {
            navCachedPages["corp/transfer/batch/make/batch-transfer-edit"] = null;
            navController.pushToView("corp/transfer/batch/make/batch-transfer-edit", true);
        };

    }]);

    // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["batch-transfer-reivew"]);
})();
