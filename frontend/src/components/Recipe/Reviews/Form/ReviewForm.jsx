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
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (review.rating <= 0) {
      errors.rating = 'Rating must be greater than 0';
    }
    if (!review.comment.trim()) {
      errors.comment = 'Comment cannot be empty';
    }
    return errors;
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    setError(null);
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    try {
      await axios.post(`${backend_url}/recipes/${id}/reviews`, {
        review
      }, { withCredentials: true });
      toast.success('Review submitted successfully!');
      setReview({ rating: '', comment: '' }); // Clear the form
      window.location.reload();
      navigate(`/recipes/${id}`);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Navigate to the login page if the error is related to authorization
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
      console.error('Error submitting review:', error);
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
        {validationErrors.rating && <Typography color="error" textAlign="center">{validationErrors.rating}</Typography>}
        <CommentInput review={review} setReview={setReview} />
        {validationErrors.comment && <Typography color="error" textAlign="center">{validationErrors.comment}</Typography>}
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
