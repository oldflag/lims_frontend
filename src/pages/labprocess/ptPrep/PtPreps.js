import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography, Box } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/ptPrep';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getPtPreps } from '../../../actions/ptPrep';
import PtPrepsActions from './PtPrepsActions'
import AddForm from '../../../components/labprocess/ptPrep/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_PTPREP' })
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

export default function PtPreps() {

  const {
    state: { ptPreps },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(12);

  useEffect(() => {
    if (ptPreps.length === 0) getPtPreps(dispatch);
  }, []);

  const [rows, setRows] = useState(ptPreps);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(ptPreps)
    
  }, [ptPreps]);


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

    const { operator, status, memo, metadata, id} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ operator, status, memo, metadata}, id, dispatch);
      if(result) {
        getPtPreps(dispatch)
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
        <PtPrepsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'assay_batch_name', headerName: 'Batch', width: 150 },
    { field: 'assay_tubeNum', headerName: 'Tube#', width: 100},
    { field: 'nucleiIncubation_status', headerName: 'Incubation', width: 100 },
    { field: 'washAndTag_status', headerName: 'WT', width: 100 }, 
    { field: 'rnaRT_status', headerName: 'RT', width: 100},     
    { field: 'status', headerName: 'Prep Status', width: 150, editable: true },
    { field: 'memo', headerName: 'Memo', width: 150, editable: true },
    { field: 'operator', headerName: 'Operator', width: 250, editable: true },
    { field: 'metadata', headerName: 'Additional Info', width: 150, editable: true },
    { field: 'createdAt',headerName: 'Created At',width: 200,type: 'dateTime'},
    
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
        Paired-Tag Preparation
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