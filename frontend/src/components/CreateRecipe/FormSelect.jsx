import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const FormSelect = ({ label, id, name, value, onChange, options }) => (
  <FormControl fullWidth margin="normal" variant="outlined">
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Select
      label={label}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default FormSelect;
