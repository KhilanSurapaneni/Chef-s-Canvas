// SearchBar.js
import React, { useState, useContext } from 'react';
import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../contexts/SearchContext';

const SearchBar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const { updateSearchResults } = useContext(SearchContext);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const backend_url = import.meta.env.VITE_BACKEND_URL;

    const handleSearchSubmit = async () => {
        if (!searchQuery.trim()) {
            toast.error('Please enter a search query');
            return;
        }

        try {
            const response = await axios.get(`${backend_url}/recipes/search`, {
                params: { query: searchQuery },
            });
            updateSearchResults(searchQuery, response.data);
            navigate('/search-results');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while searching. Please try again later.';
            toast.error(errorMessage);
            console.error('Error during search:', error);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', width: { xs: '100%', sm: '70%', md: '50%' } }}>
            <TextField
                variant="outlined"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                size="small"
                sx={{ flex: 1, marginRight: 1 }}
            />
            <IconButton onClick={handleSearchSubmit} sx={{ padding: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
