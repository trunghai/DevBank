var rowsPerPage = 10;
var totalPages = 0;
var results;
var limit;
var flag = true;

var searchData ;

gTrans.makers;
gTrans.curPage;

var listSelectedTrans = [];

function viewDidLoadSuccess() {

  if (flag) {
    searchData = {
      taxType: '',
      taxDetail: '',
      status: '',
      maker: '',
      startDate: '',
      enddate: '',
      pageID: 1,
      pageSize: 10000000
    };
    console.log("viewDidLoadSuccess");
    // var today = new Date();
    // var nextMonth;
    // var dd = today.getDate();
    // var mm = today.getMonth() + 1; //January is 0!
    // var yyyy = today.getFullYear();

    // if (dd < 10) {
    //   dd = '0' + dd
    // }

    // if (mm < 10) {
    //   mm = '0' + mm
    // }

    // today = dd + '/' + mm + '/' + yyyy;
    // nextMonth = dd + '/' + (parseInt(mm) + 1) + '/' + yyyy;
    gTrans.makers = [];
    gTrans.curPage = 1;
    limit = {};
    createDatePicker('id.begindate', 'span.begindate');
    createDatePicker('id.mngenddate', 'span.enddate');

    // document.getElementById("id.begindate").value = today;
    // document.getElementById("id.mngenddate").value = nextMonth;

    if (gUserInfo.lang == 'EN') {
      document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_EN[0];
      document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_EN[0];
      document.getElementById("id.stt").value = CONST_AUTH_TAX_STATUS_DETAIL_VALUE_EN[0];
    } else {
      document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_VN[0];
      document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_VN[0];
      document.getElementById("id.stt").value = CONST_AUTH_TAX_STATUS_DETAIL_VALUE_VN[0];
    };
  };
  
  // setTimeout(function () {
  //      document.getElementById("btn_search").click();
  // }, 1100);
  searchAuthorizeTax();
}

function viewBackFromOther() {
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.enddate', 'span.enddate');
  flag = false;
  if(sessionStorage.getItem('searchDataTax')){
    var searchDataTax = JSON.parse(sessionStorage.getItem('searchDataTax'));
    searchData = {
      taxType: searchDataTax.taxType,
      taxDetail: searchDataTax.taxDetail,
      status: searchDataTax.status,
      maker: searchDataTax.maker,
      startDate: searchDataTax.startDate,
      enddate: searchDataTax.enddate,
      pageID: 1,
      pageSize: 10000000
    };
  }
}

function addEventListenerToCombobox(selectHandle, closeHandle) {
  document.addEventListener("evtSelectionDialog", selectHandle, false);
  document.addEventListener("evtSelectionDialogClose", closeHandle, false);
}

function removeEventListenerToCombobox(selectHandle, closeHandle) {
  document.removeEventListener("evtSelectionDialog", selectHandle, false);
  document.removeEventListener("evtSelectionDialogClose", closeHandle, false);
}

//Show loại giao dịch
function showTaxType() {
  var value = (gUserInfo.lang == 'EN') ? CONST_MNG_TAX_TYPE_VALUE_EN : CONST_MNG_TAX_TYPE_VALUE_VN;
  var key = CONST_MNG_TAX_TYPE_KEY;

  var handleSelectTaxType = function(e) {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialog", handleSelectTaxType, false);
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var taxType = document.getElementById('id.taxType');
        if (taxType.nodeName == "INPUT") {
          taxType.value = e.selectedValue1;
        } else {
          taxType.innerHTML = e.selectedValue1;
        }
      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        searchData.taxType = e.selectedValue2;
      }
    }
  }

  var handleSelectTaxTypeClose = function() {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialogClose", handleSelectTaxTypeClose, false);
      document.removeEventListener("evtSelectionDialog", handleSelectTaxType, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectTaxType, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectTaxTypeClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), value, key, false);
}

// Chi tiết loại giao dịch
function showTaxDetail() {
  var value = (gUserInfo.lang == 'EN') ? CONST_MNG_TAX_DETAIL_VALUE_EN : CONST_MNG_TAX_DETAIL_VALUE_VN;
  var key = CONST_MNG_TAX_DETAIL_KEY;

  var handleSelectTaxDetail = function(e) {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialog", handleSelectTaxDetail, false);
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var taxDetail = document.getElementById('id.taxDetail');
        if (taxDetail.nodeName == "INPUT") {
          taxDetail.value = e.selectedValue1;
        } else {
          taxDetail.innerHTML = e.selectedValue1;
        }
      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        searchData.taxDetail = e.selectedValue2;
      }
    }
  }

  var handleSelectTaxDetailClose = function() {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialogClose", handleSelectTaxDetailClose, false);
      document.removeEventListener("evtSelectionDialog", handleSelectTaxDetail, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectTaxDetail, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectTaxDetailClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), value, key, false);
}

