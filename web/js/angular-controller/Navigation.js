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
            $translate(error).then(function (errorMessage) {
                $("#error-message-box").show();
                $("#error-message").text(errorMessage);
            });
        }
    };

    $rootScope.removeErrorMessage = function() {
        $("#error-message-box").hide();
    }

}]);