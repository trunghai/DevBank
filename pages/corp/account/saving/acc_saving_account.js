var gprsResp = new GprsRespObj("", "", "", "");
var transactionId;
var sequenceId;
var destAccount;
var listDurationInfo;
var tenorPostChoosen;
var provisionalRate, startDate, endDate;
var data = {};
var objJSON;
var rateInterest;
var flag = true;
var dueType;

function loadInitXML() {

  return '';
}


function viewBackFromOther() {
  flag = false;
}

function viewDidLoadSuccess() {
  disableAccountField();
  document.getElementById("id.accountno2").disabled = true;
  if (flag) {
    //edit ctk41
    var isIPad = navigator.userAgent.match(/iPad/i);
    if (isIPad) keyboardEvent();
  } else {
    console.log("dueType");
    if (dueType == 1) {
      document.getElementById("radio1").checked = true;
      disableAccountField();
    } else if (dueType == 2) {
      document.getElementById("radio2").checked = true;
      enableAccountField();
    } else if (dueType == 3) {
      document.getElementById("radio3").checked = true;
      enableAccountField();
    };
  };
  //lay ki han gui, lai suat tien gui
  init();
  genSequenceForm();

}

function init() {
  angular.module("EbankApp").controller("acc-saving-account", function ($scope, requestMBServiceCorp) {
    sendRequestTenorPost();
    function sendRequestTenorPost() {
      sequenceId = 1;
      var args = ["", {
        sequenceId: sequenceId,
        idtxn: "A13"
      }];
      var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_MENU_ACCOUNT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
      data = getDataFromGprsCmd(gprsCmd);
      requestMBServiceCorp.post(data, requestMBServiceSuccess, requestMBServiceFail);
    }

    $scope.sendJSONRequest = function () {
      var sourceAccount = document.getElementById("id.accountno").value;
      var transAmount = removeSpecialChar(document.getElementById("trans.amount").value);
      var tenorPost = document.getElementById("id.payee").value; //ki han gui
      var destAccountChoosen = document.getElementsByName("maturityDirective");

      for (var i = 0; i < destAccountChoosen.length; i++) {
        if (destAccountChoosen[i].checked) {
          if (i == 0) {
            dueType = "1";
            destAccount = sourceAccount;
          } else if (i == 1) {
            if (document.getElementById("id.accountno2").value == CONST_STR.get('ESAVING_BGN_CHOICE')) {
              showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("ESAVING_LABLE_COMBO_REN")]));
              return;
            }
            destAccount = document.getElementById("id.accountno2").value;
            dueType = "2";
          } else if (i == 2) {
            if (document.getElementById("id.accountno2").value == CONST_STR.get('ESAVING_BGN_CHOICE')) {
              showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("ESAVING_LABLE_COMBO_REN")]));
              return;
            }
            destAccount = document.getElementById("id.accountno2").value;
            dueType = "3";
          }
        }

      }
      if (sourceAccount == CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER')) {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ACCOUNT_NUMBER")]));
        return;
      }
      if (transAmount === null || transAmount == '') {
        showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_NUM_MONEY_SAVING")]));
        return;
      }
      if (gAccount.tenorPost == null || gAccount.tenorPost == undefined || tenorPost == CONST_STR.get('COM_TXT_DEADLINE_SEND_SELECTION_PLACEHOLDER')) {
        showAlertText(CONST_STR.get("E_ACCOUNT_TENOR_POST"));
        return;
      }

      //kiem tra so tien vuot qua so du kha dung 
      if (parseInt(transAmount) > parseInt(getBalanceAccount())) {
        showAlertText(CONST_STR.get("COM_ACC_BLC_NOT_ENOUGH"));
        return;
      }

      //kiem tra han muc giao dich
      if (checkLimitTransInit(parseInt(transAmount))) {
        return;
      }

      var idtxn = "A13";
      sequenceId = "2";
      var objectValueClient = new Object();
      objectValueClient.idtxn = "A13";;
      objectValueClient.sequenceId = "2";
      objectValueClient.sourceAccount = sourceAccount;
      objectValueClient.transAmount = transAmount;
      objectValueClient.tenorPosts = gAccount.tenorPost;

      objectValueClient.destAccount = destAccount;
      objectValueClient.dueType = dueType;
      objectValueClient.duration = gAccount.durationCode;
      objectValueClient.rate = keepOnlyNumber(rateInterest);

      var arrayClientInfo = new Array();
      arrayClientInfo.push("2");
      arrayClientInfo.push(objectValueClient);

      var amount = removeSpecialChar(document.getElementById("trans.amount").value);
      if (validateValueClient(amount, tenorPostChoosen)) {

      } else {
        var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_MENU_ACCOUNT'), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
        data = getDataFromGprsCmd(gprsCmd);
        objJSON = data;
        requestMBServiceCorp.post(data, requestMBServiceSuccess, requestMBServiceFail);
      }

    }

  });
  angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}

