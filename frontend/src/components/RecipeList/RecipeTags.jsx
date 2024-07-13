// RecipeTags.js
import React, { useContext } from 'react';
import { Chip, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../contexts/SearchContext";
import { toast } from "react-toastify";
import axios from 'axios';

const RecipeTags = ({ tags }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateSearchResults } = useContext(SearchContext);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleTagClick = async (event, tag) => {
    event.stopPropagation();
    try {
      const response = await axios.get(`${backend_url}/recipes/search`, {
        params: { query: tag },
      });
      updateSearchResults(tag, response.data);
      navigate('/search-results');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while searching. Please try again later.';
      toast.error(errorMessage);
      console.error('Error during search:', error);
    }
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
