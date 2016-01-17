(function() {
// Retrieve
    var mongoose =  require("mongoose");
    mongoose.connect('mongodb://MuthuNithya:862014@ds033143.mongolab.com:33143/dreamlion');
    // create instance of Schema
    var mongoSchema =   mongoose.Schema;
    // create schema
    var userSchema  = new mongoSchema({
        "emailId" : String,
        "password" : String,
        "completed": Boolean,
        "username" : String
    });
// create model if not exists.
    module.exports = mongoose.model('User',userSchema);
})();