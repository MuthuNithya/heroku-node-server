var users = {

    getAll: function(req, res) {
        var allusers = data;
        res.json(allusers);
    },

    getOne: function(req, res) {
        var id = req.params.id;
        var user = data[0];
        res.json(user);
    },

    create: function(req, res) {
        var newuser = req.body;
        data.push(newuser);
        res.json(newuser);
    },

    update: function(req, res) {
        var updateuser = req.body;
        var id = req.params.id;
        data[id] = updateuser;
        res.json(updateuser);
    },

    delete: function(req, res) {
        var id = req.params.id;
        data.splice(id, 1);
        res.json(true);
    }
};
module.exports = users;