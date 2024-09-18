
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import { useContext } from 'react';
import { ItemsContext,UPLOAD_ITEMS } from '../../context/itemsContext';
import { axiosInstance } from '../../services/axios.config';










const Modal = (props) => {
    // Convertir la fecha a formato yyyy-MM-dd
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; 
    };
    const {items, dispatch} = useContext(ItemsContext);


    const initialValues = {
        nombre_material: props.item.nombre_material || '',
        descripcion: props.item.descripcion || '',
        unidades: props.item.unidades || '',
        Cantidad_disponible: props.item.Cantidad_disponible || '',
        fecha_registro: formatDate(props.item.fecha_registro) || ''
      

    };
   

    const validationSchema = Yup.object().shape({
        nombre_material: Yup.string().min(4, 'Nombre demasiado corto').max(80, 'Nombre demasiado largo').required('El campo es requerido'),
        descripcion: Yup.string().min(10, 'Descripción demasiado corta').max(100, 'Descripción demasiado larga').required('El campo es requerido'),
        unidades: Yup.string().required('El campo es requerido'),
        Cantidad_disponible: Yup.number().required('El campo es requerido'),
        fecha_registro: Yup.date().required('El campo es requerido')
    });

    return (
        <ModalBs {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <ModalBs.Header closeButton className='bg-dark'>
            <ModalBs.Title id="contained-modal-title-vcenter">
                Editar Material
            </ModalBs.Title>
        </ModalBs.Header>
        <ModalBs.Body className='bg-dark'>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('Valores enviados desde el modal:', values);
                    console.log('Objeto item recibido:', props.item);  
                    // Verificar si el ID del material está definido
  if (!props.item || typeof props.item.id_material=='undefined') {
    console.error('El ID del material no está definido.');
    setSubmitting(false);
    return; // Salir de la función si el ID no está definido
}


console.log('ID del material:', props.item.id_material);
axiosInstance.put(`/Materiales/${props.item.id_material}`, values)
.then((r) => {
    if (r.status === 200) {
        const itemsUpload = items.map(item => {
            if (item.id_material === r.data.id_material) {
                return r.data;
            }
            return item;
        });
        dispatch({ type: UPLOAD_ITEMS, payload: itemsUpload });
        setSubmitting(false);
        alert('Producto actualizado exitosamente'); 
    } else {
        throw new Error(`[ERROR ${r.status}] Error en la solicitud`);
    }
})
.catch(err => console.log(err))
.finally(() => {
    setSubmitting(false);
    props.onHide();
});
                }}
                >
                     {({ isSubmitting, errors, touched, handleChange }) => {
                        
                       return(
                            <Form>
                                <FormBs.Group className="mb-3">
                                    <label htmlFor='nombre_material'>Nombre del Material</label>
                                    <Field id='nombre_material' type='text' placeholder='Material' name='nombre_material' 
                                        className='form-control field-input' onChange={handleChange}/>
                                    {errors.nombre_material && touched.nombre_material && (
                                        <ErrorMessage name='nombre_material' component='div'/>
                                    )}
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label htmlFor='descripcion'>Descripción del Material</label>
                                    <Field id='descripcion' type='text' placeholder='Descripción' name='descripcion'
                                        className='form-control field-input' onChange={handleChange}/>
                                    {errors.descripcion && touched.descripcion && (
                                        <ErrorMessage name='descripcion' component='div'/>
                                    )}
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label htmlFor='unidades'>Unidades</label>
                                    <Field id='unidades' type='text' placeholder='Unidades' name='unidades' 
                                        className='form-control field-input' onChange={handleChange}/>
                                    {errors.unidades && touched.unidades && (
                                        <ErrorMessage name='unidades' component='div'/>
                                    )}
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label htmlFor='Cantidad_disponible'>Cantidad Disponible</label>
                                    <Field id='Cantidad_disponible' type='number' placeholder='Cantidad' name='Cantidad_disponible' 
                                        className='form-control field-input' onChange={handleChange}/>
                                    {errors.Cantidad_disponible && touched.Cantidad_disponible && (
                                        <ErrorMessage name='Cantidad_disponible' component='div'/>
                                    )}
                                </FormBs.Group>

                                <FormBs.Group className="mb-3">
                                    <label htmlFor='fecha_registro'>Fecha de Registro</label>
                                    <Field id='fecha_registro' type='date' placeholder='fecha_registro'  name='fecha_registro'
                                        className='form-control field-input' onChange={handleChange}/>
                                    {errors.fecha_registro && touched.fecha_registro && (
                                        <ErrorMessage name='fecha_registro' component='div'/>
                                    )}
                                </FormBs.Group>

                                <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Actualizar producto'}
                                   
                                </Button>
                            </Form>
                       );
                    }}
                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Cerrar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default Modal;




