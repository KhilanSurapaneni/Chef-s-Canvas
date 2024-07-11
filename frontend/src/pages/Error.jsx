import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';

const Error = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;
    const errorMessage = state?.message || 'Something went wrong.';

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
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Go Back to Home
                </Button>
            </Paper>
        </Container>
    );
};

export default Error;