// Trạng thái
function showStatus() {
  var value = (gUserInfo.lang == 'EN') ? CONST_AUTH_TAX_STATUS_DETAIL_VALUE_EN : CONST_AUTH_TAX_STATUS_DETAIL_VALUE_VN;
  var key = CONST_AUTH_TAX_STATUS_DETAIL_KEY;

  var handleSelectTaxStatus = function(e) {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialog", handleSelectTaxStatus, false);
      if ((e.selectedValue1 != undefined) && (e.selectedValue1 != null)) {
        var taxStatus = document.getElementById('id.stt');
        if (taxStatus.nodeName == "INPUT") {
          taxStatus.value = e.selectedValue1;
        } else {
          taxStatus.innerHTML = e.selectedValue1;
        }
      }
      if ((e.selectedValue2 != undefined) && (e.selectedValue2 != null)) {
        searchData.status = e.selectedValue2;
      }
    }
  }

  var handleSelectTaxStatusClose = function() {
    if (currentPage == "corp/authorize/tax/authorize_tax") {
      document.removeEventListener("evtSelectionDialogClose", handleSelectTaxStatusClose, false);
      document.removeEventListener("evtSelectionDialog", handleSelectTaxStatus, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectTaxStatus, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectTaxStatusClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), value, key, false);
}

//Chon nguoi lap giao dich
function showMakers() {
  var jsonData = new Object();
  jsonData.sequence_id = "1";
  jsonData.idtxn = "B61";
  var args = new Array();
  args.push("2");
  args.push(jsonData);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_PAY_TAX_AUTHORIZE"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, getMakersSuccess, function() {});
}

function getMakersSuccess(e) {
  var resp = JSON.parse(e);
  if (resp.respCode == 0 || resp.respJsonObj.makers.length > 0) {
    var cbxText = [];
    var cbxValues = [];
    cbxText.push(CONST_STR.get("COM_ALL"));
    cbxValues.push("");
    for (var i in resp.respJsonObj.makers) {
      var userId = resp.respJsonObj.makers[i].IDUSER;
      cbxText.push(userId);
      cbxValues.push(userId);
    }
    addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
    showDialogList(CONST_STR.get('COM_DIALOG_TITLE_ACCNO_CHOISE'), cbxText, cbxValues, false);
  } else
    showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_LIST_MAKER'));
}

function handleSelectMaker(e) {
  removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
  searchData.maker = e.selectedValue2;
  document.getElementById('id.maker').value = e.selectedValue1;
}

function handleCloseMakerCbx() {
  removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
}


//Gui request Search Authorize Tax
function searchAuthorizeTax() {
  var startDate = document.getElementById("id.begindate").value;
  var endDate = document.getElementById("id.mngenddate").value;

  var jsonData = new Object();
  searchData.pageID = 1;
  jsonData.sequence_id = "2";
  jsonData.taxType = searchData.taxType;
  jsonData.taxDetail = searchData.taxDetail;
  jsonData.status = searchData.status;
  jsonData.maker = searchData.maker;
  jsonData.startDate = startDate;
  jsonData.endDate = endDate;
  jsonData.idtxn = "B61";

  jsonData.pageSize = searchData.pageSize;
  jsonData.pageId = searchData.pageID;

  sessionStorage.setItem('searchDataTax',  JSON.stringify(searchData));
  gTrans.curPage = 1;
  if(validateDate(jsonData.startDate,jsonData.endDate))
  {
    var args = new Array();
    args.push("2");
    args.push(jsonData);
    var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_PAY_TAX_AUTHORIZE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
    var data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, requestSearchSuccess, requestSearchFail);
  }
}

function requestSearchSuccess(e) {
  var resp = JSON.parse(e);
  if (resp.respCode == '0') {
    console.log("resp.respJsonObj", resp.respJsonObj);
    results = resp.respJsonObj.list_pending;
    limit = resp.respJsonObj.limit;
    gCorp.limit = resp.respJsonObj.limit;
    var xmlData = genResultTable(resp.respJsonObj.list_pending);
    var docXsl = getCachePageXsl("corp/authorize/tax/authorize_tax_table");
    if(resp.respJsonObj.list_pending.length >0)    {
      totalPages = getTotalPages(resp.respJsonObj.list_pending[0].TOTAL);
      genHTMLStringWithXML(xmlData, docXsl, function(html) {
        var tmpNode = document.getElementById('id.searchResult');
        tmpNode.innerHTML = html;
        genPagging(totalPages, gTrans.curPage);
      });
    }
    else
    {
      document.getElementById('id.searchResult').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
      document.getElementById("pageIndicatorNums").innerHTML = '';
    }


  } else
  // showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
    document.getElementById('id.searchResult').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
    document.getElementById("pageIndicatorNums").innerHTML = '';
}

