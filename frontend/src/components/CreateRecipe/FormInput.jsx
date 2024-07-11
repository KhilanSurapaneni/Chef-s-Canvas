import React from 'react';
import { TextField } from '@mui/material';

const FormInput = ({ label, id, name, type, value, onChange, required = true, placeholder }) => (
  <TextField
    label={label}
    id={id}
    name={name}
    type={type}
    value={value}
    onChange={onChange}
    required={required}
    placeholder={placeholder}
    fullWidth
    margin="normal"
    variant="outlined"
    error={required && value === ''}
    helperText={required && value === '' ? 'This field is required' : ''}
  />
);

export default FormInput;
