// src/components/CreateRecipe/DirectionList.js

import React from 'react';
import FormTextArea from './FormTextArea';

const DirectionList = ({ directions, handleDirectionChange, addDirection, removeDirection }) => (
  <div className="mb-4">
    <label className="block text-lg font-medium mb-2">Directions</label>
    <ol>
      {directions.map((direction, index) => (
        <li key={index} className="mb-3 flex items-center space-x-2">
          <div className="flex-grow">
            <FormTextArea
              label=""
              id={`direction-${index}`}
              name="direction"
              value={direction}
              onChange={(e) => handleDirectionChange(index, e)}
              required
            />
          </div>
          <button
            type="button"
            className="bg-red-500 text-white rounded px-4 py-2"
            onClick={() => removeDirection(index)}
          >
            Remove
          </button>
        </li>
      ))}
    </ol>
    <button
      type="button"
      className="bg-blue-500 text-white rounded px-4 py-2 mb-3"
      onClick={addDirection}
    >
      Add Direction
    </button>
  </div>
);

export default DirectionList;
