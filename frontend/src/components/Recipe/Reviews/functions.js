export const handleSubmit = async (event, setError, backend_url, axios, id, review, setReview, toast, navigate) => {
    event.preventDefault();
    setError(null);
    try {
      await axios.post(`${backend_url}/recipes/${id}/reviews`, {
        review
      }, { withCredentials: true });
  
      toast.success('Review submitted successfully!');
      setReview({ rating: '', comment: '' }); // Clear the form
      navigate(`/recipes/${id}`);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // Navigate to the login page if the error is related to authorization
        navigate('/login');
      } else {
        const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
      console.error('Error submitting review:', error);
    }
  };

  export const handleChange = (e, setReview, review) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  