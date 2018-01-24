var express = require ("express");
var models = require("../models"); 
var router = express.Router();

// Define our api route inside post method
router.post("/api/user/search", function(req, res) {
    console.log(req.body)
    models.UserSearch.FindAll(req.body)
        .then(function(response) {
            // res.render references the view engine 
            res.render("search", {
                // This will send back our object as the response
                // If we want to display, it just renders the search page
                data: response
            });
        })
        .catch(function(err) {
            console.log(err)
            res.send(err);
        });
})

// Export routes for server.js to use //

module.exports = router;