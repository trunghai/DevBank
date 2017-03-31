/**
 * Created by HuyNT2.
 * User:
 * Date: 12/17/13
 * Time: 5:35 PM
 */

/*common*/

/*** DETECT DEVICE Environment.isMobile()***/

var Environment = {
    //mobile or desktop compatible event name, to be used with '.on' function
    TOUCH_DOWN_EVENT_NAME:'mousedown touchstart',
    TOUCH_UP_EVENT_NAME:'mouseup touchend',
    TOUCH_MOVE_EVENT_NAME:'mousemove touchmove',
    TOUCH_DOUBLE_TAB_EVENT_NAME:'dblclick dbltap',
    isAndroid:function () {
        return navigator.userAgent.match(/Android/i);
    },
    isBlackBerry:function () {
        return navigator.userAgent.match(/BlackBerry|BB10/i);
    },
    isIOS:function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    isOpera:function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    isWindows:function () {
        return navigator.userAgent.match(/IEMobile|WPDesktop/i);
    },
    isMobile:function () {
        return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isWindows());
    }
};
//Environment.isAndroid() && !Environment.isWindows //Environment.isMobile()
//Check iOS version
function iOSversion() {
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    // supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
    var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    //return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	return parseInt(v[1], 10);
  }
}
/*
ver = iOSversion();

if (ver[0] >= 5) {
  alert('This is running iOS 5 or later.');
}
*/

// Android Mobile
var isAndroidMobile = navigator.userAgent.indexOf('Android') > -1 && navigator.userAgent.indexOf('Mozilla/5.0') > -1 && navigator.userAgent.indexOf('AppleWebKit') > -1;

// Android Browser (not Chrome)
var regExAppleWebKit = new RegExp(/AppleWebKit\/([\d.]+)/);
var resultAppleWebKitRegEx = regExAppleWebKit.exec(navigator.userAgent);
var appleWebKitVersion = (resultAppleWebKitRegEx === null ? null : parseFloat(regExAppleWebKit.exec(navigator.userAgent)[1]));
var isAndroidBrowserAbove4 = isAndroidMobile && appleWebKitVersion !== null && appleWebKitVersion >= 534;

// first get the size from the window
// if that didnt work, get it from the body
var ScreenSize = {
    width:window.innerWidth || document.body.clientWidth,
    height:window.innerHeight || document.body.clientHeight,
    isRetina:function () {
        if (window.matchMedia) { //define retina with pixel ratio = 1.3
            var mq = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
            if (mq && mq.matches || (window.devicePixelRatio > 1)) {
                return true;
            } else {
                return false;
            }
        }
    }
}

//Full detect browser
!function (name, definition) {
    if (typeof define == 'function') define(definition);
    else if (typeof module != 'undefined' && module.exports) module.exports.browser = definition();
    else this[name] = definition();
}('bowser', function () {
    /**
     * navigator.userAgent =>
     * Chrome:  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.57 Safari/534.24"
     * Opera:   "Opera/9.80 (Macintosh; Intel Mac OS X 10.6.7; U; en) Presto/2.7.62 Version/11.01"
     * Safari:  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1"
     * IE:      "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C)"
     * IE>=11:  "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; Media Center PC 6.0; rv:11.0) like Gecko"
     * Firefox: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:2.0) Gecko/20100101 Firefox/4.0"
     * BlackBerry10: "Mozilla/5.0 (BB10; <Device Type>) AppleWebKit/537.10+ (KHTML, like Gecko) Version/<BB Version #> Mobile Safari/537.10+"
     * BlackBerry TabletOS: "Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+"
     * iPhone:  "Mozilla/5.0 (iPhone Simulator; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5"
     * iPad:    "Mozilla/5.0 (iPad; U; CPU OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5",
     * Android: "Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile G2 Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
     * Touchpad: "Mozilla/5.0 (hp-tabled;Linux;hpwOS/3.0.5; U; en-US)) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/234.83 Safari/534.6 TouchPad/1.0"
     * PhantomJS: "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.5.0 Safari/534.34"
     */

    var ua = navigator.userAgent,
        t = true,
        ie = /(msie|trident)/i.test(ua),
        iemobile = /(iemobile)/i.test(ua),
        chrome = /chrome|crios/i.test(ua),
        phantom = /phantom/i.test(ua),
        safari = /safari/i.test(ua) && !chrome && !phantom,
        iphone = /iphone/i.test(ua),
        ipod = /ipod/i.test(ua),
        ipad = /ipad/i.test(ua),
        touchpad = /touchpad/i.test(ua),
        android = /android/i.test(ua),
        blackberry = /blackberry|bb10/i.test(ua),
        opera = /opera/i.test(ua) || /opr/i.test(ua),
        firefox = /firefox/i.test(ua),
        gecko = /gecko\//i.test(ua),
        seamonkey = /seamonkey\//i.test(ua),
        webkitVersion = /version\/(\d+(\.\d+)?)/i,
        firefoxVersion = /firefox\/(\d+(\.\d+)?)/i,
        o;

    function detect() {

        if (ie) return {
            name:'IE',
            msie:t,
            version:ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]
        };
        if (iemobile) return {
            name:'IEMobile',
            msie:t,
            version:ua.match(/(msie |rv:)(\d+(\.\d+)?)/i)[2]
        };
        if (opera) return {
            name:'Opera',
            opera:t,
            version:ua.match(webkitVersion) ? ua.match(webkitVersion)[1] : ua.match(/opr\/(\d+(\.\d+)?)/i)[1]
        };
        if (chrome) return {
            name:'Chrome',
            webkit:t,
            chrome:t,
            version:ua.match(/(?:chrome|crios)\/(\d+(\.\d+)?)/i)[1]
        };
        if (phantom) return {
            name:'PhantomJS',
            webkit:t,
            phantom:t,
            version:ua.match(/phantomjs\/(\d+(\.\d+)+)/i)[1]
        };
        if (touchpad) return {
            name:'TouchPad',
            webkit:t,
            touchpad:t,
            version:ua.match(/touchpad\/(\d+(\.\d+)?)/i)[1]
        };
        if (blackberry) return {
            name:'BlackBerry',
            webkit:t,
            touchpad:t,
            version:ua.match(/blackberry\/(\d+(\.\d+)?)/i)[1]
        };
        if (iphone || ipad || ipod) {
            o = {
                name:ipad ? 'iPad' : 'iPhone',
                webkit:t,
                mobile:t,
                ios:t,
                iphone:iphone,
                ipad:ipad
            };
            // WTF: version is not part of user agent in web apps
            if (webkitVersion.test(ua)) {
                o.version = ua.match(webkitVersion)[1];
            }
            return o;
        }
        if (android) return {
            name:'Android',
            webkit:t,
            android:t,
            mobile:t,
            version:(ua.match(webkitVersion) || ua.match(firefoxVersion))[1]
        };
        if (safari) return {
            name:'Safari',
            webkit:t,
            safari:t,
            version:ua.match(webkitVersion)[1]
        };
        if (gecko) {
            o = {
                name:'Gecko',
                gecko:t,
                mozilla:t,
                version:ua.match(firefoxVersion)[1]
            };
            if (firefox) {
                o.name = 'Firefox';
                o.firefox = t;
            }
            return o;
        }
        if (seamonkey) return {
            name:'SeaMonkey',
            seamonkey:t,
            version:ua.match(/seamonkey\/(\d+(\.\d+)?)/i)[1]
        };
        return {};
    }

    var bowser = detect();

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((bowser.msie && bowser.version >= 8) ||
        (bowser.chrome && bowser.version >= 10) ||
        (bowser.firefox && bowser.version >= 4.0) ||
        (bowser.safari && bowser.version >= 5) ||
        (bowser.opera && bowser.version >= 10.0)) {
        bowser.a = t;
    }

    else if ((bowser.msie && bowser.version < 8) ||
        (bowser.chrome && bowser.version < 10) ||
        (bowser.firefox && bowser.version < 4.0) ||
        (bowser.safari && bowser.version < 5) ||
        (bowser.opera && bowser.version < 10.0)) {
        bowser.c = t;
    } else bowser.x = t;

    return bowser;
});
//alert(JSON.stringify(bowser, null, '    '));

/*** DETECT DEVICE END ***/

/*** limit input text length ***/
function textLimit(field, maxlen) {
    //if (field.value.length > maxlen)
    //alert("Giới hạn ký tự " + maxlen);
        if (field.value.length > maxlen)
            field.value = field.value.substring(0, maxlen);
}
/*** INPUT HANDLE ***/
var evtSpecialKeyPressed = document.createEvent('Event');
evtSpecialKeyPressed.initEvent('evtSpecialKeyPressed', true, true);

function setInputOnlyASCII(inID, inAlert, inputNormalCharFunc, inputSpecCharFunc) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) {
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
			//fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
			if(typeof(inputSpecCharFunc) == 'function') {
				inputSpecCharFunc(ew);
			}
		}
		//inputNode.value = removeSpecialChar(inputNode.value);
		var str = String.fromCharCode(ew);
		//if(str.match(/^[a-zA-Z0-9]*$/) || (ew == 8) || (ew == 46))  {
		if(str.match(/^[a-zA-Z0-9-.,*\(\)]*$/) || (ew == 8) || (ew == 46))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccent(inputNode.value);
			if(typeof(inputNormalCharFunc) == 'function') {
				inputNormalCharFunc();//CALL THIS FUNC TO FILLTER DATA FOR DIALOG WITH INPUT FORM
			}
			
			return true;
		}
		else {
			return false;
		}
		//inputNode.value = removeAccent(inputNode.value);
		
        //return false;
    };
}
//ngocdt them cho chuyen tien lien ngan hang
function setInputOnlyASCIILNH(inID, inAlert, inputNormalCharFunc, inputSpecCharFunc) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) {
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
			//fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
			if(typeof(inputSpecCharFunc) == 'function') {
				inputSpecCharFunc(ew);
			}
		}
		//inputNode.value = removeSpecialChar(inputNode.value);
		var str = String.fromCharCode(ew);
		//if(str.match(/^[a-zA-Z0-9]*$/) || (ew == 8) || (ew == 46))  {
		
		if(str.match(/^[a-zA-Z0-9-.,*&\(\)]*$/) || (ew == 8) || (ew == 46))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccentLNH(inputNode.value);
			if(typeof(inputNormalCharFunc) == 'function') {
				inputNormalCharFunc();//CALL THIS FUNC TO FILLTER DATA FOR DIALOG WITH INPUT FORM
			}
			
			return true;
		}
		else {
			return false;
		}
		//inputNode.value = removeAccent(inputNode.value);
		
        //return false;
    };
}
function removeAccentLNH(sText) {
	var sNewText=new String(sText);
	sNewText=regReplace(sNewText,"à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a");
	sNewText=regReplace(sNewText,"À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ", "A");
	sNewText=regReplace(sNewText,"è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e");
	sNewText=regReplace(sNewText,"È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ", "E");
	sNewText=regReplace(sNewText,"ì|í|ị|ỉ|ĩ", "i");
	sNewText=regReplace(sNewText,"Ì|Í|Ị|Ỉ|Ĩ", "I");
	sNewText=regReplace(sNewText,"ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o");
	sNewText=regReplace(sNewText,"Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ", "O");
	sNewText=regReplace(sNewText,"ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u");
	sNewText=regReplace(sNewText,"Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ", "U");
	sNewText=regReplace(sNewText,"ỳ|ý|ỵ|ỷ|ỹ", "y");
	sNewText=regReplace(sNewText,"Ỳ|Ý|Ỵ|Ỷ|Ỹ", "Y");
	sNewText=regReplace(sNewText,"Đ", "D");
	sNewText=regReplace(sNewText,"đ", "d");
	//sNewText = removeSpecialCharForText(sNewText);
	sNewText = sNewText.replace(/[!"#$%'\+:;<=>?@\\`^~{|}]/g, ''); //!"#$%&'+/:;<=>?@[\]`^{|}~   //-.*,()
	return sNewText;
	
}
//ngocdt3 bo sung cho phep nhap ky tu @ khi nhap email trong tinh nang thay doi thong tin ca nhan
function setInputOnlyASCIIinfo(inID, inAlert, inputNormalCharFunc, inputSpecCharFunc) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) {
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
			//fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
			if(typeof(inputSpecCharFunc) == 'function') {
				inputSpecCharFunc(ew);
			}
		}
		//inputNode.value = removeSpecialChar(inputNode.value);
		var str = String.fromCharCode(ew);
		//if(str.match(/^[a-zA-Z0-9]*$/) || (ew == 8) || (ew == 46))  {
		
		if(str.match(/^[a-zA-Z0-9-.,*@\(\)]*$/) || (ew == 8) || (ew == 46))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccentinfo(inputNode.value);
			if(typeof(inputNormalCharFunc) == 'function') {
				inputNormalCharFunc();//CALL THIS FUNC TO FILLTER DATA FOR DIALOG WITH INPUT FORM
			}
			
			return true;
		}
		else {
			return false;
		}
		//inputNode.value = removeAccent(inputNode.value);
		
        //return false;
    };
}
function removeAccentinfo(sText) {
	var sNewText=new String(sText);
	sNewText=regReplace(sNewText,"à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a");
	sNewText=regReplace(sNewText,"À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ", "A");
	sNewText=regReplace(sNewText,"è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e");
	sNewText=regReplace(sNewText,"È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ", "E");
	sNewText=regReplace(sNewText,"ì|í|ị|ỉ|ĩ", "i");
	sNewText=regReplace(sNewText,"Ì|Í|Ị|Ỉ|Ĩ", "I");
	sNewText=regReplace(sNewText,"ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o");
	sNewText=regReplace(sNewText,"Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ", "O");
	sNewText=regReplace(sNewText,"ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u");
	sNewText=regReplace(sNewText,"Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ", "U");
	sNewText=regReplace(sNewText,"ỳ|ý|ỵ|ỷ|ỹ", "y");
	sNewText=regReplace(sNewText,"Ỳ|Ý|Ỵ|Ỷ|Ỹ", "Y");
	sNewText=regReplace(sNewText,"Đ", "D");
	sNewText=regReplace(sNewText,"đ", "d");
	//sNewText = removeSpecialCharForText(sNewText);
	sNewText = sNewText.replace(/[!"#$%'\+:;<=>?\\`^~{|}]/g, ''); //!"#$%&'+/:;<=>?@[\]`^{|}~   //-.*,()
	return sNewText;
	
}
function removeAccent(sText) {
	var sNewText=new String(sText);
	sNewText=regReplace(sNewText,"à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a");
	sNewText=regReplace(sNewText,"À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ", "A");
	sNewText=regReplace(sNewText,"è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e");
	sNewText=regReplace(sNewText,"È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ", "E");
	sNewText=regReplace(sNewText,"ì|í|ị|ỉ|ĩ", "i");
	sNewText=regReplace(sNewText,"Ì|Í|Ị|Ỉ|Ĩ", "I");
	sNewText=regReplace(sNewText,"ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o");
	sNewText=regReplace(sNewText,"Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ", "O");
	sNewText=regReplace(sNewText,"ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u");
	sNewText=regReplace(sNewText,"Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ", "U");
	sNewText=regReplace(sNewText,"ỳ|ý|ỵ|ỷ|ỹ", "y");
	sNewText=regReplace(sNewText,"Ỳ|Ý|Ỵ|Ỷ|Ỹ", "Y");
	sNewText=regReplace(sNewText,"Đ", "D");
	sNewText=regReplace(sNewText,"đ", "d");
	//sNewText = removeSpecialCharForText(sNewText);
	sNewText = sNewText.replace(/[!"#$%&'\+:;<=>?@\\`^~{|}]/g, ''); //!"#$%&'+/:;<=>?@[\]`^{|}~   //-.*,()
	return sNewText;
	
}
//ngocdt3 bo sung chan k cho nhap dau cach, dau cham o cac phan input thanh toan hoa don
function setInputOnlyASCIIBLL(inID, inAlert, inputNormalCharFunc, inputSpecCharFunc) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) {
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		 if (ew == 46) //space key
            return false; 
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
			if(typeof(inputSpecCharFunc) == 'function') {
				inputSpecCharFunc(ew);
			}
		}
		var str = String.fromCharCode(ew);
		if(str.match(/^[a-zA-Z0-9-,*\(\)]*$/) || (ew == 8))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccentBBL(inputNode.value);
			if(typeof(inputNormalCharFunc) == 'function') {
				inputNormalCharFunc();//CALL THIS FUNC TO FILLTER DATA FOR DIALOG WITH INPUT FORM
			}
			
			return true;
		}
		else {
			return false;
		}

    };
}

function removeAccentBBL(sText) {
	var sNewText=new String(sText);
	sNewText=regReplace(sNewText,"à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ", "a");
	sNewText=regReplace(sNewText,"À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ", "A");
	sNewText=regReplace(sNewText,"è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ", "e");
	sNewText=regReplace(sNewText,"È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ", "E");
	sNewText=regReplace(sNewText,"ì|í|ị|ỉ|ĩ", "i");
	sNewText=regReplace(sNewText,"Ì|Í|Ị|Ỉ|Ĩ", "I");
	sNewText=regReplace(sNewText,"ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ", "o");
	sNewText=regReplace(sNewText,"Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ", "O");
	sNewText=regReplace(sNewText,"ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ", "u");
	sNewText=regReplace(sNewText,"Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ", "U");
	sNewText=regReplace(sNewText,"ỳ|ý|ỵ|ỷ|ỹ", "y");
	sNewText=regReplace(sNewText,"Ỳ|Ý|Ỵ|Ỷ|Ỹ", "Y");
	sNewText=regReplace(sNewText,"Đ", "D");
	sNewText=regReplace(sNewText,"đ", "d");
	//sNewText = removeSpecialCharForText(sNewText);
	sNewText = sNewText.replace(/[!"#$%&'\+:;<=>?@\\`^~{|}.]/g, ''); //!"#$%&'+/:;<=>?@[\]`^{|}~   //-.*,()
	return sNewText;
	
}
function setInputOnlyNumberBBL(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeypress = function (e) {
		//e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
        if (ew == 8 || ew == 37 || ew == 38 || ew == 39 || ew == 40) //backspace key
            return true;
		 if (ew == 32 || ew == 46) //space key
            return false;
        if (48 <= ew && ew <= 57)
            return true;
        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            //fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
            return true;
        }
        if ((inAlert != undefined) && (inAlert != null) && (inAlert.length > 0)) {
            showAlertText(inAlert);
        }
        return false;
    };
}
function setInputOnlyNumberTopup(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeypress = function (e) {
		//e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
        if (ew == 8 || ew == 46 || ew == 37 || ew == 38 || ew == 39 || ew == 40) //backspace key
            return true;
        if (48 <= ew && ew <= 57)
            return true;
		 if (ew == 64)//ky tu @
            return true;
        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            //fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
            return true;
        }
        if ((inAlert != undefined) && (inAlert != null) && (inAlert.length > 0)) {
            showAlertText(inAlert);
        }
        return false;
    };
}

//ngocdt3 end
function removeAccentff(sText) {
	var sNewText=new String(sText);
	sNewText=regReplace(sNewText,"&quot;", '"');
   
    //sNewText=regReplace(sNewText,"<br />", '\n');
	 //sNewText=regReplace(sNewText,"<br>", "\n");
	 sNewText=regReplace(sNewText,"&lt;br /&gt;", "<br>");
	 sNewText=regReplace(sNewText,"&amp;&nbsp;", " ");
    sNewText=regReplace(sNewText,"&lt;", "<");
	sNewText=regReplace(sNewText,"&gt;", ">");
	
	sNewText=regReplace(sNewText,"&nbsp;", " ");
	sNewText=regReplace(sNewText,"&iexcl;", "i");
	sNewText=regReplace(sNewText,"&macr;", "-");
	sNewText=regReplace(sNewText,"&ordf", "a");
	sNewText=regReplace(sNewText,"&plusmn;", "+|-");
	sNewText=regReplace(sNewText,"&sup1;", "1");
	sNewText=regReplace(sNewText,"&sup2;", "2");
	sNewText=regReplace(sNewText,"&sup3;", "3");
	sNewText=regReplace(sNewText,"&ordm", "0");
	sNewText=regReplace(sNewText,"&raquo", "»");
	sNewText=regReplace(sNewText,"&frac14", "1/4");
	sNewText=regReplace(sNewText,"&frac12", "1/2");
	sNewText=regReplace(sNewText,"&frac34", "3/4");
	sNewText=regReplace(sNewText,"&times;", "x");
	sNewText=regReplace(sNewText,"&divide;", "÷");
	sNewText=regReplace(sNewText,"&Agrave;", "À");
	sNewText=regReplace(sNewText,"&Aacute;", "Á");
	sNewText=regReplace(sNewText,"&Acirc;", "Â");
	sNewText=regReplace(sNewText,"&Atilde;", "Ã");
	sNewText=regReplace(sNewText,"&Auml;", "Ä");
	sNewText=regReplace(sNewText,"&Aring;", "Å");
	sNewText=regReplace(sNewText,"&AElig;", "Æ");
	sNewText=regReplace(sNewText,"&Ccedil;", "Ç");
	sNewText=regReplace(sNewText,"&Egrave;", "È");
	sNewText=regReplace(sNewText,"&Eacute;", "É");
	sNewText=regReplace(sNewText,"&Ecirc;", "Ê");
	sNewText=regReplace(sNewText,"&Euml;", "Ë");
	sNewText=regReplace(sNewText,"&Igrave;", "Ì");
	sNewText=regReplace(sNewText,"&Iacute;", "Í");
	sNewText=regReplace(sNewText,"&Icirc;", "Î");
	sNewText=regReplace(sNewText,"&Iuml;", "Ï");
	sNewText=regReplace(sNewText,"&ETH;", "Ð");
	sNewText=regReplace(sNewText,"&Ntilde;", "Ñ");
	sNewText=regReplace(sNewText,"&Ograve;", "Ò");
	sNewText=regReplace(sNewText,"&Oacute;", "Ó");
	sNewText=regReplace(sNewText,"&Ocirc;", "Ô");
	sNewText=regReplace(sNewText,"&Otilde;", "Õ");
	sNewText=regReplace(sNewText,"&Ouml;", "Ö");
	sNewText=regReplace(sNewText,"&Oslash;", "Ø");
	sNewText=regReplace(sNewText,"&Ugrave;", "Ù");
	sNewText=regReplace(sNewText,"&Uacute;", "Ú");
	sNewText=regReplace(sNewText,"&Ucirc;", "Û");
	sNewText=regReplace(sNewText,"&Uuml;", "Ü");
	sNewText=regReplace(sNewText,"&Yacute;", "Ý");
	sNewText=regReplace(sNewText,"&THORN;", "Þ");
	sNewText=regReplace(sNewText,"&szlig;", "ß");
	sNewText=regReplace(sNewText,"&agrave;", "à");
	sNewText=regReplace(sNewText,"&aacute;", "á");
	sNewText=regReplace(sNewText,"&acirc;", "â");
	sNewText=regReplace(sNewText,"&atilde;", "ã");
	sNewText=regReplace(sNewText,"&auml;", "ä");
	sNewText=regReplace(sNewText,"&aring;", "å");
	sNewText=regReplace(sNewText,"&aelig;", "æ");
	sNewText=regReplace(sNewText,"&ccedil;", "ç");
	sNewText=regReplace(sNewText,"&egrave;", "è");
	sNewText=regReplace(sNewText,"&eacute;", "é");
	sNewText=regReplace(sNewText,"&ecirc;", "ê");
	sNewText=regReplace(sNewText,"&euml;", "ë");
	sNewText=regReplace(sNewText,"&igrave;", "ì");
	sNewText=regReplace(sNewText,"&iacute;", "í");
	sNewText=regReplace(sNewText,"&icirc;", "î");
	sNewText=regReplace(sNewText,"&iuml;", "ï");
	sNewText=regReplace(sNewText,"&eth;", "ð");
	sNewText=regReplace(sNewText,"&ntilde;", "ñ");
	sNewText=regReplace(sNewText,"&ograve;", "ò");
	sNewText=regReplace(sNewText,"&oacute;", "ó");
	sNewText=regReplace(sNewText,"&ocirc;", "ô");
	sNewText=regReplace(sNewText,"&otilde;", "õ");
	sNewText=regReplace(sNewText,"&oslash;", "ø");
	sNewText=regReplace(sNewText,"&ugrave;", "ù");
	sNewText=regReplace(sNewText,"&uacute;", "ú");
	sNewText=regReplace(sNewText,"&ucirc;", "û");
	sNewText=regReplace(sNewText,"&uuml;", "ü");
	sNewText=regReplace(sNewText,"&yacute;", "ý");
	sNewText=regReplace(sNewText,"&thorn;", "þ");
	sNewText=regReplace(sNewText,"&yuml;", "ÿ");
	sNewText=regReplace(sNewText,"&amp;", '&');
	sNewText=regReplace(sNewText,"&amp;ecirc;", "ê");
	sNewText=regReplace(sNewText,"&amp;aacute;", "á");
	sNewText=regReplace(sNewText,"&amp;oacute;", "ó");
	sNewText=regReplace(sNewText,"&amp;atilde;", "ã");
	sNewText=regReplace(sNewText,"&amp;agrave;", "à");
	sNewText=regReplace(sNewText,"&amp;ocirc;", "ô");
	sNewText=regReplace(sNewText,"&amp;igrave;", "ì");
	sNewText=regReplace(sNewText,"&amp;Agrave;", "À");
	sNewText=regReplace(sNewText,"&amp;Aacute;", "Á");
	sNewText=regReplace(sNewText,"&amp;Acirc;", "Â");
	sNewText=regReplace(sNewText,"&amp;Atilde;", "Ã");
	sNewText=regReplace(sNewText,"&amp;Auml;", "Ä");
	sNewText=regReplace(sNewText,"&amp;Aring;", "Å");
	sNewText=regReplace(sNewText,"&amp;AElig;", "Æ");
	sNewText=regReplace(sNewText,"&amp;Egrave;", "È");
	sNewText=regReplace(sNewText,"&amp;Ccedil;", "Ç");
	sNewText=regReplace(sNewText,"&amp;Eacute;", "É");
	sNewText=regReplace(sNewText,"&amp;Ecirc;", "Ê");
	sNewText=regReplace(sNewText,"&amp;Euml;", "Ë");
	sNewText=regReplace(sNewText,"&amp;Igrave;", "Ì");
	sNewText=regReplace(sNewText,"&amp;&Iacute;", "Í");
	sNewText=regReplace(sNewText,"&amp;&Icirc;", "Î");
	sNewText=regReplace(sNewText,"&amp;&Iuml;", "Ï");
	sNewText=regReplace(sNewText,"&amp;&ETH;", "Ð");
	sNewText=regReplace(sNewText,"&amp;&Ntilde;", "Ñ");
	sNewText=regReplace(sNewText,"&amp;&Ograve;", "Ò");
	sNewText=regReplace(sNewText,"&amp;&Oacute;", "Ó");
	sNewText=regReplace(sNewText,"&amp;&Ocirc;", "Ô");
	sNewText=regReplace(sNewText,"&amp;&Otilde;", "Õ");
	sNewText=regReplace(sNewText,"&amp;&Ouml;", "Ö");
	sNewText=regReplace(sNewText,"&amp;&Oslash;", "Ø");
	sNewText=regReplace(sNewText,"&amp;&Ugrave;", "Ù");
	sNewText=regReplace(sNewText,"&amp;&Uacute;", "Ú");
	sNewText=regReplace(sNewText,"&amp;&Ucirc;", "Û");
	sNewText=regReplace(sNewText,"&amp;&Uuml;", "Ü");
	sNewText=regReplace(sNewText,"&amp;&Yacute;", "Ý");
	sNewText=regReplace(sNewText,"&amp;&THORN;", "Þ");
	sNewText=regReplace(sNewText,"&amp;&szlig;", "ß");
	sNewText=regReplace(sNewText,"&amp;&acirc;", "â");
	sNewText=regReplace(sNewText,"&amp;&auml;", "ä");
	sNewText=regReplace(sNewText,"&amp;&aring;", "å");
	sNewText=regReplace(sNewText,"&amp;&aelig;", "æ");
	sNewText=regReplace(sNewText,"&amp;&ccedil;", "ç");
	sNewText=regReplace(sNewText,"&amp;&egrave;", "è");
	sNewText=regReplace(sNewText,"&amp;&eacute;", "é");
	sNewText=regReplace(sNewText,"&amp;&euml;", "ë");
	sNewText=regReplace(sNewText,"&amp;&igrave;", "ì");
	sNewText=regReplace(sNewText,"&amp;&iacute;", "í");
	sNewText=regReplace(sNewText,"&amp;&icirc;", "î");
	sNewText=regReplace(sNewText,"&amp;&iuml;", "ï");
	sNewText=regReplace(sNewText,"&amp;&eth;", "ð");
	sNewText=regReplace(sNewText,"&amp;&ntilde;", "ñ");
	sNewText=regReplace(sNewText,"&amp;&ograve;", "ò");
	sNewText=regReplace(sNewText,"&amp;&otilde;", "õ");
	sNewText=regReplace(sNewText,"&amp;&oslash;", "ø");
	sNewText=regReplace(sNewText,"&amp;&ugrave;", "ù");
	sNewText=regReplace(sNewText,"&amp;&uacute;", "ú");
	sNewText=regReplace(sNewText,"&amp;&ucirc;", "û");
	sNewText=regReplace(sNewText,"&amp;&uuml;", "ü");
	sNewText=regReplace(sNewText,"&amp;&yacute;", "ý");
	sNewText=regReplace(sNewText,"&amp;&thorn;", "þ");
	sNewText=regReplace(sNewText,"&amp;&yuml;", "ÿ");
	
	//sNewText=regReplace(sNewText,">","&gt;");
	//sNewText=regReplace(sNewText,"<","&lt;");
	
	//sNewText=regReplace(sNewText,"<!\[CDATA\[", " ");
	//sNewText=regReplace(sNewText,"\]\]>", " ");
	return sNewText;
	
}
function removeSpecialCharForText(sText) {
	var tmpStr = sText.replace(/[|&;$%@"<>()+,]/g, ''); //!"#$%&'+/:;<=>?@[\]`^{|}~   //-.*,()
	//return sText.replace(/([^a-z0-9.,*])+/gi, '-');//parseFloat(amount.replace(/[^0-9-.]/g, ''));
	return tmpStr;
}

function checkSpecialChar(sText) {
	return sText.match(/[!@#$^%&*?><]/gi);
}
function checkVietnameseChar(sText) {
	return sText.match(/[àáạảãâầấậẩẫăằắặẳẵÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴèéẹẻẽêềếệểễÈÉẸẺẼÊỀẾỆỂỄìíịỉĩÌÍỊỈĨòóọỏõôồốộổỗơờớợởỡÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠùúụủũưừứựửữÙÚỤỦŨƯỪỨỰỬỮỳýỵỷỹĐđ]/g);
}

function checkAvailableChar(sText) {
	return sText.match(/^[a-zA-Z0-9_\/\-\(\):,. ]*$/gi);
}
function checkAvailableCharLNH(sText) {
	return sText.match(/^[a-zA-Z0-9_\/\-\(\):,.& ]*$/gi);
}
function regReplace(sInput,sReg,sNew)
{
	var re = new RegExp(sReg, "g");
	return sInput.replace(re, sNew);
}

function setInputOnlyCharAndUpcase(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) {
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
			//fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
		}
		
		var str = String.fromCharCode(ew);
		if(str.match(/^[a-zA-Z0-9]*$/) || (ew == 8) || (ew == 46))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccent(inputNode.value);
			return true;
		}
		else {
			return false;
		}
        //inputNode.value = inputNode.value + replaceVietnameseChars(String.fromCharCode(ew)).toUpperCase();
		//inputNode.value = removeAccent(inputNode.value);
        //return false;
    };
}

function setInputCharNumberAndUpcase(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeyup = function (e) { //must using keypress event to get keycode from char code
		e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
			//fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
		}
		var str = String.fromCharCode(ew);
		if(str.match(/^[a-zA-Z0-9]*$/) || (ew == 8) || (ew == 46))  {
			if(!Environment.isAndroid()) inputNode.value = removeAccent(inputNode.value);
			return true;
		}
		else {
			return false;
		}
        //inputNode.value = inputNode.value + replaceVietnameseChars(String.fromCharCode(ew)).toUpperCase();
		//inputNode.value = removeAccent(inputNode.value);
		
        //return false;
    };
}

function setInputOnlyNumberAndChar(inID, inAlert) {
    if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeypress = function (e) {
		//e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
        if (ew == 8 || ew == 37 || ew == 38 || ew == 39 || ew == 40) //backspace key
            return true;
        if (48 <= ew && ew <= 57)
            return true;
        if (65 <= ew && ew <= 90)
            return true;
        if (97 <= ew && ew <= 122)
            return true;
        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            //fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
            return true;
        }
        if ((inAlert != undefined) && (inAlert != null) && (inAlert.length > 0)) {
            showAlertText(inAlert);
        }
        return false;
    };
}

function setInputOnlyNumber(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeypress = function (e) {
		//e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
        if (ew == 8 || ew == 46 || ew == 37 || ew == 38 || ew == 39 || ew == 40) //backspace key
            return true;
        if (48 <= ew && ew <= 57)
            return true;
        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            //fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
            return true;
        }
        if ((inAlert != undefined) && (inAlert != null) && (inAlert.length > 0)) {
            showAlertText(inAlert);
        }
        return false;
    };
}
//ngocdt chinh sua cho phep nhap dau '-' truong so dien thoai trong thay doi thong tin ca nhan
function setInputOnlyNumberInfo(inID, inAlert) {
	if(!inID) return;
    var inputNode = (typeof(inID) == 'string')? document.getElementById(inID): inID;
    inputNode.onkeypress = function (e) {
		//e.preventDefault();
        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;
		if(ew == 37 || ew == 38 || ew == 40 || ew == 41){
			return false;
		}
        if (ew == 8 || ew == 46 || ew == 39 || ew == 45) //backspace key
            return true;
        if (48 <= ew && ew <= 57)
            return true;
        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            //fire event listener
            evtSpecialKeyPressed.keyPress = ew;
            inputNode.dispatchEvent(evtSpecialKeyPressed);
            return true;
        }
        if ((inAlert != undefined) && (inAlert != null) && (inAlert.length > 0)) {
            showAlertText(inAlert);
        }
        return false;
    };
}
//ngocdt3 end

/*** ALERT VIEW ***/

// create the event
var evt = document.createEvent('Event');
// define that the event name is `closeAlertView`
evt.initEvent('closeAlertView', true, true);


