import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const GameSave = sequelize.define('GameSave', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    slot: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    saveName: {
        type: DataTypes.STRING(100),
        defaultValue: 'Chuyến phiêu lưu'
    },
    mapId: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'pelletTown'
    },
    playerX: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 488
    },
    playerY: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 254
    },
    offsetX: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: -735
    },
    offsetY: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: -650
    },
    teamData: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: []
    },
    inventoryData: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: { pokeballs: 5, potions: 3, gold: 500 }
    },
    playtime: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {
    tableName: 'game_saves',
    timestamps: true
});

export default GameSave;

