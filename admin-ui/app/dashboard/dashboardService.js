(function() {
    "use strict";
    angular.module('workmanagement.dashboard').factory('dashboardService', ['$http', '$q','$cookies', function ($http, $q,$cookies) {
        var dashboardSrv = {};
        dashboardSrv.triggerTopNav = function(){
            $('a#ancHome').addClass('Selected');
            $('a#ancCreateWorksheet').removeClass('Selected');
            $('a#ancHistory').removeClass('Selected');
            return;
        };
        dashboardSrv.fetchActivity = function(){
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/api/v1/worksheets/summary',
                url:'http://localhost:3000/api/v1/worksheets/summary',
                "Content-Type": "application/json",
                headers:{
                    'X-ACCESS-TOKEN': $cookies.get('tokenKey'),
                    'wm-target': 'WM_SUMMARY'
                }
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;
        };
        return dashboardSrv;
    }]);
})();