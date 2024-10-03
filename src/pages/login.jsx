// src/pages/Login.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './login.css';
import { axiosInstance } from '../services/axios.config';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
   const navigate = useNavigate();

   useEffect(() => {
    // Si ya hay un token, redirigir a /home
    const token = localStorage.getItem('token');
    if (token) {
        navigate('/home');
    }
}, [navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos enviados:', { email, password });
            const response = await axiosInstance.post('/login', { email, password });
            console.log('Respuesta del backend:', response.data);
            localStorage.setItem('token', response.data.token);  // Almacena el token en el localStorage
            navigate('/home'); // Redirige a la página principal después de un login exitoso
    // Limpia los datos del formulario
    setEmail('');
    setPassword('');
    setError('');
    
        } catch (error) {
            console.error('Error en la solicitud de login:', error.response ? error.response.data : error.message);
            setError('Credenciales incorrectas, intenta de nuevo.');
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
