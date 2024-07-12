import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';

const RecipeTitle = ({ title, created_by }) => {
  const theme = useTheme();

  return (
    <Box textAlign="center" mb={4}>
      <Typography
        variant="h3"
        component="h1"
        fontWeight="bold"
        mb={2}
        color={theme.palette.text.primary}
      >
        {title}
      </Typography>
      <Typography
        variant="subtitle1"
        color={theme.palette.text.secondary}
      >
        by {created_by}
      </Typography>
    </Box>
  );
};

export default RecipeTitle;
