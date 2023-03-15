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
import { register } from '../../../actions/lysis';
import { useValue } from '../../../context/ContextProvider';
import { getSplitPools } from '../../../actions/splitPool';

const AddForm =  () => {
  const {
    state: { currentUser, openLysis, splitPools},
    dispatch,
  } = useValue();

  useEffect(() => {
    if (splitPools.length === 0) getSplitPools(dispatch);
  },[]);

  const splitPoolOptions = splitPools.map(({ batch_name, batchId, id }) => ({ label:batch_name, id:batchId, spId:id }));
  const [splitPoolValue, setSplitPoolValue] = useState('');
  const rowFromRef = useRef()
  const rowToRef = useRef()
  const colFromRef = useRef()
  const colToRef = useRef()
  const quantityRef = useRef()
  const quantityUnitRef = useRef()
  const memoRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_LYSIS' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const quantity = quantityRef.current.value;
    const quantityUnit = quantityUnitRef.current.value;
    const memo = memoRef.current.value;
    const rowFrom = rowFromRef.current.value;
    const rowTo = rowToRef.current.value;
    const colFrom = colFromRef.current.value;
    const colTo = colToRef.current.value;

    const chars = [...Array(26)].map((_, i) => String.fromCharCode(i + 65));
    const rowchars = chars.slice(chars.indexOf(rowFrom),  chars.indexOf(rowTo)+1)
    const colstart = +colFrom
    const colend = +colTo 

    if (rowchars === undefined || rowchars.length == 0){
       dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'Error',
            message: 'Row start and/or end letter is not correct!!',
          },
        });

        return
    } 

    if (colstart > colend || colend <= 0){
       dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'Error',
            message: 'Column start and/or end number is not correct!!',
          },
        });

        return
    } 

    dispatch({ type: 'START_LOADING' });
    
    for (let aRow of rowchars){
      for (let j = colstart; j <= colend; j++) {

        await register({"name":aRow+j.toString(),
                    "batchId":splitPoolValue.id,
                    "splitPoolId":splitPoolValue.spId,
                    "operator":currentUser.email,
                    "quantity":quantity,
                    "quantityUnit":quantityUnit,
                    "memo":memo,
                    },dispatch)

      }
    }

    dispatch({ type: 'CLOSE_LYSIS' });

};

  return (
    <Dialog open={openLysis} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New Lyses"
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
            Please fill information in the fields below to generate lyses:
          </DialogContentText>

            <Autocomplete
              disablePortal
              id="splitPool_"
              options={splitPoolOptions}
              value={splitPoolValue}
              onChange={(e, newValue) => {
                setSplitPoolValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Select a batch" variant="standard" />}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="rowFrom_"
              label="Row From"
              type="text"
              defaultValue={"A"}
              fullWidth
              inputRef={rowFromRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="rowTo_"
              label="To"
              type="text"
              defaultValue={"H"}
              fullWidth
              inputRef={rowToRef}
            />

             <TextField
              margin="normal"
              variant="standard"
              id="colFrom_"
              label="Column From"
              type="text"
              defaultValue={"1"}
              fullWidth
              inputRef={colFromRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="colTo_"
              label="To"
              type="text"
              defaultValue={"64"}
              fullWidth
              inputRef={colToRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="quantity_"
              label="Quantity"
              type="text"
              fullWidth
              inputRef={quantityRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="quantityUnit_"
              label="Quantity Unit"
              type="text"
              fullWidth
              inputRef={quantityUnitRef}
            />

            <TextField
              margin="normal"
              variant="standard"
              id="memo"
              label="Memo"
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