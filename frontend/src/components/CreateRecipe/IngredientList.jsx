import React from 'react';

const IngredientList = ({ ingredients, handleIngredientChange, addIngredient, removeIngredient }) => (
  <div className="mb-4">
    <label className="block text-lg font-medium mb-2">Ingredients</label>
    <ol>
      {ingredients.map((ingredient, index) => (
        <li key={index} className="mb-3 flex items-center space-x-2">
          <input
            type="text"
            name="ingredient"
            placeholder="Ingredient"
            value={ingredient.ingredient}
            onChange={(e) => handleIngredientChange(index, e)}
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
            min="0.01"
            step="any"
            required
            className="border border-gray-300 rounded px-4 py-2 w-full"
          />
          <button
            type="button"
            className="bg-red-500 text-white rounded px-4 py-2"
            onClick={() => removeIngredient(index)}
          >
            Remove
          </button>
        </li>
      ))}
    </ol>
    <button
      type="button"
      className="bg-blue-500 text-white rounded px-4 py-2 mb-3"
      onClick={addIngredient}
    >
      Add Ingredient
    </button>
  </div>
);

export default IngredientList;
