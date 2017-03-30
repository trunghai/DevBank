/**
 * Update: HungNV
 * Date: 03/10/2015
 */
var objJSON = {};
var bankArray;
var bankResultArray = null;

var dataBank = {
    "responseType": "1604",
    "respCode": "0",
    "respContent": "Giao dịch thành công. Cảm ơn Quý khách đã giao dịch với TPBank!",
    "respRaw": "",
    "arguments": [],
    "respJson": "",
    "respJsonObj": {
        "banklist": [
            {
                "CODE": "201",
                "SHORT_NAME": "Vietinbank",
                "NAME_VN": "Ngân hàng công thương Việt Nam",
                "NAME_EN": "Vietnam Joint Stock Commercial Bank for Industry and Trade"
            },
            {
                "CODE": "203",
                "SHORT_NAME": "Vietcombank",
                "NAME_VN": "Ngân hàng TMCP Ngoại Thương",
                "NAME_EN": "Joint Stock Commercial Bank for Foreign Trade of Vietnam"
            },
            {
                "CODE": "311",
                "SHORT_NAME": "MB",
                "NAME_VN": "Ngân hàng Quân Đội",
                "NAME_EN": "Military Commercial Joint stock Bank"
            },
            {
                "CODE": "353",
                "SHORT_NAME": "Kienlongbank",
                "NAME_VN": "Ngân hàng Kiên Long",
                "NAME_EN": "Kien Long Commercial Joint Stock Bank"
            },
            {
                "CODE": "902",
                "SHORT_NAME": "QTDCS",
                "NAME_VN": "Quỹ tín dụng cơ sở",
                "NAME_EN": "Quy tin dung co so"
            },
            {
                "CODE": "609",
                "SHORT_NAME": "Maybank",
                "NAME_VN": "Malayan Banking Berhad",
                "NAME_EN": "Maybank"
            },
            {
                "CODE": "617",
                "SHORT_NAME": "HSBC",
                "NAME_VN": "NH TNHH Một Thành Viên HSBC Việt Nam",
                "NAME_EN": "The HongKong and Shanghai Banking Corporation"
            },
            {
                "CODE": "625",
                "SHORT_NAME": "OCBC",
                "NAME_VN": "Oversea - Chinese Bank",
                "NAME_EN": "Oversea - Chinese Banking Corporation"
            },
            {
                "CODE": "630",
                "SHORT_NAME": "FCNB",
                "NAME_VN": "First Commercial Bank",
                "NAME_EN": "First Commercial Bank"
            },
            {
                "CODE": "635",
                "SHORT_NAME": "MBB",
                "NAME_VN": "Malayan Banking Berhad",
                "NAME_EN": "Malayan Banking Berhad"
            },
            {
                "CODE": "650",
                "SHORT_NAME": "DBS",
                "NAME_VN": "DBS Bank Ltd",
                "NAME_EN": "DBS Bank Ltd"
            },
            {
                "CODE": "304",
                "SHORT_NAME": "DongA Bank",
                "NAME_VN": "Ngân hàng Đông Á",
                "NAME_EN": "Dong A Commercial Joint stock Bank"
            },
            {
                "CODE": "333",
                "SHORT_NAME": "OCB",
                "NAME_VN": "Ngân hàng Phương Đông",
                "NAME_EN": "Orient Commercial Joint Stock Bank"
            },
            {
                "CODE": "501",
                "SHORT_NAME": "VID public",
                "NAME_VN": "Ngân hàng VID Public",
                "NAME_EN": "VID public"
            },
            {
                "CODE": "611",
                "SHORT_NAME": "CCBC",
                "NAME_VN": "China Construction Bank Corporation",
                "NAME_EN": "China Construction Bank Corporation"
            },
            {
                "CODE": "626",
                "SHORT_NAME": "KEB",
                "NAME_VN": "Korea Exchange Bank",
                "NAME_EN": "Korea Exchange Bank"
            },
            {
                "CODE": "636",
                "SHORT_NAME": "SMBC",
                "NAME_VN": "Sumitomo Mitsui Banking Corporation HCM",
                "NAME_EN": "Sumitomo Mitsui Banking Corporation HCMC"
            },
            {
                "CODE": "637",
                "SHORT_NAME": "WHHCM",
                "NAME_VN": "NH Woori HCM",
                "NAME_EN": "Woori BANK HCMC"
            },
            {
                "CODE": "645",
                "SHORT_NAME": "HSBC HN",
                "NAME_VN": "Ngân hàng The Hongkong và Thượng Hải",
                "NAME_EN": "NH The Hongkong and Shanghai"
            },
            {
                "CODE": "649",
                "SHORT_NAME": "ICB",
                "NAME_VN": "ICB of China CN Ha Noi",
                "NAME_EN": "ICB of China CN Ha Noi"
            },
            {
                "CODE": "204",
                "SHORT_NAME": "VBARD",
                "NAME_VN": "Ngân hàng NN & PTNT VN",
                "NAME_EN": "Vienam Bank for Agriculture and Rural Development "
            },
            {
                "CODE": "303",
                "SHORT_NAME": "Sacombank",
                "NAME_VN": "Ngân hàng Sài Gòn Thương Tín",
                "NAME_EN": "Saigon Thuong Tin Commercial Joint Stock Bank"
            },
            {
                "CODE": "315",
                "SHORT_NAME": "Vung Tau",
                "NAME_VN": "Ngân hàng Vũng Tàu",
                "NAME_EN": "Ngan hang Vung Tau"
            },
            {
                "CODE": "359",
                "SHORT_NAME": "Baoviet Bank",
                "NAME_VN": "Ngân hàng TMCP Bảo Việt",
                "NAME_EN": "Baoviet Joint Stock Commercial Bank"
            },
            {
                "CODE": "651",
                "SHORT_NAME": "TFCBTPHCM",
                "NAME_VN": "Taipei Fubon Commercial Bank TP Ho Chi Minh",
                "NAME_EN": "Taipei Fubon Commercial Bank TP Ho Chi Minh"
            },
            {
                "CODE": "602",
                "SHORT_NAME": "ANZ",
                "NAME_VN": "Ngân hàng ANZ Việt Nam",
                "NAME_EN": "ANZ Bank"
            },
            {
                "CODE": "603",
                "SHORT_NAME": "HLO",
                "NAME_VN": "Ngân hàng Hong Leong Viet Nam",
                "NAME_EN": "Hong Leong Bank Viet Nam"
            },
            {
                "CODE": "615",
                "SHORT_NAME": "BOC",
                "NAME_VN": "Bank of Communications",
                "NAME_EN": "Bank of Communications"
            },
            {
                "CODE": "616",
                "SHORT_NAME": "Shinhan Bank",
                "NAME_VN": "Ngân hàng TNHH MTV Shinhan Việt Nam",
                "NAME_EN": "Shinhan Bank"
            },
            {
                "CODE": "618",
                "SHORT_NAME": "UOB",
                "NAME_VN": "United Oversea Bank",
                "NAME_EN": "United Oversea Bank"
            },
            {
                "CODE": "620",
                "SHORT_NAME": "BC",
                "NAME_VN": "BANK OF CHINA",
                "NAME_EN": "BANK OF CHINA"
            },
            {
                "CODE": "634",
                "SHORT_NAME": "CTU",
                "NAME_VN": "Ngân hàng Cathay",
                "NAME_EN": "Cathay United Bank"
            },
            {
                "CODE": "639",
                "SHORT_NAME": "MCB_HCM",
                "NAME_VN": "Mizuho Corporate Bank - TP HCM",
                "NAME_EN": "Mizuho Corporate Bank - TP HCM"
            },
            {
                "CODE": "642",
                "SHORT_NAME": "TFCBHN",
                "NAME_VN": "Taipei Fubon Commercial Bank Ha Noi",
                "NAME_EN": "Taipei Fubon Commercial Bank Ha Noi"
            },
            {
                "CODE": "646",
                "SHORT_NAME": "SCBank HN",
                "NAME_VN": "Ngân hàng Standard Chartered Bank HN",
                "NAME_EN": "Standard Chartered Bank HN"
            },
            {
                "CODE": "202",
                "SHORT_NAME": "BIDV",
                "NAME_VN": "Ngân hàng Đầu tư và Phát triển Việt Nam",
                "NAME_EN": "Bank for Investment and Development of Vietnam"
            },
            {
                "CODE": "302",
                "SHORT_NAME": "MSB",
                "NAME_VN": "Ngân hàng Hàng Hải Việt Nam",
                "NAME_EN": "Maritime Bank"
            },
            {
                "CODE": "308",
                "SHORT_NAME": "Saigonbank",
                "NAME_VN": "Ngân hàng Sài Gòn Công Thương",
                "NAME_EN": "Saigon Bank for Industry and Trade"
            },
            {
                "CODE": "310",
                "SHORT_NAME": "Techcombank",
                "NAME_VN": "Ngân hàng Kỹ thương Việt Nam",
                "NAME_EN": "Việt Nam Technological and Commercial Joint stock Bank"
            },
            {
                "CODE": "341",
                "SHORT_NAME": "PG Bank",
                "NAME_VN": "Ngân hàng Xăng dầu Petrolimex",
                "NAME_EN": "Petrolimex group commercial Joint stock Bank"
            },
            {
                "CODE": "657",
                "SHORT_NAME": "BNP Paribas HN",
                "NAME_VN": "Ngan hang BNP Paribas CN Ha Noi",
                "NAME_EN": "BNP Paribas Ha Noi"
            },
            {
                "CODE": "701",
                "SHORT_NAME": "KBNN",
                "NAME_VN": "Kho Bạc Nhà Nước",
                "NAME_EN": "Kho Bac Nha Nuoc"
            },
            {
                "CODE": "604",
                "SHORT_NAME": "SCBank",
                "NAME_VN": "Ngân hàng Standard Chartered Bank Việt Nam",
                "NAME_EN": "Standard Chartered Bank"
            },
            {
                "CODE": "606",
                "SHORT_NAME": "SCSB",
                "NAME_VN": "The Shanghai Commercial & Savings Bank CN Đồng Nai",
                "NAME_EN": "The Shanghai Commercial & Savings Bank CN Dong Nai"
            },
            {
                "CODE": "623",
                "SHORT_NAME": "MICB",
                "NAME_VN": "Mega ICBC Bank",
                "NAME_EN": "Mega ICBC Bank"
            },
            {
                "CODE": "627",
                "SHORT_NAME": "CHASE",
                "NAME_VN": "The Chase Manhattan Bank",
                "NAME_EN": "The Chase Manhattan Bank"
            },
            {
                "CODE": "641",
                "SHORT_NAME": "IBK",
                "NAME_VN": "Industrial Bank of Korea ",
                "NAME_EN": "Industrial Bank of Korea "
            },
            {
                "CODE": "643",
                "SHORT_NAME": "CBA",
                "NAME_VN": "Commonwealth Bank of Australia",
                "NAME_EN": "Commonwealth Bank of Australia"
            },
            {
                "CODE": "644",
                "SHORT_NAME": "ANZ HN",
                "NAME_VN": "Australia and New Zealand Banking(ANZ)",
                "NAME_EN": "Australia and New Zealand Banking(ANZ)"
            },
            {
                "CODE": "648",
                "SHORT_NAME": "BIDC HCM",
                "NAME_VN": "NH ĐT&PT Campuchia CN HCM",
                "NAME_EN": "Bank for investment and development of Cambodia HCMC"
            },
            {
                "CODE": "208",
                "SHORT_NAME": "VDB",
                "NAME_VN": "Ngân hàng Phát triển Việt Nam",
                "NAME_EN": "Vietnam Development Bank"
            },
            {
                "CODE": "306",
                "SHORT_NAME": "Nam A Bank",
                "NAME_VN": "Ngân hàng Nam Á",
                "NAME_EN": "Nam A Commercial Joint stock Bank"
            },
            {
                "CODE": "309",
                "SHORT_NAME": "VPBank",
                "NAME_VN": "Ngân hàng Thương mại cổ phần Việt Nam Thịnh Vượng",
                "NAME_EN": "VietNam prosperity Joint stock commercial Bank"
            },
            {
                "CODE": "313",
                "SHORT_NAME": "NASB",
                "NAME_VN": "Ngân hàng Bắc Á",
                "NAME_EN": "North Asia Commercial Joint Stock Bank"
            },
            {
                "CODE": "317",
                "SHORT_NAME": "SeABank",
                "NAME_VN": "Ngân hàng TMCP Đông Nam Á",
                "NAME_EN": "South East Asia Commercial Joint stock  Bank"
            },
            {
                "CODE": "339",
                "SHORT_NAME": "VNCB",
                "NAME_VN": "NH TMCP Xây dựng Việt Nam",
                "NAME_EN": "Vietnam Construction Bank"
            },
            {
                "CODE": "352",
                "SHORT_NAME": "NCB",
                "NAME_VN": "Ngân hàng Quoc Dan",
                "NAME_EN": "National Citizen Bank"
            },
            {
                "CODE": "605",
                "SHORT_NAME": "CitibankHN",
                "NAME_VN": "Citi Bank Ha Noi",
                "NAME_EN": "Citibank Ha Noi"
            },
            {
                "CODE": "207",
                "SHORT_NAME": "VBSP",
                "NAME_VN": "Ngân hàng Chính sách xã hội Việt Nam",
                "NAME_EN": "Vietnam Bank for Social Policies"
            },
            {
                "CODE": "319",
                "SHORT_NAME": "Ocean Bank",
                "NAME_VN": "Ngân hàng Đại Dương",
                "NAME_EN": "Ocean Bank"
            },
            {
                "CODE": "334",
                "SHORT_NAME": "SCB",
                "NAME_VN": "Ngân hàng TMCP Sài Gòn",
                "NAME_EN": "Saigon Commercial Joint Stock Bank"
            },
            {
                "CODE": "327",
                "SHORT_NAME": "VietCapital Bank",
                "NAME_VN": "NHTMCP Bản Việt",
                "NAME_EN": "BanViet Commercial Jont stock Bank"
            },
            {
                "CODE": "401",
                "SHORT_NAME": "Banknetvn",
                "NAME_VN": "Công ty cổ phần chuyển mạch tài chính quốc gia Việt Nam",
                "NAME_EN": "VietNam national Financial switching Joint Stock Company"
            },
            {
                "CODE": "502",
                "SHORT_NAME": "IVB",
                "NAME_VN": "Indovina Bank",
                "NAME_EN": "Indovina Bank"
            },
            {
                "CODE": "601",
                "SHORT_NAME": "BPCEICOM",
                "NAME_VN": "Ngân hàng BPCEIOM CN  TP Hồ Chí Minh",
                "NAME_EN": "NH BPCEIOM HCMC"
            },
            {
                "CODE": "614",
                "SHORT_NAME": "BNP Paribas HCM",
                "NAME_VN": "BNP Paribas Bank HCM",
                "NAME_EN": "Bank of Paris and the Netherlands HCMC"
            },
            {
                "CODE": "619",
                "SHORT_NAME": "DB",
                "NAME_VN": "DEUTSCHE BANK",
                "NAME_EN": "DEUTSCHE BANK"
            },
            {
                "CODE": "622",
                "SHORT_NAME": "BTMU HCM",
                "NAME_VN": "BANK OF TOKYO - MITSUBISHI UFJ",
                "NAME_EN": "BANK OF TOKYO - MITSUBISHI UFJ"
            },
            {
                "CODE": "631",
                "SHORT_NAME": "KMB",
                "NAME_VN": "Ngân hàng Kookmin",
                "NAME_EN": "Kookmin Bank"
            },
            {
                "CODE": "101",
                "SHORT_NAME": "SBV",
                "NAME_VN": "Ngân Hàng Nhà Nước",
                "NAME_EN": "State Bank of Vietnam"
            },
            {
                "CODE": "305",
                "SHORT_NAME": "Eximbank",
                "NAME_VN": "Ngân hàng Xuất nhập khẩu Việt Nam",
                "NAME_EN": "Vietnam Export Import Commercial Joint Stock Bank"
            },
            {
                "CODE": "307",
                "SHORT_NAME": "ACB",
                "NAME_VN": "Ngân hàng Á Châu",
                "NAME_EN": "Asia Commercial Bank"
            },
            {
                "CODE": "314",
                "SHORT_NAME": "VIB",
                "NAME_VN": "Ngân hàng Quốc tế",
                "NAME_EN": "Vietnam International Commercial Joint Stock Bank"
            },
            {
                "CODE": "320",
                "SHORT_NAME": "GP Bank",
                "NAME_VN": "Ngân hàng Dầu khí Toàn cầu",
                "NAME_EN": "Global Petro Commercial Joint Stock Bank"
            },
            {
                "CODE": "348",
                "SHORT_NAME": "SHB",
                "NAME_VN": "Ngân hàng Sài Gòn - Hà Nội",
                "NAME_EN": "Saigon - Hanoi Commercial Joint Stock Bank"
            },
            {
                "CODE": "355",
                "SHORT_NAME": "VietA Bank",
                "NAME_VN": "Ngân hàng Việt Á",
                "NAME_EN": "Viet A Commercial Joint Stock Bank"
            },
            {
                "CODE": "356",
                "SHORT_NAME": "Vietbank",
                "NAME_VN": "Ngân hàng Việt Nam Thương Tín",
                "NAME_EN": "Vietnam Thương tin Commercial Joint Stock Bank"
            },
            {
                "CODE": "357",
                "SHORT_NAME": "LPB",
                "NAME_VN": "Ngan hàng TMCP Bưu điện Liên Việt",
                "NAME_EN": "Lien Viet Post Bank"
            },
            {
                "CODE": "321",
                "SHORT_NAME": "HDBank",
                "NAME_VN": "Ngân hàng Phát triển TP HCM",
                "NAME_EN": "Housing Development Bank"
            },
            {
                "CODE": "323",
                "SHORT_NAME": "ABBank",
                "NAME_VN": "Ngân hàng An Bình",
                "NAME_EN": "An Binh Commercial Joint stock  Bank"
            },
            {
                "CODE": "360",
                "SHORT_NAME": "PVcombank",
                "NAME_VN": "NH TMCP Đại Chúng Viet Nam",
                "NAME_EN": "PVcombank"
            },
            {
                "CODE": "654",
                "SHORT_NAME": "CitibankHCM",
                "NAME_VN": "Citi Bank TP HCM",
                "NAME_EN": "CitiBank HCM"
            },
            {
                "CODE": "504",
                "SHORT_NAME": "Vinasiam Bank",
                "NAME_VN": "Ngân hàng Liên doanh Việt Thái",
                "NAME_EN": "Vinasiam Bank"
            },
            {
                "CODE": "613",
                "SHORT_NAME": "Mizuho Bank",
                "NAME_VN": "Mizuho Corporate Bank",
                "NAME_EN": "Mizuho Bank"
            },
            {
                "CODE": "624",
                "SHORT_NAME": "WHHN",
                "NAME_VN": "WOORI BANK Hà Nội",
                "NAME_EN": "WOORI BANK Hanoi"
            },
            {
                "CODE": "629",
                "SHORT_NAME": "CTBC",
                "NAME_VN": "Ngân hàng CTBC CN TP Hồ Chí Minh",
                "NAME_EN": "The ChinaTrust Commercial Bank HCMC"
            },
            {
                "CODE": "638",
                "SHORT_NAME": "BIDC HN",
                "NAME_VN": "NH ĐT&PT Campuchia CN Hà Nội",
                "NAME_EN": "Bank for investment and development of Cambodia HN"
            },
            {
                "CODE": "640",
                "SHORT_NAME": "HNCB",
                "NAME_VN": "Hua Nan Commercial Bank",
                "NAME_EN": "Hua Nan Commercial Bank"
            },
            {
                "CODE": "936",
                "SHORT_NAME": "SMBC HN",
                "NAME_VN": "Sumitomo Mitsui Banking Corporation HN",
                "NAME_EN": "Sumitomo Mitsui Banking Corporation HN"
            },
            {
                "CODE": "324",
                "SHORT_NAME": "Viet Hoa Bank",
                "NAME_VN": "Ngân hàng Việt Hoa",
                "NAME_EN": "Ngan hang Viet Hoa"
            },
            {
                "CODE": "901",
                "SHORT_NAME": "COOPBANK",
                "NAME_VN": "Ngân hàng Hợp tác Việt Nam",
                "NAME_EN": "Co-Operation Bank of Viet Nam"
            },
            {
                "CODE": "505",
                "SHORT_NAME": "VRB",
                "NAME_VN": "Ngân hàng Liên doanh Việt Nga",
                "NAME_EN": "Vietnam - Russia Bank"
            },
            {
                "CODE": "608",
                "SHORT_NAME": "FCNB HN",
                "NAME_VN": "First Commercial Bank Ha Noi",
                "NAME_EN": "First Commercial Bank Ha Noi"
            },
            {
                "CODE": "612",
                "SHORT_NAME": "BANGKOK  BANK",
                "NAME_VN": "BANGKOK  BANK",
                "NAME_EN": "BANGKOK  BANK"
            },
            {
                "CODE": "621",
                "SHORT_NAME": "CACIB",
                "NAME_VN": "Credit Agricole Corporate and Investment Bank",
                "NAME_EN": "Credit Agricole Corporate and Investment Bank"
            },
            {
                "CODE": "632",
                "SHORT_NAME": "SPB",
                "NAME_VN": "Ngân hàng SinoPac",
                "NAME_EN": "SinoPac Bank"
            },
            {
                "CODE": "653",
                "SHORT_NAME": "BTMU HN",
                "NAME_VN": "BANK OF TOKYO - MITSUBISHI UFJ - HN",
                "NAME_EN": "BANK OF TOKYO - MITSUBISHI UFJ - HN"
            }
        ],
        "initData": [
            {
                "CUST_AC_NO": "98888888004",
                "SENDMETHOD": "1",
                "BALANCE": "2901143806",
                "AC_STAT_NO_DR": "N",
                "AC_STAT_NO_CR": "N"
            },
            {
                "CUST_AC_NO": "98888888001",
                "SENDMETHOD": "1",
                "BALANCE": "100019620370",
                "AC_STAT_NO_DR": "N",
                "AC_STAT_NO_CR": "N"
            }
        ]
    }
}

