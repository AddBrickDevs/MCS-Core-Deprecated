app.controller('loginctrl', ['$scope', '$rootScope', 'Socket', '$location', '$cookies', function($scope, $rootScope, Socket, $location, $cookies) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        var stay = $scope.stay;

        $rootScope.removeErrorMessage();

        if(!username || !password) {
            if(!username) {
                $rootScope.sendErrorMessage("no-user");
                return;
            }
            if(!password) {
                $rootScope.sendErrorMessage("no-password");
                return;
            }
            if(!username && !password) {
                $rootScope.sendErrorMessage("no-user-no-password");
                return;
            }
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
                    switch(data.error) {
                        case "no-such-user":

                            break;
                        case "database-error":

                            break;
                        default:

                            break;
                    }

                }
            });
        }
    };

}]);