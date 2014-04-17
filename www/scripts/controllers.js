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

    $scope.addItem = function () {
        $scope.getWO();
        if ($scope.newWO.WO) {
                $scope.items.push($scope.newWO);
                $scope.newWONumber = "";
                $scope.newWO = {};
        }
    };

    $scope.getWO = function () {
        if ($scope.newWONumber) {
            $http.get('http://server1.imt.local/imtsql/api/WorkOrder/' + $scope.newWONumber.substr(0, 6)).success(function (data) {
                $scope.newWO = data;
            }).error(function (err) {
                alert('Failed to get WO: ' + err.code);
            });
        }
    }

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
