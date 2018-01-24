// DEPENDENCIES
// =====================================================================================
var express = require("express");
var router = express.Router();
var hbsCtrl = require('../controllers/hbs_controller');
var petfinder = require('pet-finder-api');

// ROUTES + API REQUEST
// =====================================================================================
// Handlebars Routes //
// Handles the HTML page that the user gets sent to //
router.get('/search', (req, res) => {
    res.render('search');
});

router.post("/search", hbsCtrl.getUser);

router.get("/pets&animal=:animal&breed=:breed&age=:age&sex=:sex&location=:location", (req, res) => {
    res.render('results');
});
// on frontend when submit hit, they are routed to this url
router.post("/pets&animal=:animal&breed=:breed&age=:age&sex=:sex&location=:location", hbsCtrl.petFinderRequest);

router.get("/rent", function(req, res) {
    res.render("rent");
});

router.get("/rented", function(req, res) {
    res.render("rented");
});

// EXPORT
// =====================================================================================
module.exports = router;