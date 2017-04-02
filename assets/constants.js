/**
 * Created by HuyNT2.
 * User: 
 * Date: 12/17/13
 * Time: 5:35 PM
 */
/*** CONSTANTS GLOBAL ***/

var CONSTANTS = (function() {
     var pConstants = {
		 'CMD_TYPE_GIFT_XCHNG_HIS'                      : '9',
		 'CMD_TYPE_UTILITIES'                           : '5',
		 'CMD_TYPE_GET_NATIONALITY'                     : '53',
		 'CMD_TYPE_DELETE_INTRO_CUS'                    : '68',
		 'CMD_TYPE_UPDATE_INTRO_CUS'                    : '67',
		 'CMD_TYPE_LIST_INTRO_CUS'                      : '66',
		 'CMD_TYPE_GET_CUST_INFO'                       : '1210',
		 
		 
		 
		 'CMD_TYPE_LOYALTY'						        : '7',
		 'CMD_TYPE_TRANS_LIST'							: '10',
		 'CMD_TYPE_STARTUP'								: '13',
		 'CMD_TYPE_LOGIN'								: '100',
		 'CMD_TYPE_LOCAL_TRANSFER'						: '17',
		 'CMD_TYPE_INTER_TRANSFER'						: '18',
		 'CMD_TYPE_FPTS_TRANSFER'						: '20',
		 'CMD_TYPE_LOCAL_TRANSFER_CUSTOMER'				: '70',
		 'CMD_TYPE_TRANSFER_CARD'						: '150',
		 'CMD_TYPE_TICKET_REQUEST'						: '1',
		 'CMD_TYPE_MATRIX_REQUEST'						: '103',
		 'CMD_AUTHEN_LIMIT'   							: '16',
		 'CMD_TYPE_QUICK_SEARCH'						: '15',
		 'CMD_TYPE_OTP_REQUEST'							: '101',
		 'CMD_TYPE_CHNG_CUS_INFO'   					: '105',
		 'CMD_TYPE_CHNG_CUS_INFO_CONFIRM'   			: '106',
		 'CMD_TYPE_CHNG_CUS_AVATAR'   					: '107',
		 'CMD_TYPE_TOPUP'								: '19',
		 'CMD_TYPE_ADSL'								: '24',
		 'CMD_TYPE_HOMEPHONE'							: '24',
		 'CMD_TYPE_POSTPAID'							: '23',
		 'CMD_TYPE_EVN_PAY'								: '30',
		 'CMD_TYPE_EVN_PAY_BILL'						: '31',
		 'CMD_LOOKUP_EVN_CODE'							: '33',
		 'CMD_SEARCH_EVN_CODE'							: '32',
		 'CMD_TYPE_ESAVING_DRAWAL_HISTORY'				: '116',
		 
		 // card advance
		 'CMD_TYPE_QUERY_CARD_ADVANCE'                  : '96',
		 'CMD_TYPE_QUERY_CARD_RETURN'                   : '97',
		 'CMD_TYPE_QUERY_CARD_INFO'                     : '77',		 

		 'CMD_TYPE_QUERY_ACCOUNT'						: '113',
		 'CMD_TYPE_QUERY_ACCOUNT_NO_INFO'				: '114',
		 'CMD_TYPE_QUERY_ACCOUNT_DETAIL'				: '104',
		 'CMD_TYPE_LOOKUP_BANK'							: '117',
		 'CMD_TYPE_LOOKUP_CITY'							: '118',
		 'CMD_TYPE_LOOKUP_BRANCH'						: '119',
		 'CMD_TYPE_LOOKUP_CITY_BRANCH'					: '120',
		 'CMD_TYPE_PAYMENT'         					: '231',
		 'CMD_TYPE_QUERY_HISTORY_INFO'					: '232',
		 'CMD_TYPE_QUERY_INTEREST_RATE'					: '253',
		 'CMD_TYPE_QUERY_EXCHANGE_RATE'					: '254',	
		 'CMD_TYPE_LOOKUP_ATM'							: '255',
		 'CMD_TYPE_LOOKUP_PAYEE'						: '234',
		 'CMD_TYPE_LOOKUP_CITY_HAS_BRANCH'				: '160',
		 'CMD_TYPE_LOOKUP_DISTRICT_HAS_BRANCH'			: '161',
		 'CMD_TYPE_LOOKUP_CITY_ATM_OT'					: '162',
		 'CMD_TYPE_LOOKUP_DISTRICT_ATM_OT'				: '163',		 
		 
		 'CMD_TYPE_LOOKUP_CREDIT_CARD_NO'               : '301',
		 'CMD_TYPE_CREDIT_CARD_REPAYMENT'               : '300',	
		 	 
		 'CMD_TYPE_REG_eSAVING'							: '110',
		 'CMD_TYPE_VIEW_eSAVING'						: '111',
		 'CMD_TYPE_WITHDRAW_eSAVING'					: '112',
		 'CMD_TYPE_VIEW_NORMAL_SAVING'					: '109',
		 'CMD_TYPE_ESAVING_CHECKOVERDRAFT_ACC'			: '115',
		 
		 'CMD_LOOKUP_VISA_CARD'							: '46',
		 'CMD_LOCK_VISA_CARD'							: '47',
		 'CMD_LOCKUP_VISA_HISTORY'						: '48',
		 'CMD_UNLOCK_VISA_CARD'							: '56',
		 'CMD_LOOKUP_VISA_CARD_NEW'					    : '78',		 
		 'CMD_TYPE_CHANGE_AUTHEN_TYPE'					: '14',
		 
		 'CMD_LOOKUP_TPB_BANKINFO'						: '251',
		 'CMD_LOOKUP_ATM_TPB'							: '252',
		 'CMD_TYPE_LOOKUP_ATM' 							: '255',
		 'CMD_TYPE_LOOKUP_TRANSACTION_LOCATE' 			: '256',
		 'CMD_TYPE_CHANGEPASS'							: '49',
		 
		 // eGold
		 'CMD_TYPE_GOLD_TERM_AUTHENTICATE' 				: '51',
		 'CMD_TYPE_GOLD_AUTHENTICATE' 					: '34',
		 'CMD_TYPE_GOLD_BUY_VERIFY' 					: '36',
		 'CMD_TYPE_GOLD_SELL_VERIFY' 					: '37',
		 'CMD_TYPE_GOLD_LOOKUP_HISTORY' 				: '39',
		 'CMD_TYPE_GOLD_VIEW_STORE' 					: '43',
		 'CMD_TYPE_GOLD_WITHDRAW_VERIFY' 				: '42',
		 'CMD_TYPE_GOLD_WITHDRAW_HAS_TERM_VERIFY' 		: '45',
		 'CMD_TYPE_GOLD_CHECK_RATE' 					: '35',
		 'CMD_TYPE_GOLD_WITHDRAW_GET_QUANTITY_AT_BANK' 	: '41',
		 'CMD_TYPE_GOLD_TERM' 							: '50',
		 'CMD_TYPE_GOLD_TRANS' 							: '39',
		 'CMD_TYPE_GOLD_TRANS_HIS_RATE' 				: '55',
		 
		 'CMD_TYPE_VIEW_LOAN'							: '130',//FOR LOAN FUCNTION
		 'CMD_TYPE_REPAYMENT_LOAN'						: '131',//FOR REPAYMENT FUCNTION
		 'CMD_TYPE_SB_OVERDRAFT'						: '132',//FOR STAND BY OVERDRAFT
		 'CMD_TYPE_CONFIRM_OVERDRAFT'					: '133',//FOR STAND BY OVERDRAFT
		 'CMD_TYPE_ADJUST_SB_OVERDRAFT'					: '134',//FOR ADJUST STAND BY OVERDRAFT
		 'CMD_TYPE_CONFIRMADJUST_SB_OVERDRAFT'			: '135',//FOR ADJUST STAND BY OVERDRAFT
		 'CMD_TYPE_ACTIVATE_SB_OVERDRAFT'				: '136',//FOR ACTIVATE STAND BY OVERDRAFT
		 'CMD_TYPE_ACTIVATE_AUTHEN_OVERDRAFT'			: '137',//FOR ACTIVATE STAND BY OVERDRAFT
		 'CMD_TYPE_VIEW_INFO_SB_OVERDRAFT' 			    : '138',//FOR VIEW STANDBY OD
		 'CMD_TYPE_LOAN_CATEGORY' 					    : '139',//FOR VIEW LOAN CATEGORY
		 'CMD_TYPE_LOAN_ADVISORY'					    : '140',//FOR LOAN ADVISORY
		 'CMD_LOAN_SEND_QUESTION'						: '141',//FOR SEND QUESTION
		 'CMD_TRANSFER_TEMPLATE_TEMPLATE'				: '142',//FOR GET ALL TEMPLATE IN TRANSFER
		 'CMD_TRANSFER_TEMPLATE_UPDATE'					: '143',//FOR UPDATE, DELETE TEMPLATE IN TRANSFER
		 'CMD_TYPE_GET_CAPCHA'							: '002',//FOR GET CAPCHA
		 'CMD_TYPE_GET_BOOK_BENEFICIARY'				: '234',
		 'CMD_TYPE_UPDATE_BOOK_BENEFICIARY'				: '76',//THUANTM
		 'CMD_VIEW_TRANSFER_COMMAND'					: '144',//FOR VIEW TRANSFER COMMAND
		 'CMD_VIEW_TRANSFER_COMMAND_DETAIL'				: '145',//FOR VIEW TRANSFER COMMAND DETAIL
		 'CMD_TYPE_SCHEDULE_BANK_MNG'					: '28',
		 'CMD_TYPE_SCHEDULE_BANK_CANCEL'				: '29',
		 'CMD_TYPE_GET_PROMOTION'						: '222',
		 'CMD_TYPE_RENAME_ACC_NO'						: '223',
		 
         'RESPONSE_SESSTION_TIMEOUT'					: '206',
         'RESPONSE_SESSION_INVALID'						: '207',
		 
		 'AES_UTIL_SALT'								: '3FF2EC019C627B945225DEBAD71A01B6985FE84C95A70EB132882F88C0A59A55',
		 'AES_UTIL_IV'									: 'F27D5C9927726BCEFE7510B1BDD3D137',
		 'AES_UTIL_KEYSIZE'								: '128',
		 'AES_UTIL_ITERATION_COUNT'						: '10000',
 		 /*** eSaving Input Change infomation ***/
		 'CMD_TYPE_ESAVING_CHANGEINFO_VIEW'				: '108',
		 'CMD_TYPE_ESAVING_CHANGEINFO_VERIFY'			: '128',
		 /*** Transfer ***/
		 'CMD_TRANSFER_PERIODIC'						: '11',
		 'CMD_TRANSFER_PERIODIC_MNG_TRANS'				: '74',
		 'CMD_TRANSFER_PERIODIC_CANC_TRANS'				: '75',
		 'CMD_VIEW_FUNDS_TRANSFER'                      : '6',
		 'CMD_PRD_INTER_NOR_TRANS_ACC'					: '81',
		 'CMD_PRD_INTER_FAST_TRANS_ACC'					: '82',
		 'CMD_PRD_INTER_FAST_TRANS_CARD'				: '83',
		 
		 /*** chuyen tien nhanh ***/
		 'CMD_FAST_TRANS_SML_BANKCODE'					: '59',
		 'CMD_FAST_TRANS_ACC_VERIFY'					: '12',
		 'CMD_INFO_CUSTOMER'   							: '54',
		 'SC_CHECK_CUSTOMER'   							: '15',
		 
		 /*** introduce customer ***/
		 'CMD_LOAD_FILE_CUSTOMER'   					: '69',
		 'CMD_LOAD_IMAGE_CUSTOMER'						: '71',
		 'CMD_UPDATE_BATCH_CUSTOMER'					: '72',
		 
		 /*Car service */
		 'CMD_MANAGER_CARD'   							: '4',
		 'CMD_CHANGE_LIMIT'   							: '214',
		 'CMD_CARD_LOCK'   								: '204',
		 'CMD_CARD_REPAYMENT_INFO'						: '215',
		 'CMD_UPDATE_REPAYMENT_INFO'					: '216',

		 'CMD_CARD_LIST_PRO'							: '302',
		 'CMD_CARD_LIST_POPULAR_ANSWER'					: '303',
		 'CMD_CARD_SEND_QUESTION'						: '304',
		 
		 'CMD_CHANGE_REPAYMENT_LIMIT'					: '217',
		 'CMD_CHANGE_REPAYMENT_REPAYMENT_REQUEST'		: '218',
		 'TRANS_SUCCESS'								: '0',
		 'TRANS_RELIABLE'								: '1013',
		 'CMD_TRANS_MOTH_HIS_VISA'                      : '305',
		 
		 /*** payment visa **/
		 'CMD_OL_SHOP_LIST_BILL'						: '220',
		 'CMD_OL_SHOP_CONFIRM_BILL'						: '221',
		 /*** homepage **/
		 'CMD_GET_PROPERTY_INFO'				        : '63',
		 'CMD_GET_DEBT_INFO'    				        : '3',
		 'CMD_GET_CUS_PROP_DETAIL_INFO'    				: '240',
		 
		 'CMD_SEND_FEEDBACK'    				        : '180',
		 'CMD_TYPE_LOGOUT'								: '124',
		 
		 /*** TuanNM Update - JUMBO***/
		 'CMD_CHECK_EXIST_JUMBO_ACC'					: '260',
 		 'CMD_CREATE_JUMBO_ACC'							: '261',
 		 'CMD_GET_JUMBO_ACC_INFO'						: '262',
		 'CMD_CHECK_EXIST_AUTO_SAVING'					: '263',
 		 'CMD_CREATE_AUTO_SAVING'						: '264',
 		 'CMD_CHANGE_AUTO_SAVING'						: '265',
		 
		 /*TUANNM5 Update - Bo Sung ket noi the voi so TK*/
		 'CMD_CARD_CONNECT_ACC_INFO'					: '79',
		 'CMD_CARD_CONNECT_ACC_REGISTER'				: '80',

		 //NGOCDT3 bo sung cho dang ky the ao
		 'CMD_REGISTER_EMONEY_CARD'				        : '60',
		 //NGOCDT3 bo sung cho thanh toan phi mo the eCounter
		  'CMD_PAYMENT_ECOUNTER'				        : '266',
		  'CMD_PAYMENT_ECOUNTER_BILL'                   :'267',
		 'CMD_SCHEDULE_BANK_GET_TIME'					: '26',
		 /*Huy giao dich*/
		 'CMD_TRANSACTION_CANCEL'						: '88',


		 /*get menu*/
		 'CMD_GET_CUSTOMIZE_MENU'						: '86',
		 /*KH non-ebank gui cau hoi tu van dang ky vay von*/
		 'CMD_LOAN_SEND_QUESTION_NON_EBANK'				: '91',
		 /*KH non-ebank gui cau hoi tu van dang ky phat hanh the*/
		 'CMD_CARD_SEND_QUESTION_NON_EBANK'				: '92',
		 //Dang ky gui tiet kiem gui gop
		 'CMD_GET_INFO_FUTURE_SAVING'					: '270',
		 'CMD_REGISTER_FUTURE_SAVING'					: '271',
		 //nop tien gui gop
		 'CMD_FLX_TRANS'								: '272',
		 //tat toan gui tiet kiem truc tuyen
		 'CMD_CLOSE_FUTURE_SAVING'						: '273',
		//doi thong tin tiet kiem truc tuyen
		'CMD_CHANGEINFO_FUTURE_SAVING'					: '274',
		//lay lich su nap tien
		'CMD_HISTORY_FUTURE_SAVING'						: '275',
		//thanh toan tu dong
		 'CMD_REGISTER_AUTO_BILLING'					: '268',
		 'CMD_HISTORY_AUTO_BILLING'						: '148',
		 'CMD_QUERY_HISTORY_BILLING'					: '149',
		 'CMD_CANCEL_REG_BILLING'						: '151',
		 'CMD_QUERY_HISTORY_DETAIL'						: '154',

		//cai dat mat khau sao ke the 
		 'CMD_SET_PASS_STATEMENT'						: '152',
		 'CMD_REMOVE_PASS_STATEMENT'					: '153',
		 
		// Port cho phan doanh nghiep
		// DN_Common
		'COM_GET_LIST_USER_APPROVE'                    	: '1101', // Lấy danh sách người duyệt giao dịch
		'COM_AUTHENTICATE_TOKEN'                        : '1102',
		'COM_EXPORT_EXCEL_REPORT'                       : '1103',
		'COM_TYPE_QUERY_EXCHANGE_RATE'                  : '1104',
		'COM_TYPE_QUERY_INTEREST_RATE'                  : '1105',
		'COM_LOOKUP_TPB_BANKINFO'                       : '1106',
		
		// DN_SetUp
		'CMD_CO_SETUP_CHANGE_PERSON_INFO'              	: '1201', // Thiết lập thông tin cá nhân
		'CMD_CO_SETUP_TYPE_SEND_INFO'                  	: '1202', // Gửi thông báo cho người duyệt giao dịch
		'CMD_CO_SETUP_CHANGE_PASSWORD'                 	: '1203', // Thay đổi mật khẩu
		'CMD_CO_SETUP_CHANGE_TOKEN_TYPE'               	: '1204', // Phương thức xác thực
		'CMD_CO_SETUP_QUERY_TRANSFER'				    : '1205',
		'CMD_CO_SETUP_CHANGE_TRANS_LIMIT'				: '1208',
		'CMD_CO_AUTHORIZE_TRANSFER'					    : '1209',
		
		// DN_Account
		'CMD_MENU_ACCOUNT'								: '1301', // Chức năng mở tài khoản
		'CMD_ACCOUNT_TYPE_QUERY_DETAIL'					: '1302', // Chức năng tra cứu tài khoản không kì hạn
		'CMD_CO_ACC_LIST_ACCOUNT_INFO'                 	: '1303', // Tra cứu thông tin TK CKH
		'CMD_CO_ACC_FINALIZE'                          	: '1304', // Tất toán tài khoản
		'CMD_ACCOUNT_QUERY_TRANSACTION'					: '1305', //tra cuu giao dich, mo tat toan
		
		// DN_Tranfer
		'CMD_CO_IIT_FUNDS_LOCAL_TRANSFER' 				: '1601', // Chuyển khoản trong TPB
		'CMD_BATCH_SALARY_MANAGER' 						: '1602', //Quan ly lo/tra luong
		'CMD_QUERY_TRANSFER'					        : '1603', // Truy vấn giao dịch chuyển khoản
		'CMD_CO_DTI_INTERNAL_TRANSFER'	                : '1604', // Chuyển khoản liên ngân hàng
		'CMD_CO_DTI_TRANSFER_BANK_PROCESS'				: '1605', // Lookup chi nhánh liên ngân hàng
		'CMD_CO_USER_CREATED_TRANSACTION'				: '1606', // Quan ly chuyen tien dinh ki
		'CMD_CO_ISI_FUNDS_PERIODIC_TRANSFER'			: '1607', // Khoi tao chuyen tien dinh ky
		'CMD_CO_BATCH_TRANSFER_SALARY'					: '1608', // Chuyển khoản theo lô liên ngân hàng & Trả lương
		'CMD_CO_CARD_TRANSFER'							: '1616', // Chuyen khoan nhanh qua so the
		'CMD_CO_MANAGE_BENEFIC'					    	: '1612', // Quản lý người thụ hưởng
		'CMD_CO_MANAGE_TEMPLATE'					    : '1613', // Quản lý mẫu chuyển khoản
		
		
		// DN_Tax
		'CMD_CO_PAY_TAX_AUTHORIZE'						: '1776', //Duyet thue
		'CMD_CO_PAY_TAX_PROCESSOR'						: '1777', //Thanh toan thue
		'CMD_CO_PAY_TAX_MANAGER'						: '1778', //Quan ly thue
		'CMD_CO_CREATE_TAX_REPORT'						: '1779', //Tao Report Thue
		'CMD_CO_PAY_TAX_ORGANIZATION'                   : '1714',//Tao Request le phi thue cac ban bo nganh

		// DN_Authorize
		'CMD_CO_AUTHORIZE_BATCH_TRANSFER_SALARY'		: '1609', // Duyet chuyen khoan theo lo/tra luong
		'CMD_CO_AUTHORIZE_DOMESTIC_TRANSFER'		    : '1610', // Duyet chuyen khoan liên ngân hàng
		'CMD_CO_AUTHORIZE_PERIODIC_TRANSFER'		    : '1611', // Duyệt chuyển khoản định kỳ
		'CMD_CO_AU_INTERNAL'							: '1614', // Duyệt chuyển khoản trong TPB
		'CMD_CO_AUTHORIZE_SETUP'						: '1207', // Duyet thay doi han muc giao dich
		'CMD_AUTH_ACC_OPEN_SAVING_TRANSACTION'			: '1306', //duyet dong mo so
		'CMD_CO_AUTHORIZE_CARD_TRANSFER'				: '1617',

		// DN_Credit
		'CMD_CO_CREDIT_DEBT_INFO'                      	: '1801', // chức năng tra cứu khoản vay
		'CMD_CO_CREDIT_GUARANTEE_INFO'                 	: '1802', // chức năng tra cứu bảo lãnh

		// Duyet mua ban ngoai te
		'CMD_CO_AUTH_FOREIGN_EXCHANGE'					: '1615',

		// Khoi tao mua ban ngoai te
		'CMD_CO_INT_PAYMENT_EXCHANGE_CREATE'			: '1901',

		// tra cuu mua ban ngoai te
		'CMD_CO_INT_PAYMENT_EXCHANGE_MANAGER'			: '1902',
		
		// chuyen tien qua so cmtnd/hc   		
		'CMD_CO_TRANS_IDENTIFICATION'					: '0653',
		'CMD_CO_AUTHORIZE_IDENTIFICATION'				: '1619',
		
		// chuyen tien qua so tai khoan
		'CMD_CO_TRANS_ACCOUNT'							: '1620',
		// duyet chuyen tien qua so tai khoan
		'CMD_CO_AUTHORIZE_ACCOUNT'						: '1621',
		
		//Upload Multi File
		'CMD_ACC_UPLOAD_MULTI_FILES'                    : '0612',

        'CMD_PAYMENT_BILL'                              : '1711',
		'CMD_AUTHORIZE_PAYMENT_BILL'                    : '1761',
		'CMD_MANAGER_PAYMENT_BILL'						: '1701',
		 //Bảo lãnh
		'CMD_GUARANTEE'								    : '1712',
		'CMD_AUTHORIZE_GUARANTEE'						: '1762', 
		'CMD_MANAGER_GUARANTEE'							: '1702',
		 
		 //Thanh toán quốc tế
		 'CMD_PAYMENT_INTERNATIONAL'					: '1713',
		 'CMD_AUTHORIZE_PAYMNET_INTERNATIONAL'			: '1763',
		 'CMD_MANAGER_PAYMNET_INTERNATIONAL'			: '1703',

	 };

     return {
        get: function(name) { 
			return pConstants[name]; 
		}
    };
})();

