/**
 * Created by HaiDT1 on 8/2/2016.
 */
gCorp.isBack = false;


function viewDidLoadSuccess() {
    initData();

}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module("EbankApp").controller('auth-guarantee-detail', function ($scope, requestMBServiceCorp) {
        $scope.detailCommon = gTrans.common;
        $scope.detailCheckList = gTrans.checklistProfile;
        $scope.detailCommon.sendMethod ='';
        if (typeof gTrans.common.SENDMETHOD != "undefined" && gTrans.common.SENDMETHOD != null) {
            $scope.detailCommon.sendMethod = CONST_STR.get("COM_NOTIFY_" + gTrans.common.SENDMETHOD);
        }

        refeshContentScroll();
        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee"] = null;
            navController.popView(true);
        }
        
        $scope.onRejectClick = function () {
            var reason = document.getElementById("id.reason-rej").value;
            if (!reason) {
                showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
                return;
            }
            
            gTrans.common.reason = reason;
            gTrans.common.authen = false;
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-detail-authen"] = null;
            navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-detail-authen", true);
        }
        
        $scope.onContinuteClick = function () {
            gTrans.common.authen = true;
            navCachedPages["corp/authorize/credit/guarantee/auth-guarantee-detail-authen"] = null;
            navController.pushToView("corp/authorize/credit/guarantee/auth-guarantee-detail-authen", true);
        }

        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "6";
            jsonData.idtxn = gTrans.idtxn;
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_GUARANTEE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
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
    angular.bootstrap(document.getElementById('mainViewContent'), ["EbankApp"]);
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