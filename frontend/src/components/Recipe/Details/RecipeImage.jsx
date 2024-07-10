import React from 'react';

const RecipeImage = ({ image, title }) => {
  return (
    <img src={image} alt={title} className="w-45 h-45 object-cover rounded-lg mb-4" />
  );
};

export default RecipeImage;