var RESP = (function() {
     var pConstants = {
		 'COM_SUCCESS'   								: '0',
		 'COM_VALIDATE_FAIL'                            : '55',
		 'COM_INVALID_SESSION'   						: '58',
		 'COM_INVALID_TOKEN'   							: '60',
		 'COM_GATEFAIL'   								: '-1',
		 'COM_OVER_LIMIT'   							: '1001',
		 'COM_OVER_DATE_LIMIT'   						: '1002',
		 'COM_SESSION_TIMEOUT'   						: '1003',
		 'COM_TRUST_PAYEE'   							: '1013',
		 'COM_PASSWORD_EXPIRE'   						: '1014',
		 'COM_WRONG_INPUT_TOKEN'   						: '2002', // cho nhập lại token, các trường hợp khác thì alert hỏi nhập lại hay về home page
		 'COM_TRANS_EXT_TIMEOUT'   						: '1017' //đợi giao dịch và quay về trang chủ
	 };
	 
     return {
        get: function(name) { 
			return pConstants[name]; 
		}
    };
})();

/*** CONSTANTS GLOBAL END ***/


/*** DEFINE MULTI-LANGUAGE STRING ***/
//using gUserInfo.lang, LangVN.js, LangEN.js

var CONST_STR = (function() {
     
     return {
        get: function(name) { 
			if (gUserInfo.lang == 'EN') {
				if (typeof(pConstants_EN[name]) != "undefined")
					return pConstants_EN[name];
				else
					return pCorpConst_EN[name];	
			}
			else {
				if (typeof(pConstants_VN[name]) != "undefined")
					return pConstants_VN[name];
				else
					return pCorpConst_VN[name];
			}
			
		}
    };
})();

