(function(angular) { // , $
    'use strict';
    angular.module('AnalyticsApp').service('apiHandler', ['$http', '$q', //'$window',
        function ($http, $q) {// , $window

            $http.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

            var ApiHandler = function() {
                this.inprocess = false;
                this.asyncSuccess = false;
                this.error = '';
            };

            ApiHandler.prototype.deferredHandler = function(data, deferred, code, defaultMsg) {
                var self = this;
                if (!data || typeof data !== 'object') {
                    self.error = 'Error %s - Bridge response error, please check the API docs or this ajax response.'.replace('%s', code);
                }
                if (code == 404) {
                    self.error = 'Error 404 - Backend bridge is not working, please check the ajax response.';
                }
                if (data.result && typeof data.result.error != 'undefined' && data.result.error) {
                    self.error = data.result.error;
                }
                if (!self.error && data.error) {
                    self.error = data.error.message;
                }
                if (!self.error && defaultMsg) {
                    self.error = defaultMsg;
                }
                if (self.error) {
                    return deferred.reject(data);
                }
                return deferred.resolve(data);
            };

            ApiHandler.prototype.list = function(apiUrl, path, customDeferredHandler) {
                var self = this;
                var dfHandler = customDeferredHandler || self.deferredHandler;
                var deferred = $q.defer();
                var data = {
                    action: 'list',
                    path: path
                };

                self.inprocess = true;
                self.error = '';

                $http.post(apiUrl, data).success(function(data, code) {
                    dfHandler(data, deferred, code);
                }).error(function(data, code) {
                    dfHandler(data, deferred, code, 'Unknown error listing, check the response');
                })['finally'](function() {
                    self.inprocess = false;
                });
                return deferred.promise;
            };

        return ApiHandler;

    }]);
})(angular, jQuery);