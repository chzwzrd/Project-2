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
// controllers
var authCtrl = require('./controllers/auth/auth_controller');
var apiCtrl = require('./controllers/api_controller');

// Requiring "models" for sync //
var models = require("./models");

// SET UP ENV
var PORT = process.env.PORT || 8080;
var isDev = process.env.NODE_ENV === 'development';

// MIDDLEWARE
// =====================================================================================
// Setup Express app //
var app = express();
app.use(cookieParser());
// Data parsing for Express app //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set up logger
app.use(morgan('dev'));

// Static directory //
app.use(express.static(path.join(__dirname, '/public/assets')));

// Set Handlebars as view engine & main.handlebars as default
// toJSON is a helper function, the sole purpose of which is to stringify JS objects
// when using, make sure to use triple brackets to disable HTML encoding (e.g. {{{toJSON data}}})
app.engine("handlebars", exphbs({
  defaultLayout: "main", helpers: {
    toJSON: (object) => {
      return JSON.stringify(object);
    }
  }
}));
app.set("view engine", "handlebars");

// Routes
var hbsRoutes = require('./routes/hbs-routes');
var hbsAuthRoutes = require('./routes/hbs-auth-routes');
var authRoutes = require('./routes/auth-routes');
var apiRoutes = require('./routes/api-routes');

app.use('/', hbsAuthRoutes);
app.use('/auth', authRoutes);

var auth = function(req, res, next) {
  try {
    console.log("COOKIE AUTH", req.get("Authorization"));
    var token = req.cookies.token || req.get("Authorization").split(" ")[1]
    console.log(token);
    try {
      console.log("we trying")
      jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      console.log("we failin", err);
      throw new Error("Not Authenticated");
      res.render("error");
    }
  } catch (err) {
    console.log("something is really wrong", err);
    throw new Error("Not Authenticated");
    res.render("error");
  }

}
app.use(auth);

app.use('/api', apiRoutes);
app.use('/', hbsRoutes);

// SYNC & START SERVERS
// =====================================================================================
// Sync sequelize models and start Express app //
models.sequelize.sync({ force: isDev }).then(function() {
  //title and column name have to be the same for bulk insert
  var salt = authCtrl.getSalt();
  models.UserInfo.bulkCreate([
    {
      first_name: "John",
      last_name: "Prickett",
      email: "john@prickett.com",
      phone: "9496982525",
      salt: salt,
      hash: authCtrl.getHash("johnprickett", salt)
    },
    {
      first_name: "Aline",
      last_name: "Espino",
      email: "aline@espino.com",
      phone: "9495555555",
      salt: salt,
      hash: authCtrl.getHash("alineespino", salt)
    },
    {
      first_name: "Melodie",
      last_name: "Chi",
      email: "melodie@chi.com",
      phone: "9498675309",
      salt: salt,
      hash: authCtrl.getHash("melodiechi", salt)
    },
    {
      first_name: "Sumaira",
      last_name: "Memon",
      email: "sumaira@memon.com",
      phone: "7142222222",
      salt: salt,
      hash: authCtrl.getHash("sumairamemon", salt)
    }
  ]);
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
