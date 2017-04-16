/**
 * Created by HAI-TPBank on 3/30/2017.
 */
function viewDidLoadSuccess() {
    init();

}

function init() {
    angular.module('EbankApp').controller('acc_demo', function ($scope, requestMBServiceCorp) {
        readAmount(function (response) {
            $scope.amount = response.result.amount;
            $scope.$apply();
        });
    });
    angular.bootstrap(document.getElementById('mainViewContent'),['EbankApp']);
}