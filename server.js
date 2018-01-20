// Require dependencies // 

var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require ("method-override");
var exphbs = require("express-handlebars");

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
app.use(express.static("public"));

// Handlebars //

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes // 
/****************************   
*                           *
*   require("./")(app);     *
*                           *
*****************************/


// Sync sequelize models and start Express app //

models.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