function  validateDate(fromDate,endDate) {
  var currentDate = new Date();
  var strCurrentDate = ('0' + (currentDate.getDate())) + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear();
/*
  if (gInternational.searchInfo.fromDate === 'dd/mm/yyyy'){
    gInternational.searchInfo.fromDate = '';
  }

  if (gInternational.searchInfo.endDate === 'dd/mm/yyyy'){
    gInternational.searchInfo.endDate = '';
  }*/


  if (!this.calculateDifferentMonth(fromDate,strCurrentDate)) {
    showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_FROM")]));
    return false;
  }

  if (!this.calculateDifferentMonth(endDate, strCurrentDate)) {
    showAlertText(formatString(CONST_STR.get("GUA_NOT_GREATER_TODAY"), [CONST_STR.get("COM_TO_DATE")]));
    return false;
  }

  if (!this.calculateDifferentMonth(fromDate ,endDate )) {
    showAlertText(CONST_STR.get("GUA_PERIODIC_END_DATE_LESS_TO_DATE"));
    return false;
  }
  return true;
}

function calculateDifferentMonth (valFromDate, valToDate) {
  if (valFromDate == '' || valFromDate == undefined) {
    return true;
  };
  var from = valFromDate.split("/");
  var to = valToDate.split("/");
  var fromDate = new Date(parseInt(from[2], 10), parseInt(from[1], 10) - 1, parseInt(from[0], 10));
  var toDate = new Date(parseInt(to[2], 10), parseInt(to[1], 10) - 1, parseInt(to[0], 10));
  if (fromDate > toDate) {
    return false;
  }
  return true;
}

function requestSearchFail() {

}

//Gen KQ tra ve ra table
function genResultTable(inputData) {
  var docXml = createXMLDoc();

  var rootNode = createXMLNode('result', '', docXml);
  var childNodeTitle = createXMLNode('title', '', docXml, rootNode);
  var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_MAKER'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_AMOUNT'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle7', '', docXml, childNodeTitle);

  var stt = 1;
  var i = (gTrans.curPage - 1) * rowsPerPage;
  var j = i + rowsPerPage;
  for (i; i < j; i++) {
    var obj = inputData[i];
    if (typeof obj !== "undefined") {
      var childNodeCont = createXMLNode('content', '', docXml, rootNode)
      var childNodeDeta = createXMLNode('acccontent1', stt++, docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent2', obj.SHORTNAME, docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent3', obj.DATMAKE, docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent4', formatNumberToCurrency(obj.NUMAMOUNT) + " VND", docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent5', obj.SIGNEDBY, docXml, childNodeCont);
      childNodeDeta = createXMLNode('transId', obj.IDFCATREF, docXml, childNodeCont);
      childNodeDeta = createXMLNode('idx', i, docXml, childNodeCont);
    }
  };

  return docXml;
}

function genPagging(totalPages, pageIdx) {
  var nodepage = document.getElementById('pageIndicatorNums');
  var tmpStr = genPageIndicatorHtml(totalPages, pageIdx);
  nodepage.innerHTML = tmpStr;
}

function getTotalPages(totalRows) {
  return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
  gTrans.curPage = selectedIdx;
  // searchAuthorizeTax();
  var xmlData = genResultTable(results);
  var docXsl = getCachePageXsl("corp/authorize/tax/authorize_tax_table");

  genHTMLStringWithXML(xmlData, docXsl, function(html) {
    var tmpNode = document.getElementById('id.searchResult');
    tmpNode.innerHTML = html;
    genPagging(totalPages, gTrans.curPage);
  });
}

// Chich ma giao dich
function showDetailAuthorizeTax(args, reviewFlag) {
  gTax.reviewFlag = reviewFlag;

  var jsonData = new Object();
  jsonData.sequence_id = "3";
  jsonData.idFcatref = args;
  jsonData.idtxn = "B61";

  gTax.idFcatref = args;
  gCorp.rootView = currentPage;
  var args = new Array();
  args.push("3");
  args.push(jsonData);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_PAY_TAX_AUTHORIZE'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, showDetailAuthorizeTaxSuccess, showDetailAuthorizeTaxFail);
}

function showDetailAuthorizeTaxSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp);
  var date = new Date();
  if (gprsResp.respCode == 0 && gprsResp.respJsonObj.detail.length > 0 && gprsResp.respJsonObj.list.length > 0) {
    if (date.getHours() > 16 && (date.getHours() > 16 || date.getMinutes() > 30)) {
      showAlertConfirmText(CONST_STR.get('CORP_MSG_CUT_OF_TIME_OVER'));
      document.addEventListener("alertConfirmOK", function(e) {
        var obj = gprsResp.respJsonObj;
        genReviewXML(obj);
        navCachedPages["corp/common/review/com-review"] = null;
        navCachedPages["corp/common/detail/com-detail"] = null;
      }, true);
    } else {
      var obj = gprsResp.respJsonObj;
      genReviewXML(obj);
      navCachedPages["corp/common/review/com-review"] = null;
      navCachedPages["corp/common/detail/com-detail"] = null;
    }
  } else {
    showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
  };
};

