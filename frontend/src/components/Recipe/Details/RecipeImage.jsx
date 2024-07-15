import React from 'react';
import { Box } from '@mui/material';
import ImageCarousel from '../../RecipeList/ImageCarousel';

const RecipeImage = ({ images, title }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      mb={2} 
      sx={{ 
        maxWidth: '500px', 
        maxHeight: '500px', 
        width: '100%', 
        margin: 'auto' 
      }}
    >
      <ImageCarousel images={images} />
    </Box>
  );
};

export default RecipeImage;
