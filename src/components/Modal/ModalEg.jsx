/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';

const ModalEgreso = (props) => {
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
                <p><strong>id_egreso:</strong> {egreso.id_egreso || 'No especificado'}</p>
                    <p><strong>Material:</strong> {egreso.nombre_material || 'No especificado'}</p>
                    <p><strong>Cantidad ingresada:</strong> {egreso.cantidad_ingresada || 'No especificado'}</p>
                    <p><strong>Cantidad Egresada:</strong> {egreso.cantidad_egresada || 'No especificado'}</p>
                    <p><strong>Fecha de Egreso:</strong> {formatDate(egreso.fecha_egreso)}</p>
                    <p><strong>Nombre del Solicitante:</strong> {egreso.nombre_solicitante || 'No especificado'}</p>
                    <p><strong>Área del Solicitante:</strong> {egreso.area_solicitante || 'No especificado'}</p>
                </div>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Cerrar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default ModalEgreso;
