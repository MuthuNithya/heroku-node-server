(function() {
// Retrieve
    var MongoClient = require('mongodb').MongoClient, assert = require('assert');

    module.exports = {
        authorizeLogin:validateUser
    };
    function validateUser(mode, req){
        MongoClient.connect("mongodb://MuthuNithya:862014@ds033143.mongolab.com:33143/dreamlion", function (err, db) {
            if (!err) {
                console.log("We are connected");
            }
            var collection = db.collection("batch_document_insert_collection_safe");
            switch (mode){
                case 'login':authorizeLogin(collection, req);
                    break;
                case 'signup':createUser(collection, req);
                    break;
            }
            db.close();
        });
    }
    function authorizeLogin(collection, req){
        var fetchUser = {};
        collection.findOne({emailId: req.emailId}, function (err, item) {
            assert.equal(null, err);
            assert.equal(req.emailId, item.emailId);
            assert.equal(req.password, item.password);
            fetchUser = item;
        });
        return fetchUser;
    }
    function createUser(collection, req){
        // Insert a single document
        collection.insert([{emailId: req.emailId, Password: req.password, userName: req.username}], function (err, result) {
            assert.equal(null, err);
        })
    }
})();