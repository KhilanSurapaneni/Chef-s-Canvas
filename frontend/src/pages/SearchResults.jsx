// SearchResults.js
import React, { useContext } from 'react';
import { Container, Grid, CircularProgress, Typography, Box, useTheme } from '@mui/material';
import { SearchContext } from '../contexts/SearchContext';
import RecipeItem from '../components/RecipeList/RecipeItem';

const SearchResults = () => {
    const { query, results } = useContext(SearchContext);
    const theme = useTheme();

    if (!results) {
        return (
            <Container>
                <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                    <CircularProgress sx={{ color: theme.palette.primary.main }} />
                </Grid>
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Search Results for: {query}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                    {results.length > 0 ? 'Explore the results of your search.' : 'No search results found.'}
                </Typography>
            </Box>
            {results.length > 0 ? (
                <Grid container spacing={4}>
                    {results.map((recipe) => (
                        <Grid item key={recipe._id} xs={12} sm={6} md={6} lg={4}>
                            <RecipeItem recipe={recipe} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        There are no search results for "{query}".
                    </Typography>
                </Box>
            )}
            <Box sx={{ mb: 4 }} />
        </Container>
    );
};

export default SearchResults;
