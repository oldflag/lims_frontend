import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import HubIcon from '@mui/icons-material/Hub';
import TagIcon from '@mui/icons-material/Tag';
import FlipCameraAndroidIcon from '@mui/icons-material/FlipCameraAndroid';
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

const PtPrepSDMenu = () => {

   const {
    dispatch
  } = useValue()

  const navigate = useNavigate()

  return (
  // <Box sx={{ position: 'relative', mt: 3, height: 50 }}>
    <SpeedDial
        ariaLabel="PtPrep Processes"
        icon={<NavigateNextTwoToneIcon />}
        direction={"right"}
        open='true'
        
    >
      <SpeedDialAction 
          key='New' 
          icon={<AddBoxIcon />} 
          tooltipTitle='New Paired-Tag Preparation' 
          // tooltipOpen
          // tooltipPlacement='bottom-start' 
          onClick={() => {navigate('/labprocess/ptPrep')}}/>
      <SpeedDialAction 
          key='Nuclei_Incubation' 
          icon={<HubIcon />} 
          tooltipTitle='Nuclei Incubation' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/ptPrep/nucleiIncubation')}} />
      <SpeedDialAction 
          key='WashAndTag' 
          icon={<TagIcon />} 
          tooltipTitle='Wash and Tag' 
          // tooltipOpen
          // tooltipPlacement='top'  
          onClick={() => {navigate('/labprocess/ptPrep/washAndTag')}} />
          {/* onClick={() => {
            navigate('/sequencing/seqLibrary')
            dispatch({ type: 'OPEN_SAMPLESHEET' })
            }
            } /> */}
          
      <SpeedDialAction 
          key='rnaRT' 
          icon={<FlipCameraAndroidIcon />} 
          tooltipTitle='RNA RT' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/labprocess/ptPrep/rnaRT')}} />
      
    </SpeedDial>
  // </Box>
  );
}

export default PtPrepSDMenu