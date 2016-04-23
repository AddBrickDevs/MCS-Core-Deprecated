app.controller('settingsctrl', ['$scope', 'Socket', '$rootScope', function($scope, Socket, $rootScope) {

    $scope.users = [];

    Socket.on('users-res', function(data) {
        $scope.users = data;
    });
    Socket.emit('file-req', {type: "users"});

    $scope.add_user = function() {
        Socket.emit('add-req', {
            type: "user",
            name: $scope.username,
            password: $scope.password,
            rang: $scope.rang
        });
    };
    Socket.on("add-res");

    $scope.version = "v0.0.1 PRE ALPHA";

    $scope.debugMode = false;
    $scope.maintenanceMode = false;
    $scope.sslEnabled = false;

    Socket.emit("settings-req", { type: "debugmode" });
    Socket.emit("settings-req", { type: "maintenancemode" });
    Socket.emit("settings-req", { type: "ssl" });

    Socket.on('settings-res', function(data) {
        switch(data.type) {
            case "debugmode":
                $scope.debugMode = data.value;
                if(data.value == true) {
                    $rootScope.sendWarnMessage("debug-mode-enabled");
                }
                break;
            case "maintenancemode":
                $scope.maintenanceMode = data.value;
                if(data.value == true) {
                    $rootScope.sendWarnMessage("maintenance-mode-enabled");
                }
                break;
            case "ssl":
                $scope.sslEnabled = data.value;
                if(data.value == false) {
                    $rootScope.sendWarnMessage("ssl-disabled");
                }
                break;
        }
    });
}]);