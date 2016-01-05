app.controller('navctrl', ['$scope', 'Socket', '$location', function($scope, Socket, $location) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

}]);