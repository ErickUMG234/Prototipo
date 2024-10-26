
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';

const ModalIn = (props) => {
    const { ingreso } = props;


    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <ModalBs {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Detalles del Ingreso
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <div>
                    <p><strong>Material:</strong> {ingreso.nombre_material || 'No especificado'}</p>
                    <p><strong>Proveedor:</strong> {ingreso.nombre_proveedor || 'No especificado'}</p>
                    <p><strong>Cantidad Ingresada:</strong> {ingreso.cantidad_ingreso}</p>
                    <p><strong>Fecha de Ingreso:</strong> {ingreso.fecha_ingreso ? formatDate(ingreso.fecha_ingreso) : 'No especificado'}</p>
                    <p><strong>Usuario:</strong> {ingreso.nombre_usuario || 'No especificado'}</p>

                  
                    <p><strong>Solicitud Recibido:</strong> 
                        {ingreso.solicitud_recibido ? (
                            <a href={`https://mi-backend-production-84d7.up.railway.app/uploads/${ingreso.solicitud_recibido}`} target="_blank" rel="noopener noreferrer">
                               {ingreso.solicitud_recibido}
                                <i className="bi bi-eye" style={{ fontSize: '1.5em', marginLeft: '10px' }}></i> Ver documento
                            </a>
                        ) : (
                            'No especificado'
                        )}
                    </p>
                </div>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Cerrar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default ModalIn;

