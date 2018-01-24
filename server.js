require('dotenv').config();

// DEPENDENCIES
// =====================================================================================
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require ("method-override");
var exphbs = require("express-handlebars");
var sequelize = require("sequelize");
var path = require('path');
var morgan = require('morgan');
var expjwt = require('express-jwt');
var jwt = require("jsonwebtoken");
var cookieParser = require('cookie-parser');
// var authCtrl = require('./controllers/auth/auth_controller');

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
// app.use(morgan('dev')); shows console message like 'POST /register 200 08.026 ms - 16' when you make an HTTP request
// app.use(morgan('combine'));
app.use(morgan('dev'));

// Static directory //
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, '/public/assets')));

// Set Handlebars as view engine & main.handlebars as default //
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var hbsRoutes = require('./routes/hbs-routes');
var authRoutes = require('./routes/auth-routes');

app.use('/auth', authRoutes);

var cookieAuth = function(req, res, next) {
  console.log("EYYY")
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

app.get('/', (req, res) => {
  res.redirect('/auth/register');
});

// SYNC & START SERVERS
// =====================================================================================
// Sync sequelize models and start Express app //
models.sequelize.sync({ force: isDev }).then(function() {
    //title and column name have to be the same for bulk insert
    models.UserInfo.bulkCreate([
      {
        first_name: "John",
        last_name: "Prickett",
        email: "jprickett92@gmail.com",
        phone: "9496982525",
        // zip: "92663"
        // salt: authCtrl.getSalt(),
        // hash: authCtrl.getHash("johnprickett", this.salt)
      },
      {
        first_name: "Aline",
        last_name: "Espino",
        email: "xyz@gmail.com",
        phone: "9495555555"
        // zip: "92660"
      },
      {
        first_name: "Melodie",
        last_name: "Chi",
        email: "abc@gmail.com",
        phone: "9498675309"
        // zip: "90210"
      },
      {
        first_name: "Sumaira",
        last_name: "Memon",
        email: "sum@gmail.com",
        phone: "7142222222"
        // zip: "90001"
      }
    ]);
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });
  