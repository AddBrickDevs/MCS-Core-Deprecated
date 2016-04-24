app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

}]);