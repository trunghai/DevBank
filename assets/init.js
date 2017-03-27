/**
 * Created by HuyNT2.
 * Update: HuyNT2
 * Date: 11/4/13
 * Time: 5:35 PM
 */
 
 function loaded() {
	//alert(JSON.stringify(bowser, null, '    ')); //check browser
	
	//add listener PhoneGap
	if(!CONST_BROWSER_MODE) {
		loadPhoneGapJS();
		document.addEventListener("deviceready", onDeviceReady, true);
	}
	
	//Neu khong phai la mobile thi chuyen WAP--> WEB
	if(!Environment.isMobile()) {
		CONST_APP_NAME = CONST_APP_WEB_CONFIG;
	}
	
	//set time out
	setTimerCheckLogout();
	
	//disable right click
	 if (document.layers)
	 {
		 document.captureEvents('mousedown');
		 document.onmousedown=clickNS;
	 }
	 else
	 {
		 document.onmouseup=clickNS;
		 document.oncontextmenu=clickIE;
	 }
	
	//get language config
	gUserInfo.lang = getLanguageConfig();
	initLanguageOnIB();
	
	//store raw menu
	//gMenuRawData = document.getElementById('menu-section').innerHTML;
	//changeLanguageInNodeWithClass('langNoStyle');
	
	document.addEventListener('touchmove', function (e) {
		e.preventDefault();
	}, false);
	applyDynamicCommonStyleSheet();
	if (hasPageJS) applyDynamicPageStyleSheet(false);
	
	//navController.setDefaultPage('login-scr');
	navController.initWithRootView('login-scr', true);
	
	content = new slideInMenu('mainview', false);
	contentPromotion = new slideInMenu('mainview', false, true);
	promotionSection = document.getElementById('promotion-section');
	//promotionSection.style.display = 'block';
	//updatePromotionView();
	
	HandleTouchEvent();	
	updateMainContentWidth();
	
	/*if(CONST_DESKTOP_MODE) {
		(function() {
			//var startingTime = new Date().getTime();
			// Load the script
			var script = document.createElement("SCRIPT");
			script.src = './assets/libs/jquery.js';
			script.type = 'text/javascript';
			document.getElementsByTagName("head")[0].appendChild(script);
			
			// Poll for jQuery to come into existance
			var checkReady = function(callback) {
				if (window.jQuery) {
					callback(jQuery);
				}
				else {
					window.setTimeout(function() { 
						checkReady(callback); 
					}, 20);
				}
			};
		
			// Start polling...
			checkReady(function($) {
				$(function() {
					//var endingTime = new Date().getTime();
					//var tookTime = endingTime - startingTime;
					//window.alert("jQuery is loaded, after " + tookTime + " milliseconds!");
				});
			});
		})();
	}*/
	
	// get news data
	//getNewsFromSV();
	
	//suggest download app
	if (CONST_BROWSER_MODE && !getURLParam('cif')) {
		var downloadStatus = getAgreeDownloadApp();
		//if(downloadStatus == 'Y' && (Environment.isAndroid() || (true))) {
		if(downloadStatus == 'N' && (Environment.isAndroid() || (Environment.isIOS() && !Environment.isWindows()))) {
			showAlertAppText(CONST_STR.get('BANNER_ALERT_MOBILE_APP_CONTENT'), CONST_STR.get('BANNER_ALERT_MOBILE_BTN_OK'), CONST_STR.get('BANNER_ALERT_MOBILE_BTN_CANCEL'));
			document.addEventListener('alertAppConfirmOK', downloadAppSelectionOK, false);
			document.addEventListener('alertAppConfirmCancel', downloadAppSelectionCancel, false);	
		}
	}
	
	//neu la iPad thi chuyen icon phone thanh icon chat
	if(isIPad) {
		document.getElementById('mainlayoutfooter').getElementsByClassName('callsupport')[0].innerHTML = document.getElementById('pageFooter').getElementsByClassName('callsupport')[0].innerHTML;
	}
	//load menu
	//var menuXsl = getCachePageXsl('role/menu-role');
	//genHTMLStringWithXML('', menuXsl, function(oStr){
		//var tmpMenuNode = document.getElementById('menu.slideview');
		//tmpMenuNode.innerHTML = oStr;
		//store raw menu
		gMenuRawData = document.getElementById('menu-section').innerHTML;
		applyDynamicCommonStyleSheet();
		changeLanguageInNodeWithClass('langNoStyle');
	//});
	
	
	
	//Load config and libs
	loadjscssfile('./assets/libs/calendar/datepicker.css', 'css');
	loadjscssfile('./assets/libs/calendar/datepicker.js', 'js');
	loadjscssfile('./assets/libs/slip.js', 'js');
					  
	setTimeout(function(){
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/system-payment-config.js', 'js');
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/paymentComboFields.js', 'js');
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/paymentGroups.js', 'js');
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/paymentProviders.js', 'js');
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/paymentRequestFields.js', 'js');
		loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/paymentServices.js', 'js');
		setTimeout(function(){
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/branchInterbanks.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/branchs.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/countries.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/districts.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/interbanks.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/sysdata/provinces.js', 'js');
			loadjscssfile(CONST_WEB_URL_LINK + 'assets/system-data.js', 'js'); 
		}, 1000);
		reloadTopBanner();
	}, 1000);
	
	//HuyNT2: Check page load ready
	/*var timerCheckPageReady = window.setInterval(checkPageReady, 500);
	var timerTimeOutConnect = 0;
    function checkPageReady() {
        if (document.getElementsByTagName('body')[0] !== undefined && currentPage !== undefined && CONST_APP_NAME !== undefined && gUserInfo !== undefined && document.getElementById('current_md5_capcha') !== undefined) {
			window.clearInterval(timerCheckPageReady);
			document.getElementById('bodyPage').style.display = 'block';
			document.getElementById('loadingPage').style.display = 'none';
			document.getElementById('loadingPage').innerHTML = '';
        }
		else {
			if (timerTimeOutConnect > 60) {
				window.clearInterval(timerCheckPageReady);
				document.getElementById('loadingPage').innerHTML = "<div style='color: #F1F1F1; font-size: 125%; margin-top: 30%;'>Connection to server timed out</div>";
			}
			timerTimeOutConnect++;
		}
    }*/
}