// var CONST_STR = (function() {
//
// 	return {
// 		get: function(name) {
// 			if (gUserInfo.lang == 'EN') {
// 				return pConstants_EN[name];
// 			}
// 			else {
// 				return pConstants_VN[name];
// 			}
//
// 		}
// 	};
// })();

/*** DEFINE MULTI-LANGUAGE STRING END ***/

/*** DEVICE STATUS ***/
var CONST_APP_VERSION = "5.0.1";
var CONST_APP_NAME = "GPRS_WAP";

var CONST_APP_WEB_CONFIG = "GPRS_WEB"; //do not change


/*** DEVICE STATUS END ***/

/*** DEFINE SERVICE CODE WILL QUERY INFO AFTER CHANGE ACCOUNT ***/

var CONST_SERVICE_CODE_QUERY_ACCOUNT = ['17', '110', '19', '18', '150'];

var CONST_DEBUG_MODE = true;  //change DEBUG MODE
var CONST_BROWSER_MODE = true;  //change APP/BROWSER MODE
var CONST_DESKTOP_MODE = true;  //using auto-update view when resize windows

//NOTE FOR iOS remove code at comment: DISABLE_FOR_APP_iOS

var CONST_WEB_URL_LINK = "http://localhost:8081/"; //using for mobile app
var CONST_WEB_CORP_URL_LINK = "https://ebank.tpb.vn/ibank/entry"; //using for mobile app

//var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "https://demo.tpb.vn/EBCorpCore/ebservice" : "https://demo.tpb.vn/EBCorpCore/ebservice";
//var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE? "https://demo.tpb.vn/EBCorpCore/ebservice" : "https://demo.tpb.vn/EBCorpCore/ebservice";

// var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "http://10.1.22.39:8080/EBankGateway/ebservice" : "http://10.1.20.96:8090/EBankGateway/ebservice";
// var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE? "http://10.1.22.39:8080/EBankGateway/ebservice" : "http://10.1.20.96:8090/EBankGateway/ebservice";


/*var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "https://biztest.tpb.vn/EBCorpCore/ebservice" : "https://biztest.tpb.vn/EBCorpCore/ebservice";
var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE? "https://biztest.tpb.vn/EBCorpCore/ebservice" : "https://biztest.tpb.vn/EBCorpCore/ebservice";*/

var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE ? "http://10.1.20.96:8091/EBankGateway/ebservice" : "http://10.1.20.96:8091/EBankGateway/ebservice";
var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE ? "http://10.1.20.96:8091/EBankGateway/ebservice" : "http://10.1.20.96:8091/EBankGateway/ebservice";

/*var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE? "http://10.1.14.95:8080/EBCorpCore/ebservice" : "http://10.1.14.95:8080/EBCorpCore/ebservice";
var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE? "http://10.1.14.95:8080/EBCorpCore/ebservice" : "http://10.1.14.95:8080/EBCorpCore/ebservice";*/

 // var CONST_WEB_SERVICE_LINK = CONST_DEBUG_MODE ? "http://10.1.28.55:8080/EBankGateway/ebservice" : "http://10.1.28.55:8080/EBankGateway/ebservice";
 // var CONST_WEB_CORP_SERVICE_LINK = CONST_DEBUG_MODE ? "http://10.1.28.55:8080/EBankGateway/ebservice" : "http://10.1.28.55:8080/EBankGateway/ebservice";

//Hạn mức
var CONST_LIMIT_TRANS_eBank_MAX = 300000000;
var CONST_LIMIT_TRANS_eBank_MIN = 0;

//status load page fail
var CONST_LOAD_PAGE_FAIL_STATUS = [404, 403, 500, 503];

var CONST_HISTORY_CODE = ['EVN-HCM', 'LOCALTRAN', 'TOPUP', 'LOCALTRAN', 'CARDTRAN'];

var CONST_PAYEE_CODE = ['1', '2'];
/*** DEFINE SERVICE CODE WILL QUERY INFO AFTER CHANGE ACCOUNT END ***/

/*** CONFIG FUNCTION RESULT SCREEN ***/

//config for result screen
var CONFIG_RESULT_FUNC_GOHOME = {
    "loan/loan-open-standby-overdraft": {
        "btnHomeTitle": "LOAN_ACTIVE_SB_OD_TITLE_1",
        "btnHomePageName": "loan/loan-active-standby-overdraft",
		"btnHomePageType": ""
    },
	
    "loan/loan-adjust-standby-overdraft": {
        "btnHomeTitle": "LOAN_ACTIVE_SB_OD_TITLE",
        "btnHomePageName": "loan/loan-active-standby-overdraft",
		"btnHomePageType": ""
    },
	
	"esaving/esaving-open-scr": {
        "btnHomeTitle": "LOAN_OPEN_SB_OD_TITLE",
        "btnHomePageName": "loan/loan-open-standby-overdraft",
		"btnHomePageType": ""
    },
	
	"jumbo/jumbo_check_auto_saving": {
        "btnHomeTitle": "MENU_ESAVING_INFORMATION",
        "btnHomePageName": "esaving/esaving-information",
		"btnHomePageType": "xsl"
    },
	"esaving/future-esaving-open-scr": {
        "btnHomeTitle": "MENU_ESAVING_INFORMATION",
        "btnHomePageName": "esaving/esaving-information",
		"btnHomePageType": "xsl"
    },
};

var CONFIG_RESULT_FUNC_OTHERTRANS = {
    "esaving/esaving-open-scr": {
        "btnOtherTransTitle": "MENU_ESAVING_INFORMATION",
        "btnOtherTransPageName": "esaving/esaving-information",
		"btnOtherTransType": "xsl"
    }
};

/*** CONFIG FUNCTION RESULT SCREEN END ***/

/*** DEFINE PRICE FOR TOPUP PAYMENT ***/
var CONST_KEY_PRICE_TOPUP = ['30,000', '50,000', '100,000', '200,000', '500,000'];
var CONST_VAL_PRICE_TOPUP = ['30000', '50000', '100000', '200000', '500000'];

/*** DEFINE PRICE FOR TOPUP PAYMENT ***/

/*** DEFINE PROVIDER FOR ADSL PAYMENT ***/
var CONST_KEY_PROVIDER_ADSL = ['FPT Telecom', 'Viettel', 'SST'];
var CONST_VAL_PROVIDER_ADSL = ['FTEL_ADSL', 'VTLADSL', 'SSTADSBILL'];
/*** DEFINE PROVIDER FOR ADSL PAYMENT ***/
	
/*** DEFINE FPTS ACCOUNT ***/
var CONST_VAL_FPTS_ACCOUNT = ['66666666002'];
var CONST_KEY_FPTS_ACCOUNT = ['Tài khoản FPTS tại Hà Nội'];

/*** DEFINE TRANSACTION LOCAL eBank ***/
var CONST_KEY_LOCAL_eBank_VN = ['Chuyển tới tài khoản của tôi', 'Chuyển tới tài khoản eBank khác'];
var CONST_KEY_LOCAL_eBank_EN = ['Transfer to my account', 'Transfer to another eBank account'];

/*** DEFINE PERIODIC ACCOUNT TYPE ***/
var CONST_PRD_TRANS_TYPE_KEY = ['LOCAL', 'FASTACC', 'FASTCARD', 'INTERBANK'];
var CONST_PRD_TRANS_TYPE_VN = ['Chuyển tiền trong eBank', 'Chuyển nhanh tới số tài khoản', 'Chuyển nhanh tới số thẻ', 'Chuyển tiền liên ngân hàng'];
var CONST_PRD_TRANS_TYPE_EN = ['Transfer to eBank\'s account', 'Transfer to account number', 'Transfer to card number', 'Normal transfer to another bank\'s account'];
var CONST_VAL_PERIODIC_LOCAL = ['LOCAL', 'INTERNAL', 'FASTACC', 'FASTCARD', 'INTERBANK'];
var CONST_KEY_PERIODIC_LOCAL_VN = ['Tài khoản khác của khách hàng', 'Tài khoản eBank khác'];
var CONST_KEY_PERIODIC_LOCAL_EN = ['My account', 'Another account in eBank'];
var CONST_VAL_PERIODIC_FREQUENCY = ['date', 'week', 'month', 'year'];
var CONST_KEY_PERIODIC_FREQUENCY_VN = ['Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Hàng năm'];
var CONST_KEY_PERIODIC_FREQUENCY_EN = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
var CONST_KEY_PERIODIC_FREQUENCY_VALUE = ['D', 'W', 'M', 'Y'];
var CONST_VAL_PAYEE = ['N', 'TH', 'TP'];
var CONST_KEY_PAYEE_VN = ['Không lưu','Lưu danh sách thụ hưởng', 'Lưu mẫu chuyển tiền'];
var CONST_KEY_PAYEE_EN = ['Do not save','Save to list of beneficiaries', 'Save to payment templates'];

var CONST_VAL_PAYEE_NOT_TEMPLATE = ['N', 'TH'];
var CONST_VAL_PAYEE_NOT_TEMPLATE_VN = ['Không lưu','Lưu danh sách thụ hưởng'];
var CONST_VAL_PAYEE_NOT_TEMPLATE_EN = ['Do not save','Save to list of beneficiaries'];

var CONST_KEY_TRANS_PRE_SELCT_VN = ['Thực hiện giao dịch','Quản lý giao dịch'];
var CONST_KEY_TRANS_PRE_SELCT_EN = ['Make a schedule','Schedule management'];
var CONST_KEY_TRANS_PRE_SLECT_BGN = ['1','2'];

/*Utilities*/
var CONST_KEY_UTILITIES_CALCULATOR_VN = ['Tiền gửi tiết kiệm','Tiền vay'];
var CONST_KEY_UTILITIES_CALCULATOR_EN = ['Savings','Loan'];
var CONST_KEY_UTILITIES_CALCULATOR_BGN = ['1','2'];

var CONST_KEY_UTILITIES_CAL_SAV_TYPE_VN = ['Tiết kiệm điện tử','Tiết kiệm rút gốc linh hoạt','Tiết kiệm hưởng lãi đầu kỳ','Tiết kiệm hưởng lãi định kỳ tháng','Tiết kiệm hưởng lãi định kỳ quý','Tiết kiệm hưởng lãi cuối kỳ'];
var CONST_KEY_UTILITIES_CAL_SAV_TYPE_EN = ['E-Savings','Flexible principal withdrawal savings','Regular Savings Account with Interest paid in advance','Regular Savings Account with Interest paid monthly','Regular Savings Account with Interest paid quarterly','Regular Savings Account with Interest paid at maturity'];
var CONST_KEY_UTILITIES_CAL_SAV_TYPE_BGN = ['1','2','3','4','5','6'];

var CONST_KEY_UTILITIES_CAL_SAV_CURRENCY_EN = ['VND','USD','EUR','SGD','AUD','GBP','CAD','JPY'];
var CONST_KEY_UTILITIES_CAL_SAV_CURRENCY_BGN = ['VND','USD','EUR','SGD','AUD','GBP','CAD','JPY'];

var CONST_KEY_UTILITIES_CAL_TERM_VN = ['1 tuần','2 tuần','3 tuần','1 tháng','2 tháng','3 tháng','6 tháng','9 tháng','12 tháng','18 tháng','24 tháng','36 tháng'];
var CONST_KEY_UTILITIES_CAL_TERM_EN = ['1 week','2 weeks','3 weeks','1 month','2 months','3 months','6 months','9 months','12 months','18 months','24 months','36 months'];
var CONST_KEY_UTILITIES_CAL_TERM_BGN = ['01W','02W','03W','01M','02M','03M','06M','09M','12M','18M','24M','36M'];

