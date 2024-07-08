export const handleChange = (event, setFormData, formData) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  export const addIngredient = (ingredients, setIngredients) => {
    setIngredients([...ingredients, { ingredient: '', quantity: '' }]);
  };
  
  export const removeIngredient = (index, ingredients, setIngredients) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };
  
  export const handleIngredientChange = (index, event, ingredients, setIngredients) => {
    const { name, value } = event.target;
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [name]: value } : ingredient
    );
    setIngredients(newIngredients);
  };
  
  export const addDirection = (directions, setDirections) => {
    setDirections([...directions, '']);
  };
  
  export const removeDirection = (index, directions, setDirections) => {
    const newDirections = directions.filter((_, i) => i !== index);
    setDirections(newDirections);
  };
  
  export const handleDirectionChange = (index, event, directions, setDirections) => {
    const { value } = event.target;
    const newDirections = directions.map((direction, i) =>
      i === index ? value : direction
    );
    setDirections(newDirections);
  };
  
  export const handleSubmit = async (axios, event, formData, ingredients, directions, navigate) => {
    event.preventDefault();
  
    const recipeData = {
      ...formData,
      ingredients,
      directions,
      nutrition: {
        calories: formData.calories,
        fat: formData.fat,
        protein: formData.protein,
        carbs: formData.carbs,
      },
    };
  
    const backend_url = 'http://localhost:3000'; // Backend URL
  
    try {
      const response = await axios.post(`${backend_url}/recipes`, { recipe: recipeData }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const new_recipe = response.data
      navigate(`/recipes/${new_recipe._id}/`);  // Ensure this path is correct
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Request data:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);
    }
  };
  