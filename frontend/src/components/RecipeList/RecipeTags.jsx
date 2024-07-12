import React from 'react';
import { Chip, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const RecipeTags = ({ tags }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleTagClick = (event, tag) => {
    event.stopPropagation();
    navigate(`/`);
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {tags.map((tag, index) => (
        <Chip
          key={index}
          label={tag}
          variant="outlined"
          size="small"
          onClick={(event) => handleTagClick(event, tag)}
          sx={{
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.dark,
            borderColor: theme.palette.primary.main,
            '&:hover': {
              transform: 'scale(1.1)',
              backgroundColor: theme.palette.primary.dark,
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
            },
          }}
        />
      ))}
    </Box>
  );
};

export default RecipeTags;
