/**
 * Created by HungNV.
 * Date: 03/10/2015
 */

var objJSON;
var cityArray;
var cityResultArray;
var  dataOb = {
    "responseType": "1605",
    "respCode": "0",
    "respContent": "Giao dịch không thành công. Quý khách vui lòng kiểm tra và thử lại. Liên hệ 1900585885 để được hỗ trợ!",
    "respRaw": "",
    "arguments": [],
    "respJson": "{\"rows\":[{\"PROVINCE_CODE\":\"89\",\"PROVINCE_NAME_VN\":\"An Giang\",\"PROVINCE_NAME_EN\":\"An Giang\"},{\"PROVINCE_CODE\":\"95\",\"PROVINCE_NAME_VN\":\"Bạc Liêu\",\"PROVINCE_NAME_EN\":\"Bac Lieu\"},{\"PROVINCE_CODE\":\"74\",\"PROVINCE_NAME_VN\":\"Bình Dương\",\"PROVINCE_NAME_EN\":\"Binh Duong\"},{\"PROVINCE_CODE\":\"60\",\"PROVINCE_NAME_VN\":\"Bình Thuận\",\"PROVINCE_NAME_EN\":\"Binh Thuan\"},{\"PROVINCE_CODE\":\"96\",\"PROVINCE_NAME_VN\":\"Cà Mau\",\"PROVINCE_NAME_EN\":\"Ca Mau\"},{\"PROVINCE_CODE\":\"92\",\"PROVINCE_NAME_VN\":\"Cần Thơ\",\"PROVINCE_NAME_EN\":\"Can Tho\"},{\"PROVINCE_CODE\":\"48\",\"PROVINCE_NAME_VN\":\"Đà Nẵng\",\"PROVINCE_NAME_EN\":\"Da Nang\"},{\"PROVINCE_CODE\":\"66\",\"PROVINCE_NAME_VN\":\"Đắc Lắc\",\"PROVINCE_NAME_EN\":\"Dac Lac\"},{\"PROVINCE_CODE\":\"75\",\"PROVINCE_NAME_VN\":\"Đồng Nai\",\"PROVINCE_NAME_EN\":\"Dong Nai\"},{\"PROVINCE_CODE\":\"01\",\"PROVINCE_NAME_VN\":\"Hà Nội\",\"PROVINCE_NAME_EN\":\"Ha Noi\"},{\"PROVINCE_CODE\":\"31\",\"PROVINCE_NAME_VN\":\"Hải Phòng\",\"PROVINCE_NAME_EN\":\"Hai Phong\"},{\"PROVINCE_CODE\":\"10\",\"PROVINCE_NAME_VN\":\"Lào Cai\",\"PROVINCE_NAME_EN\":\"Lao Cai\"},{\"PROVINCE_CODE\":\"22\",\"PROVINCE_NAME_VN\":\"Quảng Ninh\",\"PROVINCE_NAME_EN\":\"Quang Ninh\"},{\"PROVINCE_CODE\":\"94\",\"PROVINCE_NAME_VN\":\"Sóc Trăng\",\"PROVINCE_NAME_EN\":\"Soc Trang\"},{\"PROVINCE_CODE\":\"79\",\"PROVINCE_NAME_VN\":\"TP Hồ Chí Minh\",\"PROVINCE_NAME_EN\":\"TP Ho Chi Minh\"},{\"PROVINCE_CODE\":\"46\",\"PROVINCE_NAME_VN\":\"Thừa Thiên Huế\",\"PROVINCE_NAME_EN\":\"Thua Thien Hue\"},{\"PROVINCE_CODE\":\"82\",\"PROVINCE_NAME_VN\":\"Tiền Giang\",\"PROVINCE_NAME_EN\":\"Tien Giang\"}]}",
    "respJsonObj": {}
};

getCityList();

function goBack() {
    navController.popView(true);
}

