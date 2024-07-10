// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

const backend_url = import.meta.env.VITE_BACKEND_URL;

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${backend_url}/loggedIn`, { withCredentials: true });
                setIsAuthenticated(response.data.logged_in);
            } catch (error) {
                console.error('Error checking authentication status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};