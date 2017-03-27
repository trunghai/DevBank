gTrans.idtxn = "T61";

var rowsPerPage = 10;
var totalPages;

var results;
var curTrans;
var listSelectedTrans;

gTrans.makers;
gTrans.limit;
gTrans.curPage;

var searchInfo;

function viewBackFromOther() {
	//Flag check
	gTrans.isBack = true;
}

function viewDidLoadSuccess() {
	createDatePicker('id.begindate', 'span.begindate');					
	createDatePicker('id.enddate', 'span.enddate');

	gCorp.limit = undefined;

	if (!gTrans.isBack) {
		searchInfo = {
			transType : "T12",
			maker : "",
			status : "",
			fromDate : "",
			endDate : ""
		};

		totalPages = 0;
		gTrans.curPage = 1;


	}
	loadInitData();
	gTrans.isBack = false;
	//sendJSONRequest();.
	// setTimeout(function () {
     //   document.getElementById("btn_search").click();
    // }, 1100);
}

//--0. common
function addEventListenerToCombobox(selectHandle, closeHandle) {
	document.addEventListener("evtSelectionDialog", selectHandle, false);
	document.addEventListener("evtSelectionDialogClose", closeHandle, false);
}

function removeEventListenerToCombobox(selectHandle, closeHandle) {
	document.removeEventListener("evtSelectionDialog", selectHandle, false);
	document.removeEventListener("evtSelectionDialogClose", closeHandle, false);
}
//--END 0

