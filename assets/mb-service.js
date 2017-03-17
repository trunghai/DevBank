/**
 * Created by HuyNT2.
 * User: 
 * Date: 12/17/13
 * Time: 5:35 PM
 */

//Global variable

/*** SERVICE LINK ***/
var gMBServiceUrl = CONST_WEB_SERVICE_LINK;
var gRequestMethod = "POST";
/*** SERVICE LINK END ***/

/*** VARIABLE GLOBAL ***/
var gSysData;
var gDeviceLocalStatus;
var gUserLocalStatus;
var gDeviceToken = "";
var gDeviceWWWFolder = "";

var gUserInfo = new UserInfoObj();
var gVisaCardObjs = new Array();
var gVisaCardHistoryObjs = new Array();
var gVisaCardIndexSelected;
var gIsLogin = false; //using check login
var gUsingAccountNo; //store source account no
var gUsingServiceCode; //store source account no
var gCustomerNo; //CIF
var gCustomerNanme; //customer full name
/**TuanNM5 UPDATE**/
var gJumboAccExistedStat;
var gliItemJumbo; //Jumbo menu li items
var gJumboAccInfo; //Jumbo Acc Info for create and view
var gAutoSavingAccInfo; //Autos Saving Info for create and change
var gJumboMenuElements;
var gisSavingApplyLitmitExist = false;
var gisCreditApplyLitmitExist = false;
var gRegisterdAutoSavingAccs = [];
var gAutoSavingAccs = [];
var gConnectedAccs = [];

/*TUANNM5 FOR FUND TRANSFER*/
var gTransMode;
var gTransFromDate;
var gTransToDate;
var gSuccessReceiverCount;

var gDestinationInput = "";

var gMenuRawData;

var gOldDeviceHeight = 0; //using save old height
// Title Com-input-Account

var gUtilitiesModeDefault = 1; // chuyen che do man hinh utitlity

var storeComImputAccounTitle = {}; //do not use directly
var withdraw_account = "";
function setCominputAccountHtmlTitle(inTitleHtml) {
	storeComImputAccounTitle[navArrayScr[0]] = inTitleHtml;
}
function getCominputAccountHtmlTitle() {
	var tmpComInputTitle = storeComImputAccounTitle[navArrayScr[0]];
	if((tmpComInputTitle == undefined) || (tmpComInputTitle == null) || (tmpComInputTitle == '')) {
		tmpComInputTitle = CONST_STR.get("INPUT_ACC_TITLE");
	}
	return tmpComInputTitle;
}

// Paging
var storePaging = ''; //do not use directly
function setHtmlPaging(htmlPaging) {
	storePaging = htmlPaging;
}
function getHtmlPaging() {
	return storePaging;
}

//account history
var gSelectedAccIdx = 0;
function setSelectedAccIdx(idx) {
	gSelectedAccIdx = idx;
}
function getSelectedAccIdx() {
	return gSelectedAccIdx;
}

//account history
var gSelectedAccInfoObj = 0;
function setSelectedAccInfoObj(inAcc) {
	gSelectedAccInfoObj = inAcc;
}
function getSelectedAccInfoObj() {
	return gSelectedAccInfoObj;
}

//sequence form
//var gSequenceFormIdx = 401;
var gSequenceFormIdx = 301;
function setSequenceFormIdx(idx) {
	gSequenceFormIdx = idx;
}
function getSequenceFormIdx() {
	return gSequenceFormIdx;
}

//captcha
 var current_md5_capcha="";

//News
 var gNews;
 function setNewsStoreXml(inXml){
	gNews = inXml;
 }
 function getNewsStoreXml() {
	return gNews;
 }
//Payee
 var gEvnPayeeType = "";
 var gPayeeObj = new PayeeObj();
 var gPayeeList = new Array();
 var gBankList = new Array();

 function PayeeObj(){
	 this.customerNo = "";
	 this.payeeType = "";
	 this.transType = "";
	 this.transValue = "";
	 this.peopleName = "";
	 this.partnerCode = "";
	 this.provinceCode = "";
	 this.citadCode = "";
	 this.partnerName = "";
	 this.fancyName = "";
 }

//eSaving
var gESavingObjs = new Array(); //save all eSavingObj
var gESavingObjUsing = new ESavingObj(); //save using eSavingObj
//=========================TEMPLATE (MẪU CHUYỂN TIỀN==============
var lstTemplate = new Array();
//=================LOAN============================================
var gLoanTheChap = new Array();//THE CHAP
var gLoanTinChap = new Array();//TIN CHAP
var gLoanThauChi = new Array();   //THAU CHI
var loanSelected = new LoanObj(); //SAVE CURRENCY
var loanObjOverdraft = new LoanObjOverdraft();
//Collateral
var gCollateralObjs = new Array();//TSDB
// loan repayment schedule
var gContractNoObjs = new Array();//list contract number
var gRepaymentScheduleObjs = new Array();//list repayment schedule
var gLoanScheduleObjs = new Array();//save all Loan info
var file_name_list = "";
var flag_file = "";
//================OVERDRAFT=========================================
var gLoanSaving;
var lstAccID;
var gOverdraft;
var isIncrease  = 2;
var esaving_tenor_open = 1;
//==================================================================
//THUANTM GOLD NEW
var objSJC;
var objDOJI;
var lstResultJSC = new Array();
var lstResultDOJI = new Array();
var subDOJI = new Array();//=0 LỘC, 1 PHÚC, 2 PHÁT, 3 TÀI
var strProvinceCode = "";
var strBrnCode 		= "";
var duration_date;
var currentDate;
//==================================================================
//EVN-HCM
var globalEvnObj = new EvnObj();

//History code
var gHistoryCode = "";

//transfer inter banks
var gBankInfoSelected = '';
var gCityInfoSelected = '';
var gBranchInfoSelected = '';

//bank info
var gBankInfoCitySelected = '';
var gBankInfoAreaSelected = '';
var gBankInfoBranchSelected = '';

//atm
var gBankInfoATMSelected = '';
var ATMInfo = new PlaceObj1();
function PlaceObj1(){
this.latitude ='';
this.longtitude ='';
this.address ='';
this.area ='';
}
var gUserLocation = new PlaceObj();
var gUserLocationStatus = false;
function PlaceObj() {
	this.title = '';
	this.subtitle = '';
	this.distance = '';
	this.latitude = '';
	this.longtitude = '';
	this.altitude = ''; 
}

//==================================================================
//Homepage
var gCusPropDetailDebt; //cac loai tien gui
var gCusPropDetailCre; //cac loai tien vay

//==================================================================
//AnhNN sao ke
var cardnumber ="";
var monthyear ="";
var flag_load_saoke = "";

//==================================================================

//other atm
var gBankInfoOtherATMcity = '';
var gBankInfoOtherATMArea = '';

//get root view name
function getNavRootViewName() {
	return navArrayScr[0];
}

//store Auto-Saving
var gAutoSavingAccDetailInfo = new Array();
function setAutoSavingAccDetailInfo(inData) {
	if(inData != undefined) {
		gAutoSavingAccDetailInfo = inData;
		return true;
	}
	return false;
}
function getAutoSavingAccDetailInfo() {
	return gAutoSavingAccDetailInfo;
}

/*** VARIABLE GLOBAL ***/

/*** SERVICE OBJECTS ***/
	
function GprsCmdObj (cmdType, appName, version, language, sessionID, arguments, iRaw) {
	this.cmdType = cmdType;
	if (appName.length == 0) {
		this.appName = CONST_APP_NAME;
		}
	else {
		this.appName = appName;
		}
	this.timeCur = getCurrentTime();
	if (version.length == 0) {
		this.version = CONST_APP_VERSION;
		}
	else {
		this.version = version;
		}
	if (language.length > 0) {
		this.language = language;
		}
	if (sessionID.length > 0) {
		this.sessionID = sessionID;
		}
	this.arguments = arguments;
	
	if(iRaw == undefined) {
	 this.raw = '';
	}
	else
		this.raw = iRaw;
	
	}


function GprsRespObj(responseType, respCode, respContent, arguments, iRaw) {
	this.responseType = responseType;
	this.respCode = respCode;
	this.respContent = respContent;
	
	if (arguments.length == 0) {
		this.arguments = new Array();
		}
	else {
		this.arguments = arguments;
		}
	
	if(iRaw == undefined) {
		this.respRaw = '';
	}
	else {
		this.respRaw = iRaw;
	}
}

function GprsRespObj(responseType, respCode, respContent, arguments, iRaw, iJson) {
	this.responseType = responseType;
	this.respCode = respCode;
	this.respContent = respContent;
	
	if (arguments.length == 0) {
		this.arguments = new Array();
		}
	else {
		this.arguments = arguments;
		}
	
	if(iRaw == undefined) {
		this.respRaw = '';
	}
	else {
		this.respRaw = iRaw;
	}
	
	if(iJson == undefined) {
		this.respJson = '';
	}
	else {
		this.respJson = iJson;
	}
}

function UserInfoObj() {
	this.accountName = "";
	this.mobileNumber = "";
	this.email = "";
	this.defaultAccount = "";
	this.isNewAccount = "";
	this.phone = "";
	this.wwanPhone = "";
	this.lang = "VN"; //VN, EN
	this.device = "";
	this.runMode = "";
	this.wwanPass = "";
	this.sessionID = "";
	this.valicationType = ""; //OTP; TOKEN; MTX
	this.numSwitchRetailAndTrade = "";
	this.goldTermConfirmed = false;
	this.descByUser = ""; 
	this.userRole = "BASIC";
	this.userAvatar = ""; //avatar
	this.flag_check="";//ngocdt3 check dang nhap dau tien
	
	this.accounts = new Array();
	this.accountList = new Array();
	this.accountListOther = new Array();
	this.accountListDetail = new Array();
	this.accountListLocalTrans = new Array();
	
	this.paymentGroupList = new Array();
	this.paymentServiceList = new Array();
	this.paymentProviderList = new Array();
	this.paymentRequestFieldList = new Array();
	this.paymentRequestFieldCboList = new Array();
	this.paymentFieldHistoryList = new Array();
	}
	
