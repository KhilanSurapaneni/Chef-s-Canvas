import React, { useContext, useEffect, useState } from 'react';
import { ListItem, ListItemText, Typography, Box, Button, Divider, useTheme } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { AuthContext } from '../../../../contexts/AuthContext';

const ReviewItem = ({ review, openEditDialog, handleDelete }) => {
    const { isAuthenticated, checkReviewAuthorStatus } = useContext(AuthContext);
    const [isReviewAuthor, setIsReviewAuthor] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const checkAuthor = async () => {
            if (isAuthenticated) {
                const result = await checkReviewAuthorStatus(review.recipe, review._id);
                setIsReviewAuthor(result.isAuthor);
            }
        };
        checkAuthor();
    }, [isAuthenticated, review.recipe, review._id, checkReviewAuthorStatus]);

    return (
        <>
            <ListItem alignItems="flex-start">
                <ListItemText
                    primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" component="span" color={theme.palette.text.primary}>
                                    {review.created_by.username}
                                </Typography>
                                <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                    {[...Array(review.rating)].map((_, i) => (
                                        <StarIcon key={i} sx={{ color: "gold" }} />
                                    ))}
                                </Box>
                            </Box>
                            {isAuthenticated && isReviewAuthor && (
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => openEditDialog(review)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        onClick={() => handleDelete(review._id, review.recipe)}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            )}
                        </Box>
                    }
                    secondary={
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color={theme.palette.text.primary}
                        >
                            {review.comment}
                        </Typography>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
};

export default ReviewItem;
