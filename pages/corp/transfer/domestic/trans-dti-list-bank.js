/**
 * Update: HungNV
 * Date: 03/10/2015
 */
var objJSON = {};
var bankArray;
var bankResultArray = null;

getBankList();

function getBankList() {
    var nodeHistory = document.getElementById('divListGroup');
    nodeHistory.innerHTML = '';
    var tmpInputValue = document.getElementById('input.id.inputvalue');
    tmpInputValue.value = '';

    var data = {};
    var l_obj = new Object();
    l_obj.sequenceId = "1";
    l_obj.idtxn = "T03";
    var l_json = JSON.stringify(l_obj);
    var l_arrayArgs = new Array();

    l_arrayArgs.push("1");
    l_arrayArgs.push(l_json);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS"), "", "", gUserInfo.lang, gUserInfo.sessionID, l_arrayArgs);

    data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, requestMBServiceHistorySuccess, requestMBServiceHistoryFail);
}

function goBack() {
    navController.popView(true);
}

//event listener: http request success
function requestMBServiceHistorySuccess(e) {
    gprsResp = JSON.parse(e);
    setRespObjStore(gprsResp);
    objJSON = gprsResp.respJsonObj;

    if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS")))) {
        //bankResultArray = JSON.parse(getRespObjStore());
        genBankListView();
        searchBankName();
    } else {
        genBankListFail();
    }

};

//event listener: http request fail
function requestMBServiceHistoryFail() {
    logInfo("-> requestMBServiceHistoryFail \n");
    genBankListFail();
};


function searchBankName() {
    var arrBank = new Array();
    if (objJSON.length > 0) {
        for (var i = 0; i < objJSON.length; i++) {
            var strX = objJSON[i].CODE + "#" + objJSON[i].SHORT_NAME + "#" + objJSON[i].NAME_VN + "#" + objJSON[i].NAME_EN;
            arrBank.push(strX);
        }
    }
    searchWhenInputAtIDWithArrayString('input.id.inputvalue', arrBank);
    var tmpNodeInputValue = document.getElementById('input.id.inputvalue');
    tmpNodeInputValue.addEventListener('evtSearchResultDone', handleSearchResultWhenInput, false);

    function handleSearchResultWhenInput(e) {
        logInfo(e.searchResult);
        bankResultArray = e.searchResult;
        bankResultArray = arrtoJson(bankResultArray);
        genBankListView();
    }

}


function genBankListView() {
    logInfo("-> genBankListView \n");
    var screenWidth = window.innerWidth || document.body.clientWidth;
    var textLength = Math.round(screenWidth * 0.8);

    var nodeHistory = document.getElementById('divListGroup');
    if ((bankResultArray != null) || (bankResultArray != undefined)) {
      if ((bankResultArray.rows != null) || (bankResultArray.rows != undefined)) {
            objJSON = bankResultArray;
        } else {
            //objJSON = {};
            objJSON = bankResultArray;
        }
    }
    htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BANKS_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBankList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    var htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans'>";

    if ((objJSON == null) || (objJSON == undefined)) {
        htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" +
            "<td colspan='2' class='td-textnobg'>" +
            CONST_STR.get('ERR_GET_INPUT_HISTORY_NO_DATA') +
            "</td></tr>";
    } else {
        for (var i = 0; i < objJSON.length; i++) {

            htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left'>" +
                "<a><u>" + objJSON[i].SHORT_NAME + "</u></a>" +
                "</td></tr>";

            if (gUserInfo.lang == 'EN') {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    objJSON[i].NAME_EN +
                    "</div></td></tr>";
            } else {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    objJSON[i].NAME_VN +
                    "</div></td></tr>";
            }

        }
    }

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

function genBankListFail() {
    logInfo("-> genBankListFail \n");
    var nodeHistory = document.getElementById('divListGroup');

    var htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BANKS_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        /*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getBankList()' id='input.btn.reloadHistory' value='R'/>" + */
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBankList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
    htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" +
        "<td colspan='2' class='td-textnobg'>" +
        CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') +
        "</td></tr>";


    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

/*
Get bank at index
*/

function getBankAtIndex(inIdx) {
    logInfo("-> getBankAtIndex \n");
    logInfo('Selected bank at index: ' + inIdx);
    gBankInfoSelected = objJSON[inIdx].CODE + "#" + objJSON[inIdx].SHORT_NAME + "#" + objJSON[inIdx].NAME_VN + "#" + objJSON[inIdx].NAME_EN; //save bank info raw data
    navController.pushToView("corp/transfer/domestic/trans-dti-list-city", true);
}


function arrtoJson(arr) {

    var pluginArrayArg = new Array();
    for (var i = 0; i < arr.length; i++) {
        var tmpStr = arr[i];
        var tmpArr = tmpStr.split('#');
        var jsonArg = new Object();
        jsonArg.CODE = tmpArr[0];
        jsonArg.SHORT_NAME = tmpArr[1];
        jsonArg.NAME_VN = tmpArr[2];
        jsonArg.NAME_EN = tmpArr[3];
        pluginArrayArg.push(jsonArg);
    }

    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    return (jsonArray);
}
