import axios from "axios";






export const axiosInstance = axios.create({
    baseURL: 'mi-backend-production-84d7.up.railway.app',  // Actualiza con tu URL correcta
    timeout: 7000,  // Ajusta el tiempo de espera si es necesario
    headers: {
        'Content-Type': 'application/json',
    },
});