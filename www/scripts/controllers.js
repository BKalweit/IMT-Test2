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
    $scope.items.push({ id: 1, name: 'Item1' });
    $scope.items.push({ id: 2, name: 'Item2' });

    $scope.newitem = { id: 3, name: 'Item3' };

    $scope.addItem = function () {
        $scope.items.push($scope.newitem);
        $scope.newitem = {};
    };

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
                    $http.get('http://server1.imt.local/imtsql/api/WorkOrder/' + result.text.substr(0, 6)).success(function (data) {
                        $scope.wo = data;
                    }).error(function (err) {
                        alert('Failed to get WO: ' + err);
                    });

                    $scope.newitem.RequisitionID = result.text;
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
