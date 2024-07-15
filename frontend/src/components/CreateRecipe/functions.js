// Handles changes to form fields by updating the state with the new value
export const handleChange = (event, setFormData, formData) => {
    const { name, value } = event.target; // Extract name and value from the event target
    setFormData({
      ...formData, // Spread the existing form data
      [name]: value // Update the specific field with the new value
    });
};

// Adds a new image URL to the images array
export const addImage = (images, setImages) => {
    setImages([...images, '']); // Add a new empty image URL string to the array
};

// Removes an image URL from the images array based on the index
export const removeImage = (index, images, setImages) => {
    const newImages = images.filter((_, i) => i !== index); // Filter out the image URL at the specified index
    setImages(newImages); // Update the state with the new images array
};

// Handles changes to specific image URLs by updating the state with the new value
export const handleImageChange = (index, event, images, setImages) => {
    const { value } = event.target; // Extract value from the event target
    const newImages = images.map((image, i) =>
      i === index ? value : image // Update the specific image URL with the new value
    );
    setImages(newImages); // Update the state with the new images array
};

// Adds a new ingredient to the ingredients array
export const addIngredient = (ingredients, setIngredients) => {
    setIngredients([...ingredients, { ingredient: '', quantity: '' }]); // Add a new empty ingredient object to the array
};

// Removes an ingredient from the ingredients array based on the index
export const removeIngredient = (index, ingredients, setIngredients) => {
    const newIngredients = ingredients.filter((_, i) => i !== index); // Filter out the ingredient at the specified index
    setIngredients(newIngredients); // Update the state with the new ingredients array
};

// Handles changes to specific ingredients by updating the state with the new value
export const handleIngredientChange = (index, event, ingredients, setIngredients) => {
    const { name, value } = event.target; // Extract name and value from the event target
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient // Update the specific ingredient with the new value
    );
    setIngredients(newIngredients); // Update the state with the new ingredients array
};

// Adds a new direction to the directions array
export const addDirection = (directions, setDirections) => {
    setDirections([...directions, '']); // Add a new empty direction string to the array
};

// Removes a direction from the directions array based on the index
export const removeDirection = (index, directions, setDirections) => {
    const newDirections = directions.filter((_, i) => i !== index); // Filter out the direction at the specified index
    setDirections(newDirections); // Update the state with the new directions array
};

// Handles changes to specific directions by updating the state with the new value
export const handleDirectionChange = (index, event, directions, setDirections) => {
    const { value } = event.target; // Extract value from the event target
    const newDirections = directions.map((direction, i) =>
      i === index ? value : direction // Update the specific direction with the new value
    );
    setDirections(newDirections); // Update the state with the new directions array
};

// Handles the form submission for adding a new recipe
export const handleSubmit = async (axios, event, formData, ingredients, directions, images, navigate, backend_url, setError, toast) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous errors

    const recipeData = {
        ...formData, // Spread the existing form data
        ingredients, // Include the ingredients array
        directions, // Include the directions array
        images, // Include the images array
        nutrition: {
            calories: formData.calories,
            fat: formData.fat,
            protein: formData.protein,
            carbs: formData.carbs,
        },
    };

    try {
        // Send a POST request to the backend to add the new recipe
        const response = await axios.post(`${backend_url}/recipes`, { recipe: recipeData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const new_recipe = response.data; // Get the new recipe data from the response
        toast.success('Succesfully created recipe!'); // Show a success toast message
        navigate(`/recipes/${new_recipe._id}/`); // Navigate to the newly created recipe's page
    } catch (error) {
        if (error.response) {
            // Handle authentication errors by navigating to the error page
            if (error.response.status === 401 || error.response.status === 403) {
                navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
            } else {
                // Handle specific client-side errors without redirecting
                const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
                setError(errorMessage); // Set the error message
                console.error('Response data:', error.response.data); // Log the response data
                console.error('Response status:', error.response.status); // Log the response status
                console.error('Response headers:', error.response.headers); // Log the response headers
            }
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Request data:', error.request); // Log the request data
        } else {
            // Something happened in setting up the request that triggered an Error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Error message:', error.message); // Log the error message
        }
        console.error('Error config:', error.config); // Log the error configuration
    }
};

// Handles the form submission for editing an existing recipe
export const handleEditSubmit = async (axios, event, formData, ingredients, directions, images, navigate, backend_url, id, setError, toast) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setError(null); // Clear any previous errors

    const recipeData = {
        ...formData, // Spread the existing form data
        ingredients, // Include the ingredients array
        directions, // Include the directions array
        images, // Include the images array
        nutrition: {
            calories: formData.calories,
            fat: formData.fat,
            protein: formData.protein,
            carbs: formData.carbs,
        },
    };

    try {
        // Send a PUT request to the backend to update the recipe
        const response = await axios.put(`${backend_url}/recipes/${id}`, { recipe: recipeData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const updated_recipe = response.data; // Get the updated recipe data from the response
        toast.success('Successfully updated recipe!'); // Show a success toast message
        navigate(`/recipes/${updated_recipe._id}/`); // Navigate to the updated recipe's page
    } catch (error) {
        if (error.response) {
            // Handle authentication errors by navigating to the error page
            if (error.response.status === 401 || error.response.status === 403) {
                navigate('/error', { state: { message: 'Authentication error. Please login again.' } });
            } else {
                // Handle specific client-side errors without redirecting
                const errorMessage = error.response.data.message || 'An error occurred. Please try again.';
                setError(errorMessage); // Set the error message
                console.error('Response data:', error.response.data); // Log the response data
                console.error('Response status:', error.response.status); // Log the response status
                console.error('Response headers:', error.response.headers); // Log the response headers
            }
        } else if (error.request) {
            // The request was made but no response was received
            const errorMessage = 'No response from server. Please try again later.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Request data:', error.request); // Log the request data
        } else {
            // Something happened in setting up the request that triggered an Error
            const errorMessage = 'An error occurred. Please try again.';
            setError(errorMessage); // Set the error message
            navigate('/error', { state: { message: errorMessage } }); // Navigate to the error page
            console.error('Error message:', error.message); // Log the error message
        }
        console.error('Error config:', error.config); // Log the error configuration
    }
};
