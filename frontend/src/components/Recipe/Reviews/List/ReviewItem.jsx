// ReviewItem.js
import React from 'react';
import { ListItem, ListItemText, Typography, Box, Button, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const ReviewItem = ({ review, openEditDialog, handleDelete }) => (
    <>
        <ListItem alignItems="flex-start">
            <ListItemText
                primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="h6" component="span">
                                {review.created_by.username}
                            </Typography>
                            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                                {[...Array(review.rating)].map((_, i) => (
                                    <StarIcon key={i} sx={{ color: '#FFD700' }} />
                                ))}
                            </Box>
                        </Box>
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
                    </Box>
                }
                secondary={
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {review.comment}
                    </Typography>
                }
            />
        </ListItem>
        <Divider variant="inset" component="li" />
    </>
);

export default ReviewItem;