function AccountObj() {
	this.accountNumber = "";
	this.description = "";
	this.balance = "";
	this.balanceAvailable = "";
	this.currency = ""; //USD, VND
	
	this.overdraftLimit = ""; //han muc thau chi
	this.openDate = ""; //ngay mo tai khoan
	this.overdraftStartDate = ""; //ngay bat dau han muc thau chi
	this.overdraftEndDate = ""; //ngay ket thuc han muc thau chi
	this.rate = ""; // lai suat
	this.profitCost = ""; // lai du chi
	this.profitReven = ""; // lai du thu
	this.profitOverall = ""; // lai cong don
	this.branchCode = "";
	this.branchName = ""; //ten chi nhanh mo tai khoan
	this.numBlockedAmt = "";
	this.accClass = "";
	this.udfFieldVal = "";
	this.blockReason = ""; //nguyen nhan block
	this.nodebit ="";//check tk D3A003 co bi chan No debit hay ko
	this.noReceive = "";
	
	this.transactionHistory = new Array(); //array of transactions history
}

var gMenuList = new Array();
var gMenuUserOrder = new Array();
var gDynamicMenu = "";
function MenuObj(){
	this.keyLang = "";
	this.menuID = "";
	this.parentMenuID = "";
	this.iconCode = "";
	this.path = "";
	this.onClick = "";
	this.imgHighlight = "";
	this.requireStatus = "";
	this.hiddenStatus = "";//'Y'/'N'
	this.reOrderStatus = "";//'Y'/'N'
}

function TransactionHistoryObj() {
	this.transactionID = ""; //ref code
	this.destinationAccount = ""; // so tai khoan dich
	this.date = ""; //ngay chuyen khoan
	this.description = ""; // mo ta giao dich
	this.amount = ""; // so tien giao dich
	this.transactionType = ""; //loai giao dich
	this.balance = "";
	this.transOwnID = "";
	this.sourceAcc = "";
	this.debitAmount = "";
	this.creditAmount = "";
	this.destAccName = "";
	this.valueDate = "";
	
	}
	//TRANSFER FUND//
function TransTransferHistoryObj() {
	this.fcatno = ""; // so tham chieu
	this.transmode = ""; // loai chuyen khoan
	/*this.status = ""; // trang thai*/
	this.amount = ""; // so tien giao dich
	this.sourceAcc = ""; // so chuyen khoan
	this.valueDate = ""; // ngay hieu luc
	this.content =""; // noi dung
	this.toaccount="";//tai khoan nhan
	//TUANNM5 UPDATE
	this.receiver=""; //ten nguoi nhan
	this.receivedBank=""; //ngan hang nhan
	this.transFee=""; //phi chuyen tien
	this.transFrequency=""; //tan suat
	this.periodicDateTrans=""; //ngay chuyen tien dinh ky
	this.endDate=""; //ngay ket thuc
	this.totalAmountReceivers=""; //Tong so nguoi nhan
	this.totalAmount=""; //tong so tien chuyen
	this.detailReceivers = new Array(); //Danh sach nguoi nhan tien
	this.failSuccess = "";
	
	}
	
/*** VISA CARD ***/
function VisaCardObj() {
	this.cardNumber = ""; //so the da ma hoa
	this.creditCard = "";
	this.curLimit = ""; //han muc con lai
	this.currencyCode = ""; //loai tien
	this.currentStatus = ""; // trang thai
	this.fullName = ""; // ten chu the
	this.cardNumberPlain = ""; //so the khong ma hoa
	
	this.cardGrantedLimit = ""; //han muc duoc cap
	this.cardMinRepay = ""; //so tien thanh toan toi thieu
	this.curDebt = ""; //du no hien tai
	this.payDate = ""; // thanh toan truoc ngay
	this.cardStateDebt = ""; //du no trong ky sao ke
	this.cardType = ""; //loai the
	this.waitingAmount = ""; //so tien da tieu cho quyet toan
	this.description = "";
	this.ownerType = ""; //0: chinh, 1: phu
	this.waitingPaidAmount = ""; //Số tiền đã trả nợ<br>(đang chờ duyệt) //14
	this.payCurBal = ""; //Thanh toan du no hien tai //5
}
	
function VisaCardTransactionObj() {
	this.billingAmount = "";
	this.cardAccNameAddress = "";
	this.estimatedFee = "";
	this.actualFee = "";
	this.processCode = "";
	this.refNumber = "";
	this.totalAmount = "";
	this.transFee = "";
	this.transLocalDate = "";
	
	this.transContent = "";
	this.transWaitReview = "";
	this.transWaitConfirm = "";
	this.transComplete = "";
	}

function VisaHisTransactionObj() {
	 this.fullName = "";
     this.address = "";
     this.previousBalance = "";
     this.statementBalance = "";
     this.cardNumber ="";
     this.mininumPayment="";
     this.accountNumber ="";
     this.paymentDueDate = "";
     this.creditLimit = "";
     this.statementDate = "";
     this.totalDebit =""; //tong du no trong ky
     this.totalCredit =""; //tong du co trong ky

    /////////////////////////
    //bean for detail transaction
     this.transDate = "";
     this.postDate = "";
     this.transAmount = "";
     this.debit = "";
     this.credit ="";
     this.transDesc = "";
	}
	
var gArrayCardObjs = new Array();
function setArrayCardObjs(inData) {
	if(inData != undefined && inData.length > 0) {
		gArrayCardObjs = inData;
		return true;
	}
	return false;
}
function getArrayCardObjs() {
	return gArrayCardObjs;
}
	
/*** VISA CARD END ***/
function ESavingObj() {
	this.depositType = "";
	this.maturityType = "";
	this.account = "";
	this.amount = "";
	this.currency = "";
	this.depositTenor = "";
	this.email = "";
	
	this.depositDescription = "";
	this.openDate = "";
	this.closeDate = "";
	this.interest = "";
	
	this.nextCloseDate = "";
	this.amount_Extension = "";
	
	this.depositTenorID = "";
	this.maturityID = "";
	
	this.paidInterest = "";
	this.closeInterestExpected = "";
	
	this.destinationAcc = "";
	this.typeCurrency = "";
}

//==================================LOAN FUCNTION======================//
function Overdraft(){
	this.cif = "";
	this.accOverdraft = "";
	this.limitODStandby = "";
	this.odLimit = "";
	this.limitODCurrent = "";
	this.interestRateOD = "";
	this.limitODUse = "";
	
	this.effectiveDate = "";
	this.valueDate = "";
	this.blockAmountSaving = "";
	this.blockAmountSavingActive = "";
	this.acy_Accrued_dr_ic = "";
}
//=======Obj cho doi tuong TTKV the chap, tin chap=============//
function LoanObj(){
	this.loanContractNumber = "";
	this.productDescription = "";
	this.issuedLoanLimit = "";
	this.disbursedAmount = "";
	this.interestRate1 = "";
	this.valueDate = "";
	this.expiryDate = "";
	
	this.outstandingLoanBalance = "";
	this.paidPrincipalAmount = "";
	this.paidInterestAmount = "";
	this.overduePrincipalAmount = "";
	this.ovedueInterestAmount = "";
	
	this.penalizedInterestAmount = "";
	this.numberOfOverdueDays = "";
	this.currency = "";
}

function LoanObjOverdraft(){
	this.acc_number = "";
	this.han_muc = "";
	this.rate = "";
	this.ngay_cap = "";
	this.ngay_den_han = "";
	this.currency = "";
	this.so_du = "";
	
	this.so_du_kha_dung = "";
	this.han_muc_thau_chi = "";
	this.ngay_mo_tk = "";
	this.ngay_bat_dau_hmtc = "";
	this.ngay_ket_thuc_hmtc = "";
	
	this.rate1 = "";
	this.branch_code = "";
	this.branch_name = "";
	
	this.lai_du_thu = "";
	this.lai_du_chi = "";
	this.num_blocked_amount = "";
}

function CollateralObj(){
	this.accountNumber = "";
	this.liab_id = "";
	this.collateralCode = "";
	this.collateralDes = "";
	this.collateralType = "";
	this.estimatedValue = "";
	this.realWarrantValue = "";
	this.startDate = "";
	this.endDate = "";
	this.currency = "";
}

function LoanContractNo(){
	this.contractNo = "";
	this.type = "";
}

function LoanRepaymentSchedule(){
	this.mDate = "";
	this.payablePrincipalAmount = "";
	this.payableInterestAmount = "";
	this.payableTotal = "";
	this.paidAmount = "";
	this.remainingLoanBalance = "";
	this.outstandingPrincipal = "";
	this.type = "";
}
//==========================OVERDRAFT=================================
function LoanSaving(){
	this.accountSaving = "";
	this.accountClass = "";
	this.sendDate = "";
	this.dueDate = "";
	this.currency = "";
	this.rate = "";
	this.amountConvert = "";
	this.interestRate = "";
	this.amount = "";
	this.accOverdraft = "";
	this.tenorDays = "";
	this.tenorMonths = "";
	this.tenorYears = "";
	this.branchOpen = "";
	this.isStandby = "";
	this.type = "";
}

