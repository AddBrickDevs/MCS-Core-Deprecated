app.controller('navctrl', ['$scope', function($scope) {

    $scope.startDate = 0;
    $scope.version = '-';

    Socket.on('startDate-req', function(data) {
        $scope.startDate = data.getSeconds() < 60 ? data.getSeconds() : $scope.startDate = data.getMinutes() < 60 ? data.getMinutes() : data.getHours() < 24 ? data.getHours() : data.getDay();
    });
    Socket.on('version-req', function(data) {
        $scope.version = data.value;
    });

    Socket.emit('req-info', {type:'version'});
    Socket.emit('req-info', {type:'startDate'});
}]);