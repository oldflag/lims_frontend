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
import { register } from '../../../actions/donor';
import { useValue } from '../../../context/ContextProvider';
import { getCollaborators } from '../../../actions/collaborator';

const AddForm = () => {
  const {
    state: { openDonor, collaborators },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (collaborators.length === 0) getCollaborators(dispatch);
  },[]);

  const collaboratorOptions = collaborators.map(({ name, id }) => ({ label:name, id:id }));

  const [collaboratorValue, setCollaboratorValue] = useState(collaboratorOptions[0]);

  const nameRef = useRef();
  const ageRef = useRef();
  const sexRef = useRef();
  const ancestryRef = useRef();
  const speciesRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();
  // const collaboratorRef = useRef();


  const handleClose = () => {
    dispatch({ type: 'CLOSE_DONOR' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const sex = sexRef.current.value;
    const ancestry = ancestryRef.current.value;
    const species = speciesRef.current.value;
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    console.log(collaboratorValue)
    await register({"name":name, 
                    "age":age, 
                    "sex":sex, 
                    "ancestry":ancestry, 
                    "species":species, 
                    "status":status, 
                    "metadata":metadata,
                    "collaboratorId":collaboratorValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openDonor} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Donor"
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
            Please fill a new donor's information in the fields below:
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
              id="age"
              label="Age"
              type="text"
              fullWidth
              inputRef={ageRef}
              inputProps={{ minLength: 2 }}
            />
          
            <FormControl fullWidth>
              <InputLabel id="input_sex">Sex</InputLabel>
              <Select
                labelId="input_sex"
                id="sex"
                inputRef={sexRef}
                label="Sex"
              >
                <MenuItem value={'F'}>F</MenuItem>
                <MenuItem value={'M'}>M</MenuItem>
                <MenuItem value={'UNK'}>UNK</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              margin="normal"
              variant="standard"
              id="ancestry"
              label="Ancestry"
              type="text"
              fullWidth
              inputRef={ancestryRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="species"
              label="Species"
              type="text"
              fullWidth
              inputRef={speciesRef}
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
              id="collaborator_"
              options={collaboratorOptions}
              value={collaboratorValue}
              onChange={(e, newValue) => {
                setCollaboratorValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Collaborator" variant="standard" />}
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