// DEPENDENCES + GLOBAL VARIABLES
// =====================================================================================
var express = require('express');
var router = express.Router();
var apiCtrl = require('../controllers/api_controller');

// ROUTES
// =====================================================================================
// just a test route to make sure everything's working
// this route will be behind some authentication
router.get('/test', (req, res) => {
    res.send('You are authenticated!');
    // if you go in POSTMAN and test this route before registering/logging in, you should get a response leading with "UnauthorizedError: No authorization token was found"
    // however, once you register & login with a POST request via email/pw, may still get this message...this is because you need to send along your token with every request
        // in your POSTMAN GET request for localhost:8080/api/test after logging in, go to Headers, type in "Authorization" as a Key, and in Value, type in "Bearer [paste token here]"
        // send the request, should get success message

    // so...how would we use authentication from the frontend? --> register.handlebars
});

// GET route for getting all user
router.get("/user", function(req, res) {
    models.UserInfo.findAll({})
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });
});

// Get route for retrieving a single UserInfo
router.get("/user/:id", function(req, res) {
    models.UserInfo.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });
});

// UserInfo route for saving a new UserInfo
router.post("/user", function(req, res) {
    console.log(req.body);
    models.UserInfo.create({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        zip: req.body.zip,

    })
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });
});

// DELETE route for deleting UserInfo
router.delete("/UserInfo", function(req, res) {
    models.UserInfo.destroy({
        where: {
            name: req.params.name,
            email: req.params.email,
            phone: req.params.phone,
            zip: req.params.zip,
        }
    })
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });
});

// // PUT route for Rent Histroy
// router.put("/renthistory", function(req, res) {
//  models.UserInfo.update(req.body,
//     {
//       where: {
//       OrderID: req.body.OrderID,
//         petname: req.body.petname,
//         gender: req.body.gender,
//         date: req.body.date,
//         location: req.body.location,
//       }
//     })
//   .then(function(response) {
//     res.json(UserInfo);
//   })
//   .catch(function(err){
//     console.log(err);
//     res.send(err);
//   });
// });

// Define a hbsobject and then pass it as response in res.render //
// router.get("/favorites", function (req, res) {
//     res.render("favorites",hbsObject);
// });

// router.get("/history", function (req, res) {
//     res.render("history",hbsObject);
// });

const petFinderURL = `http://api.petfinder.com/pet.get?key=${process.env.PETFINDER_API_KEY}format=json`;
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

// EXPORT
// =====================================================================================
module.exports = router;