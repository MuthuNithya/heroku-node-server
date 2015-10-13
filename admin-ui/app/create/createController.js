(function() {
    "use strict";
    angular.module('workmanagement.create').controller('createController', ['$scope', '$cookies', 'createService', function ($scope, $cookies, createserv) {
        var createCtrl = this;
        createserv.initDatePicker();
        $scope.gridOptions = createserv.initCreateTableGrid();
        createCtrl.loadEffortTable = function(){
            createserv.loadEffortTable($scope.gridOptions);
        };
        createCtrl.loadTimePicker = function(ele){
            createserv.loadTimePicker(ele);
        }
    }]);
})();