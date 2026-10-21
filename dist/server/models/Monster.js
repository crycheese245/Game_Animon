import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Monster = sequelize.define('Monster', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    code: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'Thường'
    },
    baseHp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 50
    },
    baseAttack: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20
    },
    baseDefense: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 15
    },
    baseSpeed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 20
    },
    spriteUrl: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    skills: {
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: []
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'monsters',
    timestamps: true
});

export default Monster;

