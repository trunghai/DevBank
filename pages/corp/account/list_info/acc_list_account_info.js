﻿/** * Created by NguyenTDK * User:  * Date: 02/10/15 * Time: 2:00 PM *//*** INIT VIEW ***/function loadInitXML() {	logInfo('list amf list account init');}/*** VIEW LOAD SUCCESS Thực hiện việc gọi lên service để lấy dữ liệu***/function viewDidLoadSuccess() {		logInfo('list amf list account load success');	gAccount.rowsPerPage = 10;	gAccount.totalPagesCounter = 0;	gAccount.totalPagesOnline = 0;		if (gUserInfo.userRole.indexOf('CorpInput') == -1 && document.getElementById("listInfoExe") != null) {	    var elem11 = document.getElementById("listInfoExe");	    elem11.parentNode.removeChild(elem11);	    if (gUserInfo.userRole.indexOf('CorpAuth') == -1) {	        var tab = document.getElementById("tr-tab");	        if (tab != null)	            tab.parentNode.removeChild(tab);	    }	}	// Set dữ liệu trước khi gọi service	initData();}function initData() {	angular.module("EbankApp").controller("acc-list-account-info", function ($scope, requestMBServiceCorp) {		init();		function init() {			var argsArray = [""];			argsArray.push({				sequenceId: 1,				idtxn: "A12"			});			var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_ACC_LIST_ACCOUNT_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, argsArray);			data = getDataFromGprsCmd(gprsCmd);			requestMBServiceCorp.post(data, requestAccListAccountSuccess, requestAccListAccountFail);		}					});	angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);}/*** VIEW WILL UNLOAD ***/function viewWillUnload() {	logInfo('Khai bao lich chuyen tien');}// Thực hiện xử lý sau khi gọi thành công// Lấy dữ liệu được trả về từ service đẩy lên trangfunction requestAccListAccountSuccess(e) {    gprsResp = JSON.parse(JSON.stringify(e));    if (gprsResp.respCode == RESP.get('COM_SUCCESS') && parseInt(gprsResp.responseType) == CONSTANTS.get(            'CMD_CO_ACC_LIST_ACCOUNT_INFO')) {        mainContentScroll.refresh();        // for counter        gAccount.listAmountCounter = gprsResp.respJsonObj.listAmountCounter;        if (gAccount.listAmountCounter.length == 0) {            document.getElementById("tblContentCounter").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');            document.getElementById("total_amount_counter").innerHTML = "";        } else {            gAccount.totalPagesCounter = getTotalPages(gAccount.listAmountCounter.length);            var l_xml_doc = genXMLListTrans(gAccount.listAmountCounter, 1);            var l_xsl_doc = getCachePageXsl("corp/account/list_info/acc_list_account_info_tbl");            genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr) {                document.getElementById("tblContentCounter").innerHTML = oStr;                genPagging(gAccount.totalPagesCounter, 1, 'pageCounter', 0);            });            // Thuc hien viec hien thi ra tong so tien            document.getElementById("total_amount_counter").innerHTML = "";            var typeMoney = Object.keys(gprsResp.respJsonObj.totalAmountCounter);            for (var j = 0; j < typeMoney.length; j++) {                var div = document.createElement("div");                div.setAttribute("style", "font-weight: bold;");                div.innerHTML = formatString(CONST_STR.get('ACCOUNT_PERIOD_TOTAL_AMOUNT_PARAM'), [typeMoney[j],                    gprsResp.respJsonObj.totalAmountCounter[typeMoney[j]]                ]);                document.getElementById("total_amount_counter").appendChild(div);            }        }        // for online        gAccount.listAmountOnline = gprsResp.respJsonObj.listAmountOnline;        if (gAccount.listAmountOnline.length == 0) {            document.getElementById("tblContentOnline").innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');            document.getElementById("total_amount_online").parentElement.style.display = "none";        } else {            gAccount.totalPagesOnline = getTotalPages(gAccount.listAmountOnline.length);            l_xml_doc = genXMLListTrans(gAccount.listAmountOnline, 1);            l_xsl_doc = getCachePageXsl("corp/account/list_info/acc_list_account_info_tbl");            genHTMLStringWithXML(l_xml_doc, l_xsl_doc, function(oStr) {                document.getElementById("tblContentOnline").innerHTML = oStr;                genPagging(gAccount.totalPagesOnline, 1, 'pageOnline', 1);            });            document.getElementById("total_amount_online").innerHTML = gprsResp.respJsonObj.totalAmountOnline;            document.getElementById("total_amount_online").parentElement.style.display = "inline";        }    } else {        if (gprsResp.respCode == '1019') {            showAlertText(gprsResp.respContent);        } else {            showAlertText(CONST_STR.get('ERR_COM_TRANS_FAILED'));        }        var tmpPageName = navController.getDefaultPage();        var tmpPageType = navController.getDefaultPageType();        navController.initWithRootView(tmpPageName, true, tmpPageType);    }}function requestAccListAccountFail(e){	}function genXMLListTrans(pJson, idx){	var l_doc_xml = createXMLDoc(); 	var l_node_root = createXMLNode('resptable','', l_doc_xml);	var l_node_child;	var l_node_infor;	var l_arr = pJson;		var startIdx = (idx - 1) * gAccount.rowsPerPage;	var endIdx = startIdx + gAccount.rowsPerPage;		for(var i = startIdx; i < endIdx; i++) {		if (typeof l_arr[i] != 'undefined') {			l_node_infor = createXMLNode('tabletdetail','',l_doc_xml, l_node_root);			l_node_child = createXMLNode('tbl_number',l_arr[i].CUST_AC_NO, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_type',l_arr[i].LOAI_TIET_KIEM , l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_amount',l_arr[i].DEPOSIT_AMT , l_doc_xml, l_node_infor);			var interestRateNew = l_arr[i].INT_RATE;			if (interestRateNew.substring(0,1)=='.') {				interestRateNew = '0' + interestRateNew;			}			l_node_child = createXMLNode('tbl_interest_rate',interestRateNew + '%', l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_datestart',l_arr[i].STARTDATE , l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_dateend',l_arr[i].MATURITYDATE , l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_typemoney',l_arr[i].TXN_CCY, l_doc_xml, l_node_infor);			if(l_arr[i].IS_TYPE == 'N'){				l_node_child = createXMLNode('tbl_profits_interim','-' , l_doc_xml, l_node_infor);			}else if(l_arr[i].IS_TYPE == 'Y'){				l_node_child = createXMLNode('tbl_profits_interim',l_arr[i].AMOUNTACC , l_doc_xml, l_node_infor);			}			l_node_child = createXMLNode('tbl_branch_code',l_arr[i].BRANCH_CODE, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_prod_code',l_arr[i].PROD_CODE, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_prod_desc',l_arr[i].PROD_DESC, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_tenor_days',l_arr[i].TENOR_DAYS, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_tenor_months',l_arr[i].TENOR_MONTHS, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_tenor_years',l_arr[i].TENOR_YEARS, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_so_phong_toa',l_arr[i].SO_PHONG_TOA, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_ly_do_phong_toa',l_arr[i].LY_DO_PHONG_TOA, l_doc_xml, l_node_infor);			l_node_child = createXMLNode('tbl_is_type',l_arr[i].IS_TYPE, l_doc_xml, l_node_infor);		}	}		return l_doc_xml;}function getTotalPages(totalRows) {	return totalRows % gAccount.rowsPerPage == 0 ? Math.floor(totalRows / gAccount.rowsPerPage) : Math.floor(totalRows / gAccount.rowsPerPage) + 1;}function genPagging(totalPages, pageIdx, pageDivId, typeTable) {	var tmpStr = genPageIndicatorHtml(totalPages, pageIdx, 6, typeTable); //Tong so trang - trang hien tai	var dataPageGen = tmpStr.replace(new RegExp('selectedPageAtIndex', 'g'), 'ckhSelectedPage');	gAccount.typeTable = typeTable;	document.getElementById(pageDivId).innerHTML = dataPageGen;	}function ckhSelectedPage(idx, inNode, inTotalPage, inMaxNum, typeTable) {    isNotNeedReloadPageStyleSheet = true;    fadeOutMainContentScreen();    setTimeout(function() {        var nodePager1 = inNode.parentNode.parentNode;        var tmpStr = genPageIndicatorHtml(inTotalPage, idx, inMaxNum, typeTable);        var dataPageGen = tmpStr.replace(new RegExp('selectedPageAtIndex', 'g'), 'ckhSelectedPage');        nodePager1.innerHTML = dataPageGen;        pageIndicatorSelected(idx, nodePager1, typeTable);        setTimeout(function() {			if(mainContentScroll) {				mainContentScroll.refresh();			}		}, 100)    }, 500);    fadeInMainContentScreen();}function pageIndicatorSelected(selectedIdx, selectedPage, typeTable) {	var dataGen = {};	var tableIdReGen = "";	if(typeTable == 0){		document.getElementById('tblContentCounter').innerHTML = "";		dataGen = gAccount.listAmountCounter;		tableIdReGen = 'tblContentCounter';	}else if(typeTable == 1){		document.getElementById('tblContentOnline').innerHTML = "";		dataGen = gAccount.listAmountOnline;		tableIdReGen = 'tblContentOnline';	}	var xmlData = genXMLListTrans(dataGen, selectedIdx);	var docXsl = getCachePageXsl("corp/account/list_info/acc_list_account_info_tbl");	genHTMLStringWithXML(xmlData, docXsl, function(html){		document.getElementById(tableIdReGen).innerHTML = html;	});}// Chuyển sang tab 'Tra cứu giao dịch'function showPageFindTrans(){	navController.initWithRootView('corp/account/search_transaction_acc_open_close/acc_query_transaction', true, 'xsl');}// Chuyển sang màn hình 'Mở tài khoản'function gotoScreenCreateAccount(){	 	navController.initWithRootView('corp/account/saving/acc_saving_account', true, 'xsl');}// Chuyển sang màn hình 'Xem chi tiết'function clickDetail(dtlAcc, dtlType, dtlTypeMoney, dtlAmount, dtlTenorDays, dtlTenorMonths, dtlTenorYear, 					dtlInterestRate, dtlProfitsInterim, dtlDateStart, dtlDateEnd, 					dtlSoPhongToa, dtlLyDoPhongToa){	// set data to gAccount	gAccount.accNumber = dtlAcc;	gAccount.accType = dtlType;	gAccount.accTypeMoney = dtlTypeMoney;	gAccount.accAmount = dtlAmount;	gAccount.accTenorDays = dtlTenorDays;	gAccount.accTenorMonths = dtlTenorMonths;	gAccount.accTenorYears = dtlTenorYear;	gAccount.accInterestRate = dtlInterestRate;	gAccount.accProfitsInterim = dtlProfitsInterim;	gAccount.accDateStart = dtlDateStart;	gAccount.accDateEnd = dtlDateEnd;	gAccount.accSoPhongToa = dtlSoPhongToa;	gAccount.accLyDoPhongToa = dtlLyDoPhongToa;		// goto screen	navController.initWithRootView('corp/account/list_info/acc_list_account_info_dtl', true, 'xsl');}