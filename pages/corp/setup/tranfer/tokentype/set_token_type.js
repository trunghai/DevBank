/**
 * Created by NguyenTDK
 * User: 
 * Date: 05/10/15
 * Time: 8:00 PM
 */

var sequenceId;

/*** INIT VIEW ***/
function loadInitXML() {
    logInfo('Change token type init');
}


function viewBackFromOther() {
    logInfo('Back Change token type');
}

// Sau khi load trang thanh cong
function viewDidLoadSuccess() {
    logInfo('Change token type load success');
    //gen sequence form
    genSequenceForm();
    gCorp.rootView = "corp/setup/tranfer/tokentype/set_token_type";
    
    // Set dữ liệu trước khi gọi service
    var argsArray = [];
    argsArray.push("1");
    argsArray.push(JSON.stringify({
        idtxn: "S14"
    }));
    
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_CHANGE_TOKEN_TYPE"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
    data = getDataFromGprsCmd(gprsCmd);
    
    // gọi service và xử lí logic
    requestMBServiceCorp(data, false, 0, function(data) {
        var response = JSON.parse(data);
        if (response.respCode == RESP.get('COM_SUCCESS') 
                && response.responseType == CONSTANTS.get('CMD_CO_SETUP_CHANGE_TOKEN_TYPE')) {
            var tokenDislay = [{display: CONST_STR.get('COM_TOKEN_OTP_VAS'), value : 'VAS'}, 
                               {display: CONST_STR.get('COM_TOKEN_OTP_SMS'), value : 'OTP'}, 
                               {display: CONST_STR.get('COM_TOKEN_MTX'), value : 'MTX'}/*, 
                               {display: CONST_STR.get('SET_TOKEN_VIETTEL_CA'), value : 'MobileCA'}*/];
            var needUse = document.getElementById('needUse');
            needUse.innerHTML = "";
            
            for(var i = 0; i < tokenDislay.length; i++){
                if(response.respJsonObj.tokenType == tokenDislay[i].value){
                    document.getElementById("nowUse").innerHTML  = tokenDislay[i].display;
                    document.getElementById("nowUseValue").value  = tokenDislay[i].value;
                }else{
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    td.setAttribute('style', 'border:0');
                    var div = document.createElement("div");
                    div.setAttribute('style', 'padding-left: 15px;');
                    
                    var input = document.createElement("input");
                    input.setAttribute('type', 'radio');
                    input.setAttribute('value', tokenDislay[i].value);
                    input.setAttribute('name', 'tokenChooseValue');
                    
                    var span = document.createElement("span");
                    span.setAttribute('id', 'token' + tokenDislay[i].value);
                    span.setAttribute('style', 'padding-left: 5px;');
                    span.innerHTML = tokenDislay[i].display;
                    
                    div.appendChild(input);
                    div.appendChild(span);
                    td.appendChild(div);
                    tr.appendChild(td);
                    
                    needUse.appendChild(tr);
                }
            }
        }else {
            if(response.respCode == '1019'){
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
    logInfo('Change token type will unload');
}

//gen sequence form
function genSequenceForm() {
    //get sequence form xsl
    var tmpXslDoc = getCachePageXsl("sequenceform");
    //create xml
    var tmpStepNo = 401;
    setSequenceFormIdx(tmpStepNo);
    var docXml = createXMLDoc();    
    var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
    var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
    //gen html string
    genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr){
        var tmpNode = document.getElementById('seqFormLocal');
        if(tmpNode != null){
            tmpNode.innerHTML = oStr;
        }
    });
}

// Thực hiện việc đẩy dữ liệu vào trong db
function setupChangeTypeTokenExe(){
	var dataChoose = '';
	
	var tokenChooseValue = document.getElementsByName('tokenChooseValue');
	for(var i = 0; i < tokenChooseValue.length; i++){
		if(tokenChooseValue[i].checked == true){
			dataChoose = tokenChooseValue[i].value;
		}
	}
	
	if(dataChoose == ''){
		
	}else{
		// Set dữ liệu trước khi gọi service
	    var argsArray = [];
	    argsArray.push("2");
	    argsArray.push(JSON.stringify({
	        idtxn: "S14",
	        tokenTypeOld : document.getElementById("nowUseValue").value,
	        tokenTypeNew : dataChoose
	    }));
	    
	    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_CHANGE_TOKEN_TYPE"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
	    data = getDataFromGprsCmd(gprsCmd);
	    
	    // gọi service và xử lí logic
	    requestMBServiceCorp(data, true, 0, function(data) {
	        var response = JSON.parse(data);
	        if (response.respCode == RESP.get('COM_SUCCESS') 
	                && response.responseType == CONSTANTS.get('CMD_CO_SETUP_CHANGE_TOKEN_TYPE')) {
	            setRespObjStore(response);
	            genReviewScreen(response.respJsonObj);
	        }else if(response.respCode == RESP.get('COM_VALIDATE_FAIL') 
	                && response.responseType == CONSTANTS.get('CMD_CO_SETUP_CHANGE_TOKEN_TYPE')){
	        	showAlertText(gprsResp.respContent);
	        } else {
	            if(response.respCode == RESP.get('COM_VALIDATE_FAIL')){
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
}

//Thực hiện việc gọi lại màn hình cũ
function setupCallBack(){
    navCachedPages["corp/setup/tranfer/set_tranfer"] = null;
    navController.initWithRootView('corp/setup/tranfer/set_tranfer', true, 'xsl');
}

/*** GENARATE REVIEW SCREEN ***/
function genReviewScreen(data) {
    var xmlDoc = createXMLDoc();
    
     var rootNode = createXMLNode("review", "", xmlDoc);
    var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
    var titleNode = createXMLNode("title", CONST_STR.get('COM_METHOD_ARE_USED'), xmlDoc, sectionNode);

    var rowNode = createXMLNode("row-one-col", document.getElementById("nowUse").innerHTML, xmlDoc, sectionNode);

    var sectionNodeTd = createXMLNode("section", "", xmlDoc, rootNode);
    var titleNodeTd = createXMLNode("title", CONST_STR.get('COM_METHOD_CHOOSE'), xmlDoc, sectionNodeTd);
    var dataChoose = '';
    var tokenChooseValue = document.getElementsByName('tokenChooseValue');
    for(var i = 0; i < tokenChooseValue.length; i++){
		if(tokenChooseValue[i].checked == true){
			dataChoose = 'token' + tokenChooseValue[i].value;
		}
	}
    rowNode = createXMLNode("row-one-col", document.getElementById(dataChoose).innerHTML, xmlDoc, sectionNodeTd);
    
    var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "cancel", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get('REVIEW_BTN_CANCEL'), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "back", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get('CM_BTN_GOBACK'), xmlDoc, buttonNode);

    buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
    createXMLNode("type", "reject", xmlDoc, buttonNode);
    createXMLNode("label", CONST_STR.get('CM_BTN_SEND_REQ'), xmlDoc, buttonNode);
    
    var req = {
		sequence_id : data.sequence_id,
		transId : data.transaction_id,
		idtxn: "S14"
    };
    gCorp.cmdType = CONSTANTS.get('CMD_CO_SETUP_CHANGE_TOKEN_TYPE');
    gCorp.requests = [null, req];
    
    setReviewXmlStore(xmlDoc);
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}