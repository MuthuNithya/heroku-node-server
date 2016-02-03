(function () {
    "use strict";
    angular.module('workmanagement.history').factory('historyService',['$cookies','$state','$q','$http',function($cookies,$state,$q,$http) {
        var historyserv = {};
        historyserv.pagingOptions = {
            pageSize: 20,
            currentPage: 1
        };
        historyserv.filterOptions = {
            filterText: "",
            useExternalFilter: true
        };
        historyserv.initDatePicker = function () {
            $('.datepicker').datetimepicker({
                timepicker: false,
                mask: true,
                format: 'm.d.Y'
            });
            return true;
        };

        historyserv.initHistoryTableGrid = function(){
            var gridOptions;
            gridOptions= {
                data :[],
                paginationPageSizes: [20, 40, 60],
                paginationPageSize: 20,
                columnDefs: [
                    {
                        name: 'workDate',
                        displayName:'Date',
                        cellTemplate: '<a href="javascript:void(0);" ng-click="grid.appScope.historyCtrl.showEffort(row.entity.workDate);">{{row.entity.workDate}}</a>'
                    },
                    { name: 'hoursLogged',
                        displayName:'Total hours entered' },
                    { name: 'status',
                        displayName:'Status' },
                    { name: 'modifiedDate',
                        displayName:'Last modified date'}
                ]
            }

            return gridOptions;
        };

        historyserv.filterEffort=function(fromDate,toDate){
            return true;
        };

        historyserv.HistoryEffort = function(){
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/api/v1/worksheets/history',
                url:'http://localhost:3000/api/v1/worksheets/history',
                "Content-Type": "application/json",
                headers:{
                    'X-ACCESS-TOKEN': $cookies.get('tokenKey'),
                    'wm-target': 'WM_AUDIT'
                }
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;
        };
        return historyserv;
    }]);
})();