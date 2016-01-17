(function(){
    "use strict";
    angular.module('workmanagement.dashboard').controller('dashboardController',['$scope','dashboardService','$q','$state','$cookies','WorkManagementService',function($scope,dashboardService,$q,$state,$cookies,wms) {
        var dashboardCtrl = this;
        dashboardService.triggerTopNav();

        $scope.labels = ['01/01/2016', '01/02/2016', '01/03/2016', '01/04/2016', '01/05/2016', '01/06/2016', '01/07/2016'];
        $scope.series = ['Total efforts in hrs'];

        $scope.data = [
            [8, 7, 8, 6, 8, 9, 8]
        ];
    }]);
})();