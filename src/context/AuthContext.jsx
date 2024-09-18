/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from 'react';
import { axiosInstance } from '../services/axios.config'; // O la configuración de axios que estés usando
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); 


export const AuthProvider = ({ children }) => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();
    
    // Función para iniciar sesión y obtener los detalles del usuario
    const login = async (credenciales) => {
        try {
            const response = await axiosInstance.post('/login', credenciales);
            const { token, user } = response.data;
            setUsuarioAutenticado(user); // Guardar los datos del usuario
            localStorage.setItem('token', token); // Almacenar el token en localStorage
            setCargando(false); 
            navigate('/home'); 
            
        } catch (error) {
            console.error('Error al iniciar sesión', error);
            setCargando(false); 
            throw error;
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        setUsuarioAutenticado(null);
        localStorage.removeItem('token'); // Remover el token si lo estás usando
        navigate('/login'); 
    };

    // Verificar si el usuario ya está autenticado (por ejemplo, usando un token guardado)
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Intenta recuperar la información del usuario autenticado
            axiosInstance.get('/me', { headers: { Authorization: `Bearer ${token}` } })
                .then(response => {
                    setUsuarioAutenticado(response.data);
                    setCargando(false); // Ya tenemos el usuario autenticado, dejar de cargar
                })
                .catch(() => {
                    logout(); // Si el token no es válido, cerramos la sesión
                    setCargando(false); // Detenemos la carga ya que no hay usuario autenticado
                });
        } else {
            setCargando(false); // No hay token, por lo tanto no hay carga adicional
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (cargando) {
        return <p>Cargando autenticación...</p>;  // Muestra un estado de cargando
    }

    return (
        <AuthContext.Provider value={{ usuarioAutenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
