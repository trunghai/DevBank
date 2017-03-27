var rowsPerPage = 10;
var totalPages = 0;
var flag = true;

var searchData ;

gTax.results;
gTax.curPage;

function viewBackFromOther() {
  flag = false;
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.enddate', 'span.enddate');
  if(sessionStorage.getItem('searchTaxManager')){
    var searchDataTax = JSON.parse(sessionStorage.getItem('searchTaxManager'));
    searchData = {
      taxType: searchDataTax.taxType,
      taxDetail: searchDataTax.taxDetail,
      status: searchDataTax.status,
      idFcatref: searchDataTax.idFcatref,
      startDate: searchDataTax.startDate,
      enddate: searchDataTax.enddate,
      pageID: 1,
      pageSize: 10000000
    };
  }

}

function viewDidLoadSuccess() {
  if (flag) {
    console.log("viewDidLoadSuccess");
    searchData = {
      taxType: '',
      taxDetail: '',
      status: '',
      idFcatref: '',
      startDate: '',
      enddate: '',
      pageID: 1,
      pageSize: 10000000
    };
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = dd + '/' + mm + '/' + yyyy;

    var dateBegin = "01/" + mm + "/" + date.getFullYear();
    var dateEnd = today;

    document.getElementById("id.begindate").value = dateBegin;
    document.getElementById("id.mngenddate").value = dateEnd;

    createDatePicker('id.begindate', 'span.begindate');
    createDatePicker('id.mngenddate', 'span.enddate');

    if (gUserInfo.lang == 'EN') {
      document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_EN[0];
      document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_EN[0];
      document.getElementById("id.stt").value = CONST_MNG_TAX_STATUS_DETAIL_VALUE_EN[0];
    } else {
      document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_VN[0];
      document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_VN[0];
      document.getElementById("id.stt").value = CONST_MNG_TAX_STATUS_DETAIL_VALUE_VN[0];
    };
    sendJsonRequest();
  }
  else { // chuc nang back lai
    setTimeout(function () {
      sendJsonRequest();
    }, 150);

  }

}

//Show loại giao dịch
function showTaxType() {
  var value = (gUserInfo.lang == 'EN') ? CONST_MNG_TAX_TYPE_VALUE_EN : CONST_MNG_TAX_TYPE_VALUE_VN;
  var key = CONST_MNG_TAX_TYPE_KEY;

  var handleSelectTaxType = function(e) {
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
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
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
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
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
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
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
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
  var value = (gUserInfo.lang == 'EN') ? CONST_MNG_TAX_STATUS_DETAIL_VALUE_EN : CONST_MNG_TAX_STATUS_DETAIL_VALUE_VN;
  var key = CONST_MNG_TAX_STATUS_DETAIL_KEY;

  var handleSelectTaxStatus = function(e) {
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
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
    if (currentPage == "corp/payment_service/tax/pay_tax_manager") {
      document.removeEventListener("evtSelectionDialogClose", handleSelectTaxStatusClose, false);
      document.removeEventListener("evtSelectionDialog", handleSelectTaxStatus, false);
    }
  }

  document.addEventListener("evtSelectionDialog", handleSelectTaxStatus, false);
  document.addEventListener("evtSelectionDialogClose", handleSelectTaxStatusClose, false);
  showDialogList(CONST_STR.get('TRANS_PERIODIC_BTN_SELECT_FUNC'), value, key, false);
}

function sendJsonRequest() {
  var taxDtl = document.getElementById("id.taxDetail").value;
  var idFcatref = document.getElementById("idFcatref").value;
  var startDate = document.getElementById("id.begindate").value;
  searchData.startDate = startDate;
  searchData.endDate = endDate;
  searchData.idFcatref = idFcatref;
  var endDate = document.getElementById("id.mngenddate").value;
  if (taxDtl == "") {
    showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL")]));
    return;
  }
  // if (startDate == "") {
  //   showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_START_DATE")]));
  //   return;
  // }
  // if (endDate == "") {
  //   showAlertText(formatString(CONST_STR.get("CORP_MSG_COM_NO_INPUT"), [CONST_STR.get("COM_TO_DATE")]));
  //   return;
  // }

  if (calculateDifferentMonth(startDate, endDate)) {
    showAlertText(CONST_STR.get("CORP_MSG_ACC_TIME_SEARCH_NOT_VALID"));
    return;
  }
  searchData.pageID = 1;
  gTax.sequence_id = "1";
  gTax.taxType = searchData.taxType;
  gTax.taxDetail = searchData.taxDetail;
  gTax.status = searchData.status;
  gTax.idFcatref = idFcatref;
  gTax.startDate = startDate;
  gTax.endDate = endDate;
  gTax.pageSize = searchData.pageSize;
  gTax.pageId = searchData.pageID;
  gTax.idtxn = "B00";
  gTax.curPage = 1;
  sessionStorage.setItem('searchTaxManager',  JSON.stringify(searchData));
  var args = new Array();
  args.push("1");
  args.push(gTax);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_PAY_TAX_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, requestSearchSuccess, requestSearchFail);

}

