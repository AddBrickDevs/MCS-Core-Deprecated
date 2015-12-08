app.controller('dashboardctrl', ['$scope', 'Socket', function($scope, Socket) {

    $scope.log = [];

    var log = document.getElementById('log');

    Socket.on('log-req', function(data) {
        $scope.log = data;
        log.scrollTop = log.scrollHeight;
    });

    /*
    * EXPERIMENTAL!!
    *
    * TO DO!!
    * */

    $scope.startDate = '0';
    $scope.version = '-';

    Socket.on('startDate-req', function(data) {
        var req_date = data.req_value;
        var now_date = new Date();

        var diff = req_date.getTime() - now_date.getTime();

        var seconds = Math.floor(diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        $scope.startDate = diff;

        //$scope.startDate = data.data.getSeconds() < 60 ? data.data.getSeconds() : $scope.startDate = data.data.getMinutes() < 60 ? data.data.getMinutes() : data.data.getHours() < 24 ? data.data.getHours() : data.data.getDay();
    });
    Socket.on('version-req', function(data) {
        $scope.version = data.req_value;
    });

    Socket.emit('req-info', {type:'version'});
    Socket.emit('req-info', {type:'startDate'});

    /*
    * EXPERIMENTAL!!
    * */

    Socket.emit('req-file', {type:'log'});
}]);