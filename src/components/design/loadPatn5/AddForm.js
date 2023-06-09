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
import { register } from '../../../actions/loadPatn5';
import { useValue } from '../../../context/ContextProvider';
import { getPatn5s } from '../../../actions/patn5';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddForm = () => {
  const {
    state: { openLoadPatn5, patn5s },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (patn5s.length === 0) getPatn5s(dispatch);
  },[]);

  const patn5Options = patn5s.map(({ name, id }) => ({ label:name, id:id }));

  const [patn5Value, setPatn5Value] = useState(patn5Options[0]);
  const [expirationDateValue, setExpirationDateValue] = useState(null);

  const loadNameRef = useRef();
  const tubeFromRef = useRef();
  const tubeToRef = useRef();
  const statusRef = useRef();
  const memoRef = useRef();
  const handleClose = () => {
    dispatch({ type: 'CLOSE_LOADPATN5' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const loadName = loadNameRef.current.value;
    const tubeFrom = tubeFromRef.current.value;
    const tubeTo = tubeToRef.current.value;
    const status = statusRef.current.value;
    const memo = memoRef.current.value;

    for (let i = +tubeFrom; i <= +tubeTo; i++) {

      await register({"loadName":loadName, 
                    "expiration_date":expirationDateValue, 
                    "tubeNum": i,
                    "status":status, 
                    "memo":memo,
                    "patn5Id":patn5Value.id}, 
                  dispatch)
    }
  };

  return (
    <Dialog open={openLoadPatn5} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New LoadPatn5"
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
            Please fill a new loadPatn5's information in the fields below:
          </DialogContentText>
          
            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="loadname"
              label="Load Name"
              type="text"
              fullWidth
              inputRef={loadNameRef}
              inputProps={{ minLength: 2 }}
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="tubefrom"
              label="Starting Tube #"
              type="text"
              fullWidth
              inputRef={tubeFromRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="tubeto"
              label="Ending Tube #"
              type="text"
              fullWidth
              inputRef={tubeToRef}
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
              id="memo"
              label="Note"
              type="text"
              fullWidth
              inputRef={memoRef}
            />

            <Autocomplete
              disablePortal
              id="patn5_"
              options={patn5Options}
              value={patn5Value}
              onChange={(e, newValue) => {
                setPatn5Value(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Patn5" variant="standard" />}
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