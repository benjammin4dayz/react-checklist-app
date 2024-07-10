import { useState, type FC } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useListContext } from '../ListProvider';

export const AddTaskDialog: FC = () => {
  const { createListItem } = useListContext();

  const [open, setOpen] = useState(false);
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  const toggleOpen = () => setOpen(!open);

  const onClose = () => {
    setOpen(false);
    setTextFieldValue('');
  };

  const onSubmit = () => {
    if (textFieldValue) createListItem(textFieldValue);
    onClose();
  };

  return (
    <>
      <Button sx={{ width: '100%', mt: 3 }} onClick={toggleOpen}>
        Add Task
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            required
            fullWidth
            id="taskName"
            label="Task name"
            name="taskName"
            autoFocus
            autoComplete="off"
            value={textFieldValue}
            onChange={e => setTextFieldValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
