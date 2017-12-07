(function(angular) {
    'use strict';
    var app = angular.module('AnalyticsApp');
    app.directive('analyticsContent', ['$parse', 'analyticsAppConfig', function($parse, analyticsAppConfig) {
        return {
            restrict: 'E',
            templateUrl: analyticsAppConfig.tplPath + '/main.html'
        };
    }]);
})(angular);
