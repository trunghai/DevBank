/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */

var objJSON;
var cityArray;
var cityResultArray;

// get bank list from MBCore
/*if(!(navCheckPageCachedStatus('corp/transfer/trans-input-city'))) {*/
	getCityList();
/*}
else {
	cityResultArray = cityArray;
	genCityListView();
	searchCity();
}*/

function goBack() {
	navController.popView(true);
}

function goBackWithInput() {
	var tmpInput = document.getElementById("input.id.inputvalue");
	var tmpStr = tmpInput.value;
	if (tmpStr.length > 0) {
		gDestinationInput = tmpInput.value;
		navController.popView(true);
		
	}
	else {
		var tmpStr = CONST_STR.get("ERR_INPUT_FORMAT_ACC");
		showAlertText(tmpStr);
	}
}

function searchCity() {
	var arrBank = new Array();
	if(objJSON.rows.length>0 ) {
		for(var i=0;i<objJSON.rows.length;i++){
			var strX =objJSON.rows[i].PROVINCE_CODE + "#" + objJSON.rows[i].PROVINCE_NAME_VN 
		+ "#" + objJSON.rows[i].PROVINCE_NAME_EN;
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
	var arrayArgs = new Array();
	var tmpArr = gBankInfoSelected.split('#');
	arrayArgs.push(tmpArr[0]); //bank code
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_LOOKUP_CITY"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	
	//document.addEventListener("evtHttpSuccess", requestMBServiceHistorySuccess, false);
	//document.addEventListener("evtHttpFail", requestMBServiceHistoryFail, false);
	data = getDataFromGprsCmd(gprsCmd);
	
	requestMBServiceCorp(data, true, 0, requestMBServiceHistorySuccess, requestMBServiceHistoryFail);
}

//event listener: http request success
function requestMBServiceHistorySuccess(e){
	gprsResp = parserJSON(e);
	//gRespObj = gprsResp; 
	setRespObjStore(gprsResp);
	objJSON = JSON.parse(gprsResp.respJson);
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_LOOKUP_CITY")))) {
		parserViewCityList();
		genCityListView();	
		
		searchCity();
	}
	else {
		genCityListFail();
	}
	/*logInfo('request bank list success');
	if ((e.type == "evtHttpSuccess") && (currentPage == "transfer/trans-input-city")) {
		document.removeEventListener("evtHttpSuccess", requestMBServiceHistorySuccess, false);
		//alert("Http request success!");
	}*/
};

//parser info
function parserViewCityList() {
	var tmpRespObj = getRespObjStore();
	cityArray = JSON.parse(tmpRespObj.respJson);
	cityResultArray = cityArray; //search result init with raw bank list
	
	logInfo('Array of cities: ' + cityArray);
}

//event listener: http request fail
function requestMBServiceHistoryFail(){
	genCityListFail();
	/*if ((e.type == "evtHttpFail") && (currentPage == "transfer/trans-input-city")) {
		document.removeEventListener("evtHttpFail", requestMBServiceFail, false);
		genCityListFail();
	}*/
};

function updateValueInput(inNode) {
	if (inNode != undefined) {
		if(inNode.innerHTML.length > 0) {
			var tmpInput = document.getElementById("input.id.inputvalue");
			tmpInput.value = inNode.innerHTML;
		}
	}
}

function genCityListView() {
	var screenWidth = window.innerWidth || document.body.clientWidth;
	var textLength = Math.round(screenWidth*0.8);
	
	var nodeHistory = document.getElementById('divListGroup');
	
	htmlReviewInfo = "<table width='100%' align='center'>";
	if((cityResultArray != null) || (cityResultArray != undefined)){
		if((cityResultArray.rows != null) || (cityResultArray.rows != undefined)) {
			objJSON = cityResultArray;
		}else  {
			objJSON.rows = cityResultArray;
		}
	}
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('TRANS_CITY_LIST') + 
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getCityList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getCityList()' id='input.btn.reloadHistory'></div>" + 
				"</div></td></tr>" + 
				 "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";
	
	var htmlReviewInfo = htmlReviewInfo + 
				"<tr><table width='100%' align='center' class='background-blacktrans'>"; // style='background-color: rgba(210, 225, 244, 0.4);'
	
	if((objJSON == null) || (objJSON == undefined)) {
		htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" + 
                        "<td colspan='2' class='td-textnobg'>" +
						CONST_STR.get('ERR_GET_INPUT_HISTORY_NO_DATA') + 
						"</td></tr>";
	}
	else {
		for (var i=0; i<objJSON.rows.length; i++) {
			/*var tmpStr = cityResultArray[i];
			var tmpArr = tmpStr.split('#');*/
			if (gUserInfo.lang == 'EN') {
				htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getCityAtIndex(" + i + ")'><td class='td-left-single'>" + "<a><u>"+
								objJSON.rows[i].PROVINCE_NAME_EN + "</u></a>"+
							"</td></tr>"; 
			}
			else {
				htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getCityAtIndex(" + i + ")'><td class='td-left-single'>" + 
								"<a><u>"+objJSON.rows[i].PROVINCE_NAME_VN + "</u></a>"+ 
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
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getCityList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getCityList()' id='input.btn.reloadHistory'></div>" + 
				"</div></td></tr>" + 
				 "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";
	
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
	/*htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" + 
                        "<td colspan='2' class='td-textnobg'>" +
						CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') + 
						"</td></tr>";*/
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
	gCityInfoSelected = objJSON.rows[inIdx].PROVINCE_CODE + "#" + objJSON.rows[inIdx].PROVINCE_NAME_VN 
		+ "#" + objJSON.rows[inIdx].PROVINCE_NAME_EN; //save city info raw data
	navController.pushToView("corp/transfer/trans-input-branch", true);
}


function arrtoJson(arr){
		
	var pluginArrayArg = new Array();
	for(var i = 0;i<arr.length;i++){
		var tmpStr = arr[i];
		var tmpArr = tmpStr.split('#');
		var jsonArg = new Object();
		jsonArg.PROVINCE_CODE = tmpArr[0];
		jsonArg.PROVINCE_NAME_VN = tmpArr[1];
		jsonArg.PROVINCE_NAME_EN = tmpArr[2];
		pluginArrayArg.push(jsonArg);
		
	}
	
	var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));	
	return(jsonArray);
}

