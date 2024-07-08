import React from 'react';
import { Link } from 'react-router-dom';

const MobileMenu = () => {
  return (
    <div className="md:hidden hidden" id="navbarNavAltMarkup">
      <Link to="/recipes" className="block text-white hover:text-gray-400 px-4 py-2">Browse Recipes</Link>
      <Link to="/recipes/create" className="block text-white hover:text-gray-400 px-4 py-2">Create a Recipe</Link>
    </div>
  );
};

export default MobileMenu;
