import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const backend_url = 'http://localhost:3000'; // Backend URL


    // This is essentially how we get the data from the backend, we use effect to make sure it is only used once, notice the empty [] at the end
    useEffect(() => {
        const get_data = async () => {
            try {
                //using axios to get it loading
                const response = await axios.get(`${backend_url}/recipes`);
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            } finally {
                //this allows to have a loading state
                setLoading(false);
            }
        };

        get_data();
    }, []);

    //this renders the spinner
    if (loading) {
        return <Spinner />;
    }

    //This renders the list of recipes
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recipes.map((recipe) => (
                    <Link key={recipe._id} to={`/recipes/${recipe._id}`}>
                        <div className="p-4 border rounded shadow-md">
                            <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-full h-48 object-cover rounded"
                            />
                            <h2 className="text-xl font-semibold mt-2">{recipe.title}</h2>
                            <p className="text-gray-600">Prep Time: {recipe.prep_time} mins</p>
                            <p className="text-gray-600">Cook Time: {recipe.cook_time} mins</p>
                            <p className="text-gray-600">Servings: {recipe.servings}</p>
                            <p className="text-gray-600">Difficulty: {recipe.difficulty}</p>
                            <p className="text-gray-600">Calories: {recipe.nutrition.calories}</p>
                            <div className="flex flex-wrap mt-2">
                                {recipe.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;
