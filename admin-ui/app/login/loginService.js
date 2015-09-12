(function(){
    "use strict";
    angular.module('workmanagement.login').factory('loginService',['$http','$q',function($http,$q){
        var logicSrv={};
        logicSrv.validateLogin = function(loginDetails){
            var deferred = $q.defer();
            $http({
                method:'POST',
                url:'http://localhost:8081/auth_login',
                data:loginDetails,
                "Content-Type": "application/json",
                headers:{
                    'Access-Control-Allow-Origin': '*'
                }
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                    deferred.reject(data);
            });
            return deferred.promise;

        };
        return logicSrv;

    }]);
})();
