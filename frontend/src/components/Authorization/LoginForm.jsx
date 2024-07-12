import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSubmitLogin } from './functions';
import { AuthContext } from '../../AuthContext';
import { toast } from "react-toastify";
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const LoginForm = ({ backend_url }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={(event) => handleSubmitLogin(event, username, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast)}
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 3,
                    backgroundColor: 'background.paper'
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Login
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
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </Box>
        </Container>
    );
};

export default LoginForm;
