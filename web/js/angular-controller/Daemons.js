app.controller('daemonsctrl', ['$scope', "Socket", function($scope, Socket) {

    $scope.daemons = [];

    Socket.on('daemons-res', function(data) {
        $scope.daemons = data;
    });

    Socket.emit('file-req', {type: "daemons"});

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
