var rowsPerPage = 5;
var totalPages = 0;

var docXml;
gCorp.isBack = false;

function viewBackFromOther() {
  //Flag check
  gCorp.isBack = true;
}

function viewDidLoadSuccess() {
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.mngenddate', 'span.enddate');

  if(!gCorp.isBack){
    gPay.searchData = {
      sequenceId: "1",
      transType: "",
      status: "",
      moneyUnit: "",
      idMaker: "",
      startDate: "",
      endDate: ""
    }
    gPay.searchData.transType = CONST_FOREIGN_TRANS_TYPE_KEY[0];
    gPay.searchData.status = CONST_FOREIGN_STATUS_KEY[0];
    gPay.searchData.moneyUnit = CONST_FOREIGN_MONEY_UNIT_KEY[0];
    gPay.searchData.idMaker = '';
  }

}

/*
 *   Chuyển về sang khởi tạo
 */
function showInputPage() {
  navController.initWithRootView('corp/international_payments/foreign_exchange/foreign_exchange', true, 'xsl');
}

/*
 *   Lấy danh sách người tạo giao dịch
 */
function getListMaker() {
  dataObj = new Object();
  dataObj.sequence_id = "1";
  dataObj.idtxn = "T00";

  var arrArgs = new Array();
  arrArgs.push("1");
  arrArgs.push(dataObj);

  var _success = function(e) {
    var gprsResp = JSON.parse(e);
    setRespObjStore(gprsResp);
    var obj = gprsResp.respJsonObj;

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

  function handleSelectUser(e) {
    handleCloseUserClose();
    // searchData.accdeb = e.selectedValue2;
    var maker = document.getElementById('id.accountno');
    maker.value = e.selectedValue1;
    gPay.searchData.idMaker = e.selectedValue1;
  }

  function handleCloseUserClose() {
    document.removeEventListener("evtSelectionDialogClose", handleCloseUserClose, false);
    document.removeEventListener("evtSelectionDialog", handleSelectUser, false);
  }

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_USER_CREATED_TRANSACTION"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrArgs);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, _success, "");
}


/*
 *   Show loại giao dịch
 */

function showTransferType() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_FOREIGN_TRANS_TYPE_EN : CONST_FOREIGN_TRANS_TYPE_VN;
  var tmpArray2 = CONST_FOREIGN_TRANS_TYPE_KEY;

  var selectedTransType = function(e) {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialog", selectedTransType, false);
      var transType = document.getElementById('id.transType');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        transType.value = e.selectedValue1;
      } else {
        transType.innerHTML = e.selectedValue1;
      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        gPay.searchData.transType = e.selectedValue2;
      }
    }
  }

  var selectedTransTypeClose = function() {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialogClose", selectedTransTypeClose, false);
      document.removeEventListener("evtSelectionDialog", selectedTransType, false);
    }
  }

  document.addEventListener("evtSelectionDialog", selectedTransType, false);
  document.addEventListener("evtSelectionDialogClose", selectedTransTypeClose, false);
  showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), tmpArray1, tmpArray2, false);
}

/*
 *   Show loại tiền tệ
 */

function showMoneyUnit() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_FOREIGN_MONEY_UNIT_EN : CONST_FOREIGN_MONEY_UNIT_VN;
  var tmpArray2 = CONST_FOREIGN_MONEY_UNIT_KEY;

  var selectedMoneyUnit = function(e) {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialog", selectedMoneyUnit, false);
      var moneyUnit = document.getElementById('id.moneyType');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        moneyUnit.value = e.selectedValue1;
      } else {
        moneyUnit.innerHTML = e.selectedValue1;
      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        gPay.searchData.moneyUnit = e.selectedValue2;
      }
    }
  }

  var selectedMoneyUnitClose = function() {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialogClose", selectedMoneyUnitClose, false);
      document.removeEventListener("evtSelectionDialog", selectedMoneyUnit, false);
    }
  }

  document.addEventListener("evtSelectionDialog", selectedMoneyUnit, false);
  document.addEventListener("evtSelectionDialogClose", selectedMoneyUnitClose, false);
  showDialogList(CONST_STR.get('FOREGIN_CHOOSE_MONEY_UNIT'), tmpArray1, tmpArray2, false);
}

/*
 *   Show trạng thái giao dịch
 */

