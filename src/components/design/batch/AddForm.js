import { Close, Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@mui/material';

import { useRef} from 'react';
import { register } from '../../../actions/batch';
import { useValue } from '../../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openBatch },
    dispatch,
  } = useValue();

  const nameRef = useRef();
  const typeRef = useRef();
  const priorityRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_BATCH' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const type = typeRef.current.value;
    const priority = priorityRef.current.value;
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name, 
                    "type":type, 
                    "priority":priority, 
                    "status":status, 
                    "metadata":metadata}, 
                  dispatch)

  };

  return (
    <Dialog open={openBatch} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Batch"
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          onClick={handleClose}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill a new batch's information in the fields below:
          </DialogContentText>

            <TextField
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="type"
              label="TYPE"
              type="text"
              fullWidth
              inputRef={typeRef}
            />

             <TextField
              margin="normal"
              variant="standard"
              id="priority"
              label="Priority"
              type="text"
              fullWidth
              inputRef={priorityRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="status"
              label="Status"
              type="text"
              fullWidth
              inputRef={statusRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="meta"
              label="Meta Data"
              type="text"
              fullWidth
              inputRef={metadataRef}
            />

        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddForm;