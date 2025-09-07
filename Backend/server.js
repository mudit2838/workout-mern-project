const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Import Routes
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

// Load Environment Variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Simple Request Logger Middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// API Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));

    app.get('/login', (req, res) => {
        // Only serve index.html for non-API routes
        if (!req.path.startsWith('/api')) {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        }
    });
}

// Port and MongoDB URI from .env
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and Start Server
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Successfully connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error);
    });
