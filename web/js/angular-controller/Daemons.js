app.controller('daemonsctrl', ['$scope', '$rootScope', "Socket", function($scope, $rootScope, Socket) {

    $scope.daemons = [];

    Socket.on('daemons-res', function(data) {
        $scope.daemons = data;
    });

    Socket.emit('file-req', {type: "daemons"});
}]);

app.controller('daemonaddctrl', ['$scope', '$rootScope', "Socket", function($scope, $rootScope, Socket) {

    $scope.checkForIp = function() {
        // TODO
    };

    $scope.add_daemon = function() {
        Socket.emit('add-req', {
            type: "daemon",
            name: $('#name').val(),
            ip: $('#ip').val(),
            minport: $('#min_port').val(),
            maxport: $('#max_port').val()
        });
    };

    Socket.on('add-res', function(data) {
        if(data.success) {
            $rootScope.addMessageToQueue("success-add-daemon");
        } else {
            $rootScope.addMessageToQueue("error-add-daemon");
        }
    });

}]);

app.controller('daemoneditctrl', ['$scope', '$rootScope', '$routeParams', "Socket", function($scope, $rootScope, $routeParams, Socket) {

    $scope.daemonId = $routeParams.id;

}]);

app.controller('daemoninfoctrl', ['$scope', '$rootScope', '$routeParams', "Socket", function($scope, $rootScope, $routeParams, Socket) {

    $scope.daemonId = $routeParams.id;

}]);

app.controller('daemonremovectrl', ['$scope', '$rootScope', '$routeParams', "Socket", function($scope, $rootScope, $routeParams, Socket) {

    $scope.daemonId = $routeParams.id;

    $scope.delete = function(id) {
        Socket.emit("del-req", { type: "daemon", id: id });
    };

}]);

app.controller('daemonshutdownctrl', ['$scope', '$rootScope', '$routeParams', "Socket", function($scope, $rootScope, $routeParams, Socket) {

    $scope.daemonId = $routeParams.id;

}]);