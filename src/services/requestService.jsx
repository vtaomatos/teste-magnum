import axios from "axios";


export async function requestApiGet(caminho) {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL+caminho}`;
    const result = (await axios.get(apiUrl)).data;
    return result;
}

export async function requestApiPost(caminho, dados) {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL+caminho}`;
    const result = (await axios.post(apiUrl, {
        ...dados
    })).data;
    return result;
}

export async function requestApiPut(caminho, dados) {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL+caminho}`;
    const result = (await axios.put(apiUrl, {
        ...dados
    })).data;
    return result;
}


