
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const register = async (req, res) => {
  const { username, email, password,role } = req.body;
  console.log( username, email, password)
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

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token,role:user.role });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
};
