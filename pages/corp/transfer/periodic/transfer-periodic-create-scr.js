var transType;
var freq;
var mngPayee;
var moneyBalance;
var sourceAcc;
// var desNum;
var flag = true;
var limit = {};
// var listAcc = [];
// var balance = [];

var custAccInfo = [];

function viewBackFromOther() {
  flag = false;
}

function viewDidLoadSuccess() {
  //check language cua user de dua ra ngon ngu thich hop
  if (flag) {
    if (gUserInfo.lang == 'EN') {
      document.getElementById('mng.payee').value = CONST_VAL_PAYEE_NOT_TEMPLATE_EN[0];
      document.getElementById('trans.type.trans').value = CONST_KEY_PERIODIC_LOCAL_BN_EN[1];
      document.getElementById('trans.frequency').value = CONST_KEY_PERIODIC_FREQUENCY_EN[2];
      freq = CONST_KEY_PERIODIC_FREQUENCY_VALUE[2];
      mngPayee = CONST_VAL_PAYEE_NOT_TEMPLATE[0];
      transType = 'T14';

    } else {
      document.getElementById('mng.payee').value = CONST_VAL_PAYEE_NOT_TEMPLATE_VN[0];
      document.getElementById('trans.type.trans').value = CONST_KEY_PERIODIC_LOCAL_BN_VN[1];
      document.getElementById('trans.frequency').value = CONST_KEY_PERIODIC_FREQUENCY_VN[2];
      freq = CONST_KEY_PERIODIC_FREQUENCY_VALUE[2];
      mngPayee = CONST_VAL_PAYEE_NOT_TEMPLATE[0];
      transType = 'T14';
      console.log("transType", transType);
    }

    //Lay Gui thong bao cho nguoi duyet
    //getSendMethod();

    

    var tmpAccNo = document.getElementById('trans.desaccount');
    tmpAccNo.parentNode.setAttribute('onClick', '');
    tmpAccNo.setAttribute('class', 'form-control form-control-righttext-datepicker');
    tmpAccNo.setAttribute('type', 'tel');
    tmpAccNo.value = '';
    var tmpNodeMng = document.getElementById('trans_mng_payee');
    tmpNodeMng.style.display = 'table-row';
    tmpNodeMng.disabled = '';

    document.getElementById('span.trans.target').style.display = '';
    document.getElementById('id.next.icon').style.display = 'none';

    // tao calendar
    createDatePicker('trans.begindate', 'span.begindate');
    createDatePicker('trans.enddate', 'span.enddate');
  };
 // getSendMethod();

   //Action gui thong bao cho nguoi duyet
   gTrans.sequence_id = "1";
   gTrans.idtxn = "T14";

  var args = new Array();
  args.push("1");
  args.push(gTrans);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);

   angular.module("EbankApp").controller('transfer-periodic',  function ($scope, requestMBServiceCorp) {
        this.onSuccessInitData = function(data) {
            var resp = data;
            console.log("resp.respJsonObj ", resp.respJsonObj.getSendMethod);
            if (resp.respJsonObj.getSendMethod == 0) {
              document.getElementById("trNotify").style.display = "none";
            }

            document.getElementById("id.notifyTo").value = CONST_STR.get("COM_NOTIFY_" + resp.respJsonObj.getSendMethod);


            limit = resp.respJsonObj.limit;

            if (resp.respJsonObj.listAccount.length > 0) {
              for (var i = 0; i < resp.respJsonObj.listAccount.length; i++) {
                custAccInfo.push(resp.respJsonObj.listAccount[i]);
              };
            } else {
              showAlertText(CONST_STR.get("CORP_MSG_ERROR_GET_BUSINESS_INFO"));
            };
        }

        this.onFailInitData = function(){
        showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
        gotoHomePage();
      }

      requestMBServiceCorp.post(data, this.onSuccessInitData, this.onFailInitData);           


      //Action when click continue
      $scope.sendJSONRequest = function(){
        if (transType == '' || transType == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANSFER_REMITTANCE_SELECT_TYPE")]));
          return;
        };

        if (sourceAcc == '' || sourceAcc == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_BATCH_ACC_LABEL")]));
          return;
        };

        var desNum = document.getElementById("trans.desaccount").value;
        if (desNum == '' || desNum == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("ACCOUNT_FINALIZE_DTL_GOAL_ACC")]));
          return;
        };

        var amount = removeSpecialChar(document.getElementById("trans.amount").value);
        console.log("amount", amount);
        if (amount == '' || amount == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_AMOUNT")]));
          return;
        };

        if (transType == 'T14') {
          if (parseInt(amount) > parseInt(limit.limitTime)) {
            showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), [formatNumberToCurrency(limit.limitTime)]));
            return;
          }

          if ((parseInt(amount) + parseInt(limit.totalDay)) > parseInt(limit.limitDay)) {
            showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), [formatNumberToCurrency(limit.limitDay)]));
            return;
          }
        };

        var content = document.getElementById("trans.content").value;
        if (content == '' || content == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ERROR_DESC")]));
          return;
        };

        var startDate = document.getElementById("trans.begindate").value;
        if (startDate == '' || startDate == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_BEGINNING_DATE")]));
          return;
        };

        var endDate = document.getElementById("trans.enddate").value;
        if (endDate == '' || endDate == undefined) {
          showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_ENDING_DATE")]));
          return;
        };

        var srcAcc = document.getElementById("id.accountno").value;
        if (srcAcc == desNum) {
          showAlertText(CONST_STR.get("CORP_MSG_ERROR_SRC_DES_SAME"));
          return;
        };

        if (desNum.length != 11) {
          showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_ACC'));
          return;
        }

        if (document.getElementById("trans.targetaccountname").innerHTML == "") {
          showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_DES_ACC'));
          return;
        };

        // kiem tra tai khoan 
        var tempDes = desNum.substr(0, 8);
        var tempSrc = srcAcc.substr(0, 8);

        if (transType == 'T15') {
          if (tempDes != tempSrc || (desNum == srcAcc)) {
            showAlertText(CONST_STR.get('TRANSFER_ERROR_EQUAL_MSG'));
            return;
          }
        } else if (transType == 'T14') {
          if (tempDes == tempSrc) {
            showAlertText(CONST_STR.get('TRANS_PERIODIC_DES_ACC_NOT_VALID'));
            return;
          }
        }              

        var currentDate = new Date();
        var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

        if (calculateDifferentMonth(startDate, endDate)) {
          showAlertText(CONST_STR.get("TRANS_PERIODIC_END_DATE_LESS_TO_DATE"));
          return;
        }
        if (!calculateDifferentMonth(endDate, strCurrentDate)) {
          showAlertText(CONST_STR.get("TRANS_PERIODIC_COMPARE_DATE"));
          return;
        }
        if (!calculateDifferentMonth(startDate, strCurrentDate)) {
          showAlertText(CONST_STR.get("TRANS_PERIODIC_COMPARE_DATE"));
          return;
        }
       
        gTrans.sequence_id = "2";
        gTrans.srcAcc = document.getElementById("id.accountno").value;
        gTrans.typeTrans = transType;
        gTrans.idtxn = transType;
        gTrans.desAcc = document.getElementById("trans.desaccount").value;
        gTrans.amount = removeSpecialChar(document.getElementById("trans.amount").value);
        gTrans.content = document.getElementById("trans.content").value.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
        gTrans.frequency = freq;
        gTrans.startDate = document.getElementById("trans.begindate").value;
        gTrans.endDate = document.getElementById("trans.enddate").value;
        gTrans.payee = mngPayee;
        gTrans.beneName = document.getElementById("trans.targetaccountname").innerHTML;
        gTrans.sendMethod = document.getElementById("id.notifyTo").value;
        
        var args = new Array();
        args.push("2");
        args.push(gTrans);
        var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
        var data = getDataFromGprsCmd(gprsCmd);


        //Action when request init trans success
        this.requestNextSuccess = function(data) {
          var resp = data;        
          if (resp.respCode == '0') {
            var xmlDoc = genXMLReviewSrc();
            setReviewXmlStore(xmlDoc);

            var request = {
              sequence_id: "3",
              idFcatref: resp.respJsonObj,
              idtxn: transType,
              payee: mngPayee
            };

            gCorp.cmdType = CONSTANTS.get("CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER");
            gCorp.requests = [null, request];
            navCachedPages["corp/common/review/com-review"] = null;
            navController.pushToView("corp/common/review/com-review", true, 'xsl');;

          } else {
                showAlertText(resp.respContent);
            }
        }

        this.requstNextFail = function(){
          showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_INIT_TRANS'));
        }

        requestMBServiceCorp.post(data, this.requestNextSuccess, this.requstNextFail);  

      }
       
    }); 

  // Start app
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}



