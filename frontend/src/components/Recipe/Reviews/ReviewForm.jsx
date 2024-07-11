import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { handleSubmit } from './functions';
import RatingSelect from './RatingSelect';
import CommentInput from './CommentInput';
import ErrorMessage from './ErrorMessage';

const ReviewForm = ({ backend_url }) => {
  const { id } = useParams();
  const [review, setReview] = useState({ rating: 1, comment: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!review.rating || review.rating < 1 || review.rating > 5) {
      setError('Please provide a rating');
      return false;
    }
    if (!review.comment || review.comment.trim().length === 0) {
      setError('Please provide a comment.');
      return false;
    }
    return true;
  };
  
  return (
    <form 
      onSubmit={(event) => handleSubmit(event, setError, backend_url, axios, id, review, setReview, toast, navigate)} 
      className="bg-white p-8 rounded-lg shadow-md mt-6 max-w-lg mx-auto"
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Submit a Review</h2>
      {error && <ErrorMessage error={error} />}
      <RatingSelect review={review} setReview={setReview} />
      <CommentInput review={review} setReview={setReview} />
      <div className="flex justify-center">
        <button
          type="submit"
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition duration-300"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
