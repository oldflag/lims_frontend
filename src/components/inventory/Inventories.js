import { useState } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { KeyboardArrowDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function Inventories() {

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
        id="inventory-button"
        aria-controls={open ? 'inventory-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        Inventory
      </Button>
      <Menu
        id="inventory-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'inventory-button',
        }}
      >
        <MenuItem onClick={() => {navigate('inventory/antibodies'); handleClose()}}> Antibody </MenuItem>
        <MenuItem onClick={() => {navigate('inventory/patn5s'); handleClose()}}> pATn5 </MenuItem>
        <MenuItem onClick={() => {navigate('inventory/reagents');handleClose()}}> Reagents </MenuItem>
      </Menu>
    </>
  );
}