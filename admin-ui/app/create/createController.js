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
        createCtrl.validateEffortData = function(gridData){
            var gridlength = gridData.length;
            var x1,x2,y1,y2;
            for( var i = 0; i<gridlength;i++) {
                for (var j = 0; j < gridlength; j++) {
                    if(i !== j) {
                        x1 = createCtrl.convertTime(gridData[i].fromTime);
                        x2 = createCtrl.convertTime(gridData[i].toTime);
                        y1 = createCtrl.convertTime(gridData[j].fromTime);
                        y2 = createCtrl.convertTime(gridData[j].toTime);
                        if (createCtrl.isOverlapping(x1,x2,y1,y2) || x1 > x2 || y1 > y2 ) {
                            return false;
                        }
                    }
                }
            }
            return true;
        };
        createCtrl.isOverlapping =function(x1,x2,y1,y2){
            return x1 < y2 && y1 < x2;
        };
        createCtrl.convertTime = function(timeval){
            timeval = timeval.replace(':','.');
            return (Number(timeval.toString().split('.')[0]) * 60) + Number(timeval.toString().split('.')[1]);
        };
        createCtrl.cancelEfforts = function(){
            $('#divCancelModal').foundation('reveal','open');
        };
        $scope.cleareffort = function() {
            $scope.gridOptions.data.length=0;
            $('#btnCreateTimeSheet').addClass('hide');
            $('.error-msg').addClass('hide');
            $('#divDeleteEffortbtn').addClass('hide');
            $('#divCancelModal').foundation('reveal','close');
            $scope.successMessage = false;
        };
        $scope.submitEffort = function(){
            if(createCtrl.validateGridDataEmpty($scope.gridOptions.data)) {
                if(createCtrl.validateEffortData($scope.gridOptions.data)){
                    console.log('Success');
                    $scope.successMessage = true;
                    $scope.positiveMsg = 'Efforts saved successfully.';
                    $('.error-msg').addClass('hide');
                    $('#btnCreateTimeSheet').removeClass('hide');
                    return true;
                } else{
                    $scope.successMessage = false;
                    $('.error-msg span').text('Please correct from time and to time entered in all column/s.');
                    $('.error-msg').removeClass('hide');
                }
            } else{
                $scope.successMessage = false;
                $('.error-msg span').text('Please fill all column/s in effort table before adding new effort.');
                $('.error-msg').removeClass('hide');
            }
        }
        $scope.gridOptions.onRegisterApi = function (gridApi) {
            $scope.gridApi = gridApi;
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.deleteRow = gridApi.selection.getSelectedRows();
                $scope.successMessage = false;
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
            $scope.successMessage = false;
            $('#divDeleteEffortbtn').addClass('hide');
        };
    }]);
})();