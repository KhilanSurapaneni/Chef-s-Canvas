import React, { useContext } from 'react';
import { Menu, MenuItem, Button, IconButton, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MenuItems = ({ anchorEl, handleMenu, handleClose, isAuthenticated }) => {
  const theme = useTheme();
  const { setIsAuthenticated } = useContext(AuthContext);
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

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
    <>
      <Button
        component={Link}
        to="/recipes"
        sx={{
          color: theme.palette.text.primary,
          marginRight: 2,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          display: { xs: 'none', md: 'inline-flex' },
        }}
      >
        Browse
      </Button>
      <Button
        component={Link}
        to="/recipes/create"
        sx={{
          color: theme.palette.text.primary,
          marginRight: 2,
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
          display: { xs: 'none', md: 'inline-flex' },
        }}
      >
        Create
      </Button>
      {!isAuthenticated ? (
        <>
          <Button
            component={Link}
            to="/register"
            sx={{
              color: theme.palette.text.primary,
              marginRight: 2,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              display: { xs: 'none', md: 'inline-flex' },
            }}
          >
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: theme.palette.text.primary,
              marginRight: 2,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              },
              display: { xs: 'none', md: 'inline-flex' },
            }}
          >
            Login
          </Button>
        </>
      ) : (
        <Button
          onClick={handleLogout}
          sx={{
            color: theme.palette.text.primary,
            marginRight: 2,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            },
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          Logout
        </Button>
      )}
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
        {[
          <MenuItem key="browse" component={Link} to="/recipes" onClick={handleClose}>
            Browse
          </MenuItem>,
          <MenuItem key="create" component={Link} to="/recipes/create" onClick={handleClose}>
            Create
          </MenuItem>,
          !isAuthenticated ? (
            [
              <MenuItem key="register" component={Link} to="/register" onClick={handleClose}>
                Register
              </MenuItem>,
              <MenuItem key="login" component={Link} to="/login" onClick={handleClose}>
                Login
              </MenuItem>
            ]
          ) : (
            <MenuItem key="logout" onClick={handleLogout}>
              Logout
            </MenuItem>
          )
        ]}
      </Menu>
    </>
  );
};

export default MenuItems;
