// JavaScript Document
var dataObj;
var sttID;
var gFreqMNG;
var docXml;
var gMNGAcc;
var objJSON;
var xmlRequest;

var respData;
var rowsPerPage = 10;
var totalPages = 0;

var searchData = {
   sequence_id : "2",
   idtxn : "T00",
   typeacct : '',
   frequency : '',
   datstart : '',
   datend : '',
   codstatus : '',
   accdeb : '',
   pageSize : 100000000,
   pageId : 1
}

function viewDidLoadSuccess() {
  logInfo('transfer load success');
  // if (flgmng == undefined || flgmng == false) {
    document.getElementById('id.search').innerHTML = '';
    document.getElementById('id.button.cancel').style.display = 'none';

    if (gUserInfo.lang == 'EN') {
      document.getElementById('id.acctype').value = CONST_MNG_KEY_PERIODIC_LOCAL_EN[0];
      document.getElementById('id.accountno').value = CONST_MNG_KEY_ACC_LIST_EN[0];
      document.getElementById('id.stt').value = CONST_VALUE_TRANS_PERIODIC_BN_STT_EN[0];
      document.getElementById('id.freq').value = CONST_MNG_KEY_PERIODIC_FREQUENCY_EN[0];
    } else {

      document.getElementById('id.acctype').value = CONST_MNG_KEY_PERIODIC_LOCAL_VN[0];
      document.getElementById('id.accountno').value = CONST_MNG_KEY_ACC_LIST_VN[0];
      document.getElementById('id.stt').value = CONST_VALUE_TRANS_PERIODIC_BN_STT_VN[0];
      document.getElementById('id.freq').value = CONST_MNG_KEY_PERIODIC_FREQUENCY_VN[0];
    }
    gMNGAcc = CONST_MNG_KEY_ACC_LIST[0];
    sttID = CONST_KEY_TRANS_PERIODIC_BN_STT[0];
    gFreqMNG = CONST_MNG_VAL_PERIODIC_FREQUENCY[0];
    // flgmng = true;
    gacctype = CONST_KEY_PERIODIC_LOCAL_BN_SEARCH_VN[0];
    searchData.accdeb = ''; 
  // }

  console.log("gUserInfo.userRole", gUserInfo.userRole.indexOf('CorpInput'));
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.mngenddate', 'span.enddate');

  // var today = new Date();
  //   var beginDay;
  //   var dd = today.getDate();
  //   var mm = today.getMonth() + 1; //January is 0!
  //   var yyyy = today.getFullYear();

  //   if (dd < 10) {
  //     dd = '0' + dd
  //   }

  //   if (mm < 10) {
  //     mm = '0' + mm
  //   }

  //   today = dd + '/' + mm + '/' + yyyy;
  //   if (mm == 1) {
  //     beginDay = dd + '/' + (12) + '/' + (parseInt(yyyy) - 1);
  //   } else {
  //     beginDay = dd + '/' + (parseInt(mm) - 1) + '/' + yyyy;
  //   };

  //   document.getElementById("id.begindate").value = beginDay;
  //   document.getElementById("id.mngenddate").value = today;


  //Check quyen de hien thi man quan ly giao dich
  if(gUserInfo.userRole.indexOf('CorpInput') == -1 &&  document.getElementById("page.input") != null){
	var elem11 = document.getElementById("page.input");
		elem11.parentNode.removeChild(elem11);
  }
}

// Get nguoi tao giao dich
function getUserWhoCreatedTransaction() {
  //Collect và gửi data lên 
  dataObj = new Object();
  dataObj.sequence_id = "1";
  dataObj.idtxn = "T00";

  var arrArgs = new Array();
  arrArgs.push("1");
  arrArgs.push(dataObj);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_USER_CREATED_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrArgs);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestUserServiceSuccess, requestUserServiceFail);
}

function requestUserServiceSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp); // !!!!!!!!!!!! DON'T MISS IT
  var obj = gprsResp.respJsonObj;
  console.log("obj", obj);

  var listUser = [];
  listUser.push(CONST_STR.get("COM_ALL"));

  var keyListUser = [];
  keyListUser.push("");

  for (var i in obj) {
    listUser.push(obj[i].IDUSER);
    keyListUser.push(obj[i].IDUSER);
  }

  document.addEventListener("evtSelectionDialog", handleSelectUser, false);
  document.addEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
  showDialogList(CONST_STR.get('COM_CHOOSE_MAKER_TRADE'), listUser, keyListUser, false);
}

