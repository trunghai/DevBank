/**
 * Created by NguyenTDK
 * User: 
 * Date: 05/10/15
 * Time: 8:00 PM
 */

var sequenceId;
var flagLoad = true;

/*** INIT VIEW ***/
function loadInitXML() {
  logInfo('send info user approve init');
}

/*** VIEW BACK FROM OTHER ***/

function viewBackFromOther() {
  logInfo('Back send info user approve');
  flagLoad = false;
}


/*** VIEW LOAD SUCCESS ***/
function viewDidLoadSuccess() {
  logInfo('Send info user approve load success');

  if (!flagLoad) {
    for (var i = 0; i < document.getElementsByName('maturityDirective').length; i++) {
      if (document.getElementsByName('maturityDirective')[i].value == gSetUp.choose) {
        document.getElementsByName('maturityDirective')[i].checked = "checked";
        break;
      }
    }
    return;
  }

  document.getElementById("templateMailTitle").style.display = "none";
  document.getElementById("templateMailContent").style.display = "none";
  document.getElementById("templateSMSTitle").style.display = "none";
  document.getElementById("templateSMSContent").style.display = "none";

  //gen sequence form
  genSequenceForm();

  // Set dữ liệu trước khi gọi service
  var argsArray = [];
  argsArray.push("1");
  argsArray.push(JSON.stringify({
  	sequenceId : "1",
    idtxn: "S13"
  }));

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_SETUP_TYPE_SEND_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);
  data = getDataFromGprsCmd(gprsCmd);

  // gọi service và xử lí logic
  requestMBServiceCorp(data, false, 0, function(data) {
    var response = JSON.parse(data);
    if (response.respCode == RESP.get('COM_SUCCESS') && response.responseType == CONSTANTS.get('CMD_CO_SETUP_TYPE_SEND_INFO')) {
      document.getElementById("methodSendOld").value = response.respJsonObj.methodSend;
      document.getElementById("templateMailContent").innerHTML = response.respJsonObj.mail;
      document.getElementById("templateSMSContent").value = response.respJsonObj.sms;

      // hien thi luc ban dau
      for (var i = 0; i < document.getElementsByName('maturityDirective').length; i++) {
        if (document.getElementsByName('maturityDirective')[i].value == response.respJsonObj.methodSend) {
          document.getElementsByName('maturityDirective')[i].checked = "checked";
          break;
        }
      }

      displayTemplate(response.respJsonObj.methodSend);
    } else {
      showAlertText(gprsResp.respContent);
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

// Thực hiện việc hiển thị ra các template mail
function displayTemplate(type) {
  gSetUp.choose = type;
  document.getElementById("templateMailTitle").style.display = "none";
  document.getElementById("templateMailContent").style.display = "none";
  document.getElementById("templateSMSTitle").style.display = "none";
  document.getElementById("templateSMSContent").style.display = "none";

  // Hiển thị ra template tương ứng với kiểu
  if (type == '0') {
    document.getElementById("rdbtnDisplay0").checked = true;
    document.getElementById("send_0").style.fontWeight = "bold";
    document.getElementById("send_1").style.fontWeight = "normal";
    document.getElementById("send_2").style.fontWeight = "normal";
    document.getElementById("send_3").style.fontWeight = "normal";
  } else if (type == '1') {
    document.getElementById("templateMailTitle").style.display = "";
    document.getElementById("templateMailContent").style.display = "";
    document.getElementById("rdbtnDisplay1").checked = true;
    document.getElementById("send_0").style.fontWeight = "normal";
    document.getElementById("send_1").style.fontWeight = "bold";
    document.getElementById("send_2").style.fontWeight = "normal";
    document.getElementById("send_3").style.fontWeight = "normal";
  } else if (type == '2') {
    document.getElementById("templateSMSTitle").style.display = "";
    document.getElementById("templateSMSContent").style.display = "";
    document.getElementById("rdbtnDisplay2").checked = true;
    document.getElementById("send_0").style.fontWeight = "normal";
    document.getElementById("send_1").style.fontWeight = "normal";
    document.getElementById("send_2").style.fontWeight = "bold";
    document.getElementById("send_3").style.fontWeight = "normal";
  } else if (type == '3') {
    document.getElementById("templateMailTitle").style.display = "";
    document.getElementById("templateMailContent").style.display = "";
    document.getElementById("templateSMSTitle").style.display = "";
    document.getElementById("templateSMSContent").style.display = "";
    document.getElementById("rdbtnDisplay3").checked = true;
    document.getElementById("send_0").style.fontWeight = "normal";
    document.getElementById("send_1").style.fontWeight = "normal";
    document.getElementById("send_2").style.fontWeight = "normal";
    document.getElementById("send_3").style.fontWeight = "bold";
  }

  if (mainContentScroll !== null)
    mainContentScroll.refresh();
}

// Thực hiện việc đẩy dữ liệu vào trong db
function setupSendMethodExe() {
  var dataChoose = '';
  var maturityDirective = document.getElementsByName('maturityDirective');
  for (var i = 0; i < maturityDirective.length; i++) {
    if (maturityDirective[i].checked == true) {
      dataChoose = maturityDirective[i].value;
      break;
    }
  }

  //req gui len
  var req = {
    idtxn: "S13",
    sequenceId : "2",
    sendMethodOld: document.getElementById("methodSendOld").value,
    sendMethodNew: dataChoose
  };
  gCorp.rootView = currentPage;
  gCorp.cmdType = CONSTANTS.get("CMD_CO_SETUP_TYPE_SEND_INFO"); //port
  gCorp.requests = [req, null];

  var xmlDoc = genReviewScreen();

  setReviewXmlStore(xmlDoc);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

//Thực hiện việc gọi lại màn hình cũ
function setupCallBack() {
  navCachedPages["corp/setup/tranfer/set_tranfer"] = null;
  navController.initWithRootView('corp/setup/tranfer/set_tranfer', true, 'xsl');
}

/*** GENARATE REVIEW SCREEN ***/
function genReviewScreen() {
  var xmlDoc = createXMLDoc();
  var rootNode = createXMLNode('review', '', xmlDoc);

  // title
  var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('COM_TRASACTION_INFO'), xmlDoc, sectionNode);

  var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('SET_SEND_TYPE_SEND_TITLE'), xmlDoc, rowNode);
  var dataChoose = '';
  var maturityDirective = document.getElementsByName('maturityDirective');
  for (var i = 0; i < maturityDirective.length; i++) {
    if (maturityDirective[i].checked == true) {
      dataChoose = 'send_' + maturityDirective[i].value;
      break;
    }
  }
  createXMLNode("value", document.getElementById(dataChoose).innerHTML, xmlDoc, rowNode);

  // button
  var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "cancel", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "back", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "authorize", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_NEXT"), xmlDoc, buttonNode);

  return xmlDoc;
}
