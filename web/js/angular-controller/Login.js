app.controller('loginctrl', ['$scope', '$rootScope', 'Socket', '$location', '$cookies', function($scope, $rootScope, Socket, $location, $cookies) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        var stay = $scope.stay;

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
            Socket.emit("login-req", {username: username, password: password});
            Socket.on("login-res", function(data) {
                if(data.reason == "success") {
                    if(stay) {
                        $cookies.put("username", username);
                        $cookies.put("session", data.session);
                    }
                    $rootScope.loggedIn = true;
                    $location.path("/");
                } else {
                    $rootScope.sendErrorMessage(data.error);
                }
            });
        }
    };

}]);