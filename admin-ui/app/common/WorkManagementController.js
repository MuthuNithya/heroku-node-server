/**
 * Created by MS453 on 8/16/2015.
 */
(function(){
    "use strict";
    angular.module('workmanagement').controller('WorkManagementController',['$scope',function($scope){
        var wmc = this;
        $scope.serviceError = false;
        $scope.errorMsg = '';
        $scope.positiveMsg='';
        $scope.successMessage = false;
    }]);
})();
