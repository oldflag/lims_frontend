import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Reports() {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate()

  return (
    <>
      <Button
        color="inherit"
        id="report-button"
        aria-controls={open ? 'report-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Report
      </Button>
      <Menu
        id="report-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'report-button',
        }}
      >
        <MenuItem onClick={() => {navigate('report/samplesheet'); handleClose()}}> Sample Sheet  </MenuItem>
        <MenuItem onClick={() => {navigate('report/digest'); handleClose()}}> Digest for Analysis  </MenuItem>
        <MenuItem onClick={() => {navigate('report/seqrun'); handleClose()}}> Sequencing Run Report  </MenuItem>
        <MenuItem onClick={() => {navigate('report/qcreport'); handleClose()}}> QC Report </MenuItem>
      </Menu>
    </>
  );
}