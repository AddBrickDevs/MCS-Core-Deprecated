app.controller('loginctrl', ['$scope', '$rootScope', 'Socket', '$location', '$cookies', function($scope, $rootScope, Socket, $location, $cookies) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        var stay = $scope.stay;

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
                    $rootScope.sendMessage(data.error, true);
                }
            });
        }
    };

}]);