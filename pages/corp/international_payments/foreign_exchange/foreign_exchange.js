function viewDidLoadSuccess() {
  console.log("totalAmout", gTrans.limit);
  	
  initData();
  checkCutOfTime();
}

function formatCurrentWithSysbol(n, currency) {
	
	var k;
    k = currency + "" + Math.abs(n).toFixed(2).replace(/./g, function(c, i, a) {
        return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
    });
	if(k.substr(k.length - 2, k.length)==='00')
	{
		k = k.substr(0,k.length - 3);
	}
	return k;
}

function removeSpecialCharWithSysbol(amount) {
	//var tmpStr = amount.replace(/[^0-9.]/g, '');
    return amount.replace(/[^0-9.]/g, '');//parseFloat(amount.replace(/[^0-9-.]/g, ''));
	//return amount.replace(/[\D\.]/g, '');
}

/*
 *  Hàm lấy get các giá trị khởi tạo màn hình: Exchange Rate, List Account ngoại tệ, List Account sử dụng VND
 */
function initData() {
  var requestData = new Object();
  requestData.idtxn = "B13";
  requestData.sequenceId = "1";

  var args = [];
  args.push("1");
  args.push(requestData);

  var _success = function(e) {
    var resp = JSON.parse(e);
    // Lay rate chuyen doi 
    var rateExchange = resp.respJsonObj.listRate;
    gPay.rateExchange = resp.respJsonObj.listRate;
    gTrans.transInfo = {};
    gTrans.limit = resp.respJsonObj.limit;

    document.getElementById("rateUSD").value = formatCurrentWithSysbol(rateExchange.listRate[0].TRANSFER_BUY_RATE,"");
    document.getElementById("rateJPY").value = formatCurrentWithSysbol(rateExchange.listRate[1].TRANSFER_BUY_RATE,"");
    document.getElementById("rateEUR").value = formatCurrentWithSysbol(rateExchange.listRate[2].TRANSFER_BUY_RATE,"");

    // Lay tai khoan ngoai te
    gPay.listAccoutForeign = resp.respJsonObj.listAccountUSD.listAccountUSD;
	
    // Lay tai khoan thanh toan
    gPay.listAccoutVND = resp.respJsonObj.listAccountVND.listAccountVND;

	// Lay danh sach ban ngoai te
    gPay.TransaDay = resp.respJsonObj.transday.TransaDay;
	
	// tinh tong so tien doi ngoai te
	gPay.maxTrans = calMaxTrans();
	console.log('maxtrans', formatCurrentWithSysbol(gPay.maxTrans,""));
	
    // Lay send method
    if (resp.respJsonObj.sendMethod == 0) {
      document.getElementById("trNotify").style.display = "none";
    }
    document.getElementById("id.notifyTo").value = CONST_STR.get("COM_NOTIFY_" + resp.respJsonObj.sendMethod);

  };

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_INT_PAYMENT_EXCHANGE_CREATE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, false, 0, _success, "");
}


/*
 *  Hiển thị và chọn tài khoản ngoại tệ
 */
