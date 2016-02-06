(function(){
    "use strict";
    angular.module('workmanagement.dashboard').controller('dashboardController',['$scope','dashboardService','$q','$state','$cookies','WorkManagementService',function($scope,dashboardService,$q,$state,$cookies,wms) {
        var dashboardCtrl = this;
        $scope.recentActivity='';
        $scope.serviceError = false;
        $scope.successMessage = false;
        $scope.noDataRet = false;
        dashboardService.triggerTopNav();
        dashboardCtrl.processHistoryDate = function(data){
            var processData = [];
            var modifiedData ={'workDate':'','hoursLogged':'','status':'','modifiedDate':''};
            angular.forEach(data,function(value,key){
                if(value.workDate){
                    modifiedData.workDate = moment(value.workDate).format('MM-DD-YYYY');
                }
                if(value.hoursLogged) {
                    modifiedData.hoursLogged =value.hoursLogged;
                }
                if(value.status) {
                    modifiedData.status = value.status;
                }
                if(value.modifiedDate) {
                    modifiedData.modifiedDate = moment(value.modifiedDate).format('MM-DD-YYYY HH:MM');
                }
                processData.push(modifiedData);
                modifiedData ={'workDate':'','hoursLogged':'','status':'','modifiedDate':''};
            });
            return processData;
        };
        dashboardCtrl.extractChartDate = function(workData){
            var processDate = '';
            angular.forEach(workData,function(value,key){
                if(value.workDate){
                    if(processDate != '') {
                        processDate = processDate + "," + moment(value.workDate).format('MM-DD-YYYY');
                    } else{
                        processDate = moment(value.workDate).format('MM-DD-YYYY');
                    }
                }
            });
            return processDate.replace('"','');
        };
        dashboardCtrl.extractChartHours = function(workData){
            var processHours = '';
            angular.forEach(workData,function(value,key){
                if(value.hoursLogged) {
                    if(processHours != '') {
                        processHours = processHours + "," + value.hoursLogged;
                    } else{
                        processHours = value.hoursLogged;
                    }
                }
            });
            return processHours.replace('"','');
        };
        $('#loadingModal').foundation('reveal', 'open');
        var fetchedData = dashboardService.fetchActivity();
        var all = $q.all([fetchedData]);
        all.then(function (data) {
            if (data[0] && data[0].status) {
                if (data[0].status == 'success') {
                    $scope.recentActivity = dashboardCtrl.processHistoryDate(data[0].results);
                    var labels = dashboardCtrl.extractChartDate(data[0].results);
                    $scope.labels = labels.split(',');
                    $scope.series = ['Total efforts in hrs'];
                    var data = dashboardCtrl.extractChartHours(data[0].results);
                    $scope.data = [ data.split(',') ];
                    //$scope.data = '['+dashboardCtrl.extractChartHours(data[0].results)+']';
                    $scope.serviceError = false;
                    $scope.noDataRet = false;
                    $scope.successMessage = false;
                } else {
                    //$scope.errorMsg = data[0].err_msg || data[0].message;
                    $scope.successMessage = false;
                    $scope.serviceError = false;
                    $scope.noDataRet = true;
                }
            };
            $('#loadingModal').foundation('reveal', 'close');
        }, function (reject) {
            $scope.successMessage = false;
            $scope.errorMsg = 'System currently unavailable. Please try again later.';
            $scope.serviceError = true;
            $scope.noDataRet = false;
            $('#loadingModal').foundation('reveal', 'close');
        });
    }]);
})();