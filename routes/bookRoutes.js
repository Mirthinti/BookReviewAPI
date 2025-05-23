const express = require('express');
const router = express.Router();
const {
    addBook,
    getBooks,
    getBookById,
    searchBooks
} = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

// Add a new book (auth required)
router.post('/', protect, addBook);

// Get all books (with pagination & filters)
router.get('/', getBooks);

// Get book details by ID (with reviews & avg rating)
router.get('/:id', getBookById);

// Search books by title or author
router.get('/search', searchBooks);

module.exports = router;
