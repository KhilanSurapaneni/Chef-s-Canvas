import React from 'react';
import { Chip, Box } from '@mui/material';

const RecipeTags = ({ tags }) => {
  return (
    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ fontWeight: 'bold' }}
        />
      ))}
    </Box>
  );
};

export default RecipeTags;
