import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Typography, Button, Box } from '@mui/material';
import RatingSelect from './RatingSelect';
import CommentInput from './CommentInput';

const ReviewForm = ({ backend_url }) => {
  const { id } = useParams();
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!review.rating || review.rating < 1 || review.rating > 5) {
      setError('Please provide a rating between 1 and 5 stars.');
      return false;
    }
    if (!review.comment || review.comment.trim().length === 0) {
      setError('Please provide a comment.');
      return false;
    }
    return true;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post(`${backend_url}/reviews/${id}`, review);
      toast.success('Review submitted successfully!');
      navigate(`/reviews/${id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
      toast.error('Failed to submit the review.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 6, p: 4, bgcolor: 'white', boxShadow: 1, borderRadius: 1 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          Submit a Review
        </Typography>
        {error && <Typography color="error" textAlign="center" mb={2}>{error}</Typography>}
        <RatingSelect review={review} setReview={setReview} />
        <CommentInput review={review} setReview={setReview} />
        <Box textAlign="center" mt={4}>
          <Button type="submit" variant="contained" color="primary">
            Submit Review
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ReviewForm;
