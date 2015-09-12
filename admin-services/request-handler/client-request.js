(function(){
    var express = require('express');
    var app = express();
    var repoConnect = require('/MongoDB');
    app.post('/auth_login', function (req, res) {
        var fetchUser = repoConnect.authorizeLogin('login', req);
        if(fetchUser){
            res.send(fetchUser);
        }
    });

    var server = app.listen(8081, function () {
        var host = server.address().address;
        var port = server.address().port;
        console.log("Example app listening at http://%s:%s", host, port)

    });
})();