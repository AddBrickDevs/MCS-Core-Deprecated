app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    $rootScope.errorMessages = null;
    $rootScope.warnMessages = null;
    $rootScope.informationMessages = null;

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

    /*
    * Errors
    * */
    $rootScope.sendErrorMessage = function(error) {
        $translate(error).then(function (errorMessage) {
            if ($rootScope.errorMessages == null) {
                $rootScope.errorMessages = {};
            }

            $rootScope.errorMessages[error] = errorMessage;
        });
    };

    $rootScope.removeErrorMessage = function(error) {
        if($rootScope.errorMessages[error] !== -1) {
            delete $rootScope.errorMessages[error];

            if($rootScope.errorMessages.length == 0) {
                $rootScope.errorMessages = null;
            }
        }
    };

    /*
    * Warnings
    * */
    $rootScope.sendWarnMessage = function(warning) {
        $translate(warning).then(function (warnMessage) {
            if ($rootScope.warnMessages == null) {
                $rootScope.warnMessages = {};
            }

            $rootScope.warnMessages[warning] = warnMessage;
        });
    };

    $rootScope.removeWarnMessage = function(warning) {
        if($rootScope.warnMessages[warning] !== -1) {
            delete $rootScope.warnMessages[warning];

            if($rootScope.warnMessages.length == 0) {
                $rootScope.warnMessages = null;
            }
        }
    };

    /*
    * Informations
    * */
    $rootScope.sendInformationMessage = function(information) {
        $translate(information).then(function (informationMessage) {
            if ($rootScope.informationMessages == null) {
                $rootScope.informationMessages = {};
            }

            $rootScope.informationMessages[information] = informationMessage;
        });
    };

    $rootScope.removeInformationMessage = function(information) {
        if($rootScope.informationMessages[information] !== -1) {
            delete $rootScope.informationMessages[information];

            if($rootScope.informationMessages.length == 0) {
                $rootScope.informationMessages = null;
            }
        }
    };

    /*
    * Remove All
    * */
    $rootScope.removeAllMessages = function() {
        $rootScope.informationMessages = null;
        $rootScope.warnMessages = null;
        $rootScope.errorMessages = null;
    }

}]);