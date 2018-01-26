require('dotenv').config();

// DEPENDENCIES
// =====================================================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var exphbs = require("express-handlebars");
var sequelize = require("sequelize");
var path = require('path');
var morgan = require('morgan');
var expjwt = require('express-jwt');
var jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
var authCtrl = require('./controllers/auth/auth_controller');

// Requiring "models" for sync //
var models = require("./models");

// SET UP ENV
var PORT = process.env.PORT || 8080;
var isDev = process.env.NODE_ENV === 'development';

// MIDDLEWARE
// =====================================================================================
// Setup Express app //
var app = express();
app.use(cookieParser())
// Data parsing for Express app //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set up logger
app.use(morgan('dev'));

// Static directory //
app.use(express.static(path.join(__dirname, '/public/assets')));

// Set Handlebars as view engine & main.handlebars as default //
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var hbsAuthRoutes = require('./routes/hbs-auth-routes');
var hbsRoutes = require('./routes/hbs-routes');
var authRoutes = require('./routes/auth-routes');

app.use('/', hbsAuthRoutes);
app.use('/auth', authRoutes);

// set up this middleware to send along our tokens for authorization; any routes below this middleware will require user authentication in order to access
var cookieAuth = function(req, res, next) {
  console.log("COOKIE AUTH");
  console.log(req.cookies.token);
  try {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    next();
  }
  catch (err) {
    throw new Error("Not Authenticated")
  }
}
app.use(cookieAuth);

app.use('/', hbsRoutes);

// SYNC & START SERVERS
// =====================================================================================
// Sync sequelize models and start Express app //
models.sequelize.sync({ force: isDev }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