// Show tài khoản chuyển tiền
function showAccountSelection() {
  if (custAccInfo.length == 0) {
    showAlertText(CONST_STR.get('ERR_INPUT_NOT_ENOUGH_ACC'));
    return;
  }

  var listAcc = [];
  var balance = [];

  for (var i = 0; i < custAccInfo.length; i++) {
    if (custAccInfo[i].ghiNo == 'N') {
      listAcc.push(custAccInfo[i].account);
      balance.push(custAccInfo[i].balance);
    };
  };

  var handleSelectionAccountList = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);

      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var tagAccNo = document.getElementById("id.accountno");
        var desAccNo = document.getElementById("trans.desaccount");
        if (tagAccNo.nodeName == "INPUT") {
          tagAccNo.value = e.selectedValue1;
          sourceAcc = e.selectedValue1;
        } else {
          tagAccNo.innerHTML = e.selectedValue1;
        }

        if (desAccNo.value == e.selectedValue1) {
          for (var i = 0; i < gUserInfo.accountList.length; i++) {
            var tmpAcc = gUserInfo.accountList[i];
            if (tmpAcc.accountNumber != desAccNo.value) {
              desAccNo.value = tmpAcc.accountNumber;
              break;
            }
          }
        }
      }

      var nodeAccBal = document.getElementById("trans.sourceaccoutbalance");
      if (e.selectedValue2 != undefined) {
        nodeAccBal.innerHTML = CONST_STR.get("COM_TXT_ACC_BALANCE_TITLE") + ": " + e.selectedValue2;
        moneyBalance = e.selectedValue2;
      }
    }
  }

  var handleSelectionAccountListClose = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
      document.removeEventListener("evtSelectionDialog", handleSelectionAccountList, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectionAccountList, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectionAccountListClose, false);
  showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), listAcc, balance, true);
}

