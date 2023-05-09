import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/quote';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getQuotes, registerFromFile } from '../../../actions/quote';
import QuotesActions from './QuotesActions'
import AddForm from '../../../components/account/quote/AddForm';
import importData from '../../../actions/utils/importData';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_QUOTE' })
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

      let aQuote = data[aIndex]

      // console.log(aQuote)

      if (!aQuote.name) {
        
        continue;

      }

      await registerFromFile(aQuote, dispatch)

    }

    getQuotes(dispatch);
      
    
  }

  const handleClickFile = (e) => {

   
    importData(e.target.files[0], 1, cbFileData, 'Quote')
    
  };

  const handleUploadInfo = (e) => {

     dispatch({
      type: 'UPDATE_ALERT',
      payload: {
        open: true,
        severity: 'info',
        message: 'Tab name: Quote, header(1st row): name(required),poNum,invoiceNum,collaborator,lineNum,catalogNum,serialNum,description,quantity,memo,quoteDate'
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

export default function Quotes() {

  const {
    state: { quotes },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    if (quotes.length === 0) getQuotes(dispatch);
  }, []);

  const [rows, setRows] = useState(quotes);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(quotes)
    
  }, [quotes]);


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

    const { name, quantity, description, poNum, memo, invoiceNum, confirmNum, lineNum, catalogNum, serialNum, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ name, quantity, description, poNum, memo, invoiceNum, confirmNum, lineNum, catalogNum, serialNum}, id, dispatch);
      if(result) {
        getQuotes(dispatch)
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
        <QuotesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Quote #', width: 200, editable: true },
    {
      field: 'collaborator_name',
      headerName: 'Collaborator',
      flex: 1,
      editable: false
    },
    { field: 'description', headerName: 'Production Description', flex: 2, editable: true, },
    { field: 'quantity', headerName: 'Quantity', flex: 1, editable: true },
    { field: 'memo', headerName: 'Detail Information', flex: 3, editable: true },
    { field: 'quoteDate', 
      headerName: 'Quote Date', 
      flex: 1, editable: true, 
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
    { field: 'poNum', headerName: 'PO #', flex: 1, editable: true },
    { field: 'invoiceNum', headerName: 'Invoice #', flex: 1, editable: true },
    { field: 'confirmNum', headerName: 'Confirm #', flex: 1, editable: true },
    { field: 'lineNum', headerName: 'Line #', flex: 1, editable: true },
    { field: 'catalogNum', headerName: 'Catalog #', flex: 1, editable: true },
    { field: 'serialNum', headerName: 'Serial #', flex: 1, editable: true },
    // {
    //   field: 'createdAt',
    //   headerName: 'Created At',
    //   flex: 1,
    //   type: 'dateTime',
    //   valueFormatter: params => moment(params?.value).format("MM/DD/YYYY hh:mm A"),
    // },
    
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
        Quotes
      </Typography>
      <DataGrid
        sx={{
        m: 2,
        // boxShadow: 3,
        borderRadius: 2,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'desc' }],
          },
        }}   


        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[12, 24, 36]}
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