(function(){
"use strict";
    angular.module('workmanagement.login').controller('loginController',['$scope','loginService','$q',function($scope,loginService,$q){
    var loginCtrl=this;
        loginCtrl.currentUser={
            "userName":"",
            "userId":""
        };
        loginCtrl.signInData={
                            "emailId":"",
                            "password":""
                            };
        loginCtrl.signUpData={
                            "userName":"",
                            "emailId":"",
                            "password":"",
                            "confirmPassword":""
        };
        loginCtrl.submitForm = function(formMode){
            if(formMode === 'signup') {
                loginCtrl.formSignUp.$submitted = true;
                if (loginCtrl.formSignUp.$valid) {

                }
            } else {
                loginCtrl.formSignIn.$submitted = true;
                if (loginCtrl.formSignIn.$valid) {
                    var userDet = loginService.validateLogin(loginCtrl.signInData);
                    var all = $q.all([userDet]);
                    all.then(function (data) {
                        if (data && data.length > 0) {
                            if (data[0].status === 'success') {
                                loginCtrl.currentUser.userId = data[0].userid;
                                loginCtrl.currentUser.userName = data[0].username;
                                $scope.serviceError = false;
                                console.log('Authetication success');
                            } else if (data[0].status === 'failure') {
                                $scope.serviceError = true;
                                $scope.errorMsg = data[0].err_msg;
                            }
                        }
                        ;
                    }, function (reject) {
                        console.log('Authetication failed');
                        $scope.errorMsg = 'System currently unavailable. Please try again later.';
                        $scope.serviceError = true;
                    });
                }
                console.log(loginCtrl.signUpData);
            }
        };
    }]);
})();
