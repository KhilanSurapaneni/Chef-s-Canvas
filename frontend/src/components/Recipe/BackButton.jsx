import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/recipes')}
      className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition duration-300 transform hover:scale-105"
    >
      Back to Recipes
    </button>
  );
};

export default BackButton;
