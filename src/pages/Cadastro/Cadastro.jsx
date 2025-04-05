import { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/cadastroUsuarioService';

const gerarDadosConta = () => {
    const agencia = Math.floor(1000 + Math.random() * 9000).toString();
    const conta = Math.floor(10000 + Math.random() * 90000).toString();
    const digito = Math.floor(Math.random() * 10).toString();
    const saldo = parseFloat((Math.random() * 5000).toFixed(2));
    return { agencia, conta, digito, saldo };
};

function Cadastro() {
    const [formData, setFormData] = useState({
        primeiro_nome: '',
        ultimo_nome: '',
        cpf_ou_cnpj: '',
        email: '',
        senha: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { agencia, conta, digito, saldo } = gerarDadosConta();

        const newUser = {
            ...formData,
            agencia,
            conta,
            digito,
            primeiro_acesso: true,
            saldo,
        };

        try {
            const response = await cadastrarUsuario(newUser);
            console.log('Dados enviados com sucesso:', response);
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
                    name="primeiro_nome"
                    value={formData.primeiro_nome}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Último Nome"
                    name="ultimo_nome"
                    value={formData.ultimo_nome}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="CPF ou CNPJ"
                    name="cpf_ou_cnpj"
                    value={formData.cpf_ou_cnpj}
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
                   Login
                </Button>
            </form>
        </Box>
    );
}

export default Cadastro;
