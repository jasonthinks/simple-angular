(function(angular) { // , $
    'use strict';
    angular.module('AnalyticsApp').controller('AnalyticsAppCtrl', [
        '$scope', '$rootScope', '$window', '$translate', 'analyticsAppConfig', 'apiMiddleware',
        function($scope, $rootScope, $window, $translate, analyticsAppConfig, ApiMiddleware) {

        var $storage = $window.localStorage;
                $scope.config = analyticsAppConfig;
                $scope.order = function(predicate) {
                    $scope.reverse = ($scope.predicate[1] === predicate) ? !$scope.reverse : false;
                    $scope.predicate[1] = predicate;
                };
                $scope.apiMiddleware = new ApiMiddleware();
                $scope.viewTemplate = $storage.getItem('viewTemplate') || 'main-icons.html';
            }
        ]);
    })(angular, jQuery);
