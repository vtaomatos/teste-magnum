import { CAMINHO_CONTA } from "../constants/constantsApi";
import { requestApiGet } from "./requestService";


export async function ConsultaUsuarioDestinatario(documento) {
    
    //buscar no banco o usuario destinatario pelo documento

    const token = localStorage.getItem('token');

    if (!token) throw new Error('Token não encontrado');

    const linkValidarUsuario = `${CAMINHO_CONTA}/?token=${encodeURIComponent(token)}`;
    const usuarioValidado = await requestApiGet(linkValidarUsuario);

    if (!usuarioValidado || usuarioValidado.length === 0) {
        throw new Error('Usuário logado não encontrado');
    }
    if (usuarioValidado.length > 1) {
        throw new Error('Mais de uma conta encontrada');
    }


    const linkUsuarioDestinatario = `${CAMINHO_CONTA}/?cpf_ou_cnpj=${encodeURIComponent(documento)}`;
    const usuarioDestinatario = await requestApiGet(linkUsuarioDestinatario);


    if (!usuarioDestinatario || usuarioDestinatario.length === 0) {
        throw new Error('Destinatário não encontrado');
    }

    if (usuarioDestinatario.length > 1) {
        throw new Error('Mais de uma conta encontrada');
    }
    if (usuarioDestinatario[0].id === usuarioValidado[0].id) {
        throw new Error('Não é possível enviar transferência para você mesmo');
    }


    //se tudo estiver certo, retorna o id do destinatario
    const nomeDestinatario = usuarioDestinatario[0].primeiro_nome;
    const idContaDestinatario = usuarioDestinatario[0].id;
    const destinatario = {
        id: idContaDestinatario,
        nome: nomeDestinatario
    };

    return destinatario;

}