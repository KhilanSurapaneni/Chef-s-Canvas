import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, useTheme } from '@mui/material';

const FormSelect = ({ label, id, name, value, onChange, options }) => {
  const theme = useTheme();

  return (
    <FormControl fullWidth margin="normal" variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Select
        label={label}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
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
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
