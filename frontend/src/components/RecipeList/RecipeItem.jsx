import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Box, Divider } from '@mui/material';
import RecipeTags from './RecipeTags';
import Rating from './Rating';

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/recipes/${recipe._id}`);
  };

  return (
    <Card
      sx={{
        transform: 'scale(1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 6,
        },
        borderRadius: 3,
        maxWidth: 600, // Increased maxWidth
        margin: 'auto',
      }}
      onClick={handleCardClick}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="220"
          image={recipe.image}
          alt={recipe.title}
          sx={{ borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" color="textPrimary">
            {recipe.title}
          </Typography>
          <Box sx={{ mt: 2, color: 'text.secondary' }}>
            <Typography>Prep Time: {recipe.prep_time} mins</Typography>
            <Typography>Cook Time: {recipe.cook_time} mins</Typography>
            <Typography>Servings: {recipe.servings}</Typography>
            <Typography>Difficulty: {recipe.difficulty}</Typography>
            <Typography>Calories: {recipe.nutrition.calories}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
            <RecipeTags tags={recipe.tags} />
            <Rating recipe={recipe} />
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body2" color="textSecondary" align="center">
            Created by: {recipe.created_by?.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeItem;
