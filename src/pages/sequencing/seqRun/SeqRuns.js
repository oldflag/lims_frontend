import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/seqRun';
// import DigestInputForm from '../../../components/sequencing/seqFile/DigestInputForm'
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSeqRuns } from '../../../actions/seqRun';
import SeqRunsActions from './SeqRunsActions'
import SeqLibrarySDMenu from '../../../components/sequencing/seqLibrary/seqLibrarySDMenu';
import RunReportForm from '../../../components/sequencing/seqRun/RunReportForm';



export default function SeqRuns() {

  const {
    state: { seqRuns },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (seqRuns.length === 0) getSeqRuns(dispatch);
  }, []);

  const [rows, setRows] = useState(seqRuns);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(seqRuns)
    
  }, [seqRuns]);


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

    const { id, seqDate, machine, memo, status} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ seqDate, machine, memo, status}, id, dispatch);
      if(result) {
        getSeqRuns(dispatch)
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
        <SeqRunsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Seq Run Name', flex: 2},
    {
      field: 'seqDate',
      headerName: 'Seq Date',
      flex: 1,
      editable: true,
      type: 'date',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"),
      
    },
    { field: 'batch_name', headerName:'Batch Name', flex: 2},
    { field: 'machine', headerName:'Machine', flex: 1, editable: true},
    { field: 'memo', headerName:'Note', flex: 1, editable: true},
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
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY hh:mm A"),
      
    },
    
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    <RunReportForm />
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
          Sequencing Runs
        </Typography>
        </Grid>
      </Grid>
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
        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}
        checkboxSelection={true}
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
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}