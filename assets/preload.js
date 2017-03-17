/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */

function getURLParam(strParamName){
	var strReturn="";
	var strHref=window.location.href;
	if (strHref.indexOf("?") > -1 )
	{
		var strQueryString = strHref.substr(strHref.indexOf("?"));
		var aQueryString = strQueryString.split("&");
		for(var iParam=0;iParam<aQueryString.length;iParam++)
		{
			if(aQueryString[iParam].indexOf(strParamName+"=")>-1)
			{
				var aParam=aQueryString[iParam].split("=");
				strReturn=aParam[1];
				break;
			}
		}
	}
	return strReturn;
}
function get_browser(){
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
		return 'IE '+(tem[1]||'');
		}   
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR\/(\d+)/)
		if(tem!=null)   {return 'Opera '+tem[1];}
		}   
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return M[0];
}

function get_browser_version(){
	var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
	if(/trident/i.test(M[1])){
		tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE '+(tem[1]||'');
		}
	if(M[1]==='Chrome'){
		tem=ua.match(/\bOPR\/(\d+)/)
		if(tem!=null)   {return 'Opera '+tem[1];}
		}   
	M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
	if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
	return M[1];
}

function loadjscssfile(filename, filetype){ //using array store event
	if (filetype=="js"){ //if filename is a external JavaScript file
		var fileref=document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", filename)
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link")
		fileref.setAttribute("rel", "stylesheet")
		fileref.setAttribute("type", "text/css")
		fileref.setAttribute("href", filename)
	}
	if (typeof fileref!="undefined")
		document.getElementsByTagName("head")[0].appendChild(fileref)
}

function createjscssfile(filename, filetype)
{
	if (filetype=="js")
	{ //if filename is a external JavaScript file
		var fileref=document.createElement('script');
		fileref.setAttribute("type","text/javascript");
		fileref.setAttribute("src", filename);
	}
	else if (filetype=="css"){ //if filename is an external CSS file
		var fileref=document.createElement("link");
		fileref.setAttribute("rel", "stylesheet");
		fileref.setAttribute("type", "text/css");
		fileref.setAttribute("href", filename);
	}
	return fileref;
}

function replacejscssfile(oldfilename, newfilename, filetype)
{
	var targetelement=(filetype=="js")? "script" : (filetype=="css")? "link" : "none"; //determine element type to create nodelist using
	var targetattr=(filetype=="js")? "src" : (filetype=="css")? "href" : "none"; //determine corresponding attribute to test for
	var allsuspects=document.getElementsByTagName(targetelement);
	for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
		if (allsuspects[i] && allsuspects[i].getAttribute(targetattr)!=null && allsuspects[i].getAttribute(targetattr).indexOf(oldfilename)!=-1){
			var newelement=createjscssfile(newfilename, filetype);
			allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i]);
		}
	}
}

function changeJSandCSStoMB() {
	replacejscssfile('css/style.css', 'cssmb/style.css', 'css');
	replacejscssfile('css/ebankstyle.css', 'cssmb/ebankstyle.css', 'css');
	//replacejscssfile('css/fonts.css', 'cssmb/fonts.css', 'css');
}

function changeJSandCSStoIB() {
	replacejscssfile('cssmb/style.css', 'css/style.css', 'css');
	replacejscssfile('cssmb/ebankstyle.css', 'css/ebankstyle.css', 'css');
	//replacejscssfile('cssmb/fonts.css', 'css/fonts.css', 'css');
}

//disable right-click
function clickIE(e) {
	if (document.all){
		//alert("Không được phép click chuột phải");
		return false;
	}	
	if (document.layers||(document.getElementById&&!document.all)){
		if (e.which==2||e.which==3){
			return false;
		}
	}		
}

function clickNS(e) 
{
	if (document.layers||(document.getElementById&&!document.all)){
		if (e.which==2||e.which==3) {
			//alert("Không được phép click chuột phải");
			return false;
		}
	}
}

function loadLibJSandCSS() {
	loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/banners.js', 'js');
}

var browserName=get_browser();
var browserVersion=get_browser_version();
var isModelBrowser = false;
//alert('Fullname: ' + navigator.userAgent + 'browser: ' + browserName + ' version: ' + browserVersion);

//if((browserName == 'IE 11') || (browserName == 'MSIE' && browserVersion > 9) || (browserName == 'Chrome' && browserVersion > 7) || (browserName == 'Firefox' && browserVersion > 8) || (browserName == 'Safari' && browserVersion > 3)) {
//	isModelBrowser = true;
//}
//TuanNM5 Update 20150224 -- Change version checking
if((browserName == 'IE 11') || (browserName == 'MSIE' && browserVersion > 9) || (browserName == 'Chrome' && browserVersion > 7) || (browserName == 'Firefox' && browserVersion > 28) || (browserName == 'Safari' && browserVersion > 3)) {
	isModelBrowser = true;
}
var isModelMobile = navigator.userAgent.match(/Android|BB10|iPhone|iPod|IEMobile/i);
var isIPad = navigator.userAgent.match(/iPad/i);