function searchCity() {
    var arrBank = new Array();
    if (objJSON.rows.length > 0) {
        for (var i = 0; i < objJSON.rows.length; i++) {
            var strX = objJSON.rows[i].PROVINCE_CODE + "#" + objJSON.rows[i].PROVINCE_NAME_VN + "#" + objJSON.rows[i].PROVINCE_NAME_EN;
            arrBank.push(strX);
        }
    }
    searchWhenInputAtIDWithArrayString('input.id.inputvalue', arrBank);
    var tmpNodeInputValue = document.getElementById('input.id.inputvalue');
    tmpNodeInputValue.addEventListener('evtSearchResultDone', handleSearchResultWhenInput, false);

    function handleSearchResultWhenInput(e) {
        logInfo(e.searchResult);
        cityResultArray = e.searchResult;
        cityResultArray = arrtoJson(cityResultArray);
        genCityListView();
    }

}

function getCityList() {

    var nodeHistory = document.getElementById('divListGroup');
    nodeHistory.innerHTML = '';
    var tmpInputValue = document.getElementById('input.id.inputvalue');
    tmpInputValue.value = '';

    var data = {};
    var tmpArr = gBankInfoSelected.split('#');
    var l_obj = new Object();
    l_obj.idtxn = "T03";
    l_obj.sequenceId = "2";
    l_obj.bankCode = tmpArr[0];
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
        parserViewCityList();
        genCityListView();
        searchCity();
    } else {
        genCityListFail();
    }
};

//parser info
function parserViewCityList() {
    var tmpRespObj = getRespObjStore();
    cityArray = JSON.parse(tmpRespObj.respJson);
    cityResultArray = cityArray; //search result init with raw bank list

    logInfo('Array of cities: ' + cityArray);
}

//event listener: http request fail
function requestMBServiceHistoryFail() {
    genCityListFail();
};

function genCityListView() {
    var screenWidth = window.innerWidth || document.body.clientWidth;
    var textLength = Math.round(screenWidth * 0.8);

    var nodeHistory = document.getElementById('divListGroup');

    htmlReviewInfo = "<table width='100%' align='center'>";
    if ((cityResultArray != null) || (cityResultArray != undefined)) {
        if ((cityResultArray.rows != null) || (cityResultArray.rows != undefined)) {
            objJSON = cityResultArray;
        } else {
            objJSON.rows = cityResultArray;
        }
    }
    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_CITY_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getCityList()' id='input.btn.reloadHistory'></div>" +
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
        for (var i = 0; i < objJSON.rows.length; i++) {
            if (gUserInfo.lang == 'EN') {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getCityAtIndex(" + i + ")'><td class='td-left-single'>" + "<a><u>" +
                    objJSON.rows[i].PROVINCE_NAME_EN + "</u></a>" +
                    "</td></tr>";
            } else {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getCityAtIndex(" + i + ")'><td class='td-left-single'>" +
                    "<a><u>" + objJSON.rows[i].PROVINCE_NAME_VN + "</u></a>" +
                    "</td></tr>";
            }

        }
    }

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

function genCityListFail() {
    var nodeHistory = document.getElementById('divListGroup');

    var htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_CITY_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getCityList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
    htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'><td colspan='2' class='td-left-single'>" +
        CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') +
        "</td></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

/*
Get bank at index
*/

function getCityAtIndex(inIdx) {
    logInfo('Selected city at index: ' + inIdx);
    gCityInfoSelected = objJSON.rows[inIdx].PROVINCE_CODE + "#" + objJSON.rows[inIdx].PROVINCE_NAME_VN + "#" + objJSON.rows[inIdx].PROVINCE_NAME_EN; //save city info raw data
    navController.pushToView("corp/transfer/domestic/trans-dti-list-branch", true);
}


function arrtoJson(arr) {

    var pluginArrayArg = new Array();
    for (var i = 0; i < arr.length; i++) {
        var tmpStr = arr[i];
        var tmpArr = tmpStr.split('#');
        var jsonArg = new Object();
        jsonArg.PROVINCE_CODE = tmpArr[0];
        jsonArg.PROVINCE_NAME_VN = tmpArr[1];
        jsonArg.PROVINCE_NAME_EN = tmpArr[2];
        pluginArrayArg.push(jsonArg);

    }

    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    return (jsonArray);
}
