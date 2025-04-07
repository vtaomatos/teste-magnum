import { useState } from 'react';
import axios from 'axios';

// Endereço base do seu JSON Server
const API_URL = 'http://localhost:3000';

export const CadastroPix = () => {
  const [destinatarioId, setDestinatarioId] = useState('');
  const [nomeDestinatario, setNomeDestinatario] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');

  const usuario = JSON.parse(localStorage.getItem('usuarioLogado')); // deve conter id, nome e saldo

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      setMensagem('Usuário não logado');
      return;
    }

    const novaTransferencia = {
      id_conta_remetente: usuario.id,
      id_conta_destinatario: Number(destinatarioId),
      nome_remetente: usuario.nome,
      nome_destinatario: nomeDestinatario,
      tipo_transacao: 'PIX',
      valor: Number(valor),
      data_transacao: new Date().toISOString(),
      saldo_remetente: usuario.saldo - valor,
      saldo_destinatario: null, // pode ser preenchido depois
      descricao
    };

    try {
      await axios.post(`${API_URL}/transferencias`, novaTransferencia);
      setMensagem('Transferência PIX cadastrada com sucesso!');
      setValor('');
      setDescricao('');
      setDestinatarioId('');
      setNomeDestinatario('');
    } catch (error) {
      console.error('Erro ao cadastrar PIX:', error);
      setMensagem('Erro ao cadastrar transferência.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Transferência PIX</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID do Destinatário:</label>
          <input
            type="number"
            value={destinatarioId}
            onChange={(e) => setDestinatarioId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nome do Destinatário:</label>
          <input
            type="text"
            value={nomeDestinatario}
            onChange={(e) => setNomeDestinatario(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Valor (R$):</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <button type="submit">Enviar PIX</button>
      </form>

      {mensagem && <p style={{ marginTop: '1rem' }}>{mensagem}</p>}
    </div>
  );
};
