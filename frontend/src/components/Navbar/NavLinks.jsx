import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks = () => {
  return (
    <>
      <Link to="/recipes" className="text-white hover:text-gray-400">Browse Recipes</Link>
      <Link to="/recipes/create" className="text-white hover:text-gray-400">Create a Recipe</Link>
      <Link to="/register" className="text-white hover:text-gray-400">Register</Link>
      <Link to="/login" className="text-white hover:text-gray-400">Login</Link>
    </>
  );
};

export default NavLinks;