//====================================================================

function EvnObj(
	evnCustomerCode,
	evnCustomerName,
	evnCustomerAddress,
	evnCustomerEvnCode,
	evnCustomerNumberPhone,
	evnCustomerElectricMotor,
	evnBills,
	listEvnCode,
	listEvnResult
	)
{
	this.evnCustomerCode = evnCustomerCode;
	this.evnCustomerName = evnCustomerName;
	this.evnCustomerAddress = evnCustomerAddress;
	this.evnCustomerEvnCode = evnCustomerEvnCode;
	this.evnCustomerNumberPhone = evnCustomerNumberPhone;
	this.evnCustomerElectricMotor = evnCustomerElectricMotor;
	if ( evnBills != undefined && evnBills.length != 0)
	{
		this.evnBills = evnBills;
	}
	else
	{
		this.evnBills = new Array();
	}
	if ( listEvnCode != undefined && listEvnCode.length != 0)
	{
		this.listEvnCode = listEvnCode;
	}
	else
	{
		this.listEvnCode = new Array();
	}
	if ( listEvnResult != undefined && listEvnResult.length != 0)
	{
		this.listEvnResult = listEvnResult;
	}
	else
	{
		this.listEvnResult = new Array();
	}
}

/*** EGOLD ***/
var gGoldTransType = 0;
var goldTransAvgDetail = "";
var gGoldTransBuySell = new Array();
var gGoldTransWithdraw = new Array();
var gGoldRateStore = new Array(); //do not use directly
function setGoldRateStore(inData) {
	var tmpGoldRateWithTime = new GoldRateWithTimeObj();
	tmpGoldRateWithTime.goldRateData = inData;
	tmpGoldRateWithTime.goldRateTime = getTimeWithFormatted();
	gGoldRateStore.push(tmpGoldRateWithTime);
}
function getGoldRateStore() {
	return gGoldRateStore;
}

