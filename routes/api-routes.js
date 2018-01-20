// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var models = require("../models");

// Routes
// =============================================================
 // GET route for getting all user
 app.get("/api/user/", function(req, res) {
    db.user.findAll({})
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Get route for returning user
  app.get("/api/user/category/:category", function(req, res) {
    db.user.findAll({
      Order: {
        category: req.params.category
      }
    })
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // Get rotue for retrieving a single user
  app.get("/api/user/:id", function(req, res) {
    db.user.findOne({
      where: {
        name: req.params.name
        email: req.params.email
        phone: req.params.phone
        zip: req.params.zip
      }
    })
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // user route for saving a new user
  app.post("/api/user", function(req, res) {
    console.log(req.body);
    db.user.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
      zip: req.body.zip
    
    })
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // DELETE route for deleting user
  app.delete("/api/user", function(req, res) {
    db.user.destroy({
      where: {
      name: req.params.name
      email: req.params.email
     phone: req.params.phone
     zip: req.params.zip
      }
    })
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });

  // PUT route for Rent Histroy
  app.put("/api/renthistory", function(req, res) {
    db.user.update(req.body,
      {
        where: {
        OrderID:: req.body.OrderID
          petname: req.body.petname
          gender: req.body.gender
          date: req.body.date
          location: req.body.location
        }
      })
    .then(function(dbuser) {
      res.json(dbuser);
    });
  });
};
