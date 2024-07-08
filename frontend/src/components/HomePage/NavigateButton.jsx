import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavigateButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/recipes')}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
    >
      Go to All Recipes
    </button>
  );
};

export default NavigateButton;
