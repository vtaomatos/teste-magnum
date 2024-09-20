import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const Protetor = ({ children }) => {
  const { loginValido } = useLogin();
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verificarLogin = async () => {
      try {
        const valido = await loginValido()
        setIsValid(valido);
      } catch (err) {
        console.log(err);
        setIsValid(false);
      }
    };

    verificarLogin();
  }, [loginValido]);

  if (isValid === null) {
    return <div>Carregando...</div>;
  }

  if (!isValid) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protetor;
