import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Grid } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/tdtTailing';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getTdtTailings } from '../../../../actions/tdtTailing';
import TdtTailingsActions from './TdtTailingsActions'
import PreLibrarySDMenu from '../../../../components/labprocess/preLibrary/preLibrarySDMenu'



export default function TdtTailings() {

  const {
    state: { tdtTailings },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (tdtTailings.length === 0) getTdtTailings(dispatch);
  }, []);

  const [rows, setRows] = useState(tdtTailings);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(tdtTailings)
    
  }, [tdtTailings]);


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
        getTdtTailings(dispatch)
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
        <TdtTailingsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'lysis_batch_name', headerName: 'Batch Name', flex: 2, },
    { field: 'lysis_name', headerName: 'Lysis Name', flex: 1, editable: true },
    { field: 'reagentInfo', headerName: 'Reagent Info', flex: 1, editable: true },
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
          <PreLibrarySDMenu />
          </Grid>
          <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
            TDT Tailing
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