function closealert() {
    var alertdg = document.getElementById("alert-info-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
}


function showAlertText(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-info-content");
    alertContent.innerHTML = inContent;
    var alertdg = document.getElementById("alert-info-dialog");

    alertdg.style.zIndex = 2011;
    alertdg.style.display = "block";
	alertdg.style.opacity = 1;
	if(!Environment.isMobile()) {
		alertdg.getElementsByTagName('input')[0].focus();
	}
}

/*** ALERT VIEW END ***/

/*** ALERT CONFIRM VIEW ***/

var evtCancel = document.createEvent('Event');
evtCancel.initEvent('alertConfirmCancel', true, true);
var evtOK = document.createEvent('Event');
evtOK.initEvent('alertConfirmOK', true, true);

function closeAlertConfirm(inStatus) {
    var alertdg = document.getElementById("alert-confirm-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    if (inStatus) {
        document.dispatchEvent(evtOK);
    }
    else {
        document.dispatchEvent(evtCancel);
    }

}

function showAlertConfirmText(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-confirm-content");
	// 2015/11/26 DuyNH Fx: Edit text of button in confirm popup START
	var buttonCancel = document.getElementById("btnAlertConfirmCancel");
	var buttonOK = document.getElementById("btnAlertConfirmOk");
	buttonCancel.value = CONST_STR.get('BENEFIC_LIST_NO');
	buttonOK.value = CONST_STR.get('BENEFIC_LIST_YES');
	// 2015/11/26 DuyNH Fx: Edit text of button in confirm popup END
    alertContent.innerHTML = inContent;

    var alertdg = document.getElementById("alert-confirm-dialog");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
		if(!Environment.isMobile()) {
			if(alertdg.getElementsByTagName('input')[1]) alertdg.getElementsByTagName('input')[1].focus();
		}
		
    //}, 300);
}

//New alert confirm
var alertAppConfirmCancel = document.createEvent('Event');
alertAppConfirmCancel.initEvent('alertAppConfirmCancel', true, true);
var alertAppConfirmOK = document.createEvent('Event');
alertAppConfirmOK.initEvent('alertAppConfirmOK', true, true);

function closeAlertApp(inStatus) {
    var alertdg = document.getElementById("alert-app-confirm");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    if (inStatus) {
        document.dispatchEvent(alertAppConfirmOK);
    }
    else {
        document.dispatchEvent(alertAppConfirmCancel);
    }

}

function showAlertAppText(inContent, inBtnOKTitle, inBtnCancelTitle, inImgAlertSrc) {
    hiddenKeyBoard();
	
    var alertContent = document.getElementById("alert-app-content");
	/*if(inImgAlertSrc && inImgAlertSrc.length > 1) {
		//<img width="50" height="50" style="border:1px solid #000;display: inline;margin: 5px;">
    	alertContent.innerHTML = '<img width="50" height="50" style="border:1px solid #000;margin: 5px 5px 5px 0px;" src=\'' + inImgAlertSrc + '\'>' + inContent;
		alertContent.style.padding = "15px 15px 15px 5px";
	}
	else {*/
		alertContent.innerHTML = inContent;
	//}
	
	//OK button
	if(inBtnOKTitle && inBtnOKTitle.length > 0) {
		document.getElementById('btnAlertAppOk').value = inBtnOKTitle;
	}
	//Cancel button
	if(inBtnCancelTitle && inBtnCancelTitle.length > 0) {
		document.getElementById('btnAlertAppCancel').value = inBtnCancelTitle;
	}
    var alertdg = document.getElementById("alert-app-confirm");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
		if(!Environment.isMobile()) {
			if(alertdg.getElementsByTagName('input')[1]) alertdg.getElementsByTagName('input')[1].focus();
		}
		
    //}, 300);
}

//20140830
function closeAlertConfirmScheduleBank(inStatus) {
    var alertdg = document.getElementById("alert-confirm-dialog-schedulebank");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    if (inStatus) {
        document.dispatchEvent(evtOK);
    }
    else {
        document.dispatchEvent(evtCancel);
    }

}

function showAlertConfirmTextScheduleBank(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-confirm-content-schedulebank");
    alertContent.innerHTML = inContent;
    var alertdg = document.getElementById("alert-confirm-dialog-schedulebank");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
    //}, 300);
}
//20140830

function showAlertKHCN_KHDN_TERMS(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-KHCN-KHDN-TERMS-content");
    alertContent.innerHTML = inContent;
    var alertdg = document.getElementById("alert-KHCN-KHDN-TERMS-dialog");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
    //}, 300);
}

function showAlertKHCN_KHDN_INSTRUCTION(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-KHCN-KHDN-INSTRUCTION-content");
    alertContent.innerHTML = inContent;
    var alertdg = document.getElementById("alert-KHCN-KHDN-INSTRUCTION-dialog");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
    //}, 300);
}

function showAlertKHCN_KHDN_FAQ(inContent) {
    hiddenKeyBoard();

    var alertContent = document.getElementById("alert-KHCN-KHDN-FAQ-content");
    alertContent.innerHTML = inContent;
    var alertdg = document.getElementById("alert-KHCN-KHDN-FAQ-dialog");
    alertdg.style.display = "block";
    alertdg.style.zIndex = 2010;

    //setTimeout(function (e) {
        alertdg.style.opacity = 1;
    //}, 300);
}


function closealertKHCN_KHDN_TERMS() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-TERMS-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
}

function closealertKHDN_TERMS() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-TERMS-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		//window.open('./download/Dieu khoan dieu kien eBank - KHDN - Vietnamese.pdf');
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHDN - Vietnamese.pdf'); 
	}
	else
	{
		//window.open('./download/Dieu khoan dieu kien eBank - KHDN - Vietnamese.pdf');
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHDN - Vietnamese.pdf'); 
	}
}

function closealertKHCN_TERMS() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-TERMS-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		//window.open('./download/Dieu khoan dieu kien eBank - KHCN - English.pdf');
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHCN - English.pdf');
	}
	else
	{
		//window.open('./download/Dieu khoan dieu kien eBank - KHCN - Vietnamese.pdf');
		openLinkInWindows('./download/Dieu khoan dieu kien eBank - KHCN - Vietnamese.pdf');
	}
}

function closealertKHCN_KHDN_INSTRUCTION() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-INSTRUCTION-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
}

function closealertKHDN_INSTRUCTION() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-INSTRUCTION-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		//window.open('./download/HDSD Internet Banking - KHDN - Vietnamese.pdf');
		openLinkInWindows('./download/HDSD Internet Banking - KHDN - Vietnamese.pdf');
	}
	else
	{
		//window.open('./download/HDSD Internet Banking - KHDN - Vietnamese.pdf');
		openLinkInWindows('./download/HDSD Internet Banking - KHDN - Vietnamese.pdf');
	}
}

function closealertKHCN_INSTRUCTION() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-INSTRUCTION-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		//window.open('./download/HDSD Internet Banking - KHCN - Vietnamese.pdf');
		if(gModeScreenView == CONST_MODE_SCR_SMALL) {
			openLinkInWindows('./download/HDSD Internet Banking - KHCN - Vietnamese (smallscreen).pdf');
		}
		else {
			openLinkInWindows('./download/HDSD Internet Banking - KHCN - Vietnamese.pdf');
		}
	}
	else
	{
		//window.open('./download/HDSD Internet Banking - KHCN - Vietnamese.pdf');
		if(gModeScreenView == CONST_MODE_SCR_SMALL) {
			openLinkInWindows('./download/HDSD Internet Banking - KHCN - Vietnamese (smallscreen).pdf');
		}
		else {
			openLinkInWindows('./download/HDSD Internet Banking - KHCN - Vietnamese.pdf');
		}
	}
}

function closealertKHCN_KHDN_FAQ() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-FAQ-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
}

function closealertKHDN_FAQ() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-FAQ-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//20140911: hien box lien he - begin
	var tmpNodeMain = document.getElementById('mainview');
	tmpNodeMain.style.cssFloat = 'right';				
	tmpNodeMain.style.width = '100%';
	document.getElementById('box_lienhe').style.display = 'block';	
	//20140911: hien box lien he - end	
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		navController.initWithRootView('faq-scr-eng', true, 'html');
	}
	else
	{
		navController.initWithRootView('faq-scr-vie', true, 'html');
	}
}

function closealertKHCN_FAQ() {
    var alertdg = document.getElementById("alert-KHCN-KHDN-FAQ-dialog");
    //alertdg.style.display = "none";
    alertdg.style.opacity = 0;
    setTimeout(function () {
        alertdg.style.zIndex = 0;
        alertdg.style.display = 'none';
    }, 500);
    //fire event listener
    document.dispatchEvent(evt);
	
	//20140911: hien box lien he - begin
	var tmpNodeMain = document.getElementById('mainview');
	tmpNodeMain.style.cssFloat = 'right';				
	tmpNodeMain.style.width = '100%';
	document.getElementById('box_lienhe').style.display = 'block';	
	//20140911: hien box lien he - end
	
	//check VN EN
	if (gUserInfo.lang == 'EN')
	{
		navController.initWithRootView('faq-scr-eng', true, 'html');
	}
	else
	{
		navController.initWithRootView('faq-scr-vie', true, 'html');
	}
}

/*** ALERT CONFIRM VIEW END ***/

/*** LOADING VIEW ***/
function hideLoadingMask() {
    var sender = document.getElementById('loadingMask');
    sender.style.opacity = 0;
    setTimeout(function () {
        sender.style.display = 'none';
    }, 900);
}
function showLoadingMask(sender) {
    hiddenKeyBoard();
	windowScrollToTop();
    var sender = document.getElementById('loadingMask');
    sender.style.display = 'block';
    sender.style.opacity = 1;
}

/*** LOADING VIEW END ***/

//*********************************************************************************************/
//********************************HaiDT1 DIALOG INPUT 3 colunm ************************************///
var evtSelectionDialogPromocode = document.createEvent('Event');
evtSelectionDialogPromocode.initEvent('evtSelectionDialogPromocode', true, true);

var evtSelectionDialogClosePromocode = document.createEvent('Event');
evtSelectionDialogClosePromocode.initEvent('evtSelectionDialogClosePromocode', true, true);

//TẠO ĐỐI TƯỢNG DIALOG
function DiaLogListInputPromocode(inTitle) {
    //Title for dialog
    this.title = inTitle;
}

DiaLogListInputPromocode.prototype.showDialog = function(ojbPromocode, currency){
    hiddenKeyBoard();
    var dialogInputCurrent = this;
    setTimeout(function () {
        var divID = 'divPromocode';
        var divNode = document.getElementById(divID);
        if ((divNode != null) && (divNode != undefined)) {
            divNode.innerHTML = "";
        }
        else {
            logInfo('Dialog not exist divID: ' + divID);
            return;
        }

        var dialogDivAll = document.createElement('div');
        var aNodeTitle = document.createElement("a");
        aNodeTitle.setAttribute("class", "list-group-item active dialog-payee-caption");
        aNodeTitle.innerHTML = dialogInputCurrent.title;
        divNode.appendChild(aNodeTitle);

        var dialogDivAll = document.createElement('div');
        var aNodeTitle = document.createElement("a");
        aNodeTitle.setAttribute("class", "list-group-item active dialog-payee-caption");
        aNodeTitle.innerHTML = dialogInputCurrent.title;
        divNode.appendChild(aNodeTitle);

        //Add Input tag
        var inputNode = document.createElement("div");

        var contentInput = "";
        contentInput +=
            "<table width='100%' style='text-align: center'>"+
                "<tr id = 'tr-tab' align='center' valign='middle' class='td-text'>"+
                    "<td width='30%' colspan = '2'>"+
                        "<span><strong>Phí chuyển tiền</strong></span>"+
                    "</td>"+
                    "<td width='30%' colspan = '2'>"+
                        "<span><strong>Điện phí</strong></span>"+
                    "</td>"+
                    "<td width='20%' colspan = '2'>"+
                        "<span><strong>Max</strong></span>"+
                    "</td>"+
                    "<td width='20%' colspan = '2'>"+
                        "<span><strong>Min</strong></span>"+
                    "</td>"+
                "</tr>"+
                "<tr>"+
                    "<td width='30%' colspan = '2'>"+
                        "<span>"+ ojbPromocode.CHARGE + " %" + "</span>"+
                    "</td>"+
                    "<td width='30%' colspan = '2'>"+
                        "<span>"+ formatNumberToCurrency(ojbPromocode.ELECTRICCHARGE) +  " USD" +"</span>"+
                    "</td>"+
                    "<td width='20%' colspan = '2'>"+
                        "<span>"+ formatNumberToCurrency(ojbPromocode.MAX) + " VND" +"</span>"+
                    "</td>"+
                    "<td width='20%' colspan = '2'>"+
                        "<span>"+ formatNumberToCurrency(ojbPromocode.MIN) + " VND" +"</span>"+
                    "</td>"+
                "</tr>";

        contentInput += "</table>"
        contentInput += "<table width='100%'>"+
            "<tr>"+
                "<td width='20%'><input id='inputDone' type = 'button' class='btnshadow btn-second' value = '" + CONST_STR.get('TRANSFER_REMITTANCE_DONE_BUTTON') + "' onClick = 'closeDialogPromocode(this);'/></td>"+
            "</tr>"+
            "</table>";
        inputNode.innerHTML = contentInput;

        inputNode.setAttribute("class","list-group-item active dialog-payee-input");
        inputNode.setAttribute('style','padding-bottom:0px;');
        divNode.appendChild(inputNode);

        var dialogDivContainerScroll = document.getElementById('selection-dialog-scroll');
        if(dialogDivContainerScroll ==null || dialogDivContainerScroll ==undefined){
            dialogDivContainerScroll
        }else{
            dialogDivContainerScroll.parentNode.removeChild(dialogDivContainerScroll);
        }

        dialogDivContainerScroll = document.createElement('div');

        dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
        dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');

        dialogDivAll.appendChild(dialogDivContainerScroll);

        divNode.appendChild(dialogDivAll);


        divNode.style.top = (clientHeight - 117)/2 + 71 + 'px';
        var dialogContainer = document.getElementById("selection-dialog-promocode");
        if (dialogContainer != null) {
            dialogContainer.style.zIndex = 2001;
            dialogContainer.style.display = "block";
            //setTimeout(function (e) {
            dialogContainer.style.opacity = 1;
            //}, 300);
        }
    }, 300);

};

function closeDialogPromocode(inNode) {
    var dialogSelection = document.getElementById("selection-dialog-promocode");

    if (inNode.nodeType == 1) {
        dialogSelection.style.opacity = 0;
        var tmpDialogTimer = setTimeout(function (e) {
            dialogSelection.style.zIndex = 0;
            dialogSelection.style.display = "none";
            clearTimeout(tmpDialogTimer);
            // document.dispatchEvent(evtSelectionDialogCloseInput3);
        }, 500);

    }
}

/*** LOADING VIEW END ***/

//*********************************************************************************************/
//********************************THUANTM DIALOG INPUT ************************************///

var evtSelectionDialogInput = document.createEvent('Event');
evtSelectionDialogInput.initEvent('evtSelectionDialogInput', true, true);

var evtSelectionDialogCloseInput = document.createEvent('Event');
evtSelectionDialogCloseInput.initEvent('evtSelectionDialogCloseInput', true, true);

var evtChangeTab = document.createEvent('Event');
evtChangeTab.initEvent('tabChange',true,true);

var evtInputSelected = document.createEvent('Event');
evtInputSelected.initEvent('onInputSelected',true,true);

//TẠO ĐỐI TƯỢNG DIALOG
function DialogListInput(inTitle, inTransType, inGPayeeCode) {
	//Title for dialog
	this.title = inTitle;
	//Key chuyển khoản nội bộ hay tới ngân hàng
	this.transType = inTransType;	//ARG1
	//Key cho biết tab nào được chọn
	this.gPayeeCode = inGPayeeCode;  //ARG2
	
	tab1Loaded = false;//Kiem tra xem du lieu da duoc load hay chưa
	tab2Loaded = false;//Kiem tra xem du lieu da duoc load hay chưa
}
//HÀM SHOW DIALOG
DialogListInput.prototype.showDialog = function(showDialogSuccessed, args){
	hiddenKeyBoard();
	var dialogInputCurrent = this;
	setTimeout(function(){
		//Khi dialog show len thi mac dinh tab chua duoc load
		DialogListInput.prototype.tab1Loaded = false;
		DialogListInput.prototype.tab2Loaded = false;
		
		var divID = 'divListGroupInput';
		var divNode = document.getElementById(divID);
		if ((divNode != null) && (divNode != undefined)) {
			divNode.innerHTML = "";
		}
		else {
			logInfo('Dialog not exist divID: ' + divID);
			return;
		}
		
		var dialogDivAll = document.createElement('div');
		var aNodeTitle = document.createElement("a");	
		aNodeTitle.setAttribute("class", "list-group-item active dialog-payee-caption");
		aNodeTitle.innerHTML = dialogInputCurrent.title;
		divNode.appendChild(aNodeTitle);
		
		//Add Input tag
		var inputNode = document.createElement("div");	
	
		var contentInput = "";
		contentInput += "<table>"+
				"<tr>"+
				 "<td align='center' valign='middle' class='td-text' width='80%'>"+
					  "<div class='input-group'>"+
						  "<span class='input-group-addon' style='white-space:pre-wrap; width:0%'>"/*"+CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION')*/+"</span>"+                   
						 "<input id='id.inputAcc' type='text' class='form-control-input-dialog form-control-righttext' placeholder='"+CONST_STR.get('ESAVING_CHANGEINFO_VF_ARR1')+"' />"+
						 "<span class='input-group-addon input-group-symbol'></span>"+
						"</div>"+                  
				"</td>"+
				"<td width='20%'><input id='inputDone' type = 'button' class='btnshadow btn-second'    value = '" + CONST_STR.get('TRANSFER_REMITTANCE_DONE_BUTTON') + "' onClick = 'selectedClick();'/></td>"+
				"</tr>";
	contentInput +=
			"<tr id = 'tr-tab'>"+
				"<td colspan = '2'>"+
					"<div class='tab' style='margin-top: 0px;'>"+
						"<div class='item selected' id = 'tab1' onClick = 'tabChange(this);'>"+
							"<div class='left'></div>"+
							"<div class='text'><span id='titleTab1'>"+CONST_STR.get('TRANSFER_REMITTANCE_SAVE_BENEFIC1')+"</span></div>"+
							"<div class='right'></div>"+
						"</div>"+
						"<div class='item' id = 'tab2' onClick = 'tabChange(this);'>"+
							"<div class='left'></div>"+
							"<div class='text'><span id='titleTab2'>"+CONST_STR.get('TRANSFER_REMITTANCE_TEMPLATE')+"</span></div>"+
							"<div class='right'></div>"+
						"</div>"+
					"</div>"+
				"</td>"+
			"</tr>";
		contentInput += "</table>"	
		inputNode.innerHTML = contentInput;
		
		inputNode.setAttribute("class","list-group-item active dialog-payee-input");
		inputNode.setAttribute('style','padding-bottom:0px;');
		divNode.appendChild(inputNode);
		
		var dialogDivContainerScroll = document.getElementById('selection-dialog-scroll');
		if(dialogDivContainerScroll ==null || dialogDivContainerScroll ==undefined){
			dialogDivContainerScroll
		}else{		
			dialogDivContainerScroll.parentNode.removeChild(dialogDivContainerScroll);
		}
		
		dialogDivContainerScroll = document.createElement('div');
		
		dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
		dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');
		
		dialogDivAll.appendChild(dialogDivContainerScroll);
		
		divNode.appendChild(dialogDivAll);
		
		
		var divContentInput;
		if (document.getElementById('divContent') != null){
			divContentInput = document.getElementById('divContent');
		}
		else{
			divContentInput = document.createElement('div');
		}
		divContentInput.setAttribute('id', 'divContent');
		dialogDivContainerScroll.appendChild(divContentInput);		
		
		
		var tmpNodeCaptcha = document.getElementById('id.inputAcc');	
		//setInputOnlyASCII('id.inputAcc', CONST_STR.get("ERR_INPUT_ONLY_ASCII_CHAR"), inputNormalCharFunc);

        var inputNode = document.getElementById('id.inputAcc');
        inputNode.onkeyup = function (e) {
            e.preventDefault();
            var evt = e || window.event;
            var ew = evt.keyCode || evt.which;
            if ((ew == 13) || (ew == 9)) //enter key, tab key
            {
                //fire event listener
                evtSpecialKeyPressed.keyPress = ew;
                inputNode.dispatchEvent(evtSpecialKeyPressed);
                if(typeof(inputSpecCharFunc) == 'function') {
                    inputSpecCharFunc(ew);
                }
            }
            inputNormalCharFunc();
            return true;
        };

		tmpNodeCaptcha.addEventListener('evtSpecialKeyPressed', function(e) {
			//tmpNodePass.removeEventListener('evtSpecialKeyPressed', handleSpecialKeyPressd, false);
			var ew = e.keyPress;
			if (ew == 13) { //Enter pressed
				selectedClick();
			}
			else {
				//inputNormalCharFunc(tmpNodeCaptcha.value);
				return;
			}
		}, false);
		
		if((typeof(showDialogSuccessed) == 'function') && (args ==null||args == undefined || args == '')){
			showDialogSuccessed.apply(this);
		}
		//Add du lieu neu co truyen vao
		if(args !=null && args !=undefined && args.length>0){
            gPayeeList = new Array();
            for (var i in args){
                var obj = {};
                obj.peopleName = args[i].value2;
                obj.transValue = args[i].value1;
                gPayeeList.push(obj);
            }

            dialogInputCurrent.addListData(showDialogSuccessed, args,'tab1');
			
		}else{
			//B1 add loading			
			gPayeeList = new Array();
			//lstTemplate = new Array();
            dialogInputCurrent.requestData('tab1');


		}
		divNode.style.top = (clientHeight - 117)/2 + 71 + 'px';
		var dialogContainer = document.getElementById("selection-dialog-input");
		if (dialogContainer != null) {
			dialogContainer.style.zIndex = 2001;
			dialogContainer.style.display = "block";
			//setTimeout(function (e) {
				dialogContainer.style.opacity = 1;
			//}, 300);
		}
		if(!Environment.isMobile()){
			document.getElementById('id.inputAcc').focus();
		}
	}, 300);
	
};

//HÀM INSERT DATA VÀO DIALOG
DialogListInput.prototype.addListData = function(addDataToDialogSuccessed, args, tab){//args la mang 2 phan tu (value1, value2)			
	var dialogDivContainerScroll = document.getElementById('selection-dialog-scroll');
	var divContentInput;
	if (document.getElementById('divContent') != null){
		divContentInput = document.getElementById('divContent');
	}
	else{
		divContentInput = document.createElement('div');
	}
	divContentInput.setAttribute('id', 'divContent');
	var dialogDivContainer;
		 
	if (tab == 'tab1'){
		if (document.getElementById('container1') != null){
			dialogDivContainer = document.getElementById('container1');
		}
		else{
			dialogDivContainer = document.createElement('div');
		}
		dialogDivContainer.setAttribute('id', 'container1');
		DialogListInput.prototype.tab1Loaded = true;
	}else if (tab == 'tab2'){
		if (document.getElementById('container2') != null){
			dialogDivContainer = document.getElementById('container2');
		}
		else{
			dialogDivContainer = document.createElement('div');
		}
		
		dialogDivContainer.setAttribute('id', 'container2');
		DialogListInput.prototype.tab2Loaded = true;
	}
	this.removeData(tab);
    for (var x = 1; x < args.length + 1; x++) {
        var aNode = document.createElement("a");    
            aNode.setAttribute("class", "list-group-item");
            if (showValue) {
                aNode.style.textAlign = "left";
            }
            else {
                aNode.style.textAlign = "center";
            }

            aNode.setAttribute("onClick", "selectedItemOnDialogInput(this," + x +","+args[x-1].index+");");
            aNode.innerHTML = args[x - 1].value1;

            var tmpValue = args[x - 1].value2;
            if ((tmpValue != undefined) && (tmpValue != null)) {
                var spanNode = document.createElement("span");
                spanNode.setAttribute("class", "badge");
                spanNode.innerHTML = tmpValue;
                if (!showValue) {
                    spanNode.style.display = 'none';
                }
                aNode.appendChild(spanNode);
            }
            dialogDivContainer.appendChild(aNode);
        //}

    }
	if(args.length <= 0){		
		dialogDivContainer.innerHTML = CONST_STR.get('BANK_INFO_EMPTY_DATA');
		dialogDivContainer.setAttribute('style','padding-top:20px;padding-bottom:10px;');
	}
    divContentInput.appendChild(dialogDivContainer);
	//dialogDivContainerScroll.appendChild(divContentInput);
	//divNode.appendChild(dialogDivContainerScroll);
	
    if (args.length >= 1) {
        dialogScroll = new IScroll('#selection-dialog-scroll', {
            scrollbars: true,
            mouseWheel: true,
			
			
			draggableScrollbars: true,
			onScrollMove: function() {
				hasDialogContentScrollEvent = true;
			},
			onScrollEnd: function() {
				hasDialogContentScrollEvent = false;
			},
        });
        setTimeout(function () {
            dialogScroll.refresh();
        }, 200);
    }	
	if(!Environment.isMobile()){
		document.getElementById('id.inputAcc').focus();
	}
    if(typeof(addDataToDialogSuccessed) == 'function'){
		addDataToDialogSuccessed.apply(this);
	}
	DialogListInput.prototype.activeDataOnTab(tab);
}

function showMask(){
	var dialogDivContainerScroll = document.getElementById('selection-dialog-scroll');	
	var divMask;
	if (document.getElementById('divMask') != null){
		divMask = document.getElementById('divMask');
		divMask.style.display = 'block';
	}
	else{
		divMask = document.createElement('div');
		divMask.innerHTML = "<span style = 'display:block;margin:0 auto;padding-top:3px;'>" + CONST_STR.get('ERR_LOADING_PAGE_MSG') + "</span>"+
						"<span class='window8-1'></span>"+
						"<span class='window8-2'></span>"+
						"<span class='window8-3'></span>"+
						"<span class='window8-4'></span>"+
						"<span class='window8-5'></span>"+
						"<span class='window8-6'></span>"+
						"<span class='window8-7'></span>"+
						"<span class='window8-8'></span>";
		divMask.setAttribute('id', 'divMask');	
		divMask.setAttribute('style','padding-top:0px;margin:0 auto;');	
		dialogDivContainerScroll.appendChild(divMask);		
	}
	
}
function hiddenMask(){
	if (document.getElementById('divMask') != null){
		document.getElementById('divMask').style.display = 'none';
	}
}
//HÀM XÓA DỮ LIỆU TỪ DIALOG
DialogListInput.prototype.removeData = function(tab){
	if(tab == 'tab1'){
		var container1 = document.getElementById('container1');
		//Xoa cac node con
		while (container1!=null && container1.firstChild ) container1.removeChild( container1.firstChild );
	}
	else if(tab == 'tab2'){
		var container2 = document.getElementById('container2');
		//Xoa cac node con
		while (container2!=null && container2.firstChild ) container2.removeChild( container2.firstChild );
	}
	/*
	var dialogDivContainerScroll = document.getElementById('selection-dialog-scroll');
	//Xoa cac node con
	while ( dialogDivContainerScroll.firstChild ) dialogDivContainerScroll.removeChild( dialogDivContainerScroll.firstChild );
	//Xoa thanh cong
	if(typeof(removeDataSuccessed) == 'function'){
		removeDataSuccessed.apply(this);
	}*/
}
DialogListInput.prototype.allowInputType = function(paramterType){
	var inputNode = document.getElementById('id.inputAcc');
	inputNode.setAttribute('type',paramterType);
	//Sẽ kiểm tra và validate sau
	//1.Phone number
	//2. Text
	//3. Account....
}
DialogListInput.prototype.activeDataOnTab = function(tab){
	
	var nodeTab1 = document.getElementById('container1');
	var nodeTab2 = document.getElementById('container2');
	if (tab == 'tab2'){
		
		if(nodeTab1 !=null && nodeTab1 !=undefined){
			nodeTab1.style.display = 'none';
		}
	
		if(nodeTab2 !=null && nodeTab2 !=undefined){
			nodeTab2.style.display = 'block';
		}
	}else{	
			
		if(nodeTab1 !=null && nodeTab1 !=undefined){
			nodeTab1.style.display = 'block';
		}
	
		if(nodeTab2 !=null && nodeTab2 !=undefined){
			nodeTab2.style.display = 'none';
		}
	}	
	if(dialogScroll !=null && dialogScroll !=undefined){
		dialogScroll.refresh();	
	}
	if(!Environment.isMobile()){
		document.getElementById('id.inputAcc').focus();
	}
}

//Request server
DialogListInput.prototype.requestData = function(tabName){
    if (gTrans.showDialogCorp) {
		// request to Corp Server
        sendJSONRequestDialogCorp(this.USERID, this.PAYNENAME, this.TYPETEMPLATE, tabName); 
        gTrans.showDialogCorp = null;
    } else {
        sendJSONRequestDialog(this.transType, this.gPayeeCode, tabName);     
    }    	
}


//ẨN TAB
DialogListInput.prototype.hiddenTab2 = function(){	
	document.getElementById('tab1').setAttribute("class", "item selected");
	document.getElementById('tab2').style.display = 'none';	
}
//Hiển thị tab2
DialogListInput.prototype.showTab2 = function(){
	document.getElementById('tab2').style.display = '';	
}
//*****handleFilterOnDialog******//
function handleFilterOnDialog(evt, node){
	var valueFilter = node.value;
	if(typeof(onFilterDialog)=='function'){
		onFilterDialog(valueFilter);
	}
}
//Function get tabSelected
function getTabSelected(){
	var tab1 = document.getElementById('tab1');
	var tab2 = document.getElementById('tab2');
	if(tab1!=null && tab1.getAttribute('class')=="item selected"){
		return 'tab1';
	}
	if(tab2!=null && tab2.getAttribute('class')=="item selected"){
		return 'tab2';
	}
	return 'tab1';
}
//User click on Button 
//User click on Button 
function selectedClick(){
	var inputNode = document.getElementById("id.inputAcc");
	var dialogSelection = document.getElementById("selection-dialog-input");
	if(inputNode !=null /*&& inputNode.value.length>0*/){
		dialogSelection.style.opacity = 0;
			var tmpDialogTimer = setTimeout(function (e) {
				dialogSelection.style.zIndex = 0;
				dialogSelection.style.display = "none";
				clearTimeout(tmpDialogTimer);
				if(inputNode!= null && inputNode.value.length >0){
					evtInputSelected.selectedValue = inputNode.value;				
					document.dispatchEvent(evtInputSelected);	
				}
				
			}, 500);		
	}/*else{		
		var tmpStr = CONST_STR.get("ERR_INPUT_PAYEE_EMPTY").replace('%s', getCominputAccountHtmlTitle());
		showAlertText(tmpStr);
	}*/
	
}
//User Selected Item
function selectedItemOnDialogInput(inNode, index, idx) {
	
	if(hasDialogContentScrollEvent){
		hasDialogContentScrollEvent= false;
		return;
	}

    var dialogSelection = document.getElementById("selection-dialog-input");
	if (inNode.nodeType == 1) {
        if (inNode.tagName == "A") {
			var tabSelected = getTabSelected();
            //fire event listener
            
			dialogSelection.style.opacity = 0;
			var tmpDialogTimer = setTimeout(function (e) {
				dialogSelection.style.zIndex = 0;
				dialogSelection.style.display = "none";
				clearTimeout(tmpDialogTimer);
				
				if(tabSelected == 'tab1'){
					var obj = gPayeeList[idx];					
					evtSelectionDialogInput.dataObject = obj;					
				}
				else{
					var nameKey = inNode.childNodes[0].nodeValue;										
					var obj = lstTemplate[idx];					
					evtSelectionDialogInput.dataObject = obj;
				}
				evtSelectionDialogInput.selectedIndex = idx;
				
				evtSelectionDialogInput.tabSelected = tabSelected;
				/*var obj = new Object();
				obj.value1 = inNode.childNodes[0].nodeValue;
				obj.value2 = inNode.childNodes[1].innerHTML;
				evtSelectionDialogInput.selectedValue2 = inNode.childNodes[1].innerHTML;
				
				if (inNode.childNodes[0] != undefined) {
                    evtSelectionDialogInput.selectedValue1 = inNode.childNodes[0].nodeValue;
                }
                if (inNode.childNodes[1] != undefined) {
                    evtSelectionDialogInput.selectedValue2 = inNode.childNodes[1].innerHTML;
                }*/
				
				
                document.dispatchEvent(evtSelectionDialogInput);
			}, 500);
        }
    }
}
//User closed Dialog
function closeDialogInput(inNode) {
    var dialogSelection = document.getElementById("selection-dialog-input");

    if (inNode.nodeType == 1) {
        dialogSelection.style.opacity = 0;
		var tmpDialogTimer = setTimeout(function (e) {
			dialogSelection.style.zIndex = 0;
			dialogSelection.style.display = "none";
			clearTimeout(tmpDialogTimer);
			document.dispatchEvent(evtSelectionDialogCloseInput);
		}, 500);
		
    }
}
//User click to change tab
function tabChange(node){
	evtChangeTab.selectedValueTab = node;
	document.dispatchEvent(evtChangeTab);
	if(node.getAttribute("class")=="item selected"){
			return;
	}		
	node.setAttribute("class", "item selected");
	if(node.id == 'tab1'){		
		document.getElementById('tab2').setAttribute("class", "item");
	}
	else{			
		document.getElementById('tab1').setAttribute("class", "item");
	}	
}
function sendJSONRequestDialog(transType, gPayeeCode, tabName){
	var data = {};
	var arrayArgs = new Array();	
	if(tabName == 'tab1' && !DialogListInput.prototype.tab1Loaded){	
		//Lấy danh sách tin cậy				
		showMask(tabName);
		arrayArgs.push(gPayeeCode);//CONST_PAYEE_INTER_TRANSFER);
		arrayArgs.push(transType);	
		requestBacgroundMBService('CMD_TYPE_LOOKUP_PAYEE', arrayArgs, requestMBServiceSuccesssDialog, requestMBServiceFailDialog);
	}
	else
	if(tabName == 'tab2' && !DialogListInput.prototype.tab2Loaded){	
		showMask(tabName);
		arrayArgs.push(gPayeeCode);
		arrayArgs.push(transType);//0 là chuyển khoản nội bộ, 1 là chuyển khoản tới ngân hàng khác
		//Lấy danh sách mẫu				
		requestBacgroundMBService('CMD_TRANSFER_TEMPLATE_TEMPLATE', arrayArgs, 	requestMBServiceSuccesssDialog, requestMBServiceFailDialog);
	}	
}
function showEmptyInputData(){
	
}

function requestMBServiceSuccesssDialog(e){
	
	gprsResp = parserJSON(e, false);
	var historyArray = gprsResp.arguments;
	var args = new Array();

	if(gprsResp.respCode != '0'){
		//showAlertText(gprsResp.respContent);
		return;
	}
	hiddenMask();	
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TYPE_LOOKUP_PAYEE")))) 
	{	
		
		//DialogListInput.prototype.tab1Loaded = true;		
		gPayeeList = new Array();	
		if(historyArray!=undefined){
			for (var i=0; i<historyArray.length; i++) {
				var payeeArrTemp = historyArray[i].split("#");
				var payeeObjTemp =  new PayeeObj();
				payeeObjTemp.customerNo = payeeArrTemp[0];
				payeeObjTemp.payeeType = payeeArrTemp[1];
				payeeObjTemp.transType = payeeArrTemp[2];
				payeeObjTemp.transValue = payeeArrTemp[3];
				payeeObjTemp.peopleName = payeeArrTemp[4];
				payeeObjTemp.partnerCode = payeeArrTemp[5];
				payeeObjTemp.provinceCode = payeeArrTemp[6];
				payeeObjTemp.citadCode = payeeArrTemp[7];
				payeeObjTemp.partnerName = payeeArrTemp[8];
				payeeObjTemp.fancyName = payeeArrTemp[9];
				gPayeeList.push(payeeObjTemp);
				
				var obj = new Object();
				obj.value1 = payeeObjTemp.transValue;
				obj.value2 = payeeObjTemp.peopleName;
				obj.index = i;
				args.push(obj);				
			}
		}
		DialogListInput.prototype.addListData(addSuccessed, args, 'tab1');	
	}
	if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_TRANSFER_TEMPLATE_TEMPLATE")))) {
		//DialogListInput.prototype.tab2Loaded = true;
		lstTemplate = new Array();
		if(historyArray!=undefined){
			for(var k=0;k<historyArray.length;k++){
				tempArrStr = historyArray[k].split("#");			
				objtemp = new Object();		
				objtemp.name = tempArrStr[0];
				objtemp.tai_khoan_nguon = tempArrStr[1];
				objtemp.ten_tai_khoan_dich = tempArrStr[2];
				objtemp.tai_khoan_dich = tempArrStr[3];
				objtemp.so_tien = tempArrStr[4];
				objtemp.noi_dung = tempArrStr[5];
				objtemp.ngan_hang_nhan = tempArrStr[6];
				objtemp.ma_citad = tempArrStr[7];
				objtemp.loai_chuyen_tien = tempArrStr[8];
				lstTemplate.push(objtemp);
				
				var obj = new Object();
				obj.value1 = objtemp.tai_khoan_dich;
				obj.value2 = objtemp.name;
				obj.index = k;
				args.push(obj);
				
			}
		}						
		DialogListInput.prototype.addListData(addSuccessed, args, 'tab2');			
	}
	
}
function addSuccessed(node){
}

function requestMBServiceFailDialog(e){
	//gprsResp = parserJSON(e);
	//showAlertText(gprsResp.respContent);
}

