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
    }
};

module.exports = worksheets;
})();