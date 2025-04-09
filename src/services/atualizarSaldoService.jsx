
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