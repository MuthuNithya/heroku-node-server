(function () {
    "use strict";
    angular.module('workmanagement.create').factory('createService',['$cookies','$state',function($cookies,$state) {
        var createserv = {};
        createserv.initDatePicker = function(){
            $('#datepicker').fdatepicker('place');
            return;
        }

        return createserv;
    }]);
})();
