import { useContext, useEffect } from 'react';
import Table from '../components/Table/TableIngreso'; // Asegúrate de que esta sea la tabla correcta para proveedores
import { axiosInstance } from '../services/axios.config';
import { IngresosContext } from '../context/IngresosContext';

const ShowIngresos = () => {  // Cambia el nombre del componente a ShowProveedores
    const { ingresos, dispatch } = useContext(IngresosContext);
  
    useEffect(() => {
        axiosInstance.get('/Ingresos')
            .then(response => {
                console.log('Datos recibidos de la API:', response.data);
                dispatch({ type: 'UPLOAD_INGRESOS', payload: response.data });
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Lista de Ingresos</h1> 
            <div className="container">
                {ingresos.length > 0 ? (
                    <Table ingresos={ingresos} />
                ) : (
                    <p>No hay Ingresos</p>
                )}
            </div>
        </div>
    );
};

export default ShowIngresos;
