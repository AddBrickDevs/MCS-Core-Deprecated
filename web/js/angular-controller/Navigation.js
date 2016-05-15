app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

    $.notify.addStyle('error', {
        html: "<i class='fa fa-warning'></i> &nbsp; <span data-notify-text/>",
        classes: {
            base: {
                "color": "#FFFFFF",
                "background-color": "#D40000",
                "padding": "5px"
            }
        }
    });

    $.notify.addStyle('info', {
        html: "<i class='fa fa-info-circle'></i> &nbsp; <span data-notify-text/>",
        classes: {
            base: {
                "color": "#FFFFFF",
                "background-color": "#039000",
                "padding": "5px"
            }
        }
    });

    $rootScope.sendMessage = function(message, error) {
        console.log("Send message...");
        $translate(message).then(function(translatedMessage) {
            if(error) {
                $.notify(translatedMessage, {
                    style: 'error'
                });
            } else {
                $.notify(translatedMessage, {
                    style: 'info'
                });
            }
        });
    };
}]);