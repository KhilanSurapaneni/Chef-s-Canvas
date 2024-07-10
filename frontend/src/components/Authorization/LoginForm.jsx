import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSubmitLogin } from './functions';
import InputField from './InputField';
import ErrorMessage from './ErrorMessage';
import { AuthContext } from '../../AuthContext';
import { toast } from "react-toastify";

const LoginForm = ({ backend_url }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext); // Use AuthContext to get setIsAuthenticated

    return (
        <form onSubmit={(event) => handleSubmitLogin(event, username, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast)} className="space-y-4">
            <ErrorMessage message={error} />
            <InputField
                id="username"
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Login
            </button>
        </form>
    );
};

export default LoginForm;
