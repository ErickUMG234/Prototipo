import { useContext, useEffect } from 'react';
import Table from '../components/Table/TableEgreso'; // Asegúrate de que esta sea la tabla correcta para proveedores
import { axiosInstance } from '../services/axios.config';
import { EgresosContext } from '../context/EgresoContext';

const ShowEgresos = () => {  // Cambia el nombre del componente a ShowProveedores
    const { egresos, dispatch } = useContext(EgresosContext);
  
    useEffect(() => {
        axiosInstance.get('/egreso')
            .then(response => {
                console.log('Datos recibidos de la API:', response.data);
                dispatch({ type: 'UPLOAD_EGRESOS', payload: response.data });
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Lista de egresos</h1> 
            <div className="container">
                {egresos.length > 0 ? (
                    <Table egresos={egresos} />
                ) : (
                    <p>No hay egresos</p>
                )}
            </div>
        </div>
    );
};

export default ShowEgresos;