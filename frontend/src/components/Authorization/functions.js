export const handleSubmit = async (event, username, email, password, axios, navigate, backend_url, setError, setIsAuthenticated) => {
    event.preventDefault();
    setError(null);
    try {
        const response = await axios.post(`${backend_url}/register`, { username, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        setIsAuthenticated(true); // Set authentication state to true
        navigate("/recipes");
    } catch (error) {
        if (error.response) {
            // Handle specific client-side errors without redirecting
            const errorMessage = error.response.data.message || 'An error occurred. Please try again. Your email may already be registered. Please log in instead';
            setError(errorMessage);
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage);
            navigate('/error', { state: { message: errorMessage } });
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage);
            navigate('/error', { state: { message: errorMessage } });
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
};


export const handleSubmitLogin = async (event, username, password, axios, navigate, backend_url, setError, setIsAuthenticated) => {
    event.preventDefault();
    setError(null);
    try {
        const response = await axios.post(`${backend_url}/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        setIsAuthenticated(true); // Set authentication state to true
        navigate("/recipes");
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const errorMessage = 'Invalid username or password';
            setError(errorMessage);
            // Do not navigate to error page
        } else if (error.response) {
            // Handle other client-side errors without redirecting
            const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
            setError(errorMessage);
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage);
            navigate('/error', { state: { message: errorMessage } });
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage);
            navigate('/error', { state: { message: errorMessage } });
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
};

