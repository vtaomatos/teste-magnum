import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaginaNaoEncontrada = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timeout); 
}, [navigate]);

  return (
    <div>
      <h1>Página Não Encontrada</h1>
      <p>Você será redirecionado para o login em breve...</p>
    </div>
  );
};

export default PaginaNaoEncontrada;