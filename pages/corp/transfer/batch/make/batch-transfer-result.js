(function() {
    var app = angular.module("batch-transfer-result", []);

    app.controller("Main", ["$scope", function($scope) {
        var _this = this;

        _this.messageIconClass = gTrans.batch.messageIconClass;
        _this.message = gTrans.batch.message;
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

        // Convert sang kieu tien te
        _this.toCurrency = function(amount) {
            return formatNumberToCurrency(amount);
        };

        // Quay lai man hinh truoc, giu nguyen cac gia tri nhap
        _this.goBack = function() {
            gTrans.batch = null;
            navController.resetBranchView();
            return;
        }

        // Khi NSD click chuyen tab
        _this.changeTab = function() {
            navController.initWithRootView('corp/transfer/batch/mng/batch-transfer-mng-scr', true, 'xsl');
        }

    }]);

    // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["batch-transfer-result"]);

})();
