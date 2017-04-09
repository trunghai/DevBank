/**
 * Created by HuyNT2.
 * User: 
 * Date: 12/17/13
 * Time: 5:35 PM
 */


setInputOnlyASCII('login.txt.password', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
setInputOnlyASCII('login.txt.captcha', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"));
// setInputOnlyNumber('login.txt.username', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));
setInputOnlyASCII('login.txt.username', CONST_STR.get("ERR_INPUT_ONLY_NUMBER"));

var statusAccMode = false;
var buttonFlag = true;
var intLogin = 0;
var intLoginResposne = 0;
initLoginScr();

function initLoginScr() {

    statusAccMode = getUserInfoToLocal(); //get local data
    if (!statusAccMode) {
        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.style.display = 'none';

        getCaptcha();
        return;
    }
    updateViewWithUserInfo(statusAccMode);

    getCaptcha();

}

function viewDidLoadSuccess() {
    //CHANGE BANNER
    logInfo('load login view success');
    document.getElementById("login.txt.username").onblur = function() {
        var loginUser = document.getElementById("login.txt.username");
        var tmpStr = loginUser.value;
        if (tmpStr && tmpStr > 0 && tmpStr.length < 8) {
            loginUser.value = '00000000'.substring(0, 8 - tmpStr.length) + tmpStr;
            tmpStr = loginUser.value;
        }
    };

    // if (gUserInfo.lang == 'EN') {
    //     document.getElementById('login.BannerBottom').innerHTML = '<a href="' + bannersTPBank.bottomBanner[
    //             0].bannerLinkEN + '"><img src="' + bannersTPBank.bottomBanner[0].bannerImageEN +
    //         '"></a>';
    // } else {
    //     document.getElementById('login.BannerBottom').innerHTML = '<a href="' + bannersTPBank.bottomBanner[
    //             0].bannerLinkVN + '"><img src="' + bannersTPBank.bottomBanner[0].bannerImageVN +
    //         '"></a>';
    // }

    // if (Environment.isMobile()){
    //     document.getElementById('versionapp').style.display = 'none';
    // }else {
    //     document.getElementById('versionapp').style.display = 'block';
    // }
}

//METHOD GET CAPCHAR FROM CORE
function getCaptcha() {
    var data = {};
    var arrayArgs = new Array();
    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_GET_CAPCHA"), "", "", "", "", arrayArgs);

    data = getDataFromGprsCmd(gprsCmd);

    requestBackgroundMBServiceCorp('CMD_TYPE_GET_CAPCHA', arrayArgs, requestMBServiceCapchaSuccess,
        requestMBServiceCapchaFail);
}

//event listener: http request success
function requestMBServiceCapchaSuccess(e) {
    gprsResp = parserJSON(e, false);
    var notiCaptcha = document.getElementById("login.txt.captcha");
    var image_captcha = gprsResp.respRaw;

    if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get(
            "CMD_TYPE_GET_CAPCHA")))) {

        current_md5_capcha = gprsResp.arguments[0];
        //notiCaptcha.placeholder = gprsResp.arguments[1];
        notiCaptcha.value = "";
        var tmpCaptcha = document.getElementById('captcha_gen');

        if (tmpCaptcha != undefined && tmpCaptcha != null) {
            tmpCaptcha.setAttribute('src', image_captcha);
        }
    } else if ((gprsResp.respCode != '0') &&
        ((parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_GET_CAPCHA")) || (
            gprsResp.responseType == '-1')))) {
        var tmpCaptcha = document.getElementById('captcha_gen');
        if (tmpCaptcha != undefined && tmpCaptcha != null) {
            tmpCaptcha.setAttribute('src', "./assets/images/re-captcha.png");
        }
    }
};

//event listener: http request fail
function requestMBServiceCapchaFail(e) {
    var tmpCaptcha = document.getElementById('captcha_gen');
    if (tmpCaptcha != undefined && tmpCaptcha != null) {
        tmpCaptcha.setAttribute('src', "./assets/images/re-captcha.png");
    }
    logInfo('FAILED');
};


function updateViewWithUserInfo(inStatus) {

    if (inStatus && gCustomerNanme && gCustomerNanme.length > 0) { // && (getURLParam('payment') != 'order')) {
        document.getElementById('login.txt.username').style.display = 'none';
        document.getElementById('login.txt.username').value = gCustomerNo;

        document.getElementById('login.ico.username').style.display = 'none';
        document.getElementById('login.accountname').style.display = 'inherit';

        var tmpNodeAccName = document.getElementById('login.accountname');
        tmpNodeAccName.innerHTML = gCustomerNanme;

        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.innerHTML =
            "<span class='lnr-checkmark-circle' style='display:table-cell;font-size:18px'></span>" +
            "<h5 class='login-change-user'>" + "   " + CONST_STR.get("WELCOME_CHANGE_USER") +
            "</h5>";
    } else {
        document.getElementById('login.txt.username').style.display = 'block';
        document.getElementById('login.txt.username').value = '';
        document.getElementById('login.ico.username').style.display = 'block';

        document.getElementById('login.accountname').style.display = 'none';

        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.innerHTML =
            "<span class='lnr-cross-circle' style='display:table-cell;font-size:18px'></span>" +
            "<h5 class='login-change-user'>" + "   " + CONST_STR.get("WELCOME_CHANGE_USER_OLD") +
            "</h5>";

    }
}