//HÀM FILTER CHO DIALOG
function inputNormalCharFunc(){
	var node = document.getElementById('id.inputAcc');
	var value = "";
	if(node ==null || node == undefined){return;}
	else{
		value = node.value;
	}
	var args = new Array();
	var lstToFilter = new Array();
	
	var tabSelected = getTabSelected();
	
	if(gPayeeList !=null && gPayeeList!=undefined){		
		for(var i in gPayeeList){
			var obj = new Object();
			obj.value1 = gPayeeList[i].transValue;
			obj.value2 = gPayeeList[i].peopleName;
			obj.index  = i;	
			lstToFilter.push(obj);
		}
		for(var i = 0; i<lstToFilter.length; i++){
			var nameParent1 = lstToFilter[i].value1;
			var nameParent2 = lstToFilter[i].value2
			var ok = false;
			if(nameParent1 != null && nameParent1 != undefined){			
					nameParent1 = nameParent1.toLowerCase();
					if(nameParent1.indexOf(value.toLowerCase()) > -1){						
						args.push(lstToFilter[i]);
						ok = true;
					}
			}
			if(!ok){
				if(nameParent2 != null && nameParent2 != undefined){			
					nameParent2 = nameParent2.toLowerCase();
					if(nameParent2.indexOf(value.toLowerCase()) > -1){						
						args.push(lstToFilter[i]);
					}
				}
			}
		}	
		DialogListInput.prototype.removeData('tab1');
		DialogListInput.prototype.addListData(addDatasuccessefull, args,'tab1');
	}
	var args1 = new Array();
	var lstToFilter1 = new Array();
	//else
	if(lstTemplate !=null && lstTemplate!=undefined){		
		for(var i in lstTemplate){
			var obj = new Object();
			obj.value1 = lstTemplate[i].tai_khoan_dich;
			obj.value2 = lstTemplate[i].name;
			obj.index  = i;
			lstToFilter1.push(obj);
		}
		for(var i = 0; i<lstToFilter1.length; i++){
			var nameParent1 = lstToFilter1[i].value1;
			var nameParent2 = lstToFilter1[i].value2
			var ok = false;
			if(nameParent1 != null && nameParent1 != undefined){			
					nameParent1 = nameParent1.toLowerCase();
					if(nameParent1.indexOf(value.toLowerCase()) > -1){						
						args1.push(lstToFilter1[i]);
						ok = true;
					}
			}
			if(!ok){
				if(nameParent2 != null && nameParent2 != undefined){			
					nameParent2 = nameParent2.toLowerCase();
					if(nameParent2.indexOf(value.toLowerCase()) > -1){						
						args1.push(lstToFilter1[i]);
					}
				}
			}
		}
		DialogListInput.prototype.removeData('tab2');
		DialogListInput.prototype.addListData(addDatasuccessefull, args1,'tab2');
		
	}
	DialogListInput.prototype.activeDataOnTab(getTabSelected());
	/*
	if(value == ''){
		args = 	lstToFilter;		
	}else{
		for(var i = 0; i<lstToFilter.length; i++){
			var nameParent1 = lstToFilter[i].value1;
			var nameParent2 = lstToFilter[i].value2
			var ok = false;
			if(nameParent1 != null && nameParent1 != undefined){			
					nameParent1 = nameParent1.toLowerCase();
					if(nameParent1.indexOf(value.toLowerCase()) > -1){						
						args.push(lstToFilter[i]);
						ok = true;
					}
			}
			if(!ok){
				if(nameParent2 != null && nameParent2 != undefined){			
					nameParent2 = nameParent2.toLowerCase();
					if(nameParent2.indexOf(value.toLowerCase()) > -1){						
						args.push(lstToFilter[i]);
					}
				}
			}
		}	
	}
	DialogListInput.prototype.removeData();
	DialogListInput.prototype.addListData(addDatasuccessefull, args,tabSelected);
	*/
}
//*********************************************************************************************/
//********************************THUANTM DIALOG INPUT END ************************************/

function addDatasuccessefull(node){
}

/*** DIALOG ***/

var evtSelectionDialog = document.createEvent('Event');
evtSelectionDialog.initEvent('evtSelectionDialog', true, true);
var evtSelectionDialogClose = document.createEvent('Event');
evtSelectionDialogClose.initEvent('evtSelectionDialogClose', true, true);
var dialogScroll;

// show dialog list
function showDialogList(inTitle, inArray1, inArray2, showValue) { //inArray1 is the most important, showValue: true - text align left, false - text align right
    hiddenKeyBoard();
	setTimeout(function(){
		var dialogHeight = 0;
		var divID = 'divListGroup';
		var divNode = document.getElementById(divID);
		if ((divNode != null) && (divNode != undefined)) {
			divNode.innerHTML = "";
		}
		else {
			logInfo('Dialog not exist divID: ' + divID);
			return;
		}
		if (inArray1.length <= 0) {
			logInfo('Dialog do not have inArray1 data');
			return;
		}
		
		var dialogDivAll = document.createElement('div');
		var aNodeTitle = document.createElement("a");
		aNodeTitle.setAttribute("class", "list-group-item active dialog-caption");
		aNodeTitle.innerHTML = inTitle;
		divNode.appendChild(aNodeTitle);
		
		var dialogDivContainerScroll = document.createElement('div');
		dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
		dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');
		var dialogDivContainer = document.createElement('div');
	
		for (var x = 1; x < inArray1.length + 1; x++) {
			if(x<6){
				dialogHeight = dialogHeight + 39;
			}
			var aNode = document.createElement("a");
	
			/*if (x == 0) {
				aNode.setAttribute("class", "list-group-item active");
				aNode.innerHTML = inTitle;
				divNode.appendChild(aNode);
			}
			else {*/
				aNode.setAttribute("class", "list-group-item");
				if (showValue) {
					aNode.style.textAlign = "left";
				}
				else {
					aNode.style.textAlign = "center";
				}
	
				aNode.setAttribute("onClick", "selectedItemOnDialog(this," + x +");");
				aNode.innerHTML = inArray1[x - 1];
	
				var tmpValue = inArray2[x - 1];
				if ((tmpValue != undefined) && (tmpValue != null)) {
					var spanNode = document.createElement("span");
					spanNode.setAttribute("class", "badge");
					spanNode.innerHTML = tmpValue;
					if (!showValue) {
						spanNode.style.display = 'none';
					}
					aNode.appendChild(spanNode);
				}
				dialogDivContainer.appendChild(aNode);
			//}
	
		}
		
		dialogDivContainerScroll.appendChild(dialogDivContainer);
		//divNode.appendChild(dialogDivContainerScroll);
		dialogDivAll.appendChild(dialogDivContainerScroll);
		
		divNode.appendChild(dialogDivAll);
		divNode.style.top = (clientHeight-dialogHeight)/2 + 20 + 'px';
		
		if (inArray1.length > 5) {
			dialogScroll = new IScroll('#selection-dialog-scroll', {
				scrollbars: true,
				mouseWheel: true,
				
				
				
				//checkDOMChanges:true,
				draggableScrollbars: true,
				onScrollMove: function() {
					hasDialogContentScrollEvent = true;
				},
				onScrollEnd: function() {
					hasDialogContentScrollEvent = false;
				},
			});
			setTimeout(function () {
				dialogScroll.refresh();
			}, 200);
		}
		
		var dialogContainer = document.getElementById("selection-dialog");
		if (dialogContainer != null) {
			dialogContainer.style.zIndex = 2001;
			dialogContainer.style.display = "block";
			//setTimeout(function (e) {
				dialogContainer.style.opacity = 1;			
			//}, 300);
		}
	}, 0);
	
}

function selectedItemOnDialog(inNode, index) {
	
	if(hasDialogContentScrollEvent){
		hasDialogContentScrollEvent= false;
		return;
	}

    var dialogSelection = document.getElementById("selection-dialog");
	if (inNode.nodeType == 1) {
        if (inNode.tagName == "A") {

            /*var dialogContainer = document.getElementById("selection-dialog");

             if (dialogContainer != null) {
             dialogContainer.style.opacity = 1;
             dialogContainer.style.zIndex = 2001;
             dialogContainer.style.display = "block";
             }*/

            //fire event listener
            
			dialogSelection.style.opacity = 0;
			var tmpDialogTimer = setTimeout(function (e) {
				dialogSelection.style.zIndex = 0;
				dialogSelection.style.display = "none";
				clearTimeout(tmpDialogTimer);
				if (inNode.childNodes[0] != undefined) {
                    evtSelectionDialog.selectedValue1 = inNode.childNodes[0].nodeValue;
                }
                if (inNode.childNodes[1] != undefined) {
                    evtSelectionDialog.selectedValue2 = inNode.childNodes[1].innerHTML;
                }
				evtSelectionDialog.selectedIndex = index;
                document.dispatchEvent(evtSelectionDialog);
			}, 500);
        }
    }
}
function closeDialog(inNode) {
    var dialogSelection = document.getElementById("selection-dialog");

    if (inNode.nodeType == 1) {
        dialogSelection.style.opacity = 0;
		var tmpDialogTimer = setTimeout(function (e) {
			dialogSelection.style.zIndex = 0;
			dialogSelection.style.display = "none";
			clearTimeout(tmpDialogTimer);
			document.dispatchEvent(evtSelectionDialogClose);
		}, 500);
		
    }
}
/*** DIALOG END ***/

/*** DATE PICKER ***/

function initDatePicker(inLang) {
    if (SpinningWheel.openned) {
        SpinningWheel.destroy();
    }
    var now = new Date();
    var days = { };
    var years = { };
    var months = {};//{ 1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dec' };
    if (inLang == 'EN') {
        months = { 1:'Jan', 2:'Feb', 3:'Mar', 4:'Apr', 5:'May', 6:'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec' };
        SpinningWheel.setBtnDoneTitle('Done');
        SpinningWheel.setBtnCancelTitle('Cancel');
    }
    else {
        months = { 1:'1', 2:'2', 3:'3', 4:'4', 5:'5', 6:'6', 7:'7', 8:'8', 9:'9', 10:'10', 11:'11', 12:'12' };
        SpinningWheel.setBtnDoneTitle('Xong');
        SpinningWheel.setBtnCancelTitle('Hủy');
    }
    for (var i = 1; i < 32; i += 1) {
        days[i] = i;
    }

    var currentYear = now.getFullYear();
    if (currentYear < 2014) { //Fix if system time is reset
        currentYear = 2014;
        for (i = currentYear - 5; i < currentYear + 5; i++) {
            years[i] = i;
        }
    }
    else {
        for (i = currentYear - 5; i < currentYear + 3; i++) {
            years[i] = i;
        }
    }

    SpinningWheel.addSlot(days, 'center', now.getDate());
    SpinningWheel.addSlot(months, 'center', now.getMonth());
    SpinningWheel.addSlot(years, 'center', currentYear);
}


/*** DATE PICKER END ***/

/*** MASK VISA CARD ***/

function maskCardNumber(inString) {
    var tmpCardNo = inString.match(/[4|5][-0-9_ \.\,]+/gi);
    if ((tmpCardNo == null) || (tmpCardNo == undefined)) {
        return inString;
    }
    var matches = tmpCardNo.toString();
    var index = inString.indexOf(matches);
    var s1 = inString.substring(0, index);
    var s2 = matches.replace(/[-_ \.\,]/gi, "");
    if (s2.length == 16) {
        s2 = s2.substring(0, 6) + "xxxxxx" + s2.substring(12, 16);
    }
    else {
        return inString;
    }
    var s3 = inString.substring(index + matches.length, inString.length);
    if (s3 == "") {
        inString = s1 + s2 + s3;
    } else if (s3.length > 0) {
        inString = s1 + s2 + " " + s3;
    }
    return inString;
}

/*** MASK VISA CARD END ***/

/*** APPLY DYNAMIC STYLE ***/
//apply dynamic style
var gContentScrollPosition = 0;
var gModeScreenView = CONST_MODE_SCR_MEDIUM;

