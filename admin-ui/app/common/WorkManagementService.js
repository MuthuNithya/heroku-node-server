(function () {
    "use strict";
    angular.module('workmanagement').factory('WorkManagementService',['$cookies','$state',function($cookies,$state){
        var wms={};
        wms.getCookieData=function(){
            var currentUser={
                "userName":"",
                "userID":"",
                "loginStatus":false
            };
            currentUser.userName = $cookies.get('uName');
            currentUser.userID = $cookies.get('uID');
            currentUser.loginStatus = $cookies.get('lStatus');

            return currentUser;
        };
        wms.deleteCookieData=function(){
            var currentUser={
                "userName":"",
                "userID":"",
                "loginStatus":false
            };
            $cookies.remove('uName');
            $cookies.remove('uID');
            $cookies.remove('lStatus');

            return currentUser;
        };
        wms.logout=function(){
            $state.go('logout');
        }
        return wms;
    }]);
})();