function changeModeInputAccNo() {
    var tmpStatus = getUserInfoToLocal();
    if (!tmpStatus) {
        var tmpNodeChangeUser = document.getElementById('login.changeaccounttitle');
        tmpNodeChangeUser.style.display = 'none';
        return;
    }
    statusAccMode = !statusAccMode;
    updateViewWithUserInfo(statusAccMode);
}

//handle input
var tmpNodeUser = document.getElementById('login.txt.username');
tmpNodeUser.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);
var tmpNodePass = document.getElementById('login.txt.password');
tmpNodePass.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);
var tmpNodeCaptcha = document.getElementById('login.txt.captcha');
tmpNodeCaptcha.addEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);

function handleSpecialKeyPressd(e) {
    var ew = e.keyPress;
    if (ew == 13) { //Enter pressed
        requestLogin();
    } else {
        return;
    }
}

function requestLogin() {
    if ((!statusAccMode) && (document.getElementById("login.txt.username").value.length == 0)) {
        showAlertText(CONST_STR.get("ERR_EMPTY_ACC_INPUT"));
        return;
    }

    //passing 
    sendJSONRequest();

}

function goToBankInfoMainScr() {
    navController.pushToView('bankinfo/bank-info-main-scr', true);
}

var gprsResp = new GprsRespObj("", "", "", "");

function sendJSONRequest() {

    // collect the form data while iterating over the inputs
    var data = {};
    var arrayArgs = new Array();
    var loginUser = document.getElementById("login.txt.username");
    var loginPass = document.getElementById("login.txt.password");
    var loginCaptcha = document.getElementById("login.txt.captcha");
    var isMobile;
    var checkCaptcha = "N";
    if (Environment.isMobile()){
        isMobile = 1;
    }else {
        isMobile = 0;
    }

    var tmpStr = statusAccMode ? gCustomerNo : loginUser.value;
    if (statusAccMode) loginUser.value = gCustomerNo;
    if (tmpStr.length < 8) {
        loginUser.value = '00000000'.substring(0, 8 - tmpStr.length) + tmpStr;
        tmpStr = loginUser.value;
    }
    if (loginUser.value.length != 8 && loginUser.value.length != 10) {
        showAlertText(CONST_STR.get('ERR_INPUT_FORMAT_ACC'));
        return;
    }

    arrayArgs.push(loginUser.value);

    tmpStr = loginPass.value;
    if (tmpStr.length < 1) {
        showAlertText(CONST_STR.get('ERR_EMPTY_PASSWORD'));
        return;
    }

    if (!checkAvailableChar(tmpStr)) {
        showAlertText(CONST_STR.get('ERR_MSG_WRONG_PASSWORD_FORMAT'));
        return;
    }

    tmpStr = loginCaptcha.value;
    if (intLogin > 1){
        checkCaptcha = 'Y';
        if (tmpStr.length < 1) {
            showAlertText(CONST_STR.get('ERR_EMPTY_CAPTCHA'));
            return;
        }
    }
	//Check phien ban cu
	if(loginUser.value.length == 10 && CONST_BROWSER_MODE && buttonFlag == false) {
		document.getElementsByName('fldLoginUserId')[0].value = loginUser.value;
		document.getElementsByName('fldPassword')[0].value = loginPass.value;
		document.getElementsByName('fldCaptchar')[0].value = loginCaptcha.value;
		document.getElementsByName('fldCaptcharChecksum')[0].value = encodeURIComponent(current_md5_capcha);
		document.getElementById('fldLoginIBForm').setAttribute('action', CONST_WEB_CORP_URL_LINK);
		document.getElementById('fldGoToIBank').click();
		return;
	}
    if (loginUser.value.length == 10 && CONST_BROWSER_MODE) {
        CONST_WEB_SERVICE_LINK = CONST_WEB_CORP_SERVICE_LINK;
        gMBServiceUrl = CONST_WEB_CORP_SERVICE_LINK;
    }

    arrayArgs.push(loginPass.value);

    arrayArgs.push(loginCaptcha.value);

    arrayArgs.push(encodeURIComponent(current_md5_capcha));

    arrayArgs.push(encodeURIComponent(navigator.userAgent));

    arrayArgs.push(checkCaptcha);
    
    arrayArgs.push(isMobile);




    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_LOGIN"), "", "", gUserInfo.lang, "",
        arrayArgs);

    data = getDataFromGprsCmd(gprsCmd);
    loginSuccess(loginUser, loginPass);
    // requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, requestMBServiceFail);

}

