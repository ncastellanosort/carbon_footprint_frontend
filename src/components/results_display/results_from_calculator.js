import axios from 'axios';

export async function getfakedata() {
    try {
        const response = await axios.get('https://fake-data-wvx9.onrender.com/fake_data');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null;
    }
}
