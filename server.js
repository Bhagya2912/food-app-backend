/* eslint-env node */
/* global process */
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan';
import testRoutes from './routes/testRoutes.js'; // 
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js'; 
import restaurantRoutes from './routes/restaurantRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import foodRoutes from './routes/foodRoutes.js'

// Load environment variables
dotenv.config();

//connection db
connectDb();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // ✅ This is what parses req.body as JSON
app.use(morgan('dev'));

// Routes
// URL => http://localhost:8080/api/v1/test/test-user
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use('/api/v1/food',foodRoutes);

app.get('/', (req, res) => {
  res.status(200).send('<h1>Welcome to Food Server App</h1>');
});

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(colors.bgMagenta(`Server running on port ${PORT}`));
});



