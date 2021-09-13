const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Sent extends Model { }

Sent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        sent_to_email: {
            type: DataTypes.STRING,
        },
        sent_by: {
            type: DataTypes.STRING,
        },
        subject: {
            type: DataTypes.STRING,
        },
        message: {
            type: DataTypes.STRING,
        },
        invoice_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'invoice',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },

    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'sent',
    }
);

module.exports = Sent;
