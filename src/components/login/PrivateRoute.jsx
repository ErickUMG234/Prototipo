/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);  // Termina el estado de "cargando" después de verificar el token
    }, []);

    if (loading) {
        return <p>Cargando...</p>;  // Muestra un mensaje mientras se verifica el token
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;



