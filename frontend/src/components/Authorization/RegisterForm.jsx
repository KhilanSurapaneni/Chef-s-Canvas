import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleSubmit } from './functions';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { TextField, Button, Container, Typography, Box, useTheme } from '@mui/material';

const RegisterForm = ({ backend_url }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);
    const theme = useTheme();

    return (
        <Container maxWidth="sm">
            <Box
                component="form"
                onSubmit={(event) => handleSubmit(event, username, email, password, axios, navigate, backend_url, setError, setIsAuthenticated, toast)}
                sx={{
                    mt: 4,
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 3,
                    backgroundColor: theme.palette.background.paper,
                    color: theme.palette.text.primary
                }}
            >
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
                    }}
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
                    }}
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
                    }}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
                >
                    Register
                </Button>
            </Box>
        </Container>
    );
};

export default RegisterForm;
