(function() {
    "use strict";
    angular.module('workmanagement.history').controller('historyController', ['$scope', '$cookies', 'historyService', function ($scope, $cookies, historyserv) {
        var historyCtrl = this;
        historyserv.initDatePicker();
        $scope.gridOptions = historyserv.initHistoryTableGrid();
    }]);
})();