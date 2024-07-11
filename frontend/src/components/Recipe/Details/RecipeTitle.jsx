import React from 'react';

const RecipeTitle = ({ title, created_by }) => {
  return (
    <>
      <h1 className="text-4xl font-bold mb-2">{title}</h1>
      <h3 className="text-lg text-gray-600 mb-6">by {created_by}</h3>
    </>
  );
};

export default RecipeTitle;
