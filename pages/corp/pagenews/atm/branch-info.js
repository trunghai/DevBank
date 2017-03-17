var cityTPBArray;
var atmTPBankArrayResponse;

var bankTpbArray;
//var bankTpbResultArray;
var bankTpbResultArray = new Array();
var branchCityCode = "";

if(!gIsLogin) {
	var tmpNodeBack = document.getElementById('bankinfo.btn.back');
	tmpNodeBack.style.display = 'block';
}

// get bank list from MBCore
function initBankInfoTPBATM() {
	
	//test getCurrentLocation 21.008966#105.853764
	//gUserLocation.latitude = 21.008966;
	//gUserLocation.longtitude = 105.853764;
	//gUserLocationStatus = true;
	//test end;
	
	if(gUserInfo.lang == 'EN'){
		document.getElementById('id.city').value = "All";
		document.getElementById('id.area').value = "All";

	}else{

		document.getElementById('id.city').value = "Tất cả";
		document.getElementById('id.area').value = "Tất cả";

	}
	
	
	if(!(navCheckPageCachedStatus('bankinfo/branch-info'))) {
		getBankTpbList();
	}
	else {
		bankTpbResultArray = bankTpbArray;
		parserViewBankList();
		genBankListView();
		/*searchBankName();*/
	}
}

//get current location
if(Environment.isIOS() || Environment.isAndroid() || Environment.isWindows()) {
	if((gUserLocation == undefined) || (gUserLocation == null) || (gUserLocation.latitude.length <= 2)) {
		//alert('start get location');
		showLoadingMask(); //show waiting screen
		var optionsGeo = { maximumAge: 5000, timeout: 5000, enableHighAccuracy: true }; // also try with false.
		navigator.geolocation.getCurrentPosition(onPositionSuccess, onPositionError, optionsGeo); //using with PhoneGap
	}
	else {
		initBankInfoTPBATM();
	}
}
else {
	gUserLocation.latitude = 0;
	gUserLocation.longtitude = 0;
	gUserLocation.altitude = 0;
	initBankInfoTPBATM();
}

function onPositionSuccess(position) {
	hideLoadingMask(); //hide waiting screen
	gUserLocationStatus = true; // save status success get user location
	
	gUserLocation.latitude = position.coords.latitude;
	gUserLocation.longtitude = position.coords.longitude;
	gUserLocation.altitude = position.coords.altitude;
	logInfo('Get location success: #' + gUserLocation.latitude + '; #' + gUserLocation.longtitude + '; #' + gUserLocation.altitude);
	//alert('position success: ' + gUserLocation.latitude + '; ' + gUserLocation.longtitude + '; ' + gUserLocation.altitude);
	
	initBankInfoTPBATM();
}

function onPositionError(error) {
	hideLoadingMask(); //hide waiting screen
	
	//alert('position fail: #' + error.code + ' ' + error.message);
	logInfo('Error get location: #' + error.code + ' ' + error.message);
	
	gUserLocation.latitude = 0;
	gUserLocation.longtitude = 0;
	gUserLocation.altitude = 0;
	initBankInfoTPBATM();
}

function goBack() {
	navController.popView(true);
}

//Get provice list

function getCityTpbList() {
	var arrayArgs = new Array();
	arrayArgs.push("QUARTER");
	requestBacgroundMBService("CMD_LOOKUP_TPB_BANKINFO", arrayArgs, requestMBServiceCityListSuccess, requestMBServiceCityListFail);
}

//get city list
if(!cityTPBArray || cityTPBArray.length == 0) {
	getCityTpbList();
}

//event listener: http request success
function requestMBServiceCityListSuccess(e){
	gprsResp = parserJSON(e);
	//gRespObj = gprsResp; 
	setRespObjStore(gprsResp);
	
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_LOOKUP_TPB_BANKINFO")))) {
		cityTPBArray = gprsResp.arguments;
		
	}
};

//parser info
function requestMBServiceCityListFail() {
	logInfo("request city fail");
}

