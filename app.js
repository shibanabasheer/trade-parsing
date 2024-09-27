const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const tradeRoutes = require('./routes/tradeRoutes');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/trades', tradeRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
