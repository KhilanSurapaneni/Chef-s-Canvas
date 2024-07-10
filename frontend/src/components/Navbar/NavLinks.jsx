import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const NavLinks = () => {
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${backend_url}/logout`);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during logout. Please try again later.';
      navigate('/error', { state: { message: errorMessage } });
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Link to="/recipes" className="text-white hover:text-gray-400">Browse Recipes</Link>
      <Link to="/recipes/create" className="text-white hover:text-gray-400">Create a Recipe</Link>
      <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
      <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
      <button
        onClick={handleLogout}
        className="text-white hover:text-gray-400"
      >
        Logout
      </button>
    </>
  );
};

export default NavLinks;
