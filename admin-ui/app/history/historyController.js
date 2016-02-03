(function() {
    "use strict";
    angular.module('workmanagement.history').controller('historyController', ['$scope', '$cookies', 'historyService','$q', function ($scope, $cookies, historyserv,$q) {
        var historyCtrl = this;
        historyserv.initDatePicker();
        $scope.noDataError = false;
        historyCtrl.selectedFromDate = '';
        historyCtrl.selectedToDate = '';
        historyCtrl.filterError = false;
        historyCtrl.filterErrorMsg = '';
        $scope.gridOptions = historyserv.initHistoryTableGrid();
        historyCtrl.showEffort = function(date){
            alert(date);
        };
        historyCtrl.processHistoryDate = function(data){
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
        historyCtrl.filterEffort = function(fromDate,toDate){
            if(fromDate ==='' && toDate !==''){
                historyCtrl.filterError = true;
                historyCtrl.filterErrorMsg = 'Please select from Date to filter';
            } else if(fromDate !=='' && toDate ===''){
                historyCtrl.filterError = true;
                historyCtrl.filterErrorMsg = 'Please select to Date to filter';
            } else if(fromDate ==='' && toDate ===''){
                historyCtrl.filterError = true;
                historyCtrl.filterErrorMsg = 'Please select from Date and to Date to filter';
            } else{
                historyCtrl.filterError = false;
                historyCtrl.filterErrorMsg = '';
                var filterData = historyserv.filterEffort(fromDate,toDate);
                /*var all = $q.all([filterData]);
                all.then(function (data) {
                    if (data[0] && data[0].status) {
                        if (data[0].status == 'success') {
                            createCtrl.selectedDate = $input.val();
                        } else {
                            $scope.serviceError = true;
                            $scope.successMessage = false;
                            $scope.errorMsg = data[0].err_msg;
                            createCtrl.selectedDate = '';
                        }
                    };
                    $('#loadingModal').foundation('reveal', 'close');
                    $('.effort-table').focus();
                }, function (reject) {
                    console.log('Registration failed');
                    $scope.successMessage = false;
                    $scope.errorMsg = data[0].err_msg || 'System currently unavailable. Please try again later.';
                    $scope.serviceError = true;
                    createCtrl.selectedDate = '';
                    $('#loadingModal').foundation('reveal', 'close');
                    $('.effort-table').focus();
                });*/
            }
        };

        $('#loadingModal').foundation('reveal', 'open');
        var historyData = historyserv.HistoryEffort();
        var all = $q.all([historyData]);
         all.then(function (data) {
         if (data[0] && data[0].status) {
         if (data[0].status == 'success') {
             var processedData = historyCtrl.processHistoryDate(data[0].results);
             $scope.gridOptions.data = processedData;
             $scope.noDataError = false;
         } else {
             $scope.noDataError = true;
             //$scope.errorMsg = data[0].err_msg;

         }
         };
         $('#loadingModal').foundation('reveal', 'close');
         }, function (reject) {
             $scope.errorMsg = data[0].err_msg || 'System currently unavailable. Please try again later.';
             $scope.serviceError = true;
             $('#loadingModal').foundation('reveal', 'close');
         });
    }]);
})();