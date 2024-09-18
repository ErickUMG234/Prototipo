
/* eslint-disable react/prop-types */





import TableBs from 'react-bootstrap/Table';
import ItemTableP from '../ItemTable/ItemTableP';



const Table = ({ proveedores=[] }) => {
    console.log(proveedores);
    return (
        <TableBs striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#ID</th>
                    <th>Nombre del proveedor</th>
                    <th>contacto</th>
                    <th>telefono</th>
                    <th>direccion</th>
                    <th>email</th>
                    <th style={{ textAlign: 'center' }}>Modificar</th>
                </tr>
            </thead>
            <tbody>
                {proveedores.map((proveedor) => (
                     <ItemTableP key={proveedor.id_proveedor} proveedor={proveedor}  />
                 
                ))}
            </tbody>
        </TableBs>
    );
};

export default Table;



/*import React, { useState, useEffect } from 'react';
import TableBs from 'react-bootstrap/Table';
import ItemTableP from '../ItemTable/ItemTableP';

const Table = ({ proveedores = [] }) => {
    const [filteredProveedores, setFilteredProveedores] = useState(proveedores); // Estado para almacenar los proveedores filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    // Efecto que filtra los proveedores basados en el término de búsqueda
    useEffect(() => {
        const filtered = proveedores.filter((proveedor) =>
            proveedor.nombre_proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proveedor.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proveedor.telefono.toString().includes(searchTerm) ||
            proveedor.direccion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            proveedor.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProveedores(filtered); // Actualiza el estado con los proveedores filtrados
    }, [searchTerm, proveedores]);

    return (
        <div>
           
            <input
                type="text"
                placeholder="Buscar proveedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mb-3"
            />

            <TableBs striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Nombre del proveedor</th>
                        <th>Contacto</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Email</th>
                        <th style={{ textAlign: 'center' }}>Modificar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProveedores.length > 0 ? (
                        filteredProveedores.map((proveedor) => (
                            <ItemTableP key={proveedor.id_proveedor} proveedor={proveedor} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No se encontraron proveedores.</td>
                        </tr>
                    )}
                </tbody>
            </TableBs>
        </div>
    );
};

export default Table;*/
