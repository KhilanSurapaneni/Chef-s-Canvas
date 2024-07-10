import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../../AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

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
