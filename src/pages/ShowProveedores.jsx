import { useContext, useEffect } from 'react';
import Table from '../components/Table/TablaProv'; // Asegúrate de que esta sea la tabla correcta para proveedores
import { axiosInstance } from '../services/axios.config';
import { ProveedoresContext } from '../context/ProveedoresContext';

const ShowProveedores = () => {  // Cambia el nombre del componente a ShowProveedores
    const { proveedores, dispatch } = useContext(ProveedoresContext);
  
    useEffect(() => {
        axiosInstance.get('/Proveedores')
            .then(response => {
                console.log('Datos recibidos de la API:', response.data);
                dispatch({ type: 'UPLOAD_PROVEEDORES', payload: response.data });
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Lista de Proveedores</h1> 
            <div className="container">
                {proveedores.length > 0 ? (
                    <Table proveedores={proveedores} />
                ) : (
                    <p>No hay Proveedores</p>
                )}
            </div>
        </div>
    );
};

export default ShowProveedores;
