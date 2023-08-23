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
import { register } from '../../../actions/splitPool';
import { useValue } from '../../../context/ContextProvider';
import { getBatchs } from '../../../actions/batch';

const AddForm =  () => {
  const {
    state: { currentUser, openSplitPool, batchs},
    dispatch,
  } = useValue();

  useEffect(() => {
    if (batchs.length === 0) getBatchs(dispatch);
  },[]);

  const batchOptions = batchs.map(({ name, id }) => ({ label:name, id:id }));
  const [batchValue, setBatchValue] = useState('');
  const spLayoutRef = useRef()
  const statusRef = useRef()
  const memoRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SPLITPOOL' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    // const status = statusRef.current.value;
    const memo = memoRef.current.value;
    const spLayout = spLayoutRef.current.value;

    await register({
                    "batchId":batchValue.id,
                    "spLayout":spLayout,
                    "operator":currentUser.email,
                    // "status":status,
                    "memo":memo,
                    },dispatch)

};

  return (
    <Dialog open={openSplitPool} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        Add A New Pooling\Channeling
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
            Please fill the fields below:
          </DialogContentText>

            <Autocomplete
              disablePortal
              id="batch_"
              options={batchOptions}
              value={batchValue}
              onChange={(e, newValue) => {
                setBatchValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Select a batch" variant="standard" />}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="spLayout_"
              label="Layout\Channel Information"
              type="text"
              defaultValue={"10x Single"}
              fullWidth
              inputRef={spLayoutRef}
            />

            {/* <TextField
              margin="normal"
              variant="standard"
              id="status"
              label="Status"
              type="text"
              fullWidth
              inputRef={statusRef}
            /> */}

            <TextField
              margin="normal"
              variant="standard"
              id="memo"
              label="Note"
              type="text"
              fullWidth
              inputRef={memoRef}
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