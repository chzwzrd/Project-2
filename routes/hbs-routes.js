// DEPENDENCIES
// =====================================================================================
var express = require("express");
var router = express.Router();
var hbsCtrl = require('../controllers/hbs_controller');
var petfinder = require('pet-finder-api')(process.env.PETFINDER_API_KEY, process.env.PETFINDER_API_SECRET);

// ROUTES + API REQUEST
// =====================================================================================
router.get('/search', (req, res) => {
    res.render('search');
});

router.get("/pets&animal=:animal&breed=:breed&age=:age&sex=:sex&location=:location", hbsCtrl.petFinderRequest);

router.get("/rent", function(req, res) {
    res.render("rent");
});

router.get("/rented", function(req, res) {
    res.render("rented");
});

// EXPORT
// =====================================================================================
module.exports = router;