function showDetailAuthorizeTaxFail() {
};


function genReviewXML(obj) {
  var docXml = createXMLDoc();
  var rootNode;

  rootNode = createXMLNode('review', '', docXml);

  /* Thông tin chung */
  var sectionNode = createXMLNode('section', '', docXml, rootNode);
  var titleNode = createXMLNode('title', '', docXml, sectionNode);

  // Ma giao dich
  var rowNode = createXMLNode('row', '', docXml, sectionNode);
  var labelNode = createXMLNode('label', CONST_STR.get('COM_TRANS_CODE'), docXml, rowNode);
  var valueNode = createXMLNode('value', obj.detail[0].MA_GIAO_DICH, docXml, rowNode);

  // Ngay thuc hien
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_TRANSACTION_DATE'), docXml, rowNode);
  valueNode = createXMLNode('value', obj.detail[0].NGAY_LAP, docXml, rowNode);

  // Trang thai thuc hien
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_TRANSACTION_STATUS'), docXml, rowNode);
  valueNode = createXMLNode('value', CONST_STR.get("TRANS_STATUS_" + obj.detail[0].TRANG_THAI), docXml, rowNode);

  /* Thong tin tai khoan */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

  // tai khoan chuyen
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, rowNode);
  valueNode = createXMLNode('value', obj.detail[0].TAI_KHOAN_CHUYEN_TIEN, docXml, rowNode);

  // so du kha dung
  var soDuKhaDung = parseInt(obj.detail[0].SO_DU_KHA_DUNG);
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
  valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].SO_DU_KHA_DUNG) + " VND", docXml, rowNode);

  /* Thong tin nguoi nop thue */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  titleNode = createXMLNode('title', CONST_STR.get('TAX_PAY_TAX_CUST_INFO'), docXml, sectionNode);

  // ma so thue
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('COM_TAX_NUMBER'), docXml, rowNode);
  valueNode = createXMLNode('value', obj.detail[0].MA_SO_THUE, docXml, rowNode);

  // nguoi nop thue
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TAX_CUST_PAY_TAX'), docXml, rowNode);
  valueNode = createXMLNode('value', obj.detail[0].NGUOI_NOP_THUE, docXml, rowNode);

  // dia chi nguoi nop thue
  rowNode = createXMLNode('row', '', docXml, sectionNode);
  labelNode = createXMLNode('label', CONST_STR.get('TAX_CUST_PAY_TAX_ADDRESS'), docXml, rowNode);
  valueNode = createXMLNode('value', obj.detail[0].DIA_CHI_NGUOI_NOP_THUE, docXml, rowNode);

  //co quan quan ly thu
  if (obj.detail[0].LOAI_THUE == '06') {
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_ORI_REVENUE_NAME'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].CQ_QL_THU, docXml, rowNode);
  }

  /* Thong tin nop thue */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  if (obj.detail[0].LOAI_THUE == "06") {
      titleNode = createXMLNode('title', CONST_STR.get('TAX_INFO_REVENUE'), docXml, sectionNode);
  } else {
      titleNode = createXMLNode('title', CONST_STR.get('TAX_INFO'), docXml, sectionNode);
  }

  var treasuryAccNumValue = obj.detail[0].TK_THU_NSNN + ' - ';
  if (obj.detail[0].TK_THU_NSNN == '7111') {
    treasuryAccNumValue = treasuryAccNumValue + CONST_STR.get('TAX_TREASURY_ACC_NOP_NSNN');
  } else if (obj.detail[0].TK_THU_NSNN == '3511') {
    treasuryAccNumValue = treasuryAccNumValue + CONST_STR.get('TAX_TREASURY_ACC_TAM_THU');
  } else {
    treasuryAccNumValue = treasuryAccNumValue + CONST_STR.get('TAX_TREASURY_ACC_THU_QUY');
  }

  if (obj.detail[0].LOAI_THUE == "02" || obj.detail[0].LOAI_THUE == "05") {
    //loai thue
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_TAX_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].LOAI_THUE +" - " + CONST_STR.get("CONST_TAX_" + obj.detail[0].LOAI_THUE), docXml, rowNode);

    //kho bac nha nuoc thu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_NAME'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].KBNN_THU + " - " + obj.detail[0].TEN_KHO_BAC, docXml, rowNode); //sua SP lay ten kho bac

    //tai khoan thu nsnn
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_ACC'), docXml, rowNode);
    valueNode = createXMLNode('value', treasuryAccNumValue, docXml, rowNode); //sua sp lay ten 

    //co quan quan ly thu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_MNG'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].MA_CQ_QL_THU + " - " + obj.detail[0].CQ_QL_THU, docXml, rowNode);

    //so to khai
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_DECLAR'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].SO_TO_KHAI, docXml, rowNode);

    //loai tien hq
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_CUSTOM_CCY'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].LOAI_TIEN_HAI_QUAN + ' - ' + CONST_STR.get('K_TAX_HQ_' + obj.detail[0].LOAI_TIEN_HAI_QUAN), docXml, rowNode);


    //ngay dang ky to khai
    var declarDate = obj.detail[0].NGAY_DANG_KY_TO_KHAI;
