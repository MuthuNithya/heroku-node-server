(function () {
    "use strict";
    angular.module('workmanagement.create').factory('createService',['$cookies','$state',function($cookies,$state) {
        var createserv = {};
        createserv.addEffortObj = {'fromTime':'','toTime':'','description':'Enter description here....'};
        createserv.initDatePicker = function(){
            $('#datepicker').datetimepicker({
                timepicker:false,
                mask:true,
                format:'m.d.Y'
            });
            return true;
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
                enableHiding: false,
                columnDefs: [
                    {
                        field: 'fromTime',
                        displayName: 'From',
                        resizable: false,
                        enableHiding: false,
                        width: '15%',
                        cellClass:'fromTime',
                        enableCellEdit: true,
                        editableCellTemplate:'<input type="text" class="time" jquery-timepicker="" ng-model="row.entity.fromTime"/>'
                    },
                    {
                        field: 'toTime',
                        displayName: 'To',
                        resizable: false,
                        enableHiding: false,
                        width: '15%',
                        cellClass:'toTime',
                        enableCellEdit: true,
                        editableCellTemplate:'<input type="text" class="time" jquery-timepicker="" ng-model="row.entity.toTime"/>'
                    },
                    {
                        field: 'description',
                        displayName: 'Effort Description',
                        resizable: false,
                        enableHiding: false,
                        type: 'string',
                        width: '65%',
                        cellClass:'effortDesc'
                    }
                ]};
        };
        return createserv;
    }]);
})();
