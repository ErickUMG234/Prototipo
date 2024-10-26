/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';


const ModalEg = (props) => {
    const { egreso } = props;

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
                    Detalles del Egreso
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <div>
                    <p><strong>Nombre del Material:</strong> {egreso.nombre_material || 'No especificado'}</p>
                    <p><strong>Cantidad Egresada:</strong> {egreso.cantidad_egresada || 'No especificado'}</p>
                    <p><strong>Cantidad Ingresada:</strong> {egreso.cantidad_ingresada}</p>
                    <p><strong>Cantidad en Stock:</strong> {egreso.cantidad_en_stock}</p>
                    <p><strong>Fecha de Egreso:</strong> {egreso.fecha_egreso ? formatDate(egreso.fecha_egreso) : 'No especificado'}</p>
         

                    
                    <p><strong>Solicitud Documento:</strong> 
                        {egreso.solicitud_documento ? (
                            <a href={`https://mi-backend-production-84d7.up.railway.app/uploads/${egreso.solicitud_documento}`} target="_blank" rel="noopener noreferrer">
                               {egreso.solicitud_documento}
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

export default ModalEg;