function showListAccountForeign() {
  var accountNumber = [];
  var accountBalance = [];
  
  if(gPay.listAccoutForeign.length < 1){
	  showAlertText(CONST_STR.get('TRANS_INTER_PAYMENT_ERR_NO_F_ACC'));
	  return;
  }
  
  for (var i = 0; i < gPay.listAccoutForeign.length; i++) {
    accountNumber.push(gPay.listAccoutForeign[i].IDACCOUNT);
    accountBalance.push(formatCurrentWithSysbol(gPay.listAccoutForeign[i].NUMAVAILABLE,"") + " " + gPay.listAccoutForeign[i].CODACCTCURR);
  }

  var selectedAccountForeign = function(e) {	
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange") {
      document.removeEventListener("evtSelectionDialog", selectedAccountForeign, false);
      var accountForeign = document.getElementById("foreginAccount");
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        accountForeign.value = e.selectedValue1;
      } else {
        accountForeign.innerHTML = e.selectedValue1;
      }

      // Chon tai khoan doi tien -> rate tuong ung
      if (e.selectedValue1 != undefined) {
        gPay.accountForeign = e.selectedValue2;
        if (e.selectedValue2.slice(-3) == "USD") {
          document.getElementById("id.exchangeRate").value = formatCurrentWithSysbol(gPay.rateExchange.listRate[0].TRANSFER_BUY_RATE,"");
        } else if (e.selectedValue2.slice(-3) == "JPY") {
          document.getElementById("id.exchangeRate").value = formatCurrentWithSysbol(gPay.rateExchange.listRate[1].TRANSFER_BUY_RATE,"");
        } else {
          document.getElementById("id.exchangeRate").value = formatCurrentWithSysbol(gPay.rateExchange.listRate[2].TRANSFER_BUY_RATE,"");
        }
		calTotalAmount();
      }
      if (e.selectedValue1 != undefined) {
          gPay.accountCurrency = e.selectedValue2;
          document.getElementById("trans.sourceaccoutbalances").innerHTML =
            "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + e.selectedValue2 + "</div>";
          // gTax.soDuKhaDung = e.selectedValue2;
      }
    }
  }

  var selectedAccountForeignClose = function(e) {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange") {
      document.removeEventListener("evtSelectionDialog", selectedAccountForeign, false);
      document.removeEventListener("evtSelectionDialogClose", selectedAccountForeignClose, false);
    }
  }

  document.addEventListener("evtSelectionDialog", selectedAccountForeign, false);
  document.addEventListener("evtSelectionDialogClose", selectedAccountForeignClose, false);

  showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), accountNumber, accountBalance, true);
}

/*
 *  Hiển thị và chọn tài khoản VND
 */
function showListAccountVND() {
  var accountNumber = [];
  var accountBalance = [];

  for (var i = 0; i < gPay.listAccoutVND.length; i++) {
    accountNumber.push(gPay.listAccoutVND[i].IDACCOUNT);
    accountBalance.push(formatNumberToCurrency(gPay.listAccoutVND[i].NUMAVAILABLE) + " " + gPay.listAccoutVND[i].CODACCTCURR);
  }

  var selectedAccountVND = function(e) {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange") {
      document.removeEventListener("evtSelectionDialog", selectedAccountVND, false);
      var accountVND = document.getElementById("foreginAccountVND");
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        accountVND.value = e.selectedValue1;
      } else {
        accountVND.innerHTML = e.selectedValue1;
      }

      if (e.selectedValue1 != undefined) {
        gPay.accountVND = e.selectedValue2;
        document.getElementById("trans.sourceaccoutbalance").innerHTML =
          "<div class='availblstyle'>" + CONST_STR.get('COM_TXT_ACC_BALANCE_TITLE') + ": " + e.selectedValue2 + "</div>";
        // gTax.soDuKhaDung = e.selectedValue2;
      }
    }
  }

  var selectedAccountVNDClose = function(e) {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange") {
      document.removeEventListener("evtSelectionDialog", selectedAccountVND, false);
      document.removeEventListener("evtSelectionDialogClose", selectedAccountVNDClose, false);
    }
  }

  document.addEventListener("evtSelectionDialog", selectedAccountVND, false);
  document.addEventListener("evtSelectionDialogClose", selectedAccountVNDClose, false);

  showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), accountNumber, accountBalance, true);
}

/*
 *  Tính tổng tiền nhận được sau khi quy đổi.
 */
function calTotalAmount() {
  var total = 0
  var amount = document.getElementById("id.sellNumber").value;
  var rate = document.getElementById("id.exchangeRate").value;
  total = parseInt(removeSpecialChar(amount)) * parseInt(removeSpecialChar(rate));

  console.log("amount", amount);
  console.log("removeSpecialChar(rate)", removeSpecialChar(rate));
  if(formatNumberToCurrency(amount) > 0){
  	document.getElementById("id.sellNumber").value = formatNumberToCurrency(amount);
  }
  document.getElementById("id.total").value = formatNumberToCurrency(total);
}

