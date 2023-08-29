import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Fab, Typography, IconButton  } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/primer';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter
} from '@mui/x-data-grid';

import { getPrimers } from '../../../actions/primer';
import PrimersActions from './PrimersActions'
import AddForm from '../../../components/inventory/primer/AddForm';
import importData from '../../../actions/utils/importData';
import {getProjects, updateRelatedPrimer} from '../../../actions/project'

function EditToolbar(props) {

  const {
    state: { projects,},
    dispatch, 
  } = useValue();

  useEffect(() => {
    if (projects.length === 0) getProjects(dispatch);
  }, []);

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SPECIMEN' })
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
        message: 'Please check header names: id(required), primerType(required), seq1(required), seq2, seq3, seq4, subtype(required), type(required), protocol(required)'
        },
      });
      return
    }

    for( let aIndex in data){

      let aPrimer = data[aIndex]
      let relatedProject = projects.filter((item) => {return item.name === aPrimer.project_name}) 

      if (relatedProject.length === 0) {

        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: 'No project name for the primer'+aPrimer.project_name
            },
        });
        
        continue;

      }
      delete aPrimer.project_name

      await updateRelatedPrimer(aPrimer, relatedProject[0].id, dispatch)

    }

    getPrimers(dispatch);



      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Primer')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'header(1st row): id(required), primerType(required), seq1(required), seq2, seq3, seq4, subtype(required), type(required), protocol(required)'
      },
    });
    

  }

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <GridToolbarQuickFilter />
      <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>

      <Fab size="small" color="primary" aria-label="add" sx={{ml:1}} component="label">
        <input hidden accept="*" type="file" onChange={handleClickFile}/>
        <UploadFileIcon onClick={handleUploadInfo}/>
      </Fab>

      <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
        <GridToolbarExport size="small" color="primary" sx={{ml:1}}
          csvOptions={{
            fileName: 'Primers',
          }}
          startIcon={
            // <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
            <IconButton>
              <FileDownloadIcon sx={{color:"white"}} />  
            </IconButton>
            // </Fab>
            
          }
        />
      </Fab>

    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function Primers() {

  const {
    state: { primers },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (primers.length === 0) getPrimers(dispatch);
  }, []);

  const [rows, setRows] = useState(primers);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(primers)
    
  }, [primers]);


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

    const { id, 
            primerType, 
            seq1, 
            seq2, 
            seq3,
            seq4,
            subtype,
            type,
            protocol,
            status,
            createdAt } = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ 
                                    primerType, 
                                    seq1, 
                                    seq2, 
                                    seq3,
                                    seq4,
                                    subtype,
                                    type,
                                    protocol,
                                    status,
                                    createdAt }, id, dispatch);
      if(result) {
        getPrimers(dispatch)
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
        <PrimersActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'id', headerName: 'Id', width: 300 },
    { field: 'primerType', headerName: 'Primer Type', width: 150, editable: true},
    { field: 'seq1', headerName: 'Seq1', width: 150, editable: true},
    { field: 'seq2', headerName: 'seq2', width: 150, editable: true },
    { field: 'seq3', headerName: 'seq3', width: 150, editable: true },
    { field: 'seq4', headerName: 'seq4', width: 150, editable: true },
    { field: 'subtype', headerName: 'Subtype', width: 150, editable: true },
    { field: 'type', headerName: 'Type', width: 150, editable: true },
    { field: 'protocol', headerName: 'Protocol', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    { field: 'createdAt', headerName: 'CreatedAt', type:'date', width: 150, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
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
        Primers
      </Typography>
      <DataGrid
        sx={{
        m: 2,
        boxShadow: 2,
        borderRadius: 2,
        borderColor: 'primary.light',
          '& .MuiDataGrid-cell:hover': {
            color: 'primary.main',
          },
        }}
        // rowHeight={30}
        density='compact'
        initialState={{
          sorting: {
            sortModel: [{ field: 'protocol', sort: 'desc' }],
          },
        }}

        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[15, 30, 45]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        localeText={{toolbarExport:''}}

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