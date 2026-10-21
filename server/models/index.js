import { sequelize, isDbConnected, initDatabase } from '../config/database.js';
import User from './User.js';
import GameSave from './GameSave.js';
import Monster from './Monster.js';

User.hasMany(GameSave, { foreignKey: 'userId', as: 'saves' });
GameSave.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
    sequelize,
    isDbConnected,
    initDatabase,
    User,
    GameSave,
    Monster
};