var CONST_KEY_UTILITIES_CAL_LOAN_VN = ['Hàng tháng','Hàng quý','6 Tháng'];
var CONST_KEY_UTILITIES_CAL_LOAN_EN = ['Monthly','Quarterly','6 Month(s)'];
var CONST_KEY_UTILITIES_CAL_LOAN_BGN = ['1','2','3'];

var CONST_KEY_GIFT_XCHNG_HIS_STATUS_VN = ['Tất cả', 'Đã nhận quà', 'Chưa nhận quà', 'Đã nhận 1 phần quà'];
var CONST_KEY_GIFT_XCHNG_HIS_STATUS_EN = ['All', 'Full received', 'Not received yet', 'Partially received'];
var CONST_KEY_GIFT_XCHNG_HIS_STATUS_VAL = ['All', 'Y', 'N', 'P'];

/*** DEFINE PERIODIC ACCOUNT TYPE ***/
var CONST_MNG_VAL_PERIODIC_LOCAL = ['All','LOCAL', 'INTERNAL'];
var CONST_MNG_KEY_PERIODIC_LOCAL_VN = ['Tất cả','Tài khoản khác của khách hàng', 'Tài khoản eBank khác'];

var CONST_BANK_SCHEDULE_MNG_VN = ['Rút tiền mặt tại quầy', 'Hẹn gặp tư vấn viên'];
var CONST_BANK_SCHEDULE_MNG_EN = ['Cash withdrawal at eBank branch', 'Make an appointment with eBank officers'];

var CONST_MNG_KEY_PERIODIC_LOCAL_EN = ['All','My account', 'Another account in TPB'];
var CONST_MNG_VAL_PERIODIC_FREQUENCY = ['','date', 'week', 'month', 'year'];
var CONST_MNG_KEY_PERIODIC_FREQUENCY_VN = ['Tất cả','Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Hàng năm'];
var CONST_MNG_KEY_PERIODIC_FREQUENCY_EN = ['All','Daily', 'Weekly', 'Monthly', 'Yearly'];
var CONST_MNG_VAL_PAYEE = ['All','TC', 'TH'];
var CONST_MNG_KEY_PAYEE_VN = ['Tất cả','Danh sách tin cậy', 'Danh sách cơ bản'];
var CONST_MNG_KEY_PAYEE_EN = ['All','My trustful book', 'My normal book'];
var CONST_MNG_VAL_STT = ['All','A', 'C'];
var CONST_MNG_KEY_STT_EN = ['All','Effective', 'Expired/ Deleted'];
var CONST_MNG_KEY_STT_VN = ['Tất cả','Hiệu lực', 'Hết hiệu lực/ Đã hủy'];
var CONST_MNG_VAL_ACC_DEB = ['All'];
var CONST_MNG_KEY_ACC_DEB_EN = ['All'];
var CONST_MNG_KEY_ACC_DEB_VN = ['Tất cả'];

/*** DEFINE PROVIDER FOR HOMEPHONE PAYMENT ***/
var CONST_KEY_PROVIDER_HOMEPHONE = ['Viettel', 'SST'];
var CONST_VAL_PROVIDER_HOMEPHONE = ['VTLHP', 'SSTHPBILL'];

/*** DEFINE PROVIDER FOR HOMEPHONE PAYMENT ***/

/*** DEFINE PROVIDER FOR POSTPAID PAYMENT ***/
var CONST_KEY_PROVIDER_HOMEPHONE = ['Viettel', 'Mobiphone'];
var CONST_VAL_PROVIDER_HOMEPHONE = ['VTLHP', 'SSTHPBILL'];

/*** DEFINE PROVIDER FOR POSTPAID PAYMENT ***/

/*** DEFINE ESAVING ***/

var CONST_KEY_PERIOD_ESAVING_EN = ['1 week', '2 weeks', '3 weeks', '1 month', '2 months', '3 months', '6 months', '9 months', '12 months', '18 months', '24 months', '36 months'];
var CONST_KEY_PERIOD_ESAVING_VN = ['1 tuần', '2 tuần', '3 tuần', '1 tháng', '2 tháng', '3 tháng', '6 tháng', '9 tháng', '12 tháng', '18 tháng', '24 tháng', '36 tháng'];
var CONST_KEY_PERIOD_ID_ESAVING = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

var CONST_KEY_MATURITY_ESAVING_EN = ['Renew principal and interest on maturity date for same tenor', 'Renew principal on maturity date for the same tenor, receive interest by crediting my account No.', 'Do not renew, receive principal and interest by crediting my account No.'];
var CONST_KEY_MATURITY_ESAVING_VN = ['Tái tục cả gốc và lãi sang kỳ hạn mới tương đương kỳ hạn gửi ban đầu', 'Tái tục cả gốc và lãi sang kỳ hạn mới tương đương kỳ hạn gửi ban đầu, lãi chuyển vào tài khoản', 'Không tái tục, chuyển cả gốc và lãi vào tài khoản'];
var CONST_KEY_MATURITY_ID_ESAVING = ['1', '2', '3'];

var CONST_KEY_ESAVING_CHOOSE_RATE_NAME = ['Tiết kiệm hưởng lãi cuối kỳ', 'Tiết kiệm điện tử', 'Tiết kiệm hưởng lãi định kỳ'];
//var CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN = ['Savings earn interest at end of year', 'Electronic Savings', 'Regular savings earn interest'];
var CONST_KEY_ESAVING_CHOOSE_RATE_NAME_EN = ['Regular Savings Account with Interest paid at maturity', 'E-savings', 'Regular Savings Account with Interest paid periodically'];
var CONST_KEY__ESAVING_CHOOSE_RATE_ID = ['EAE', 'ESV', 'EPE'];

var CONST_DEFAULT_CURRENCY = 'VND';

/*** DEFINE ESAVING ***/
var CONST_KEY_CHANGE_INFO_ESAVING_EN = ['Change renewed directive'];
var CONST_KEY_CHANGE_INFO_ESAVING_VN = ['Đổi chỉ thị tái tục'];

/*** DEFINE TRANS ***/

var CONST_KEY_TRANS_FEE_TYPE_VN = ['Người gửi chịu phí', 'Người nhận chịu phí'];
var CONST_KEY_TRANS_FEE_TYPE_EN = ['Sender pay charge', 'Recipient pay charge'];
var CONST_KEY_TRANS_FEE_TYPE_ID = ['N', 'Y'];

/*** DEFINE TRANS END ***/


/*** DEFINE FAST TRANS ***/
var CONST_KEY_FAST_TRANS_OPT_VN = ['Chuyển tiền nhanh qua số thẻ', 'Chuyển tiền nhanh qua số tài khoản'];
var CONST_KEY_FAST_TRANS_OPT_EN = ['Transfer to card number', 'Transfer to account number'];
var CONST_VAL_FAST_TRANS_OPT = ['1','2']
/*** DEFINE FAST TRANS END ***/
/*** VIEW FUNDSTRANSFER ***/

//TUANNM5 ADDED NEW TYPE TRANSFER
var CONST_KEY_TRANS_MODE_VN = ['Chuyển tiền liên ngân hàng', 'Chuyển tiền trong eBank', 'Chuyển nhanh qua thẻ', 'Chuyển nhanh qua tài khoản', 'Chuyển tiền định kỳ', 'Chuyển tiền chứng khoán FPTS', 'Chuyển tiền theo danh sách'];
var CONST_KEY_TRANS_MODE_EN = ['Normal transfer to another bank\'s account', 'Transfer to eBank\'s account', 'Realtime transfer to card', 'Realtime transfer to account', 'Schedule transfer', 'Transfer to a securities account', 'Bulk transfer'];
var CONST_VAL_TRANS_MODE = ['1','2','3','4','5','6','7']
//END TUANNM5 UPDATE

/*var CONST_KEY_TRANS_STATUS_VN = ['Tất cả', 'Đã thực hiện', 'Chờ xử lý', 'Giao dịch không thành công'];
var CONST_KEY_TRANS_STATUS_EN = ['All', 'Accepted', 'Pending', 'Transaction failed' ];
var CONST_VAL_TRANS_STATUS = ['1','2','3','4']*/
/*** BANK INFO MAP ***/

var CONST_TPB_ATM = "eBank";
var CONST_KEY_CITY_EN = ['Ha Noi', 'Ho Chi Minh', 'Can Tho', 'Da Nang', 'Dong Nai', 'An Giang', 'Binh Duong', 'Hai Phong'];
var CONST_KEY_CITY_VN = ['Hà Nội', 'Hồ Chí Minh', 'Cần Thơ', 'Đà Nẵng', 'Đồng Nai', 'An Giang', 'Bình Dương', 'Hải Phòng'];
var CONST_VAL_CITY =['1','2','3','4','5','6','7','8'];
var CONST_KEY_AREA_EN = ['Dong Da', 'Tan Binh', 'Ngo Quyen', 'Hai Ba Trung'];
var CONST_KEY_AREA_VN = ['Đống Đa', 'Tân Bình', 'Ngô Quyền', 'Hai Bà Trưng'];
var CONST_VAL_AREA =['1','2','3','4'];
/*** BANK INFO MAP END ***/

/*** CARD ***/
var CONST_KEY_MONTH_ID = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
var CONST_KEY_YEAR_ID = ['2012','2013', '2014', '2015'];
/*** CARD ***/

/*** EGOLD ***/

var CONST_TIMER_GOLD_RATE = 15;
var CONST_GROUP_PRE_TITLE = 'group';
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_NAME = ['Tất cả', 'Bán vàng', 'Mua vàng'];
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_NAME_EN = ['All', 'Sell gold', 'Buy gold'];
var CONST_KEY_GOLDHISTORY_CHOOSE_TRANS_ID = ['0', '2', '4'];

var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_NAME = ['Tất cả', 'Vàng miếng SJC', 'Vàng nhẫn Doji'];
var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_NAME_EN = ['All', 'SJC', 'DOJI'];
var CONST_KEY_GOLDHISTORY_CHOOSE_GOLD_ID = ['0', '1', '2'];

var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_NAME = ['Tất cả', 'Internet Banking', 'Mobile Banking', 'Tại quầy'];
var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_NAME_EN = ['All', 'Internet Banking', 'Mobile Banking', 'Counter'];
var CONST_KEY_GOLDHISTORY_CHOOSE_CHANNEL_ID = ['0', '1', '2', '3'];

var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_NAME = ['Tất cả', 'Giá bán', 'Giá mua'];
var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_NAME_EN = ['All', 'Rate sell', 'Rate buy'];
var CONST_KEY_GOLDHISTORY_CHOOSE_RATE_ID = ['0', '4', '2'];

/*** EGOLD END ***/
var CONST_VALUE_TRANS_BY_LIST = ['Chuyển tới tài khoản TPB', 'Chuyển tới số thẻ ngân hàng khác'];
var CONST_KEY_TRANS_BY_LIST = ["TK", "TH"];

/*** CREDIT CARD REPAYMENT ***/
var CONST_KEY_REPAYMENT_OPTIONS_VN = ['Thanh toán tối thiểu', 'Toàn bộ dư nợ đến thời điểm hiện tại', 'Toàn bộ dư nợ trong sao kê', 'Thanh toán tùy chọn'];
var CONST_KEY_REPAYMENT_OPTIONS_EN = ['Minimum repayment', 'Current debt total', 'On-statement debt total', 'Falcutative repayment'];

/*Dungnt11.fsoft*/
var CONST_KEY_CHANGE_INFO_GENDER_EN = [ 'Male', 'Female']
var CONST_KEY_CHANGE_INFO_GENDER_VN = [ 'Nam','Nữ'];
var CONST_KEY_CHANGE_INFO_GENDER_ID = ['1','2'];

/*ducnm2.fsoft*/
var CONST_KEY_CHANGE_INFO_DEL_CUS_EN = [ 'OK', 'Cancel'];
var CONST_KEY_CHANGE_INFO_DEL_CUS_VN = [ 'Có','Không'];
var CONST_KEY_CHANGE_INFO_DEL_CUS_ID = ['1','2'];

