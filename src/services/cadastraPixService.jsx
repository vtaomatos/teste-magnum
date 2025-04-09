import { useState } from 'react';
import { ConsultaUsuarioDestinatario } from './consultaUsuarioDestinatarioService';
import { TIPO_TRANSFERENCIA } from '../constants/constants';
import { requestApiPost } from './requestService';
import { CAMINHO_TRANSFERENCIAS } from '../constants/constantsApi';
import { AtualizarSaldo } from './atualizarSaldoService';

export function useCadastrarPix() {
  const [mensagem, setMensagem] = useState('');
  const [destinatario, setDestinatario] = useState(null);

  function cadastrar(documento, valor, descricao) {

    try {

        const usuario = JSON.parse(localStorage.getItem('token'));

        console.log('usuario', usuario);
        alert("calma");

        if (!usuario) {
            throw new Error('Usuário não logado');
        }

        const dest = ConsultaUsuarioDestinatario(documento);
        if (!dest) {
            throw new Error('Destinatário não encontrado');
        }

        if (usuario.id === dest.id) {
            throw new Error('Não é possível enviar transferência para você mesmo');
        }

        if (usuario.saldo < valor) {
            throw new Error('Saldo insuficiente');
        }

        if (valor <= 0 || valor < 1 || valor > 10000) {
            throw new Error('Valor inválido. O valor deve ser maior que 0 e menor que 10.000');
        }

        if (descricao.length < 5 || descricao.length > 100) {
            throw new Error('Descrição inválida. A descrição deve ter entre 5 e 100 caracteres');
        }

        const novaTransferencia = {
        id_conta_remetente: Number(usuario.id),
        id_conta_destinatario: Number(dest.id),
        nome_remetente: usuario.nome,
        nome_destinatario: dest.nome,
        tipo_transacao: TIPO_TRANSFERENCIA.PIX,
        valor: Number(valor),
        data_transacao: new Date().toISOString(),
        saldo_remetente: usuario.saldo - valor,
        descricao
        };

        try {
        if (requestApiPost(CAMINHO_TRANSFERENCIAS, novaTransferencia)) {
            if (AtualizarSaldo(valor)) {
            setMensagem('Transferência PIX cadastrada com sucesso!');
            setDestinatario(dest);
            } else {
            setMensagem('Erro ao atualizar saldo.');
            }
        } else {
            setMensagem('Erro ao cadastrar transferência.');
        }
        } catch (error) {
        console.error('Erro ao cadastrar PIX:', error);
        setMensagem('Erro ao cadastrar transferência.');
        }
    } catch (error) {
        console.error('Erro ao cadastrar PIX:', error);
        setMensagem('Erro ao cadastrar transferência.');
    }
  }

  return {
    cadastrar,
    mensagem,
    destinatario
  };
}