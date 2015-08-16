/**
 * Created by Muthu on 8/15/2015.
 */
(function() {
// Retrieve
    var MongoClient = require('mongodb').MongoClient;

// Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Dream Lion", function (err, db) {
        if (!err) {
            console.log("We are connected");
        }
    });
})();
