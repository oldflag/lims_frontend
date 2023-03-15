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
import { register } from '../../../actions/sample';
import { useValue } from '../../../context/ContextProvider';
import { getSpecimens } from '../../../actions/specimen';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const AddForm = () => {
  const {
    state: { openSample, specimens },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (specimens.length === 0) getSpecimens(dispatch);
  },[]);

  const specimenOptions = specimens.map(({ name, id }) => ({ label:name, id:id }));

  const [specimenValue, setSpecimenValue] = useState(specimenOptions[0]);
  const [extractDateValue, setExtractDateValue] = useState(null);

  const nameRef = useRef();
  // const extract_dateRef = useRef();
  const extract_methodRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SAMPLE' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const name = nameRef.current.value;
    // const extract_date = extract_dateRef.current.value;
    const extract_method = extract_methodRef.current.value;
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name, 
                    "extract_date":extractDateValue, 
                    "extract_method":extract_method, 
                    "status":status, 
                    "metadata":metadata,
                    "specimenId":specimenValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openSample} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Sample"
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
            Please fill a new sample's information in the fields below:
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
 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Extraction Date"
                value={extractDateValue}
                onChange={(newValue) => {
                  setExtractDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
              />
            </LocalizationProvider>

            <TextField
              margin="normal"
              variant="standard"
              id="extract_method"
              label="Extraction Method"
              type="text"
              fullWidth
              inputRef={extract_methodRef}
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
              id="specimen_"
              options={specimenOptions}
              value={specimenValue}
              onChange={(e, newValue) => {
                setSpecimenValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Specimen" variant="standard" />}
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