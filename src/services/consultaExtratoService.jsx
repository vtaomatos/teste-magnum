import { CAMINHO_CONTA, CAMINHO_TRANSFERENCIAS } from '../constants/constantsApi';
import { requestGet } from './requestService';

export const consultaExtratoService = async () => {

    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Token não encontrado');
    }

    const linkValidarUsuario = `${CAMINHO_CONTA}/?token=${encodeURIComponent(token)}`;
    const usuarioValidado = await requestGet(linkValidarUsuario);


    switch (usuarioValidado.length)
    {
      case 0:
        throw new Error('Dados inválidos');
      case 1:
        {
          const idUsuario = usuarioValidado[0].id;

          // Bucar transferencias onde o id do usuario remetente for igual ao id do usuario logado
          const linkExtratoRemetente = `${CAMINHO_TRANSFERENCIAS}/?id_conta_remetente=${idUsuario}`;
          const responseRemetente = await requestGet(linkExtratoRemetente);
          
          // E onde o id do usuario destinatario for igual do id do usuario logado
          const linkExtratoDestinatario = `${CAMINHO_TRANSFERENCIAS}/?id_conta_destinatario=${idUsuario}`;
          const responseDestinatario = await requestGet(linkExtratoDestinatario);

          // Concatenar os dois arrays de transferências
          const extrato = [...responseRemetente, ...responseDestinatario];          
          
          // Ordenar o extrato por data
          const extratoOrdenado = extrato.sort((a, b) => new Date(b.data_transacao) - new Date(a.data_transacao));
          
          // formatar data para pt-BR
          return extratoOrdenado.map(item => {
            const data = new Date(item.data_transacao);
            item.data_transacao = data.toLocaleDateString('pt-BR');
            return item;
          });

        }
      case usuarioValidado == null:
        throw new Error('Erro API.');
      default:
        throw new Error('Mais de uma conta encontrada');
    }
  };
