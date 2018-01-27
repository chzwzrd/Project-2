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

        var petsArr = [];
        for (var m = 0; m < response.length; m++) {
            var name = response[m].name;
            var description = response[m].description ? response[m].description : 'N/A';
            var breeds = response[m].breeds ? response[m].breeds.join(', ') : 'N/A';
            var media = response[m].media;
            var contact = response[m].contact;
            var age = response[m].age;
            var sex = response[m].sex;
            if (response[m].options.length > 1) {
                var options = response[m].options;
                for (var n = 0; n < options.length; n++) {
                    if (options[n] === 'altered') {
                        options[n] = 'Altered';
                    } else if (options[n] === 'hasShots') {
                        options[n] = 'Has shots';
                    } else if (options[n] === 'housetrained') {
                        options[n] = 'House-trained';
                    } else if (options[n] === 'specialNeeds') {
                        options[n] = 'Special needs';
                    } else if (options[n] === 'noKids') {
                        options[n] = 'No kids';
                    } else if (options[n] === 'noCats') {
                        options[n] = 'No cats';
                    } else if (options[n] === 'noDogs') {
                        options[n] = 'No dogs';
                    }
                }
                options = options.join(', ');
            } else {
                var options = 'N/A';
            }
            if (media.photos['1']) {
                var photo = media.photos['1'].x;
            } else {
                var photo = "http://via.placeholder.com/250x250";
            }
            if (contact.city) {
                var city = contact.city;
            }
            if (contact.state) {
                var state = contact.state;
            }
            if (sex === 'M') {
                sex = 'Male';
            } else if (sex === 'F') {
                sex = 'Female';
            }
            petsArr.push({ name: name, description: description, breeds: breeds, options: options, photo: photo, city: city, state: state, age: age, sex: sex });
        }

        var data = {
            pets: petsArr
        };

        console.log(petsArr);

        res.render('results', data);
    });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;