//Loai tài khoản nhận tiền
function showInputTransferTypeAccount() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_KEY_PERIODIC_CREATE_EN : CONST_KEY_PERIODIC_CREATE_VN;
  var tmpArray2 = CONST_KEY_PERIODIC_CREATE_KEY;
  var handleInputTransferTypeAccount = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialog", handleInputTransferTypeAccount, false);
      handleInputTransferTypeAccountClose();
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var desAcc = document.getElementById('trans.type.trans');
        if (desAcc.nodeName == "INPUT") {
          desAcc.value = e.selectedValue1;
        } else {
          desAcc.innerHTML = e.selectedValue1;
        }

      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        var desAccNoVal = document.getElementById('id.value.trans.type.trans');
        transType = e.selectedValue2;

        if (transType == 'T14') {
          var tmpAccNo = document.getElementById('trans.desaccount');
          tmpAccNo.parentNode.setAttribute('onClick', '');
          tmpAccNo.setAttribute('class', 'form-control form-control-righttext-datepicker');
          tmpAccNo.setAttribute('type', 'tel');
          tmpAccNo.value = '';
          var tmpNodeMng = document.getElementById('trans_mng_payee');
          tmpNodeMng.style.display = 'table-row';
          tmpNodeMng.disabled = '';

          document.getElementById('span.trans.target').style.display = '';
          document.getElementById('id.next.icon').style.display = 'none';
          document.getElementById("trans.targetaccountname").innerHTML = "";

        } else {
          document.getElementById('span.trans.target').style.display = 'none';
          document.getElementById('id.next.icon').style.display = '';
          var tmpAccNo = document.getElementById('trans.desaccount');
          tmpAccNo.setAttribute('class', 'form-control form-control-righttext');
          tmpAccNo.parentNode.setAttribute('onClick', 'showAccOfCustomer();');
          tmpAccNo.setAttribute('type', 'button');
          var desAccNo = document.getElementById("trans.desaccount");
          var sourceAccNo = document.getElementById('id.accountno');
          desAccNo.value = CONST_STR.get('COM_TXT_SELECTION_PLACEHOLDER');

          var tmpNodeMng = document.getElementById('trans_mng_payee');
          tmpNodeMng.style.display = 'none';
          tmpNodeMng.disabled = '';
          document.getElementById("trans.targetaccountname").innerHTML = "";
        }

        if (desAccNoVal.nodeName == "INPUT") {
          transType = e.selectedValue2;
        } else {
          desAccNoVal.innerHTML = e.selectedValue2;
        }
      }
    }
  }

  var handleInputTransferTypeAccountClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialog", handleInputTransferTypeAccount, false);
      document.removeEventListener("evtSelectionDialogClose", handleInputTransferTypeAccountClose, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleInputTransferTypeAccount, false);
  document.addEventListener("evtSelectionDialogClose", handleInputTransferTypeAccountClose, false);
  showDialogList(CONST_STR.get('TRANSFER_REMITTANCE_SELECT_TYPE'), tmpArray1, tmpArray2, false);
}


