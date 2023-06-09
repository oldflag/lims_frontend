import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function QCresults() {

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
        id="qcresult-button"
        aria-controls={open ? 'qcresult-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        QC Result
      </Button>
      <Menu
        id="qcresult-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'qcresult-button',
        }}
      >
        <MenuItem onClick={() => {navigate('qcresult/tapeStation'); handleClose()}}> TapeStation </MenuItem>
        <MenuItem disabled onClick={() => {navigate('qcresult/sizeselection'); handleClose()}}> Size Selectoin  </MenuItem>
        <MenuItem disabled onClick={() => {navigate('qcresult/qpcr');handleClose()}}> qPCR </MenuItem>
      </Menu>
    </>
  );
}