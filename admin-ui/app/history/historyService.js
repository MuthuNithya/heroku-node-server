(function () {
    "use strict";
    angular.module('workmanagement.history').factory('historyService',['$cookies','$state',function($cookies,$state) {
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
                paginationPageSizes: [20, 40, 60],
                paginationPageSize: 20,
                columnDefs: [
                    { name: 'Date' },
                    { name: 'TotalHoursEntered' },
                    { name: 'Status' },
                    { name: 'LastModifiedDate' }
                ]
            }
            gridOptions.data =[
                {Date: "01/01/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/02/2016",TotalHoursEntered: 7,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/03/2016",TotalHoursEntered: 9,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/04/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/05/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/06/2016",TotalHoursEntered: 5,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/07/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/08/2016",TotalHoursEntered: 10,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/09/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/10/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/11/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/12/2016",TotalHoursEntered: 9,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/13/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/14/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/15/2016",TotalHoursEntered: 5,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/16/2016",TotalHoursEntered: 8,Status: "Saved", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/17/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/18/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/19/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/20/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/21/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/22/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/23/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'},
                {Date: "01/24/2016",TotalHoursEntered: 0,Status: "Yet to complete", LastModifiedDate: '01/05/2016 14:00'}
            ];

            return gridOptions;
        };
        return historyserv;
    }]);
})();