function applyDynamicPageStyleSheet(forced) {	
	if(isNotNeedReloadPageStyleSheet){
		isNotNeedReloadPageStyleSheet = false;
		return;
	}
	//if(CONST_DESKTOP_MODE) return;
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (currentClientWidth != clientWidth || currentClientHeight != clientHeight || forced) {
        clientWidth = currentClientWidth;
        clientHeight = currentClientHeight;
    }
    
	var tmpPageHeader = document.getElementById('pageHeader');
	if(tmpPageHeader.style.display != 'none' && (gModeScreenView != CONST_MODE_SCR_SMALL || !isModelMobile)) {
		//clientHeight -=195-40;
		clientHeight -= tmpPageHeader.clientHeight; // + 40: footer
	}
	//hidden footer on mobile
	//if(!gIsLogin){
	if(gIsLogin){	
		document.getElementById('mainlayoutfooter').style.display = 'none';
	}
	var tmpGapSub;
	var tmpGapFooter;
	if (!gIsLogin) {
		tmpGapSub = (gModeScreenView == CONST_MODE_SCR_MEDIUM)? 66: 83;
		tmpGapFooter = (gModeScreenView == CONST_MODE_SCR_MEDIUM)? 0: 0;
	}
	else {
		tmpGapSub = (gModeScreenView == CONST_MODE_SCR_MEDIUM)? 66: 83;
		tmpGapFooter = (gModeScreenView == CONST_MODE_SCR_MEDIUM)? 0: 41;
	}
	
    var numOfAccs = gUserInfo.accountList.length;
	
	if(CONST_BROWSER_MODE && navigator.userAgent.match(/iPad;.*CPU.*OS 7_\d/i) && !navigator.userAgent.match(/CriOS/i)) { //fix bug footer on Safari iOS7
		document.getElementById('pageFooter').style.bottom = '20px';
	}
	
	
	if (!gIsLogin)
	{
		//logInfo('Show footer height 41px');
		var styles =
			'.main-layout .main-layout-contents { height: ' + (clientHeight - 180) + 'px; }' +
				'.main-layout .main-layout-subview { height: ' + (clientHeight - tmpGapSub) + 'px; }' +
				'.account-select-content{width: ' + (clientWidth - 10) + 'px;}' +
				'.account-select-content .scroller li {width: ' + (clientWidth - 10) + 'px;}' +
				'.account-select-content .scroller{width: ' + ((clientWidth - 10) * numOfAccs ) + 'px;}';
	}
	else
	{
		//logInfo('Hide footer height 41px');
		var styles =
			'.main-layout .main-layout-contents { height: ' + (clientHeight - 180 + tmpGapFooter) + 'px; }' +
				'.main-layout .main-layout-subview { height: ' + (clientHeight - tmpGapSub + tmpGapFooter) + 'px; }' +
				'.account-select-content{width: ' + (clientWidth - 10) + 'px;}' +
				'.account-select-content .scroller li {width: ' + (clientWidth - 10) + 'px;}' +
				'.account-select-content .scroller{width: ' + ((clientWidth - 10) * numOfAccs ) + 'px;}';
	}		
			
    var style = document.createElement('style');
    style.setAttribute('id', 'pageSlideDynamic');

    var tmpNodeStyle = document.getElementById('pageSlideDynamic');
    if ((tmpNodeStyle == undefined) || (tmpNodeStyle == null)) {
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    else {
        tmpNodeStyle.parentNode.removeChild(tmpNodeStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) { // IE
        style.styleSheet.cssText = styles;
    } else {
        var cssText = document.createTextNode(styles);
        style.appendChild(cssText);
    }
    if (accountSelectScroll != null) {
        accountSelectScroll.destroy();
    }
    var nodeAccScroll = document.getElementById("accountSelectContents");
    if ((nodeAccScroll != null) && (nodeAccScroll != undefined)) {
        accountSelectScroll = new IScroll(nodeAccScroll, {
			scrollbars: true,
            mouseWheel: true,
			
			
			
            snap:true,
            momentum:false,
            hScrollbar:false,
            onScrollStart:function () {
                //var liItems = document.getElementById("thelist").getElementsByTagName("li");
                //for (i = 0; i < liItems.length; i++) {
                //    liItems[i].style.opacity = '0.5';
                //}
            },
            onScrollEnd:function (e) {
                if (e) {

                }
                //var liItems = document.getElementById("thelist").getElementsByTagName("li");
                //for (i = 0; i < liItems.length; i++) {
                //    liItems[i].style.opacity = '1';
                //}
                //DO SOME THING...
            }
        });			
    }

    if ((mainContentScroll !== undefined) && (mainContentScroll !== null)) {
			if(!Environment.isWindows()) { //fix on Windows Phone
				mainContentScroll.destroy();
			}
    }
    var nodeMainScroll = document.getElementById("mainViewContent");
    if ((nodeMainScroll != undefined) && (nodeMainScroll != null)) {
        mainContentScroll = new IScroll(nodeMainScroll, {
			scrollbars: true,
            mouseWheel: true,
			
			
			
			checkDOMChanges:true,
			draggableScrollbars: true,
			onBeforeScrollMove:function (e) {
				if (this.absDistX > (this.absDistY + 5 )) {
					// user is scrolling the x axis, so prevent the browsers native scrolling
					e.preventDefault();
				} else {
					// delegate the scrolling to window object
					//window.scrollBy( 0, -this.distY );
					gContentScrollPosition = this.y; //save iScroll position
				}
			},
			onScrollMove: function() {
				hasMainContentScrollEvent = true;
			},
			onScrollEnd: function() {
				hasMainContentScrollEvent = false;
			},
		});     
    }
	
	//UPDATE TITLE - LAMPT	
	var screenTitle = document.getElementsByClassName('screen-title')[0];		
	if( screenTitle != null && screenTitle != undefined){
		var screenTitleSpan = screenTitle.getElementsByTagName('span')[0];
		if(screenTitleSpan != undefined){
			screenTitleSpan.innerHTML = screenTitleSpan.innerHTML.toUpperCase();
			document.getElementById('lblChangLanguage').innerHTML = screenTitleSpan.innerHTML;
		}
	}	
	
	var menuSelected = document.getElementById(currentPage);
	if(menuSelected){
		var arrayOld = document.getElementsByClassName('langNoStyleSelected');
		while(arrayOld.length > 0){
			arrayOld[0].className = 'langNoStyle';
			arrayOld = document.getElementsByClassName('langNoStyleSelected');
		}			         
		menuSelected.getElementsByTagName('div')[0].className = 'langNoStyle langNoStyleSelected';		
		
		//-->div.li.div.div.ul.li
		var checkNode = menuSelected.parentNode.parentNode.parentNode.parentNode;
		if(checkNode){
			if(checkNode.tagName.toUpperCase() == "UL" && checkNode.className == "menu-layout-contents-sub"){
				if (checkNode.style.height == '0px' || checkNode.style.height == '') {
					applyScrollForMe(checkNode.parentNode); 
				}
				checkNode.parentNode.getElementsByTagName('div')[0].getElementsByTagName('div')[0].className = 'langNoStyle langNoStyleSelected';
			}
		}				
	}	
}

var mainVerticalSlideView;

function applyVerticalScrollPage(forced, inGapsize) {
	//if(CONST_DESKTOP_MODE) return;
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    
    var styles =
        '.main-layout .main-layout-vertical-slideview { height: ' + (clientHeight - 170 - inGapsize) + 'px; }';
    var style = document.createElement('style');
    style.setAttribute('id', 'pageVerticalSlideDynamic');
	//hidden footer on mobile
	//if(!gIsLogin){
	if(gIsLogin){	
		document.getElementById('mainlayoutfooter').style.display = 'none';
	}
    var tmpNodeStyle = document.getElementById('pageVerticalSlideDynamic');
    if ((tmpNodeStyle == undefined) || (tmpNodeStyle == null)) {
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    else {
        tmpNodeStyle.parentNode.removeChild(tmpNodeStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) { // IE
        style.styleSheet.cssText = styles;
    } else {
        var cssText = document.createTextNode(styles);
        style.appendChild(cssText);
    }

    if (mainVerticalSlideView != null) {
        mainVerticalSlideView.destroy();
    }
    var nodeMainScroll = document.getElementById("mainViewVerticalSlide");
    if ((nodeMainScroll != null) && (nodeMainScroll != undefined)) {
        
        mainVerticalSlideView = new IScroll(nodeMainScroll, {
            scrollbars: true,
            mouseWheel: true,
			
			hScrollbar:false,
			vScrollbar:false,
            checkDOMChanges:true,
            onBeforeScrollMove:function (e) {
                if (this.absDistX > (this.absDistY + 5 )) {
                    // user is scrolling the x axis, so prevent the browsers native scrolling
                    e.preventDefault();
                } else {
                    // delegate the scrolling to window object
                    //window.scrollBy( 0, -this.distY );
                }
            }
        });
    }
}

//apply slide view style
function applyHorisonalStyleSheet(inNodeID, inNum) {
    if ((inNodeID == undefined) || (inNodeID == null) || (inNum == undefined) || (inNum == null)) {
        logInfo('horisonal slide is null');
        return;
    }
    if (parseInt(inNum) <= 0) {
        logInfo('horisonal slide num is zero');
        return;
    }
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var styles = '.account-select-content{width: ' + (clientWidth - 10) + 'px;}' +
        '.account-select-content .scroller li {width: ' + (clientWidth - 10) + 'px;}' +
        '.account-select-content .scroller{width: ' + ((clientWidth - 10) * inNum ) + 'px;}';
    var style = document.createElement('style');
    style.setAttribute('id', 'horizonSlideDynamic');

    var tmpNodeStyle = document.getElementById('horizonSlideDynamic');
    if ((tmpNodeStyle == undefined) || (tmpNodeStyle == null)) {
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    else {
        tmpNodeStyle.parentNode.removeChild(tmpNodeStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) { // IE
        style.styleSheet.cssText = styles;
    } else {
        var cssText = document.createTextNode(styles);
        style.appendChild(cssText);
    }
    if (accountSelectScroll != null) {
        accountSelectScroll.destroy();
    }
    var nodeAccScroll = document.getElementById(inNodeID);
    if ((nodeAccScroll != null) && (nodeAccScroll != undefined)) {
        accountSelectScroll = new IScroll(nodeAccScroll, {
			scrollbars: true,
            mouseWheel: true,
			
            snap:true,
            momentum:false,
            hScrollbar:false,
            onScrollStart:function () {
            },
            onScrollEnd:function (e) {
                //DO SOME THING...
            }
        });
    }
    else {
        logInfo('Do not exsit nodeID: ' + inNodeID);
    }
}

//apply slide view style
var slideViewSelectScroll;

function applyHorisonalSlideView(inNodeID) {
    if ((inNodeID == undefined) || (inNodeID == null)) {
        logInfo('horisonal slide nodeID is null');
        return;
    }
    var tmpNode = document.getElementById(inNodeID);
    var tmpUlNode = tmpNode.children[0].children[0];
    var tmpLiArray = tmpUlNode.getElementsByTagName('li');
    var inNum = tmpLiArray.length;

    if (parseInt(inNum) <= 0) {
        logInfo('horisonal slide num is zero');
        return;
    }
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    var styles = '.slide-view-select-content{width: ' + (clientWidth - 20) + 'px;}' +
        '.slide-view-select-content{height: ' + (currentClientHeight - 120) + 'px;}' +
        '.slide-view-select-content .scroller li {width: ' + (clientWidth - 20) + 'px;}' +
        '.slide-view-select-content .scroller li {height: ' + (currentClientHeight - 120) + 'px;}' +
        '.slide-view-select-content .scroller{width: ' + ((clientWidth - 20) * inNum ) + 'px;}' +
        '.slide-view-select-content .scroller{height: ' + (currentClientHeight - 120) + 'px;}';
    var style = document.createElement('style');
    style.setAttribute('id', 'slideScrollDynamic');

    var tmpNodeStyle = document.getElementById('slideScrollDynamic');
    if ((tmpNodeStyle == undefined) || (tmpNodeStyle == null)) {
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    else {
        tmpNodeStyle.parentNode.removeChild(tmpNodeStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) { // IE
        style.styleSheet.cssText = styles;
    } else {
        var cssText = document.createTextNode(styles);
        style.appendChild(cssText);
    }
    if (slideViewSelectScroll != null) {
        slideViewSelectScroll.destroy();
    }
    var nodeAccScroll = document.getElementById(inNodeID);
    if ((nodeAccScroll != null) && (nodeAccScroll != undefined)) {
        slideViewSelectScroll = new IScroll(nodeAccScroll, {
			scrollbars: true,
            mouseWheel: true,
			
            snap:true,
            momentum:false,
            hScrollbar:false,
            onScrollStart:function () {
            },
            onScrollEnd:function (e) {
                //document.querySelector('#indicator > li.active').className = '';
				//document.querySelector('#indicator > li:nth-child(' + (this.currPageX+1) + ')').className = 'active';
            }
        });
    }
    else {
        logInfo('Do not exsit nodeID: ' + inNodeID);
    }
}
//======================thuanTM========================================
function getNumberOfRow(inArrayData, inRow){
	 var numOfRows = inRow;
	 if (inRow == 0) {
        var currentClientHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        var tmpSlideHeight = currentClientHeight - (80 + 40 + 15 + 40);
        var tmpRowHeightWithGap = 46 + 4;
        numOfRows = Math.floor(tmpSlideHeight / tmpRowHeightWithGap);
    }
	return numOfRows;
}

function getNumberOfPage(inArrayData, inRow){
	var numOfRows = getNumberOfRow(inArrayData, inRow);
	var numOfPages = 0;
	 if (inArrayData.length % numOfRows == 0) {
        numOfPages = inArrayData.length / numOfRows;
    }
    else {
        numOfPages = Math.floor(inArrayData.length / numOfRows) + 1;
    }
	return numOfPages;
}
//======================================================================
/*** APPLY DYNAMIC STYLE END ***/

/*** GEN SLIDE VIEW WITH ARRAY DATA ***/

function genSlideViewWith(inArrayData, inRow) {
    var numOfRows = inRow;  //row per page
    var numOfPages = 0;

    if (inRow == 0) {
        var currentClientHeight = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;
        var tmpSlideHeight = currentClientHeight - (80 + 40 + 15 + 40);
        var tmpRowHeightWithGap = 46 + 4;
        numOfRows = Math.floor(tmpSlideHeight / tmpRowHeightWithGap);
    }

    if (inArrayData.length % numOfRows == 0) {
        numOfPages = inArrayData.length / numOfRows;
    }
    else {
        numOfPages = Math.floor(inArrayData.length / numOfRows) + 1;
    }

    var screenWidth = window.innerWidth || document.body.clientWidth;
    var textLength = Math.round(screenWidth * 0.6);

    var tmpSlideViewListHtml = "<ul>";
    for (var idxPage = 0; idxPage < numOfPages; idxPage++) {
        tmpSlideViewListHtml = tmpSlideViewListHtml + "<li>";
        tmpSlideViewListHtml = tmpSlideViewListHtml + "<table width='100%' align='center' class='background-blacktrans'>";
        for (var idxRow = 0; idxRow < numOfRows; idxRow++) {
            var idxOfTransObj = idxPage * numOfRows + idxRow;
            if (idxOfTransObj >= inArrayData.length) {
                break;
            }
            var tmpSlideViewRowObj = new SlideViewRowObj();
            tmpSlideViewRowObj = inArrayData[idxOfTransObj];

            if (tmpSlideViewRowObj.subTitleType == 2) {
                //background-color:rgba(0,204,255,0.4);
                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left'>" +
                    tmpSlideViewRowObj.titleSlideView +
                    "</td>" +
                    "<td rowspan='2' class='td-right-detail-plus'>" +
                    "+" + tmpSlideViewRowObj.subTitleSlideView + " " + "<span class='icon-movenext'></span>" +
                    "</td></tr>";

                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    tmpSlideViewRowObj.detailSlideView +
                    "</div></td></tr>";
            }
            else if (tmpSlideViewRowObj.subTitleType == 3) {
                //background-color:rgba(0,204,255,0.4);
                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left'>" +
                    tmpSlideViewRowObj.titleSlideView +
                    "</td>" +
                    "<td rowspan='2' class='td-right-detail-minus'>" +
                    "-" + tmpSlideViewRowObj.subTitleSlideView + " " + "<span class='icon-movenext'></span>" +
                    "</td></tr>";

                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    tmpSlideViewRowObj.detailSlideView +
                    "</div></td></tr>";
            }
            else {
                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left'>" +
                    tmpSlideViewRowObj.titleSlideView +
                    "</td>" +
                    "<td rowspan='2' class='td-right-detail'>" +
                    tmpSlideViewRowObj.subTitleSlideView + " " + "<span class='icon-movenext'></span>" +
                    "</td></tr>";

                tmpSlideViewListHtml = tmpSlideViewListHtml + "<tr class='trow-default' onClick='showDetailSlideView(" + idxOfTransObj + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    tmpSlideViewRowObj.detailSlideView +
                    "</div></td></tr>";
            }

        }
        tmpSlideViewListHtml = tmpSlideViewListHtml + "</table>";
        tmpSlideViewListHtml = tmpSlideViewListHtml + "</li>";
    }
    tmpSlideViewListHtml = tmpSlideViewListHtml + "</ul>";

    return tmpSlideViewListHtml;
}

/*** GEN SLIDE VIEW WITH ARRAY DATA END ***/

/*** NUMBER UTILITY ***/
//remove special character

function removeSpecialChar(amount) {
	//var tmpStr = amount.replace(/[^0-9.]/g, '');
    return amount.replace(/[^0-9-.]/g, '');//parseFloat(amount.replace(/[^0-9-.]/g, ''));
	//return amount.replace(/[\D\.]/g, '');
}
function removeSpecialCharForNumber(sText) {
	sText = sText.replace(/[^0-9.,]/g, '');
}
function keepOnlyNumber(sText) {
	return sText.replace(/[^0-9.]/g, '');
}
//format currency

function formatNumberToCurrency(amount) {
	var tmpAmount = amount;
	if (typeof(amount) == 'string') {
		//var tmpAmountStr = amount.replace(/\,/g,'');
		var tmpAmountStr = removeSpecialChar(tmpAmount);
		tmpAmount = parseFloat(tmpAmountStr);
	}
    places = 0; //phan thap phan
    symbol = "";//" VND";
    thousand = ",";
    decimal = ".";
    var number = this,
        negative = tmpAmount < 0 ? "-" : "",
        i = parseInt(tmpAmount = Math.abs(+tmpAmount || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(tmpAmount - i).toFixed(places).slice(2) : "" + symbol);
	//return (j ? i.substr(0, j) + thousand : "") + i.substr().replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(tmpAmount - i).toFixed(places).slice(2) : "" + symbol);
}
function formatNumberToCurrencyWithSymbol(amount, inSymbol) {
    var tmpAmount = amount;  
    if (tmpAmount.toString().substring(0,1)=='.') {
        tmpAmount = '0' + tmpAmount;
        return tmpAmount;
    }

	if (typeof(amount) == 'string') {
		//var tmpAmountStr = amount.replace(/\,\-/g,'');
		var tmpAmountStr = removeSpecialChar(tmpAmount);			
		tmpAmount = parseFloat(tmpAmountStr);
	}
    places = 0; //phan thap phan
    symbol = ((inSymbol == undefined) || (inSymbol == null)) ? "" : inSymbol;//" VND";
    thousand = ",";
    decimal = ".";
    var number = this,
        negative = tmpAmount < 0 ? "-" : "",
        i = parseInt(tmpAmount = Math.abs(+tmpAmount || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;    
    return negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(tmpAmount - i).toFixed(places).slice(2) : "" + symbol);

	//return (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(tmpAmount - i).toFixed(places).slice(2) : "" + symbol);
}

function CurrencyFormatted(amount) {
    var re = new RegExp(',', 'g');
    amount = amount.replace(re, '');
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = Number((a[0]));
    if (i == 0)
        return '';

    if (isNaN(i)) {
        return '';
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }

    if (n.length > 0) {
        a.unshift(n);
    }

    n = a.join(delimiter);
    //alert(n);
    return n;
    /**
     if(d.length < 1)
     {
     amount = n;
     }
     else {
     amount = n + '.' + d;
     }
     amount = minus + amount;
     */
    return amount;
}

function formatCurrency(e, des) {
    if (e == undefined) {
        e = window.event || e;
    }
    var keyUnicode = e.charCode || e.keyCode;
    if (e !== undefined) {
        switch (keyUnicode) {

            case 16:
                break; // Shift
            case 17:
                break; // Ctrl
            case 18:
                break; // Alt
            case 27:
                this.value = '';
                break; // Esc: clear entry
            case 35:
                break; // End
            case 36:
                break; // Home
            case 37:
                break; // cursor left
            case 38:
                break; // cursor up
            case 39:
                break; // cursor right
            case 40:
                break; // cursor down
            case 78:
                break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
            case 110:
                break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
            case 190:
                break; // .
            default:
            {
                //alert('a');
                var amount = CurrencyFormatted(removeSpecialChar(des.value));
                des.value = amount;
                //alert(amount);
            }
        }
    }
}

//DOC SO THANH CHU TIENG VIET

function convertNum2WordWithLang(inVal, inLang) {
    var outStr;
    if (inLang == 'EN') {
        outStr = convertNumToWord(inVal);
    }
    else {
        outStr = DocTienBangChu(inVal);
    }
    return outStr;
}

var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

//1. Hàm đọc số có ba chữ số;
function DocSo3ChuSo(baso) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
        KetQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
                KetQua += " mốt ";
            }
            else {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                KetQua += ChuSo[donvi];
            }
            else {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                KetQua += ChuSo[donvi];
            }
            break;
    }
    return KetQua;
}

//2. Hàm đọc số thành chữ (Sử dụng hàm đọc số có ba chữ số)

function DocTienBangChu(SoTien) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var soAm = false;
    var ViTri = new Array();
    if (SoTien < 0) soAm = true;//return "Số tiền âm !";
    if (SoTien == 0) return "";//"Không đồng !";
    if (SoTien > 0) {
        so = SoTien;
    }
    else {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
        //SoTien = 0;
        return "";//"Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    if (isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
    if (isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0) {
        lan = 5;
    }
    else if (ViTri[4] > 0) {
        lan = 4;
    }
    else if (ViTri[3] > 0) {
        lan = 3;
    }
    else if (ViTri[2] > 0) {
        lan = 2;
    }
    else if (ViTri[1] > 0) {
        lan = 1;
    }
    else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = DocSo3ChuSo(ViTri[i]);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += Tien[i];
        if ((i > 0) && (tmp.length > 0)) KetQua += '';//',';//&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
        KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    if (soAm) {
        return "Âm " + KetQua + " đồng";//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }
    else {
        return KetQua + " đồng";//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    }

}

//ENGLISH: convert integer to words
var lt20 = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" ],
    tens = ["", "ten", "twenty", "thirty", "fourty", "fifty", "sixty", "seventy", "eightty", "ninety" ],
    scales = ["", "thousand", "million", "billion", "trillion", "quadrillion", "quintillion", "sextillion", "septillion", "octillion", "nonillion", "decillion" ],
    max = scales.length * 3;

function convertNumToWord(val) {
    var len;

    // special cases
    if (val[0] === "-") {
        return "negative " + convert(val.slice(1) + " dong");
    }
    if (val === "0") {
        return "zero" + " dong";
    }

    val = trim_zeros(val);
    len = val.length;

    // general cases
    if (len < max) {
        return convert_lt_max(val) + " dong";
    }
    if (len >= max) {
        return convert_max(val) + " dong";
    }
}

function convert_max(val) {
    return split_rl(val, max)
        .map(function (val, i, arr) {
            if (i < arr.length - 1) {
                return convert_lt_max(val) + " " + scales.slice(-1);
            }
            return convert_lt_max(val);
        })
        .join(" ");
}

function convert_lt_max(val) {
    var l = val.length;
    if (l < 4) {
        return convert_lt1000(val).trim();
    } else {
        return split_rl(val, 3)
            .map(convert_lt1000)
            .reverse()
            .map(with_scale)
            .reverse()
            .join(" ")
            .trim();
    }
}

function convert_lt1000(val) {
    var rem, l;

    val = trim_zeros(val);
    l = val.length;

    if (l === 0) {
        return "";
    }
    if (l < 3) {
        return convert_lt100(val);
    }
    if (l === 3) { //less than 1000
        rem = val.slice(1);
        if (rem) {
            return lt20[val[0]] + " hundred " + convert_lt1000(rem);
        } else {
            return lt20[val[0]] + " hundred";
        }
    }
}

function convert_lt100(val) {
    if (is_lt20(val)) { // less than 20
        return lt20[val];
    } else if (val[1] === "0") {
        return tens[val[0]];
    } else {
        return tens[val[0]] + "-" + lt20[val[1]];
    }
}


function split_rl(str, n) {
    // takes a string 'str' and an integer 'n'. Splits 'str' into
    // groups of 'n' chars and returns the result as an array. Works
    // from right to left.
    if (str) {
        return Array.prototype.concat
            .apply(split_rl(str.slice(0, (-n)), n), [str.slice(-n)]);
    } else {
        return [];
    }
}

function with_scale(str, i) {
    var scale;
    if (str && i > (-1)) {
        scale = scales[i];
        if (scale !== undefined) {
            return str.trim() + " " + scale;
        } else {
            return convert(str.trim());
        }
    } else {
        return "";
    }
}

function trim_zeros(val) {
    return val.replace(/^0*/, "");
}

function is_lt20(val) {
    return parseInt(val, 10) < 20;
}
//END ENGLISH: convert integer to words

/*** NUMBER UTILITY END ***/


/*** LOAD PAGE ***/
//Global variable
var currentDisplayMenu;
var currentTotalSubmenuHeight;
var orgTotalSubmenuHeight;
var content;
var menuScroll;
console.log(menuScroll);
//var FeedbackScroll;
var mainContentScroll;
var currentMenuItemId;
var itemCanShowInScrollMenu = 3;
var clientHeight;
var clientWidth;
var accountSelectScroll;
var pageJS;
var hasPageJS = false;
var currentPage = ''; //important variable! dont change
var cachedPages = new Array();
var menuSection;
var hasMenuScrollEvent = false;
var hasMainContentScrollEvent = false;
var hasDialogContentScrollEvent = false;
var isNotNeedReloadPageStyleSheet = false;

//promotion
var promotionScroll;
var promotionSection;
var contentPromotion;

function applyDynamicCommonStyleSheet() {
	//if(CONST_DESKTOP_MODE) return;
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
    if (currentClientWidth != clientWidth || currentClientHeight != clientHeight) {
        clientWidth = currentClientWidth;
        clientHeight = currentClientHeight;
    }
    
	var tmpPageHeader = document.getElementById('pageHeader');
	if(tmpPageHeader.style.display != 'none' && (gModeScreenView != CONST_MODE_SCR_SMALL || !isModelMobile)) {
		//clientHeight -=195-40;
		clientHeight -= tmpPageHeader.clientHeight; // + 40: footer
	}
	
    // 23 --> la kich thuoc font cua icon
    //40 --> la chieu cao header
    var submenus = document.getElementsByClassName('menu-layout-contents-sub');
    var itemHeight = 38;//(clientHeight - 40 ) / (submenus.length + itemCanShowInScrollMenu);
    var padding = (itemHeight - 14) / 2;
    var submenuHeight = (clientHeight - 40 ) - submenus.length * itemHeight;
    var styles =
//            '.menu-layout-contents li:target > .menu-layout-contents-sub{height: ' + submenuHeight + 'px;}' +
        /*'.menu-layout-contents li > div span { top: ' + (padding - 2) + 'px;}' +
            '.menu-layout-contents li > div { height: ' + itemHeight + 'px; padding: ' + padding + 'px 0 ' + padding + 'px 50px;}' +
            '.menu-layout-contents em { top: ' + ((itemHeight - 23) / 2 + 0.5) + 'px;}' +
            '.menu-layout-contents-sub em { top: ' + ((itemHeight - 12) / 2 + 0.5) + 'px;}' +
            '.menu-layout-contents-sub li > div .no-child { top: ' + ((itemHeight - 20) / 2 + 0.5) + 'px;}' +*/
            '.loading .circle { margin: ' + (clientHeight / 2 - 50) + 'px auto;}' +
            '.loading .circle1 { top: -' + (clientHeight / 2 - 10) + 'px;}';

    var style = document.createElement('style');
    style.setAttribute('id', 'menuSlideDynamic');

    var tmpNodeStyle = document.getElementById('menuSlideDynamic');
    if ((tmpNodeStyle == undefined) || (tmpNodeStyle == null)) {
        document.getElementsByTagName('head')[0].appendChild(style);
    }
    else {
        tmpNodeStyle.parentNode.removeChild(tmpNodeStyle);
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    if (style.styleSheet) { // IE
        style.styleSheet.cssText = styles;
    } else {
        var cssText = document.createTextNode(styles);
        style.appendChild(cssText);
    }
    if (typeof(menuScroll) != "undefined" && menuScroll != null) {
		menuScroll.destroy();
    }
    
    menuScroll = new IScroll('#wrapper-menu', {
		scrollbars: true,
        mouseWheel: true,
		
		
		
		draggableScrollbars: true,
        onScrollMove: function() {
		    hasMenuScrollEvent = true;
		},
		onScrollEnd: function() {
		    hasMenuScrollEvent = false;
		},
    });
	
	menuSection = document.getElementById('menu-section');
	if(menuSection.style.display == 'none') {
		document.getElementById('wrapper-menu').style.height = clientHeight - 40 + 'px';
	}
    else {
		document.getElementById('wrapper-menu').style.height = clientHeight - 40*2 + 'px';
	}
	var tmpNodeMenu = document.getElementsByClassName('menu-layout-contents')[0];
    //currentTotalSubmenuHeight = tmpNodeMenu.clientHeight;
	currentTotalSubmenuHeight = tmpNodeMenu.childElementCount * itemHeight;
	orgTotalSubmenuHeight = tmpNodeMenu.childElementCount * itemHeight;
    
	//Neu la trang faq thi show box lien he
	//20140911: hien box lien he - begin
	if ((currentPage == "faq-scr-vie" || currentPage == "faq-scr-eng")
		|| currentPage == 'corp/setup/system/forgotPassword/forgot-pw-scr'){
		
		var tmpNodeMain = document.getElementById('mainview');
		tmpNodeMain.style.cssFloat = 'right';				
		tmpNodeMain.style.width = '100%';
		document.getElementById('box_lienhe').style.display = 'block';			
	}else{
		document.getElementById('box_lienhe').style.display = 'none';
	}
	//20140911: hien box lien he - end
	
	//logInfo('applyDynamicCommonStyleSheet finished!');
}

function applyDynamicPromotionWithNumOfItems(inNumItems) {
	//if(CONST_DESKTOP_MODE) return;
    var currentClientHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    var currentClientWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
	
	var tmpPageHeader = document.getElementById('pageHeader');
	//if(((tmpPageHeader.style.display != 'none') && (gModeScreenView != CONST_MODE_SCR_SMALL))) { 
	if(gModeScreenView != CONST_MODE_SCR_SMALL) { 
		//clientHeight -=195-40;
		currentClientHeight -= 40; //40: footer //tmpPageHeader.clientHeight
	}
	
	var tmpPromotionHeight = inNumItems * 64; //height = 64px
	var styles =
        '.promotion-layout-contents { height: ' + tmpPromotionHeight + 'px; }';
	document.getElementById('wrapper-promtion').style.height = currentClientHeight - 40 + 'px';
	
    if (promotionScroll != null) {
        promotionScroll.destroy();
    }
    
    promotionScroll = new IScroll('#wrapper-promtion', {
        /*fixedScrollbar:false*/
		hScrollbar:false,
		vScrollbar:false,
		
		
		
		scrollbars: true,
        mouseWheel: true,
		
		
		
		checkDOMChanges:true
    });
    
}

/** TUANNM5 UPDATE FOR JUMBO**/
function checkJumboAccExist(liItem) {
	var data = {};
	var arrayArgs = new Array();
	if (gJumboAccExistedStat != null) {
		if (gJumboAccExistedStat == false) {
			displaySubMenuForJumboAcc(false);
		} else {
			displaySubMenuForJumboAcc(true);
		}
		applyScrollForMe(liItem);
		
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
		data = getDataFromGprsCmd(gprsCmd);
		requestBacgroundMBService('CMD_CHECK_EXIST_JUMBO_ACC', arrayArgs, function(e){
			gprsResp = parserJSON(e);
			if (checkResponseCodeSuccess(gprsResp.respCode) && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
				if (gprsResp.arguments[0] == 'N') {
					gJumboAccExistedStat = false;
					gliItemJumbo = liItem;
					gJumboAccInfo = gprsResp.arguments;
				} else {
					gJumboAccExistedStat = true;
				}				
			}
		}, function(){
				console.log('Get data from Jumbo fail!');
		});
	} else {
				var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
				data = getDataFromGprsCmd(gprsCmd);
				requestMBService(data, true, 0, function(e){
					gprsResp = parserJSON(e);
					if (gprsResp.respCode != '0' && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
						console.log('Get data from Jumbo fail!');
						var tmpPageName = navController.getDefaultPage();
						var tmpPageType = navController.getDefaultPageType();
						navController.initWithRootView(tmpPageName, true, tmpPageType);
					}
					if (checkResponseCodeSuccess(gprsResp.respCode) && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
						//genReviewScreen();
						if (gprsResp.arguments[0] == 'N') {
							gJumboAccExistedStat = false;
							displaySubMenuForJumboAcc(false);
							gliItemJumbo = liItem;
							gJumboAccInfo = gprsResp.arguments;
						} else {
							gJumboAccExistedStat = true;
							displaySubMenuForJumboAcc(true);
						}
						applyScrollForMe(liItem);
						
					}
				}, function(){
						console.log('Get data from Jumbo fail!');
				});
	}
}

function checkJumboAccExist_New(liItem) {
	var data = {};
	var arrayArgs = new Array();
	if (gJumboAccExistedStat != null) {
		if (gJumboAccExistedStat == false) {
			displaySubMenuForJumboAcc(false);
		} else {
			displaySubMenuForJumboAcc(true);
		}
		//applyScrollForMe(liItem);
		navController.initWithRootView('jumbo/jumbo_check_auto_saving', true, 'xsl')
		
		var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
		data = getDataFromGprsCmd(gprsCmd);
		requestBacgroundMBService('CMD_CHECK_EXIST_JUMBO_ACC', arrayArgs, function(e){
			gprsResp = parserJSON(e);
			if (checkResponseCodeSuccess(gprsResp.respCode) && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
				if (gprsResp.arguments[0] == 'N') {
					gJumboAccExistedStat = false;
					gliItemJumbo = liItem;
					gJumboAccInfo = gprsResp.arguments;
				} else {
					gJumboAccExistedStat = true;
				}				
			}
		}, function(){
				console.log('Get data from Jumbo fail!');
		});
	} else {
				var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC"), "", "", gUserInfo.lang, gUserInfo.sessionID, arrayArgs);
				data = getDataFromGprsCmd(gprsCmd);
				requestMBService(data, true, 0, function(e){
					gprsResp = parserJSON(e);
					if (gprsResp.respCode != '0' && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
						console.log('Get data from Jumbo fail!');
						var tmpPageName = navController.getDefaultPage();
						var tmpPageType = navController.getDefaultPageType();
						navController.initWithRootView(tmpPageName, true, tmpPageType);
					}
					if (checkResponseCodeSuccess(gprsResp.respCode) && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CHECK_EXIST_JUMBO_ACC")))) {
						//genReviewScreen();
						if (gprsResp.arguments[0] == 'N') {
							gJumboAccExistedStat = false;
							displaySubMenuForJumboAcc(false);
							gliItemJumbo = liItem;
							gJumboAccInfo = gprsResp.arguments;
						} else {
							gJumboAccExistedStat = true;
							displaySubMenuForJumboAcc(true);
						}
						//applyScrollForMe(liItem);
						navController.initWithRootView('jumbo/jumbo_check_auto_saving', true, 'xsl')
						
					}
				}, function(){
						console.log('Get data from Jumbo fail!');
				});
	}
}

function displaySubMenuForJumboAcc(isExisted) {
	document.getElementById('wrapper_jumboAcc').innerHTML = gJumboMenuElements;
	changeLanguageInNodeWithClass('langNoStyle');
	var parentDiv = document.getElementById('wrapper_jumboAcc').getElementsByTagName('div')[0];
	if (isExisted == false) {
		//gMenuRawData
		var subMenuAccInfo = document.getElementById('liJumboAccInfo');
		//var subMenuCreateAutoSav = document.getElementById('liJumboCreateAutoSaving');
		parentDiv.removeChild(subMenuAccInfo);
		//parentDiv.removeChild(subMenuCreateAutoSav);
		//alert('N');
	} else {
		var subMenuCreateAcc = document.getElementById('liJumboCreateAcc');
		parentDiv.removeChild(subMenuCreateAcc);
	}
	
}



/**TUANNM5 END UPDATE**/

function applyScrollForMe(liItem) {
	
	if(hasMenuScrollEvent){
		hasMenuScrollEvent = false;
		return;
	}	
	if(interlockStatus) {
		return;
	}	
	setInterlockEnable();
	showMaskSlideMenu(content.isOpen);
	var rowHeight = 38; //row menu height
    if (currentDisplayMenu != undefined && currentDisplayMenu != null && currentDisplayMenu != liItem) {
		var currentSubMenuContent = currentDisplayMenu.getElementsByClassName('menu-layout-contents-sub')[0];
		if(currentSubMenuContent) {
        	currentTotalSubmenuHeight -= currentSubMenuContent.clientHeight;
			currentSubMenuContent.style.height = '0px';
        	//currentSubMenuContent.style.opacity = 0;
		}
    }
	
	if(currentTotalSubmenuHeight < orgTotalSubmenuHeight){
		 currentTotalSubmenuHeight = orgTotalSubmenuHeight;		 
	}
	
    var submenus = liItem.getElementsByClassName('menu-layout-contents-sub')[0];
    var subMenuHight = submenus.getElementsByTagName('li').length * rowHeight;
    if (submenus.style.height == '0px' || submenus.style.height == '') {
        submenus.style.height = subMenuHight + 'px';
        currentTotalSubmenuHeight += subMenuHight;
        submenus.style.opacity = 1;
    }
    else {
        submenus.style.height = '0px';
        //submenus.style.opacity = 0;
        currentTotalSubmenuHeight -= subMenuHight;
    }
	
    document.getElementById('scroller-menu').style.height = currentTotalSubmenuHeight + 'px';
    setTimeout(menuScroll.refresh(), 500);
    currentDisplayMenu = liItem;
}

var evtLoadPageSuccess = document.createEvent('Event'); //Event transaction success
evtLoadPageSuccess.initEvent("evtLoadPageSuccess", true, true);

var evtStartUnloadPage = document.createEvent('Event'); //Event transaction success
evtStartUnloadPage.initEvent("evtStartUnloadPage", true, true);

//var CONST_LOAD_PAGE_FAIL_STATUS = [404, 403, 500, 503];
function isLoadPageFailStatus(inStatus) {
	if(!inStatus) return;
	var tmpSt = inStatus;
	if(typeof(inStatus) == 'string') {
		tmpSt = parseInt(inStatus);
	}
	for(var i=0; i<CONST_LOAD_PAGE_FAIL_STATUS.length; i++) {
		if(tmpSt == CONST_LOAD_PAGE_FAIL_STATUS[i]) {
			return true;
		}
	}
	return false;
}
var gLoadPageID = getCurrentTime();
var CONST_TIME_OUT_LOAD_PAGE = 45; //seconds
var CONST_TIME_OUT_LOAD_PAGE_MSG = 3; //seconds
var timeToShowLoadingMsg;
var timeOutLoadTabHost;

function loadPage(page, haveJs, successCallback, failCallback) {
	//fix bug on iPad
	var isIPad = navigator.userAgent.match(/iPad/i);
	//if(isIPad) windowScrollToTop();
	windowScrollToTop();
	showMaskSlideMenu(false);
	
	//show loading page indicator
	var tabHostMsgNode = document.getElementById('tabHostFailMsg');
	var tabHostIndicatorNode = document.getElementById('tabHostIndicator');
	var tabHostLoadingMsgNode = document.getElementById('tabHostLoadingMsg');
	var tabHostPageNode = document.getElementById('tabHost');
	//load page indicator
	tabHostMsgNode.style.display = 'none';
	tabHostIndicatorNode.style.display = '';
	tabHostLoadingMsgNode.style.display = 'none';
	if(timeToShowLoadingMsg) clearTimeout(timeToShowLoadingMsg);
	if(timeOutLoadTabHost) clearTimeout(timeOutLoadTabHost);
	timeToShowLoadingMsg = setTimeout(function(){
		clearTimeout(timeToShowLoadingMsg);
		tabHostLoadingMsgNode.style.display = 'block';
		tabHostLoadingMsgNode.innerHTML = CONST_STR.get('ERR_LOADING_PAGE_MSG');
	}, CONST_TIME_OUT_LOAD_PAGE_MSG * 1000);
	timeOutLoadTabHost = setTimeout(function(){
		clearTimeout(timeOutLoadTabHost);
		if(tabHostIndicatorNode.style.display != 'none') {
			tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
			tabHostMsgNode.style.display = '';
			tabHostPageNode.innerHTML = '';
		}
		tabHostIndicatorNode.style.display = 'none';
	}, CONST_TIME_OUT_LOAD_PAGE * 1000);
	
	tabHostPageNode.style.display = 'none';
	
	if (gModeScreenView == CONST_MODE_SCR_SMALL) closeAllSlideMenu();
	//if(currentPage != 'login-scr') closeAllSlideMenu();
	var tmpStatusNoCachePage = navCheckPageNoCache(page);
	
    //if ((currentPage != page) || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
		cachePageHTML(currentPage);
		
		//event start unload page
        if(typeof(window['viewWillUnload']) == 'function') {			
			window['viewWillUnload']();
			setTimeout(function(){
				window['viewWillUnload'] = null;
			},10);
			
		}
        //event start unload page
        document.dispatchEvent(evtStartUnloadPage);
		
        if (((navCachedPages[page] == undefined) || (navCachedPages[page] == null)) || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
			tabHostPageNode.innerHTML = '';
			
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			var pathFullOfFile;
			if(CONST_BROWSER_MODE) {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.html' + '?id=' + gLoadPageID) : (gDeviceWWWFolder + 'pages/' + page + '.html' + '?id=' + gLoadPageID);
			}
			else {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.html') : (gDeviceWWWFolder + 'pages/' + page + '.html');
			}
			//var pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.html') : (gDeviceWWWFolder + 'pages/' + page + '.html');
			xhr.open("GET", pathFullOfFile); //assuming kgr.bss is plaintext
			
			xhr.onreadystatechange = function () {
				if ((xhr.readyState == 4) && ((xhr.status == 200) || (xhr.status == 0))) {
					//for testing
					logInfo("pape: " + page + " is ready!");
					
					fadeInMainContentScreen();
					tabHostPageNode.style.display = '';
					tabHostPageNode.innerHTML = xhr.responseText;
					
					//Add change language
					changeLanguageInView();
					//save js status
					hasPageJS = haveJs;
					currentPage = page;
					loadJSfile(page, haveJs, function(){
						//hide page indicator
						tabHostIndicatorNode.style.display = 'none';
						clearTimeout(timeOutLoadTabHost);
						
						var timePageEvent = setTimeout(function(){
							clearTimeout(timePageEvent);
							applyDynamicCommonStyleSheet();
							applyDynamicPageStyleSheet(true);
							if(successCallback && (typeof(successCallback) == 'function')) {
								successCallback();
							}
							if(typeof(window['viewDidLoadSuccess']) == 'function') {
								window['viewDidLoadSuccess']();
								hideExportPrint();
								setTimeout(function(){
									window['viewDidLoadSuccess'] = null;
								},10)
							}
							document.dispatchEvent(evtLoadPageSuccess);
							
							handleKeyboardShowAndHidden();
						}, 10);
						
					}, function() {
						logInfo("Page: " + page + " not found!!!");
						tabHostIndicatorNode.style.display = 'none';
						clearTimeout(timeOutLoadTabHost);
						tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
						tabHostMsgNode.style.display = '';
					});
				}
				else if (isLoadPageFailStatus(xhr.status)) {
					logInfo("Page: " + page + " not found!!!");
					tabHostIndicatorNode.style.display = 'none';
					clearTimeout(timeOutLoadTabHost);
					tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
					tabHostMsgNode.style.display = '';
				}
				else {
					//for testing
					//logInfo("XHR status: " + xhr.status + "readyState: " + xhr.readyState + " pape: " + page + " not ready!");
				}
			};

			//no-cache
			xhr.setRequestHeader("Cache-Control", "no-cache");
			xhr.send();
        }
        else {
            fadeInMainContentScreen();
			tabHostPageNode.style.display = '';
			tabHostPageNode.innerHTML = navCachedPages[page];
			
			//fix cache check box
			var nodeTxts = document.getElementsByTagName("input");
			for (var nx = 0; nx < nodeTxts.length; nx++) {
				var tmpNodeTxt = nodeTxts[nx];
				if(tmpNodeTxt.type == "checkbox") {
					tmpNodeTxt.checked = (tmpNodeTxt.value == 'true')? true: false;
				}
			}
			
			//Add change language
			changeLanguageInView();
			
			//save js status
			hasPageJS = haveJs;
			currentPage = page;
			loadJSfile(page, haveJs, function(){
				
				tabHostIndicatorNode.style.display = 'none';
				clearTimeout(timeOutLoadTabHost);
				
				var timePageEvent = setTimeout(function(e){ //fix on windows phone
					clearTimeout(timePageEvent);
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					if(successCallback && (typeof(successCallback) == 'function')) {
						successCallback();
					}
					if(typeof(window['viewDidLoadSuccess']) == 'function') {
						window['viewDidLoadSuccess']();
						hideExportPrint();
						setTimeout(function(){
							window['viewDidLoadSuccess'] = null;
						},10)
					}
					document.dispatchEvent(evtLoadPageSuccess);
					
					handleKeyboardShowAndHidden();
				}, 10);
			}, function() {
				logInfo("Page: " + page + " not found!!!");
				tabHostIndicatorNode.style.display = 'none';
				clearTimeout(timeOutLoadTabHost);
				tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
				tabHostMsgNode.style.display = '';
			});
        }
	//}
}
function loadJSfile(page, haveJsFile, successCallback, failCallback) {
	if(haveJsFile == undefined) haveJsFile = true;
    if (haveJsFile) {
        //METHOD 1: Load script by file path
		//if(CONST_DEBUG_MODE) {
			head = document.getElementsByTagName('head')[0];
			// next line removes the previously addid External JavaScript
			/*if ((pageJS != undefined) && (pageJS != null)) {
				head.removeChild(pageJS);
			}*/
			pageJS = document.createElement('script');
			pageJS.setAttribute("id", "pageJS");
			pageJS.type = 'text/javascript';
			if(CONST_BROWSER_MODE) {
				pageJS.src = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js' + '?id=' + gLoadPageID) : (gDeviceWWWFolder + 'pages/' + page + '.js' + '?id=' + gLoadPageID);
			}
			else {
				pageJS.src = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js') : (gDeviceWWWFolder + 'pages/' + page + '.js');
			}
			//pageJS.src = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js') : (gDeviceWWWFolder + 'pages/' + page + '.js');
			//head.appendChild(pageJS);
			var tmpPageJS = document.getElementById('pageJS');
			if ((tmpPageJS != undefined) && (tmpPageJS != null)) {
				tmpPageJS.parentNode.replaceChild(pageJS, tmpPageJS);
			}
			else {
				head.appendChild(pageJS);
			}
			var timeoutLoadJS = setTimeout(function(){
				clearTimeout(timeoutLoadJS);
				if(successCallback && (typeof(successCallback) == 'function')) {
					successCallback();
				}
			}, 300);
		/*}
        else {
			//METHOD 2: Load content script in file
			var nodePageJS = document.getElementById("pageJS");
			while (nodePageJS.firstChild) {
				nodePageJS.removeChild(nodePageJS.firstChild);
			}
			var xhr;
			if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			} else if (window.ActiveXObject) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
			var pathFullOfFile;
			if(CONST_BROWSER_MODE) {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js' + '?id=' + gLoadPageID) : (gDeviceWWWFolder + 'pages/' + page + '.js' + '?id=' + gLoadPageID);
			}
			else {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js') : (gDeviceWWWFolder + 'pages/' + page + '.js');
			}
			//var pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.js') : (gDeviceWWWFolder + 'pages/' + page + '.js');
			xhr.open("GET", pathFullOfFile); //assuming kgr.bss is plaintext
			xhr.onreadystatechange = function () {
				if (xhr.readyState==4 && ((xhr.status==200) || (xhr.status==0))){
					var script = document.createElement("script");
					script.type = 'text/javascript';
					script.innerHTML = xhr.responseText;
					nodePageJS.appendChild(script);
					if(successCallback && (typeof(successCallback) == 'function')) {
						successCallback();
					}
				}
				else if(isLoadPageFailStatus(xhr.status)) {
					logInfo("Page Javascript not found");
					if(failCallback && (typeof(failCallback) == 'function')) {
						failCallback();
					}
				}
				else {
					//for testing
					logInfo("XHR status: " + xhr.status + "readyState: " + xhr.readyState + " pape javascript: " + page + " not ready!");
				}
			};
			// no-cache
			xhr.setRequestHeader("Cache-Control", "no-cache");
			xhr.send();
		} */
    }
}

function loadPageXsl(page, haveJs, successCallback, failCallback) {
	//alert(page);
	//fix bug on iPad
	//var isIPad = navigator.userAgent.match(/iPad/i);
	//if(isIPad) windowScrollToTop();
	windowScrollToTop();
	showMaskSlideMenu(false);
	
	//show loading page indicator
	var tabHostMsgNode = document.getElementById('tabHostFailMsg');
	var tabHostIndicatorNode = document.getElementById('tabHostIndicator');
	var tabHostLoadingMsgNode = document.getElementById('tabHostLoadingMsg');
	var tabHostPageNode = document.getElementById('tabHost');
	//load page indicator
	tabHostMsgNode.style.display = 'none';
	tabHostIndicatorNode.style.display = '';
	tabHostLoadingMsgNode.style.display = 'none';
	if(timeToShowLoadingMsg) clearTimeout(timeToShowLoadingMsg);
	if(timeOutLoadTabHost) clearTimeout(timeOutLoadTabHost);
	timeToShowLoadingMsg = setTimeout(function(){
		clearTimeout(timeToShowLoadingMsg);
		tabHostLoadingMsgNode.style.display = 'block';
		tabHostLoadingMsgNode.innerHTML = CONST_STR.get('ERR_LOADING_PAGE_MSG');
	}, CONST_TIME_OUT_LOAD_PAGE_MSG * 1000);
	timeOutLoadTabHost = setTimeout(function(){
		clearTimeout(timeOutLoadTabHost);
		if(tabHostIndicatorNode.style.display != 'none') {
			tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
			tabHostMsgNode.style.display = '';
			tabHostPageNode.innerHTML = '';
		}
		tabHostIndicatorNode.style.display = 'none';
	}, CONST_TIME_OUT_LOAD_PAGE * 1000);
	tabHostPageNode.style.display = 'none';
	
	if (gModeScreenView == CONST_MODE_SCR_SMALL) closeAllSlideMenu();
	//if(currentPage != 'login-scr') closeAllSlideMenu();
	var tmpStatusNoCachePage = navCheckPageNoCache(page);
	
    //if ((currentPage != page) || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
        cachePageHTML(currentPage);
		
        //event start unload page
        if(typeof(window['viewWillUnload']) == 'function') {			
			window['viewWillUnload']();
			setTimeout(function(){
				window['viewWillUnload'] = null;
			},10);
		}
		//event start unload page
        document.dispatchEvent(evtStartUnloadPage);
		
        if ((navCachedPages[page] == undefined) || (navCachedPages[page] == null) || !navCachedXsl[page] || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
			tabHostPageNode.innerHTML = '';
			
			var xhr;
			if (window.ActiveXObject) {
				xhr = new ActiveXObject("Msxml2.XMLHTTP"); //("Microsoft.XMLHTTP");//
			}
			else if (window.XMLHttpRequest) {
				xhr = new XMLHttpRequest();
			}
			var pathFullOfFile;
			if(CONST_BROWSER_MODE) {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl' + '?id=' + gLoadPageID) : (gDeviceWWWFolder + 'pages/' + page + '.xsl' + '?id=' + gLoadPageID);
			}
			else {
				pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl') : (gDeviceWWWFolder + 'pages/' + page + '.xsl');
			}
			//var pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl') : (gDeviceWWWFolder + 'pages/' + page + '.xsl');
			var tmpString = getCurrentTime();
			xhr.open("GET", pathFullOfFile); //assuming kgr.bss is plaintext
			
			xhr.onreadystatechange = function () {
				if ((xhr.readyState == 4) && ((xhr.status == 200) || (xhr.status == 0))) {
					logInfo("pape Xsl: " + page + " is ready!");
					
					if(xhr.responseXML == undefined || xhr.responseXML == null) {
						logInfo('XSL is incorrect format or not exist');
						if(typeof(failCallback) == 'function') {
							failCallback();
						}
						return;
					}
					//save js status
					hasPageJS = haveJs;
					
					setCachePageXsl(page, xhr.responseXML);
					loadJSfile(page, haveJs, function(){
						//hide page indicator
						tabHostIndicatorNode.style.display = 'none';
						clearTimeout(timeOutLoadTabHost);
						
						var tmpXmlData = "";
						var timeInitXml = setTimeout(function(){
							clearTimeout(timeInitXml);
							if(typeof(window['loadInitXML']) == 'function') {
								tmpXmlData = window['loadInitXML']();
								setTimeout(function(){
									window['loadInitXML'] = null;
								},10);
							}
							fadeInMainContentScreen();
							tabHostPageNode.style.display = '';
							navInitPageFromXmlAndXsl(page, tmpXmlData, xhr.responseXML, true, function(){
								if(successCallback && (typeof(successCallback) == 'function')) {
									successCallback();
								}
							}); //stringtoXML(tmpXmlData)
						}, 50);	
					}, function(){
						logInfo("Page: " + page + " not found!!!");
						tabHostIndicatorNode.style.display = 'none';
						clearTimeout(timeOutLoadTabHost);
						tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
						tabHostMsgNode.style.display = '';
					});
				}
				else if (isLoadPageFailStatus(xhr.status)) {
					logInfo("Page Xsl: " + page + " not found!!!");
					tabHostIndicatorNode.style.display = 'none';
					clearTimeout(timeOutLoadTabHost);
					tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
					tabHostMsgNode.style.display = '';
				}
				else {
					//for testing
					//logInfo("XHR status: " + xhr.status + "readyState: " + xhr.readyState + " pape: " + page + " not ready!");
				}
			};

			//no-cache
			xhr.setRequestHeader("Cache-Control","no-cache,max-age=0");
			xhr.setRequestHeader("Pragma", "no-cache");
			xhr.send("");
        }
        else {
			//fix cache check box
			var nodeTxts = document.getElementsByTagName("input");
			for (var nx = 0; nx < nodeTxts.length; nx++) {
				var tmpNodeTxt = nodeTxts[nx];
				if(tmpNodeTxt.type == "checkbox") {
					tmpNodeTxt.checked = (tmpNodeTxt.value == 'true')? true: false;
				}
			}
			
			//Add change language
			//changeLanguageInView();
			
			//save js status
			hasPageJS = haveJs;
			//currentPage = page;
			
			fadeInMainContentScreen();
			tabHostPageNode.style.display = '';
			loadJSfile(page, haveJs, function(){
				
				var tmpXmlData = "";
				var tmpXslData = getCachePageXsl(page);
				setTimeout(function(){
					if(typeof(window['loadInitXML']) == 'function') {
						tmpXmlData = window['loadInitXML']();
						setTimeout(function(){
							window['loadInitXML'] = null;
						},10);
					}
					navInitPageFromXmlAndXsl(page, tmpXmlData, tmpXslData, true, function(){
						//hide page indicator
						tabHostIndicatorNode.style.display = 'none';
						clearTimeout(timeOutLoadTabHost);
						
						if(successCallback && (typeof(successCallback) == 'function')) {
							successCallback();
						}
						}, function() {
							tabHostIndicatorNode.style.display = 'none';
							clearTimeout(timeOutLoadTabHost);
							tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
							tabHostMsgNode.style.display = '';
						}); //stringtoXML(tmpXmlData)
				}, 10);	
			}, function(){
				logInfo("Page: " + page + " not found!!!");
				tabHostIndicatorNode.style.display = 'none';
				clearTimeout(timeOutLoadTabHost);
				tabHostMsgNode.innerHTML = CONST_STR.get('ERR_LOAD_PAGE_FAIL_CONTENT');
				tabHostMsgNode.style.display = '';
			});
        }
    //}
}

function navInitPageFromXmlAndXsl(page, iXml, inXsl, statusCache, successCallback, failCallback) {
	var inXml = iXml;
	if(!validateXml(inXml)) {
		if(failCallback && typeof(failCallback) == 'function') {
			failCallback();
		}
		return "";
	}
	if((inXml==undefined) || (inXml=="")) {
		inXml = createXMLDoc();
		if(!window.ActiveXObject) createXMLNode('root', '', inXml);
		//inXml = createXMLNode('root', '', tmpDoc);
		//inXml = document.implementation.createDocument(null, "root", null);
	}
	//window.scrollTo(0,0);
	if (gModeScreenView == CONST_MODE_SCR_SMALL) closeAllSlideMenu();
	//if(currentPage != 'login-scr') closeAllSlideMenu();
	var tmpStatusNoCachePage = navCheckPageNoCache(page);
	
    //if ((currentPage != page) || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
		if (((navCachedPages[page] == undefined) || (navCachedPages[page] == null)) || (currentPage == navController.getDefaultPage()) || tmpStatusNoCachePage) {
			currentPage = page;
			
			if (window.ActiveXObject || "ActiveXObject" in window) {// || xhttpIE.responseType == "msxml-document") {
				// Load XML 
				var xml = new ActiveXObject("Microsoft.XMLDOM");
				xml.async = false;
				xml.load(inXml);
				
				// Load the XSL
				var xsl = new ActiveXObject("Microsoft.XMLDOM");
				xsl.async = false;
				xsl.load(inXsl);
				var ex = xml.transformNode(xsl)            
				//var ex = inXml.transformNode(inXsl);
				if((ex == undefined) || (ex == null)) {
					if(failCallback && typeof(failCallback) == 'function') {
						failCallback();
					}
					return "";
				}
				var timePageLoad = setTimeout(function() {
					clearTimeout(timePageLoad);
					document.getElementById("tabHost").innerHTML = ex;
					//document.getElementById('tabHost').style.opacity = 1;
					cachePageHTML(page);
					changeLanguageInView();
					setTimeout(function(){
						applyDynamicCommonStyleSheet();
						applyDynamicPageStyleSheet(true);
					}, 300);
					
					var timePageEvent = setTimeout(function(){
						clearTimeout(timePageEvent);
						if(successCallback && (typeof(successCallback) == 'function')) {
							successCallback();
						}
						if(typeof(window['viewDidLoadSuccess']) == 'function') {
							window['viewDidLoadSuccess']();
							hideExportPrint();
							setTimeout(function(){
								window['viewDidLoadSuccess'] = null;
							},10)
						}
						//using with page load has delegate
						document.dispatchEvent(evtLoadPageSuccess);
						
						handleKeyboardShowAndHidden();
					}, 50);	
				}, 300);
			}
			// code for Chrome, Firefox, Opera, etc.
			else if (document.implementation && document.implementation.createDocument) {
				var xsltProcessor = new XSLTProcessor();
				xsltProcessor.importStylesheet(inXsl);
				var resultDocument = xsltProcessor.transformToFragment(inXml, document);
				if((resultDocument == undefined) || (resultDocument == null)) {
					if(failCallback && typeof(failCallback) == 'function') {
						failCallback();
					}
					return "";
				}
				var xmlAsString = new XMLSerializer().serializeToString( resultDocument );
				document.getElementById("tabHost").innerHTML = xmlAsString;
				//document.getElementById('tabHost').style.opacity = 1;
				cachePageHTML(page);
				changeLanguageInView();
				setTimeout(function() {
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
				}, 300);
				
				var timePageEvent = setTimeout(function(){
					clearTimeout(timePageEvent);
					if(successCallback && (typeof(successCallback) == 'function')) {
						successCallback();
					}
					if(typeof(window['viewDidLoadSuccess']) == 'function') {
						window['viewDidLoadSuccess']();
						hideExportPrint();
						setTimeout(function(){
							window['viewDidLoadSuccess'] = null;
						},10)
					}
					//using with page load has delegate
					document.dispatchEvent(evtLoadPageSuccess);
					
					handleKeyboardShowAndHidden();
				}, 50);
			}
			else {
				logInfo('Browser not support init ' + page + 'from XML and XSL');
				document.getElementById('tabHost').style.opacity = 1;
				if(failCallback && typeof(failCallback) == 'function') {
					failCallback();
				}
				return "";
			}
		}
		else {
			currentPage = page;
			
			document.getElementById('tabHost').innerHTML = navCachedPages[page];
			//document.getElementById('tabHost').style.opacity = 1;
			
			//fix cache check box
			var nodeTxts = document.getElementsByTagName("input");
			for (var nx = 0; nx < nodeTxts.length; nx++) {
				var tmpNodeTxt = nodeTxts[nx];
				if(tmpNodeTxt.type == "checkbox") {
					tmpNodeTxt.checked = (tmpNodeTxt.value == 'true')? true: false;
				}
			}
			
			//Add change language
			changeLanguageInView();
			//save js status
			//hasPageJS = haveJs;
			currentPage = page;
			
			var timePageEvent = setTimeout(function(e){ //fix on windows phone
				clearTimeout(timePageEvent);
				setTimeout(function() {
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
				}, 300);
				
				if(successCallback && (typeof(successCallback) == 'function')) {
					successCallback();
				}
				if(typeof(window['viewDidLoadSuccess']) == 'function') {
					window['viewDidLoadSuccess']();
					hideExportPrint();
					setTimeout(function(){
						window['viewDidLoadSuccess'] = null;
					},10);
				}
				//using with page load has delegate
				document.dispatchEvent(evtLoadPageSuccess);
				
				handleKeyboardShowAndHidden();
			}, 50);
		}
	//}
}

function fadeOutMainContentScreen(){	
	document.getElementById('tabHost').style.opacity = 0;		
}

function fadeInMainContentScreen(){	
	var timeFadeInEffect;
	if(timeFadeInEffect) {
		clearTimeout(timeFadeInEffect);
		timeFadeInEffect = null;
	}
	document.getElementById('tabHost').style.opacity = 0;
	timeFadeInEffect = setTimeout(function () {
		document.getElementById('tabHost').style.opacity = 1;
	}, 400);
}

/* TrungVQ: Bo sung element de scrollTo */
function genHTMLStringWithXML(inXml, inXsl, successCallback, failCallback, notUpdateScroll, myElement) {
	if((inXml==undefined) || (inXml=="")) {
		inXml = createXMLDoc();
		if(!window.ActiveXObject) createXMLNode('root', '', inXml);
	}
	if (window.ActiveXObject || "ActiveXObject" in window) { // || xhttp.responseType == "msxml-document") {
		// Load XML 
		var xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
		xml.load(inXml);
		
		// Load the XSL
		var xsl = new ActiveXObject("Microsoft.XMLDOM");
		xsl.async = false;
		xsl.load(inXsl);
		var ex = xml.transformNode(xsl)    
		//var ex = inXml.transformNode(inXsl);
		if((ex == undefined) || (ex == null)) {
			if(failCallback && typeof(failCallback) == 'function') {
				failCallback();
			}
			return "";
		}
		else {
			var timePageLoad = setTimeout(function() {
				clearTimeout(timePageLoad);
				if(successCallback && typeof(successCallback) == 'function') {
					successCallback(ex);
				}
				changeLanguageInView();
                mainContentScroll.refresh();
				if((notUpdateScroll == undefined) || notUpdateScroll) {
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					if (myElement) {
						mainContentScroll.scrollToElement(myElement);
					}
				}
			}, 10);
		}		
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(inXsl);
		var resultDocument = xsltProcessor.transformToFragment(inXml, document);
		if((resultDocument == undefined) || (resultDocument == null)) {
			if(failCallback && typeof(failCallback) == 'function') {
				failCallback();
			}
			return "";
		}
		else {
			var timePageLoad = setTimeout(function() {
				clearTimeout(timePageLoad);				
				if(successCallback && typeof(successCallback) == 'function') {
					var xmlAsString = new XMLSerializer().serializeToString( resultDocument );
					//logInfo(xmlAsString);
					successCallback(xmlAsString);
				}
				changeLanguageInView();
                mainContentScroll.refresh();
				if((notUpdateScroll == undefined) || notUpdateScroll) {
					applyDynamicCommonStyleSheet();
					applyDynamicPageStyleSheet(true);
					if (myElement) {
						mainContentScroll.scrollToElement(myElement);
					}
				}
			}, 10);
		}
	}
	else {
		logInfo('Browser not support init page from XML and XSL');
		if(failCallback && typeof(failCallback) == 'function') {
			failCallback();
		}
		return "";
	}

}

function genXslPageWithXML(inXml, inXsl, successCallback, failCallback) {
	if((inXml==undefined) || (inXml=="")) {
		inXml = createXMLDoc();
		if(!window.ActiveXObject) createXMLNode('root', '', inXml);
	}
	if (window.ActiveXObject || "ActiveXObject" in window) { // || xhttp.responseType == "msxml-document") {
		// Load XML 
		var xml = new ActiveXObject("Microsoft.XMLDOM");
		xml.async = false;
		xml.load(inXml);
		
		// Load the XSL
		var xsl = new ActiveXObject("Microsoft.XMLDOM");
		xsl.async = false;
		xsl.load(inXsl);
		var ex = xml.transformNode(xsl)
		//var ex = inXml.transformNode(inXsl);
		if((ex == undefined) || (ex == null)) {
			if(failCallback && typeof(failCallback) == 'function') {
				failCallback();
			}
			return "";
		}
		else {
			var timePageLoad = setTimeout(function() {
				clearTimeout(timePageLoad);
				if(successCallback && typeof(successCallback) == 'function') {
					successCallback(ex, 'ms');
				}
				changeLanguageInView();
				applyDynamicCommonStyleSheet();
				applyDynamicPageStyleSheet(true);
			}, 10);
		}		
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument) {
		var xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(inXsl);
		var resultDocument = xsltProcessor.transformToFragment(inXml, document);
		if((resultDocument == undefined) || (resultDocument == null)) {
			if(failCallback && typeof(failCallback) == 'function') {
				failCallback();
			}
			return "";
		}
		else {
			var timePageLoad = setTimeout(function() {
				clearTimeout(timePageLoad);				
				if(successCallback && typeof(successCallback) == 'function') {
					successCallback(resultDocument, 'webkit');
				}
				changeLanguageInView();
				applyDynamicCommonStyleSheet();
				applyDynamicPageStyleSheet(true);
			}, 10);
		}
	}
	else {
		logInfo('Browser not support init page from XML and XSL');
		if(failCallback && typeof(failCallback) == 'function') {
			failCallback();
		}
		return "";
	}
}

var xhttpIE;
function loadXMLDoc(filename)
{
	if (window.ActiveXObject || "ActiveXObject" in window)
	{
		xhttpIE = new ActiveXObject("Msxml2.XMLHTTP"); //("Microsoft.XMLHTTP");//
		//xhttpIE = new ActiveXObject("Microsoft.XMLDOM");
	}
	else 
	{
		xhttpIE = new XMLHttpRequest();
	}
	var tmpString = getCurrentTime();
	//xhttpIE.open("GET", filename + '?id=' + tmpString, false);
	xhttpIE.open("GET", filename, false);
	
	//try {xhttpIE.responseType = "msxml-document"} catch(err) {} // Helping IE11
	xhttpIE.send("");
	if(xhttpIE.responseXML) {
		return xhttpIE.responseXML;
	}
	else {
		var tmpStrXml = xhttpIE.responseText;
		var tmpXmlDoc = stringtoXML(tmpStrXml);
		return tmpXmlDoc;
	}
}
function stringtoXML(xmlStr){
	var parseXml;
	if ((typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) || "ActiveXObject" in window) {
		var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = "false";
		xmlDoc.loadXML(xmlStr);
		return xmlDoc;
	}
	else if (window.DOMParser) {
			return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
	} else {
		return "";
	}
}

function XMLToString(oXML)
{
 //code for IE
 if (window.ActiveXObject || 'ActiveXObject' in window) {
	var oString = oXML.xml; return oString;
 } 
 // code for Chrome, Safari, Firefox, Opera, etc.
 else {
	return (new XMLSerializer()).serializeToString(oXML);
	}
}

/*** CREATE XML DOCUMENT ***/

function createXMLDoc() {
	if(window.ActiveXObject || "ActiveXObject" in window) {
		return new window.ActiveXObject("Microsoft.XMLDOM");
	}
	else if (document.implementation && document.implementation.createDocument) {
		return document.implementation.createDocument(null, "", null);
	}
	else {
		logInfo('browser not support create XML');
	}
}

function setNodeText(inNode, inStr) {
	if(inNode.textContent || inNode.textContent != null) {
		inNode.textContent = inStr;
	}
	else {
		inNode.text = inStr;
	}
}

function createXMLNode(nodeKey, nodeValue, inDocXml, nodeParent)
{
	if(typeof(nodeKey) != 'string') return;
	var returnNode;
	if (nodeParent == undefined || nodeParent == null) {
		returnNode = inDocXml.createElement(nodeKey);
		inDocXml.appendChild(returnNode);
	}
	else {
		returnNode = inDocXml.createElement(nodeKey);
		nodeParent.appendChild(returnNode);
	}
	if (nodeValue != undefined && nodeValue != null) {
		setNodeText(returnNode, nodeValue);
	}
	return returnNode;
}

/*** CREATE XML DOCUMENT END ***/

function validateXml(inXml) {
	/*var oParser;
	var oDOM;
	if (window.DOMParser)
	{
		oParser = new DOMParser();
		oDOM = oParser.parseFromString(inXml,"text/xml");
	}
	else // code for IE
	{
		oDOM = new ActiveXObject("Microsoft.XMLDOM");
		oDOM.async=false;
		oDOM.loadXML(inXml); 
	} 
	//var oParser = new DOMParser();
	//var oDOM = oParser.parseFromString(inXml, "application/xml");
	// print the name of the root element or error message
	var tmpStr = oDOM.documentElement.firstChild.nodeName;
	if(tmpStr=='parsererror') {
		logInfo('Validate XML error: ' + oDOM.documentElement.innerHTML);
		return false;
	}
	else */return true;
}

function cachePageHTML(page) {
	/*if ((mainContentScroll !== undefined) && (mainContentScroll !== null)) {			
		mainContentScroll.destroy();			
    }*/
    var nodeTabHost = document.getElementById("tabHost");
    if (page == "login-scr") {
        navCachedPages = null; //clear
        navCachedPages = {}; //create
    }
    else {
        var nodeTxts = document.getElementById("tabHost").getElementsByTagName("input");
        for (var nx = 0; nx < nodeTxts.length; nx++) {
            var tmpNodeTxt = nodeTxts[nx];
            if ((tmpNodeTxt.type == "text") || (tmpNodeTxt.type == "tel") || (tmpNodeTxt.type == "button")) {
                tmpNodeTxt.setAttribute("value", tmpNodeTxt.value);
            }
			else if(tmpNodeTxt.type == "checkbox") { //fix bug cache for check box
				tmpNodeTxt.setAttribute("value", tmpNodeTxt.checked);
			}
        }
        nodeTxts = document.getElementById("tabHost").getElementsByTagName("textarea");
        for (var nx = 0; nx < nodeTxts.length; nx++) {
            var tmpNodeTxt = nodeTxts[nx];
            tmpNodeTxt.innerHTML = tmpNodeTxt.value;
        }
        var tmpStatusNoCachePage = navCheckPageNoCache(page);
        if (!tmpStatusNoCachePage) {
            navCachedPages[page] = nodeTabHost.innerHTML;
        }
    }
}

/*** Cache XSL file ***/
function setCachePageXsl(page, inXsl) {
	if(page == "login-scr") {
		navCachedXsl = null; // clear
		navCachedXsl = {}; //create
	}
	else {
		navCachedXsl[page] = inXsl;
	}
}
function getCachePageXsl(page) {
	if((navCachedXsl[page] == undefined) || (navCachedXsl[page] == null)) {
		//return "";
		//var pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl') : (gDeviceWWWFolder + 'pages/' + page + '.xsl');
		var pathFullOfFile;
		if(CONST_BROWSER_MODE) {
			pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl' + '?id=' + gLoadPageID) : (gDeviceWWWFolder + 'pages/' + page + '.xsl' + '?id=' + gLoadPageID);
		}
		else {
			pathFullOfFile = (gDeviceWWWFolder.length == 0) ? ('./pages/' + page + '.xsl') : (gDeviceWWWFolder + 'pages/' + page + '.xsl');
		}
		var tmpXMLDoc = loadXMLDoc(pathFullOfFile);
		if(tmpXMLDoc != undefined) navCachedXsl[page] = tmpXMLDoc;
		return tmpXMLDoc;
	}
	else {
		return navCachedXsl[page];
	}
}
function checkCachePageXsl(page) {
	for(var tmpPage in navCachedXsl) {
		if(tmpPage == page) return true;
	}
	return false;
}
/*** Cache XSL file end ***/

function showSlideMenu() {
    if (gIsLogin) {
        if(!interlockStatus && !contentPromotion.isOpen) { //content.toggle();
			content.toggle();
		}
		displayMenuSection(content.isOpen);
		setInterlockEnable();
		//LamPT Add thêm refresh cho menu scroll khi show menu
		setTimeout(menuScroll.refresh(), 300);		
		
		//change
		//applyDynamicCommonStyleSheet();
    }
}

function showSlidePromotion() {
	if(!interlockStatus && !content.isOpen) { //contentPromotion.toggle();
		contentPromotion.toggle();
	}
    displayPromotionSection(contentPromotion.isOpen);
	setInterlockEnable();
}

/*** LOAD PAGE END ***/

/*** NAVIGATION CONTROLLER ***/

var navArrayScr = new Array();
var navData = {};
var navCachedPages = {};
var navArrayOldScr = new Array();
var navExceptionPages = ['com-input-account', 'bankinfo/bank-info-tpb-atm-map', 'com-input-payee-account'];
//var navPageNoCache = ['com-input-account', 'com-review-scr', 'com-authentication-scr', 'transfer/trans-input-bank', 'transfer/trans-input-city', 'transfer/trans-input-branch', 'bankinfo/bank-info-tpb-branch-city', 'bankinfo/bank-info-tpb-branch-list', 'bankinfo/bank-info-tpb-atm-map', 'com-promotion-view', 'egold/gold-main-page-scr', 'com-limit-authentication-scr', 'com-limit-review-scr', 'com-review-noauthen-scr', 'com-review-result-scr', 'com-review-xsl-scr', 'loan/loan-review-scr', 'introducexsl/introduce_new_customer_display'];

var navCachedXsl = {};
var navPageMode = ['html', 'xsl'];
var navDefaultPage = 'login-scr';
var navDefaultPageType = '';

var navController = {
	setDefaultPage:function (inPage, inType) {
        navDefaultPage = inPage;
		(inType == undefined)? navDefaultPageType = '': navDefaultPageType = inType;
    },
	getDefaultPage:function () {
        return navDefaultPage;
    },
	getDefaultPageType:function () {
        return navDefaultPageType;
    },	
    initWithRootView:function (pageView, jsStatus, inType, successCallback, failCallback) {
    	if(hasMenuScrollEvent){
    		hasMenuScrollEvent = false;
    		return;
    	}
		navArrayOldScr = navArrayScr.slice(0);
		//clear cache --> disable cache all
		navRemoveAll();
		gCorp = {};
		
		if(inType == undefined) {
			navInitWithRootView(pageView, jsStatus, successCallback, failCallback);
			return;
		}
		switch(inType) {
			case navPageMode[1]: {
				navInitWithRootViewXsl(pageView, jsStatus, successCallback, failCallback);
				break;
			}
			default: {
				navInitWithRootView(pageView, jsStatus, successCallback, failCallback);
				break;
			}
		}		
    },
    pushToView:function (pageView, jsStatus, inType, successCallback) {
		if(inType == undefined || inType == null || inType == '') {
			navPushToView(pageView, jsStatus);
			return;
		}
		switch(inType) {
			case navPageMode[1]: {
				navPushToViewXsl(pageView, jsStatus, successCallback);
				break;
			}
			default: {
				navPushToView(pageView, jsStatus);
				break;
			}
		}
    },
    popView:function (jsStatus) {
        hiddenKeyBoard();
        navPopView(jsStatus);
    },
    popToRootView:function (jsStatus) {
        navPopToRootView(jsStatus);
    },
    popToView:function (pageView, jsStatus) {
        navPopToView(pageView, jsStatus);
    },
    removePageAtIndex:function (indx) {
        navRemovePageAtIndex(indx);
    },
    resetAll:function () {
        navRemoveAll();
    },
    resetBranchView:function (jsStatus) {
        navResetBranchView(jsStatus);
    },
	resetCacheBranch: function() {
		if(navArrayOldScr != undefined && navArrayOldScr != null) {
			for (var i = 0; i < navArrayOldScr.length; i++) {
				delete navCachedPages[navArrayOldScr[i]];// = null;
			}
			delete navData[navArrayOldScr[0]];// = null;
		}
		else {
			if(navArrayOldScr != undefined && navArrayOldScr != null && navArrayOldScr[0] != undefined) {
				delete navData[navArrayOldScr[0]];// = null;
			}
		}
		//navArrayScr = new Array();
	},
	initWithRootViewNoCache:function (pageView, jsStatus, inType) {
		if(navArrayOldScr != undefined && navArrayOldScr != null) {
			for (var i = 0; i < navArrayOldScr.length; i++) {
				delete navCachedPages[navArrayOldScr[i]];// = null;
			}
			delete navData[navArrayOldScr[0]];// = null;
		}
		else {
			if(navArrayOldScr != undefined && navArrayOldScr != null && navArrayOldScr[0] != undefined) {
				delete navData[navArrayOldScr[0]];// = null;
			}
		}
		navArrayScr = new Array();
		
		if(inType == undefined) {
			navInitWithRootView(pageView, jsStatus);
			return;
		}
		switch(inType) {
			case navPageMode[1]: {
				navInitWithRootViewXsl(pageView, jsStatus);
				break;
			}
			default: {
				navInitWithRootView(pageView, jsStatus);
				break;
			}
		}
    }
}

function getNumOfObjs(inObj) {
    return Object.keys(inObj).length;
}

function navInitWithRootView(pageView, jsStatus, successCallback, failCallback) {

    //var tmpArr = navData[pageView];
    //if ((tmpArr == undefined) || (tmpArr == null)) {
        tmpArr = new Array();
        tmpArr[0] = pageView;
        navData[pageView] = tmpArr;
        navArrayScr = new Array();
        navArrayScr = tmpArr;
        loadPage(navArrayScr[0], jsStatus, successCallback, failCallback);
    /*}
    else {
        //remove cached exception page
        var tmpStatus = false;
        for (var i = (tmpArr.length - 1); i > 0; i--) {
            for (var j = 0; j < navExceptionPages.length; j++) {
                if (tmpArr[i] == navExceptionPages[j]) {
                    tmpArr.pop();
                    tmpStatus = true;
                }
            }
            if (tmpStatus) {
                tmpStatus = false;
            }
            else {
                navData[pageView] = tmpArr;
                break;
            }
        }
		var tmpStatusNoCachePage = navCheckPageNoCache(navArrayScr[0]);
		
        //call last page of branch
        navArrayScr = new Array();
        navArrayScr = tmpArr;
		if(tmpStatusNoCachePage) {
			loadPage(navArrayScr[0], jsStatus);
		}
        else {
			loadPage(navArrayScr[navArrayScr.length - 1], jsStatus);
		}
    }*/
}

function navInitWithRootViewXsl(pageView, jsStatus, successCallback, failCallback) {

    //var tmpArr = navData[pageView];
	//var tmpXslStatus = checkCachePageXsl(navArrayScr[navArrayScr.length - 1]);
	//if ((tmpArr == undefined) || (tmpArr == null)) {
        tmpArr = new Array();
        tmpArr[0] = pageView;
        navData[pageView] = tmpArr;
        navArrayScr = new Array();
        navArrayScr = tmpArr;
		loadPageXsl(navArrayScr[0], jsStatus, successCallback, failCallback);
    /*}
    else {
        //remove cached exception page
        var tmpStatus = false;
        for (var i = (tmpArr.length - 1); i > 0; i--) {
            for (var j = 0; j < navExceptionPages.length; j++) {
                if (tmpArr[i] == navExceptionPages[j]) {
                    tmpArr.pop();
                    tmpStatus = true;
                }
            }
            if (tmpStatus) {
                tmpStatus = false;
            }
            else {
                navData[pageView] = tmpArr;
                break;
            }
        }
		
		var tmpStatusNoCachePage = navCheckPageNoCache(navArrayScr[0]);
        
		//call last page of branch
        navArrayScr = new Array();
        navArrayScr = tmpArr;
		
		if(tmpStatusNoCachePage) {
			loadPageXsl(navArrayScr[0], jsStatus);
		}
        else {
			loadPageXsl(navArrayScr[navArrayScr.length - 1], jsStatus);
		}
    }*/
}

function navPushToView(pageView, jsStatus) {
    if (pageView != navArrayScr[navArrayScr.length - 1]) {
        navArrayScr.push(pageView);
        navData[navArrayScr[0]] = navArrayScr;
        loadPage(pageView, jsStatus);
    }
}
function navPushToViewXsl(pageView, jsStatus, successCallback) {
    if (pageView != navArrayScr[navArrayScr.length - 1]) {
        navArrayScr.push(pageView);
        navData[navArrayScr[0]] = navArrayScr;
		var tmpXslStatus = checkCachePageXsl([navArrayScr.length - 1]);
		loadPageXsl(pageView, jsStatus, successCallback);
    }
}

function navPopView(jsStatus) {
    if (navArrayScr.length < 2) {
        var tmpXslStatus = checkCachePageXsl(navArrayScr[0]);
		if(tmpXslStatus) {
			loadPageXsl(navArrayScr[0], jsStatus);
		}
		else {
			loadPage(navArrayScr[0], jsStatus);
		}
    }
    else {
        navArrayScr.pop();
        navData[navArrayScr[0]] = navArrayScr;
		var tmpXslStatus = checkCachePageXsl(navArrayScr[navArrayScr.length - 1]);
		if(tmpXslStatus) {
			loadPageXsl(navArrayScr[navArrayScr.length - 1], jsStatus, function(){
				if(typeof(window['viewBackFromOther']) == 'function') {
					window['viewBackFromOther']();
					setTimeout(function(){
						window['viewBackFromOther'] = null;
					},10)
				}
			});
		}
        else { 
			loadPage(navArrayScr[navArrayScr.length - 1], jsStatus, function(){
				if(typeof(window['viewBackFromOther']) == 'function') {
					window['viewBackFromOther']();
					setTimeout(function(){
						window['viewBackFromOther'] = null;
					},10)
				}
			});
		}
    }
}
function navPopToView(pageView, jsStatus) {
    var tmpIs = navArrayScr.length - 1;
    while ((tmpIs > 0) && navArrayScr[tmpIs] != pageView) {
        navArrayScr.pop();
        tmpIs--;
    }
    navData[navArrayScr[0]] = navArrayScr;
	var tmpXslStatus = checkCachePageXsl([navArrayScr.length - 1]);
	if(tmpXslStatus) {
		loadPageXsl(navArrayScr[navArrayScr.length - 1], jsStatus, function(){
			if(typeof(window['viewBackFromOther']) == 'function') {
				window['viewBackFromOther']();
				setTimeout(function(){
					window['viewBackFromOther'] = null;
				},10)
			}
		});
	}
	else {
    	loadPage(navArrayScr[navArrayScr.length - 1], jsStatus, function(){
			if(typeof(window['viewBackFromOther']) == 'function') {
				window['viewBackFromOther']();
				setTimeout(function(){
					window['viewBackFromOther'] = null;
				},10)
			}
		});
	}
    
}
function navPopToRootView(jsStatus) {
    var rootView = navArrayScr[0];
	navArrayScr = new Array();
    navArrayScr[0] = rootView;
    delete navData[rootView];
    navData[rootView] = navArrayScr;
	var tmpXslStatus = checkCachePageXsl(navArrayScr[0]);
	if(tmpXslStatus) {
		loadPageXsl(navArrayScr[0], jsStatus);
	}
	else {
    	loadPage(navArrayScr[0], jsStatus);
	}
}
function navRemovePageAtIndex(indx) {
    if ((indx < navArrayScr.length) && (indx > 0)) {
        var rootView = navArrayScr[0];
        navArrayScr.splice(indx, 1);
        if (navArrayScr.length > 0) {
            navData[navArrayScr[0]] = navArrayScr;
        }
        else {
			navData[rootView] = null;
            //delete navData[rootView];
        }
        return true;
    }
    else {
        return false;
    }
}
function navRemoveAll() {
    navArrayScr = new Array();
    navData = {};
    navCachedPages = {};
}
function navResetBranchView(jsStatus) {
    var rootView = navArrayScr[0];
    for (var i = 0; i < navArrayScr.length; i++) {
		navCachedPages[navArrayScr[i]] = null;
        //delete navCachedPages[navArrayScr[i]];
    }
    navArrayScr = new Array();
    navArrayScr[0] = rootView;
    delete navData[rootView];
    navData[rootView] = navArrayScr;
	var tmpXslStatus = checkCachePageXsl(navArrayScr[0]);
	if(tmpXslStatus) {
		loadPageXsl(navArrayScr[0], jsStatus);
	}
	else {
		loadPage(navArrayScr[0], jsStatus);
	}
}

function navCheckPageNoCache(inPage) {
    var tmpCheckPage = false;
    for (var i = 0; i < navPageNoCache.length; i++) {
        if (inPage == navPageNoCache[i]) {
            tmpCheckPage = true;
			break;
        }
    }
    return tmpCheckPage;
}

function navCheckPageCachedStatus(page) {
    if ((navCachedPages[page] == undefined) || (navCachedPages[page] == null) || (navCachedPages[page].length < 10)) {
        return false;
    }
    else {
        return true;
    }
}

/*** NAVIGATION CONTROLLER END ***/

/*** LOGOUT ***/
//timer to logout
//var CONST_TIMER_TO_LOGOUT = 120; //cu 2 phut
var CONST_TIMER_TO_LOGOUT = 900;
var gLastUsingTime;

function logout() {
    if (!interlockStatus) {
        //save logut status
		showLoadingMask();
		var args = ["", {
            sequenceId: 1
        }];
        var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_TYPE_LOGOUT"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
        var data = getDataFromGprsCmd(gprsCmd);
        var redirect = function() {
            window.onbeforeunload = '';
            var url = location.protocol + '//' + location.host + location.pathname;
            if (getURLParam('ver')) {
                url += '?ver=' + getURLParam('ver');
            }
            window.top.location.href = url;
        };

        requestMBServiceCorp(data, true, 0, redirect, redirect);

        setTimeout(function() {
            redirect();
        }, 5000);
    }
    setInterlockEnable();
}

function setTimerCheckLogout() {
	if(document.addEventListener)
	{
		var events = ['click', 'mousemove', 'keydown', 'touchstart'],
		evtLength = events.length,
		timer = 2,
		delay = CONST_TIMER_TO_LOGOUT * 1000,
		resetTimeToLogout = function () {
				clearTimeout(timer);
				gLastUsingTime = getCurrentTime();
				if(gIsLogin) {
					timer = setTimeout(logout, delay);
				}
		};
		while (evtLength--) {
			document.addEventListener(events[evtLength], resetTimeToLogout, false);
		}
		resetTimeToLogout();
	}
	else
	{
		window.attachEvent("onload",function(){
		   var wait = setTimeout(logout, CONST_TIMER_TO_LOGOUT * 1000);
		   function resetTimeoutLogout()
		   {
				clearTimeout(wait);
				
				gLastUsingTime = getCurrentTime();
				if(gIsLogin) {
					wait = setTimeout(logout, CONST_TIMER_TO_LOGOUT * 1000);
				}
		   }
		   window.document.attachEvent("onmousemove",resetTimeoutLogout);
		   window.document.attachEvent("onclick",resetTimeoutLogout);
		   window.document.attachEvent("onkeydown",resetTimeoutLogout);
		});
	 }
}

/*** LOGOUT END ***/

/*** DETECT VISIBLE ***/

/*var stateVisiblePage = (function(){
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function(c) {
        if (c) document.addEventListener(eventKey, c);
        return !document[stateKey];
    }
})();

var gTimerVisiblePage;

stateVisiblePage(function(){
	var tmpStatus = stateVisiblePage();
	if(!tmpStatus) {
		gTimerVisiblePage = setTimeout(function() {
			if(gIsLogin) {
				window.onbeforeunload = '';
				window.location.href = '';
			}
		}, 120*1000);
	}
	else {
		clearTimeout(gTimerVisiblePage);
	}
});*/


/*** DETECT VISIBLE END ***/

/*** APP PHONEGAP ***/

var app = {
    // Application Constructor
    initialize:function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents:function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady:function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent:function (id) {
        /*var parentElement = document.getElementById(id);
         var listeningElement = parentElement.querySelector('.listening');
         var receivedElement = parentElement.querySelector('.received');

         listeningElement.setAttribute('style', 'display:none;');
         receivedElement.setAttribute('style', 'display:block;');*/

        var server = "https://ebank.tpb.vn/";
        var fingerprint = "8B 63 26 BD 8A 94 29 0F D9 ED 88 BE A0 E9 FB 51 F7 27 D8 E6"; // valid until sep 2014

        window.plugins.sslCertificateChecker.check(successCallback, errorCallback, server, fingerprint);

        function successCallback(message) {
            //alert(message);
            // Message is always: CONNECTION_SECURE.
            // Now do something with the trusted server.
        }

        function errorCallback(message) {
            //alert(message);
            if (message == "CONNECTION_NOT_SECURE") {
                // There is likely a man in the middle attack going on, be careful!
            } else if (message == "CONNECTION_FAILED") {
                // There was no connection (yet). Internet may be down. Try again (a few times) after a little timeout.
            }
        }

        logInfo('Received Event: ' + id);
    }
};

/*** APP PHONEGAP END ***/

/*** LOAD CORDOVA JS FILE ***/
var loadedPGlib = false;
function loadPhoneGapJS() {
    var phonegapJS = document.createElement('script');
    phonegapJS.setAttribute("id", "phonegapJS");
    phonegapJS.type = 'text/javascript';
    //alert('Load PG js');
    if (Environment.isIOS() && !Environment.isWindows()) {
        phonegapJS.src = CONST_WEB_URL_LINK + 'assets/libs/cordova/' + 'cordova_iOS.js';
		loadedPGlib = true;
    }
    else if (Environment.isAndroid()) {
        phonegapJS.src = CONST_WEB_URL_LINK + 'assets/libs/cordova/' + 'cordova_Android.js';
		loadedPGlib = true;
    }
    else if (Environment.isWindows()) {
        phonegapJS.src = CONST_WEB_URL_LINK + 'assets/libs/cordova/' + 'cordova_WP.js';
		loadedPGlib = true;
    }
    head = document.getElementsByTagName('body')[0];

    head.appendChild(phonegapJS);
}

/*** LOAD CORDOVA JS FILE ***/

/*** HANDLE SWEPT LEFT-RIGHT ***/

var pointStartX = 0,
    pointStartY = 0,
    pointEndX = 0,
    pointEndY = 0;

var hasTouch = 'ontouchstart' in window,
    isMSIE = window.navigator.msPointerEnabled,
    START_EV = hasTouch ? 'touchstart' : 'mousedown',
    MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
    END_EV = hasTouch ? 'touchend' : 'mouseup',
    CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup';

/*START_EV = isMSIE ? 'MSPointerDown' : START_EV,
 MOVE_EV = isMSIE ? 'MSPointerMove' : MOVE_EV,
 END_EV = isMSIE ? 'MSPointerUp' : END_EV,
 CANCEL_EV = isMSIE ? 'MSPointerUp' : 'mouseup';*/

function HandleTouchEvent() {
	document.addEventListener(START_EV, handleTouchStart, false);
}

function isIOS_Safari()
{
	if((browserName.toString() == 'Safari')||(browserName.toString() == 'iPad')||(browserName.toString() == 'iPhone'))
	{
		return true;
	}
	else
	{
		return false;
	}	
}

function hiddenKeyBoard() {
	//if(!Environment.isMobile) return;
	//if(Environment.isAndroid()) return;
    if((Environment.isIOS() && !Environment.isWindows()) || Environment.isAndroid()) //except windows phone
	{
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
}

var lockTouchSlide = false;
var touchArrayNodeIDLockSlide = ['loadingMask' , 'alert-confirm-dialog', 'alert-info-dialog', 'selection-dialog'];
function checkTouchLocked() {
    for (var i = 0; i < touchArrayNodeIDLockSlide.length; i++) {
        var tmpNode = document.getElementById(touchArrayNodeIDLockSlide[i]);
        if ((tmpNode != undefined) && (tmpNode.style.display != 'none')) {
            return true;
        }
    }
    return false;
}

function checkToLogoutSystem() {
	if((getCurrentTime() - gLastUsingTime > CONST_TIMER_TO_LOGOUT * 1000) && gIsLogin) {
	//if((getCurrentTime() - gLastUsingTime > 10 * 1000) && gIsLogin) {
		logInfo('logout');
		logout();
	}
	
}

function handleTouchStart(evt) {
	//evt.preventDefault();
	checkToLogoutSystem();
	
    if (evt.target.nodeType != 1) return;
	//var tmpMenu = document.getElementById('menu-section');
	//if(tmpMenu.style.display != 'none'  || !gIsLogin) return;
	if(gModeScreenView != CONST_MODE_SCR_SMALL) return; // || !gIsLogin
	
	if((currentPage == "bankinfo/bank-info-tpb-atm-map")) return;
	
    lockTouchSlide = checkTouchLocked();
	if((browserName.toString() == 'Safari')||(browserName.toString() == 'iPad')||(browserName.toString() == 'iPhone'))
	{
	lockTouchSlide = true;
	}
    if (!lockTouchSlide) {

        /*if (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS()) {
         hiddenKeyBoard();
         }*/

        if (hasTouch) {
            pointStartX = evt.touches[0].pageX;
            pointStartY = evt.touches[0].pageY;
        }
        else {
            pointStartX = evt.pageX;
            pointStartY = evt.pageY;
        }
        pointEndX = pointStartX;
        pointEndY = pointStartY;
        //logInfo('Start touch: X= ' + pointStartX + ' Y= ' + pointStartY);

        document.addEventListener(MOVE_EV, handleTouchMove, false);
        document.addEventListener(END_EV, handleTouchEnd, false);
        document.addEventListener(CANCEL_EV, handleTouchEnd, false);
    }
}

function handleTouchMove(evt) {
	evt.preventDefault();
	if(gModeScreenView != CONST_MODE_SCR_SMALL) return;
	
    if (hasTouch) {
        pointEndX = evt.touches[0].pageX;
        pointEndY = evt.touches[0].pageY;
    }
    else {
        pointEndX = evt.pageX;
        pointEndY = evt.pageY;
    }
    //logInfo('Move touch: X= ' + pointEndX + ' Y= ' + pointEndY);
}

function handleTouchEnd(evt) {
	//evt.preventDefault();
	if(gModeScreenView != CONST_MODE_SCR_SMALL) return;
	
    var distX = 0,
        distY = 0;
    distX = Math.abs(pointEndX - pointStartX);
    distY = Math.abs(pointEndY - pointStartY);
    //logInfo('End touch: X= ' + pointEndX + ' Y= ' + pointEndY + ' distX= ' + distX + ' distY= ' + distY);
    /*if ((distX > 10) || (distY > 0)) {
        //hiddenKeyBoard();
        //if (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS()) {
		if((Environment.isIOS() && !Environment.isWindows()) || Environment.isBlackBerry()) {// || Environment.isAndroid()) 
         	hiddenKeyBoard();
         }
    }*/
    
    if ((distX > 80) && (distX > distY + 5) && (pointStartX < pointEndX)) {
		var stNode = checkIsChildOfClass(evt.target, 'main-layout');
		var accNode = checkIsChildOfClass(evt.target, 'account-select');
		var slideViewNode = checkIsChildOfClass(evt.target, 'slide-view-select');
        if (content != undefined && gIsLogin) {
            if (!content.isOpen && !contentPromotion.isOpen && stNode && !accNode && !slideViewNode) {
                openMenuContent();
            }
			
        }
		if ((contentPromotion != undefined) && (contentPromotion.isOpen) && stNode && !accNode && !slideViewNode) {
			closeMenuPromotion();
		}
    }
    /*
    else if ((distX > 80) && (distX > distY + 5) && (pointStartX > pointEndX)) {
        var stNode = checkIsChildOfClass(evt.target, 'main-layout');
        var accNode = checkIsChildOfClass(evt.target, 'account-select');
        var slideViewNode = checkIsChildOfClass(evt.target, 'slide-view-select');
		if (!contentPromotion.isOpen && !content.isOpen && stNode && !accNode && !slideViewNode) {
			openMenuPromotion();
		}
        if ((content != undefined) && (content.isOpen) && stNode && !accNode && !slideViewNode) {
            closeMenuContent();
        }
		
    }
    */
    else if ((distX < 5) && (distY < 5)) {
        var stNode = checkIsChildOfClass(evt.target, 'main-layout');
        if ((content != undefined) && content.isOpen && stNode) {
            closeMenuContent();
        }
		if ((contentPromotion != undefined) && contentPromotion.isOpen && stNode) {
			closeMenuPromotion();
		}
    }
	else {
		var stNode = checkIsChildOfClass(evt.target, 'main-layout');
        if ((content != undefined) && content.isOpen && stNode) {
            closeMenuContent();
        }
		if ((contentPromotion != undefined) && contentPromotion.isOpen && stNode) {
			closeMenuPromotion();
		}
	}
    document.removeEventListener(MOVE_EV, handleTouchMove, false);
    document.removeEventListener(END_EV, handleTouchEnd, false);
    document.removeEventListener(CANCEL_EV, handleTouchEnd, false);
}

function displayMenuSection(isDisplayOn) {
    if (isDisplayOn) {
        menuSection.style.display = 'block';
        menuSection.style.opacity = 1;
		showMaskSlideMenu(true);
    } else {
        //menuSection.style.opacity = 0;
        setTimeout(function () {
            menuSection.style.display = 'none';
			showMaskSlideMenu(false);
        }, 300);
    }
}

function displayPromotionSection(isDisplayOn) {
    if (isDisplayOn) {
        promotionSection.style.display = 'block';
        promotionSection.style.opacity = 1;
		showMaskSlideMenu(true);
    } else {
        //promotionSection.style.opacity = 0;
        setTimeout(function () {
            promotionSection.style.display = 'none';
			showMaskSlideMenu(false);
        }, 300);
    }
}

function checkIsChildOfClass(inNode, pClassName) {
    var pNode = inNode.parentNode;
    var found = false;
    var pTag = pNode.nodeName;
    while (pTag != 'BODY') {
        if (pNode.className == pClassName) {
            found = true;
            break;
        }
        pNode = pNode.parentNode;
        if ((pNode == undefined) || (pNode == null)) {
            break;
        }
        pTag = pNode.tagName;
    }
    return found;
}

/*** HANDLE SWEPT LEFT-RIGHT END ***/

/*** INTERLOCK ***/

var interlockStatus = false;

function setInterlockEnable() {
    interlockStatus = true;
    setTimeout(function (evt) {
        interlockStatus = false;
    }, 1000);
}

/*** INTERLOCK END***/

/*** PROGRESS-BAR ***/

function startProgressBar(nodeID, timeout) {
    var progressNode = document.getElementById(nodeID);
    progressNode.innerHTML = "<progress value='0' max='100' min='0'></progress>";
    var isWebKit = (/webkit/gi).test(navigator.appVersion);
    if (isWebKit) {
        progressNode.childNodes[0].style.setProperty('-webkit-animation', 'loadbar ' + timeout + 's');
    }
    else {
        progressNode.childNodes[0].style.setProperty('animation', 'loadbar ' + timeout + 's');
    }
}

function stopProgressBar(nodeID) {
    var progressNode = document.getElementById(nodeID);
    progressNode.innerHTML = "";

}

/*** PROGRESS-BAR END ***/

/*** CHANGE LANGUAGE ***/

function changeLanguageInView() {
	
	//hide module eGold - do not have English language
	if(gUserInfo.lang == 'EN') {
		if(document.getElementById('goldTrade')) document.getElementById('goldTrade').style.display = 'none';
	}
	else {
		if(document.getElementById('goldTrade')) document.getElementById('goldTrade').style.display = '';
	}
	
    changeLanguageInMainContentInAtt('placeholder', 'mainViewContent');
    changeLanguageInMainContentInAtt('value', 'mainViewContent');
	changeLanguageInMainContentInAtt('placeholder', 'promotion-section');
    changeLanguageInMainContentInAtt('value', 'promotion-section');
	changeLanguageInMainContentInAtt('placeholder', 'mainViewVerticalSlide');
    changeLanguageInMainContentInAtt('value', 'mainViewVerticalSlide');
    changeLanguageInMainContentInAtt('value', 'accountSelectContents');
    changeLanguageInMainContentInAtt('value', 'divbottomcenter');
    changeLanguageInMainContentInAtt('value', 'alert-confirm-dialog');
    changeLanguageInMainContentInAtt('value', 'alert-info-dialog');	
    changeLanguageInMainContentInAtt('value', 'esaving.accountselection');
	
	changeLanguageInMainContentInAtt('value', 'alert-KHCN-KHDN-TERMS-dialog');
	changeLanguageInMainContentInAtt('value', 'alert-KHCN-KHDN-INSTRUCTION-dialog');
	changeLanguageInMainContentInAtt('value', 'alert-KHCN-KHDN-FAQ-dialog');
	changeLanguageInMainContentInAtt('value', 'alert-confirm-dialog-schedulebank');

    changeLanguageInNodeWithTag('span');
	if(gIsLogin) {
		document.getElementById('menu-profile-name').innerHTML = createShortName(gUserInfo.accountName);
	}
}

function changeLanguageInMainContentInAtt(attribute, inNodeID) {
    var nodeMainContent = document.getElementById(inNodeID);
    if ((nodeMainContent == undefined) || (nodeMainContent == null)) {
        return;
    }
    var allElements = nodeMainContent.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        if (allElements[i].getAttribute(attribute)) {
            var tmpNode = allElements[i];
            for (var j = 0, attrs = tmpNode.attributes, l = attrs.length; j < l; j++) {
                attr = attrs.item(j);
				var tmpStr = attr.nodeValue || attr.value;
                if ((CONST_STR.get(tmpStr) != null) && (CONST_STR.get(tmpStr) != undefined)) {
					if(attr.nodeValue) {
                    	attr.nodeValue = CONST_STR.get(tmpStr);
					}
					else {
						attr.value = CONST_STR.get(tmpStr);
					}
                }
            }
        }
    }
}

function changeLanguageInNodeWithTag(tagName) {
    var tagNodeArr = document.getElementsByTagName(tagName);
    for (var i = 0; i < tagNodeArr.length; i++) {
        var tmpNode = tagNodeArr[i];
        /*var tmpValue = tmpNode.innerHTML;*/
        var tmpValue = tmpNode.innerHTML;
        if ((CONST_STR.get(tmpValue) != null) && (CONST_STR.get(tmpValue) != undefined)) {
            /*tmpNode.innerHTML = CONST_STR.get(tmpValue);*/
            tmpNode.innerHTML = CONST_STR.get(tmpValue);
        }
    }
}

function changeLanguageInNodeWithClass(className) {
    var tagNodeArr = document.getElementsByClassName(className);
    for (var i = 0; i < tagNodeArr.length; i++) {
        var tmpNode = tagNodeArr[i];
        var tmpValue = tmpNode.innerHTML;
        //var tmpValue = tmpNode.innerHTML;
        if ((CONST_STR.get(tmpValue) != null) && (CONST_STR.get(tmpValue) != undefined)) {
            tmpNode.innerHTML = CONST_STR.get(tmpValue);
            //tmpNode.innerHTML = CONST_STR.get(tmpValue);
        }
    }
}

function changeMenuLanguage() {
    var tmpNodeMenu = document.getElementById('menu-section');
    tmpNodeMenu.innerHTML = gMenuRawData;
    changeLanguageInNodeWithClass('langNoStyle');
	if(document.getElementById('menu-profile-name') && gUserInfo.accountName) {
		document.getElementById('menu-profile-name').innerHTML = createShortName(gUserInfo.accountName);
	}
	if(document.getElementById('menu-profile-avatar') && gUserInfo.userAvatar && gUserInfo.userAvatar.length > 1) {
		document.getElementById('menu-profile-avatar').innerHTML = '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo.userAvatar + '" />';
		document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
	}
}

function getElementsByAttrName(inAtt) {
	var matchingElements = [];
	var allElements = document.getElementsByTagName('*');
	for (var i = 0, n = allElements.length; i < n; i++){
		if (allElements[i].getAttribute(inAtt)){
			// Element exists with attribute. Add to array.
			matchingElements.push(allElements[i]);
		}
	}
	return matchingElements;
}

/*** CHANGE LANGUAGE END ***/

/*** LOG WITH CHECK DEBUG MODE ***/

function logInfo(inContent) {
    if (!CONST_DEBUG_MODE) {
        return;
    }
    else {
        if (inContent == undefined) return;
		try {

        	console.log((inContent));

		}
		catch(err) {
			console.log('error console.log: ' + err);
		}
    }
}

/*** LOG WITH CHECK DEBUG MODE END ***/

/*** REMOVE VIETNAMESE CHAR ***/

function replaceVietnameseKey(str, e) {

    if (e == undefined) {
        e = window.event || e;
    }
    var keyUnicode = e.charCode || e.keyCode;
    if (e !== undefined) {
        switch (keyUnicode) {
            case 16:
                break; // Shift
            case 17:
                break; // Ctrl
            case 18:
                break; // Alt
            case 27:
                this.value = '';
                break; // Esc: clear entry
            case 35:
                break; // End
            case 36:
                break; // Home
            case 37:
                break; // cursor left
            case 38:
                break; // cursor up
            case 39:
                break; // cursor right
            case 40:
                break; // cursor down
            case 46:
            {
                //str = "";
                break;
            }
            case 78:
                break; // N (Opera 9.63+ maps the "." from the number key section to the "N" key too!) (See: http://unixpapa.com/js/key.html search for ". Del")
            case 110:
                break; // . number block (Opera 9.63+ maps the "." from the number block to the "N" key (78) !!!)
            case 190:
                break; // .
            default:
            {
                //str= str.toLowerCase();
                str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
                str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
                str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
                str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
                str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
                str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
                str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
                str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
                str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
                str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
                str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
                str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
                str = str.replace(/đ/g, "d");
                str = str.replace(/Đ/g, "D");
            }
        }
    }
    //str = str.toUpperCase();
    return str;
}

function replaceVietnameseChars(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/Đ/g, "D");
    return str;
}


/*** REMOVE VIETNAMESE CHAR ***/


/*** SEARCH ***/

var evtSearchResultDone = document.createEvent('Event');
evtSearchResultDone.initEvent('evtSearchResultDone', true, true);

function searchWhenInputAtIDWithArrayString(inNodeID, inArrayData) {
    var timeToCheckInputChange;
    var tmpNodeInputValue = document.getElementById(inNodeID);
    tmpNodeInputValue.onkeydown = function (e) {
        var tmpSearchResultArray = new Array();
        if ((timeToCheckInputChange != null) && (timeToCheckInputChange != undefined)) {
            clearTimeout(timeToCheckInputChange);
        }
        timeToCheckInputChange = setTimeout(function (et) {
            clearTimeout(timeToCheckInputChange);
            tmpSearchResultArray = searchStringInArrayString(tmpNodeInputValue.value, inArrayData);
            evtSearchResultDone.searchResult = tmpSearchResultArray;
            tmpNodeInputValue.dispatchEvent(evtSearchResultDone);
        }, 500);

        replaceVietnameseKey(tmpNodeInputValue.value, e);

        var evt = e || window.event;
        var ew = evt.keyCode || evt.which;

        if ((ew == 13) || (ew == 9)) //enter key, tab key
        {
            clearTimeout(timeToCheckInputChange);
            tmpSearchResultArray = searchStringInArrayString(tmpNodeInputValue.value, inArrayData);
            evtSearchResultDone.searchResult = tmpSearchResultArray;
            tmpNodeInputValue.dispatchEvent(evtSearchResultDone);
            return false;
        }

        //tmpNodeInputValue.value = tmpNodeInputValue.value + replaceVietnameseChars(String.fromCharCode(ew))
        //return false;
    };

    function searchStringInArrayString(searchStr, inArrayData) {
        var searchString = searchStr;
        searchString = searchString.toLowerCase();
        var searchArrayResult = new Array();
        for (var i = 0; i < inArrayData.length; i++) {
            var tmpStr = inArrayData[i];
            var tmpStrLowerCase = tmpStr.toLowerCase();
            tmpStrLowerCase = replaceVietnameseChars(tmpStrLowerCase);
            if (tmpStrLowerCase.indexOf(searchString) != -1) {
                searchArrayResult.push(tmpStr);
            }
        }
        return searchArrayResult;
    }
}

/*** SEARCH END ***/

/*** STORAGE DATA ***/

function setLanguageConfig(inStr) {
    if (typeof(Storage) !== "undefined") {
        // Web storage is supported
		try {
			localStorage.setItem('TPBankUserLang', inStr);
		}
		catch(err) {
			logInfo('Browser not support local store');
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
    }
}

function getLanguageConfig() {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
			var tmpLang = localStorage.getItem('TPBankUserLang');
			if ((tmpLang != undefined) && (tmpLang != null)) {
				return tmpLang;
			}
			return 'VN';
		}
		catch (err) {
			logInfo('Browser not support local store');
			return 'VN';
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
        return 'VN';
    }
}

function setUserInfoToLocal(inAccNo, inAccName) {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
			gCustomerNo = inAccNo;
			gCustomerNanme = inAccName;
			localStorage.setItem('TPBankCorpUserNumber', inAccNo);
			localStorage.setItem('TPBankCorpUserName', inAccName);
		}
		catch(err) {
			logInfo('Browser not support local store');
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
    }
}

function getUserInfoToLocal() {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
			var tmpUserNo = localStorage.getItem('TPBankCorpUserNumber');
	
			if ((tmpUserNo != undefined) && (tmpUserNo != null) && (tmpUserNo.length == 10)) {
				gCustomerNo = tmpUserNo;
				gCustomerNanme = localStorage.getItem('TPBankCorpUserName');
				return true;
			}
			return false;
		}
		catch(err) {
			logInfo('Browser not support local store');
			return false;
		}
        
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
        return false;
    }
}

function setGoldTerm(inStr) {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
	        localStorage.setItem('TPBankUserLang', inStr);
		}
		catch(err) {
			logInfo('Browser not support local store');
		}
        
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
    }
}

function getLanguageConfig() {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
			var tmpLang = localStorage.getItem('TPBankUserLang');
			if ((tmpLang != undefined) && (tmpLang != null)) {
				return tmpLang;
			}
			return 'VN';
		}
		catch(err) {
			return 'VN';
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
        return 'VN';
    }
}
//set download app
function setAgreeDownloadApp(inStr) {
    if (typeof(Storage) !== "undefined") {
		try {
			// Web storage is supported
	        localStorage.setItem('TPBankDownloadStatus', inStr);
		}
		catch(err) {
			logInfo('Browser not support local store');
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
    }
}

function getAgreeDownloadApp() {
    if (typeof(Storage) !== "undefined") {
        try{
			// Web storage is supported
			var tmpLang = localStorage.getItem('TPBankDownloadStatus');
			if ((tmpLang != undefined) && (tmpLang != null)) {
				return tmpLang;
			}
			return 'N';
		}
		catch(err) {
			logInfo('Browser not support local store');
			return 'N';
		}
    }
    else {
        // Web storage is NOT supported
        logInfo('Browser not support local store');
        return 'N';
    }
}

/*** STORAGE DATA END ***/

/*** HANDLE KEYBOARD ***/

function handleKeyboardShowAndHidden() {
    var arrayInputs = document.getElementById('tabHost').getElementsByTagName('input');
    var arrayInputsTextArea = document.getElementById('tabHost').getElementsByTagName('textarea');
    //var focused = false;
	var timeOutFocus;
	var tmpWP = navigator.userAgent.match(/IEMobile|WPDesktop/i);
	var tmpIPad = navigator.userAgent.match(/iPad/i);
	
	if(arrayInputs && arrayInputs.length > 0) {
		for (var i = 0; i < arrayInputs.length; i++) {
			var elm = arrayInputs[i];
			elm.setAttribute('autocomplete', 'off');
			elm.setAttribute('autocorrect', 'off');
			elm.setAttribute('autocapitalize', 'off');
			elm.setAttribute('spellcheck', 'off');
			elm.addEventListener('focus', function() {
				if(Environment.isMobile()) {
					if(gModeScreenView == CONST_MODE_SCR_SMALL) {
						//document.getElementById('mainlayoutfooter').style.display = 'none';
					}
					else {
						//document.getElementById('pageFooter').style.display = 'none';
					}
					clearTimeout(timeOutToChangeSize); //fix on iPad iOS6
					timeOutToChangeSize = null;
				}
				
				clearTimeout(timeOutFocus);
				timeOutFocus = null;
			}, true);
			if(!tmpWP) {
				elm.addEventListener('blur', function() {
					if(Environment.isMobile()) {
						if(gModeScreenView == CONST_MODE_SCR_SMALL) {
							// document.getElementById('mainlayoutfooter').style.display = '';
						}
						else {
							// document.getElementById('pageFooter').style.display = '';
						}
					}
					timeOutFocus = setTimeout(function(){
						if(timeOutFocus) {
							clearTimeout(timeOutFocus);
							timeOutFocus = null;
						}
						if(tmpIPad) {
							window.scroll(0,0); //fix on ipad
						}
						if(Environment.isMobile()) {
							applyDynamicCommonStyleSheet();
							applyDynamicPageStyleSheet(true);
							//applyVerticalScrollPage(true, -80);
							//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
							// applyDynamicPromotionWithNumOfItems(10);
						}
					}, 500);
					
				}, true);
			}
		}
	}
	
	if(arrayInputsTextArea && arrayInputsTextArea.length > 0) {
		for (var i = 0; i < arrayInputsTextArea.length; i++) {
			var elm = arrayInputsTextArea[i];
			elm.setAttribute('autocomplete', 'off');
			elm.setAttribute('autocorrect', 'off');
			elm.setAttribute('autocapitalize', 'off');
			elm.setAttribute('spellcheck', 'off');
			elm.addEventListener('focus', function() {
				if(Environment.isMobile()) {
					if(gModeScreenView == CONST_MODE_SCR_SMALL) {
						// document.getElementById('mainlayoutfooter').style.display = 'none';
					}
					else {
						// document.getElementById('pageFooter').style.display = 'none';
					}
					clearTimeout(timeOutToChangeSize); //fix on iPad iOS6
					timeOutToChangeSize = null;
				}
				clearTimeout(timeOutFocus);
				timeOutFocus = null;
				
			}, true);
			if(!tmpWP) {
				elm.addEventListener('blur', function() {
					if(Environment.isMobile()) {
						if(gModeScreenView == CONST_MODE_SCR_SMALL) {
							// document.getElementById('mainlayoutfooter').style.display = '';
						}
						else {
							// document.getElementById('pageFooter').style.display = '';
						}
					}
					timeOutFocus = setTimeout(function(){
						if(timeOutFocus) {
							clearTimeout(timeOutFocus);
							timeOutFocus = null;
						}
						if(tmpIPad) {
							window.scroll(0,0); //fix on ipad
						}
						if(Environment.isMobile()) {
							applyDynamicCommonStyleSheet();
							applyDynamicPageStyleSheet(true);
							//applyVerticalScrollPage(true, -80);
							//applyDynamicPromotionWithNumOfItems(gPromotionContentArray.length);
							// applyDynamicPromotionWithNumOfItems(10);
						}
					}, 500);
					
				}, true);
			}
		}
	}
}

/*** HANDLE KEYBOARD END ***/

/*** EGOLD TRANSACTION ***/

function openEGoldView() {
	
	//openEGoldMenu();
	if(!gUserInfo.goldTermConfirmed) {
		navController.pushToView('egold/gold-term-confirm-scr', true);
	}
	else {
		navController.initWithRootView('egold/gold-main-page-scr', true);
		openEGoldMenu();
	}
}

function openEGoldMenu() {
	setTimeout(function(e) {
		if (!content.isOpen && !contentPromotion.isOpen) {
			openMenuContent();
			
			var nodeEGoldMenu = document.getElementById('goldTrade');
			if((nodeEGoldMenu != undefined) && (nodeEGoldMenu != null) && (currentDisplayMenu != nodeEGoldMenu)) {
				applyScrollForMe(nodeEGoldMenu);
			}
		}
	}, 300);	
}

/*** EGOLD TRANSACTION END ***/

/*** STRING UTILITY ***/

String.prototype.format = String.prototype.f = function() {
	var args = arguments;
	return this.replace(/\{\{|\}\}|\{(\d+)\}/g, function (m, n) {
		if (m == "{{") { return "{"; }
		if (m == "}}") { return "}"; }
		return args[n];
	});
};

/*** STRING UTILITY END ***/

/*** MASK WHEN SHOW SLIDE MENU ***/

function openMenuContent() {
	showMaskSlideMenu(true);
	content.open();
	displayMenuSection(content.isOpen);
	setInterlockEnable();
	//LamPT Add thêm refresh cho menu scroll khi show menu
	setTimeout(menuScroll.refresh(), 300);			
}
function closeMenuContent() {
	showMaskSlideMenu(false);
	content.close();
	displayMenuSection(content.isOpen);
	setInterlockEnable();
}

function openMenuPromotion() {
	showMaskSlideMenu(true);
	contentPromotion.open();
	displayPromotionSection(contentPromotion.isOpen);
	setInterlockEnable();
}
function closeMenuPromotion() {
	showMaskSlideMenu(false);
	contentPromotion.close();
	displayPromotionSection(contentPromotion.isOpen);
	setInterlockEnable();
}

function closeAllSlideMenu(inStatus) {
	var tmpNodeMenu = document.getElementById('menu-section');
	var tmpNodePromotion = document.getElementById('promotion-section');
	//tmpNodeMenu.style.display = 'block'; //document.getElementById('menu-section').style.display = 'block';
	//if(CONST_DESKTOP_MODE) return;
	if (content && tmpNodeMenu.style.display != 'none') {
		if(!inStatus) closeMenuContent();
		else content.close();
	}
	if (contentPromotion && tmpNodePromotion.style.display != 'none') {
		if(!inStatus) closeMenuPromotion();
		else closeMenuPromotion.close();
	}
	//var tmpMaskNode = document.getElementById('mask-slideview');
	//tmpMaskNode.style.display = 'none';
	showMaskSlideMenu(false);
}
function showMaskSlideMenu(inStatus) {
	var tmpMaskNode = document.getElementById('mask-slideview');
	//if (navigator.userAgent.match(/(iPad|iPhone);.*CPU.*OS 5_\d/i)) {
		//tmpMaskNode.style.display = 'none';
	//}
	//else {
		if(inStatus == true) {
			tmpMaskNode.style.display = 'block';
		}
		else {
			var timeToHiddenMask = setTimeout(function(){
				clearTimeout(timeToHiddenMask);
				tmpMaskNode.style.display = 'none';
			}, 1000);
		}
	//}
	
}

/*** MASK WHEN SHOW SLIDE MENU END ***/

/*** DISPLAY ON DESKTOP ***/

function setViewOnDesktopWhenLogin() {
		
	var tmpNodeMenu = document.getElementById('menu-section');
	tmpNodeMenu.style.display = 'block';
	
	//updateViewForDesktop();
	
	updateMainContentWidth();
}

function updateViewForDesktop() {
	//close menu & promotion view before update resize
	if(content != undefined) content.close(); 
	if(contentPromotion != undefined) contentPromotion.close();
	
	document.body.style.backgroundColor = '#F1F1F1';
	var tmpNodeMain = document.getElementById('mainview');
	var tmpNodePage = document.getElementById('fullPage');
	var tmpPageBorder = document.getElementById('pageBorder');
	var tmpNodeHeader = tmpNodeMain.getElementsByClassName('header')[0];
	document.getElementById('pageFooter').style.display = 'block';
	if(!gIsLogin) {
		tmpNodePage.setAttribute('align', 'center'); //left
		tmpNodeMain.style.cssFloat = 'none';
		if(tmpPageBorder != undefined) tmpPageBorder.style.width = '500px';
		tmpNodeHeader.style.display = 'none';
		return;
	}
	else {
		tmpNodePage.setAttribute('align', 'left'); //left
		tmpNodeMain.style.cssFloat = 'left';
		tmpNodeHeader.style.display = 'none';
	}
	var tmpNodePage = document.getElementById('fullPage');
	tmpNodePage.setAttribute('align', 'left'); //left
	
	tmpNodeMain.style.borderLeftStyle = 'dotted';
	tmpNodeMain.style.borderRightStyle = 'dashed';
	var tmpNodeHeader = tmpNodeMain.getElementsByClassName('header')[0];
	tmpNodeHeader.style.display = 'block';
	document.getElementById('promotion-section').style.opacity = 1;
	document.getElementById('nav.btn.showslidemenu').style.display = 'none';
	document.getElementById('headermb').style.display = 'none';
	if(gIsLogin) {
		document.getElementById('headerib').style.display = 'block';
	}
	else {
		document.getElementById('headerib').style.display = 'none';
	}
	document.getElementById('mainlayoutfooter').style.display = 'none';
}

function updateViewForMobile() {
	//close menu & promotion view before update resize
	if(content != undefined) content.close(); 
	if(contentPromotion != undefined) contentPromotion.close();
	
	document.body.style.backgroundColor = 'rgba(78, 105, 162, 0.1)';
	var tmpNodePage = document.getElementById('fullPage');
	tmpNodePage.setAttribute('align', 'left'); //left
	var tmpNodeMain = document.getElementById('mainview');
	tmpNodeMain.style.cssFloat = 'left';
	tmpNodeMain.style.borderLeftStyle = 'none';
	tmpNodeMain.style.borderRightStyle = 'none';
	var tmpNodeHeader = tmpNodeMain.getElementsByClassName('header')[0];
	tmpNodeHeader.style.display = 'block';
	var tmpPageBorder = document.getElementById('pageBorder');
	if(tmpPageBorder != undefined) tmpPageBorder.style.width = '100%';
	document.getElementById('pageHeader').style.display = 'none';
	document.getElementById('pageFooter').style.display = 'none';
	if(gIsLogin) document.getElementById('nav.btn.showslidemenu').style.display = 'block';
	document.getElementById('menu-section').style.display = 'none';
	document.getElementById('headermb').style.display = 'block';
	document.getElementById('headerib').style.display = 'none';
	
	
	if (!gIsLogin)
	{
		document.getElementById('mainlayoutfooter').style.display = 'block';
	}

	// 20151215 DuyNH Kiem tra de thuc hien bo chuc nang HELP tren APP START
	if(!CONST_BROWSER_MODE)
	{
		document.getElementById('idHelpButton').style.display = 'none';
		document.getElementById('idHelpButton2').style.display = 'none';
		document.getElementById('id.home.btn').style.paddingRight = '45px';
	}
	// 20151215 DuyNH Kiem tra de thuc hien bo chuc nang HELP tren APP END
}

var CONST_MODE_SCR_SMALL = 1;
var CONST_MODE_SCR_MEDIUM = 2;
var CONST_MODE_SCR_FULL = 3;
//var gModeScreenView = CONST_MODE_SCR_MEDIUM;

//var isModelMobile = navigator.userAgent.match(/Android|iPhone|iPod|IEMobile/i);

function updateMainContentWidth(inWidth, inHeight) {
	
	if(!inWidth) {
		inWidth = window.innerWidth
			|| document.documentElement.clientWidth
			|| document.body.clientWidth;
	}
	if(!inHeight) {
		inHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
	}
	var tmpNodePage = document.getElementById('fullPage');
	tmpNodePage.style.height = inHeight + 'px';
	var tmpNodePageHeader = document.getElementById('pageHeader');
	
	var isIPad = navigator.userAgent.match(/iPad/i);
	
	var tmpNodeMain = document.getElementById('mainview');
	var tmpMainViewWidth = 0;
	var tmpNodePromotion = document.getElementById('promotion-section');
	if (inWidth < 801) { //width to change mode
		tmpMainViewWidth = inWidth;
		if (gModeScreenView == CONST_MODE_SCR_SMALL && !gIsLogin) return;
		gModeScreenView = CONST_MODE_SCR_SMALL;
		if(inHeight < 640 && isModelMobile) {
			tmpNodePageHeader.style.display = 'none';
		}
		else {
			tmpNodePageHeader.style.display = 'block';
		}
		updateViewForMobile();
		
		tmpNodePromotion.style.display = 'none';
		tmpNodeMain.style.borderRightStyle = 'none';
		changeJSandCSStoMB();			
	}
	else {
		tmpMainViewWidth = (inWidth - 260);
		logInfo('Main view width: ' + tmpMainViewWidth);
		if (gModeScreenView == CONST_MODE_SCR_MEDIUM && !gIsLogin) return;
		gModeScreenView = CONST_MODE_SCR_MEDIUM;
		if(inHeight < 640 && isModelMobile) {
			tmpNodePageHeader.style.display = 'none';
		}
		else {
			tmpNodePageHeader.style.display = 'block';
		}
		document.body.height = inHeight;
		windowScrollToTop();
		
		
		updateViewForDesktop();
		changeJSandCSStoIB();
		tmpNodePromotion.style.display = 'none';
		tmpNodeMain.style.borderRightStyle = 'none';		
		if(gIsLogin) {
			var tmpMenu = document.getElementById('menu-section');
			tmpMenu.style.display = 'block';
			tmpMenu.style.opacity = 1;
		}
	}
	
	if(gIsLogin) {
		tmpNodeMain.style.width = tmpMainViewWidth + 'px';
	}
}

function keyboardEvent() {
	
	var tmpArrayInput = document.getElementsByTagName('input');
	for(var i=0; i<tmpArrayInput.length; i++) {
		var tmpInputNode = tmpArrayInput[i];
		tmpInputNode.onfocus = function() {
			var currentClientHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
			gOldDeviceHeight = currentClientHeight;
			//setTimeout(function() {
				//alert('focus me!!');
			//}, 10);
			
		}
		tmpInputNode.onblur = function() {
			setTimeout(function() {
				//alert('blur me!!');
				var currentClientHeight = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
				if(gOldDeviceHeight < currentClientHeight) {
					gOldDeviceHeight = currentClientHeight;
					windowScrollToTop();
				}
				
			}, 10);
			
		}
	}
	var tmpArrayTextarea = document.getElementsByTagName('textarea');
	for(var i=0; i<tmpArrayTextarea.length; i++) {
		var tmpTextareNode = tmpArrayTextarea[i];
		tmpTextareNode.onfocus = function() {
			var currentClientHeight = window.innerHeight
			|| document.documentElement.clientHeight
			|| document.body.clientHeight;
			gOldDeviceHeight = currentClientHeight;
			//setTimeout(function(){
				//alert('focus me!!');
			//}, 10);
		}
		tmpTextareNode.onblur = function() {
			setTimeout(function(){
				//alert('blur me!!');
				var currentClientHeight = window.innerHeight
				|| document.documentElement.clientHeight
				|| document.body.clientHeight;
				if(gOldDeviceHeight < currentClientHeight) {
					gOldDeviceHeight = currentClientHeight;
					windowScrollToTop();
				}
			}, 10);
		}
	}
}
var clientHeightAbc;
function windowScrollToTop() {
	var isIPad = navigator.userAgent.match(/iPad/i);
	if(!clientHeightAbc) {
		clientHeightAbc = window.innerHeight
					|| document.documentElement.clientHeight
					|| document.body.clientHeight;
		//alert('clientHeight 1 = ' + clientHeightAbc);
	}
	//alert('clientHeight 2 = ' + clientHeightAbc);
	document.body.height = clientHeightAbc;
	//if(isIPad) window.scrollTo(0, 0);
}

/*** DISPLAY ON DESKTOP END ***/


/*** CHANGE LANGUAGE IN IB VERSION ***/
/*
mode = 0 : mobile
mode = 1 : desktop
*/
//function initLanguageOnIB(mode) {
function initLanguageOnIB() {	
	
	//document.getElementById('lblChangLanguageIBTitle').innerHTML = CONST_STR.get('TPBANK_TITLE');
	document.getElementById('lblChangLanguage').innerHTML = CONST_STR.get('MAIN_SCR_HEADER_TITLE');
	
	document.getElementById('btnTERMS_KHDN').value = CONST_STR.get('ALERT_BTN_KHDN');
	document.getElementById('btnTERMS_KHCN').value = CONST_STR.get('ALERT_BTN_KHCN');
	document.getElementById('btnINSTR_KHDN').value = CONST_STR.get('ALERT_BTN_KHDN');
	document.getElementById('btnINSTR_KHCN').value = CONST_STR.get('ALERT_BTN_KHCN');
	document.getElementById('btnFAQ_KHDN').value = CONST_STR.get('ALERT_BTN_KHDN');
	document.getElementById('btnFAQ_KHCN').value = CONST_STR.get('ALERT_BTN_KHCN');
	document.getElementById('btnOK_SCHEDULE').value = CONST_STR.get('ALERT_BTN_OK_TITLE_SCHEDULE');
	document.getElementById('btnCANCEL_SCHEDULE').value = CONST_STR.get('ALERT_BTN_CANCEL_TITLE_SCHEDULE');
	
	document.getElementById('spanLoginContact').innerHTML = CONST_STR.get('LOGIN_CONTACT');
	document.getElementById('spanCustomerService').innerHTML = CONST_STR.get('LOGIN_CUSTOMER_SERVICE');
	document.getElementById('spanLoginBranch').innerHTML = CONST_STR.get('LOGIN_BRANCH');
	document.getElementById('spanLoginATM').innerHTML = CONST_STR.get('LOGIN_ATM');
	document.getElementById('spanLoginEmail').innerHTML = CONST_STR.get('LOGIN_EMAIL');
	document.getElementById('spanLoginChat').innerHTML = CONST_STR.get('LOGIN_CHAT');
	
	//load btn icon language
	var nodeBtnLang = document.getElementById('btnChangLanguage'); //mb language button
	if (gUserInfo.lang == "EN") {	
		/*
		if (mode == 0)
		{
			nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/Vietnam_flag_round_30.png' onClick='changeLanguageOnIB(0)'>";
		}
		
		if (mode == 1)
		{
			nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/IB_Vietnamese.png' onClick='changeLanguageOnIB(1)'>";
		}
		*/
		nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/Vietnam_flag_round_30.png' onClick='changeLanguageOnIB()'>";
	}
	else {
		gUserInfo.lang = "VN";		
		/*
		if (mode == 0)
		{
			nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/English_flag_round_30.png' onClick='changeLanguageOnIB(0)'>";
		}
		
		if (mode == 1)
		{
			nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/IB_English.png' onClick='changeLanguageOnIB(1)'>";
		}
		*/
		nodeBtnLang.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/English_flag_round_30.png' onClick='changeLanguageOnIB()'>";
	}
	
	var nodeBtnLangIB = document.getElementById('btnChangLanguageIB'); //ib language button
	if (gUserInfo.lang == "EN") {
		/*
		if (mode == 0)
		{
			nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/Vietnam_flag_round_30.png' onClick='changeLanguageOnIB(0)'>";
		}
		
		if (mode == 1)
		{
			nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/IB_Vietnamese.png' onClick='changeLanguageOnIB(1)'>";
		}
		*/
		nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/Vietnam_flag_round_30.png' onClick='changeLanguageOnIB()'>";
	}
	else {
		gUserInfo.lang = "VN";
		/*
		if (mode == 0)
		{
			nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/English_flag_round_30.png' onClick='changeLanguageOnIB(0)'>";
		}
		
		if (mode == 1)
		{
			nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/IB_English.png' onClick='changeLanguageOnIB(1)'>";
		}
		*/
		nodeBtnLangIB.innerHTML = "<img class='languageEnglishFlag' src='./assets/images/English_flag_round_30.png' onClick='changeLanguageOnIB()'>";
	}
}
function changeMenuLogout(){
	var menu_logout = document.getElementById('id.menu_logout.caption');
	if(menu_logout!=null){
		menu_logout.innerHTML = CONST_STR.get('MENU_LOGOUT');	
	}
}
//function changeLanguageOnIB(mode) {
function changeLanguageOnIB() {
	
	if (gUserInfo.lang == "VN") {
		gUserInfo.lang = "EN";
		setLanguageConfig(gUserInfo.lang);
	}
	else {
		gUserInfo.lang = "VN";
		setLanguageConfig(gUserInfo.lang);
	}
	
	
	changeMenuLanguage();
	initLanguageOnIB();
	
	if(gIsLogin) {
		//reset cache
		navController.resetAll();
		var tmpPageName = navController.getDefaultPage();
		var tmpPageType = navController.getDefaultPageType();
		navController.initWithRootView(tmpPageName, true, tmpPageType);
		navController.resetAll();
	}
	else {
		currentPage = "";
		cachedPages = "";
		
		navController.initWithRootView('login-scr', true);
		
		//20140911: hien box lien he - begin
		var tmpNodeMain = document.getElementById('mainview');
		tmpNodeMain.style.cssFloat = 'none';
		//20140911: hien box lien he - end
	}
	changeMenuLogout();
}

/*** CHANGE LANGUAGE IN IB VERSION END ***/

/*** VALIDATE FUNCTION ***/

var gConditions = {	"amount":
							{
								"allow":"[,.0-9]",
								"notallow":"",
								"minlength":"0",
								"maxlength":"18",
								"func":""
							},
					"account":
							{
								"allow":"[0-9]",
								"notallow":"",
								"minlength":"11",
								"maxlength":"11",
								"func":""
							},
					"content":
							{
								"allow":"[a-zA-Z0-9]",
								"notallow":"",
								"minlength":"0",
								"maxlength":"200",
								"func":""
							},
					"sample":
							{
								"allow":"[a-zA-Z0-9]",
								"notallow":"",
								"minlength":"0",
								"maxlength":"50",
								"func":""
							}
							
				}

function validateFunc(inValue, inConditions){
	if(inConditions == undefined || inConditions == null) return;
	if(typeof(inValue) == 'number') inStr = inValue.toString();
	else var inStr = inValue;
	var tmpValidateObj = inConditions;//inConditions[tmpObj]
	for(var tmpObjProperty in tmpValidateObj) {
		//alert(tmpObjProperty);
		var tmpValue = tmpValidateObj[tmpObjProperty];
		if((tmpValue == undefined) || (tmpValue.length == 0)) continue;
		switch(tmpObjProperty) {
			case "allow": {
				var rex = new RegExp(tmpValue, "gi");
				var tmprex = inStr.match(rex);
				if((tmprex == undefined) || (tmprex.length < 1)) {
					console.log('allow');
					return false;
				}
				break;
			}
			case "notallow": {
				var rex = new RegExp(tmpValue, "gi");
				var tmprex = inStr.match(rex);
				if((tmprex == undefined) || (tmprex.length > 0)) {
					console.log('not allow');
					return false;
				}
				break;
			}
			case "minlength": {
				if(!(inStr.length > (parseInt(tmpValue) - 1))) {
					console.log('min length fail');
					return false;
				}
				break;
			}
			case "maxlength": {
				if(!(inStr.length < (parseInt(tmpValue) + 1))) {
					 console.log('max length fail');
					return false;
				}
				break;
			}
			case "func": {
				if(tmpValue != undefined) {
					console.log('call function');
					if(typeof(tmpValue) == 'function') {
						if(!tmpValue()) {
							console.log('condition extent fail');
							return false;
						}
					}
					else if(typeof(tmpValue) == 'string' && (typeof(window[tmpValue]) == 'function')) {
						if(!window[tmpValue]()) {
							console.log('condition extent fail');
							return false;
						}
					}
					else {
						console.log('not exist function');
					}
				}
				break;
			}
			default: {
				console.log('do not match property.');
				return false;
				break;
			}
		}
	}
	return true;
}

/*** VALIDATE FUNCTION END ***/

/*** JSON UTILITY ***/

var gProvincesData = new Array();
function getProvincesData() {
	if(gProvincesData && gProvincesData.length > 0) {
		return gProvincesData;
	}
	else {
		var tmpObj = getObjFromJSON(provinces);
		gProvincesData = tmpObj.data;
		return gProvincesData;
	}
}
var gDistrictsData = new Array();
function getDistrictsData() {
	if(gDistrictsData && gDistrictsData.length > 0) {
		return gDistrictsData;
	}
	else {
		var tmpObj = getObjFromJSON(districts);
		gDistrictsData = tmpObj.data;
		return gDistrictsData;
	}
}
var gBranchInterbanksData = new Array();
function getBranchInterbanksData() {
	if(gBranchInterbanksData && gBranchInterbanksData.length > 0) {
		return gBranchInterbanksData;
	}
	else {
		var tmpObj = getObjFromJSON(branchInterbanks);
		gBranchInterbanksData = tmpObj.data;
		return gBranchInterbanksData;
	}
}
var gBranchsData = new Array();
function getBranchsData() {
	if(gBranchsData && gBranchsData.length > 0) {
		return gBranchsData;
	}
	else {
		var tmpObj = getObjFromJSON(branchs);
		gBranchsData = tmpObj.data;
		return gBranchsData;
	}
}
function getObjWithKeyFromData(inStrKey, inStrContent, inArrObjs) {
	if(inArrObjs && (typeof(inStrKey) == 'string') && (typeof(inStrContent) == 'string')) {
		var tmpObj;
		for(var i=0; i<inArrObjs.length; i++) {
			tmpObj = inArrObjs[i];
			if(tmpObj[inStrKey] == inStrContent) {
				return tmpObj;
			}
		}
	}
	else {
		logInfo('Error input get obj by key from data');
		return null;
	}
}
function getObjFromJSON(inStr) {
	if(typeof(inStr) == 'string') {
		inStr = JSON.stringify(eval('('+ inStr +')')); //JSON string validate
		return JSON.parse(inStr); //convert to Object
	}
	else if(typeof(inStr) == 'object') {
		return inStr;
	}
	else {
		logInfo('Error parser JSON');
		return null;
	}
}

/*** JSON UTILITY END ***/

/*** PAGE INDICATOR ***/

function genPageIndicatorHtml(inTotalPages, inCurIdx, inMaxBtn, inArrDisable) {
	
	if (inTotalPages < 2) {
		return '';
	}
	
	var pageIndicator = '<ul class="pagination">';
	var pageTotal = inTotalPages;//8;
	var pageCurrentIdx = inCurIdx? inCurIdx: 1; //min is 1
	var maxShowNum = (inMaxBtn && (inMaxBtn != 0))? inMaxBtn: 6; //default: 6
	var arrDisable = inArrDisable; //[2];//inArrDisable;
	
	if(pageTotal < maxShowNum + 1) {
		for(var i=0; i<pageTotal; i++) {
			if(pageCurrentIdx == i+1) {
				pageIndicator += '<li class="active"><span>' + (i + 1) + '</span></li>';
			}
			else {
				var tmpStt = false;
				if(arrDisable && arrDisable.length > 0) {
					for(var j=0; j<arrDisable.length; j++) {
						if((i + 1) == arrDisable[j]) {
							tmpStt = true;
							break;
						}
					}
				}
				if(tmpStt) {
					pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
				}
				else {
					pageIndicator += '<li onClick="selectedPageAtIndex(' + (i + 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (i + 1) + '</span></li>';
				}
			}
		}
	}
	else {
		if(pageCurrentIdx < 3) {
			for(var i=0; i<maxShowNum; i++) {
				switch (i) {
					case (maxShowNum - 1): {
						var tmpStt = false;
						if(arrDisable && arrDisable.length > 0) {
							for(var j=0; j<arrDisable.length; j++) {
								if((pageTotal) == arrDisable[j]) {
									tmpStt = true;
									break;
								}
							}
						}
						if(tmpStt) {
							pageIndicator += '<li class="disabled"><span>' + (pageTotal) + '</span></li>';
						}
						else {
							pageIndicator += '<li onClick="selectedPageAtIndex(' + (pageTotal) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + pageTotal + '</span></li>';
						}
						break;
					}
					case (maxShowNum - 2): {
						var tmpStt = false;
						if(arrDisable && arrDisable.length > 0) {
							for(var j=0; j<arrDisable.length; j++) {
								if((pageTotal - 1) == arrDisable[j]) {
									tmpStt = true;
									break;
								}
							}
						}
						if(tmpStt) {
							pageIndicator += '<li class="disabled"><span>' + (pageTotal - 1) + '</span></li>';
						}
						else {
							pageIndicator += '<li onClick="selectedPageAtIndex(' + (pageTotal - 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (pageTotal - 1) + '</span></li>';
						}
						break;
					}
					case (maxShowNum - 3): {
						pageIndicator += '<li><span>...</span></li>';
						break;
					}
					default: {
						if(pageCurrentIdx == i+1) {
							pageIndicator += '<li class="active"><span>' + (i + 1) + '</span></li>';
						}
						else {
							var tmpStt = false;
							if(arrDisable && arrDisable.length > 0) {
								for(var j=0; j<arrDisable.length; j++) {
									if((i + 1) == arrDisable[j]) {
										tmpStt = true;
										break;
									}
								}
							}
							if(tmpStt) {
								pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
							}
							else {
								pageIndicator += '<li onClick="selectedPageAtIndex(' + (i + 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (i + 1) + '</span></li>';
							}
						}
						break;
					}
				}
			}
		}
		else if(pageCurrentIdx > pageTotal - 2) {
			for(var i=0; i<maxShowNum; i++) {
				switch (i) {
					case 0: case 1: {
						var tmpStt = false;
						if(arrDisable && arrDisable.length > 0) {
							for(var j=0; j<arrDisable.length; j++) {
								if((i + 1) == arrDisable[j]) {
									tmpStt = true;
									break;
								}
							}
						}
						if(tmpStt) {
							pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
						}
						else {
							pageIndicator += '<li onClick="selectedPageAtIndex(' + (i + 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (i + 1) +'</span></li>';
						}
						break;
					}
					case 2: {
						pageIndicator += '<li><span>...</span></li>';
						break;
					}
					default: {
						if(pageCurrentIdx == (pageTotal - maxShowNum + i + 1)) {
							pageIndicator += '<li class="active"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
						}
						else {
							var tmpStt = false;
							if(arrDisable && arrDisable.length > 0) {
								for(var j=0; j<arrDisable.length; j++) {
									if((pageTotal - maxShowNum + i + 1) == arrDisable[j]) {
										tmpStt = true;
										break;
									}
								}
							}
							if(tmpStt) {
								pageIndicator += '<li class="disabled"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
							}
							else {
								pageIndicator += '<li onClick="selectedPageAtIndex(' + (pageTotal - maxShowNum + i + 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
							}
						}
						break;
					}
				}
			}
		}
		else {
			var mid = parseInt(maxShowNum / 2);
			for(var i=0; i<maxShowNum + 1; i++) { //1: is second three-dots
				switch (i) {
					case 0: {
						var tmpStt = false;
						if(arrDisable && arrDisable.length > 0) {
							for(var j=0; j<arrDisable.length; j++) {
								if((i + 1) == arrDisable[j]) {
									tmpStt = true;
									break;
								}
							}
						}
						if(tmpStt) {
							pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
						}
						else {
							pageIndicator += '<li onClick="selectedPageAtIndex(' + (i + 1) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (i + 1) + '</span></li>';
						}
						break;
					}
					case 1: {
						if(pageCurrentIdx != 3) {
							pageIndicator += '<li><span>...</span></li>';
						}
						break;
					}
					case (maxShowNum): {
						var tmpStt = false;
						if(arrDisable && arrDisable.length > 0) {
							for(var j=0; j<arrDisable.length; j++) {
								if((pageTotal) == arrDisable[j]) {
									tmpStt = true;
									break;
								}
							}
						}
						if(tmpStt) {
							pageIndicator += '<li class="disabled"><span>' + (pageTotal) + '</span></li>';
						}
						else {
							pageIndicator += '<li onClick="selectedPageAtIndex(' + (pageTotal) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + pageTotal + '</span></li>';
						}
						break;
					}
					case (maxShowNum - 1): {
						if(pageCurrentIdx != pageTotal-2) {
							pageIndicator += '<li><span>...</span></li>';
						}
						break;
					}
					default: {
						if(pageCurrentIdx == (pageCurrentIdx + i - mid)) {
							pageIndicator += '<li class="active"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
						}
						else {
							var tmpStt = false;
							if(arrDisable && arrDisable.length > 0) {
								for(var j=0; j<arrDisable.length; j++) {
									if((pageCurrentIdx + i - mid) == arrDisable[j]) {
										tmpStt = true;
										break;
									}
								}
							}
							if(tmpStt) {
								pageIndicator += '<li class="disabled"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
							}
							else {
								pageIndicator += '<li onClick="selectedPageAtIndex(' + (pageCurrentIdx + i - mid) + ', this, ' + pageTotal + ', ' + maxShowNum + ', ' + arrDisable + ');"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
							}
						}
						break;
					}
				}
			}
		}
	}
	pageIndicator += '</ul>';
	return pageIndicator;
}

function genPageIndicatorHtmlNgClick(inTotalPages, inCurIdx, inMaxBtn, inArrDisable) {

    if (inTotalPages < 2) {
        return '';
    }

    var pageIndicator = '<ul class="pagination">';
    var pageTotal = inTotalPages;//8;
    var pageCurrentIdx = inCurIdx ? inCurIdx : 1; //min is 1
    var maxShowNum = (inMaxBtn && (inMaxBtn != 0)) ? inMaxBtn : 6; //default: 6
    var arrDisable = inArrDisable; //[2];//inArrDisable;

    if (pageTotal < maxShowNum + 1) {
        for (var i = 0; i < pageTotal; i++) {
            if (pageCurrentIdx == i + 1) {
                pageIndicator += '<li class="active"><span>' + (i + 1) + '</span></li>';
            }
            else {
                var tmpStt = false;
                if (arrDisable && arrDisable.length > 0) {
                    for (var j = 0; j < arrDisable.length; j++) {
                        if ((i + 1) == arrDisable[j]) {
                            tmpStt = true;
                            break;
                        }
                    }
                }
                if (tmpStt) {
                    pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
                }
                else {
                    pageIndicator += '<li ng-click="selectedPageAtIndex(' + (i + 1) + ')"><span>' + (i + 1) + '</span></li>';
                }
            }
        }
    }
    else {
        if (pageCurrentIdx < 3) {
            for (var i = 0; i < maxShowNum; i++) {
                switch (i) {
                    case (maxShowNum - 1): {
                        var tmpStt = false;
                        if (arrDisable && arrDisable.length > 0) {
                            for (var j = 0; j < arrDisable.length; j++) {
                                if ((pageTotal) == arrDisable[j]) {
                                    tmpStt = true;
                                    break;
                                }
                            }
                        }
                        if (tmpStt) {
                            pageIndicator += '<li class="disabled"><span>' + (pageTotal) + '</span></li>';
                        }
                        else {
                            pageIndicator += '<li ng-click="selectedPageAtIndex(' + (pageTotal) + ')"><span>' + pageTotal + '</span></li>';
                        }
                        break;
                    }
                    case (maxShowNum - 2): {
                        var tmpStt = false;
                        if (arrDisable && arrDisable.length > 0) {
                            for (var j = 0; j < arrDisable.length; j++) {
                                if ((pageTotal - 1) == arrDisable[j]) {
                                    tmpStt = true;
                                    break;
                                }
                            }
                        }
                        if (tmpStt) {
                            pageIndicator += '<li class="disabled"><span>' + (pageTotal - 1) + '</span></li>';
                        }
                        else {
                            pageIndicator += '<li ng-click="selectedPageAtIndex(' + (pageTotal - 1) +')"><span>' + (pageTotal - 1) + '</span></li>';
                        }
                        break;
                    }
                    case (maxShowNum - 3): {
                        pageIndicator += '<li><span>...</span></li>';
                        break;
                    }
                    default: {
                        if (pageCurrentIdx == i + 1) {
                            pageIndicator += '<li class="active"><span>' + (i + 1) + '</span></li>';
                        }
                        else {
                            var tmpStt = false;
                            if (arrDisable && arrDisable.length > 0) {
                                for (var j = 0; j < arrDisable.length; j++) {
                                    if ((i + 1) == arrDisable[j]) {
                                        tmpStt = true;
                                        break;
                                    }
                                }
                            }
                            if (tmpStt) {
                                pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
                            }
                            else {
                                pageIndicator += '<li ng-click="selectedPageAtIndex(' + (i + 1) + ')"><span>' + (i + 1) + '</span></li>';
                            }
                        }
                        break;
                    }
                }
            }
        }
        else if (pageCurrentIdx > pageTotal - 2) {
            for (var i = 0; i < maxShowNum; i++) {
                switch (i) {
                    case 0: case 1: {
                        var tmpStt = false;
                        if (arrDisable && arrDisable.length > 0) {
                            for (var j = 0; j < arrDisable.length; j++) {
                                if ((i + 1) == arrDisable[j]) {
                                    tmpStt = true;
                                    break;
                                }
                            }
                        }
                        if (tmpStt) {
                            pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
                        }
                        else {
                            pageIndicator += '<li ng-click="selectedPageAtIndex(' + (i + 1) + ')"><span>' + (i + 1) + '</span></li>';
                        }
                        break;
                    }
                    case 2: {
                        pageIndicator += '<li><span>...</span></li>';
                        break;
                    }
                    default: {
                        if (pageCurrentIdx == (pageTotal - maxShowNum + i + 1)) {
                            pageIndicator += '<li class="active"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
                        }
                        else {
                            var tmpStt = false;
                            if (arrDisable && arrDisable.length > 0) {
                                for (var j = 0; j < arrDisable.length; j++) {
                                    if ((pageTotal - maxShowNum + i + 1) == arrDisable[j]) {
                                        tmpStt = true;
                                        break;
                                    }
                                }
                            }
                            if (tmpStt) {
                                pageIndicator += '<li class="disabled"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
                            }
                            else {
                                pageIndicator += '<li ng-click="selectedPageAtIndex(' + (pageTotal - maxShowNum + i + 1) + ')"><span>' + (pageTotal - maxShowNum + i + 1) + '</span></li>';
                            }
                        }
                        break;
                    }
                }
            }
        }
        else {
            var mid = parseInt(maxShowNum / 2);
            for (var i = 0; i < maxShowNum + 1; i++) { //1: is second three-dots
                switch (i) {
                    case 0: {
                        var tmpStt = false;
                        if (arrDisable && arrDisable.length > 0) {
                            for (var j = 0; j < arrDisable.length; j++) {
                                if ((i + 1) == arrDisable[j]) {
                                    tmpStt = true;
                                    break;
                                }
                            }
                        }
                        if (tmpStt) {
                            pageIndicator += '<li class="disabled"><span>' + (i + 1) + '</span></li>';
                        }
                        else {
                            pageIndicator += '<li ng-click="selectedPageAtIndex(' + (i + 1) + ')"><span>' + (i + 1) + '</span></li>';
                        }
                        break;
                    }
                    case 1: {
                        if (pageCurrentIdx != 3) {
                            pageIndicator += '<li><span>...</span></li>';
                        }
                        break;
                    }
                    case (maxShowNum): {
                        var tmpStt = false;
                        if (arrDisable && arrDisable.length > 0) {
                            for (var j = 0; j < arrDisable.length; j++) {
                                if ((pageTotal) == arrDisable[j]) {
                                    tmpStt = true;
                                    break;
                                }
                            }
                        }
                        if (tmpStt) {
                            pageIndicator += '<li class="disabled"><span>' + (pageTotal) + '</span></li>';
                        }
                        else {
                            pageIndicator += '<li ng-click="selectedPageAtIndex(' + (pageTotal) + ')"><span>' + pageTotal + '</span></li>';
                        }
                        break;
                    }
                    case (maxShowNum - 1): {
                        if (pageCurrentIdx != pageTotal - 2) {
                            pageIndicator += '<li><span>...</span></li>';
                        }
                        break;
                    }
                    default: {
                        if (pageCurrentIdx == (pageCurrentIdx + i - mid)) {
                            pageIndicator += '<li class="active"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
                        }
                        else {
                            var tmpStt = false;
                            if (arrDisable && arrDisable.length > 0) {
                                for (var j = 0; j < arrDisable.length; j++) {
                                    if ((pageCurrentIdx + i - mid) == arrDisable[j]) {
                                        tmpStt = true;
                                        break;
                                    }
                                }
                            }
                            if (tmpStt) {
                                pageIndicator += '<li class="disabled"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
                            }
                            else {
                                pageIndicator += '<li ng-click="selectedPageAtIndex(' + (pageCurrentIdx + i - mid) + ')"><span>' + (pageCurrentIdx + i - mid) + '</span></li>';
                            }
                        }
                        break;
                    }
                }
            }
        }
    }
    pageIndicator += '</ul>';
    return pageIndicator;
}

function selectedPageAtIndex(idx, inNode, inTotalPage, inMaxNum, inArrDisable) {
	isNotNeedReloadPageStyleSheet = true;
	fadeOutMainContentScreen();
	setTimeout(function(){
		var nodePager1 = inNode.parentNode.parentNode;
		//var nodePager1 = document.getElementById('pageIndicatorNums');
		var tmpStr = genPageIndicatorHtml(inTotalPage, idx, inMaxNum, inArrDisable);
		nodePager1.innerHTML = tmpStr;
		if(typeof(window['pageIndicatorSelected']) == 'function') {
			window['pageIndicatorSelected'](idx, nodePager1);
			setTimeout(function() {
				if(mainContentScroll) {
					mainContentScroll.refresh();
				}
			}, 100)
		}
	},500);
	fadeInMainContentScreen();
}

/*** PAGE INDICATOR END ***/

/*** PRINT ***/

/* 2015/11/23 - TrungVQ.FPT Chinh sua: Them callback function */
function printNodeWithAll(inNode, beforePrint, afterPrint) {
	//Save old page
	var bodyPage = document.getElementById("bodyPage");
	
	var printContainer = document.createElement("div");
	printContainer.setAttribute("style", "sytle='padding-top:10px;'");
	printContainer.innerHTML = inNode.innerHTML;
	
	document.body.appendChild(printContainer);
	bodyPage.style.display = "none";
	
	setTimeout(function(){
		// TrungVQ.FPT - Them callback
		if(beforePrint && (typeof(beforePrint) == "function")) {
			beforePrint();
		}
		
		//Print Page
        window.print();
	
		//Restore orignal HTML
		bodyPage.style.display = "block";
		document.body.removeChild(printContainer);
		
		// TrungVQ.FPT - Them callback
		if(afterPrint && (typeof(afterPrint) == "function")) {
			afterPrint();
		}
	}, 300);
}

/*** PRINT END ***/







/*** EXT ***/

//TuanNQ1.FSoft
//Pervent on paste function
// Register onpaste on inputs and textareas in browsers that don't
// natively support it.
/*(function () {
    var onload = window.onload;

    window.onload = function () {
        if (typeof onload == "function") {
            onload.apply(this, arguments);
        }

        var fields = [];
        var inputs = document.getElementsByTagName("input");
        var textareas = document.getElementsByTagName("textarea");

        for (var i = 0; i < inputs.length; i++) {
            fields.push(inputs[i]);
        }

        for (var i = 0; i < textareas.length; i++) {
            fields.push(textareas[i]);
        }

        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];

            if (typeof field.onpaste != "function" && !!field.getAttribute("onpaste")) {
                field.onpaste = eval("(function () { " + field.getAttribute("onpaste") + " })");
            }

            if (typeof field.onpaste == "function") {
                var oninput = field.oninput;

                field.oninput = function () {
                    if (typeof oninput == "function") {
                        oninput.apply(this, arguments);
                    }

                    if (typeof this.previousValue == "undefined") {
                        this.previousValue = this.value;
                    }

                    var pasted = (Math.abs(this.previousValue.length - this.value.length) > 1 && this.value != "");

                    if (pasted && !this.onpaste.apply(this, arguments)) {
                        this.value = this.previousValue;
                    }

                    this.previousValue = this.value;
                };

                if (field.addEventListener) {
                    field.addEventListener("input", field.oninput, false);
                } else if (field.attachEvent) {
                    field.attachEvent("oninput", field.oninput);
                }
            }
        }
    }
})();*/

//TuanNQ1.FSoft
// replace the 'n'th character of 's' with 't'
function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}

//TuanNQ1.FSoft
//global variables of calendar
var carretPos;
var newDayStr;
var newMonthStr;
var newYearStr;
var minYear = 1900;
var maxYear = 2100;

//TuanNQ1.FSoft
//handle calendar using navigation (arrow keys, delete key), and numberic keys
//dd/mm/yyyy
function handleCalendarNav(tbx, e) {
	var keynum;
	carretPos = carretPos == undefined ? 0 : carretPos;
	var day;
	var month;
	var year;
	var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
	
	if (tbx.value.length == 0) { 
		tbx.value = "dd/mm/yyyy";
	}
	
	if (tbx.value.length > 0) {
		var tmpArr = tbx.value.split('/');
		tmpArr[0] = tmpArr[0] == "dd" ? "1" : tmpArr[0];
		day = Number(tmpArr[0]);
		tmpArr[1] = tmpArr[1] == "mm" ? "1" : tmpArr[1];
		month = Number(tmpArr[1]);
		tmpArr[2] = tmpArr[2] == "yyyy" ? minYear + "" : tmpArr[2];
		year = Number(tmpArr[2]);
		
		// Adjust for leap years
		if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
			monthLength[1] = 29;
		} else {
			monthLength[1] = 28;
		}
	}

	if (e.type == "click") {
		carretPos = 0;
		setSelection(tbx, 0, 0);
		newDayStr = "";
		newMonthStr = "";
		newYearStr = "";
		return;
	}
	
	if(window.event){ // IE					
		keynum = e.keyCode;
	}else if(e.which){ // Netscape/Firefox/Opera					
		keynum = e.which;
	 }
//	logInfo(keynum);
	if (keynum == 9) {
		return true;
	}
	if (keynum != 8 && keynum != 32 && keynum != 37 && keynum != 38 && keynum != 39 && keynum != 40 && (keynum < 48 || (keynum > 57 && keynum < 96) || keynum > 105)) {
		return false;
	}
	
	//HANDLE NAVIGATION KEY
	
	//left
	if (keynum == 37) {
		if (carretPos == 6) {
			newMonthStr = "";
			setSelection(tbx, 3, 5);
		} else if (carretPos == 3) {
			newDayStr = "";
			setSelection(tbx, 0, 2);
		} 
		return false;
	//up
	} else if (keynum == 38) {
		
		//dd
		if (carretPos == 0) {
			// Check the range of the day
   			if (day < monthLength[month - 1]) {
				day++;
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 0, 2);
		//mm
		} else if (carretPos == 3) {
			// Check the range of the month
   			if (month < 12) {
				month++;
				
				if (day > monthLength[month - 1]) {
					day = monthLength[month - 1];
				}
				
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 3, 5);
		//yyyy
		} else if (carretPos == 6) {
			// Check the range of the year
   			if (year < maxYear) {
				year++;
		
				// Adjust for leap years
				if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
					monthLength[1] = 29;
				} else {
					monthLength[1] = 28;
				}
				
				if (day > monthLength[month - 1]) {
					day = monthLength[month - 1];
				}
				
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 6, 10);
		} 
		return false;
	//right and space
	} else if (keynum == 39 || keynum == 32) {
		if (carretPos == 3) {
			newYearStr = "";
			setSelection(tbx, 6, 10);
		} else if (carretPos == 0) {
			newMonthStr = "";
			setSelection(tbx, 3, 5);
		}
		return false;
	//down
	} else if (keynum == 40) {
		
		//dd
		if (carretPos == 0) {
			// Check the range of the day
   			if (day > 1) {
				day--;
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 0, 2);
		//mm
		} else if (carretPos == 3) {
			// Check the range of the month
   			if (month > 1) {
				month--;
				
				if (day > monthLength[month - 1]) {
					day = monthLength[month - 1];
				}
				
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 3, 5);
		//yyyy
		} else if (carretPos == 6) {
			// Check the range of the year
   			if (year > minYear) {
				year--;
				
				// Adjust for leap years
				if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
					monthLength[1] = 29;
				} else {
					monthLength[1] = 28;
				}
				
				if (day > monthLength[month - 1]) {
					day = monthLength[month - 1];
				}
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" + year : month + "/" + year;
			}
			setSelection(tbx, 6, 10);
		} 
		return false;
	}
	
	//HANDLE NUMBERIC KEY and DELETE KEY
	if (keynum == 8 || (keynum >= 48 && keynum <= 57) || (keynum >= 96 && keynum <= 105)) {
		
		
		if (keynum == 8) {
			e.preventDefault();
			e.stopPropagation();
		}
		
		var tmpDate = tbx.value;
		var oriDate = tmpDate;
		var newDay, newMonth, newYear;
		keynum = keynum > 57 ? keynum - 48 : keynum;
		
		//dd
		if (carretPos == 0) {
			
			//delete key
			if (keynum == 8) {
				tmpDate = replaceAt(tmpDate, 0, "d");
				tmpDate = replaceAt(tmpDate, 1, "d");
				tbx.value = tmpDate;
				newDayStr = "";
				setSelection(tbx, 0, 2);
				return;
			}
			
			if (newDayStr.length == 0 || newDayStr.length >= 2) {
				newDayStr = String.fromCharCode(keynum);
				newDay = Number(newDayStr);
			} else {
				newDayStr += String.fromCharCode(keynum);
				newDay = Number(newDayStr);
			}
			
			// Check the range of the day
   			if (newDay >= 1 && newDay <= monthLength[month - 1]) {
				tbx.value = newDay < 10 ? "0" + newDay + "/" : newDay + "/";
				tbx.value += month < 10 ? "0" + month + "/" : month + "/";
				if (year < 10) {
					tbx.value += "000" + year;
				} else if (year < 100) {
					tbx.value += "00" + year;
				} else if (year < 1000) {
					tbx.value += "0" + year;
				} else {
					tbx.value += year;
				}
				
				if ((newDayStr.length == 1 && newDay > 3) || 
					(newDayStr.length == 2)) {
					carretPos = 3;
				}
			} else {
				if (keynum != 48 && keynum != 96) {
					e.preventDefault();
					e.stopPropagation();
					newDayStr = "";
				}
				else {
					newDayStr = "0";
				}
				//newDayStr = newDayStr.length == 2 ? newDayStr.charAt(1) : "";
				carretPos = 0;
				tbx.value = oriDate;
			}
			if (carretPos == 3) {
				setSelection(tbx, 3, 5);
			} else {
				setSelection(tbx, 0, 0);
			}
		//mm
		} else if (carretPos == 3) {
			
			//delete key
			if (keynum == 8) {
				if (tmpDate.substring(3, 5) == "mm") {
					tmpDate = replaceAt(tmpDate, 0, "d");
					tmpDate = replaceAt(tmpDate, 1, "d");
					tbx.value = tmpDate;
					newDayStr = "";
					carretPos = 0;
					setSelection(tbx, 0, 2);
					return;
				} else {
					tmpDate = replaceAt(tmpDate, 3, "m");
					tmpDate = replaceAt(tmpDate, 4, "m");
					tbx.value = tmpDate;
					newMonthStr = "";
					setSelection(tbx, 3, 5);
					return;
				}
			}
			
			if (newMonthStr.length == 0 || newMonthStr.length >= 2) {
				newMonthStr = String.fromCharCode(keynum);
				newMonth = Number(newMonthStr);
			} else {
				newMonthStr += String.fromCharCode(keynum);
				newMonth = Number(newMonthStr);
			}
			
			// Check the range of the month
   			if (newMonth >= 1 && newMonth <= 12) {
				
				if (day > monthLength[newMonth - 1]) {
					day = monthLength[newMonth - 1];
				}
				
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += newMonth < 10 ? "0" + newMonth + "/" : newMonth + "/";
				if (year < 10) {
					tbx.value += "000" + year;
				} else if (year < 100) {
					tbx.value += "00" + year;
				} else if (year < 1000) {
					tbx.value += "0" + year;
				} else {
					tbx.value += year;
				}
				
				if ((newMonthStr.length == 1 && newMonth > 1) || (newMonthStr.length == 2)) {
					carretPos = 6;
				}
			} else {
				if (keynum != 48 && keynum != 96) {
					e.preventDefault();
					e.stopPropagation();
					newMonthStr = "";
				} else {
					newMonthStr = "0";
				}
				
				//newMonthStr = newMonthStr.length == 2 ? newMonthStr.charAt(1) : "";
				
				carretPos = 3;
				tbx.value = oriDate;
			}
			if (carretPos == 6) {
				setSelection(tbx, 6, 10);
			} else {
				setSelection(tbx, 3, 5);
			}
		//yyyy
		} else if (carretPos == 6) {
			
			//delete key
			if (keynum == 8) {
				if (tmpDate.substring(6,10) == "yyyy") {
					tmpDate = replaceAt(tmpDate, 3, "m");
					tmpDate = replaceAt(tmpDate, 4, "m");
					tbx.value = tmpDate;
					newMonthStr = "";
					carretPos = 3;
					setSelection(tbx, 3, 5);
					return;
				} else {
					tmpDate = replaceAt(tmpDate, 6, "y");
					tmpDate = replaceAt(tmpDate, 7, "y");
					tmpDate = replaceAt(tmpDate, 8, "y");
					tmpDate = replaceAt(tmpDate, 9, "y");
					tbx.value = tmpDate;
					newYearStr = "";
					setSelection(tbx, 6, 10);
					return;
				}
			}
			
			if (newYearStr.length == 0 || newYearStr.length >= 4) {
				newYearStr = String.fromCharCode(keynum);
				newYear = Number(newYearStr);
			} else {
				newYearStr += String.fromCharCode(keynum);
				newYear = Number(newYearStr);
			}
			
			// Check the range of the year
   			if (newYear >= 1 && newYear <= maxYear) {
				
				// Adjust for leap years
				if(newYear % 400 == 0 || (newYear % 100 != 0 && newYear % 4 == 0)) {
					monthLength[1] = 29;
				} else {
					monthLength[1] = 28;
				}
				
				if (day > monthLength[month - 1]) {
					day = monthLength[month - 1];
				}
				
				tbx.value = day < 10 ? "0" + day + "/" : day + "/";
				tbx.value += month < 10 ? "0" + month + "/" : month + "/";
				if (newYear < 10) {
					tbx.value += "000" + newYear;
				} else if (newYear < 100) {
					tbx.value += "00" + newYear;
				} else if (newYear < 1000) {
					tbx.value += "0" + newYear;
				} else {
					tbx.value += newYear;
				}
				carretPos = 6;
			} else {
				e.preventDefault();
				e.stopPropagation();
				newYearStr = newYearStr.length == 4 ? "" : newYearStr;
				//newYearStr = "";
				carretPos = 6;
				tbx.value = oriDate;
			}
			setSelection(tbx, 6, 10);
		} 
		
		return false;
	}
}

//TuanNQ1.FSoft
// Validates that the input string is a valid date formatted as "dd/mm/yyyy"
function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < minYear || year > maxYear || month == 0 || month > 12)
        return false;

    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

//TuanNQ1.FSoft
//set selection in textbox
function setSelection(elem, start, end) {
	if(elem != null) {
		carretPos = start;
		elem.focus();
		elem.setSelectionRange(start, end);
    }
}

function getDiffDaysBetween(inStart, inEnd, inType) {
	var date1 = (typeof(inStart) == 'string')? getDateFromString(inStart, inType): inStart;
	var date2 = (typeof(inEnd) == 'string')? getDateFromString(inEnd, inType): inEnd;
	var timeDiff = date2.getTime() - date1.getTime();//Math.abs(date2.getTime() - date1.getTime());
	var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
	return diffDays;
}

function getDateFromString(inStr, inType) {
	var dt;
	if(inType == 'dd/MM/yyyy') {
		var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
		dt = new Date(inStr.replace(pattern,'$2/$1/$3'));
	}
	else if(inType == 'MM/dd/yyyy') {
		var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
		dt = new Date(inStr.replace(pattern,'$1/$2/$3'));
	}
	else {
		logInfo('Not support this type: ' + inType);
	}
	return dt;
}

function getStringFromDate(inDate) { //output format dd/MM/yyyy
	var td = new Date();
	var d = td.getDate();
	var m = td.getMonth() + 1;
	var y = td.getFullYear();
	d = (d < 10)? '0' + d: d;
	m = (m < 10)? '0' + m: m;
	return d + '/' + m + '/' + y;
}

// sort
var sort_by = function(field, reverse, primer){

   var key = primer ? 
       function(x) {return primer(x[field])} : 
       function(x) {return x[field]};

   reverse = [-1, 1][+!!reverse];

   return function (a, b) {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
     } 
}

/*** EXT END ***/

/*** IN-APP BROWSER ***/

function openLinkInWindows(inUrl, inType, startFunc, stopFunc, errFunc, exitFunc) {
	//alert('download');
	/*if(inUrl.indexOf('../') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(3, inUrl.length);
		}
		else if(inUrl.indexOf('./') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(2, inUrl.length);
		}
		else if(inUrl.indexOf('/') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(1, inUrl.length);
		}*/
	if(loadedPGlib) { //only using on app
		//fix for app.
		if(inUrl.indexOf('../') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(3, inUrl.length);
		}
		else if(inUrl.indexOf('./') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(2, inUrl.length);
		}
		else if(inUrl.indexOf('/') == 0) {
			inUrl = CONST_WEB_URL_LINK + inUrl.substr(1, inUrl.length);
		}
		
		/*
		inType:
		_self: Opens in the Cordova WebView if the URL is in the white list, otherwise it opens in the InAppBrowser.
		_blank: Opens in the InAppBrowser.
		_system: Opens in the system's web browser.
		*/
		if(!inUrl) {
			logInfo('NOT HAVE INPUT LINK');
			return;
		}
		if(!inType || inType=='') inType = '_blank';
		var ref = window.open(inUrl, inType, 'location=yes');
		ref.addEventListener('loadstart', function(event) { 
			logInfo('open link start: ' + event.url); 
			if(typeof(startFunc) == 'function') {
				startFunc();
			}
		});
		ref.addEventListener('loadstop', function(event) { 
			logInfo('open link stop: ' + event.url); 
			if(typeof(stopFunc) == 'function') {
				stopFunc();
			}
		});
		ref.addEventListener('loaderror', function(event) { 
			logInfo('open link error ' + inUrl + ': ' + event.message); 
			if(typeof(errFunc) == 'function') {
				errFunc();
			}
		});
		ref.addEventListener('exit', function(event) { 
			logInfo('exit open link' + inUrl + ': ' + event.type); 
			if(typeof(exitFunc) == 'function') {
				exitFunc();
			}
		});
	}
	else {
		
		var tmpANode = document.getElementById('atag-opentab');
		if(Environment.isAndroid()) {
			window.open(inUrl); //fix được với Android
		}
		else if(tmpANode) {
			tmpANode.setAttribute('href', inUrl);
			tmpANode.setAttribute('target', '_blank');
			tmpANode.click();
		}
		else {
			tmpANode = document.createElement('a');
			tmpANode.setAttribute('href', inUrl);
			tmpANode.setAttribute('target', '_blank');
			tmpANode.setAttribute('id', 'atag-opentab');
			document.body.appendChild(tmpANode);
			tmpANode.click();
		}
	}
}

/*** IN-APP BROWSER END ***/

/*** SEND FEEDBACK ***/

var dataURLFeedback;
var isFeedbackOpened = false;
function Html2Canvas(inNode){	
//initFeedback();
	if(!isFeedbackOpened){
		document.getElementById('btnFeedback').style.display = 'none';
		//inNode.style.display = 'none';
		html2canvas(document.body, {
			onrendered: function(canvas) {				
				// canvas is the final rendered <canvas> element
				dataURLFeedback = canvas.toDataURL();
				navController.pushToView('accessory/feedback', true, 'xsl');
				isFeedbackOpened = true;
			}
		});
	} else{
		isFeedbackOpened = false;
		navController.popView(true);
	}
}

/*** SEND FEEDBACK END ***/


/*** CUSTOMIZE MENU ***/
function genMenuSection() {
	var menuContentList = document.createElement('ul');
	menuContentList.setAttribute('id', 'menu.slideview');
	menuContentList.setAttribute('class', 'menu-layout-contents');
	menuContentList.style.listStyleType = 'none';
	for (var k=0; k < gMenuUserOrder.length; k++) {
		for(var i=0; i < gMenuList.length; i++) {
			var tmpMenuObj = gMenuList[i];
			
			if(tmpMenuObj.menuID.length > 1 && tmpMenuObj.parentMenuID.length == 0 && gMenuUserOrder[k] == tmpMenuObj.menuID) {
				var tmpModuleNode = document.createElement('li');
				tmpModuleNode.setAttribute('id', tmpMenuObj.menuID);
				var tmpModuleDiv = document.createElement('div');
				tmpModuleDiv.setAttribute('id', tmpMenuObj.path);
				tmpModuleDiv.setAttribute('onClick', tmpMenuObj.onClick);
				tmpModuleNode.appendChild(tmpModuleDiv);
				var tmpModuleEm = document.createElement('em');
				tmpModuleEm.setAttribute('class', tmpMenuObj.iconCode);
				tmpModuleDiv.appendChild(tmpModuleEm);
				var tmpModuleDivLang = document.createElement('div');
				tmpModuleDivLang.setAttribute('class', 'langNoStyle');
				tmpModuleDivLang.style.fontWeight = 'bold';
				tmpModuleDivLang.innerHTML = tmpMenuObj.keyLang;
				tmpModuleDiv.appendChild(tmpModuleDivLang);
				var tmpModuleSpan = document.createElement('span');
				tmpModuleSpan.innerHTML = '1';
				tmpModuleDiv.appendChild(tmpModuleSpan);
			
				if(tmpMenuObj.imgHighlight && tmpMenuObj.imgHighlight.length > 0) {
					var tmpModuleImg = document.createElement('img');
					tmpModuleImg.setAttribute('src', tmpMenuObj.imgHighlight);
					tmpModuleImg.width = '30';
					tmpModuleImg.height = '25';
					tmpModuleDiv.appendChild(tmpModuleImg);
				}
				var childNodeStatus = false;
				for(var j=0; j < gMenuList.length; j++) {
					var tmpChildMenu = gMenuList[j];
					if (tmpChildMenu.parentMenuID.length > 0 && tmpChildMenu.parentMenuID == tmpMenuObj.menuID) {
						childNodeStatus = true;
						break;
					}
				}
				
				if(childNodeStatus) {
					var tmpChildMenu = document.createElement('ul');
					tmpChildMenu.setAttribute('class', 'menu-layout-contents-sub');
					tmpModuleNode.appendChild(tmpChildMenu);
					
					var tmpChildDiv = document.createElement('div');
					tmpChildDiv.setAttribute('id', 'wrapper_' + tmpMenuObj.menuID);
					tmpChildDiv.setAttribute('class', 'wrapper');
					tmpChildMenu.appendChild(tmpChildDiv);
					
					var tmpChildScrollDiv = document.createElement('div');
					tmpChildDiv.appendChild(tmpChildScrollDiv);
					
					for(var j=0; j < gMenuList.length; j++) {
						var tmpChildMenuObj = gMenuList[j];
						if (tmpChildMenuObj.parentMenuID.length > 0 && tmpChildMenuObj.parentMenuID == tmpMenuObj.menuID) {
							var tmpFuncLi = document.createElement('li');
							tmpFuncLi.setAttribute('id', tmpChildMenuObj.menuID);
							//tmpFuncLi.setAttribute('style', 'while-space:pre-wrap;width:90%;');
							tmpChildScrollDiv.appendChild(tmpFuncLi);
							var tmpFuncDiv = document.createElement('div');
							tmpFuncDiv.setAttribute('onClick', tmpChildMenuObj.onClick);
							tmpFuncDiv.setAttribute('id', tmpChildMenuObj.path);
							tmpFuncLi.appendChild(tmpFuncDiv);
							
							var tmpFuncEm = document.createElement('em');
							tmpFuncEm.setAttribute('class', tmpChildMenuObj.iconCode);
							tmpFuncDiv.appendChild(tmpFuncEm);
							var tmpFuncDivLang = document.createElement('div');
							tmpFuncDivLang.setAttribute('class', 'langNoStyle');
							tmpFuncDivLang.innerHTML = tmpChildMenuObj.keyLang;
							tmpFuncDiv.appendChild(tmpFuncDivLang);
							var tmpFuncSpan = document.createElement('span');
							tmpFuncDiv.appendChild(tmpFuncSpan);
							if(tmpChildMenuObj.imgHighlight && tmpChildMenuObj.imgHighlight.length > 0) {
								var tmpFuncImg = document.createElement('img');
								tmpFuncImg.setAttribute('src', tmpChildMenuObj.imgHighlight);
								tmpFuncImg.width = '30';
								tmpFuncImg.height = '25';
								tmpFuncDiv.appendChild(tmpFuncImg);
							}
						}
					}
				}
				logInfo('Module li: ' + tmpModuleNode);
				menuContentList.appendChild(tmpModuleNode);
			}
		}
	}
	
	//logInfo('Menu section: ' + menuContentList.innerHTML);
	//var gMenuRawData = document.createElement('div');
	
	document.getElementById('menu-section').innerHTML = gMenuRawData;
	document.getElementById('menu.slideview').innerHTML = menuContentList.innerHTML;
	gMenuRawData = document.getElementById('menu-section').innerHTML;
	if (document.getElementById('wrapper_jumboAcc')) {
		gJumboMenuElements = document.getElementById('wrapper_jumboAcc').innerHTML; //FIX FOR JUMBO
	}
	changeMenuLanguage();
	applyDynamicCommonStyleSheet();
}

/*** CUSTOMIZE MENU END ***/


function createDatePicker(positionId, spanId) {
    var dict = {
        'custom': {
            common: {
                bwd: 'Trước',
                fwd: 'Sau',
                hide: 'Đóng'
            },
            weekdays: {
                motu: 'T2;T3;T4;T5;T6;T7;CN'
            },
            monthes: {
                full: 'Tháng 1;Tháng 2;Tháng 3;Tháng 4;Tháng 5;Tháng 6;Tháng 7;Tháng 8;Tháng 9;Tháng 10;Tháng 11;Tháng 12'
            },
        }
    };

    if (gUserInfo.lang == "EN")
        dict = {
            'custom': {
                common: {
                    bwd: 'Previous',
                    fwd: 'Next',
                    hide: 'Close'
                },
                weekdays: {
                    motu: 'Mo;Tu;We;Th;Fr;Sa;Su'
                },
                monthes: {
                    full: 'January;Feburary;March;April;May;June;July;August;September;October;November;December'
                },
            }
        };

    var funcs = {
        select: function(data, fn) {
            document.getElementById(positionId).value = HumanDate.human(data, 'd/m/Y'); //node nhan gia tri
            fn.hide();
        }
    };

    var configs = {
        tmpl_field: 'd/m/Y',
        range_min: '01-01-2008',
        range_max: '12-31-2999',
        dom_field: document.getElementById(spanId), //node make action            
        async_selection: true,
        dictionaries: dict
    }
    new DatePicker(funcs, configs);
}

// Hien thi ra popup danh sach template thue noi dia
function showTemplateDomesticTax(inTitle, inArray1, inArray2, showValue) {
    hiddenKeyBoard();
    var dialogHeight = 0;
    var divID = 'divListGroup';
    var divNode = document.getElementById(divID);
    if ((divNode != null) && (divNode != undefined)) {
        divNode.innerHTML = "";
    } else {
        logInfo('Dialog not exist divID: ' + divID);
        return;
    }
    if (inArray1.length <= 0) {
        logInfo('Dialog do not have inArray1 data');
        return;
    }

    //var dialogDivAll = document.createElement('div');
    var inputButton = document.createElement("div");
    inputButton.setAttribute("class", "list-group-item active dialog-payee-input");
    inputButton.setAttribute('style', 'padding: 0px;');

    var aNodeTitle = document.createElement("a");
    aNodeTitle.setAttribute("class", "list-group-item active dialog-caption");
    aNodeTitle.innerHTML = inTitle;
    inputButton.appendChild(aNodeTitle);

    var inputNode = document.createElement("div");
    var contentInput = "";
    contentInput += "<table>" +
        "<tr>" +
        "<td colspan='2' align='center' valign='middle' class='td-text' width='80%'>" +
        "<div class='input-group'>" +
        "<span class='input-group-addon' style='white-space:pre-wrap; width:0%'>" /*"+CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION')*/ + "</span>" +
        "<input id='id.inputAcc' type='text' class='form-control-input-dialog form-control-righttext' placeholder='" + CONST_STR.get('ESAVING_CHANGEINFO_VF_ARR1') + "' onkeyup='dataFilter();'/>" +
        "<span class='input-group-addon input-group-symbol'></span>" +
        "</div>" +
        "</td>" +
        "<td colspan='2' width='20%'><input id='inputDone' type = 'button' class='btnshadow btn-second' value = '" + CONST_STR.get('TRANSFER_REMITTANCE_DONE_BUTTON') + "' onClick = 'btnFinClick();'/></td>" +
        "</tr>";
    contentInput += "</table>";
    inputNode.innerHTML = contentInput;
    inputButton.appendChild(inputNode);

    var dialogDivContainerScroll = document.createElement('div');
    dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
    dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');
    var dialogDivContainer = document.createElement('div');

    for (var x = 1; x < inArray1.length + 1; x++) {
        if (x < 6) {
            dialogHeight = dialogHeight + 39;
        }
        var aNode = document.createElement("a");
        aNode.setAttribute("class", "list-group-item");
        aNode.setAttribute("name", "dataDisplay");
        aNode.setAttribute("style", "width: 100%");
        if (showValue) {
            aNode.style.textAlign = "left";
        } else {
            aNode.style.textAlign = "center";
        }

        aNode.setAttribute("onClick", "selectedItemOnDialog(this," + x + ");");
        aNode.innerHTML = inArray1[x - 1];

        var tmpValue = inArray2[x - 1];
        if ((tmpValue != undefined) && (tmpValue != null)) {
            var spanNode = document.createElement("span");
            spanNode.setAttribute("class", "badge");
            spanNode.setAttribute("style", "width: 25%");
            spanNode.innerHTML = tmpValue;
            if (!showValue) {
                spanNode.style.display = 'none';
            }
            aNode.appendChild(spanNode);
        }
        dialogDivContainer.appendChild(aNode);
        dialogDivContainer.appendChild(aNode);
    }
    // Hien thi title "Khong co du lieu"
    var aNode = document.createElement("a");
    aNode.setAttribute("class", "list-group-item");
    aNode.setAttribute("id", "noDataFound");
    aNode.setAttribute("style", "width: 100%; display:none");
    aNode.innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
    dialogDivContainer.appendChild(aNode);

    dialogDivContainerScroll.appendChild(dialogDivContainer);
    inputButton.appendChild(dialogDivContainerScroll);

    divNode.appendChild(inputButton);
    divNode.style.top = (clientHeight - dialogHeight) / 2 + 20 + 'px';

    if (inArray1.length > 5) {

        dialogScroll = new IScroll('#selection-dialog-scroll', {
            scrollbars: true,
            mouseWheel: true,
			
            draggableScrollbars: true,
            onScrollMove: function() {
                hasDialogContentScrollEvent = true;
            },
            onScrollEnd: function() {
                hasDialogContentScrollEvent = false;
            },
        });
        setTimeout(function() {
            dialogScroll.refresh();
        }, 200);
    }

    var dialogContainer = document.getElementById("selection-dialog");
    if (dialogContainer != null) {
        dialogContainer.style.zIndex = 2001;
        dialogContainer.style.display = "block";
        dialogContainer.style.opacity = 1;
    }
}

//Hien thi ra popup danh sach template thue xuat nhap khau
function showTemplateEITax(inTitle, inArray1, inArray2, inArray3, inArray4, showValue) {
    hiddenKeyBoard();
    var dialogHeight = 0;
    var divID = 'divListGroup';
    var divNode = document.getElementById(divID);
    if ((divNode != null) && (divNode != undefined)) {
        divNode.innerHTML = "";
    } else {
        logInfo('Dialog not exist divID: ' + divID);
        return;
    }
    if (inArray1.length <= 0) {
        logInfo('Dialog do not have inArray1 data');
        return;
    }
    if (inArray2.length <= 0) {
        logInfo('Dialog do not have inArray2 data');
        return;
    }
    if (inArray3.length <= 0) {
        logInfo('Dialog do not have inArray3 data');
        return;
    }
    if (inArray4.length <= 0) {
        logInfo('Dialog do not have inArray4 data');
        return;
    }

    var contentInput = "";
    var inputButton = document.createElement("div");
    inputButton.setAttribute("class", "list-group-item active dialog-payee-input");
    inputButton.setAttribute('style', 'padding: 0px;');

    var aNodeTitle = document.createElement("a");
    aNodeTitle.setAttribute("class", "list-group-item active dialog-caption");
    aNodeTitle.innerHTML = inTitle;
    inputButton.appendChild(aNodeTitle);

    var inputTable = document.createElement("div");
    contentInput += "<table>" +
        "<tr>" +
        "<td colspan='2' align='center' valign='middle' class='td-text' width='80%'>" +
        "<div class='input-group'>" +
        "<span class='input-group-addon' style='white-space:pre-wrap; width:0%'>" /*"+CONST_STR.get('TRANS_LOCAL_ACC_DESTINATION')*/ + "</span>" +
        "<input id='id.inputAcc' type='text' class='form-control-input-dialog form-control-righttext' placeholder='" + CONST_STR.get('ESAVING_CHANGEINFO_VF_ARR1') + "' onkeyup='dataFilter();'/>" +
        "<span class='input-group-addon input-group-symbol'></span>" +
        "</div>" +
        "</td>" +
        "<td colspan='2' width='20%'><input id='inputDone' type = 'button' class='btnshadow btn-second' value = '" + CONST_STR.get('TRANSFER_REMITTANCE_DONE_BUTTON') + "' onClick = 'btnFinClick();'/></td>" +
        "</tr>";

     contentInput += "</table>";
    inputTable.innerHTML = contentInput;
    inputButton.appendChild(inputTable);

    var dialogDivContainerScroll = document.createElement('div');
    dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
    dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');
    var dialogDivContainer = document.createElement('div');

    for (var x = 1; x < inArray1.length + 1; x++) {
        if (x < 6) {
            dialogHeight = dialogHeight + 39;
        }
        var aNode = document.createElement("a");
        aNode.setAttribute("class", "list-group-item");
        aNode.setAttribute("name", "dataDisplay");
        aNode.setAttribute("style", "width: 100%");
        if (showValue) {
            aNode.style.textAlign = "left";
        } else {
            aNode.style.textAlign = "center";
        }

        aNode.setAttribute("onClick", "selectedItemOnDialog(this," + x + ");");
        aNode.innerHTML = inArray1[x - 1];
        
        var tmpValue = inArray3[x - 1] + "/" + inArray4[x - 1];
        if ((tmpValue != undefined) && (tmpValue != null)) {
            var spanNode = document.createElement("span");
            spanNode.setAttribute("class", "badge");
            spanNode.setAttribute("style", "width: 25%");
            spanNode.innerHTML = tmpValue;
            spanNode.style.display = 'none';
            aNode.appendChild(spanNode);
        }
        dialogDivContainer.appendChild(aNode);

        var value2 = inArray3[x - 1];
        if ((value2 != undefined) && (value2 != null)) {
            var spanNode = document.createElement("span");
            spanNode.setAttribute("class", "badge");
            spanNode.setAttribute("style", "width: 25%");
            spanNode.innerHTML = value2;
            if (!showValue) {
                spanNode.style.display = 'none';
            }
            aNode.appendChild(spanNode);
        }
        dialogDivContainer.appendChild(aNode);
    }
    
    // Hien thi title "Khong co du lieu"
    var aNode = document.createElement("a");
    aNode.setAttribute("class", "list-group-item");
    aNode.setAttribute("id", "noDataFound");
    aNode.setAttribute("style", "width: 100%; display:none");
    aNode.innerHTML = CONST_STR.get('CORP_MSG_COM_NO_DATA_FOUND');
    dialogDivContainer.appendChild(aNode);

    dialogDivContainerScroll.appendChild(dialogDivContainer);
    inputButton.appendChild(dialogDivContainerScroll);

    divNode.appendChild(inputButton);

    divNode.style.top = (clientHeight - dialogHeight) / 2 + 20 + 'px';

    if (inArray1.length > 5) {

        dialogScroll = new IScroll('#selection-dialog-scroll', {
            scrollbars: true,
            mouseWheel: true,
            draggableScrollbars: true,
            onScrollMove: function() {
                hasDialogContentScrollEvent = true;
            },
            onScrollEnd: function() {
                hasDialogContentScrollEvent = false;
            },
        });
        setTimeout(function() {
            dialogScroll.refresh();
        }, 200);
    }

    var dialogContainer = document.getElementById("selection-dialog");
    if (dialogContainer != null) {
        dialogContainer.style.zIndex = 2001;
        dialogContainer.style.display = "block";
        dialogContainer.style.opacity = 1;
    }
}

// Thuc hien format lai chuoi message
function formatString(sourceString, itemReplace){
	var result = sourceString;
	for(var i = 0; i < itemReplace.length; i++){
		result = result.replace('{' + i +'}', itemReplace[i]);
	}
	
	return result;
}

function sendJSONRequestDialogCorp(USERID, PAYNENAME, TYPETEMPLATE, tabName) {
    var data = {};
    var arrayArgs = [];
    //Lấy danh sách tin cậy             
    showMask(tabName);

    var request = {};
    request.sequenceId = 5;
    request.idtxn="M01",
    request.txnType = PAYNENAME;
    console.log(request);
    var jsonRequest = JSON.stringify(request);

    arrayArgs.push("");
    arrayArgs.push(jsonRequest);

    requestBackgroundMBServiceCorp('CMD_CO_MANAGE_TEMPLATE', arrayArgs, requestMBServiceSuccesssDialogCorp);
}

function requestMBServiceSuccesssDialogCorp(e) {

    var response = JSON.parse(e);
    objJSON = response.respJsonObj;
    var args = new Array();
    hiddenMask();
    if (objJSON != undefined && objJSON[0] != undefined) {
        if ((response.respCode == '0') && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"))) && getTabSelected() == 'tab1') {
     
            gPayeeList = new Array();
            var index = 0;
            for (var i = 0; i < objJSON.length; i++) {
                var payeeObjTemp = new PayeeObj();
                payeeObjTemp.customerNo = objJSON[i].BENE_ACCTNO;
                payeeObjTemp.payeeType = objJSON[i].TYPE_TEMPLATE;
                payeeObjTemp.transType = objJSON[i].TXN_TYPE;
                payeeObjTemp.transValue = objJSON[i].BENE_ACCTNO;
                payeeObjTemp.numAmount = objJSON[i].NUMAMOUNT;
                payeeObjTemp.peopleName = objJSON[i].FANCY_NAME != null ? objJSON[i].FANCY_NAME : objJSON[i].BENE_NAME;
                payeeObjTemp.partnerCode = objJSON[i].BANK_CODE;
                payeeObjTemp.provinceCode = objJSON[i].CITYCODE;
                payeeObjTemp.citadCode = objJSON[i].SORTCODE;
                payeeObjTemp.partnerName = objJSON[i].BANK_NAME;
                payeeObjTemp.fancyName = objJSON[i].FANCY_NAME;
                payeeObjTemp.branchName = objJSON[i].BRANCH_NAME;
                payeeObjTemp.beneId = objJSON[i].BENEID;
                payeeObjTemp.branchCode = objJSON[i].BRANCH_CODE;
				payeeObjTemp.passport = objJSON[i].PASSPORT;
                if(payeeObjTemp.transType != 3){
					if (payeeObjTemp.payeeType == 0) {
						gPayeeList.push(payeeObjTemp);
						var obj = new Object();
						obj.value1 = payeeObjTemp.customerNo;
						obj.value2 = payeeObjTemp.peopleName;
						obj.index = index++;
						args.push(obj);
					}
				}
				else{
					if (payeeObjTemp.payeeType == 0) {
						gPayeeList.push(payeeObjTemp);
						var obj = new Object();
						obj.value1 = payeeObjTemp.passport;
						obj.value2 = payeeObjTemp.peopleName;
						obj.index = index++;
						args.push(obj);
					}
				}
            }

            DialogListInput.prototype.addListData(addSuccessed, args, 'tab1');
        }
        if ((response.respCode == '0') && (parseInt(response.responseType) == parseInt(CONSTANTS.get("CMD_CO_MANAGE_TEMPLATE"))) && getTabSelected() == 'tab2') {

            lstTemplate = new Array();
            if (objJSON != undefined) {
                var index = 0;
                for (var k = 0; k < objJSON.length; k++) {
                    var objtemp = new Object();
                    objtemp.name = objJSON[k].BENE_DESC;
                    objtemp.tai_khoan_nguon = objJSON[k].SOURCE_ACC;
                    objtemp.ten_tai_khoan_dich = objJSON[k].BENE_NAME;
                    objtemp.tai_khoan_dich = objJSON[k].BENE_ACCTNO;
                    objtemp.so_tien = objJSON[k].NUMAMOUNT;
                    objtemp.noi_dung = objJSON[k].MSG;
                    objtemp.ngan_hang_nhan = objJSON[k].BANK_NAME;
                    objtemp.ma_citad = objJSON[k].SORTCODE;
                    objtemp.cn_ngan_hang_nhan = objJSON[k].BRANCH_NAME;
                    objtemp.loai_chuyen_tien = objJSON[k].IDTXN;
                    objtemp.ma_ngan_hang_nhan = objJSON[k].BANK_CODE;
                    objtemp.ma_tinh_thanh = objJSON[k].CITYCODE;
                    objtemp.loai_mau = objJSON[k].TYPE_TEMPLATE;
                    objtemp.beneId = objJSON[k].BENEID;
                    objtemp.branchCode = objJSON[k].BRANCH_CODE;

                    if (objtemp.loai_mau == 1) {
                        lstTemplate.push(objtemp);
                        var obj = new Object();
                        obj.value1 = objtemp.tai_khoan_dich;
                        obj.value2 = objtemp.name;
                        obj.index = index++;
                        args.push(obj);
                    }

                }
            }
            DialogListInput.prototype.addListData(function(){}, args, 'tab2');
        }
    }

}

function showDialogListWith4Arr(inTitle, inArray1, inArray2, inArray3, inArray4, showValue) { //inArray1 is the most important, showValue: true - text align left, false - text align right
  hiddenKeyBoard();
  setTimeout(function() {
    var dialogHeight = 0;
    var divID = 'divListGroup';
    var divNode = document.getElementById(divID);
    if ((divNode != null) && (divNode != undefined)) {
      divNode.innerHTML = "";
    } else {
      logInfo('Dialog not exist divID: ' + divID);
      return;
    }
    if (inArray1.length <= 0) {
      logInfo('Dialog do not have inArray1 data');
      return;
    }

    var dialogDivAll = document.createElement('div');
    var aNodeTitle = document.createElement("a");
    aNodeTitle.setAttribute("class", "list-group-item active dialog-caption");
    aNodeTitle.innerHTML = inTitle;
    divNode.appendChild(aNodeTitle);


    var dialogDivContainerScroll = document.createElement('div');
    dialogDivContainerScroll.setAttribute('id', 'selection-dialog-scroll');
    dialogDivContainerScroll.setAttribute('class', 'dialog-scroll-content');
    var dialogDivContainer = document.createElement('div');

    for (var x = 1; x < inArray1.length + 1; x++) {
      if (x < 6) {
        dialogHeight = dialogHeight + 39;
      }
      var aNode = document.createElement("a");


      aNode.setAttribute("class", "list-group-item");
      if (showValue) {
        aNode.style.textAlign = "left";
      } else {
        aNode.style.textAlign = "center";
      }

      aNode.setAttribute("onClick", "selectedItemOnDialog(this," + x + ");");
      aNode.innerHTML = inArray1[x - 1];
        
      var tmpValue = inArray2[x - 1] + "/" +inArray3[x - 1];
      if ((tmpValue != undefined) && (tmpValue != null)) {
         var spanNode = document.createElement("span");
         spanNode.setAttribute("class", "badge");
         spanNode.setAttribute("style", "width: 25%");
         spanNode.innerHTML = tmpValue;
         spanNode.style.display = 'none';
         aNode.appendChild(spanNode);
      }
      dialogDivContainer.appendChild(aNode);

      var tmpValue3 = inArray3[x - 1];
      if ((tmpValue3 != undefined) && (tmpValue3 != null)) {
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "badge");
        spanNode.innerHTML = tmpValue3;
        if (!showValue) {
          spanNode.style.display = 'none';
        }
        aNode.appendChild(spanNode);
      }
      dialogDivContainer.appendChild(aNode);

      var tmpValue4 = inArray4[x - 1];
      if ((tmpValue4 != undefined) && (tmpValue4 != null)) {
        var spanNode = document.createElement("span");
        spanNode.setAttribute("class", "badge");
        spanNode.innerHTML = tmpValue4;
        if (!showValue) {
          spanNode.style.display = 'none';
        }
        aNode.appendChild(spanNode);
      }
      dialogDivContainer.appendChild(aNode);
    }

    dialogDivContainerScroll.appendChild(dialogDivContainer);
    dialogDivAll.appendChild(dialogDivContainerScroll);

    divNode.appendChild(dialogDivAll);
    divNode.style.top = (clientHeight - dialogHeight) / 2 + 20 + 'px';

    if (inArray1.length > 5) {
      dialogScroll = new IScroll('#selection-dialog-scroll', {
        scrollbars: true,
        mouseWheel: true,
		
        draggableScrollbars: true,
        onScrollMove: function() {
          hasDialogContentScrollEvent = true;
        },
        onScrollEnd: function() {
          hasDialogContentScrollEvent = false;
        },
      });
      setTimeout(function() {
        dialogScroll.refresh();
      }, 200);
    }

    var dialogContainer = document.getElementById("selection-dialog");
    if (dialogContainer != null) {
      dialogContainer.style.zIndex = 2001;
      dialogContainer.style.display = "block";
      dialogContainer.style.opacity = 1;
    }
  }, 300);

}

/* 
 * TrungVQ.FPT
 * Highlight menu sau khi click
 */
function highlightSelectedMenu(target) {
    var selectedMenus = document.querySelectorAll("#menu-section .langNoStyleSelected");
    if (selectedMenus != null) {
        for (var i = 0; i < selectedMenus.length; i++) {
            var menu = selectedMenus[i];
            menu.className = menu.className.replace("langNoStyleSelected", "");
        }
    }
    var currentMenu = target.querySelector(".langNoStyle");
	if (currentMenu != null)
		currentMenu.className += " langNoStyleSelected";
}

/**
 * Lam ngan ten de hien thi tren man hinh
 * */
function createShortName(name){
	var shortName = name;
	
	if(shortName.length > 19){
		var dataNames = name.split(" ");
		var startShort = 1;
		var checkLength = true;
		
		do{
			dataNames[startShort] = dataNames[startShort].charAt(0) + ".";
			
			shortName = "";
			for(var i = 0; i < dataNames.length; i++){
				if(i == 0){
					shortName = dataNames[i];
				}else{
					shortName = shortName + " " + dataNames[i];
				}
			}
			
			if(shortName.length <= 19 || startShort == dataNames.length - 2){
				checkLength = false;
			}
			startShort = startShort + 1;
		}while(checkLength == true);
	}
	
	return shortName;
}

/**
* Action khi click vao 1 row cua table-checkbox
*/
function selectRow(event, row, isCheckAll) {
    var target = event.target;
    if (isCheckAll === true) {
        var checkboxAll = getCheckBoxFromRow(target, row);
        if (checkboxAll === null)
            return;
        if (target !== checkboxAll)
            checkboxAll.checked = !checkboxAll.checked;
        var tableElement = findAncestor(checkboxAll, "table-checkbox");
        var checkboxes = tableElement.querySelectorAll("td input[type='checkbox']");
        for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].checked = checkboxAll.checked;
        }
        return;
    }
    
    if (target.className === "no-check") {
        event.preventDefault;
        return;
    }
    var noCheck = target.getElementsByClassName("no-check");
    if (noCheck !== null && noCheck.length > 0) {
        event.preventDefault;
        return;
    }

    var currentCheckbox = getCheckBoxFromRow(target, row);
    if (currentCheckbox === null)
        return;
    if (currentCheckbox !== target) {
        currentCheckbox.checked = !currentCheckbox.checked;
    }

    var tableElement = findAncestor(currentCheckbox, "table-checkbox");
    var checkboxAll = tableElement.querySelector("input[type='checkbox']");
    if (currentCheckbox.checked === false)
        checkboxAll.checked = false;
}

/**
* Tim parent theo class
*/
function findAncestor(element, className) {
    while ((element = element.parentElement) && !element.classList.contains(className));
    return element;
}

/**
* Get check box element tu 1 row trong table
*/
function getCheckBoxFromRow(target, row) {
    if (target.tagName.toLowerCase() === "input" && target.getAttribute("type") === "checkbox")
        return target;
    var inputs = row.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("type") === "checkbox")
            return inputs[i];
    }
    return null;
}

