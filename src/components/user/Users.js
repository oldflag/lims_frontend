import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Users = () => {

  const navigate = useNavigate()

  return (
    <Button
        color="inherit"
        id="user-button"
        onClick={() => navigate('usertable')}
      >
        Users
    </Button>
  )
}

export default Users