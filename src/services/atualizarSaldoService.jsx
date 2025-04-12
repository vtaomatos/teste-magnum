
import { CAMINHO_CONTA } from '../constants/constantsApi';
import { requestApiGet, requestApiPut } from './requestService';


export const AtualizarSaldo = async (valor) => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('Token não encontrado');

    const linkValidarUsuario = `${CAMINHO_CONTA}/?token=${encodeURIComponent(token)}`;
    const usuarioValidado = await requestApiGet(linkValidarUsuario);

    if (!usuarioValidado || usuarioValidado.length === 0) {
        throw new Error('Dados inválidos');
    }
    if (usuarioValidado.length > 1) {
        throw new Error('Mais de uma conta encontrada');
    }

    const idUsuario = usuarioValidado[0].id;
    const saldoAtual = usuarioValidado[0].saldo;

    const novoSaldo = saldoAtual - valor;

    const linkAtualizarSaldo = `${CAMINHO_CONTA}/${idUsuario}`;

    const response = await requestApiPut(linkAtualizarSaldo, { saldo: novoSaldo });

    return response;
}

export const AtualizarSaldoDestinatario = async (valor, usuarioId) => {
    
    if (!usuarioId) {
        throw new Error('ID do usuário não encontrado');
    }

    const linkUsuarioDestinatario = `${CAMINHO_CONTA}/?id=${encodeURIComponent(usuarioId)}`;
    const usuarioDestinatario = await requestApiGet(linkUsuarioDestinatario);
    if (!usuarioDestinatario || usuarioDestinatario.length === 0) {
        throw new Error('Destinatário não encontrado para atualizar saldo');
    }
    if (usuarioDestinatario.length > 1) {
        throw new Error('Mais de uma conta encontrada destinatário para atualizar saldo');
    }
    const idUsuarioDestinatario = usuarioDestinatario[0].id;
    const saldoAtualDestinatario = usuarioDestinatario[0].saldo;
    const novoSaldoDestinatario = saldoAtualDestinatario + valor;
    const linkAtualizarSaldoDestinatario = `${CAMINHO_CONTA}/${idUsuarioDestinatario}`;
    const response = await requestApiPut(linkAtualizarSaldoDestinatario, { saldo: novoSaldoDestinatario });
    return response;
}
