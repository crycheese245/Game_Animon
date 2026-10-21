import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { initDatabase, isDbConnected } from './server/config/database.js';
import apiRouter from './server/routes/api.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', apiRouter);

// Static files (Phục vụ client trước, fallback tới root nếu cần)
const clientDir = path.join(__dirname, 'client');
app.use(express.static(clientDir));
app.use(express.static(__dirname));

// Route chính
app.get('/', (req, res) => {
    res.sendFile(path.join(clientDir, 'index.html'));
});

// Khởi động server & Database
async function startServer() {
    console.log('🔄 Đang khởi tạo hệ thống...');
    await initDatabase();

    app.listen(PORT, () => {
        console.log(`====================================================`);
        console.log(`🎮 GAME ANIMON ENGINE - HTML5 CANVAS & SEQUELIZE`);
        console.log(`🌐 Truy cập game tại: http://localhost:${PORT}`);
        console.log(`🗄️ Cơ sở dữ liệu: ${isDbConnected ? 'MySQL (Sequelize Connected)' : 'Fallback (Offline Mode)'}`);
        console.log(`====================================================`);
    });
}

startServer();
