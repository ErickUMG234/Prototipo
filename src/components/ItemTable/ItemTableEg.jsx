/* eslint-disable react/prop-types */




const ItemTableEg = ({ egreso, formatDate }) => {


  
    const { id_egreso, nombre_material, cantidad_ingresada, cantidad_egresada, fecha_egreso, nombre_solicitante, area_solicitante } = egreso;

    return (
        <tr>
            <td>{id_egreso}</td>
            <td>{nombre_material}</td> 
            <td>{cantidad_ingresada}</td>
            <td>{cantidad_egresada}</td> 
            <td>{formatDate(fecha_egreso)}</td> 
            <td>{nombre_solicitante}</td> 
            <td>{area_solicitante}</td>
        </tr>
    );
};

export default ItemTableEg;
