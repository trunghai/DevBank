/**
 * Created by HaiDT1 on 7/27/2016.
 */




function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('cre_guarantee_review', function ($scope, requestMBServiceCorp) {
        $scope.infoTrans = gTrans.infoGuarantee;
        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);

        $scope.onBackClick = function () {
            navCachedPages["corp/credit/guarantee/create/cre_guarantee_checklist"] = null;
            navController.popView(true);
            return;
        }

        $scope.onCancelClick = function () {
            navCachedPages["corp/credit/guarantee/create/cre_guarantee_create"] = null;
            navController.initWithRootView("corp/credit/guarantee/create/cre_guarantee_create",true, 'html');
        }

        $scope.sendJSONRequest = function () {
            navCachedPages["corp/credit/guarantee/create/cre_guarantee_auth"] = null;
            navController.pushToView("corp/credit/guarantee/create/cre_guarantee_auth", true);
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
function modal() {
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var btn = document.getElementById("btnView");

    // // Get the <span> element that closes the modal
    //     var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // // When the user clicks on <span> (x), close the modal
    //     span.onclick = function() {
    //         modal.style.display = "none";
    //     }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}