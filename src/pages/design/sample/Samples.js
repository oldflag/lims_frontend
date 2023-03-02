import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/sample';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSamples } from '../../../actions/sample';
import SamplesActions from './SamplesActions'
import AddForm from '../../../components/design/sample/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SAMPLE' })
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

export default function Samples() {

  const {
    state: { samples },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (samples.length === 0) getSamples(dispatch);
  }, []);

  const [rows, setRows] = useState(samples);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(samples)
    
  }, [samples]);


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

    const { id, name, extract_date, extract_method, process_date,process_method,nuclei_count, nuclei_count_result, status, metadata} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, extract_date, extract_method, process_date,process_method,nuclei_count, nuclei_count_result, status, metadata}, id, dispatch);
      if(result) {
        getSamples(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Name', width: 100, editable: true },
    { field: 'extract_date', headerName: 'Extraction Date', type:'date', width: 150, editable: true },
    { field: 'extract_method', headerName: 'Extraction Method', width: 150, editable: true },
    { field: 'process_date', headerName: 'Processing Date', type:'date', width: 150, editable: true },
    { field: 'process_method', headerName: 'Processing Method', width: 150, editable: true },
    { field: 'nuclei_count', headerName: 'Nuclei Count', width: 150, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      width: 250,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Meta Data', width: 150, editable: true },
    {
      field: 'specimen_name',
      headerName: 'Specimen',
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
        <SamplesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
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
        Samples
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