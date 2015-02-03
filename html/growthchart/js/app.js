 'use strict';

var growthChartApp = angular.module("growthChartApp",[
    'ngRoute',
    'growthChartControllers'
]);
growthChartApp.config(['$routeProvider',
    function($routeProvider){
      $routeProvider
       .when('/infants',{
            templateUrl:'partial/infant.html',    
        })
       .when('/children',{
            templateUrl:'partial/children.html',    
        })
        .otherwise({
            redirectTo: '/infants'
        });
}]);
