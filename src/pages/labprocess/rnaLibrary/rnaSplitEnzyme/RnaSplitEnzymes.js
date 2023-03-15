import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/rnaSplitEnzyme';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getRnaSplitEnzymes } from '../../../../actions/rnaSplitEnzyme';
import RnaSplitEnzymesActions from './RnaSplitEnzymesActions'
import RnaLibrarySDMenu from '../../../../components/labprocess/rnaLibrary/rnaLibrarySDMenu';


export default function RnaSplitEnzymes() {

  const {
    state: { rnaSplitEnzymes },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (rnaSplitEnzymes.length === 0) getRnaSplitEnzymes(dispatch);
  }, []);

  const [rows, setRows] = useState(rnaSplitEnzymes);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(rnaSplitEnzymes)
    
  }, [rnaSplitEnzymes]);


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
        getRnaSplitEnzymes(dispatch)
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
        <RnaSplitEnzymesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'rnaLibrary_lysis_batch_name', headerName: 'Batch Name', width: 150, },
    { field: 'rnaLibrary_lysis_name', headerName: 'Lysis Name', width: 150},
    { field: 'rnaLibrary_name', headerName: 'Library Name', width: 150},
    { field: 'reagentInfo', headerName: 'Reagent Info', width: 150, editable: true },
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
        sx={{ textAlign: 'center', mt: 2, mb: 2, ml:25 }}
      >
        RNA Split Enzyme
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