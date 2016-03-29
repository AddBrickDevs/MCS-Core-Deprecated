app.controller('pluginsctrl', ['$scope', '$location', 'Socket', 'Upload', function($scope, $location, Socket, Upload) {

    $scope.plugins = [];

    Socket.on('plugins-req', function(data) {
        $scope.plugins = data;
    });

    Socket.emit('req-file', {type: "plugins"});

    $scope.pluginfile = function(event){
        $scope.$apply(function() {
            $scope.filename = event.target.files[0].name;
            $scope.files = event.target.files;
        });
    };

    $scope.addplugin = function(){
        $scope.upload($scope.files);
    };

    $scope.upload = function (files) {
        if (files && files.length) {
            Upload.upload({
                url: 'plugins/upload',
                file: files[0]
            }).then(function(res) {
                $location.path('/plugins');
            }, function(res) {
                console.log("Error!");
            }, function (evt) {
                $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
                if($scope.progress == 100.0) {
                    $scope.reset();
                    $location.path('/plugins');
                }
            });
        }
    };

    $scope.reset = function() {
        $scope.filename = "";
        $scope.files = null;
        $scope.progress = 0;
    }
}]);