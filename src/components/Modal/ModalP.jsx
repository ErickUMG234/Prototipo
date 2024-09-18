
/* eslint-disable react/prop-types */
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import { Formik, Field, Form, ErrorMessage } from "formik";
import FormBs from 'react-bootstrap/Form';
import * as Yup from "yup"; 
import { useContext } from 'react';
import { ProveedoresContext } from '../../context/ProveedoresContext'; 
import { axiosInstance } from '../../services/axios.config';

const ModalP = (props) => {
    const { proveedores, dispatch } = useContext(ProveedoresContext);

    // Valores iniciales para los campos de proveedores
    const initialValues = {
        nombre_proveedor: props.proveedor.nombre_proveedor || '',
        contacto: props.proveedor.contacto || '',
        direccion: props.proveedor.direccion || '',
        telefono: props.proveedor.telefono || '',
        email: props.proveedor.email || ''
    };
    

    // Esquema de validación para los campos de proveedores
    const validationSchema = Yup.object().shape({
        nombre_proveedor: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(80, 'Nombre demasiado largo')
            .required('El campo es requerido'),
        contacto: Yup.string()
            .min(4, 'Nombre de contacto demasiado corto')
            .max(80, 'Nombre de contacto demasiado largo')
            .required('El campo es requerido'),
        direccion: Yup.string()
            .min(10, 'Dirección demasiado corta')
            .max(100, 'Dirección demasiado larga')
            .required('El campo es requerido'),
        telefono: Yup.string()
            .max(12, "El teléfono debe tener al menos 8 dígitos")
            .min(8, 'El teléfono debe tener al menos 8 dígitos')
            .required('El campo es requerido'),
        email: Yup.string()
            .email('Correo electrónico inválido')
            .required('El campo es requerido')
    });

    return (
        <ModalBs {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <ModalBs.Header closeButton className='bg-dark'>
                <ModalBs.Title id="contained-modal-title-vcenter">
                    Editar Proveedor
                </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className='bg-dark'>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log('Valores enviados desde el modalP:', values);
                        console.log('Objeto item recibido:', props.proveedor);

                        // Verificar si el ID del proveedor está definido
                        if (!props.proveedor || typeof props.proveedor.id_proveedor === 'undefined') {
                            console.error('El ID del proveedor no está definido.');
                            setSubmitting(false);
                            return; // Salir de la función si el ID no está definido
                        }

                        console.log('ID del proveedor:', props.proveedor.id_proveedor);
                        axiosInstance.put(`/Proveedores/${props.proveedor.id_proveedor}`, values)
                            .then((r) => {
                                if (r.status === 200) {
                                    const proveedoresUpload = proveedores.map(proveedor => { 
                                        if (proveedor.id_proveedor === r.data.id_proveedor) {
                                            return r.data;
                                        }
                                        return proveedor;
                                    });
                                    dispatch({ type: 'UPLOAD_PROVEEDORES', payload: proveedoresUpload }); 
                                    setSubmitting(false);
                                    alert('Proveedor actualizado exitosamente');
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
                    {({ isSubmitting, errors, touched, handleChange }) => (
                        <Form>
                            <FormBs.Group className="mb-3">
                                <label htmlFor='nombre_proveedor'>Nombre del Proveedor</label>
                                <Field
                                    id='nombre_proveedor'
                                    type='text'
                                    placeholder='Nombre del proveedor'
                                    name='nombre_proveedor'
                                    className='form-control field-input'
                                    onChange={handleChange}
                                />
                                {errors.nombre_proveedor && touched.nombre_proveedor && (
                                    <ErrorMessage name='nombre_proveedor' component='div' />
                                )}
                            </FormBs.Group>

                            <FormBs.Group className="mb-3">
                                <label htmlFor='contacto'>Contacto</label>
                                <Field
                                    id='contacto'
                                    type='text'
                                    placeholder='Contacto'
                                    name='contacto'
                                    className='form-control field-input'
                                    onChange={handleChange}
                                />
                                {errors.contacto && touched.contacto && (
                                    <ErrorMessage name='contacto' component='div' />
                                )}
                            </FormBs.Group>

                            <FormBs.Group className="mb-3">
                                <label htmlFor='direccion'>Dirección</label>
                                <Field
                                    id='direccion'
                                    type='text'
                                    placeholder='Dirección'
                                    name='direccion'
                                    className='form-control field-input'
                                    onChange={handleChange}
                                />
                                {errors.direccion && touched.direccion && (
                                    <ErrorMessage name='direccion' component='div' />
                                )}
                            </FormBs.Group>

                            <FormBs.Group className="mb-3">
                                <label htmlFor='telefono'>Teléfono</label>
                                <Field
                                    id='telefono'
                                    type='text'
                                    placeholder='Teléfono'
                                    name='telefono'
                                    className='form-control field-input'
                                    onChange={handleChange}
                                />
                                {errors.telefono && touched.telefono && (
                                    <ErrorMessage name='telefono' component='div' />
                                )}
                            </FormBs.Group>

                            <FormBs.Group className="mb-3">
                                <label htmlFor='email'>Correo Electrónico</label>
                                <Field
                                    id='email'
                                    type='email'
                                    placeholder='Correo Electrónico'
                                    name='email'
                                    className='form-control field-input'
                                    onChange={handleChange}
                                />
                                {errors.email && touched.email && (
                                    <ErrorMessage name='email' component='div' />
                                )}
                            </FormBs.Group>

                            <Button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Actualizar proveedor'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className='bg-dark'>
                <Button onClick={props.onHide}>Cerrar</Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default ModalP;

                                    
