const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Project extends Model { }

Project.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.INTEGER,
        },

        due_date: {
            type: DataTypes.DATE,
        },
        company_id: {
            type: DataTypes.INTEGER,
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
        modelName: 'project',
    }
);

module.exports = Project;
