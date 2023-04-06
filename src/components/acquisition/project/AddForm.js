import { Close, Send } from '@mui/icons-material';
import { MenuItem, FormControl, Select, InputLabel, Autocomplete} from '@mui/material';

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
import { useEffect, useRef, useState } from 'react';
import { register } from '../../../actions/project';
import { useValue } from '../../../context/ContextProvider';
import { getCollaborators } from '../../../actions/collaborator';

const AddForm = () => {
  const {
    state: { openProject, collaborators },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (collaborators.length === 0) getCollaborators(dispatch);
  },[]);

  const collaboratorOptions = collaborators.map(({ name, id }) => ({ label:name, id:id }));

  const [collaboratorValue, setCollaboratorValue] = useState(collaboratorOptions[0]);

  const nameRef = useRef();
  const typeRef = useRef();
  const descriptionRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PROJECT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value;
    const typename = typeRef.current.value;
    const status = statusRef.current.value;
    const description = descriptionRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name,
                    "type":typename, 
                    "description":description, 
                    "status":status, 
                    "metadata":metadata,
                    "collaboratorId":collaboratorValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openProject} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Project"
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
            Please fill a new project's information in the fields below:
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
              autoFocus
              margin="normal"
              variant="standard"
              id="type_"
              label="Type"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 1 }}
              required
            />
 
            <TextField
              margin="normal"
              variant="standard"
              id="description"
              label="Description"
              type="text"
              multiline
              rows={2}
              fullWidth
              inputRef={descriptionRef}
              required
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
              id="metadata"
              label="Additional Info"
              type="text"
              fullWidth
              inputRef={metadataRef}
            />

            <Autocomplete
              disablePortal
              id="collaborator_"
              options={collaboratorOptions}
              value={collaboratorValue}
              onChange={(e, newValue) => {
                setCollaboratorValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Collaborator" variant="standard" />}
              required
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