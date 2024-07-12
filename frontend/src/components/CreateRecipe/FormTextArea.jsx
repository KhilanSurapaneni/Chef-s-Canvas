import React from 'react';
import { TextField, FormControl, InputLabel, useTheme } from '@mui/material';

const FormTextArea = ({ label, id, name, value, onChange, required = true }) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={id} shrink sx={{ color: theme.palette.text.primary }}>
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
    </FormControl>
  );
};

export default FormTextArea;
