

/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";
import TableBs from 'react-bootstrap/Table';
import ItemTableEg from '../ItemTable/ItemTableEg';

const Table = ({ egresos = [] }) => {
    const [filteredEgresos, setFilteredEgresos] = useState(egresos); 
    const [searchTerm, setSearchTerm] = useState("");
    useEffect(() => {
        const filtered = egresos.filter((egreso) => {
           
            const date = new Date(egreso.fecha_egreso);
            const fechaEgresoFormatted = `${date.getUTCDate().toString().padStart(2, '0')}/${(date.getUTCMonth() + 1).toString().padStart(2, '0')}/${date.getUTCFullYear()}`;
        
           
            return (
                egreso.nombre_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (egreso.cantidad_egreso && egreso.cantidad_egreso.toString().includes(searchTerm)) ||
                (egreso.cantidad_ingreso && egreso.cantidad_ingreso.toString().includes(searchTerm)) ||
                (egreso.cantidad_en_stock && egreso.cantidad_en_stock.toString().includes(searchTerm)) ||
                fechaEgresoFormatted === searchTerm // Comparación exacta de fecha
            );
        });
        setFilteredEgresos(filtered);
    }, [searchTerm, egresos]);
    
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
                placeholder="Buscar egresos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            <TableBs striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>Egreso</th>
                        <th>Nombre del Material</th>
                        <th>Cantidad que Egreso</th>
                        <th>Cantidad que Ingresó</th>
                        <th>Cantidad en Stock</th>
                        <th>Fecha</th>
                        <th>Solicitud Documento</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {filteredEgresos.length > 0 ? (
                        filteredEgresos.map((egresos) => (
                            <ItemTableEg key={egresos.id_egreso} egresos={egresos} formatDate={formatDate} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron Egresos.</td> 
                        </tr>
                    )}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;



