import { useState } from 'react';
import { useLogin } from '../../context/LoginContext';
import { useNavigate } from 'react-router-dom';
import { CadastroPix } from '../../services/cadastraPixService';

export const Pix = () => {
  const { logout } = useLogin();
  const navigate = useNavigate();

  const [chavePix, setChavePix] = useState('');
  const [valor, setValor] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleEnviarPix = (e) => {
    e.preventDefault();
    
    console.log('Enviando Pix para:', chavePix, 'no valor de:', valor);
    //alert do console.log
    alert(`Pix enviado para: ${chavePix} no valor de: R$ ${valor}`);

    CadastroPix(chavePix, valor)
      .then((response) => {
        console.log('Pix enviado com sucesso:', response);
        alert('Pix enviado com sucesso!');
      })
      .catch((error) => {
        console.error('Erro ao enviar Pix:', error);
        alert('Erro ao enviar Pix. Tente novamente.');
      });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Transferência via Pix</h1>

      <form onSubmit={handleEnviarPix} style={styles.form}>
        <label style={styles.label}>
          Chave Pix:
          <input
            type="text"
            value={chavePix}
            onChange={(e) => setChavePix(e.target.value)}
            style={styles.input}
            required
          />
        </label>

        <label style={styles.label}>
          Valor (R$):
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            style={styles.input}
            required
            min="0.01"
            step="0.01"
          />
        </label>

        <button type="submit" style={styles.buttonPrimary}>Enviar Pix</button>
        <button type="button" onClick={handleLogout} style={styles.buttonSecondary}>Logout</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    color: '#333'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#5e2ca5',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  label: {
    fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.95rem',
  },
  input: {
    marginTop: '0.4rem',
    padding: '0.6rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  buttonPrimary: {
    padding: '0.8rem',
    backgroundColor: '#7c3aed',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  buttonSecondary: {
    padding: '0.6rem',
    backgroundColor: '#ddd',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Pix;
