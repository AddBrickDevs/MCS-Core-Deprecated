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

    $rootScope.addMessageToQueue("debug-mode");
    $rootScope.addMessageToQueue("maintenance-mode");
    $rootScope.addMessageToQueue("ssl");
    $rootScope.addMessageToQueue("current-version");

    Socket.emit("settings-req", { type: "debugmode" });
    Socket.emit("settings-req", { type: "maintenancemode" });
    Socket.emit("settings-req", { type: "ssl" });

    Socket.on('settings-res', function(data) {
        switch(data.type) {
            case "debugmode":
                $scope.debugMode = data.value;
                break;
            case "maintenancemode":
                $scope.maintenanceMode = data.value;
                break;
            case "ssl":
                $scope.sslEnabled = data.value;
                break;
        }
    });

    $scope.toggleDebugMode = function() {
        Socket.emit("change-settings-req", { type: "debugmode", value: !$scope.debugMode });
    };

    $scope.toggleMaintenanceMode = function() {
        Socket.emit("change-settings-req", { type: "maintenancemode", value: !$scope.maintenanceMode });
    };

    $scope.toggleSSL = function() {
        Socket.emit("change-settings-req", { type: "ssl", value: !$scope.sslEnabled });
    };

    Socket.on("change-settings-res", function(data) {
        switch(data.type) {
            case "debugmode":
                $scope.debugMode = data.value;
                break;
            case "maintenancemode":
                $scope.maintenanceMode = data.value;
                break;
            case "ssl":
                $scope.sslEnabled = data.value;
                break;
        }
    });

}]);