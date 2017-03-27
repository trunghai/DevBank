/**
 * Created by JetBrains WebStorm.
 * User: NguyenTDK
 * Date: 14/11/15
 * Time: 13:30 
 * To change this template use File | Settings | File Templates.
 */
 if(!gIsLogin) {
	var tmpNodeBack = document.getElementById('bankinfo.btn.back');
	tmpNodeBack.style.display = 'block';
}

function getRealExchangeRate(){
	var argsArray = [];
	argsArray.push("1");
	argsArray.push(JSON.stringify({
		idtxn : "S01"
	}));
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_TYPE_QUERY_EXCHANGE_RATE"), "", "", gUserInfo.lang, "", argsArray);
	data = getDataFromGprsCmd(gprsCmd);
	
	// gọi service và xử lí logic
	requestMBServiceCorp(data, true, 0, function(data) {
		gprsResp = JSON.parse(data);
		
		if (gprsResp.respCode == RESP.get('COM_SUCCESS') 
				&& gprsResp.responseType== CONSTANTS.get('COM_TYPE_QUERY_EXCHANGE_RATE')) {
			if (gprsResp.respJsonObj.length > 0){
				genScreenExchangeRate(gprsResp.respJsonObj);
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

function genScreenExchangeRate(listExchangeRate){
	var htmlInfor = "<table width='98%' style='margin-top:0px' align='center' class='table-account'>";
	
	htmlInfor += '<tr class="trow-title"><th width="20%">' + CONST_STR.get('EXCHANGE_RATE_MA_NGOAITE')  + '</th> <th width="20%">' + CONST_STR.get('EXCHANGE_RATE_TEN_NGOAITE')  + '</th> <th width="20%">' + CONST_STR.get('EXCHANGE_RATE_MUA_TIENMAT') +'</th><th width="20%">' + CONST_STR.get('EXCHANGE_RATE_MUA_CHUYENKHOAN') + '</th><th  width="20%">' + CONST_STR.get('EXCHANGE_RATE_BAN') +'</th></tr>'
	for (var i = 0; i < listExchangeRate.length; i++){
		var arrStrTemp = listExchangeRate[i][Object.keys(listExchangeRate[i])].split('#');
		
		if (arrStrTemp[0] == 'XAU'){
			continue;	
		}

			htmlInfor = htmlInfor + 
			'<tr>' +
				'<td class = "tdselct td-head-color"><div class="mobile-mode"><span style="height:26px; line-height:26px;">' + CONST_STR.get('EXCHANGE_RATE_MA_NGOAITE') + '</span></div> <div class="td-date" style="text-align:left">' +  
				((arrStrTemp[1]== '' && arrStrTemp[6] == '') ? arrStrTemp[0] : ('<img class="desktopmode" src="'+ arrStrTemp[1] +'"/><img  class="mobilemode" src="' + arrStrTemp[6] + '"/>')) + '</div>' + '</td>' +
				'<td><div class="mobile-mode">' + CONST_STR.get('EXCHANGE_RATE_TEN_NGOAITE') + '</div> <div class="td-date">' + arrStrTemp[2] + '</td>' +
				'<td><div class="mobile-mode">' + CONST_STR.get('EXCHANGE_RATE_MUA_TIENMAT') + '</div><div class="td-date">' + formatNumberToCurrency(arrStrTemp[4]) + '</div></td>' +
				'<td><div class="mobile-mode">' + CONST_STR.get('EXCHANGE_RATE_MUA_CHUYENKHOAN') + '</div><div class="td-date">' + formatNumberToCurrency(arrStrTemp[5]) + '</div></td>' +								 
				'<td><div class="mobile-mode">' + CONST_STR.get('EXCHANGE_RATE_BAN') + '</div><div class="td-date">' + formatNumberToCurrency(arrStrTemp[3]) + '</div></td>' +
			'</tr>';
	}
	htmlInfor += '</table>';
	document.getElementById("id.exchange.detail").innerHTML = htmlInfor;
	if(!gIsLogin) {
		var tmpNodeBack = document.getElementById('bankinfo.btn.back');
		tmpNodeBack.style.display = 'block';
	}
	htmlInfor += "<tr><td id='bankinfo.btn.back'><div class='btnshadow btn-primary' onClick='navController.initWithRootView('menuxsl/menu-info-bank-scr', true, 'xsl')'></div></div></td></tr>"
	
}
function isMobile(){
	return navigator.userAgent.match(/Android|BB10|iPhone|iPod|IEMobile/i);
}
function goBack() {
	navController.popView(true);
}
getRealExchangeRate();
changeLanguageInView();