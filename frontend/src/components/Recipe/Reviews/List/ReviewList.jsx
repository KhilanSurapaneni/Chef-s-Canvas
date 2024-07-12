// ReviewList.js
import React, { useState } from 'react';
import axios from 'axios';
import { List, Typography, Box } from '@mui/material';
import { toast } from 'react-toastify';
import ReviewItem from './ReviewItem';
import ReviewEditDialog from './ReviewEditDialog';

const ReviewList = ({ reviews, backend_url }) => {
    const [open, setOpen] = useState(false);
    const [currentReview, setCurrentReview] = useState(null);
    const [editedComment, setEditedComment] = useState('');
    const [editedRating, setEditedRating] = useState(1);

    const handleDelete = async (reviewId, recipeId) => {
        try {
            await axios.delete(`${backend_url}/recipes/${recipeId}/reviews/${reviewId}`, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success('Review deleted successfully!');
            window.location.reload(); // Simple way to refresh the page
        } catch (error) {
            toast.error('Failed to delete the review.');
        }
    };

    const handleEdit = async () => {
        try {
            await axios.put(`${backend_url}/recipes/${currentReview.recipe}/reviews/${currentReview._id}`, {
                review: {
                    comment: editedComment,
                    rating: editedRating,
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            toast.success('Review updated successfully!');
            setOpen(false);
            window.location.reload(); // Simple way to refresh the page
        } catch (error) {
            toast.error('Failed to update the review.');
        }
    };

    const openEditDialog = (review) => {
        setCurrentReview(review);
        setEditedComment(review.comment);
        setEditedRating(review.rating);
        setOpen(true);
    };

    const closeEditDialog = () => {
        setOpen(false);
        setCurrentReview(null);
    };

    return (
        <Box sx={{ p: 4, bgcolor: 'white', boxShadow: 1, borderRadius: 1 }}>
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            <List>
                {reviews.map((review, index) => (
                    <ReviewItem
                        key={review._id}
                        review={review}
                        openEditDialog={openEditDialog}
                        handleDelete={handleDelete}
                    />
                ))}
            </List>
            <ReviewEditDialog
                open={open}
                onClose={closeEditDialog}
                editedComment={editedComment}
                setEditedComment={setEditedComment}
                editedRating={editedRating}
                setEditedRating={setEditedRating}
                handleEdit={handleEdit}
            />
        </Box>
    );
};

export default ReviewList;