var CONST_KEY_CHANGE_INFO_INCOME_EN = [ 'Below 3 milion/month', 'From 3-5 milion/month', 'Above 5 milion-10 milion/month', 'Above 10 milion-20 milion/month', 'Above 20 milion/month'];
var CONST_KEY_CHANGE_INFO_INCOME_VN = [ 'Dưới 3 triệu/tháng', 'Từ 3-5 triệu/tháng', 'Từ 5-10 triệu/tháng', 'Từ 10-20 triệu/tháng', 'Trên 20 triệu/tháng'];
var CONST_KEY_CHANGE_INFO_INCOME_ID = ['1', '2', '3', '4', '5'];

var CONST_KEY_CHANGE_INFO_ENTER_EN  = ['Enter information of an introduced person','Upload the list of introduced persons'];
var CONST_KEY_CHANGE_INFO_ENTER_VN = ['Nhập thông tin người được giới thiệu','Tải danh sách người được giới thiệu'];
var CONST_KEY_CHANGE_INFO_ENTER_ID  = ['1','2'];

/***** Mẫu người thự hưởng *****/
var    CONST_PAYEE_LOCAL_TRANSFER         = 'LOCALTRAN';
var    CONST_PAYEE_INTER_TRANSFER         = 'INTERTRAN';
var    CONST_PAYEE_FPTS_TRANSFER          = 'FPTSTRAN';
var    CONST_PAYEE_PERIODIC_TRANSFER      = 'PERDTRAN';
var    CONST_PAYEE_TOPUP                  = 'TOPUP';
var    CONST_PAYEE_EVN_HCM                = 'EVN-HCM';
var    CONST_PAYEE_CARD_TRANSFER          = 'CARDTRAN';
var    CONST_PAYEE_FAST_TRANS_CARD		  = 'CARDTRANQ';
var    CONST_PAYEE_FAST_TRANS_ACCNO		  = 'ACCTRANQ';
//ngocdt3 them cho thanh toan tu dong
var    CONST_PAYEE_AUTO_BILLING			  = 'AUTOBILL';


//Change repayment account
var CONST_KEY_CHANGE_CONFIRM_EN = ['No' ,'Yes'];
var CONST_KEY_CHANGE_CONFIRM_VN = ['Không' ,'Có'];
var CONST_KEY_CHANGE_CONFIRM_ID = ['1' , '2'];

/*** DEFINE ACCOUNT HISTORY ***/

var CONST_HIS_MONEYFLOW_TYPE_VN = ['Tất cả', 'Ghi nợ', 'Ghi có'];
var CONST_HIS_MONEYFLOW_TYPE_EN = ['All', 'Debit', 'Credit'];
var CONST_HIS_MONEYFLOW_TYPE_ID = ['ALL', 'D', 'C'];
var CONST_HIS_TRANS_TYPE_VN = ['Tất cả', 'Chuyển tiền tới ngân hàng khác', 'Chuyển tiền nội bộ eBank', 'Giao dịch khác'];
var CONST_HIS_TRANS_TYPE_EN = ['All', 'Transfer to other\'s bank', 'Transfer to eBank\'s account', 'Others'];
var CONST_HIS_TRANS_TYPE_ID = ['ALL', 'LIEN_NGAN_HANG', 'NOI_BO', 'GIAO_DICH_KHAC'];

var CONST_HIS_TRANS_TYPE_TEMP_VN = ['Tất cả', 'Chuyển tiền nội bộ eBank', 'Chuyển tiền tới ngân hàng khác'];
var CONST_HIS_TRANS_TYPE_TEMP_EN = ['All', 'Internal', 'To another Vietnamese bank\'s account'];
/*** DEFINE ACCOUNT HISTORY ***/

/*** DEFINE CREDIT HISTORY ***/

var CONST_HIS_CREDIT_TRANS_TYPE_VN = ['Tất cả', 'Thanh toán trực tiếp', 'Thanh toán trực tuyến', 'Rút tiền'];
var CONST_HIS_CREDIT_TRANS_TYPE_EN = ['All', 'Direct payment', 'Online payment', 'Withdrawal'];
var CONST_HIS_CREDIT_TRANS_TYPE_ID = ['ALL', 'TT', 'TI', 'WT'];

/*** DEFINE CREDIT HISTORY END ***/

/*** DEFINE CARD LOCK ***/

var CONST_CARD_LOCK_TYPE_VN = ['Thẻ tín dụng quốc tế - Visa Credit', 'Thẻ ghi nợ quốc tế - Visa Debit', 'Thẻ ATM'];
var CONST_CARD_LOCK_TYPE_EN = ['Visa credit', 'Visa debit', 'ATM'];
var CONST_CARD_LOCK_TYPE_ID = ['C', 'D', 'A'];

/*** DEFINE CARD LOCK END ***/

/*** TUANNM5 ***/
var CONST_KEY_JUMBO_TRANS_TYPE_VN = ['Đăng ký tiết kiệm tự động', 'Đổi thông tin tiết kiệm tự động']
var CONST_KEY_JUMBO_TRANS_TYPE_EN = ['Register for Auto savings', 'Change Auto savings information']
//var CONST_KEY_JUMBO_EN = ['Beneficiaries do not save contacts','Save the list of beneficiaries', 'Save sample 
/*** END TUANNM5 ***/
/*ngocdt3 them cho tk gui gop */
var CONST_KEY_SAVING_TYPE_VN = ['Tiết kiệm điện tử', 'Tiết kiệm gửi góp']
var CONST_KEY_SAVING_TYPE_EN = ['Online deposit', 'Future savings']
var CONST_KEY_SAVING_TYPE_ID = ['1', '2']

var CONST_KEY_FUTURE_SAVING_TYPE_VN = ['Gửi góp định kỳ', 'Gửi góp linh hoạt']
var CONST_KEY_FUTURE_SAVING_TYPE_EN = ['Periodic future savings', 'Flexible future savings']
var CONST_KEY_FUTURE_SAVING_TYPE_ID = ['P', 'A']

var CONST_VAL_ESAVING_FREQUENCY = ['T30', 'T60', 'T90'];
var CONST_KEY_ESAVING_FREQUENCY_VN = ['Hàng tháng', 'Mỗi 2 tháng', 'Mỗi 3 tháng'];
var CONST_KEY_ESAVING_FREQUENCY_EN = ['Monthly', '2 months', '3 months'];

/* ngocdt3 end*/
/*ngocdt3 them cho thanh toan tu dong */
var CONST_VAL_AUTO_BILLING_PROC = ['0', '1', '2'];
var CONST_KEY_AUTO_BILLING_PROC_VN = ['Mobifone', 'Viettel', 'Vinaphone'];
var CONST_KEY_AUTO_BILLING_PROC_EN = ['Mobifone', 'Viettel', 'Vinaphone'];

/*ngocdt3 end */

/*** DEFINE CORP PARENCHILD ***/
var CONST_CORP_PARENT_CHILD_VN = ['Công ty mẹ', 'Công ty con'];
var CONST_CORP_ACOUNT_TYPE_VN = ['Chuyên thu', 'Chuyên chi', 'Hỗn hợp'];
var CONST_CORP_ACOUNT_TYPE_STATUS_VN = ['Hiệu lực', 'Không hiệu lực'];
var CONST_CORP_ACOUNT_EOD_VN = ['Hàng ngày', 'Hàng tháng', 'Hàng quý', 'Hàng năm'];
var CONST_CORP_ACOUNT_STATUS_VN = ['Đã duyệt', 'Chờ duyệt', 'Chờ xóa'];
var CONST_CORP_COMMAND_VN = ['Khai báo chi tiết loại tài khoản', 'Khai báo loại giao dịch', 'Khai báo công ty mẹ con', 'Khai báo tài khoản', 'Phê duyệt khai báo công ty mẹ con', 'Phê duyệt khai báo tài khoản'];

var CONST_KEY_PERIODIC_LOCAL_BN_EN = ['Business account', 'Transfer to another eBank account'];
var CONST_KEY_PERIODIC_LOCAL_BN_VN = ['Chuyển tới tài khoản của doanh nghiệp', 'Chuyển tới tài khoản eBank khác'];
var CONST_VAL_PERIODIC_LOCAL_BN_SEARCH_VN = ['Tất cả','Chuyển giữa các tài khoản của doanh nghiệp', 'Chuyển tới tài khoản eBank khác'];
var CONST_KEY_PERIODIC_LOCAL_BN_SEARCH_VN = ['','T15','T14'];

var CONST_KEY_PERIODIC_CREATE_EN = ['Transfer within customer\'s accounts', 'Transfer to other account in eBank  '];
var CONST_KEY_PERIODIC_CREATE_VN = ['Chuyển giữa các tài khoản của doanh nghiệp', 'Chuyển tới tài khoản eBank khác'];
var CONST_KEY_PERIODIC_CREATE_KEY = ['T15', 'T14'];

var CONST_VALUE_TRANS_BY_LIST_BN = ['Chuyển theo danh sách chuyển khoản liên ngân hàng', 'Chuyển theo danh sách tiền lương'];
var CONST_KEY_TRANS_BY_LIST_BN = ['1', '2'];

var CONST_VALUE_TRANS_BY_LIST_BN_SEARCH = ['Tất cả','Chuyển theo danh sách chuyển khoản liên ngân hàng', 'Chuyển theo danh sách tiền lương'];
var CONST_KEY_TRANS_BY_LIST_BN_SEARCH = ['0','1','2'];

var CONST_VAL_TRANS_BY_LIST_BN_STT = ['Tất cả','Chờ duyệt','Chờ xử lý','Duyệt một phần','Đã thực hiện','Người duyệt từ chối'];
var CONST_KEY_TRANS_BY_LIST_BN_STT = ['ALL','INT','ABP','BPT','ABH','REJ'];
var CONST_VALUE_TRANS_PERIODIC_BN_STT_VN = ['Tất cả','Đã duyệt','Duyệt một phần','Chờ duyệt','Chờ duyệt hủy','Duyệt hủy một phần','Đã hủy','Duyệt không thành công', 'Từ chối'];
var CONST_VALUE_TRANS_PERIODIC_BN_STT_EN = ['All','Authorised','Authorised partly','Pending','Wait for approval of canceling','Approval of canceling partly','Cancelled','Successful cancel', 'Reject'];
var CONST_KEY_TRANS_PERIODIC_BN_STT = ['','ABH','APT','INT','PFC','CPA','CAC','RBH', 'REJ'];

var CONST_KEY_PERIODIC_BN_FREQUENCY_SEARCH = ['','D', 'W', 'M', 'Y'];
var CONST_VAL_PERIODIC_BN_FREQUENCY_SEARCH_VN = ['Tất cả','Hàng ngày', 'Hàng tuần', 'Hàng tháng', 'Hàng năm'];
var CONST_VAL_PERIODIC_BN_FREQUENCY_SEARCH_EN = ['All','Daily', 'Weekly', 'Monthly', 'Yearly'];

var CONST_MNG_KEY_ACC_LIST_EN = ['All'];
var CONST_MNG_KEY_ACC_LIST_VN = ['Tất cả'];
var CONST_MNG_KEY_ACC_LIST = [''];

/* Truy van giao dich */
var CONST_TRANS_TYPE_CONDITION_VN = ['Tất cả', 'Chuyển khoản trong eBank', 'Chuyển khoản liên ngân hàng','Chuyển tiền nhanh tới số thẻ','Chuyển tiền nhanh qua số tài khoản','Chuyển tiền qua số CMTND/hộ chiếu', 'Chuyển tiền quốc tế'];
var CONST_TRANS_TYPE_CONDITION_EN = ['All', 'Internal banking transfer', 'Interbank transaction','Transfer to a cardnumber','Transfer to an account','Transfer to an identification\'s owner', 'International payment'];
var CONST_TRANS_TYPE_CONDITION_ID = ['ALL', 'T12', 'T13','T19','T21','T20', 'B15'];

var CONST_TRANS_LIST_STATUS_VN = ['Tất cả', 'Đã duyệt', 'Duyệt một phần', 'Từ chối', 'Chờ duyệt', 'Duyệt không thành công'];
var CONST_TRANS_LIST_STATUS_EN = ['All', 'Authorised', 'Authorised partly', 'Rejected', 'Pending', 'Unsuccessful authorisation'];
var CONST_TRANS_LIST_STATUS = ['ALL', 'ABH', 'APT', 'REJ', 'INT', 'RBH'];
var CONST_TRANS_LIST_STATUS2 = ['', 'APD', 'APP', 'REJ', 'WTA', 'UNS'];


