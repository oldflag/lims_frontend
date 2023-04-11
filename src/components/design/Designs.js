import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Designs() {

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
        id="design-button"
        aria-controls={open ? 'design-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Design
      </Button>
      <Menu
        id="design-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'design-button',
        }}
      >
        {/* <MenuItem onClick={() => {navigate('design/samples'); handleClose()}}> Samples </MenuItem> */}
        <MenuItem onClick={() => {navigate('design/experiments'); handleClose()}}> Experiments </MenuItem>
        <MenuItem onClick={() => {navigate('design/batchs');handleClose()}}> Batches </MenuItem>
        <MenuItem onClick={() => {navigate('design/assays');handleClose()}}> Assays </MenuItem>
        
        
        
      </Menu>
    </>
  );
}