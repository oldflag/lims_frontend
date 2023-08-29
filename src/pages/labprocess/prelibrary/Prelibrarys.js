import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Typography, Button, Grid } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

import { register as registerTdtTailing } from '../../../actions/tdtTailing';
import { register as registerLinearAmpAnchor } from '../../../actions/linearAmpAnchor';
import { register as registerPreAmp } from '../../../actions/preAmp';
import { register as registerDoubleSizeSelect } from '../../../actions/doubleSizeSelect';



import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  useGridApiRef,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';

import { getLysiss } from '../../../actions/lysis';
import PreLibrarySDMenu from '../../../components/labprocess/preLibrary/preLibrarySDMenu'
import { getDoubleSizeSelects } from '../../../actions/doubleSizeSelect';
import { getLinearAmpAnchors } from '../../../actions/linearAmpAnchor';
import { getPreAmps } from '../../../actions/preAmp'
import { getTdtTailings } from '../../../actions/tdtTailing'



function EditToolbar(props) {

  const {
    state: { currentUser, selectedPrelibrarys },
    dispatch,
  } = useValue();

  const [submitStatus, setSubmitStatus] = useState(false);
  

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_PRELIB' })
    setSubmitStatus(true)

  };

  const handleSendClick = async(e) => {

    e.preventDefault();  
    // dispatch({type: 'START_LOADING'})

    
    for (let lysisId of selectedPrelibrarys) {
      
      let tdtTailingId = uuidv4()
      let linearAmpId = uuidv4()
      let preAmpId = uuidv4()
      let doubleSizeId = uuidv4()

      await registerTdtTailing({"id":tdtTailingId, 
                "lysisId":lysisId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerLinearAmpAnchor({"id":linearAmpId, 
                "lysisId":lysisId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)


      await registerPreAmp({"id":preAmpId, 
                "lysisId":lysisId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerDoubleSizeSelect({"id":doubleSizeId, 
                "lysisId":lysisId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

    }

// dispatch({type: 'END_LOADING'})
    dispatch({ type: 'CLOSE_PRELIB' })
    setSubmitStatus(false)

  };
  const handleCancelClick = () => {
    
    dispatch({ type: 'CLOSE_PRELIB' })
    setSubmitStatus(false)
  };

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <GridToolbarQuickFilter />
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

export default function Prelibrarys() {

  const {
    state: { lysiss, openPrelibrary, loading, doubleSizeSelects, linearAmpAnchors, preAmps, tdtTailings},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (lysiss.length === 0) getLysiss(dispatch);
    if (doubleSizeSelects.length === 0) getDoubleSizeSelects(dispatch);
    if (linearAmpAnchors.length === 0) getLinearAmpAnchors(dispatch);
    if (preAmps.length === 0) getPreAmps(dispatch);
    if (tdtTailings.length === 0) getTdtTailings(dispatch);
  }, []);

  const [rows, setRows] = useState(lysiss);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {

    setRows(lysiss)
    
  }, [lysiss]);

  useEffect(() => {

    dispatch({ type: 'UPDATE_PRELIBSELECT', payload: selectedRows });
    // console.log(selectedPrelibrarys)

  }, [selectedRows])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  // const onRowsSelectionHandler = (params, event) => {
  //   // event.defaultMuiPrevented = true;
  //   setSelectedRows(params)
  //   console.log(selectedRows)
  // }


  const columns = useMemo(
    () =>  [
    { field: 'batch_name', headerName: 'Batch Name', flex: 1 },
    { field: 'name', headerName: 'Lysis Name', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1, editable: true },
    { field: 'quantityUnit', headerName: 'Quantity Unit', flex: 1, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      width: 150,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Note', flex: 1, editable: true },
    
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    
    <Box
      sx={{
        mt :1,
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
        <Grid container spacing={2} sx={{alignItems:'center'}}>
          <Grid item xs={4}>
          <PreLibrarySDMenu />
          </Grid>
          <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
            Prelibrary
          </Typography>
          </Grid>
        </Grid>
      </Box>
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        boxShadow: 2,
        borderRadius: 2,
        borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        // rowHeight={30}
        density='compact'
        
        // loading ={loading}
        loading={loading==='true'} 
        isRowSelectable={(params) => !params.row.preLibStatus}
        checkboxSelection={openPrelibrary}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[15, 30, 45]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
        
        components={{
          Toolbar: EditToolbar,
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}