getBankList();

function getBankList() {
    var nodeHistory = document.getElementById('divListGroup');
    nodeHistory.innerHTML = '';
    var tmpInputValue = document.getElementById('input.id.inputvalue');
    tmpInputValue.value = '';

    var data = {};
    var l_obj = new Object();
    l_obj.sequenceId = "1";
    l_obj.idtxn = "T03";
    var l_json = JSON.stringify(l_obj);
    var l_arrayArgs = new Array();

    l_arrayArgs.push("1");
    l_arrayArgs.push(l_json);

    var gprsCmd = new GprsCmdObj(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS"), "", "", gUserInfo.lang, gUserInfo.sessionID, l_arrayArgs);

    data = getDataFromGprsCmd(gprsCmd);
    // requestMBServiceCorp(data, true, 0, requestMBServiceHistorySuccess, requestMBServiceHistoryFail);
    objJSON = dataBank.respJsonObj.banklist;
    genBankListView();
    searchBankName();
}

function goBack() {
    navController.popView(true);
}

//event listener: http request success
function requestMBServiceHistorySuccess(e) {
    gprsResp = JSON.parse(e);
    setRespObjStore(gprsResp);
    objJSON = gprsResp.respJsonObj;

    if ((gprsResp.respCode == '0') && (parseInt(gprsResp.responseType) == parseInt(CONSTANTS.get("CMD_CO_DTI_TRANSFER_BANK_PROCESS")))) {
        //bankResultArray = JSON.parse(getRespObjStore());
        genBankListView();
        searchBankName();
    } else {
        genBankListFail();
    }

};

//event listener: http request fail
function requestMBServiceHistoryFail() {
    logInfo("-> requestMBServiceHistoryFail \n");
    genBankListFail();
};


function searchBankName() {
    var arrBank = new Array();
    if (objJSON.length > 0) {
        for (var i = 0; i < objJSON.length; i++) {
            var strX = objJSON[i].CODE + "#" + objJSON[i].SHORT_NAME + "#" + objJSON[i].NAME_VN + "#" + objJSON[i].NAME_EN;
            arrBank.push(strX);
        }
    }
    searchWhenInputAtIDWithArrayString('input.id.inputvalue', arrBank);
    var tmpNodeInputValue = document.getElementById('input.id.inputvalue');
    tmpNodeInputValue.addEventListener('evtSearchResultDone', handleSearchResultWhenInput, false);

    function handleSearchResultWhenInput(e) {
        logInfo(e.searchResult);
        bankResultArray = e.searchResult;
        bankResultArray = arrtoJson(bankResultArray);
        genBankListView();
    }

}


function genBankListView() {
    logInfo("-> genBankListView \n");
    var screenWidth = window.innerWidth || document.body.clientWidth;
    var textLength = Math.round(screenWidth * 0.8);

    var nodeHistory = document.getElementById('divListGroup');
    if ((bankResultArray != null) || (bankResultArray != undefined)) {
      if ((bankResultArray.rows != null) || (bankResultArray.rows != undefined)) {
            objJSON = bankResultArray;
        } else {
            //objJSON = {};
            objJSON = bankResultArray;
        }
    }
    htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BANKS_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBankList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    var htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans'>";

    if ((objJSON == null) || (objJSON == undefined)) {
        htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" +
            "<td colspan='2' class='td-textnobg'>" +
            CONST_STR.get('ERR_GET_INPUT_HISTORY_NO_DATA') +
            "</td></tr>";
    } else {
        for (var i = 0; i < objJSON.length; i++) {

            htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left'>" +
                "<a><u>" + objJSON[i].SHORT_NAME + "</u></a>" +
                "</td></tr>";

            if (gUserInfo.lang == 'EN') {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    objJSON[i].NAME_EN +
                    "</div></td></tr>";
            } else {
                htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default' onClick='getBankAtIndex(" + i + ")'><td class='td-left-detail'><div class='divsubtitle' style='width:" + textLength + "px;'>" +
                    objJSON[i].NAME_VN +
                    "</div></td></tr>";
            }

        }
    }

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

function genBankListFail() {
    logInfo("-> genBankListFail \n");
    var nodeHistory = document.getElementById('divListGroup');

    var htmlReviewInfo = "<table width='100%' align='center'>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><td><h5 align='left' style='font-weight:bold; margin-left:3%'>" +
        CONST_STR.get('TRANS_BANKS_LIST') +
        "</h5></td>" +
        "<td><div class='div-btn-round-container'>" +
        /*"<input type='button' class='btnshadow btn-primary btn-round-20' onClick='getBankList()' id='input.btn.reloadHistory' value='R'/>" + */
        "<div class='icon-spinner btnshadow btn-primary btn-round-15' onClick='getBankList()' id='input.btn.reloadHistory'></div>" +
        "</div></td></tr>" +
        "<tr><td colspan='2'><div class='line-separate'></div></td></tr>";

    htmlReviewInfo = htmlReviewInfo +
        "<tr><table width='100%' align='center' class='background-blacktrans' style='background-color: rgba(210, 225, 244, 0.4);'>";
    htmlReviewInfo = htmlReviewInfo + "<tr class='trow-default'>" +
        "<td colspan='2' class='td-textnobg'>" +
        CONST_STR.get('ERR_GET_INPUT_HISTORY_FAIL') +
        "</td></tr>";


    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    htmlReviewInfo = htmlReviewInfo + "</table></tr>";

    nodeHistory.innerHTML = htmlReviewInfo;
}

/*
Get bank at index
*/

function getBankAtIndex(inIdx) {
    logInfo("-> getBankAtIndex \n");
    logInfo('Selected bank at index: ' + inIdx);
    gBankInfoSelected = objJSON[inIdx].CODE + "#" + objJSON[inIdx].SHORT_NAME + "#" + objJSON[inIdx].NAME_VN + "#" + objJSON[inIdx].NAME_EN; //save bank info raw data
    navController.pushToView("corp/transfer/domestic/trans-dti-list-city", true);
}


function arrtoJson(arr) {

    var pluginArrayArg = new Array();
    for (var i = 0; i < arr.length; i++) {
        var tmpStr = arr[i];
        var tmpArr = tmpStr.split('#');
        var jsonArg = new Object();
        jsonArg.CODE = tmpArr[0];
        jsonArg.SHORT_NAME = tmpArr[1];
        jsonArg.NAME_VN = tmpArr[2];
        jsonArg.NAME_EN = tmpArr[3];
        pluginArrayArg.push(jsonArg);
    }

    var jsonArray = JSON.parse(JSON.stringify(pluginArrayArg));
    return (jsonArray);
}
