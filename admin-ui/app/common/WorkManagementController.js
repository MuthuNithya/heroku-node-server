/**
 * Created by MS453 on 8/16/2015.
 */
(function(){
    "use strict";
    angular.module('workmanagement').controller('WorkManagementController',['$scope','$cookies','WorkManagementService',function($scope,$cookies,wms){
        var wmc = this;
        wmc.currentUser = wms.getCookieData();
        wmc.logout = function(){
            wms.logout();
        }
        wmc.topNavClick= function (linkid) {
            wms.topNavClick(linkid);
        }
        $scope.$watch(function() {
            return $cookies.get('uName');
        }, function(newValue, oldValue) {
            console.log("change detected: " + newValue)
            wmc.currentUser = wms.getCookieData();
            console.log('wmc.currentUser',wmc.currentUser);
        });
    }]);
})();
