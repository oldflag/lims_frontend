import { useState, useRef} from 'react';
import { TextField, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Fab, Button } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

import { register } from '../../../actions/tapeStation';
// import { register as registerSeqRun } from '../../../actions/seqRun';
import { getTapeStations } from '../../../actions/tapeStation';
import { uploadFile } from '../../../actions/utils/s3';
import { useNavigate } from 'react-router-dom';


export default function ActionToolbar(props) {

  const {
    state: { currentUser, selectedTapeStations },
    dispatch,
  } = useValue();
  
  const [file, setFile] = useState()

  const navigate = useNavigate()


  const handleClickFile =  async(e) => {

    const inputfile = e.target.files[0]
		setFile(inputfile)

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: inputfile.name + ' is ready to upload !!'
      },
    });
    
  };

  const handleUploadInfo = async(e) => {

    e.preventDefault(); 

    let fileNameParts = file.name.split('.')
    let fileName = fileNameParts[0]

    if (selectedTapeStations.length === 0) 
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Please select libraries related to the uploaded file',
        },
      });

    let newFileName = 'TapeStation-'+uuidv4()+'-'+file.name

    try {
      const uploadResult = await uploadFile(file, newFileName, file.type)
    } catch (error) {
      const {httpStatusCode } = error.$metadata
      console.log({ httpStatusCode })
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'HttpStatusCode: '+httpStatusCode,
        },
      });
    }

    for (let aItem of selectedTapeStations) {
      
      let tapeStationId = uuidv4()

      aItem.libType.toUpperCase() === 'DNA' ? 

       await register({"id":tapeStationId, 
                  "name": fileName,
                  "libType":aItem.libType,
                  "dnaLibraryId":aItem.libId,
                  "resultFile": newFileName,
                  "operator":currentUser.email,
                  },dispatch)
      : await register({"id":tapeStationId, 
                  "name": fileName,
                  "libType":aItem.libType,
                  "rnaLibraryId":aItem.libId,
                  "resultFile": newFileName,
                  "operator":currentUser.email,
                  },dispatch)

    }

   
    navigate('/qcresult/tapeStation')
    

  }

  return (
    <Box sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"center"}}>
      
        <Fab size="small" color="primary" aria-label="add" sx={{ml:2}} component="label">
          <Tooltip title="Browse Files">
            <FolderOpenIcon/>
          </Tooltip>
          <input hidden type="file" onChange={handleClickFile} />
        </Fab>
      <Fab size="small" color="primary" aria-label="add" sx={{ml:2}} component="label">
        <Tooltip title="Submit">
          <UploadFileIcon onClick={handleUploadInfo}/>
        </Tooltip>
      </Fab>
    </Box>
  );
}
