app.controller('daemonsctrl', ['$scope', "$location", "Socket", function($scope, $location, Socket) {

    $scope.daemons = [];

    Socket.on('daemons-req', function(data) {
        $scope.daemons = data;
    });

    Socket.emit('req-file', {type: "daemons"});

    Socket.on('return', function() {
       $location.path('/daemons')
    });

    $scope.add_daemon = function() {
        Socket.emit('add', {
            type: "daemon",
            name: $('#name').val(),
            ip: $('#ip').val(),
            minport: $('#min_port').val(),
            maxport: $('#max_port').val()
        });
    };

}]);
