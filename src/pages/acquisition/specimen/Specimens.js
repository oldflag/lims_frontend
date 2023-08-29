import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Fab, Typography, IconButton  } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/specimen';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { getSpecimens } from '../../../actions/specimen';
import SpecimensActions from './SpecimensActions'
import AddForm from '../../../components/acquisition/specimen/AddForm';
import importData from '../../../actions/utils/importData';
import {getProjects, updateRelatedSpecimen} from '../../../actions/project'

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
        message: 'Please check header names: name(required), project_name(required), donor_name, species, tissue, tissue_amount, tissue_amount_unit, receipt_date'
        },
      });
      return
    }

    for( let aIndex in data){

      let aSpecimen = data[aIndex]
      let relatedProject = projects.filter((item) => {return item.name === aSpecimen.project_name}) 

      if (relatedProject.length === 0) {

        dispatch({
          type: 'UPDATE_ALERT',
          payload: {
            open: true,
            severity: 'error',
            message: 'No project name for the specimen'+aSpecimen.project_name
            },
        });
        
        continue;

      }
      delete aSpecimen.project_name

      await updateRelatedSpecimen(aSpecimen, relatedProject[0].id, dispatch)

    }

    getSpecimens(dispatch);



      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Specimen')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'header(1st row): name(required), project_name(required), donor_name, species, tissue, tissue_amount, tissue_amount_unit, receipt_date'
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
            fileName: 'Specimens',
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

export default function Specimens() {

  const {
    state: { specimens },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (specimens.length === 0) getSpecimens(dispatch);
  }, []);

  const [rows, setRows] = useState(specimens);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(specimens)
    
  }, [specimens]);


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
            name, 
            species, 
            tissue, 
            tissue_amount, 
            tissue_amount_unit, 
            receipt_date,
            uberon_id, 
            qc_note,
            qc_date,
            collection_date,
            received_cell_count,
            cell_count_result,
            nuclei_count_result,
            freeze_thaw,
            last_frozen_date,
            memo,
            storage_condition,
            metadata,
            donorId, projectId} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, 
                                    species, 
                                    tissue, 
                                    tissue_amount, 
                                    tissue_amount_unit, 
                                    receipt_date,
                                    uberon_id, 
                                    qc_note,
                                    qc_date,
                                    collection_date,
                                    received_cell_count,
                                    cell_count_result,
                                    nuclei_count_result,
                                    freeze_thaw,
                                    last_frozen_date,
                                    memo,
                                    storage_condition,
                                    metadata,
                                    donorId,
                                    projectId}, id, dispatch);
      if(result) {
        getSpecimens(dispatch)
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
        <SpecimensActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', width: 300, editable: true },
    { field: 'project_name', headerName: 'Project', width: 150, editable: false},
    { field: 'donor_name', headerName: 'Donor', width: 100, editable: false},
    { field: 'species', headerName: 'Species', width: 150, editable: true },
    { field: 'tissue', headerName: 'Tissue', width: 150, editable: true },
    { field: 'tissue_amount', headerName: 'Amount', width: 150, editable: true },
    { field: 'tissue_amount_unit', headerName: 'Unit', width: 150, editable: true },
    { field: 'collection_date', headerName: 'Collection Date', type:'date', width: 150, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'receipt_date', headerName: 'Receipt Date', type:'date', width: 150, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'uberon_id', headerName: 'Uberon', width: 150, editable: true },
    { field: 'memo', headerName: 'Memo', width: 150, editable: true },
    { field: 'qc_note', headerName: 'QC Note', width: 150, editable: true },
    { field: 'qc_date', headerName: 'QC Date', type:'date', width: 150, editable: true },
    { field: 'received_cell_count', headerName: 'Cell #1', width: 150, editable: true },
    { field: 'cell_count_result', headerName: 'Cell #2', width: 150, editable: true },
    { field: 'nuclei_count_result', headerName: 'Nuclei #', width: 150, editable: true },
    { field: 'freeze_thaw', headerName: 'Freeze Thaw', width: 150, editable: true },
    { field: 'last_frozen_date', headerName: 'Frozen Date', type:'datetime', width: 150, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'storage_condition', headerName: 'Storage Cond.', width: 150, editable: true },
    { field: 'metadata', headerName: 'Note', width: 150, editable: true },
    
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
        Specimens
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
            sortModel: [{ field: 'receipt_date', sort: 'desc' }],
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