import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/sample';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSamples } from '../../../actions/sample';
import SamplesActions from './SamplesActions'
import AddForm from '../../../components/design/sample/AddForm';
import {getSpecimens, updateRelatedSample} from '../../../actions/specimen'
import importData from '../../../actions/utils/importData';

function EditToolbar(props) {

  const {
    state: { specimens,},
    dispatch,
  } = useValue();

  useEffect(() => {
    if (specimens.length === 0) getSpecimens(dispatch);
  }, []);

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SAMPLE' })
  };

  const cbFileData = async(data) => {

    // console.log(data)


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
        message: 'Please check header names: name(required), specimen_name(required), extraction_date, extraction_methon, nuclei_count'
        },
      });
      return
    }

    for( let aIndex in data){

      let aItem = data[aIndex]
      let relatedSpecimen = specimens.filter((item) => {return item.name === aItem.specimen_name}) 

      if (relatedSpecimen.length === 0) {

        // dispatch({
        //   type: 'UPDATE_ALERT',
        //   payload: {
        //     open: true,
        //     severity: 'error',
        //     message: 'No project name for the specimen'+aSpecimen.project_name
        //     },
        // });
        
        continue;

      }
      delete aItem.specimen_name

      await updateRelatedSample(aItem, relatedSpecimen[0].id, dispatch)

    }

    getSamples(dispatch);
      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData)
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'header(1st row): name(required), specimen_name(required), extraction_date, extraction_method, nuclei_count'
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

    const { id, name, extract_date, extract_method,nuclei_count, nuclei_count_result, status, metadata} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, extract_date, extract_method, nuclei_count, nuclei_count_result, status, metadata}, id, dispatch);
      if(result) {
        getSamples(dispatch)
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
        <SamplesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 1, editable: true },
    {
      field: 'specimen_name',
      headerName: 'Specimen',
      flex: 1,
      editable: false
    },
    { field: 'nuclei_count', headerName: 'Nuclei Count', flex: 1, editable: true },
    { field: 'extract_date', headerName: 'Extraction Date', type:'date', flex: 1, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'extract_method', headerName: 'Extraction Method', flex: 1, editable: true },
    // { field: 'process_date', headerName: 'Processing Date', type:'date', flex: 1, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    // { field: 'process_method', headerName: 'Processing Method', flex: 1, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Additional Info', flex: 1, editable: true },
    
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
        Samples
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