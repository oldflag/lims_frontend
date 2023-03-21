import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Box } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/collaborator';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getCollaborators } from '../../../actions/collaborator';
import CollaboratorsActions from './CollaboratorsActions'
import AddForm from '../../../components/acquisition/collaborator/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_COLLABORATOR' })
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

export default function Collaborators() {

  const {
    state: { collaborators },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (collaborators.length === 0) getCollaborators(dispatch);
  }, []);

  const [rows, setRows] = useState(collaborators);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(collaborators)
    
  }, [collaborators]);


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

    const { contactPhone, note, url, active, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ contactPhone, note, url, active}, id, dispatch);
      if(result) {
        getCollaborators(dispatch)
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
        <CollaboratorsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'contactName', headerName: 'Contact Name', flex: 1, editable: true },
    { field: 'contactEmail', headerName: 'Email', flex: 1, editable: true },
    { field: 'contactPhone', headerName: 'Phone', flex: 1, editable: true },
    { field: 'note', headerName: 'Note', flex: 2, editable: true },
    { field: 'url', headerName: 'URL', flex: 1, editable: true },
    {
      field: 'active',
      headerName: 'Active',
      flex: 1,
      type: 'boolean',
      editable: true,
    },
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'date',
      // dateSetting:{locale: "en-US"}
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
        Collaborators
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