function showAccOfCustomer() {
  if (custAccInfo.length == 0) {
    showAlertText(CONST_STR.get('ERR_INPUT_NOT_ENOUGH_ACC'));
    return;
  }

  var accOfCus = [];
  var blcOfCus = [];
  for (var i = 0; i < custAccInfo.length; i++) {
    var tmpListAcc = custAccInfo[i].account;
    var tmpBlc = custAccInfo[i].balance;
    if (tmpListAcc != sourceAcc && custAccInfo[i].ghiCo == 'N') {
      accOfCus.push(tmpListAcc);
      blcOfCus.push(tmpBlc);
    };
  }

  var handleSelectionAccountOfCustomer = function(e) {
    document.removeEventListener("evtSelectionDialog", handleSelectionAccountOfCustomer, false);
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var desAccountNo = document.getElementById("trans.desaccount");
        if (desAccountNo.nodeName == "INPUT") {
          desAccountNo.value = e.selectedValue1;
          // desNum = e.selectedValue1;
          loadInfoFromIdAccount();
        } else {
          desAccountNo.innerHTML = e.selectedValue1;
        }
      }
    }
  }

  var handleSelectionAccountOfCustomerClose = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialog", handleSelectionAccountOfCustomer, false);
      document.removeEventListener("evtSelectionDialogClose", handleSelectionAccountOfCustomerClose, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectionAccountOfCustomer, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectionAccountOfCustomerClose, false);
  showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), accOfCus, blcOfCus, true);
}

function showPayeePage() {
  var handleInputPayeeAccOpen = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      handleInputPayeeAccClose();
      if (e.tabSelected == 'tab1') {
        var destinationAcc = document.getElementById("trans.desaccount");
        var nodeDesAcc = document.getElementById("trans.targetaccountname");
        var obj = e.dataObject;
        destinationAcc.value = obj.customerNo;
        nodeDesAcc.innerHTML = obj.peopleName;
        // nodeDesAcc.style.display = 'block';
        statusAccNoSelect = true;
        //Load name of user
        tmpDestinationAcc = obj.customerNo;
      } else {}
    }
  }

  var handleInputPayeeAccClose = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleInputPayeeAccClose, false);
      document.removeEventListener("evtSelectionDialog", handleInputPayeeAccOpen, false);
      document.removeEventListener("onInputSelected", okSelected, false);
    }
  }

  document.addEventListener("evtSelectionDialogInput", handleInputPayeeAccOpen, false);
  document.addEventListener("evtSelectionDialogCloseInput", handleInputPayeeAccClose, false);
  document.addEventListener("onInputSelected", okSelected, false);
  //Tao dialog

  var callbackShowDialogSuccessed = function(node) {
    dialog.hiddenTab2();
  }

  gTrans.showDialogCorp = true;
  dialog = new DialogListInput(CONST_STR.get('TRANS_LOCAL_DIALOG_TITLE_ACC'), 'TH', CONST_PAYEE_LOCAL_TRANSFER);
  dialog.USERID = gCustomerNo;
  dialog.PAYNENAME = "0";
  dialog.TYPETEMPLATE = "0";
  dialog.showDialog(callbackShowDialogSuccessed, '');
}