function loginSuccess(loginUser, loginPass) {
    var transaction = db.transaction(["user"]);
    var objectStore = transaction.objectStore("user");
    var request = objectStore.get(loginUser.value);

    request.onerror = function(event) {
        // alert("Unable to retrieve daa from database!");
        showAlertText("Mật khẩu của Quý khách không đúng");
    };

    request.onsuccess = function(event) {
        // Do something with the request.result!
        if(request.result && request.result.pass == loginPass.value) {
            gprsResp = jsonData;
            gIsLogin = true;
            // alert("Name: " + request.result.name + ", Age: " + request.result.age + ", Email: " + request.result.email);
            var loginUser = document.getElementById("login.txt.username");
            gCustomerNo = loginUser.value;
            if (gCustomerNo.length == 10) {
                parserLoginInfoCorp();
            } else {
                parserLoginInfo();
            }
            try {
                gSysData = JSON.parse(gprsResp.respJson);
            } catch (e) {}
            setUserInfoToLocal(loginUser.value, gUserInfo.accountName);
            gUserInfo.lang = getLanguageConfig();
            // gIsLogin = true;

            //config view
            setViewOnDesktopWhenLogin();
            stylecssfullpage1();
            document.getElementById('tabHost').innerHTML = "";

            //using to redirect online payment
            if (getURLParam('payment') == 'order') {
                setTimeout(function(e) {
                    navController.initWithRootView('paymentxsl/payment-online-shopping-create',
                        true, 'xsl');
                    navController.setDefaultPage('accountxsl/account-scr', 'xsl');
                }, 1000);

                var btnChangeLang = document.getElementById("btnChangLanguage");
                btnChangeLang.style.display = "none";

                var mobilefooter = document.getElementById("mainlayoutfooter");
                mobilefooter.style.display = "none";
            } else {
                // if (gCustomerNo.length == 8) {
                //     navController.initWithRootView('accountxsl/account-change-password-scr', true,
                //         'xsl');
                // } else if (gCustomerNo.length == 10) {
                //     navController.initWithRootView(
                //         'corp/setup/system/changePassword/set_change_password', true, 'xsl');
                // }
                //20151126 DuyNH Fix Change Language then redirect to HomePage START

                navController.initWithRootView('homepagexsl/homepage-corp-scr', true,'xsl');
                navController.setDefaultPage('homepagexsl/homepage-corp-scr', 'xsl');
                //20151126 DuyNH Fix Change Language then redirect to HomePage END
            }

            var homeBtn = document.getElementById('id.home.btn');
            if (homeBtn != null) {
                homeBtn.style.display = 'block';
            }
        }

        else {
            alert("Kenny couldn't be found in your database!");
        }
    };
}

