app.controller('setupctrl', ['$scope', '$rootScope', "Socket", '$location', function($scope, $rootScope, Socket, $location) {

    $scope.setup = function() {
        var username = $scope.username;
        var password = $scope.password;

        $rootScope.removeAllMessages();

        if(!username || !password) {
            if(!username && !password) {
                $rootScope.sendErrorMessage("no-user-no-password");
                return;
            }
            if(!username) {
                $rootScope.sendErrorMessage("no-user");
                return;
            }
            if(!password) {
                $rootScope.sendErrorMessage("no-password");
                return;
            }
            $rootScope.sendErrorMessage("undefined-error");
        }

        if(!$rootScope.loggedIn) {
            Socket.emit("setup-req", {username: username, password: password});
            Socket.on("setup-res", function(data) {
                if(data.reason == "success") {
                    $location.path('/login');
                } else {
                    $rootScope.sendErrorMessage(data.error);
                }
            });
        }
    };
}]);
