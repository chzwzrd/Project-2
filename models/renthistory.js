// Going to need models for:

// 1. User (POST)
// 2. Dogs (GET)
// 3. RentHistory (FOREIGN KEYS: User and Dog) 
//    use handlebars for this, axios here, res.render, save to an

// db stuff in api files

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
var sequelize = require("../config/connection.js");

// ___ START of RentHistory model   __________________________________________________________________________________________________________________________
module.exports = function (sequelize, DataTypes) {
    // Defining our User table
    var RentHistory = sequelize.define("User", {
        OrderID: {
            type: Sequelize.INTEGER
        },
        Date: {
            type: Sequelize.STRING
        }
    });

    RentHistory.associate = function (models) {

        // Setting a many to one relationship 
        RentHistory.belongsToMany(models.User, {
            
        });
        //
    };

    return RentHistory;
};

// ___ END of RentHistory Model   _____________________________________________________________________________________________________________________________



