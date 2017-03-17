function loadInitXML() {
    logInfo('send info user approve init');
}

function viewBackFromOther() {
    logInfo('Back send info user approve');
}

function viewDidLoadSuccess() {
    createMenuSystem();

}

/*** tao menu he thong */
function createMenuSystem() {
    gSetUp.menuSystem = (gUserInfo.lang == 'EN') ? CONST_SETUP_PAGE_MENU_DROPLIST_EN : CONST_SETUP_PAGE_MENU_DROPLIST_VN;
    document.addEventListener("evtSelectionDialog", handleSelectMenuSystem, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectMenuSystemClose, false);
    showDialogList(CONST_STR.get("COM_SYSTEM_POPUP_TITLE"), gSetUp.menuSystem, '', true);

}

function handleSelectMenuSystem(e) {
    handleSelectMenuSystemClose();
    if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var tmp = e.selectedValue1;
        for (var i = 0; i < gSetUp.menuSystem.length; i++) {

            if (gSetUp.menuSystem[i] == tmp) {
            	if(i == 0){
            		//thong tin ngon ngu
                    navController.pushToView("corp/setup/system/changeLanguage/set_change_language", true, 'xsl');
            	}else if (i == 1) { 
                    //thong tin ca nhan
                    navController.pushToView("corp/setup/system/changeUserInfo/set_user_info", true, 'xsl');
                } else if (i == 2) { 
                    //thay doi mat khau
                    navController.pushToView("corp/setup/system/changePassword/set_change_password", true, 'xsl');
                }
            }
        }
    }
}

function handleSelectMenuSystemClose() {
    document.removeEventListener("evtSelectionDialogClose", handleSelectMenuSystemClose, false);
    document.removeEventListener("evtSelectionDialog", handleSelectMenuSystem, false);
}
