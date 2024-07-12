import React from 'react';
import { TextField } from '@mui/material';

const CommentInput = ({ review, setReview }) => {
  const handleChange = (e) => {
    setReview({ ...review, comment: e.target.value });
  };

  return (
    <TextField
      fullWidth
      margin="normal"
      label="Comment"
      multiline
      rows={4}
      value={review.comment}
      onChange={handleChange}
    />
  );
};

export default CommentInput;
