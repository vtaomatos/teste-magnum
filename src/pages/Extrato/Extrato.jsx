import { useState, useEffect } from 'react'
import { consultaExtratoService } from '../../services/consultaExtratoService'
import styled from 'styled-components'

const Tabela = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Cabecalho = styled.thead`
  background-color: #6e6e6e;
  color: white;
`;

const Linha = styled.tr`
  background-color: ${({ index }) =>
        index % 2 === 0
      ? '#f1f1f1'
      : '#dcdcdc'};
`;

const Celula = styled.td`
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #ccc;
`;

const Paginacao = styled.div`
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

function Extrato() {
  const [extrato, setExtrato] = useState([])
  const [page, setPage] = useState(1)
  const [limit] = useState(10) // ou 5, 20 etc
  const [temMais, setTemMais] = useState(true)

  const user_id = JSON.parse(localStorage.getItem('conta')).id;

  useEffect(() => {
    async function fetchExtrato() {
      try {
        const dados = await consultaExtratoService(page, limit);
        setExtrato(dados.items); // se for `dados` direto, ajusta aqui
        setTemMais(dados.items.length === limit); // se retornou menos que o limite, é a última
      } catch (error) {
        console.error('Erro ao buscar extrato:', error);
      }
    }

    fetchExtrato();
  }, [page, limit])

  const proximaPagina = () => setPage(prev => prev + 1);
  const paginaAnterior = () => setPage(prev => Math.max(prev - 1, 1));

  return (
    <div>
      <h1>Extrato</h1>
      <Tabela>
        <Cabecalho>
          <tr>
            <th>De/Para</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </Cabecalho>
        <tbody>
          {extrato.map((item, index) => {
            const isEntrada = item.id_conta_destinatario == user_id;
            return (
              <Linha key={item.id} isEntrada={isEntrada} index={index}>
                <Celula>{isEntrada ? item.nome_remetente : item.nome_destinatario}</Celula>
                <Celula>{item.data_transacao}</Celula>
                <Celula>{item.descricao}</Celula>
                <Celula style={{ color: isEntrada ? 'green' : 'red' }}>
                  {isEntrada ? '+' : '-'}
                  {item.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </Celula>
              </Linha>
            );
          })}
        </tbody>
      </Tabela>

      <Paginacao>
        <button onClick={paginaAnterior} disabled={page === 1}>⬅ Anterior</button>
        <span>Página {page}</span>
        <button onClick={proximaPagina} disabled={!temMais}>Próxima ➡</button>
      </Paginacao>
    </div>
  )
}

export default Extrato;
