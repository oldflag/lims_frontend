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
import { useRef, useState } from 'react';
import { register } from '../../../actions/antibody';
import { useValue } from '../../../context/ContextProvider';

const AddForm = () => {
  const {
    state: { openAntibody },
    dispatch,
  } = useValue();

  const [autoName, setAutoName] = useState('');
  
  const nameRef = useRef();
  const vendorRef = useRef();
  const catRef = useRef();
  const targetRef = useRef();
  const lotRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ANTIBODY' });
    // setAutoName('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const vendor = vendorRef.current.value;
    const cat = catRef.current.value;
    const target = targetRef.current.value;
    const lot = lotRef.current.value;
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    await register({"name":name, 
                    "vendor":vendor, 
                    "cat":cat, 
                    "target":target, 
                    "lot":lot, 
                    "status":status, 
                    "metadata":metadata}, 
                  dispatch)
    setAutoName('')

  };

  return (
    <Dialog open={openAntibody} onClose={handleClose}>
      <DialogTitle>
        "Register New Antibody"
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
            Please fill a new antibody's information in the fields below:
          </DialogContentText>

            <TextField
              autoFocus
              margin="normal"
              variant="standard"
              id="target"
              label="Target"
              type="text"
              fullWidth
              inputRef={targetRef}
              required
            />

             <TextField
              margin="normal"
              variant="standard"
              id="cat"
              label="CAT#"
              type="text"
              fullWidth
              inputRef={catRef}
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
          
            <TextField
              margin="normal"
              variant="standard"
              id="name"
              label="Name"
              type="text"
              fullWidth
              inputRef={nameRef}
              value={autoName}
              inputProps={{ minLength: 2 }}
              onFocus={()=>{setAutoName(targetRef.current.value+'_'+catRef.current.value+'_'+lotRef.current.value)}}
              required
            />
            <TextField
              margin="normal"
              variant="standard"
              id="vendor"
              label="Vendor"
              type="text"
              fullWidth
              inputRef={vendorRef}
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
              label="meta"
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