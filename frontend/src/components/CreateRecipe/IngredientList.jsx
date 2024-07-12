import React from 'react';
import { TextField, IconButton, Button, Box, Typography, useTheme } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const IngredientList = ({ ingredients, handleIngredientChange, addIngredient, removeIngredient }) => {
  const theme = useTheme();

  return (
    <Box mb={4}>
      <Typography variant="h6" color={theme.palette.text.primary}>Ingredients</Typography>
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.dark,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.dark,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.palette.primary.dark,
                },
              }}
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
              sx={{
                ml: 2,
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.dark,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.primary.dark,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: theme.palette.primary.dark,
                },
              }}
            />
            <IconButton
              onClick={() => removeIngredient(index)}
              sx={{ ml: 2, color: theme.palette.error.main }}
            >
              <RemoveCircleIcon />
            </IconButton>
          </Box>
        ))}
      </ol>
      <Box display="flex" justifyContent="center">
        <Button
          type="button"
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={addIngredient}
          sx={{
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Add Ingredient
        </Button>
      </Box>
    </Box>
  );
};

export default IngredientList;
