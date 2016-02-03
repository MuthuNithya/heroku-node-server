(function() {
    "use strict";
    angular.module('workmanagement.create').controller('createController', ['$scope', '$cookies', 'createService','$q','uiGridConstants', function ($scope, $cookies, createserv,$q,uiGridConstants) {
        var createCtrl = this;
        $scope.deleteRow;
        createCtrl.selectedDate='';
        createCtrl.existingDate=false;
        $scope.gridOptions = createserv.initCreateTableGrid();
        createCtrl.IsEditable = true;
        createCtrl.readOnly = false;
        $('#datepicker').datetimepicker({
            timepicker:false,
            mask:true,
            format:'m.d.Y',
            onSelectDate:function(dp,$input){
                $('#loadingModal').foundation('reveal', 'open');
                var fetchEffort = createserv.fetchEffort($input.val());
                var all = $q.all([fetchEffort]);
                all.then(function (data) {
                    if (data[0] && data[0].status) {
                        if (data[0].status == 'success') {
                            $scope.serviceError = false;
                            $scope.successMessage = false;
                            createCtrl.existingDate=false;
                            $('.effort-table').focus();
                        } else {
                            $scope.serviceError = false;
                            $scope.successMessage = false;
                            createCtrl.existingDate=true;
                            $('#dataAlreadyExist').focus()
                        }
                    };
                    $('#loadingModal').foundation('reveal', 'close');
                }, function (reject) {
                    console.log('Registration failed');
                    $scope.successMessage = false;
                    $scope.errorMsg = data[0].err_msg || 'System currently unavailable. Please try again later.';
                    $scope.serviceError = true;
                    $('#loadingModal').foundation('reveal', 'close');
                    $('.page-level-error').focus();
                });
            }
        });
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
                if(gridData[i].description === '' || gridData[i].description === 'Enter description here....' || gridData[i]._fromTime === '' || gridData[i]._toTime === ''){
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
                        x1 = createCtrl.convertTime(gridData[i]._fromTime);
                        x2 = createCtrl.convertTime(gridData[i]._toTime);
                        y1 = createCtrl.convertTime(gridData[j]._fromTime);
                        y2 = createCtrl.convertTime(gridData[j]._toTime);
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
        createCtrl.mapFromTime=function(date,row,fromTime){
            var dateTime = new Date(date+' '+fromTime);
            row.fromTime = moment.utc(dateTime).valueOf();
            return;
        };
        createCtrl.mapToTime=function(date,row,toTime){
            var dateTime = new Date(date+' '+toTime);
            row.toTime = moment.utc(dateTime).valueOf();
            return;
        };
        $scope.cleareffort = function() {
            $scope.gridOptions.data.length=0;
            $('#btnCreateTimeSheet').addClass('hide');
            $('.error-msg').addClass('hide');
            $('#divDeleteEffortbtn').addClass('hide');
            $('#divCancelModal').foundation('reveal','close');
            $scope.successMessage = false;
            $scope.serviceError = false;
        };
        $scope.submitEffort = function(){
            if(createCtrl.validateGridDataEmpty($scope.gridOptions.data)) {
                if(createCtrl.validateEffortData($scope.gridOptions.data)){
                    $('#loadingModal').foundation('reveal', 'open');
                    var createEffort = createserv.saveEffort(moment.utc(createCtrl.selectedDate).valueOf(),$scope.gridOptions.data);
                    var all = $q.all([createEffort]);
                    all.then(function (data) {
                        if (data[0] && data[0].status) {
                            if (data[0].status == 200) {
                                $scope.successMessage = true;
                                $scope.positiveMsg = data[0].message;
                                $('.error-msg').addClass('hide');
                                $scope.serviceError = true;
                                $scope.successMessage = false;
                                $scope.serviceError = false;
                                $('#btnCreateTimeSheet').removeClass('hide');
                                createserv.setIsEditable(false);
                                $scope.isReadMode = true;
                                $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
                            } else {
                                $scope.errorMsg = data[0].err_msg || data[0].message;
                            }
                        };
                        $('#loadingModal').foundation('reveal', 'close');
                    }, function (reject) {
                        console.log('Registration failed');
                        $scope.successMessage = false;
                        $scope.errorMsg = 'System currently unavailable. Please try again later.';
                        $scope.serviceError = true;
                        $('#loadingModal').foundation('reveal', 'close');
                    });
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
        };
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
            $scope.serviceError = false;
            $('#divDeleteEffortbtn').addClass('hide');
        };
    }]);
})();