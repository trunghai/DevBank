/**
 * Created by HungNV.
 * Update: HungNV
 * Date: 03/10/13
 */

var objJSON;
var branchArray;
var branchResultArray;
var dataOb = {
    "responseType": "1605",
    "respCode": "0",
    "respContent": "Giao dịch không thành công. Quý khách vui lòng kiểm tra và thử lại. Liên hệ 1900585885 để được hỗ trợ!",
    "respRaw": "",
    "arguments": [],
    "respJson": "{\"rows\":[{\"CITAD_CODE\":\"89308001\",\"BRACH_NAME_VN\":\"Ngân hàng Sài Gòn Công Thương CN An Giang\"}]}",
    "respJsonObj": {}
};

getBranchList();


function goBack() {
    navController.popView(true);
}


function searchBranch() {
    var arrBank = new Array();
    if (objJSON.rows.length > 0) {
        for (var i = 0; i < objJSON.rows.length; i++) {
            var strX = objJSON.rows[i].CITAD_CODE + "#" + objJSON.rows[i].BRACH_NAME_VN;
            arrBank.push(strX);
        }
    }
    searchWhenInputAtIDWithArrayString('input.id.inputvalue', arrBank);
    var tmpNodeInputValue = document.getElementById('input.id.inputvalue');
    tmpNodeInputValue.addEventListener('evtSearchResultDone', handleSearchResultWhenInput, false);

    function handleSearchResultWhenInput(e) {
        logInfo(e.searchResult);
        branchResultArray = e.searchResult;
        branchResultArray = arrtoJson(branchResultArray);
        genBranchListView();
    }

}

function getBranchList() {

    var nodeHistory = document.getElementById('divListGroup');
    nodeHistory.innerHTML = '';
    var tmpInputValue = document.getElementById('input.id.inputvalue');
    tmpInputValue.value = '';

    var data = {};
    var l_obj = new Object();
    l_obj.sequenceId = "3";
    l_obj.idtxn = "T03";
    l_obj.bankCode = gBankInfoSelected.split('#')[0];
    l_obj.cityCode = gCityInfoSelected.split('#')[0];
    var l_json = JSON.stringify(l_obj);
    var l_arrayArgs = new Array();
    l_arrayArgs.push("2");
    l_arrayArgs.push(l_json);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS"), "", "", gUserInfo.lang, gUserInfo.sessionID, l_arrayArgs);
    data = getDataFromGprsCmd(gprsCmd);

    // requestMBServiceCorp(data, true, 0, requestMBServiceHistorySuccess, requestMBServiceHistoryFail);
    requestMBServiceHistorySuccess(dataOb);
}

//event listener: http request success
function requestMBServiceHistorySuccess(e) {
    gprsResp = e;
    //gRespObj = gprsResp; 
    setRespObjStore(gprsResp);
    objJSON = JSON.parse(gprsResp.respJson);
    if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS")))) {
        // branchArray = objJSON;
        branchResultArray = objJSON;
        genBranchListView();
        searchBranch();
    } else {
        genBranchListFail();
    }
};

//event listener: http request fail
function requestMBServiceHistoryFail(e) {
    genBranchListFail();
};

function updateValueInput(inNode) {
    if (inNode != undefined) {
        if (inNode.innerHTML.length > 0) {
            var tmpInput = document.getElementById("input.id.inputvalue");
            tmpInput.value = inNode.innerHTML;
        }
    }
}

function genBranchListView() {
    var screenWidth = window.innerWidth || document.body.clientWidth;
    var textLength = Math.round(screenWidth * 0.8);

    var nodeHistory = document.getElementById('divListGroup');

    if ((branchResultArray != null) || (branchResultArray != undefined)) {
        if ((branchResultArray.rows != null) || (branchResultArray.rows != undefined)) {
            objJSON = branchResultArray;
        } else if ((branchResultArray != null) || (branchResultArray != undefined)) {
            objJSON.rows = branchResultArray;
        }
    }

    htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BRANCH_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBranchList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    var htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans'>"; // style='background-color: rgba(210, 225, 244, 0.4);'

    if ((objJSON == null) || (objJSON == undefined)) {
        htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" +
            "<td colspan='2' class='td-textnobg'>" +
            CONST_STR.get('ERR_GET_INPUT_HISTORY_NO_DATA') +
            "</td></tr>";
    } else {
        for (var i = 0; i < objJSON.rows.length; i++) {
            htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBranchAtIndex(" + i + ")'><td class='td-left-single'>" + "<u><a>" +
                objJSON.rows[i].BRACH_NAME_VN + "</u></a>" +
                "</td></tr>";
        }
    }

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

function genBranchListFail() {
    var nodeHistory = document.getElementById('divListGroup');

    var htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BRANCH_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBranchList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
    htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'><td colspan='2' class='td-left'>" +
        CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') +
        "</td></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

/*
Get bank at index
*/
var evtSelectedBranch = document.createEvent('Event');
evtSelectedBranch.initEvent('evtSelectedBranch', true, true);

function getBranchAtIndex(inIdx) {
    gBranchInfoSelected = objJSON.rows[inIdx].CITAD_CODE + "#" + objJSON.rows[inIdx].BRACH_NAME_VN;

    evtSelectedBranch.bankCode = gBankInfoSelected.split('#')[0];
    evtSelectedBranch.bankName = gBankInfoSelected.split('#')[1];
    evtSelectedBranch.bankCityCode = gCityInfoSelected.split('#')[0];
    evtSelectedBranch.branchCode = objJSON.rows[inIdx].CITAD_CODE;
    evtSelectedBranch.branchName = objJSON.rows[inIdx].BRACH_NAME_VN;
    navController.popToView(gTrans.redirect, true);
    document.dispatchEvent(evtSelectedBranch);
}


function arrtoJson(arr) {

    var pluginArrayArg = new Array();
    for (var i = 0; i < arr.length; i++) {
        var tmpStr = arr[i];
        var tmpArr = tmpStr.split('#');
        var jsonArg = new Object();
        jsonArg.CITAD_CODE = tmpArr[0];
        jsonArg.BRACH_NAME_VN = tmpArr[1];
        pluginArrayArg.push(jsonArg);

    }

    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    return (jsonArray);
}