/*
 *  Xem danh sách người nhận thông báo
 */
function showReceiverList() {
  updateAccountListInfo();
  navController.pushToView("corp/common/com_list_user_approve", true, 'xsl');
}


/*
 *  Check gio cut of time
 */
function checkCutOfTime() {
    var date = new Date();
    var weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var dayOfWeek = weekday[date.getDay()];

  var currentDate = date.getHours() * 100 + date.getMinutes();
  if (dayOfWeek === "Sunday") {
      document.getElementById("btnNext").disabled = true;
  } else if (dayOfWeek === "Saturday") {
      if (currentDate >= 830 && currentDate <= 1100) {
          document.getElementById("btnNext").disabled = false;
      } else {
          document.getElementById("btnNext").disabled = true;
      }
  } else {
      if (currentDate >= 830 && currentDate <= 1600) {
          document.getElementById("btnNext").disabled = false;
      } else {
          document.getElementById("btnNext").disabled = true;
      }
  }
}

/*
 *  Gui request doi tien
 */
function sendJsonRequest() {
  var totalAmout = document.getElementById("id.total").value;
  var Content = document.getElementById("trans.content").value;

  console.log("totalAmout", totalAmout);
  
  //Check noi dung 
  if (Content.trim()=='')
  {
	showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_ERROR_DESC")]));
	return;  
  }

  //Check so tien vuot qua han muc cho phep
  if (removeSpecialChar(totalAmout) > 100000000) {
    showAlertText(CONST_STR.get("FOREGIN_ERR_MONEY_OVER"));
    return;
  }
    
  if(parseInt(gPay.maxTrans) + parseInt(totalAmout.replace(/,/g,'')) > 1000000000){
	showAlertText(CONST_STR.get("FOREGIN_ERR_MONEY_OVER_LIMIT"));
    return;
  }

  // Check so tien vuot qua SDKD
  var tmpAccUSD = [];
  var a = gPay.accountForeign;
  // Check null
  var foreignAcc = document.getElementById("foreginAccount").value;
  if (foreignAcc == '' || foreignAcc == undefined || foreignAcc == CONST_STR.get("COM_TXT_INPUT_PLACEHOLDER")) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("FOREGIN_ACCOUNT")]));
    return;
  };

  tmpAccUSD = gPay.accountForeign.split(" ");
  var sdkd = tmpAccUSD[0];
  var sellNumber = document.getElementById("id.sellNumber").value;
  console.log(sdkd);
  console.log(sellNumber);
  if ((parseInt(sdkd.replace(/,/g,'')) - parseInt(sellNumber.replace(/,/g,''))) < 0) {
   showAlertText(CONST_STR.get("FOREGIN_ERR_MONEY_NOT_ENOUGHT"));
    return;
  }

  // Check null
  // var foreignAcc = document.getElementById("foreginAccount").value;
  // if (foreignAcc == '' || foreignAcc == undefined || foreignAcc == CONST_STR.get("COM_TXT_INPUT_PLACEHOLDER")) {
  //   showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("FOREGIN_ACCOUNT")]));
  //   return;
  // };

  var foreignAccVND = document.getElementById("foreginAccountVND").value;
  if (foreignAccVND == '' || foreignAccVND == undefined || foreignAccVND == CONST_STR.get("COM_TXT_INPUT_PLACEHOLDER")) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("FOREGIN_ACCOUNT_PAYMENT")]));
    return;
  };

  
  if (sellNumber == '' || sellNumber == undefined || sellNumber == CONST_STR.get("COM_TXT_INPUT_PLACEHOLDER")) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("FOREGIN_SELL_NUMBER")]));
    return;
  };

  //validate han muc
  if (parseInt(removeSpecialChar(totalAmout)) > parseInt(gTrans.limit.limitTime)) {
    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(gTrans.limit.limitTime)]));
    return false;
  }
  if ((parseInt(gTrans.limit.totalDay) + parseInt(removeSpecialChar(totalAmout))) > parseInt(gTrans.limit.limitDay)) {
    showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(gTrans.limit.limitDay)]));
    return false;
  }

  var exchangeRate = document.getElementById("id.exchangeRate").value;
  var description = document.getElementById("trans.content").value;

  var requestData = new Object();
  requestData.idtxn = "B13"; 
  requestData.sequenceId = '2';
  requestData.foreignAcc = foreignAcc;
  requestData.foreignAccVND = foreignAccVND;
  requestData.sellNumber = removeSpecialChar(sellNumber);
  requestData.exchangeRate = removeSpecialChar(exchangeRate);
  requestData.totalAmout = removeSpecialChar(totalAmout);
  requestData.description = description;
  requestData.exchangeUnit = gPay.accountForeign.slice(-3);

  var args = [];
  args.push("1");
  args.push(requestData);

  var _success = function(e) {
    var resp = JSON.parse(e);
    if (resp.respCode == '0') {
      var xmlDoc = genXMLReviewSrc();
      setReviewXmlStore(xmlDoc);

      console.log("resp", resp);

      var requestData = {
        sequenceId: "3",
        idFcatref: resp.respJsonObj.idFcatref,
        idUserRef: resp.respJsonObj.idUserRef,
        idtxn: "B13"
      };

      gCorp.cmdType = CONSTANTS.get("CMD_CO_INT_PAYMENT_EXCHANGE_CREATE");
      gCorp.requests = [null, requestData];
      navCachedPages["corp/common/review/com-review"] = null;
      navController.pushToView("corp/common/review/com-review", true, 'xsl');;

    } else
      showAlertText(CONST_STR.get('CORP_MSG_PERIODIC_ERROR_INSERT_DATA'));
  }

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_INT_PAYMENT_EXCHANGE_CREATE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, false, 0, _success, "");
}