function compareCurrentTime() {
  var date = new Date();
  return (date.getHours() > 16 || (date.getHours == 16 && date.getMinutes() > 30));
}

//lay du lieu ki han gui db
function sendRequestGetTenorPost() {

}

function viewWillUnload() {}


function showAccountSelection() {
  var tmpArray1 = [];
  var tmpArray2 = [];
  for (var i = 0; i < gAccount.listAccount.length; i++) {
    var tmpAcc = gAccount.listAccount[i];
    tmpArray1.push(tmpAcc.account);
    tmpArray2.push(tmpAcc.balance + ' VND');
  }

  document.addEventListener("evtSelectionDialog", handleSelectionAccountList, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);

  showDialogList(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), tmpArray1, tmpArray2, true);
}

function showAccountSelection2() {
  if (document.getElementById("radio1").checked != true) {
    var tmpArray1 = [];
    var tmpArray2 = [];
    for (var i = 0; i < gUserInfo.accountList.length; i++) {
      var tmpAcc = gUserInfo.accountList[i];
      if (tmpAcc.noReceive == 'N') {
        tmpArray1.push(tmpAcc.accountNumber);
        tmpArray2.push(formatNumberToCurrency(tmpAcc.balanceAvailable) + ' VND');
      }
    }

    document.addEventListener("evtSelectionDialog", handleSelectionAccountList2, false);
    document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose2, false);

    showDialogList(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), tmpArray1, tmpArray2, true);
  }
}


function handleInputAmount(e, des) {
  var tmpVale = des.value;
  formatCurrency(e, des);
  var numStr = convertNum2WordWithLang(keepOnlyNumber(tmpVale), gUserInfo.lang);

  var nodeNumTxt = document.getElementById("trans.amounttotext");

  nodeNumTxt.innerHTML = "<div class='txtmoneystyle'>" + CONST_STR.get('TRANS_LOCAL_NUM_TO_WORD') + ": " + numStr + "</div>";
}

function validateValueClient(amount, tenorPosts) {
  if (amount < 1000000) {

    showAlertText(CONST_STR.get('E_ACCOUNT_NUMBER_MONEY'));
    return true;
  }
  if (tenorPosts == null || tenorPosts == undefined) {
    showAlertText(CONST_STR.get('E_ACCOUNT_TENOR_POST'));
    return true;
  }
  return false;
}

//event listener: http request success
//sever -> client return success
function requestMBServiceSuccess(e) {
  gprsResp = JSON.parse(JSON.stringify(e));

  if (gprsResp.respCode == "0") {
    if (sequenceId == "1") {
      var obj = gprsResp.respJsonObj;
      var limit = obj.limit;
      var duration = obj.duration;
      var rate = obj.rate;
      gAccount.listAccount = obj.listAccount;

      gAccount.listDurationName = new Array();
      gAccount.listDurationCode = new Array();

      gAccount.limitTime = parseInt(limit.limitTime);
      gAccount.limitDay = parseInt(limit.limitDay);
      gAccount.totalDay = parseInt(limit.totalDay);
      gAccount.currency = limit.currency;

      for (var i = 0; i < duration.length; i++) {
        gAccount.listDurationName.push(duration[i].DURNAME);
        gAccount.listDurationCode.push(duration[i].DURCODE);
      }


      gAccount.durationVn = [];
      gAccount.durationEng = [];
      gAccount.durationRate = [];

      //lay bang lai suat
      for (var i = 0; i < rate.length; i++) {
        gAccount.durationVn.push(rate[i].tenKyHan);
        gAccount.durationEng.push(rate[i].tenKyHan);
        gAccount.durationRate.push(rate[i].giaTriKyHan + "%");
      }

      // thiet lap thong tin 
      document.getElementById("id.notifyTo").value = CONST_STR.get('COM_NOTIFY_' + gprsResp.respJsonObj.method);
    } else {
      try {
        var arguments = (JSON.parse(e)).arguments;
        transactionId = (JSON.parse(arguments)).transactionId;
      } catch (err) {

      }
      setRespObjStore(gprsResp); //store response
      genReviewScreen();
    }
  }
}