/**
* An nut export excel va print tren ban app
*/
function hideExportPrint() {
    if (CONST_BROWSER_MODE)
        return;
    var nodes = document.getElementsByClassName("export-print");
    if (nodes === null)
        return;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        node.parentNode.removeChild(node);
    }
}

/**
* Fix loi hien thi tren chrome iphone ios9
*/
if (typeof(iOSversion()) !== "undefined" && bowser.name == "Chrome") {
    if (!sessionStorage.getItem("isLoaded")) {
        sessionStorage.setItem("isLoaded", true);
        window.onbeforeunload = '';
        var url = location.protocol + '//' + location.host + location.pathname;
        if (getURLParam('ver')) {
            url += '?ver=' + getURLParam('ver');
        }
        window.top.location.href = url;
    }
}

/**
 * Send request xuat excel
 */
function corpExportExcel(request) {
    var form = document.createElement("form");
    form.target = "_blank";
    form.setAttribute("method", "POST");
    form.setAttribute("action", gMBServiceUrl + "/report");

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "request");
    hiddenField.setAttribute("value", JSON.stringify(request));
    form.appendChild(hiddenField);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
}

function formatToUSD(number) {
    var num = (typeof(number) == "string") ? parseFloat(number) : number;
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

function CurrencyFormattedNew(amount) {
    if (amount.toString().substring(0,1)=='.') {
        amount = '0' + amount;
        return amount;        
    }
    if(parseFloat(amount) == 0)
        return 0;

    var re = new RegExp(',', 'g');
    amount = amount.toString().replace(re, '');
    var delimiter = ","; // replace comma if desired
    amount = new String(amount);
    var a = amount.split('.', 2)
    var d = a[1];
    var i = Number((a[0]));
    if (i == 0)
        return '';

    if (isNaN(i)) {
        return '';
    }
    var minus = '';
    if (i < 0) {
        minus = '-';
    }
    i = Math.abs(i);
    var n = new String(i);
    var a = [];
    while (n.length > 3) {
        var nn = n.substr(n.length - 3);
        a.unshift(nn);
        n = n.substr(0, n.length - 3);
    }

    if (n.length > 0) {
        a.unshift(n);
    }

    n = a.join(delimiter);
    
    if(d != undefined)
    {
        if(d.length < 1)
        {
         amount = n;
        }
         else {
         amount = n + '.' + d;
         }
    }else
    {
         amount = n;
    }   

    amount = minus + amount;    
    return amount;
}

function refeshContentScroll() {
    setTimeout(function () {
        if (mainContentScroll) {
            mainContentScroll.refresh();
        }
    }, 100);
}

function datenow() {
    var now = new Date();
    now.setDate(now.getDate());
    var day = now.getDate();
    var month = now.getMonth() + 1;
    var year = now.getFullYear();
    var datenow = day + '/' + month + '/' + year;
    return datenow;
}


function onclickMenu(page) {
    navCachedPages[page] = null;
    navController.initWithRootView(page, true, 'html');
}

function setTitleNavgationBar(title) {
    document.getElementById('titleNavigation').innerHTML = title;
}