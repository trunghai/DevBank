/**
 * Created by NguyenTDK
 * User: 
 * Date: 15/10/15
 * Time: 8:00 PM
 */

var sequenceId;

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('change language init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back v pasword');
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('change language load success');
	if(gUserInfo.lang == 'EN'){
		document.getElementById('id.lang').value = CONST_SETUP_LANG[1];
	}else{
		document.getElementById('id.lang').value = CONST_SETUP_LANG[0];
	}

}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('change language will unload');
}

// Hien thi popup thay doi ngon ngu
function setShowPopupChangeLang(){
	document.addEventListener("evtSelectionDialog", handleInputLang, false);
	document.addEventListener("evtSelectionDialogClose", handleInputLangClose, false);
	showDialogList(CONST_STR.get('SET_LANG_POPUP_TITLE'), CONST_SETUP_LANG, CONST_SETUP_LANG_VALUE, false);
}


function handleInputLang(e) {
	if (currentPage == "corp/setup/system/changeLanguage/set_change_language") {
		document.removeEventListener("evtSelectionDialog", handleInputLang, false);
		
		if(e.selectedValue2 != gUserInfo.lang){
			if(e.selectedValue2 == "VN"){
				gUserInfo.lang == "EN";
			}else{
				gUserInfo.lang == "VN";
			}
			changeLanguageOnIB();
		}
	}
}

function handleInputLangClose() {
	if (currentPage == "corp/setup/system/changeLanguage/set_change_language") {
		document.removeEventListener("evtSelectionDialogClose", handleInputLangClose, false);
		document.removeEventListener("evtSelectionDialog", handleInputLang, false);
	}
}