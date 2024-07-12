import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const RecipeSection = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Box mb={6}>
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        mb={4}
        color={theme.palette.text.primary}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default RecipeSection;
