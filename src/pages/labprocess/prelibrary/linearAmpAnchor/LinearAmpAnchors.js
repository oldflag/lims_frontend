import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/linearAmpAnchor';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getLinearAmpAnchors } from '../../../../actions/linearAmpAnchor';
import LinearAmpAnchorsActions from './LinearAmpAnchorsActions'
import PreLibrarySDMenu from '../../../../components/labprocess/preLibrary/preLibrarySDMenu'



export default function LinearAmpAnchors() {

  const {
    state: { linearAmpAnchors },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (linearAmpAnchors.length === 0) getLinearAmpAnchors(dispatch);
  }, []);

  const [rows, setRows] = useState(linearAmpAnchors);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(linearAmpAnchors)
    
  }, [linearAmpAnchors]);


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
        getLinearAmpAnchors(dispatch)
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
        <LinearAmpAnchorsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'lysis_batch_name', headerName: 'Batch Name', width: 150, },
    { field: 'lysis_name', headerName: 'Lysis Name', width: 100, editable: true },
    { field: 'reagentInfo', headerName: 'Reagent Info', width: 200, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      width: 100,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Memo', width: 250, editable: true },
    { field: 'operator', headerName: 'Operator', width: 150, editable: true },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 200,
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
        < PreLibrarySDMenu />
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: 'center', mt: 2, mb: 2, ml:25 }}
        >
          Linear Amplication with Anchors
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