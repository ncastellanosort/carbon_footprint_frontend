import axios from 'axios';

export async function obtenerRecomendaciones() {
    try {
        const respuesta = await axios.post(' http://127.0.0.1:8081/enviar_recomendaciones');
        return respuesta.data.response_data;
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        return null;
    }
}


