(function() {
// Retrieve
    var MongoClient = require('mongodb').MongoClient, assert = require('assert');

    module.exports = {
        authorizeLogin:validateUser
    };
    function validateUser(mode, req, res){
        var resData;
        MongoClient.connect("mongodb://MuthuNithya:862014@ds033143.mongolab.com:33143/dreamlion", function (err, db) {
            if (!err) {
                console.log("We are connected");
            }
            var collection = db.collection("batch_document_insert_collection_safe");
            switch (mode){
                case 'login':
                    resData = authorizeLogin(collection, req,res, db);
                    break;
                case 'signup':
                    resData = createUser(collection, req,res, db);
                    break;
            }
        });
        return;
    }
    function authorizeLogin(collection, req,res, db){
        var fetchUser = {};
        collection.findOne({emailId: req.emailId, Password: req.password}, function (err, item) {
            fetchUser = item;
            res.send(fetchUser);
            db.close();
            return;
        });
    }
    function createUser(collection, req, db){
        // Insert a single document
        collection.insert([{emailId: req.emailId, Password: req.password, userName: req.username}], function (err, result) {
            assert.equal(null, err);
            db.close();
            return;
        })
    }
})();