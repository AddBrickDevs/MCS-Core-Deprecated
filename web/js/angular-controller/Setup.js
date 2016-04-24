app.controller('setupctrl', ['$scope', '$rootScope', "Socket", '$location', function($scope, $rootScope, Socket, $location) {

    $scope.setup = function() {
        var username = $scope.username;
        var password = $scope.password;

        $rootScope.removeAllMessages();

        if(!username || !password) {
            if(!username && !password) {
                return;
            }
            if(!username) {
                return;
            }
            if(!password) {
                return;
            }
        }

        if(!$rootScope.loggedIn) {
            Socket.emit("setup-req", {username: username, password: password});
            Socket.on("setup-res", function(data) {
                if(data.reason == "success") {
                    $location.path('/login');
                }
            });
        }
    };
}]);
