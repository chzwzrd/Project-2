// DEPENDENCIES + GLOBAL VARIABLES
// =============================================================
var axios = require('axios');
var models = require("../models");
var petfinder = require('pet-finder-api')(process.env.PETFINDER_API_KEY, process.env.PETFINDER_API_SECRET);
var ctrl = {};

// GLOBAL FUNCTIONS
// =============================================================
ctrl.petFinderRequest = (req, res) => {
    // don't need CORS extension if using npm package (made for backend)
    petfinder.findPet(req.params.location, {
        animal: req.params.animal,
        breed: req.params.breed,
        age: req.params.age,
        sex: req.params.sex
    }, (err, response) => {
        if (err) console.error(err);
        console.log("\n==============================");
        console.log('WOOHOOO API REQUEST SUCCESS');
        console.log(response[0]);
        console.log("==============================\n");

        var data = {
            pets: response,
        };

        res.render('results', data);
    });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;