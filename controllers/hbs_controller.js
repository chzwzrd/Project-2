// DEPENDENCIES + GLOBAL VARIABLES
// =============================================================
// Requiring our UserInfo model
var models = require("../models");
var ctrl = {};

// GLOBAL FUNCTIONS
// =============================================================
ctrl.getUser = (req, res) => {
    console.log("GETTING");
    console.log(req.body.email);
    models.UserInfo.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(response => {
            console.log(response);
            res.render('search', response);
        })
        .catch(err => {
            console.error(err);
        });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;