/**
 * Created by NguyenTDK
 * User: 
 * Date: 15/10/15
 * Time: 8:00 PM
 */

var sequenceId;

/*** INIT VIEW ***/
function loadInitXML() {
  logInfo('change pasword init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
  logInfo('Back change pasword');
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
  logInfo('change pasword load success');
  //gen sequence form
  genSequenceForm();

  document.getElementById("footerDesktop").innerHTML = gUserInfo.accountInfo.companyName;
  document.getElementById("footerMobile").innerHTML = gUserInfo.accountInfo.companyName;
}

/*** VIEW WILL UNLOAD ***/
function viewWillUnload() {
  logInfo('Send info user approve will unload');
}

//gen sequence form
function genSequenceForm() {
  //get sequence form xsl
  var tmpXslDoc = getCachePageXsl("sequenceform");
  //create xml
  var tmpStepNo = 301;
  setSequenceFormIdx(tmpStepNo);
  var docXml = createXMLDoc();
  var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
  var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
  //gen html string
  genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr) {
    var tmpNode = document.getElementById('seqFormLocal');
    if (tmpNode != null) {
      tmpNode.innerHTML = oStr;
    }
  });
}

// Thực hiện việc đẩy dữ liệu vào trong db
function setupChangePasswordExe() {


  var oldPassword = document.getElementById("passwordCurrent").value;
  var newPassword = document.getElementById("newPassword").value;
  var reNewPassword = document.getElementById("reNewPassword").value;

  var msgValidate = new Array();
  // Check muc [Mat khau hien tai]
  if (oldPassword == '' || oldPassword == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
    msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_PAS_ITEM_PASSWORD_NOW')]));
  }

  // Check muc [Mat khau moi]
  if (newPassword == '' || newPassword == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
    msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_PAS_ITEM_PASSWORD_NEW')]));
  }

  // Check muc [nhap lai]
  if (reNewPassword == '' || reNewPassword == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
    msgValidate.push(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_PAS_ITEM_PASSWORD_RENEW')]));
  }

  // Check muc [Mat khau moi] va [nhap lai]
  if (newPassword != reNewPassword) {
    msgValidate.push(CONST_STR.get('CORP_MSG_SETUP_CHANGE_PASS_NOT_MATCH'));
  }

  if (msgValidate.length > 0) {
    showAlertText(msgValidate[0]);
  } else {
    //Call service after validate successfully

    var req = {
      idtxn: "S12",
      sequenceId : "2",
      oldPassword: oldPassword,
      newPassword: newPassword
    };
    
    gCorp.requests = [req];

    var objectValueClient = new Object();
    sequenceId = "1";
    objectValueClient.idtxn = "S12";
    objectValueClient.sequenceId = sequenceId;
    objectValueClient.oldPassword = oldPassword;
    objectValueClient.newPassword = newPassword;
    var arrayClientInfo = new Array();
    arrayClientInfo.push("1");
    arrayClientInfo.push(objectValueClient);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_CHANGE_PASSWORD"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
    var data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, validateSuccess, function(){});
  }
}

function validateSuccess(data) {
  var resp = JSON.parse(data);
  if (resp.respCode == "55" || resp.respCode == "99") {
    showAlertText(resp.respContent);
  } else {
    sendRequestToCommon();
  }
}

function sendRequestToCommon() {
  gCorp.rootView = currentPage;
  gCorp.cmdType = CONSTANTS.get("CMD_CO_SETUP_CHANGE_PASSWORD");
  gCorp.byPassReview = true;
  gCorp.hideBackButton = true;
  var docXml = genReviewScreen();
  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

//Thực hiện việc gọi lại màn hình cũ
function setupChangePasswordCallBack() {
  navCachedPages["corp/setup/system/set_system"] = null;
  navController.initWithRootView('corp/setup/system/set_system', true, 'xsl');
}

/*** GENARATE REVIEW SCREEN ***/
function genReviewScreen() {
  var docXml = createXMLDoc();
  var tmpXmlRootNode;

  var tmpXmlRootNode = createXMLNode('review', '', docXml);
  //review/reviewtitle //screen title
  var tmpXmlNodeInfo = createXMLNode('reviewtitle', CONST_STR.get('REVIEW_TITLE_SCREEN'), docXml, tmpXmlRootNode);

  setReviewXmlStore(docXml);

  return docXml;
}
