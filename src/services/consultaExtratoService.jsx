// services/consultaExtratoService.js

import { CAMINHO_CONTA, CAMINHO_TRANSFERENCIAS } from '../constants/constantsApi';
import { requestGet } from './requestService';

export const consultaExtratoService = async (page = 1, limit = 10) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token não encontrado');

  const linkValidarUsuario = `${CAMINHO_CONTA}/?token=${encodeURIComponent(token)}`;
  const usuarioValidado = await requestGet(linkValidarUsuario);

  if (!usuarioValidado || usuarioValidado.length === 0) {
    throw new Error('Dados inválidos');
  }

  if (usuarioValidado.length > 1) {
    throw new Error('Mais de uma conta encontrada');
  }

  const idUsuario = usuarioValidado[0].id;

  const linkExtratoRemetente = `${CAMINHO_TRANSFERENCIAS}/?id_conta_remetente=${idUsuario}`;
  const linkExtratoDestinatario = `${CAMINHO_TRANSFERENCIAS}/?id_conta_destinatario=${idUsuario}`;

  const [responseRemetente, responseDestinatario] = await Promise.all([
    requestGet(linkExtratoRemetente),
    requestGet(linkExtratoDestinatario)
  ]);

  const extrato = [...responseRemetente, ...responseDestinatario];

  // Ordenar por data (decrescente)
  const extratoOrdenado = extrato.sort(
    (a, b) => new Date(b.data_transacao) - new Date(a.data_transacao)
  );

  // Paginação
  const start = (page - 1) * limit;
  const paginatedItems = extratoOrdenado.slice(start, start + limit);

  const extratoFormatado = paginatedItems.map(item => ({
    ...item,
    data_transacao: new Date(item.data_transacao).toLocaleDateString('pt-BR')
  }));

  return {
    items: extratoFormatado,
    total: extrato.length,
    page,
    limit
  };
};
