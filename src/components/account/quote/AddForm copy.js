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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useEffect, useRef, useState } from 'react';
import { register } from '../../../actions/quote';
import { useValue } from '../../../context/ContextProvider';
import { getCollaborators } from '../../../actions/collaborator';

const AddForm = () => {
  const {
    state: { openQuote, collaborators },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (collaborators.length === 0) getCollaborators(dispatch);
  },[]);

  const collaboratorOptions = collaborators.map(({ name, id }) => ({ label:name, id:id }));

  const [collaboratorValue, setCollaboratorValue] = useState(collaboratorOptions[0]);
  const [quoteDateValue, setQuoteDateValue] = useState(null);

  const nameRef = useRef();
  const descriptionRef = useRef();
  const qtyRef = useRef();
  const memoRef = useRef();
  // const metadataRef = useRef();
  // const collaboratorRef = useRef();


  const handleClose = () => {
    dispatch({ type: 'CLOSE_QUOTE' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const qty = qtyRef.current.value;
    const memo = memoRef.current.value;

    await register({"name":name, 
                    "description":description, 
                    "quantity":qty, 
                    "memo":memo,
                    "quoteDate":quoteDateValue, 
                    "collaboratorId":collaboratorValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openQuote} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Quote"
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
            Please fill a new quote's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="name"
              label="Quote #"
              type="text"
              fullWidth
              inputRef={nameRef}
              inputProps={{ minLength: 2 }}
              required
            />


            <Autocomplete
              disablePortal
              id="collaborator_"
              options={collaboratorOptions}
              value={collaboratorValue}
              onChange={(e, newValue) => {
                setCollaboratorValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Customer" variant="standard" />}
              required
            />

            
            <TextField
              margin="normal"
              variant="standard"
              id="description"
              label="Production Description"
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
              id="qty"
              label="Quantity"
              type="text"
              fullWidth
              inputRef={qtyRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="memo"
              label="Detail Information"
              type="text"
              multiline
              rows={4}
              fullWidth
              inputRef={memoRef}
              required
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Quote Date"
                value={quoteDateValue}
                onChange={(newValue) => {
                  setQuoteDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
                required
              />
            </LocalizationProvider>

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