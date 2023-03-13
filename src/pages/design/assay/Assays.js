import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/assay';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getAssays } from '../../../actions/assay';
import { getAntibodies } from '../../../actions/antibody';
import { getSamples } from '../../../actions/sample';
import AssaysActions from './AssaysActions'
import AddForm from '../../../components/design/assay/AddForm';

function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_ASSAY' })
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

export default function Assays() {

  const {
    state: { assays, antibodies, samples },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(12);

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
            assayType, 
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

    console.log(updatedRow)

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
                                    assayType, 
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
    { field: 'experiment_name', headerName: 'Experiment', width: 100, editable: true },
    { field: 'batch_name', headerName: 'Batch', width: 150, editable: true },
    { field: 'sample_name', 
      headerName: 'Sample', 
      width: 150, 
      type:'singleSelect', 
      valueOptions: samplelist, 
      editable: true },
    { field: 'numOfNuclei', headerName: '# of Nuclei', width: 100, editable: true },
    { field: 'tubeNum', headerName: 'Tube#', width: 100, editable: true },
    { field: 'barcode', headerName: 'Barcode', width: 100, editable: true },
    { field: 'assayType', headerName: 'Type', width: 100, editable: true },
    { field: 'loadPatn5Name', headerName: 'loadPatn5', width: 100, editable: true },
    { field: 'antibody_name', 
      headerName: 'Antibody',
      type:'singleSelect',
      valueOptions: antibodylist,
       width: 100, editable: true },
    { field: 'antibodyConcentration', headerName: 'AB Conc.', width: 100, editable: true },
    { field: 'antibodyConcUnit', headerName: 'AB Conc. Unit', width: 100, editable: true },
    { field: 'antibodyVolume', headerName: 'AB Vol.', width: 100, editable: true },
    { field: 'antibodyVolUnit', headerName: 'AB Vol. Unit', width: 100, editable: true },
    {
      field: 'assayDate',
      headerName: 'Assay Date',
      width: 150,
      type: 'dateTime',
    },

    { field: 'status', 
      headerName: 'Status', 
      width: 100,
      type: 'singleSelect',
      valueOptions: ['Active','Hold','Inactive'], 
      editable: true 
    },
    { field: 'metadata', headerName: 'Meta Data', width: 150, editable: true },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 170,
      type: 'dateTime',
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
        // boxShadow: 3,
        borderRadius: 2,
        }}

        initialState={{
          sorting: {
            sortModel: [{ field: 'createdAt', sort: 'desc' }],
          },
        }}

        checkboxSelection={true}
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        editMode="row"
        rowsPerPageOptions={[12, 20, 24]}
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