/*    var yDeclarDate = declarDate.substring(0, 4);
    var mDeclarDate = declarDate.substring(4, 6);
    var dDeclarDate = declarDate.substring(6);*/

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_DECLAR_DATE'), docXml, rowNode);
    //valueNode = createXMLNode('value', dDeclarDate + '/' + mDeclarDate + '/' + yDeclarDate, docXml, rowNode);
    valueNode = createXMLNode('value', declarDate, docXml, rowNode);

    //ma loai hinh xuat nhap khau
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_IE_CODE_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].MA_LOAI_HINH_XNK+' - '+  obj.detail[0].TEN_LH, docXml, rowNode);

  } else if (obj.detail[0].LOAI_THUE == "06") {
      //Ma ngan hang thu huong
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_BANK_BENEFICIARY_CODE'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].MA_NH_NHAN, docXml, rowNode);

      //Ten ngan hang thu huong
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_BANK_BENEFICIARY_NAME'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].TEN_NH_THU_HUONG, docXml, rowNode);

      //Tai khoan thu huong
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].TK_THU_HUONG, docXml, rowNode);

      //Ten tai khoan thu huong
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY_NAME'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].TEN_TK_THU_HUONG, docXml, rowNode);

      //Ma nguyen te
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_EXCHANGERATES_CODE'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].MA_NGUYEN_TE, docXml, rowNode);

      //ty gia quy doi
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_EXCHANGERATES_VALUE'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].TY_GIA, docXml, rowNode);

      //tong tien nguyen te
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_EXCHANGERATES_SUM'), docXml, rowNode);
      valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].TONG_TIEN_NGUYEN_TE), docXml, rowNode);

  }else {
    //loai thue
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_TAX_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', CONST_STR.get("CONST_TAX_" + obj.detail[0].LOAI_THUE), docXml, rowNode);

    //kho bac nha nuoc thu
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_ACC'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].KBNN_THU + " - " + obj.detail[0].TEN_KHO_BAC, docXml, rowNode); //sua SP lay ten kho bac

    //tai khoan thu nsnn
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_MNG'), docXml, rowNode);
    valueNode = createXMLNode('value', treasuryAccNumValue, docXml, rowNode); //sua sp lay ten 
  };

  /* Thong tin giao dich */
  sectionNode = createXMLNode('section', '', docXml, rootNode);
  titleNode = createXMLNode('title', CONST_STR.get('TRANS_DETAIL_BLOCK_TITLE'), docXml, sectionNode);

  if (obj.detail[0].LOAI_THUE == '06') {
      sectionNode = createXMLNode('section', '', docXml, rootNode);
      var tableNode = createXMLNode("table", "", docXml, sectionNode);
      var theadNode = createXMLNode("thead", "", docXml, tableNode);
      //createXMLNode("th", CONST_STR.get("COM_NO"), docXml, theadNode);
      //createXMLNode("th", CONST_STR.get("TAX_CHAPTER"), docXml, theadNode);
      //createXMLNode("th", CONST_STR.get("TAX_CONTENT"), docXml, theadNode);
      //createXMLNode("th", CONST_STR.get("COM_AMOUNT"), docXml, theadNode);

      createXMLNode('th', CONST_STR.get('COM_NO'), docXml, theadNode);
      createXMLNode('th', CONST_STR.get('TAX_CONTENT'), docXml, theadNode); // ND kinhtế
      createXMLNode('th', CONST_STR.get('TAX_CONTENT_TITLE'), docXml, theadNode); //Tên ND kinhtế
      createXMLNode('th', CONST_STR.get('TAX_CURRENCY_MONEY'), docXml, theadNode); // Số tiền nguyên tệ
      createXMLNode('th', CONST_STR.get('TAX_CURRENCY_MONEY_LOCAL'), docXml, theadNode); // Số tiền VND
      createXMLNode('th', CONST_STR.get('TAX_CURRENCY_NOTE'), docXml, theadNode); // ghi chu

      var tbodyNode = createXMLNode("tbody", "", docXml, tableNode);

      for (var i = 0; i < obj.list.length; i++) {
          var trNode = createXMLNode("tr", "", docXml, tbodyNode);

          var tdNode = createXMLNode("td", i + 1, docXml, trNode);
          createXMLNode("title", CONST_STR.get("COM_NO"), docXml, tdNode);

          tdNode = createXMLNode("td", obj.list[i].MA_NOI_DUNG_KINH_TE, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CONTENT"), docXml, tdNode);

          tdNode = createXMLNode("td", obj.list[i].NOI_DUNG_KINH_TE, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CONTENT_TITLE"), docXml, tdNode);

          tdNode = createXMLNode("td", formatNumberToCurrency(obj.list[i].SO_TIEN_NGUYEN_TE) + ' ' + obj.detail[0].MA_NGUYEN_TE, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY"), docXml, tdNode);

          tdNode = createXMLNode("td", formatNumberToCurrency(obj.list[i].SO_TIEN) + ' VND', docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY_LOCAL"), docXml, tdNode);

          tdNode = createXMLNode("td", obj.list[i].GHICHU, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CURRENCY_NOTE"), docXml, tdNode);
      }

  } else {
      //Bảng
      sectionNode = createXMLNode('section', '', docXml, rootNode);
      var tableNode = createXMLNode("table", "", docXml, sectionNode);
      var theadNode = createXMLNode("thead", "", docXml, tableNode);
      createXMLNode("th", CONST_STR.get("COM_NO"), docXml, theadNode);
      createXMLNode("th", CONST_STR.get("TAX_CHAPTER"), docXml, theadNode);
      createXMLNode("th", CONST_STR.get("TAX_CONTENT"), docXml, theadNode);
      createXMLNode("th", CONST_STR.get("COM_AMOUNT"), docXml, theadNode);

      var tbodyNode = createXMLNode("tbody", "", docXml, tableNode);
      for (var i = 0; i < obj.list.length; i++) {
        var  economyContent = obj.list[i].NOI_DUNG_KINH_TE;
        if(economyContent ==''||economyContent ==null || typeof economyContent == 'undefined' )
          economyContent = obj.list[i].MA_NOI_DUNG_KINH_TE;

          var trNode = createXMLNode("tr", "", docXml, tbodyNode);

          var tdNode = createXMLNode("td", i + 1, docXml, trNode);
          createXMLNode("title", CONST_STR.get("COM_NO"), docXml, tdNode);

          tdNode = createXMLNode("td", obj.list[i].CHUONG, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CHAPTER"), docXml, tdNode);

          tdNode = createXMLNode("td", economyContent, docXml, trNode);
          createXMLNode("title", CONST_STR.get("TAX_CONTENT"), docXml, tdNode);

          tdNode = createXMLNode("td", formatNumberToCurrency(obj.list[i].SO_TIEN) + ' VND', docXml, trNode);
          createXMLNode("title", CONST_STR.get("COM_AMOUNT"), docXml, tdNode);
      }
  }


  sectionNode = createXMLNode('section', '', docXml, rootNode);
  if (obj.detail[0].LOAI_THUE == '02' || obj.detail[0].LOAI_THUE == '05') {
    //So tien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].SO_TIEN_THANH_TOAN) + " VND", docXml, rowNode);

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_FEE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].PHI_GIAO_DICH) + " VND", docXml, rowNode);

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_DESCRIPTION'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].NOI_DUNG, docXml, rowNode);

  } else if (obj.detail[0].LOAI_THUE == '06') {
      //So tien
      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('COM_AMOUNT'), docXml, rowNode);
      valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].SO_TIEN_THANH_TOAN) + " VND", docXml, rowNode);

      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_FEE'), docXml, rowNode);
      valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].PHI_GIAO_DICH) + " VND", docXml, rowNode);

      rowNode = createXMLNode('row', '', docXml, sectionNode);
      labelNode = createXMLNode('label', CONST_STR.get('TAX_DESCRIPTION'), docXml, rowNode);
      valueNode = createXMLNode('value', obj.detail[0].MOTA, docXml, rowNode);
  }else {

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_TREASURY_CODE'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].SO_HIEU_KHO_BAC + " - " + obj.detail[0].TEN_KHO_BAC, docXml, rowNode); // SP LAY TEN

    //So tien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].SO_TIEN_THANH_TOAN) + " VND", docXml, rowNode);

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_FEE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(obj.detail[0].PHI_GIAO_DICH) + " VND", docXml, rowNode);

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TAX_DESCRIPTION'), docXml, rowNode);
    valueNode = createXMLNode('value', obj.detail[0].NOI_DUNG, docXml, rowNode);

  };
  // Gen button cho màn hình review
  // Nut huy
  var buttonNode = createXMLNode('button', '', docXml, rootNode);
  var typeNode = createXMLNode('type', 'back', docXml, buttonNode);
  var btnLabelNode = createXMLNode('label', CONST_STR.get('COM_BACK'), docXml, buttonNode);

  var inputNode = createXMLNode("input", CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_TIT_REASON'), docXml, rootNode);

  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
  btnLabelNode = createXMLNode('label', CONST_STR.get('COM_REJ'), docXml, buttonNode);

  buttonNode = createXMLNode('button', '', docXml, rootNode);
  typeNode = createXMLNode('type', 'authorize', docXml, buttonNode);
  btnLabelNode = createXMLNode('label', CONST_STR.get('MENU_AUTHORIZE_TRANS'), docXml, buttonNode);



  // var startDate = document.getElementById("id.begindate").value;
  // var endDate = document.getElementById("id.mngenddate").value;

  var reviewFlag = gTax.reviewFlag;
  if (typeof reviewFlag != "undefined" && reviewFlag == true) {
    gCorp.detailXML = docXml;

    navCachedPages["corp/common/detail/com-detail"] = null;
    navController.pushToView("corp/common/detail/com-detail", true, 'xsl');

    gTax.reviewFlag = null;
    return;
  }

  // var tmpReasonRej = document.getElementById("id.reason-rej");
  // var reasonRej;
  // if (tmpReasonRej.value == "" || tmpReasonRej.value == "undefined") {
  //   reasonRej = "";
  // } else {
  //   reasonRej = tmpReasonRej.value;
  // };


  //Tao request dich hoac huy khi click vao ma idfcatref
  //auth request
  var transInfo = [];
  transInfo.push({
    transinfo: obj.detail[0].MA_GIAO_DICH
  });
  var authRequest = {
    sequence_id: "4",
    idtxn: "B61",
    transInfo: transInfo,

  };


  //reject request
  transInfo = [];
  transInfo.push({
    transinfo: gTax.idFcatref
  });
  var rejectRequest = {
    sequence_id: "5",
    idtxn: "B61",
    transInfo: transInfo
  };

  gCorp.limit = limit;
  gCorp.totalAmount = obj.detail[0].SO_TIEN_THANH_TOAN;
  gCorp.cmdType = CONSTANTS.get("CMD_CO_PAY_TAX_AUTHORIZE");
  gCorp.requests = [authRequest, rejectRequest];
  gCorp.isAuthScreen = true;

  setRespObjStore(obj);
  setReviewXmlStore(docXml);

  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
  console.log(gCorp.limit);
  console.log(gCorp.totalAmount);
  return docXml;
}

