var Q = require('q');
var repoConnect = require('../middleware/loginValidator.js');
var auth = {
    login: function(req, res) {
        var emailId = req.body.emailId || '';
        var password = req.body.password || '';
        if (emailId == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
// Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validateLogin(req, res);
        /*if (!dbUserObj) { // If authentication fails, we send a 401 back

        }
        if (dbUserObj) {
// If authentication is success, we will generate a token
// and dispatch it to the client
            //res.json(genToken(dbUserObj));
        }*/
    },
    signup: function(req, res){
        var emailId = req.body.emailId || '';
        var password = req.body.password || '';
        if (emailId == '' || password == '') {
            res.status(401);
            res.json({
                "status": 401,
                "message": "Invalid credentials"
            });
            return;
        }
// Fire a query to your DB and check if the credentials are valid
        var dbUserObj = auth.validateSignup(req, res);
        /*if (!dbUserObj) { // If authentication fails, we send a 401 back

        }
        if (dbUserObj) {
// If authentication is success, we will generate a token
// and dispatch it to the client

        }*/
    },
    validateLogin: function(req, res, callback) {
// spoofing the DB response for simplicity
        var dbUserObj = repoConnect.authorizeUser('login', req.body, res);
        return dbUserObj;
    },
    validateSignup: function(req, res, callback) {
// spoofing the DB response for simplicity
        var dbUserObj = repoConnect.authorizeUser('signup', req.body, res);
        return dbUserObj;
    },
    validateUser: function(userid) {
        // spoofing the DB response for simplicity
        var dbUserObj = repoConnect.authorizeUser('validate', userid);
        Q.all([dbUserObj]).then(function(data){
            return dbUserObj;
        },function(err){

        });
    }
};

module.exports = auth;