import React, { useState } from 'react';
import { getUserlogin } from '../../services/loginService';
import { useNavigate } from 'react-router-dom';
import { Input } from '@mui/material';
import { useLogin } from '../../context/LoginContext';


function Login() {
  const [agencia, setAgencia] = useState('');
  const [conta, setConta] = useState('');
  const [digito, setDigito] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userData = await getUserlogin(agencia, conta, digito, senha);
      if (!userData) {
        throw new Error('Dados vazios');
      }

      await login(userData);
      navigate('/home');
    } catch (err) {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="agencia">Agência:</label>
          <Input
            id="agencia"
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="conta">Conta:</label>
          <Input
            id="conta"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="digito">Dígito:</label>
          <Input
            id="digito"
            value={digito}
            onChange={(e) => setDigito(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <Input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
