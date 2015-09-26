(function() {
    "use strict";
    angular.module('workmanagement.dashboard').factory('dashboardService', ['$http', '$q', function ($http, $q) {
        var dashboardSrv = {};
        dashboardSrv.triggerTopNav = function(){
            $('a#ancHome').addClass('Selected');
            $('a#ancCreateWorksheet').removeClass('Selected');
            $('a#ancHistory').removeClass('Selected');
            return;
        };
        return dashboardSrv;
    }]);
})();