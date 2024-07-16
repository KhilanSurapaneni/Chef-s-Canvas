import React from 'react';
import { TextField } from '@mui/material';

const RecipeTags = ({ formData, setFormData, handleChange }) => (
  <TextField
    fullWidth
    label="Tags"
    id="tags"
    name="tags"
    type="text"
    value={formData.tags}
    onChange={(event) => handleChange(event, setFormData, formData)}
    placeholder="Comma separated tags"
    margin="normal"
  />
);

export default RecipeTags;
