import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Box } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/patn5';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getPatn5s } from '../../../actions/patn5';
import Patn5sActions from './Patn5sActions'
import AddForm from '../../../components/inventory/patn5/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_PATN5' })
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

export default function Patn5s() {

  const {
    state: { patn5s },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (patn5s.length === 0) getPatn5s(dispatch);
  }, []);

  const [rows, setRows] = useState(patn5s);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(patn5s)
    
  }, [patn5s]);


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

    const { name, part, lot, manufacturer, expiration_date,status, metadata, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, part, lot, manufacturer, expiration_date,status, metadata}, id, dispatch);
      if(result) {
        getPatn5s(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Name', width: 100, editable: true },
    { field: 'manufacturer', headerName: 'Manufacturer', width: 200, editable: true },
    { field: 'part', headerName: 'PART#', width: 150, editable: true },
    { field: 'lot', headerName: 'LOT#', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    { field: 'metadata', headerName: 'Meta Info', width: 150, editable: true },
    {
      field: 'expiration_date',
      headerName: 'Expiration Date',
      width: 200,
      type: 'date',
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
        <Patn5sActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
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
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', mt: 2, mb: 2 }}
      >
        pATn5
      </Typography>
      <DataGrid
        sx={{
        m: 2,
        boxShadow: 3,
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