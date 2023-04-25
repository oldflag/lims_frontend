import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/experiment';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getExperiments } from '../../../actions/experiment';
import ExperimentsActions from './ExperimentsActions'
import AddForm from '../../../components/design/experiment/AddForm';
import importData from '../../../actions/utils/importData';
import {getProjects, updateRelatedExperiment} from '../../../actions/project'

function EditToolbar(props) {

  const {
    state: { projects,},
    dispatch, 
  } = useValue();

  useEffect(() => {
    if (projects.length === 0) getProjects(dispatch);
  }, []);

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_EXPERIMENT' })
  };


  const cbFileData = async(data) => {

    if(data?.length ===0 ){

      dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'No data are loaded. Please check the input file!'
        },
      });
      return
    }

    const headerList = Object.keys(data[0]);
    if(!headerList.includes('name')){

      dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'error',
        message: 'Please check header names: name(required), project_name(required), short_description, long_description, exp_date'
        },
      });
      return
    }

    for( let aIndex in data){

      let aExperiment = data[aIndex]
      let relatedProject = projects.filter((item) => {return item.name === aExperiment.project_name}) 

      if (relatedProject.length === 0) {
        
        continue;

      }
      delete aExperiment.project_name

      await updateRelatedExperiment(aExperiment, relatedProject[0].id, dispatch)

    }

    getExperiments(dispatch);
      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Experiment')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'Tab name: Experiment, header(1st row): name(required), project_name(required), short_description, long_description, exp_date'
      },
    });
    

  }


  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>

      <Fab size="small" color="primary" aria-label="add" sx={{ml:1}} component="label">
        <input hidden accept="*" type="file" onChange={handleClickFile}/>
        <UploadFileIcon onClick={handleUploadInfo}/>
      </Fab>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Experiments() {

  const {
    state: { experiments },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (experiments.length === 0) getExperiments(dispatch);
  }, []);

  const [rows, setRows] = useState(experiments);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(experiments)
    
  }, [experiments]);


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

    const { id, name, short_description, long_description, exp_date, priority, status, metadata} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, short_description, long_description, exp_date, priority, status, metadata}, id, dispatch);
      if(result) {
        getExperiments(dispatch)
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
        <ExperimentsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    { field: 'short_description', headerName: 'Description', flex: 1, editable: true },
    { field: 'long_description', headerName: 'Details', flex: 2, editable: true },
    { field: 'exp_date', headerName: 'Experiment Date', type:'date', flex:1, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'priority', headerName: 'Priority', flex: 1, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Additional Info', flex: 1, editable: true },
    {
      field: 'project_name',
      headerName: 'Project',
      flex: 1,
      editable: false
    },
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
        Experiments
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