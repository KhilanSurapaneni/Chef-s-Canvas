import React from 'react';
import { CardMedia, Box } from '@mui/material';

const RecipeImage = ({ image, title }) => {
  return (
    <Box display="flex" justifyContent="center" mb={2}>
      <CardMedia
        component="img"
        alt={title}
        height="100"
        image={image}
        title={title}
        sx={{ width: 'auto', maxWidth: '40%', borderRadius: 2 }}
      />
    </Box>
  );
};

export default RecipeImage;
