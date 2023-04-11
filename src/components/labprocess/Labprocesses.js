import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Labprocesses() {

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
        id="labprocess-button"
        aria-controls={open ? 'labprocess-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // onMouseOver={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Lab Process
      </Button>
      <Menu
        id="labprocess-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{'aria-labelledby': 'labprocess-button'}}
      >
        <MenuItem onClick={() => {navigate('labprocess/ptPrep'); handleClose()}}> Paired-Tag Preparation  </MenuItem>
        <MenuItem onClick={() => {navigate('labprocess/splitPool'); handleClose()}}> Split&Pool </MenuItem>
        <MenuItem onClick={() => {navigate('labprocess/lysis');handleClose()}}> Lysis </MenuItem>
        <MenuItem onClick={() => {navigate('labprocess/prelibrary');handleClose()}}> Prelibrary </MenuItem>
        <MenuItem onClick={() => {navigate('labprocess/dnaLibrary/dnaLibrary');handleClose()}}> DNA Library </MenuItem>
        <MenuItem onClick={() => {navigate('labprocess/rnaLibrary/rnaLibrary');handleClose()}}> RNA Library </MenuItem>
      </Menu>
    </>
  );
}