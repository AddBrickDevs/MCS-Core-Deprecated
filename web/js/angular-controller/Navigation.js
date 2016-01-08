app.controller('navctrl', ['$scope', 'Socket', '$location', function($scope, Socket, $location) {

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

}]);