/*
 *  Gen XML de tao man hinh review
 */

function genXMLReviewSrc() {
  var foreignAcc = document.getElementById("foreginAccount").value;
  var foreignAccVND = document.getElementById("foreginAccountVND").value;
  var sellNumber = document.getElementById("id.sellNumber").value;
  var totalAmout = document.getElementById("id.total").value;
  var exchangeRate = document.getElementById("id.exchangeRate").value;
  var description = document.getElementById("trans.content").value;
  var xmlDoc = createXMLDoc();
  var rootNode = createXMLNode("review", "", xmlDoc);
  var sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  var sendMethod = document.getElementById("id.notifyTo").value;

  var rowNode = createXMLNode("row", "", xmlDoc, sectionNode);

  createXMLNode("label", CONST_STR.get('TRANS_TYPE'), xmlDoc, rowNode);
  createXMLNode("value", CONST_STR.get('MENU_CHILD_EXCHANGE_MONEY'), xmlDoc, rowNode);

  //Tai khoan ngoai te
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_ACCOUNT'), xmlDoc, rowNode);
  createXMLNode("value", foreignAcc, xmlDoc, rowNode);

  //Tai khoan thanh toan
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_ACCOUNT_PAYMENT'), xmlDoc, rowNode);
  createXMLNode("value", foreignAccVND, xmlDoc, rowNode);

  sectionNode = createXMLNode("section", "", xmlDoc, rootNode);
  createXMLNode("title", CONST_STR.get('TRANS_DETAIL_BLOCK_TITLE'), xmlDoc, sectionNode);

  //So luong ngoai te ban
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_SELL_NUMBER'), xmlDoc, rowNode);
  createXMLNode("value", sellNumber + ' ' + gPay.accountForeign.slice(-3), xmlDoc, rowNode);

  //Ty gia
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_RATE'), xmlDoc, rowNode);
  createXMLNode("value", exchangeRate, xmlDoc, rowNode);

  //Tong so tien nhan duoc
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_TOTAL_RECEIVER_AMOUNT'), xmlDoc, rowNode);
  createXMLNode("value", totalAmout + " VND", xmlDoc, rowNode);

  //Mo ta giao dich
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_DESCRIPTION'), xmlDoc, rowNode);
  createXMLNode("value", description, xmlDoc, rowNode);

  //Phi dich vu
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('TAX_FEE'), xmlDoc, rowNode);
  createXMLNode("value", '0 VND', xmlDoc, rowNode);

  //So du tai khoan ngoai te sau khi chuyen doi
  var tmpForeignAcc = (parseFloat(removeSpecialCharWithSysbol(gPay.accountForeign)) - parseInt(removeSpecialChar(sellNumber)));
  //alert(parseFloat(removeSpecialCharWithSysbol(gPay.accountForeign)));

  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_BALANCE_FOR_AFTER_EXCHANGE'), xmlDoc, rowNode);
  createXMLNode("value", formatCurrentWithSysbol(tmpForeignAcc,"") + ' ' + gPay.accountForeign.slice(-3), xmlDoc, rowNode);

  //Số dư tài khoản thanh toán sau khi chuyển đổi
  var tmpAccVND = (parseInt(removeSpecialChar(gPay.accountVND)) + parseInt(removeSpecialChar(totalAmout)));
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_BALANCE_VND_AFTER_EXCHANGE'), xmlDoc, rowNode);
  createXMLNode("value", formatNumberToCurrency(tmpAccVND) + " VND", xmlDoc, rowNode);

  //Ngày hiệu lực
  var date = new Date();
  var curDate = date.getDate();
  var curMonth = date.getMonth() + 1;
  var curYear = date.getFullYear();
  var currentDay = curDate + "/" + curMonth + "/" + curYear;
  rowNode = createXMLNode("row", "", xmlDoc, sectionNode);
  createXMLNode("label", CONST_STR.get('FOREGIN_EXPIRE_DATE'), xmlDoc, rowNode);
  createXMLNode("value", currentDay, xmlDoc, rowNode);

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

