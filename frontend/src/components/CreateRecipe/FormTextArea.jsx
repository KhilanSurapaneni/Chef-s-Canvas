import React from 'react';
import { TextField, FormControl, InputLabel } from '@mui/material';

const FormTextArea = ({ label, id, name, value, onChange, required }) => (
  <FormControl fullWidth margin="normal" variant="outlined">
    <InputLabel htmlFor={id} shrink>
      {label}
    </InputLabel>
    <TextField
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      multiline
      rows={4}
      variant="outlined"
    />
  </FormControl>
);

export default FormTextArea;