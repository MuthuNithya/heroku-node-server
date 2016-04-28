var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var worksheets = require('./worksheets.js');
/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);
router.post('/signup', auth.signup);
/*
 * Routes that can be accessed only by autheticated users
 */
router.post('/api/v1/worksheets/create', worksheets.create);
router.post('/api/v1/worksheets/details', worksheets.fetch);
router.post('/api/v1/worksheets/history', worksheets.audit);
router.post('/api/v1/worksheets/summary', worksheets.audit);

module.exports = router;