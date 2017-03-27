/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */

//var evtInputBank = document.createEvent('Event');
//evtInputBank.initEvent('evtInputBank', true, true);
var objJSON;
var bankArray;
var bankResultArray;

// get bank list from MBCore
/*if(!(navCheckPageCachedStatus('corp/transfer/trans-input-bank'))) {*/
	getBankList();/*
}
else {
	bankResultArray = bankArray;
	genBankListView();
	searchBankName();
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
		
		//fire event
		//evtInputBank.inputValue = tmpInput.value;
		//document.dispatchEvent(evtInputBank);
	}
	else {
		var tmpStr = CONST_STR.get("ERR_INPUT_FORMAT_ACC");
		showAlertText(tmpStr);
	}
}

function searchBankName() {
	var arrBank = new Array();
	if(objJSON.rows.length>0 ) {
		for(var i=0;i<objJSON.rows.length;i++){
			var strX =objJSON.rows[i].CODE + "#" + objJSON.rows[i].SHORT_NAME + "#" + objJSON.rows[i].NAME_VN
		+ "#" + objJSON.rows[i].NAME_EN ;
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


function getBankList() {
	
	var nodeHistory = document.getElementById('divListGroup');
	nodeHistory.innerHTML = '';
	var tmpInputValue = document.getElementById('input.id.inputvalue');
	tmpInputValue.value = '';
	
	var data = {};
	var arrayArgs = new Array();
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_LOOKUP_BANK"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	
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
	
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_LOOKUP_BANK")))) {
		parserViewBankList();
		genBankListView();	
		
		searchBankName();
	}
	else {
		genBankListFail();
	}
	/*logInfo('request bank list success');
	if ((e.type == "evtHttpSuccess") && (currentPage == "corp/transfer/trans-input-bank")) {
		document.removeEventListener("evtHttpSuccess", requestMBServiceHistorySuccess, false);
		//alert("Http request success!");
	}*/
};

//parser info
function parserViewBankList() {
	var tmpRespObj = getRespObjStore();
	bankArray = JSON.parse(tmpRespObj.respJson);
	bankResultArray = bankArray; //search result init with raw bank list
	
	logInfo('Array of banks: ' + bankArray);
}

//event listener: http request fail
function requestMBServiceHistoryFail(){
	genBankListFail();
	/*if ((e.type == "evtHttpFail") && (currentPage == "corp/transfer/trans-input-bank")) {
		document.removeEventListener("evtHttpFail", requestMBServiceFail, false);
		genBankListFail();
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

function genBankListView() {
	var screenWidth = window.innerWidth || document.body.clientWidth;
	var textLength = Math.round(screenWidth*0.8);
	
	var nodeHistory = document.getElementById('divListGroup');
	if((bankResultArray != null) || (bankResultArray != undefined)) {
		if((bankResultArray.rows != null) || (bankResultArray.rows != undefined)) {
			objJSON = bankResultArray;
		}else {
			objJSON.rows = bankResultArray;
		}
	}
	htmlReviewInfo = "<table width='100%' align='center'>";
		
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('TRANS_BANKS_LIST') + 
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getBankList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBankList()' id='input.btn.reloadHistory'></div>" + 
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
			
			htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left'>" + 
								"<a><u>"+ objJSON.rows[i].SHORT_NAME + "</u></a>"+ 
							"</td></tr>"; 
			
			if (gUserInfo.lang == 'EN') {
				htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
								objJSON.rows[i].NAME_EN +
							"</div></td></tr>";
			}
			else {
				htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" + 
								objJSON.rows[i].NAME_VN + 
							"</div></td></tr>";
			}
			
		}
	}
	
	htmlReviewInfo = htmlReviewInfo + "</table></tr>";
	
	htmlReviewInfo = htmlReviewInfo + "</table></tr>";
	
	nodeHistory.innerHTML = htmlReviewInfo;
}

function genBankListFail() {
	var nodeHistory = document.getElementById('divListGroup');
	
	var htmlReviewInfo = "<table width='100%' align='center'>";
		
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('TRANS_BANKS_LIST') + 
				"</h5></td>"+
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
	logInfo('Selected bank at index: ' + inIdx);
	gBankInfoSelected = objJSON.rows[inIdx].CODE + "#" + objJSON.rows[inIdx].SHORT_NAME + "#" + objJSON.rows[inIdx].NAME_VN
		+ "#" + objJSON.rows[inIdx].NAME_EN ; //save bank info raw data
	navController.pushToView("corp/transfer/trans-input-city", true);
}


function arrtoJson(arr){
		
	var pluginArrayArg = new Array();
	for(var i = 0;i<arr.length;i++){
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
	return(jsonArray);
}
