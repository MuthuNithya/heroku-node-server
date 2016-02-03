(function () {
    "use strict";
    angular.module('workmanagement.create').factory('createService',['$cookies','$state','$http','$q',function($cookies,$state,$http,$q) {
        var createserv = {};
        createserv.isEditable = true;
        createserv.addEffortObj = {'fromTime':'','_fromTime':'','toTime':'','_toTime':'','description':'Enter description here....'};
        createserv.setIsEditable = function(val){
            createserv.isEditable = val;
        };
        createserv.fetchEffort = function(date){
            var selectedWorkDate = {"workDate":moment.utc(date).valueOf()};
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/api/v1/worksheets/create',
                url:'http://localhost:3000/api/v1/worksheets/create',
                data:selectedWorkDate,
                "Content-Type": "application/json",
                headers:{
                    'X-ACCESS-TOKEN': $cookies.get('tokenKey'),
                    'wm-target': 'WM_VALIDATE_DATE'
                }
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;
        };
        createserv.initCreateTableGrid = function() {
            var gridOptions;
            return gridOptions = {
                data :[],
                enableSorting: false,
                enableCellEditOnFocus: true,
                enableColumnMenus:false,
                enableRowSelection: true,
                enableSelectAll: false,
                enableFiltering: false,
                cellEditableCondition:function($scope){
                    return !$scope.grid.appScope.isReadMode;
                },
                exporterSuppressColumns : [ '_fromTime','_toTime' ],
                columnDefs: [
                    {
                        field: '_fromTime',
                        displayName: 'From',
                        resizable: false,
                        width: '25%',
                        cellClass:'fromTime',
                        editableCellTemplate:'<input type="text" class="time" jquery-timepicker="" ng-model="row.entity._fromTime" ng-change="grid.appScope.createCtrl.mapFromTime(grid.appScope.createCtrl.selectedDate,row.entity,row.entity._fromTime);"/>'
                    },
                    {
                        field: '_toTime',
                        displayName: 'To',
                        resizable: false,
                        width: '25%',
                        cellClass:'toTime',
                        editableCellTemplate:'<input type="text" class="time" jquery-timepicker="" ng-model="row.entity._toTime" ng-change="grid.appScope.createCtrl.mapToTime(grid.appScope.createCtrl.selectedDate,row.entity,row.entity._toTime);"/>'
                    },
                    {
                        field: 'description',
                        displayName: 'Effort Description',
                        resizable: false,
                        enableHiding: false,
                        type: 'string',
                        width: '45%',
                        cellClass:'effortDesc',
                        editableCellTemplate:'<input type="text" class="description" ng-model="row.entity.description"/>'
                    }
                ]};
        };
        createserv.saveEffort = function(workDate,workData){
            var createEffortDate = {"workDate":workDate,"workData":workData};
            var deferred = $q.defer();
            $http({
                method:'POST',
                //url:'https://heroku-node-server.herokuapp.com/api/v1/worksheets/create',
                url:'http://localhost:3000/api/v1/worksheets/create',
                data:createEffortDate,
                "Content-Type": "application/json",
                 headers:{
                 'X-ACCESS-TOKEN': $cookies.get('tokenKey'),
                     'wm-target': 'WM_CREATE'
                 }
            }).success(function(data){
                deferred.resolve(data);
            }).error(function(data){
                deferred.reject(data);
            });
            return deferred.promise;

        };
        return createserv;
    }]);
})();