//var linkSupportOldBrowser = "https://ebank.tpb.vn/ibank";
var urlSupportOldBrower = location.protocol + '//' + location.host + location.pathname;
var linkSupportOldBrowser = urlSupportOldBrower + 'support/download.html';
var urlWelcomeiOS = "/app";

var isAbsoluteAddress = location.host.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/);

if(isAbsoluteAddress && CONST_BROWSER_MODE && !CONST_DEBUG_MODE) {
	var tmpSvUrl = CONST_WEB_SERVICE_LINK.replace('http://', '').replace('https://', '');
	var tmpArrUrl = tmpSvUrl.split('/');
	tmpArrUrl.shift();
	tmpSvUrl = tmpArrUrl.join('/');
	CONST_WEB_SERVICE_LINK = location.protocol + '//' + location.host + '/' + tmpSvUrl;
}

/*if(isModelMobile || isIPad) {
	//DISABLE_FOR_APP_iOS
	if(navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
		if(getURLParam('eb')!='rt' && CONST_BROWSER_MODE) {
			window.top.location = urlWelcomeiOS;
		}
	}
	//DISABLE_FOR_APP_iOS END
	
	//stay here
	//changeJSandCSStoMB();
}
else {*/
	//if(isModelBrowser || isModelMobile || !CONST_BROWSER_MODE) {
		//stay here
		//changeJSandCSStoIB();
	//}
	//else {
		if(!isModelBrowser && !isModelMobile && CONST_BROWSER_MODE && (getURLParam('ver')!='app'))
		window.top.location = linkSupportOldBrowser;
	//}
//}

loadLibJSandCSS();
if(getURLParam('ver')=='app') {
	CONST_BROWSER_MODE = false;
}
else if(getURLParam('ver')=='ib') {
	window.top.location = linkSupportOldBrowser;
}
else if (getURLParam('ver')=='ibnew') {
	if(isModelBrowser) {
		//window.location = 'http://mbtest.tpb.vn/m';
	}
	else {
		window.top.location = linkSupportOldBrowser;
	}
}

function getCurrentTime() {
	var d = new Date();
	return  (d.getTime());
}

 
/*** DEFINE NO-CACHE PAGE ***/

var navPageNoCache = ['com-input-account', 'com-review-scr', 'com-result-scr', 'com-authentication-scr', 'transfer/trans-input-bank', 'transfer/trans-input-city', 'transfer/trans-input-branch', 'bankinfo/bank-info-tpb-branch-city', 'newsxsl/list_news_detail_scr', 'bankinfo/bank-info-tpb-branch-list', 'bankinfo/bank-info-tpb-atm-map', 'com-promotion-view', 'egold/gold-main-page-scr', 'com-limit-authentication-scr', 'com-limit-review-scr', 'com-review-noauthen-scr', 'com-review-result-scr', 'com-review-xsl-scr', 'loan/loan-active-authen-overdraft','loan/loan-open-term-confirm-scr','loan/loan-main-scr','loan/loan-adjust-term-confirm-scr', 'introducexsl/introduce_new_customer_display', 'introducexsl/introduce_new_customer_edit', 'introducexsl/introduce_new_customer_edit_ctv' , 'introducexsl/customer-introduce' , 'introducexsl/customer-introduce-ctv' , 'loan/loan-open-term-confirm-scr','loan/loan-active-authen-overdraft','loan/loan-adjust-term-confirm-scr','loan/loan-advisory-question-scr','utilitiesxsl/utilities-manage-scr','utilities-manage-scr-loan-result', 'loyalty-register/loyalty-regis-review-scr', 'loyalty-register/loyalty-regis-finish' , 'loyalty-register/loyalty-regis-address-receive', 'loyaltyxsl/loyalty-point-manage-scr', 'schedule-bank/schedule-review-scr', 'transfer-by-list/review-error-xsl-scr' ,'cardservicexsl/change-repayment-account-credit','cardservicexsl/change-repayment-account-credit-review','cardservicexsls/card-setup-payment','com-input-payee-account','schedule-bank/schedule-finish-consulting-scr','schedule-bank/schedule-finish-scr','gold-withdraw-main-scr-noterm-review-new', 'schedule-bank/schedule-manage-scr','egold/gold-withdraw-main-scr-noterm-review-new','egold/gold-withdraw-main-scr-hasterm-review-new','setting/setting-auth-type','visa/credit-list-scr','login-scr','transfer/result-xsl-scr'];



/*** DEFINE NO-CACHE PAGE END ***/
