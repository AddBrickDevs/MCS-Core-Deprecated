app.controller('settingsctrl', ['$scope', 'Socket', function($scope, Socket) {

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

    $scope.ssl = false;

    Socket.on('ssl-res', function(data) {
        $scope.ssl = data;
    });
    Socket.emit('file-req', {type: "ssl"});
    $scope.toggleSSL = function() {
        Socket.emit('edit', {
            type: "ssl",
            enabled: $scope.ssl,
            key: $scope.key,
            cert: $scope.cert,
            chain: $scope.chain
        });
    };

}]);