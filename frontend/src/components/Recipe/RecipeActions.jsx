import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-toastify";

const RecipeActions = ({ backend_url }) => {
    const { id } = useParams();
    const { isAuthenticated, isAuthor, checkAuthorStatus } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuthenticated) {
            checkAuthorStatus(id);
        }
    }, [isAuthenticated, id, checkAuthorStatus]);

    const handleDelete = async () => {
        try {
            // Send a DELETE request to the backend to delete the recipe
            await axios.delete(`${backend_url}/recipes/${id}`, { withCredentials: true });
    
            // Show a success toast message
            toast.success("Successfully deleted recipe!");
    
            // Navigate to the recipes list page
            navigate('/recipes');
        } catch (error) {
            // Check if the error response status is 401 (Unauthorized) or 403 (Forbidden)
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                // Navigate to the error page with an authentication error message
                navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
            } else {
                // Extract error message from the response or use a default message
                const errorMessage = error.response?.data?.message || 'An error occurred while deleting the recipe. Please try again later.';
    
                // Navigate to the error page with the error message
                navigate('/error', { state: { message: errorMessage } });
            }
    
            // Log the error details to the console
            console.error('Error deleting recipe:', error);
        }
    };
    

    return (
        <div className="flex justify-between mt-6 space-x-4">
            {isAuthor && (
                <>
                    <button
                        onClick={handleDelete}
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
                </>
            )}
        </div>
    );
};

export default RecipeActions;
