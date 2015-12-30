'use strict';

angular.module('agt', [
    'ngRoute',
    'main',
    'slidingPanel'
]).
config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/main'});
}]);