function reloadTopBanner(){
	var tmpTopBanner = "";
	for (var k=0; k<bannersTPBank.topBanner.length; k++) {
		if(gUserInfo.lang == 'EN') {
			tmpTopBanner += '<a href="' + bannersTPBank.topBanner[k].bannerLinkEN + '"> <img src="' + bannersTPBank.topBanner[k].bannerImageEN + '" alt="" /> </a>';
		}
		else {
			tmpTopBanner += '<a href="' + bannersTPBank.topBanner[k].bannerLinkVN + '" target="_blank"> <img src="' + bannersTPBank.topBanner[k].bannerImageVN + '" alt="" /> </a>';
		}
	}
	
	document.getElementById('slideShow').innerHTML = '<div id="sliderFrame">' + 
                      '<div id="slider"> ' + tmpTopBanner +
					  '</div></div>';
}

/*function closeBannerSuggestApp() {
	document.getElementById('banner-suggest-id').style.display = 'none';
}*/

function downloadAppSelectionOK() {
	downloadAppSelectionCancel();
	setAgreeDownloadApp('Y');
	if(Environment.isIOS() && !Environment.isWindows()) {
		openLinkInWindows(CONST_WEB_URL_LINK + 'app/');
	}
	else if(Environment.isAndroid()) {
		openLinkInWindows(CONST_WEB_URL_LINK + 'app/');
	}
	
}
function downloadAppSelectionCancel() {
	setAgreeDownloadApp('N');
	document.removeEventListener('alertAppConfirmOK', downloadAppSelectionOK, false);
	document.removeEventListener('alertAppConfirmCancel', downloadAppSelectionCancel, false);
}

