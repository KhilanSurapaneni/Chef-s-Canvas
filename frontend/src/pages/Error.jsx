import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper, useTheme } from '@mui/material';

const Error = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const errorMessage = state?.message || 'Something went wrong.';
    const theme = useTheme();

    const handleBack = () => {
        navigate('/');
    };

    return (
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ p: 4, maxWidth: 400, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Error
                </Typography>
                <Typography variant="body1" color="error" gutterBottom>
                    {errorMessage}
                </Typography>
                <Button
                    onClick={handleBack}
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: theme.palette.primary.main }}
                >
                    Go Back to Home
                </Button>
            </Paper>
        </Container>
    );
};

export default Error;