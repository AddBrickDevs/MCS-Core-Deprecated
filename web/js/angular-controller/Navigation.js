app.controller('navctrl', ['$scope', '$rootScope', 'Socket', '$location', '$translate', function($scope, $rootScope, Socket, $location, $translate) {

    var messageQueue = [];
    var executingQueue = false;

    $scope.isActive = function (viewLocation) {
        var current = $location.path().split("/");
        return current[1] == viewLocation;
    };

    $rootScope.addMessageToQueue = function(message) {
        $translate(message).then(function(translatedMessage) {
            messageQueue.push(translatedMessage);
        });
        if(!executingQueue) {
            executeQueue();
        }
    };

    var executeQueue = function() {
        executingQueue = true;
        if(messageQueue.length != 0) {
            sendMessage();
            setTimeout(function() {
                executeQueue();
            }, 5000);
        } else {
            executingQueue = false;
        }
    };

    var sendMessage = function() {
        var message = messageQueue.shift();

        console.log("[DEBUG " + getDateTime() + "] " + message + "[" + messageQueue + "]");
    };

    var getDateTime = function() {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min  = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        return hour + ":" + min + ":" + sec;
    };

}]);