function getTimeWithFormatted() {
	var d = new Date();
	return  (d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
}

var gGoldRate = new Array(); //do not use directly
function setGoldRate(inData) {
	gGoldRate = inData;
}
function getGoldRate() {
	return gGoldRate;
}
function checkGoldRateIsEqualTo(inData) {
	if(gGoldRate.length != inData.length)  return false;
	for (var i=0; i<gGoldRate.length; i++) {
		var tmpGoldObjCur = new GoldObj();//gGoldRate[i];
		var tmpGoldObjNew = new GoldObj();// inData[i];
		if((tmpGoldObjCur.goldId != tmpGoldObjNew.goldId) || (tmpGoldObjCur.goldName != tmpGoldObjNew.goldName) || (tmpGoldObjCur.goldUnit != tmpGoldObjNew.goldUnit) || (tmpGoldObjCur.goldRetailBuy != tmpGoldObjNew.goldRetailBuy) || (tmpGoldObjCur.goldRetailSell != tmpGoldObjNew.goldRetailSell) || (tmpGoldObjCur.goldTradeBuy != tmpGoldObjNew.goldTradeBuy) || (tmpGoldObjCur.goldTradeSell != tmpGoldObjNew.goldTradeSell)) {
			return false;
		}
	}
	return true;
}

var gGoldStoreView = ''; //do not use directly
function setGoldStoreView(inData) {
	gGoldStoreView = inData;
}
function getGoldStoreView() {
	return gGoldStoreView;
}

var gGoldWithdrawView = ''; //do not use directly
function setGoldWithdrawView(inData) {
	gGoldWithdrawView = inData;
}
function getGoldWithdrawView() {
	return gGoldWithdrawView;
}

var gGoldWithdrawReviewView = ''; //do not use directly
function setGoldWithdrawReviewView(inData) {
	gGoldWithdrawReviewView = inData;
}
function getGoldWithdrawReviewView() {
	return gGoldWithdrawReviewView;
}

var gGoldWithdrawArrayObj = ''; //do not use directly
function setGoldWithdrawArrayObj(inData) {
	gGoldWithdrawArrayObj = inData;
}
function getGoldWithdrawArrayObj() {
	return gGoldWithdrawArrayObj;
}

var gGoldWithdrawArrayBranch = ''; //do not use directly
function setGoldWithdrawArrayBranch(inData) {
	gGoldWithdrawArrayBranch = inData;
}
function getGoldWithdrawArrayBranch() {
	return gGoldWithdrawArrayBranch;
}

var gGoldSelectedAccount = new AccountObj(); //do not use directly
function setGoldSelectedAccount(inData) {
	gGoldSelectedAccount = inData;
}
function getGoldSelectedAccount() {
	return gGoldSelectedAccount;
}

var gGoldSelectedBranch = new GoldBranchObj(); //do not use directly
function setGoldSelectedBranch(inData) {
	gGoldSelectedBranch = inData;
}
function getGoldSelectedBranch() {
	return gGoldSelectedBranch;
}

var gGoldWithdrawFreezeDays = 0;
var gGoldWithdrawFreezeDate = '';

/*** EGOLD END ***/

function GoldObj() {
	this.goldId = "";
	this.goldName = "";
	this.goldUnit = "";
	this.goldRetailBuy = "";
	this.goldTradeBuy = "";
	this.goldRetailSell = "";
	this.goldTradeSell = "";
	this.goldQuantity = "";
	this.goldQuantityAtBank = "";
	this.goldAccount = "";
	
	this.goldCertification = "";
	this.goldDateMarurity = "";
	this.goldTotal = "";
	this.goldTotalUnit = "";
	this.goldToVnd = "";
	this.goldUnitDes = "";
	
	this.groupID;
	this.numOfChilds = 0;
	this.Level;
	this.selected = false;
}

function GoldStoreObj() {
	this.goldName = "";
	this.totalGoldBuy = "";
	this.totalGoldSell = "";
	this.avrgBuy = "";
	this.avrgSell = "";
	this.inStore = "";
	this.goldIdLevel1 = "";
	this.goldRetailBuyLevel1 = "";
	this.goldRetailSellLevel1 = "";
	this.goldUnitLevel1 = "";
	this.goldToVndLevel1 = "";
	
	//Gold level 2
	this.goldIdLevel2 = "";
	this.goldNameLevel2 = "";
	this.goldTermLevel2 = "";
	this.goldManutoryLevel2 = "";
	this.goldToUnitLevel2 = "";
	this.goldToVndLevel2 = "";
	
	//Gold level 2
	this.goldIdLevel3 = "";
	this.goldNameLevel3 = "";
	this.goldQuantityLevel3 = "";
	this.goldToUnitLevel3 = "";
	
	this.groupID;
	this.numOfChilds = 0;
	this.level;
	this.selected = false;
	this.inputQuantity = 0;
}

function GoldDetailHistoryObj()
{
	this.goldName = "";
	this.goldHistoryList = new Array();
}

function GoldHistoryObj() {
	this.goldId = "";
	this.goldName = "";
	this.goldTime = "";
	this.goldChanel = "";
	this.goldQuantity = "";
	this.goldRate = "";
	this.goldBranch = "";
	this.goldWithdrawStatus = "";
	this.goldFee = "";
	this.goldUnit = "";
	
	this.goldTransCode = "";
	this.acc = "";
	this.goldTransactionType = "";
	this.goldTransactionTypeName = "";
	this.goldTypeTransactionName = "";
}

function GoldBranchObj() {
	this.brnId = "";
	this.brnName = "";
}

function GoldRateWithTimeObj() {
	this.goldRateData = new Array();
	this.goldRateTime = '';
}

/*** SERVICE OBJECTS END ***/

/*** SLIDE VIEW ROW OBJ ***/

function SlideViewRowObj() {
	this.titleSlideView = "";
	this.detailSlideView = "";
	this.subTitleSlideView = "";
	this.subTitleType = 1; //1: no sign; 2: +; 3: -;
}

var gSlideViewData; //store html string
var storeSlideViewData = {}; //do not use directly
function setSlideViewDataStore(inData) {
	gSlideViewData = inData;
	storeSlideViewData[navArrayScr[0]] = inData;
}
function getSlideViewDataStore() {
	gSlideViewData = storeSlideViewData[navArrayScr[0]];
	return storeSlideViewData[navArrayScr[0]];
}

var gSlideViewListHtml; //store html string
var storeSlideViewListHtml = {}; //do not use directly
function setSlideViewListHtmlStore(inData) {
	gSlideViewListHtml = inData;
	storeSlideViewListHtml[navArrayScr[0]] = inData;
}
function getSlideViewListHtmlStore() {
	gSlideViewListHtml = storeSlideViewListHtml[navArrayScr[0]];
	return storeSlideViewListHtml[navArrayScr[0]];
}

//transaction detail screen
var gTransactionDetailHtml; //store html string
var storeTransactionDetailHtml = {}; //do not use directly
function setTransactionDetailHtmlStore(inData) {
	gTransactionDetailHtml = inData;
	storeTransactionDetailHtml[navArrayScr[0]] = inData;
}
function getTransactionDetailHtmlStore() {
	gTransactionDetailHtml = storeTransactionDetailHtml[navArrayScr[0]];
	return storeTransactionDetailHtml[navArrayScr[0]];
}

/*** SLIDE VIEW ROW OBJ END ***/

/*** GLOBAL STORE FOR REVIEW, AUTHENTICATION ***/

var gRespObj = new GprsRespObj("","","",""); //save response info using in review & authentication screen

var storeRespObj = {}; //do not use directly
function setRespObjStore(inRespObj) {
	gRespObj = inRespObj;
	storeRespObj[navArrayScr[0]] = inRespObj;
}
function getRespObjStore() {
	gRespObj = storeRespObj[navArrayScr[0]];
	return storeRespObj[navArrayScr[0]];
}

var gReviewHtml; //create screen review

var storeReviewHtml = {}; //do not use directly
function setReviewHtmlStore(inReviewHtml) {
	gReviewHtml = inReviewHtml;
	storeReviewHtml[navArrayScr[0]] = inReviewHtml;
}
function getReviewHtmlStore() {
	gReviewHtml = storeReviewHtml[navArrayScr[0]];
	return storeReviewHtml[navArrayScr[0]];
}

var gReviewXml; //create screen review

var storeReviewXml = {}; //do not use directly
function setReviewXmlStore(inReviewXml) {
	gReviewXml = inReviewXml;
	storeReviewXml[navArrayScr[0]] = inReviewXml;
}
function getReviewXmlStore() {
	gReviewXml = storeReviewXml[navArrayScr[0]];
	return storeReviewXml[navArrayScr[0]];
}

var gResultXml; //create screen result

var gStoreResultXml = {}; //do not use directly
function setStoreResultXmlStore(inReviewXml) {
	gResultXml = inReviewXml;
	gStoreResultXml[navArrayScr[0]] = inReviewXml;
}
function getStoreResultXmlStore() {
	gResultXml = gStoreResultXml[navArrayScr[0]];
	return gStoreResultXml[navArrayScr[0]];
}

var gGprsCmd = new GprsCmdObj("", "", "", "VN", "", "");

var storeGprsCmd = {}; //do not use directly
function setGprsCmdStore(inGprsCmd) {
	gGprsCmd = inGprsCmd;
	storeGprsCmd[navArrayScr[0]] = inGprsCmd;
}
function getGprsCmdStore() {
	gGprsCmd = storeGprsCmd[navArrayScr[0]];
	return storeGprsCmd[navArrayScr[0]];
}

/*** GLOBAL STORE FOR REVIEW, AUTHENTICATION END ***/

/**** HTTP EVENT ****/

//var evtHttpSuccess = document.createEvent('Event'); //Event transaction success
//evtHttpSuccess.initEvent("evtHttpSuccess", true, true);

//var evtHttpFail = document.createEvent('Event'); //Event request fail
//evtHttpFail.initEvent("evtHttpFail", true, true);

var statusLoadMask = true;
/**** HTTP EVENT END ****/

/*** REQUEST MBSERVICE ***/
function getDataFromGprsCmd(gprsCmd) {
	var data = {};
	data["cmdType"] = gprsCmd.cmdType;
	data["time"] = gprsCmd.timeCur;
	data["app"] = gprsCmd.appName;
	data["version"] = gprsCmd.version;
	data["language"] = gprsCmd.language;
	data["session"] = gprsCmd.sessionID;
	data["args"] = gprsCmd.arguments;
	data["raw"] = gprsCmd.raw;
	
	return data;
}
var ajaxTimeout;
function Options() {
	this.cached = false; //default value is no-cache
}
var respCache = {};
var ajaxTimeNextRequest;
var ajaxTimeNextRequestStatus = true;
function startTimeRequestCoutdown() {
	ajaxTimeNextRequest = setTimeout(function() {
		clearTimeout(ajaxTimeNextRequest);
		ajaxTimeNextRequestStatus = true;
	}, 1000);
}
function requestMBService(data, loadMask, timeout, successCallback, failCallback, iOptions) {
	if (!ajaxTimeNextRequestStatus) return; //fix bug on WP and some Android device
	ajaxTimeNextRequestStatus = false;
	startTimeRequestCoutdown();
	
	hiddenKeyBoardWhenRequest();
	var hideKeyboardDelay = 0;
	var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
	//if (tmpWP) {
		hideKeyboardDelay = 500;
	/*}else{
		hideKeyboardDelay = 200;
	}*/
	setTimeout(function(){
		statusLoadMask = loadMask;
		var timeToBreak = 90; //time by s
		if ((timeout != undefined) && (timeout > 0)) {
			timeToBreak = timeout;
		}
		var reqKey = '';
		var reqContent = '';
		
		if(iOptions && iOptions.cached) {
			var tmpData = {};
			tmpData["cmdType"] = data["cmdType"];
			tmpData["args"] = data["args"];
			tmpData["language"] = data["language"];
			var tmpReqData = JSON.stringify(tmpData);
			reqKey = hex_md5(tmpReqData);
			reqContent = respCache[reqKey];
			if(reqContent != undefined && reqContent.length > 0) {
				if(successCallback && (typeof successCallback == "function")) {
					successCallback(reqContent);
				}
				return;
			}
		}
		
		if (loadMask){
			showLoadingMask();
		}
		
		// construct an HTTP request
		var xhr;// = new XMLHttpRequest();
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		/*if (window.XDomainRequest)
		{
			xhr=new XDomainRequest();
			xhr.onload = function(){callBack(xhr.responseText)};
		}
		else if (window.XMLHttpRequest)
			xhr=new XMLHttpRequest();
		else
			xhr=new ActiveXObject("Microsoft.XMLHTTP"); //msxml2.XmlHttp.3.0" //Microsoft.XMLHTTP
		*/
		//alert("start send POST");
		
		if (gMBServiceUrl.length == 0) {
			logInfo("URL is null. Please check url.");
			return;
		}
		//check internet connection
		/*var tmpStatus = navigator.onLine;
		if (!tmpStatus) {
			hideLoadingMask();
			if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_INTERNET'));
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
				var timeFailEvent = setTimeout(function(){
						clearTimeout(timeFailEvent);
						failCallback = null;
					}, 10);
			}
			return;
		}*/
		
		//setting request url
		try {
			xhr.open(gRequestMethod, gMBServiceUrl, true);
			
			if (gRequestMethod == "POST") {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				//xhr.setRequestHeader('Content-Length', data.length);
				var tmpReqReal = JSON.stringify(data);
				logInfo("JSON data: " + tmpReqReal);
				xhr.send(tmpReqReal);
				
				var xmlHttpTimeout=setTimeout(ajaxTimeout, timeToBreak * 1000); //set time out
				function ajaxTimeout(){
					clearTimeout(xmlHttpTimeout); // clear time out
					
					xhr.abort();
					hideLoadingMask();
					if (loadMask) showAlertText(CONST_STR.get('ERR_CONNECTION_TIMEOUT'));
					//fire event listener
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
						var timeFailEvent = setTimeout(function(){
							clearTimeout(timeFailEvent);
							failCallback = null;
						}, 10);
					}
					//document.dispatchEvent(evtHttpFail);
				}
				
				xhr.onreadystatechange = function () {
					//if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
					if ((xhr.readyState==4) && (xhr.status==200)) {
						clearTimeout(xmlHttpTimeout); // clear time out
						
						if(iOptions && iOptions.cached) {
							try {
								var tmpResp = parserJSON(xhr.responseText, false);
								if (parseInt(tmpResp.respCode) == 0) {
									respCache[reqKey] = xhr.responseText;
								}
							}
							catch(err) {
								logInfo('Error request service.');
							}
						}
						
						hideLoadingMask();
						//alert("end receving POST");
						logInfo("End receiving data: " + xhr.responseText);
						//fire event listener
						//evtHttpSuccess.serviceData = xhr.responseText;
						if(successCallback && (typeof successCallback == "function")) {
							successCallback(xhr.responseText);
							var timeSuccessEvent = setTimeout(function(){
								clearTimeout(timeSuccessEvent);
								successCallback = null;
							}, 10);
						}
						//document.dispatchEvent(evtHttpSuccess);
					}
					else {
						if (xhr.status==404) {
							clearTimeout(xmlHttpTimeout); // clear time out
							
							hideLoadingMask();
							//alert("Error sending data: " + data);
							logInfo("Error sending data: " + data);
							if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
							xhr.abort();
							//fire event listener
							if(failCallback && (typeof failCallback == "function")) {
								failCallback();
								var timeFailEvent = setTimeout(function(){
									clearTimeout(timeFailEvent);
									failCallback = null;
								}, 10);

							}
							//document.dispatchEvent(evtHttpFail);
						}
						else if ((xhr.readyState==4) && (xhr.status==0)) {
							clearTimeout(xmlHttpTimeout); // clear time out
							
							hideLoadingMask();
							logInfo("Disconnected to service!");
							if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
							xhr.abort();
							//fire event listener
							if(failCallback && (typeof failCallback == "function")) {
								failCallback();
								var timeFailEvent = setTimeout(function(){
									clearTimeout(timeFailEvent);
									failCallback = null;
								}, 10);

							}
							//document.dispatchEvent(evtHttpFail);
						}
						//other status
					}
				}
			}
		}
		catch(err) {
			clearTimeout(xmlHttpTimeout); // clear time out
			
			logInfo(err);
			hideLoadingMask();
			if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
			//fire event listener
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
				var timeFailEvent = setTimeout(function(){
						clearTimeout(timeFailEvent);
						failCallback = null;
					}, 10);

			}
			//document.dispatchEvent(evtHttpFail);
		}
	},hideKeyboardDelay);	
}

function hiddenKeyBoardWhenRequest() {	
	if(!Environment.isMobile) return false;
	//if(Environment.isAndroid()) return;
    if((Environment.isIOS() && !Environment.isWindows()) || Environment.isAndroid()) 
	{
		if(document.activeElement)
			document.activeElement.blur(); //hidden keyboard
	}
    var tmpArrInputNote = document.getElementsByTagName('input');
    for (var i = 0; i < tmpArrInputNote.length; i++) {
        tmpArrInputNote[i].blur();
    }
	return true;
}

