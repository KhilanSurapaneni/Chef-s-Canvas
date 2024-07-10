import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../AuthContext';

const RecipeActions = ({ backend_url }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to get the authentication state

  const handleDelete = async () => {
    try {
      await axios.delete(`${backend_url}/recipes/${id}`, { withCredentials: true });
      navigate('/recipes');
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
      } else {
        const errorMessage = error.response?.data?.message || 'An error occurred while deleting the recipe. Please try again later.';
        navigate('/error', { state: { message: errorMessage } });
      }
      console.error('Error deleting recipe:', error);
    }
  };

  return (
    <div className="flex justify-between mt-6 space-x-4">
      {isAuthenticated && (
        <>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Delete
          </button>
          <button
            onClick={() => {
              navigate(`/recipes/${id}/edit`);
            }}
            className="flex items-center justify-center px-6 py-3 bg-yellow-600 text-white rounded-lg shadow hover:bg-yellow-700 transition duration-300 transform hover:scale-105"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};

export default RecipeActions;
