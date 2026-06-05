const dns = require('node:dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Database Connection & Server Initialization
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(cors()); // Allows frontend to make requests to backend port
app.use(express.json()); // Parses incoming json requests into req.body

// Routes Setup
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);


mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Database connection error:', err));
