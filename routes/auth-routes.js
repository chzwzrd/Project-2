// DEPENDENCIES
// =====================================================================================
var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth/auth_controller');

// ROUTES
// =====================================================================================
router.get('/register', function(req, res) {
    res.render('register');
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// EXPORT
// =====================================================================================
module.exports = router;