// DEPENDENCIES
// =====================================================================================
var express = require("express");
var router = express.Router();
var hbsCtrl = require('../controllers/hbs_controller');
var petfinder = require('pet-finder-api')(process.env.PETFINDER_API_KEY, process.env.PETFINDER_API_SECRET);
var atob = require("atob");
var models = require("../models");

// ROUTES + API REQUEST
// =====================================================================================
router.get('/search', (req, res) => {
    console.log('===RESPONSE====');
    console.log(res.status);
    res.render('search');
});

router.get("/pets&animal=:animal&breed=:breed&age=:age&sex=:sex&location=:location", hbsCtrl.petFinderRequest);

router.get("/rent", function(req, res) {
    res.render("rent");
});

router.get("/rented", function(req, res) {
    res.render("rented");
});

router.get('/user', (req, res) => {
    var userID = JSON.parse(atob(req.cookies.token.split('.')[1])).id;
    models.UserInfo.findOne({
        where: {
            id: userID
        }
    })
        .then(function(response) {
            console.log(response.id);
            res.render('user', { data: response });
        })
        .catch(function(err) {
            console.error(err);
        });
});

router.get('/deleted', (req, res) => {
    res.render('deleted');
})

// EXPORT
// =====================================================================================
module.exports = router;