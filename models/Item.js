const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model { }

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        description: {
            type: DataTypes.STRING,
        },
        units: {
            type: DataTypes.INTEGER,
        },
        unit_price: {
            type: DataTypes.INTEGER,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'invoice',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
    }
);

module.exports = Item;
