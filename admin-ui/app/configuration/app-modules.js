(function(){
        "use strict";
        angular.module('workmanagement.common', []);
        angular.module('workmanagement.login', ['ngCookies']);
        angular.module('workmanagement.dashboard', ['ngCookies','chart.js']);
        angular.module('workmanagement.logout', []);
        angular.module('workmanagement.create',['ngCookies','ui.grid','ui.grid.edit','ui.grid.cellNav','ui.grid.selection']);
        angular.module('workmanagement.history',['ngCookies','ui.grid','ui.grid.pagination','ui.grid.selection']);

})();