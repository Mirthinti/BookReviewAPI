const Book = require('../models/Book');
const Review = require('../models/Review');

// Add a new book (auth required)
exports.addBook = async (req, res) => {
    try {
        const { title, author, genre } = req.body;

        if (!title || !author || !genre) {
            return res.status(400).json({ message: 'Please provide title, author and genre' });
        }

        const newBook = new Book({ title, author, genre });
        await newBook.save();

        res.status(201).json(newBook);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all books (pagination + optional filters)
exports.getBooks = async (req, res) => {
    try {
        let { page = 1, limit = 10, author, genre } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const filter = {};
        if (author) filter.author = new RegExp(author, 'i');
        if (genre) filter.genre = new RegExp(genre, 'i');

        const books = await Book.find(filter)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Book.countDocuments(filter);

        res.json({ page, limit, total, books });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get book details by ID (with avg rating & paginated reviews)
exports.getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const book = await Book.findById(bookId);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        // Get reviews for the book with pagination
        const reviews = await Review.find({ book: bookId })
            .populate('user', 'username')
            .skip((page - 1) * limit)
            .limit(limit);

        // Calculate average rating
        const allReviews = await Review.find({ book: bookId });
        const avgRating =
            allReviews.reduce((acc, r) => acc + r.rating, 0) / (allReviews.length || 1);

        res.json({
            book,
            averageRating: avgRating.toFixed(2),
            reviews,
            reviewsCount: allReviews.length,
            page,
            limit,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Search books by title or author (partial, case-insensitive)
exports.searchBooks = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ message: 'Query parameter required' });

        const books = await Book.find({
            $or: [
                { title: new RegExp(query, 'i') },
                { author: new RegExp(query, 'i') },
            ],
        });

        res.json({ results: books });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
