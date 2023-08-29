import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Typography, Button, Grid } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import { register as registerDnaLibrary } from '../../../../actions/dnaLibrary';
import { register as registerDnaSplitEnzyme } from '../../../../actions/dnaSplitEnzyme';
import { register as registerDnaAdapter } from '../../../../actions/dnaAdapter';
import { register as registerDnaLibMultiplex } from '../../../../actions/dnaLibMultiplex';



import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  useGridApiRef,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';

// import { getDoubleSizeSelects } from '../../../../actions/doubleSizeSelect';
import { getLysiss } from '../../../../actions/lysis';
import DnaLibrarySDMenu from '../../../../components/labprocess/dnaLibrary/dnaLibrarySDMenu';
import { getDnaAdapters } from '../../../../actions/dnaAdapter';
import { getDnaLibMultiplexs } from '../../../../actions/dnaLibMultiplex';
import { getDnaLibrarys } from '../../../../actions/dnaLibrary';
import { getDnaSplitEnzymes } from '../../../../actions/dnaSplitEnzyme';
function EditToolbar(props) {

  const {
    state: { currentUser, selectedDnaLibrarys, dnaLibrarys, dnaSplitEnzymes, dnaLibMultiplexs, dnaAdapters  },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (dnaAdapters.length === 0) getDnaAdapters(dispatch);
    if (dnaLibMultiplexs.length === 0) getDnaLibMultiplexs(dispatch);
    if (dnaLibrarys.length === 0) getDnaLibrarys(dispatch);
    if (dnaSplitEnzymes.length === 0) getDnaSplitEnzymes(dispatch);
  }, []);
  
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
      <GridToolbarQuickFilter />
      { !submitStatus && <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab> }
      { submitStatus && <Button sx={{mr:2}} variant="contained" endIcon={<Send />} onClick={handleSendClick}>
            Select & Submit
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
    state: { lysiss, openDnaLib, loading},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (lysiss.length === 0) getLysiss(dispatch);
  }, []);

  const [rows, setRows] = useState(lysiss);
  const [rowModesModel, setRowModesModel] = useState({});
  const [selectedRows, setSelectedRows] = useState(null);

  useEffect(() => {

    setRows(lysiss)
    
  }, [lysiss]);

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
    let selected = rows.filter(arow => params.includes(arow.id)).map(arow =>({"lysisId":arow.id, "lysis_name":arow.name}) )
    setSelectedRows(selected)
  }


  const columns = useMemo(
    () =>  [
    { field: 'batch_name', headerName: 'Batch Name', flex: 2}, //headerAlign:'right' },
    { field: 'name', headerName: 'Lysis Name', flex: 1 },
    { field: 'quantity', headerName: 'Quantity', flex: 1 },
    { field: 'quantityUnit', headerName: 'Quantity Unit', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    { field: 'memo', headerName: 'Note', flex: 1},
    { field: 'operator', headerName: 'Operator', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'dateTime',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY hh:mm A"),
    },  
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
        <Grid container spacing={2} sx={{alignItems:'center'}}>
          <Grid item xs={4}>
          <DnaLibrarySDMenu />
          </Grid>
          <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
           Create DNA Libraries
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
      
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={openDnaLib}
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