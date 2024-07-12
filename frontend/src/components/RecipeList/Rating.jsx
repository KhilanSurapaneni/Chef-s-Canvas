import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';

const getRatingDetails = (recipe) => {
  if (recipe.reviews.length === 0) {
    return { numRatings: 0 };
  }

  const sum = recipe.reviews.reduce((acc, review) => acc + review.rating, 0);
  const count = recipe.reviews.length;
  const avgRating = (sum / count).toFixed(2);

  return { numRatings: count, avgRating: parseFloat(avgRating) };
};

const Rating = ({ recipe, showNumRatings = false }) => {
  const navigate = useNavigate();
  const { numRatings, avgRating } = getRatingDetails(recipe);

  const handleRatingClick = (event) => {
    event.stopPropagation();
    navigate(`/`);
  };

  return (
    <Box display="flex" alignItems="center" onClick={handleRatingClick} sx={{ cursor: 'pointer', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)', color: 'primary.dark' } }}>
      {numRatings === 0 ? (
        <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 'bold' }}>
          No reviews
        </Typography>
      ) : (
        <>
          <Typography variant="body1" component="span" sx={{ fontWeight: 'bold' }}>
            {avgRating}
          </Typography>
          <StarIcon sx={{ ml: 0.5, color: 'gold' }} />
          {showNumRatings && (
            <Typography variant="body2" color="textSecondary" sx={{ ml: 1, fontWeight: 'bold' }}>
              ({numRatings} {numRatings > 1 ? 'reviews' : 'review'})
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default Rating;
