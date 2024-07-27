import express from 'express';
import { getUsers, addUser, updateUser, deleteUser,approveTask } from '../controllers/userController.js';
import auth from '../middleware/auth.js';
import User from '../models/user.js';

const router = express.Router();

router.get('/count', async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/approve/:id', approveTask);
router.get('/', auth, getUsers);
router.post('/', auth, addUser);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);

export default router;
