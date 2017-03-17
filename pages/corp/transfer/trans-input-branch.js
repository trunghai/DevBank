/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */

var objJSON;
var branchArray;
var branchResultArray;

// get bank list from MBCore
//if(!(navCheckPageCachedStatus('corp/transfer/trans-input-branch'))) {
	getBranchList();
/*}
else {
	branchResultArray = branchArray;
	genBranchListView();
	searchBranch();
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

function searchBranch() {
	var arrBank = new Array();
	if(objJSON.rows.length>0 ) {
		for(var i=0;i<objJSON.rows.length;i++){
			var strX =objJSON.rows[i].CITAD_CODE + "#" + objJSON.rows[i].BRACH_NAME_VN;
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
	var arrayArgs = new Array();
	var tmpArr = gCityInfoSelected.split('#'); 
	arrayArgs.push(tmpArr[0]); //city code
	tmpArr = gBankInfoSelected.split('#'); 
	arrayArgs.push(tmpArr[0]); //bank code
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_LOOKUP_BRANCH"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	
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
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_LOOKUP_BRANCH")))) {
		parserViewBranchList();
		genBranchListView();	
		
		searchBranch();
	}
	else {
		genBranchListFail();
	}
	/*logInfo('request bank list success');
	if ((e.type == "evtHttpSuccess") && (currentPage == "transfer/trans-input-branch")) {
		document.removeEventListener("evtHttpSuccess", requestMBServiceHistorySuccess, false);
		//alert("Http request success!");
	}*/
};

//parser info
function parserViewBranchList() {
	var tmpRespObj = getRespObjStore();
	branchArray = tmpRespObj.arguments;
	branchResultArray = branchArray; //search result init with raw bank list
	
	logInfo('Array of branches: ' + branchArray);
}

//event listener: http request fail
function requestMBServiceHistoryFail(e){
	genBranchListFail();
	/*if ((e.type == "evtHttpFail") && (currentPage == "transfer/trans-input-branch")) {
		document.removeEventListener("evtHttpFail", requestMBServiceFail, false);
		genBranchListFail();
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

function genBranchListView() {
	var screenWidth = window.innerWidth || document.body.clientWidth;
	var textLength = Math.round(screenWidth*0.8);
	
	var nodeHistory = document.getElementById('divListGroup');
	
	if((branchResultArray != null) || (branchResultArray != undefined)){
		if((branchResultArray.rows != null) || (branchResultArray.rows != undefined)) {
			objJSON = branchResultArray;
		}else if((branchResultArray != null) || (branchResultArray != undefined)) {
			objJSON.rows = branchResultArray;
		}
	}
	
	htmlReviewInfo = "<table width='100%' align='center'>";
		
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('TRANS_BRANCH_LIST') + 
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getBranchList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBranchList()' id='input.btn.reloadHistory'></div>" + 
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
			/*var tmpStr = branchResultArray[i];
			var tmpArr = tmpStr.split('#');*/
			htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBranchAtIndex(" + i + ")'><td class='td-left-single'>" + "<u><a>"+
								objJSON.rows[i].BRACH_NAME_VN + "</u></a>"+
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
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getBranchList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBranchList()' id='input.btn.reloadHistory'></div>" + 
				"</div></td></tr>" + 
				 "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";
	
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
	/*htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" + 
                        "<td colspan='2' class='td-textnobg'>" +
						CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') + 
						"</td></tr>";*/
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
	logInfo('Selected branch at index: ' + inIdx);
	gBranchInfoSelected = objJSON.rows[inIdx].CITAD_CODE + "#" + objJSON.rows[inIdx].BRACH_NAME_VN; //save bank info raw data
	evtSelectedBranch.bankInfo = gBankInfoSelected;
	evtSelectedBranch.bankCityInfo = gCityInfoSelected;
	evtSelectedBranch.bankBranchInfo = gBranchInfoSelected;
	navController.popToView('corp/transfer/domestic/trans-inter-create-scr', true);
	document.dispatchEvent(evtSelectedBranch);
	
}


function arrtoJson(arr){
		
	var pluginArrayArg = new Array();
	for(var i = 0;i<arr.length;i++){
		var tmpStr = arr[i];
		var tmpArr = tmpStr.split('#');
		var jsonArg = new Object();
		jsonArg.CITAD_CODE = tmpArr[0];
		jsonArg.BRACH_NAME_VN = tmpArr[1];
		pluginArrayArg.push(jsonArg);
		
	}
	
	var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));	
	return(jsonArray);
}