//Chuyen sang trang quan ly
function showMngPage() {
  navController.initWithRootView('corp/international_payments/foreign_exchange/foreign_exchange_mng', true, 'xsl');
}


function controlInputText(field, maxlen, enableUnicode) {
  if (maxlen != undefined && maxlen != null) {
    textLimit(field, maxlen);
  }
  if (enableUnicode == undefined || !enableUnicode) {
    field.value = removeAccentinfo(field.value);
	field.value = field.value.replace(/[!"#@$%&'\+:;<=>?\\`^~{|}]/g, '');
  }
}

function calMaxTrans(){
	var maxTrans=0;
	for(var i=0;i<gPay.TransaDay.length;i++){
		if(gPay.TransaDay[i].CODTRNCURR == "USD"){
				maxTrans += parseInt(removeSpecialChar(gPay.TransaDay[i].NUMAMOUNT)) * parseInt(removeSpecialChar(document.getElementById("rateUSD").value))
		}
		if(gPay.TransaDay[i].CODTRNCURR == "JPY"){
				maxTrans += parseInt(removeSpecialChar(gPay.TransaDay[i].NUMAMOUNT)) * parseInt(removeSpecialChar(document.getElementById("rateJPY").value))
		}
		if(gPay.TransaDay[i].CODTRNCURR == "EUR"){
				maxTrans += parseInt(removeSpecialChar(gPay.TransaDay[i].NUMAMOUNT)) * parseInt(removeSpecialChar(document.getElementById("rateEUR").value))
		}
	}
	return maxTrans;
	/*total = parseInt(removeSpecialChar(amount)) * parseInt(removeSpecialChar(rate));
	document.getElementById("rateUSD").value = formatNumberToCurrency(rateExchange.listRate[0].TRANSFER_BUY_RATE);
    document.getElementById("rateJPY").value = formatNumberToCurrency(rateExchange.listRate[1].TRANSFER_BUY_RATE);
    document.getElementById("rateEUR").value = formatNumberToCurrency(rateExchange.listRate[2].TRANSFER_BUY_RATE);*/
}

function removeChar (e, des) {
  var tmpVale = des.value;
  var numStr = keepOnlyNumber(tmpVale);
  formatCurrency(e, des);
  //des.value = numStr;
  if (numStr != null && numStr != undefined){
    calTotalAmount();
  }

}