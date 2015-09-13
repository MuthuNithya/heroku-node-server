(function(){
    var express = require('express');
    var app = express();
    var repoConnect = require('./MongoDB.js');
    var bodyParser = require('body-parser');
    // Create application/x-www-form-urlencoded parser
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.post('/auth_login', function (req, res) {
        repoConnect.authorizeLogin('login', req.body, res);
    });
    app.post('/auth_signup', function(req, res){
        repoConnect.authorizeLogin('signup', req.body, res);
    });
    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)

    });
})();