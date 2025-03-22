import { CAMINHO_CONTA } from '../constants/constantsApi';
import { requestGet } from './requestService';

export const consultaSaldoUsuarioLogado = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const link = `${CAMINHO_CONTA}/?token=${encodeURIComponent(token)}`;

    const response = await requestGet(link);

    switch (response.length)
    {
      case 0:
        throw new Error('Dados inválidos');
      case 1:
        return response.shift().saldo;
      case response == null:
        throw new Error('Erro API.');
      default:
        throw new Error('Mais de uma conta encontrada');
    }
  };
