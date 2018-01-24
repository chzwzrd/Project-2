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

// MODEL
// =====================================================================================
module.exports = function(sequelize, DataTypes) {
    // Defining our UserInfo table
    var UserInfo = sequelize.define("UserInfo", {
        first_name: {
            type: DataTypes.STRING,
            require: true,
            validate: {
                len: [1, 30]
            }
        },
        last_name: {
            type: DataTypes.STRING,
            require: true,
            validate: {
                len: [1, 30]
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            require: true,
            validate: {
                isEmail: true
            }
        },
        phone: {
            type: DataTypes.STRING,
            require: true,
            validate: {
                isNumeric: true,
                len: [10]
            }
        },
        // username: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         isAlphanumeric: true,
        //         min: 6
        //     }
        // },
        // password: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         min: 8
        //     }
        // },
        // zip: {
        //     type: DataTypes.STRING,
        //     require: true,
        //     validate: {
        //         isNumeric: true,
        //         len: [5]
        //     }
        // },
        salt: DataTypes.STRING,
        hash: DataTypes.STRING(1500)
    });

    // UserInfo.associate = function (models) {
    //     // Associating UserInfo with Dogs
    //     // When an UserAccount is deleted, also delete any associated Posts
    //     UserInfo.hasMany(models.Dogs, {
    //         onDelete: "cascade"
    //     })

    return UserInfo;
};