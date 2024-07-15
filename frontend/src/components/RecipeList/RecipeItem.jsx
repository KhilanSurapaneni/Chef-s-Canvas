import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Box, Typography, Divider, useTheme } from '@mui/material';
import RecipeTags from './RecipeTags';
import Rating from './Rating';
import ImageCarousel from './ImageCarousel';

const RecipeItem = ({ recipe }) => {
  const navigate = useNavigate();
  const theme = useTheme();

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
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <ImageCarousel images={recipe.images} />
      <CardContent>
        <Box onClick={handleCardClick} sx={{ cursor: 'pointer' }}>
          <Typography gutterBottom variant="h5" component="div" color={theme.palette.text.primary}>
            {recipe.title}
          </Typography>
          <Box sx={{ mt: 2, color: theme.palette.text.secondary }}>
            <Typography>Prep Time: {recipe.prep_time} mins</Typography>
            <Typography>Cook Time: {recipe.cook_time} mins</Typography>
            <Typography>Servings: {recipe.servings}</Typography>
            <Typography>Difficulty: {recipe.difficulty}</Typography>
            <Typography>Calories: {recipe.nutrition.calories}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          <RecipeTags tags={recipe.tags} />
          <Rating recipe={recipe} />
        </Box>
        <Divider sx={{ my: 2 }} />
        <Typography variant="body2" color={theme.palette.text.secondary} align="center">
          Created by: {recipe.created_by?.username}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default RecipeItem;
