//In order to style this we used tailwind, which is similar to bootstraom that is why we have classes in the components

import React from 'react';  // Importing React library
import { Routes, Route } from 'react-router-dom';  // Importing Routes and Route components from react-router-dom
import RecipeList from "./pages/RecipeList";  // Importing the RecipeList component from the pages directory
import Recipe from './pages/Recipe';
import HomePage from './pages/HomePage';
import CreateRecipe from './pages/CreateRecipe';
import EditRecipe from "./pages/EditRecipe";
import Navbar from './components/Navbar/Navbar';
import './index.css';

const App = () => {
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
        <Route path='/recipes/create' element={<CreateRecipe />} />
        <Route path='/recipes/:id' element={<Recipe />} />
        <Route path='/recipes/:id/edit' element={<EditRecipe />} />
      </Routes>
    </>

  );
}

export default App;  // Exporting the App component as the default export