function loadInitData() {
	angular.module('EbankApp').controller('internal-trans-auth-src', function ($rootScope, $scope, requestMBServiceCorp) {
		// body...
		init();
		function init() {
			if (!gTrans.isBack){
				var jsonData = new Object();
				jsonData.sequence_id = "1";
				jsonData.idtxn = gTrans.idtxn;
				var	args = new Array();
				args.push(null);
				args.push(jsonData);
				var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_AU_INTERNAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
				var data = getDataFromGprsCmd(gprsCmd);
				requestMBServiceCorp.post(data, function(data) {
					var resp = data;
					if (resp.respCode === '0' && resp.respJsonObj.makers.length > 0 && resp.respJsonObj.limit) {
						gTrans.makers = resp.respJsonObj.makers;
						gTrans.limit = resp.respJsonObj.limit;


						if (resp.respJsonObj.list_pending.length > 0) {
							results = resp.respJsonObj.list_pending;
							totalPages = getTotalPages(results.length);

							var xmlData = genXmlData(1);
							var docXsl = getCachePageXsl("corp/authorize/transfer/internal/internal-trans-auth-result-tbl");

							genHTMLStringWithXML(xmlData, docXsl, function(html){
								var tmpNode = document.getElementById('id.searchResult');
								tmpNode.innerHTML = html;
								genPagging(totalPages, 1);
							});

						} else {
							document.getElementById("id.searchResult").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
						}


					} else {
						showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
						gotoHomePage();
					}
				}, function() {
					showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
					gotoHomePage();
				});
			}
		}

		//--4. Gửi thông tin tìm kiếm
		$scope.sendJSONRequest = function (){
			document.getElementById('id.searchResult').innerHTML = "";

			searchInfo.fromDate = document.getElementById("id.begindate").value;
			searchInfo.endDate = document.getElementById("id.enddate").value;

			var jsonData = new Object();
			jsonData.sequence_id = "2";
			jsonData.idtxn = gTrans.idtxn;

			jsonData.transType = searchInfo.transType;
			jsonData.status = searchInfo.status;
			jsonData.maker = searchInfo.maker;
			jsonData.fromDate = searchInfo.fromDate;
			jsonData.endDate = searchInfo.endDate;

			var	args = new Array();
			args.push("2");
			args.push(jsonData);
			var gprsCmd = new GprsCmdObj(CONSTANTS.get('CMD_CO_AU_INTERNAL'), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
			var data = getDataFromGprsCmd(gprsCmd);

			requestMBServiceCorp.post(data, requestMBServiceSuccess, requestMBServiceFail);
		}
		
	});
	angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}

//--1. Xử lý chọn loại giao dịch
function showTransTypeSelection()
{
	var cbxValues = (gUserInfo.lang == 'EN')? CONST_INTERNAL_TRANS_TYPE_EN : CONST_INTERNAL_TRANS_TYPE_VN;
	addEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	showDialogList(CONST_STR.get('COM_CHOOSEN_TYPE_TRANS'), cbxValues, CONST_INTERNAL_TRANS_TYPE_KEY, false);
}

function handleSelectTransType(e) {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
	searchInfo.transType = e.selectedValue2;
	document.getElementById('id.trans-type').value = e.selectedValue1;
}

function handleCloseTransTypeCbx() {
	removeEventListenerToCombobox(handleSelectTransType, handleCloseTransTypeCbx);
}
//--END 1

//--2. Xử lý chọn trạng thái
function showTransStatusSelection() {
	var cbxValues = (gUserInfo.lang == 'EN')? INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_EN: INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_VN;
	addEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_STATUS'), cbxValues, INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_KEY, false);
}

function handleSelectdTransStatus(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
	searchInfo.status = e.selectedValue2;
	document.getElementById("id.status").value = e.selectedValue1;
}

function handleCloseTransStatusCbx(e) {
	removeEventListenerToCombobox(handleSelectdTransStatus, handleCloseTransStatusCbx);
}
//--END 2

//--3. Xử lý chọn người lập
function showMakers(){
	var cbxText = [];
	var cbxValues = [];
	cbxText.push(CONST_STR.get("COM_ALL"));
	cbxValues.push("");
	for (var i in gTrans.makers) {
		var userId = gTrans.makers[i].IDUSER;
		cbxText.push(userId);
		cbxValues.push(userId);
	}
	addEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	showDialogList(CONST_STR.get('COM_CHOOSE_MAKER'), cbxText, cbxValues, false);
}

function handleSelectMaker(e){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
	searchInfo.maker = e.selectedValue2;
	document.getElementById('id.maker').value = e.selectedValue1;
}
function handleCloseMakerCbx(){
	removeEventListenerToCombobox(handleSelectMaker, handleCloseMakerCbx);
}
//--END 3



function requestMBServiceSuccess(e){
	var resp = JSON.parse(e);
	
	if (resp.respCode == '0' && resp.respJsonObj.length > 0) {
		results = resp.respJsonObj;
		totalPages = getTotalPages(results.length);

		var xmlData = genXmlData(1);
		var docXsl = getCachePageXsl("corp/authorize/transfer/internal/internal-trans-auth-result-tbl");

		genHTMLStringWithXML(xmlData, docXsl, function(html){
			var tmpNode = document.getElementById('id.searchResult');
			tmpNode.innerHTML = html;
			genPagging(totalPages, 1);
		});

	} else {
		document.getElementById("id.searchResult").innerHTML = "<h5>" + CONST_STR.get("INTERNAL_TRANS_AUTH_ERROR_GET_INTERNAL_TRANS_LIST") + "</h5>";
	}
};

function requestMBServiceFail(e){
	showAlertText(CONST_STR.get('CORP_MSG_INTERNAL_TRANS_ERROR_GET_DATA'));
};
//--END 4

//--5. Gen giao diện kết quả va phân trang
function getTotalPages(totalRows) {
	return totalRows % rowsPerPage == 0 ? Math.floor(totalRows / rowsPerPage) : Math.floor(totalRows / rowsPerPage) + 1;
}


function genXmlData(idx) {
	var docXml = createXMLDoc();

	var rootNode = createXMLNode('result','',docXml);
	var childNodeTitle = createXMLNode('title','',docXml, rootNode);
	var childNodeTit = createXMLNode('rowtitle1', CONST_STR.get('COM_NO'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle2', CONST_STR.get('COM_CREATED_DATE'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle3', CONST_STR.get('COM_ACCOUNT_DEST'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle4', CONST_STR.get('COM_RECEIVE_NAME'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle5', CONST_STR.get('COM_AMOUNT'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle6', CONST_STR.get('COM_CHEKER'), docXml, childNodeTitle);
	childNodeTit = createXMLNode('rowtitle7', CONST_STR.get('COM_TRANS_CODE'), docXml, childNodeTitle);
	
	var startIdx = (idx - 1) * rowsPerPage;
	var endIdx = startIdx + rowsPerPage;
	var stt = startIdx + 1;
	var idx = 0;
	for (var i = startIdx; i < endIdx; i++) {
		var obj = results[i];
		if (typeof obj !== "undefined") {
			var childNodeCont = createXMLNode('content','',docXml,rootNode)
			createXMLNode('title1', CONST_STR.get('COM_NO'), docXml,childNodeCont);
			createXMLNode('acccontent1', stt++, docXml,childNodeCont);
			createXMLNode('title2', CONST_STR.get('COM_CREATED_DATE'), docXml,childNodeCont);
			createXMLNode('acccontent2', obj.NGAY_LAP, docXml,childNodeCont);
			createXMLNode('title3', CONST_STR.get('COM_ACCOUNT_DEST'), docXml,childNodeCont);
			createXMLNode('acccontent3', obj.TK_NHAN, docXml,childNodeCont);
			createXMLNode('title4', CONST_STR.get('COM_RECEIVE_NAME'), docXml,childNodeCont);
			createXMLNode('acccontent4', obj.NGUOI_NHAN, docXml,childNodeCont);
			createXMLNode('title5', CONST_STR.get('COM_AMOUNT'), docXml,childNodeCont);
			createXMLNode('acccontent5', formatNumberToCurrency(obj.SO_TIEN) + " " + obj.DV_TIEN, docXml,childNodeCont);
			createXMLNode('title6', CONST_STR.get('COM_CHEKER'), docXml,childNodeCont);
			createXMLNode('acccontent6', obj.NGUOI_DUYET, docXml,childNodeCont);
			createXMLNode('title7', CONST_STR.get('COM_TRANS_CODE'), docXml,childNodeCont);
			createXMLNode('idx', idx++, docXml,childNodeCont);
			createXMLNode('title8', "", docXml,childNodeCont);
			createXMLNode('transId', obj.MA_GD, docXml,childNodeCont);
		}
	};

	return docXml;
}

function genPagging(totalPages, pageIdx) {
	var nodepage = document.getElementById('pageIndicatorNums');
	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx); //Tong so trang - trang hien tai
	gTrans.curPage = pageIdx;
	nodepage.innerHTML = tmpStr;
}

function pageIndicatorSelected(selectedIdx, selectedPage) { 
	document.getElementById('id.searchResult').innerHTML = "";

	var xmlData = genXmlData(selectedIdx);
	var docXsl = getCachePageXsl("corp/authorize/transfer/internal/internal-trans-auth-result-tbl");

	genHTMLStringWithXML(xmlData, docXsl, function(html){
		var tmpNode = document.getElementById('id.searchResult');
		tmpNode.innerHTML = html;
		genPagging(totalPages, selectedIdx);
	});
}
//--END 5

//--6. Xử lý khi ấn vào mã giao dịch
function showDetailTransaction(idx) {
	curTrans = results[idx];

	var docXml = genReviewXML(curTrans);

	var transIds = [];
	var transInfo = [];
	transIds.push(curTrans.MA_GD);
	transInfo.push({
		transId : curTrans.MA_GD
	});

	var rejRequest = {
        sequence_id: "3",
        idtxn : gTrans.idtxn,
        transIds : transIds.toString(),
        transInfo : transInfo
    };

    transInfo = [];
	transInfo.push({
		transId : curTrans.MA_GD,
		idTxn : curTrans.LOAI_GD,
		userIdRef : curTrans.IDUSERREFERENCE
	});

    var authRequest = {
        sequence_id: "4",
        idtxn : gTrans.idtxn,
        transInfo : transInfo
    };


    gCorp.cmdType = CONSTANTS.get("CMD_CO_AU_INTERNAL");
    gCorp.requests = [authRequest, rejRequest];
    if (searchInfo.transType == "T12") {
    	gCorp.limit = gTrans.limit;
	}

	gCorp.totalAmount = curTrans.SO_TIEN;
	gCorp.numBalance = curTrans.SO_DU_KHA_DUNG;

	//setSequenceFormIdx(401);
	gCorp.isAuthScreen = true;
    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');

}


function genReviewXML(transInfo) {
	var docXml = createXMLDoc();
    var rootNode;

    rootNode = createXMLNode('review', '', docXml);

    /* Thông tin chung */
    var sectionNode = createXMLNode('section', '', docXml, rootNode);
    var titleNode = createXMLNode('title', CONST_STR.get('AUTHORIZE_LIST_TRANS_WAITING_FOR_AUTH'), docXml, sectionNode);

    // Ma giao dich
    var rowNode = createXMLNode('row', '', docXml, sectionNode);
    var labelNode = createXMLNode('label', CONST_STR.get('COM_TRANS_CODE'), docXml, rowNode);
    var valueNode = createXMLNode('value', transInfo.MA_GD, docXml, rowNode);

    // Ngay thuc hien
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_TRANSACTION_DATE'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.NGAY_LAP, docXml, rowNode);

    // Lý do từ chối
    // if (transInfo.TXTREASON != null) {
    //     rowNode = createXMLNode('row', '', docXml, sectionNode);
    //     labelNode = createXMLNode('label', CONST_STR.get('CRP_SUM_REJECT'), docXml, rowNode);
    //     valueNode = createXMLNode('value', transInfo.TXTREASON, docXml, rowNode);
    // }

    /* Thong tin tai khoan */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_INFO_TITLE'), docXml, sectionNode);

    //trans type
    var tmpArr = (gUserInfo.lang == 'EN') ? INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_EN : INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_VN;
    var transType = tmpArr[INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_KEY.indexOf(transInfo.LOAI_GD)];
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_TYPE'), docXml, rowNode);
    valueNode = createXMLNode('value', transType, docXml, rowNode);

    // tai khoan chuyen
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_BATCH_ACC_LABEL'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TK_CHUYEN, docXml, rowNode);

    // so du kha dung
    var soDuKhaDung = parseInt(transInfo.SO_DU_KHA_DUNG);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('ACC_AVAI_BALANCE_TITLE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(soDuKhaDung) + " " + transInfo.DV_TIEN, docXml, rowNode);
    
    /* Thong tin giao dich */
    sectionNode = createXMLNode('section', '', docXml, rootNode);
    titleNode = createXMLNode('title', CONST_STR.get('COM_TXT_ACC_CONFIRM_TRANS_TITLE'), docXml, sectionNode);

    // tai khoan nhan
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.TK_NHAN, docXml, rowNode);
   
    // chu tai khoan nhan 
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_RECEIVER'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.NGUOI_NHAN, docXml, rowNode);
    
    // so tien
    var soTien = parseInt(transInfo.SO_TIEN);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_AMOUNT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(soTien) + " " + transInfo.DV_TIEN, docXml, rowNode);
    
    // phi dich vu
    var phidv = transInfo.PHI_DV == null ? 0 : parseInt(transInfo.PHI_DV);
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('CREDIT_CARD_PAYMENT_FEE'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(phidv) + " " + transInfo.DV_TIEN, docXml, rowNode);
    
    // so du sau khi chuyen
    var soDuSauChuyen = soDuKhaDung - soTien - phidv;
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_LOCAL_BALANCE_CONT'), docXml, rowNode);
    valueNode = createXMLNode('value', formatNumberToCurrency(soDuSauChuyen) + " " + transInfo.DV_TIEN, docXml, rowNode);

    // noi dung
    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('TRANS_PERIODIC_CONTENT'), docXml, rowNode);
    valueNode = createXMLNode('value', transInfo.NOI_DUNG, docXml, rowNode);

    // gui thong bao
    var isSaveTemplate = false;
    rowNode = createXMLNode('row', '', docXml, sectionNode);
	labelNode = createXMLNode('label', CONST_STR.get('COM_SAVE_BENE'), docXml, rowNode);
    if (transInfo.TYPE_TEMPLATE == "0") {
    	valueNode = createXMLNode('value', CONST_STR.get('TRANS_INTERNAL_SAVE_TEMPLATE_TH'), docXml, rowNode);
    } else if (transInfo.TYPE_TEMPLATE == "1") {
    	isSaveTemplate = true;
    	valueNode = createXMLNode('value', CONST_STR.get('TRANS_INTERNAL_SAVE_TEMPLATE_TP'), docXml, rowNode);
    } else {
    	valueNode = createXMLNode('value', CONST_STR.get('TRANS_INTERNAL_SAVE_TEMPLATE_N'), docXml, rowNode);
    }

    // ten mau chuyen tien
    if (isSaveTemplate) {
    	rowNode = createXMLNode('row', '', docXml, sectionNode);
	    labelNode = createXMLNode('label', CONST_STR.get('MANAGE_TEMPLATE_TRANS_NAME'), docXml, rowNode);
	    valueNode = createXMLNode('value', transInfo.TEN_MAU, docXml, rowNode);
    }

    rowNode = createXMLNode('row', '', docXml, sectionNode);
    labelNode = createXMLNode('label', CONST_STR.get('COM_SEND_MSG_APPROVER'), docXml, rowNode);
    valueNode = createXMLNode('value', CONST_STR.get('COM_NOTIFY_' + transInfo.SENDMETHOD), docXml, rowNode);

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
    btnLabelNode = createXMLNode('label', CONST_STR.get('AUTHORIZE_BTN_AUTHEN'), docXml, buttonNode);

    return docXml;
    
}
//--END 6

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

function authorizeTransaction() {
	var checkboxes = document.getElementsByClassName("trans.checkbox");
	var i;
	listSelectedTrans = [];
	for (i = 0; i < checkboxes.length; i++) {
	    if (checkboxes[i].checked == true) {
	    	listSelectedTrans.push(results[(gTrans.curPage - 1) * rowsPerPage + parseInt(checkboxes[i].name)]);
	    }
	}

	if (listSelectedTrans.length == 0) {
		showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
		return;
	}

	var docXml = genReviewTableXML("authorize");

	var transInfo = [];
	var transSummaryArr = [];
	var totalAmount = 0;
	var totalBalance = 0;
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		transInfo.push({
			transId : tran.MA_GD,
			idTxn : tran.LOAI_GD,
			userIdRef : tran.IDUSERREFERENCE,
		});

		//Tinh gia tri de check so tien chuyen hop le
		var isExist = false;
		for (var j in transSummaryArr) {
			var tmpTran = transSummaryArr[j];
			if (tmpTran.account == tran.TK_CHUYEN) {
				tmpTran.totalAmount += (parseInt(tran.SO_TIEN) + parseInt(tran.PHI_DV));
				isExist = true;
			}
		}
		if (!isExist) {
			var tmpTran = {
				account : tran.TK_CHUYEN,
				totalAmount : parseInt(tran.SO_TIEN) + parseInt(tran.PHI_DV),
				numBalance : parseInt(tran.SO_DU_KHA_DUNG)
			}
			transSummaryArr.push(tmpTran);
		}
		//-------

		totalAmount += parseInt(tran.SO_TIEN);
		totalBalance += parseInt(tran.SO_DU_KHA_DUNG);
	}

	var request = {
        sequence_id: "4",
        idtxn : gTrans.idtxn,
        transInfo : transInfo
    };
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AU_INTERNAL");
    gCorp.requests = [request, null];
    if (searchInfo.transType == "T12") {
    	gCorp.limit = gTrans.limit;
    }
    gCorp.totalAmount = totalAmount;
    gCorp.numBalance = totalBalance;
    gCorp.transSummaryArr = transSummaryArr;

    gCorp.isAuthScreen = true;
    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}

function rejectTransaction() {
	var reason = document.getElementById("id.reason-rej").value;
	if (!reason) {
		showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
		return;
	}

	var checkboxes = document.getElementsByClassName("trans.checkbox");
	var i;
	listSelectedTrans = [];
	for (i = 0; i < checkboxes.length; i++) {
	    if (checkboxes[i].checked == true) {
	    	listSelectedTrans.push(results[(gTrans.curPage - 1) * rowsPerPage + parseInt(checkboxes[i].name)]);
	    }
	}

	if (listSelectedTrans.length == 0) {
		showAlertText(CONST_STR.get("COM_MUST_CHOOSE_TRANS"));
		return;
	}

	var docXml = genReviewTableXML("reject");

	var transIds = [];
	var transInfo = [];
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		transIds.push(tran.MA_GD);
		transInfo.push({
			transId : tran.MA_GD,
	        nguoiLap : tran.NGUOI_LAP,
	        ngayLap : tran.NGAY_LAP,
	        nguoiDuyet : tran.NGUOI_DUYET
		});
	}

	var request = {
        sequence_id: "3",
        idtxn : gTrans.idtxn,
        rejectReason: reason,
        transIds : transIds.toString(),
        transInfo : transInfo
    };
    gCorp.cmdType = CONSTANTS.get("CMD_CO_AU_INTERNAL");
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
    createXMLNode("th", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_AMOUNT'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_CHEKER'), xmlDoc, theadNode);
    createXMLNode("th", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, theadNode);

    var tbodyNode = createXMLNode("tbody", "", xmlDoc, tableNode);
    
	for(var i in listSelectedTrans) {
		var tran = listSelectedTrans[i];
		var trNode = createXMLNode("tr", "", xmlDoc, tbodyNode);
		var tdNode = createXMLNode("td", parseInt(i) + 1, xmlDoc, trNode);
		createXMLNode("title", CONST_STR.get('COM_NO'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.NGAY_LAP, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_CREATED_DATE'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.TK_NHAN, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_ACCOUNT_DEST'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.NGUOI_NHAN, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_RECEIVE_NAME'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", formatNumberToCurrency(tran.SO_TIEN) + " " + tran.DV_TIEN, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_AMOUNT'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", tran.NGUOI_DUYET, xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_CHEKER'), xmlDoc, tdNode);
	    tdNode = createXMLNode("td", '', xmlDoc, trNode);
	    createXMLNode("title", CONST_STR.get('COM_TRANS_CODE'), xmlDoc, tdNode);
	    createXMLNode("onclick", "showReviewDetailTransaction(" + i + ")",
            xmlDoc, tdNode);
	    createXMLNode("value", tran.MA_GD, xmlDoc, tdNode);
	}

	var buttonNode = createXMLNode('button', '', xmlDoc, rootNode);
    var typeNode = createXMLNode('type', 'back', xmlDoc, buttonNode);
    var btnLabelNode = createXMLNode('label', CONST_STR.get('COM_BACK'), xmlDoc, buttonNode);

    buttonNode = createXMLNode('button', '', xmlDoc, rootNode);

    if (action == "reject") {
    	var reasonElement = document.getElementById("id.reason-rej");
    	sectionNode = createXMLNode('section', '', xmlDoc, rootNode);
    	createXMLNode("row-one-col", CONST_STR.get("COM_AUTH_DENIAL_REASON") + ": " + reasonElement.value, xmlDoc, sectionNode);

    	typeNode = createXMLNode('type', 'reject', xmlDoc, buttonNode);
	    btnLabelNode = createXMLNode('label', CONST_STR.get('SEQ_CONFIRM_TITLE'), xmlDoc, buttonNode);
    }

    if (action == "authorize") {
    	typeNode = createXMLNode('type', 'authorize', xmlDoc, buttonNode);
	    btnLabelNode = createXMLNode('label', CONST_STR.get('SEQ_CONFIRM_TITLE'), xmlDoc, buttonNode);
    }

    return xmlDoc;
}

//send du lieu len de xuat file excel
function sendRequestExportExcel() {
	var transIds = "";
	for (var i in results) {
		transIds += results[i].MA_GD + ",";
	}
    var arrayClientInfo = new Array();
    arrayClientInfo.push(null);
    arrayClientInfo.push({
    	sequenceId : "4",
    	transType : "T11",
    	transIds : transIds
    });

    var gprsCmd = new GprsCmdObj(CONSTANTS.get('COM_EXPORT_EXCEL_REPORT'), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);

    data = getDataFromGprsCmd(gprsCmd);

    corpExportExcel(data);
}

// Khi click vao ma gd o man hinh review
function showReviewDetailTransaction(idx) {
	curTrans = results[idx];

	var docXml = genReviewXML(curTrans);

    gCorp.detailXML = docXml;

    navCachedPages["corp/common/detail/com-detail"] = null;
    navController.pushToView("corp/common/detail/com-detail", true, 'xsl');
}