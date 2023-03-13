import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/splitPool';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSplitPools } from '../../../actions/splitPool';
import SplitPoolsActions from './SplitPoolsActions'
import AddForm from '../../../components/labprocess/splitPool/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SPLITPOOL' })
  };

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function SplitPools() {

  const {
    state: { splitPools },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (splitPools.length === 0) getSplitPools(dispatch);
  }, []);

  const [rows, setRows] = useState(splitPools);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(splitPools)
    
  }, [splitPools]);


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

    const { id, reagentInfo, spLayout, qcClumps, status, memo} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ reagentInfo, spLayout, qcClumps, status, memo}, id, dispatch);
      if(result) {
        getSplitPools(dispatch)
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
        <SplitPoolsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'batch_name', headerName: 'Batch Name', width: 150, },
    { field: 'spLayout', headerName: 'Layout Info', width: 150, editable: true },
    { field: 'reagentInfo', headerName: 'Reagent Info', width: 150, editable: true },
    { field: 'qcClumps', headerName: 'QC Clumps', width: 150, editable: true },

    { field: 'status', 
      headerName: 'Status', 
      width: 150,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Memo', width: 150, editable: true },
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
    <AddForm />
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
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'center', mt: 2, mb: 2 }}
      >
        Split&Pool
      </Typography>
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
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}