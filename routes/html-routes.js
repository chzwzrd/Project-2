

var path = require("path");

// Handlebars Routes //
// Handles the HTML page that the user gets sent to //

module.exports = function(app) {

    app.get("/", function (req, res) {
        res.render("index",hbsObject);
        console.log(hbsObject);
    });

    app.get("/search", function (req, res) {
        res.render("search",hbsObject);
    });

    app.get("/results", function (req, res) {
        res.render("results",hbsObject);
    });

    app.get("/rent", function (req, res) {
        res.render("rent",hbsObject);
    });

    // app.get("/favorites", function (req, res) {
    //     res.render("favorites",hbsObject);
    // });

    // app.get("/history", function (req, res) {
    //     res.render("history",hbsObject);
    // });

    // app.get("/rented", function (req, res) {
    //     res.render("rented",hbsObject);
    // });

};
