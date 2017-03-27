function loadInitXML() {
    return getReviewXmlStore();
}

function viewDidLoadSuccess() {
    // Gen step sequence
    var sequenceXSL = getCachePageXsl("sequenceform");
    var sequenceNo = 303;
    if (gCorp.isAuthScreen == true) {
    	sequenceNo = 313;
    	
    	// Xem xet an hien button in
    	var printIcon = document.getElementById("acchis-exportFunc");
    	if (printIcon) {
    		printIcon.style.display = "none";
    	}
    }
    var docXml = createXMLDoc();
    var rootNode = createXMLNode("seqFrom", "", docXml);
    createXMLNode("stepNo", sequenceNo, docXml, rootNode);
    genHTMLStringWithXML(docXml, sequenceXSL, function(htmlOutput) {
        var element = document.getElementById("step-sequence");
        element.innerHTML = htmlOutput;
    });
    
}

function viewWillUnload() {
    gCorp = {};
}

function goToOtherTrans() {
    if (gCorp.rootView) {
		var rootView = gCorp.rootView;
		gCorp.rootView = null;
        navController.initWithRootView(rootView, true, "xsl");
    } else
        navController.resetBranchView();
}

function printComHistory() {
	var tmpNodeMain = document.getElementById("mainViewContent");
    var printNode = tmpNodeMain.getElementsByTagName("div")[0];

    printNodeWithAll(printNode);
}