function reloadNews(){
	//getNewsFromSV();
}

function getNewsFromSV(){
	try{
		var arrayArgs = new Array();
		arrayArgs.push("PROMOTION");
		//arrayArgs.push("NEW#1#HN");
		//requestBacgroundMBService("CMD_TYPE_GET_PROMOTION", arrayArgs, requestQuickPromotionSuccess, requestQuickPromotionFail);
		//var docXsl = getCachePageXsl("newsxsl/list_news_cat_menu_scr");		
		//genHTMLStringWithXML(docXml, docXsl, successMenuNewsCallback, failMenuNewsCallback);
	} 
	catch (err){
		logInfo(err.message);
	}
}

function successMenuNewsCallback(oStr){
	var tabh = document.getElementById("promotion.slideview");
	tabh.innerHTML = oStr;
	
	if(navigator.userAgent.match(/firefox/i)){
		var cat = document.getElementsByName("nm.category");
		for(var i = 0; i < cat.length; i++){
		    cat[i].style.marginTop = "15px"
		}
	}
	//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
	applyDynamicPromotionWithNumOfItems(10);
}

function failMenuNewsCallback(){
	
}

function requestQuickPromotionSuccess(e) {
	var tmpRespObj = parserJSON(e, false);
	if (tmpRespObj.arguments && tmpRespObj.arguments.length > 0) {
		logInfo('recevice promotion category: ' + tmpRespObj.arguments[0]);
		var docXml = stringtoXML(tmpRespObj.arguments[0]);
		var docXsl = getCachePageXsl("newsxsl/list_news_cat_menu_scr");		
		genHTMLStringWithXML(docXml, docXsl, successMenuNewsCallback, failMenuNewsCallback);
	}
}

function requestQuickPromotionFail(e) {
	
}

document.addEventListener('DOMContentLoaded', function () {
	setTimeout(loaded, 100);
	
}, false);

