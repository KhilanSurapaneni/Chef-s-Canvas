import React from 'react';
import { TextField, useTheme } from '@mui/material';

const FormInput = ({ label, id, name, type = 'text', value, onChange, required = true, placeholder }) => {
  const theme = useTheme();

  return (
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
      error={required && !value}
      helperText={required && !value ? 'This field is required' : ''}
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
  );
};

export default FormInput;
