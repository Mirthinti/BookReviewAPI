require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes (you can customize origin if needed)
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Simple test route to verify server is working without auth
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Route handlers
app.use('/api/auth', authRoutes);     // No auth middleware here, public routes
app.use('/api/books', bookRoutes);    // Protected routes have middleware inside routes
app.use('/api', reviewRoutes);        // Protected routes have middleware inside routes

// Global error handler (optional but useful)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
