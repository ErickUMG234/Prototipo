/* eslint-disable react/prop-types */




const ItemTableEg = ({ egresos, formatDate }) => {
    const { id_egreso, nombre_material, cantidad_egreso, cantidad_ingreso, cantidad_en_stock, solicitud_documento,fecha_egreso } = egresos;

    return (
        <>
            <tr>
                <td>{id_egreso}</td>
                <td>{nombre_material}</td>
                <td>{cantidad_egreso }</td>
                <td>{cantidad_ingreso}</td>
                <td>{cantidad_en_stock}</td>
                <td>{formatDate(fecha_egreso)}</td> 
                <td>
                    {solicitud_documento ? (
                        <>
                            <a href={`https://mi-backend-production-84d7.up.railway.app/uploads/${solicitud_documento}`} target="_blank" rel="noopener noreferrer">
                                <i className="bi bi-eye" style={{ fontSize: '1.5em', marginRight: '10px' }}></i>
                            </a>
                            {solicitud_documento} {/* Nombre del archivo PDF */}
                        </>
                    ) : (
                        'No especificado'
                    )}
                </td>
            </tr>
        </>
    );
};

export default ItemTableEg;
