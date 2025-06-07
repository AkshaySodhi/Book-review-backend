import Review from "../models/review.model.js";
import Book from "../models/book.model.js";

// Update a user's own review
export const updateReview = async (req, res) => {
    const review = await Review.findById(req.params.id);

    // Ensure review exists and belongs to the logged-in user
    if (!review || review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = req.body.rating ?? review.rating;
    review.comment = req.body.comment ?? review.comment;

    await review.save();
    res.status(200).json(review);
};

// Delete a user's own review
export const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.id);

    // Ensure review exists and belongs to the logged-in user
    if (!review || review.user.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }

    await Book.findByIdAndUpdate(review.book, { $pull: { reviews: review._id } });

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted' });
};
