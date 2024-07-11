import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleSubmit } from './functions';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const RegisterForm = ({ backend_url }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext); // Use AuthContext to get setIsAuthenticated

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={(event) => handleSubmit(event, username, email, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast)} sx={{ mt: 4, p: 2, borderRadius: 1, boxShadow: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>
                {error && <Typography color="error" align="center" gutterBottom>{error}</Typography>}
                <TextField
                    fullWidth
                    id="username"
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    variant="outlined"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterForm;
