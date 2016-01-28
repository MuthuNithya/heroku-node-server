(function() {
// Retrieve
    var assert = require('assert');
    var mongoCreateInst =  require("../request-handler/MongoDB.js").user;
    var jwt = require('jwt-simple');
    var Q = require('q');
    module.exports = {
        authorizeUser:authorizeUser
    };
    function authorizeUser(mode, req, res){
        var resData;
        /*MongoClient.connect("mongodb://MuthuNithya:862014@ds033143.mongolab.com:33143/dreamlion", function (err, db) {
            if (!err) {
                console.log("We are connected");
            }
            var collection = db.collection("master_userlist");*/
            switch (mode){
                case 'login':
                    resData = authorizeLogin(req,res);
                    return resData;
                    break;
                case 'signup':
                    resData = createUser(req,res);
                    return resData;
                    break;
                case 'authorize':
                    resData = validateUserAuthorization(req);
                    return resData;
                break;
            }
       // });
    }
    function authorizeLogin(req,res){
        var resObj = {};
        mongoCreateInst.find({emailId: req.emailId}, function (err, items) {
            if(!assert.equal(null, err)){
                var item = validateFindUserQueryResult(req, items);
                if(item && item._id){
                    resObj = {
                        "status": "success",
                        username: item.username,
                        userid: item._id
                    };
                    resObj = genToken(resObj);
                    console.log('step1 ',resObj);
                } else{
                        //emailId is invalid
                        resObj = {
                            "status": "failure",
                            "err_msg": "EmailId/Password is invalid"
                        };
                        console.log('step2 ',resObj);
                }
            }else if (err){
                resObj = {
                    "status": "failure",
                    "err_msg": "Unexpected Service Failure",
                    "err_field": "login"
                };
                console.log('step3 ',resObj);
            }
            res.status(200);
            res.json(resObj);
        });
    }

    function createUser(req, res){
        var resObj = {};
        //duplicate check
        mongoCreateInst.find({emailId: req.emailId}, function (err, item) {
            if(item && item.length > 0){
                res.status(200);
                res.json({
                    "status": "failure",
                    "message": "emailId already exists",
                    "err_field": "emailId"
                });

            }else{
                // Insert a single document
                if(req.emailId && req.password && req.username){
                    var newUser = mongoCreateInst(req);
                    newUser.save([req], function (err, result) {
                        if(!assert.equal(null, err)){
                            res.json({
                                "status":200,
                                "message":"Signup successful"
                            });
                        }else if (err){
                            res.status(401);
                            res.json({
                                "status": 401,
                                "message": "Invalid credentials"
                            });
                        }
                    });
                }
            }
        });
    }
    // private method
    function genToken(user) {
        var expires = expiresIn(7); // 7 days
        var payloadTokenObj = {exp:expires,userid:user.userid};
        var token = jwt.encode(payloadTokenObj, require('../config/secret')());
        return{
            token: token,
            expires: expires,
            user: user
        };
    }
    function expiresIn(numDays) {
        var dateObj = new Date();
        return dateObj.setDate(dateObj.getDate() + numDays);
    }

    function validateFindUserQueryResult(req, items, validatorKey) {
        var itemFound = {};
        if (items && items.length > 0) {
            for (var indx = 0; indx < items.length; indx++) {
                var item = items[indx];
                if(!validatorKey){
                    if (item && item.emailId === req.emailId) {
                        if (item.password === req.password) {
                            itemFound = item;
                        }
                    }
                }else if(validatorKey){
                    if (item && item[validatorKey] === req) {
                        itemFound = item;
                    }
                }
            }
        }
        return itemFound;
    }

    function validateUserAuthorization(userid){
        var resObj = mongoCreateInst.find({userid: userid}, function (err, items) {
            if(!assert.equal(null, err)){
                var item = validateFindUserQueryResult(userid, items, 'userid');
                if(item && item._id){
                    resObj = {
                        "status": "success"
                    };
                } else{
                    //emailId is invalid
                    resObj = {
                        "status": "failure",
                        "severity": "error",
                        "err_msg": "Invalid Request"
                    };
                    console.log('step2 ',resObj);
                }
            }else if (err){
                resObj = {
                    "status": "failure",
                    "severity": "error",
                    "err_msg": "Unexpected Service Failure"
                };
                console.log('step3 ',resObj);
            }
        });
        var all = Q.all([resObj]);
        all.then(function(data){
            return data;
        });
    }
})();