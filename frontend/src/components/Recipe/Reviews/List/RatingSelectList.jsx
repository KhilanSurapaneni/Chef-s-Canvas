import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';

const RatingSelectList = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
    onRatingChange(newValue);
  };

  return (
    <div className="mb-6 text-center">
      <Rating
        name="rating"
        value={rating}
        onChange={handleRatingChange}
        size="large"
      />
    </div>
  );
};

export default RatingSelectList;
