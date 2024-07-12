import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, Box, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backend_url}/logout`, {}, { withCredentials: true });
      setIsAuthenticated(false);
      toast.success("Successfully logged out!");
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during logout. Please try again later.';
      navigate('/error', { state: { message: errorMessage } });
      console.error('Error logging out:', error);
    }
    handleClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}
        >
          Chef's Canvas
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, flexGrow: 1 }}>
          <Button component={Link} to="/recipes" sx={{ color: 'inherit' }}>
            Browse Recipes
          </Button>
          <Button component={Link} to="/recipes/create" sx={{ color: 'inherit' }}>
            Create a Recipe
          </Button>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {!isAuthenticated ? (
            <>
              <Button component={Link} to="/register" sx={{ color: 'inherit' }}>
                Register
              </Button>
              <Button component={Link} to="/login" sx={{ color: 'inherit' }}>
                Login
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ color: 'inherit' }}>
              Logout
            </Button>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            sx={{ color: 'inherit' }}
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/recipes" onClick={handleClose}>
              Browse Recipes
            </MenuItem>
            <MenuItem component={Link} to="/recipes/create" onClick={handleClose}>
              Create a Recipe
            </MenuItem>
            {!isAuthenticated ? (
              <>
                <MenuItem component={Link} to="/register" onClick={handleClose}>
                  Register
                </MenuItem>
                <MenuItem component={Link} to="/login" onClick={handleClose}>
                  Login
                </MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            )}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
