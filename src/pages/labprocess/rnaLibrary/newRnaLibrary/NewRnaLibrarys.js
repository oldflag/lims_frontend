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

import { register as registerRnaLibrary } from '../../../../actions/rnaLibrary';
import { register as registerRnaSplitEnzyme } from '../../../../actions/rnaSplitEnzyme';
import { register as registerRnaAdapter } from '../../../../actions/rnaAdapter';
import { register as registerRnaLibMultiplex } from '../../../../actions/rnaLibMultiplex';

import RnaLibrarySDMenu from '../../../../components/labprocess/rnaLibrary/rnaLibrarySDMenu';




import {
  DataGrid,
  GridToolbarContainer,
  useGridApiContext,
  useGridApiRef,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';

// import { getDoubleSizeSelects } from '../../../../actions/doubleSizeSelect';
import { getLysiss } from '../../../../actions/lysis';
import { getRnaAdapters } from '../../../../actions/rnaAdapter';
import { getRnaLibMultiplexs } from '../../../../actions/rnaLibMultiplex';
import { getRnaLibrarys } from '../../../../actions/rnaLibrary';
import { getRnaSplitEnzymes } from '../../../../actions/rnaSplitEnzyme';

function EditToolbar(props) {

  const {
    state: { currentUser, selectedRnaLibrarys,  rnaLibrarys, rnaSplitEnzymes, rnaLibMultiplexs, rnaAdapters  },
    dispatch,
  } = useValue();

  useEffect(() => {
    if (rnaAdapters.length === 0) getRnaAdapters(dispatch);
    if (rnaLibMultiplexs.length === 0) getRnaLibMultiplexs(dispatch);
    if (rnaLibrarys.length === 0) getRnaLibrarys(dispatch);
    if (rnaSplitEnzymes.length === 0) getRnaSplitEnzymes(dispatch);
  }, []);
  
  const [submitStatus, setSubmitStatus] = useState(false);
  

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_RNALIB' })
    setSubmitStatus(true)

  };

  const handleSendClick = async(e) => {

    e.preventDefault();  
    // dispatch({type: 'START_LOADING'})
    for (let aItem of selectedRnaLibrarys) {
      
      let rnaLibraryId = uuidv4()
      let rnaSplitEnzymeId = uuidv4()
      let rnaAdapterId = uuidv4()
      let rnaLibMultiplexId = uuidv4()

      await registerRnaLibrary({"id":rnaLibraryId, 
                "lysisId":aItem.lysisId,
                "name": "R"+aItem.lysis_name,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerRnaSplitEnzyme({"id":rnaSplitEnzymeId, 
                "rnaLibraryId":rnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)


      await registerRnaAdapter({"id":rnaAdapterId, 
                "rnaLibraryId":rnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

      await registerRnaLibMultiplex({"id":rnaLibMultiplexId, 
                "rnaLibraryId":rnaLibraryId,
                "operator":currentUser.email,
                // "tubeNum":+element.tubeNum,
                },dispatch)

    }

// dispatch({type: 'END_LOADING'})
    dispatch({ type: 'CLOSE_RNALIB' })
    setSubmitStatus(false)

  };
  const handleCancelClick = () => {
    
    dispatch({ type: 'CLOSE_RNALIB' })
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

export default function RnaLibrarys() {

  const {
    state: { lysiss, openRnaLib, loading},
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

    dispatch({ type: 'UPDATE_RNALIBSELECT', payload: selectedRows });
    // console.log(selectedRnaLibrarys)

  }, [selectedRows])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const onRowsSelectionHandler = (params, event) => {
    event.defaultMuiPrevented = true;
    // let selected = rows.filter(arow => params.includes(arow.id)).map(arow =>({"lysisId":arow.lysisId, "lysis_name":arow.lysis_name}) )
    let selected = rows.filter(arow => params.includes(arow.id)).map(arow =>({"lysisId":arow.id, "lysis_name":arow.name}) )

    setSelectedRows(selected)
  }


  const columns = useMemo(
    () =>  [
    { field: 'batch_name', headerName: 'Batch Name', flex: 1}, //headerAlign:'right' },
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
          <RnaLibrarySDMenu />
          </Grid>
          <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
          Create New RNA Libraries
          </Typography>
          </Grid>
        </Grid>
      </Box>
      <DataGrid
        sx={{
        m: 2,
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
        // loading={loading==='true'} 
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={openRnaLib}
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