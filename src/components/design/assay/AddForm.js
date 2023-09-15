import { Close, Send, TroubleshootTwoTone } from '@mui/icons-material';
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
import { register } from '../../../actions/assay';
import { useValue } from '../../../context/ContextProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { getExperiments } from '../../../actions/experiment';
import { getBatchs } from '../../../actions/batch';
import { getAssayBarcodes } from '../../../actions/assayBarcode';
import { getLoadPatn5s } from '../../../actions/loadPatn5';

const AddForm = () => {
  const {
    state: { openAssay, experiments, batchs, loadPatn5s, assayBarcodes},
    dispatch,
  } = useValue();

  useEffect(() => {
    if (experiments.length === 0) getExperiments(dispatch);
    if (batchs.length === 0) getBatchs(dispatch);
    if (loadPatn5s.length === 0) getLoadPatn5s(dispatch);
    if (assayBarcodes.length === 0) getAssayBarcodes(dispatch);
  },[]);

  const dupBarcode_protocols = process.env.REACT_APP_DUPCODE_PROTOCOLS.split(',') // multiple tubes can share the same sample barcode 

  const batchOptions = batchs.map(({ name, id, priority, subProtocol }) => ({ label:name, id:id, protocol:priority, subprotocol:subProtocol }));
  const [batchValue, setBatchValue] = useState(batchOptions[0]);
  // const [typeValue, setTypeValue] = useState( null );
  // useEffect(() =>{  
  //   setTypeValue(batchValue.subprotocol)},[batchValue])

  // const uniqueTypeOptions = Array.from(new Set(assayBarcodes.map((item) => item.type)));
  const experimentOptions = experiments.map(({ name, id }) => ({ label:name, id:id }));
  const loadPatn5Options = Array.from(new Set(loadPatn5s.map((item)=> item.loadName)));
  const [experimentValue, setExperimentValue] = useState(experimentOptions[0]);
  const [loadPatn5Value, setLoadPatn5Value] = useState(loadPatn5Options[0]);
  const [assayDateValue, setAssayDateValue] = useState(null);
           
  const [tubebarcodeValue, setTubebarcodeValue] = useState([])
  useEffect(() =>{  
    setTubebarcodeValue(assayBarcodes.filter((item) => {
                                        return item.type === batchValue.subprotocol})
                                      .map(({tubeNum, barcode}) => ({tubeNum, barcode}))
                        )},[batchValue])

  const [subProtocolValue, setSubProtocolValue] = useState([]);
  useEffect(() =>{  
    setSubProtocolValue(batchValue.subProtocol)
  },[batchValue])
  
  // console.log(tubebarcodeValue)
  const tubeFromRef = useRef();
  const tubeToRef = useRef();
  const statusRef = useRef();
  const metadataRef = useRef();

  const handleClose = () => {
    dispatch({ type: 'CLOSE_ASSAY' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  
    const status = statusRef.current.value;
    const metadata = metadataRef.current.value;
    const tubeFrom = tubeFromRef.current.value;
    const tubeTo = tubeToRef.current.value;

      // tubebarcodeValue.forEach(element => {

      //   if(+element.tubeNum >= +tubeFrom && +element.tubeNum <= +tubeTo){
      //     console.log(typeof(tubebarcodeValue))
      //     console.log(tubebarcodeValue[element.tubeNum])
      //     console.log(batchValue.subprotocol)
      //     register({"experimentId":experimentValue.id, 
      //             "batchId":batchValue.id,
      //             "assayType": batchValue.subprotocol,
      //             "loadPatn5Name":loadPatn5Value,
      //             "assayDate":assayDateValue,
      //             "status":status, 
      //             "metadata":metadata,
      //             "tubeNum":+element.tubeNum,
      //             "barcode":element.barcode,
      //             },dispatch)

      //     }

      //   }
      // )

      let tubeDictionary = {}
      tubebarcodeValue.forEach(element => { console.log(element.tubeNum + " : " + element.barcode) })
      tubebarcodeValue.forEach(element => { tubeDictionary[+element.tubeNum] = element.barcode })

      console.log(tubeDictionary)

      for(let i=+tubeTo; i>= +tubeFrom; i--){

          console.log(tubebarcodeValue.find(item => item.tubeNum === i))

         register({"experimentId":experimentValue.id, 
                  "batchId":batchValue.id,
                  "assayType": batchValue.subprotocol,
                  "loadPatn5Name":loadPatn5Value,
                  "assayDate":assayDateValue,
                  "status":status, 
                  "metadata":metadata,
                  "tubeNum":i,
                  // "barcode": tubebarcodeValue.length >= +tubeTo ? tubebarcodeValue.find(item => item.tubeNum === i).barcode : ''
                  "barcode": tubebarcodeValue.length >= +tubeTo ? tubeDictionary[i] : ''  
                  },dispatch)

      }


   
  };

  return (
    <Dialog open={openAssay} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: 'center', mt: 1, mb: 1 }}>
        Register New Assays
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
            Please fill a new assay's information in the fields below:
          </DialogContentText>

            <Autocomplete
              disablePortal
              id="batch_"
              options={batchOptions}
              value={batchValue}
              onChange={(e, newValue) => {
                setBatchValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Batch" variant="standard" sx={{width: '100%', mt:2}}/>}
            />

            {/* <Autocomplete
              disablePortal
              id="assayBarcode_"
              options={uniqueTypeOptions}
              value={typeValue}
              onChange={(e, newValue) => {
                setTypeValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Assay type" variant="standard" sx={{width: '100%', mt:2}}/>}
            /> */}

            <TextField
              margin="normal"
              variant="standard"
              id="tubeFrom"
              label="Starting Tube #"
              type="text"
              fullWidth
              inputRef={tubeFromRef}
              defaultValue="1"
            />

            <TextField
              margin="normal"
              variant="standard"
              id="tubeTo"
              label="Ending Tube #"
              type="text"
              fullWidth
              inputRef={tubeToRef}
              defaultValue="12"
            />

            <Autocomplete
              disablePortal
              id="experiment_"
              options={experimentOptions}
              value={experimentValue}
              onChange={(e, newValue) => {
                setExperimentValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Experiment" variant="standard" sx={{width: '100%', mt:2}}/>}
            />

            

            <Autocomplete
              disablePortal
              id="loadPatn5_"
              options={loadPatn5Options}
              value={loadPatn5Value}
              onChange={(e, newValue) => {
                setLoadPatn5Value(newValue)
              }}
              renderInput={(params) => <TextField {...params} label="Load pATn5" variant="standard" sx={{width: '100%', mt:2}}/>}
            />
 
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Assay Date *"
                value={assayDateValue}
                onChange={(newValue) => {
                  setAssayDateValue(newValue);
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
              id="metadata"
              label="Note"
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