//event listener: http request fail
function requestMBServiceFail() {

};


function handleSelectionAccountList(e) {
  handleSelectionAccountListClose();
  setValueAccount(e, "id.accountno");
  var nodeAccBal = document.getElementById("trans.sourceaccoutbalance");
  if (e.selectedValue2 != undefined) {
    nodeAccBal.innerHTML = "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + e.selectedValue2 + "</div>";
  }
}

function handleSelectionAccountList2(e) {
  handleSelectionAccountListClose2();
  setValueAccount(e, "id.accountno2");
}

function setValueAccount(selectedAccount, name) {
  try {
    if (selectedAccount.selectedValue1 != undefined && selectedAccount.selectedValue1 != null) {
      var account = document.getElementById(name);
      if (account.nodeName == "INPUT") {
        account.value = selectedAccount.selectedValue1;
      } else {
        account.innerHTML = selectedAccount.selectedValue1;
      }
    }

  } catch (err) {
    console.log("function selectedAccount error !!!");
  }
}

function handleSelectionAccountListClose(e) {
  document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
  document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);
}


function handleSelectionAccountListClose2(e) {
  document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose2, false);
  document.removeEventListener("evtSelectionDialog", handleSelectionAccountList2, false);
}


function genReviewScreen() {
  var obj = (gprsResp.respJsonObj)[0];

  //get data from client  
  var sourceAccount = document.getElementById("id.accountno").value;
  var transAmount = document.getElementById("trans.amount").value;
  var tenorPosts = document.getElementById("id.payee").value; //ki han gui
  var destAccount = document.getElementById("id.accountno2").value;
  var arrDayEnd = (document.getElementById("id.payee").value).split(" ");

  var dueType = obj.DUETYPE; //lua chon 1, 2 ha 3
  var announce;
  if (dueType == 1) {

    //chuyen goc va lai sang ki han moi
    announce = CONST_STR.get("COM_INTEREST_MOVING_INTO_NEW_TERM");
  } else if (dueType == 2) {

    //chuyen goc sang ki han moi, lai chuyen v
    announce = CONST_STR.get("ACC_MOVING_TERM_ROOT") + " " + destAccount;
  } else if (dueType == 3) {
    announce = CONST_STR.get("ACC_FINALIZE_OF_PRINCIPAL") + " " + destAccount;
  }

  //so du kha dung
  var balance = 0;
  for (var idx = 0; idx < gUserInfo.accountList.length; idx++) {
    var tmpAcc = new AccountObj();
    tmpAcc = gUserInfo.accountList[idx];
    if (tmpAcc.accountNumber == sourceAccount) {
      balance = tmpAcc.balanceAvailable;
      break;
    }
  }

  //lai suat tirn gui
  if (gAccount.rate == null || gAccount.rate == undefined) {
    gAccount.rate = "";
  }

  var docXml = createXMLDoc();
  var rootNode = createXMLNode('review', '', docXml);

  //thong tin chung
  var listValueAccount = [
    [CONST_STR.get("COM_TYPE_TRANSACTION"), CONST_STR.get("ACC_SEND_MONEY_ONLINE")],
    [CONST_STR.get("COM_ACCOUNT_DEDUCT_MONEY"), sourceAccount], //tai khoan trich tien
    [CONST_STR.get("ACCOUNT_AVAILABLE_BALANCE"), formatNumberToCurrencyWithSymbol(balance, " " + "VND")],
    [CONST_STR.get("E_ACCOUNT_BALANCE_DEDUCT_MONEY"), formatNumberToCurrencyWithSymbol((balance - removeSpecialChar(transAmount)), " " + "VND")]
  ];
  var listValueTransaction = [
    [CONST_STR.get("COM_NUM_MONEY_SAVING"), formatNumberToCurrencyWithSymbol(transAmount, " VND")], //so tien gui
    [CONST_STR.get("COM_PERIOD"), tenorPosts], //ki han gui
    [CONST_STR.get("ACCOUNT_PERIOD_DATESTART"), obj.VALUE_DATE], //ngay gui
    [CONST_STR.get("COM_EXPIRE_DATE"), obj.VALUE_END_DATE], //ngay dao han
    [CONST_STR.get("COM_INTEREST"), rateInterest], //
    [CONST_STR.get("ACC_PROFITS_INTERIM"), formatNumberToCurrencyWithSymbol(obj.B, "  VND")], //lai tam tinh
    [CONST_STR.get("COM_ANNOUNCE_DEADLINE"), announce],
    [CONST_STR.get("COM_SEND_MSG_APPROVER"), document.getElementById("id.notifyTo").value]
  ];

  createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listValueAccount, docXml, rootNode);
  createDateNodeReview(CONST_STR.get("COM_TRASACTION_INFO"), listValueTransaction, docXml, rootNode);

  createButtonNode("cancel", CONST_STR.get('REVIEW_BTN_CANCEL'), docXml, rootNode);
  createButtonNode("back", CONST_STR.get('REVIEW_BTN_BACK'), docXml, rootNode);
  createButtonNode("authorize", CONST_STR.get('REVIEW_BTN_NEXT'), docXml, rootNode);

  //du lieu gui len man hinh cuoi cung
  var req = {
    sequenceId: "3",
    transactionId: transactionId,
    idtxn: 'A13'
  };
  gCorp.cmdType = CONSTANTS.get("CMD_MENU_ACCOUNT"); //port
  gCorp.requests = [req, null];

  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');

}


