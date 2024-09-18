

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useContext, useState } from "react";
import axios from "axios";
import Modal from "../Modal/ModalP";
import { axiosInstance } from "../../services/axios.config";
import { ProveedoresContext, UPLOAD_PROVEEDORES } from "../../context/ProveedoresContext";

const ItemTableP = ({proveedor}) => {  // Cambia el nombre del componente a ItemTableP
    const { id_proveedor, nombre_proveedor, contacto, direccion, telefono, email } =proveedor;  // Asegúrate de que estos son los campos correctos para los proveedores
    const [modalShow, setModalShow] = useState(false);
    const { proveedores, dispatch } = useContext(ProveedoresContext);

    const handleDelete = (id_proveedor) => {  // Cambia id_material a id_proveedor
        axiosInstance.delete(`/Proveedores/${id_proveedor}`)  // Asegúrate de usar la URL correcta para eliminar proveedores
            .then(r => {
                if (r.status === 200) {
                    console.log('Proveedor eliminado', r.data);
                    const itemsUpdate =proveedores.filter(proveedor => proveedor.id_proveedor !== r.data.id_proveedor);
                    console.log(itemsUpdate);
                    dispatch({ type: UPLOAD_PROVEEDORES, payload: itemsUpdate });
                }
            })
            .catch(err => console.error('Error al eliminar el proveedor', err));
    };

    const handleUpdate = async (id_proveedor, values) => {  
        const { nombre_proveedor, contacto, direccion, telefono, email } = values;  // Ajusta los valores recibidos según los datos de los proveedores

        if (!nombre_proveedor || !contacto || !direccion || !telefono || !email) {
            console.error('Faltan valores en los datos recibidos');
            return;
        }

        const data = {
            nombre_proveedor,
            contacto,
            direccion,
            telefono,
            email
        };

        try {
            const response = await axios.put(`/Proveedores/${id_proveedor}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedItems = proveedores.map(proveedor =>
                proveedor.id_proveedor === id_proveedor ? response.data : proveedor
            );
            dispatch({ type: UPLOAD_PROVEEDORES, payload: updatedItems });
            setModalShow(false);
        } catch (error) {
            console.error('Error al actualizar el proveedor', error.response?.data);
            alert("Hubo un error al actualizar el proveedor");
        }
    };

    return (
        <>
            <tr>
                <td>{id_proveedor}</td> 
                <td>{nombre_proveedor}</td>
                <td>{contacto}</td>
                <td>{direccion}</td>
                <td>{telefono}</td>
                <td>{email}</td>
                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <i className="bi bi-trash3-fill" style={{ cursor: 'pointer' }} onClick={() => handleDelete(id_proveedor)}> eliminar </i>
                    <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={() => setModalShow(true)}> editar</i>
                </td>
            </tr>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                proveedor={proveedor}
                onSubmit={(updatedValues) => handleUpdate(id_proveedor, updatedValues)}
            />
        </>
    );
};

export default ItemTableP;