function showCitySelection() {
	var tmpArray1 = [];
	var tmpArray2 = [];
	var tmpCityResultArray = new Array ();
	for (var i =0; i< cityTPBArray.length; i++) {
		var tmpArrArgsCity = cityTPBArray[i].split("#");
		if(!tmpArrArgsCity[3] || tmpArrArgsCity[3].length == 0) {
			tmpCityResultArray.push(cityTPBArray[i]);
		}
	}
	for (var i=0; i<tmpCityResultArray.length; i++) {
			var tmpStr = tmpCityResultArray[i];
			var tmpArr = tmpStr.split('#');
		if(gUserInfo.lang == 'EN'){
		tmpArray1.push(tmpArr[2]);
		}
		else {
			tmpArray1.push(tmpArr[1]);
		}
		tmpArray2.push(tmpArr[0]);		
}
	
	
	document.addEventListener("evtSelectionDialog", handleSelectionCityList, false);
	document.addEventListener("evtSelectionDialogClose", handleSelectionCityListClose, false);
	showDialogList(CONST_STR.get('BANK_INFO_SELECTION_CITY'), tmpArray1, tmpArray2, false);
}
function showAreaSelection() {
	var tmpArray1 = [];
	var tmpArray2 = [];
	var tmpAreaResultArray = new Array ();
	for (var i =0; i< cityTPBArray.length; i++) {
		var tmpArrArgsCity = cityTPBArray[i].split("#");
		if(tmpArrArgsCity[3] && tmpArrArgsCity[3].length > 0) {
			tmpAreaResultArray.push(cityTPBArray[i]);
		}
	}
	

	for (var i=0; i<tmpAreaResultArray.length; i++) {
			var tmpStr = tmpAreaResultArray[i];
			var tmpArr = tmpStr.split('#');
		if(branchCityCode==tmpArr[3]) {
			if(gUserInfo.lang == 'EN'){
			tmpArray1.push(tmpArr[2]);
			}
			else {
				tmpArray1.push(tmpArr[1]);
			}
			tmpArray2.push(tmpArr[0]);	
			}
	}
	
	document.addEventListener("evtSelectionDialog", handleSelectionAreaList, false);
	document.addEventListener("evtSelectionDialogClose", handleSelectionAreaListClose, false);
	showDialogList(CONST_STR.get('BANK_INFO_SELECTION_AREA'), tmpArray1, tmpArray2, false);
}
function handleSelectionCityList(e) {
	if (currentPage == "bankinfo/branch-info") {
		handleSelectionCityListClose(e);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			var tagcity = document.getElementById("id.city");
			if (tagcity.nodeName == "INPUT") {
				tagcity.value = e.selectedValue1;
				parserViewBankList();
				branchCityCode = e.selectedValue2;
				for (var i=0; i<bankTpbResultArray.length; i++) {
					if (bankTpbResultArray[i].split("#")[0] != e.selectedValue2)
					{
						bankTpbResultArray.splice(i,1);
						i--;
					}
					//genBankListView();
				}
				if(gUserInfo.lang == 'EN'){
					document.getElementById('id.area').value = "All";
				}else{
					document.getElementById('id.area').value = "Tất cả";
				}
				 genBankListView();
			}
			else {
				tagcity.innerHTML = e.selectedValue1;
			}
		}
	}
}
function handleSelectionAreaList(e) {
	if (currentPage == "bankinfo/branch-info") {
		handleSelectionAreaListClose(e);
		
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			var tagarea = document.getElementById("id.area");
			if (tagarea.nodeName == "INPUT") {
				tagarea.value = e.selectedValue1;
				parserViewBankList();
				for (var i=0; i<bankTpbResultArray.length; i++) {
					if (bankTpbResultArray[i].split("#")[1] != e.selectedValue2)
					{
						bankTpbResultArray.splice(i,1);
						i--;
					}
					genBankListView();
				}
			}
			else {
				tagarea.innerHTML = e.selectedValue1;
			}
		}
	}
}
function handleSelectionCityListClose(e) {
	if (currentPage == "bankinfo/branch-info") {
		document.removeEventListener("evtSelectionDialogClose", handleSelectionCityListClose, false);
		document.removeEventListener("evtSelectionDialog", handleSelectionCityList, false);
	}
}
function handleSelectionAreaListClose(e) {
	if (currentPage == "bankinfo/branch-info") {
		document.removeEventListener("evtSelectionDialogClose", handleSelectionAreaListClose, false);
		document.removeEventListener("evtSelectionDialog", handleSelectionAreaList, false);
	}
}

/*function searchBankName() {
	searchWhenInputAtIDWithArrayString('input.id.inputvalue', atmTpbArray);
	var tmpNodeInputValue = document.getElementById('input.id.inputvalue');
	tmpNodeInputValue.addEventListener('evtSearchResultDone', handleSearchResultWhenInput, false);
	function handleSearchResultWhenInput(e) {
		logInfo(e.searchResult);
		atmTpbResultArray = e.searchResult;
		genBankListView();
	}
}*/


