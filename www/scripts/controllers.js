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
        if ($scope.newWO.WO)
        {
            $scope.getWO();
        }
        $scope.items.push($scope.newWO);
        $scope.newWO = {};
    };

    $scope.getWO = function () {
        if ($scope.newWO.WO) {
            $http.get('http://server1.imt.local/imtsql/api/WorkOrder/' + $scope.newWO.WO.substr(0, 6)).success(function (data) {
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
                alert("We got a barcode\n" +
                    "Result: " + result.text + "\n" +
                    "Format: " + result.format + "\n" +
                    "Cancelled: " + result.cancelled);

                if (!result.cancelled) {
                    $scope.newWO.WO = result.text;
                    $scope.getWO();
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
