import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/seqLibrary';
import DigestInputForm from '../../../components/sequencing/seqFile/DigestInputForm'


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSeqLibrarys } from '../../../actions/seqLibrary';
import SeqFilesActions from './SeqFilesActions'
import SeqLibrarySDMenu from '../../../components/sequencing/seqLibrary/seqLibrarySDMenu';



export default function SeqFiles() {

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

    const { id, reagentInfo, status, file1, file2, memo} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ reagentInfo, status, memo, file1, file2}, id, dispatch);
      if(result) {
        getSeqLibrarys(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) => (
        <SeqFilesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'seqRun_name', headerName: 'Seq Run', flex: 1},
    { field: 'name', headerName: 'Seq Lib', flex: 1},
    { field: 'library_name', headerName:'Lib Name', flex: 1},
    { field: 'lysis_name', headerName:'Lysis Name', flex: 1},
    { field: 'libType', headerName: 'Lib Type', flex: 1},
    { field:'file1', headerName:'Fastq1', editable: true, flex: 1},
    { field:'file2', headerName:'Fastq2', editable: true, flex: 1},
    { field: 'status', 
      headerName: 'Status', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'dateTime',
      
    },
    
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    <DigestInputForm />
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
          Sequencing Files
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