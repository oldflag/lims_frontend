import { useState, useRef} from 'react';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Button } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

import { register as registerSeqLibrary } from '../../../actions/seqLibrary';
import { register as registerSeqRun } from '../../../actions/seqRun';


export default function ActionToolbar(props) {

  const {
    state: { currentUser, selectedSeqLibrarys },
    dispatch,
  } = useValue();
  
  const [submitStatus, setSubmitStatus] = useState(false);

  const runNameRef = useRef();
  

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SEQLIB' })
    setSubmitStatus(true)

  };

  const handleSendClick = async(e) => {

    e.preventDefault();  
    // dispatch({type: 'START_LOADING'})

    const runName = runNameRef.current.value;

    if (!runName) 
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Please provide a name for new sequencing run!!',
        },
      });

    if (selectedSeqLibrarys.length === 0) 
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Please select libraries for the new sequencing run!!',
        },
      });

    let seqRunId = uuidv4()

    await registerSeqRun({"id":seqRunId,
                          "name":runName,
                          "operator":currentUser.email
    },dispatch)


    for (let aItem of selectedSeqLibrarys) {
      
      let seqLibraryId = uuidv4()

      console.log(aItem)

      aItem.libType.toUpperCase() === 'DNA' ? 

        await registerSeqLibrary({"id":seqLibraryId, 
                  "seqRunId":seqRunId,
                  "name": "S"+aItem.libName,
                  "libType":aItem.libType,
                  "dnaLibraryId":aItem.libId
                  },dispatch)
      : await registerSeqLibrary({"id":seqLibraryId, 
                  "seqRunId":seqRunId,
                  "name": "S"+aItem.libName,
                  "libType":aItem.libType,
                  "rnaLibraryId":aItem.libId
                  },dispatch)

    }

// dispatch({type: 'END_LOADING'})
    dispatch({ type: 'CLOSE_SEQLIB' })
    setSubmitStatus(false)

  };
  const handleCancelClick = () => {
    
    dispatch({ type: 'CLOSE_SEQLIB' })
    setSubmitStatus(false)
  };

  return (
    <Box sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
      { submitStatus && <TextField
              margin="normal"
              variant="standard"
              id="runName"
              label="New Run Name"
              type="text"
              width="100"
              inputRef={runNameRef}
              sx={{mr:5, alignItems:'center'}}
            />}
      { !submitStatus && <Fab size="medium" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab> }
      { submitStatus && <Button sx={{mr:2}} variant="contained" endIcon={<Send />} onClick={handleSendClick}>
            Submit
      </Button>}
      { submitStatus && <Button variant="contained" endIcon={<Cancel />} onClick={handleCancelClick}>
            Cancel
      </Button>}
    </Box>
  );
}
