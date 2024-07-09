import React from 'react';
import LoginForm from '../components/Authorization/LoginForm';
const Login = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <LoginForm backend_url={backend_url} />
            </div>
        </div>
    );
};

export default Login;