/*************************** ACCOUNT MODULE **********************************************/
var CONST_ACCOUNT_TENOR_POST_VN = ['01 tháng', '02 tháng', '03 tháng', '06 tháng', '09 tháng', '12 tháng', '18 tháng', '24 tháng', '36 tháng'];
var CONST_ACCOUNT_TENOR_POST_EN = ['01 months', '02 months', '03 months', '06 months', '09 months', '12 months', '18 months', '24 months', '36 months'];

/* Chuyen khoan theo lo/tra luong */
var CONST_TRANS_BATCH_TYPE_VN = ["Trả lương theo lô trong eBank", "Chuyển khoản theo lô liên ngân hàng"];
var CONST_TRANS_BATCH_TYPE_EN = ["Transfer within eBank accounts", "Transfer interbank"];
var CONST_TRANS_BATCH_TYPE = ["T16", "T17"];
var CONST_TRANS_BATCH_TRANS_TYPE_KEY = ["", "T16", "T17"];

/* Chuyển khoản liên ngân hàng */
var CONST_TRANS_DTI_PAYEE_VN = ['Không lưu','Lưu danh sách thụ hưởng', 'Lưu mẫu chuyển khoản'];
var CONST_TRANS_DTI_PAYEE_EN = ['Do not save','Save to list of beneficiaries', 'Save sample transfer'];


// HieuNT.FPT: bo sung trang thai cho chuyen khoan dinh ki
var CONST_TRANS_PERIODIC_STATUS_VALUE_VN =  ['Tất cả', 'Đã duyệt', 'Duyệt một phần', 'Chờ duyệt', 'Chờ duyệt hủy', 'Đã hủy', 'Duyệt không thành công'];
var CONST_TRANS_PERIODIC_STATUS_KEY_VN =    ['ALL', 'ABH', 'APT', 'INT', 'REJ', 'CAC', 'RBH'];

var CONST_TRANS_BATCH_TRANS_TYPE_VN = ['Tất cả', 'Trả lương theo lô trong eBank', 'Chuyển khoản theo lô liên ngân hàng'];
var CONST_TRANS_BATCH_TRANS_TYPE_EN = ['All', 'Transfer within eBank accounts', 'Transfer interbank'];
var CONST_TRANS_BATCH_TRANS_TYPE = ['ALL', 'T16', 'T17'];
var CONST_TRANS_BATCH_LIST_STATUS_VN = ["Tất cả", "Đã duyệt", "Chờ duyệt", "Từ chối", "Duyệt một phần", "Duyệt không thành công"];
var CONST_TRANS_BATCH_LIST_STATUS_EN = ["All", "Authorised", "Pending", "Reject", "Authorised partly", "Unsuccessful authorisation"];

/* Duyệt chuyển khoản liên ngân hàng */
var CONST_TRANS_TYPE_APPROVE_VN = ['Chuyển khoản liên ngân hàng'];
var CONST_TRANS_TYPE_APPROVE_EN = ['Interbank transaction'];
var CONST_TRANS_TYPE_APPROVE_ID = ['T13'];
var CONST_APPROVE_TRANS_STATUS_VN = ['Tất cả', 'Chờ duyệt', 'Duyệt một phần'];
var CONST_APPROVE_TRANS_STATUS_EN = ['All', 'Pending', 'Authorised partly'];
var CONST_APPROVE_TRANS_STATUS = ['ALL', 'INT','APT'];

/*
var CONST_TRANS_PAY_TAX_TYPE_VALUE_EN = ['Domestic tax', 'Import/Export tax', 'Registration tax (car, autobike, real-estate)', 'Personal income tax', 'Financial tax', 'Other tax'];
var CONST_TRANS_PAY_TAX_TYPE_VALUE_VN = ['Thuế nội địa', 'Thuế xuất nhập khẩu', 'Thuế trước bạ (ô tô, xe máy, nhà đất)', 'Thuế thu nhập cá nhân', 'Thuế tài chính', 'Thuế khác'];
var CONST_TRANS_PAY_TAX_TYPE_KEY = ['01', '02', '03', '04', '05', '06'];
*/
//ngocdt3 bo sung 
var CONST_TRANS_PAY_TAX_TYPE_VALUE_EN = ['Domestic tax','Thuế xuất nhập khẩu','Phí, lệ phí thuế xuất nhập khẩu','Phí, lệ phí của các bộ, ngành'];
var CONST_TRANS_PAY_TAX_TYPE_VALUE_VN = ['Thuế nội địa','Thuế xuất nhập khẩu','Phí, lệ phí thuế xuất nhập khẩu','Phí, lệ phí của các bộ, ngành'];
var CONST_TRANS_PAY_TAX_TYPE_KEY = ['01','02','05','06']; 

var CONST_MESSAGE_TAX_PAYMENT_EN = 'Meet the requirements of the General Department of Customs, eBank was pleased to announce a successful upgrade electronic import and export payment to version 3.0 from 08/15/2016, eBank will be one of the first banks officially launch this version. However, due to the wait for other Banks’ synchronization, at the request of the General Department of Customs, Import – Export tax payment service through eBank will <b>have to suspend till 15/11/2016 (domestic tax service is still available).</b> <br> <p>During this time you need to make Import – Export tax transaction over the eBank’s counter. (view the List <a href="https://tpb.vn/contact-us/find-a-branch" target="_blank"><b>here</b></a>). eBank are looking forward to customers sympathy for the inconvenience.</p>';

var CONST_MESSAGE_TAX_PAYMENT_VN ='Đáp ứng yêu cầu của Tổng cục Hải Quan (TCHQ), eBank vui mừng thông báo đã nâng cấp thành công hệ thống thanh toán thuế xuất nhập khẩu điện tử lên phiên bản 3.0 với nhiều tính năng mới từ ngày 15/8/2016, eBank sẽ là một trong những ngân hàng đầu tiên chính thức đưa ra phiên bản mới này. Tuy vậy, do việc chờ các tổ chức khác cùng nâng cấp đồng bộ, theo yêu cầu của TCHQ, dịch vụ <b>nộp thuế Xuất nhập khẩu</b> qua eBank eBank sẽ phải <b>tạm ngưng dự kiến đến 15/11/2016 (dịch vụ nộp thuế nội địa vẫn triển khai bình thường)</b>. <br> <p>Trong thời gian này, Quý khách có nhu cầu nộp thuế Xuất nhập khẩu vui lòng thực hiện tại các Chi nhánh của eBank (xem danh sách <a href="https://tpb.vn/contact-us/find-a-branch" target="_blank"><b>tại đây</b></a>.). eBank rất mong Quý khách hàng thông cảm vì sự bất tiện này.</p>';

var CONST_TYPE_DEBT_VN = ['Vay thông thường', 'Vay thấu chi'];
var CONST_TYPE_DEBT_EN = ['Standard loan', 'Overdraft'];
var CONST_TYPE_DEBT_VALUE = ['0', '1'];

var CONST_TYPE_MONEY_VN = ['Tất cả', 'VND', 'USD'];
var CONST_TYPE_MONEY_EN = ['All', 'VND', 'USD'];
var CONST_TYPE_MONEY_VALUE = ['0', '1', '2'];

var CONST_TYPE_DEADLINE_VN = ['Tất cả', 'Dài hạn', 'Trung hạn', 'Ngắn hạn'];
var CONST_TYPE_DEADLINE_EN = ['All', 'Long term', 'Medium term', 'Short term'];
var CONST_TYPE_DEADLINE_VALUE = ['0', '1', '2', '3'];

//Tra cuu tai khoan, giao dich, tat 
var CONST_ACC_QUERY_TYPE_TRANSACTION_VN = ["Gửi tiền", "Tất toán"];
var CONST_ACC_QUERY_TYPE_TRANSACTION_EN = ["Deposit", "Liquidate"];
var CONST_ACC_QUERY_TYPE_TRANSACTION_VAL = ["A13", "A14"];
var CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VN = ["Tất cả", "Gửi tiền", "Tất toán"];
var CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_EN = ["All", "Deposit", "Liquidate"];
var CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VAL = ["", "A13", "A14"];

var CONST_ACCOUNT_QUERY_TYPE_STATUS_VN = ["Tất cả", "Đã duyệt", "Chờ duyệt", "Duyệt một phần", "Từ chối", "Duyệt không thành công"];
var CONST_ACCOUNT_QUERY_TYPE_STATUS_EN = ["All", "Authorised", "Pending", "Authorised partly", "Reject", "Unsuccessful authorisation"];
var CONST_ACCOUNT_QUERY_TYPE_STATUS_VALUE = ["ALL", "ABH", "INT", "APT", "REJ", "RBH"];

//Tra cuu tai khoan cho chuc nang: Duyet dong mo so tiet kiem
var CONST_ACCOUNT_APPROVED_TYPE_STATUS_VN = ["Tất cả", "Chờ duyệt", "Duyệt một phần"];
var CONST_ACCOUNT_APPROVED_TYPE_STATUS_EN = ["All", "Pending", "Authorised partly"];
var CONST_ACCOUNT_APPROVED_TYPE_STATUS_VALUE = ["ALL", "INT", "APT"];

//Duyet chuyen khoan trong TPB
var INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_VN = ["Tất cả", "Chuyển tới tài khoản eBank khác", "Chuyển giữa các tài khoản của doanh nghiệp"];
var INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_EN = ["All", "Transfer to other account in eBank  ", "Transfer within customer\'s accounts"];
var INTERNAL_TRANS_AUTH_LIST_TRANS_TYPE_KEY = ["", "T12", "T11"];

var INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_VN = ["Tất cả", "Chờ duyệt", "Duyệt một phần"];
var INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_EN = ["All", "Pending", "Authorised partly"];
var INTERNAL_TRANS_AUTH_LIST_TRANS_STATUS_KEY = ["", "INT", "APT"];
//END--Duyet chuyen khoan trong TPB

//Quan ly giao dich theo lo
var BATCH_SALARY_MNG_TRANS_TYPE_VN = ["Tất cả", "Trả lương theo lô trong eBank", "Chuyển khoản theo lô liên ngân hàng"];
var BATCH_SALARY_MNG_TRANS_TYPE_EN = ["All", "Payroll transfer within eBank", "Interbank batch transfer"];
var BATCH_SALARY_MNG_TRANS_TYPE_KEY = ["", "T16", "T17"];

var BATCH_SALARY_MNG_LIST_STATUS_VN = ["Tất cả", "Đã duyệt", "Chờ duyệt", "Từ chối", "Duyệt một phần", "Duyệt không thành công"];
var BATCH_SALARY_MNG_LIST_STATUS_EN = ["All", "Authorised", "Pending", "Reject", "Authorised partly", "Unsuccessful authorisation"];
var BATCH_SALARY_MNG_LIST_STATUS_KEY = ["", "ABH", "INT", "REJ", "APT", "RBH"];
//END--Quan ly giao dich theo lo

//trangj thai chuyen tien quoc te
var TRANS_MONEY_INTERNATIONAL_STATUSES_VN = ["Tất cả","Chờ duyệt","Đã duyệt một phần", "Đang xử lý", "Hồ sơ đã được Tiếp nhận", "Duyệt không thành công","Hủy giao dịch",
											"Từ chối", "Hoàn thành giao dịch", "Hoàn chứng từ" , "Chờ duyệt BS CTừ", "Duyệt một phần BS CTừ",
											"Từ chối BS CTừ", "Duyệt BS CTừ  không thành công", "Đang xử lý BS CTừ",  "eBank từ chối BS CTừ","eBank từ chối"];
var TRANS_MONEY_INTERNATIONAL_STATUSES_EN = ["All", "Pending", "Authorised partly", "Đang xử lý", "Hồ sơ đã được Tiếp nhận", "Duyệt không thành công",
											"Reject", "Hủy giao dịch", "Hoàn thành giao dịch", "Hoàn chứng từ" , "Chờ duyệt BS CTừ", "Duyệt một phần BS CTừ",
											"Từ chối BS CTừ", "Duyệt BS CTừ  không thành công", "Đang xử lý BS CTừ",  "eBank từ chối BS CTừ","eBank từ chối"];
