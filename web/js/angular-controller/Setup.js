app.controller('setupctrl', ['$scope', '$rootScope', "Socket", '$location', function($scope, $rootScope, Socket, $location) {

    $scope.message_setup_success = "";

    $scope.setup = function() {
        console.log("setup started");
        var username = $scope.username;
        var password = $scope.password;

        if(!$rootScope.loggedIn) {
            console.log("user not logged in");
            Socket.emit("setup-req", {username: username, password: password});
            Socket.on("setup-res", function(data) {
                console.log("Got a request! Reason: " + data.reason);
                if(data.reason == "success") {
                    $location.path('/login');
                } else {
                    if(data.done) {
                        $(".message").addClass("bg-red");
                    } else {
                        $(".message").addClass("bg-red");
                    }
                }
            });
        }
    };
}]);
