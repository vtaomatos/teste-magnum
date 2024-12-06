import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../context/LoginContext';
import { useEffect } from 'react';


function Logout() {
  const navigate = useNavigate();
  const { logout } = useLogin();

  useEffect(() => {
    logout();
    navigate('/login')
  });  

  return;
}

export default Logout;
