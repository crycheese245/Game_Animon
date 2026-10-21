import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 3306;
const DB_NAME = process.env.DB_NAME || 'animon_db';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: Number(DB_PORT),
    dialect: 'mysql',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 15000,
        idle: 10000
    }
});

export let isDbConnected = false;

export async function initDatabase() {
    try {
        await sequelize.authenticate();
        isDbConnected = true;
        console.log('✅ [Sequelize] Kết nối cơ sở dữ liệu MySQL thành công!');
        
        // Đồng bộ hóa cấu trúc bảng
        await sequelize.sync({ alter: true });
        console.log('✅ [Sequelize] Đồng bộ các bảng dữ liệu thành công!');
    } catch (error) {
        isDbConnected = false;
        console.warn('⚠️ [Sequelize] Không thể kết nối tới MySQL:', error.message);
        console.log('ℹ️ [Hệ thống] Tự động kích hoạt chế độ Fallback Storage (File & LocalStorage) để trò chơi hoạt động bình thường.');
    }
    return isDbConnected;
}

export default sequelize;

