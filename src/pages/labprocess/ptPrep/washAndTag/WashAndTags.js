import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Typography } from '@mui/material';
import { useValue } from '../../../../context/ContextProvider';
import { register, updateStatus } from '../../../../actions/washAndTag';
import moment from 'moment';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getWashAndTags } from '../../../../actions/washAndTag';
import WashAndTagsActions from './WashAndTagsActions'
import PtPrepSDMenu from '../../../../components/labprocess/ptPrep/ptPrepSDMenu'



export default function WashAndTags() {

  const {
    state: { washAndTags },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (washAndTags.length === 0) getWashAndTags(dispatch);
  }, []);

  const [rows, setRows] = useState(washAndTags);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(washAndTags)
    
  }, [washAndTags]);


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

    const { id, reagentInfo, status, memo} = updatedRow;

    let result;

    if (isNewRecord){
      result = await register(updatedRow, dispatch)
    } else{
      result = await updateStatus({ reagentInfo, status, memo}, id, dispatch);
      if(result) {
        getWashAndTags(dispatch)
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
        <WashAndTagsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'assay_batch_name', headerName: 'Batch Name', flex: 2, },
    { field: 'assay_tubeNum', headerName: 'Tube #', flex: 1 },
    { field: 'reagentInfo', headerName: 'Reagent Info', flex: 1, editable: true },
    { field: 'qcClumps', headerName: 'QC Clumps', flex: 1, editable: true },
    { field: 'status', 
      headerName: 'Status', 
      flex: 1,
      type: 'singleSelect',
      valueOptions: ['Success','Fail'], 
      editable: true 
    },
    { field: 'memo', headerName: 'Memo', flex: 2, editable: true },
    { field: 'operator', headerName: 'Operator', flex: 1 },
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
      <Box sx={{ m:2, display:'flex'}}>
        < PtPrepSDMenu />
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: 'center', mt: 2, mb: 2, ml:35 }}
        >
          Wash And Tag
        </Typography>
      </Box>
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
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}