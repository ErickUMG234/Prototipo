

/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTableEg from '../ItemTable/ItemTableEg';

const Table = ({ egresos = [] }) => {
    const [filteredEgresos, setFilteredEgresos] = useState(egresos); 
    const [searchTerm, setSearchTerm] = useState(""); 

    useEffect(() => {
        const filtered = egresos.filter((egreso) =>
            egreso.nombre_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
            egreso.cantidad_ingresada.toString().includes(searchTerm) ||
            egreso.cantidad_egresada.toString().includes(searchTerm) ||
            egreso.nombre_solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
            egreso.area_solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
            new Date(egreso.fecha_egreso).toLocaleDateString().includes(searchTerm)
        );
        setFilteredEgresos(filtered); 
    }, [searchTerm, egresos]);


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, '0'); // Asegura que el día tenga 2 dígitos
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0, por eso se suma 1
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`; // Retorna en el formato DD/MM/YYYY
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
                        <th>ID Egreso</th>
                        <th>Material</th>
                        <th>Cantidad Ingresada</th>
                        <th>Cantidad Egresada</th>
                        <th>Fecha</th>
                        <th>Solicitante</th>
                        <th>Área Solicitante</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEgresos.length > 0 ? (
                        filteredEgresos.map((egreso, index) => (
                            <ItemTableEg key={`${egreso.id_egreso}-${index}`}  egreso={egreso}  formatDate={formatDate}/>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron egresos.</td>
                        </tr>
                    )}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;



/*import TableBs from 'react-bootstrap/Table';
import ItemTableEg from '../ItemTable/ItemTableEg';



const Table = ({ egresos = [] }) => {
  
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>ID Egreso</th>
                    <th>Material</th>
                    <th>cantidad ingresada</th>
                    <th>cantidad  Egresada</th>
                    <th>Fecha</th>
                    <th>Solicitante</th>
                    <th>Area solicitante</th>
                </tr>
            </thead>
            <tbody>
            
  {egresos.map((egreso, index) => (
    <ItemTableEg key={`${egreso.id_egreso}-${index}`} egreso={egreso} />
  ))}
</tbody>


        </TableBs>
    );
};

export default Table;*/