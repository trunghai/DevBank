/**
 * Created by NguyenTDK 
 * Date: 14/11/2015 Time: 5:35 PM 
 * To change this template
 * use File | Settings | File Templates.
 */
/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('interest-rate init');
}

/*** VIEW BACK FROM OTHER ***/
function viewBackFromOther() {
	logInfo('Back interest-rate');
}

/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('interest-rate load success');
	
	document.getElementById("esavingType").value = (gUserInfo.lang == 'VN') ? CONST_KEY_ESAVING_CHOOSE_RATE_NAME[0] : CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN[0];
	document.getElementById("esavingTypeValue").value = CONST_KEY__ESAVING_CHOOSE_RATE_ID[0];
	
	// call service
	callService();
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('interest-rate will unload');
}

function showChooseSavingType() {

	var tmpArray1 = (gUserInfo.lang == 'VN') ? CONST_KEY_ESAVING_CHOOSE_RATE_NAME : CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN;
	var tmpArray2 = CONST_KEY__ESAVING_CHOOSE_RATE_ID;
	document.addEventListener("evtSelectionDialog", showInputSavingTypeOpen, false);
	document.addEventListener("evtSelectionDialogClose", showInputSavingTypeClose, false);
	showDialogList(CONST_STR.get('ESAVING_BGN_CHOICE'), tmpArray1, tmpArray2, false);
}

function showInputSavingTypeOpen(e) {
	if (currentPage == "corp/pagenews/rate/interest-rate") {
		document.removeEventListener("evtSelectionDialog", showInputSavingTypeOpen, false);
		if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
			document.getElementById('esavingType').value = e.selectedValue1;
		}
		
		if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
			document.getElementById("esavingTypeValue").value = e.selectedValue2;
		}
	}
	
	// call service
	callService();
}

function showInputSavingTypeClose() {
	if (currentPage == "corp/pagenews/rate/interest-rate") {
		document.removeEventListener("evtSelectionDialog", showInputSavingTypeOpen, false);
		document.removeEventListener("evtSelectionDialogClose", showInputSavingTypeClose, false);
	}
}

function callService(){
	var argsArray = [];
	argsArray.push("1");
	argsArray.push(JSON.stringify({
		idtxn : "S01",
		type : document.getElementById("esavingTypeValue").value
	}));
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_TYPE_QUERY_INTEREST_RATE"), "", "", gUserInfo.lang, "", argsArray);
	data = getDataFromGprsCmd(gprsCmd);
	
	// gọi service và xử lí logic
	requestMBServiceCorp(data, true, 0, function(data) {
		gprsResp = JSON.parse(data);
		
		if (gprsResp.respCode == RESP.get('COM_SUCCESS') 
				&& gprsResp.responseType== CONSTANTS.get('COM_TYPE_QUERY_INTEREST_RATE')) {
			if (gprsResp.respJsonObj.length > 0){
				var typeGen = document.getElementById("esavingTypeValue").value;
				if(typeGen == "EAE"){
					genScreenInterestRate_EAE(gprsResp.respJsonObj);
				}else if(typeGen == "ESV"){
					genScreenInterestRate_ESV(gprsResp.respJsonObj);
				}else if(typeGen == "EPE"){
					genScreenInterestRate_EPE(gprsResp.respJsonObj);
				}
			}
		}else{
			if(gprsResp.respCode == '1019'){
				showAlertText(gprsResp.respContent);
			}else{
				showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
			}
			navController.initWithRootView('corp/pagenews/rate/rate-interest-detail', true, 'xsl');
		}
	}, function(){
		navController.initWithRootView('corp/pagenews/rate/rate-interest-detail', true, 'xsl');
	});
}

