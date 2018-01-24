// DEPENDENCIES + GLOBAL VARIABLES
// =============================================================
var axios = require('axios');
var models = require("../models");
var petfinder = require('pet-finder-api')(process.env.PETFINDER_API_KEY, process.env.PETFINDER_API_SECRET);
var ctrl = {};

// GLOBAL FUNCTIONS
// =============================================================
ctrl.getUser = (req, res) => {
    console.log("GETTING USER FOR /SEARCH...REQ.BODY CONSOLED OUT BELOW");
    console.log(req.body);
    models.UserInfo.findOne({
            where: {
                email: req.body.email
            }
        })
        .then(response => {
            // console.log(response);
            console.log(response.dataValues);
            // res.render('search', response.dataValues);
        })
        .catch(err => {
            console.error(err);
        });
};

ctrl.petFinderRequest = (req, res) => {
    // var petFinderURL = `http://api.petfinder.com/pet.get?key=${process.env.PETFINDER_API_KEY}&format=json`;
    // axios.get(`${petFinderURL}&animal=${req.body.animal}&breed=${req.body.breed}&age=${req.body.age}&sex=${req.body.sex}&location=${req.body.zipCode}`)
    //     .then(response => {
    //         console.log('WOOHOOO API REQUEST SUCCESS');
    //         console.log(response);
    //         res.render('results', {
    //             data: response
    //         });
    //     })
    //     .catch(err => {
    //         console.error(err);
    //         res.send(err);
    //     });

    // don't need CORS extension if using npm package (made for backend)
    petfinder.findPet(req.params.location, {
        animal: req.params.animal,
        breed: req.params.breed,
        age: req.params.age,
        sex: req.params.sex,
        count: 3
    }, (err, response) => {
        if (err) console.error(err);
        console.log("\n==============================");
        console.log('WOOHOOO API REQUEST SUCCESS');
        console.log(response);
        console.log("==============================\n");

        var data = {
            pets: response
        };

        res.render('results', data);
    });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;