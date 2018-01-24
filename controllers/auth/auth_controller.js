// DEPENDENCIES
// =====================================================================================
var models = require('../../models');
var crypto = require('crypto');
var jwt = require('jsonwebtoken'); // need to send a web token along with EVERY single login request
// jwt has 3 parts:
// 1) header: this is what algorithm we used, and this is what token it is
// 2) payload: is this guy an admin? when does this expire? what's this guy's name? what's his/her user ID (most important one, probably), etc. whatever info you want to put on the payload
// 3) signature: this is the actual secret part
// ALL JWT'S SHOULD EXPIRE
    // don't want a user to be logged in permanently
    // what if a user changes his/her password
    // etc.
    // all that happens when a token expires is that the user has to re-login

// GLOBAL VARIABLES
// =====================================================================================
var ctrl = {};

// GLOBAL FUNCTIONS
// =====================================================================================
// these hashing functions are helper functions
ctrl.getSalt = () => {
    return crypto.randomBytes(16).toString('hex');
};

ctrl.getHash = (password, salt) => {
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex') /* toString() makes sure that this hash gets returned as a hex string instead of a buffer */;
    // JS will by default return a hash as a buffer AKA an array of bytes/characters
    // but what we want is a string
};

var generateJWT = (user) => {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7); // "right now + 7 is 7 days from now, so this JWT will expire in 7 days"
    // creating a JWT = "signing"
    // (JWT signing functions are not asynchronous)
    return jwt.sign({
        // first takes in payload (all the cool stuff we want to put on it)
        // you could put anything here...e.g.:
        // grilledCheese: "yes" // these are just things we're choosing to put on the JWT...maybe the frontend guy wants this info or something
        id: user.id,
        first: user.first_name,
        last: user.last_name,
        email: user.email,
        exp: expire.getTime()/1000 // want to store in ms
        // will be able to have this stuff on the frontend now; the frontend will have this token, so if you wanted to find the user id, etc. will be able to
    }, /* but this part is CRUCIAL/NOT OPTIONAL: this is where authentication becomes critically important, and this is why we use the .env file */ process.env.JWT_SECRET); // when you sign a JWT, it has to have a SECRET on it; this is the most important part of the authentication system, this JWT_SECRET
    // it's what keeps your tokens secret & safe
    // go to your .env file and add 'JWT_SECRET=mulberrypie' or any other name (not obvious ones like 'secret'...)
};

// ROUTES
// =====================================================================================
ctrl.login = (req, res) => {
    // TODO: add validation to make sure email doesn't already exist, does password match
    var email = req.body.email;
    var password = req.body.password;
    models.UserInfo.findOne({ where: {
        email: email
    }})
    .then(response => {
        // console.log(response);
        if (response) {
            // login
            var inputHash = ctrl.getHash(password, response.salt /* want to use whatever salt was given to us from the database */);
            // DEBUGGING
            // console.log('input hash: ' + inputHash);
            // console.log('response hash: ' + response.hash);
            // console.log('response salt: ' + response.salt);
            // console.log(response);
            // BUG FIXED: needed to add .toString('hex') to the getHash return (line 15)
            if (inputHash === response.hash) {
                // return res.status(200).end('Login Successful');
                // not just going to return a "login successful" message to the server
                // need to return a token!
                // (JWT signing functions are not asynchronous)
                res.json({ token: generateJWT(response /* response is the user from the database */)});
                // should get a token in POSTMAN when you test the POST request (/register then /login with the same email/password/info) --> go to https://jwt.io and paste in the taken to see if it's worked (look in payload and see if the info matches what you sent)

                // so...now that we have the JWT...what now?
                // from now on, when a route is hit, we need to check if the JWT exists
                // instead of doing an if statement each time, we will use middleware
                // rename index-routes.js --> auth-routes.js so we can have separation between our auth routes and other routes
                    // npm install -S express-jwt
                    // this will do all the express jwt middleware stuff for us so we don't have to worry about it
                    // var expjwt = require('express-jwt'); in server.js
            } else {
                return res.status(400).end('Wrong Password');
            }
        } else {
            // err
            // throw new Error('User Not Found');
            return res.status(404).end('User Not Found');
            // can also create helper functions that help you send errors
        }
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
};

ctrl.register = (req, res) => {
    // set up user: expect a first/last name, email, password in the req
    // TODO: add validation to make sure email doesn't already exist in db, do a confirm password in the frontend as well
    var user = {
        first_name: req.body.firstName.trim(),
        last_name: req.body.lastName.trim(),
        email: req.body.email.trim().toLowerCase(),
        phone: req.body.phone.trim()
    };

    var salt = ctrl.getSalt();
    var hash = ctrl.getHash(req.body.password, salt);
    user.salt = salt;
    user.hash = hash;

    models.UserInfo.create(user)
    .then(response => {
        // console.log(response);
        res.json({ success: true }); // don't want to do res.json(response) here because you don't want to include the salt and hash in the response to the user!!
    })
    .catch(err => {
        console.error(err);
        throw err;
    });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;