import {useEffect, useState, useMemo, useRef} from 'react';
import { Grid, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Send from '@mui/icons-material/Send';
import { Cancel } from '@mui/icons-material';
import { Fab, Typography, Button } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { v4 as uuidv4 } from 'uuid';

import { register as registerSeqLibrary } from '../../../actions/seqLibrary';
import { register as registerSeqRun } from '../../../actions/seqRun';
import SeqLibrarySDMenu from '../../../components/sequencing/seqLibrary/seqLibrarySDMenu';




import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getDnaLibrarys } from '../../../actions/dnaLibrary';
import { getRnaLibrarys } from '../../../actions/rnaLibrary';
import ActionToolbar from '../../../components/sequencing/seqLibrary/ActionToolbar';


// function EditToolbar(props) {

//   const {
//     state: { currentUser, selectedSeqLibrarys },
//     dispatch,
//   } = useValue();
  
//   const [submitStatus, setSubmitStatus] = useState(false);

//   const runNameRef = useRef();
  

//   const handleClick = () => {
    
//     dispatch({ type: 'OPEN_SEQLIB' })
//     setSubmitStatus(true)

//   };

//   const handleSendClick = async(e) => {

//     e.preventDefault();  
//     // dispatch({type: 'START_LOADING'})

//     const runName = runNameRef.current.value;

//     let seqRunId = uuidv4()

//     await registerSeqRun({"id":seqRunId,
//                           "name":runName,
//                           "operator":currentUser.email
//     },dispatch)


//     for (let aItem of selectedSeqLibrarys) {
      
//       let seqLibraryId = uuidv4()

//       aItem.libType.toUpperCase() === 'DNA' ? 

//         await registerSeqLibrary({"id":seqLibraryId, 
//                   "seqRunId":seqRunId,
//                   "name": "S"+aItem.libName,
//                   "libType":aItem.libType,
//                   "dnaLibraryId":aItem.libId
//                   },dispatch)
//       : await registerSeqLibrary({"id":seqLibraryId, 
//                   "seqRunId":seqRunId,
//                   "name": "S"+aItem.libName,
//                   "libType":aItem.libType,
//                   "rnaLibraryId":aItem.libId
//                   },dispatch)

//     }

// // dispatch({type: 'END_LOADING'})
//     dispatch({ type: 'CLOSE_SEQLIB' })
//     setSubmitStatus(false)

//   };
//   const handleCancelClick = () => {
    
//     dispatch({ type: 'CLOSE_SEQLIB' })
//     setSubmitStatus(false)
//   };

//   return (
//     <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
//       { submitStatus && <TextField
//               margin="normal"
//               variant="standard"
//               id="runName"
//               label="New Run Name"
//               type="text"
//               fullWidth
//               inputRef={runNameRef}
//             />}
//       { !submitStatus && <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
//         <AddIcon />
//       </Fab> }
//       { submitStatus && <Button sx={{mr:2}} variant="contained" endIcon={<Send />} onClick={handleSendClick}>
//             Submit
//       </Button>}
//       { submitStatus && <Button variant="contained" endIcon={<Cancel />} onClick={handleCancelClick}>
//             Cancel
//       </Button>}
//     </GridToolbarContainer>
//   );
// }

// EditToolbar.propTypes = {
//   // setRowModesModel: PropTypes.func.isRequired,
//   // setRows: PropTypes.func.isRequired,
//   // selectedRows: PropTypes.array.isRequired,
// };

export default function SeqLibrarys() {

  const {
    state: { dnaLibrarys, rnaLibrarys, openSeqLib, loading},
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (dnaLibrarys.length === 0) getDnaLibrarys(dispatch);
    if (rnaLibrarys.length === 0) getRnaLibrarys(dispatch);
  }, []);

  const [dnaRows, setDnaRows] = useState(dnaLibrarys);
  const [rnaRows, setRnaRows] = useState(rnaLibrarys);
  
  const [rowModesModel, setRowModesModel] = useState({});
  // const [selectedRows, setSelectedRows] = useState(null);
  const [selectedRowsDna, setSelectedRowsDna] = useState([]);
  const [selectedRowsRna, setSelectedRowsRna] = useState([]);

  useEffect(() => {

    setDnaRows(dnaLibrarys)
    
  }, [dnaLibrarys]);

  useEffect(() => {

    setRnaRows(rnaLibrarys)
    
  }, [rnaLibrarys]);



  useEffect(() => {

    dispatch({ type: 'UPDATE_SEQLIBSELECT', payload: [...selectedRowsDna, ...selectedRowsRna] });
    // console.log(selectedSeqLibrarys)

  }, [selectedRowsDna, selectedRowsRna])


  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const onRowsSelectionHandlerDna = (params, event) => {
    event.defaultMuiPrevented = true;
    let dnaSelected = dnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'DNA'}) )
    // let rnaSelected = rnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'RNA'}) )
    setSelectedRowsDna(dnaSelected)
  }
  const onRowsSelectionHandlerRna = (params, event) => {
    event.defaultMuiPrevented = true;
    // let dnaSelected = dnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'DNA'}) )
    let rnaSelected = rnaRows.filter(arow => params.includes(arow.id)).map(arow =>({"libId":arow.id, "libName":arow.name, "libType":'RNA'}) )
    setSelectedRowsRna(rnaSelected)
  }


  const dnaColumns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Library Name', width: 150},
    { field: 'lysis_batch_name', headerName: 'Batch Name', width: 150, },
    { field: 'lysis_name', headerName: 'Lysis Name', width: 150}, 
  ],
  [dnaRows]
  );

  const rnaColumns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Library Name', width: 150},
    { field: 'lysis_batch_name', headerName: 'Batch Name', width: 150 },
    { field: 'lysis_name', headerName: 'Lysis Name', width: 150}, 
  ],
  [rnaRows]
  );

  return (
    <>
    {/* <AddForm /> */}
    
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
      <Grid container spacing={1} sx={{alignItems:'center'}}>
        <Grid item xs={4}><SeqLibrarySDMenu /></Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            component="h6"
            sx={{ textAlign: 'center', mt: 2, mb: 2 }}
          >
          {openSeqLib ? "Select libraries and create a new seq run >>" : "New Sequencing Run >> "}
        </Typography>
        </Grid>
        <Grid item xs={4}>
          <ActionToolbar />
        </Grid>
      </Grid>
      <Box sx={{ m:2, height: 500, display:'flex'}}>
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        boxShadow: 3,
        borderRadius: 2,
        }}
        // loading ={loading}
        // loading={loading==='true'} 
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={openSeqLib}
        rows={dnaRows}
        columns={dnaColumns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={onRowsSelectionHandlerDna}
        
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      <DataGrid
        sx={{
        m: 2,
        ml: 3,
        boxShadow: 3,
        borderRadius: 2,
        }}
        // loading ={loading}
        // loading={loading==='true'} 
        isRowSelectable={(params) => !params.row.Status}
        checkboxSelection={openSeqLib}
        rows={rnaRows}
        columns={rnaColumns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        onSelectionModelChange={onRowsSelectionHandlerRna}
        
        // components={{
        //   Toolbar: EditToolbar,
        // }}
        experimentalFeatures={{ newEditingApi: true }}
      />
      </Box>
    </Box>
    </>
  );
}