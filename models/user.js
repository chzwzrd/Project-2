// Going to need models for:

// 1. User (POST)
// 2. Dogs (GET)
// 3. RentHistory (FOREIGN KEYS: User and Dog) 
//  use handlebars for this, axios here, res.render, save to an

// db stuff in api files

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// ___ START of User model   __________________________________________________________________________________________________________________________
module.exports = function (sequelize, DataTypes) {
    // Defining our User table
    var User = sequelize.define("User", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.INTEGER
        },
        phone: {
            type: Sequelize.STRING
        },
        zip: {
            type: Sequelize.INTEGER
        }
    })

    User.associate = function (models) {
        // Associating User with Dogs
        // When an UserAccount is deleted, also delete any associated Posts
        User.hasMany(models.Dogs, {
            onDelete: "cascade"
        });
    };

    return User;
};

// ___ END of User Model   _____________________________________________________________________________________________________________________________