function requestSearchSuccess(e) {
  var resp = JSON.parse(e);
  if (resp.respCode == '0' && resp.respJsonObj.length > 0) {

    gTax.results = resp.respJsonObj;
    var xmlData = genResultTable(resp.respJsonObj);
    var docXsl = getCachePageXsl("corp/payment_service/tax/pay-tax-list-result");
    totalPages = getTotalPages(resp.respJsonObj.length);

    genHTMLStringWithXML(xmlData, docXsl, function(html) {
      var tmpNode = document.getElementById('id.search');
      tmpNode.innerHTML = html;
      genPagging(totalPages, gTax.curPage);
    });

  } else
  // showAlertText(CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND'));
    document.getElementById('id.search').innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
  document.getElementById('pageIndicatorNums').innerHTML = "";

}

function requestSearchFail() {
console.log("Error request")
}

function genResultTable(inputData) {
  var docXml = createXMLDoc();

  var rootNode = createXMLNode('result', '', docXml);
  var childNodeTitle = createXMLNode('title', '', docXml, rootNode);
  var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('CONST_SETUP_QUERY_TIT_TRANS_TYPE_DTL'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_STATUS'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('COM_AMOUNT'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
  childNodeTit = createXMLNode('rowtitle7', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);

  var i = (gTax.curPage - 1) * rowsPerPage;
  var j = i + rowsPerPage;
  for (i; i < j; i++) {
    var obj = inputData[i];
    if (typeof obj !== "undefined") {
      var childNodeCont = createXMLNode('content', '', docXml, rootNode)
      var childNodeDeta = createXMLNode('acccontent1', i + 1, docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent2', obj.DATMAKE, docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent3', CONST_STR.get("CONST_TAX_" + obj.TAX_TYPE), docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent4', CONST_STR.get("TRANS_STATUS_" + obj.CODSTATUS), docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent5', formatNumberToCurrency(obj.NUMAMOUNT) + ' VND', docXml, childNodeCont);
      childNodeDeta = createXMLNode('acccontent6', obj.SIGNEDBY, docXml, childNodeCont);
      childNodeDeta = createXMLNode('transId', obj.IDFCATREF, docXml, childNodeCont);
    }
  };
  return docXml;
}

function showDetailPayTax(args) {
  var jsonData = new Object();
  jsonData.sequence_id = "2";
  jsonData.idFcatref = args;
  jsonData.idtxn = "B00";

  gTax.idFcatref = args;

  var args = new Array();
  args.push("2");
  args.push(jsonData);
  var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_PAY_TAX_MANAGER'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
  var data = getDataFromGprsCmd(gprsCmd);
  requestMBServiceCorp(data, true, 0, showDetailPayTaxSuccess, showDetailPayTaxFail);
}

function showDetailPayTaxSuccess(e) {
  var gprsResp = JSON.parse(e);
  setRespObjStore(gprsResp);
  if (gprsResp.respCode == 0 && gprsResp.respJsonObj.detail.length > 0 && gprsResp.respJsonObj.list.length > 0) {
    var obj = gprsResp.respJsonObj;
    gTax.refTax = obj.detail[0].REF_TAX;
    gTax.taxType = obj.detail[0].LOAI_THUE;
    genReviewScreen(obj);
  } else {
    showAlertText(CONST_STR.get('INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST'));
  };
};

function showDetailPayTaxFail() {

};

function genReviewScreen(obj) {

  var docXml = createXMLDoc();
  //root node 
  var tmpXmlRootNode = createXMLNode('review', '', docXml);
  var sectionNode = createXMLNode("section", "", docXml, tmpXmlRootNode);
  //review/reviewtitle //screen title
  var tmpXmlNodeInfo = createXMLNode('reviewtitle', CONST_STR.get('COM_TRASACTION_INFO'), docXml, tmpXmlRootNode);
  var tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);

  //ma giao dich
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TRANS_CODE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].MA_GIAO_DICH, docXml, tmpChildNodeAcc);

  // ngay lap
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_CREATED_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].NGAY_LAP, docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfodisplay', 'review', docXml, tmpChildNodeAcc); //display or not in result

  // ngay duyet
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_CHECK_DATE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].NGAY_DUYET, docXml, tmpChildNodeAcc);

  //trang thai
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_STATUS'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get("TRANS_STATUS_" + obj.detail[0].TRANG_THAI), docXml, tmpChildNodeAcc);

  //ly do huy
  if(obj.detail[0].TRANG_THAI == "REJ"){
    var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
    var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_AUTH_DENIAL_REASON'), docXml, tmpChildNodeAcc);
    tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].LY_DO, docXml, tmpChildNodeAcc);
  }

  // //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_ACCOUNT_INFO'), docXml, tmpXmlNodeInfo);

  //Loai giao dich
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TYPE_TRANSACTION'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get('MENU_CHILD_PAY_TAX'), docXml, tmpChildNodeAcc);

  //tai khoa chuen
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TAI_KHOAN_CHUYEN, docXml, tmpChildNodeAcc);

  //So du kha dung
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('CRE_DEBT_SURPLUS_AVAILABEL'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj.detail[0].SO_DU_KHA_DUNG) + ' VND', docXml, tmpChildNodeAcc);

  // //review/reviewinfo/reviewtranstitle
  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('TAX_PAY_TAX_CUST_INFO'), docXml, tmpXmlNodeInfo);

  //Ma so thue
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TAX_NUMBER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].MA_SO_THUE, docXml, tmpChildNodeAcc);

  //Nguoi nop thue
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_CUST_PAY_TAX'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].NGUOI_NOP_THUE, docXml, tmpChildNodeAcc);

  //Dia chi nguoi nop thue
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_CUST_PAY_TAX_ADDRESS'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].DIA_CHI_NGUOI_NOP_THUE, docXml, tmpChildNodeAcc);

  if(obj.detail[0].LOAI_THUE == '01' || obj.detail[0].LOAI_THUE == '02' || obj.detail[0].LOAI_THUE == '05')
  {
  	// thong tin nop thue
	  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
	  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('TAX_INFO'), docXml, tmpXmlNodeInfo);

	  //Loai Thue
	  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TAX_TYPE'), docXml, tmpChildNodeAcc);
	  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].LOAI_THUE +" - " +CONST_STR.get("CONST_TAX_" + obj.detail[0].LOAI_THUE), docXml, tmpChildNodeAcc);

	  //KBNN thu
	  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_TREASURY_NAME'), docXml, tmpChildNodeAcc);
	  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].KBNN_THU +" - " + obj.detail[0].TEN_KB_NN_THU, docXml, tmpChildNodeAcc);

	  //TK thu NSNN
    var treasuryAccNumValue =  obj.detail[0].TK_THU_NSNN ;
    if (treasuryAccNumValue == '7111') {
      treasuryAccNumValue = treasuryAccNumValue + ' - '+ CONST_STR.get('TAX_TREASURY_ACC_NOP_NSNN');
    } else if (treasuryAccNumValue == '3511') {
      treasuryAccNumValue = treasuryAccNumValue + ' - '+ CONST_STR.get('TAX_TREASURY_ACC_TAM_THU');
    } else {
      treasuryAccNumValue = treasuryAccNumValue + ' - '+ CONST_STR.get('TAX_TREASURY_ACC_THU_QUY');
    }

	  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_TREASURY_ACC'), docXml, tmpChildNodeAcc);
	  tmpChildNode = createXMLNode('transinfocontent',treasuryAccNumValue, docXml, tmpChildNodeAcc);
	  //CQ QL Thu
	  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_TREASURY_MNG'), docXml, tmpChildNodeAcc);
	  tmpChildNode = createXMLNode('transinfocontent',obj.detail[0].MA_CQ_QL_THU +' - '+ obj.detail[0].CQ_QL_THU, docXml, tmpChildNodeAcc);

      //so to khai
      var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
      var tmpChildNode = createXMLNode('transinfotitle',CONST_STR.get('COM_DECLAR'), docXml, tmpChildNodeAcc);
      tmpChildNode = createXMLNode('transinfocontent',  obj.detail[0].SO_TO_KHAI, docXml, tmpChildNodeAcc);

      //loai tien
      var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
      var tmpChildNode = createXMLNode('transinfotitle',CONST_STR.get('TAX_MONEY_TYPE'), docXml, tmpChildNodeAcc);
      tmpChildNode = createXMLNode('transinfocontent',  obj.detail[0].LOAI_TIEN_HAI_QUAN +' - '+ CONST_STR.get('K_TAX_HQ_' + obj.detail[0].LOAI_TIEN_HAI_QUAN), docXml, tmpChildNodeAcc);

      // ngay dang ky to khai
      var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
      var tmpChildNode = createXMLNode('transinfotitle',CONST_STR.get('TAX_DECLAR_DATE'), docXml, tmpChildNodeAcc);
      tmpChildNode = createXMLNode('transinfocontent',  obj.detail[0].NGAY_DANG_KY_TO_KHAI, docXml, tmpChildNodeAcc);

      // ma loai xuat nhap khau
      var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
      var tmpChildNode = createXMLNode('transinfotitle',CONST_STR.get('TAX_IE_CODE_TYPE'), docXml, tmpChildNodeAcc);
      tmpChildNode = createXMLNode('transinfocontent',  obj.detail[0].MA_LOAI_HINH_XNK +' - '+  obj.detail[0].TEN_LH, docXml, tmpChildNodeAcc);

	  // //review/reviewinfo/reviewtranstitle
	  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
	  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TRASACTION_INFO'), docXml, tmpXmlNodeInfo);

	  //Bảng
	  var transtables = createXMLNode("transtables", "", docXml, tmpXmlRootNode);
	  var table = createXMLNode("table", "", docXml, transtables);
	  var titles = createXMLNode("titles", "", docXml, table);
	  createXMLNode("table-title", CONST_STR.get('COM_NO'), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get('TAX_CHAPTER'), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get('TAX_CONTENT'), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get('COM_AMOUNT'), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get('TAX_PERIODIC'), docXml, titles);

	  var rows = createXMLNode("rows", "", docXml, table);
	  for (var i in obj.list) {
        var  economyContent = obj.list[i].NOI_DUNG_KINH_TE;
        if(economyContent ==''||economyContent ==null || typeof economyContent == 'undefined' )
          economyContent = obj.list[i].MA_NOI_DUNG_KINH_TE;
	    var row = createXMLNode("row", "", docXml, rows);
	    var tblContent = createXMLNode("table-content", parseInt(i) + 1, docXml, row);
	    createXMLNode("title", CONST_STR.get('COM_NO'), docXml, tblContent);

	    tblContent = createXMLNode("table-content", obj.list[i].CHUONG, docXml, row);
	    createXMLNode("title", CONST_STR.get('TAX_CHAPTER'), docXml, tblContent);

	    tblContent = createXMLNode("table-content", economyContent, docXml, row);
	    createXMLNode("title", CONST_STR.get('TAX_CONTENT'), docXml, tblContent);

	    tblContent = createXMLNode("table-content", formatNumberToCurrency(obj.list[i].SO_TIEN) + ' VND', docXml, row);
	    createXMLNode("title", CONST_STR.get('COM_AMOUNT'), docXml, tblContent);
	    createXMLNode("class", "td-right", docXml, tblContent);

	    tblContent = createXMLNode("table-content", obj.list[i].KY_THUE, docXml, row);
	    createXMLNode("title", CONST_STR.get('TAX_PERIODIC'), docXml, tblContent);
	  }
  }

  
  if(obj.detail[0].LOAI_THUE == '06')
  {  	
     tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
     tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('TAX_INFO_REVENUE'), docXml, tmpXmlNodeInfo);

    //Loai Thue
    var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
    var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TAX_TYPE'), docXml, tmpChildNodeAcc);
    tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].LOAI_THUE +" - " +CONST_STR.get("CONST_TAX_" + obj.detail[0].LOAI_THUE), docXml, tmpChildNodeAcc);
     //Ma ngan hang thu huong
     var tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_BANK_BENEFICIARY_CODE'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].MA_NH_NHAN, docXml, tmpChildNodeTitle);

	 //Ten ngan hang thu huong
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_BANK_BENEFICIARY_NAME'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TEN_NH_THU_HUONG, docXml, tmpChildNodeTitle);

	  //Tai khoan thu huong
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TK_THU_HUONG, docXml, tmpChildNodeTitle);

	 //Ten tai khoan thu huong
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_ACCOUNT_BENEFICIARY_NAME'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TEN_TK_THU_HUONG, docXml, tmpChildNodeTitle);

	  //Ma nguyen te
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_EXCHANGERATES_CODE'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].MA_NGUYEN_TE, docXml, tmpChildNodeTitle);

	 //ty gia quy doi
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_EXCHANGERATES_VALUE'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TY_GIA, docXml, tmpChildNodeTitle);

	  //tong tien nguyen te
	 tmpChildNodeTitle = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
	 tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_EXCHANGE_SUM'), docXml, tmpChildNodeTitle);
	 tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency( obj.detail[0].TONG_TIEN_NGUYEN_TE) , docXml, tmpChildNodeTitle);	


	 // //review/reviewinfo/reviewtranstitle
	  tmpXmlNodeInfo = createXMLNode('reviewinfo', '', docXml, tmpXmlRootNode);
	  tmpXmlNodeTransTitle = createXMLNode('reviewtranstitle', CONST_STR.get('COM_TRASACTION_INFO'), docXml, tmpXmlNodeInfo);

	  //Bảng
	  var transtables = createXMLNode("transtables", "", docXml, tmpXmlRootNode);
	  var table = createXMLNode("table", "", docXml, transtables);
	  var titles = createXMLNode("titles", "", docXml, table);

	  createXMLNode("table-title", CONST_STR.get("COM_NO"), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get("TAX_CONTENT"), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get("TAX_CONTENT_TITLE"), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get("TAX_CURRENCY_MONEY"), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get("TAX_CURRENCY_MONEY_LOCAL"), docXml, titles);
	  createXMLNode("table-title", CONST_STR.get("TAX_CURRENCY_NOTE"), docXml, titles);

	  var tbodyNode = createXMLNode("rows", "", docXml, table);
      var sttNo = 0;
      for (var i in obj.list) {
         trNode = createXMLNode("row", "", docXml, tbodyNode);
         sttNo = sttNo + 1;
         var tdNode = createXMLNode("table-content", sttNo, docXml, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("COM_NO"), docXml, tdNode);

         tdNode = createXMLNode("table-content", obj.list[i].MA_NOI_DUNG_KINH_TE, docXml, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CONTENT"), docXml, tdNode);

         tdNode = createXMLNode("table-content", obj.list[i].NOI_DUNG_KINH_TE, docXml, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CONTENT_TITLE"), docXml, tdNode);

         tdNode = createXMLNode("table-content", formatNumberToCurrency(obj.list[i].SO_TIEN_NGUYEN_TE) , docXml, trNode);
         createXMLNode("class", 'td-right', docXml, tdNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY"), docXml, tdNode);

         tdNode = createXMLNode("table-content", formatNumberToCurrency(obj.list[i].SO_TIEN), docXml, trNode);
         createXMLNode("class", 'td-right', docXml, tdNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_MONEY_LOCAL"), docXml, tdNode);

         tdNode = createXMLNode("table-content", obj.list[i].GHICHU, docXml, trNode);
         tdNode = createXMLNode("title", CONST_STR.get("TAX_CURRENCY_NOTE"), docXml, tdNode);
      }	 
  }
  


  
 
  tmpXmlNodeInfo = createXMLNode('reviewinfo2', '', docXml, tmpXmlRootNode);


  if(obj.detail[0].LOAI_THUE == '01')
	{
		var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
		var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_TREASURY_CODE_1'), docXml, tmpChildNodeAcc);
		tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].TEN_KHO_BAC , docXml, tmpChildNodeAcc);
   }

  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_TOTAL_PAY_MONEY'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj.detail[0].SO_TIEN_THANH_TOAN) + ' VND', docXml, tmpChildNodeAcc);


   //Phi giao dich
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_FEE'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', formatNumberToCurrency(obj.detail[0].PHI_GIAO_DICH) + ' VND', docXml, tmpChildNodeAcc);

  //Noi dung
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_DESCRIPTION'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', obj.detail[0].NOI_DUNG, docXml, tmpChildNodeAcc);

  //Luu ma so thue
  var isSave = (obj.detail[0].ISSAVE == '1') ? CONST_STR.get("TAX_SAVE_CODE") : CONST_STR.get("TAX_NO_SAVE_CODE");

  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('TAX_SAVE_TAX_QUERY'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', isSave, docXml, tmpChildNodeAcc);

  //SEND METHOD
  var tmpChildNodeAcc = createXMLNode('transinfo', '', docXml, tmpXmlNodeInfo);
  var tmpChildNode = createXMLNode('transinfotitle', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, tmpChildNodeAcc);
  tmpChildNode = createXMLNode('transinfocontent', CONST_STR.get("COM_NOTIFY_" + obj.detail[0].SEND_METHOD), docXml, tmpChildNodeAcc);

  console.log(docXml);
  //luu xml trong cache
  if (obj.detail[0].TRANG_THAI == 'ABH') {
    createXMLNode('print', '', docXml, tmpXmlRootNode);
  } else if (obj.detail[0].TRANG_THAI == 'INT') {
    createXMLNode('cancel', '', docXml, tmpXmlRootNode);
  };

  setRespObjStore(obj);
  setReviewXmlStore(docXml);

  navCachedPages["corp/payment_service/tax/pay-tax-list-detail-scr"] = null;
  navController.pushToView("corp/payment_service/tax/pay-tax-list-detail-scr", true, 'xsl');

}

