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
import { register } from '../../../actions/specimen';
import { useValue } from '../../../context/ContextProvider';
import { getDonors } from '../../../actions/donor';

const AddForm = () => {
  const {
    state: { openSpecimen, donors },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (donors.length === 0) getDonors(dispatch);
  },[]);

  const donorOptions = donors.map(({ name, id }) => ({ label:name, id:id }));

  const [donorValue, setDonorValue] = useState(donorOptions[0]);
  const [collectionDateValue, setCollectionDateValue] = useState(null);
  const [receiptDateValue, setReceiptDateValue] = useState(null);

  const nameRef = useRef();
  const speciesRef = useRef();
  const tissueRef = useRef();
  const tissue_amountRef = useRef();
  const tissue_amount_unitRef = useRef();
  const uberon_idRef = useRef();
  const received_cell_countRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SPECIMEN' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const name = nameRef.current.value;
    const tissue = tissueRef.current.value;
    const tissue_amount = tissue_amountRef.current.value;
    const tissue_amount_unit = tissue_amount_unitRef.current.value;
    const species = speciesRef.current.value;
    const uberon_id = uberon_idRef.current.value;
    const metadata = metadataRef.current.value;

    console.log(donorValue)
    await register({"name":name, 
                    "tissue":tissue, 
                    "tissue_amount":tissue_amount, 
                    "tissue_amount_unit":tissue_amount_unit, 
                    "species":species, 
                    "receipt_date":receiptDateValue,
                    "uberon_id":uberon_id,
                    "collection_date":collectionDateValue,
                    "metadata":metadata, 
                    "donorId":donorValue.id}, 
                  dispatch)

  };

  return (
    <Dialog open={openSpecimen} onClose={handleClose}>
      <DialogTitle>
        "Register New Specimen"
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
            Please fill a new specimen's information in the fields below:
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
            <Autocomplete
              disablePortal
              id="donor_"
              options={donorOptions}
              value={donorValue}
              onChange={(e, newValue) => {
                setDonorValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Donor" variant="standard" />}
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
              id="tissue"
              label="Tissue"
              type="text"
              fullWidth
              inputRef={tissueRef}
            />
            <TextField
              margin="normal"
              variant="standard"
              id="tissue_amount"
              label="Tissue Amount"
              type="text"
              fullWidth
              inputRef={tissue_amountRef}
            />
            <TextField
              margin="normal"
              variant="standard"
              id="tissue_amount_unit"
              label="Tissue Amount Unit"
              type="text"
              fullWidth
              inputRef={tissue_amount_unitRef}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Collection Date"
                value={collectionDateValue}
                onChange={(newValue) => {
                  setCollectionDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
              />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Receipt Date"
                value={receiptDateValue}
                onChange={(newValue) => {
                  setReceiptDateValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
              />
            </LocalizationProvider>
            <TextField
              margin="normal"
              variant="standard"
              id="uberon_id"
              label="Uberon"
              type="text"
              fullWidth
              inputRef={uberon_idRef}
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