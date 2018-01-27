// // *********************************************************************************
// // api_controller.js - this file offers a set of functions for displaying and saving data to themodels
// // *********************************************************************************

// // DEPENDENCIES + GLOBAL VARIABLES
// // =============================================================
// // Requiring our UserInfo model
var models = require("../models");
var authCtrl = require('../controllers/auth/auth_controller');
var ctrl = {};

// // GLOBAL FUNCTIONS
// // =============================================================
ctrl.getAllUsers = (req, res) => {
    console.log('GETTING ALL USERS');
    models.UserInfo.findAll({})
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(400).end();
        });
}

ctrl.getUser = (req, res) => {
    console.log("GETTING USER");
    models.UserInfo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(400).end();
        });
};

ctrl.updateUser = (req, res) => {
    console.log('UPDATING USER');
    models.UserInfo.update({
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone
    }, {
        where: {
            id: req.params.id
        }
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(400).end();
        });
};

ctrl.updateUserPass = (req, res) => {
    console.log('UPDATING USER PASS');

    var salt = authCtrl.getSalt();
    var hash = authCtrl.getHash(req.body.password, salt);

    models.UserInfo.update({
        salt: salt,
        hash: hash
    }, {
        where: {
            id: req.params.id
        }
        })
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.error(err);
            res.status(400).end();
        });
}

ctrl.deleteUser = (req, res) => {
    console.log('DELETING USER');
    models.UserInfo.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.error(err);
        });
};

// // EXPORT
// // =====================================================================================
module.exports = ctrl;