function getBankTpbList() {
	
	var nodeHistory = document.getElementById('divListGroup1');
	nodeHistory.innerHTML = '';
	/*var tmpInputValue = document.getElementById('input.id.inputvalue');
	tmpInputValue.value = '';*/
	
	var data = {};
	var arrayArgs = new Array();
	arrayArgs.push('BRANCH');
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_LOOKUP_TPB_BANKINFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	
	data = getDataFromGprsCmd(gprsCmd);
	
	requestMBService(data, true, 0, requestMBServiceHistorySuccess, requestMBServiceHistoryFail);
	//requestMBServiceHistorySuccess();
}

//event listener: http request success
function requestMBServiceHistorySuccess(e){
	gprsResp = parserJSON(e);
	setRespObjStore(gprsResp);
	
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_LOOKUP_TPB_BANKINFO")))) {
		atmTPBankArrayResponse = gprsResp.arguments;
		parserViewBankList();
		genBankListView();
	}
};

//parser info
function parserViewBankList() {
	bankTpbResultArray = new Array();
	if (atmTPBankArrayResponse && atmTPBankArrayResponse.length > 0) {
		for (var k = 0; k<atmTPBankArrayResponse.length; k++) {
			bankTpbResultArray.push(atmTPBankArrayResponse[k]);
		}
	}
}

//event listener: http request fail
function requestMBServiceHistoryFail(e){
	genBankListFail();
};

/*function updateValueInput(inNode) {
	if (inNode != undefined) {
		if(inNode.innerHTML.length > 0) {
			var tmpInput = document.getElementById("input.id.inputvalue");
			tmpInput.value = inNode.innerHTML;
		}
	}
}*/

function genBankListView() {
	var screenWidth = window.innerWidth || document.body.clientWidth;
	var textLength = Math.round(screenWidth*0.8);
	
	var nodeHistory = document.getElementById('divListGroup1');
	
	htmlReviewInfo = "<table width='100%' align='center'>";
	
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('BANK_INFO_BRANCH_TITLE') + 
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getAtmTpbList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getAtmTpbList()' id='input.btn.reloadHistory'></div>" + 
				"</div></td></tr>" + 
				 "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";
	
	var htmlReviewInfo = htmlReviewInfo + 
				"<tr><table width='100%' align='center' class='background-blacktrans'>"; // style='background-color: rgba(210, 225, 244, 0.4);'
	
	if((bankTpbResultArray == null) || (bankTpbResultArray == undefined)) {
		htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" + 
                        "<td colspan='2' class='td-textnobg'>" +
						CONST_STR.get('BANK_INFO_EMPTY_DATA') + 
						"</td></tr>";
	}
	else {
		for (var i=0; i<bankTpbResultArray.length; i++) {
			var tmpStr = bankTpbResultArray[i];
			var tmpArr = tmpStr.split('#');
			
			htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left'>" 
							+"<a class =\"ref-link\";><u>"+tmpArr[2] +"</a>"+ 
							"</td></tr>"; 
			
			htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" + 
								tmpArr[3] + 
							"</div></td></tr>";
			
		}
	}
	
	htmlReviewInfo = htmlReviewInfo + "</table></tr>";
	
	htmlReviewInfo = htmlReviewInfo + "</table></tr>";
	
	nodeHistory.innerHTML = htmlReviewInfo;
}

function genBankListFail() {
	var nodeHistory = document.getElementById('divListGroup1');
	
	var htmlReviewInfo = "<table width='100%' align='center'>";
		
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" + 
					CONST_STR.get('BANK_INFO_BRANCH_TITLE') + 
				"</h5></td>"+
				"<td><div class='div-btn-round-container'>" +
				/*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getAtmTpbList()' id='input.btn.reloadHistory' value='R'/>" + */
				"<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getAtmTpbList()' id='input.btn.reloadHistory'></div>" + 
				"</div></td></tr>" + 
				 "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";
	
	htmlReviewInfo = htmlReviewInfo + 
				"<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
	htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" + 
                        "<td colspan='2' class='td-textnobg'>" +
						CONST_STR.get('BANK_INFO_REQUEST_FAIL') + 
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
	gBankInfoATMSelected = bankTpbResultArray[inIdx]; //save bank info raw data
	navController.pushToView("bankinfo/bank-info-tpb-atm-map", true);
}

