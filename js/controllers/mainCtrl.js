(function(angular, $) {
'use strict';
angular.module('myApp').controller('mainCtrl', [
    '$scope', '$rootScope', '$window', '$translate',
    function($scope, $rootScope, $window, $translate) {
      var $storage = $window.localStorage;

          $scope.changeLanguage = function (locale) {
          if (locale) {
              $storage.setItem('language', locale);
              return $translate.use(locale);
          }
          $translate.use($storage.getItem('language') || 'en');
      };
    }]);
  })(angular, jQuery);
