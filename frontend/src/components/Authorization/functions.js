export const handleSubmit = async (event, username, email, password, axios, navigate, backend_url, setError) => {
    event.preventDefault();
    setError(null);
    try {
        const response = await axios.post(`${backend_url}/register`, { username, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const user = response.data;
        console.log(user);
        navigate("/recipes");
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code that falls out of the range of 2xx
            setError(error.response.data.message || 'An error occurred. Please try again.');
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            setError('No response from server. Please try again later.');
            console.error('Request data:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            setError('An error occurred. Please try again.');
            console.error('Error message:', error.message);
        }
        console.error('Error config:', error.config);
    }
};


export const handleSubmitLogin = async (event, username, password, axios, navigate, backend_url, setError) => {
    event.preventDefault();
    setError(null);
    try {
        const response = await axios.post(`${backend_url}/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const user = response.data.user;
        console.log(user);
        navigate("/recipes");
    } catch (error) {
        if (error.response && error.response.status === 401) {
            setError('Invalid username or password');
        } else {
            setError('An error occurred. Please try again.');
        }
        console.error(error);
    }
};

