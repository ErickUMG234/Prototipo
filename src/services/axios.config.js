import axios from "axios";






export const axiosInstance = axios.create({
    baseURL: 'https://erick234-001-site1.ftempurl.com/mi-backend/back',  // Actualiza con tu URL correcta
    timeout: 7000,  // Ajusta el tiempo de espera si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
});