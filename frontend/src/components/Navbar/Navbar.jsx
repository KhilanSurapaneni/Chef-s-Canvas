import React, { useState, useContext } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, useTheme, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import SearchBar from './SearchBar';
import MenuItems from './MenuItems';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

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
    <AppBar position="static" sx={{ backgroundColor: theme.palette.background.default, boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: { xs: '0 1rem', md: '0 2rem' } }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{ textDecoration: 'none', color: theme.palette.text.primary, fontWeight: 'bold' }}
        >
          Chef's Canvas
        </Typography>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', margin: { xs: '0 1rem', md: '0 2rem' } }}>
          <SearchBar />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <MenuItems 
            anchorEl={anchorEl} 
            handleMenu={handleMenu} 
            handleClose={handleClose} 
            isAuthenticated={isAuthenticated} 
            handleLogout={handleLogout} 
          />
          <IconButton
            edge="end"
            aria-label="menu"
            onClick={handleMenu}
            sx={{ display: { xs: 'flex', md: 'none' }, color : theme.palette.text.primary}}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
