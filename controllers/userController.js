import User from '../models/user.js';
import Task from '../models/task.js';
import bcrypt from 'bcryptjs';

// Get all users (Admin only)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Add a new user (Admin only)
export const addUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User already registered' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || 'User',
    });

    await user.save();

    res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error adding user' });
  }
};

// Update user details (Admin only)
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, role } = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, { username, email, role }, { new: true });
    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete a user (Admin only)
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

// Approve a task (Admin only)
export const approveTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndUpdate(id, { status: 'Completed' }, { new: true });
    res.json({ message: 'Task approved successfully', task });
  } catch (error) {
    res.status(500).json({ error: 'Error approving task' });
  }
};
