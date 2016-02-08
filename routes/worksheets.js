(function() {
var createWorksheets = require('../WorksheetServices/CreateWorksheets.js').create;
var fetchWorksheets = require('../WorksheetServices/FetchWorksheet.js').fetch;
var auditWorkSheets = require('../WorksheetServices/AuditWorksheets.js').audit;
var worksheets = {

    fetch: function(req, res) {
        fetchWorksheets(req, res);
    },

    create: function(req, res) {
        createWorksheets(req, res);
    },

    audit: function(req, res){
        auditWorkSheets(req, res);
    },

    update: function(req, res) {
        var updateProduct = req.body;
        var id = req.params.id;
        data[id] = updateProduct // Spoof a DB call
        res.json(updateProduct);
    },

    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1) // Spoof a DB call
        res.json(true);
    }
};

module.exports = worksheets;
})();