function requestUserServiceFail() {

}

function handleSelectUser(e) {
  handleCloseUserClose();
  searchData.accdeb = e.selectedValue2;
  var maker = document.getElementById('id.accountno');
  maker.value = e.selectedValue1;
}

function handleCloseUserClose() {
  document.removeEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
  document.removeEventListener("evtSelectionDialog", handleSelectUser, false);
}

//sHOW TRANG THAI
function showSTT() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_VALUE_TRANS_PERIODIC_BN_STT_EN : CONST_VALUE_TRANS_PERIODIC_BN_STT_VN;
  var tmpArray2 = CONST_KEY_TRANS_PERIODIC_BN_STT;

  var handleshowSTT = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialog", handleshowSTT, false);
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var sttcont = document.getElementById('id.stt');
        if (sttcont.nodeName == "INPUT") {
          sttcont.value = e.selectedValue1;
        } else {
          sttcont.innerHTML = e.selectedValue1;
        }
      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        sttID = e.selectedValue2;
      }
    }
  }

  var handleshowSTTClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
      document.removeEventListener("evtSelectionDialog", handleshowSTT, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleshowSTT, false);
  document.addEventListener("evtSelectionDialogClose", handleshowSTTClose, false);
  showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), tmpArray1, tmpArray2, false);
}


//Show tan suat
function showInputFrequencyMNG() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_VAL_PERIODIC_BN_FREQUENCY_SEARCH_EN : CONST_VAL_PERIODIC_BN_FREQUENCY_SEARCH_VN;
  var tmpArray2 = CONST_KEY_PERIODIC_BN_FREQUENCY_SEARCH;

  var handleInputFrequencyMNG = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialog", handleInputFrequencyMNG, false);
      var frequency = document.getElementById('id.freq');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        if (frequency.nodeName == "INPUT") {
          frequency.value = e.selectedValue1;
        } else {
          frequency.innerHTML = e.selectedValue1;
        }
      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        gFreqMNG = e.selectedValue2;
      }
    }
  }

  var handleInputFrequencyMNGClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleInputFrequencyMNGClose, false);
      document.removeEventListener("evtSelectionDialog", handleInputFrequencyMNG, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleInputFrequencyMNG, false);
  document.addEventListener("evtSelectionDialogClose", handleInputFrequencyMNGClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_DIALOG_TITLE_FREQUENCY'), tmpArray1, tmpArray2, false);
}


//show loai giao dich
function showInputAccountTypeMNG() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_MNG_KEY_PERIODIC_LOCAL_EN : CONST_VAL_PERIODIC_LOCAL_BN_SEARCH_VN;
  var tmpArray2 = CONST_KEY_PERIODIC_LOCAL_BN_SEARCH_VN;

  var handleInputAccountTypeMNG = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialog", handleInputAccountTypeMNG, false);
      var acctype = document.getElementById('id.acctype');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        if (acctype.nodeName == "INPUT") {
          acctype.value = e.selectedValue1;
        } else {
          acctype.innerHTML = e.selectedValue1;
        }
      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        gacctype = e.selectedValue2;
      }
    }
  }

  var handleInputAccountTypeMNGClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-mng-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleInputAccountTypeMNGClose, false);
      document.removeEventListener("evtSelectionDialog", handleInputAccountTypeMNG, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleInputAccountTypeMNG, false);
  document.addEventListener("evtSelectionDialogClose", handleInputAccountTypeMNGClose, false);
  showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), tmpArray1, tmpArray2, false);
}

