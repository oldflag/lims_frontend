import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddLinkIcon from '@mui/icons-material/AddLink';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import ScienceIcon from '@mui/icons-material/Science';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ListAltIcon from '@mui/icons-material/ListAlt';
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
        open='true'
        
    >
      <SpeedDialAction 
          key='New' 
          icon={<AddBoxIcon />} 
          tooltipTitle='New Seq Run' 
          // tooltipOpen
          // tooltipPlacement='bottom-start' 
          onClick={() => {navigate('/sequencing/newSeqLibrary')}}/>
      <SpeedDialAction 
          key='Seq Run' 
          icon={<AdfScannerIcon />} 
          tooltipTitle='Seq Run' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/sequencing/seqRun')}} />
      <SpeedDialAction 
          key='Seq Library' 
          icon={<ScienceIcon />} 
          tooltipTitle='Seq Library' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/sequencing/seqLibrary')}} />
      <SpeedDialAction 
          key='Fastq File' 
          icon={<FolderOpenIcon />} 
          tooltipTitle='Fastq Files' 
          // tooltipOpen
          // tooltipPlacement='top' 
          onClick={() => {navigate('/sequencing/seqFile')}} />
      <SpeedDialAction 
          key='SampleSheet' 
          icon={<ListAltIcon />} 
          tooltipTitle='SampleSheet' 
          // tooltipOpen
          // tooltipPlacement='top'  
          // onClick={() => {navigate('/sequencing/sampleSheet')}} />
          onClick={() => {
            navigate('/sequencing/seqLibrary')
            dispatch({ type: 'OPEN_SAMPLESHEET' })
            }
            } />
      <SpeedDialAction 
          key='digest' 
          icon={<ListAltIcon />} 
          tooltipTitle='Digest Files' 
          // tooltipOpen
          // tooltipPlacement='top'  
          // onClick={() => {navigate('/sequencing/sampleSheet')}} />
          onClick={() => {
            navigate('/sequencing/seqFile')
            dispatch({ type: 'OPEN_DIGEST' })
            }
            } />

      <SpeedDialAction 
          key='runreport' 
          icon={<ListAltIcon />} 
          tooltipTitle='Seq Run Report' 
          // tooltipOpen
          // tooltipPlacement='top'  
          // onClick={() => {navigate('/sequencing/sampleSheet')}} />
          onClick={() => {
            navigate('/sequencing/seqRun')
            dispatch({ type: 'OPEN_SEQRUNREPORT' })
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