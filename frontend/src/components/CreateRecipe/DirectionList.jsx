import React from 'react';
import { Box, Button, IconButton, List, ListItem, ListItemText, ListItemSecondaryAction, Typography, Divider, useTheme } from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import FormTextArea from './FormTextArea';

const DirectionList = ({ directions, handleDirectionChange, addDirection, removeDirection }) => {
  const theme = useTheme();

  return (
    <Box mb={4}>
      <Typography variant="h6" component="label" gutterBottom color={theme.palette.text.primary}>
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
                <IconButton edge="end" aria-label="remove" onClick={() => removeDirection(index)}>
                  <DeleteIcon sx={{ color: theme.palette.error.main }} />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            {index < directions.length - 1 && <Divider sx={{ backgroundColor: theme.palette.divider }} />}
          </div>
        ))}
      </List>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={addDirection}
        sx={{ mt: 2, backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}
      >
        Add Direction
      </Button>
    </Box>
  );
};

export default DirectionList;
