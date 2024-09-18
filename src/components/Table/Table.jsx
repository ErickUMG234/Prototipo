/* eslint-disable react/prop-types */

import { useState, useEffect } from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';

const Table = ({ items = [] }) => {
    const [filteredItems, setFilteredItems] = useState(items); 
    const [searchTerm, setSearchTerm] = useState("");

    
    useEffect(() => {
        const filtered = items.filter((item) =>
            item.nombre_material.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.unidades.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.Cantidad_disponible.toString().includes(searchTerm) ||
            new Date(item.fecha_registro).toLocaleDateString().includes(searchTerm) 
        );
        setFilteredItems(filtered); 
    }, [searchTerm, items]);

    return (
        <div>
           
            <input
                type="text"
                placeholder="Buscar materiales..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            <TableBs striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre del Material</th>
                        <th>Descripción</th>
                        <th>Unidades</th>
                        <th>Cantidad Disponible</th>
                        <th>Fecha de ingreso</th>
                        <th style={{ textAlign: 'center' }}>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
                            <ItemTable key={item.id_material} item={item} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron materiales.</td>
                        </tr>
                    )}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;




/*import TableBs from 'react-bootstrap/Table';
import ItemTable from '../ItemTable/ItemTable';



const Table = ({ items=[] }) => {
    console.log(items);
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nombre del Material</th>
                    <th>Descripción</th>
                    <th>Unidades</th>
                    <th>Cantidad Disponible</th>
                    <th>Fecha de ingreso</th>
                    <th style={{ textAlign: 'center' }}>Modificar</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                     <ItemTable key={item.id_material} item={item}  />
                  //  <ItemTable key={i} item={item} editItem={editItem}/>
                ))}
            </tbody>
        </TableBs>
    );
};

export default Table;*/
