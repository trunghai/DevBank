function loadInitXML() {
	return gCorp.detailXML;
}

// Khi click quay lai
function onBackClick() {
    gCorp.backFrom = "detail";
    navController.popView(true);
}