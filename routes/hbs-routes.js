// DEPENDENCIES
// =====================================================================================
var express = require("express");
var router = express.Router();
var hbsCtrl = require('../controllers/hbs_controller');

// ROUTES + API REQUEST
// =====================================================================================
// just a test route to make sure everything's working
// this route will be behind some authentication
router.get('/test', (req, res) => {
    res.send('You are authenticated!');
});

var petFinderURL = `http://api.petfinder.com/pet.get?key=${process.env.PETFINDER_API_KEY}format=json`;
// on frontend when submit hit, they are routed to this url
router.get("/pets&:animal&:breed&:age&:sex&:location", (req, res) => {
    axios.get(`${petFinderURL}&animal=${req.params.animal}&breed=${req.params.breed}&age=${req.params.age}&sex=${req.params.sex}&location=${req.params.zipcode}`)
        .then(response => {
            res.render('results', {
                data: response
            });
            console.log(response);
        })
        .catch(err => {
            console.error(err);
            res.send(err);
        });
});

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