function authorizeTax() {
  console.log("results", results);
  console.log("gTrans.curPage", gTrans.curPage);
  var checkboxes = document.getElementsByClassName("trans.checkbox");
  var i;
  listSelectedTrans = [];
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      // listSelectedTrans.push(results[(gTrans.curPage - 1) * rowsPerPage + parseInt(checkboxes[i].value)]);
      listSelectedTrans.push(results[(gTrans.curPage - 1) * rowsPerPage + i]);
    }
  }

  if (listSelectedTrans.length == 0) {
    showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
    return;
  }

  //Tinh tong so tien
  var totalAmount = 0;
  for (var j = 0; j < listSelectedTrans.length; j++) {
    totalAmount += parseInt(listSelectedTrans[j].NUMAMOUNT);
  }
  console.log("totalAmount", totalAmount);
  console.log("limitTime", gCorp.limit.limitTime);
  console.log("limitDay", gCorp.limit.limitDay);
  console.log("totalDay", gCorp.limit.totalDay);

  gCorp.rootView = currentPage;
  if (parseInt(totalAmount) > parseInt(gCorp.limit.limitTime)) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_TIME"), [formatNumberToCurrency(limit.limitTime)]));
    return;
  };

  if ((parseInt(totalAmount) + parseInt(gCorp.limit.totalDay)) > parseInt(gCorp.limit.limitDay)) {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_LIMIT_EXCEEDED_DAY"), [formatNumberToCurrency(limit.limitDay)]));
    return;
  };

  var date = new Date();
  if (date.getHours() > 16 && (date.getHours() > 16 || date.getMinutes() > 30)) {
    showAlertConfirmText(CONST_STR.get('CORP_MSG_CUT_OF_TIME_OVER'));
    document.addEventListener("alertConfirmOK", function(e) {
      var docXml = genReviewTableXML("authorize");
      var transInfo = [];
      for (var i in listSelectedTrans) {
        transInfo.push({
          transinfo: listSelectedTrans[i].IDFCATREF
        });
      }

      var request = {
        sequence_id: "4",
        idtxn: "B61",
        transInfo: transInfo,
      };

      gCorp.cmdType = CONSTANTS.get("CMD_CO_PAY_TAX_AUTHORIZE");
      gCorp.requests = [request, null];
      gCorp.isAuthScreen = true;


      setReviewXmlStore(docXml);
      navCachedPages["corp/common/review/com-review"] = null;
      navController.pushToView("corp/common/review/com-review", true, 'xsl');
      console.log("request", request);
    }, true);
  } else {
    var docXml = genReviewTableXML("authorize");
    var transInfo = [];
    for (var i in listSelectedTrans) {
      transInfo.push({
        transinfo: listSelectedTrans[i].IDFCATREF
      });
    }

    var request = {
      sequence_id: "4",
      idtxn: "B61",
      transInfo: transInfo
    };

    gCorp.cmdType = CONSTANTS.get("CMD_CO_PAY_TAX_AUTHORIZE");
    gCorp.requests = [request, null];
    gCorp.isAuthScreen = true;

    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
    console.log("request", request);
  };
}


