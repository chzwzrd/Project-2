// Require dependencies // 

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require ("method-override");
var exphbs = require("express-handlebars");
var sequelize = require("sequelize");
var path = require('path');

// Requiring "models" for sync //

var models = require("./models");

// Setup Express app //

var app = express();
var PORT = process.env.PORT || 8080;

// Handlebars routes for pet search controller
var hbsRoutes = require("./controllers/hbs_controller");
app.use("/", hbsRoutes);

// Data parsing for Express app //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory //
app.use(express.static(path.join(__dirname, '/public/assets')));

// Handlebars //

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes // 
// var htmlRoutes = require("./routes/html-routes.js");
// app.use("/", htmlRoutes);

// Sync sequelize models and start Express app //

models.sequelize.sync({ force: true }).then(function() {
    //title and column name have to be the same for bulk insert
    models.UserInfo.bulkCreate (
      {name: "John", email: "jprickett92@gmail.com", phone: "9496982525", zip: "92663"},
      {name: "Aline", email: "xyz@gmail.com", phone: "949555555", zip: "92660"},
      {name: "Mel", email: "abc@gmail.com", phone: "9498675309", zip: "90210"},
      {name: "Sumaira", email: "sum@gmail.com", phone: "7142222222", zip: "90001"}
    )
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  