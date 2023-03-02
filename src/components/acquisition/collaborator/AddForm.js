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
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { useRef } from 'react';
import { register } from '../../../actions/collaborator';
import { useValue } from '../../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openCollaborator },
    dispatch,
  } = useValue();

  const nameRef = useRef();
  const contactNameRef = useRef();
  const contactEmailRef = useRef();
  const contactPhoneRef = useRef();
  const noteRef = useRef();
  const urlRef = useRef();
  const activeRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_COLLABORATOR' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const contactName = contactNameRef.current.value;
    const contactEmail = contactEmailRef.current.value;
    const contactPhone = contactPhoneRef.current.value;
    const note = noteRef.current.value;
    const url = urlRef.current.value;
    const active = activeRef.current.checked;

    await register({"name":name, 
                    "contactName":contactName, 
                    "contactEmail":contactEmail, 
                    "contactPhone":contactPhone, 
                    "note":note, 
                    "url":url, 
                    "active":active}, 
                  dispatch)

  };

  return (
    <Dialog open={openCollaborator} onClose={handleClose}>
      <DialogTitle>
        "Register New Collaborator"
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
            Please fill a new collaborator's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
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
              id="contactName"
              label="Contact Name"
              type="text"
              fullWidth
              inputRef={contactNameRef}
              inputProps={{ minLength: 2 }}
              required
            />
        
            <TextField
              margin="normal"
              variant="standard"
              id="contactEmail"
              label="Email"
              type="email"
              fullWidth
              inputRef={contactEmailRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="contactPhone"
              label="Phone"
              type="text"
              fullWidth
              inputRef={contactPhoneRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="note"
              label="Note"
              type="text"
              fullWidth
              inputRef={noteRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="url"
              label="URL"
              type="text"
              fullWidth
              inputRef={urlRef}
            />

            <FormControlLabel 
              label="Active" 
              control={<Checkbox 
                        defaultChecked 
                        inputRef={activeRef}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                        />} 
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