import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Typography, Button } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

import { register as registerDnaLibrary } from '../../../../actions/dnaLibrary';
import { register as registerDnaSplitEnzyme } from '../../../../actions/dnaSplitEnzyme';
import { register as registerDnaAdapter } from '../../../../actions/dnaAdapter';
import { register as registerDnaLibMultiplex } from '../../../../actions/dnaLibMultiplex';



import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  useGridApiRef,
} from '@mui/x-data-grid';

import { getDoubleSizeSelects } from '../../../../actions/doubleSizeSelect';
import DnaLibrarySDMenu from '../../../../components/labprocess/dnaLibrary/dnaLibrarySDMenu';

function EditToolbar(props) {

  const {
    state: { currentUser, selectedDnaLibrarys },
    dispatch,
  } = useValue();
  
  const [submitStatus, setSubmitStatus] = useState(false);
  

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_DNALIB' })
    setSubmitStatus(true)

  };

  const handleSendClick = async(e) => {

    e.preventDefault();  
    // dispatch({type: 'START_LOADING'})
    for (let aItem of selectedDnaLibrarys) {
      
      let dnaLibraryId = uuidv4()
      let dnaSplitEnzymeId = uuidv4()
      let dnaAdapterId = uuidv4()
      let dnaLibMultiplexId = uuidv4()

      await registerDnaLibrary({"id":dnaLibraryId, 
                "lysisId":aItem.lysisId,
                "name": "D"+aItem.lysis_name,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerDnaSplitEnzyme({"id":dnaSplitEnzymeId, 
                "dnaLibraryId":dnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)


      await registerDnaAdapter({"id":dnaAdapterId, 
                "dnaLibraryId":dnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerDnaLibMultiplex({"id":dnaLibMultiplexId, 
                "dnaLibraryId":dnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

    }

// dispatch({type: 'END_LOADING'})
    dispatch({ type: 'CLOSE_DNALIB' })
    setSubmitStatus(false)

  };
  const handleCancelClick = () => {
    
    dispatch({ type: 'CLOSE_DNALIB' })
    setSubmitStatus(false)
  };

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      { !submitStatus && <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab> }
      { submitStatus && <Button sx={{mr:2}} variant="contained" endIcon={<Send />} onClick={handleSendClick}>
            Submit
      </Button>}
      { submitStatus && <Button variant="contained" endIcon={<Cancel />} onClick={handleCancelClick}>
            Cancel
      </Button>}
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  // setRowModesModel: PropTypes.func.isRequired,
  // setRows: PropTypes.func.isRequired,
  // selectedRows: PropTypes.array.isRequired,
};

export default function NewDnaLibrarys() {

  const {
    state: { doubleSizeSelects, openDnaLib, loading},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (doubleSizeSelects.length === 0) getDoubleSizeSelects(dispatch);
  }, []);

  const [rows, setRows] = useState(doubleSizeSelects);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {

    setRows(doubleSizeSelects)
    
  }, [doubleSizeSelects]);

  useEffect(() => {

    dispatch({ type: 'UPDATE_DNALIBSELECT', payload: selectedRows });
    // console.log(selectedDnaLibrarys)

  }, [selectedRows])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const onRowsSelectionHandler = (params, event) => {
    event.defaultMuiPrevented = true;
    let selected = rows.filter(arow => params.includes(arow.id)).map(arow =>({"lysisId":arow.lysisId, "lysis_name":arow.lysis_name}) )
    setSelectedRows(selected)
  }


  const columns = useMemo(
    () =>  [
    { field: 'lysis_batch_name', headerName: 'Batch Name', width: 200,}, //headerAlign:'right' },
    { field: 'lysis_name', headerName: 'Lysis Name', width: 200 },
    { field: 'beadsRatio1', headerName: 'beadsRatio1', width: 200 },
    { field: 'beadsRatio2', headerName: 'beadsRatio2', width: 200 },
    { field: 'qcConcent', headerName: 'QC Concentration', width: 200 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'memo', headerName: 'Memo', width: 150 },  
  ],
  [rows]
  );

  return (
    <>
    {/* <AddForm /> */}
    <Box
      sx={{
        mt :2,
        ml: "auto",
        mr: "auto",
        height: 700,
        width: '100%',
        // boxShadow: 2,
        // borderRadius: 2,
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        
      }}
    > 
      <Box sx={{ m:2, display:'flex'}}>
        <DnaLibrarySDMenu />
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: 'center', mt: 2, mb: 2, ml:40 }}
        >
        Create DNA Libraries
        </Typography>
      </Box>
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        // boxShadow: 3,
        borderRadius: 3,
        
        }}
        // loading ={loading}
        // loading={loading==='true'} 
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={openDnaLib}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={onRowsSelectionHandler}
        
        components={{
          Toolbar: EditToolbar,
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
     
    </Box>
    </>
  );
}