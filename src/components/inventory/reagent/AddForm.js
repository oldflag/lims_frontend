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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRef, useState } from 'react';
import { register } from '../../../actions/reagent';
import { useValue } from '../../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openReagent },
    dispatch,
  } = useValue();

  const [expirationDateValue, setExpirationDateValue] = useState(null);

  
  const nameRef = useRef();
  const generic_nameRef = useRef();
  const partRef = useRef();
  const lotRef = useRef();
  // const expiration_dateRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_REAGENT' });
    // setAutoName('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const generic_name = generic_nameRef.current.value;
    const part = partRef.current.value;
    const lot = lotRef.current.value;
    // const expiration_date = expiration_dateRef.current.value;
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name, 
                    "generic_name":generic_name, 
                    "part":part, 
                    "expiration_date":expirationDateValue, 
                    "lot":lot, 
                    "status":status, 
                    "metadata":metadata}, 
                  dispatch)

  };

  return (
    <Dialog open={openReagent} onClose={handleClose}>
      <DialogTitle>
        "Register New Reagent"
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
            Please fill a new reagent's information in the fields below:
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
              id="generic_name"
              label="DB name"
              type="text"
              fullWidth
              inputRef={generic_nameRef}
              required
            />

             <TextField
              margin="normal"
              variant="standard"
              id="part"
              label="PART#"
              type="text"
              fullWidth
              inputRef={partRef}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="lot"
              label="LOT#"
              type="text"
              fullWidth
              inputRef={lotRef}
              required
            />
          
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Expiration Date"
                value={expirationDateValue}
                onChange={(newValue) => {
                  setExpirationDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
              />
            </LocalizationProvider>
            
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