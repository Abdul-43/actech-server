import express from 'express';
import { getTasks, addTask } from '../controllers/taskController.js';
import auth from '../middleware/auth.js';
import Task from '../models/task.js';

const router = express.Router();

router.get('/count', async (req, res) => {
    try {
        const count = await Task.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/', auth, getTasks);
router.post('/', auth, addTask);
// router.put('/approve/:id', auth, updateTaskStatus);

export default router;
