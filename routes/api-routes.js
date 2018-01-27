// // *********************************************************************************
// // api-routes.js - this file offers a set of routes for displaying and saving data to themodels
// // *********************************************************************************

// DEPENDENCES + GLOBAL VARIABLES
// =====================================================================================
var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api_controller');

// ROUTES
// =====================================================================================
// router.get("/user",apiCtrl.getUser);
router.get('/users', apiCtrl.getAllUsers);
router.get("/user/:id", apiCtrl.getUser);
router.put('/user/:id', apiCtrl.updateUser);
router.put('/user/pass/:id', apiCtrl.updateUserPass);
router.delete('/user/:id', apiCtrl.deleteUser);

// EXPORT
// =====================================================================================
module.exports = router;