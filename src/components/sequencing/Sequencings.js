import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Sequencings() {

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
        id="sequencing-button"
        aria-controls={open ? 'sequencing-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Sequencing
      </Button>
      <Menu
        id="sequencing-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'sequencing-button',
        }}
      >
        <MenuItem onClick={() => {navigate('sequencing/seqLibrary'); handleClose()}}> Sequencing Runs </MenuItem>
        <MenuItem onClick={() => {navigate('sequencing/seqFile'); handleClose()}}> Sequencing Files </MenuItem>
      </Menu>
    </>
  );
}