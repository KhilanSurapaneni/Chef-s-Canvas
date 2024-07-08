import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RecipeActions = ({ backend_url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between mt-6 space-x-4">
      <button
        onClick={async () => {
          await axios.delete(`${backend_url}/recipes/${id}`);
          navigate('/recipes');
        }}
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
      >
        Delete
      </button>
      <button
        onClick={() => {
          navigate(`/recipes/${id}/edit`);
        }}
        className="px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition duration-300"
      >
        Edit
      </button>
    </div>
  );
};

export default RecipeActions;
