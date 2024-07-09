import React from 'react';
import RegisterForm from '../components/Authorization/RegisterForm';

const Register = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <RegisterForm backend_url={backend_url}/>
            </div>
        </div>
    );
};

export default Register;
