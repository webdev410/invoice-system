const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Address extends Model { }

Address.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        address_1: {
            type: DataTypes.STRING,
        },
        address_2: {
            type: DataTypes.STRING,
        },
        city: {
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        zip_code: {
            type: DataTypes.INTEGER,
            defaultValue: 00000,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'company',
                key: 'id',
            },
        },


    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'address',
    }
);

module.exports = Address;
