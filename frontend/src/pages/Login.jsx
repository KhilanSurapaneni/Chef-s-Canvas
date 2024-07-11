import React from 'react';
import LoginForm from '../components/Authorization/LoginForm';
const Login = () => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    return (
        <LoginForm backend_url={backend_url} />
    );
};

export default Login;
