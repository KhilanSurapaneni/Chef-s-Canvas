import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import BackButton from '../components/Recipe/BackButton';
import RecipeDetails from '../components/Recipe/RecipeDetails';
import RecipeActions from '../components/Recipe/RecipeActions';

const Recipe = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({
    nutrition: {},
    ingredients: [],
    directions: [],
    tags: [],
  });
  const navigate = useNavigate();
  const backend_url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${backend_url}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'An error occurred while fetching the recipe. Please try again later.';
        navigate('/error', { state: { message: errorMessage } });
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, backend_url, navigate]);

  if (loading) return <Spinner />;

  return (
    <div className="absolute top-4 left-0 m-4 p-4 bg-gray-100 max-w-screen-md">
      <div className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow duration-300">
        <RecipeDetails recipe={recipe} />
        <RecipeActions backend_url={backend_url} />
        <footer className="mt-4 text-sm text-center text-indigo-600 font-medium border-t pt-2">
          Created by: {recipe.created_by?.username}
        </footer>
      </div>
    </div>
  );
};

export default Recipe;
