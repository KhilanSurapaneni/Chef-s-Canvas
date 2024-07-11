import React from 'react';

const RecipeImage = ({ image, title }) => {
  return (
    <img src={image} alt={title} className="w-80 h-60 object-cover rounded-lg mb-4" />

  );
};

export default RecipeImage;
