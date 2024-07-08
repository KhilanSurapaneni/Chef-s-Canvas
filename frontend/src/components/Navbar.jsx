import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <Link to="/" className="text-white text-lg font-bold">Chef's Canvas</Link>
        <div className="flex items-center">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/recipes" className="text-white hover:text-gray-400">Browse Recipes</Link>
            <Link to="/recipes/create" className="text-white hover:text-gray-400">Create a Recipe</Link>
          </div>
          <button
            className="text-white md:hidden"
            type="button"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => document.getElementById('navbarNavAltMarkup').classList.toggle('hidden')}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="md:hidden hidden" id="navbarNavAltMarkup">
        <Link to="/recipes" className="block text-white hover:text-gray-400 px-4 py-2">Browse Recipes</Link>
        <Link to="/recipes/create" className="block text-white hover:text-gray-400 px-4 py-2">Create a Recipe</Link>
      </div>
    </nav>
  );
}

export default Navbar;