var gRespCodeNotShowAlert = ['1013', '1014']; //COM_TRUST_PAYEE, COM_PASSWORD_EXPIRE
function checkResponseCodeNotShowAlert(inRespCode) {
	for(var i=0; i<gRespCodeNotShowAlert.length; i++) {
		if(parseInt(inRespCode) == parseInt(gRespCodeNotShowAlert[i])) {
			return true;
		}
	}
	return false;
}

var gRespCodeSuccess = ['0', '1001', '1002', '1013']; //0: COM_SUCCESS, 1001: COM_OVER_LIMIT, 1002: COM_OVER_DATE_LIMIT, 1013: COM_TRUST_PAYEE
function checkResponseCodeSuccess(inRespCode) {
	for(var i=0; i<gRespCodeSuccess.length; i++) {
		if(parseInt(inRespCode) == parseInt(gRespCodeSuccess[i])) {
			return true;
		}
	}
	return false;
}

function parserJSON(inData, showAlert) {
	var tmpGprsResp = new GprsRespObj("","","","");
	if (inData.length == 0) {
		return tmpGprsResp;
	}
	var statusAlert = (showAlert == undefined || showAlert == true)? true: false;
	//handle exception
	try {
		var tmpObj = JSON.parse(inData);
		tmpGprsResp.responseType = tmpObj.responseType;
		tmpGprsResp.respCode = tmpObj.respCode;
		tmpGprsResp.respContent = decodeURIComponent(tmpObj.respContent);
		tmpGprsResp.arguments = tmpObj.arguments;
		tmpGprsResp.respRaw = tmpObj.respRaw;
		tmpGprsResp.respJson = tmpObj.respJson;
		if(typeof tmpGprsResp.arguments == 'string') {
			var tmpArr = new Array();
			tmpArr[0] = tmpObj.arguments;
			tmpGprsResp.arguments = tmpArr;
		}
		
		
		if ((parseInt(tmpGprsResp.respCode) == parseInt(RESP.get('COM_SUCCESS'))) || (checkResponseCodeNotShowAlert(tmpGprsResp.respCode))) {//success: except password is expired
			//alert(tmpGprsResp.arguments);
		}
		else {
			if ( parseInt(tmpGprsResp.respCode) == parseInt(RESP.get('COM_SESSION_TIMEOUT')))
			{
				document.addEventListener('closeAlertView', handleAlertSessionTimeOut, false);
			}
			if (statusLoadMask) {
				if (statusAlert) showAlertText(tmpGprsResp.respContent); //show error alert
			}
		}
		
		return tmpGprsResp;
	}
	catch(err) {
		//for testing
		logInfo("Exception parser received JSON: " + inData);
		return tmpGprsResp;
	}
	
}
/*** REQUEST MBSERVICE END ***/

/*** REQUEST MBSERVICE BACKGROUND ***/
var evtBackgroundHttpSuccess = document.createEvent('Event'); //Event transaction success
evtBackgroundHttpSuccess.initEvent("evtBackgroundHttpSuccess", true, true);

var evtBackgroundHttpFail = document.createEvent('Event'); //Event request fail
evtBackgroundHttpFail.initEvent("evtBackgroundHttpFail", true, true);

function requestBacgroundMBService(svCode, svArgs, successCallback, failCallback, iOptions)
{
	hiddenKeyBoardWhenRequest();	
	//svCode is type: 'CMD_TYPE_GOLD_CHECK_RATE'

	if ((svCode == undefined) || (svCode == null) || (svArgs == undefined) || (svArgs == null)) {
		return;
	}
	var data = {};
	var arrayArgs = new Array();
	
	arrayArgs = svArgs;
	//alert(gUserInfo.sessionID);
	var gprsCmd = new GprsCmdObj(CONSTANTS.get(svCode), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	data = getDataFromGprsCmd(gprsCmd);
	
	var reqKey = '';
	var reqContent = '';
	
	if(iOptions && iOptions.cached) {
		var tmpData = {};
		tmpData["cmdType"] = data["cmdType"];
		tmpData["args"] = data["args"];
		tmpData["language"] = data["language"];
		var tmpReqData = JSON.stringify(tmpData);
		reqKey = hex_md5(tmpReqData);
		reqContent = respCache[reqKey];
		if(reqContent != undefined && reqContent.length > 0) {
			if(successCallback && (typeof successCallback == "function")) {
				successCallback(reqContent);
			}
			return;
		}
	}
	
	// construct an HTTP request
	var xhr;// = new XMLHttpRequest();
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//check internet connection
	/*var tmpStatus = navigator.onLine;
	if (!tmpStatus) return;*/
	
	//setting request url
	xhr.open(gRequestMethod, gMBServiceUrl, true);
	
	if (gRequestMethod == "POST") {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		//xhr.setRequestHeader('Content-Length', data.length);
		logInfo("JSON data: " + JSON.stringify(data));
		xhr.send(JSON.stringify(data));
		
		var xmlHttpTimeout=setTimeout(ajaxTimeout, 20 * 1000); //set time out
		function ajaxTimeout(){
			clearTimeout(xmlHttpTimeout); // clear time out
			
			xhr.abort();
			//document.dispatchEvent(evtBackgroundHttpFail);
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
			}
		}
		
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
			//if ((xhr.readyState==4) && (xhr.status==200)) {
				clearTimeout(xmlHttpTimeout); // clear time out
				
				if(iOptions && iOptions.cached) {
					try {
						var tmpResp = parserJSON(xhr.responseText, false);
						if (parseInt(tmpResp.respCode) == 0) {
							respCache[reqKey] = xhr.responseText;
						}
					}
					catch(err) {
						logInfo('Error request background service.');
					}
				}
				
				logInfo("End receiving data: " + xhr.responseText);
				if(successCallback && (typeof successCallback == "function")) {
					successCallback(xhr.responseText);
				}
				/*if(evtBackgroundHttpSuccess != undefined) {
					//evtBackgroundHttpSuccess.serviceData = xhr.responseText;
					//document.dispatchEvent(evtBackgroundHttpSuccess);
				}*/
			}
			else {
				if (xhr.status==404) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Error sending data: " + data);
					xhr.abort();
					//document.dispatchEvent(evtBackgroundHttpFail);
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
				else if ((xhr.readyState==4) && (xhr.status==0)) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Disconnected to service!");
					xhr.abort();
					//document.dispatchEvent(evtBackgroundHttpFail);
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
				//other status
			}
		}
	}	
}

function requestBacgroundMBServiceRaw(svCode, svArgs, successCallback, failCallback, iRaw, iOptions)
{
	hiddenKeyBoardWhenRequest();	
	//svCode is type: 'CMD_TYPE_GOLD_CHECK_RATE'

	if ((svCode == undefined) || (svCode == null) || (svArgs == undefined) || (svArgs == null)) {
		return;
	}
	var data = {};
	var arrayArgs = new Array();
	
	arrayArgs = svArgs;
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get(svCode), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs, iRaw);
	data = getDataFromGprsCmd(gprsCmd);
	
	var reqKey = '';
	var reqContent = '';
	
	if(iOptions && iOptions.cached) {
		var tmpData = {};
		tmpData["cmdType"] = data["cmdType"];
		tmpData["args"] = data["args"];
		tmpData["language"] = data["language"];
		var tmpReqData = JSON.stringify(tmpData);
		reqKey = hex_md5(tmpReqData);
		reqContent = respCache[reqKey];
		if(reqContent != undefined && reqContent.length > 0) {
			if(successCallback && (typeof successCallback == "function")) {
				successCallback(reqContent);
			}
			return;
		}
	}
	
	// construct an HTTP request
	var xhr;// = new XMLHttpRequest();
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//check internet connection
	/*var tmpStatus = navigator.onLine;
	if (!tmpStatus) return;*/
	
	//setting request url
	xhr.open(gRequestMethod, gMBServiceUrl, true);
	
	if (gRequestMethod == "POST") {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		//xhr.setRequestHeader('Content-Length', data.length);
		logInfo("JSON data: " + JSON.stringify(data));
		xhr.send(JSON.stringify(data));
		
		var xmlHttpTimeout=setTimeout(ajaxTimeout, 20 * 1000); //set time out
		function ajaxTimeout(){
			clearTimeout(xmlHttpTimeout); // clear time out
			
			xhr.abort();
			//document.dispatchEvent(evtBackgroundHttpFail);
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
			}
		}
		
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
			//if ((xhr.readyState==4) && (xhr.status==200)) {
				clearTimeout(xmlHttpTimeout); // clear time out
				
				if(iOptions && iOptions.cached) {
					try {
						var tmpResp = parserJSON(xhr.responseText, false);
						if (parseInt(tmpResp.respCode) == 0) {
							respCache[reqKey] = xhr.responseText;
						}
					}
					catch(err) {
						logInfo('Error request background service.');
					}
				}
				
				logInfo("End receiving data: " + xhr.responseText);
				if(successCallback && (typeof successCallback == "function")) {
					successCallback(xhr.responseText);
				}
				/*if(evtBackgroundHttpSuccess != undefined) {
					//evtBackgroundHttpSuccess.serviceData = xhr.responseText;
					//document.dispatchEvent(evtBackgroundHttpSuccess);
				}*/
			}
			else {
				if (xhr.status==404) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Error sending data: " + data);
					xhr.abort();
					//document.dispatchEvent(evtBackgroundHttpFail);
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
				else if ((xhr.readyState==4) && (xhr.status==0)) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Disconnected to service!");
					xhr.abort();
					//document.dispatchEvent(evtBackgroundHttpFail);
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
				//other status
			}
		}
	}	
}


