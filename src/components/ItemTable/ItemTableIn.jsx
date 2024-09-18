
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */






const ItemTableIn = ({ ingreso, formatDate }) => {
    const { id_ingreso, nombre_material, nombre_proveedor, cantidad_ingresada, fecha_ingreso, nombre_usuario, solicitud_recibido } = ingreso;
   

    

   
    return (
        <>
            <tr>
                <td>{id_ingreso}</td>
                <td>{nombre_material}</td> 
                <td>{nombre_proveedor}</td> 
                <td>{cantidad_ingresada}</td>
                <td>{formatDate(fecha_ingreso)}</td> 
                <td>{nombre_usuario}</td> 
                <td>{solicitud_recibido}</td>
                
                   
            
            </tr>
            
        </>
    );
};

export default ItemTableIn;





/*const ItemTableIn = ({ ingreso }) => {
    const { id_ingreso, id_material, id_proveedor, cantidad_ingresada, fecha_ingreso, id_usuario, solicitud_recibido } = ingreso;
    const [modalShow, setModalShow] = useState(false);
    const { ingresos, dispatch } = useContext(IngresosContext);

    const handleDelete = (id_ingreso) => {
        axiosInstance.delete(`/Ingresos/${id_ingreso}`)
            .then(r => {
                if (r.status === 200) {
                    console.log('Ingreso eliminado', r.data);
                    const updatedItems = ingresos.filter(ingreso => ingreso.id_ingreso !== id_ingreso);
                    dispatch({ type: UPLOAD_INGRESOS, payload: updatedItems });
                }
            })
            .catch(err => console.error('Error al eliminar el ingreso', err));
    };

    const handleUpdate = async (id_ingreso, values) => {
        const { id_material, id_proveedor, cantidad_ingresada, fecha_ingreso, id_usuario,solicitud_recibido } = values;

        if (!id_material || !id_proveedor || !cantidad_ingresada || !fecha_ingreso || !id_usuario || !solicitud_recibido) {
            console.error('Faltan valores en los datos recibidos');
            return;
        }

        const data = {
            id_material,
            id_proveedor,
            cantidad_ingresada,
            fecha_ingreso,
            id_usuario,
            solicitud_recibido
        };

        try {
            const response = await axios.put(`/Ingresos/${id_ingreso}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedItems = ingresos.map(ingreso =>
                ingreso.id_ingreso === id_ingreso ? response.data : ingreso
            );
            dispatch({ type: UPLOAD_INGRESOS, payload: updatedItems });
            setModalShow(false);
        } catch (error) {
            console.error('Error al actualizar el ingreso', error.response?.data);
            alert("Hubo un error al actualizar el ingreso");
        }
    };

    return (
        <>
            <tr>
                <td>{id_ingreso}</td>
                <td>{id_material}</td>
                <td>{id_proveedor}</td>
                <td>{cantidad_ingresada}</td>
                <td>{new Date(fecha_ingreso).toLocaleDateString()}</td>
                <td>{id_usuario}</td>
                <td>{solicitud_recibido}</td>

                <td style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <i className="bi bi-trash3-fill" style={{ cursor: 'pointer' }} onClick={() => handleDelete(id_ingreso)}> eliminar </i>
                    <i className="bi bi-pencil-square" style={{ cursor: 'pointer' }} onClick={() => setModalShow(true)}> editar</i>
                </td>
            </tr>
            <Modal
                show={modalShow}
                onHide={() => setModalShow(false)}
                ingreso={ingreso}
                onSubmit={(updatedValues) => handleUpdate(id_ingreso, updatedValues)}
            />
        </>
    );
};

export default ItemTableIn;*/