function transSelectedChange(e) {
  if (e.name == "true") {
    var checkboxes = document.getElementsByClassName("trans.checkbox");
    var i;
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
    e.name = "false";
  } else {
    var checkboxes = document.getElementsByClassName("trans.checkbox");
    var i;
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }
    e.name = "true";
  }
}

function rejectTax() {
  var checkboxes = document.getElementsByClassName("trans.checkbox");
  var reasonRej = document.getElementById("id.reason-rej").value;
  var i;
  listSelectedTrans = [];
  for (i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked == true) {
      listSelectedTrans.push(results[(gTrans.curPage - 1) * rowsPerPage + i]);
    }
  }

  if (listSelectedTrans.length == 0) {
    showAlertText(CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_EMPTY_TRANS_SELECTED"));
    return;
  }

  if (reasonRej == "") {
    showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
    return;
  }

  var docXml = genReviewTableXML("reject");
  var transInfo = [];
  for (var i in listSelectedTrans) {
    transInfo.push({
      transinfo: listSelectedTrans[i].IDFCATREF
    });
  }

  var request = {
    sequence_id: "5",
    idtxn: "B61",
    transInfo: transInfo,
    rejectReason: reasonRej
  };

  console.log(reasonRej);

  gCorp.cmdType = CONSTANTS.get("CMD_CO_PAY_TAX_AUTHORIZE");
  gCorp.requests = [null, request];
  gCorp.isAuthScreen = true;


  setReviewXmlStore(docXml);
  navCachedPages["corp/common/review/com-review"] = null;
  navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function genReviewTableXML(action) {
  var xmlDoc = createXMLDoc();
  var rootNode;
  rootNode = createXMLNode('review', '', xmlDoc);

  var sectionNode = createXMLNode('section', '', xmlDoc, rootNode);

  var tableNode = createXMLNode("table", "", xmlDoc, sectionNode);
  var theadNode = createXMLNode("thead", "", xmlDoc, tableNode);
  createXMLNode("th", CONST_STR.get('COM_NO'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('COM_MAKER'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('COM_TYPE_TRANSACTION'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('TRANS_PERIODIC_MNG_STT'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('TRANS_ACCNO_AMOUNT_CONT'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('COM_CHEKER'), xmlDoc, theadNode);
  createXMLNode("th", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, theadNode);

  var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);

  for (var i in listSelectedTrans) {
    var tran = listSelectedTrans[i];
    var tdNode;
    var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
    tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_NO"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", tran.SHORTNAME, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_MAKER"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", tran.DATMAKE, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_CREATED_DATE"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", CONST_STR.get("CONST_TAX_" + tran.TAX_TYPE), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_TYPE_TRANSACTION"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", CONST_STR.get("TRANS_STATUS_" + tran.CODSTATUS), xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("TRANS_PERIODIC_MNG_STT"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", formatNumberToCurrency(tran.NUMAMOUNT) + " VND", xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("TRANS_ACCNO_AMOUNT_CONT"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", tran.SIGNEDBY, xmlDoc, trNode);
    createXMLNode("title", CONST_STR.get("COM_CHEKER"), xmlDoc, tdNode);

    tdNode = createXMLNode("td", '', xmlDoc, trNode);
    createXMLNode("onclick", "showDetailAuthorizeTax(" + tran.IDFCATREF + ", " + true + ")",
      xmlDoc, tdNode);
    createXMLNode("value", tran.IDFCATREF, xmlDoc, tdNode);
    createXMLNode("title", CONST_STR.get("COM_TRANS_CODE"), xmlDoc, tdNode);
  }

  if (action == "reject") {
    var reasonElement = document.getElementById("id.reason-rej");
    sectionNode = createXMLNode('section', '', xmlDoc, rootNode);
    createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, xmlDoc, sectionNode);
  };

  var buttonNode = createXMLNode('button', '', xmlDoc, rootNode);
  var typeNode = createXMLNode('type', 'back', xmlDoc, buttonNode);
  var btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_BK'), xmlDoc, buttonNode);

  buttonNode = createXMLNode('button', '', xmlDoc, rootNode);
  typeNode = createXMLNode('type', 'authorize', xmlDoc, buttonNode);

  if (action == "reject") {
    btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_CON'), xmlDoc, buttonNode);
  }

  if (action == "authorize") {
    btnLabelNode = createXMLNode('label', CONST_STR.get('ESAVING_CHANGEINFO_BTN_CON'), xmlDoc, buttonNode);
  }

  return xmlDoc;
}

function compareCurrentTime() {
  var date = new Date();
  return (date.getHours() > 16 || (date.getHours == 16 && date.getMinutes() > 30));
}


function sendRequestExportExcel() {
  var transIds = "";
  for (var i in results) {
    transIds += results[i].IDFCATREF + ",";
  }
  var arrayClientInfo = new Array();
  arrayClientInfo.push(null);
  arrayClientInfo.push({
    sequenceId: "2",
    transType: "B11",
    transIds: transIds
  });

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

  data = getDataFromGprsCmd(gprsCmd);

  corpExportExcel(data);
}


