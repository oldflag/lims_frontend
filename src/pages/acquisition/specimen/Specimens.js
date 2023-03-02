import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/specimen';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getSpecimens } from '../../../actions/specimen';
import SpecimensActions from './SpecimensActions'
import AddForm from '../../../components/acquisition/specimen/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_SPECIMEN' })
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

export default function Specimens() {

  const {
    state: { specimens },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

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
            donorId} = updatedRow;

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
                                    donorId}, id, dispatch);
      if(result) {
        getSpecimens(dispatch)
      }
    }

    return updatedRow;
  };

  const columns = useMemo(
    () =>  [
    { field: 'name', headerName: 'Name', width: 100, editable: true },
    { field: 'donor_name', headerName: 'Donor', width: 100, editable: false},
    { field: 'species', headerName: 'Species', width: 150, editable: true },
    { field: 'tissue', headerName: 'Tissue', width: 150, editable: true },
    { field: 'tissue_amount', headerName: 'Amount', width: 150, editable: true },
    { field: 'tissue_amount_unit', headerName: 'Unit', width: 150, editable: true },
    { field: 'collection_date', headerName: 'Collection Date', type:'date', width: 150, editable: true },
    { field: 'receipt_date', headerName: 'Receipt Date', type:'date', width: 150, editable: true },
    { field: 'uberon_id', headerName: 'Uberon', width: 150, editable: true },
    { field: 'memo', headerName: 'Memo', width: 150, editable: true },
    { field: 'qc_note', headerName: 'QC Note', width: 150, editable: true },
    { field: 'qc_date', headerName: 'QC Date', type:'date', width: 150, editable: true },
    { field: 'received_cell_count', headerName: 'Cell #1', width: 150, editable: true },
    { field: 'cell_count_result', headerName: 'Cell #2', width: 150, editable: true },
    { field: 'nuclei_count_result', headerName: 'Nuclei #', width: 150, editable: true },
    { field: 'freeze_thaw', headerName: 'Freeze Thaw', width: 150, editable: true },
    { field: 'last_frozen_date', headerName: 'Frozen Date', type:'datetime', width: 150, editable: true },
    { field: 'storage_condition', headerName: 'Storage Cond.', width: 150, editable: true },
    { field: 'metadata', headerName: 'Meta Data', width: 150, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      renderCell: (params) => (
        <SpecimensActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
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
        variant="h4"
        component="h4"
        sx={{ textAlign: 'center', mt: 2, mb: 2 }}
      >
        Specimens
      </Typography>
      <DataGrid
        sx={{
        m: 2,
        boxShadow: 3,
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