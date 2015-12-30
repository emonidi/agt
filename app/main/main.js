/**
 * Created by emonidi on 12/30/15.
 */

'use strict';
angular.module('main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/main', {
            controller: 'mainCtrl',
            templateUrl: 'main/main-template.html'
        });
    }])

    .controller('mainCtrl', ['$scope','imageService', function ($scope,imageService) {
        $scope.images = imageService.cats;
    }]);