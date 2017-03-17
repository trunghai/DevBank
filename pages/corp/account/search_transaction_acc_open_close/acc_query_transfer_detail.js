var reloadPageFlag;

var strXml = "";
/*** HEADER ***/
var gprsResp = new GprsRespObj("","","","");

/*** INIT VIEW ***/
function loadInitXML() {
	var tmpXml = getReviewXmlStore();
	if (strXml == '' || strXml == undefined){
		strXml = XMLToString(tmpXml);
	}
	
	return tmpXml;
}

function goBack() {
	navController.popView(true);
	navCachedPages["corp/account/search_transaction_acc_open_close/acc_query_transfer_detail"] = null;
}

function cancelTransaction() {
	var obj = gAccount.objTransaction;
	var docXml = createXMLDoc();
    var rootNode = createXMLNode('review', '', docXml);

    //mo so tiet kiemn
    if (obj.IDTXN == "A13") {
        var rate, valueRate = "";
        var tmpArrRate = (gUserInfo.lang == 'EN') ?  CONST_ACCOUNT_QUERY_RATE_MONTH_EN: CONST_ACCOUNT_QUERY_RATE_MONTH_VN;
        for (var i = 0; i < tmpArrRate.length; i++) {
            if (obj.DURNAME == tmpArrRate[i]) {
                rate = tmpArrRate[i];
                break;
            }
        }
        if (rate == undefined) {
        }
        else{
            valueRate = rate + "/năm";
        }

        var dueType = obj.DUETYPE; //lua chon 1, 2 ha 3
        var destAccount = obj.TXTDESTACCT;
        var announce;
        if (dueType == 1) {

            //chuyen goc va lai sang ki han moi
            announce = CONST_STR.get("COM_INTEREST_MOVING_INTO_NEW_TERM");
        } else if (dueType == 2) {

            //chuyen goc sang ki han moi, lai chuyen v
            announce = CONST_STR.get("ACC_MOVING_TERM_ROOT") + " "+ destAccount;
        } else if (dueType == 3) {
            announce = CONST_STR.get("ACC_FINALIZE_OF_PRINCIPAL") + " " + destAccount;
        }
      
        var listValueAccount = [
            [CONST_STR.get("COM_TYPE_TRANSACTION"), CONST_STR.get("ACC_SEND_MONEY_ONLINE")], //loai giao dich
            [CONST_STR.get("COM_ACCOUNT_DEDUCT_MONEY"), obj.IDSRCACCT], //tai khoan trich tien
            [CONST_STR.get("CRE_DEBT_SURPLUS_AVAILABEL"), 
            formatNumberToCurrencyWithSymbol(obj.NUM_BALANCE, " " + obj.CODTRNCURR)], //so du kha dung
            [CONST_STR.get("E_ACCOUNT_BALANCE_DEDUCT_MONEY"), formatNumberToCurrencyWithSymbol(
            removeSpecialChar(obj.NUM_BALANCE) - removeSpecialChar(obj.NUMAMOUNT), " " + obj.CODTRNCURR)] //so du sau khi trich tien
        ];
        var listValueTransaction = [
            [CONST_STR.get("COM_NUM_MONEY_SAVING"), formatNumberToCurrencyWithSymbol(obj.NUMAMOUNT, " " + obj.CODTRNCURR)],
            [CONST_STR.get("COM_PERIOD"), obj.DURNAME], //ki han gui
            [CONST_STR.get("ACCOUNT_PERIOD_DATESTART"), obj.DATE_SEND], //ngay gui
            [CONST_STR.get("COM_EXPIRE_DATE"), obj.DATE_END], //ngay dao han
            [CONST_STR.get("COM_INTEREST"), obj.RATE + "%/năm"], //
            [CONST_STR.get("ACC_PROFITS_INTERIM"), formatNumberToCurrencyWithSymbol(obj.PROVISIONAL_RATES, " " + obj.CODTRNCURR)], //lai tam tinh
            [CONST_STR.get("COM_ANNOUNCE_DEADLINE"), announce],
            [CONST_STR.get("COM_SEND_MSG_APPROVER"), CONST_STR.get("COM_NOTIFY_" + obj.SENDMETHOD)]
        ];

        createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listValueAccount, docXml, rootNode);
        createDateNodeReview(CONST_STR.get("COM_TRASACTION_INFO"), listValueTransaction, docXml, rootNode);
    } else if (obj.IDTXN == "A14") {
        //dong so tiet kiem
        var listValueTransaction = [
            [CONST_STR.get("COM_TRANS_CODE"), obj.IDFCATREF], //ma giao dich
            [CONST_STR.get("COM_CREATED_DATE"), obj.DATMAKE], //ngay lap
            
        ];
        var totalAmount = parseInt(keepOnlyNumber(obj.DEPOSIT_AMT)) + parseInt(keepOnlyNumber(obj.AMOUNTACC));
        var duration = parseInt(obj.TENOR_MONTHS) + parseInt(obj.TENOR_YEARS) * 12;
        var listTransactionInfo = [
            [CONST_STR.get("TRANS_TYPE"), CONST_STR.get("ACC_CLOSE_SAVING_ACCOUNT")], //loai giao dich
            [CONST_STR.get("ESAVING_CHANGEINFO_TBLDT_STYPE"), CONST_STR.get("ACC_DIGITAL_SAVING")], //loai tiet kiem
            [CONST_STR.get("COM_TYPE_MONEY"), obj.CODTRNCURR], //loai tien gui
            [CONST_STR.get("COM_ACCOUNT_NUMBER"), obj.IDSRCACCT], //so tai khoan
            [CONST_STR.get("ESAVING_WITHDRAWAL_AMOUNT_TITLE"), formatNumberToCurrencyWithSymbol(obj.DEPOSIT_AMT, " " + obj.CODTRNCURR)], //so tien goc rut
            [CONST_STR.get("COM_PERIOD"), duration + " " + CONST_STR.get("ACCOUNT_PERIOD_MONTH")], //ky han
            [CONST_STR.get("ACCOUNT_FINALIZE_DTL_GOAL_ACC"), obj.TXTDESTACCT], //so tai khoan nhan tien
        ];
        createDateNodeReview("", listValueTransaction, docXml, rootNode);
        createDateNodeReview(CONST_STR.get("COM_ACCOUNT_INFO"), listTransactionInfo, docXml, rootNode);
    }

    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'back', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('CM_BTN_GOBACK'), docXml, buttonNode);

    if (gUserInfo.userRole.indexOf("CorpInput") > -1) {
        
    }
    buttonNode = createXMLNode('button', '', docXml, rootNode);
    typeNode = createXMLNode('type', 'reject', docXml, buttonNode);
    btnLabelNode = createXMLNode('label', CONST_STR.get('REVIEW_BTN_CONFIRM'), docXml, buttonNode);

    var objectValueClient = new Object();
    sequenceId = "4";
    objectValueClient.idtxn = "A15";
    objectValueClient.sequenceId = "4";
    objectValueClient.transactionId = gAccount.transactionId;

    gCorp.requests = ["",objectValueClient];
    gCorp.cmdType = CONSTANTS.get("CMD_ACCOUNT_QUERY_TRANSACTION");
    
    setReviewXmlStore(docXml);
    navCachedPages["corp/common/review/com-review"] = null;
    navController.pushToView("corp/common/review/com-review", true, 'xsl');
}