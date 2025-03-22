import axios from 'axios';

const API_URL = 'http://localhost:3000/contas';

export const cadastrarUsuario = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData);
        return response.data;
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        throw error;
    }
};
