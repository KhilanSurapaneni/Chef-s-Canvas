// Function to handle the submission of the registration form
export const handleSubmit = async (event, username, email, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous errors
    try {
        // Send a POST request to the backend to register the user
        const response = await axios.post(`${backend_url}/register`, { username, email, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Include credentials (cookies) in the request
        });
        setIsAuthenticated(true); // Set authentication state to true
        toast.success("Succesfully registered!"); // Show a success toast message
        navigate("/recipes"); // Navigate to the recipes page
    } catch (error) {
        if (error.response) {
            // Handle specific client-side errors without redirecting
            const errorMessage = error.response.data.message || 'An error occurred. Please try again. Your email may already be registered. Please log in instead';
            setError(errorMessage); // Set the error message
            console.error('Response data:', error.response.data); // Log the response data
            console.error('Response status:', error.response.status); // Log the response status
            console.error('Response headers:', error.response.headers); // Log the response headers
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Request data:', error.request); // Log the request data
        } else {
            // Something happened in setting up the request that triggered an error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Error message:', error.message); // Log the error message
        }
        console.error('Error config:', error.config); // Log the error configuration
    }
};

// Function to handle the submission of the login form
export const handleSubmitLogin = async (event, username, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous errors
    try {
        // Send a POST request to the backend to log in the user
        const response = await axios.post(`${backend_url}/login`, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true // Include credentials (cookies) in the request
        });
        setIsAuthenticated(true); // Set authentication state to true
        toast.success('Login successful!'); // Show a success toast message
        navigate("/recipes"); // Navigate to the recipes page
    } catch (error) {
        if (error.response && error.response.status === 401) {
            const errorMessage = 'Invalid username or password';
            setError(errorMessage); // Set the error message for invalid credentials
            // Do not navigate to error page
        } else if (error.response) {
            // Handle other client-side errors without redirecting
            const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message
            console.error('Response data:', error.response.data); // Log the response data
            console.error('Response status:', error.response.status); // Log the response status
            console.error('Response headers:', error.response.headers); // Log the response headers
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Request data:', error.request); // Log the request data
        } else {
            // Something happened in setting up the request that triggered an error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Error message:', error.message); // Log the error message
        }
        console.error('Error config:', error.config); // Log the error configuration
    }
};
