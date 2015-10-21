var jwt = require('jwt-simple');
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
        var dbUserObj = auth.validate(req, res);
        if (!dbUserObj) { // If authentication fails, we send a 401 back

        }
        if (dbUserObj) {
// If authentication is success, we will generate a token
// and dispatch it to the client
            res.json(genToken(dbUserObj));
        }
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
        var dbUserObj = auth.validateUser(req, res);
        if (!dbUserObj) { // If authentication fails, we send a 401 back

        }
        if (dbUserObj) {
// If authentication is success, we will generate a token
// and dispatch it to the client

        }
    },
    validate: function(req, res) {
// spoofing the DB response for simplicity
        var dbUserObj = repoConnect.authorizeLogin('login', req.body, res);
        return dbUserObj;
    },
    validateUser: function(req, res) {
// spoofing the DB response for simplicity
        var dbUserObj = repoConnect.authorizeLogin('signup', req.body, res);
        return dbUserObj;
    },
};
// private method
function genToken(user) {
    var expires = expiresIn(7); // 7 days
    var token = jwt.encode({
        exp: expires
    }, require('../config/secret')());
    return {
        token: token,
        expires: expires,
        user: user
    };
}
function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = auth;