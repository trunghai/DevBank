/**
 * Created by HaiDT1 on 8/1/2016.
 */

function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('cre_guarantee_result', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gTrans.infoGuarantee;
        $scope.result = gTrans.result;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);
        
        $scope.onMakeOrderTrans = function () {
            navCachedPages["corp/credit/guarantee/create/cre_guarantee_create"] = null;
            navController.initWithRootView("corp/credit/guarantee/create/cre_guarantee_create",true, 'html');
        }

        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "4";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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
    });

    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}