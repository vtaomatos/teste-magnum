import axios from "axios";


export async function requestGet(caminho) {
    const apiUrl = `${import.meta.env.VITE_API_BASE_URL+caminho}`;
    const result = (await axios.get(apiUrl)).data;
    return result;
}



