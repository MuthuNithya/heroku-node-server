(function(){
    var express = require('express');
    var app = express();
    var repoConnect = require('./MongoDB.js');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    // Create application/x-www-form-urlencoded parser
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.use(cors());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));
    app.options('*', cors()); // include before other routes
    /*app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept");
        next();
    });*/
    app.post('/auth_login', function (req, res) {
        repoConnect.authorizeLogin('login', req.body, res);
    });
    app.post('/auth_signup', function(req, res){
        repoConnect.authorizeLogin('signup', req.body, res);
    });
    var server_port = process.env.PORT || 5000;
    //var server = require('http').createServer(app);
   /* var io = require("socket.io")(server);

    var handleClient = function (socket) {
        socket.sendUTF("hello");
        console.log("connect");
    };
    
    io.on("connection", handleClient);
    
    console.log(" on " + ", server_port " + server_port)*/
    app.listen(server_port, function(){
      console.log("Listening on " + ", server_port " + server_port)
    });
t:q
})();
