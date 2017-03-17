/**
 * Created by HaiDT1 on 6/29/2016.
 */

gCorp.isBack = false;

function viewBackFromOther() {
    gCorp.isBack = true;
}


function viewDidLoadSuccess() {
    initData();

}

function initData() {
    angular.module('EbankApp').controller('auth_payment_bill_detail', function ($scope, requestMBServiceCorp) {
        if (!gCorp.isBack) {
            $scope.detail = gTrans.detail;
        }else {
            $scope.detail = null;
            $scope.detail = gTrans.detail;
			if (gTrans.detail.isflag==='N')
			{
				document.getElementById("idTxtReason").value = gTrans.detail.rejectReason;
			}
        }

        setTimeout(function () {
            if (mainContentScroll) {
                mainContentScroll.refresh();
            }
        }, 100);
        
        $scope.sendOTP = function () {
			var totalAmount;
			
			totalAmount =  gTrans.detail.amount;
			if (parseInt(totalAmount) > parseInt(gTrans.limit.limitTime))
			{
				showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_TIME_AUTH'),
								[formatNumberToCurrency(gTrans.limit.limitTime)]));
				return;
			}
			else if (parseInt(totalAmount) > parseInt(gTrans.limit.limitDay))
			{
				showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY_AUTH'),
								[formatNumberToCurrency(gTrans.limit.limitDay)]));
				return;
			}
			else if (parseInt(gTrans.limit.totalDay) > parseInt(gTrans.limit.limitDay))
			{
				showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY_AUTH'),
								[formatNumberToCurrency(gTrans.limit.limitDay)]));
				return;
			}
			else if ((parseInt(gTrans.limit.totalDay) + parseInt(totalAmount)) > parseInt(gTrans.limit.limitDay))
			{
				showAlertText(formatString(CONST_STR.get('CORP_MSG_COM_LIMIT_EXCEEDED_DAY_AUTH'),
								[formatNumberToCurrency(gTrans.limit.limitDay)]));
				return;
			}
			else
			{
				gTrans.detail.isflag = 'Y';
				navCachedPages["corp/authorize/payment_service/bill/auth-pay-bill-detail-authen"] = null;
				navController.pushToView("corp/authorize/payment_service/bill/auth-pay-bill-detail-authen", true);
			}
	
        }
		
		 $scope.onCancelClick = function () {
			gTrans.detail.isflag = 'N';
			var txtReason = document.getElementById("idTxtReason").value;
  			//var textFlag = checkSpecialChar(txtReason);
			 if (txtReason == '') {
				showAlertText(CONST_STR.get("COM_CHECK_EMPTY_REJECT_REASON"));
				return;
			  }
			gTrans.detail.rejectReason = txtReason;
            navCachedPages["corp/authorize/payment_service/bill/auth-pay-bill-detail-authen"] = null;
            navController.pushToView("corp/authorize/payment_service/bill/auth-pay-bill-detail-authen", true);
        }

        $scope.onBackClick = function () {
            navController.resetBranchView();
            return;
        }
        
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}