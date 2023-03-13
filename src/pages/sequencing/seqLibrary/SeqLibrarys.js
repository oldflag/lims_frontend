import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/seqLibrary';
import SampleSheetForm from '../../../components/sequencing/seqLibrary/SampleSheetForm'


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSeqLibrarys } from '../../../actions/seqLibrary';
import SeqLibrarysActions from './SeqLibrarysActions'
import SeqLibrarySDMenu from '../../../components/sequencing/seqLibrary/seqLibrarySDMenu';



export default function SeqLibrarys() {

  const {
    state: { seqLibrarys },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (seqLibrarys.length === 0) getSeqLibrarys(dispatch);
  }, []);

  const [rows, setRows] = useState(seqLibrarys);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(seqLibrarys)
    
  }, [seqLibrarys]);


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };


  const processRowUpdate = async (newRow) => {
    
    const isNewRecord = newRow.isNew

    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    const { id, reagentInfo, status, memo} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ reagentInfo, status, memo}, id, dispatch);
      if(result) {
        getSeqLibrarys(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Seq Lib', width: 100},
    { field: 'seqRun_name', headerName: 'Seq Run', width: 150},
    { field: 'libType', headerName: 'Lib Type', width: 100},
    // { field: 'dnaLibrary_name', headerName: 'DLib Name', width: 150},
    // { field: 'dnaLibrary_dnaLibMultiplex_i7Primer_rcSeq', headerName: 'DIndex', width: 150},
    // { field: 'dnaLibrary_dnaLibMultiplex_i7Primer_name', headerName: 'DIndex ID', width: 150},
    // { field: 'dnaLibrary_dnaLibMultiplex_i5Primer_fSeq', headerName: 'DIndex2', width: 150},
    // { field: 'dnaLibrary_dnaLibMultiplex_i5Primer_name', headerName: 'DIndex2 ID', width: 150},
    // { field: 'rnaLibrary_name', headerName: 'RLib Name', width: 150},
    // { field: 'rnaLibrary_rnaLibMultiplex_i7Primer_rcSeq', headerName: 'RIndex', width: 150},
    // { field: 'rnaLibrary_rnaLibMultiplex_i7Primer_name', headerName: 'RIndex ID', width: 150},
    // { field: 'rnaLibrary_rnaLibMultiplex_i5Primer_fSeq', headerName: 'RIndex2', width: 150},
    // { field: 'rnaLibrary_rnaLibMultiplex_i5Primer_name', headerName: 'RIndex2 ID', width: 150},
    {field:'library_name', headerName:'Lib Name'},
    {field:'i7Primer_rcSeq', headerName:'I7 Index'},
    {field:'i7Primer_name', headerName:'I7 Index ID'},
    {field:'i5Primer_fSeq', headerName:'I5 Index'},
    {field:'i5Primer_name', headerName:'I5 Index ID'},
    { field: 'status', 
      headerName: 'Status', 
      width: 150,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
      type: 'dateTime',
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) => (
        <SeqLibrarysActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    <SampleSheetForm />
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
      <Grid container spacing={2} sx={{alignItems:'center'}}>
        <Grid item xs={4}>
        <SeqLibrarySDMenu />
        </Grid>
        <Grid item xs={4}>
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: 'center', mt: 2, mb: 2 }}
        >
          Sequencing Library
        </Typography>
        </Grid>
      </Grid>
      <DataGrid
        sx={{
        m: 2,
        // boxShadow: 3,
        borderRadius: 2,
        }}
        checkboxSelection={true}
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
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}