function getTotalPages(totalRows) {
  return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}

function pageIndicatorSelected(selectedIdx, selectedPage) {
  gTax.curPage = selectedIdx;

  var xmlData = genResultTable(gTax.results);
  var docXsl = getCachePageXsl("corp/payment_service/tax/pay-tax-list-result");

  // sendJsonRequest();
  genHTMLStringWithXML(xmlData, docXsl, function(html) {
      var tmpNode = document.getElementById('id.search');
      tmpNode.innerHTML = html;
      genPagging(totalPages, gTax.curPage);
    });
}

function genPagging(totalPages, pageIdx) {
  var nodepage = document.getElementById('pageIndicatorNums');
  var tmpStr = genPageIndicatorHtml(totalPages, pageIdx);
  nodepage.innerHTML = tmpStr;
}

function resetInput() {
  createDatePicker('id.begindate', 'span.begindate');
  createDatePicker('id.mngenddate', 'span.enddate');

  if (gUserInfo.lang == 'EN') {
    document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_EN[0];
    document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_EN[0];
    document.getElementById("id.stt").value = CONST_MNG_TAX_STATUS_DETAIL_VALUE_EN[0];
  } else {
    document.getElementById("id.taxType").value = CONST_MNG_TAX_TYPE_VALUE_VN[0];
    document.getElementById("id.taxDetail").value = CONST_MNG_TAX_DETAIL_VALUE_VN[0];
    document.getElementById("id.stt").value = CONST_MNG_TAX_STATUS_DETAIL_VALUE_VN[0];
  };

  document.getElementById("idFcatref").value = '';
  document.getElementById("id.begindate").value = '';
  document.getElementById("id.mngenddate").value = '';
  document.getElementById("id.search").innerHTML = '';
  document.getElementById("pageIndicatorNums").innerHTML = '';

  searchData.taxDetail = '';
  searchData.status  = '';
  
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

function sendRequestExportExcel() {
  var taxDtl = document.getElementById("id.taxDetail").value;
  var idFcatref = document.getElementById("idFcatref").value;
  var startDate = document.getElementById("id.begindate").value;
  searchData.startDate = startDate;
  searchData.endDate = endDate;
  searchData.idFcatref = idFcatref;
  var endDate = document.getElementById("id.mngenddate").value;


  gTax.sequenceId = "13";
  gTax.taxType = searchData.taxType;
  gTax.taxDetail = searchData.taxDetail;
  gTax.status = searchData.status;
  gTax.idFcatref = idFcatref;
  gTax.startDate = startDate;
  gTax.endDate = endDate;
  gTax.idtxn = "B00";

  var arrayClientInfo = new Array();
  arrayClientInfo.push(2);
  arrayClientInfo.push(gTax);

  var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);
  data = getDataFromGprsCmd(gprsCmd);
  corpExportExcel(data);
}
