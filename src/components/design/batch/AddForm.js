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
  Autocomplete,
  MenuItem, FormControl, Select, InputLabel,
} from '@mui/material';

import { useRef, useEffect, useState } from 'react';
import { register } from '../../../actions/batch';
import { useValue } from '../../../context/ContextProvider';
import { getQuotes } from '../../../actions/quote';

const AddForm = () => {
  const {
    state: { openBatch, quotes },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (quotes.length === 0) getQuotes(dispatch);
  },[]);

  const quoteOptions = quotes.map(({ name, id }) => ({ label:name, id:id }));

  const [quoteValue, setQuoteValue] = useState(quoteOptions[0]);

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
                    "metadata":metadata,
                    "quoteId":quoteValue.id,
                  }, 
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

            {/* <TextField
              margin="normal"
              variant="standard"
              id="type"
              label="Type"
              type="text"
              fullWidth
              inputRef={typeRef}
            /> */}

            <FormControl fullWidth>
              <InputLabel id="type">Type</InputLabel>
              <Select
                labelId="type_"
                id="type__"
                inputRef={typeRef}
                label="Type"
                required
              >
                <MenuItem value={'Commercial'}>Commercial</MenuItem>
                <MenuItem value={'Grant'}>Grant</MenuItem>
                <MenuItem value={'In-house'}>In-house</MenuItem>
              </Select>
            </FormControl>

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
            <Autocomplete
              disablePortal
              id="quote_"
              options={quoteOptions}
              value={quoteValue}
              onChange={(e, newValue) => {
                setQuoteValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Quote #" variant="standard" />}
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