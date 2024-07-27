import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes from './routes/authRoute.js';
import userRoutes from './routes/userRoute.js';
import taskRoutes from './routes/taskRoute.js';

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

