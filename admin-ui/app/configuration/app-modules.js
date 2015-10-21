(function(){
        "use strict";
        angular.module('workmanagement.common', []);
        angular.module('workmanagement.login', ['ngCookies']);
        angular.module('workmanagement.dashboard', ['ngCookies']);
        angular.module('workmanagement.logout', []);
        angular.module('workmanagement.create',['ngCookies','ui.grid','ui.grid.edit','ui.grid.cellNav','ui.grid.selection']);
    })();