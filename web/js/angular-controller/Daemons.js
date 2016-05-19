app.controller('daemonsctrl', ['$scope', '$rootScope', "Socket", function($scope, $rootScope, Socket) {

    $scope.daemons = [];

    Socket.on('daemons-res', function(data) {
        $scope.daemons = data;
    });

    Socket.emit('file-req', {type: "daemons"});
}]);

app.controller('daemonaddctrl', ['$scope', '$rootScope', '$location', "Socket", function($scope, $rootScope, $location, Socket) {

    $scope.add_daemon = function() {
        Socket.emit('add-req', {
            type: "daemon",
            name: $scope.name,
            ip: $scope.ip,
            minport: $scope.minport,
            maxport: $scope.maxport
        });
    };

    Socket.on('add-res', function(data) {
        if(data.success) {
            $location.path('/daemons');
        } else {
            $rootScope.sendMessage("error-add-daemon");
        }
    });

}]);

app.controller('daemoneditctrl', ['$scope', '$rootScope', '$location', '$routeParams', "Socket", function($scope, $rootScope, $location, $routeParams, Socket) {

    $scope.daemonId = $routeParams.id;

    Socket.emit('daemon-req', {id: $scope.daemonId});
    Socket.on('daemon-res', function(data) {
        if(data.reason === "success") {
            $scope.name = data.daemon.daemonname;
            $scope.ip = data.daemon.daemonip;
            $scope.minport = data.daemon.minport;
            $scope.maxport = data.daemon.maxport;
        }
    });

    var edit_daemon = function() {
        Socket.emit('edit-req', {
            type: "daemon",
            name: $scope.name,
            ip: $scope.ip,
            minport: $scope.minport,
            maxport: $scope.maxport
        });
    };

    Socket.on('edit-res', function(data) {
        if(data.success) {
            $location.path('/daemons/' + $scope.daemonId + "/information");
        } else {
            $rootScope.sendMessage("error-edit-daemon");
        }
    });
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