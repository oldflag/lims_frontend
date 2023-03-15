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

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import MiniSeq from '../../../template/samplesheets/miniseq'


const SampleSheetForm = () => {
  const {
    state: { seqRuns, seqLibrarys, openSampleSheet },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (seqLibrarys.length === 0) getSeqLibrarys(dispatch);
    if (seqRuns.length === 0) getSeqRuns(dispatch);
  },[]);

  const seqRunsOptions = seqRuns.map(({ name, id }) => ({ label:name, id:id }));

  const [seqRunValue, setSeqRunValue] = useState(seqRunsOptions[0]);
  const [seqDateValue, setSeqDateValue] = useState(new Date());

  const machineRef = useRef();
  const read1LenRef = useRef();
  const read2LenRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_SAMPLESHEET' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const aRunLibrarys = seqLibrarys.filter(x => x.seqRun_name==seqRunValue.label)
    console.log(aRunLibrarys)

    let seqPlatform = machineRef.current.value

    if(seqPlatform ==='MiniSeq'){

      fetch(MiniSeq)
      .then(r => r.text())
      .then(text => {

        text = text.replace('[RUNNAME]',seqRunValue.label)
        text = text.replace('[READLENGTH1]',read1LenRef.current.value)
        text = text.replace('[READLENGTH2]',read2LenRef.current.value)
        text = text.replace('[SEQDATE]',seqDateValue.toLocaleDateString())

        for (let i in aRunLibrarys){
          let x = aRunLibrarys[i];
          text = text + x.name + ',' + x.library_name + ',,' +x.i7Primer_rcSeq +','+x.i7Primer_name+','+x.i5Primer_fSeq+','+x.i5Primer_name+','+'\n' 
        }
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = seqRunValue.label + "_samplesheet.csv";
        link.href = url;
        link.click();

      });

    }

    
    
    
    // await register({"name":name, 
    //                 "extract_date":extractDateValue, 
    //                 "extract_method":extract_method, 
    //                 "status":status, 
    //                 "metadata":metadata,
    //                 "specimenId":specimenValue.id}, 
    //               dispatch)
    dispatch({ type: 'CLOSE_SAMPLESHEET' });
  };

  return (
    <Dialog open={openSampleSheet} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        Generate SampleSheet
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

            <FormControl fullWidth sx={{width: '100%', mt:2}} >
              <InputLabel id="machine">Sequencer</InputLabel>
              <Select
                labelId="machinetype"
                id="machineType"
                inputRef={machineRef}
                label="Sequencer"
                defaultValue={'MiniSeq'}
                
              >
                <MenuItem value={'MiniSeq'}>MiniSeq</MenuItem>
                <MenuItem value={'MiSeq'}>MiSeq</MenuItem>
                <MenuItem value={'NextSeq'}>NextSeq</MenuItem>
                <MenuItem value={'NovaSeq'}>NovaSeq</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              variant="standard"
              id="read1"
              label="Read 1 Length"
              type="text"
              fullWidth
              inputRef={read1LenRef}
              defaultValue={"151"} 
              required
            />

            <TextField
              margin="normal"
              variant="standard"
              id="read2"
              label="Read 2 Length"
              type="text"
              fullWidth
              inputRef={read2LenRef}
              defaultValue={"151"} 
              required
            />
 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                inputFormat="MM/DD/YYYY"
                label="Sequencing Date"
                value={seqDateValue}
                onChange={(newValue) => {
                  setSeqDateValue(newValue.toLocaleDateString());
                }}
                renderInput={(params) => <TextField {...params} sx={{width: '100%', mt:2}}/>}
                
              />
            </LocalizationProvider>
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

export default SampleSheetForm;