app.controller('settingsctrl', ['$scope', 'Socket', '$rootScope', function($scope, Socket, $rootScope) {

    $scope.users = [];

    Socket.on('users-res', function(data) {
        $scope.users = data;
    });
    Socket.emit('file-req', {type: "users"});

    $scope.add_user = function() {
        Socket.emit('add', {
            type: "user",
            name: $scope.username,
            password: $scope.password,
            rang: $scope.rang
        });
    };

    $scope.version = "v0.0.1 PRE ALPHA";

    $scope.debugMode = false;
    $scope.maintenanceMode = false;

    Socket.on('mode-res', function(data) {
        if(data.mode == "debug") {
            $scope.debugMode = data;
        }
        if(data.mode == "maintenance") {
            $scope.maintenanceMode = data;
        }
    });
    Socket.emit('mode-req', {type: "ssl"});
    $scope.toggleSSL = function() {
        Socket.emit('edit', {
            type: "ssl",
            enabled: $scope.ssl,
            key: $scope.key,
            cert: $scope.cert,
            chain: $scope.chain
        });
    };

    $rootScope.sendErrorMessage("undefined-error");
    $rootScope.sendWarningMessage("using-no-ssl");
    $rootScope.sendInformationMessage("settings-edited");

}]);