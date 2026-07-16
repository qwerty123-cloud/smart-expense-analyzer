import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // allow the Vue client (running on a different port) to call this API
app.use(express.json()); // parse incoming JSON request bodies

// Health check - open http://localhost:3000/ in a browser to verify the API is running
app.get('/', (req, res) => {
  res.send('Smart Expense Analyzer API is running.');
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

const PORT = process.env.PORT || 3000;

async function connectDB() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected!');
}

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });
