const Review = require('../models/Review');

// Add a review (one review per user per book)
exports.addReview = async (req, res) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;
        const { rating, comment } = req.body;

        // Check if user already reviewed this book
        const existingReview = await Review.findOne({ book: bookId, user: userId });
        if (existingReview) {
            return res.status(400).json({ message: 'You already reviewed this book' });
        }

        const review = new Review({ book: bookId, user: userId, rating, comment });
        await review.save();

        res.status(201).json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update your own review
exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id;
        const { rating, comment } = req.body;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to update this review' });
        }

        review.rating = rating || review.rating;
        review.comment = comment || review.comment;
        await review.save();

        res.json(review);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete your own review
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const userId = req.user.id;

        const review = await Review.findById(reviewId);
        if (!review) return res.status(404).json({ message: 'Review not found' });

        if (review.user.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }

        await review.remove();

        res.json({ message: 'Review deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};