function genScreenInterestRate_EAE(listInterestRate) {
	var htmlInfor = "<table style='width: 98%' align = 'center' class='table-account'>";
	htmlInfor += '<tr><td colspan="9" style = "border:none;" align="right">' + CONST_STR.get('INTEREST_RATE_UNIT') + '</td></tr>';
	htmlInfor += '<tr class="trow-title"><th width="13%">'
			+ CONST_STR.get('INTEREST_RATE_KYHAN') + '</th> <th  width="11%">'
			+ CONST_STR.get('INTEREST_RATE_VND') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_USD') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_EUR') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_SGD') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_AUD') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_GBP') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_CAD') + '</th><th width="11%" >'
			+ CONST_STR.get('INTEREST_RATE_JPY') + '</th></tr>';
	for (var i = 0; i < listInterestRate.length; i++) {
		var arrStrTemp = listInterestRate[i][Object.keys(listInterestRate[i])].split('#');
		htmlInfor = htmlInfor + '<tr>' + '<td class="tdselct td-head-color">'
				+ '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_KYHAN')
				+ '</div><div class="td-date">' + arrStrTemp[0] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_VND')
				+ '</div><div class="td-date">' + arrStrTemp[1] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_USD')
				+ '</div><div class="td-date">' + arrStrTemp[2] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_EUR')
				+ '</div><div class="td-date">' + arrStrTemp[3] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_SGD')
				+ '</div><div class="td-date">' + arrStrTemp[4] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_AUD')
				+ '</div><div class="td-date">' + arrStrTemp[5] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_GBP')
				+ '</div><div class="td-date">' + arrStrTemp[6] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_CAD')
				+ '</div><div class="td-date">' + arrStrTemp[7] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_JPY')
				+ '</div><div class="td-date">' + arrStrTemp[8] + '</div></td>'
				+ '</tr>';
	}
	htmlInfor += '</table>';
	document.getElementById("id.saving.detail").innerHTML = htmlInfor;
	if (!gIsLogin) {
		var tmpNodeBack = document.getElementById('bankinfo.btn.back');
		tmpNodeBack.style.display = 'block';
	}
}

function genScreenInterestRate_ESV(listInterestRate) {
	var htmlInfor = "<table style='width: 98%' align = 'center' class='table-account'>";
	htmlInfor += '<tr><td colspan="2" style = "border:none;" align="right">' + CONST_STR.get('INTEREST_RATE_UNIT') + '</td></tr>';
	htmlInfor += '<tr class="trow-title"><th width="50%">' + CONST_STR.get('INTEREST_RATE_TERM') + '</th> <th  width="50%">' + CONST_STR.get('INTEREST_RATE_LSUAT') + '</th></tr>';
	for (var i = 0; i < listInterestRate.length; i++)
	{
		var arrStrTemp = listInterestRate[i][Object.keys(listInterestRate[i])].split('#');
		htmlInfor = htmlInfor + 
			'<tr>' +
				'<td class="tdselct td-head-color">' + '<div class="mobile-mode">' + CONST_STR.get('INTEREST_RATE_TERM') + '</div><div class="td-date">' +arrStrTemp[0] + '</div></td>' +
				'<td>' + '<div class="mobile-mode">' + CONST_STR.get('INTEREST_RATE_LSUAT') + '</div><div class="td-date">' +arrStrTemp[1] + '</div></td>' 
			+ '</tr>';
	}
	htmlInfor += '</table>';
	document.getElementById("id.saving.detail").innerHTML = htmlInfor;
	if(!gIsLogin) {
		var tmpNodeBack = document.getElementById('bankinfo.btn.back');
		tmpNodeBack.style.display = 'block';
	}
	applyDynamicPageStyleSheet(true);
}

function genScreenInterestRate_EPE(listInterestRate) {

	var htmlInfor = "<table style='width: 98%' align = 'center' class='table-account'>";
	htmlInfor += '<tr><td colspan="3" style = "border:none;" align="right">' + CONST_STR.get('INTEREST_RATE_UNIT') + '</td></tr>';
	htmlInfor += '<tr class="trow-title"><th width="50%">'
				+ CONST_STR.get('INTEREST_RATE_KYHAN') + '</th> <th  width="25%">'
				+ CONST_STR.get('INTEREST_RATE_THANG') + '</th><th width="25%" >'
				+ CONST_STR.get('INTEREST_RATE_QUY') + '</th></tr>';
	for (var i = 0; i < listInterestRate.length; i++) {
		var arrStrTemp = listInterestRate[i][Object.keys(listInterestRate[i])].split('#');
		htmlInfor = htmlInfor + '<tr>' + '<td class="tdselct td-head-color">'
				+ '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_KYHAN')
				+ '</div><div class="td-date">' + arrStrTemp[0] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_THANG')
				+ '</div><div class="td-date">' + arrStrTemp[1] + '</div></td>'
				+ '<td>' + '<div class="mobile-mode">'
				+ CONST_STR.get('INTEREST_RATE_QUY')
				+ '</div><div class="td-date">' + arrStrTemp[2] + '</div></td>'
				+ '</tr>';
	}
	htmlInfor += '</table>';
	document.getElementById("id.saving.detail").innerHTML = htmlInfor;
	if (!gIsLogin) {
		var tmpNodeBack = document.getElementById('bankinfo.btn.back');
		tmpNodeBack.style.display = 'block';
	}
}


function goBack() {
	navController.popView(true);
}
getRealInterestRate();