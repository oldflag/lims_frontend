import { Close, Send } from '@mui/icons-material';
import { Autocomplete} from '@mui/material';

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
import { register } from '../../../actions/experiment';
import { useValue } from '../../../context/ContextProvider';
import { getProjects } from '../../../actions/project';

const AddForm = () => {
  const {
    state: { openExperiment, projects },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (projects.length === 0) getProjects(dispatch);
  },[]);

  const projectOptions = projects.map(({ name, id }) => ({ label:name, id:id }));

  const [projectValue, setProjectValue] = useState(projectOptions[0]);

  const nameRef = useRef();
  const short_descriptionRef = useRef();
  const long_descriptionRef = useRef();
  const statusRef = useRef();
  const priorityRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_EXPERIMENT' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value;
    const status = statusRef.current.value;
    const short_description = short_descriptionRef.current.value;
    const long_description = long_descriptionRef.current.value;
    const priority = priorityRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name, 
                    "short_description":short_description, 
                    "long_description":long_description, 
                    "status":status, 
                    "priority":priority,
                    "metadata":metadata,
                    "projectId":projectValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openExperiment} onClose={handleClose}>
      <DialogTitle>
        "Register New Experiment"
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
            Please fill a new experiment's information in the fields below:
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
              id="short_description"
              label="Description"
              type="text"
              multiline
              rows={2}
              fullWidth
              inputRef={short_descriptionRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="short_description"
              label="Details"
              type="text"
              fullWidth
              multiline
              rows={4}
              inputRef={long_descriptionRef}
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
              id="metadata"
              label="Meta Data"
              type="text"
              fullWidth
              inputRef={metadataRef}
            />

            <Autocomplete
              disablePortal
              id="project_"
              options={projectOptions}
              value={projectValue}
              onChange={(e, newValue) => {
                setProjectValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Project" variant="standard" />}
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