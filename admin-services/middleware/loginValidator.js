(function() {
// Retrieve
    var assert = require('assert');
    var mongoInst =  require("../request-handler/MongoDB.js");
    module.exports = {
        authorizeLogin:validateUser
    };
    function validateUser(mode, req, res){
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
            }
       // });
    }
    function authorizeLogin(req,res){
        var resObj = {};
        mongoInst.find({emailId: req.emailId}, function (err, item) {
            if(!assert.equal(null, err)){
                if(item && item.emailId === req.emailId){
                    console.log('item ',item);
                    if(item.password === req.password){
                        resObj = {
                            status: "success",
                            username: item.username,
                            userid: item._id
                        };
                        console.log('step1 ',resObj);
                    } else{
                        //emailId is invalid
                        resObj = {
                            "status": "failure",
                            "err_msg": "EmailId/Password is invalid"
                        };
                        console.log('step2 ',resObj);
                    }
                }else{
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
        mongoInst.find({emailId: req.emailId}, function (err, item) {
            if(item && item.emailId === req.emailId){
                res.status(401);
                res.json({
                    "status": "failure",
                    "err_msg": "emailId already exists",
                    "err_field": "emailId"
                });

            }else{
                // Insert a single document
                if(req.emailId && req.password && req.username){
                    var newUser = mongoInst(req);
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
                    })
                }
            }
        });
    }
})();