function searchPeriodicTrans() {
  var data = {};
  var arrayArgs = new Array();
  var acctype = document.getElementById('id.acctype'); //loai giao dich
  var accdeb = document.getElementById('id.accountno'); //userid
  var stt = document.getElementById('id.stt'); //stt
  var freq = document.getElementById('id.freq'); //tan suat
  var sdateTrans = document.getElementById('id.begindate');
  var edateTrans = document.getElementById('id.mngenddate');

  var currentDate = new Date();
  var strCurrentDate = ('0' + (currentDate.getDate() + 1)) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

  var tmpsdate = sdateTrans.value;
  var tmpedate = edateTrans.value;

  if (tmpsdate == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
    showAlertText(CONST_STR.get('ERR_INPUT_START_DATE'));
    return;
  }
  if (tmpedate == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
    showAlertText(CONST_STR.get('ERR_INPUT_END_DATE'));
    return;
  }

  // var sDateVal = tmpsdate.split('/');
  // var eDateVal = tmpedate.split('/');
  // if (sDateVal[2] > eDateVal[2]) {
  //   showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_NOT_VALID_DATE'));
  //   return;
  // } else
  // if (sDateVal[2] == eDateVal[2]) {
  //   if (sDateVal[1] > eDateVal[1]) {
  //     showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_NOT_VALID_DATE'));
  //     return;
  //   } else if (sDateVal[1] == eDateVal[1]) {
  //     if (sDateVal[0] > eDateVal[0]) {
  //       showAlertText(CONST_STR.get('ERR_INPUT_EMPTY_NOT_VALID_DATE'));
  //       return;
  //     }
  //   }
  // }

  if (!debtCheckFormatDate(tmpsdate)) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
  };

  if (!debtCheckFormatDate(tmpedate)) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
  };

  // if (sdateTrans.value == '' || sdateTrans.value == undefined) {
  //   showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_BEGINNING_DATE")]));
  //   return;
  // };

  // if (edateTrans.value == '' || edateTrans.value == undefined) {
  //   showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_ENDING_DATE")]));
  //   return;
  // };

  if (calculateDifferentMonth(sdateTrans.value, edateTrans.value)) {
    // showAlertText(CONST_STR.get("TRANS_PERIODIC_END_DATE_LESS_TO_DATE"));
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return;
  }
  // if (!calculateDifferentMonth(strCurrentDate, sdateTrans.value)) {
  //   // showAlertText(CONST_STR.get("TRANS_PERIODIC_SDATE_EDATE_LESS_CURRENT_DATE"));
  //   showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
  //   return;
  // }
  // if (!calculateDifferentMonth(strCurrentDate, edateTrans.value)) {
  //   // showAlertText(CONST_STR.get("TRANS_PERIODIC_SDATE_EDATE_LESS_CURRENT_DATE"));
  //   showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
  //   return;
  // }


  searchData.pageId = 1;
  gTrans.sequence_id = "2";
  gTrans.idtxn = "T00";
  gTrans.typeacct = gacctype;
  gTrans.frequency = gFreqMNG;
  gTrans.datstart = sdateTrans.value;
  gTrans.datend = edateTrans.value;
  gTrans.codstatus = sttID;
  gTrans.accdeb = searchData.accdeb;
  gTrans.pageSize = searchData.pageSize;
  gTrans.pageId = searchData.pageId;

  console.log("gTrans", gTrans);
  var args = new Array();
  args.push("2");
  args.push(gTrans);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_USER_CREATED_TRANSACTION'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestResultServiceSuccess, requestResultServiceFail);
}

function requestResultServiceSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp); //store response
  if (gprsResp.respCode == 0 && gprsResp.respJsonObj.length > 0) {
    var obj = gprsResp.respJsonObj;
    respData = gprsResp.respJsonObj;

    // GEN XML DE TAO TABLE
    var xmlDoc = genXMLListTrans(obj);
    totalPages = getTotalPages(gprsResp.respJsonObj.length);
    console.log("gprsResp.respJsonObj.length", gprsResp.respJsonObj.length);

    var xslDoc = getCachePageXsl("corp/transfer/periodic/transfer-periodic-list-result");
    genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
      document.getElementById("tblContent").innerHTML = oStr;
      genPagging(totalPages, searchData.pageId);
    });
  } else {
    // showAlertText((CONST_STR.get("ALERT_ACC_HISTORY_EMPTY")));
    document.getElementById("tblContent").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
  };

}

function requestResultServiceFail(e) {
  //navController.initWithRootView('account/account-scr', true);
  var tmpPageName = navController.getDefaultPage();
  var tmpPageType = navController.getDefaultPageType();
  navController.initWithRootView(tmpPageName, true, tmpPageType);
};