//Format currency and pronounce to Vietnamese
// fuc vu cho nhap so tien
function handleInputAmount(e, des) {
  var tmpVale = des.value;
  formatCurrency(e, des);
  var numStr = convertNum2WordWithLang(keepOnlyNumber(tmpVale), gUserInfo.lang);
  var nodeNumTxt = document.getElementById("trans.amounttotext");
  nodeNumTxt.innerHTML = "<div class='txtmoneystyle'>" + CONST_STR.get('TRANS_LOCAL_NUM_TO_WORD') + ": " + numStr + "</div>";
}

//Chon mau thu huong trong popup
function okSelected(e) {
  tmpDestinationAcc = "";
  tmpDestinationAccName = "";
  if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
    handleInputPayeeAccClose();
    var destinationAcc = document.getElementById("trans.desaccount");
    if ((e.selectedValue != undefined) && (e.selectedValue != null) && (e.selectedValue.length > 0)) {
      destinationAcc.value = e.selectedValue;
      tmpDestinationAcc = e.selectedValue;
      statusAccNoSelect = true;
      quickSearch(tmpDestinationAcc);
    }
  }
}

// Show tần suất
function showInputFrequency() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_KEY_PERIODIC_FREQUENCY_EN : CONST_KEY_PERIODIC_FREQUENCY_VN;
  var tmpArray2 = CONST_KEY_PERIODIC_FREQUENCY_VALUE;

  var handleInputFrequency = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      handleInputFrequencyClose();
      //document.removeEventListener("evtSelectionDialog", handleInputFrequency, false);
      var frequency = document.getElementById('trans.frequency');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        if (frequency.nodeName == "INPUT") {
          frequency.value = e.selectedValue1;
        } else {
          frequency.innerHTML = e.selectedValue1;
        }
      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        freq = e.selectedValue2;
      }
    }
  }

  var handleInputFrequencyClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleInputFrequencyClose, false);
      document.removeEventListener("evtSelectionDialog", handleInputFrequency, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleInputFrequency, false);
  document.addEventListener("evtSelectionDialogClose", handleInputFrequencyClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_DIALOG_TITLE_FREQUENCY'), tmpArray1, tmpArray2, false);
}


//Chuyen sang trang quan ly
function showmngpage() {
  navController.initWithRootView('corp/transfer/periodic/transfer-periodic-mng-scr', true, 'xsl');
}


