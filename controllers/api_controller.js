// *********************************************************************************
// api_controller.js - this file offers a set of routes for displaying and saving data to themodels
// *********************************************************************************

// DEPENDENCIES + GLOBAL VARIABLES
// =============================================================
// Requiring our UserInfo model
var models = require("../models");
var ctrl = {};

// GLOBAL FUNCTIONS
// =============================================================
ctrl.getUser = (req, res) => {
    console.log("GETTING")
    models.UserInfo.findOne({ where: {
        email: req.body.email
    }})
    .then(response => {
        res.render('search', response);
    })
    .catch(err => {
        console.error(err);
    });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;