app.controller('setupctrl', ['$scope', '$rootScope', "Socket", '$location', function($scope, $rootScope, Socket, $location) {

    $scope.message_setup_success = "";

    $scope.setup = function() {
        var username = $scope.username;
        var password = $scope.password;

        if(!$rootScope.loggedIn) {
            Socket.emit("setup-req", {username: username, password: password});
            Socket.on("setup-res", function(data) {
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
