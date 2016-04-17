app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    $rootScope.errorMessage = null;
    $rootScope.warnMessage = null;
    $rootScope.informationMessage = null;

    var errors = [
        "no-user",
        "no-password",
        "no-user-no-password",
        "no-such-user",
        "undefined-error"
    ];

    var warnings = [
        "using-debug-mode",
        "using-maintenance-mode",
        "using-no-ssl"
    ];

    var informations = [
        "daemon-added",
        "daemon-removed",
        "daemon-edited",
        "plugin-added",
        "plugin-removed",
        "plugin-edited",
        "world-added",
        "world-removed",
        "world-edited",
        "settings-edited"
    ];

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

    /*
    * Errors
    * */
    $rootScope.sendErrorMessage = function(error) {
        if(errors.indexOf(error)) {
            $translate(error).then(function (errorMessage) {
                $rootScope.errorMessage = errorMessage;
            });
        }
    };

    $rootScope.removeErrorMessages = function() {
        $rootScope.errorMessage = null;
    };

    /*
    * Warnings
    * */
    $rootScope.sendWarningMessage = function(warning) {
        if(warnings.indexOf(warning)) {
            $translate(warning).then(function (warnMessage) {
                $rootScope.warnMessage = warnMessage;
            });
        }
    };

    $rootScope.removeWarningMessages = function() {
        $rootScope.warnMessage = null;
    };

    /*
    * Informations
    * */
    $rootScope.sendInformationMessage = function(information) {
        if(informations.indexOf(information)) {
            $translate(information).then(function (informationMessage) {
                $rootScope.informationMessage = informationMessage;
            });
        }
    };

    $rootScope.removeInformationMessages = function() {
        $rootScope.informationMessage = null;
    }

}]);