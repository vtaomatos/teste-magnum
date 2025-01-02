import { useState } from 'react';
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

  const handleCadastroClick = () => {
    navigate('/Cadastro');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', textAlign: 'center' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="agencia">Agência:</label>
          <Input
            id="agencia"
            value={agencia}
            onChange={(e) => setAgencia(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="conta">Conta:</label>
          <Input
            id="conta"
            value={conta}
            onChange={(e) => setConta(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="digito">Dígito:</label>
          <Input
            id="digito"
            value={digito}
            onChange={(e) => setDigito(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="senha">Senha:</label>
          <Input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button
          type="submit"
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            marginRight: '10px',
          }}
        >
          Entrar
        </button>
        <button
          onClick={handleCadastroClick}
          style={{
            backgroundColor: '#28A745',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Cadastre-se
        </button>
      </form>
    </div>
  );
}

export default Login;