function createDateNodeReview(title, listValue, docXml, rootNode) {
  var sectionNode = createXMLNode('section', '', docXml, rootNode);
  var titleNode = createXMLNode('title', title, docXml, sectionNode);
  for (var i = 0; i < listValue.length; i++) {
    var obj = listValue[i];
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', obj[0], docXml, rowNode);
    valueNode = createXMLNode('value', obj[1], docXml, rowNode);
  }

}

function createButtonNode(type, name, docXml, rootNode) {
  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', type, docXml, buttonNode);
  btnLabelNode = createXMLNode('label', name, docXml, buttonNode);
}



function showInputMNG() {
  var tmpArray1 = gAccount.listDurationName;
  var tmpArray2 = gAccount.listDurationCode;
  var tmpArray3 = gAccount.durationRate;
  document.addEventListener("evtSelectionDialog", handleInputMNG, false);
  document.addEventListener("evtSelectionDialogClose", handleInputMNGClose, false);
  showDialogListWith4Arr(CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT'), tmpArray1, tmpArray2, tmpArray3, '', false);
}

function handleInputMNG(e) {
  console.log("XXX");
  document.removeEventListener("evtSelectionDialog", handleInputMNG, false);

  if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
    var mnglist = document.getElementById('id.payee');
    if (mnglist.nodeName == "INPUT") {
      mnglist.value = e.selectedValue1;
      tenorPostChoosen = e.selectedValue1;
      gAccount.tenorPost = e.selectedValue1;
    } else {
      mnglist.innerHTML = e.selectedValue1;
    }

  }

  if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
    gAccount.rate = e.selectedValue2;
    var dataChoose = e.selectedValue2.split("/");
    gAccount.durationCode = dataChoose[0];
    document.getElementById("id.interest").innerHTML = dataChoose[1];
    rateInterest = dataChoose[1];
  }
}

function handleInputMNGClose() {
  document.removeEventListener("evtSelectionDialogClose", handleInputMNGClose, false);
  document.removeEventListener("evtSelectionDialog", handleInputMNG, false);
}


function genSequenceForm() {
  var tmpXslDoc = getCachePageXsl("sequenceform");
  var tmpStepNo = 301;
  setSequenceFormIdx(tmpStepNo);
  var docXml = createXMLDoc();
  var tmpXmlRootNode = createXMLNode('seqFrom', '', docXml);
  var tmpXmlNodeInfo = createXMLNode('stepNo', tmpStepNo, docXml, tmpXmlRootNode);
  //gen html string
  genHTMLStringWithXML(docXml, tmpXslDoc, function(oStr) {
    var tmpNode = document.getElementById('seqForm');
    if (tmpNode != null) {
      tmpNode.innerHTML = oStr;
    }
  });
}


