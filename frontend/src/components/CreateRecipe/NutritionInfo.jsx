import React from 'react';
import { TextField, Grid } from '@mui/material';

const NutritionInfo = ({ formData, setFormData, errors, handleChange }) => (
  <Grid container spacing={2}>
    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Calories"
        id="calories"
        name="calories"
        type="number"
        value={formData.calories}
        onChange={(event) => handleChange(event, setFormData, formData)}
        margin="normal"
        error={!!errors.calories}
        helperText={errors.calories}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Fat (grams)"
        id="fat"
        name="fat"
        type="number"
        value={formData.fat}
        onChange={(event) => handleChange(event, setFormData, formData)}
        margin="normal"
        error={!!errors.fat}
        helperText={errors.fat}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Protein (grams)"
        id="protein"
        name="protein"
        type="number"
        value={formData.protein}
        onChange={(event) => handleChange(event, setFormData, formData)}
        margin="normal"
        error={!!errors.protein}
        helperText={errors.protein}
      />
    </Grid>
    <Grid item xs={6}>
      <TextField
        fullWidth
        label="Carbs (grams)"
        id="carbs"
        name="carbs"
        type="number"
        value={formData.carbs}
        onChange={(event) => handleChange(event, setFormData, formData)}
        margin="normal"
        error={!!errors.carbs}
        helperText={errors.carbs}
      />
    </Grid>
  </Grid>
);

export default NutritionInfo;
