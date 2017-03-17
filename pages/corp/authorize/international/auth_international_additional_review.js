/**
 * Created by HaiDT1 on 10/29/2016.
 */
gCorp.isBack = false;
function viewDidLoadSuccess() {
    initData();
}

function viewBackFromOther() {
    gCorp.isBack = true;
}

function initData() {
    angular.module('EbankApp').controller('auth_international_additional_review', function ($scope, requestMBServiceCorp) {
        $scope.inMoblie = (Environment.isMobile()) ? false : true;
        $scope.detailCheckList = gInternational.detail.checklistProfile;
        $scope.reason = gInternational.reason;
        $scope.authen = gInternational.authen;

        $scope.infoTrans = gInternational.detail;

        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};
        //noinspection JSAnnotator
        $scope.onContinuteClick = function () {

            gInternational.authen = true;
            navCachedPages["corp/authorize/international/auth_international_additional_authen"] = null;
            navController.pushToView("corp/authorize/international/auth_international_additional_authen", true, 'html');
        }

        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/international/auth_international_trans"] = null;
            navController.popView(true);
        }

        $scope.onDenyClick = function () {
            var reason = document.getElementById("id.reason-rej").value.trim();
            if (!reason) {
                showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
                return;
            }

            gInternational.authen = false;
            gInternational.reason = document.getElementById('id.reason-rej').value;
            navCachedPages['corp/authorize/international/auth_international_additional_authen'] = null;
            navController.pushToView("corp/authorize/international/auth_international_additional_authen", true,'html');
        }

        $scope.onViewPDF = function (e) {
            var jsonData = new Object();
            jsonData.sequence_id = "6";
            jsonData.idtxn = 'B65';
            jsonData.iduserreference = e;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, function (response) {
                if (response.respCode == '0'){
                    // var html = '<embed width="100%" height="640"'
                    //     + ' type="application/pdf"'
                    //     + ' src="'
                    //     + response.respJsonObj.url
                    //     + '"></embed>';
                    //
                    // document.getElementById('contentView').innerHTML = html;
                    // var modal = document.getElementById('myModal');
                    // modal.style.display = "block";
                    // window.onclick = function(event) {
                    //     if (event.target == modal) {
                    //         modal.style.display = "none";
                    //     }
                    // }
                    if (Environment.isMobile()){
                        openLinkInWindows(response.respJsonObj.url);
                    }else {
                        var widthScreen = (window.innerWidth-800)/2;
                        var heightScreen = (window.innerHeight-800)/2;

                        var string = "width=800,height=800,top=" + heightScreen + ",left=" + widthScreen;
                        window.open(response.respJsonObj.url, "", string);
                    }
                }else {
                    showAlertText(response.respContent);
                }
            });
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
        field.value = field.value.replace(/[\[\]\,!"#$%&*'\+\-:;<=>?\\`^~{|}]/g, '');
    }
}