function genXMLListTrans(pJson) {
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('transTable', '', docXml);
  var childNode;
  var rowNode;
  var transList = pJson;

  var tmp = (searchData.pageId - 1) * rowsPerPage;

  for (var i = tmp; i < tmp + rowsPerPage; i++) {

    if (typeof transList[i] != "undefined") {
      var signnedBy = transList[i].SIGNEDBY;
      var status = transList[i].CODSTATUS;

      rowNode = createXMLNode('rows', '', docXml, rootNode);
      childNode = createXMLNode('stt', i + 1, docXml, rowNode);
      childNode = createXMLNode('dateMaker', transList[i].DATMAKE, docXml, rowNode);
      childNode = createXMLNode('amount', formatNumberToCurrency(transList[i].NUMAMOUNT), docXml, rowNode);
      childNode = createXMLNode('name', transList[i].CUSTOMER_NAME1, docXml, rowNode);
      childNode = createXMLNode('status', CONST_STR.get('TRANS_STATUS_' + transList[i].CODSTATUS), docXml, rowNode);
      childNode = createXMLNode('approver', transList[i].SIGNEDBY, docXml, rowNode);
      childNode = createXMLNode('endDate', transList[i].DATEND, docXml, rowNode);
      // childNode = createXMLNode('transId', transList[i].IDFCATREF, docXml, rowNode);
      childNode = createXMLNode('transId', transList[i].IDFCATREF_VIEW, docXml, rowNode);
      childNode = createXMLNode('idx', i, docXml, rowNode);
    };
  }
  return docXml;
}


// Click ma IDFCATREF
function showTransferDetail(idx) {
  var data = {};
  var arrayArgs = new Array();
  var obj = new Object();

  gTrans.sequence_id = "3";
  gTrans.idtxn = "T00";
  gTrans.idFcatref = respData[idx].IDFCATREF;
  gTrans.idUserReference = respData[idx].IDUSERREFERENCE;
  gTrans.currentSTT = respData[idx].CODSTATUS;


  var args = new Array();
  args.push("3");
  args.push(gTrans);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_USER_CREATED_TRANSACTION'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, resquestTransferDetailSuccess, resquestTransferDetailFail);
}

function resquestTransferDetailSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp);
  console.log("gprsResp.respJsonObj ", gprsResp.respJsonObj.Details);
  console.log("gprsResp.respJsonObj ", gprsResp.respJsonObj.Data);
  if (gprsResp.respCode == 0) {
    var obj = gprsResp.respJsonObj.Details;
    // if (gTrans.currentSTT == 'PFC') {
    //   // gTrans.xmlRequest = gprsResp.respJsonObj.Data.Xml;
    //   gTrans.newIdfcatRef = gprsResp.respJsonObj.Data.newIdCatref;
    //   gTrans.newIdUserRef = gprsResp.respJsonObj.Data.newIdUserRef;
    // }

    genReviewScreen(obj);
  } else {
    showAlertText((CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST")));
  };
}

function resquestTransferDetailFail(e) {

}

function genReviewScreen(obj) {
  var docXml = createXMLDoc();
  //root node 
  var tmpXmlRootNode = createXMLNode('review', '', docXml);
  //review/reviewtitle //screen title
  // var tmpXmlNodeInfo = createXMLNode('reviewtitle', CONST_STR.get('REVIEW_TITLE_SCREEN'), docXml, tmpXmlRootNode);

  //review/reviewinfo/reviewtranstitle
  var tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  // var tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, tmpXmlNodeInfo);


  //mã giao dịch
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].IDFCATREF, docXml, tmpChildNodeAcc);

  // thời gian thực hiện
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('CREDIT_CARD_TRANSACTION_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].DATMAKE, docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfodisplay', 'review', docXml, tmpChildNodeAcc); //display or not in result

  //Ngày duyệt
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].DATCHECK, docXml, tmpChildNodeAcc);

  //Trạng thái
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_STATUS'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('TRANS_STATUS_' + obj[0].CODSTATUS), docXml, tmpChildNodeAcc);

  if (obj[0].CODSTATUS == "REJ") {
    //lý do từ chối
    var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
    var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('AUTHORIZE_TXT_REASON'), docXml, tmpChildNodeAcc);
    tmpChildNode = createXMLNode('transinfocontent', obj[0].TXTREASON, docXml, tmpChildNodeAcc);
  };

  //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, tmpXmlNodeInfo);

  //loại giao dịch
  //trans type
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_TYPE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('TRANS_TRANSFER_PERIODIC_TITLE'), docXml, tmpChildNodeAcc);

  //tài khoản chuyển
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].IDSRCACCT, docXml, tmpChildNodeAcc);

  //Số dư khả dụng
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('CRE_DEBT_SURPLUS_AVAILABEL'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj[0].BALANCE_BEFOR) + ' VND', docXml, tmpChildNodeAcc);

  //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, tmpXmlNodeInfo);

  //số tiền
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_AMOUNT'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj[0].NUMAMOUNT) + ' VND', docXml, tmpChildNodeAcc);

  //Số tài khoản nhận
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_ACC_NO'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].TXTDESTACCT, docXml, tmpChildNodeAcc);

  //Chủ tài khoản
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].CUSTOMER_NAME1, docXml, tmpChildNodeAcc);

  // Ngân hàng
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_BANK_TITLE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', 'TPBank', docXml, tmpChildNodeAcc);

  // Phí dịch vụ
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_FEE_TITLE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', '0 VND', docXml, tmpChildNodeAcc);

  // Noi dung chuyen tien
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].TXTPAYMTDETAILS1, docXml, tmpChildNodeAcc);

  // start date 
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_BEGIN_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].DATSTART, docXml, tmpChildNodeAcc);

  // end date 
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_END_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].DATEND, docXml, tmpChildNodeAcc);

  // tần suất 
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_FREQUENCY'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('CONST_TRANS_FREQUENCY_' + obj[0].TYPEFREQUENCY), docXml, tmpChildNodeAcc);

  //Quan ly nguoi thu huong
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', getTransTempInfo(obj[0].TYPE_TEMPLATE), docXml, tmpChildNodeAcc);

  //Gui Thong Bao cho nguoi duyet
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent',  CONST_STR.get("COM_NOTIFY_" + obj[0].SEND_METHOD) , docXml, tmpChildNodeAcc);

  logInfo(docXml);
  //luu xml trong cache

  setRespObjStore(obj);
  setReviewXmlStore(docXml);
  navCachedPages["corp/transfer/periodic/transfer-periodic-detail-scr"] = null;
  navController.pushToView("corp/transfer/periodic/transfer-periodic-detail-scr", true, 'xsl');
}

