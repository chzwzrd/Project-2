<<<<<<< HEAD
// // Going to need models for:

// // 1. User (POST)
// // 2. Dogs (GET)
// // 3. RentHistory (FOREIGN KEYS: User and Dog) 
=======
// Going to need models for:

// 1. User (POST)
// 2. Dogs (GET)
// 3. RentHistory (FOREIGN KEYS: User and Dog) 
>>>>>>> bed013f3f072bb4f74a0fda9b27c33d44cbd3e41
// //    use handlebars for this, axios here, res.render, save to an

// // db stuff in api files

// // Sequelize (capital) references the standard library
// var Sequelize = require("sequelize");
// // sequelize (lowercase) references my connection to the DB.
// var sequelize = require("../config/connection.js");

// // ___ START of RentHistory model   __________________________________________________________________________________________________________________________
// module.exports = function (sequelize, DataTypes) {
//     // Defining our User table
//     var RentHistory = sequelize.define("UserHistory", {
//         OrderID: {
//             type: Sequelize.INTEGER
//         },
//         PetName: {
//             type: Sequelize.STRING
//         },
//         Gender: {
//             type: Sequelize.STRING
//         },
//         DATE: {
//             type: Sequelize.INTEGER
//         },
//         Location: {
//             type: Sequelize.STRING
//         }
//     });

//     RentHistory.associate = function (models) {

//         // Setting a many to one relationship 
//         RentHistory.belongsToMany(models.User, {

//         });
//         //
//     };
    
//     return RentHistory;
// };

// // ___ END of RentHistory Model   _____________________________________________________________________________________________________________________________



