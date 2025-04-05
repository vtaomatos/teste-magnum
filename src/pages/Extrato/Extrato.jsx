import { useState, useEffect } from 'react'
import { consultaExtratoService } from '../../services/consultaExtratoService'

function Extrato() {

    const [extrato, setExtrato] = useState([])

    const user_id = JSON.parse(localStorage.getItem('conta')).id;

    useEffect(() => {
        async function fetchExtrato() {
            try {
                const extrato = await consultaExtratoService();
                setExtrato(extrato);
            } catch (error) {
                console.error('Erro ao buscar extrato:', error);
            }
        }

        fetchExtrato();
    }, [])

    return (
        <div>
            <h1>Extrato</h1>
            <table>
                <thead>
                    <tr>
                        <th>De/Para</th>
                        <th>Data</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        extrato.map(item => (
                            <tr key={item.id}>
                                <td>{item.id_conta_destinatario==user_id ? item.nome_remetente : item.nome_destinatario }</td>
                                <td>{item.data_transacao}</td>
                                <td>{item.descricao}</td>
                                <td>{item.id_conta_destinatario==user_id ? "+" : "-" }{item.valor}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Extrato