function showRate() {
  var tmpArray1 = chooseArrayInputDiaglog(gAccount.durationEng, gAccount.durationVn);
  var tmpArray2 = gAccount.durationRate;
  showDialogList(CONST_STR.get('ACC_SEE_DOCUMENT_RATE'), tmpArray1, tmpArray2, true);
}

//tro ve man hinh truoc
function goBackClick() {

  navCachedPages["corp/account/saving/acc_saving_account"] = null;
  navController.initWithRootView('corp/account/list_info/acc_list_account_info', true, 'xsl');
}

//tro ve man hinh truoc
function cancelClick() {

  navCachedPages["corp/account/saving/acc_saving_account"] = null;
  navController.initWithRootView('corp/account/list_info/acc_list_account_info', true, 'xsl');
}

//chon loai input dau vao qua ngon ngu
function chooseArrayInputDiaglog(inputArrayEnglish, inputArrayVN) {
  var result = (gUserInfo.lang == 'EN') ? inputArrayEnglish : inputArrayVN;
  return result;
}

function showReceiverList() {
  if (document.getElementById("radio1").checked) {
    dueType = "1";
  } else if (document.getElementById("radio2").checked) {
    dueType = "2";
  } else if (document.getElementById("radio3").checked) {
    dueType = "3";
  }

  navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}

//ham lay so du kha dung
function getBalanceAccount() {
  var sourceAccount = document.getElementById("id.accountno").value;
  var balance = 0;
  for (var idx = 0; idx < gUserInfo.accountList.length; idx++) {
    var tmpAcc = new AccountObj();
    tmpAcc = gUserInfo.accountList[idx];
    if (tmpAcc.accountNumber == sourceAccount) {
      balance = tmpAcc.balanceAvailable;
      break;
    }
  }
  return balance;
}

//check han muc giao dich khoi tao
function checkLimitTransInit(numnAmount) {
  if (numnAmount > parseInt(gAccount.limitTime)) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), [formatNumberToCurrency(gAccount.limitTime)]));
    return true;
  }
  if (parseInt(gAccount.totalDay) + numnAmount > parseInt(gAccount.limitDay)) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), [formatNumberToCurrency(gAccount.limitDay)]));
    return true;
  }
  // if((numnAmount > gAccount.limitTime) || 
  // (gAccount.totalDay + numnAmount > gAccount.limitDay)){
  //     return true;
  // }
  return false;
}

/**
 * Set check cho radio khi click vao text kem boi dam text
 **/
function checkedRadioAnno1() {
  var radioChecked1 = document.getElementById("radio1");
  radioChecked1.checked = true;
  document.getElementById("lblRadio1").style.fontWeight = "bold";
  document.getElementById("lblRadio2").style.fontWeight = "normal";
  document.getElementById("lblRadio3").style.fontWeight = "normal";
  document.getElementById("id.accountno2").value = CONST_STR.get("ESAVING_BGN_CHOICE");
  disableAccountField();
}

function checkedRadioAnno2() {
  var radioChecked2 = document.getElementById("radio2");
  radioChecked2.checked = true;
  document.getElementById("lblRadio1").style.fontWeight = "normal";
  document.getElementById("lblRadio2").style.fontWeight = "bold";
  document.getElementById("lblRadio3").style.fontWeight = "normal";
  enableAccountField();
}

function checkedRadioAnno3() {
  var radioChecked3 = document.getElementById("radio3");
  radioChecked3.checked = true;
  document.getElementById("lblRadio1").style.fontWeight = "normal";
  document.getElementById("lblRadio2").style.fontWeight = "normal";
  document.getElementById("lblRadio3").style.fontWeight = "bold";
  enableAccountField();
}

function disableAccountField() {
  var elements = document.getElementsByClassName("accToggleField");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.style.backgroundColor = "#eee";
  }
  document.getElementById("id.accountno2").disabled = true;
}

function enableAccountField() {
  var elements = document.getElementsByClassName("accToggleField");
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    element.style.backgroundColor = "#FAFAFA";
  }
  document.getElementById("id.accountno2").disabled = false;
}
