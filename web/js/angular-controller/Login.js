app.controller('loginctrl', ['$scope', '$rootScope', 'Socket', '$location', '$cookies', function($scope, $rootScope, Socket, $location, $cookies) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;

        if(!$rootScope.loggedIn) {
            Socket.emit("login", {username: username, password: password});
            Socket.on("login-result", function(data) {
                if(data.reason == "success") {
                    $cookies.put("username", username);
                    $cookies.put("session", data.session);
                    $rootScope.loggedIn = true;
                    $location.path("/");
                } else {
                    console.log(data.reason);
                }
            });
        }
    };

}]);