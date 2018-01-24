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
        salt: DataTypes.STRING,
        hash: DataTypes.STRING(1500)
    });

    return UserInfo;
};