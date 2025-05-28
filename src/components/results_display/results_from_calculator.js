import axios from 'axios';

export async function getfakedata() {
    try {
        const response = await axios.post('http://127.0.0.1:8081/enviar_calculos');
        return response.data.response_data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}
