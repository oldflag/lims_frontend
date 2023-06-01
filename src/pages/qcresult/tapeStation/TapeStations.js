import {useEffect, useState, useMemo} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Fab, Grid, Typography } from '@mui/material';
import { useValue } from '../../../context/ContextProvider';
import { register, updateStatus } from '../../../actions/tapeStation';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


import {
  DataGrid,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { getTapeStations } from '../../../actions/tapeStation';
import TapeStationsActions from './TapeStationsActions'
import QCresultSDMenu from '../../../components/qcresult/tapeStation/QCresultSDMenu';


export default function TapeStations() {

  const {
    state: { tapeStations },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    if (tapeStations.length === 0) getTapeStations(dispatch);
  }, []);

  const [rows, setRows] = useState(tapeStations);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {

    setRows(tapeStations)
    
  }, [tapeStations]);

  const navigate = useNavigate()


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
        getTapeStations(dispatch)
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
        <TapeStationsActions {...{ params, rows, setRows, rowModesModel, setRowModesModel }} />
      ),
    },
    { field: 'name', headerName: 'Name', flex: 2},
    { field: 'libType', headerName: 'Lib Type', flex: 1},
    {field:'library_name', headerName:'Lib Name', flex: 1},
    {field:'batch_name', headerName:'Batch Name', flex: 1},
    {field:'resultFileUrl', headerName:'Result File URL', flex: 2,
      renderCell: (params) => 
      <a href={`${params.row.resultFileUrl}`} target="_blank" rel="noopener noreferrer">{params.row.resultFileUrl}</a>,
    },
    // { field: 'status', 
    //   headerName: 'Status', 
    //   flex: 1,
    //   type: 'singleSelect',
    //   valueOptions: ['Success','Fail'], 
    //   editable: true
    // },
    {field:'operator', headerName:'Operator', flex: 1},
    {
      field: 'createdAt',
      headerName: 'Created At',
      flex: 1,
      type: 'dateTime',
      valueFormatter: params => moment(params?.value).format("MM/DD/YYYY"),
      
    },
    
  ],
  [rows, rowModesModel]
  );

  return (
    <>
    <Box
      sx={{
        m:1,
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
      <Grid container spacing={1} sx={{alignItems:'center', mt:1,}}>
        <Grid item xs={4}>
        <QCresultSDMenu />
        </Grid>
        <Grid item xs={4}>
        <Typography
          variant="h6"
          component="h6"
          sx={{ textAlign: 'center', mt: 2, mb: 2 }}
        >
         Tape Station
        </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box display="flex" justifyContent="flex-end">
            <Fab size="small" color="primary" aria-label="add" onClick={() => {navigate('/qcresult/newTapeStation')}} sx={{ml:1}} >
            <AddIcon />
            </Fab>
          </Box>
        </Grid>
      </Grid>

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
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
    </>
  );
}