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
  const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${backend_url}/recipes/${id}`);
        setRecipe(response.data);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
        } else {
          const errorMessage = error.response?.data?.message || 'An error occurred while fetching the recipe. Please try again later.';
          navigate('/error', { state: { message: errorMessage } });
        }
        console.error('Error fetching recipe:', error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [id, backend_url, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <BackButton />
      <RecipeDetails recipe={recipe} />
      <RecipeActions backend_url={backend_url} />
    </div>
  );
};

export default Recipe;