function requestUploadFile(inUrl, data, loadMask, timeout, successCallback, failCallback) {
	statusLoadMask = loadMask;
	var timeToBreak = 90; //time by s
	if ((timeout != undefined) && (timeout > 0)) {
		timeToBreak = timeout;
	}
	
	if (loadMask){
		showLoadingMask();
	}
	
	// construct an HTTP request
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
    //alert("start send POST");
	
	if (inUrl.length == 0) {
		logInfo("URL is null. Please check url.");
		return;
	}
	//check internet connection
	/*var tmpStatus = navigator.onLine;
	if (!tmpStatus) {
		hideLoadingMask();
		if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_INTERNET'));
		if(failCallback && (typeof failCallback == "function")) {
			failCallback();
		}
		return;
	}*/
	
	//setting request url
	try {
		xhr.open(gRequestMethod, inUrl, true);
		
		if (gRequestMethod == "POST") {
			xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			logInfo("JSON data: " + JSON.stringify(data));
			xhr.send(JSON.stringify(data));
			
			var xmlHttpTimeout=setTimeout(ajaxTimeout, timeToBreak * 1000); //set time out
			function ajaxTimeout(){
				clearTimeout(xmlHttpTimeout); // clear time out
				
			   	xhr.abort();
			   	hideLoadingMask();
			   	if (loadMask) showAlertText(CONST_STR.get('ERR_CONNECTION_TIMEOUT'));
				//fire event listener
				if(failCallback && (typeof failCallback == "function")) {
					failCallback();
				}
			}
			
			xhr.onreadystatechange = function () {
				//if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
				if ((xhr.readyState==4) && (xhr.status==200)) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					hideLoadingMask();
					//alert("end receving POST");
					logInfo("End receiving data: " + xhr.responseText);
					//fire event listener
					if(successCallback && (typeof successCallback == "function")) {
						successCallback(xhr.responseText);
					}
				}
				else {
					if (xhr.status==404) {
						clearTimeout(xmlHttpTimeout); // clear time out
						
						hideLoadingMask();
						//alert("Error sending data: " + data);
						logInfo("Error sending data: " + data);
						if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
						xhr.abort();
						//fire event listener
						if(failCallback && (typeof failCallback == "function")) {
							failCallback();
						}
					}
					else if ((xhr.readyState==4) && (xhr.status==0)) {
						clearTimeout(xmlHttpTimeout); // clear time out
						
						hideLoadingMask();
						logInfo("Disconnected to service!");
						if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
						xhr.abort();
						//fire event listener
						if(failCallback && (typeof failCallback == "function")) {
							failCallback();
						}
					}
					//other status
				}
			}
		}
	}
	catch(err) {
		clearTimeout(xmlHttpTimeout); // clear time out
		
		logInfo(err);
		hideLoadingMask();
		if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
		//fire event listener
		if(failCallback && (typeof failCallback == "function")) {
			failCallback();
		}
	}
}


/*** REQUEST MBSERVICE BACKGROUND END ***/

/*** HANDLER SESSION TIMEOUT ***/
function handleAlertSessionTimeOut()
{
	document.removeEventListener('closeAlertView', handleAlertSessionTimeOut, false);
	logout();
}
/*** HANDLER SESSION TIMEOUT ***/

/*** QUERY ACCOUNT NO INFO ***/

function updateAccountInfoIfNeed(inAccNo, inServiceCode) {
	if (inAccNo.length == 11) {
		gUsingAccountNo = inAccNo;
	}
	else {
		return;
	}
	if (inServiceCode.length > 0) {
		gUsingServiceCode = inServiceCode;
	}
}

function checkServiceNeedQueryAcc(inServiceCode) {
	var tmpStatus = false;
	for(var i=0; i < CONST_SERVICE_CODE_QUERY_ACCOUNT.length; i++) {
		if (parseInt(inServiceCode) == parseInt(CONST_SERVICE_CODE_QUERY_ACCOUNT[i])) {
			tmpStatus = true;
			break;
		}
	}
	return tmpStatus;
}

function queryInfoOfAccountNo(inAccNo) {
	/*var data = {};
	var arrayArgs = new Array();
	arrayArgs.push(inAccNo);
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_QUERY_ACCOUNT_NO_INFO"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	
	data = getDataFromGprsCmd(gprsCmd);
	
	document.addEventListener("evtHttpSuccess", requestMBServiceQuerySuccess, false);
	//document.addEventListener("evtHttpFail", requestMBServiceFail, false);
	
	requestMBService(data, false);*/
	var arrayArgs = new Array();
	//arrayArgs.push(inAccNo); //old service
	requestBacgroundMBService('CMD_TYPE_QUERY_ACCOUNT_NO_INFO', arrayArgs, requestMBServiceQuerySuccess);
	//document.addEventListener("evtBackgroundHttpSuccess", requestMBServiceQuerySuccess, false);
}

function gotoHomePage() {
    if (gIsLogin) {
        if (gCustomerNo.length == 8) {
            navController.initWithRootView('homepagexsl/homepage-dynamic-scr', true, 'xsl');
            navController.setDefaultPage('homepagexsl/homepage-dynamic-scr', 'xsl');
        } else if (gCustomerNo.length == 10) {
        	navController.initWithRootView('homepagexsl/homepage-corp-scr', true, 'xsl');
            navController.setDefaultPage('homepagexsl/homepage-corp-scr', 'xsl');
        }
    }
}

function getGuide(){
	var link = "";
	for(var i = 0; i < LinkHelp.length; i++){
		if(navArrayScr[0].indexOf(LinkHelp[i].key) == 0){
			link = LinkHelp[i].value;
			break;
		}
	}
	
	if(link == ""){
		link = LinkHelp[0].value;
	}
	
	// Tao link
	link = formatString(link, ['./download/guide/', gUserInfo.lang]);
	window.open(link);
}


function updateAccountListInfo() {	
	var arrayArgs = new Array();
	requestBacgroundMBService('CMD_TYPE_QUERY_ACCOUNT_NO_INFO', arrayArgs, requestMBServiceQuerySuccess);	
}

//event listener: http request success
function requestMBServiceQuerySuccess(e){
	gprsResp = parserJSON(e, false);
	//gRespObj = gprsResp; 
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_QUERY_ACCOUNT_NO_INFO")))) {
		//logInfo("Query account change success");
		if(gprsResp.arguments && gprsResp.arguments.length > 0) {
			for(var j=0; j<gprsResp.arguments.length; j++) {
				var arrayAccInfo = gprsResp.arguments[j].split('#');
				var tmpAccountArr = gUserInfo.accountList;
				for (var i=0; i< tmpAccountArr.length; i++) {
					var tmpAccObj = tmpAccountArr[i];
					if (tmpAccObj.accountNumber == arrayAccInfo[0]) {
						tmpAccObj.accountNumber = arrayAccInfo[0];
						tmpAccObj.currency = arrayAccInfo[1];
						tmpAccObj.balance = arrayAccInfo[2];
						tmpAccObj.balanceAvailable = arrayAccInfo[3];
						tmpAccObj.descByUser = arrayAccInfo[4];
					}
				}
				for (var i=0; i< gUserInfo.accountListLocalTrans.length; i++) {
					var tmpAccObj = gUserInfo.accountListLocalTrans[i];
					if (tmpAccObj.accountNumber == arrayAccInfo[0]) {
						tmpAccObj.accountNumber = arrayAccInfo[0];
						tmpAccObj.currency = arrayAccInfo[1];
						tmpAccObj.balance = arrayAccInfo[2];
						tmpAccObj.balanceAvailable = arrayAccInfo[3];
						tmpAccObj.descByUser = arrayAccInfo[4];
					}
				}
				for (var i=0; i< gUserInfo.accountListOther.length; i++) {
					var tmpAccObj = gUserInfo.accountListOther[i];
					if (tmpAccObj.accountNumber == arrayAccInfo[0]) {
						tmpAccObj.accountNumber = arrayAccInfo[0];
						tmpAccObj.currency = arrayAccInfo[1];
						tmpAccObj.balance = arrayAccInfo[2];
						tmpAccObj.balanceAvailable = arrayAccInfo[3];
						tmpAccObj.descByUser = arrayAccInfo[4];
					}
				}
			}
		}
		
		//gUserInfo.accountList[i].description = gprsResp.arguments[1];
		//gUserInfo.accountList[i].balance = gprsResp.arguments[2];
		//gUserInfo.accountList[i].balanceAvailable = gprsResp.arguments[3];
		//gUserInfo.accountList[i].transactionHistory = gprsResp.arguments[4]; // if use service code 114
		gUsingAccountNo = ""; // reset for later
	}
	//logInfo('query info of account no success');
	/*if (e.type == "evtBackgroundHttpSuccess") {
		//document.removeEventListener("evtBackgroundHttpSuccess", requestMBServiceQuerySuccess, false);
		//alert("Http request success!");
	}*/
};

/*** QUERY ACCOUNT NO INFO ***/

/*** START-UP ***/

var tmpGprsRespBackground;
function startupAppCheckVersion() {
	//BYPASS for testing on browser
	//gDeviceToken = 'BROWSER_TESTING';
	if (gDeviceToken.length == 0) return; //if do not device token, bypass
	
	var arrayArgs = new Array();
	arrayArgs.push(gDeviceToken); //get device token
	
	//document.addEventListener("evtBackgroundHttpSuccess", requestMBServiceStartUpSuccess, false);
	requestBacgroundMBService('CMD_TYPE_STARTUP', arrayArgs, requestMBServiceStartUpSuccess);
}

