(function(){
    "use strict";
    angular.module('workmanagement.login').factory('loginService',['$http','$q',function($http,$q){
        var logicSrv={};
        logicSrv.validateLogin = function(loginDetails){
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/login',
                url:'http://localhost:3000/login',
                data:loginDetails,
                "Content-Type": "application/json"/*,
                headers:{
                    'Access-Control-Allow-Origin': '*'
                }*/
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                    deferred.reject(data);
            });
            return deferred.promise;

        };
        logicSrv.signupUser = function(signupDet){
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/signup',
                url:'http://localhost:3000/signup',
                data:signupDet,
                "Content-Type": "application/json"/*,
                headers:{
                    'Access-Control-Allow-Origin': '*'
                }*/
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
