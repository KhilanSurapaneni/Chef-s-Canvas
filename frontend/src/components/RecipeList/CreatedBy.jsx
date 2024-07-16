import React, { useContext } from 'react';
import { Chip, useTheme, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from "../../contexts/SearchContext";
import { toast } from "react-toastify";
import axios from 'axios';

const CreatedBy = ({ username }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateSearchResults } = useContext(SearchContext);
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  const handleCreatedByClick = async (event) => {
    event.stopPropagation();
    try {
      const response = await axios.get(`${backend_url}/recipes/search`, {
        params: { query: username },
      });
      updateSearchResults(username, response.data);
      navigate('/search-results');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while searching. Please try again later.';
      toast.error(errorMessage);
      console.error('Error during search:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
      <Chip
        label={`${username}`}
        variant="outlined"
        size="small"
        onClick={handleCreatedByClick}
        sx={{
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'transform 0.3s, background-color 0.3s, color 0.3s',
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          borderColor: theme.palette.secondary.main,
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
          },
        }}
      />
    </Box>
  );
};

export default CreatedBy;
