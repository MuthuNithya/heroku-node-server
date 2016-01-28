var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var worksheets = require('./worksheets.js');
var user = require('./users.js');
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signup', auth.signup);
/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/v1/worksheets/create', worksheets.create);
router.get('/api/v1/worksheets/:id', worksheets.getOne);
router.post('/api/v1/worksheets/', worksheets.create);
router.put('/api/v1/worksheets/:id', worksheets.update);
router.delete('/api/v1/worksheets/:id', worksheets.delete);
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.get('/api/v1/admin/users', user.getAll);
router.get('/api/v1/admin/user/:id', user.getOne);
router.post('/api/v1/admin/user/', user.create);
router.put('/api/v1/admin/user/:id', user.update);
router.delete('/api/v1/admin/user/:id', user.delete);
module.exports = router;