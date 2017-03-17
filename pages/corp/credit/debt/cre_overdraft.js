/**
 * Created by NguyenTDK
 * User: 
 * Date: 12/10/15
 * Time: 8:00 PM
 */

/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('send info user approve init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
	logInfo('Back send info user approve');
}

/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
	logInfo('Send info user approve load success');
	
	// Set dữ liệu trước khi gọi service
	var argsArray = [];
	argsArray.push("4");
	argsArray.push(JSON.stringify({
		idtxn: "C00"
    }));
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_CREDIT_DEBT_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
    data = getDataFromGprsCmd(gprsCmd);
    
    // gọi service và xử lí logic
    requestMBServiceCorp(data, true, 0, function(data) {
        var response = JSON.parse(data);
        if (response.respCode == RESP.get('COM_SUCCESS') 
        		&& response.responseType == CONSTANTS.get('CMD_CO_CREDIT_DEBT_INFO')) {
	    	mainContentScroll.refresh();
	    	if(response.respJsonObj.rows.length == 0){
	    		document.getElementById("tblContent").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
	    	}else{
	    		var l_xml_doc = genXMLListTrans(response.respJsonObj);
				var l_xsl_doc = getCachePageXsl("corp/credit/debt/cre_overdraft_tbl");
				
				genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr){
					document.getElementById("tblContent").innerHTML = oStr;
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

// Chuyển đến màn hình chi tiết
function clickOverDaftDetail(debt_no, debt_name, open_acc_date, money, branch_name, 
							overdaft_interest, surplus, overdaft_start_date, 
							overdaft_end_date, surplus_availabel, limit_overdaft){
	// Chuyen du lieu vao bien toan cuc
	gCredit.debtNo = debt_no;
	gCredit.debtName = debt_name;
	gCredit.openAccDate = open_acc_date;
	gCredit.money = money;
	gCredit.branchName = branch_name;
	gCredit.overdaftInterest = overdaft_interest;
	gCredit.surplus = surplus;
	gCredit.overdaftStartDate = overdaft_start_date;
	gCredit.overdaftEndDate = overdaft_end_date;
	gCredit.surplusAvailabel = surplus_availabel;
	gCredit.limitOverdaft = limit_overdaft;
	
	// goto screen
	updateAccountListInfo(); 
	navController.pushToView('corp/credit/debt/cre_overdraft_dtl', true, 'xsl');
}

function genXMLListTrans(pJson) {
	var l_doc_xml = createXMLDoc(); 
	var l_node_root = createXMLNode('resptable','', l_doc_xml);
	var l_node_child;
	var l_node_infor;
	var l_arr = pJson.rows;
	for(var i= 0; i< l_arr.length; i++)	{
		l_node_infor = createXMLNode('tabletdetail','',l_doc_xml, l_node_root);
		l_node_child = createXMLNode('no', i + 1, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('debt_no',l_arr[i].DEBT_NO , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('debt_name',l_arr[i].DEBT_NAME , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('open_acc_date',l_arr[i].OPEN_ACC_DATE , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('money',l_arr[i].MONEY , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('branch_name',l_arr[i].BRANCH_NAME, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('overdaft_interest',l_arr[i].OVERDAFT_INTEREST , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('surplus',l_arr[i].SURPLUS , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('overdaft_start_date',l_arr[i].OVERDAFT_START_DATE, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('overdaft_end_date',l_arr[i].OVERDAFT_END_DATE, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('surplus_availabel',l_arr[i].SURPLUS_AVAILABEL, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('limit_overdaft',l_arr[i].LIMIT_OVERDAFT, l_doc_xml, l_node_infor);
	}
	
	return l_doc_xml;
}

// Quay lại màn hình trước đó
function overDaftCallBack(){
	navController.popView(true);
}
