//In order to style this we used tailwind, which is similar to bootstraom that is why we have classes in the components

import React, { useContext } from 'react';  // Importing React and useContext from React library
import { Routes, Route, Navigate } from 'react-router-dom';  // Importing Routes, Route, and Navigate components from react-router-dom
import RecipeList from "./pages/RecipeList";  // Importing the RecipeList component from the pages directory
import Recipe from './pages/Recipe';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from "./pages/EditRecipe";
import Navbar from './components/Navbar/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Error from './pages/Error';
import './index.css';
import { AuthContext } from './AuthContext';  // Importing AuthContext for authentication state

const App = () => {
  const { isAuthenticated } = useContext(AuthContext);  // Using AuthContext to get the authentication state

  return (
    <>
      <Navbar />
      {/* Routes component is a container for all the Route components */}
      <Routes>
        {/* 
      Route component defines a single route.
      path: The URL path to match.
      element: The component to render when the URL path matches.
      Here, when the URL is '/recipes', the RecipeList component will be rendered.
      */}
        <Route path='/' element={<HomePage />} />
        <Route path='/recipes' element={<RecipeList />} />
        <Route path='/recipes/create' element={isAuthenticated ? <CreateRecipe /> : <Navigate to="/login" />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/recipes/:id/edit' element={isAuthenticated ? <EditRecipe /> : <Navigate to="/login" />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="*" element={<Error />} /> {/* Catch-all route for undefined routes */}
      </Routes>
    </>
  );
}

export default App;  // Exporting the App component as the default export
