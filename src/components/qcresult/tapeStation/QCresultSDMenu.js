import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
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

const QCresultSDMenu = () => {

   const {
    dispatch
  } = useValue()

  const navigate = useNavigate()

  return (
  // <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
    <SpeedDial
        ariaLabel="QC"
        icon={<NavigateNextTwoToneIcon />}
        direction={"right"}
        open='true'
        
    >
      <SpeedDialAction 
          key='tapeStation' 
          icon={<StackedBarChartIcon />} 
          tooltipTitle='TapeStation' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/qcresult/tapestation')}} />
      <SpeedDialAction 
          key='qpcr' 
          icon={<StackedLineChartIcon />} 
          tooltipTitle='QPCR' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/qcresult/qpcr')}} />
      <SpeedDialAction 
          key='sizeselection' 
          icon={<CropIcon />} 
          tooltipTitle='Size Selection' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/qcresult/sizeselection')}} />
    </SpeedDial>
  // </Box>
  );
}

export default QCresultSDMenu