//event listener: http request success
function requestMBServiceStartUpSuccess(e){
	tmpGprsRespBackground = parserJSON(e, false);
	var tmpJsonStr = JSON.stringify(tmpGprsResp);
	//gRespObj = gprsResp; 
	if ((tmpGprsRespBackground.respCode == '0') && (parseInt(tmpGprsRespBackground.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_STARTUP")))) {
		if((tmpGprsRespBackground.arguments[0] != 'N') && (tmpGprsRespBackground.arguments[1] == 'Y')) { //system normal
			if(tmpGprsRespBackground.arguments[4] == 'Y') { //must update
				document.addEventListener('closeAlertView', handlAlertOKPressed, false);
				showAlertText(tmpGprsRespBackground.arguments[3]);
			}
			else {
				document.addEventListener('alertConfirmOK', handlAlertConfirmOKPressed, false);
				showAlertConfirmText(tmpGprsRespBackground.arguments[3]);
			}
		}
	}
	//logInfo('query info of account no success');
	/*if (e.type == "evtBackgroundHttpSuccess") {
		document.removeEventListener("evtBackgroundHttpSuccess", requestMBServiceStartUpSuccess, false);
		//alert("Http request success!");
	}*/
};

function handlAlertOKPressed() {
	document.removeEventListener('closeAlertView', handlAlertOKPressed, false);
	openLinkOnBrowser();
	logout();
}

function handlAlertConfirmOKPressed() {
	document.removeEventListener('alertConfirmOK', handlAlertConfirmOKPressed, false);
	openLinkOnBrowser();
}

function openLinkOnBrowser() {
	if ((tmpGprsRespBackground != undefined) && (tmpGprsRespBackground.arguments[2].length > 0)) {
		window.open(tmpGprsRespBackground.arguments[2], '_system');
	}
}

/*** START-UP END ***/

/*** EGOLD SERVICE ***/

// eGold rate
var evtGoldRateSuccess = document.createEvent('Event'); //Event transaction success
evtGoldRateSuccess.initEvent("evtGoldRateSuccess", true, true);

var evtGoldRateFail = document.createEvent('Event'); //Event request fail
evtGoldRateFail.initEvent("evtGoldRateFail", true, true);

var autoCheckGoldRate;
function autoCheckRealGoldRate() {
	removeEventRealGoldRate();
	//autoCheckGoldRate = setInterval(function(e){
		getRealGoldRate();
	//}, CONST_TIMER_GOLD_RATE * 1000); //auto check gold rate per 15s
}

function removeEventRealGoldRate() {
	document.removeEventListener("evtGoldRateSuccess", getRealGoldRateSuccess, false);
	document.removeEventListener("evtGoldRateFail", getRealGoldRateFail, false);
}

function getRealGoldRate()
{
	var data = {};
	var arrayArgs = new Array();
	
	arrayArgs.push('0'); //check rate without get gold keep
	arrayArgs.push(gCustomerNo);
	
	var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_GOLD_CHECK_RATE"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	data = getDataFromGprsCmd(gprsCmd);
	
	// construct an HTTP request
	var xhr;// = new XMLHttpRequest();
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//check internet connection
	//var tmpStatus = navigator.onLine;
	//if (!tmpStatus) return;
	
	//setting request url
	xhr.open(gRequestMethod, gMBServiceUrl, true);
	
	if (gRequestMethod == "POST") {
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
		//xhr.setRequestHeader('Content-Length', data.length);
		logInfo("JSON data: " + JSON.stringify(data));
		xhr.send(JSON.stringify(data));
		
		var xmlHttpTimeout=setTimeout(ajaxTimeout, (CONST_TIMER_GOLD_RATE - 1) * 1000); //set time out
		function ajaxTimeout(){
			clearTimeout(xmlHttpTimeout); // clear time out
			
			xhr.abort();
			//new event
			//mbRequestGoldRate.fire({ type: "evtGoldRateFail" }); 
			document.dispatchEvent(evtGoldRateFail);
		}
		
		xhr.onreadystatechange = function () {
			//if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
			if ((xhr.readyState==4) && (xhr.status==200)) {
				clearTimeout(xmlHttpTimeout); // clear time out
				
				logInfo("End receiving data: " + xhr.responseText);
				//fire event listener
				//mbRequestGoldRate.fire({ type: "evtGoldRateSuccess", serviceData: xhr.responseText }); 
				if(evtGoldRateSuccess != undefined) {
					evtGoldRateSuccess.serviceData = xhr.responseText;
					document.dispatchEvent(evtGoldRateSuccess);
				}
			}
			else {
				if (xhr.status==404) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Error sending data: " + data);
					xhr.abort();
					//new event
					//mbRequestGoldRate.fire({ type: "evtGoldRateFail" }); 
					document.dispatchEvent(evtGoldRateFail);
				}
				else if ((xhr.readyState==4) && (xhr.status==0)) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Disconnected to service!");
					xhr.abort();
					//new event
					//mbRequestGoldRate.fire({ type: "evtGoldRateFail" }); 
					document.dispatchEvent(evtGoldRateFail);
				}
				//other status
			}
		}
	}
}

function getRealGoldRateSuccess(e)
{
	//if (e.type != "evtGoldRateSuccess") return;
	var gprsResp = parserJSON(e.serviceData);
	//removeEventRealGoldRate();
	
	if((gprsResp.arguments == undefined) || (gprsResp.arguments == null) || (gprsResp.arguments.length==0)) {
		//document.addEventListener('closeAlertView', handleAlertEmptyBankInfo, false);
		//showAlertText(CONST_STR.get('ERR_BANK_INFO_EMPTY_DATA'));
		return;
	}
	
	setGoldRate(gprsResp);
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_GOLD_CHECK_RATE")))) {
		if (gprsResp.arguments.length > 0)
		{
			var tmpArrayGoldStr = gprsResp.arguments[0].split('%#');
			var tmpArrayGoldObj = new Array();
			for (var i=0; i<tmpArrayGoldStr.length; i++) {
				var tmpGoldStr = tmpArrayGoldStr[i];
				if((tmpGoldStr != undefined) && (tmpGoldStr.length > 0)) {
					var tmpGoldArr = tmpGoldStr.split('#');
					if(tmpGoldArr.length > 3) {
						var tmpGoldObj = new GoldObj();
						tmpGoldObj.goldId = tmpGoldArr[0];
						tmpGoldObj.goldName = tmpGoldArr[1];
						tmpGoldObj.goldUnit = tmpGoldArr[2];
						tmpGoldObj.goldRetailBuy = tmpGoldArr[3].split('~')[0];
						tmpGoldObj.goldTradeBuy = tmpGoldArr[3].split('~')[1];
						tmpGoldObj.goldRetailSell = tmpGoldArr[4].split('~')[0];
						tmpGoldObj.goldTradeSell = tmpGoldArr[4].split('~')[1];
						tmpArrayGoldObj.push(tmpGoldObj);
					}
				}
			}
			var tmpStatusGoldChange = checkGoldRateIsEqualTo(tmpArrayGoldObj);
			if(!tmpStatusGoldChange) 
			{
				setGoldRate(tmpArrayGoldObj); //save gold rate
				setGoldRateStore(tmpArrayGoldObj); //add gold rate to store
			}
		}
	}
}

function getRealGoldRateFail(e)
{
	//removeEventRealGoldRate();
	//document.removeEventListener("evtGoldRateFail", getRealGoldRateFail, false);
}

/*** EGOLD SERVICE END ***/

//ngocdt them cho dang ky doi qua
var arrBranchLoyalty;
var arrObjLoyalty;
//ngocdt3 bo sung cho tiet kiem gui gop
var gFutureSaving = new FutureSaving();
function FutureSaving() {
	this.purpose = "";//muc dich gui gop
	this.rateObj = ""; //ky han - lai sua
	this.AmountPrdObj = ""; //so tien toi thieu tk dinh ky
	this.AomuntFlxObj = ""; //so tien toi thieu tk linh hoa
	this.RateLangObj ="";//lang ky han gui
	this.tempKeyLang ="";
	this.tempLangVN ="";
	this.tempLangEN="";
	this.gFurSaving ="";
	this.gFurSavAcc = "";
}
//var rateObj;
var AmountPrdObj;
var AomuntFlxObj;
/*var purpose;
var RateLangObj;
var tempKeyLang;
var tempLangVN;
var tempLangEN;
var gFurSaving;
var gFurSavAcc;*/

function HisTopObj(){
	this.date ="";
	this.amount ="";
	this.balance ="";
	this.savingtype ="";
}
function HisRateObj(){
	this.startdate ="";
	this.rate ="";
}
var arraySetCardObj;

