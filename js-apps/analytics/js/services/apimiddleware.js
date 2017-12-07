(function(angular) {
    'use strict';
    angular.module('AnalyticsApp').service('apiMiddleware', ['$window', 'analyticsAppConfig', 'apiHandler',
        function ($window, analyticsAppConfig, ApiHandler) {

        var ApiMiddleware = function() {
            this.apiHandler = new ApiHandler();
        };

        ApiMiddleware.prototype.getPath = function(arrayPath) {
            return '/' + arrayPath.join('/');
        };

        ApiMiddleware.prototype.getFileList = function(files) {
            return (files || []).map(function(file) {
                return file && file.model.fullPath();
            });
        };

        ApiMiddleware.prototype.getFilePath = function(item) {
            return item && item.model.fullPath();
        };
        ApiMiddleware.prototype.list = function(path, customDeferredHandler) {
            return this.apiHandler.list(analyticsAppConfig.listUrl, this.getPath(path), customDeferredHandler);
        };
        return ApiMiddleware;

    }]);
})(angular);