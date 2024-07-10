import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const errorMessage = state?.message || 'Something went wrong.';

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-6">Error</h2>
                <p className="text-red-600 mb-4">{errorMessage}</p>
                <button
                    onClick={handleBack}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default Error;
