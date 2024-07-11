import React from 'react';
import { TextField, IconButton, Button, Box, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const IngredientList = ({ ingredients, handleIngredientChange, addIngredient, removeIngredient }) => (
  <Box mb={4}>
    <Typography variant="h6">Ingredients</Typography>
    <ol style={{ paddingLeft: 0 }}>
      {ingredients.map((ingredient, index) => (
        <Box key={index} mb={3} display="flex" alignItems="center">
          <TextField
            type="text"
            name="ingredient"
            placeholder="Ingredient"
            value={ingredient.ingredient}
            onChange={(e) => handleIngredientChange(index, e)}
            required
            variant="outlined"
            label="Ingredient"
            fullWidth
            margin="normal"
          />
          <TextField
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={ingredient.quantity}
            onChange={(e) => handleIngredientChange(index, e)}
            min="0.01"
            step="any"
            required
            variant="outlined"
            label="Quantity"
            fullWidth
            margin="normal"
            sx={{ ml: 2 }}
          />
          <IconButton
            onClick={() => removeIngredient(index)}
            color="error"
            sx={{ ml: 2 }}
          >
            <RemoveCircleIcon />
          </IconButton>
        </Box>
      ))}
    </ol>
    <Box display="flex" justifyContent="center">
      <Button
        type="button"
        color="primary"
        variant="contained"
        startIcon={<AddCircleIcon />}
        onClick={addIngredient}
      >
        Add Ingredient
      </Button>
    </Box>
  </Box>
);

export default IngredientList;
