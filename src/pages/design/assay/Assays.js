import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Fab, Typography, IconButton  } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/assay';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';

import { getAssays, registerFromFile } from '../../../actions/assay';
import { getAntibodies } from '../../../actions/antibody';
import { getSamples } from '../../../actions/sample';
import { getExperiments } from '../../../actions/experiment';
import { getBatchs } from '../../../actions/batch';

import AssaysActions from './AssaysActions'
import AddForm from '../../../components/design/assay/AddForm';
import importData from '../../../actions/utils/importData';


function EditToolbar(props) {

  const {
    // state: { assays, antibodies, samples, experiments, batchs },
    dispatch,
  } = useValue();

  // useEffect(() => {
  //   if (assays.length === 0) getAssays(dispatch);
  //   if (antibodies.length === 0) getAntibodies(dispatch);
  //   if (samples.length === 0) getSamples(dispatch);
  //   if (experiments.length === 0) getExperiments(dispatch);
  //   if (batchs.length === 0) getBatchs(dispatch);
  // }, []);


  const handleClick = () => {
    
    dispatch({ type: 'OPEN_ASSAY' })
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

    for( let aIndex in data){

      let aAssay = data[aIndex]

      // console.log(aAssay)

      if (!aAssay.batch_name) {
        
        continue;

      }

      await registerFromFile(aAssay, dispatch)

    }

    // getExperiments(dispatch);
      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Assay')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'Tab name: Assay, header(1st row): batch_name(required),sample_name,experiment_name,numOfNuclei,tubeNum,barcode,antibody_name,antibodyConcentration,antibodyConcUnit,antibodyVolume,antibodyVolUnit,assayDate'
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

      <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
        <GridToolbarExport size="small" color="primary" sx={{ml:1}}
          csvOptions={{
            fileName: 'Assays',
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

export default function Assays() {

  const {
    state: { assays, antibodies, samples },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (assays.length === 0) getAssays(dispatch);
    if (antibodies.length === 0) getAntibodies(dispatch);
    if (samples.length === 0) getSamples(dispatch);
  }, []);

  const samplelist = samples.map((item) => item.name)
  const antibodylist = antibodies.map((item) => item.name)

  const [rows, setRows] = useState(assays);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(assays)
    
  }, [assays]);


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

    const { sample_name,
            numOfNuclei, 
            tubeNum, 
            barcode, 
            // assayType, 
            beadTime, 
            loadPatn5Name, 
            antibody_name, 
            antibodyConcentration, 
            antibodyConcUnit ,
            antibodyVolume ,
            antibodyVolUnit ,
            assayDate ,
            status ,
            metadata, id } = updatedRow;

    const sampleId = samples.filter((item) => {return item.name===sample_name})[0].id
    const antibodyId = antibodies.filter((item) => {return item.name===antibody_name})[0].id
    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ sampleId,
                                    numOfNuclei, 
                                    tubeNum, 
                                    barcode, 
                                    // assayType, 
                                    beadTime, 
                                    loadPatn5Name, 
                                    antibodyId, 
                                    antibodyConcentration, 
                                    antibodyConcUnit ,
                                    antibodyVolume ,
                                    antibodyVolUnit ,
                                    assayDate ,
                                    status ,
                                    metadata }, id, dispatch);
      if(result) {
        getAssays(dispatch)
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
        <AssaysActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'experiment_name', headerName: 'Experiment', width: 200, editable: true },
    { field: 'batch_name', headerName: 'Batch', width: 200, editable: true },
    { field: 'sample_name', 
      headerName: 'Sample', 
      width: 150, 
      type:'singleSelect', 
      valueOptions: samplelist, 
      editable: true },
    { field: 'numOfNuclei', headerName: '# of Nuclei', width: 100, editable: true },
    { field: 'tubeNum', headerName: 'Tube#', width: 100, editable: true },
    { field: 'barcode', headerName: 'Barcode', width: 100, editable: true },
    // { field: 'assayType', headerName: 'Type', width: 100, editable: true },
    { field: 'loadPatn5Name', headerName: 'loadPatn5', width: 100, editable: true },
    { field: 'antibody_name', 
      headerName: 'Antibody',
      type:'singleSelect',
      valueOptions: antibodylist,
       width: 250, editable: true },
    { field: 'antibodyConcentration', headerName: 'AB Conc.', width: 100, editable: true },
    { field: 'antibodyConcUnit', headerName: 'AB Conc. Unit', width: 100, editable: true },
    { field: 'antibodyVolume', headerName: 'AB Vol.', width: 100, editable: true },
    { field: 'antibodyVolUnit', headerName: 'AB Vol. Unit', width: 100, editable: true },
    {
      field: 'assayDate',
      headerName: 'Assay Date',
      width: 150,
      type: 'dateTime',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"),
    },

    { field: 'status', 
      headerName: 'Status', 
      width: 100,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Additional Info', width: 150, editable: true },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 170,
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
        mt :1,
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
        sx={{ textAlign: 'center', mt: 1, mb: 1 }}
      >
        Assays
      </Typography>
      <DataGrid
        sx={{
        m: 1,
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
            sortModel: [{ field: 'assayDate', sort: 'desc' }],
          },
        }}

        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[15, 30, 45]}
        pageSize={pageSize}
        autoHeight={true}
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