//Quan ly nguoi thu huong
function showInputMNG() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_VAL_PAYEE_NOT_TEMPLATE_EN : CONST_VAL_PAYEE_NOT_TEMPLATE_VN;
  var tmpArray2 = CONST_VAL_PAYEE_NOT_TEMPLATE;

  var handleInputMNG = function(e) {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      //document.removeEventListener("evtSelectionDialog", handleInputMNG, false);
      handleInputMNGClose();
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var mnglist = document.getElementById('mng.payee');
        if (mnglist.nodeName == "INPUT") {
          mnglist.value = e.selectedValue1;
        } else {
          mnglist.innerHTML = e.selectedValue1;
        }

      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        mngPayee = e.selectedValue2;
      }

    }
  }

  var handleInputMNGClose = function() {
    if (currentPage == "corp/transfer/periodic/transfer-periodic-create-scr") {
      document.removeEventListener("evtSelectionDialogClose", handleInputMNGClose, false);
      document.removeEventListener("evtSelectionDialog", handleInputMNG, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleInputMNG, false);
  document.addEventListener("evtSelectionDialogClose", handleInputMNGClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE_SELCT'), tmpArray1, tmpArray2, false);
}

//Xem danh sach nguoi nhan thong bao
function showReceiverList() {
  updateAccountListInfo();
  navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}


// function sendJsonRequest() {
//   if (transType == '' || transType == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANSFER_REMITTANCE_SELECT_TYPE")]));
//     return;
//   };

//   if (sourceAcc == '' || sourceAcc == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_BATCH_ACC_LABEL")]));
//     return;
//   };

//   var desNum = document.getElementById("trans.desaccount").value;
//   if (desNum == '' || desNum == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("ACCOUNT_FINALIZE_DTL_GOAL_ACC")]));
//     return;
//   };

//   var amount = removeSpecialChar(document.getElementById("trans.amount").value);
//   console.log("amount", amount);
//   if (amount == '' || amount == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_AMOUNT")]));
//     return;
//   };

//   // var sdkd = removeSpecialChar(document.getElementById('trans.sourceaccoutbalance').innerHTML)
//   // console.log("sdkd", sdkd);
//   // if ((parseInt(sdkd) - parseInt(amount) < 0)) {
//   //   showAlertText(CONST_STR.get("CORP_MSG_BALANCE_NOT_ENOUGH"));
//   //   return;
//   // };

//   if (transType == 'T14') {
//     if (parseInt(amount) > parseInt(limit.limitTime)) {
//       showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), [formatNumberToCurrency(limit.limitTime)]));
//       return;
//     }

//     if ((parseInt(amount) + parseInt(limit.totalDay)) > parseInt(limit.limitDay)) {
//       showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), [formatNumberToCurrency(limit.limitDay)]));
//       return;
//     }
//   };

//   var content = document.getElementById("trans.content").value;
//   if (content == '' || content == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ERROR_DESC")]));
//     return;
//   };

//   var startDate = document.getElementById("trans.begindate").value;
//   if (startDate == '' || startDate == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_BEGINNING_DATE")]));
//     return;
//   };

//   var endDate = document.getElementById("trans.enddate").value;
//   if (endDate == '' || endDate == undefined) {
//     showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("TRANS_PERIODIC_ENDING_DATE")]));
//     return;
//   };

//   var srcAcc = document.getElementById("id.accountno").value;
//   if (srcAcc == desNum) {
//     showAlertText(CONST_STR.get("CORP_MSG_ERROR_SRC_DES_SAME"));
//     return;
//   };

//   if (desNum.length != 11) {
//     showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_ACC'));
//     return;
//   }

//   if (document.getElementById("trans.targetaccountname").innerHTML == "") {
//     showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_DES_ACC'));
//     return;
//   };

//   // kiem tra tai khoan 
//   var tempDes = desNum.substr(0, 8);
//   var tempSrc = srcAcc.substr(0, 8);

//   if (transType == 'T15') {
//     if (tempDes != tempSrc || (desNum == srcAcc)) {
//       showAlertText(CONST_STR.get('TRANSFER_ERROR_EQUAL_MSG'));
//       return;
//     }
//   } else if (transType == 'T14') {
//     if (tempDes == tempSrc) {
//       showAlertText(CONST_STR.get('TRANS_PERIODIC_DES_ACC_NOT_VALID'));
//       return;
//     }
//   }
  
//  /* if(desAccName.indexOf('&') >= 0)
//     {
//         showAlertText(CONST_STR.get('TRANS_ERR_SYMBOL_SPECIAL'));
//         return;
//     }*/

//   var currentDate = new Date();
//   var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();

//   if (calculateDifferentMonth(startDate, endDate)) {
//     showAlertText(CONST_STR.get("TRANS_PERIODIC_END_DATE_LESS_TO_DATE"));
//     return;
//   }
//   if (!calculateDifferentMonth(endDate, strCurrentDate)) {
//     showAlertText(CONST_STR.get("TRANS_PERIODIC_COMPARE_DATE"));
//     return;
//   }
//   if (!calculateDifferentMonth(startDate, strCurrentDate)) {
//     showAlertText(CONST_STR.get("TRANS_PERIODIC_COMPARE_DATE"));
//     return;
//   }

//   console.log("strCurrentDate", strCurrentDate);
//   console.log("startDate", startDate);
//   console.log("endDate", endDate);

//   gTrans.sequence_id = "2";
//   gTrans.srcAcc = document.getElementById("id.accountno").value;
//   gTrans.typeTrans = transType;
//   gTrans.idtxn = transType;
//   gTrans.desAcc = document.getElementById("trans.desaccount").value;
//   gTrans.amount = removeSpecialChar(document.getElementById("trans.amount").value);
//   gTrans.content = document.getElementById("trans.content").value.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
//   gTrans.frequency = freq;
//   gTrans.startDate = document.getElementById("trans.begindate").value;
//   gTrans.endDate = document.getElementById("trans.enddate").value;
//   gTrans.payee = mngPayee;
//   gTrans.beneName = document.getElementById("trans.targetaccountname").innerHTML;
//   gTrans.sendMethod = document.getElementById("id.notifyTo").value;

//   console.log("gTrans", gTrans);
//   var args = new Array();
//   args.push("2");
//   args.push(gTrans);
//   var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
//   var data = getDataFromGprsCmd(gprsCmd);
//   requestMBServiceCorp(data, true, 0, requestSuccess, requestFail);
// }

function requestSuccess(e) {
  var resp = JSON.parse(e);
  console.log("resp.respJsonObj ", resp.respJsonObj);
  if (resp.respCode == '0') {
    var xmlDoc = genXMLReviewSrc();
    setReviewXmlStore(xmlDoc);

    var request = {
      sequence_id: "3",
      idFcatref: resp.respJsonObj,
      idtxn: transType,
      payee: mngPayee
    };

    gCorp.cmdType = CONSTANTS.get("CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER");
    gCorp.requests = [null, request];
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');;

  } else {
        showAlertText(resp.respContent);
    }
}

function requestFail() {

}

function genXMLReviewSrc() {

  var srcAcc = document.getElementById("id.accountno").value;
  var typeTrans = transType;
  var desAcc = document.getElementById("trans.desaccount").value;
  var amount = document.getElementById("trans.amount").value;
  var content = document.getElementById("trans.content").value;
  var frequency = freq;
  var startDate = document.getElementById("trans.begindate").value;
  var endDate = document.getElementById("trans.enddate").value;
  var payee = mngPayee;
  var sendMethod = document.getElementById("id.notifyTo").value;
  var accBalance = document.getElementById("trans.sourceaccoutbalance").value;
  var desAccName = document.getElementById("trans.targetaccountname").innerHTML;

  var xmlDoc = createXMLDoc();
  var rootNode = createXMLNode("review", "", xmlDoc);
  var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);

  var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);

  createXMLNode("title", CONST_STR.get('MENU_MONEY_DEFINE_INFO_ACCOUNT_INFO'), xmlDoc, sectionNode);

  createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get('TRANS_TRANSFER_PERIODIC_TITLE'), xmlDoc, rowNode);

  //Tai khoan chuyen
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_SOURCE_ACC_NO'), xmlDoc, rowNode);
  createXMLNode("value", srcAcc, xmlDoc, rowNode);

  //So du kha dung
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('CREDIT_CARD_AVAIL_FUNDS'), xmlDoc, rowNode);
  createXMLNode("value", moneyBalance, xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('TRANS_DETAIL_BLOCK_TITLE'), xmlDoc, sectionNode);

  //So tien
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_AMOUNT'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(amount) + " VND", xmlDoc, rowNode);

  //So tk nhan
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_ACC_NO'), xmlDoc, rowNode);
  createXMLNode("value", desAcc, xmlDoc, rowNode);

  //Chu tk nhan
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_DEST_ACCOUNT_NAME_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", desAccName, xmlDoc, rowNode);

  //Ngan Hang
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_BANK_TITLE'), xmlDoc, rowNode);
  createXMLNode("value", "TPBank", xmlDoc, rowNode);

  //Phi dich vu
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TAX_FEE'), xmlDoc, rowNode);
  createXMLNode("value", '0 VND', xmlDoc, rowNode);

  //Noi dung
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_CONTENT'), xmlDoc, rowNode);
  createXMLNode("value", content, xmlDoc, rowNode);

  //Ngay bat dau
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_BEGIN_DATE'), xmlDoc, rowNode);
  createXMLNode("value", startDate, xmlDoc, rowNode);

  //Ngay Ket Thuc
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_END_DATE'), xmlDoc, rowNode);
  createXMLNode("value", endDate, xmlDoc, rowNode);

  //Tan suat
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_FREQUENCY'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get("CONST_TRANS_FREQUENCY_" + frequency), xmlDoc, rowNode);

  //Nguoi huong thu
  // rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  // createXMLNode("label", CONST_STR.get('TRANS_PERIODIC_MGN_PAYEE'), xmlDoc, rowNode);
  // createXMLNode("value", mngPayee, xmlDoc, rowNode);

  //Send method
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('COM_SEND_MSG_APPROVER'), xmlDoc, rowNode);
  createXMLNode("value", sendMethod, xmlDoc, rowNode);

  var buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "cancel", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_CANCEL"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "back", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_BACK"), xmlDoc, buttonNode);

  buttonNode = createXMLNode("button", "", xmlDoc, rootNode);
  createXMLNode("type", "reject", xmlDoc, buttonNode);
  createXMLNode("label", CONST_STR.get("REVIEW_BTN_CONFIRM"), xmlDoc, buttonNode);
  return xmlDoc;
}

