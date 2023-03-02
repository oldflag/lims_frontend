import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/project';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getProjects } from '../../../actions/project';
import ProjectsActions from './ProjectsActions'
import AddForm from '../../../components/acquisition/project/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_PROJECT' })
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

export default function Projects() {

  const {
    state: { projects },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (projects.length === 0) getProjects(dispatch);
  }, []);

  const [rows, setRows] = useState(projects);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(projects)
    
  }, [projects]);


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

    const { name, description, status, metadata, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, description, status, metadata}, id, dispatch);
      if(result) {
        getProjects(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Name', width: 100, editable: true },
    { field: 'description', headerName: 'Description', width: 150, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      width: 250,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Meta Data', width: 150, editable: true },
    {
      field: 'collaborator_name',
      headerName: 'Collaborator',
      width: 100,
      editable: false
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
        <ProjectsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
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
        Projects
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