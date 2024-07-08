import React from 'react';

const RecipeImage = ({ image, title }) => {
  return (
    <img src={image} alt={title} className="w-full h-64 object-cover rounded-lg mb-6" />
  );
};

export default RecipeImage;
