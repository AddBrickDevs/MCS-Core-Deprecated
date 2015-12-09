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
    * TO DO: version-control!!
    * */

    $scope.startDate = '0';
    $scope.version = '-';

    Socket.on('startDate-req', function(data) {
        var req_date = new Date(data.date_val);
        var now_date = new Date();

        var diff = req_date.getTime() - now_date.getTime();

        var seconds = Math.floor(-diff / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        if(seconds < 60) {
            $scope.startDate = seconds + ((seconds == 1) ? ' Sekunde' :' Sekunden');
        } else if(minutes < 60 && seconds >= 60) {
            $scope.startDate = minutes + ((minutes == 1) ? ' Minute' :' Minuten');
        } else if(hours < 24 && minutes >= 60) {
            $scope.startDate = hours + ((hours == 1) ? ' Stunde' :' Stunden');
        } else {
            $scope.startDate = days + ((days == 1) ? ' Tag' :' Tagen');
        }

    });
    Socket.on('version-req', function(data) {
        $scope.version = '' + data.version_val + '';
    });

    Socket.emit('req-info', {type:'version'});
    Socket.emit('req-info', {type:'startDate'});

    /*
    * EXPERIMENTAL!!
    * */

    Socket.emit('req-file', {type:'log'});
}]);