var TRANS_MONEY_INTERNATIONAL_STATUSES_KEY = ["", "INT", "APT", "STH", "HBH", "RBH", "CAN","REJ" ,"ABH","REH","IBS","APS","RES","RBS","SBS","RJS","RSA"];
//END--trangj thai chuyen tien quoc te



//Tra cuu tai khoan, giao dich, tat 
var CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_VN = ["Tất cả", "Gửi tiền", "Tất toán"];
var CONST_ACCOUNT_QUERY_TYPE_TRANSACTION_EN = ["All", "Deposit", "Liquidate"];
var CONST_ACCOUNT_QUERY_TYPE_VALUE = ["ALL", "A13", "A14"];
var CONST_ACCOUNT_QUERY_RATE_MONTH_VN = ["1 tháng", "2 tháng", "3 tháng", "6 tháng", "9 tháng", "12 tháng", "18 tháng", "24 tháng", "36 tháng" ];
var CONST_ACCOUNT_QUERY_RATE_MONTH_EN = ["1 months", "2 months", "3 months", "6 months", "9 months", "12 months", "18 months", "24 months", "36 months" ];
var CONST_ACCOUNT_QUERY_RATE_VALUE = ["", "", "", "", "4.60%", "4.70%", "4.80%","5.40%","5.60%","6.30%","6.50%","6.60%", "6.60%",];
var COST_TYPE_GUARANTEE = [];
var COST_TYPE_GUARANTEE_VALUE = [];

//duyet dong mo so tiet kiem
var CONST_AUTH_ACC_OPEN_TYPE_TRANSACTION_VN = ["Gửi tiền", "Tất toán"];
var CONST_AUTH_ACC_OPEN_TYPE_TRANSACTION_EN = ["Deposit", "Liquidate"];
var CONST_AUTH_ACC_OPEN_TYPE_TRANSACTION_VAL = ["A13", "A14"];
var CONST_AUTH_ACC_OPEN_TYPE_STATUS_VN = ["Chờ duyệt", "Duyệt một phần"];
var CONST_AUTH_ACC_OPEN_TYPE_STATUS_EN = ["Pending", "Authorised partly"];
var CONST_AUTH_ACC_OPEN_TYPE_STATUS_VAL = ["INT", "APT"];

//thiet lap he thong, thay doi mat khau
var CONST_SETUP_PAGE_MENU_DROPLIST_VN = ["Ngôn ngữ", "Thông tin cá nhân"];//"Thay đổi mật khẩu"
var CONST_SETUP_PAGE_MENU_DROPLIST_EN = ["Language", "Personal information"];//"Change password"

//thanh toan thue
var CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_VN = ["Lưu mã số thuế", "Không lưu"];
var CONST_TAX_INFO_QUERY_DOMESTIC_VALUE_EN = ["Save tax code", "Do not save"];
var CONST_TAX_INFO_QUERY_DOMESTIC_KEY = [1, 0];

var CONST_TAX_INFO_QUERY_IE_VALUE_VN = ["Lưu số tờ khai", "Lưu mã số thuế", "Không lưu"];
var CONST_TAX_INFO_QUERY_IE_VALUE_EN = ["Save declaration number", "Save tax code", "Do not save"];
var CONST_TAX_INFO_QUERY_IE_KEY = [2, 1, 0];

/* Duyệt chuyển khoản định kì */
var CONST_TRANS_PERIODIC_TYPE_VN = ['Chuyển khoản định kỳ trong eBank'];
var CONST_TRANS_PERIODIC_TYPE_EN = ['Periodic transfer in eBank'];
var CONST_TRANS_PERIODIC_TYPE_ID = ['T15'];
var CONST_AUTH_STATUS_TRANSPDI_VN = ['Tất cả', 'Chờ duyệt', 'Duyệt một phần', 'Chờ duyệt hủy', 'Chờ duyệt hủy một phần'];
var CONST_AUTH_STATUS_TRANSPDI_EN = ['All', 'Pending', 'Authorised partly', 'Wait for approval of canceling', 'Wait for approval of canceling partly'];
var CONST_AUTH_STATUS_TRANSPDI_ID = ['ALL', 'INT', 'APT', 'PFC', 'CPA'];

//Thiết lập truy vấn giao dịch
var CONST_SETUP_QUERY_TRANS_TYPE_VN = ["Tất cả", "Cài đặt hệ thống", "Cài đặt giao dịch"];
var CONST_SETUP_QUERY_TRANS_TYPE_EN = ["All", "System settings", "Transaction settings"];
var CONST_SETUP_QUERY_TRANS_TYPE_KEY = ["", "S01", "S02"];

