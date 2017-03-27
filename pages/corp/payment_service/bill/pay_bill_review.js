/**
 * Created by HaiDT1 on 6/27/2016.
 */

gCorp.isBack = false; // Khoi tao

function viewBackFromOther() {
    gCorp.isBack = true;
}

function viewDidLoadSuccess() {

    initData();

    //Tooltip when hover book

}

function initData() {
    angular.module('EbankApp').controller('pay_bill_review', function ($scope, requestMBServiceCorp) {
        $scope.review = gPayment.review;
		var tmp = gPayment.paymentInfo.srvId;
        if(gUserInfo.lang === 'VN'){
            if ($scope.review.issavepayee === 'TH'){
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_VN[1];
            }else {
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_VN[0];
            }
        }else {
            if ($scope.review.issavepayee === 'TH'){
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_EN[1];
            }else {
                $scope.thuhuong = CONST_VAL_PAYEE_NOT_TEMPLATE_EN[0];
            }
        }
		if (tmp === '306')
		{
			document.getElementById('thuhuongtmp').style.display = 'none';
		}
		
        $scope.sendJSONRequest = function () {
            navCachedPages["corp/payment_service/bill/pay_bill_authen"] = null;
            navController.pushToView("corp/payment_service/bill/pay_bill_authen", true);


        }

        $scope.onBackClick = function () {
            // navCachedPages["corp/payment_service/bill/pay_bill_create"] = null;
            navController.popView(true);
            return;
        }

        $scope.onCancelClick = function () {
            navCachedPages["corp/payment_service/bill/pay_bill_create"] = null;
            navController.initWithRootView("corp/payment_service/bill/pay_bill_create",true, 'html');
        }
    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}