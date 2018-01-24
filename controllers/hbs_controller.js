

var express = require ("express");
var models = require("../models"); 
var router = express.Router();


router.get("/", function(req, res) {
    models.UserInfo.findAll()
        .then(function(response) {
            res.render("index", {
                data: response
            });
        })
        .catch(function(err) {
            console.log(err)
            res.send(err);
        });
})

router.get("/search", function (req, res) {
    res.render("search");
});

router.get("/pets&:animal&:breed&:age&:sex&:zipcode", function (req, res) {
    res.render("results");
});

router.get("/rent", function (req, res) {
    res.render("rent");
});

router.get("/rented", function (req, res) {
res.render("rented");
});

// Export routes for server.js to use //

module.exports = router;



///___________SAMMY'S BOOK EXAMPLE CODE____________////

// router.get("/", function(req, res) {
//         models.book.findAll()
//             .then(function(response) {
//                 res.render("index", {
//                     data: response,
//                     string: "wait this worked for real??? LOL"
//                 })
//             })
//             .catch(function(err) {
//                 console.log(err)
//                 res.send(err);
//             });
//     })
// module.exports = router;
//______________END OF EXAMPLE__________________///////








//________________HBS Controller from Sammy and John____________

// // Leave this here or put in server.js or index.js?

// const express = require("express");
// const router = express.Router();

// // This needs to run on when user hits "Submit" on their search form
// // Where does this get called? In handlebars? On Submit? Idk
// // On frontend when submit hit, they are routed to this url

const petFinderURL = `http://api.petfinder.com/pet.get?key=${process.env.PETFINDER_API_KEY}&format=json`;
// need to add our API keys into the template literal 
// John removed the ID from the ID from API url

// router.get("/pets&:age&:breed&:size&:breed&:location&:gender", (req, res) => {
//     axios.get(petFinderURL + `&animal=dog&age=${req.params.age}
//     &breed=${req.params.breed}&gender=${req.params.gender}
//     &location=${req.params.location}&size=${req.params.size}`)
//         .then(function (response) {
//             // res.render();
//             console.log(response);
//         })
//         .catch(function (error) {
             
//             console.log(error);
//         });
// })
// module.exports = router;


// //search.handlebars id's:
// // "pet-type"
// // "pet-age"
// // "pet-breed"
// // "pet-age"
// // "pet-gender"
// // "zip-code"
// // "pet-distance"

//________________HBS Controller from Sammy and John____________
