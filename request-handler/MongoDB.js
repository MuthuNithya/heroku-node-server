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
    var workSheetSchema = new mongoSchema({
        "userid": String,
        "status": String,
        "workDate":  Number,
        "workData": Array,
        "hoursLogged": Number,
        "modifiedDate": Number,
        "version": Number,
        "isLatest": Boolean
    });
    var auditWorkSheetSchema = new mongoSchema({
        "userid": String,
        "status": String,
        "workDate":  Number,
        "hoursLogged": Number,
        "modifiedDate": Number,
        "version": Number,
        "isLatest": Boolean
    });
    var dbSchema = {
        "user":  mongoose.model('User',userSchema),
        "worksheet": mongoose.model('Worksheet', workSheetSchema),
        "auditWorksheet": mongoose.model('AuditWorksheet', auditWorkSheetSchema)
    };
// create model if not exists.
    module.exports = dbSchema;
})();