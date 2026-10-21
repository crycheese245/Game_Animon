import { Router } from 'express';
import { isDbConnected } from '../config/database.js';
import saveController from '../controllers/saveController.js';
import monsterController from '../controllers/monsterController.js';

const router = Router();

// Trạng thái server & DB
router.get('/status', (req, res) => {
    res.json({
        server: 'online',
        database: isDbConnected ? 'connected (MySQL Sequelize)' : 'fallback (Local JSON)',
        isDbConnected,
        timestamp: new Date().toISOString()
    });
});

// Quản lý Saves
router.get('/saves', saveController.list);
router.get('/saves/:slot', saveController.load);
router.post('/saves', saveController.save);
router.delete('/saves/:slot', saveController.delete);

// Quản lý Monsters
router.get('/monsters', monsterController.getAll);
router.get('/monsters/:code', monsterController.getByCode);

export default router;

