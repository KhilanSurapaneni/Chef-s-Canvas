import React from 'react';
import { Typography, Box } from '@mui/material';

const RecipeSection = ({ title, children }) => {
  return (
    <Box mb={6}>
      <Typography variant="h5" component="h2" fontWeight="bold" mb={4}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default RecipeSection;
