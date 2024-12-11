import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/contas`;

export const getUserlogin = async (agencia, conta, digito, senha) => {
    const link = `${API_URL}/?agencia=${encodeURIComponent(agencia)}&conta=${encodeURIComponent(conta)}&digito=${encodeURIComponent(digito)}&senha=${encodeURIComponent(senha)}`;

    const response = await axios.get(link);
    
    switch (response.data.length)
    {
      case 0:
        throw new Error('Dados inválidos');
      case 1:
        return response.data.shift(); //Passar somente os dados necessários
      case null || undefined:
        throw new Error('Erro API.');
      default:
        throw new Error('Mais de uma conta encontrada');
    }
  };
