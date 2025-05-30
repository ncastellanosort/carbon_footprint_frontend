import axios from 'axios';

export async function getfakedata() {
    try {
        const response = await axios.post('https://fake-data-wvx9.onrender.com/enviar_calculos');
        return response.data.response_data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}