function showinputpage() {
  navController.initWithRootView('corp/transfer/periodic/transfer-periodic-create-scr', true, 'xsl');
}


function getTotalPages(totalRows) {
  return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
  searchData.pageId = selectedIdx;

  // GEN XML DE TAO TABLE
  var xmlDoc = genXMLListTrans(respData);

  var xslDoc = getCachePageXsl("corp/transfer/periodic/transfer-periodic-list-result");
  genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
    document.getElementById("tblContent").innerHTML = oStr;
    genPagging(totalPages, searchData.pageId);
  });

  // searchPeriodicTrans();
}

function genPagging(totalPages, pageIdx) {
  var nodepage = document.getElementById('pageIndicatorNums');
  var tmpStr = genPageIndicatorHtml(totalPages, pageIdx);
  nodepage.innerHTML = tmpStr;
}


function calculateDifferentMonth(valFromDate, valToDate) {
  var from = valFromDate.split("/");
  var to = valToDate.split("/");
  var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
  var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));

  if (fromDate > toDate) {
    return true;
  }
  return false;
}

function getTransTempInfo(templateType) {
    if (templateType == 404) {
        return CONST_STR.get("TAX_NO_SAVE_CODE");
    } else if (templateType == 0) {
        return CONST_STR.get("COM_SAVE_BENEFICIARY");
    } else if (templateType == 1) {
        return CONST_STR.get("COM_SAVE_TEMPLATE_TRANS");
    }
}

// check format tai cac truong nhap thoi gian
function debtCheckFormatDate(dataCheck){
  var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if(dataCheck == '' || dataCheck == 'dd/mm/yyyy'){
    return true;
  }else{
    if(!dataCheck.match(re)){
      return false;
    }else{
      return true;
    }
  }
}

function sendRequestExportExcel() {
  var acctype = document.getElementById('id.acctype'); //loai giao dich
  var accdeb = document.getElementById('id.accountno'); //userid
  var stt = document.getElementById('id.stt'); //stt
  var freq = document.getElementById('id.freq'); //tan suat
  var sdateTrans = document.getElementById('id.begindate');
  var edateTrans = document.getElementById('id.mngenddate');


  gTrans.sequenceId = "12";
  gTrans.idtxn = "T00";
  gTrans.typeacct = gacctype;
  gTrans.frequency = gFreqMNG;
  gTrans.datstart = sdateTrans.value;
  gTrans.datend = edateTrans.value;
  gTrans.codstatus = sttID;
  gTrans.accdeb = searchData.accdeb;
  gTrans.pageSize = searchData.pageSize;
  gTrans.pageId = searchData.pageId;

  var arrayClientInfo = new Array();
  arrayClientInfo.push(2);
  arrayClientInfo.push(gTrans);

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
  data = getDataFromGprsCmd(gprsCmd);
  corpExportExcel(data);
}
