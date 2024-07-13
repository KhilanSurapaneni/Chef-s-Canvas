import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";
import { Box, Button, Grid, useTheme } from '@mui/material';

const RecipeActions = ({ backend_url }) => {
  const { id } = useParams();
  const { isAuthenticated, isAuthor, checkAuthorStatus } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    if (isAuthenticated) {
      checkAuthorStatus(id);
    }
  }, [isAuthenticated, id, checkAuthorStatus]);

  const handleDelete = async () => {
    try {
      await axios.delete(`${backend_url}/recipes/${id}`, { withCredentials: true });
      toast.success("Successfully deleted recipe!");
      navigate('/recipes');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
      } else {
        const errorMessage = error.response?.data?.message || 'An error occurred while deleting the recipe. Please try again later.';
        navigate('/error', { state: { message: errorMessage } });
      }
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="flex-end" mt={2}>
      {isAuthenticated && isAuthor && (
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.dark } }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ backgroundColor: theme.palette.warning.main, '&:hover': { backgroundColor: theme.palette.warning.dark } }}
              onClick={() => navigate(`/recipes/${id}/edit`)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default RecipeActions;
