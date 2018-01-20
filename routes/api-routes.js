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
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    
    });
  });


 // Get route for retrieving a single UserInfo
  app.get("/api/UserInfo/:id", function(req, res) {
   models.UserInfo.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    
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
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    
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
    .then(function(response) {
      res.json(response);
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    
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
    .then(function(response) {
      res.json(UserInfo);
    })
    .catch(function(err){
      console.log(err);
      res.send(err);
    
    });
  });
  
