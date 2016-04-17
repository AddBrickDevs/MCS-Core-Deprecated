app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    $rootScope.errorMessage = null;

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
        if(errors.indexOf(error)) {
            $translate(error).then(function (errorMessage) {
                $rootScope.errorMessage = errorMessage;
            });
        } else {
            console.log("[ERROR] Unknown Error. Cannot resolve error!");
        }
    };

    $rootScope.removeErrorMessages = function() {
        $rootScope.errorMessage = null;
    }

}]);