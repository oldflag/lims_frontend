import React from 'react'
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography, Stack, Link} from '@mui/material'
import {Lock, Menu} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useValue } from '../context/ContextProvider';
import UserIcons from './user/UserIcons';
import Acquisitions from './acquisition/Acquisitions';
import Acquisitions2 from './acquisition/Acquisitions2';

import Users from './user/Users';
import Inventories from './inventory/Inventories';
import Designs from './design/Designs';
import Labprocesses from './labprocess/Labprocesses';
import QCresults from './qcresult/QCresults';
import Sequencings from './sequencing/Sequencings';
import Reports from './report/Reports';
import Accounts from './account/Accounts';
import logo from '../images/epigenome_logo.png'


const NavBar = () => {

  const {
    state: { currentUser },
    dispatch,
  } = useValue();

  const navigate = useNavigate()

  return (
    <>
      <AppBar>
        <Container maxWidth={ false }>
          <Toolbar disableGutters>
            <Typography variant='h6' component='h6' noWrap sx={{flexGrow:1}}>
              {(currentUser) ? ((currentUser.role === "ACCOUNT") ? "ACCOUNT" : "LIMS") : "Epigenome Technologies Inc."}
            </Typography>
            {/* <Link href="/">
              <Box
                component="img"
                sx={{ height: 50 }}
                alt="Logo"
                src={logo}
              />
            </Link>  */}
            <Stack direction={'row'} spacing={1}>
              {currentUser && (
                <>
               <Button
                color="inherit"
                // startIcon={<Lock />}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button> 
               {(currentUser.role === "ADMIN") && <Users />}
               {(["ACCOUNT", "ADMIN", "MANAGER"].includes(currentUser.role)) && <Accounts /> }
              <Acquisitions />
              <Acquisitions2 />
              <Inventories />
              <Designs /> 
              {/* {(currentUser.role !== "ACCOUNT") && <Designs /> } */}
              {(currentUser.role !== "ACCOUNT") && <Labprocesses />}
              {(currentUser.role !== "ACCOUNT") && <QCresults />}
              {(currentUser.role !== "ACCOUNT") && <Sequencings />}
              {(currentUser.role !== "ACCOUNT") && <Reports />}
              </>
              )}
      
            </Stack>
            {!currentUser ? (
              <Button
                color="inherit"
                startIcon={<Lock />}
                onClick={() => dispatch({ type: 'OPEN_LOGIN' })}
              >
                Login
              </Button>
            ) : (
              <UserIcons />
            )}
          </Toolbar>
        </Container>
    </AppBar>
    <Toolbar />
    </>
  )
}

export default NavBar