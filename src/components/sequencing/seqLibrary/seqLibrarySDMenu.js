import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import { useNavigate } from 'react-router-dom';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import { useValue } from '../../../context/ContextProvider'


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

const SeqLibrarySDMenu = () => {

   const {
    dispatch
  } = useValue()

  const navigate = useNavigate()

  return (
  // <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
    <SpeedDial
        ariaLabel="RNA Library Processes"
        icon={<NavigateNextTwoToneIcon />}
        direction={"right"}
        
    >
      <SpeedDialAction 
          key='New' 
          icon={<AddBoxIcon />} 
          tooltipTitle='New Library' 
          // tooltipOpen
          // tooltipPlacement='bottom-start' 
          onClick={() => {navigate('/sequencing/newSeqLibrary')}}/>
      <SpeedDialAction 
          key='Seq Library' 
          icon={<CallSplitIcon />} 
          tooltipTitle='Seq Library' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/sequencing/seqLibrary')}} />
      <SpeedDialAction 
          key='SampleSheet' 
          icon={<AddLinkIcon />} 
          tooltipTitle='SampleSheet' 
          // tooltipOpen
          // tooltipPlacement='top'  
          // onClick={() => {navigate('/sequencing/sampleSheet')}} />
          onClick={() => {
            navigate('/sequencing/seqLibrary')
            dispatch({ type: 'OPEN_SAMPLESHEET' })
            }
            } />
          
      {/* <SpeedDialAction 
          key='Multiplexing' 
          icon={<DynamicFeedIcon />} 
          tooltipTitle='Multiplexing' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/sequencing/seqLibrary/seqLibMultiplex')}} /> */}
    </SpeedDial>
  // </Box>
  );
}

export default SeqLibrarySDMenu