/**
 * Created by HaiDT1 on 6/27/2016.
 */


function viewDidLoadSuccess() {
    initData();
}

function initData() {
    angular.module('EbankApp').controller('pay_bill_result', function ($scope) {
        $scope.result = gPayment.result;
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

        $scope.makeOtherTrans = function () {

            navController.initWithRootView("corp/payment_service/bill/pay_bill_create", true, 'html');
            return;
        }

    });
    angular.bootstrap(document.getElementById("mainViewContent"), ["EbankApp"]);
}