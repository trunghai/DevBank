/**
 * Created by TuanVM.
 * User: 
 * Date: 09/17/14
 * Time: 5:35 PM
 */

/*** HEADER ***/
var mMenuList = new Array();

/*** INIT VIEW ***/
function loadInitXML() {
	return '';
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('homepage-vn will unload');
}

/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	document.getElementById("account_name").innerHTML = gUserInfo.accountInfo.customerName;
	document.getElementById("company_name").innerHTML = gUserInfo.accountInfo.companyName;
	document.getElementById("last_login").innerHTML = gUserInfo.accountInfo.lastLogin;
	document.getElementById("staff_position").innerHTML = gUserInfo.accountInfo.position + ": ";
    setTitleNavgationBar('eBank');
			
	getCustomerInfo();
	
	// document.getElementById("footerDesktop").innerHTML = "© All rights reserved.";
	// document.getElementById("footerMobile").innerHTML = "© All rights reserved.";
	
	for (var i=0; i<gMenuUserOrder.length; i++) {
		for (var j=0; j<gMenuList.length; j++) {
			var tmpMenuObj = gMenuList[j];
			if(gMenuUserOrder[i].length > 0 && gMenuUserOrder[i] == tmpMenuObj.menuID && tmpMenuObj.menuID != 'mHomePage') {
				gMenuList[j].hiddenStatus = 'N';
				mMenuList.push(gMenuList[j]);
				break;
			}
		}
	}
	var tmpBodyHome = document.createElement('tbody');
	var tmpRowIcon;
	var tmpRowLabel;
	mMenuList = mMenuList.slice(1)
	for (var i=0; i<mMenuList.length; i++) {
		var tmpMenuObj = mMenuList[i];
		// check de xuong dong cho icon
		if(i%3 == 0) {
			tmpRowIcon = document.createElement('tr');
			tmpRowLabel = document.createElement('tr');
			tmpBodyHome.appendChild(tmpRowIcon);
			tmpBodyHome.appendChild(tmpRowLabel);
		}
		
		var tmpCellIcon = document.createElement('td');
		tmpCellIcon.style.width = '33%';
		if(tmpMenuObj.onClick.indexOf("initWithRootView") != -1){
			tmpCellIcon.innerHTML = "<div class='icon_div' onclick=\"" + tmpMenuObj.onClick + "\"> <em class='" + tmpMenuObj.iconCode + " icon_font'></em> </div>";
		}else{
			tmpCellIcon.innerHTML = "<div class='icon_div' onclick=\"gotoMenuList('" + tmpMenuObj.menuID + "');\"> <em class='" + tmpMenuObj.iconCode + " icon_font'></em> </div>";
		}
		tmpRowIcon.appendChild(tmpCellIcon);
		
		var tmpCellLabel = document.createElement('td');
		tmpCellLabel.style.verticalAlign = 'middle';
		tmpCellLabel.innerHTML = "<a style='text-decoration:none; color:#FFF; cursor:pointer' onclick=\"" + tmpMenuObj.onClick + "\">" + 
			  "<div class='icon_div_title'> <span class='icon_title'>" + CONST_STR.get(tmpMenuObj.keyLang) + "</span> </div>" + 
			  "</a>";
		tmpRowLabel.appendChild(tmpCellLabel);
		
	}
	document.getElementById('home-dynamic').innerHTML = tmpBodyHome.innerHTML;
}

/*** VIEW LOAD SUCCESS END viewWillUnload ***/

/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
	logInfo('homepage-vn will unload');
	
	// document.getElementById("footerDesktop").innerHTML = gUserInfo.accountInfo.companyName;
	// document.getElementById("footerMobile").innerHTML = gUserInfo.accountInfo.companyName;
}

/*** VIEW WILL UNLOAD END ***/

/*** FUNCTION ***/

/*** HANDLE ONCLICK ROW ***/
function gotoMenuList(inID) {
	logInfo('Selected ID: ' + inID);
	
	var tmpMenuObj;
	for(var i=0; i<mMenuList.length; i++) {
		tmpMenuObj = mMenuList[i];
		if(tmpMenuObj.menuID == inID) {
			gDynamicMenu = "<div style='margin-top:0px; color:#333;'>" + 
                "<h5 class='screen-title'><span>" + CONST_STR.get(tmpMenuObj.keyLang) + "</span></h5>" +
              "</div>";
		}
	}
	gDynamicMenu += "<div class='line-separate' style='margin-top: 2px; display: block;'></div>";
	if(tmpMenuObj) {
		for (var i=0; i<gMenuList.length; i++) {
			if(gMenuList[i].parentMenuID == inID) {
				gDynamicMenu += "<div id='home_" + gMenuList[i].path + "' class='sub-menu' onClick=\"" + gMenuList[i].onClick + "\">" +
              "<h5 class='Header'><a style='text-decoration:none; color:#FFF; cursor:pointer' onClick=\"" + gMenuList[i].onClick + "\"><span>" + CONST_STR.get(gMenuList[i].keyLang) + "</span></a></h5>" +
              "</div>";
			}
		}
	}
	gDynamicMenu += "<div class='line-separate-sub-menu' style='background-color:#000'/>";
	
	navController.initWithRootView('homepagexsl/dynamic-menu-scr', true, 'xsl');
}

var gprsResp = new GprsRespObj("","","","");
function getProperty(){
	var arrayArgs = new Array();	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_GET_PROPERTY_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
		
		data = getDataFromGprsCmd(gprsCmd);
		
		requestMBService(data, true, 0, requestPropertyMBServiceSuccess, requestPropertyMBServiceFail);
}

function requestPropertyMBServiceSuccess(e) {
	gprsResp = parserJSON(e);
	//setRespObjStore(gprsResp); //store response
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_GET_PROPERTY_INFO")))) {
		//gen information
		document.getElementById("property.value.mobile").innerHTML = gprsResp.arguments[0]; 
		document.getElementById("property.value.desktop").innerHTML = gprsResp.arguments[0]; 
	}
}

function requestPropertyMBServiceFail(e) {
	
}

function getDebt(){
	var arrayArgs = new Array();	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_GET_DEBT_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
		
		data = getDataFromGprsCmd(gprsCmd);
		
		requestMBService(data, true, 0, requestDebtMBServiceSuccess, requestDebtMBServiceFail);
}

function requestDebtMBServiceSuccess(e) {
	gprsResp = parserJSON(e);
	//setRespObjStore(gprsResp); //store response
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_GET_DEBT_INFO")))) {
		//gen information
		document.getElementById("debt.value.mobile").innerHTML = gprsResp.arguments[0]; 
		document.getElementById("debt.value.desktop").innerHTML = gprsResp.arguments[0]; 
	}
}

function requestDebtMBServiceFail(e) {
	
}

function getCustomerInfo(e) {
	var jsonData = new Object();
	jsonData.sequenceId = "1";
	jsonData.idtxn = "H00";

	var	args = new Array();
	args.push("2");
	args.push(jsonData);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_TYPE_GET_CUST_INFO'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
	var data = getDataFromGprsCmd(gprsCmd);

	var _success = function(e) {

		var resp = JSON.parse(e);

		if (resp.respJsonObj.length > 0) {
			resp = resp.respJsonObj[0];
			document.getElementById("account_name").innerHTML = resp.CUSTOMER_NAME;
			document.getElementById("company_name").innerHTML = resp.COMPANY_NAME;
			document.getElementById("last_login").innerHTML = resp.LAST_LOGIN;
			document.getElementById("staff_position").innerHTML = resp.POSITION + ": ";
		}
	}
	
	requestMBServiceCorp(data, false, 0, _success, null);
}
