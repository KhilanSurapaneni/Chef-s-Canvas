import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Box, Typography, useTheme } from '@mui/material';
import RatingSelectList from './RatingSelectList';

const ReviewEditDialog = ({ open, onClose, editedComment, setEditedComment, editedRating, setEditedRating, handleEdit }) => {
    const [validationErrors, setValidationErrors] = useState({});
    const theme = useTheme();

    const validateForm = () => {
        const errors = {};
        if (editedRating <= 0) {
            errors.rating = 'Rating must be greater than 0';
        }
        if (!editedComment.trim()) {
            errors.comment = 'Comment cannot be empty';
        }
        return errors;
    };

    const handleSubmit = () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }
        setValidationErrors({});
        handleEdit();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Review</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To edit this review, please modify the comment and rating and click "Save".
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Comment"
                    type="text"
                    fullWidth
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
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
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: theme.palette.primary.dark,
                        },
                    }}
                />
                {validationErrors.comment && <Typography color="error">{validationErrors.comment}</Typography>}
                <Box sx={{ mt: 2 }}>
                    <RatingSelectList initialRating={editedRating} onRatingChange={setEditedRating} />
                </Box>
                {validationErrors.rating && <Typography color="error">{validationErrors.rating}</Typography>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} sx={{ color: theme.palette.primary.main }}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} sx={{ color: theme.palette.primary.main }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReviewEditDialog;
