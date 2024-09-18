
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState} from "react";
import axios from "axios";
import Modal from "../Modal/Modal";
import { axiosInstance } from "../../services/axios.config";
import { ItemsContext, UPLOAD_ITEMS } from "../../context/itemsContext";


const ItemTable = ({ item }) => {
    const { id_material, nombre_material, descripcion, unidades, Cantidad_disponible, fecha_registro } = item;
    const [modalShow, setModalShow] = useState(false);
const{items,dispatch}=useContext(ItemsContext)



    const handleDelete = (id_material)=>{
        axiosInstance.delete(`/Materiales/${id_material}`)
        .then(r=>{
            if (r.status === 200){
                console.log('Material eliminado',r.data);
                // Recargar la página para mostrar los cambios
                window.location.reload();
                const itemsUpdate=items.filter(item=>item.id_material!==r.data.id_material)
                console.log(itemsUpdate)
                dispatch({type:UPLOAD_ITEMS, payload:itemsUpdate})
            }
        })
        .catch(err => console.error('Error al eliminar el material', err));
        
    }



    const handleUpdate = async (id_material, values) => {
        console.log('ID recibido:', id_material);
        console.log('Valores recibidos:', values);

        



         // Verificacion que todos los valores están presentes
    const { nombre_material, descripcion, unidades, Cantidad_disponible, fecha_registro } = values;

    if (!nombre_material || !descripcion || !unidades || !Cantidad_disponible || !fecha_registro) {
        console.error('Faltan valores en los datos recibidos');
        return;
    }


        const data = {
            nombre_material,
            descripcion,
            unidades,
            Cantidad_disponible,
            fecha_registro
        };

        console.log("Datos que se van a enviar:", data);

        try {
           const response =  await axios.put(`/Materiales/${id_material}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setItems(updatedItems);
            console.log('Respuesta del servidor:', response.data);

             // Actualiza el estado global del contexto
        const updatedItems = items.map(item =>
            item.id_material === id_material ? response.data : item
            
        );
        dispatch({ type: UPLOAD_ITEMS, payload: updatedItems });
        
            
            setModalShow(false);
        } catch (error) {
            console.error('Error al actualizar el material', error.response?.data);
            alert("Hubo un error al actualizar el material");
        }
      
    };

    return (
        <>
            <tr>
                <td>{id_material}</td>
                <td>{nombre_material}</td>
                <td>{descripcion}</td>
                <td>{unidades}</td>
                <td>{Cantidad_disponible}</td>
                <td>{fecha_registro}</td>

                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <i className="bi bi-trash3-fill" style={{ cursor: 'pointer' }} onClick={()=>handleDelete(id_material)}> eliminar </i>
                    <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={() =>{console.log(item)
                     setModalShow(true)}}> editar</i>
                </td>
            </tr>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                item={item}
                onSubmit={(updatedValues) => handleUpdate(id_material, updatedValues)}
                
            />
        </>
    );
};

export default ItemTable;

















