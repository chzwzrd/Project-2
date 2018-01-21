// Going to need models for:

// 1. UserInfo (POST)
// 2. Dogs (GET)
// 3. RentHistory (FOREIGN KEYS: UserInfo and Dog) 
//  use handlebars for this, axios here, res.render, save to an

// db stuff in api files

// Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// ___ START of UserInfo model   __________________________________________________________________________________________________________________________
module.exports = function(sequelize, DataTypes) {
    // Defining our UserInfo table
    var UserInfo = sequelize.define("UserInfo", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        zip: {
            type: DataTypes.INTEGER
        }
    })

    // UserInfo.associate = function (models) {
    //     // Associating UserInfo with Dogs
    //     // When an UserAccount is deleted, also delete any associated Posts
    //     UserInfo.hasMany(models.Dogs, {
    //         onDelete: "cascade"
    //     })

    return UserInfo;
};

// ___ END of UserInfo Model   _____________________________________________________________________________________________________________________________

