import React from 'react';
import { Box, CircularProgress, useTheme } from '@mui/material';

const Spinner = () => {
  const theme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <CircularProgress
        size={64}
        thickness={4}
        sx={{
          color: theme.palette.primary.main,
        }}
      />
    </Box>
  );
};

export default Spinner;
