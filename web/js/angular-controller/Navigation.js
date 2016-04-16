app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    var errors = [
        "no-user",
        "no-password",
        "no-user-no-password",
        "no-such-user",
        "undefined-error"
    ];

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

    $rootScope.sendErrorMessage = function(error) {
        if(errors.includes(error)) {
            console.log("A");
            $translate(error).then(function (errorMessage) {
                console.log("B");
                $("#error-message").text(errorMessage);
                $("#error-message-box").show();
            });
        } else {
            console.log("[ERROR] Unknown Error. Cannot resolve error!");
        }
    };

    $rootScope.removeErrorMessage = function() {
        $("#error-message-box").hide();
    }

}]);