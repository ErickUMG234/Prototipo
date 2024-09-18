import axios from "axios";





const URL = 'http://localhost:5000';

export const axiosInstance = axios.create({
    baseURL: URL,
    timeout: 6000, // Tiempo máximo de espera para la respuesta
   
});
