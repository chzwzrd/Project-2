// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to themodels
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var models = require("../models");

// Routes
// =============================================================
 // GET route for getting all user
 app.get("/api/user/", function(req, res) {
   models.UserInfo.findAll({})
    .then(function(modelsUserInfo) {
      res.json(modelsUserInfo);
    });
  });

  // Get route for returning UserInfo
  app.get("/api/UserInfo/category/:category", function(req, res) {
   models.UserInfo.findAll({
      Order: {
        category: req.params.category
      }
    })
    .then(function(modelsUserInfo) {
      res.json(modelsUserInfo);
    });
  });

  // Get rotue for retrieving a single UserInfo
  app.get("/api/UserInfo/:id", function(req, res) {
   models.UserInfo.findOne({
      where: {
        name: req.params.name,
        email: req.params.email,
        phone: req.params.phone,
        zip: req.params.zip,
      }
    })
    .then(function(modelsUserInfo) {
      res.json(modelsUserInfo);
    });
  });

  // UserInfo route for saving a new UserInfo
  app.post("/api/UserInfo", function(req, res) {
    console.log(req.body);
   models.UserInfo.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      zip: req.body.zip,
    
    })
    .then(function(modelsUserInfo) {
      res.json(modelsUserInfo);
    });
  });

  // DELETE route for deleting UserInfo
  app.delete("/api/UserInfo", function(req, res) {
   models.UserInfo.destroy({
      where: {
      name: req.params.name,
      email: req.params.email,
     phone: req.params.phone,
     zip: req.params.zip,
      }
    })
    .then(function(modelsUserInfo) {
      res.json(modelsUserInfo);
    });
  });

  // PUT route for Rent Histroy
  app.put("/api/renthistory", function(req, res) {
   models.UserInfo.update(req.body,
      {
        where: {
        OrderID: req.body.OrderID,
          petname: req.body.petname,
          gender: req.body.gender,
          date: req.body.date,
          location: req.body.location,
        }
      })
    .then(function(modelsUserInfo) {
      res.json(UserInfo);
    });
  });
  
