/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import TableBs from 'react-bootstrap/Table';
import ItemTableIn from '../ItemTable/ItemTableIn';

const Table = ({ ingresos = [] }) => {
    const [filteredIngresos, setFilteredIngresos] = useState(ingresos); // Estado para almacenar los ingresos filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    useEffect(() => {
        const filtered = ingresos.filter((ingreso) => {
            // Convertir `fecha_ingreso` a un formato de cadena de fecha "DD/MM/YYYY" en UTC
            const date = new Date(ingreso.fecha_ingreso); // Asegúrate de que es `fecha_ingreso` y no `fecha_egreso`
            const fechaIngresoFormatted = `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
        
            // Filtra por nombre de material, cantidad o fecha (con una comparación estricta de fecha)
            return (
                ingreso.nombre_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (ingreso.cantidad_ingreso && ingreso.cantidad_ingreso.toString().includes(searchTerm)) ||
                (ingreso.nombre_proveedor && ingreso.nombre_proveedor.toString().includes(searchTerm)) ||
                (ingreso.usuario && ingreso.usuario.toString().includes(searchTerm)) || // Corrige 'usario' a 'usuario'
                fechaIngresoFormatted === searchTerm // Comparación exacta de fecha
            );
        });
        setFilteredIngresos(filtered);
    }, [searchTerm, ingresos]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar ingresos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            <TableBs striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Ingreso</th>
                        <th>Material</th>
                        <th>Proveedor</th>
                        <th>Cantidad que ingresó</th>
                        <th>Fecha</th>
                        <th>Usuario que registró el ingreso</th>
                        <th>Recibido</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredIngresos.length > 0 ? (
                        filteredIngresos.map((ingreso) => (
                            <ItemTableIn key={ingreso.id_ingreso} ingreso={ingreso} formatDate={formatDate} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron ingresos.</td> 
                        </tr>
                    )}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;












/*const Table = ({ ingresos=[] }) => {
    console.log(ingresos);
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>Ingreso</th>
                    <th>Material</th>
                    <th>Proveedor</th>
                    <th>Cantidad que ingreso</th>
                    <th>Fecha</th>
                    <th>Usuario que registro el ingreso</th>
                    <th>Recibido</th>
                    <th style={{ textAlign: 'center' }}>Modificar</th>
                </tr>
            </thead>
            <tbody>
                {ingresos.map((ingreso) => (
                     <ItemTableIn key={ingreso.id_ingreso} ingreso={ingreso}  />
                     
                 
                ))}
            </tbody>
        </TableBs>
    );
};

export default Table;*/

