// src/components/CreateRecipe/DirectionList.js

import React from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Divider } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FormTextArea from './FormTextArea';

const DirectionList = ({ directions, handleDirectionChange, addDirection, removeDirection }) => (
  <Box mb={4}>
    <Typography variant="h6" component="label" gutterBottom>
      Directions
    </Typography>
    <List>
      {directions.map((direction, index) => (
        <div key={index}>
          <ListItem>
            <Box flexGrow={1} pr={2}>
              <FormTextArea
                label=""
                id={`direction-${index}`}
                name="direction"
                value={direction}
                onChange={(e) => handleDirectionChange(index, e)}
                required
                fullWidth
              />
            </Box>
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="remove" color="secondary" onClick={() => removeDirection(index)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {index < directions.length - 1 && <Divider />}
        </div>
      ))}
    </List>
    <Button
      variant="contained"
      color="primary"
      startIcon={<AddIcon />}
      onClick={addDirection}
      sx={{ mt: 2 }}
    >
      Add Direction
    </Button>
  </Box>
);

export default DirectionList;
