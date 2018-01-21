const express = require("express");
const router = express.Router();

const petFinderURL = 'http://api.petfinder.com/pet.get?key=19d36f366ea3a2b37ba86aaeb7a5bbea&format=json';
// on frontend when submit hit, they are routed to this url
router.get("/pets&:animal&:breed&:age&:sex&:location", (req, res) => {
    axios.get(petFinderURL + `&animal=${req.params.animal}&breed=${req.params.breed}&age=${req.params.age}
    &sex=${req.params.sex}&location=${req.params.zipcode}`)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
})
module.exports = router;