var timeOutResize;
var gClientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
var gClientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
var timeOutToChangeSize; //fix on iPad iOS6
var isModelMobileRotate = navigator.userAgent.match(/Android|BB10|iPhone|iPod|iPad|WPDesktop|IEMobile/i);
window.onresize = function (e) {
	
	if(timeOutResize) {
		clearTimeout(timeOutResize);
		timeOutResize = null;
	}
	var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
	var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
	//alert('Size' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
	if(((gClientHeight == currentClientHeight) || (gClientWidth == currentClientWidth)) && isModelMobileRotate) {
		//alert('not resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
		return;
	}
	else {
		if(timeOutToChangeSize && !isModelMobileRotate) {
			clearTimeout(timeOutToChangeSize);
			timeOutToChangeSize = null;
			if(navigator.userAgent.match(/(iPhone|iPad|iPod)\sOS\s6/.test(navigator.userAgent))) {
				return;//fix on iPad iOS6
			}
		}
		//alert('resize' + ' current height: ' + gClientHeight + ' width: ' + gClientWidth + ' update height:' + currentClientHeight + ' width: ' + currentClientWidth);
		gClientHeight = currentClientHeight;
		gClientWidth = currentClientWidth;
	}
	
	var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
	if(tmpWP) {
		//alert('2' + e.type + ' - ' + navigator.userAgent);
		//document.activeElement.blur(); //hidden keyboard
		var tmpArrInputNote = document.getElementsByTagName('input');
		if(tmpArrInputNote && tmpArrInputNote.length > 0) {
			for (var i = 0; i < tmpArrInputNote.length; i++) {
				if(tmpArrInputNote[i])
					tmpArrInputNote[i].blur();
			}
		}
		updateMainContentWidth(currentClientWidth, currentClientHeight);	
		setTimeout(function(e) {
			
			applyDynamicCommonStyleSheet();
			applyDynamicPageStyleSheet(true);
			applyVerticalScrollPage(true, -80);
			//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
			applyDynamicPromotionWithNumOfItems(10);
			setTimeout(function(){
				if(typeof(window['viewChangedSize']) == 'function') {
					window['viewChangedSize']();
				}
			}, 100);
		}, 100);
		
	}
	else {
		updateMainContentWidth(currentClientWidth, currentClientHeight);	
		timeOutToChangeSize = setTimeout(function(e){ //fix on iPad iOS6
			//alert('bcm.1');
			clearTimeout(timeOutToChangeSize);
			timeOutToChangeSize = null;
			
			applyDynamicCommonStyleSheet();
			applyDynamicPageStyleSheet(true);
			applyVerticalScrollPage(true, -80);
			//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
			applyDynamicPromotionWithNumOfItems(10);
			setTimeout(function(){
				if(typeof(window['viewChangedSize']) == 'function') {
					window['viewChangedSize']();
				}
			}, 100);
		}, 200);
		
	}
}
//RESIZE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';
if('onorientationchange' in window) {
	window.addEventListener('orientationchange', function(e) {
		//alert('4' + e.type + ' - ' + navigator.userAgent);
		timeOutResize = setTimeout(function(){
			if(timeOutResize) {
				clearTimeout(timeOutResize);
				timeOutResize = null;
			}
			var currentClientHeight = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
			var currentClientWidth = window.innerWidth
				|| document.documentElement.clientWidth
				|| document.body.clientWidth;
			
			if((gClientHeight && gClientHeight == currentClientHeight) || (gClientWidth && gClientWidth == currentClientWidth)) {
				return;
			}
			else {
				gClientHeight = currentClientHeight;
				gClientWidth = currentClientWidth;
			}
			
			var tmpWP1 = navigator.userAgent.match(/IEMobile|WPDesktop/i);
			if(tmpWP1) {
				//alert('3' + e.type + ' - ' + navigator.userAgent);
				var tmpArrInputNote = document.getElementsByTagName('input');
				if(tmpArrInputNote && tmpArrInputNote.length > 0) {
					for (var i = 0; i < tmpArrInputNote.length; i++) {
						if(tmpArrInputNote[i])
							tmpArrInputNote[i].blur();
					}
				}
				updateMainContentWidth(currentClientWidth, currentClientHeight);	
				setTimeout(function(e){				
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					applyVerticalScrollPage(true, -80);
					//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
					applyDynamicPromotionWithNumOfItems(10);
					setTimeout(function(){
						if(typeof(window['viewChangedSize']) == 'function') {
							window['viewChangedSize']();
						}
					}, 100);
				}, 200);
			}
			else {
				//alert('bcm.2');
				if((Environment.isIOS() && !Environment.isWindows()) || Environment.isAndroid()) { //except windows phone
					if(document.activeElement)
						document.activeElement.blur(); //hidden keyboard
				}
				
				var tmpArrInputNote = document.getElementsByTagName('input');
				if(tmpArrInputNote && tmpArrInputNote.length > 0) {
					for (var i = 0; i < tmpArrInputNote.length; i++) {
						if(tmpArrInputNote[i])
							tmpArrInputNote[i].blur();
					}
				}
				updateMainContentWidth(currentClientWidth, currentClientHeight);	
				setTimeout(function(e){
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					applyVerticalScrollPage(true, -80);
					//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
					applyDynamicPromotionWithNumOfItems(10);
					setTimeout(function(){
						if(typeof(window['viewChangedSize']) == 'function') {
							window['viewChangedSize']();
						}
					}, 10);
				
				}, 100);
			}
		}, 100);
	}, true);
}

/*var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
if(is_firefox) {
	replacejscssfile('./assets/mb-service.js', './other/mb-service.js', 'js');
	replacejscssfile('./assets/common.js', './other/common.js', 'js');
}*/

