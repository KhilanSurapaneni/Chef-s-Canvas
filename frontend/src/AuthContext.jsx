import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);
    const [isReviewAuthor, setIsReviewAuthor] = useState(false);
    const [loading, setLoading] = useState(true);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get(`${backend_url}/loggedIn`, { withCredentials: true });
            setIsAuthenticated(response.data.logged_in);
        } catch (error) {
            console.error('Error checking authentication status:', error);
        }
    };

    const checkAuthorStatus = async (recipeId) => {
        try {
            const response = await axios.get(`${backend_url}/recipes/${recipeId}/isAuthor`, { withCredentials: true });
            setIsAuthor(response.data.isAuthor);
        } catch (error) {
            console.error('Error checking author status:', error);
        }
    };

    const checkReviewAuthorStatus = async (recipeId, reviewId) => {
        try {
            const response = await axios.get(`${backend_url}/recipes/${recipeId}/reviews/${reviewId}/isAuthor`, { withCredentials: true });
            return response.data; // Return the result of the API call
        } catch (error) {
            console.error('Error checking review author status:', error);
            return { isAuthor: false };
        }
    };
    

    useEffect(() => {
        checkAuthStatus().finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAuthor, setIsAuthor, isReviewAuthor, setIsReviewAuthor, checkAuthorStatus, checkReviewAuthorStatus, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
