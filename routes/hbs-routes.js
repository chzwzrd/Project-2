// DEPENDENCIES
// =====================================================================================
var express = require("express");
var router = express.Router();
var hbsCtrl = require('../controllers/hbs_controller');

// ROUTES + API REQUEST
// =====================================================================================
// Handlebars Routes //
// Handles the HTML page that the user gets sent to //
router.get("/search", function(req, res) {
    res.render("search", hbsCtrl.getUser);
});

router.get("/results", function(req, res) {
    res.render("results");
});

router.get("/rent", function(req, res) {
    res.render("rent");
});

router.get("/rented", function(req, res) {
    res.render("rented");
});

// EXPORT
// =====================================================================================
module.exports = router;