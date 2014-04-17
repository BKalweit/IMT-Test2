/**
 * Created by jkalweit on 4/6/2014.
 */



function MainCtrl($scope, $location) {


}


function HomeCtrl($scope) {

    $scope.status = 'Ready.';

};


function ItemsCtrl($scope, $http) {

    $scope.items = [];

    $scope.newWONumber = 243297;

    $scope.addItem = function () {
        $http.get('http://server1.imt.local/imtsql/api/WorkOrderView/' + $scope.newWONumber.toString().substr(0, 6)).success(function (wo) {
            $scope.items.push(wo);
            $scope.newWONumber = "";
            $scope.newWO = {};
        }).error(function (err) {
            alert('Failed to get WO: ' + err.code);
        });
    };

    $scope.scanBarcode = function () {

        var scanner = cordova.require("com.phonegap.plugins.barcodescanner.BarcodeScanner");

        navigator.notification.vibrate(1000);


        scanner.scan(
            function (result) {
                if (!result.cancelled) {
                    $scope.newWONumber = result.text;
                    $scope.addItem();
                }
            },
            function (error) {
                alert("Scanning failed: " + error);
            }
        );

    }
};

function ItemCtrl($scope, $routeParams) {

    $scope.item = {
        id: $routeParams.id,
        name: 'Item' + $routeParams.id
    };

}
