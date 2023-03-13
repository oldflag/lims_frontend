import { Close, Send } from '@mui/icons-material';
import { Autocomplete} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

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
import { register as registerPtPrep } from '../../../actions/ptPrep';
import { register as registerNucleiIncubation } from '../../../actions/nucleiIncubation';
import { register as registerWashAndTag } from '../../../actions/washAndTag';
import { register as registerRnaRT } from '../../../actions/rnaRT';
import { useValue } from '../../../context/ContextProvider';

import { getBatchs } from '../../../actions/batch';
import { getAssays } from '../../../actions/assay';
import { getRnaRTs } from '../../../actions/rnaRT';
import { getNucleiIncubations } from '../../../actions/nucleiIncubation';
import { getWashAndTags } from '../../../actions/washAndTag';

const AddForm =  () => {
  const {
    state: { currentUser, openPtPrep, batchs, assays, rnaRTs,  washAndTags, nucleiIncubations},
    dispatch,
  } = useValue();

  useEffect(() => {
    if (batchs.length === 0) getBatchs(dispatch);
    if (assays.length === 0) getAssays(dispatch);
    if (washAndTags.length === 0) getWashAndTags(dispatch);
    if (nucleiIncubations.length === 0) getNucleiIncubations(dispatch);
    if (rnaRTs.length === 0) getRnaRTs(dispatch);
  },[]);

  const batchOptions = batchs.map(({ name, id }) => ({ label:name, id:id }));
  const [batchValue, setBatchValue] = useState('');
  const [assaysValue, setAssaysValue] = useState(null);
  const statusRef = useRef();
  const metadataRef = useRef();

  useEffect(() =>{  
    setAssaysValue(assays.filter((item) => {
                                        return item.batchId === batchValue.id})
                                      .map(({tubeNum, batchId, id}) => ({tubeNum, batchId, id}))
                        )},[batchValue, assays])

  const handleClose = () => {
    dispatch({ type: 'CLOSE_PTPREP' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;

    console.log(assaysValue)

    for (let element of assaysValue) {

    // assaysValue.forEach(element => {

      let ptPrepId = uuidv4()
      let nuIncId = uuidv4()
      let wtId = uuidv4()
      let rtId = uuidv4()

      await registerNucleiIncubation({"id":nuIncId, 
                "assayId":element.id,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)


      await registerWashAndTag({"id":wtId, 
                "assayId":element.id,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerRnaRT({"id":rtId, 
                "assayId":element.id,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerPtPrep({"id":ptPrepId,
                      "rnaRTId":rtId,
                      "nucleiIncubationId":nuIncId,  
                      "assayId":element.id,
                      "washAndTagId":wtId,
                      "operator":currentUser.email,
                      "status":status,
                      "metadata":metadata,
                      // "tubeNum":+element.tubeNum,
                      },dispatch)

  }
};

  return (
    <Dialog open={openPtPrep} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        "Register New PtPreps"
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
            Please fill a new ptPrep's information in the fields below:
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