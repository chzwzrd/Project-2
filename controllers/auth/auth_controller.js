// DEPENDENCIES
// =====================================================================================
var models = require('../../models');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

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
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
};

var generateJWT = (user) => {
    var expire = new Date();
    expire.setDate(expire.getDate() + 7);
    return jwt.sign({
        id: user.id,
        first: user.first_name,
        last: user.last_name,
        email: user.email,
        phone: user.phone,
        exp: expire.getTime() / 1000
    }, process.env.JWT_SECRET);
};

// ROUTES
// =====================================================================================
ctrl.login = (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    models.UserInfo.findOne({
        where: {
            email: email
        }
    })
        .then(response => {
            // console.log(response);
            if (response) {
                // login
                var inputHash = ctrl.getHash(password, response.salt /* want to use whatever salt was given to us from the database */);
                if (inputHash === response.hash) {
                    console.log("USER FOUND");
                    res.json({ token: generateJWT(response /* response is the user from the database */) });
                } else {
                    console.log("WRONG PASSWORD");
                    return res.status(400).end('Wrong Password');
                }
            } else {
                // err
                console.log("USER NOT FOUND");
                return res.status(404).end('User Not Found');
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
        phone: req.body.phone.trim().replace(/[-()]+/g, '')
    };

    var salt = ctrl.getSalt();
    var hash = ctrl.getHash(req.body.password, salt);
    user.salt = salt;
    user.hash = hash;

    models.UserInfo.findOne({
        where: {
            email: user.email
        }
    })
        .then(response => {
            // console.log(response);
            if (response === null) {
                models.UserInfo.create(user)
                    .then(response => {
                        // console.log(response);
                        console.log("REGISTRATION SUCCESSFUL");
                        res.json({ success: true }); // don't want to do res.json(response) here because you don't want to include the salt and hash in the response to the user!!
                    })
                    .catch(err => {
                        console.error(err);
                        throw err;
                    });
            } else {
                console.log("USER ALREADY EXISTS");
            }
        })
        .catch(err => {
            console.error(err);
        });
};

// EXPORT
// =====================================================================================
module.exports = ctrl;