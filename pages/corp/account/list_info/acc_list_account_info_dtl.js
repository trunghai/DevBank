﻿/** * Created by NguyenTDK * User:  * Date: 05/10/15 * Time: 2:30 PM */ /*** INIT VIEW ***/function loadInitXML() {	logInfo('list amf list account init');}/*** INIT VIEW END ***//*** VIEW LOAD SUCCESS Thực hiện việc gọi lên service để lấy dữ liệu***/function viewDidLoadSuccess() {		logInfo('list amf list account load success');			// set data to screen	// Check loai tien gui de cho hien thi button tat toan	if(gAccount.accType == 'Y'){		document.getElementById("acc_dtl_type").innerHTML = CONST_STR.get('ACCOUNT_PERIOD_ONLINE');		document.getElementById("exeTrans").style.display = "";	}else{		document.getElementById("acc_dtl_type").innerHTML = CONST_STR.get('ACCOUNT_PERIOD_COUNTER');		//document.getElementById("exeTrans").style.display = "none";		var elem = document.getElementById("exeTrans");		elem.parentNode.removeChild(elem);	}		// Check quyen de cho hien thi button tat toan	if(gUserInfo.userRole.indexOf('CorpInput') == -1 && document.getElementById("exeTrans") != null){		//document.getElementById("exeTrans").style.display = "none";		var elem = document.getElementById("exeTrans");		elem.parentNode.removeChild(elem);	}		document.getElementById("acc_dtl_acc").innerHTML = gAccount.accNumber;	document.getElementById("acc_dtl_amount").innerHTML = gAccount.accAmount  + ' ' + gAccount.accTypeMoney;	if(gAccount.accTenorDays != '0'){		document.getElementById("acc_dtl_period").innerHTML = gAccount.accTenorDays + " ";		document.getElementById("acc_dtl_period_day").style.display = "inline";	}else if(gAccount.accTenorMonths != '0'){		document.getElementById("acc_dtl_period").innerHTML = gAccount.accTenorMonths + " ";		document.getElementById("acc_dtl_period_month").style.display = "inline";	}else if(gAccount.accTenorYears != '0'){		document.getElementById("acc_dtl_period").innerHTML = gAccount.accTenorYears + " ";		document.getElementById("acc_dtl_period_year").style.display = "inline";	}	var interestRateNew = gAccount.accInterestRate;	if (interestRateNew.substring(0,1)=='.') {		interestRateNew = '0' + interestRateNew;	}	document.getElementById("acc_dtl_interest_rate").innerHTML = interestRateNew;	if (gAccount.accProfitsInterim.trim() == '-') {		document.getElementById("acc_dtl_profits_interim").innerHTML = gAccount.accProfitsInterim;	} else {		document.getElementById("acc_dtl_profits_interim").innerHTML = gAccount.accProfitsInterim + ' ' + gAccount.accTypeMoney;	}	document.getElementById("acc_dtl_datestart").innerHTML = gAccount.accDateStart;	document.getElementById("acc_dtl_amount_block").innerHTML = gAccount.accSoPhongToa + ' ' + gAccount.accTypeMoney;	document.getElementById("acc_dtl_dateend").innerHTML = gAccount.accDateEnd;	var strEmptyReason = gAccount.accLyDoPhongToa.substring((gAccount.accLyDoPhongToa.length-3), gAccount.accLyDoPhongToa.length);	if (strEmptyReason == ' , ') {		strEmptyReason = gAccount.accLyDoPhongToa.substring(0, (gAccount.accLyDoPhongToa.length-3));	}else 	{		strEmptyReason = gAccount.accLyDoPhongToa;	}	document.getElementById("acc_dtl_reason_block").innerHTML = strEmptyReason;}// Quay lại màn hình hiển thị thông tin tiền gửi có kỳ hạnfunction acc_list_acount_info_dtl_btnBack(){	updateAccountListInfo(); 	navController.initWithRootView('corp/account/list_info/acc_list_account_info', true, 'xsl');}// Chuyển đến màn hình tất toánfunction acc_list_acount_info_dtl_btnFinal(){	// goto screen	navController.initWithRootView('corp/account/finalize/acc_finalize', true, 'xsl');}//Chuyển sang tab 'Tra cứu giao dịch'function showPageFindTrans(){	updateAccountListInfo(); 	navController.initWithRootView('corp/account/search_transaction_acc_open_close/acc_query_transaction', true, 'xsl');}