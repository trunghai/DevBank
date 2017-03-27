var reloadPageFlag;

var strXml = "";
/*** HEADER ***/
var gprsResp = new GprsRespObj("","","","");

/*** INIT VIEW ***/
function loadInitXML() {
	var tmpXml = getReviewXmlStore();
	if (strXml == '' || strXml == undefined){
		strXml = XMLToString(tmpXml);
	}
	
	return tmpXml;
}

function goBack() {
	navController.popView(true);
	navCachedPages["corp/transfer/query/transfer-detail"] = null;
}

function printComHistory() {
	var tmpNodeMain = document.getElementById("mainViewContent");
    var printNode = tmpNodeMain.getElementsByTagName("div")[0];

    printNodeWithAll(printNode);
}
