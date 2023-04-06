import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/dnaLibrary';
import DnaLibrarySDMenu from '../../../../components/labprocess/dnaLibrary/dnaLibrarySDMenu';
import moment from 'moment';



import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getDnaLibrarys } from '../../../../actions/dnaLibrary';
import DnaLibrarysActions from './DnaLibrarysActions'


export default function DnaLibrarys() {

  const {
    state: { dnaLibrarys },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (dnaLibrarys.length === 0) getDnaLibrarys(dispatch);
  }, []);

  const [rows, setRows] = useState(dnaLibrarys);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(dnaLibrarys)
    
  }, [dnaLibrarys]);


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
        getDnaLibrarys(dispatch)
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
        <DnaLibrarysActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Library Name', flex: 1},
    { field: 'lysis_batch_name', headerName: 'Batch Name', flex: 1, },
    { field: 'lysis_name', headerName: 'Lysis Name', flex: 1},
    { field: 'reagentInfo', headerName: 'Reagent Info', flex: 1, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      width: 100,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Memo', flex: 2, editable: true },
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
        <DnaLibrarySDMenu />
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'center', mt: 2, mb: 2, ml:45 }}
      >
        DNA Library
      </Typography>
      </Box>
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