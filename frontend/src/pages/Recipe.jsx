import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
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
    <div className="container mx-auto my-8 p-4">
      <RecipeActions backend_url={backend_url} />
      <article className="p-6 bg-white">
        <RecipeDetails recipe={recipe}/>
      </article>
    </div>
  );
};

export default Recipe;
