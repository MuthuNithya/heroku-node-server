(function() {
    "use strict";
    angular.module('workmanagement.logout').controller('logoutController', ['$scope', 'WorkManagementService','logoutService', function ($scope, wms,los) {
        var loc = this;
        wms.deleteCookieData();
        loc.loginagain=function(){
            los.loadhomepage();
        };

    }]);
})();