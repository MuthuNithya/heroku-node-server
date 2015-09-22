(function () {
    "use strict";
    angular.module('workmanagement.logout').factory('logoutService', ['$state',function ($state) {
        var logoutserv = {};
        logoutserv.loadhomepage = function () {
            $state.go('login');
        }
        return logoutserv;
    }]);
})();