function requestMBServiceSuccess(e) {
    gprsResp = parserJSON(e);

    if ((parseInt(gprsResp.respCode) == parseInt(RESP.get('COM_SUCCESS'))) && (parseInt(gprsResp.responseType) ==
            parseInt(CONSTANTS.get("CMD_TYPE_LOGIN")))) {
        var loginUser = document.getElementById("login.txt.username");
        gCustomerNo = loginUser.value;
        if (gCustomerNo.length == 10) {
            parserLoginInfoCorp();
        } else {
            parserLoginInfo();
        }

        try {
            gSysData = JSON.parse(gprsResp.respJson);
        } catch (e) {}
        setUserInfoToLocal(loginUser.value, gUserInfo.accountName);
        gUserInfo.lang = getLanguageConfig();
        gIsLogin = true;

        //config view
        setViewOnDesktopWhenLogin();
        document.getElementById('tabHost').innerHTML = "";

        // Chuyen sang man hinh duyet trong TH click vao link o mail
        if (window.location.hash) {
            var action = window.location.hash.substring(1);
            history.pushState("", document.title, window.location.pathname);
            if (action == "authorize" && gUserInfo.userRole.indexOf("CorpAuth") != -1) {
                var authMenu = document.querySelector("#ID6 .langNoStyle");
                if (authMenu != null) {
                    authMenu.className = authMenu.className + " langNoStyleSelected";
                }
                navController.initWithRootView("corp/authorize/auth-transfer", true, "xsl");
            } else {
                gotoHomePage();
            }
        } else {
            gotoHomePage();
        }

        var btnChangeLang = document.getElementById("btnChangLanguage");
        btnChangeLang.style.display = "none";

        var mobilefooter = document.getElementById("mainlayoutfooter");
        mobilefooter.style.display = "none";
        var homeBtn = document.getElementById('id.home.btn');
        if (homeBtn != null) {
            homeBtn.style.display = 'block';
        }
        logInfo('hide lang button - end');
    } else if ((parseInt(gprsResp.respCode) == parseInt(RESP.get('COM_PASSWORD_EXPIRE'))) && (
            parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_LOGIN")))) {

        var loginUser = document.getElementById("login.txt.username");
        gCustomerNo = loginUser.value;
        if (gCustomerNo.length == 10) {
            parserLoginInfoCorp();
        } else {
            parserLoginInfo();
        }
        try {
            gSysData = JSON.parse(gprsResp.respJson);
        } catch (e) {}
        setUserInfoToLocal(loginUser.value, gUserInfo.accountName);
        gUserInfo.lang = getLanguageConfig();
        gIsLogin = true;

        //config view
        setViewOnDesktopWhenLogin();
        document.getElementById('tabHost').innerHTML = "";

        //using to redirect online payment
        if (getURLParam('payment') == 'order') {
            setTimeout(function(e) {
                navController.initWithRootView('paymentxsl/payment-online-shopping-create',
                    true, 'xsl');
                navController.setDefaultPage('accountxsl/account-scr', 'xsl');
            }, 1000);

            var btnChangeLang = document.getElementById("btnChangLanguage");
            btnChangeLang.style.display = "none";

            var mobilefooter = document.getElementById("mainlayoutfooter");
            mobilefooter.style.display = "none";
        } else {
            if (gCustomerNo.length == 8) {
                navController.initWithRootView('accountxsl/account-change-password-scr', true,
                    'xsl');
            } else if (gCustomerNo.length == 10) {
                navController.initWithRootView(
                    'corp/setup/system/changePassword/set_change_password', true, 'xsl');
            }
			//20151126 DuyNH Fix Change Language then redirect to HomePage START
            //navController.setDefaultPage('accountxsl/account-scr', 'xsl');
			navController.setDefaultPage('homepagexsl/homepage-corp-scr', 'xsl');
			//20151126 DuyNH Fix Change Language then redirect to HomePage END
        }

        var homeBtn = document.getElementById('id.home.btn');
        if (homeBtn != null) {
            homeBtn.style.display = 'block';
        }
    } else if (gprsResp.responseType == CONSTANTS.get("CMD_TYPE_LOGIN")) {
        intLoginResposne = gprsResp.arguments[9];

        if(intLoginResposne >= 3){
            intLogin = intLoginResposne;
        }else {
            intLogin = intLogin + 1;
        }


        if(intLogin > 1){
            var inputCaptcha = document.getElementById("trow_capcha");
            inputCaptcha.style.display = 'block';
        }


        getCaptcha();
        var captChar = document.getElementById('login.txt.captcha');
        if (captChar != null) {
            captChar.value = "";
        }
    }

};


//event listener: http request success
function requestMBServiceFail() {

};

function parserLoginInfo() {

    var indx = 0;
    var numAccount = 0;
    var tmpIndx = 0;
    var tmpStr = "";
    var tmpArr = [];

    gUserInfo.sessionID = gprsResp.arguments[indx++];
    gUserInfo.accountName = gprsResp.arguments[indx++];

    //set user name
    document.getElementById('menu-profile-name').innerHTML = "KÍNH CHÀO QUÝ KHÁCH";//gUserInfo.accountName;

    gUserInfo.valicationType = gprsResp.arguments[indx++];
    if (gprsResp.arguments[indx++] == "GOLD_TERM_COMFIRMED") {
        gUserInfo.goldTermConfirmed = true;
    } else {
        gUserInfo.goldTermConfirmed = false;
    }
    gUserInfo.mobileNumber = gprsResp.arguments[indx++];
    gUserInfo.email = gprsResp.arguments[indx++];
    gUserInfo.userRole = gprsResp.arguments[indx++];
    gUserInfo.flag_check = gprsResp.arguments[indx++];
    numAccount = parseInt(gprsResp.arguments[indx++]);
    var tmpArrayNotJumbo = new Array();
    var tmpArrayJumbo = new Array();
    var tmpJumboStatus = false;
    for (var i = indx; i < numAccount + indx; i++) {
        var tmpAccObj = new AccountObj();
        var rawAccInfo = gprsResp.arguments[i];
        if (!rawAccInfo || rawAccInfo.length < 2) {
            continue;
        }
        var arrayAccInfo = rawAccInfo.split("#");
        tmpAccObj.accountNumber = arrayAccInfo[0];
        tmpAccObj.description = arrayAccInfo[1];
        tmpAccObj.balance = arrayAccInfo[2];
        tmpAccObj.balanceAvailable = arrayAccInfo[3];
        tmpAccObj.currency = arrayAccInfo[4];
        tmpAccObj.descByUser = arrayAccInfo[5];
        tmpAccObj.overdraftLimit = arrayAccInfo[6];
        tmpAccObj.accClass = arrayAccInfo[7];
        tmpAccObj.udfFieldVal = arrayAccInfo[8];

        //ngocdt3 bo sung check nodebit
        tmpAccObj.nodebit = arrayAccInfo[10];
        tmpAccObj.noReceive = arrayAccInfo[11];

        if (tmpAccObj.udfFieldVal == "6") {
            tmpArrayJumbo.push(tmpAccObj);
            tmpJumboStatus = true;
        } else {
            //ngocdt3 comment cho hien thi tai khoan 
            //<!--if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass == 'T6A001' || tmpAccObj.accClass == 'D7A000') || (tmpAccObj.currency != 'VND')) {-->
            if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass ==
                    'D7A000') || (tmpAccObj.currency != 'VND')) {
                tmpArrayNotJumbo.push(tmpAccObj);
            } else {
                tmpArrayJumbo.push(tmpAccObj);
            }
        }
        //gUserInfo.accountList.push(tmpAccObj);
        //ngocdt3 comment cho hien thi tai khoan tiet kiem tu dong
        //<!--if(tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'T6A001' && tmpAccObj.accClass != 'D7A000')--> {
        if (tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'D7A000') {
            gUserInfo.accountList.push(tmpAccObj);
            gUserInfo.accountListLocalTrans.push(tmpAccObj);
        } else {
            gUserInfo.accountListOther.push(tmpAccObj);
            //bo sung tai khoan D7A000 vao tai khoan nhan tien
            if (tmpAccObj.accClass == 'D7A000') {
                gUserInfo.accountListLocalTrans.push(tmpAccObj);
            }
        }
    }
    if (tmpJumboStatus) {
        gUserInfo.accountList = tmpArrayJumbo;
        gUserInfo.accountListOther = tmpArrayNotJumbo;
    }
    indx = numAccount + indx;
    //avatar
    gUserInfo.userAvatar = gprsResp.arguments[indx];
    if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 1 && document.getElementById(
            'menu-profile-avatar')) {
        document.getElementById('menu-profile-avatar').innerHTML =
            '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo
            .userAvatar + '" />';
        document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
    }
    //avatar end
    indx++;
    if (gprsResp.arguments[indx] && gprsResp.arguments[indx] == 'MENU') {
        indx++;
        for (var i = indx; i < gprsResp.arguments.length; i++) {
            if (gprsResp.arguments.length > 1) {
                if (gprsResp.arguments[indx] == 'MENU_END') {
                    indx++;
                    break;
                } else {
                    var tmpMenuArr = gprsResp.arguments[i].split('#');
                    var tmpMenuObj = new MenuObj();
                    tmpMenuObj.keyLang = tmpMenuArr[0];
                    tmpMenuObj.menuID = tmpMenuArr[1];
                    tmpMenuObj.parentMenuID = tmpMenuArr[2];
                    tmpMenuObj.iconCode = tmpMenuArr[3];
                    tmpMenuObj.path = tmpMenuArr[4];
                    tmpMenuObj.onClick = tmpMenuArr[5];
                    tmpMenuObj.imgHighlight = tmpMenuArr[6];
                    tmpMenuObj.requireStatus = tmpMenuArr[7];
                    gMenuList.push(tmpMenuObj);

                    indx++;
                }
            }
        }
    }
    logInfo('Menu list length: ' + gMenuList.length);
    var tmpMenuOrder = new Array();
    if (gprsResp.arguments[indx]) {
        for (var i = indx; i < gprsResp.arguments.length; i++) {
            if (gprsResp.arguments[i] == 'MENU_USER_END') {
                indx++;
                break;
            } else {
                tmpMenuOrder = gprsResp.arguments[i].split('#');
                indx++;
            }
        }
    }
    //reorder menu
    if (tmpMenuOrder && tmpMenuOrder.length > 1) {
        gMenuUserOrder = tmpMenuOrder;
        for (var i = 0; i < gMenuList.length; i++) {
            var tmpMenuObj = gMenuList[i];
            if (tmpMenuObj.requireStatus == 'Y' && tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID
                .length == 0) {
                var tmpStatus = false;
                for (var j = 0; j < tmpMenuOrder.length; j++) {
                    if (tmpMenuObj.menuID == tmpMenuOrder[j]) {
                        tmpStatus = true;
                        break;
                    }
                }
                if (!tmpStatus) {
                    gMenuUserOrder.push(tmpMenuObj.menuID);
                }
            }
        }
    } else {
        for (var i = 0; i < gMenuList.length; i++) {
            var tmpMenuObj = gMenuList[i];
            if (tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID.length == 0) {
                gMenuUserOrder.push(tmpMenuObj.menuID);
            }
        }
    }

    genMenuSection();
    //request menu
    /*var arrayArgs = new Array();
    requestBacgroundMBService("CMD_GET_CUSTOMIZE_MENU", arrayArgs, function(e) {
    	//success
    	
    }, function(e){
    	//fail
    	
    });*/

    return true;

    var indxPayment = numAccount + 6;
    var numGroupPaymentService = parseInt(gprsResp.arguments[indxPayment + 1]);
    for (var i = 0; i < numGroupPaymentService; i++) {
        tmpStr = gprsResp.arguments[indxPayment + 2 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 7) {
                var paymentGrp = {
                    groupId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    name: tmpArr[2],
                    description: tmpArr[3],
                    nameEn: tmpArr[4],
                    descriptionEn: tmpArr[5],
                    icon: tmpArr[6]
                };
                gUserInfo.paymentGroupList.push(paymentGrp);
            }
        }
    }

    var numPaymentService = parseInt(gprsResp.arguments[indxPayment + numGroupPaymentService + 2]);
    for (var i = 0; i < numPaymentService; i++) {
        tmpStr = gprsResp.arguments[numGroupPaymentService + indxPayment + 3 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 7) {
                var paymentService = {
                    srvId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    srvName: tmpArr[2],
                    srvDesc: tmpArr[3],
                    srvNameEn: tmpArr[4],
                    srvDescEn: tmpArr[5],
                    icon: tmpArr[6]
                };
                gUserInfo.paymentServiceList.push(paymentService);
            }
        }
    }

    var numProvider = parseInt(gprsResp.arguments[numPaymentService + numGroupPaymentService +
        indxPayment + 3]);
    for (var i = 0; i < numProvider; i++) {
        tmpStr = gprsResp.arguments[numGroupPaymentService + numPaymentService + indxPayment + 4 +
            i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 6) {
                var paymentProvider = {
                    srvId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    prName: tmpArr[2],
                    srvCode: tmpArr[3],
                    prDesc: tmpArr[4],
                    prId: tmpArr[5]
                };
                gUserInfo.paymentProviderList.push(paymentProvider);
            }
        }
    }

    var numFieldForm = parseInt(gprsResp.arguments[numProvider + numPaymentService +
        numGroupPaymentService + indxPayment + 4]);
    for (var i = 0; i < numFieldForm; i++) {
        tmpStr = gprsResp.arguments[numProvider + numPaymentService + numGroupPaymentService +
            indxPayment + 5 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 14) {
                var paymentReqField = {
                    srvCode: tmpArr[0],
                    msgType: tmpArr[1],
                    msgFieldId: tmpArr[2],
                    fieldDesc: tmpArr[3],
                    fieldType: tmpArr[4],
                    fieldLength: tmpArr[5],
                    inputType: tmpArr[6],
                    madatory: tmpArr[7],
                    sortIndex: tmpArr[8],
                    id: tmpArr[9],
                    isAmount: tmpArr[10],
                    fieldDescEn: tmpArr[11],
                    dfltVal: tmpArr[12],
                    id1: tmpArr[13]
                };
                gUserInfo.paymentRequestFieldList.push(paymentReqField);
            }
        }
    }

    var numFieldFormCbo = parseInt(gprsResp.arguments[numFieldForm + numProvider +
        numPaymentService + numGroupPaymentService + indxPayment + 5]);
    for (var i = 0; i < numFieldFormCbo; i++) {
        gUserInfo.paymentRequestFieldCboList.push(gprsResp.arguments[numFieldForm + numProvider +
            numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
        tmpStr = gprsResp.arguments[numFieldForm + numProvider + numPaymentService +
            numGroupPaymentService + indxPayment + 6 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 4) {
                var paymentReqFieldCbo = {
                    id: tmpArr[0],
                    mapId: tmpArr[1],
                    fieldVal: tmpArr[2],
                    fieldDesc: tmpArr[3]
                };
                gUserInfo.paymentRequestFieldCboList.push(paymentReqFieldCbo);
            }
        }
    }

    var numFieldFormHistory = parseInt(gprsResp.arguments[numFieldFormCbo + numFieldForm +
        numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6]);
    for (var i = 0; i < numFieldFormHistory; i++) {
        gUserInfo.paymentFieldHistoryList.push(gprsResp.arguments[numFieldFormCbo + numFieldForm +
            numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
    }

    return true;
}

//Handle change password with response code 210

function handleAlertChangePasswordPressedOK(evt) {
    if (currentPage == "login-scr") {
        if (gCustomerNo.length == 8) {
            navController.pushToView('accountxsl/account-change-password-scr', true, 'xsl');
        } else if (gCustomerNo.length == 10) {
            navController.pushToView('corp/setup/system/changePassword/set_change_password', true,
                'xsl');
        }

    }
}

function handleAlertChangePasswordPressedCancel(evt) {
    if (currentPage == "login-scr") {
        gIsLogin = true;
        var tmpPageName = navController.getDefaultPage();
        var tmpPageType = navController.getDefaultPageType();
        navController.initWithRootView(tmpPageName, true, tmpPageType);
        //show slide menu button
        var btnSlideMenu = document.getElementById("nav.btn.showslidemenu");
        btnSlideMenu.style.display = "block";
    }
}

function goTerms() {
    showAlertKHCN_KHDN_TERMS(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goInstruction() {
    showAlertKHCN_KHDN_INSTRUCTION(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goFAQ() {
    showAlertKHCN_KHDN_FAQ(CONST_STR.get('ALERT_KHCN_KHDN_TITLE'));
}

function goForgotPassword() {
    navController.initWithRootView('corp/setup/system/forgotPassword/forgot-pw-scr', true, 'xsl');
}

function goSignup() {
    openLinkInWindows('https://applynow.tpb.vn/');
}

// Parse thong tin user (doanh nghiep)
function parserLoginInfoCorp() {

    var indx = 0;
    var numAccount = 0;
    var tmpIndx = 0;
    var tmpStr = "";
    var tmpArr = [];

    gUserInfo.sessionID = gprsResp.arguments[indx++];
    gUserInfo.accountInfo = eval("(" + gprsResp.arguments[indx++] + ")");
    gUserInfo.accountName = gUserInfo.accountInfo.customerName;

    //set user name
    document.getElementById('menu-profile-name').innerHTML = "KÍNH CHÀO QUÝ KHÁCH";//gUserInfo.accountName;

    gUserInfo.valicationType = gprsResp.arguments[indx++];
    if (gprsResp.arguments[indx++] == "GOLD_TERM_COMFIRMED") {
        gUserInfo.goldTermConfirmed = true;
    } else {
        gUserInfo.goldTermConfirmed = false;
    }
    gUserInfo.mobileNumber = gprsResp.arguments[indx++];
    gUserInfo.email = gprsResp.arguments[indx++];
    gUserInfo.userRole = gprsResp.arguments[indx++];
    numAccount = parseInt(gprsResp.arguments[indx++]);
    var tmpArrayNotJumbo = new Array();
    var tmpArrayJumbo = new Array();
    var tmpJumboStatus = false;
    for (var i = indx; i < numAccount + indx; i++) {
        var tmpAccObj = new AccountObj();
        var rawAccInfo = gprsResp.arguments[i];
        if (!rawAccInfo || rawAccInfo.length < 2) {
            continue;
        }
        var arrayAccInfo = rawAccInfo.split("#");
        tmpAccObj.accountNumber = arrayAccInfo[0];
        tmpAccObj.description = arrayAccInfo[1];
        tmpAccObj.balance = arrayAccInfo[2];
        tmpAccObj.balanceAvailable = arrayAccInfo[3];
        tmpAccObj.currency = arrayAccInfo[4];
        tmpAccObj.descByUser = arrayAccInfo[5];
        tmpAccObj.overdraftLimit = arrayAccInfo[6];
        tmpAccObj.accClass = arrayAccInfo[7];
        tmpAccObj.udfFieldVal = arrayAccInfo[8];

        //ngocdt3 bo sung check nodebit
        tmpAccObj.nodebit = arrayAccInfo[10];
        tmpAccObj.noReceive = arrayAccInfo[11];

        if (tmpAccObj.udfFieldVal == "6") {
            tmpArrayJumbo.push(tmpAccObj);
            tmpJumboStatus = true;
        } else {
            //ngocdt3 comment cho hien thi tai khoan 
            //<!--if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass == 'T6A001' || tmpAccObj.accClass == 'D7A000') || (tmpAccObj.currency != 'VND')) {-->
            if (((parseInt(tmpAccObj.overdraftLimit) > 0) && arrayAccInfo[9] == 1) || (tmpAccObj.accClass ==
                    'D7A000') || (tmpAccObj.currency != 'VND')) {
                tmpArrayNotJumbo.push(tmpAccObj);
            } else {
                tmpArrayJumbo.push(tmpAccObj);
            }
        }
        //gUserInfo.accountList.push(tmpAccObj);
        //ngocdt3 comment cho hien thi tai khoan tiet kiem tu dong
        //<!--if(tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'T6A001' && tmpAccObj.accClass != 'D7A000')--> {
        if (tmpAccObj.currency == 'VND' && tmpAccObj.accClass != 'D7A000') {
            gUserInfo.accountList.push(tmpAccObj);
            gUserInfo.accountListLocalTrans.push(tmpAccObj);
        } else {
            gUserInfo.accountListOther.push(tmpAccObj);
            //bo sung tai khoan D7A000 vao tai khoan nhan tien
            if (tmpAccObj.accClass == 'D7A000') {
                gUserInfo.accountListLocalTrans.push(tmpAccObj);
            }
        }
    }
    if (tmpJumboStatus) {
        gUserInfo.accountList = tmpArrayJumbo;
        gUserInfo.accountListOther = tmpArrayNotJumbo;
    }
    indx = numAccount + indx;
    //avatar
    gUserInfo.userAvatar = gprsResp.arguments[indx];
    if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 1 && document.getElementById(
            'menu-profile-avatar')) {
        document.getElementById('menu-profile-avatar').innerHTML =
            '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo
            .userAvatar + '" />';
        document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
    }
    //avatar end
    indx++;
    if (gprsResp.arguments[indx] && gprsResp.arguments[indx] == 'MENU') {
        indx++;
        for (var i = indx; i < gprsResp.arguments.length; i++) {
            if (gprsResp.arguments.length > 1) {
                if (gprsResp.arguments[indx] == 'MENU_END') {
                    indx++;
                    break;
                } else {
                    var tmpMenuArr = gprsResp.arguments[i].split('#');
                    
                    var tmpMenuObj = new MenuObj();
                    tmpMenuObj.keyLang = tmpMenuArr[0];
                    tmpMenuObj.menuID = tmpMenuArr[1];
                    tmpMenuObj.parentMenuID = tmpMenuArr[2];
                    tmpMenuObj.iconCode = tmpMenuArr[3];
                    tmpMenuObj.path = tmpMenuArr[4];
                    if (tmpMenuArr[1] == "ID12" && CONST_BROWSER_MODE == false) {
                        tmpMenuObj.onClick = "highlightSelectedMenu(this);navController.initWithRootView('corp/transfer/batch/mng/batch-transfer-mng-scr', true, 'xsl');"
                    } else {
                        tmpMenuObj.onClick = "highlightSelectedMenu(this);" + tmpMenuArr[5];
                    }
                    tmpMenuObj.imgHighlight = tmpMenuArr[6];
                    tmpMenuObj.requireStatus = tmpMenuArr[7];
                    gMenuList.push(tmpMenuObj);

                    indx++;
                }
            }
        }
    }
    logInfo('Menu list length: ' + gMenuList.length);
    var tmpMenuOrder = new Array();
    if (gprsResp.arguments[indx]) {
        for (var i = indx; i < gprsResp.arguments.length; i++) {
            if (gprsResp.arguments[i] == 'MENU_USER_END') {
                indx++;
                break;
            } else {
                tmpMenuOrder = gprsResp.arguments[i].split('#');
                indx++;
            }
        }
    }
    //reorder menu
    if (tmpMenuOrder && tmpMenuOrder.length > 1) {
        gMenuUserOrder = tmpMenuOrder;
        for (var i = 0; i < gMenuList.length; i++) {
            var tmpMenuObj = gMenuList[i];
            if (tmpMenuObj.requireStatus == 'Y' && tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID
                .length == 0) {
                var tmpStatus = false;
                for (var j = 0; j < tmpMenuOrder.length; j++) {
                    if (tmpMenuObj.menuID == tmpMenuOrder[j]) {
                        tmpStatus = true;
                        break;
                    }
                }
                if (!tmpStatus) {
                    gMenuUserOrder.push(tmpMenuObj.menuID);
                }
            }
        }
    } else {
        for (var i = 0; i < gMenuList.length; i++) {
            var tmpMenuObj = gMenuList[i];
            if (tmpMenuObj.menuID.length > 0 && tmpMenuObj.parentMenuID.length == 0) {
                gMenuUserOrder.push(tmpMenuObj.menuID);
            }
        }
    }

    genMenuSection();
    //request menu
    /*var arrayArgs = new Array();
    requestBacgroundMBService("CMD_GET_CUSTOMIZE_MENU", arrayArgs, function(e) {
    	//success
    	
    }, function(e){
    	//fail
    	
    });*/

    return true;

    var indxPayment = numAccount + 6;
    var numGroupPaymentService = parseInt(gprsResp.arguments[indxPayment + 1]);
    for (var i = 0; i < numGroupPaymentService; i++) {
        tmpStr = gprsResp.arguments[indxPayment + 2 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 7) {
                var paymentGrp = {
                    groupId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    name: tmpArr[2],
                    description: tmpArr[3],
                    nameEn: tmpArr[4],
                    descriptionEn: tmpArr[5],
                    icon: tmpArr[6]
                };
                gUserInfo.paymentGroupList.push(paymentGrp);
            }
        }
    }

    var numPaymentService = parseInt(gprsResp.arguments[indxPayment + numGroupPaymentService + 2]);
    for (var i = 0; i < numPaymentService; i++) {
        tmpStr = gprsResp.arguments[numGroupPaymentService + indxPayment + 3 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 7) {
                var paymentService = {
                    srvId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    srvName: tmpArr[2],
                    srvDesc: tmpArr[3],
                    srvNameEn: tmpArr[4],
                    srvDescEn: tmpArr[5],
                    icon: tmpArr[6]
                };
                gUserInfo.paymentServiceList.push(paymentService);
            }
        }
    }

    var numProvider = parseInt(gprsResp.arguments[numPaymentService + numGroupPaymentService +
        indxPayment + 3]);
    for (var i = 0; i < numProvider; i++) {
        tmpStr = gprsResp.arguments[numGroupPaymentService + numPaymentService + indxPayment + 4 +
            i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 6) {
                var paymentProvider = {
                    srvId: tmpArr[0],
                    srvGroup: tmpArr[1],
                    prName: tmpArr[2],
                    srvCode: tmpArr[3],
                    prDesc: tmpArr[4],
                    prId: tmpArr[5]
                };
                gUserInfo.paymentProviderList.push(paymentProvider);
            }
        }
    }

    var numFieldForm = parseInt(gprsResp.arguments[numProvider + numPaymentService +
        numGroupPaymentService + indxPayment + 4]);
    for (var i = 0; i < numFieldForm; i++) {
        tmpStr = gprsResp.arguments[numProvider + numPaymentService + numGroupPaymentService +
            indxPayment + 5 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 14) {
                var paymentReqField = {
                    srvCode: tmpArr[0],
                    msgType: tmpArr[1],
                    msgFieldId: tmpArr[2],
                    fieldDesc: tmpArr[3],
                    fieldType: tmpArr[4],
                    fieldLength: tmpArr[5],
                    inputType: tmpArr[6],
                    madatory: tmpArr[7],
                    sortIndex: tmpArr[8],
                    id: tmpArr[9],
                    isAmount: tmpArr[10],
                    fieldDescEn: tmpArr[11],
                    dfltVal: tmpArr[12],
                    id1: tmpArr[13]
                };
                gUserInfo.paymentRequestFieldList.push(paymentReqField);
            }
        }
    }

    var numFieldFormCbo = parseInt(gprsResp.arguments[numFieldForm + numProvider +
        numPaymentService + numGroupPaymentService + indxPayment + 5]);
    for (var i = 0; i < numFieldFormCbo; i++) {
        gUserInfo.paymentRequestFieldCboList.push(gprsResp.arguments[numFieldForm + numProvider +
            numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
        tmpStr = gprsResp.arguments[numFieldForm + numProvider + numPaymentService +
            numGroupPaymentService + indxPayment + 6 + i];

        if (tmpStr != undefined) {
            tmpArr = tmpStr.split("#");

            if (tmpArr.length == 4) {
                var paymentReqFieldCbo = {
                    id: tmpArr[0],
                    mapId: tmpArr[1],
                    fieldVal: tmpArr[2],
                    fieldDesc: tmpArr[3]
                };
                gUserInfo.paymentRequestFieldCboList.push(paymentReqFieldCbo);
            }
        }
    }

    var numFieldFormHistory = parseInt(gprsResp.arguments[numFieldFormCbo + numFieldForm +
        numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6]);
    for (var i = 0; i < numFieldFormHistory; i++) {
        gUserInfo.paymentFieldHistoryList.push(gprsResp.arguments[numFieldFormCbo + numFieldForm +
            numProvider + numPaymentService + numGroupPaymentService + indxPayment + 6 + i]);
    }

    return true;
}

//Button: Phien ban moi - Phien ban cu
function onClickNewButton(){
	buttonFlag = true;
	document.getElementById("btnNewVersion").className = "btn-version btn-ver-left ver-active";
	document.getElementById("btnOldVersion").className = "btn-version btn-ver-right ver-deactive";
	showAlertText(CONST_STR.get("COM_MSG_ALERT_VERSION") + CONST_STR.get("COM_NEW_VERSION"));
}

function onClickOldButton(){
	buttonFlag = false;
	document.getElementById("btnNewVersion").className = "btn-version btn-ver-left ver-deactive";
	document.getElementById("btnOldVersion").className = "btn-version btn-ver-right ver-active";
	showAlertText(CONST_STR.get("COM_MSG_ALERT_VERSION") + CONST_STR.get("COM_OLD_VERSION"));
}