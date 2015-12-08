app.controller('dashboardctrl', ['$scope', 'Socket', function($scope, Socket) {

    $scope.log = [];

    var log = document.getElementById('log');

    Socket.on('log-req', function(data) {
        $scope.log = data;
        log.scrollTop = log.scrollHeight;
    });

    Socket.emit('req-file', {type:'log'});
}]);