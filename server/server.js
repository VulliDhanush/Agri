import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import jobRoutes from './routes/jobs.js';
import machineRoutes from './routes/machines.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
if (mongoose.connection.readyState === 0) {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/farmers-portal';
  mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err.message));
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/machines', machineRoutes);

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
