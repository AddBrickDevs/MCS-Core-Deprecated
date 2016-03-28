app.controller('worldsctrl', ['$scope', '$location', 'Socket', 'Upload', function($scope, $location, Socket, Upload) {
    $scope.worlds = [];

    Socket.on('worlds-req', function(data) {
        $scope.worlds = data;
    });

    Socket.emit('req-file', {type: "worlds"});

    $scope.worldfile = function(event){
        $scope.$apply(function() {
            $scope.filename = event.target.files[0].name;
            $scope.files = event.target.files;
        });
    };

    $scope.addworld = function(){
        $scope.upload($scope.files);
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            Upload.upload({
                url: 'worlds/upload',
                file: files[0]
            }).then(function(res) {
                $location.path('/worlds');
            }, function(res) {
                console.log("Error!");
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    };

    $scope.reset = function() {
        $scope.filename = "";
        $scope.files = null;
        $scope.progress = 0;
    }
}]);