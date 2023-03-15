import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/rnaLibMultiplex';


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

  const [pageSize, setPageSize] = useState(10);

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
      width: 150,
      cellClassName: 'actions',
      renderCell: (params) => (
        <RnaLibMultiplexsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'rnaLibrary_lysis_batch_name', headerName: 'Batch Name', width: 150, },
    { field: 'rnaLibrary_lysis_name', headerName: 'Lysis Name', width: 100},
    { field: 'rnaLibrary_name', headerName: 'Library Name', width: 100},
    { field: 'reagentInfo', headerName: 'Reagent Info', width: 200, editable: true },
   { field: 'i7PrimerId', 
      headerName: 'i7 Primer', 
      width: 100, 
      type: 'singleSelect',
      valueOptions: i7Ids,
      editable:true},
    { field: 'i5PrimerId', 
      headerName: 'i5 Primer', 
      width: 100,
      type: 'singleSelect',
      valueOptions: i5Ids, 
      editable:true},
    { field: 'status', 
      headerName: 'Status', 
      width: 100,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Memo', width: 200, editable: true },
    { field: 'operator', headerName: 'Operator', width: 150, editable: true },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
      type: 'dateTime',
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
        <RnaLibrarySDMenu />
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'center', mt: 2, mb: 2, ml:20 }}
      >
        RNA Library Multiplexing
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