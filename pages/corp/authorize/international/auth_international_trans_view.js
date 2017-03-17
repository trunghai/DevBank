/**
 * Created by HaiDT1 on 8/31/2016.
 */
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth_international_trans_view', function ($scope, requestMBServiceCorp) {
        $scope.currentTrans = gInternational.listSelectedTrans;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.reason = gInternational.reason;
        $scope.authen = gInternational.authen;
        //noinspection JSAnnotator
        $scope.onContinuteClick = function () {
            navCachedPages["corp/authorize/international/auth_international_trans_view_authen"] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_view_authen", true, 'html');
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}