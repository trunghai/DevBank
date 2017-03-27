/**
 * Created by HaiDT1 on 10/15/2016.
 */
function viewDidLoadSuccess() {
    init();
}

function init() {
    angular.module('EbankApp').controller('manager_review_temp_inter', function ($scope) {
        $scope.info = gInternational.detail;

        $scope.transNHTG = false;
        $scope.transAdderssNHTG = false;
        $scope.transSwiftCodeNHTG = false;
        $scope.managerben = true;

        if(gInternational.detail.BENEFICIARYBANKMETHOD == 'CS01'){
            $scope.transSwiftCode = true;
            $scope.transAdderss = false;
        }else if (gInternational.detail.BENEFICIARYBANKMETHOD == 'CS02'){
            $scope.transSwiftCode = false;
            $scope.transAdderss = true;
        }

        if(gInternational.detail.METHOD === 'IBY'){
            $scope.transNHTG = true;
            if(gInternational.detail.BANKMETHOD === 'CSTG01'){
                $scope.transSwiftCodeNHTG = true;
                $scope.transAdderssNHTG = false;
            }else {
                $scope.transAdderssNHTG = true;
                $scope.transSwiftCodeNHTG = false;
            }

        }else {
            $scope.transNHTG = false;
        }


        document.getElementById('id.international.transtype').innerHTML = CONST_STR.get('INTERNATIONAL_TRANS_TYPE_' + gInternational.detail.TRANSACTIONTYPE);
        document.getElementById('id.international.purpose').innerHTML = CONST_STR.get('INTERNATIONAL_PURPOSE_TYPE_' + gInternational.detail.PURPOSE);
        document.getElementById('id.international.content').innerHTML = gInternational.detail.CONTENT;

        document.getElementById('id.international.name.offeror').innerHTML = gInternational.detail.CUSTOMER_NAME1;
        document.getElementById('id.international.address.offeror').innerHTML = gInternational.detail.ADDRESS;

        document.getElementById('id.international.name.ben').innerHTML = gInternational.detail.BENEFICIARYNAME;
        document.getElementById('id.international.address.ben').innerHTML = gInternational.detail.BENEFICIARYADDRESS;
        document.getElementById('id.international.nation.ben').innerHTML = gInternational.detail.BENEFICIARYCOUNTRIESNAME;
        document.getElementById('id.international.account.ben').innerHTML = gInternational.detail.BENEFICIARYACCOUNT;

        document.getElementById('id.international.trans.method').innerHTML = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_' + gInternational.detail.BENEFICIARYBANKMETHOD);
        document.getElementById('id.international.swift.code').innerHTML = gInternational.detail.BENEFICIARYSWIFTCODE;
        document.getElementById('id.international.ben.bank.name').innerHTML = gInternational.detail.BENEFICIARYBANK;
        document.getElementById('id.international.ben.bank.address').innerHTML = gInternational.detail.BENEFICIARYBANKADDRESS;
        document.getElementById('id.international.nation.bank.ben').innerHTML = gInternational.detail.BENEFICIARYBANKCOUNTRIESNAME;

        document.getElementById('id.international.intermediary.bank').innerHTML = CONST_STR.get('INTERNATIONAL_INTERMEDIARY_BANK_' + gInternational.detail.METHOD);

        document.getElementById('id.international.trans.method.NHTG').innerHTML = CONST_STR.get('INTERNATIONAL_TRANS_METHOD_NHTG_' + gInternational.detail.BANKMETHOD);
        document.getElementById('id.international.swift.code.NHTG').innerHTML = gInternational.detail.BANKSWIFTCODE;
        document.getElementById('id.international.name.NHTG').innerHTML = gInternational.detail.BANKNAME;
        document.getElementById('id.international.address.NHTG').innerHTML = gInternational.detail.BANKADDRESS;
        document.getElementById('id.international.nation.NHTG').innerHTML = gInternational.detail.BANKCOUNTRIESNAME;

        $scope.onBackClick = function () {
            navController.popToView(true);
        }

    });
    angular.bootstrap(document.getElementById('mainViewContent'), ['EbankApp']);
}