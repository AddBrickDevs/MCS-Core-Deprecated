app.controller('navctrl', ['$scope', 'Socket', function($scope, Socket) {

    $scope.status = 'connected';

    Socket.on('connection', function() {
        $scope.status = 'connected';
        Socket.on('disconnect' ,function() {
            $scope.status = 'disconnected';
        });
    });

}]);