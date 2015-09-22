(function(){
"use strict";
    angular.module('workmanagement.login').controller('loginController',['$scope','loginService','$q','$state','$cookies','WorkManagementService',function($scope,loginService,$q,$state,$cookies,wms){
    var loginCtrl=this;
        $scope.serviceError = false;
        $scope.errorMsg = '';
        $scope.positiveMsg='';
        $scope.successMessage = false;
        loginCtrl.signInData={
                            "emailId":"",
                            "password":""
                            };
        loginCtrl.signUpData={
                            "username":"",
                            "emailId":"",
                            "password":"",
                            "confirmPassword":""
        };
        loginCtrl.submitForm = function(formMode){
            if(formMode === 'signup') {
                loginCtrl.formSignUp.$submitted = true;
                if (loginCtrl.formSignUp.$valid) {
                    var signupData = loginService.signupUser(loginCtrl.signUpData);
                    var all = $q.all([signupData]);
                    all.then(function (data) {
                        if (data[0] && data[0].result[0]) {
                            if (data[0].result[0].status === 'success') {
                                $scope.serviceError = false;
                                console.log('Registration success');
                                $scope.positiveMsg = 'Registration Successful. Please login to enter.';
                                $scope.successMessage = true;
                            } else if (data[0].result[0].status === 'failure') {
                                $scope.serviceError = true;
                                $scope.errorMsg = data[0].result[0].err_msg;
                            }
                        };
                    }, function (reject) {
                        console.log('Registration failed');
                        $scope.errorMsg = 'System currently unavailable. Please try again later.';
                        $scope.serviceError = true;
                    });
                }
            } else {
                loginCtrl.formSignIn.$submitted = true;
                if (loginCtrl.formSignIn.$valid) {
                    var userDet = loginService.validateLogin(loginCtrl.signInData);
                    var all = $q.all([userDet]);
                    all.then(function (data) {
                        if (data[0] && data[0].result[0]) {
                            if (data[0].result[0].status === 'success') {
                                $scope.serviceError = false;
                                console.log('Authetication success');
                                $cookies.put('uName',data[0].result[0].username);
                                $cookies.put('uID',data[0].result[0].userid);
                                $cookies.put('lStatus',true);
                                $state.go('dashboard');
                                wms.getCookieData();
                            } else if (data[0].result[0].status === 'failure') {
                                $scope.serviceError = true;
                                $scope.errorMsg = data[0].result[0].err_msg;
                                $cookies.remove('uName');
                                $cookies.remove('uID');
                                $cookies.remove('lStatus');
                                wms.getCookieData();
                            }
                        };
                    }, function (reject) {
                        console.log('Authetication failed');
                        $scope.errorMsg = 'System currently unavailable. Please try again later.';
                        $scope.serviceError = true;
                        $cookies.remove('uName');
                        $cookies.remove('uID');
                        wms.getCookieData();
                    });
                }
                console.log(loginCtrl.signUpData);
            }
        };
    }]);
})();
