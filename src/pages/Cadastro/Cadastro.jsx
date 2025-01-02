import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cadastro() {
    const [formData, setFormData] = useState({
        primeiroNome: '',
        ultimoNome: '',
        cpfOuCnpj: '',
        email: '',
        senha: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const gerarDadosConta = () => {
        const agencia = Math.floor(1000 + Math.random() * 9000).toString(); // Exemplo: 4 dígitos
        const conta = Math.floor(10000 + Math.random() * 90000).toString(); // Exemplo: 5 dígitos
        const digito = Math.floor(Math.random() * 10).toString(); // Exemplo: 1 dígito
        const saldo = parseFloat((Math.random() * 5000).toFixed(2)); // Exemplo: saldo entre 0 e 5000
        return { agencia, conta, digito, saldo };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { agencia, conta, digito, saldo } = gerarDadosConta();

        const newUser = {
            ...formData,
            agencia,
            conta,
            digito,
            primeiroAcesso: true,
            saldo,
        };

        try {
            const response = await axios.post('http://localhost:3000/contas', newUser);
            console.log('Dados enviados com sucesso:', response.data);
            alert('Cadastro realizado com sucesso!');
            navigate('/Login');
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            alert('Erro ao cadastrar a conta. Tente novamente.');
        }
    };

    const handleVoltar = () => {
        navigate('/Login');
    };

    return (
        <Box
            sx={{
                maxWidth: 400,
                margin: 'auto',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                boxShadow: 3,
                borderRadius: 2,
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Cadastro de Usuário</h2>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Primeiro Nome"
                    name="primeiroNome"
                    value={formData.primeiroNome}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Último Nome"
                    name="ultimoNome"
                    value={formData.ultimoNome}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="CPF ou CNPJ"
                    name="cpfOuCnpj"
                    value={formData.cpfOuCnpj}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="E-mail"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Senha"
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                >
                    Cadastrar
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={handleVoltar}
                >
                    Voltar para o Login
                </Button>
            </form>
        </Box>
    );
}

export default Cadastro;
