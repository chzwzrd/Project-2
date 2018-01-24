// DEPENDENCIES + GLOBAL VARIABLES
// =============================================================
var axios = require('axios');
var models = require("../models");
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

var petFinderURL = `http://api.petfinder.com/pet.get?key=${process.env.PETFINDER_API_KEY}format=json`;
ctrl.petFinderRequest = (req, res) => {
    axios.get(`${petFinderURL}&animal=${req.body.animal}&breed=${req.body.breed}&age=${req.body.age}&sex=${req.body.sex}&location=${req.body.zipCode}`)
        .then(response => {
            res.render('results', {
                data: response
            });
            console.log('WOOHOOO API REQUEST SUCCESS');
            console.log(response);
        })
        .catch(err => {
            console.error(err);
            res.send(err);
        });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;