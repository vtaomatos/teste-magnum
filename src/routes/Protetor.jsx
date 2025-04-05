import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Protetor = ({ children }) => {
  const { loginValido, logout } = useLogin();
  const [isValid, setIsValid] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const valido = await loginValido()
        setIsValid(valido);
      } catch {
        setIsValid(false);
      } finally {
        setIsLoading(false); // Finaliza o carregamento
      }
    };

    verificarLogin();
  }, [loginValido]);

  
  if (isLoading) {
    return <div>Carregando...</div>; 
  }
  
  if (!isValid) {
    logout()
    return <Navigate to="/login" />;
  }


  return <div>{children}</div>;
};
Protetor.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Protetor;