import React from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Divider, useTheme, TextField } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FormTextArea from './FormTextArea';

const ImageList = ({ images, handleImageChange, addImage, removeImage }) => {
  const theme = useTheme();

  return (
    <Box mb={4}>
      <Typography variant="h6" component="label" gutterBottom color={theme.palette.text.primary}>
        Image URLs
      </Typography>
      <List>
        {images.map((image, index) => (
          <div key={index}>
            <ListItem>
              <Box flexGrow={1} pr={2}>
                <TextField
                  fullWidth
                  label={`Image URL ${index + 1}`}
                  name="image"
                  value={image}
                  onChange={(event) => handleImageChange(index, event)}
                  margin="normal"
                />
              </Box>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="remove" onClick={() => removeImage(index)}>
                  <DeleteIcon sx={{ color: theme.palette.error.main }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < images.length - 1 && <Divider sx={{ backgroundColor: theme.palette.divider }} />}
          </div>
        ))}
      </List>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addImage}
        sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
      >
        Add Image
      </Button>
    </Box>
  );
};

export default ImageList;
