(function(){
    angular.module('app',['ui.router']).config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('home');
        });
        $urlRouterProvider.when('/dashboard','dashboard');
        $urlRouterProvider.when('/create','create');
        $urlRouterProvider.when('/history','history');

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'app/login/login.html',
                controller:'workManagementController'
            })
            .state('dashboard',{
                url:'/dashboard',
                templateUrl:'app/dashboard/dashboard.html',
                controller: ''
            })
            .state('create',{
                url:'/create',
                templateUrl:'app/create/create.html',
                controller: ''
            })
            .state('history',{
                url:'/history',
                templateUrl:'app/history/history.html',
                controller: ''
            })
            .state('logout',{
                url:'/logged-out',
                templateUrl:'app/logout/logout.html',
                controller: ''
            })

    }]);
})();