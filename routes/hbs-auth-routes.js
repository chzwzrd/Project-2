// DEPENDENCIES
// =====================================================================================
var express = require('express');
var router = express.Router();

// ROUTES
// =====================================================================================
router.get('/', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

// EXPORT
// =====================================================================================
module.exports = router;