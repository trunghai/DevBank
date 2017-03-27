/**
 * Created by HaiDT1 on 8/4/2016.
 */
function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('auth-guarantee-view', function ($scope, requestMBServiceCorp) {
        $scope.currentTrans = gTrans.listSelectedTrans;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.reason = gTrans.reason;
        $scope.authen = gTrans.authen;
        //noinspection JSAnnotator
        $scope.onContinuteClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-authen"] = null;
            navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-authen", true);
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}