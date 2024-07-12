import React from 'react';
import { TextField, useTheme } from '@mui/material';

const CommentInput = ({ review, setReview }) => {
  const theme = useTheme();

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
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme.palette.primary.main,
          },
          '&:hover fieldset': {
            borderColor: theme.palette.primary.dark,
          },
          '&.Mui-focused fieldset': {
            borderColor: theme.palette.primary.dark,
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: theme.palette.primary.dark,
        },
      }}
    />
  );
};

export default CommentInput;
