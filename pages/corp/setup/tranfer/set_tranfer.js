/**
 * Created by NguyenTDK
 * User: 
 * Date: 05/10/15
 * Time: 8:00 PM
 */

/*** INIT VIEW ***/
function loadInitXML() {
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	var tmpArray1 = [CONST_STR.get('COM_TRAN_LIMIT')];
	// get data to display
	
	var tmpArray2 = ["1"];

	if (gUserInfo.userRole.indexOf("CorpInput") > -1) {
		tmpArray1.unshift(CONST_STR.get('SET_TRANFER_POPUP_ITEM_SEND_INFO'));
		tmpArray2.unshift("0");
	}
	document.addEventListener("evtSelectionDialog", handleChooseTrans, false);
	document.addEventListener("evtSelectionDialogClose", handleChooseTransClose, false);
	showDialogList(CONST_STR.get('COM_SYSTEM_POPUP_TITLE'), tmpArray1, tmpArray2, false);
	
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('Send info user approve will unload');
}

function handleChooseTrans(e) {
	if (currentPage == "corp/setup/tranfer/set_tranfer") {
		document.removeEventListener("evtSelectionDialog", handleChooseTrans, false);
		
		if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
			if(e.selectedValue2 == '0'){
				updateAccountListInfo();
				navController.pushToView('corp/setup/tranfer/sendMethod/set_send_info_user_approve', true, 'xsl');
			}else if(e.selectedValue2 == '1'){
				navCachedPages['corp/setup/tranfer/limit/set-limit'] = null;
				gCorp.rootView = "corp/setup/tranfer/limit/set-limit";
				navController.pushToView('corp/setup/tranfer/limit/set-limit', true, 'xsl');
			}else if(e.selectedValue2 == '2'){
				updateAccountListInfo();
				navController.pushToView('corp/setup/tranfer/tokentype/set_token_type', true, 'xsl');
			}
		}
	}
}

function handleChooseTransClose() {
	if (currentPage == "corp/setup/tranfer/set_tranfer") {
		document.removeEventListener("evtSelectionDialogClose", handleChooseTransClose, false);
		document.removeEventListener("evtSelectionDialog", handleChooseTrans, false);
	}
}