import { useEffect, useState } from 'react';
import { ConsultaUsuarioDestinatario } from './consultaUsuarioDestinatarioService';
import { TIPO_TRANSFERENCIA } from '../constants/constants';
import { requestApiPost } from './requestService';
import { CAMINHO_TRANSFERENCIAS } from '../constants/constantsApi';
import { AtualizarSaldo, AtualizarSaldoDestinatario } from './atualizarSaldoService';
import { consultaSaldoUsuarioLogado } from './consultaSaldoService';

export function useCadastrarPix() {
  const [mensagem, setMensagem] = useState('');
  const [destinatario, setDestinatario] = useState({});
  const [usuario, setUsuario] = useState(null);
  

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('conta');
    if (usuarioLogado) {
        setUsuario(JSON.parse(usuarioLogado));
    }
  }, []);

  function cadastrar(documento, valor, descricao) {

    if (!usuario) {
        setMensagem('Usuário não logado');
        throw new Error('Usuário não logado');
    }

    ConsultaUsuarioDestinatario(documento).then((destinatario) => {
        
        setDestinatario(destinatario);
        
        if (usuario.id === destinatario.id) {
            setMensagem('Não é possível enviar transferência para você mesmo');
            throw new Error('Não é possível enviar transferência para você mesmo');
        }

        if (valor <= 0 || valor < 1 || valor > 10000) {
            setMensagem('Valor inválido. O valor deve ser maior que 0 e menor que 10.000');
            throw new Error('Valor inválido. O valor deve ser maior que 0 e menor que 10.000');
        }

        if (descricao.length < 5 || descricao.length > 100) {
            setMensagem('Descrição inválida. A descrição deve ter entre 5 e 100 caracteres');
            throw new Error('Descrição inválida. A descrição deve ter entre 5 e 100 caracteres');
        }
       
        consultaSaldoUsuarioLogado().then((saldo) => {

            if (saldo < valor) {
                setMensagem('Saldo insuficiente');
                throw new Error('Saldo insuficiente');
            }

            const novaTransferencia = {
                id_conta_remetente: Number(usuario.id),
                id_conta_destinatario: Number(destinatario.id),
                nome_remetente: usuario.primeiro_nome + ' ' + usuario.ultimo_nome,
                nome_destinatario: destinatario.nome,
                tipo_transacao: TIPO_TRANSFERENCIA.PIX.toString(),
                valor: Number(valor),
                data_transacao: new Date().toISOString(),
                saldo_remetente: saldo - valor,
                descricao
            };
            console.log('Transferência:', novaTransferencia);
    
            requestApiPost(CAMINHO_TRANSFERENCIAS, novaTransferencia).then((response) => {

                console.log('Resposta do servidor:', response);
                
                if (
                    typeof response != 'object' &&
                    !Object.prototype.hasOwnProperty.call(response, 'id')
                ) {
                    setMensagem('Erro ao cadastrar transferência');
                    throw new Error('Erro ao cadastrar transferência');
                }

                AtualizarSaldo(valor).then((response) => {
                    console.log('Resposta do servidor2:', response);
                    if (
                        typeof response != 'object' ||
                        !Object.prototype.hasOwnProperty.call(response, 'id')
                    ) {
                        setMensagem('Erro ao atualizar saldo');
                        throw new Error('Erro ao atualizar saldo');
                    }
                    AtualizarSaldoDestinatario(valor, destinatario.id).then((response) => {
                        console.log('Resposta do servidor3:', response);
                        if (
                            typeof response != 'object' ||
                            !Object.prototype.hasOwnProperty.call(response, 'id')
                        ) {
                            setMensagem('Erro ao atualizar saldo do destinatário');
                            throw new Error('Erro ao atualizar saldo do destinatário');
                        }
                        setMensagem('Transferência PIX cadastrada com sucesso!');
                    }).catch((error) => {
                        setMensagem('Erro ao atualizar saldo do destinatário:', error);
                        alert('Erro ao atualizar saldo do destinatário:', error);
                        throw error;
                    });
                }).catch((error) => {
                    setMensagem('Erro ao atualizar saldo:', error);
                    alert('Erro ao atualizar saldo:', error);
                    throw error;
                });
            }).catch((error) => {
                throw error;
            });
        }).catch((error) => {
            throw error;
        });
    }).catch((error) => {
        throw error;
    });
  }

  return {
    cadastrar,
    mensagem,
    destinatario
  };
}