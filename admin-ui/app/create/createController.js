(function() {
    "use strict";
    angular.module('workmanagement.create').controller('createController', ['$scope', '$cookies', 'createService', function ($scope, $cookies, createserv) {
        var wmc = this;
        createserv.initDatePicker();

    }]);
})();