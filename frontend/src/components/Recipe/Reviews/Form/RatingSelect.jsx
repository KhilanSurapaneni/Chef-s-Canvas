import React from 'react';
import Rating from '@mui/material/Rating';

const RatingSelect = ({ review, setReview }) => {
  const handleRatingChange = (event, newValue) => {
    setReview(prevReview => ({
      ...prevReview,
      rating: newValue
    }));
  };

  return (
    <div className="mb-6 text-center">
      <Rating
        name="rating"
        value={review.rating}
        onChange={handleRatingChange}
        size="large"
      />
    </div>
  );
};

export default RatingSelect;
