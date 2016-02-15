app.controller('loginctrl', ['$scope', '$rootScope', 'Socket', '$location', function($scope, $rootScope, Socket, $location) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        console.log(username + "; " + password);

        if(!$rootScope.loggedIn) {
            console.log("Test 1");
            Socket.emit("login", {username: username, password: password});
            Socket.on("login-result", function(data) {
                console.log("Test 2");
                if(data.reason == "success") {
                    $cookies.put("username", username);
                    $cookies.put("session", data.session);
                    $location.path("/dashboard");
                } else {
                    console.log("Failed");
                }
            });
        }
    };

}]);