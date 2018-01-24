// Keeping this for potential use later

// ___ START of UserSearch model   __________________________________________________________________________________________________________________________
module.exports = function(sequelize, DataTypes) {
    // Defining our UserInfo table
    var UserSearch = sequelize.define("UserInfo", {
        animal: {
            type: DataTypes.STRING
        },
        breed: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        sex: {
            type: DataTypes.STRING
        },
        zipCode: {
            type: DataTypes.STRING
        }
    })

    // UserInfo.associate = function (models) {
    //     // Associating UserInfo with Dogs
    //     // When an UserAccount is deleted, also delete any associated Posts
    //     UserInfo.hasMany(models.Dogs, {
    //         onDelete: "cascade"
    //     })

    return UserSearch;
};

// ___ END of UserSearch Model   ____