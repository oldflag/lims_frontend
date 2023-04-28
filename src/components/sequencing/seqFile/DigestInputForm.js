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
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { register } from '../../../actions/sample';
import { useValue } from '../../../context/ContextProvider';
import { getSeqRuns } from '../../../actions/seqRun';
import { getSeqLibrarys } from '../../../actions/seqLibrary';
import { getAssays } from '../../../actions/assay';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import libraryDigest from '../../../template/digests/library_digest'
import sampleDigest from '../../../template/digests/sample_digest'


const DigestInputForm = () => {
  const {
    state: { seqRuns, seqLibrarys, openDigest, assays },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (seqLibrarys.length === 0) getSeqLibrarys(dispatch);
    if (seqRuns.length === 0) getSeqRuns(dispatch);
    if (assays.length === 0) getAssays(dispatch);
  },[]);

  const seqRunsOptions = seqRuns.map(({ name, id }) => ({ label:name, id:id }));

  const [seqRunValue, setSeqRunValue] = useState(seqRunsOptions[0]);

  const handleClose = () => {
    dispatch({ type: 'CLOSE_DIGEST' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const aRunLibrarys = seqLibrarys.filter(x => x.seqRun_name==seqRunValue.label)


    fetch(libraryDigest)
    .then(r => r.text())
    .then(text => {

      for (let i in aRunLibrarys){
        let x = aRunLibrarys[i];
        text = text + x.name + ',' + x.lysis_name + ',' +x.libType +','+x.file1+','+x.file2+'\n' 
      }
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = seqRunValue.label + "_library_digest.csv";
      link.href = url;
      link.click();

    }); 
    
    fetch(sampleDigest)
    .then(r => r.text())
    .then(text => {

      for (let i in aRunLibrarys){
        let x = aRunLibrarys[i];

        let aAssays = assays.filter(ay => ay.batch_id===x.batchId)

        for( let j in aAssays){

          let y = aAssays[j];
          
          console.log(y)

          text = text + y.sample_name + ',' + y.id + ',' + y.batch_name + ',' + y.antibody_target + ',' +y.tubeNum + ',' + y.barcode + ','  

          text = text + x.libType.toLowerCase() +','+ x.lysis_name + ',' +x.name + ',' + x.file1+','+x.file2+'\n' 

        }

        
      }
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = seqRunValue.label + "_sample_digest.csv";
      link.href = url;
      link.click();

    });  
 
    dispatch({ type: 'CLOSE_DIGEST' });
  };

  return (
    <Dialog open={openDigest} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        Generate Digest Files
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
          {/* <DialogContentText>
            Please fill a new sample's information in the fields below:
          </DialogContentText> */}

            <Autocomplete
              disablePortal
              id="seqRun_"
              options={seqRunsOptions}
              value={seqRunValue}
              onChange={(e, newValue) => {
                setSeqRunValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Select a Run Name" variant="standard" />}
              required
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

export default DigestInputForm;