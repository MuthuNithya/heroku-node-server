(function(){
"use strict";
    angular.module('workmanagement.login').controller('loginController',['$scope','loginService','$q',function($scope,loginService,$q){
    var loginCtrl=this;
        loginCtrl.currentUser={};
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
                var userDet = loginService.validateLogin(loginCtrl.signInData);
                var all=$q.all([userDet]);
                all.then(function(data){
                    if(data && data.result[0]){
                        loginCtrl.currentUser = data.result[0];
                    };
                },function(reject){
                    console.log('Authetication failed');
                });
            }
            console.log(loginCtrl.signUpData);
        };
    }]);
})();
