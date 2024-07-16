import React from 'react';
import { Typography, Box, useTheme } from '@mui/material';
import CreatedBy from '../../RecipeList/CreatedBy';

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
      <CreatedBy username={created_by} />
    </Box>
  );
};

export default RecipeTitle;
