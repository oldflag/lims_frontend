import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useNavigate } from 'react-router-dom';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';


// const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
//   position: 'relative',
//   '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
//     bottom: theme.spacing(2),
//     right: theme.spacing(2),
//   },
//   '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
//     top: theme.spacing(2),
//     left: theme.spacing(2),
//   },
// }));

const DnaLibrarySDMenu = () => {

  const navigate = useNavigate()

  return (
  // <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
    <SpeedDial
        ariaLabel="DNA Library Processes"
        icon={<NavigateNextTwoToneIcon />}
        direction={"right"}
    >
      <SpeedDialAction 
          key='New' 
          icon={<AddBoxIcon />} 
          tooltipTitle='New' 
          // tooltipOpen
          // tooltipPlacement='bottom-start' 
          onClick={() => {navigate('/labprocess/dnaLibrary/newDnaLibrary')}}/>
      <SpeedDialAction 
          key='SplitEnzyme' 
          icon={<CallSplitIcon />} 
          tooltipTitle='SplitEnzyme' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/dnaLibrary/dnaSplitEnzyme')}} />
      <SpeedDialAction 
          key='Adapter' 
          icon={<AddLinkIcon />} 
          tooltipTitle='Adapter' 
          // tooltipOpen
          // tooltipPlacement='top'  
          onClick={() => {navigate('/labprocess/dnaLibrary/dnaAdapter')}} />
      <SpeedDialAction 
          key='Multiplexing' 
          icon={<DynamicFeedIcon />} 
          tooltipTitle='Multiplexing' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/dnaLibrary/dnaLibMultiplex')}} />
    </SpeedDial>
  // </Box>
  );
}

export default DnaLibrarySDMenu