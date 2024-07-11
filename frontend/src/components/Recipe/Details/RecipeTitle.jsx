import React from 'react';
import { Typography, Box } from '@mui/material';

const RecipeTitle = ({ title, created_by }) => {
  return (
    <Box textAlign="center" mb={4}>
      <Typography variant="h3" component="h1" fontWeight="bold" mb={2}>
        {title}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        by {created_by}
      </Typography>
    </Box>
  );
};

export default RecipeTitle;
