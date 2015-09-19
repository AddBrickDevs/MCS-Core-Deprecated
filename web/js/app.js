$(document).ready(function() {
    $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

var loaderTexts = [
    "Pulling Bytes...",
    "Please wait...",
    "Loading Libraries...",
    "Cloudifying Servers...",
    "Loading Plugins...",
    "Soon™...",
    "Doing random things..."
];

/*
    Angular magic
 */

var app = angular.module('app', ['ngRoute', 'Services', 'ngCookies', 'pascalprecht.translate']);

/*
    Routes for part of page
 */
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/dashboard', {
            templateUrl: 'parts/dashboard.html',
            controller: 'dashboardctrl'
        })
        .when('/daemons', {
            templateUrl: 'parts/daemons.html',
            controller: 'daemonsctrl'
        })
        .when('/plugins', {
            templateUrl: 'parts/plugins.html',
            controller: 'pluginsctrl'
        })
        .when('/worlds', {
            templateUrl: 'parts/worlds.html',
            controller: 'worldsctrl'
        })
        .when('/servertypes', {
            templateUrl: 'parts/servertypes.html',
            controller: 'servertypesctrl'
        })
        .when('/statistics', {
            templateUrl: 'parts/statistics.html',
            controller: 'statisticsctrl'
        })
        .when('/settings', {
            templateUrl: 'parts/settings.html',
            controller: 'settingsctrl'
        })
        .when('/', {
            templateUrl: 'parts/dashboard.html',
            controller: 'dashboardctrl'
        })
        .otherwise({
            templateUrl: 'parts/404.html',
            controller: 'navctrl'
        });
    $locationProvider.html5Mode(true);
});

/*
    Translate config for use of lang files
 */
app.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/',
        suffix: '.json'
    });
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy('escaped');
    $translateProvider.determinePreferredLanguage();
    $translateProvider.fallbackLanguage('en_US');
});

app.run(function($rootScope, $templateCache, $http) {
    var templates = ['404', 'dashboard'];
    angular.forEach(templates, function(templateUrl) {
        templateUrl = 'parts/'+templateUrl+'.html';
        $http({method: 'GET', url: templateUrl}).success(function(data) {
            $templateCache.put(templateUrl, data);
        });
    });

    $rootScope.loaderText = loaderTexts[Math.floor(Math.random() * loaderTexts.length)];
    $('.loaderText').css("display", "inline");
    var unlink = $rootScope.$on('$translateChangeEnd', function(){
        setTimeout(function() {
            var loader = $('#loader');
            loader.fadeOut(950);
            unlink();
        }, 500);
    });
});

app.controller('dashboardctrl', ['$scope', function($scope) {

}]);

app.controller('navctrl', ['$scope', function($scope) {

}]);

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
                if(typeof data === 'function') {
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