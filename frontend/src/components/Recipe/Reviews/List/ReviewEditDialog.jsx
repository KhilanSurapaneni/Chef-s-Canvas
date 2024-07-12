// ReviewEditDialog.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, Box } from '@mui/material';
import RatingSelectList from './RatingSelectList';

const ReviewEditDialog = ({ open, onClose, editedComment, setEditedComment, editedRating, setEditedRating, handleEdit }) => (
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
            />
            <Box sx={{ mt: 2 }}>
                <RatingSelectList initialRating={editedRating} onRatingChange={setEditedRating} />
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleEdit} color="primary">
                Save
            </Button>
        </DialogActions>
    </Dialog>
);

export default ReviewEditDialog;
