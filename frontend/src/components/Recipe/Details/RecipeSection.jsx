import React from 'react';

const RecipeSection = ({ title, children }) => {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
};

export default RecipeSection;
