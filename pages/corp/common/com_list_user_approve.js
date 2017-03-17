/**
 * Created by NguyenTDK
 * User: 
 * Date: 06/10/15
 * Time: 10:15 AM
 */
/*** INIT VIEW ***/
function loadInitXML() {
	logInfo('common list user approve init');
}

/*** 
VIEW LOAD SUCCESS 
Thực hiện việc gọi lên service để lấy dữ liệu
***/
function viewDidLoadSuccess() {	
	logInfo('common list user approve success');	
	
	var l_data = {};
	var l_arrayArgs = new Array();
	var l_obj = new Object();
	
	l_obj.idtxn = "COM";
	l_obj.userId = gCustomerNo;
	
	var l_json = JSON.stringify(l_obj);
	
	l_arrayArgs.push("1");
	l_arrayArgs.push(l_json);
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push("");
	l_arrayArgs.push(""); 
	
	var l_gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_GET_LIST_USER_APPROVE"), "", "", gUserInfo.lang, gUserInfo.sessionID, l_arrayArgs);
	l_gprsCmd.raw = '';
	l_data = getDataFromGprsCmd(l_gprsCmd);
	
	requestMBServiceCorp(l_data, true, 0, requestAccListAccountSuccess, requestAccListAccountFail);	
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
	logInfo('common list user approve will unload');
}

// Thực hiện xử lý sau khi gọi thành công
// Lấy dữ liệu được trả về từ service đẩy lên trang
function requestAccListAccountSuccess(e){
	gprsResp = parserJSON(e);
	
	if ((gprsResp.respCode == RESP.get('COM_SUCCESS')) && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get('COM_GET_LIST_USER_APPROVE')))) {
		mainContentScroll.refresh();		
		var l_obj_json = JSON.parse(gprsResp.respJson);	
		
		var l_xml_doc = genXMLListTrans(l_obj_json);
		var l_xsl_doc = getCachePageXsl("corp/common/com_list_user_approve_tbl");
		
		genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr){
			document.getElementById("tblContent").innerHTML = oStr;
		});
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
}

function requestAccListAccountFail(e){
	
}

function genXMLListTrans(pJson)
{
	var l_doc_xml = createXMLDoc(); 
	var l_node_root = createXMLNode('resptable','', l_doc_xml);
	var l_node_child;
	var l_node_infor;
	var l_arr = pJson.rows;
	for(var i= 0; i< l_arr.length; i++)
	{
		l_node_infor = createXMLNode('tabletdetail','',l_doc_xml, l_node_root);
		l_node_child = createXMLNode('stt', i + 1, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('name', l_arr[i].FIRSTNAME , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('code', l_arr[i].IDUSER , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('position', l_arr[i].POSITION, l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('phone', l_arr[i].PHONENUMBER , l_doc_xml, l_node_infor);
		l_node_child = createXMLNode('email', l_arr[i].EMAIL , l_doc_xml, l_node_infor);
	}
	
	return l_doc_xml;
}

// Quay lại màn hình trước đó
function callBackScreen(){
	navController.popView(true);
}