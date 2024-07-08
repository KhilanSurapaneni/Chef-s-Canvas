import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to Chef's Canvas</h1>
            <button
                onClick={() => navigate('/recipes')}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
            >
                Go to All Recipes
            </button>
        </div>
    );
}

export default HomePage