import {useEffect, useState, useMemo, useRef} from 'react';
import { Grid, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Typography, Button } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import QCresultSDMenu from '../../../components/qcresult/tapeStation/QCresultSDMenu';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getDnaLibrarys } from '../../../actions/dnaLibrary';
import { getRnaLibrarys } from '../../../actions/rnaLibrary';
import ActionToolbar from '../../../components/qcresult/tapeStation/ActionToolbar';


export default function NewTapeStations() {

  const {
    state: { dnaLibrarys, rnaLibrarys},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    if (dnaLibrarys.length === 0) getDnaLibrarys(dispatch);
    if (rnaLibrarys.length === 0) getRnaLibrarys(dispatch);
  }, []);

  const [dnaRows, setDnaRows] = useState(dnaLibrarys);
  const [rnaRows, setRnaRows] = useState(rnaLibrarys);
  
  const [rowModesModel, setRowModesModel] = useState({});
  // const [selectedRows, setSelectedRows] = useState(null);
  const [selectedRowsDna, setSelectedRowsDna] = useState([]);
  const [selectedRowsRna, setSelectedRowsRna] = useState([]);

  useEffect(() => {

    setDnaRows(dnaLibrarys)
    
  }, [dnaLibrarys]);

  useEffect(() => {

    setRnaRows(rnaLibrarys)
    
  }, [rnaLibrarys]);



  useEffect(() => {

    dispatch({ type: 'UPDATE_TAPESTATIONSELECT', payload: [...selectedRowsDna, ...selectedRowsRna] });
    // console.log(selectedselectedNewTapeStations)

  }, [selectedRowsDna, selectedRowsRna])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const onRowsSelectionHandlerDna = (params, event) => {
    event.defaultMuiPrevented = true;
    let dnaSelected = dnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'DNA'}) )
    // let rnaSelected = rnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'RNA'}) )
    setSelectedRowsDna(dnaSelected)
  }
  const onRowsSelectionHandlerRna = (params, event) => {
    event.defaultMuiPrevented = true;
    // let dnaSelected = dnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'DNA'}) )
    let rnaSelected = rnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'RNA'}) )
    setSelectedRowsRna(rnaSelected)
  }


  const dnaColumns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Library Name', flex: 1},
    { field: 'lysis_batch_name', headerName: 'Batch Name', flex: 1, },
    { field: 'lysis_name', headerName: 'Lysis Name', flex: 1}, 
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"),
      // dateSetting:{locale: "en-US"}
    }, 
  ],
  [dnaRows]
  );

  const rnaColumns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Library Name', flex: 1},
    { field: 'lysis_batch_name', headerName: 'Batch Name', flex: 1 },
    { field: 'lysis_name', headerName: 'Lysis Name', flex: 1}, 
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"),
      // dateSetting:{locale: "en-US"}
    },
  ],
  [rnaRows]
  );

  return (
    <>
    {/* <AddForm /> */}
    
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
      <Grid container spacing={2} alignItems="center" sx={{mt: 1}}>
        <Grid item xs={4}><QCresultSDMenu /></Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
          {"Select libraries and upload a result file"}
        </Typography>
        </Grid>
        <Grid item xs={4} >
            <ActionToolbar />
        </Grid>
      </Grid>

      
      <Box sx={{ m:2, height: 700, display:'flex'}}>
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        boxShadow: 3,
        borderRadius: 2,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}   
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={true}
        rows={dnaRows}
        columns={dnaColumns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={onRowsSelectionHandlerDna}
        
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        boxShadow: 3,
        borderRadius: 2,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}     
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={true}
        rows={rnaRows}
        columns={rnaColumns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={onRowsSelectionHandlerRna}
        
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      </Box>
    </Box>
    </>
  );
}