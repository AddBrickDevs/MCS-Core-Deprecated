app.controller('navctrl', ['$scope', 'Socket', function($scope, Socket) {

    $scope.status = 'Connected';

    Socket.on('connection', function() {
        $scope.status = 'Connected';
        document.getElementById('status').style.background = '#039000';
        Socket.on('disconnect' ,function() {
            $scope.status = 'Disconnected';
        });
    });
}]);