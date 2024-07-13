import { FC, KeyboardEvent, useState } from 'react';
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

  const [open, setOpen] = useState<boolean>(false);
  const [textFieldValue, setTextFieldValue] = useState<string>('');

  const toggleOpen = () => setOpen(!open);

  const closeDialog = () => {
    setOpen(false);
    setTextFieldValue('');
  };

  const submitForm = () => {
    if (textFieldValue) {
      createListItem(textFieldValue);
      closeDialog();
    }
  };

  const handleEnterKeySubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <>
      <Button
        variant={'contained'}
        sx={{ width: '100%', mt: 3 }}
        onClick={toggleOpen}
      >
        Add Task
      </Button>
      <Dialog open={open} onClose={closeDialog}>
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
            onKeyDown={handleEnterKeySubmit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Cancel</Button>
          <Button
            variant={'contained'}
            onClick={submitForm}
            disabled={!textFieldValue}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