//handle escape page
if(CONST_BROWSER_MODE) {
	window.onbeforeunload = function (e) {
		if(gIsLogin && (gModeScreenView == CONST_MODE_SCR_SMALL)){
			var e = e || window.event;
			var msg = CONST_STR.get('ALERT_WARNING_BACK_ACTION');

			// For IE and Firefox
			if (e) {
				e.returnValue = msg;
			}
			// For Safari / chrome
			return msg;
		}
	 };
	document.onkeydown = function(e) {
		if(gIsLogin && (gModeScreenView != CONST_MODE_SCR_SMALL)){
			var key;
			if (window.event) {
				key = event.keyCode
			}
			else {
				var unicode = e.keyCode ? e.keyCode : e.charCode
				key = unicode
			}
			switch (key) {//event.keyCode
				case 116: //F5 button
					if (event.ctrlKey) return true; //enable Crlt+F5 for testing
					event.returnValue = false;
					key = 0; //event.keyCode = 0;
					return false;
				case 82: //R button
					if (event.ctrlKey) {
						event.returnValue = false;
						key = 0; //event.keyCode = 0;
						return false;
					}
					else return true;
				case 91: // ctrl + R Button
					event.returnValue= false;
					key=0;
					return false;
			}
		}
	}
}
else {
	//using cordovar lib
	//app.initialize();
    var numPressToExit = 0;
    var numPressedTime;
	
	//var gDeviceStatus;
    //document.addEventListener("deviceready", onDeviceReady, true);
    function onDeviceReady() {
        //alert('Device ready!');
		//alert('Loaded Phonegap: ' + device.name + ' UUID: ' + device.uuid);
		/*alert('Device Name: '     + device.name     + '<br />' +
                            'Device Cordova: '  + device.cordova  + '<br />' +
                            'Device Platform: ' + device.platform + '<br />' +
                            'Device UUID: '     + device.uuid     + '<br />' +
                            'Device Version: '  + device.version  + '<br />');*/
		
		gDeviceToken = device.uuid;
		startupAppCheckVersion();
		
		function getPhoneGapPath() {
			var path = window.location.pathname;
			var phoneGapPath = path.substring(0, path.lastIndexOf('/') + 1);
			phoneGapPath = (phoneGapPath.length > 5)? phoneGapPath: "";
			phoneGapPath = (phoneGapPath.indexOf("http://") != -1)? phoneGapPath: "";
			return phoneGapPath;
		};
		gDeviceWWWFolder = getPhoneGapPath();
		//alert("path: " + gDeviceWWWFolder);
		
        document.addEventListener("backbutton", onBackKeyDown, true);
        document.addEventListener("menubutton", menuKeyDown, true);
    }
	
    function onBackKeyDown() {
		//close alert
		closealert();
		closeAlertConfirm(false);
		closeAlertConfirmScheduleBank(false);
		closealertKHCN_KHDN_TERMS();
		closealertKHCN_KHDN_INSTRUCTION();
		closealertKHCN_KHDN_FAQ();
		//closeDialog(document.getElementById('dialog-backgroundtrans'));
		//document.getElementById('mask-blacktrans').click();
		
        if (numPressToExit > 1) {
			numPressToExit = 0;
			clearTimeout(numPressedTime);
            showAlertConfirmText(CONST_STR.get('ALERT_CONFIRM_EXIT_APP'));
            document.addEventListener("alertConfirmOK", function (e) {
                document.removeEventListener("alertConfirmOK");
                if (navigator.app && navigator.app.exitApp) {
                    navigator.app.exitApp();
                } else if (navigator.device && navigator.device.exitApp) {
                    navigator.device.exitApp();
                }
            }, true);
        }
        else {
            numPressToExit++;
			if(numPressedTime != undefined) {
				clearTimeout(numPressedTime);
			}
            numPressedTime = setTimeout(function () {
                numPressToExit = 0;
            }, 2000);
			
			if(checkTouchLocked()) return; //disable back button when show alert, loading, dialog
			if(navArrayScr && navArrayScr.length < 2) {
				showSlideMenu();
			}
			else {
            	navController.popView(true);
			}
        }
        return false;
    }
    
    function menuKeyDown() {
        if (gIsLogin) {
            setTimeout(function () {
                //content.toggle();
				showSlideMenu();
            }, 200);
        }
    }
}

