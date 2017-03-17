/**
 * Created by HuyNT2.
 * User: 
 * Date: 06/20/15
 * Time: 5:35 PM
 */

/*** HEADER ***/

/*** INIT VIEW ***/
function loadInitXML() {
	return '';
}

/*** INIT VIEW END ***/

/*** VIEW LOAD SUCCESS ***/

function viewDidLoadSuccess() {
	logInfo('account load success');
	document.getElementById('dynamic-menu').innerHTML = gDynamicMenu;
	if (gDynamicMenu.indexOf('home_jumbo/jumbo_create_acc') > -1 || gDynamicMenu.indexOf('home_jumbo/jumbo_acc_info') > -1) {
		var data = {};
		var arrayArgs = new Array();
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
		data = getDataFromGprsCmd(gprsCmd);
		requestMBService(data, true, 0, function(e){
			var gprsResp = parserJSON(e);
			if (gprsResp.arguments[0] == 'N') {
				document.getElementById('home_jumbo/jumbo_acc_info').style.display = 'none';
				gJumboAccExistedStat = false;
			} else {
				document.getElementById('home_jumbo/jumbo_create_acc').style.display = 'none';
				gJumboAccExistedStat = true;
			}
			gJumboAccInfo = gprsResp.arguments;
			displaySubMenuForJumboAcc(gJumboAccExistedStat);
			
		}, function(){
			logInfo('Check Jumbo fail');
		});
	}
}

/*** VIEW LOAD SUCCESS END viewWillUnload ***/

/*** VIEW WILL UNLOAD ***/

function viewWillUnload() {
	logInfo('account will unload');
}

/*** VIEW WILL UNLOAD END ***/
