/**
 * Created by nithya_r04 on 16/08/15.
 */
(function(){
    var app=angular.module('app',['ng-route','workmanagement.common']);
    app.config(['$routeProvider'],function($routeProvider){
        $routeProvider.
            when('/', {
                templateUrl: 'login/login.html',
                controller: 'LoginController'
            }).
            otherwise({
                redirectTo: '/'
            });
    });
})();