function showStatus() {
  var tmpArray1 = (gUserInfo.lang == 'EN') ? CONST_FOREIGN_STATUS_EN : CONST_FOREIGN_STATUS_VN;
  var tmpArray2 = CONST_FOREIGN_STATUS_KEY;

  var selectedStatus = function(e) {

    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialog", selectedStatus, false);
      var status = document.getElementById('id.stt');
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        status.value = e.selectedValue1;
      } else {
        status.innerHTML = e.selectedValue1;
      }

      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        gPay.searchData.status = e.selectedValue2;
      }
    }
  }

  var selectedStatusClose = function() {
    if (currentPage == "corp/international_payments/foreign_exchange/foreign_exchange_mng") {
      document.removeEventListener("evtSelectionDialogClose", selectedStatusClose, false);
      document.removeEventListener("evtSelectionDialog", selectedStatus, false);
    }
  }

  document.addEventListener("evtSelectionDialog", selectedStatus, false);
  document.addEventListener("evtSelectionDialogClose", selectedStatusClose, false);
  showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), tmpArray1, tmpArray2, false);
}

function searchExchangeTransfer() {
  gPay.searchData.startDate = document.getElementById("id.begindate").value;
  gPay.searchData.endDate = document.getElementById("id.mngenddate").value;
	
	
  gPay.searchData.pageId = 1;
  var requestData = new Object();
  requestData.sequenceId = gPay.searchData.sequenceId;
  requestData.transType = gPay.searchData.transType;
  requestData.status = gPay.searchData.status;
  requestData.moneyUnit = gPay.searchData.moneyUnit;
  requestData.idMaker = gPay.searchData.idMaker;
  requestData.startDate = gPay.searchData.startDate;
  requestData.endDate = gPay.searchData.endDate;

  var args = [];
  args.push("1");
  args.push(requestData);

  var _success = function(e) {
    var gprsResp = JSON.parse(e);
    setRespObjStore(gprsResp); //store response
    if (gprsResp.respCode == 0 && gprsResp.respJsonObj.length > 0) {

      var obj = gprsResp.respJsonObj;
      gPay.respData = gprsResp.respJsonObj;

      // GEN XML DE TAO TABLE
      var xmlDoc = genXMLListTrans(obj);
       totalPages = getTotalPages(gprsResp.respJsonObj.length);

      var xslDoc = getCachePageXsl("corp/international_payments/foreign_exchange/foreign_exchange_mng_list_result");
      genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
        document.getElementById("tblContent").innerHTML = oStr;
        genPagging(totalPages, gPay.searchData.pageId);
      });
    } else {
      document.getElementById("tblContent").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
    };
  }

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_INT_PAYMENT_EXCHANGE_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, false, 0, _success, "");

}

function genXMLListTrans(pJson) {
  var docXml = createXMLDoc();
  var rootNode = createXMLNode('transTable', '', docXml);
  var childNode;
  var rowNode;
  var transList = pJson;
  
    var tmp = (gPay.searchData.pageId - 1) * rowsPerPage;
	
/*  for (var i = 0; i < transList.length; i++) {*/
	for (var i = tmp; i < tmp + rowsPerPage; i++) {
    if (typeof transList[i] != "undefined") {
      rowNode = createXMLNode('rows', '', docXml, rootNode);
      childNode = createXMLNode('stt', i + 1, docXml, rowNode);
      childNode = createXMLNode('dateMaker', transList[i].NGAY_LAP, docXml, rowNode);
      childNode = createXMLNode('sellNumber', transList[i].SO_LUONG_QUY_DOI, docXml, rowNode);
      childNode = createXMLNode('sellUnit', transList[i].DON_VI_TIEN, docXml, rowNode);
      childNode = createXMLNode('sellRate', formatNumberToCurrency(transList[i].TY_GIA) + ' VND', docXml, rowNode);
      childNode = createXMLNode('amount', formatNumberToCurrency(transList[i].SO_TIEN_QUY_DOI) + ' VND', docXml, rowNode);
      childNode = createXMLNode('status', CONST_STR.get('TRANS_STATUS_' + transList[i].TRANG_THAI), docXml, rowNode);
      childNode = createXMLNode('transId', transList[i].MA_GIAO_DICH, docXml, rowNode);
      childNode = createXMLNode('idx', i, docXml, rowNode);
    };
  }
  return docXml;
}


/*
 *   Hiển thị chi tiết giao dịch khi ấn vào mã IDFCATREF
 */
