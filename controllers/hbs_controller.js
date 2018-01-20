const express = require("express");
const router = express.Router();

const petFinderURL = 'http://api.petfinder.com/pet.get?key=19d36f366ea3a2b37ba86aaeb7a5bbea&id=15860233&format=json';
// on frontend when submit hit, they are routed to this url
router.get("/pets&:age&:breed&:size&:breed&:location&:gender", (req, res) => {
    axios.get(petFinderURL+ `&animal=dog&age=${req.params.age}
    &breed=${req.params.breed}&gender=${req.params.gender}
    &location=${req.params.location}&size=${req.params.size}`)
    .then(function (response) {
        console.log(response);
         
    })
    .catch(function (error) {
        console.log(error);
    });
})
module.exports = router;