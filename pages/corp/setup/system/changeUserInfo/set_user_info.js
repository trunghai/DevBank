var TAG = "set_user_info: "
var sequenceId;
var gprsResp = new GprsRespObj("", "", "", "");
var userInfo;
var flag = true;
var tmpData;

function loadInitXML() {
}

function viewBackFromOther() {
  //HieutNT Sua theo comment so 39 START
  flag = false;
  //END

}

function viewDidLoadSuccess() {
  //HieutNT Sua theo comment so 39 START
  if (flag) {
    userInfo = {};
    sendRequestGetUserInfo();
    genSequenceForm();
  };
  //END

}

//lay thong tn nguoi dung hien thi len man hinh
function sendRequestGetUserInfo() {
  var objectValueClient = new Object();
  sequenceId = "1";
  objectValueClient.idtxn = "S11";
  objectValueClient.sequenceId = sequenceId;

  var arrayClientInfo = new Array();

  arrayClientInfo.push("1");
  arrayClientInfo.push(objectValueClient);

  var gprsCmd = new GprsCmdObj(1201, "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);

  requestMBServiceCorp(data, false, 0, requestServiceSuccess, requestServiceFail);
}

function sendRequestUpdate() {
    userInfo.newPosition = getValueById("idPosition");
    userInfo.newEmail = getValueById("idEmail");
    userInfo.newPhoneNumber = getValueById("idPhoneNumber");

  //HieutNT Sua theo comment so 39 START
  if (userInfo.newPosition == "" || userInfo.newPosition == undefined) {
    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_USER_POSITION')]))
    return
  };

  if (userInfo.newEmail == "" || userInfo.newEmail == undefined) {
    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_USER_EMAIL')]))
    return
  };

  if (userInfo.newPhoneNumber == "" || userInfo.newPhoneNumber == undefined) {
    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_NO_INPUT'), [CONST_STR.get('SET_USER_PHONE_NUMBER')]))
    return
  };
  //END

  //kiem tra xem co nhap dung email hay ko
  if (!validateEmail(userInfo.newEmail)) {
    showAlertText(CONST_STR.get("CORP_MSG_SET_ANN_EMAIL"));
    return;
  }

  var objectValueClient = new Object();
  sequenceId = "2";
  objectValueClient.idtxn = "S11";
  objectValueClient.sequenceId = sequenceId;
  objectValueClient.oldPosition = userInfo.oldPosition;
  objectValueClient.oldEmail = userInfo.oldEmail;
  objectValueClient.oldPhoneNumber = userInfo.oldPhoneNumber;
  objectValueClient.newPosition = userInfo.newPosition;
  objectValueClient.newEmail = userInfo.newEmail;
  objectValueClient.newPhoneNumber = userInfo.newPhoneNumber;

  gCorp.rootView = currentPage;
  gCorp.cmdType = CONSTANTS.get("CMD_CO_SETUP_CHANGE_PERSON_INFO"); //port
  gCorp.requests = [objectValueClient, null];

  var docXml = genReviewScreenUserInfo2(userInfo, tmpData);

  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');

}

function requestServiceSuccess(e) {
  gprsResp = JSON.parse(e);
  var obj = gprsResp.respJsonObj;
  tmpData = obj;
  if (gprsResp.respCode == '0') {
    if (sequenceId == "1") {
      obj = obj[0];
      setValueId("idUserLogin", obj.IDUSER);
      setValueId("idFullName", obj.FULLNAME);
      setValueId("idShortName", obj.SHORTNAME);
      setValueId("idNumberCMT", obj.IDENTITYCARDNUMBER);
      setValueId("idDateRange", obj.ALLOCATEDATE);
      setValueInput("idPosition", obj.POSITION);
      setValueInput("idEmail", obj.EMAIL);
      setValueInput("idPhoneNumber", obj.PHONENUMBER);

      userInfo.IDUSER = obj.IDUSER;
      userInfo.FULLNAME = obj.FULLNAME;
      userInfo.SHORTNAME = obj.SHORTNAME;
      userInfo.IDENTITYCARDNUMBER = obj.IDENTITYCARDNUMBER;
      userInfo.ALLOCATEDATE = obj.ALLOCATEDATE;
      userInfo.oldPosition = obj.POSITION;
      userInfo.oldEmail = obj.EMAIL;
      userInfo.oldPhoneNumber = obj.PHONENUMBER;
    }
  }
}

function requestServiceFail(e) {

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

function genReviewScreenUserInfo2(userInfo, obj) {
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('review', '', docXml);

  //thong tin nguoi dung tren ebank
  var listUserInfo = [
    [CONST_STR.get("SET_USER_FULL_NAME"), userInfo.FULLNAME], //ho va ten
    [CONST_STR.get("COM_SHORT_NAME"), userInfo.SHORTNAME], //Ten ngan
    [CONST_STR.get("SET_USER_NUMBER_CMT"), userInfo.IDENTITYCARDNUMBER], //so CMND/Ho chieu
    [CONST_STR.get("SET_USER_DATE_RANGE"), userInfo.ALLOCATEDATE], //Ngay cap
    [CONST_STR.get("SET_USER_POSITION"), userInfo.oldPosition], //Chuc vu
    [CONST_STR.get("SET_USER_EMAIL"), userInfo.oldEmail], //Email lien he
    [CONST_STR.get("SET_USER_PHONE_NUMBER"), userInfo.oldPhoneNumber], //Dien thoai lien he

  ];

  //thong tin nguoi dung thay doi 
  var listUserInfoChange = new Array();
  if (userInfo.newPosition != userInfo.oldPosition) {
    listUserInfoChange.push([CONST_STR.get("SET_USER_POSITION"), userInfo.newPosition]);
  }
  if (userInfo.newEmail != userInfo.oldEmail) {
    listUserInfoChange.push([CONST_STR.get("SET_USER_EMAIL"), userInfo.newEmail]);
  }
  if (userInfo.newPhoneNumber != userInfo.oldPhoneNumber) {
    listUserInfoChange.push([CONST_STR.get("SET_USER_PHONE_NUMBER"), userInfo.newPhoneNumber]);
  }

  //tao section
  createDateNodeReview(CONST_STR.get("SET_USER_ITLE_GET_USER_INFO"), listUserInfo, docXml, rootNode);
  createDateNodeReview(CONST_STR.get("CONST_SETUP_QUERY_CHANGED_INFO"), listUserInfoChange, docXml, rootNode);

  //cancle, back, next
  createButtonNode("cancel", CONST_STR.get('REVIEW_BTN_CANCEL'), docXml, rootNode);
  createButtonNode("back", CONST_STR.get('REVIEW_BTN_BACK'), docXml, rootNode);
  createButtonNode("authorize", CONST_STR.get('REVIEW_BTN_NEXT'), docXml, rootNode);

  return docXml;
}

function createDataNode(title, value, docXml, tmpXmlNodeInfo, display) {
  var tmpChildNodeAcc = createXMLNode('transinfo', "", docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', title, docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', value, docXml, tmpChildNodeAcc);
  if (display == true) {
    tmpChildNode = createXMLNode('transinfodisplay', 'review', docXml, tmpChildNodeAcc); //display or not in result
  }
}

function createDateNodeReview(title, listValue, docXml, rootNode) {
  if (listValue.length > 0) {
    var sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', title, docXml, sectionNode);
    for (var i = 0; i < listValue.length; i++) {
      var obj = listValue[i];
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', obj[0], docXml, rowNode);
      valueNode = createXMLNode('value', obj[1], docXml, rowNode);
    }
  }
}

function createButtonNode(type, name, docXml, rootNode) {
  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', type, docXml, buttonNode);
  btnLabelNode = createXMLNode('label', name, docXml, buttonNode);
}

function setValueId(name, value) {
  if (value) {
    document.getElementById(name).innerHTML = value;
  } else {
    document.getElementById(name).innerHTML = "";
  }

}

function setValueInput(name, value) {
  if (value) {
    document.getElementById(name).value = value;
  } else {
    document.getElementById(name).value = "";
  }

}

function getValueById(name) {
  return document.getElementById(name).value;
}

function cancleClick() {

}

function goBack() {
  if (gCorp.rootView === 'corp/setup/system/viewUserInfo/view_user_info') {
    gCorp.rootView = currentPage;
    navCachedPages["corp/setup/system/viewUserInfo/view_user_info"] = null;
    navController.initWithRootView('corp/setup/system/viewUserInfo/view_user_info', true, 'xsl');

  } else {
    navCachedPages["corp/setup/system/set_system"] = null;
    navController.initWithRootView('corp/setup/system/set_system', true, 'xsl');
  }
}


//ham kien tra xem email nhap vao co dung 
function validateEmail(email) {
  var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
  return re.test(email);
}

//ham kiem tra so dien thoai nhap vao dung hay ko
function handleInputPhoneNumber(event) {
  var charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}

function saveCurrentData() {
  userInfo.IDUSER = getValueById("idUserLogin");
  userInfo.FULLNAME = getValueById("idFullName");
  userInfo.SHORTNAME = getValueById("idShortName");
  userInfo.IDENTITYCARDNUMBER = getValueById("idNumberCMT");
  userInfo.ALLOCATEDATE = getValueById("idDateRange");
}

function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccentinfo(field.value);
  }
}
