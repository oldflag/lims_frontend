import { useState, useEffect, useMemo } from 'react';
import { useValue } from '../../context/ContextProvider';
import { getUsers } from '../../actions/user';
import { Box, Fab, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  DataGrid,
  gridClasses,
  GridToolbarContainer
} from '@mui/x-data-grid';

import { grey } from '@mui/material/colors';
import UsersActions from './UsersActions';
import useCheckToken from '../../hooks/useCheckToken';
import moment from 'moment';


function EditToolbar(props) {

  const {
    dispatch,
  } = useValue();

  const handleClick = () => {
    
    dispatch({ type: 'OPEN_REGISTER' })
  };

  return (
    <GridToolbarContainer sx={{mt:1, mr:5, display:"flex", justifyContent:"flex-end", alignItems:"flex-end"}}>
      <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
    </GridToolbarContainer>
  );
}

export default function UserTable() {
  // useCheckToken()

  const {
    state: { users },
    dispatch,
  } = useValue();

  const [pageSize, setPageSize] = useState(15);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    if (users.length === 0) getUsers(dispatch);
  }, []);


  const columns = useMemo(
    () => [
      // { field: 'id', headerName: 'ID', flex: 1 },
      { field: 'name', headerName: 'Name', flex: 1  },
      { field: 'email', headerName: 'Email', flex: 1  },
      {
        field: 'role',
        headerName: 'Role',
        flex: 1 ,
        type: 'singleSelect',
        valueOptions: ['BASIC','USER','MANAGER','ADMIN', 'ACCOUNT'],
        editable: true,
      },
      {
        field: 'active',
        headerName: 'Active',
        flex: 1 ,
        type: 'boolean',
        editable: true,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
        flex: 1 ,
        type: 'dateTime',
        valueFormatter: params => moment(params?.value).format("MM/DD/YYYY hh:mm A"),
        // renderCell: (params) =>
        //   moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS'),
      },
      {
        field: 'lastLogin',
        headerName: 'Last Login',
        type: 'dateTime',
        flex: 1 ,
        valueFormatter: params => moment(params?.value).format("MM/DD/YYYY hh:mm A"),
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        flex: 1 ,
        cellClassName: 'actions',
        renderCell: (params) => (
          <UsersActions {...{ params, rowId, setRowId }} />
        ),
      },
    ],
    [rowId]
  );

  return (
    <Box
      sx={{
        height: 700,
        width: '100%',
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
      >
        Manage Users
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
        columns={columns}
        rows={users}
        getRowId={(row) => row.id}
        rowsPerPageOptions={[15, 30, 45]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        getRowSpacing={(params) => ({
          top: params.isFirstVisible ? 0 : 0,
          bottom: params.isLastVisible ? 0 : 0,
        })}
        onCellEditCommit={(params) => setRowId(params.id)}
        components={{
          Toolbar: EditToolbar,
        }}
      />
    </Box>
  );
}