function showTransferDetail(idx) {
  var data = {};
  var requestData = new Object();

  requestData.sequenceId = '2';
  requestData.IDTXN = 'B01';
  requestData.idFcatref = gPay.respData[idx].MA_GIAO_DICH;
  requestData.idUserReference = gPay.respData[idx].IDUSERREFERENCE;

  var args = new Array();
  args.push("3");
  args.push(requestData);

  var _success = function(e) {
    var gprsResp = JSON.parse(e);
    setRespObjStore(gprsResp);
    if (gprsResp.respCode == 0) {
      var obj = gprsResp.respJsonObj;
      genReviewScreen(obj);
      console.log("OK");
    } else {
      showAlertText((CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST")));
    };
  }

  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_INT_PAYMENT_EXCHANGE_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, _success, '');
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
  tmpChildNode = createXMLNode('transinfocontent', obj[0].MA_GIAO_DICH, docXml, tmpChildNodeAcc);

  // thời gian thực hiện
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('CREDIT_CARD_TRANSACTION_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].NGAY_LAP, docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfodisplay', 'review', docXml, tmpChildNodeAcc); //display or not in result

  //Ngày duyệt
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].NGAY_DUYET, docXml, tmpChildNodeAcc);

  //Trạng thái
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_STATUS'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('TRANS_STATUS_' + obj[0].TRANG_THAI), docXml, tmpChildNodeAcc);

  if (obj[0].TRANG_THAI == "REJ") {
    //lý do từ chối
    var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
    var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('AUTHORIZE_TXT_REASON'), docXml, tmpChildNodeAcc);
    tmpChildNode = createXMLNode('transinfocontent', obj[0].LY_DO_TU_CHOI, docXml, tmpChildNodeAcc);
  };

  //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, tmpXmlNodeInfo);

  //loại giao dịch
  //trans type
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_TYPE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('MENU_CHILD_EXCHANGE_MONEY'), docXml, tmpChildNodeAcc);

  //tài khoản chuyển
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('FOREGIN_ACCOUNT'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].TK_CHUYEN, docXml, tmpChildNodeAcc);

  //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, tmpXmlNodeInfo);

  //Số tài khoản nhận
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('FOREGIN_ACCOUNT_PAYMENT'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].TK_NHAN, docXml, tmpChildNodeAcc);

  //số luong doi
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('FOREGIN_SELL_NUMBER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatCurrentWithSysbol(obj[0].SO_LUONG_DOI,"") + ' ' + obj[0].DON_VI_TIEN, docXml, tmpChildNodeAcc);

  //ty gia
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('FOREGIN_RATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj[0].RATE), docXml, tmpChildNodeAcc);

  //So tien nhan duoc
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('FOREGIN_TOTAL_RECEIVER_AMOUNT'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj[0].SO_TIEN_NHAN_DUOC) + ' VND', docXml, tmpChildNodeAcc);

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
  tmpChildNode = createXMLNode('transinfocontent', obj[0].NOI_DUNG, docXml, tmpChildNodeAcc);

// nguoi duyet
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_CHEKER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj[0].NGUOI_DUYET, docXml, tmpChildNodeAcc);
  
  //Gui Thong Bao cho nguoi duyet
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get("COM_NOTIFY_" + obj[0].SEND_METHOD), docXml, tmpChildNodeAcc);

  logInfo(docXml);
  //luu xml trong cache

  setRespObjStore(obj);
  setReviewXmlStore(docXml);
  navCachedPages["corp/international_payments/foreign_exchange/foreign_exchange_detail"] = null;
  navController.pushToView("corp/international_payments/foreign_exchange/foreign_exchange_detail", true, 'xsl');
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


function getTotalPages(totalRows) {
  return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
  gPay.searchData.pageId = selectedIdx;

  // GEN XML DE TAO TABLE
  var xmlDoc = genXMLListTrans(gPay.respData);

  var xslDoc = getCachePageXsl("corp/international_payments/foreign_exchange/foreign_exchange_mng_list_result");
  genHTMLStringWithXML(xmlDoc, xslDoc, function(oStr) {
    document.getElementById("tblContent").innerHTML = oStr;
    genPagging(totalPages, gPay.searchData.pageId);
  });

  // searchPeriodicTrans();
}
  
function genPagging(totalPages, pageIdx) {
  var nodepage = document.getElementById('pageIndicatorNums');
  var tmpStr = genPageIndicatorHtml(totalPages, pageIdx);
  nodepage.innerHTML = tmpStr;
}

function sendRequestExportExcel() {   
    var request = {
        sequenceId: 20,
        idtxn: "T02",
        transTypeId: gPay.searchData.transType,
        transStatus: gPay.searchData.status,
        moneytype: gPay.searchData.moneyUnit,
        maker: gPay.searchData.idMaker,
        dateBegin: gPay.searchData.startDate,
        dateEnd: gPay.searchData.endDate
    };
    if (request.maker == CONST_STR.get("COM_ALL")) {
        request.maker = "ALL";
    }

    var args = ["", request];

    var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
    var data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}