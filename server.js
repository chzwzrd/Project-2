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
  //title and column name have to be the same for bulk insert
  // models.UserInfo.bulkCreate([
  //   {
  //     first_name: "John",
  //     last_name: "Prickett",
  //     // email: "jprickett92@gmail.com",
  //     email: "john@prickett.com",
  //     phone: "9496982525",
  //     // salt: "325efd85b101572cc8e2587064136464",
  //     // hash: "6334d76499b29947247ba61df97a46b15c7182b75c3601d0ac20ca11d02206e8fc414a8e23b8bf64d44633a7eb7d4b453ff12316456b2f7d607b84ff93ebbc20"
  //     // salt: authCtrl.getSaltBuffer(),
  //     // hash: authCtrl.getHash("johnprickett", this.salt)
  //     // zip: "92663"
  //   },
  //   {
  //     first_name: "Aline",
  //     last_name: "Espino",
  //     email: "aline@espino.com",
  //     phone: "9495555555",
  //     // salt: "a697abdd31c4463b5b3a248a4ef66c62",
  //     // hash: "83cfb8ca025f02343e86f14e5b81aa7d354c64c815c73feb0a01d8042349c44a7be454aa1298f1d610b8035ee4a3e0cd6e499a11772d13e30b83715055775bd5"
  //     // zip: "92660"
  //   },
  //   {
  //     first_name: "Melodie",
  //     last_name: "Chi",
  //     email: "melodie@chi.com",
  //     phone: "9498675309",
  //     // salt: "344091a713f6c28537a055a7db44dda4",
  //     // hash: "8b3d7a88204027cb47dd2758a93288f86f6b11cead586a3d8f59aeb0c6f8d797d03691e2c09e19c452bfeec7e0c451d33829d63e07e11c38fbdb3c4d91f2de72"
  //     // zip: "90210"
  //   },
  //   {
  //     first_name: "Sumaira",
  //     last_name: "Memon",
  //     email: "sumaira@memon.com",
  //     phone: "7142222222",
  //     // salt: "58dcd26800b1857723ff4ec7e9a19a97",
  //     // hash: "bcbc0f7c8ef360bf99e83ea9141ce9287c3283dd840c41dfd25153c6cb9e65263be72ecd995ba59c58c5591848fece60459c49a442bdc41561497a4b46d66d0c"
  //     // zip: "90001"
  //   }
  // ]);
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
