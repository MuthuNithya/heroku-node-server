(function() {
    "use strict";
    angular.module('workmanagement.create').controller('createController', ['$scope', '$cookies', 'createService', function ($scope, $cookies, createserv) {
        var createCtrl = this;
        $scope.deleteRow;
        createserv.initDatePicker();
        $scope.gridOptions = createserv.initCreateTableGrid();
        createCtrl.loadEffortTable = function(){
            if(createCtrl.validateGridDataEmpty($scope.gridOptions.data)) {
                $scope.gridOptions.data.push(angular.copy(createserv.addEffortObj));
                $('.error-msg').addClass('hide');
                $('#btnCreateTimeSheet').removeClass('hide');
                return true;
            } else{
                $('.error-msg span').text('Please fill all column/s in effort table before adding new effort.');
                $('.error-msg').removeClass('hide');
            }
        };
        createCtrl.loadTimePicker = function(ele){
            createserv.loadTimePicker(ele);
        };
        createCtrl.validateGridDataEmpty = function(gridData){
            var gridlength = gridData.length;
            for( var i = 0; i<gridlength;i++){
                if(gridData[i].description === '' || gridData[i].description === 'Enter description here....' || gridData[i].fromTime === '' || gridData[i].toTime === ''){
                    return false;
                }
            }
            return true;
        };
        createCtrl.cancelEfforts = function(){
            $('#divCancelModal').foundation('reveal','open');
        };
        $scope.cleareffort = function() {
            $scope.gridOptions.data.length=0;
            $('#btnCreateTimeSheet').addClass('hide');
            $('.error-msg').addClass('hide');
            $('#divCancelModal').foundation('reveal','close');
        }
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.deleteRow = gridApi.selection.getSelectedRows();
                if($scope.deleteRow.length>0){
                    $('#divDeleteEffortbtn').removeClass('hide');
                } else{
                    $('#divDeleteEffortbtn').addClass('hide');
                }
            });
        };
        createCtrl.deleteRows = function(){
            angular.forEach($scope.deleteRow, function (data, index) {
                $scope.gridOptions.data.splice($scope.gridOptions.data.lastIndexOf(data), 1);
            });
            $('#divDeleteEffortbtn').addClass('hide');
        };
    }]);
})();