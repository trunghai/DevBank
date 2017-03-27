/**
 * Created by NguyenTDK
 * User: 
 * Date: 05/10/15
 * Time: 8:00 PM
 */

gCredit.rowsPerPage = 10;
gCredit.totalPages = 0;

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('debt history init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back debt history');
}

/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('debt history load success');
	
	// Set dữ liệu trước khi gọi service
	var argsArray = [];
	argsArray.push("3");
	argsArray.push(JSON.stringify({
		idtxn: "C00",
		indentureNo : gCredit.indentureNo
    }));
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_CREDIT_DEBT_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
    data = getDataFromGprsCmd(gprsCmd);
    
    // gọi service và xử lí logic
    requestMBServiceCorp(data, true, 0, function(data) {
        var response = JSON.parse(data);
        if (response.respCode == RESP.get('COM_SUCCESS') 
        		&& response.responseType == CONSTANTS.get("CMD_CO_CREDIT_DEBT_INFO")) {
    			mainContentScroll.refresh();

    			gCredit.results = response.respJsonObj.rows;
    			if(gCredit.results.length == 0){
    				document.getElementById("tblContent").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
    			}else{
    				gCredit.totalPages = getTotalPages(gCredit.results.length);

        			var l_xml_doc = genXMLListTrans(gCredit.results, 1);
        			var l_xsl_doc = getCachePageXsl("corp/credit/debt/cre_debt_history_tbl");
        			
        			genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr){
        				document.getElementById("tblContent").innerHTML = oStr;
        				genPagging(gCredit.totalPages, 1);
        			});
    			}
    	}
    	else {
    		if(gprsResp.respCode == '1019'){
    			showAlertText(gprsResp.respContent);
    		}else{
    			showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));
    		}
    		var tmpPageName = navController.getDefaultPage();
    		var tmpPageType = navController.getDefaultPageType();
    		navController.initWithRootView(tmpPageName, true, tmpPageType);
    	}
    });
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('Send info user approve will unload');
}

/*** End liên quan việc send request lên server***/
function genXMLListTrans(pJson, idx) {
	var l_doc_xml = createXMLDoc(); 
	var l_node_root = createXMLNode('resptable','', l_doc_xml);
	var l_node_child;
	var l_node_infor;
	var l_arr = pJson;

	var startIdx = (idx - 1) * gCredit.rowsPerPage;
	var endIdx = startIdx + gCredit.rowsPerPage;

	for(var i = startIdx; i < endIdx; i++)	{
		if (typeof l_arr[i] != 'undefined') {
			l_node_infor = createXMLNode('tabletdetail','',l_doc_xml, l_node_root);
			l_node_child = createXMLNode('ngay_den_han',l_arr[i].NGAY_DEN_HAN, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('root_money_pay',l_arr[i].ROOT_MONEY_PAY , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('interest_money_pay',l_arr[i].INTEREST_MONEY_PAY, l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('total_money_pay',l_arr[i].TOTAL_MONEY_PAY , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('root_money_actually_pay',l_arr[i].ROOT_MONEY_ACTUALLY_PAY , l_doc_xml, l_node_infor);
			l_node_child = createXMLNode('interest_money_actually_pay',l_arr[i].INTEREST_MONEY_ACTUALLY_PAY, l_doc_xml, l_node_infor);
		}
	}
	
	return l_doc_xml;
}

// Quay lại màn hinh cũ
function creHistoryCallBack(){
	navController.popView(true);
}

function getTotalPages(totalRows) {
	return totalRows % gCredit.rowsPerPage == 0 ? Math.floor(totalRows / gCredit.rowsPerPage) : Math.floor(totalRows / gCredit.rowsPerPage) + 1;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	nodepage.innerHTML = tmpStr;
}

function pageIndicatorSelected(selectedIdx, selectedPage) { 
	document.getElementById('tblContent').innerHTML = "";
	document.getElementById('pageIndicatorNums').innerHTML = "";

	var xmlData = genXMLListTrans(gCredit.results, selectedIdx);
	var docXsl = getCachePageXsl("corp/credit/debt/cre_debt_history_tbl");

	genHTMLStringWithXML(xmlData, docXsl, function(html){
		var tmpNode = document.getElementById('tblContent');
		tmpNode.innerHTML = html;
		genPagging(gCredit.totalPages, selectedIdx);
	});
}

function exportExcelDebtHistory(){
	var arrayClientInfo = new Array();
    arrayClientInfo.push(null);
    arrayClientInfo.push({
        sequenceId: "8",
        transType: "T13",
        indentureNo : gCredit.indentureNo,
        dataExport : gCredit.results
    });

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

    data = getDataFromGprsCmd(gprsCmd);

    requestMBServiceCorp(data, true, 0, function(data) {
        var resp = JSON.parse(data);
        if (resp.respCode == "0") {
            var fileName = resp.respContent;
            window.open("./download/" + fileName);
        }
    });
}