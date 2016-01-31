(function () {
    "use strict";

    var app = angular.module('workmanagement.create');

    var jqueryTimepicker = function(){
        return {
            restrict:'A',
            link: function (scope, element) {
                element.timepicker({
                    'timeFormat': 'H:i',
                    change: function(time) {
                        // the input field
                        var element = $(this), text;
                        // get access to this TimePicker instance
                        var timepicker = element.timepicker();
                        text = timepicker.format(time);
                        element.siblings().text(text);
                    },
                    click: function (time) {
                        var element = $(this), text;
                        // get access to this TimePicker instance
                        var timepicker = element.timepicker();
                        text = timepicker.format(time);
                        element.siblings().text(text);
                    },
                    select: function (time) {
                        var element = $(this), text;
                        // get access to this TimePicker instance
                        var timepicker = element.timepicker();
                        text = timepicker.format(time);
                        element.siblings().text(text);
                    }
                });
                element.timepicker('show');
            }
        }
    };

    app.directive("jqueryTimepicker", jqueryTimepicker);

})();