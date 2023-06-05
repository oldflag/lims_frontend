
import { Group, MapsHomeWork } from '@mui/icons-material';
import ScienceIcon from '@mui/icons-material/Science';
import BiotechIcon from '@mui/icons-material/Biotech';
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { getSpecimens } from '../../actions/specimen';
import { getBatchs } from '../../actions/batch';
import { useValue } from '../../context/ContextProvider';
import moment from 'moment';
import SpecimensPieChart from './SpecimensPieChart';
import BatchTrendChart from './BatchTrendChart';

const Dashboard = ({ setSelectedLink, link }) => {
  const {
    state: { specimens, batchs },
    dispatch,
  } = useValue();

  useEffect(() => {
    setSelectedLink(link);
    if (specimens.length === 0) getSpecimens(dispatch);
    if (batchs.length === 0) getBatchs(dispatch);
  }, []);

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'grid' },
        gridTemplateColumns: 'repeat(3,1fr)',
        gridAutoRows: 'minmax(100px, auto)',
        gap: 3,
        textAlign: 'center',
        flexDirection: 'column',
      }}
    >
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Batchs</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BiotechIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{batchs.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4">Total Specimens</Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ScienceIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
          <Typography variant="h4">{specimens.length}</Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: '1/4' }}>
        <Box>
          <Typography>Recently added Batchs</Typography>
          <List>
            {batchs.slice(0, 4).map((batch, i) => (
              <Box key={batch.id}>
                <ListItem>
                  {/* <ListItemAvatar>
                    <Avatar alt={batch?.name} src={batch?.photoURL} />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={batch?.name}
                    secondary={`Time Created: ${moment(batch?.createdAt).format(
                      'YYYY-MM-DD H:mm:ss'
                    )}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
        <Box>
          <Typography>Recently added Specimens</Typography>
          <List>
            {specimens.slice(0, 4).map((specimen, i) => (
              <Box key={specimen.id}>
                <ListItem>
                  {/* <ListItemAvatar>
                    <Avatar
                      alt={specimen?.name}
                      src={specimen?.images[0]}
                      variant="rounded"
                    />
                  </ListItemAvatar> */}
                  <ListItemText
                    primary={specimen?.name}
                    secondary={`Added: ${moment(specimen?.createdAt).fromNow()}`}
                  />
                </ListItem>
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <Typography variant="h6">Specimens By Species</Typography>
        <SpecimensPieChart />
      </Paper>
       <Paper elevation={3} sx={{ p: 2, gridColumn: '1/3' }}>
        <Typography variant="h6">Number of Batches By Month</Typography>
        <BatchTrendChart />
      </Paper>
    </Box>
  );
};

export default Dashboard;

