import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/quote';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getQuotes } from '../../../actions/quote';
import QuotesActions from './QuotesActions'
import AddForm from '../../../components/account/quote/AddForm';

// function EditToolbar(props) {

//   const {
//     dispatch,
//   } = useValue();

//   const handleClick = () => {
    
//     dispatch({ type: 'OPEN_QUOTE' })
//   };

//   return (
//     <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
//       <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
//         <AddIcon />
//       </Fab>
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   setRowModesModel: PropTypes.func.isRequired,
//   setRows: PropTypes.func.isRequired,
// };

export default function Quotes() {

  const {
    state: { quotes },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

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


  // const processRowUpdate = async (newRow) => {
    
  //   const isNewRecord = newRow.isNew

  //   const updatedRow = { ...newRow, isNew: false };
  //   setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

  //   const { name, quantity, description, poNum, memo, invoiceNum, confirmNum, lineNum, catalogNum, serialNum, id} = updatedRow;

  //   let result;

  //   if (isNewRecord){
  //     result = await register(updatedRow, dispatch)
  //   } else{
  //     result = await updateStatus({ name, quantity, description, poNum, memo, invoiceNum, confirmNum, lineNum, catalogNum, serialNum}, id, dispatch);
  //     if(result) {
  //       getQuotes(dispatch)
  //     }
  //   }

  //   return updatedRow;
  // };

  const columns = useMemo(
    () =>  [
    
    // {
    //   field: 'actions',
    //   type: 'actions',
    //   headerName: 'Actions',
    //   flex: 1,
    //   cellClassName: 'actions',
    //   renderCell: (params) => (
    //     <QuotesActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
    //   ),
    // },
    { field: 'name', headerName: 'Quote #', flex: 1, editable: true },
    {
      field: 'collaborator_name',
      headerName: 'Collaborator',
      flex: 1,
      editable: false
    },
    { field: 'description', headerName: 'Production Description', flex: 2, editable: true },
    { field: 'quantity', headerName: 'Quantity', flex: 1, editable: true },
    { field: 'memo', headerName: 'Detail Information', flex: 3, editable: true, },
    { field: 'quoteDate', headerName: 'Quote Date', flex: 1, editable: true, valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"), },
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
        Quotes
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
        // processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}