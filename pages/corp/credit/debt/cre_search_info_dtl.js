﻿/** * Created by NguyenTDK * User:  * Date: 12/10/15 * Time: 8:00 PM */ /*** INIT VIEW ***/function loadInitXML() {	logInfo('debt detail init');}/*** INIT VIEW END ***//*** VIEW LOAD SUCCESS Thực hiện việc gọi lên service để lấy dữ liệu***/function viewDidLoadSuccess() {		logInfo('debt detail load success');			// set data to screen	document.getElementById("indentute_no").innerHTML = gCredit.indentureNo;	document.getElementById("debt_name").innerHTML = gCredit.debtName;	document.getElementById("disbursement_money").innerHTML = gCredit.disbursementMoney;	document.getElementById("interest").innerHTML = gCredit.interest;	document.getElementById("debt_date").innerHTML = gCredit.debtDate;	document.getElementById("expire_date").innerHTML = gCredit.expireDate;	document.getElementById("expire_near_date").innerHTML = gCredit.expireNearDate;	document.getElementById("root_money").innerHTML = gCredit.rootMoney;	document.getElementById("interest_money").innerHTML = gCredit.interestMoney;}// Thực hiện việc gọi lại màn hình cũfunction creDebtDtlBack(){	navController.popView(true);}// Thực hiện việc gọi đến màn hình [Lịch trả nợ]function creHistoryDebtPay(){	// goto screen	updateAccountListInfo(); 	navController.pushToView('corp/credit/debt/cre_debt_history', true, 'xsl');}function exportExcelDebt() {    var arrayClientInfo = new Array();    arrayClientInfo.push(null);    arrayClientInfo.push({        sequenceId: "7",        transType: "T13",        titleReport : CONST_STR.get('CRE_DEBT_DTL_INFO_TITLE'),        item1Tit : CONST_STR.get('CRE_DEBT_ITEM_INDENTURE_NO'),        item1Val : document.getElementById("indentute_no").innerHTML,        item2Tit : CONST_STR.get('CRE_DEBT_ITEM_INDENTURE_NO'),        item2Val : document.getElementById("debt_name").innerHTML,        item3Tit : CONST_STR.get('CRE_DEBT_ITEM_DISBURSEMENT_MONEY'),        item3Val : document.getElementById("disbursement_money").innerHTML,        item4Tit : CONST_STR.get('CRE_DEBT_ITEM_INTEREST'),        item4Val : document.getElementById("interest").innerHTML,        item5Tit : CONST_STR.get('CRE_DEBT_DATE'),        item5Val : document.getElementById("debt_date").innerHTML,        item6Tit : CONST_STR.get('COM_EXPIRE_DATE'),        item6Val : document.getElementById("expire_date").innerHTML,        item7Tit : CONST_STR.get('CRE_DEBT_ITEM_EXPIRE_NEAR_DATE'),        item7Val : document.getElementById("expire_near_date").innerHTML,        item8Tit : '',        item8Val : '',        item9Tit : CONST_STR.get('CRE_DEBT_ITEM_ROOT_MONEY'),        item9Val : document.getElementById("root_money").innerHTML,        item10Tit : CONST_STR.get('CRE_DEBT_ITEM_INTEREST_MONEY'),        item10Val : document.getElementById("interest_money").innerHTML    });    var gprsCmd = new GprsCmdObj(CONSTANTS.get("COM_EXPORT_EXCEL_REPORT"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayClientInfo);    data = getDataFromGprsCmd(gprsCmd);    requestMBServiceCorp(data, true, 0, function(data) {        var resp = JSON.parse(data);        if (resp.respCode == "0") {            var fileName = resp.respContent;            window.open("./download/" + fileName);        }    });}