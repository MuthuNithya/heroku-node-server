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
        var collection = db.collection("batch_document_insert_collection_safe");
        // Insert a single document
        collection.insert([{Name: 'Nithya'}
            , {Password: 'Muthu123'}], function (err, result) {
            assert.equal(null, err);

            // Fetch the document
            collection.findOne({Name: 'Nithya'}, function (err, item) {
                assert.equal(null, err);
                assert.equal('Nithya', item.Name);
                db.close();
            });
        })
    })
})();
