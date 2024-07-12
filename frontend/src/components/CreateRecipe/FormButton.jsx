import React from 'react';
import { Button, useTheme } from '@mui/material';

const FormButton = ({ type = 'button', label, onClick, variant = 'contained' }) => {
  const theme = useTheme();

  return (
    <Button
      type={type}
      onClick={onClick}
      variant={variant}
      fullWidth
      sx={{
        mt: 2,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      {label}
    </Button>
  );
};

export default FormButton;
