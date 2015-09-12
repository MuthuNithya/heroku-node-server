(function(){
"use strict";
    angular.module('workmanagement.login').controller('loginController',['$scope',function($scope){
    var loginCtrl=this;
        loginCtrl.signInData={
                            "userName":"",
                            "passWord":""
                            };
        loginCtrl.signUpData={
                            "userName":"",
                            "emailID":"",
                            "passWord":"",
                            "confirmPassword":""
        };
        loginCtrl.submitForm = function(formMode){
            if(formMode === 'signup') {
                loginCtrl.formSignUp.$submitted = true;
            } else {
                loginCtrl.formSignIn.$submitted = true;
            }
            console.log(loginCtrl.signUpData);
        };
    }]);
})();
