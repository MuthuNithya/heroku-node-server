/**
 * Created by Muthu on 8/15/2015.
 */
(function() {
// Retrieve
    var MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Connect to the db
    MongoClient.connect("mongodb://MuthuNithya:862014@ds033143.mongolab.com:33143/dreamlion", function (err, db) {
        if (!err) {
            console.log("We are connected");
        }
        db.close();
    });
})();
