



import { useContext, useEffect} from 'react';
import Table from '../components/Table/Table';
import { axiosInstance } from '../services/axios.config';
import { ItemsContext } from '../context/itemsContext';

const ShowProducts = () => {
    const { items, dispatch } = useContext(ItemsContext);
  
    useEffect(() => {
        axiosInstance.get('/Materiales')
            .then(response => {
                console.log('Datos recibidos de la API:', response.data);
                dispatch({ type: 'UPLOAD_ITEMS', payload: response.data });
                
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [dispatch]);

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Lista de Materiales</h1>
            <div className="container">
                {items.length > 0 ? (
                    <Table items={items} />
                ) : (
                    <p>No hay materiales en el sistema</p>
                )}
            </div>
        </div>
    );
};

export default ShowProducts;










/*import { useContext, useEffect, useState } from 'react';

import Table from '../components/Table/Table';
import { axiosInstance } from '../services/axios.config';
import { ItemsContext } from '../context/itemsContext';

const ShowProducts = () => {
   // const [items, setItems] = useState([]);
   const {items, dispatch}= useContext (ItemsContext)
   const [ refresh,setRefresh] = useState(false);
   //Insertando Materiales
    useEffect(() => {
        axiosInstance.get('/Materiales')
            .then(response => {
                console.log('Datos recibidos de la API:', response.data)

               // setItems(response.data);

               dispatch({type: 'UPLOAD_ITEMS', payload: response.data} )
 // Forzar re-renderizado
 setRefresh(prev => !prev);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los datos:", error);
            });
    }, [dispatch, setRefresh]);



    //actualizando materiales
   /* const editItem = (id_material, data) => {
        console.log('Editando material con id:', id_material);
        axiosInstance.put(`/Materiales/${id_material}`, data)
            .then(response => {
                console.log('Material Actualizado',response.data);
            })
            .catch(error => {
                console.error('Hubo un error al actualizar el material:', error);
            });
    };¨*/

    /*return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Lista de Materiales</h1>
            <div className="container">
                {items.length > 0 ? (
                    <Table items={items} />
                ) : (
                    <p>No hay materiales en el sistema</p>
                )}
            </div>
        </div>
    );
};

export default ShowProducts;*/
