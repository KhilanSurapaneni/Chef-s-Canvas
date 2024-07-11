import React from 'react';
import RegisterForm from '../components/Authorization/RegisterForm';

const Register = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL; // Accessing the VITE_BACKEND_URL environment variable
    return (
        <RegisterForm backend_url={backend_url}/>
    );
};

export default Register;
