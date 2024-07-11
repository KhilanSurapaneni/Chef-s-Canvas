import React from 'react';
import { Button } from '@mui/material';

const FormButton = ({ type, label, onClick, color, variant }) => (
  <Button
    type={type}
    onClick={onClick}
    color={color || 'primary'}
    variant={variant || 'contained'}
    fullWidth
    sx={{ mt: 2 }}
  >
    {label}
  </Button>
);

export default FormButton;
