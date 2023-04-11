import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import CropIcon from '@mui/icons-material/Crop';
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

const PreLibrarySDMenu = () => {

   const {
    dispatch
  } = useValue()

  const navigate = useNavigate()

  return (
  // <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
    <SpeedDial
        ariaLabel="PreLibrary Processes"
        icon={<NavigateNextTwoToneIcon />}
        direction={"right"}
        open='true'
        
    >
      <SpeedDialAction 
          key='New' 
          icon={<AddBoxIcon />} 
          tooltipTitle='New PreLibrary' 
          // tooltipOpen
          // tooltipPlacement='bottom-start' 
          onClick={() => {navigate('/labprocess/prelibrary')}}/>
      <SpeedDialAction 
          key='TDT Tailing' 
          icon={<ManageHistoryIcon />} 
          tooltipTitle='TDT Tailing' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/prelibrary/tdtTailing')}} />
      <SpeedDialAction 
          key='LinearAmpAnchor' 
          icon={<DynamicFeedIcon />} 
          tooltipTitle='Linear Amplification with Anchor' 
          // tooltipOpen
          // tooltipPlacement='top'  
          onClick={() => {navigate('/labprocess/prelibrary/linearAmpAnchor')}} />
          {/* onClick={() => {
            navigate('/sequencing/seqLibrary')
            dispatch({ type: 'OPEN_SAMPLESHEET' })
            }
            } /> */}
          
      <SpeedDialAction 
          key='PreAmplication' 
          icon={<SignalCellularAltIcon />} 
          tooltipTitle='PreAmplication' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/prelibrary/preAmp')}} />
      <SpeedDialAction 
          key='Double Size Selection' 
          icon={<CropIcon />} 
          tooltipTitle='Double Size Selection' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/prelibrary/doubleSizeSelect')}} />
    </SpeedDial>
  // </Box>
  );
}

export default PreLibrarySDMenu