var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_VN = ["Tất cả", "Cài đặt thông tin cá nhân", "Thay đổi mật khẩu"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_EN = ["All", "Personal information setting", "Change password"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S01_KEY = ["", "S11", "S12"];

var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_VN = ["Tất cả", "Gửi thông báo cho người duyệt", "Phương thức xác thực", "Hạn mức giao dịch"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_EN = ["All", "Send notification to the Authorizer", "Authentication method", "Transaction limit"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_S02_KEY = ["", "S13", "S14", "S15"];

var CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_VN = ["Tất cả", "Cài đặt thông tin cá nhân", "Thay đổi mật khẩu", "Gửi thông báo cho người duyệt", "Phương thức xác thực", "Hạn mức giao dịch"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_EN = ["All", "Personal information setting", "Change password", "Send notification to the Authorizer", "Authentication method", "Transaction limit"];
var CONST_SETUP_QUERY_TRANS_TYPE_DTL_ALL_KEY = ["", "S11", "S12", "S13", "S14", "S15"];

var CONST_SETUP_QUERY_LIST_STATUS_VN = ["Tất cả", "Đã duyệt", "Chờ duyệt", "Từ chối", "Duyệt một phần", "Duyệt không thành công"];
var CONST_SETUP_QUERY_LIST_STATUS_EN = ["All", "Authorised", "Pending", "Reject", "Authorised partly", "Unsuccessful authorisation"];
var CONST_SETUP_QUERY_LIST_STATUS_KEY = ["", "ABH", "INT", "REJ", "APT", "RBH"];

var CONST_SETUP_QUERY_LIST_AUTH_METHOD_VN = ["Không gửi thông báo cho người duyệt", "Gửi thông báo cho người duyệt giao dịch qua Email", "Gửi thông báo cho người duyệt giao dịch qua tin nhắn SMS", "Gửi thông báo cho người duyệt giao dịch qua Email và tin nhắn SMS"];
var CONST_SETUP_QUERY_LIST_AUTH_METHOD_EN = ["Không gửi thông báo cho người duyệt", "Gửi thông báo cho người duyệt giao dịch qua Email", "Gửi thông báo cho người duyệt giao dịch qua tin nhắn SMS", "Gửi thông báo cho người duyệt giao dịch qua Email và tin nhắn SMS"];
var CONST_SETUP_QUERY_LIST_AUTH_METHOD_KEY = [0, 1, 2, 3];

var CONST_SETUP_LANG = ['Tiếng việt', 'English'];
var CONST_SETUP_LANG_VALUE = ['VN', 'EN'];

//Tra cuu giao dich thanh toan thue
var CONST_MNG_TAX_TYPE_VALUE_VN = ["Tất cả", "Thanh toán thuế"];
var CONST_MNG_TAX_TYPE_VALUE_EN = ["All", "Tax payment"];
var CONST_MNG_TAX_TYPE_KEY = ['', "B11"];

// Tra cứu thanh toán hóa đơn
var CONST_MNG_BILL_TYPE_VALUE_VN = ["Tất cả", "Thanh toán hóa đơn"];
var CONST_MNG_BILL_TYPE_VALUE_EN = ["All", "Bill payment"];
var CONST_MNG_BILL_TYPE_KEY = ['', "B12"];

var CONST_MNG_TAX_DETAIL_VALUE_EN = ['All', 'Domestic tax', 'Import/Export tax', 'Phí, lệ phí thuế xuất nhập khẩu','Phí, lệ phí của các bộ, ngành'];
var CONST_MNG_TAX_DETAIL_VALUE_VN = ['Tất cả', 'Thuế nội địa', 'Thuế xuất nhập khẩu', 'Phí, lệ phí thuế xuất nhập khẩu','Phí, lệ phí của các bộ, ngành'];
var CONST_MNG_TAX_DETAIL_KEY = ['', '01', '02', '05', '06'];

var CONST_MNG_TAX_STATUS_DETAIL_VALUE_VN = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối', 'Duyệt không thành công', 'Duyệt một phần'];
var CONST_MNG_TAX_STATUS_DETAIL_VALUE_EN = ['All', 'Pending', 'Authorised', 'Reject', 'Unsuccessful authorisation', 'Authorised partly'];
var CONST_MNG_TAX_STATUS_DETAIL_KEY = ['', 'INT', 'ABH', 'REJ', 'RBH', 'APT'];

var CONST_AUTH_TAX_STATUS_DETAIL_VALUE_VN = ['Tất cả', 'Chờ duyệt', 'Duyệt một phần'];
var CONST_AUTH_TAX_STATUS_DETAIL_VALUE_EN = ['All', 'Pending', 'Authorised partly'];
var CONST_AUTH_TAX_STATUS_DETAIL_KEY = ['', 'INT', 'APT'];

// Duyet thiet lap
var CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_VN = ["Hạn mức giao dịch"];
var CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_EN = ["Transaction limit"];
var CONST_SETUP_AUTHORIZE_LIST_TRANS_TYPE_KEY = ["S15"];

//Chuyen tien trong TPB
var CONST_INTERNAL_TRANS_TYPE_VN = ["Chuyển tới tài khoản eBank khác", "Chuyển giữa các tài khoản của doanh nghiệp"];
var CONST_INTERNAL_TRANS_TYPE_EN = ["Transfer to other account in eBank  ", "Transfer within customer\'s accounts"];
var CONST_INTERNAL_TRANS_TYPE_KEY = ["T12", "T11"];
var CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_VN = ["Không lưu", "Lưu danh sách thụ hưởng", "Lưu mẫu chuyển tiền"];
var CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_EN = ["Do not save", "Save to list of beneficiaries", "Save to payment templates"];
var CONST_INTERNAL_TRANS_SAVE_SAMPLE_STATUS_KEY = ["N", "TH", "TP"];

//Thanh toán hóa đơn
var CONST_INTERNAL_PAYMENT_SAVE_SAMPLE_STATUS_VN = ["Không lưu", "Lưu danh sách"];
var CONST_INTERNAL_PAYMENT_SAVE_SAMPLE_STATUS_EN = ["Do not save", "Save to list"];
var CONST_INTERNAL_PAYMENT_SAVE_SAMPLE_STATUS_KEY = ["N", "TH"];

//Mua ban ngoai te
var CONST_FOREIGN_TRANS_TYPE_VN = ["Tất cả", "Mua/bán ngoại tệ"];
var CONST_FOREIGN_TRANS_TYPE_EN = ["All", "Foreign Exchange"];
var CONST_FOREIGN_TRANS_TYPE_KEY = ["", "B13"];

var CONST_FOREIGN_MONEY_UNIT_VN = ["Tất cả", "USD", "JPY", "EUR"];
var CONST_FOREIGN_MONEY_UNIT_EN = ["All", "USD", "JPY", "EUR"];
var CONST_FOREIGN_MONEY_UNIT_KEY = ["", "USD", "JPY", "EUR"];

var CONST_FOREIGN_STATUS_VN = ['Tất cả', 'Chờ duyệt', 'Đã duyệt', 'Từ chối', 'Duyệt không thành công', 'Duyệt một phần'];
var CONST_FOREIGN_STATUS_EN = ['All', 'Pending', 'Authorised', 'Reject', 'Unsuccessful authorisation', 'Authorised partly'];
var CONST_FOREIGN_STATUS_KEY = ['', 'INT', 'ABH', 'REJ', 'RBH', 'APT'];

//Bảo lãnh
var CONST_GUARANTEE_TRANS_TYPE_VN = ['Bảo lãnh ứng trước', 'Bảo lãnh bảo hành', 'Bảo lãnh dự thầu', 'Bảo lãnh thực hiện hợp đồng', 'Bảo lãnh thanh toán', 'Bảo lãnh đối ứng'];
var CONST_GUARANTEE_TRANS_TYPE_EN = ['Payment Guarantee', 'Warranty Guarantee', 'Bid guarantee', 'Contract performance guarantee', 'Payment guarantee', 'Counter Guarantee'];
var CONST_GUARANTEE_TRANS_TYPE_KEY = ['BL01', 'BL02', 'BL03', 'BL04', 'BL05', 'BL06'];

var CONST_GUARANTEE_QUERY_TYPE_STATUS_VN = ["Tất cả", "Đã duyệt", "Chờ duyệt", "Duyệt một phần", "Từ chối", "Duyệt không thành công"];
var CONST_GUARANTEE_QUERY_TYPE_STATUS_EN = ["All", "Authorised", "Pending", "Authorised partly", "Reject", "Unsuccessful authorisation"];
var CONST_GUARANTEE_QUERY_TYPE_STATUS_VALUE = ["", "ABH", "INT", "APT", "REJ", "RBH"];

var CONST_MNG_GUARANTEE_TYPE_VALUE_VN = ["Tất cả", "Đề nghị phát hành bảo lãnh"];
var CONST_MNG_GUARANTEE_TYPE_VALUE_EN = ["All", "Bill payment"];
var CONST_MNG_GUARANTEE_TYPE_VALUE_KEY = ['', "B14"];

var CONST_RELEASE_FORMS_OF_GUARANTEE_VN = ['Phát hành thư bảo lãnh theo mẫu của eBank', 'Phát hành thư bảo lãnh không theo mẫu của eBank'];
var CONST_RELEASE_FORMS_OF_GUARANTEE_EN = ['Issuing Guarantee by eBank form', 'Issuing Guarantee not by eBank form'];
var CONST_RELEASE_FORMS_OF_GUARANTEE_KEY = ['YG', 'NG'];

//Chuyển tiền quốc tế
var CONST_INTERNATIONAL_MONEY_TRANS_VN = ['Thanh toán hàng hóa nhập khẩu', 'Thanh toán dịch vụ nước ngoài'];
var CONST_INTERNATIONAL_MONEY_TRANS_EN = ['Thanh toán hàng hóa nhập khẩu', 'Thanh toán dịch vụ nước ngoài'];
var CONST_INTERNATIONAL_MONEY_TRANS_KEY = ['IMT01', 'IMT02'];

var CONST_INTERNATIONAL_MONEY_TRANS_TYPE_VN = ['Đề nghị chuyển tiền quốc tế', 'Bổ sung chứng từ'];
var CONST_INTERNATIONAL_MONEY_TRANS_TYPE_EN = ['Đề nghị chuyển tiền quốc tế', 'Bổ sung chứng từ'];
var CONST_INTERNATIONAL_MONEY_TRANS_TYPE_KEY = ['01', '02'];

var CONST_INTERNATIONAL_PURPOSE_IMT01_VN = ['Thanh toán trước khi nhận hàng', 'Thanh toán sau khi nhận hàng'];
var CONST_INTERNATIONAL_PURPOSE_IMT01_EN = ['Thanh toán trước khi nhận hàng', 'Thanh toán sau khi nhận hàng'];
var CONST_INTERNATIONAL_PURPOSE_IMT01_KEY = ['IPHH01', 'IPHH02'];

var CONST_INTERNATIONAL_PURPOSE_IMT02_VN = ['Chuyển tiền thanh toán Phí hội viên tại các Tổ chức Quốc Tế hoặc Phí đăng ký tham gia hội nghị quốc tế',
                                            'Chuyển tiền cho mục đích thanh toán chi phí công tác, học tập của cán bộ nhân viên đi công tác, học tập ở nước ngoài',
                                            'Chuyển lợi nhuận ra nước ngoài liên quan tới hoạt động đầu tư trực tiếp tại Việt Nam',
                                            'Chi trả lương/thưởng/trợ cấp cho nhân viên nước ngoài làm việc tại Việt Nam',
                                            'Thanh toán cước phí dịch vụ vận chuyển',
                                            'Thanh toán phí hoa hồng, môi giới theo các hợp đồng xuất khẩu',
                                            'Thanh toán phí dịch vụ du lịch (công ty trong nước thanh toán cho công ty nước ngoài)',
                                            'Thanh toán tiền nhận chuyển giao công nghệ/nhượng quyền thương mại ở nước ngoài',
											'Chuyển tiền cho chi phí thành lập và hoạt động của Văn phòng đại diện tại nước ngoài',
											'Thanh toán đăng ký bản quyền, phí duy trì thương hiệu',
											'Chuyển tiền thanh toán chuyển khẩu (theo quy định của eBank từng thời kỳ)',
											'Thanh toán dịch vụ với nước ngoài ( phí tư vấn, dịch vụ công nghệ…)',
											'Thanh toán dịch vụ trực tuyến',
											'Chuyển vốn đầu tư trực tiếp cùng lợi nhuận,  ra khỏi Việt nam trong trường hợp giải thể, chấm dứt hoạt động của DN tại Việt nam',
											'Chuyển lợi nhuận ra nước ngoài liên quan đến hoạt động đầu từ gián tiếp',
											];

var CONST_INTERNATIONAL_PURPOSE_IMT02_EN = ['Chuyển tiền thanh toán Phí hội viên tại các Tổ chức Quốc Tế hoặc Phí đăng ký tham gia hội nghị quốc tế',
                                            'Chuyển tiền cho mục đích thanh toán chi phí công tác, học tập của cán bộ nhân viên đi công tác, học tập ở nước ngoài',
                                            'Chuyển lợi nhuận ra nước ngoài liên quan tới hoạt động đầu tư trực tiếp tại Việt Nam',
                                            'Chi  trả lương/thưởng/trợ cấp cho nhân viên nước ngoài làm việc tại Việt Nam',
                                            'Thanh toán cước phí dịch vụ vận chuyển',
                                            'Thanh toán phí hoa hồng, môi giới theo các hợp đồng xuất khẩu',
                                            'Thanh toán phí dịch vụ du lịch (công ty trong nước thanh toán cho công ty nước ngoài)',
                                            'Thanh toán tiền nhận chuyển giao công nghệ/nhượng quyền thương mại ở nước ngoài',
											'Chuyển tiền cho chi phí thành lập và hoạt động của Văn phòng đại diện tại nước ngoài',
											'Thanh toán đăng ký bản quyền, phí duy trì thương hiệu',
											'Chuyển tiền thanh toán chuyển khẩu (theo quy định của eBank từng thời kỳ)',
											'Thanh toán dịch vụ với nước ngoài ( phí tư vấn, dịch vụ công nghệ…)',
											'Thanh toán dịch vụ trực tuyến',
											'Chuyển vốn đầu tư trực tiếp cùng lợi nhuận,  ra khỏi Việt nam trong trường hợp giải thể, chấm dứt hoạt động của DN tại Việt nam',
											'Chuyển lợi nhuận ra nước ngoài liên quan đến hoạt động đầu từ gián tiếp',
											];

var CONST_INTERNATIONAL_PURPOSE_IMT02_KEY = ['IPDV01', 'IPDV02', 'IPDV04', 'IPDV05', 'IPDV07', 'IPDV08', 'IPDV09', 'IPDV10','IPDV11','IPDV12','IPDV13', 'IPDV14', 'IPDV15','IPDV16','IPDV17'];

var CONST_INTERNATIONAL_TRANS_METHOD_VN = ['Theo số Swift của Ngân hàng bên thụ hưởng', 'Theo tên và địa chỉ của Ngân hàng bên thụ hưởng'];
var CONST_INTERNATIONAL_TRANS_METHOD_EN = ['By Swift code of Beneficiary’s bank', 'By name and address of Beneficiary’s bank'];
var CONST_INTERNATIONAL_TRANS_METHOD_KEY = ['CS01', 'CS02'];

var CONST_INTERNATIONAL_TRANS_METHOD_NHTG_VN = ['Theo số Swift của Ngân hàng trung gian', 'Theo tên và địa chỉ Ngân hàng trung gian'];
var CONST_INTERNATIONAL_TRANS_METHOD_NHTG_EN = ['By Swift code of Intermediary bank', 'By name and address of Intermediary bank'];
var CONST_INTERNATIONAL_TRANS_METHOD_NHTG_KEY = ['CSTG01', 'CSTG02'];

var CONST_INTERNATIONAL_INTERMEDIARY_BANK_VN = ['Không chuyển qua ngân hàng trung gian', 'Chuyển qua ngân hàng trung gian'];
var CONST_INTERNATIONAL_INTERMEDIARY_BANK_EN = ['Không chuyển qua ngân hàng trung gian', 'Chuyển qua ngân hàng trung gian'];
var CONST_INTERNATIONAL_INTERMEDIARY_BANK_KEY = ['IBN', 'IBY'];

var CONST_INTERNATIONAL_METHOD_FEE_VN = ['BEN-Người hưởng chịu tất cả các loại phí', 'SHA-Người ra lệnh chỉ chịu phí eBank (CT, điện phí)', 'OUR-Người ra lệnh chịu tất cả các loại phí'];
var CONST_INTERNATIONAL_METHOD_FEE_EN = ['BEN-Người hưởng chịu tất cả các loại phí', 'SHA-Người ra lệnh chỉ chịu phí eBank (CT, điện phí)', 'OUR-Người ra lệnh chịu tất cả các loại phí'];
var CONST_INTERNATIONAL_METHOD_FEE_KEY = ['BEN', 'SHA', 'OUR'];

var CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_VN = ["Không lưu", "Lưu mẫu chuyển tiền"];
var CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_EN = ["Do not save", "Save to payment templates"];
var CONST_INTERNATIONAL_TRANS_SAVE_SAMPLE_STATUS_KEY = ["N", "TP"];

// Tra cứu thanh toán quóc tế
var CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_VN = ["Tất cả", "Chuyển tiền quốc tế"];
var CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_VALUE_EN = ["All", "Payment international"];
var CONST_MNG_PAYMENT_INTERNATIONAL_TYPE_KEY = ['', "B15"];

//trạng thái giao dịch thanh toán quốc tế
var CONST_INTERNATIONAL_TRANS_STATUS_VN = ["Tất cả", "Chờ duyệt", "Duyệt một phần", "Chờ duyệt bổ sung chứng từ", "Duyệt một phần bổ sung chứng từ"];
var CONST_INTERNATIONAL_TRANS_STATUS_EN = ["All", "Pending", "Authorised partly"];
var CONST_INTERNATIONAL_TRANS_STATUS_KEY = ["", "INT", "APT", "IBS", "APS"];

var CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_VN = ["Tất cả", "Chờ duyệt", "Duyệt một phần"];
var CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_EN = ["All", "Pending"];
var CONST_INTERNATIONAL_TRANS_TYPE_01_STATUS_KEY = ["", "INT", "APT"];

var CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_VN = ["Tất cả", "Chờ duyệt bổ sung chứng từ", "Duyệt một phần bổ sung chứng từ"];
var CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_EN = ["All", "Authorised","partly"];
var CONST_INTERNATIONAL_TRANS_TYPE_02_STATUS_KEY = ["", "IBS", "APS"];


// Link cho help
var LinkHelp = [
	{
		key : 'homepagexsl/homepage-corp-scr',
		value : '{0}trangChu-{1}.pdf'
	},
	{
		key : 'corp/account',
		value : '{0}taiKhoan-{1}.pdf'
	},
	{
		key : 'corp/transfer',
		value : '{0}chuyenKhoan-{1}.pdf'
	},
	{
		key : 'corp/payment_service',
		value : '{0}thanhToanDichVu-{1}.pdf'
	},
	{
		key : 'corp/credit',
		value : '{0}tinDung-{1}.pdf'
	},
	{
		key : 'corp/setup',
		value : '{0}thietLap-{1}.pdf'
	},
	{
		key : 'corp/authorize',
		value : '{0}duyetGiaoDich-{1}.pdf'
	}
];