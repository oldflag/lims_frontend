import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Grid } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/rnaLibMultiplex';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getRnaLibMultiplexs } from '../../../../actions/rnaLibMultiplex';
import RnaLibMultiplexsActions from './RnaLibMultiplexsActions'
import RnaLibrarySDMenu from '../../../../components/labprocess/rnaLibrary/rnaLibrarySDMenu';
import { getI7Primers } from '../../../../actions/i7Primer';
import { getI5Primers } from '../../../../actions/i5Primer';



export default function RnaLibMultiplexs() {

  const {
    state: { rnaLibMultiplexs, i7Primers, i5Primers },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (rnaLibMultiplexs.length === 0) getRnaLibMultiplexs(dispatch);
    if (i7Primers.length === 0) getI7Primers(dispatch);
    if (i5Primers.length === 0) getI5Primers(dispatch);

  }, []);

  const [rows, setRows] = useState(rnaLibMultiplexs);
  const [rowModesModel, setRowModesModel] = useState({});

  const i7Ids = i7Primers.map(({ id }) => id)
  const i5Ids = i5Primers.map(({ id }) => id)

  useEffect(() => {

    setRows(rnaLibMultiplexs)
    
  }, [rnaLibMultiplexs]);


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

    const { id, reagentInfo, status, beadRatio, i7PrimerId, i5PrimerId, memo} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ reagentInfo, status, beadRatio, i7PrimerId, i5PrimerId, memo}, id, dispatch);
      if(result) {
        getRnaLibMultiplexs(dispatch)
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
      flex: 1,
      cellClassName: 'actions',
      renderCell: (params) => (
        <RnaLibMultiplexsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'rnaLibrary_lysis_batch_name', headerName: 'Batch Name', flex: 2, },
    { field: 'rnaLibrary_lysis_name', headerName: 'Lysis Name', flex: 1},
    { field: 'rnaLibrary_name', headerName: 'Library Name', flex: 1},
    { field: 'reagentInfo', headerName: 'Reagent Info', flex: 1, editable: true },
   { field: 'i7PrimerId', 
      headerName: 'i7 Primer', 
      flex: 1, 
      type: 'singleSelect',
      valueOptions: i7Ids,
      editable:true},
    { field: 'i5PrimerId', 
      headerName: 'i5 Primer', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: i5Ids, 
      editable:true},
    { field: 'status', 
      headerName: 'Status', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Note', flex: 2, editable: true },
    { field: 'operator', headerName: 'Operator', flex: 1, editable: true },
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
            RNA Library Multiplexing
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