function getSendMethod() {
  gTrans.sequence_id = "1";
  gTrans.idtxn = "T14";

  var args = new Array();
  args.push("1");
  args.push(gTrans);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);

  var requestSuccess = function(e) {
    var resp = JSON.parse(e);
    console.log("resp.respJsonObj ", resp.respJsonObj.getSendMethod);
    if (resp.respJsonObj.getSendMethod == 0) {
      document.getElementById("trNotify").style.display = "none";
    }

    document.getElementById("id.notifyTo").value = CONST_STR.get("COM_NOTIFY_" + resp.respJsonObj.getSendMethod);


    limit = resp.respJsonObj.limit;

    if (resp.respJsonObj.listAccount.length > 0) {
      for (var i = 0; i < resp.respJsonObj.listAccount.length; i++) {
        custAccInfo.push(resp.respJsonObj.listAccount[i]);
      };
    } else {
      showAlertText(CONST_STR.get("CORP_MSG_ERROR_GET_BUSINESS_INFO"));
    };
  }

  function requestFail() {

  }

  requestMBServiceCorp(data, false, 0, requestSuccess, requestFail);
};

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

function loadInfoFromIdAccount() {
  var userId = document.getElementById("trans.desaccount").value;
  var jsonData = new Object();
  jsonData.sequence_id = "3";
  jsonData.idtxn = 'T12';
  jsonData.accountId = userId;
  var args = new Array();
  args.push(null);
  args.push(jsonData);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_IIT_FUNDS_LOCAL_TRANSFER"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0,
    function(data) {
      var resp = JSON.parse(data);
      if (resp.respCode == 0 && resp.respJsonObj.length > 0) {
        if (resp.respJsonObj[0].GHI_CO == 'N') {
          document.getElementById("trans.targetaccountname").innerHTML = resp.respJsonObj[0].TEN_TK;
          if (gTrans.transType == "T14") {
            gTrans.accName = resp.respJsonObj[0].TEN_TK;
          }
        };
      } else
        document.getElementById("trans.targetaccountname").innerHTML = "";
    },
    function() {
      document.getElementById("trans.targetaccountname").innerHTML = "";
    }
  );
}

function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccent(field.value);
	field.value = field.value.replace(/[!"#$@%&*'\+:;<=>?\\`^~{|}]/g, '');
  }
}
