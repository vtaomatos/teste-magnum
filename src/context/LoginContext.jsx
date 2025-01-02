import { createContext, useState, useEffect, useContext } from 'react';
import { jwtVerify, SignJWT } from 'jose';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [conta, setConta] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const inicializarLogin = async () => {
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
    
    const {primeiroNome, ultimoNome, cpfOuCnpj} = JSON.stringify(dadosConta);

    localStorage.setItem('token', tokenJwt);
    localStorage.setItem('conta', {...primeiroNome, ...ultimoNome, ...cpfOuCnpj});
    setConta(dadosConta);
    setToken(tokenJwt);
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

export const useLogin = () => {
  return useContext(LoginContext);
};
