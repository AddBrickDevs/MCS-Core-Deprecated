$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

var loaderTexts = [
    "Pulling bytes ...",
    "Please wait ...",
    "Load libraries ...",
    "Cloudifying servers ...",
    "Loading plugins ..."
];

/*
    Angular magic
 */

angular.module('app', ['ngRoute', 'Services', 'ngCookies', 'pascalprecht.translate']);

/*
    Routes for part of page
 */
angular.module('app').config(function($routeProvider) {
    $routeProvider.when('/dashboard', {
        templateUrl: 'parts/dashboard.html',
        controller: 'dashboardctrl'
    });
    $routeProvider.when('/', {
        redirectTo: '/dashboard'
    });
});

/*
    Translate config for use of lang files
 */
angular.module('app').config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.determinePreferredLanguage();
    $translateProvider.fallbackLanguage('en_US');
});

angular.module('app').run(function($rootScope) {
    $rootScope.loaderText = loaderTexts[Math.floor(Math.random() * loaderTexts.length)];
    $('.loaderText').css("display", "inline");
    var unlink = $rootScope.$on('$translateChangeEnd', function(){
        setTimeout(function() {
            var loader = $('#loader');
            loader.fadeOut(1100);
        }, 500);
    });
});

/*
    Services for easy use of socket.io etc.
 */
angular.module('Services', []).
    factory('Socket', function($rootScope) {
        var socket = io.connect();

        return {
            on: function(eventName, callback){
                socket.on(eventName, function() {
                    var args = arguments;
                    $rootScope.$apply(function() {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function(eventName, data, callback){
                if(typeof data == 'function') {
                    callback = data;
                    data = {};
                }
                socket.emit(eventName, data, function(){
                    var args = arguments;
                    $rootScope.$apply(function() {
                        if(callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    });