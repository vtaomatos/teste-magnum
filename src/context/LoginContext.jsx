import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { jwtVerify, SignJWT } from 'jose';
import { cadastrarToken } from '../services/cadastrarToken';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [conta, setConta] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const inicializarLogin = () => {
      const tokenSalvo = localStorage.getItem('token');
      const contaSalva = localStorage.getItem('conta');

      if (tokenSalvo && contaSalva) {
        setToken(tokenSalvo);
        setConta(JSON.parse(contaSalva));
      }
    };

    inicializarLogin();
  }, [token]);

  const login = async (dadosConta) => {
    const dataExpiracao = new Date();
    dataExpiracao.setMinutes(dataExpiracao.getMinutes() + 2);
  
    const tokenJwt = await new SignJWT({
      agencia: dadosConta.agencia,
      conta: dadosConta.conta,
      digito: dadosConta.digito,
      primeiroNome: dadosConta.primeiroNome,
      primeiroAcesso: dadosConta.primeiroAcesso
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime(dataExpiracao)
      .sign(new TextEncoder().encode(import.meta.env.VITE_APP_SECRET));
    
      const dadosContaEssenciais = (({ primeiroNome, ultimoNome, cpfOuCnpj, id }) => ({ primeiroNome, ultimoNome, cpfOuCnpj, id }))(dadosConta);

      localStorage.setItem('token', tokenJwt);
      localStorage.setItem('conta', JSON.stringify(dadosContaEssenciais));
      setConta(dadosConta);
      setToken(tokenJwt); 
      await cadastrarToken(dadosContaEssenciais.id, tokenJwt);     
  };

  const loginValido = async () => {

    const token = localStorage.getItem('token'); //PQ NÃO CONSIGO PEGAR DO PROPRIO CONTEXTO?

    if (!token)
      throw new Error('Usuário não autenticado')


    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(import.meta.env.VITE_APP_SECRET),
      );

      return true;

    } catch (err) {
      throw new Error('Token inválido ou expirado \n' + err);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('conta');
    setConta(null);
    setToken(null);
  };

  return (
    <LoginContext.Provider value={{ conta, token, login, loginValido, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLogin = () => {
  return useContext(LoginContext);
};
