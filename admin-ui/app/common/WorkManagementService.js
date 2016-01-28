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
        wms.topNavClick=function(linkid){
            if($(linkid).hasClass('Selected')){
                return;
            } else{
                if(linkid === '#ancHome'){
                    $state.go('dashboard');
                    $('a#ancHome').addClass('Selected');
                    $('a#ancCreateWorksheet').removeClass('Selected');
                    $('a#ancHistory').removeClass('Selected');
                } else if(linkid === '#ancCreateWorksheet'){
                    $state.go('create');
                    $('a#ancHome').removeClass('Selected');
                    $('a#ancCreateWorksheet').addClass('Selected');
                    $('a#ancHistory').removeClass('Selected');
                } else if(linkid === '#ancAbout') {
                    $state.go('about');
                    $('a#ancHome').removeClass('Selected');
                    $('a#ancCreateWorksheet').removeClass('Selected');
                    $('a#ancHistory').removeClass('Selected');
                } else if(linkid === '#ancContactUs') {
                    $state.go('contactus');
                    $('a#ancHome').removeClass('Selected');
                    $('a#ancCreateWorksheet').removeClass('Selected');
                    $('a#ancHistory').removeClass('Selected');
                } else if(linkid === '#ancLogin') {
                    $state.go('login');
                } else {
                    $state.go('history');
                    $('a#ancHome').removeClass('Selected');
                    $('a#ancCreateWorksheet').removeClass('Selected');
                    $('a#ancHistory').addClass('Selected');
                }
                return;
            }
        }
        return wms;
    }]);
})();