// Thực hiện việc gen dữ liệu từ xml ra table rồi đổ vào trang
function getDataTblToDiv(dataGen, linkFileTblXsl, divId, startIdx){
	if (typeof(startIdx) === "undefined")
		startIdx = 0;
	// Gen data to xml
	var docXml = createXMLDoc(); 
	var nodeRoot = createXMLNode('resptable','', docXml);
	var nodeInfor;
	var nodeChild;
	
	var l_arr = dataGen;
	if(l_arr.length === undefined){
		nodeInfor = createXMLNode('tabletdetail','',docXml, nodeRoot);
		nodeChild = createXMLNode('no', 1, docXml, nodeInfor);
		
		var colNames = Object.keys(l_arr);
		for(var j = 0; j < colNames.length; j++){
			nodeChild = createXMLNode(colNames[j],l_arr[colNames[j]] , docXml, nodeInfor);
		}
	}else{
		for(var i= 0; i< l_arr.length; i++){
			nodeInfor = createXMLNode('tabletdetail','',docXml, nodeRoot);
			nodeChild = createXMLNode('no', startIdx + i + 1, docXml, nodeInfor);
			
			var colNames = Object.keys(l_arr[i]);
			for(var j = 0; j < colNames.length; j++){
				nodeChild = createXMLNode(colNames[j],l_arr[i][colNames[j]] , docXml, nodeInfor);
			}
		}
	}
	
	// Get file xsl
	var docXsl = getCachePageXsl(linkFileTblXsl);
	
	// Gen data to tag div
	genHTMLStringWithXML(docXml, docXsl, function(oStr){
		document.getElementById(divId).innerHTML = oStr;
	});
}

// eBank Doanh Nghiep: Sua lai kieu request thanh JSON
function requestMBServiceCorp(data, loadMask, timeout, successCallback, failCallback, iOptions) {
	if (!ajaxTimeNextRequestStatus) return; //fix bug on WP and some Android device
	ajaxTimeNextRequestStatus = false;
	startTimeRequestCoutdown();
	
	hiddenKeyBoardWhenRequest();
	var hideKeyboardDelay = 0;
	var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
	hideKeyboardDelay = 500;
	setTimeout(function(){
		statusLoadMask = loadMask;
		var timeToBreak = 90; //time by s
		if ((timeout != undefined) && (timeout > 0)) {
			timeToBreak = timeout;
		}
		var reqKey = '';
		var reqContent = '';
		
		if(iOptions && iOptions.cached) {
			var tmpData = {};
			tmpData["cmdType"] = data["cmdType"];
			tmpData["args"] = data["args"];
			tmpData["language"] = data["language"];
			var tmpReqData = JSON.stringify(tmpData);
			reqKey = hex_md5(tmpReqData);
			reqContent = respCache[reqKey];
			if(reqContent != undefined && reqContent.length > 0) {
				if(successCallback && (typeof successCallback == "function")) {
					successCallback(reqContent);
				}
				return;
			}
		}
		
		if (loadMask){
			showLoadingMask();
		}
		
		// construct an HTTP request
		var xhr;// = new XMLHttpRequest();
		if (window.XMLHttpRequest) {
			xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		if (gMBServiceUrl.length == 0) {
			logInfo("URL is null. Please check url.");
			return;
		}
		
		//setting request url
		try {
			xhr.open(gRequestMethod, gMBServiceUrl, true);
			
			if (gRequestMethod == "POST") {
				xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				var tmpReqReal = JSON.stringify(data);
				logInfo("JSON data: " + tmpReqReal);
				xhr.send(tmpReqReal);
				
				var xmlHttpTimeout=setTimeout(ajaxTimeout, timeToBreak * 1000); //set time out
				function ajaxTimeout(){
					clearTimeout(xmlHttpTimeout); // clear time out
					
					xhr.abort();
					hideLoadingMask();
					if (loadMask) showAlertText(CONST_STR.get('ERR_CONNECTION_TIMEOUT'));
					//fire event listener
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
						var timeFailEvent = setTimeout(function(){
							clearTimeout(timeFailEvent);
							failCallback = null;
						}, 10);
					}
				}
				
				xhr.onreadystatechange = function () {
					if ((xhr.readyState==4) && (xhr.status==200)) {
						clearTimeout(xmlHttpTimeout); // clear time out
						
						if(iOptions && iOptions.cached) {
							try {
								var tmpResp = parserJSON(xhr.responseText, false);
								if (parseInt(tmpResp.respCode) == 0) {
									respCache[reqKey] = xhr.responseText;
								}
							}
							catch(err) {
								logInfo('Error request service.');
							}
						}
						
						hideLoadingMask();
						logInfo("End receiving data: " + xhr.responseText);

						// Kiem tra neu sai session
						var jsonResp = JSON.parse(xhr.responseText);
						if (jsonResp.respCode == RESP.get("COM_INVALID_SESSION")) {
							document.addEventListener('closeAlertView', logoutNoRequest, false);
							showAlertText(CONST_STR.get("CORP_MSG_SESSION_EXPIRED"));
							return;
						}

						if(successCallback && (typeof successCallback == "function")) {
							successCallback(xhr.responseText);
							var timeSuccessEvent = setTimeout(function(){
								clearTimeout(timeSuccessEvent);
								successCallback = null;
							}, 10);
							if (typeof(mainContentScroll) != "undefined" && mainContentScroll != null)
								mainContentScroll.refresh();
							}
					}
					else {
						if (xhr.status==404) {
							clearTimeout(xmlHttpTimeout); // clear time out
							
							hideLoadingMask();
							logInfo("Error sending data: " + data);
							if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
							xhr.abort();
							if(failCallback && (typeof failCallback == "function")) {
								failCallback();
								var timeFailEvent = setTimeout(function(){
									clearTimeout(timeFailEvent);
									failCallback = null;
								}, 10);

							}
						}
						else if ((xhr.readyState==4) && (xhr.status==0)) {
							clearTimeout(xmlHttpTimeout); // clear time out
							
							hideLoadingMask();
							logInfo("Disconnected to service!");
							if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
							xhr.abort();
							if(failCallback && (typeof failCallback == "function")) {
								failCallback();
								var timeFailEvent = setTimeout(function(){
									clearTimeout(timeFailEvent);
									failCallback = null;
								}, 10);

							}
						}
					}
				}
			}
		}
		catch(err) {
			clearTimeout(xmlHttpTimeout); // clear time out
			
			logInfo(err);
			hideLoadingMask();
			if (loadMask) showAlertText(CONST_STR.get('ERR_DISCONNECT_TO_SERVER'));
			//fire event listener
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
				var timeFailEvent = setTimeout(function(){
						clearTimeout(timeFailEvent);
						failCallback = null;
					}, 10);

			}
		}
	},hideKeyboardDelay);	
}

// eBank Doanh Nghiep: Sua lai kieu request thanh JSON
function requestBackgroundMBServiceCorp(svCode, svArgs, successCallback, failCallback, iOptions)
{
	hiddenKeyBoardWhenRequest();	

	if ((svCode == undefined) || (svCode == null) || (svArgs == undefined) || (svArgs == null)) {
		return;
	}
	var data = {};
	var arrayArgs = new Array();
	
	arrayArgs = svArgs;
	var gprsCmd = new GprsCmdObj(CONSTANTS.get(svCode), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
	data = getDataFromGprsCmd(gprsCmd);
	
	var reqKey = '';
	var reqContent = '';
	
	if(iOptions && iOptions.cached) {
		var tmpData = {};
		tmpData["cmdType"] = data["cmdType"];
		tmpData["args"] = data["args"];
		tmpData["language"] = data["language"];
		var tmpReqData = JSON.stringify(tmpData);
		reqKey = hex_md5(tmpReqData);
		reqContent = respCache[reqKey];
		if(reqContent != undefined && reqContent.length > 0) {
			if(successCallback && (typeof successCallback == "function")) {
				successCallback(reqContent);
			}
			return;
		}
	}
	
	// construct an HTTP request
	var xhr;// = new XMLHttpRequest();
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	
	//setting request url
	xhr.open(gRequestMethod, gMBServiceUrl, true);
	
	if (gRequestMethod == "POST") {
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		logInfo("JSON data: " + JSON.stringify(data));
		xhr.send(JSON.stringify(data));
		
		var xmlHttpTimeout=setTimeout(ajaxTimeout, 20 * 1000); //set time out
		function ajaxTimeout(){
			clearTimeout(xmlHttpTimeout); // clear time out
			
			xhr.abort();
			if(failCallback && (typeof failCallback == "function")) {
				failCallback();
			}
		}
		
		xhr.onreadystatechange = function () {
			if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))) {
				clearTimeout(xmlHttpTimeout); // clear time out
				
				if(iOptions && iOptions.cached) {
					try {
						var tmpResp = parserJSON(xhr.responseText, false);
						if (parseInt(tmpResp.respCode) == 0) {
							respCache[reqKey] = xhr.responseText;
						}
					}
					catch(err) {
						logInfo('Error request background service.');
					}
				}
				
				logInfo("End receiving data: " + xhr.responseText);
				
				// Kiem tra neu sai session
				var jsonResp = JSON.parse(xhr.responseText);
				if (jsonResp.respCode == RESP.get("COM_INVALID_SESSION")) {
					document.addEventListener('closeAlertView', logoutNoRequest, false);
					showAlertText(CONST_STR.get("CORP_MSG_SESSION_EXPIRED"));
					return;
				}
						
				if(successCallback && (typeof successCallback == "function")) {
					successCallback(xhr.responseText);
					if (typeof(mainContentScroll) != "undefined" && mainContentScroll != null)
						mainContentScroll.refresh();
				}
			}
			else {
				if (xhr.status==404) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Error sending data: " + data);
					xhr.abort();
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
				else if ((xhr.readyState==4) && (xhr.status==0)) {
					clearTimeout(xmlHttpTimeout); // clear time out
					
					logInfo("Disconnected to service!");
					xhr.abort();
					if(failCallback && (typeof failCallback == "function")) {
						failCallback();
					}
				}
			}
		}
	}	
}

function logoutNoRequest() {
	window.onbeforeunload = '';
    var url = location.protocol + '//' + location.host + location.pathname;
    if (getURLParam('ver')) {
        url += '?ver=' + getURLParam('ver');
    }
    window.top.location.href = url;
}

