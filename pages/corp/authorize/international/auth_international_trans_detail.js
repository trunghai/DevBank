/**
 * Created by HaiDT1 on 9/6/2016.
 */

function viewDidLoadSuccess() {
    initData();
}
function viewBackFromOther() {
    gCorp.isBack = true;
}
function initData() {
    angular.module('EbankApp').controller('auth_international_trans_detail', function ($scope, requestMBServiceCorp) {
        var array_date = [];
        $scope.inMoblie = (Environment.isMobile()) ? false : true;
        $scope.detailCheckList = gInternational.detail.checklistProfile;
        checklimitTimeTrans();

        gInternational.detail.TransType = CONST_STR.get('INTERNATIONAL_TRANS_TYPE_' + gInternational.detail.TRANSACTIONTYPE);
        gInternational.detail.TRANSFERMETHOD = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.detail.BENEFICIARYBANKMETHOD);
        gInternational.detail.INTERMEDIARYBANK = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.detail.METHOD);
        gInternational.detail.MethodCharge = CONST_STR.get('INTERNATIONAL_METHOD_CHARGE_' + gInternational.detail.CHARGEMETHOD);
        $scope.infoTrans = gInternational.detail;

        $scope.statusVN = {"ABH" : "Đã duyệt", "INT": "Chờ duyệt", "REJ": "Từ chối", "APT": "Duyệt một phần", "RBH": "Duyệt không thành công", "CAC": "Hủy giao dịch", "STH" : "Đang xử lý",
            "HBH" : "Hồ sơ đã được tiếp nhận", "REH" : "Hoàn chứng từ", "IBS" : "Chờ duyệt bổ sung chứng từ", "APS" : "Duyệt một phần BS chứng từ", "APS" : "Duyệt một phần BS chứng từ",
            "RES" : "Từ chối BS chứng từ", "RBS" : "Duyệt BS CTừ  không thành công", "SBS" : "Đang xử lý BS chứng từ", "RJS" : "TPBank từ chối BS chứng từ"};

        (gInternational.detail.MONEYTYPE != 'JPY') ? $scope.dosCurrency = 2 : $scope.dosCurrency = 0;
        (gInternational.detail.CHARGEMETHOD == 'BEN') ? $scope.dos = 2 : $scope.dos = 0;
        (gInternational.detail.CHARGEMETHOD == 'BEN') ? $scope.currencyType = gInternational.detail.MONEYTYPE : $scope.currencyType = 'VND';
        ($scope.infoTrans.BENEFICIARYSWIFTCODE == '' || $scope.infoTrans.BENEFICIARYSWIFTCODE == null) ? $scope.swifCode = false : $scope.swifCode = true;
        ($scope.infoTrans.BENEFICIARYBANKADDRESS == null || $scope.infoTrans.BENEFICIARYBANKADDRESS == '') ? $scope.addressBen = false : $scope.addressBen = true;

        if($scope.infoTrans.NAMTRANSACTIONTYPE == 'CS01'){
            ($scope.infoTrans.SWIFTCODE.length == 0) ? $scope.swifCode = false : $scope.swifCode = true;
            $scope.addressBen = false;

        }else if($scope.infoTrans.NAMTRANSACTIONTYPE == 'CS02'){
            $scope.swifCode = false;
            ($scope.infoTrans.BENEFICIARYADDRESS.length == 0) ? $scope.addressBen = false : $scope.addressBen = true;
        }

        if($scope.infoTrans.METHOD == 'IBN'){
            $scope.swiftCodeNHTG = false;
            $scope.NHTG = false;
            $scope.addressNHTG = false;
            $scope.nationBankNHTG = false;

        }else if($scope.infoTrans.METHOD == 'IBY'){
            $scope.nationBankNHTG = true;
            if($scope.infoTrans.BANKMETHOD == 'CSTG01'){
                ($scope.infoTrans.BANKSWIFTCODE.length == 0) ? $scope.swiftCodeNHTG = false : $scope.swiftCodeNHTG = true;
                $scope.NHTG = false;
                $scope.addressNHTG = false;

            }else if($scope.infoTrans.BANKMETHOD == 'CSTG02'){
                $scope.swiftCodeNHTG = false;
                ($scope.infoTrans.BANKNAME.length == 0) ? $scope.NHTG = false : $scope.NHTG = true;
                ($scope.infoTrans.BANKADDRESS.length == 0) ? $scope.addressNHTG = false : $scope.addressNHTG = true;
            }
        }

        refeshContentScroll();

        function checklimitTimeTrans () {

            var stringDate = gInternational.detail.CREATE_TIME.split(" ");
            var dateArray = stringDate[0].split("/");
            var timeArray = stringDate[1].split(":");

            var startDate = new Date();
            startDate.setDate(parseFloat(dateArray[0]));
            startDate.setMonth(parseFloat(dateArray[1]) - 1);
            startDate.setYear(parseFloat(dateArray[2]));
            startDate.setHours(parseFloat(timeArray[0]));
            startDate.setMinutes(parseFloat(timeArray[1]));
            startDate.setSeconds(parseFloat(timeArray[2]));

            startDate.setMinutes(startDate.getMinutes() + 120);
            var m2 = startDate.getHours();

            var stringDate = gInternational.detail.TIMESYSDATE.split(" ");
            var dateArray = stringDate[0].split("/");
            var timeArray = stringDate[1].split(":");

            var timeDate = new Date();
            timeDate.setDate(parseFloat(dateArray[0]));
            timeDate.setMonth(parseFloat(dateArray[1]) - 1);
            timeDate.setYear(parseFloat(dateArray[2]));
            timeDate.setHours(parseFloat(timeArray[0]));
            timeDate.setMinutes(parseFloat(timeArray[1]));
            timeDate.setSeconds(parseFloat(timeArray[2]));

            if(timeDate > startDate){
                showAlertText(CONST_STR.get('INTERNALTIONAL_MESS_CUFOFF'));
                $scope.checkTime = true;
            }else{
                $scope.checkTime = false;
            }

        }

        function cutOffTime() {
            var stringDate = gInternational.detail.TIMESYSDATE.split(" ");
            var dateArray = stringDate[0].split("/");
            var timeArray = stringDate[1].split(":");

            var timeDate = new Date();
            // timeDate.setDate(parseFloat(dateArray[0]));
            // timeDate.setMonth(parseFloat(dateArray[1]) - 1);
            // timeDate.setYear(parseFloat(dateArray[2]));
            timeDate.setHours(parseFloat(timeArray[0]));
            timeDate.setMinutes(parseFloat(timeArray[1]));
            timeDate.setSeconds(parseFloat(timeArray[2]));


            var date_open ;
            var date_close;
            //check hạn mức lần
            for (var i in gInternational.list_Limit){
                var objLimit = gInternational.list_Limit[i];
                if (gInternational.detail.MONEYTYPE == objLimit.CURRENCY){
                    var limit = objLimit;
                    date_open = limit.OPEN_DATE;
                    date_close = limit.CLOSE_DATE;
                    break;
                }else if(gInternational.detail.MONEYTYPE != objLimit.CURRENCY && i == gInternational.list_Limit.length - 1) {
                    showAlertText(CONST_STR.get("INTERNALTIONAL_ERR_CURRENCY_TRANSFER_NATION"));
                    return false;
                }
            }

            var open = date_open.split(":");
            var openTime = new Date();
            openTime.setHours(parseFloat(open[0]));
            openTime.setMinutes(parseFloat(open[1]));
            openTime.setSeconds(parseFloat(open[2]));

            var close = date_close.split(":");


            var closeTime = new Date();

            array_date = [date_open, date_close];
            var dTime = timeDate.getTime();
            var fTime = openTime.getTime();
            if (timeDate.getTime() < openTime.getTime()){
                showAlertText(formatString(CONST_STR.get('INTERNATIONAL_MESSAGE_LIMIT_TIME'),
                    array_date));
                return false;
            }else if (timeDate.getTime() > closeTime.getTime()){
                showAlertText(formatString(CONST_STR.get('INTERNATIONAL_MESSAGE_LIMIT_TIME'),
                    array_date));
                return false;
            }else {
                return true;
            }
        }

        function convertDateTo24Hour(date){
            var elem = date.split(' ');
            var stSplit = elem[1].split(":");// alert(stSplit);
            var stHour = stSplit[0];
            var stMin = stSplit[1];
            var stAmPm = elem[2];
            var newhr = 0;
            var ampm = '';
            var newtime = '';
            //alert("hour:"+stHour+"\nmin:"+stMin+"\nampm:"+stAmPm); //see current values

            if (stAmPm=='PM')
            {
                if (stHour!=12)
                {
                    stHour=stHour*1+12;
                }

            }else if(stAmPm=='AM' && stHour=='12'){
                stHour = stHour -12;
            }else{
                stHour=stHour;
            }

            return elem[0]+" "+stHour+':'+stMin;
        }

        $scope.onBackClick = function () {
            navCachedPages["corp/authorize/international/auth_international_trans"] = null;
            navController.popView(true);
        }
        
        $scope.updateStatusCancel = function () {

            gInternational.authen = 1;
            navCachedPages['corp/authorize/international/auth_international_trans_authen'] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_authen", true,'html');

        }

        $scope.onContinuteClick = function () {

            // //Check promocode
            // if(gInternational.detail.CHECKPROMOCODE == 'Y'){
            //     showAlertText(CONST_STR.get('INTERNATIONAL_PROMOCODE_ONE_USED'));
            //     return;
            // }

            if(!cutOffTime())return;

            //Check số dư khả dụng ngoại tệ
            if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_NGOAI_TE) < parseFloat(gInternational.detail.FOREGNAMOUNT)){
                showAlertText(CONST_STR.get('TOPUP_EXCEED_AVAIL_BALANCE'));
                return;
            }

            //check so du tk vnd
            if(gInternational.detail.IDSRCACCOUNT == gInternational.detail.CHARGEACCOUNT){
                if (gInternational.detail.CHARGEMETHOD == 'OUR'){
                    var charge = parseFloat(gInternational.detail.DEBITAMOUNT) + parseFloat(gInternational.detail.CHARGE) + parseFloat(gInternational.detail.ELECTRICCHARGE) + parseFloat(gInternational.detail.CHARGEOUT);
                    if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_VND) < charge){
                        showAlertText(CONST_STR.get('TOPUP_EXCEED_AVAIL_BALANCE'));
                        return;
                    }
                }else if(gInternational.detail.CHARGEMETHOD == 'SHA'){
                    var charge = parseFloat(gInternational.detail.DEBITAMOUNT) + parseFloat(gInternational.detail.CHARGE) + parseFloat(gInternational.detail.ELECTRICCHARGE);
                    if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_VND) < charge){
                        showAlertText(CONST_STR.get('TOPUP_EXCEED_AVAIL_BALANCE'));
                        return;
                    }
                }
            }else {
                if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_VND) < parseFloat(gInternational.detail.DEBITAMOUNT)){
                    showAlertText(CONST_STR.get('TOPUP_EXCEED_AVAIL_BALANCE'));
                    return;
                }

                if(gInternational.detail.CHARGEMETHOD == 'OUR'){
                    var charge = parseFloat(gInternational.detail.CHARGE) + parseFloat(gInternational.detail.ELECTRICCHARGE) + parseFloat(gInternational.detail.CHARGEOUT);
                    if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_TK_THU_PHI) < charge){
                        showAlertText(CONST_STR.get('INTERNATIONAL_TOPUP_EXCEED_AVAIL_BALANCE'));
                        return;
                    }
                }else if (gInternational.detail.CHARGEMETHOD == 'SHA'){
                    var charge = parseFloat(gInternational.detail.CHARGE) + parseFloat(gInternational.detail.ELECTRICCHARGE);
                    if (parseFloat(gInternational.detail.SO_DU_KHA_DUNG_TK_THU_PHI) < charge){
                        showAlertText(CONST_STR.get('INTERNATIONAL_TOPUP_EXCEED_AVAIL_BALANCE'));
                        return;
                    }
                }
            }

            //check hạn mức lần
            for (var i in gInternational.list_Limit){
                var objLimits = gInternational.list_Limit[i];
                if (gInternational.detail.MONEYTYPE == objLimits.CURRENCY){
                    var limit = objLimits;
                    if (parseFloat(removeSpecialChar(gInternational.detail.TRANSFERAMOUNT)) > parseFloat(limit.TIME_LIMITS)){
                        showAlertText(formatString(CONST_STR.get('INTERNATIONA_MSG_COM_LIMIT_EXCEEDED_TIME'), [formatNumberToCurrency(limit.TIME_LIMITS), gInternational.detail.MONEYTYPE]));
                        return false;
                    }else {
                        break;
                    }
                }
            }

            //Check hạn mức ngày
            var total_day = 0;
            for (var i in gInternational.limit_TotalDay){
                if (gInternational.detail.MONEYTYPE == gInternational.limit_TotalDay[i].CCY){
                    total_day = parseFloat(gInternational.limit_TotalDay[i].LIMIT_DAY);
                    break;
                }
            }

            for (var i in gInternational.list_Limit){
                var objLimits = gInternational.list_Limit[i];
                if (gInternational.detail.MONEYTYPE == objLimits.CURRENCY){
                    var limit = objLimits;
                    if (parseFloat(parseFloat(removeSpecialChar(gInternational.detail.TRANSFERAMOUNT)) + total_day) > parseFloat(limit.DAY_LIMITS)){
                        showAlertText(formatString(CONST_STR.get('INTERNATIONA_MSG_COM_LIMIT_EXCEEDED_DAY'), [formatNumberToCurrency(limit.DAY_LIMITS), gInternational.detail.MONEYTYPE]));
                        return false;
                    }else {
                        break;
                    }
                }
            }


            gInternational.authen = "3";
            navCachedPages['corp/authorize/international/auth_international_trans_authen'] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_authen", true,'html');
        }
        
        $scope.onDenyClick = function () {
            var reason = document.getElementById("id.reason-rej").value;
            if (!reason) {
                showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
                return;
            }
            
            gInternational.authen = 2;
            gInternational.reason = document.getElementById('id.reason-rej').value;
            navCachedPages['corp/authorize/international/auth_international_trans_authen'] = null;
            navController.pushToView("corp/authorize/international/auth_international_trans_authen", true,'html');
        }

        $scope.onViewPDF = function (e, namefile) {
            var jsonData = new Object();
            jsonData.sequence_id = "6";
            jsonData.idtxn = 'B65';
            jsonData.idFile = e;
            jsonData.nameFile = namefile;
            var args = new Array();
            args.push(null);
            args.push(jsonData);
            var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_AUTHORIZE_PAYMNET_INTERNATIONAL"), "", "", gUserInfo.lang, gUserInfo.sessionID, args);
            var data = getDataFromGprsCmd(gprsCmd);
            requestMBServiceCorp.post(data, true, function (response) {
                if (response.respCode == '0'){
                    // var html = '<embed width="100%" height="640"'
                    //     + ' type="application/pdf"'
                    //     + ' src="'
                    //     + response.respJsonObj.url
                    //     + '"></embed>';
                    //
                    // document.getElementById('contentView').innerHTML = html;
                    // var modal = document.getElementById('myModal');
                    // modal.style.display = "block";
                    // window.onclick = function(event) {
                    //     if (event.target == modal) {
                    //         modal.style.display = "none";
                    //     }
                    // }
                    if (Environment.isMobile()){
                        window.open(response.respJsonObj.url, "", "fullscreen=yes");
                    }else {
                        var widthScreen = (window.innerWidth-800)/2;
                        var heightScreen = (window.innerHeight-800)/2;

                        var string = "width=800,height=800,top=" + heightScreen + ",left=" + widthScreen;
                        window.open(response.respJsonObj.url, "", string);
                    }
                }else {
                    showAlertText(response.respContent);
                }
            });
        }

        function dateString2Date(dateString) {
            var dt  = dateString.split(/\-|\s/);
            return new Date(dt.slice(0,3).reverse().join('/') + ' ' + dt[3]);
        }
    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}

function controlInputText(field, maxlen, enableUnicode) {
    if (maxlen != undefined && maxlen != null) {
        textLimit(field, maxlen);
    }
    if (enableUnicode == undefined || !enableUnicode) {
        field.value = removeAccent(field.value);
        field.value = field.value.replace(/[\[\]\,!"#$%&*'\+\-:;<=>?\\`^~{|}]/g, '');
    }
}