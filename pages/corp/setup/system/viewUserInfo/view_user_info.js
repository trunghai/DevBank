var imgSelected;
var currentFile;
var resultUserImg;
var infoNode1 = document.getElementById('info1');
var icropper1;
var isSmallScrMode;
var clientCusWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var canvasImg = document.createElement("canvas");
var ctxImg = canvasImg.getContext("2d");
var scaledImage = null;
var angleRotate = 0;

function loadInitXML() {
    return '';
}

function viewDidLoadSuccess() {
    if (gUserInfo.userAvatar && gUserInfo.userAvatar.length > 0) {
        document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="300" src="' + gUserInfo.userAvatar + '" />';
    } else {
        document.getElementById('cus-profile-img-avatar').innerHTML = '<img width="300" src="./assets/images/acc-info-img.png" />';
    }

    //goi len service lay thong tin nguoi dung
    sendRequestGetUserInfo();

    document.getElementById("btnFile").value = '';
    document.getElementById("avatar-btn-upload").style.display = 'none';

    imgSelected = document.getElementById("id.fileUpload01");
    resultUserImg = document.getElementById('cus-profile-img-avatar');
    infoNode1 = document.getElementById('info1');
    clientCusWidth -= 25; // padding size
    if (gModeScreenView == CONST_MODE_SCR_SMALL) {
        isSmallScrMode = true;
    } else {
        isSmallScrMode = false;
    }
    imgSelected.onchange = function(e) {

        e.preventDefault();
        var target = e.dataTransfer || e.target;
        var file = target && target.files && target.files[0];
        var options = {
            maxWidth: resultUserImg.width,
            canvas: true
        };
        if (!file) {
            logInfo("Not exist file");
            return;
        }
        loadImage.parseMetaData(file, function(data) {
            displayImage(file, options);
        });
        fnChange(imgSelected);
    }
    if (isAndroidBrowserAbove4 || iOSversion() > 5) {
        document.getElementById('take-picture-icon').style.display = '';
    } else {
        document.getElementById('take-picture-icon').style.display = 'none'
    }
}

function viewWillUnload() {
    logInfo(' will unload');

}


function viewBackFromOther() {
    logInfo('Back from other view');
}

function sendRequestGetUserInfo(){
    var data = {};
    
    var obj = new Object();
    obj.idtxn = "S16";
    obj.sequenceId = "1";
    var listInfo = new Array();

    listInfo.push("1");
    listInfo.push(obj);

    var gprsCmd = new GprsCmdObj(1206, "", "", gUserInfo.lang, gUserInfo.sessionID, listInfo);
    data = getDataFromGprsCmd(gprsCmd);
    requestMBServiceCorp(data, true, 0, requestMBServiceSuccess, requestMBServiceFail);

}

function requestMBServiceSuccess(e) {
    gprsResp = JSON.parse(e);
    console.log(gprsResp);
    if (gprsResp.respCode == '0'){
        var obj = (gprsResp.respJsonObj)[0];
        console.log(obj);
        document.getElementById('cus-profile-fullname').innerHTML = obj.FULL_NAME;
        document.getElementById('cus-profile-birthday').innerHTML = "";
        document.getElementById('cus-profile-userid').innerHTML = obj.MA_NGUOI_DUNG;
        document.getElementById('cus-profile-address').innerHTML = obj.DIA_CHI;
        document.getElementById('cus-profile-mobile').innerHTML = obj.SDT;
        document.getElementById('cus-profile-email').innerHTML = obj.EMAIL;
        document.getElementById('cus-profile-cif').innerHTML = gCustomerNo;
    } else {
        showAlertText(CONST_STR.get('UTILITIES_CHNG_PER_INFO_SERVICE_ERROR_MSG'));
    }

}

function requestMBServiceFail(e) {
}

//chuyen doi avartar nguoi dung
function requestChangeAvatar() {
    if(1 == 1){
        return;
    }
    var data = {};
    var listInfo = new Array();

    var tmpResult = document.getElementById('cus-profile-img-avatar');
    var tmpCanvas = tmpResult.getElementsByTagName('canvas')[0];
    var base64string = '';
    if (tmpCanvas) {
        base64string = tmpCanvas.toDataURL('image/jpeg');
    }
    var gprsCmd = new GprsCmdObj(1206, "", "", gUserInfo.lang, gUserInfo.sessionID, listInfo, encodeURIComponent(base64string));

    data = getDataFromGprsCmd(gprsCmd);

    requestMBService(data, true, 0, function(e) {
        gprsResp = parserJSON(e);
        if (gprsResp.respCode == '0'){
            gUserInfo.userAvatar = gprsResp.arguments[0];
            document.getElementById('avatar-btn-upload').style.display = 'none';
            document.getElementById('menu-profile-avatar').innerHTML = '<img width="25" height="25" style="margin-top:1px; margin-left:4px" src="' + gUserInfo.userAvatar + '" />';
            document.getElementById('menu-profile-avatar').style.backgroundColor = "transparent";
        }
    }, function() {
        logInfo('change avatar fail!');
    });
}

function fnChange(obj) {
    resultUserImg.innerHTML = '';

    var objTmp = document.getElementById("btnFile");
    if (obj.value.trim().length > 0) {
        objTmp.value = obj.value;
    } else {
        objTmp.value = '';
    }

}


function displayImage(file, options) {
    currentFile = file;
    if (!loadImage(
            file,
            replaceResults, {
                maxWidth: 600,
                maxHeight: 600,
                crop: true
            }
        )) {
        logInfo('Not support the URL or FileReader API');
    }
}

function replaceResults(img) {
    var content;

    if (!(img.src || img instanceof HTMLCanvasElement)) {
        logInfo('Loading image file failed');
    } else {

        var tmpMaxWidth = 300;
        var tmpRatio = img.height / img.width;
        var tmpMaxSize = tmpMaxWidth;

        scaledImage = loadImage.scale(
            img, // img or canvas element
            {
                maxWidth: tmpMaxWidth,
                canvas: true
            }
        );
        resultUserImg.innerHTML = ''; 
        canvasImg.width = tmpMaxWidth;
        canvasImg.height = tmpMaxWidth;
        ctxImg.drawImage(scaledImage, canvasImg.width / 2 - scaledImage.width / 2, canvasImg.height / 2 - scaledImage.width / 2);
        resultUserImg.appendChild(canvasImg);
        document.getElementById('btnFile').value = '';
        document.getElementById('avatar-btn-upload').style.display = '';
    }
}


function rotateImageIntroCus(inDegree) {
    angleRotate += inDegree;
    ctxImg.clearRect(0, 0, canvasImg.width, canvasImg.height);
    ctxImg.save();
    ctxImg.fillStyle = "#FFFFFF"; // blue
    logInfo("Canvas gap size: " + Math.abs(canvasImg.height - canvasImg.width) / 2);
    ctxImg.translate(canvasImg.width / 2, canvasImg.height / 2);
    ctxImg.rotate(angleRotate * Math.PI / 180);
    ctxImg.drawImage(scaledImage, -scaledImage.width / 2, -scaledImage.width / 2); 
}

function gotoSetUserInfo() {
    gCorp.rootView = currentPage;
    console.log('HieuBeo', gCorp.rootView);
    navCachedPages["corp/setup/system/changeUserInfo/set_user_info"] = null;
    navController.initWithRootView('corp/setup/system/changeUserInfo/set_user_info', true, 'xsl');
}
