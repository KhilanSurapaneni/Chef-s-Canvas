import React from 'react';

const RecipeTags = ({ tags }) => {
  return (
    <div className="flex flex-wrap mt-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default RecipeTags;
