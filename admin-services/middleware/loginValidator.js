(function() {
// Retrieve
    var assert = require('assert');
    var mongoInst =  require("../request-handler/MongoDB.js");
    var jwt = require('jwt-simple');
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
        mongoInst.find({emailId: req.emailId}, function (err, items) {
            if(!assert.equal(null, err)){
                var item = validateFindUserQueryResult(req, items);
                if(item){
                    resObj = {
                        status: "success",
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
    // private method
    function genToken(user) {
        var expires = expiresIn(7); // 7 days
        var token = jwt.encode({
            exp: expires
        }, require('../config/secret')());
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

    function validateFindUserQueryResult(req, items) {
        var itemFound = {};
        if (items && items.length > 0) {
            for (var indx = 0; indx < items.length; indx++) {
                var item = items[indx];
                if (item && item.emailId === req.emailId) {
                    if (item.password === req.password) {
                        itemFound = item;
                    }
                }
            }
        }
        return itemFound;
    }
})();