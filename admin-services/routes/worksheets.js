(function() {
var createWorksheets = require('../createWorksheets/CreateWorksheets.js').create;
var worksheets = {

    getOne: function(req, res) {
        var id = req.params.id;
        var product = data[0]; // Spoof a DB call
        res.json(product);
    },

    create: function(req, res) {
        createWorksheets(req, res);
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