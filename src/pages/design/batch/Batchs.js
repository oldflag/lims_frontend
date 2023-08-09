import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Fab, Typography, Box, IconButton } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/batch';


import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { getBatchs } from '../../../actions/batch';
import BatchsActions from './BatchsActions'
import AddForm from '../../../components/design/batch/AddForm';
import moment from 'moment';
import importData from '../../../actions/utils/importData';
import {registerFromFile} from '../../../actions/batch'
import { getQuotes } from '../../../actions/quote';
import BatchReportForm from '../../../components/design/batch/BatchReportForm';


const default_protocol = process.env.REACT_APP_DEFAULT_PROTOCOL
const batch_protocols = process.env.REACT_APP_BATCH_PROTOCOLS.split(',')
const batch_types = process.env.REACT_APP_BATCH_TYPES.split(',')


function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_BATCH' })
  };

  const cbFileData = async(data) => {

    console.log(data)

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
        message: 'Please check header names: name(required), createdAt'
        },
      });
      return
    }

    for( let aIndex in data){

      let aBatch = data[aIndex]

      if (!aBatch.name) {
        
        continue;

      }

      await registerFromFile(aBatch, dispatch)

    }

    // getExperiments(dispatch);
      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Batch')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'Tab name: Batch, header(1st row): name(required), createdAt'
      },
    });
    

  }

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <GridToolbarQuickFilter />
      <Fab sx={{ml:1}} size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>

      {/* <Fab size="small" color="primary" aria-label="add" sx={{ml:1}} component="label">
        <input hidden accept="*" type="file" onChange={handleClickFile}/>
        <UploadFileIcon onClick={handleUploadInfo}/>
      </Fab> */}

      <Fab size="small" color="primary" aria-label="download" sx={{ml:1}} component="label">
        <GridToolbarExport size="small" color="primary" sx={{ml:1}}
          csvOptions={{
            fileName: 'Batches',
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

export default function Batchs() {

  const {
    state: { batchs, quotes },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (batchs.length === 0) getBatchs(dispatch);
    if (quotes.length === 0) getQuotes(dispatch);
  }, []);

  const quoteOptions = quotes.map(({ name, id }) => ({ value:id, label:name }));
  const quoteNames = quotes.map(a => a.name);

  const [rows, setRows] = useState(batchs);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(batchs)
    
  }, [batchs]);


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
  
    let { id, name, type, priority, status, metadata, quoteId, quote_name} = updatedRow;
    //TODO: better solution for the following two lines
    metadata = metadata != null ? metadata : ""
    quoteId = quoteNames.includes(quote_name) ? quoteId : quote_name

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, type, priority, status, metadata, quoteId}, id, dispatch);
      if(result) {
        getBatchs(dispatch)
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
        <BatchsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    
    { field: 'name', headerName: 'Name', flex: 2, editable: true },
    { field: 'priority', 
      headerName: 'Protocol', 
      flex: 1, 
      type: 'singleSelect',
      valueOptions:batch_protocols,
      editable: true },
    // { field: 'type', headerName: 'Type', flex: 1, editable: true },
    { field: 'type', 
      headerName: 'Type', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: batch_types, 
      editable: true 
    },
    // { field: 'quote_name', headerName: 'Quote #', flex: 1, editable: true },
    { field: 'quote_name', 
      headerName: 'Quote #', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: quoteOptions, 
      editable: true 
    },
    // { field: 'status', headerName: 'Status', flex: 1, editable: true },
    { field: 'metadata', headerName: 'Note', flex: 2, editable: true },
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
    <BatchReportForm />
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
        Batches
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
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
          filter: {
            filterModel: {
              items: [],
              quickFilterValues: [default_protocol],
            },
          },
        }}

        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[20, 25, 100]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        localeText={{toolbarExport:''}}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        disable
        components={{
          Toolbar: EditToolbar
          //  Toolbar: GridToolbar

        }}
        componentsProps={{
          toolbar:{ setRows, 
                    setRowModesModel, 
                    csvOptions: { disableToolbarButton: true },
                    printOptions: { disableToolbarButton: true },
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 }, 
                  },
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}